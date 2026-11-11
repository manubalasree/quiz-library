kubectl get nodes -o custom-columns=NAME:.metadata.name,CPU:.status.allocatable.cpu
kubectl describe nodes
