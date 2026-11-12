#!/usr/bin/env bash
set -euo pipefail
# Limit parallel host workers for this invocation.
ansible-playbook -i inventory.ini site.yml --forks 10
# serial, throttle, and strategy can further limit concurrency.
