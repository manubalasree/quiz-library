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

### Cluster internals and networking expansion (questions 51–70)

- 51–53, 55–56: [Quorum and epsilon](https://docs.netapp.com/us-en/ontap/system-admin/quorum-epsilon-concept.html) and [Cluster HA and RDB quorum](https://kb.netapp.com/on-prem/ontap/Ontap_OS/OS-KBs/What_is_Cluster_HA_and_how_is_Epsilon_utilized_to_maintain_RDB_Quorum). The equal-partition exercise states its assumptions and does not equate quorum with universal data availability.
- 54, 60: [MHost RDB applications out of quorum](https://kb.netapp.com/on-prem/ontap/Ontap_OS/OS-KBs/Troubleshooting_Workflow__MHost_RDB_apps_out_of_quorum). Epsilon is not the ring primary/master.
- 57, 59: [VLDB update failure during volume move](https://docs.netapp.com/us-en/ontap-ems-9151/moveagent-swapvldb-events.html).
- 58: [Inspect cluster replication rings](https://docs.netapp.com/us-en/ontap/system-admin/display-status-cluster-replication-rings-task.html). The advanced command is a support-workflow inspection exercise, not database-repair guidance.
- 61: [Network architecture](https://docs.netapp.com/us-en/ontap/concepts/network-connectivity-concept.html) and [Platforms sharing physical cluster and HA Ethernet ports](https://kb.netapp.com/on-prem/ontap/OHW/OHW-KBs/What_AFF_ASA_and_FAS_platforms_use_shared_Cluster_and_HA_Ethernet_ports).
- 62–63: [Cluster connectivity diagnostic](https://docs.netapp.com/us-en/ontap-cli-9111/cluster-ping-cluster.html) and [Cluster networking and cabling guidance](https://docs.netapp.com/us-en/ontap/pdfs/fullsite-sidebar/ONTAP_9_documentation.pdf).
- 64: [Intercluster LIFs and peering](https://docs.netapp.com/us-en/ontap/peering/peering-basics-concept.html).
- 65: [LIF configuration concepts](https://docs.netapp.com/us-en/ontap/networking/configure_lifs_cluster_administrators_only_overview.html) and [NAS namespace and volume placement](https://docs.netapp.com/us-en/ontap/concepts/namespaces-junction-points-concept.html).
- 66, 68: [LIF migration prerequisites and node-scoped restrictions](https://docs.netapp.com/us-en/ontap/networking/migrate_a_lif.html).
- 67: [Home-port and auto-revert properties](https://docs.netapp.com/us-en/ontap/networking/create_a_lif.html).
- 69: [LIF service policies](https://docs.netapp.com/us-en/ontap/networking/lifs_and_service_policies96.html).
- 70: [ASA iSCSI LIF failover](https://docs.netapp.com/us-en/ontap/san-admin/asa-iscsi-lif-fo-task.html) and [SAN multipath and automatic LIF failover support](https://docs.netapp.com/us-en/ontap/san-admin/multipath-automatic-lif-failover-support.html). The question deliberately specifies ONTAP 9.12.1; newer AFF behavior is not generalized from that release.

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
