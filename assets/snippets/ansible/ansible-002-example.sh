#!/usr/bin/env bash
set -euo pipefail
cat > inventory.ini <<'INI'
[web]
app1
[database]
db1
INI
ansible-inventory -i inventory.ini --graph all
# all contains every inventory host, including both groups.
