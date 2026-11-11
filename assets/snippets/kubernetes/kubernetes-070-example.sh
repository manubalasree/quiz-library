kubectl get deployment rollout-lab -n interview-lab
kubectl get replicasets -n interview-lab -l app=rollout-lab
kubectl get pods -n interview-lab -l app=rollout-lab -o custom-columns=NAME:.metadata.name,IMAGE:.spec.containers[0].image
kubectl describe deployment rollout-lab -n interview-lab
