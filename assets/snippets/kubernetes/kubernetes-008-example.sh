kubectl get service web -n demo -o yaml
kubectl get pods -n demo -l app=web --show-labels
kubectl get endpointslices -n demo -l kubernetes.io/service-name=web
