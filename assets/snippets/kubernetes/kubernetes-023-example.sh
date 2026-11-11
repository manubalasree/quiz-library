kubectl get pods -n demo -l app=web
kubectl describe pod web-abc -n demo
kubectl get endpointslices -n demo -l kubernetes.io/service-name=web -o yaml
