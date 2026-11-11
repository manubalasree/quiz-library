# Maintenance example: these commands change node availability.
kubectl cordon worker-1
kubectl drain worker-1 --ignore-daemonsets
# After maintenance:
kubectl uncordon worker-1
