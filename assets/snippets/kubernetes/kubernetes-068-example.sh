kubectl rollout status deployment/rollout-lab -n interview-lab --timeout=30s
kubectl get deployment rollout-lab -n interview-lab -o jsonpath='{.spec.progressDeadlineSeconds}{"\n"}'
kubectl describe deployment rollout-lab -n interview-lab
