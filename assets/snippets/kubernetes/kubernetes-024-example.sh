# Run in an existing diagnostic Pod with nslookup installed.
kubectl exec dns-tools -n frontend -- nslookup api.backend.svc.cluster.local
