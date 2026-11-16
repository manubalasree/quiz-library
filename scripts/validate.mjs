import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { relative, sep } from 'node:path';
import assert from 'node:assert/strict';
import { validateQuiz, validateCatalog } from './validation.mjs';
const root = new URL('../', import.meta.url);
const insideRoot=url=>{const rel=relative(fileURLToPath(root),fileURLToPath(url));return rel&&rel!=='..'&&!rel.startsWith('..'+sep);};
let count=0,quizzes=0,catalogs=0;
for(const folder of await readdir(new URL('catalog/',root),{withFileTypes:true})){
  if(!folder.isDirectory())continue;
  const file=new URL(`catalog/${folder.name}/catalog.json`,root);
  let text;try{text=await readFile(file,'utf8');}catch(error){if(error.code==='ENOENT')continue;throw error;}
  const catalog=validateCatalog(JSON.parse(text));catalogs++;
  for(const entry of catalog.quizzes){
    const path=new URL(entry.url,file);
    if(path.protocol!=='file:'||!insideRoot(path))throw new Error('Use repository-relative quiz paths.');
    const expected=new URL(`quizzes/${folder.name}/`,root);
    if(!fileURLToPath(path).startsWith(fileURLToPath(expected)))throw new Error(`${folder.name}: quiz files must be in the matching quizzes folder.`);
    const quiz=validateQuiz(JSON.parse(await readFile(path,'utf8')));
    if(quiz.questions.length<50)throw new Error(`${entry.title}: expected at least 50 questions.`);
    const prompts=new Set(),answers=Array(Math.max(...quiz.questions.map(q=>q.options.length))).fill(0),expectedAnswers=answers.map((_,i)=>quiz.questions.reduce((n,q)=>n+(i<q.options.length?1/q.options.length:0),0));
    let snippets=0;const focuses={fundamentals:0,scenarios:0};
    for(const q of quiz.questions){
      if(!['fundamentals','scenarios'].includes(q.focus))throw new Error(`${entry.title}: missing focus for ${q.id}`);
      focuses[q.focus]++;
      const prompt=q.question.trim().toLowerCase().replace(/\s+/g,' ');
      if(prompts.has(prompt))throw new Error(`${entry.title}: duplicate question ${q.id}`);
      prompts.add(prompt);answers[q.answerIndex]++;if(q.code)snippets++;
    }
    if(folder.name==='general'&&snippets<10)throw new Error(`${entry.title}: expected at least 10 code or command snippets.`);
    if(answers.some((n,i)=>n<expectedAnswers[i]*0.6||n>expectedAnswers[i]*1.4))throw new Error(`${entry.title}: answer positions are too imbalanced.`);
    if(Object.values(focuses).some(n=>n===0))throw new Error(`${entry.title}: both focus categories need questions.`);
    count+=quiz.questions.length;quizzes++;
    console.log(`${folder.name}/${entry.id}: ${quiz.questions.length} questions, ${snippets} exercise snippets, ${focuses.fundamentals} fundamentals / ${focuses.scenarios} scenarios`);
  }
  if(folder.name==='general'){
    const legacy=validateCatalog(JSON.parse(await readFile(new URL('catalog.json',root),'utf8')));
    const resolved=(data,base)=>data.quizzes.map(q=>({...q,url:new URL(q.url,base).href}));
    assert.deepEqual(resolved(legacy,new URL('catalog.json',root)),resolved(catalog,file),'Root compatibility catalog must match general.');
  }
}
if(!catalogs)throw new Error('No collection catalogs found.');
console.log(`Validated ${catalogs} catalogs, ${quizzes} quizzes and ${count} questions.`);
