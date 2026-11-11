kubectl get service rollout-lab -n interview-lab -o yaml
kubectl get endpointslices -n interview-lab -l kubernetes.io/service-name=rollout-lab -o yaml
kubectl get pods -n interview-lab -l app=rollout-lab -o wide
