#!/usr/bin/env bash
set -euo pipefail
cat > inventory.ini <<'INI'
[web]
app1
app2
[production]
app2
db1
INI
ansible 'web:&production' -i inventory.ini --list-hosts
# Only app2 is selected. --list-hosts does not connect.
