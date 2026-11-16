# Quiz Library

The public JSON content repository for [Quiz Practice Lab](https://quiz-practice-lab.vercel.app). App code lives separately in [quiz-practice-lab](https://github.com/manubalasree/quiz-practice-lab).

## Update an existing quiz

Edit its file under `quizzes/general/` and commit to `main`. The app fetches this JSON when a topic is opened. No Vercel deployment is needed. A round already in progress keeps its questions. GitHub raw content may cache updates briefly.

## Add a quiz tile

1. Add a quiz JSON file under `quizzes/general/` using the format below.
2. Add an entry to `catalog/general/catalog.json` with a unique `id`, tile `title`, optional `description`, and relative `url`.
3. Commit both files to `main`. Reload the app to fetch the updated tile list.

Catalog entry:

```json
{"id":"python","title":"Python","description":"Python fundamentals","url":"../../quizzes/general/python.json"}
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

Each question requires a unique ID, nonempty topic/question/explanation, three or four distinct options, and a valid zero-based `answerIndex` (keyboard A/S/D/F selects positions 0/1/2/3). Preserve `version: 1`. Any subject is supported.

## Validate

```sh
node scripts/validate.mjs
```

Requires Node.js 22+. GitHub Actions also checks every push and pull request. These checks report invalid JSON; protect `main` with required checks if you want to enforce validation before updates become readable by the app.

## Collection layout

```text
catalog/
  general/catalog.json
  tam-prep/README.md          # reserved; personal material is not public
quizzes/
  general/                   # active and retired general question banks
  tam-prep/README.md          # reserved; use local import for personal prep
assets/snippets/              # shared answer-reference library
catalog.json                  # compatibility catalog for existing app settings
```

A catalog resolves each quiz URL relative to **its own location**. For example, `catalog/general/catalog.json` uses `../../quizzes/general/kubernetes.json`. Those question files use `../../assets/snippets/library.json` for shared answer examples. Catalog and quiz collection folder names must match.

## Catalog URL

General collection: https://raw.githubusercontent.com/manubalasree/quiz-library/main/catalog/general/catalog.json

The original https://raw.githubusercontent.com/manubalasree/quiz-library/main/catalog.json remains a checked compatibility catalog pointing at the same general questions. The app keeps that default URL so existing saved library identities and progress remain usable. Old direct `quizzes/<topic>.json` paths have moved to `quizzes/general/<topic>.json`.

The TAM preparation collection is reserved only. This repository does not contain personal TAM questions. Use **Import quiz JSON** in [Quest](https://quest.virtmicro.com/) to practice those from your device.

This repository is public so browsers can load it without credentials. It contains practice questions and explanations only. Do not add secrets or private material.

## Current coverage

The general catalog contains Kubernetes (98) plus Linux, Git, Ansible, and Terraform (50 each), for 298 questions. NetApp and VMware are retired from the catalog; historical question files and learner records are retained. The banks mix fundamentals, troubleshooting, and code-reading exercises. Answer positions are balanced across A–D. Explanations describe why the selected answer is correct and call out relevant limitations.

For a snippet question, add optional `code` and `language` fields alongside `question`:

```json
{
  "code": "resources:\n  requests:\n    cpu: \"250m\"",
  "language": "yaml"
}
```

These are additional question fields, not a complete question object. Code strings use escaped newlines and preserve indentation in the app. Snippets are exercises or configuration fragments; do not assume every fragment is a complete deployable configuration.

The library check enforces at least 50 questions and 10 snippets per bank, unique prompts, balanced answer positions, and the JSON schema contract. See [SOURCES.md](SOURCES.md) for official references used during editorial review and further reading.


The former storage and virtualization study path remains as an archived learning reference; those subjects are no longer part of the active catalog.

## Answer-reference assets

Kubernetes, Terraform, and Ansible have one linked answer example per question (198 total). Source YAML, HCL, and shell files live under [`assets/snippets`](assets/snippets/README.md), with a separately runnable QA suite and a generated JSON bundle for the app. The examples show after answering; existing question code remains the exercise shown before answering.

After editing an example: `npm run snippets:build`, `npm test`, `npm run validate`, and `npm run snippets:qa`. For the Ansible-only syntax and local behavior suite, run `npm run snippets:ansible`. See the asset README for required validators and the scope of each check.

Kubernetes questions 051–074 adapt the standalone interview lab into scenario MCQs on admission/scheduling, taints, failed image rollouts, evidence-based recovery, and scoped cleanup. See [INTERVIEW-LAB-QUESTIONS.md](INTERVIEW-LAB-QUESTIONS.md).

Interview questions 1–9 and their discussion corrections are reconciled with existing coverage in [INTERVIEW-HANDOFF-01-09.md](INTERVIEW-HANDOFF-01-09.md). Questions 075–098 add missing scenarios without duplicating the existing 74 items.

## Practice focus metadata

Every maintained question has `"focus": "fundamentals"` or `"focus": "scenarios"`. Fundamentals covers concepts, terminology, commands, and basic configuration principles; Scenarios covers applied diagnosis, code/output interpretation, and operational decisions. This is an editorial learning focus, not a difficulty grade or FSRS recall rating. Mixed is an app preference that includes all questions; it is not a stored question tag. Existing prompts, IDs, answers, explanations, and example links are retained. The validator requires explicit focus metadata in this repository. Legacy/external libraries without these tags remain usable in the app’s Mixed mode.

The [12 November focus audit](PRACTICE-FOCUS-REVIEW.md) records the rubric, per-topic category counts, and all reclassifications. Both filters are populated for every active topic. A code block by itself does not make a question a scenario.
