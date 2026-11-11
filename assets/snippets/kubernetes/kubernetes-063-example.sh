kubectl rollout status deployment/rollout-lab -n interview-lab --timeout=180s
kubectl get deployment,replicaset,pods -n interview-lab -l app=rollout-lab
