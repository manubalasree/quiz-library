kubectl wait --for=condition=Ready pod/cpu-pending -n interview-lab --timeout=120s
kubectl get pod cpu-pending -n interview-lab -o wide
kubectl describe pod cpu-pending -n interview-lab
