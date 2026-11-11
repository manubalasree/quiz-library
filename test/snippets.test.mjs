import test from 'node:test';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {readFile} from 'node:fs/promises';
import {loadLibrary,validateMetadata,validateCode,validateLinks,assetPath,bundle} from '../scripts/snippet-validation.mjs';
const repo=fileURLToPath(new URL('../',import.meta.url));
test('all 100 answer examples have assets and correct topic links',async()=>{
 const snippets=await loadLibrary(repo);assert.equal(snippets.length,100);
 for(const topic of ['kubernetes','terraform'])assert.equal(snippets.filter(s=>s.topic===topic).length,50);
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
