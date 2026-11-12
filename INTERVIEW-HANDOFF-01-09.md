# Interview discussion 1–9: coverage reconciliation

Source: the user-provided `kubernetes-quiz-handoff-questions-01-09.md` and its companion list `kubernetes-interview-questions.md`. The discussion notes, corrections, and follow-up explanations were used as reference material, rather than copying the original open-ended prompts into an MCQ bank.

The existing Kubernetes questions 001–074 are retained without content changes. Existing basic resource, taint, and rollout questions are reused in the mapping below. **24 additional MCQs**, 075–098, fill the missing scenarios. Each has an explanation and its own source asset in the current `exampleId` / `snippetsUrl` format. New answer positions are balanced six each across A–D.

## Mapping

Numbers in the quiz columns refer to `kubernetes-NNN` IDs, not positions in a shuffled round.

| Original interview discussion | Existing coverage reused | Added coverage |
| --- | --- | --- |
| 1. Pending diagnosis, Events, controller chain, previous logs | 003–004, 052–053, 065–066, 069 | 075: ReplicaSet FailedCreate before a Pod exists; 076: Pending after node assignment versus unscheduled |
| 2. No placement across five workers; EBS topology | 006, 030, 054, 057, 069, 074 | 077: EBS AZ restriction; 078: Pod → PVC → PV affinity → node labels; 079: WaitForFirstConsumer and existing-disk limits |
| 3. CPU placement, requests, limits, quotas, live usage | 013, 015, 044, 051–054 | 080: CPU throttling versus kill; 081: above-request CPU use and contention; 082: nodeName bypasses the normal scheduler |
| 4. Require one specific worker | 033–034, 057, 061 | 083: replacement remains Pending when its required unique node is unavailable |
| 5. SSD node placement versus persistent storage | 034 | 084: preferred affinity is not strict exclusion; 085: StorageClass, PVC, and mount remain separate from node labels |
| 6. Prod/dev architecture, releases, runtime boundaries | 009, 026–027, 038–039 provide individual controls | 086: taints are not a complete security boundary; 087: branch protection versus runtime isolation; 088: scoped identities and promotion of the same artifact under the chosen separate-cluster/account design |
| 7. Resolve a taint-blocked Pod | 058, 074 | 089: respect intentional GPU-pool reservations; 090: investigate health-related taints instead of blindly bypassing them |
| 8. Monitoring pools and migration | 036, 059–060 | 091: combine pool selection with toleration and authorization; 092: controlled migration and uncordon; 093: DaemonSet/static-Pod drain exceptions |
| 9. Node versus AZ topology spread | 034 explains label selection | 094: hostname topology key; 095: maxSkew is not one-Pod-per-node; 096: ScheduleAnyway versus DoNotSchedule; 097: running Pods versus template-rollout replacements; 098: combine node and zone distribution goals |

## Corrections retained

- An unscheduled Pod has no assigned node. Pending can also describe a scheduled Pod still preparing containers or storage.
- A ReplicaSet can fail to create a Pod, so scheduler Events are not always the next available evidence source.
- Previous logs refer to the prior terminated instance of a container in the same Pod, not a previous Deployment revision.
- Requests inform ordinary scheduling; current CPU usage does not replace the request budget. CPU limits normally throttle consumption rather than OOM-kill a container.
- A toleration permits placement past a matching taint; it does not select the node. Required placement still applies to replacement Pods.
- PV topology affects any consuming workload. WaitForFirstConsumer does not move an existing disk between AZs.
- SSD node labels do not provision or mount SSD-backed persistent storage.
- Separate prod/dev clusters and accounts are the stated architectural preference, not a claim that every shared-cluster design is invalid. Release and runtime controls address different risks.
- NoSchedule does not evict existing Pods. Drain must account for budgets, replacement capacity, storage, DaemonSets, and static Pods.
- maxSkew=1 is a balance bound over eligible domains, not a universal single-replica-per-node guarantee.
- Scheduling constraints do not live-migrate running Pods. A Deployment template edit can trigger a rollout, creating replacements under the new rules; an extra restart is not inherently required.

## Scope boundary

Only discussions **1–9** were authored from this handoff. Questions 10–20 from the original list were not newly imported. Existing quiz questions about anti-affinity and other overlapping fundamentals remain as they were.

## Assets and QA

Editable snippets are under `assets/snippets/kubernetes/`; metadata and selected invariants are in `assets/snippets/index.json`. Rebuild `assets/snippets/library.json` after source changes. The new examples add 12 YAML files (14 objects) and 12 shell files. All now use the existing independent schema, syntax, metadata, and link checks; the additional interview-handoff tests check relational teaching details that API schemas alone do not establish.

The AWS EBS reference uses the exact official `docs.aws.amazon.com` host, added to the metadata allowlist alongside Kubernetes and HashiCorp documentation. Lookalike hosts are rejected. AWS-specific examples require the actual EBS CSI driver and environment; no cloud resources or sample maintenance commands are executed by QA.

Run `npm test`, `npm run validate`, and `npm run snippets:qa`. The generated bundle and topic count are served by the app without an application redeployment. The topic now contains **98 questions**, and the content repository contains **438 questions** overall. The bank change may prompt signed-in learners to start an updated round; existing card IDs and review history remain intact.

## Primary references

- [Pod debugging](https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/)
- [Resources, requests, and limits](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)
- [Assigning Pods to nodes](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/)
- [PV node affinity](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#node-affinity)
- [Volume binding mode](https://kubernetes.io/docs/concepts/storage/storage-classes/#volume-binding-mode)
- [EBS attachment and AZ restriction](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-attaching-volume.html)
- [Multi-tenancy](https://kubernetes.io/docs/concepts/security/multi-tenancy/)
- [Taints and tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/)
- [Safely draining a node](https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/)
- [Topology spread constraints](https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/)
