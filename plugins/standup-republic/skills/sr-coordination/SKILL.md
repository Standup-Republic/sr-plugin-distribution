---
name: sr-coordination
description: "Read and update the minimal Standup Republic Admin priority board through verified SR MCP tools; explain availability of historical coordination sources."
---

# SR Coordination

Use [Live Capability And Version Check](../sr-plugin/SKILL.md#live-capability-and-version-check)
and [Capability Availability](../sr-plugin/references/capability-availability.md)
for the connected account. A bundled source contract is not live availability.
Native OAuth uses personal Supabase Staff identity and canonical Web rights;
normal Admins are not generally read-only.

## Minimal Admin Board

Query `internal_priority_board_v1` with supported `state`, numeric `priority`
(0 highest), or `search`; preserve its cursor and canonical `sort_order`.
Resolve or Get `sr:priority_item:<uuid>` with section `overview` before editing.
Use only `coordination.priority_item.create`, `.update`, or `.complete`.
For update/complete carry `expected_revision`; re-read on revision conflict.
Ask for clarification only when the intended change is no longer unambiguous.

A card has no assignee, project, comments or attachments. The board is the sole
active internal task surface. Projects, Tasks, Signals, task proposals and
plugin-user management are retired; do not recreate historical tasks as cards.

## Execute And Verify

Use Prepare with the exact named operation. Follow its returned confirmation
policy: execute `not_required` immediately, and obtain explicit confirmation
for `required`. Reuse a stable idempotency key for retries of the same action.
Read the resulting card and report only receipt/readback-proven changes.
Prepare alone is not execution; an uncertain outcome is not a reason to retry
with a new key.

Apply [Response And Channel Policy](../sr-plugin/references/response-and-channel-policy.md).
Private source material must not cross an audience boundary.

## Historical Sources

Messages, Artifacts and meetings may remain stored as source evidence. They are
not another task system and are not automatically connected for native OAuth.
Use them only when the live runtime explicitly exposes a canonical authorized
adapter. A missing adapter means `not_connected`, not that no source exists.
See [Coordination Workflow](references/coordination-workflow.md).
