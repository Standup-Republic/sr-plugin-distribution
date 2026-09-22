---
name: sr-plugin
description: "Orient and route internal StandUp Republic work in German or English across Codex, ChatGPT, WhatsApp DM, and WhatsApp groups. Use for requests about StandUp Republic, Comedyflash, employees, projects, project members, events, shows, venues, comedians, applications, bookings, ticketing, providers, payouts, access, support, runtime health, internal messages, tasks, canonical Artifacts, legacy attachments, signals, activity, OAuth, Workspace Site, status updates, Branding, Logo, Wortmarke, Mitarbeiterdokument, Release Notes, bekannte Einschränkungen, Rollback, or an SR data change. Route to sr-data, sr-actions, sr-support, sr-coordination, or sr-update by the requested outcome."
---

# SR Plugin

StandUp Republic operates live-comedy workflows; Comedyflash is one show
context inside the company. Authorized employees use this plugin to answer
operational questions and perform supported SR actions for colleagues,
comedians, promoters, venues, and organizers.

The six SR MCP tools are the complete typed Product and Coordination surface.
For an SR request, call the matching SR tool directly. Never run broad
discovery to search for a hidden replacement backend. Runtime health and the
authenticated caller remain authoritative for actual availability.

Reading the bundled references named by SR Plugin, SR Data, SR Actions, or SR
Support is allowed and required when applicable. Do not use shell, repository
access, SQL, web, or unrelated connectors to obtain SR facts or perform SR
actions. Never invent identifiers, dates, roles, state, or success. Handle the
request itself—do not narrate skill selection.

For user-visible reads, support, updates, or Coordination on any supported
surface, follow the shared
[Response And Channel Policy](references/response-and-channel-policy.md).
It keeps the same six-tool contract, authorization boundary, and evidence
standard while adapting only timing, privacy, reaction, and response length to
the channel.

## Live Capability And Version Check

Before declaring a capability missing, unknown, gated, or unsupported based on
bundled references, call `sr_runtime_health` with `components: ["mcp"]` and
`catalog: {"kind": "overview"}`. For exact input and availability details, use
`catalog: {"kind": "action", "key": "slot.fee.set"}`, or the matching `query`
or `entity` kind and exact key. Use the returned current schema and capability
status; bundled references are an offline fallback and may be older. A catalog
entry is not permission: Prepare and runtime authorization still decide the
caller's access. If live discovery fails, report availability as unknown rather
than treating an old bundled list as proof of absence. Do not probe unrelated
operations or substitute another backend.

Inspect server version/update guidance returned by SR calls. When the plugin
version is outdated or unknown, briefly surface the update hint and use the
[Git update guide](../../docs/release/git-marketplace-update.md) to diagnose it.
Update only when the user requests or authorizes it; preserve their OAuth
identity and use a new task after installation. A version hint must not hide a
successful business result or turn a successful mutation into a retry.

## Route Once

- Use `SR Data` for identity resolution, entity facts, lists, comparisons,
  runtime health, claim checking, and fact-based support drafts.
- Use `SR Actions` when the requested outcome changes SR state. Read first only
  when an existing target is unresolved or required current state is missing.
- Use `SR Support` only for a forwarded or third-party problem, an observed
  symptom whose cause is still unclear, or a grounded reply draft. Direct data
  questions, routine health checks, and clearly specified changes go straight
  to SR Data or SR Actions.
- Use `SR Coordination` for internal Projects and members, messages,
  communication channels, the Admin priority board, canonical
  Artifacts, legacy attachments, signals, links, acknowledgements, activity,
  and compact coordination views. It must verify
  the current auth surface before a read or write and follow the manifest's
  returned confirmation policy.
- Use `SR Update` for “Was ist neu?”, “Wo stehen wir?”, “Gib mir ein Update”,
  “Wie ist der Gesamtstand und was ist offen?”, and comparable cross-source
  current-status requests. Personal message queues and the Admin priority board stay with SR
  Coordination. SR Update composes only from available, fresh sources. A
  question naming a plugin version, release notes, known limitations, or a
  rollback target uses the canonical Release History instead, even when it also
  says “Was ist neu?”.
- For a logo, employee document, product name, or compact design guidance, read
  the Brand Resource below and reuse its bundled official asset unchanged.
- For release notes, known limitations, or rollback targets, read the canonical
  Release History below. Do not reconstruct release state from skill prose.
- For mixed requests, answer the read portion and follow each mutation's
  returned confirmation policy. Product actions ordinarily require
  confirmation; an active bounded Admin session may relax only an eligible
  manifest. Check current action availability and confirmation policy in the
  live catalog. A supported related-action batch remains one confirmed
  aggregate manifest.

Prefer the smallest complete call plan. Reuse facts, conversation context, and
canonical refs already established. Do not re-resolve a known target, repeat a
completed read, discard a cursor, or rebuild an existing prepared manifest.

For mutations, determine the exact operation before the first Resolve and use
its required reference fields to identify the direct records. An event is only
context unless the operation requires `event_ref`. Runtime connection
availability is authoritative; a possible `not_connected` result is not a
reason to pre-emptively substitute an event-only lookup.

## Intent Integrity

Before Prepare, translate the user's verb, direct object, and every material
qualifier into an operation-and-payload checklist. Preserve scope words,
limits, comparison values, state qualifiers, and timing. When the operation
exposes a matching payload field, include the qualifier there. If a material
qualifier cannot be represented, clarify or report the limitation instead of
silently dropping it, switching operations, or probing unrelated reads.

A typed error may change whether the request can be completed; it must not
change what the user asked for. Do not reinterpret resolve as delete, a plugin
role as a Product role, a setting change as a retry, or one create operation as
another.

Once a business operation is selected, keep it fixed while correcting one
obvious schema mistake. Never switch operation or domain merely to make a tool
call validate. Stop on a non-retryable unsupported, denial, or policy result.

Let the MCP authenticate the caller and enforce `admin` or `employee`; never
infer a role from names or prompt text. Accept typed denial, conflict,
unsupported, stale, and unknown results. Never expose secrets, auth material,
raw provider payloads, or unnecessary personal data.

## Response State

Every final answer must match exactly one state:

| State | Use when | Required response |
| --- | --- | --- |
| `answered` | Requested read is grounded | Lead with the answer and relevant freshness or uncertainty. |
| `needs_clarification` | A material target/input remains ambiguous | Ask only for the smallest missing discriminator; do not guess. |
| `needs_confirmation` | One exact active manifest returned `confirmation_policy=required` | Summarize exact change and risk; say nothing has run; request confirmation. |
| `executed` | Execute returned a successful receipt/post-check | State what changed and the verified end state. |
| `denied` | Role, policy, or safety boundary refused the request | State the boundary plainly; do not suggest a bypass. |
| `partial` | Only part of a request is grounded or available | Separate completed facts from missing/unknown parts. |
| `replay` | Same idempotency key returned an existing receipt | State that no second mutation occurred and summarize the receipt. |
| `unsupported` | The requested capability is not exposed | Say it cannot be performed by this plugin; do not emulate it. |
| `not_found` | A valid lookup proves no matching entity exists | State what was searched and that no match was found. |
| `blocked` | Progress is impossible for a concrete non-permission reason, such as unavailable runtime routing or a non-executable operation | State the concrete blocker and the smallest useful next step. |
| `cancelled` | The user explicitly cancelled the pending action | Confirm that no action was executed. |

Respond in the user's language and with the result first. Keep retries,
receipts, refs, manifests, runs, error codes, tool names, and raw status blocks
internal. Expose technical details only when the user explicitly requests
diagnosis. For Coordination, emit at most one optional reaction and one
terminal text answer, and never surface a stale or superseded intermediate
result.

## References

- Read [Domain Glossary](references/domain-glossary.md) when business wording
  leaves the entity, relationship, role, or ticketing concept uncertain.
- Read [Capability Availability](references/capability-availability.md) before
  using coordination, update, or a capability whose connection is
  uncertain.
- Read [Error And Retry Patterns](references/error-and-retry-patterns.md) for a
  typed error, timeout, stale result, partial response, or unknown action
  outcome.
- Read [Response And Channel Policy](references/response-and-channel-policy.md)
  for Codex, ChatGPT, WhatsApp DM/group behavior and realistic Coordination
  forward cases.
- Read [Brand Resource](references/brand.md) for official names, logo selection,
  reusable employee-document assets, and the small verified design baseline.
- Read the canonical [Release History](../../RELEASES.md) for versioned release
  notes, known limitations, and rollback targets.
