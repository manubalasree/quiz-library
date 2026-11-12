import test from 'node:test';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {readFile} from 'node:fs/promises';
import {loadLibrary,validateMetadata,validateCode,validateLinks,assetPath,bundle} from '../scripts/snippet-validation.mjs';
const repo=fileURLToPath(new URL('../',import.meta.url));
test('every Kubernetes, Terraform, and Ansible question has an asset with the correct topic link',async()=>{
 const snippets=await loadLibrary(repo);let total=0;
 for(const topic of ['kubernetes','terraform','ansible']){const quiz=JSON.parse(await readFile(new URL(`../quizzes/${topic}.json`,import.meta.url),'utf8'));assert.equal(snippets.filter(s=>s.topic===topic).length,quiz.questions.length);total+=quiz.questions.length;}
 assert.equal(snippets.length,total);
 assert.equal(await readFile(new URL('../assets/snippets/library.json',import.meta.url),'utf8'),bundle(snippets));
});
test('QA rejects duplicate IDs, unsafe paths, malformed YAML, and teaching-value regressions',async()=>{
 const snippets=await loadLibrary(repo),item=snippets.find(s=>s.id==='kubernetes-045-example');
 assert.throws(()=>validateMetadata({version:1,snippets:[item,item]}));
 assert.throws(()=>assetPath('/tmp/examples','../secret'));
 assert.throws(()=>validateCode(item,'kind: [broken'));
 assert.throws(()=>validateCode(item,item.code.replace('128Mi','512Mi')));
 assert.throws(()=>validateCode(item,item.code+'kind: Secret\n'));
 const quiz={snippetsUrl:'../assets/snippets/library.json',questions:[{id:'q',exampleId:'missing'}]};
 assert.throws(()=>validateLinks({kubernetes:quiz},{snippets}));
 quiz.questions[0].exampleId='terraform-045-example';assert.throws(()=>validateLinks({kubernetes:quiz},{snippets}));
});

test('Ansible examples reject Kubernetes documents, duplicate YAML keys, and changed safety/teaching settings',async()=>{
 const snippets=await loadLibrary(repo);
 const item=snippets.find(s=>s.id==='ansible-032-example');
 assert.throws(()=>validateCode(item,'apiVersion: v1\nkind: Pod\nmetadata: {name: invalid}\n'));
 assert.throws(()=>validateCode(item,item.code.replace('diff: false','diff: true')));
 assert.throws(()=>validateCode(item,item.code.replace('no_log: true','no_log: false')));
 assert.throws(()=>validateCode(item,item.code.replace('gather_facts: false','gather_facts: false\n  gather_facts: true')));
});
