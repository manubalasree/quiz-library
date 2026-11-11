kubectl describe pod web-abc -n demo
kubectl logs web-abc -n demo -c web --previous
kubectl top pod web-abc -n demo --containers
