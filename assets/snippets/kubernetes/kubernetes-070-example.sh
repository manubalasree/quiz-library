kubectl get deployment rollout-lab -n virtmicro-lab
kubectl get replicasets -n virtmicro-lab -l app=rollout-lab
kubectl get pods -n virtmicro-lab -l app=rollout-lab -o custom-columns=NAME:.metadata.name,IMAGE:.spec.containers[0].image
kubectl describe deployment rollout-lab -n virtmicro-lab
