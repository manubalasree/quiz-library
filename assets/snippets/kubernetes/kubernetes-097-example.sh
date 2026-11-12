# After a reviewed Deployment Pod-template change:
kubectl rollout status deployment/node-spread-demo --timeout=180s
kubectl get pods -l app=node-spread-demo -o wide
kubectl describe deployment node-spread-demo
