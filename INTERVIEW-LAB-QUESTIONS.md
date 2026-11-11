# Kubernetes interview-lab question mapping

Questions `kubernetes-051` through `kubernetes-074` adapt the user-provided standalone `kubernetes-interview-lab.html` into 24 MCQs. Each includes a separate answer-reference asset and an official documentation link. Reference commands are not executed by snippet QA.

| Questions | Lab coverage |
| --- | --- |
| 051–056 | CPU quantities, admission rejection versus scheduler failure, decisive scheduling evidence, per-node capacity, standalone Pod ownership, and verifying a corrected request |
| 057–062 | Hostname selection, exact toleration matching, NoSchedule versus NoExecute, Deployment Pod-template placement, and node-taint cleanup |
| 063–073 | Healthy rollout baseline, surge and availability, precise image-pull errors, unavailable application logs, progress deadlines versus client timeouts, surge capacity, old versus updated replicas, Service endpoints, repair verification, and container names |
| 074 | Checking existing control-plane taints before beginning the lab |

Original question IDs 001–050 and their content are retained. The new answers are balanced across A–D (six each). Existing spaced-repetition card identities remain unchanged. Because the topic bank has grown, a saved round may show **Updated quiz available**; start the updated round to include the new questions.

Primary references: [Resource requests and scheduling](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/), [Assigning Pods to Nodes](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/), [Taints and tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/), [Deployment rollout behavior](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), and [Service endpoints](https://kubernetes.io/docs/concepts/services-networking/service/).
