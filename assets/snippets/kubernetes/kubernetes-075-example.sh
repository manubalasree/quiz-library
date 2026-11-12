kubectl describe deployment web -n demo
kubectl get replicasets -n demo -l app=web
# Replace this example with the actual current ReplicaSet name.
kubectl describe replicaset web-example -n demo
