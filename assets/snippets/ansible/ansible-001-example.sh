#!/usr/bin/env bash
set -euo pipefail
cat > inventory.ini <<'INI'
[web]
app1
app2
[database]
db1
INI
ansible-inventory -i inventory.ini --graph web
# web contains app1 and app2, not db1.
