# Storage and virtualization fundamentals refresh

Use this path to rebuild a working mental model before rehearsing troubleshooting answers. The quizzes contain original practice scenarios, not verified employer interview questions.

## First: understand the architecture

Sketch these two paths and explain every layer:

- **Block datastore:** application → guest filesystem → virtual disk → VMFS datastore → host initiator/multipathing → IP or FC fabric → ONTAP target/LUN → volume → underlying storage.
- **NFS datastore:** application → guest filesystem → virtual disk file → ESXi NFS client/VMkernel interface → IP network → SVM data LIF → NAS namespace/export and volume.

Then ask what a successful test at one layer does and does not prove about the next.

## Quiz sequence

| Bank | Questions | Learning goal |
| --- | --- | --- |
| VMware | 1–13 | Explain hypervisor, management, guest integration, datastores, virtual disks, snapshots, and provisioning. |
| VMware | 14–22 | Distinguish HA, vMotion, Storage vMotion, DRS, failover capacity, compatibility, and maintenance. |
| VMware | 23–35 | Interpret CPU/memory controls and identify the host, guest, and networking layers. |
| VMware | 36–50 | Practice read-only inspection, storage incidents, patch planning, and service recovery validation. |
| NetApp | 1–19 | Explain controllers, clusters, HA pairs, aggregates/local tiers, volumes, SVMs, LIFs, NAS/SAN, and multipathing. |
| NetApp | 20–31 | Distinguish disk protection, snapshots, replication, application consistency, RPO/RTO, and usable capacity. |
| NetApp | 32–47 | Interpret performance symptoms, authorization, storage paths, and read-only diagnostic commands. |
| NetApp | 48–50 | Handle version/platform changes safely and validate end-to-end recovery. |
| NetApp | 51–56 | Explain quorum, epsilon, equal partitions, ring primaries, two-node cluster HA, and maintenance readiness. |
| NetApp | 57–60 | Explain VLDB location metadata, inspect its RDB ring, and reason about cutover and quorum faults. |
| NetApp | 61–64 | Separate cluster/HA/intercluster networks and troubleshoot cluster-link or peer-replication failures. |
| NetApp | 65–70 | Distinguish LIF and volume mobility, failover targets, home/current placement, node scope, service policies, and release-specific SAN behavior. |

## Rehearse the distinctions aloud

| Distinction | Core explanation |
| --- | --- |
| HA versus vMotion versus DRS | Restart after failure; planned live migration; placement and balancing. |
| Storage vMotion versus backup | Change storage placement; preserve a recoverable copy. Different objectives. |
| Controller HA versus replication | Local storage-service continuity; a separately located recovery copy with its own recovery characteristics. |
| RAID versus snapshot versus backup | Disk-failure tolerance; point-in-time view; recoverability designed around independent protection and tested restore workflows. |
| NAS versus SAN | Files presented by a server; blocks presented for a host to interpret. |
| Guest free space versus datastore/array free space | Different layers with different allocations, snapshots, and physical capacity constraints. |
| CPU utilization versus ready time | Work actually executing versus time ready work waits for scheduling. |
| Infrastructure restored versus application recovered | A VM or LIF being up does not prove a user transaction succeeds. |

After each answer, explain why the other choices do not fit. Revisit missed questions and state one real operational example where you have one; do not invent experience.

## Returning after time away

Core architectures transfer better than remembered click paths or command flags. Verify the real inventory, platform personality, version/build, protocol, topology, support compatibility, and local runbooks. For example, ASA r2 administration differs from conventional ONTAP AFF/FAS, and modern vSphere procedures must match the installed release.

The snippets are read-only inspection exercises or clearly marked illustrative observations. Knowing what a command inspects is a starting point; interpreting the output and choosing a safe authorized action is the operational skill.
