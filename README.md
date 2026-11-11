# Quiz Library

The public JSON content repository for [Quiz Practice Lab](https://quiz-practice-lab.vercel.app). App code lives separately in [quiz-practice-lab](https://github.com/manubalasree/quiz-practice-lab).

## Update an existing quiz

Edit its file under `quizzes/` and commit to `main`. The app fetches this JSON when a topic is opened. No Vercel deployment is needed. A round already in progress keeps its questions. GitHub raw content may cache updates briefly.

## Add a quiz tile

1. Add a quiz JSON file under `quizzes/` using the format below.
2. Add an entry to `catalog.json` with a unique `id`, tile `title`, optional `description`, and relative `url`.
3. Commit both files to `main`. Reload the app to fetch the updated tile list.

Catalog entry:

```json
{"id":"python","title":"Python","description":"Python fundamentals","url":"quizzes/python.json"}
```

Quiz file:

```json
{
  "version": 1,
  "title": "Python Fundamentals",
  "questions": [
    {
      "id": "python-001",
      "topic": "Collections",
      "question": "Which built-in type is immutable?",
      "options": ["list", "dict", "set", "tuple"],
      "answerIndex": 3,
      "explanation": "A tuple cannot have its elements reassigned after creation."
    }
  ]
}
```

Each question requires a unique ID, nonempty topic/question/explanation, four distinct options, and `answerIndex` 0–3 (A=0, B=1, C=2, D=3). Preserve `version: 1`. Any subject is supported.

## Validate

```sh
node scripts/validate.mjs
```

Requires Node.js 22+. GitHub Actions also checks every push and pull request. These checks report invalid JSON; protect `main` with required checks if you want to enforce validation before updates become readable by the app.

## Catalog URL

https://raw.githubusercontent.com/manubalasree/quiz-library/main/catalog.json

This repository is public so browsers can load it without credentials. It contains practice questions and explanations only. Do not add secrets or private material.

## Current coverage

NetApp ONTAP and VMware vSphere each contain 70 questions; Kubernetes, Linux, Git, Ansible, and Terraform each contain 50 (390 total). The banks mix fundamentals, troubleshooting, and code-reading exercises. Answer positions are balanced across A–D. Explanations describe why the selected answer is correct and call out relevant limitations.

For a snippet question, add optional `code` and `language` fields alongside `question`:

```json
{
  "code": "resources:\n  requests:\n    cpu: \"250m\"",
  "language": "yaml"
}
```

These are additional question fields, not a complete question object. Code strings use escaped newlines and preserve indentation in the app. Snippets are exercises or configuration fragments; do not assume every fragment is a complete deployable configuration.

The library check enforces at least 50 questions and 10 snippets per bank, unique prompts, balanced answer positions, and the JSON schema contract. See [SOURCES.md](SOURCES.md) for official references used during editorial review and further reading.


NetApp and VMware are organized as fundamentals-to-troubleshooting refreshes. See [the storage and virtualization study path](STORAGE-VIRTUALIZATION-STUDY.md) for the learning sequence and key distinctions to rehearse aloud.

## Answer-reference assets

Kubernetes and Terraform now have one linked answer example per question (100 total). Source YAML, HCL, and shell files live under [`assets/snippets`](assets/snippets/README.md), with a separately runnable QA suite and a generated JSON bundle for the app. The examples show after answering; existing question code remains the exercise shown before answering.

After editing an example: `npm run snippets:build`, `npm test`, `npm run validate`, and `npm run snippets:qa`. See the asset README for required validators and the scope of each check.
