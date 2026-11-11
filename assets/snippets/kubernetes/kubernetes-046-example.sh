# Changes the Pod by adding an ephemeral debug container.
kubectl debug web-abc -n demo -it --image=busybox:1.37 --target=web
