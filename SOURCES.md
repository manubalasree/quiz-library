# Editorial references

Reviewed 2026-11-03. Questions and explanations are original practice material. These official references support fact-checking and further study. Linux shell questions specify Bash or GNU behavior where it matters; systemd questions assume a systemd-based Linux system. Configuration snippets are focused fragments unless described as complete examples.

## Kubernetes

- [Concepts and architecture](https://kubernetes.io/docs/concepts/overview/)
- [Container resource management](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)
- [Startup, liveness, and readiness probes](https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/)
- [Services](https://kubernetes.io/docs/concepts/services-networking/service/)
- [NetworkPolicy](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- [Persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
- [Pod disruption budgets](https://kubernetes.io/docs/tasks/run-application/configure-pdb/)
- [RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)

## Linux

- [GNU Bash reference](https://www.gnu.org/software/bash/manual/bash.html)
- [Bash quoting](https://www.gnu.org/software/bash/manual/html_node/Quoting.html)
- [Bash redirections](https://www.gnu.org/software/bash/manual/html_node/Redirections.html)
- [GNU Coreutils](https://www.gnu.org/software/coreutils/manual/coreutils.html)
- [GNU Grep](https://www.gnu.org/software/grep/manual/grep.html)
- [systemctl](https://www.freedesktop.org/software/systemd/man/latest/systemctl.html)
- [journalctl](https://www.freedesktop.org/software/systemd/man/latest/journalctl.html)
- [Linux man-pages project](https://www.kernel.org/doc/man-pages/)

## Git

- [Command reference](https://git-scm.com/docs)
- [Rebase](https://git-scm.com/docs/git-rebase)
- [Revert](https://git-scm.com/docs/git-revert)
- [Push and leases](https://git-scm.com/docs/git-push)
- [Stash](https://git-scm.com/docs/git-stash)
- [Reset](https://git-scm.com/docs/git-reset)
- [Restore](https://git-scm.com/docs/git-restore)

## Ansible

- [Playbook guide](https://docs.ansible.com/ansible/latest/playbook_guide/index.html)
- [Conditionals](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_conditionals.html)
- [Handlers](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_handlers.html)
- [Error handling](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_error_handling.html)
- [Strategies, serial, throttle, and run_once](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_strategies.html)
- [Delegation](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_delegation.html)
- [Reuse, imports, and includes](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_reuse.html)
- [Check and diff modes](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_checkmode.html)

## Terraform

- [Language reference](https://developer.hashicorp.com/terraform/language)
- [for_each](https://developer.hashicorp.com/terraform/language/meta-arguments/for_each)
- [Lifecycle](https://developer.hashicorp.com/terraform/language/meta-arguments/lifecycle)
- [State](https://developer.hashicorp.com/terraform/language/state)
- [Sensitive data](https://developer.hashicorp.com/terraform/language/manage-sensitive-data)
- [Imports](https://developer.hashicorp.com/terraform/language/import)
- [CLI commands](https://developer.hashicorp.com/terraform/cli/commands)

## NetApp ONTAP

The NetApp bank primarily teaches conventional ONTAP AFF/FAS fundamentals. It explicitly calls out ASA r2 differences instead of treating every platform personality or ONTAP version as identical.

- [ONTAP storage concepts](https://docs.netapp.com/us-en/ontap/concepts/)
- [Local tiers and aggregates](https://docs.netapp.com/us-en/ontap/disks-aggregates/)
- [HA pairs, takeover, and giveback](https://docs.netapp.com/us-en/ontap/high-availability/)
- [Snapshot technology](https://docs.netapp.com/us-en/ontap/concepts/snapshot-copies-concept.html)
- [SAN igroups](https://docs.netapp.com/us-en/ontap/san-admin/igroups-concept.html)
- [SAN provisioning](https://docs.netapp.com/us-en/ontap/volumes/san-volumes-concept.html)
- [Volume inspection command](https://docs.netapp.com/us-en/ontap-cli/volume-show.html)
- [Export-policy rule inspection](https://docs.netapp.com/us-en/ontap-cli-9121/vserver-export-policy-rule-show.html)
- [Replication inspection command](https://docs.netapp.com/us-en/ontap-cli/snapmirror-show.html)
- [Snapshot and capacity reporting](https://docs.netapp.com/us-en/ontap/volumes/commands-display-space-usage-reference.html)
- [ASA r2 differences](https://docs.netapp.com/us-en/asa-r2/learn-more/hardware-comparison.html)
- [vSphere with ONTAP SAN datastores](https://docs.netapp.com/us-en/ontap-apps-dbs/vmware/vmware-vsphere-datastores-san.html)

## VMware vSphere

The VMware bank teaches durable host/guest, compute, networking, storage, and recovery concepts. Exact migration prerequisites, limits, licensing, supported builds, and patch procedures must be checked for the installed release rather than learned as timeless facts.

- [HA restart conditions](https://knowledge.broadcom.com/external/article/316525)
- [Snapshot usage and backup limitations](https://knowledge.broadcom.com/external/article/318825/best-practices-for-using-vmware-snapshot.html)
- [VM performance troubleshooting](https://knowledge.broadcom.com/external/article/304594/troubleshooting-esxesxi-virtual-machine.html)
- [VM CPU and memory resource limits](https://knowledge.broadcom.com/external/article/326270/impact-of-virtual-machine-memory-and-cpu.html)
- [EVC and processor compatibility](https://knowledge.broadcom.com/external/article/324991)
- [ESXTOP metrics and latency](https://knowledge.broadcom.com/external/article/382249/using-esxtop-and-interpreting-esxtop-sta.html)
- [APD and PDL](https://knowledge.broadcom.com/external/article?articleId=318712)
- [LUN path inspection](https://knowledge.broadcom.com/external/article/311803/obtaining-lun-pathing-information-for-es.html)
- [Distributed-switch recovery and vCenter dependency](https://knowledge.broadcom.com/external/article/442803/vcenter-network-connectivity-lost-after.html)
- [ESXCLI storage reference](https://developer.broadcom.com/xapis/esxcli-command-reference/latest/namespace/esxcli_storage.html)
- [ESXCLI networking reference](https://developer.broadcom.com/xapis/esxcli-command-reference/latest/namespace/esxcli_network.html)
- [ESXCLI system reference](https://developer.broadcom.com/xapis/esxcli-command-reference/latest/namespace/esxcli_system.html)
- [PowerCLI Get-VM](https://developer.broadcom.com/powercli/latest/vmware.vimautomation.core/commands/get-vm)
