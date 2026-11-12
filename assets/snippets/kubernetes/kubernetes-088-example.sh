# Read-only preflight examples; use distinct, configured deployment identities.
kubectl --context=dev auth can-i patch deployments -n app
kubectl --context=production auth can-i patch deployments -n app
kubectl --context=production get deployment web -n app -o jsonpath='{.spec.template.spec.containers[*].image}{"\n"}'
