kubectl rollout status deployment/rollout-lab -n virtmicro-lab --timeout=180s
kubectl get deployment,replicaset,pods -n virtmicro-lab -l app=rollout-lab
kubectl get pods -n virtmicro-lab -l app=rollout-lab -o custom-columns=NAME:.metadata.name,IMAGE:.spec.containers[0].image
kubectl get endpointslices -n virtmicro-lab -l kubernetes.io/service-name=rollout-lab
