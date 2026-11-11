# Replace colima with the node used in the lab.
kubectl taint node colima interview-lab/dedicated:NoSchedule-
kubectl describe node colima
# Delete the practice namespace only after checking its contents.
# kubectl delete namespace interview-lab
