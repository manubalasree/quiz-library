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
  count += quiz.questions.length;
  console.log(`${entry.title}: ${quiz.questions.length} valid questions`);
}
console.log(`Validated ${catalog.quizzes.length} quizzes and ${count} questions.`);
