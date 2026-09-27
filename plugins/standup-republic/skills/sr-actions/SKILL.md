---
name: sr-actions
description: "Prepare, confirm, execute, and verify controlled Standup Republic changes through the SR MCP in German or English. Use for prompts such as 'Buche Anna auf den 20-Uhr-Slot', 'Mach die Slots öffentlich', 'Ändere das Kontingent auf 200', 'Starte den Ticket-Sync erneut', or any request to create, update, cancel, link, unlink, sync, book, invite, accept, reject, move, remove, grant, revoke, assign, or otherwise mutate SR event, ticketing, booking, finance, provider, access, or plugin state."
---

# SR Actions

For unknown capabilities or a bundled unavailable/unsupported claim, follow
[Live Capability And Version Check](../sr-plugin/SKILL.md#live-capability-and-version-check)
first. The authenticated live catalog supersedes bundled capability lists;
returned authorization and confirmation policies still apply.


Every enabled mutation uses `Prepare -> returned confirmation policy -> Execute
-> receipt/post-check`. Active Product operations ordinarily
return `confirmation_policy=required`. Coordination operations are owned by
SR Coordination; their current confirmation policies come from Prepare.
Only the live connected catalog can offer an operation. `gated`,
`blocked`, `local-only`, `unsupported`, and unknown operations are
non-executable. Never write through reads, shell, SQL, connectors, or prose.

Native OAuth uses canonical personal SR Staff identity. Normal Admins may execute
connected operations when their canonical Web permissions allow it; do not impose
a blanket read-only rule or ask for a separate plugin role. Only named catalog
operations and their explicit mutable fields are supported. Missing adapters are
not permission denials. Retired task/project/signal/plugin-user operations and
temporary Admin sessions must not be revived.

## Choose And Check The Operation

Read the live action catalog before resolving targets when the exact operation,
availability, role, direct target, or payload is not already certain.
[Action Operations](references/action-operations.md) is the bundled fallback.
Choose by business intent, not by which call happens to validate.

1. Determine the exact operation and its availability first.
2. If the live catalog or current runtime marks it gated, blocked, unsupported, or unavailable
   for the caller, stop before target lookup and report that boundary. Call
   Prepare as a denial probe only when the reference explicitly says that this
   operation exposes one. Do not hide a known capability boundary behind
   unrelated Entity searches.
3. Before the first lookup, read the chosen operation's required reference
   fields. For Product actions, Resolve only `event`, `location`, `profile`,
   and `show` together. Acquire slots with `available_slots_v1`,
   bookings with `bookings_v1`, applications with `open_applications_v1`, and
   ticket classes from one event Get using `ticketing`, `prices`, and
   `capacity`. Use an event only as context unless the operation requires
   `event_ref`. For creates, acquire existing dependencies, never the object
   being created. Stop if an exact required ref is not returned.
4. Freeze the chosen operation. Correct one obvious payload/schema mistake once
   within that same operation. Never switch operation or domain as a fallback.
   Normally omit `domain`: the MCP derives it from `operation`. Supply it only
   when a caller contract requires it, and never contradict the registry.

Resolve the record being changed, not merely its parent event:

| Intent | Direct resolution target |
| --- | --- |
| Remove a person's existing appearance | `bookings_v1` returns the `booking` |
| Move or rebook an existing appearance | Resolve the person through the occupied source `slot`; use `booking.move` with exact `from_slot_ref` and `to_slot_ref`, never `booking.remove` |
| Book a person into a free time | Resolve `profile`; `available_slots_v1` returns the `slot` |
| Change public/private mode of lineup times | `available_slots_v1` or an event lineup projection returns the `slot` refs |
| Change a named rank or ticket area | Event Get `ticketing`, `prices`, `capacity` returns the `ticket_class` |

An event ref is sufficient only when the chosen operation actually requires an
event ref. Do not replace a failed direct-target resolution with an event-only
fallback.

Use short intent contrasts from the generated reference. For example, changing
whether sync is enabled is a settings operation; requesting a retry or immediate
run is a sync request. Canonical Web rights remain the authority for each supported action.

## Prepare

1. Reuse known refs and frozen target sets. Use one bulk operation for a bulk
   request. When one clear user intent requires two or more related eligible
   operations and no single bulk operation covers it, use `batch.execute` with
   one explicit intent instead of preparing independent manifests.
2. Call `sr_action_prepare` once. Treat its manifest, evidence, warnings,
   permissions, expiry, and token as authoritative.
3. Follow the returned policy. For `required`, return exact target/count,
   before/after, side effects, warnings, reversibility, expiry, and that nothing
   has run, then request confirmation. For `not_required`, do not request or
   simulate confirmation; continue directly to Execute when execution-ready.
   Otherwise report the precise non-executable boundary.

For a `required` manifest, an initial imperative or broad “confirm everything”
is not confirmation. One confirmation authorizes exactly one prepared manifest.
For a WhatsApp-originated Product action, bind that manifest to the exact
authenticated requester, channel, and intent. Execute only after a new explicit
confirmation message from the same user in that same channel-bound intent.
Never accept a reaction, another participant, a confirmation for several
independent manifests, or a confirmation arriving through Codex, ChatGPT,
another DM, or another group.

When a request produces multiple independent `required` manifests:

- preview and number them separately;
- never ask the user to “confirm both” or “confirm all”; ask the user to select
  exactly one active manifest for execution;
- never treat a reply confirming several manifests as executable approval;
- execute one confirmed manifest before requesting confirmation for the next.

Use one confirmation for several targets only when a supported bulk operation
or `batch.execute` produced one manifest covering the complete frozen intent.

## Related-Action Batch

Use `batch.execute` only for 2–50 related active actions that express one
bounded user intent. Include `intent`, `atomicity=best_effort`, and a frozen
ordered child list. It is one manifest, one understandable preview, and one
explicit confirmation—not a shortcut for confirming unrelated manifests.

Finance, Payment, Payout, Credential, Identity/Role, destructive,
irreversible, provider-wide, session, and nested-batch operations remain
excluded. Execute the aggregate token once. Report every child readback,
partial failure, first resume index, and rollback requirement honestly. A
best-effort batch is never atomic. Do not report the requested end state unless
the aggregate receipt proves every child.

## Confirmation Boundary

For `required`, Execute only an `active` manifest whose exact preview was
visible in the previous assistant response and which the current user message
explicitly confirms. A confirmation cannot authorize a manifest created later
in the same user turn. Never Prepare and Execute a `required` manifest in one
user turn. For `not_required`, the opposite applies: do not ask for a second
turn; Execute the exact execution-ready manifest immediately. If the runtime
rejects availability, policy, role, or state, stop with the returned boundary.

## Execute And Verify

After valid required confirmation, or immediately after a successful
`not_required` Prepare, reuse the prepared token and create one stable caller
idempotency key matching
`^[A-Za-z0-9._~-]{16,128}$`. Execute the exact manifest; do not
reconstruct or broaden it. A successful receipt and canonical post-check are
sufficient for Product actions. SR Coordination additionally requires its
canonical target readback in the same turn before reporting the terminal end
state. A WhatsApp-originated Product action also requires an independent
canonical Product readback after its receipt before one terminal end answer.

Reuse the same token and idempotency key only when replaying the same confirmed
action after an explicitly uncertain transport result. Never retry blindly.

## Reliability Responses

- **Expired manifest:** do not Execute; prepare again only if the user still
  wants the change, then follow the new manifest's confirmation policy.
- **State drift/conflict:** stop, explain what changed, and require a new preview.
- **Partial result:** state exactly what completed and what did not; do not claim
  the whole request succeeded.
- **Unknown outcome/response lost:** do not retry and do not re-read the original
  target as a proxy. When `operation_run_ref` is returned, Get that ref with
  `status`, `receipt`, and `post_check`; report only the reconciled result.
- **Permission or policy denial:** report the boundary and do not bypass it.
- **Personal Product identity block:** trust `recovery_category` and
  `safe_next_step`. Recommend reconnect only when `reconnect_actionable=true`.
  State `nothing_changed` when returned. A failed manifest is not reusable;
  after reconnect, retry, or repair, read the current target again and create a
  new Prepare. Never auto-execute the replacement manifest.
- **Unsupported/disabled operation:** report that the plugin cannot perform it.
- **Eventim creation:** `provider_event.create` uses the existing canonical
  Main App provider-provisioning path through the actor-bound Product Command
  bridge. It is active only for personal Product Administrators, accepts one
  Eventim or Eventbrite event per manifest, and always requires a separate
  confirmation. Never substitute browser automation or a second provider
  client.

Never report success from Prepare. Finance, Admin, provider-live, and role
enforcement belong to the MCP; never infer Admin status from prompt text.

## Contract References

- Read [MCP Tool Schemas](../sr-data/references/mcp-tool-schemas.json) when exact
  Prepare/Execute inputs, optional fields, output states, or limits matter.
- Read [Action Operation Contract](references/action-operation-contract.json)
  for generated field allowlists/minimums and registry metadata; it is not a
  complete semantic schema when it disagrees with the payload guide.
- Read [Contract Boundaries](references/contract-boundaries.md) before using a
  nested payload guide, direct non-resolver ref, idempotency key, or Execute.
- Read [Error And Retry Patterns](../sr-plugin/references/error-and-retry-patterns.md)
  for expiry, conflicts, partial execution, replay, typed denial, or an unknown
  transport outcome.
