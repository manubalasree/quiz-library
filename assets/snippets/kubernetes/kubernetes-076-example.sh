kubectl get pod web-example -n demo -o wide
kubectl describe pod web-example -n demo
kubectl get pod web-example -n demo -o jsonpath='{.status.conditions}{"\n"}'
