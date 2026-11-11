import {readFile,writeFile,mkdir,mkdtemp,cp,rm} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {loadLibrary,bundle} from './snippet-validation.mjs';
const repo=fileURLToPath(new URL('../',import.meta.url));
const mode=process.argv[2]||'--check';
if(!['--build','--check','--qa'].includes(mode))throw new Error('Use --build, --check, or --qa');
const snippets=await loadLibrary(repo),output=resolve(repo,'assets/snippets/library.json');
if(mode==='--build')await writeFile(output,bundle(snippets));
else if(await readFile(output,'utf8')!==bundle(snippets))throw new Error('Stale snippet bundle. Run npm run snippets:build.');
if(mode==='--qa'){
  const temp=await mkdtemp(resolve(tmpdir(),'quiz-snippet-qa-'));
  const env={PATH:process.env.PATH,HOME:process.env.HOME,TMPDIR:temp,CHECKPOINT_DISABLE:'1',TF_IN_AUTOMATION:'1',TF_INPUT:'0',TF_CLI_CONFIG_FILE:resolve(temp,'terraform.rc'),TF_PLUGIN_CACHE_DIR:resolve(temp,'provider-cache')};
  await writeFile(env.TF_CLI_CONFIG_FILE,'');await mkdir(env.TF_PLUGIN_CACHE_DIR);
  const run=(bin,args,options={})=>{const r=spawnSync(bin,args,{encoding:'utf8',timeout:180000,maxBuffer:4*1024*1024,env,...options});if(r.error||r.status!==0)throw new Error(`${bin} ${args.join(' ')}\n${r.error||r.stdout+'\n'+r.stderr}`);return r.stdout;};
  try{
    const manifests=snippets.filter(s=>s.language==='yaml').map(s=>resolve(repo,'assets/snippets',s.file));
    console.log(run(process.env.KUBECONFORM_BIN||'kubeconform',['-strict','-summary','-kubernetes-version','1.34.0','-cache',temp,...manifests]).trim());
    let configs=0,shells=0,behavior=0;
    for(const s of snippets){
      const source=resolve(repo,'assets/snippets',s.file);
      if(s.language==='shell'){run('bash',['-n',source]);shells++;continue;}
      if(s.language!=='hcl')continue;
      run('terraform',['fmt','-check','-diff',source]);
      const dir=resolve(temp,s.id);await mkdir(dir);
      await writeFile(resolve(dir,'main.tf'),s.code);
      if(s.qa.aws&&!s.code.includes('required_providers'))await writeFile(resolve(dir,'providers.tf'),'terraform {\n  required_providers {\n    aws = {\n      source = "hashicorp/aws"\n      version = "6.21.0"\n    }\n  }\n}\n');
      if(s.qa.module)await cp(resolve(repo,'assets/snippets/fixtures/modules',s.qa.module),resolve(dir,'modules',s.qa.module),{recursive:true});
      run('terraform',[`-chdir=${dir}`,'init','-backend=false','-input=false','-no-color']);
      const result=JSON.parse(run('terraform',[`-chdir=${dir}`,'validate','-json']));
      if(!result.valid)throw new Error(`${s.id}: ${JSON.stringify(result.diagnostics)}`);
      if(Object.hasOwn(s.qa,'expected')){
        const literal=JSON.stringify(JSON.stringify(s.qa.expected));
        let tests=`run "expected_value" {\n  command = plan\n  assert {\n    condition = jsonencode(output.example) == jsonencode(jsondecode(${literal}))\n    error_message = "Example output differs from its teaching note."\n  }\n}\n`;
        if(s.qa.rejectVariable)tests+='run "reject_invalid_input" {\n  command = plan\n  variables { replicas = 0 }\n  expect_failures = [var.replicas]\n}\n';
        await mkdir(resolve(dir,'tests'));await writeFile(resolve(dir,'tests/example.tftest.hcl'),tests);
        run('terraform',[`-chdir=${dir}`,'test','-no-color']);behavior++;
      }
      configs++;console.log(`Validated ${s.id}`);
    }
    console.log(`QA passed: ${manifests.length} manifest assets, ${configs} Terraform configurations, ${shells} shell examples, ${behavior} Terraform behavior checks. No examples were applied; shell examples were not executed.`);
  }finally{await rm(temp,{recursive:true,force:true});}
}
console.log(`${snippets.length} snippet assets and all quiz references are valid (${mode.slice(2)}).`);
