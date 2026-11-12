kubectl get pod web-example -n demo -o jsonpath='{.spec.volumes[*].persistentVolumeClaim.claimName}{"\n"}'
kubectl get pvc data -n demo -o jsonpath='{.spec.volumeName}{"\n"}'
kubectl get pv pv-example -o jsonpath='{.spec.nodeAffinity}{"\n"}'
kubectl get nodes --show-labels
