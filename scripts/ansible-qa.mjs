import {tmpdir} from 'node:os';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {spawnSync} from 'node:child_process';
import {loadLibrary,bundle} from './snippet-validation.mjs';
import {readFile,writeFile,mkdir,cp,mkdtemp,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {parse,stringify} from 'yaml';

// Syntax-check all references, then run only the explicitly selected harmless
// examples against a generated localhost inventory, never the user's inventory.
export async function qaAnsible({repo,temp,run}){
 const root=resolve(repo,'assets/snippets'),index=JSON.parse(await readFile(resolve(root,'index.json'),'utf8'));
 const dir=resolve(temp,'ansible');await mkdir(dir);
 await cp(resolve(root,'fixtures/ansible'),dir,{recursive:true});
 const inventory=resolve(dir,'inventory.ini');
 await writeFile(inventory,'[web]\napp1 ansible_connection=local\napp2 ansible_connection=local\n[production]\napp2\n[database]\ndb1 ansible_connection=local service_port=5432\n');
 const bin=process.env.ANSIBLE_PLAYBOOK_BIN||'ansible-playbook';
 let playbooks=0,behavior=0;
 for(const item of index.snippets.filter(s=>s.topic==='ansible'&&s.language==='yaml')){
  const file=resolve(dir,item.id+'.yaml');await writeFile(file,await readFile(resolve(root,item.file),'utf8'));
  run(bin,['-i',inventory,'--syntax-check',file],{cwd:dir});playbooks++;
 }
 const checks={
  '010':['result.stdout == "hello|wc-c"'],
  '019':['qa_result.msg | int == 8080'],
  '020':['qa_result is skipped'],
  '021':['qa_result is not skipped'],
  '022':['qa_result is not skipped'],
  '023':['qa_result.results[0] is skipped','qa_result.results[1] is skipped','qa_result.results[2] is not skipped','qa_result.results[3] is not skipped'],
  '024':['checks.results | map(attribute="stdout") | list == ["api", "worker"]'],
  '025':['kernel_version is not changed'],
  '041':['static_result.msg == "Statically imported task"','dynamic_result.msg == "Dynamically included task"'],
  '046':['qa_result.msg | int == 5432'],
  '047':['mode.stdout == "staging"','mode is not changed'],
  '050':['qa_result is not failed'],
 };
 for(const [number,assertions] of Object.entries(checks)){
  const id=`ansible-${number}-example`,file=resolve(dir,id+'.yaml');
  const plays=parse(await readFile(file,'utf8')),play=plays[0];
  play.hosts='localhost';play.connection='local';
  const first=play.tasks[0];if(!first.register)first.register='qa_result';
  play.tasks.push({name:`QA ${id}`, 'ansible.builtin.assert':{that:assertions}});
  await writeFile(file,stringify(plays));
  run(bin,['-i',inventory,file],{cwd:dir});behavior++;
 }
 // Exercise notification deduplication, an explicit flush, and rescue/always
 // without invoking the service-management tasks in the teaching assets.
 const lifecycle=resolve(dir,'lifecycle.yaml');
 await writeFile(lifecycle,stringify([{hosts:'localhost',connection:'local',gather_facts:false,vars:{handler_runs:0},tasks:[
  {'ansible.builtin.debug':{msg:'simulated changed configuration'},loop:['one','two','three'],changed_when:true,notify:'Count notifications'},
  {'ansible.builtin.meta':'flush_handlers'},
  {'ansible.builtin.assert':{that:['handler_runs | int == 1']}},
  {block:[{'ansible.builtin.fail':{msg:'deliberate local test failure'}}],rescue:[{'ansible.builtin.set_fact':{rescued:true}}],always:[{'ansible.builtin.set_fact':{cleaned:true}}]},
  {'ansible.builtin.assert':{that:['rescued | bool','cleaned | bool']}},
 ],handlers:[{name:'Count notifications','ansible.builtin.set_fact':{handler_runs:'{{ handler_runs | int + 1 }}'}}]}]));
 run(bin,['-i',inventory,lifecycle],{cwd:dir});behavior++;
 console.log(`Ansible QA passed: ${playbooks} syntax checks and ${behavior} isolated local behavior checks.`);
 return {playbooks,behavior};
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const repo=fileURLToPath(new URL('../',import.meta.url)),snippets=await loadLibrary(repo);
 if(await readFile(resolve(repo,'assets/snippets/library.json'),'utf8')!==bundle(snippets))throw new Error('Rebuild the snippet bundle first.');
 const temp=await mkdtemp(resolve(tmpdir(),'quiz-ansible-qa-'));
 const env={PATH:process.env.PATH,HOME:temp,ANSIBLE_CONFIG:resolve(temp,'ansible.cfg'),ANSIBLE_LOCAL_TEMP:resolve(temp,'local'),ANSIBLE_REMOTE_TEMP:resolve(temp,'remote'),ANSIBLE_ASYNC_DIR:resolve(temp,'async')};
 await writeFile(env.ANSIBLE_CONFIG,'[defaults]\nretry_files_enabled = False\n');
 const run=(bin,args,options={})=>{
  const result=spawnSync(bin,args,{encoding:'utf8',timeout:120000,maxBuffer:4*1024*1024,env,...options});
  if(result.error||result.status!==0)throw new Error(`${bin} ${args.join(' ')}\n${result.error||result.stdout+'\n'+result.stderr}`);
  return result.stdout;
 };
 try{
  for(const s of snippets.filter(s=>s.topic==='ansible'&&s.language==='shell'))run('bash',['-n',resolve(repo,'assets/snippets',s.file)]);
  await qaAnsible({repo,temp,run});
 }finally{await rm(temp,{recursive:true,force:true});}
}
