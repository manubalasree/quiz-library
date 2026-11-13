kubectl get pods -n virtmicro-lab -l app=rollout-lab
# Replace the example name with the new failing Pod from the output.
kubectl describe pod rollout-lab-new-example -n virtmicro-lab
