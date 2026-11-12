#!/usr/bin/env bash
set -euo pipefail
# Use your own sample file; keep real secrets outside the repository.
ansible-vault encrypt example-vars.yml
# A password prompt protects the file at rest.
ansible-playbook -i inventory.ini site.yml --ask-vault-pass
# Decrypted values still need no_log and careful output handling.
