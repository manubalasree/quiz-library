kubectl get deployment rollout-lab -n interview-lab -o jsonpath='{.spec.template.spec.containers[*].name}{"\n"}'
# Updates the named container and starts a rollout:
kubectl set image deployment/rollout-lab web=nginx:stable-alpine -n interview-lab
