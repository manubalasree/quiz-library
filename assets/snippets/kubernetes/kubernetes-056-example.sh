kubectl wait --for=condition=Ready pod/cpu-pending -n virtmicro-lab --timeout=120s
kubectl get pod cpu-pending -n virtmicro-lab -o wide
kubectl describe pod cpu-pending -n virtmicro-lab
