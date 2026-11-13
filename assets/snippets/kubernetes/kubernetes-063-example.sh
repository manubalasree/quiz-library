kubectl rollout status deployment/rollout-lab -n virtmicro-lab --timeout=180s
kubectl get deployment,replicaset,pods -n virtmicro-lab -l app=rollout-lab
