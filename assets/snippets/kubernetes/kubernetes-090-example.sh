kubectl describe pod web-example -n demo
kubectl describe node worker-1
kubectl get node worker-1 -o jsonpath='{.status.conditions}{"\n"}'
