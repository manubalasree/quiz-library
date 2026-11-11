kubectl describe pod web-abc -n demo
kubectl get pod web-abc -n demo -o jsonpath='{.spec.containers[*].image}'
kubectl get pod web-abc -n demo -o jsonpath='{.spec.imagePullSecrets[*].name}'
