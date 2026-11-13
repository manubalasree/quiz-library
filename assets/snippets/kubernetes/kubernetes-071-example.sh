kubectl get service rollout-lab -n virtmicro-lab -o yaml
kubectl get endpointslices -n virtmicro-lab -l kubernetes.io/service-name=rollout-lab -o yaml
kubectl get pods -n virtmicro-lab -l app=rollout-lab -o wide
