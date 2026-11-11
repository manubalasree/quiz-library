# Answer-reference snippet library

100 examples: one for each of the 50 Kubernetes and 50 Terraform questions. These examples appear **after answering**, beneath the explanation, and in missed-answer review. Each includes a short reading guide and a link to official documentation.

## Source of truth

- `index.json`: stable ID, topic, title, language, source file, reading guide, official reference, and QA assertions.
- `kubernetes/`: 36 complete YAML manifest examples and 14 shell examples.
- `terraform/`: 34 Terraform configuration examples and 16 shell examples.
- `fixtures/modules/`: small companion modules for local-module and provider-alias examples. They are test context, not infrastructure to deploy.
- `library.json`: generated browser bundle. Never edit it directly.

Each quiz declares `"snippetsUrl": "../assets/snippets/library.json"`. Each question references an `exampleId`, for example `kubernetes-045-example` for LimitRange. Examples stay out of question text and can be checked or revised independently. They do not affect the existing question identity or saved study progress.

## Independent QA

Requirements: Node.js 22+, Terraform 1.16.5 (the CI baseline), bash, and kubeconform 0.7.0 on PATH. Set `KUBECONFORM_BIN` if it is installed elsewhere.

```sh
npm ci --ignore-scripts
npm run snippets:build  # after editing a source file or its metadata
npm test
npm run snippets:check
npm run snippets:qa
```

The QA command works without running the quiz app or signing in. It:

1. Rejects invalid metadata, duplicate IDs/files, unregistered assets, missing references, cross-topic links, malformed YAML, and stale generated output.
2. Checks selected teaching invariants, including the LimitRange defaults and bounds.
3. Validates all 42 Kubernetes objects in 36 YAML assets using kubeconform strict schemas for **Kubernetes 1.34.0**, with no skipped kinds.
4. Runs `terraform fmt -check` and `terraform validate` on all 34 isolated Terraform configurations. The six AWS examples and provider-constraint example use the pinned AWS 6.21.0 provider. Dependencies are initialized with `-backend=false` in temporary folders.
5. Runs **15 Terraform plan-based behavior checks**, including list/map expressions, instance keys, module outputs, CIDR math, and rejection of zero replicas.
6. Syntax-checks all 30 shell examples with `bash -n` without executing them.

Terraform checks do not apply resources. No cloud credentials, live backend, or Kubernetes cluster are needed. Network access is required to obtain schemas and provider dependencies. Temporary provider/configuration files are removed afterward.

## Editing and review

Edit the source asset and its note together, add or update assertions, rebuild, then run the checks. `npm run validate` also validates all quizzes and their generated snippet bundle. GitHub Actions runs content validation and **Independent snippet QA** as separate jobs on pushes and pull requests.

Static validation does **not** establish that a snippet is suitable for a specific live cluster/account. Image availability, namespace existence, storage provisioners, CNI enforcement, RBAC, cloud IDs, permissions, and application behavior depend on the environment. Shell examples include maintenance/state-changing operations for illustration and are not run by QA. An editorial review must still check that each example teaches the associated answer accurately; successful parsing alone is insufficient.

The first full QA run passed: 42/42 Kubernetes objects, 34/34 Terraform configurations, 30/30 shell examples, and 15/15 behavior checks. The sample commands and configurations were not applied.
