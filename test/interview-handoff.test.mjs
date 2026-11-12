import test from 'node:test';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {parseAllDocuments} from 'yaml';
import {loadLibrary,validateCode,validateMetadata} from '../scripts/snippet-validation.mjs';
const repo=fileURLToPath(new URL('../',import.meta.url));
test('handoff examples have coherent Deployment and topology selectors',async()=>{
 const examples=(await loadLibrary(repo)).filter(s=>Number(s.id.split('-')[1])>=75&&Number(s.id.split('-')[1])<=98&&s.topic==='kubernetes');
 assert.equal(examples.length,24);
 for(const s of examples.filter(s=>s.language==='yaml'))for(const doc of parseAllDocuments(s.code)){
  const obj=doc.toJS(),pod=obj.kind==='Deployment'?obj.spec.template:obj.kind==='Pod'?obj:null;
  if(!pod)continue;
  if(obj.kind==='Deployment')for(const [key,value] of Object.entries(obj.spec.selector.matchLabels))assert.equal(pod.metadata.labels[key],value,s.id);
  for(const constraint of pod.spec.topologySpreadConstraints||[])for(const [key,value] of Object.entries(constraint.labelSelector.matchLabels))assert.equal(pod.metadata.labels[key],value,s.id);
 }
});
test('teaching checks catch changed spread policy and preserve the no-CPU-limit example',async()=>{
 const all=await loadLibrary(repo),byId=new Map(all.map(s=>[s.id,s]));
 const spread=byId.get('kubernetes-096-example');assert.throws(()=>validateCode(spread,spread.code.replace('ScheduleAnyway','DoNotSchedule')));
 const noLimit=parseAllDocuments(byId.get('kubernetes-081-example').code)[0].toJS();
 assert.equal(Object.hasOwn(noLimit.spec.containers[0].resources.limits,'cpu'),false);
 const pvcDocs=parseAllDocuments(byId.get('kubernetes-085-example').code).map(d=>d.toJS());
 assert.equal(pvcDocs[2].spec.volumes[0].persistentVolumeClaim.claimName,pvcDocs[1].metadata.name);
 const aws=byId.get('kubernetes-077-example');assert.ok(validateMetadata({version:1,snippets:[aws]}));
 assert.throws(()=>validateMetadata({version:1,snippets:[{...aws,source:'https://docs.aws.amazon.com.evil.example/reference'}]}));
});
