# Changes one disposable lab node; replace its name first.
kubectl taint node colima interview-lab/dedicated=practice:NoSchedule
kubectl get pods -A -o wide
# Undo only the taint introduced above.
kubectl taint node colima interview-lab/dedicated:NoSchedule-
