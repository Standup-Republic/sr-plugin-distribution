---
name: sr-coordination
description: "Read and coordinate internal Standup Republic Projects, people, messages, the Admin priority board, canonical Artifacts, legacy attachments, signals, links, and activity through the verified SR MCP Coordination contract. Verify the active runtime and caller permissions before use."
---

# SR Coordination

For unknown capabilities or a bundled unavailable/unsupported claim, follow
[Live Capability And Version Check](../sr-plugin/SKILL.md#live-capability-and-version-check)
first. The authenticated live catalog supersedes bundled capability lists;
returned authorization and confirmation policies still apply.


Keep Projects, messages, communication channels, priority board cards,
Artifacts, legacy attachments, signals, links, and Product records distinct.
Do not translate Coordination intent into a Product action, Linear mutation,
external message, or local task-system write.

## Gate The Runtime

Read [Capability Availability](../sr-plugin/references/capability-availability.md)
before every Coordination workflow. Contract implementation is not runtime
availability. Require the current authenticated surface to expose the
Coordination profiles or operations and return healthy identity, Coordination,
and Artifact/attachment state as applicable.

The source contract includes Comments, Active Channel Coordinator, and
identity-alias hardening. First-class Projects are canonical only in the SR
Coordination backend; they never project or synchronize a personal Work
System. Source commits are not runtime proof. If the current
caller cannot reach the exact capability or fails identity/role/scope checks,
stop with `not_connected` or `denied`; do not substitute Site HMAC or an
operator credential.

## Read Minimally

Read [Coordination Workflow](references/coordination-workflow.md) for exact
objects, profiles, operations, and Artifact handling. Use Resolve only for
`artifact`, `plugin_user`, `project`, `message`, `priority_item`, or legacy
`attachment`; use Get for a known ref. A priority item exposes `overview`,
without assignee, Project, comments, or attachments. Use one matching `internal_*` Query profile for lists, queues,
participant-visible conversations, team views, signals, links, or activity.
Preserve filters, projection, sort, and cursor exactly.

Never expose another employee's private view without returned authorization.
Team activity is redacted metadata, not message bodies, prompts, file grants,
or raw tool arguments.

## Respond For The Channel

Apply [Response And Channel Policy](../sr-plugin/references/response-and-channel-policy.md)
to every Coordination turn. Codex, ChatGPT, WhatsApp DM, and WhatsApp group
use the same canonical read/write semantics and caller permissions. Change only
the visible envelope: DM and explicit mention are immediate; a passive group
batch is answered only when genuinely relevant, otherwise remain silent.
Never carry private DM context into a group or expose another participant's
view. Authorize the whole visible group audience, not only the requester; if
roles are mixed or unknown, reveal only the group-wide least-privileged view
and move sensitive detail to a separately authorized DM when available.

## Write By Returned Policy

The live catalog gives current availability, role, and confirmation policy.
After the user's intent and exact
payload are complete, call Prepare once and follow the returned policy. Execute
`not_required` manifests immediately with one stable caller idempotency key.
For `required`, show the exact Artifact, effect, audience/retention impact and
reversibility, state that nothing has run, and wait for explicit confirmation.

After Execute, reconcile its receipt and perform the canonical target readback
in the same turn. Report success only when that readback proves the requested
end state. Distinguish sent, created, updated, acknowledged, completed,
cancelled, archived, uploaded, accepted, changes-requested, and replayed
results. Keep retries and intermediate failures internal. Never report success
from Prepare alone, retry an uncertain Execute with a new key, or emit a stale
result superseded by a later read.

The authenticated person must be an active Project member to change a Project,
unless the server returns the existing Admin override. Project membership does
not grant access to the Admin priority board. Board authorization is checked
against the current Main App Admin role on every read, Prepare, and Execute.

For the Admin board, Query `internal_priority_board_v1` with optional
`state`, numeric `priority` (0 highest), or `search`; follow its cursor and
canonical `sort_order` order. Resolve or Get a known `sr:priority_item:<uuid>`
before editing. Use `coordination.priority_item.create`, `.update`, or
`.complete` only. For update and complete, carry the card's current
`expected_revision`; on a revision conflict, read the current card and ask
for a decision if the user's intended change is no longer unambiguous.
The board is a compact Admin priority list, not a personal task queue.
Archived `sr:task:*` refs, old Task queries/actions, proposals, reviews,
comments, and links return `coordination_task_retired` (410). Never import or
recreate the 53 archived tasks as board cards.

Use `coordination.project.create`, `.update`, `.member.add`, `.member.remove`,
`.link.add`, and `.link.remove` only through the returned Project capability.
Project links accept canonical Meeting, Message, or Signal refs. A Project
never executes autonomously.

Free internal Project and priority-item editing never expands Product, Production,
Finance, provider-write, external-messaging, credential, or identity rights.
Those actions retain their own operation, role, confirmation, and post-check
contract.

If a person, Project, or priority item is ambiguous, ask once for the smallest discriminator.
Do not try multiple candidates, channels, or operations.
