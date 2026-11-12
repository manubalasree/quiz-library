kubectl get pods -A -o wide --field-selector spec.nodeName=monitoring-1
# Inspect the remaining Pod type instead of assuming drain must remove it.
kubectl get pod remaining-pod -n kube-system -o yaml
