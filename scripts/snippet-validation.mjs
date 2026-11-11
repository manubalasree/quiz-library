import {readFile, readdir} from 'node:fs/promises';
import {resolve, relative, sep} from 'node:path';
import {parseAllDocuments} from 'yaml';
export function assetPath(root, file) {
  if(typeof file!=='string'||!file||file.includes('\\')||file.startsWith('/'))throw new Error('Invalid asset path');
  const path=resolve(root,file),rel=relative(root,path);
  if(rel==='..'||rel.startsWith('..'+sep)||!rel)throw new Error('Asset path escapes the library');
  return path;
}
export function validateMetadata(index) {
  if(index?.version!==1||!Array.isArray(index.snippets)||!index.snippets.length)throw new Error('Invalid snippet index');
  const ids=new Set(),files=new Set();
  for(const item of index.snippets){
    if(!item||!['id','topic','title','file','description','source'].every(k=>typeof item[k]==='string'&&item[k].trim())||ids.has(item.id)||files.has(item.file))throw new Error('Missing or duplicate snippet metadata');
    if(!['kubernetes','terraform'].includes(item.topic)||!['yaml','hcl','shell'].includes(item.language)||!item.qa||typeof item.qa!=='object')throw new Error(`Invalid snippet ${item.id}`);
    const source=new URL(item.source);
    if(source.protocol!=='https:'||source.username||source.password||!['kubernetes.io','developer.hashicorp.com'].includes(source.hostname))throw new Error('Use an official HTTPS reference');
    if(item.file!==`${item.topic}/${item.id}.${{yaml:'yaml',hcl:'tf',shell:'sh'}[item.language]}`)throw new Error('Snippet filename must match its ID and language');
    ids.add(item.id);files.add(item.file);
  }
  return index;
}
export function validateCode(item,code) {
  if(typeof code!=='string'||!code.trim()||code.length>20000||code.split('\n').length>65)throw new Error(`${item.id}: empty or oversized code`);
  if(item.language==='yaml'){
    const docs=parseAllDocuments(code,{uniqueKeys:true});
    if(!docs.length||docs.some(d=>d.errors.length))throw new Error(`${item.id}: invalid YAML or duplicate keys`);
    const objects=docs.map(d=>d.toJS());
    for(const obj of objects)if(!obj?.apiVersion||!obj.kind||!obj.metadata?.name)throw new Error(`${item.id}: expected complete Kubernetes objects`);
    for(const [path,expected] of Object.entries(item.qa.assertions||{})){
      const actual=path.split('.').reduce((value,key)=>value?.[key],objects);
      if(JSON.stringify(actual)!==JSON.stringify(expected))throw new Error(`${item.id}: expected ${path} = ${JSON.stringify(expected)}`);
    }
  }
}
export function validateLinks(quizzes,index) {
  const byId=new Map(index.snippets.map(s=>[s.id,s])),used=new Set();
  for(const [topic,quiz] of Object.entries(quizzes)){
    if(quiz.snippetsUrl!=='../assets/snippets/library.json')throw new Error(`${topic}: missing snippet bundle reference`);
    for(const q of quiz.questions){const snippet=byId.get(q.exampleId);if(!snippet||snippet.topic!==topic)throw new Error(`${q.id}: missing or wrong-topic example`);used.add(snippet.id);}
  }
  for(const s of index.snippets)if(!used.has(s.id))throw new Error(`${s.id}: orphaned example`);
}
export async function loadLibrary(repo) {
  const root=resolve(repo,'assets/snippets'),index=validateMetadata(JSON.parse(await readFile(resolve(root,'index.json'),'utf8')));
  const snippets=[];
  for(const item of index.snippets){const code=await readFile(assetPath(root,item.file),'utf8');validateCode(item,code);snippets.push({...item,code});}
  const quizzes={};for(const topic of ['kubernetes','terraform'])quizzes[topic]=JSON.parse(await readFile(resolve(repo,`quizzes/${topic}.json`),'utf8'));
  validateLinks(quizzes,index);
  const expected=new Set(index.snippets.map(s=>s.file));
  for(const topic of ['kubernetes','terraform'])for(const file of await readdir(resolve(root,topic)))if(!expected.has(`${topic}/${file}`))throw new Error(`Unregistered asset ${topic}/${file}`);
  return snippets;
}
export function bundle(snippets){return JSON.stringify({version:1,snippets:snippets.map(({qa,...s})=>s)},null,2)+'\n';}
