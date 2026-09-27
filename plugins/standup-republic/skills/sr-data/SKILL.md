---
name: sr-data
description: "Read, resolve, query, compare, and explain Standup Republic operational data through the same six-tool SR MCP contract in Codex, ChatGPT, WhatsApp DM, or an authorized WhatsApp group. Use for prompts such as 'Welche Shows sind morgen?', 'Wie viele Tickets sind verkauft?', 'Ist das Event ausverkauft?', 'Wo ist Jan gebucht?', 'Welche Auszahlungen sind offen?', 'Ist SR gerade gesund?', and other event, show, venue, comedian, application, booking, ticketing, provider, price, capacity, sales, payout, access, runtime-health, claim-check, or fact-based support questions."
---

# SR Data

For unknown capabilities or a bundled unavailable/unsupported claim, follow
[Live Capability And Version Check](../sr-plugin/SKILL.md#live-capability-and-version-check)
first. The authenticated live catalog supersedes bundled capability lists;
returned authorization and confirmation policies still apply.


Choose the smallest read shape:

| Need | Tool | Rule |
| --- | --- | --- |
| Unknown natural identity | `sr_entity_resolve` | Resolve all directly named and required entity types together. |
| One known entity or one entity's summary | `sr_entity_get` | Request all needed sections in one call. |
| List, aggregate, ranking, timeline | `sr_entity_query` | Use one active fitting profile; do not fan out into per-item Gets. |
| Service or pipeline state | `sr_runtime_health` | Use health only for runtime-wide availability. |

Do not Query before Resolve for pure identification. After identity is known,
apply this precedence:

1. If the request concerns one entity and Get exposes the relevant section,
   use one Get.
2. Use Query only when the requested result inherently spans multiple entities
   or requires a list, aggregate, ranking, or timeline unavailable through Get.

A Query profile's name never overrides this precedence. Do not Get after
Resolve when its candidate summary already answers the request. Correct one
obvious typed schema mistake once; never probe profiles or fields by trial and
error.

## Resolve The Direct Object

Identify the object the user actually wants to read or change. Discover exact
connected resolver types, sections and query profiles through the live catalog;
connectivity differs from the historical schema. Use Get for an existing ref,
and an answer-ready Query for lists. Obtain slot references through
`available_slots_v1` when connected. Never substitute a parent reference for a
missing direct target or probe arbitrary fields.

The active coordination object is `priority_item`; use
`internal_priority_board_v1` and `overview`. Projects, Tasks, Signals, proposals,
plugin-user administration and attachment aliases are retired from the public
catalog. Historical records are not imported into board cards. Source messages,
Artifacts and meetings require explicitly connected capabilities; their presence
in stored history or bundled contracts does not grant access.

Derive the primary type from the business noun and, for actions, the operation's
required reference fields: a rank or ticket area is a `ticket_class`; a lineup
time is a `slot`; a person's existing place in a slot is a `booking`; a dated
performance is an `event`.

Preserve names, provider IDs, dates and times, places, and relationship nouns
such as slot, booking, rank, application, organization, or provider link in the
resolver query. Shorten filler, not discriminating information. Resolve
multiple connected dependencies, such as person plus event, in one call; then
acquire any slot, booking, application, or ticket-class ref through its Query or
Get projection.

- A concrete dated performance is an `event`; a reusable format or series is a
  `show`. In ordinary speech, “Show” may mean either—date/place wording normally
  identifies an `event`.
- Bind dates and times to the noun they qualify. A 20:15 slot does not imply the
  event starts at 20:15.
- `date_hint` is full RFC3339 with offset or `Z`. When the user gives only a
  local date, preserve that local calendar day; never invent a start time or
  missing year.
- Preserve genuine ambiguity. Present candidates and ask for the smallest
  discriminator instead of choosing.
- Reuse canonical `sr:*` refs already established in the conversation.

## Get And Query

For Get, request all sections necessary to answer in one call and no unrelated
sections. A known event's finance, booking, ticketing, or sales summary is a Get
when the sections expose those facts.

For a known priority item, request `overview`. Do not request Task comments or
interpret a historical Task as an active board card.

Read the live query catalog before choosing an unfamiliar profile, filter,
projection, grouping, sort, or pagination plan.
[Query Profiles](references/query-profiles.md) is the bundled fallback.
Use only a profile marked available for the caller's
role and scope. Use exact generated names and allowlists. Omit `select` when the
default projection answers the request. Follow a cursor only when the requested
result needs another page, preserving the same query shape.

Communication history and conversation summaries are participant-filtered.
Admin role has no blanket bypass. Treat missing membership, disconnected
collectors, and partial source coverage as availability limits, not empty-chat
proof.

## Runtime Health

Use `summary` for normal employee and operational status questions. Use
`diagnostic` only when the caller is an authenticated Admin and the request
actually needs diagnostic detail. Prefer a short recent window for “currently”
or “right now”; do not replace Health with an unrelated data Query.

Treat canonical SR/Main App projections as truth for general reads. Use
provider-live modes only when exposed and authorized. Construct the answer
from returned fields and rows, never from the Tool or Query profile name.
Before claiming no results, zero, a warning, failure, or violation, inspect the
relevant item count and explicit status, coverage, and freshness fields.
Non-empty rows must be synthesized; absence may be stated only when the
relevant collection is empty or the result explicitly establishes it. Never
infer a violation, success, or category absent from the returned data.

Communicate requested facts in human terms, including material freshness,
coverage, warnings, or unknowns. Stable refs and typed error codes are
diagnostic details, not default answer content.

For channel timing, multi-step reads, follow-up context, pagination, audience
authorization, and the one-answer envelope, read
[Response And Channel Policy](../sr-plugin/references/response-and-channel-policy.md).

For support drafts, separate verified internal facts, uncertainty, and proposed
external wording. Never claim a payout, sync, booking, access change, or send
occurred without returned evidence.

## Contract References

- Read [MCP Tool Schemas](references/mcp-tool-schemas.json) when an exact input,
  optional parameter, enum, limit, output state, or typed error field matters.
- Read [MCP Data Contract](references/mcp-data-contract.json) for the generated
  tool metadata, entity sections, Query profiles, filters, select fields, and
  defaults.
- Read [Error And Retry Patterns](../sr-plugin/references/error-and-retry-patterns.md)
  after a non-success or uncertain transport result.
