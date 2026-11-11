kubectl get pod cpu-pending -n interview-lab -o jsonpath='{.metadata.ownerReferences}'
# For this standalone lab Pod, no controller owner reference is expected.
# After deleting it, explicitly reapply the corrected Pod manifest.
