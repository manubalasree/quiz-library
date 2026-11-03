import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { validateQuiz, validateCatalog } from './validation.mjs';
const root = new URL('../', import.meta.url);
const catalog = validateCatalog(JSON.parse(await readFile(new URL('catalog.json', root), 'utf8')));
let count = 0;
for (const entry of catalog.quizzes) {
  const path = new URL(entry.url, root);
  if (path.protocol !== 'file:' || !fileURLToPath(path).startsWith(fileURLToPath(root))) throw new Error('Use repository-relative quiz paths.');
  const quiz = validateQuiz(JSON.parse(await readFile(path, 'utf8')));
  if (quiz.questions.length < 50) throw new Error(`${entry.title}: expected at least 50 questions.`);
  const prompts = new Set();
  const answers = [0, 0, 0, 0];
  let snippets = 0;
  for (const q of quiz.questions) {
    const prompt = q.question.trim().toLowerCase().replace(/\s+/g, ' ');
    if (prompts.has(prompt)) throw new Error(`${entry.title}: duplicate question ${q.id}`);
    prompts.add(prompt);
    answers[q.answerIndex]++;
    if (q.code) snippets++;
  }
  if (snippets < 10) throw new Error(`${entry.title}: expected at least 10 code or command snippets.`);
  if (answers.some(n => n < quiz.questions.length * 0.15 || n > quiz.questions.length * 0.35)) {
    throw new Error(`${entry.title}: answer positions are too imbalanced.`);
  }
  count += quiz.questions.length;
  console.log(`${entry.title}: ${quiz.questions.length} valid questions, ${snippets} snippets, answer distribution ${answers.join('/')}`);
}
console.log(`Validated ${catalog.quizzes.length} quizzes and ${count} questions.`);
