export function validateQuiz(data) {
  const nonempty = value => typeof value === 'string' && value.trim().length > 0;
  if (!data || data.version !== 1 || !nonempty(data.title) ||
      !Array.isArray(data.questions) || data.questions.length === 0) {
    throw new Error('Expected a version 1 quiz with a title and at least one question.');
  }
  if (data.snippetsUrl !== undefined && !nonempty(data.snippetsUrl)) throw new Error('Invalid snippet library URL.');
  const ids = new Set();
  for (const [index, q] of data.questions.entries()) {
    if (!q || !nonempty(q.id) || ids.has(q.id) || !nonempty(q.topic) ||
        !nonempty(q.question) || !nonempty(q.explanation) ||
        (q.focus !== undefined && !['fundamentals','scenarios'].includes(q.focus)) ||
        (q.exampleId !== undefined && (!nonempty(q.exampleId) || !nonempty(data.snippetsUrl))) ||
        (q.code !== undefined && !nonempty(q.code)) ||
        (q.language !== undefined && (!nonempty(q.language) || !nonempty(q.code))) ||
        !Array.isArray(q.options) || ![3,4].includes(q.options.length) ||
        !q.options.every(nonempty) || new Set(q.options).size !== q.options.length ||
        !Number.isInteger(q.answerIndex) || q.answerIndex < 0 || q.answerIndex >= q.options.length) {
      throw new Error(`Invalid question at position ${index + 1}. Check its ID, text, three or four distinct options, and a valid answerIndex.`);
    }
    if(q.references!==undefined){
      if(!Array.isArray(q.references)||q.references.length>6)throw new Error(`Invalid references for ${q.id}.`);
      for(const ref of q.references){
        if(!ref||!nonempty(ref.title)||ref.title.length>160||typeof ref.url!=='string'||ref.url.length>2048)throw new Error(`Invalid reference for ${q.id}.`);
        let url;try{url=new URL(ref.url);}catch{throw new Error(`Invalid reference URL for ${q.id}.`);}
        if(url.protocol!=='https:'||url.username||url.password)throw new Error(`Use a public HTTPS reference for ${q.id}.`);
      }
    }
    ids.add(q.id);
  }
  return data;
}

export function validateCatalog(data) {
  if (!data || data.version !== 1 || typeof data.title !== 'string' || !data.title.trim() || !Array.isArray(data.quizzes) || !data.quizzes.length) throw new Error('Expected a version 1 library with a title and at least one quiz.');
  const ids = new Set();
  for (const quiz of data.quizzes) {
    if (!quiz || !['id', 'title', 'url'].every(key => typeof quiz[key] === 'string' && quiz[key].trim()) || ids.has(quiz.id) || (quiz.description !== undefined && typeof quiz.description !== 'string')) throw new Error('Each quiz needs a unique ID, title, and JSON URL.');
    ids.add(quiz.id);
  }
  return data;
}
