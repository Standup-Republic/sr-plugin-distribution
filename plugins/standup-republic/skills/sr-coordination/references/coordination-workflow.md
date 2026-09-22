# Coordination Workflow

## Contract And Availability

The six public SR MCP tools carry both Product and Coordination contracts.
Generated references describe shape; authenticated runtime health and the
Main App authorization response determine current availability.
Read the shared [Capability Availability](../../sr-plugin/references/capability-availability.md)
before use. Never infer availability from this reference alone.

Exact fields, filters, projections, operations, roles, and payload variants are
generated in [MCP Data Contract](../../sr-data/references/mcp-data-contract.json),
[Query Profiles](../../sr-data/references/query-profiles.md), and
[Action Operation Contract](../../sr-actions/references/action-operation-contract.json).

## Canonical Objects

- **Plugin user:** allowlisted Plugin identity with D1 role, scopes, status,
  revocation, and optional Product actor mapping. It is not a Product profile.
- **Project:** canonical shared Coordination object with members and links.
  It is not a Codex Work-System object or a priority-card container.
- **Message:** one permission-filtered communication record with source,
  sender/recipient context, task/attachment links, and processing state. It can
  originate from direct Coordination or an ingested text channel.
- **Priority item:** one Admin-only card with title, summary, state, short
  status, priority 0..5, optional blocker/deadline, sort order, and revision.
  Its `sr:priority_item:<uuid>` identity is separate from archived Tasks.
- **Communication channel:** participant-filtered Coordination, WhatsApp,
  Slack, email, or task context. Admin role has no participant bypass.
- **Attachment:** private bounded R2 object with staging/ready/expired state and
  short-lived actor-bound transfer grants. It is a compatibility view over the
  canonical Artifact created for the 30-day transfer.
- **Artifact:** stable mutable identity with exactly one backing: immutable
  private R2 content versions, or one verified link-only Google Drive file.
  Drive content and permissions remain exclusively at Google. Lifecycle,
  retention, audience grants, provider metadata and canonical entity links are
  audited; raw provider and Meeting evidence cannot be rewritten.
- **Signal/link:** stored bounded operational signal or typed relationship;
  current coverage depends on the connected company-signal collectors.
- **Activity/Coordination event:** redacted team activity or Admin-only command
  correlation. Neither exposes message bodies, file grants, prompts, or raw
  tool arguments.

## Read Flow

Resolve connects `artifact`, `plugin_user`, `project`, `message`, `priority_item`, and
legacy `attachment`. Get also
supports known refs for `signal`, `link`, `activity_event`, and
`coordination_event`. Use these exact Query profiles:

- `internal_inbox_v1`: current user's actionable messages;
- `internal_priority_board_v1`: Admin-only board in canonical sort order;
- `internal_projects_v1`: Projects visible through active membership or the
  person-Admin override;
- `internal_artifacts_v1`: owner-, grant-, or readable-link-visible Artifact
  metadata with complete cursor pagination and no inline content;
- `internal_communications_v1`: participant-visible message history across
  connected internal and external channels;
- `internal_conversations_v1`: one body-free summary row per visible channel;
- `internal_messages_sent_v1`: current user's sent messages;
- `internal_activity_feed_v1`: redacted team activity;
- `internal_coordination_events_v1`: Admin-only command/correlation events;
- `internal_signals_v1`: stored bounded signals from connected Product,
  communication, meeting, and manual ingestion paths;
- `internal_links_v1`: permission-filtered typed relationships.

For one known priority item, Get `overview`. Board cards have no comments,
assignee, Project, or attachments. Legacy Task reads return
`coordination_task_retired` (410).

Use the authenticated employee's scope by default. Apply only exact generated
filters, sorts, selects, and groupings. Preserve the complete query shape when
following a cursor. Do not infer acknowledgement, completion, or absence from
silence or partial coverage.

## Write Flow

Use the current catalog for each operation's role and confirmation policy.
Board operations require a current Main App Admin role:

- Project: `coordination.project.create`, `.update`, `.member.add`,
  `.member.remove`, `.link.add`, `.link.remove`;
- message: `communication.message.send`, `.reply`, `.acknowledge`,
  `.complete`, `.archive`;
- Admin priority board: `coordination.priority_item.create`, `.update`, `.complete`;
- Artifact: `coordination.artifact.create`, `.version.create`,
  `.upload_finalize`, `.update`, `.delete`, `.grant.add`, `.grant.revoke`,
  `.link.add`, `.link.remove`;
- attachment: `coordination.attachment.upload_prepare`, `.upload_finalize`.

Freeze the exact Project, recipient or target ref, content/patch, priority, deadline,
time, linkage, and attachment metadata. Prepare once. When the returned
manifest is active, execution-ready, and `not_required`, Execute immediately
without a second user turn. Use one caller-stable 16–128 character idempotency
key matching `[A-Za-z0-9._~-]+`; reuse it only for the identical uncertain
execution. Verify the receipt, then read the canonical target in the same turn
and report only the newest proven end state.

Project create makes the authenticated person an active member. Project reads
and mutations derive authority server-side from current membership or the
Admin override. Project links are limited to canonical Meeting, Message, or
Signal refs. Board cards never inherit Project membership.

Board create accepts title and summary plus optional state, short status,
numeric priority (0 highest), blocker, deadline, and sort order. Update accepts
`{priority_item_ref,expected_revision,patch}`; complete accepts
`{priority_item_ref,expected_revision}` and sets state to `done`. Read the
current revision before mutation. A stale revision returns
`priority_item_revision_conflict` (409); do not retry with an invented revision.
After Execute, read the canonical card back. Reuse the identical idempotency
key only for an uncertain outcome. Old `sr:task:*` records remain archived;
never reinterpret them as board cards or import the 53 old Tasks.

Project/board freedom is Coordination-only. Product, Production, Finance,
provider, credential, identity, and external-messaging operations retain their
separate roles, confirmations, and readbacks.

## Attachment Transfer

1. Prepare and Execute `coordination.attachment.upload_prepare` with exact
   filename, media type, and byte length from 1 to 104,857,600.
2. Transfer the exact bytes only through the returned 15-minute private grant
   and required content headers. Never put bytes in MCP arguments or expose the
   grant to browser JavaScript, logs, or durable task/message content.
3. Prepare and Execute `coordination.attachment.upload_finalize`; verify size
   and optional SHA-256 before treating the attachment as ready.
4. Use the actor-bound five-minute download grant only when needed. Do not
   persist it. Staging expires within 24 hours; ready/sent objects within 30
   days.

If the current execution surface cannot perform the private byte-transfer step,
return a precise partial result; do not claim that the attachment was uploaded.

## Canonical Artifact Transfer And Documents

Use `coordination.artifact.create` for a new stable identity and
`.version.create` for a new immutable content version of an existing document.
Supply the exact SHA-256 digest, MIME type, byte length and retention class.
`bounded` requires an explicit expiry; `long_lived` and `permanent` do not
invent one. Reuse a deduplicated blob response and never upload the same
content again merely to create another version.

Transfer bytes only through the returned short-lived server-authorized proxy,
then finalize the exact Artifact/version/digest tuple. Never expose a raw R2
URL, object key or transfer grant to browser JavaScript, channel text, logs or
durable content. Links to Project, Task, Message, Meeting, Signal or Run
entities do not widen their own visibility rules. Missing membership,
participant visibility, audience capability or online state fails closed.

Create/update/delete, grant and link operations use the normal receipt,
request-digest and idempotency contract. Preserve `expected_revision` across a
version or metadata update; a stale revision is a conflict, not permission to
overwrite. Logical deletion never authorizes physical R2 deletion. Retention,
holds, active references and immutable evidence are evaluated server-side.
