kubectl rollout history deployment/web -n demo
# Changes the Pod template to a retained previous revision:
kubectl rollout undo deployment/web -n demo
kubectl rollout status deployment/web -n demo
