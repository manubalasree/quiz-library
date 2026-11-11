kubectl get pod cpu-pending -n interview-lab -o wide
kubectl describe pod cpu-pending -n interview-lab
kubectl get events -n interview-lab --field-selector involvedObject.name=cpu-pending
