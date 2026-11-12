# Maintenance example: first verify capacity, policies, and disruption budgets.
kubectl get pdb -A
kubectl drain monitoring-1 --ignore-daemonsets --timeout=5m
# Verify replacement workload health and placement before returning the node.
kubectl get pods -A -o wide
kubectl uncordon monitoring-1
