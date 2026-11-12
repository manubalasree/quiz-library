kubectl describe pod web-example -n demo
kubectl get pvc data -n demo -o yaml
# Use the actual PV named by the bound PVC.
kubectl get pv pv-example -o yaml
kubectl get nodes -L topology.kubernetes.io/zone
