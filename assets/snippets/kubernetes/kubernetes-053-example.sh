kubectl get pod cpu-pending -n virtmicro-lab -o wide
kubectl describe pod cpu-pending -n virtmicro-lab
kubectl get events -n virtmicro-lab --field-selector involvedObject.name=cpu-pending
