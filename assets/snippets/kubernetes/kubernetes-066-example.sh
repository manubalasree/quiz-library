# Use the actual new failing Pod name.
kubectl get pod rollout-lab-new-example -n virtmicro-lab -o yaml
kubectl describe pod rollout-lab-new-example -n virtmicro-lab
