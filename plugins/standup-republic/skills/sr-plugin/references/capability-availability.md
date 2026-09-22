# SR Capability Availability

Use this reference when a workflow depends on more than the six SR MCP tools.
Availability is observed at execution time; skill text is not evidence that a
connector or backend is live.

## Current Product Surface

The plugin declares exactly one MCP server with six public tools:

- four read tools: Resolve, Get, Query, and Runtime Health;
- Prepare and Execute for registry-backed actions.

The active Production version serves Product Read plus 26
`active` Product operations. Those operations ordinarily require
confirmation. It also serves three bounded Admin-policy operations:
related-action batch, temporary-session activation, and immediate revocation.
The MCP contract is authoritative for per-profile, per-operation, role,
confirmation policy, and runtime availability. A visible tool is never
permission to bypass operation, identity, role, policy, confirmation, or state
checks.

## Coordination/Auth/Site Runtime

The generated six-tool catalog describes the paired MCP release, but source
commits and deployment pins do not prove access for the current caller. Read
live runtime health and the exact action/query/entity catalog before a
Coordination workflow. The Admin priority board has distinct
`sr:priority_item:<uuid>` refs, `internal_priority_board_v1`, and three
`coordination.priority_item.*` actions. Main App checks the current Admin
role for each board read, Prepare, and Execute. Archived `sr:task:*` refs,
legacy Task queries, and Task actions return `coordination_task_retired` (410).
Projects, people, messages, communication channels, Artifacts, and other
shared Coordination records remain separate. A priority card has no assignee,
Project, comments, or attachments. Do not infer board access from Project
membership or a Plugin account list.

Production D1 is live through `0040_outbound_provider_delivery_stage.sql`.
Independent exact-version QA returned ready `200` with `no-store`, exactly six
public tools, invalid-bearer `401` with `no-store`, zero Product-command,
outbox and slot side effects, 70 Artifact rows with zero null or mismatched
backings, empty foreign-key check, and `quick_check=ok`. These checks prove the
deployed baseline, not authorization for a caller or evidence that an external
delivery occurred.

Eventim, Eventbrite, and Rausgegangen provider creation already belongs to the
canonical Main App provider-event provisioning service. Eventim and Eventbrite
create provider ticketing events; Rausgegangen creates listings without
ticketing activation. `provider_event.create` now has a source-complete,
private, actor-bound server-to-server Product Command bridge to the existing
Main App preview/apply path and is active for one Eventim or Eventbrite event
per separately confirmed Admin manifest. Identity, HMAC, provider policy,
receipt, persisted SR link, and independent readback remain fail-closed runtime
requirements. Rausgegangen is not part of this Plugin operation. Never add a
second provider client or impersonate an interactive browser session.

`event.lineup_message.send` is active only through the canonical Main App plus
Worker pipeline. Its receipt distinguishes internal commit, outbox queue, send,
delivery, and receipt stages. Never claim queued, sent, delivered, or received
from an internal Application/message row or a lower-stage receipt.

The Runtime contract implements channel turns, one optional acknowledgement
reaction, one terminal text, outbound revalidation, and participant scope
intersection. Historical Task-Agent records do not create active board work.
A source pin is not current deployment or processing evidence: verify health,
tool metadata, identity, audience, and the requested capability on the
authenticated surface.

The Site uses the active Worker version. Browser JavaScript must never receive
the Site HMAC identity envelope, signing secret, private Artifact/attachment
grant, R2 object key, or raw R2 URL.

## Current Auth State

The Plugin MCP connector uses interactive OAuth. Authorization requires the
verified issuer/subject and asserted email to resolve to the same active
allowlisted person. An email alias must be explicitly active; pending or
revoked aliases grant nothing and never create a user, role, scope, or Product
mapping. Wrong users, subject/email mismatches, revoked identities, and expired
sessions fail closed. Site HMAC and operator credentials remain separate
server-only paths.

Plugin-user add/role/disable operations remain operator-owned. Employee setup
is uniform: install the plugin, authenticate once, and use the identity, role,
and scopes assigned server-side to the exact verified email address. There is
no employee questionnaire, personal plugin configuration, or generated core
task. Workspace distribution and publication remain outside the SR MCP
contract.

## Availability Check

1. Identify the outcome and required capability.
2. Check `sr_runtime_health` with `components: ["mcp"]` and `catalog: {"kind": "overview"}`, then the exact `action`, `query`, or `entity` catalog key when needed. Live catalog schemas supersede bundled lists; check caller identity. A committed
   source or Site-only route is not proof of the caller's Plugin access.
3. Distinguish `available`, `permission_denied`, `not_connected`, and
   `unsupported`.
4. If unavailable, preserve the requested outcome and return the smallest
   concrete setup or handoff step. Never substitute shell, SQL, web scraping,
   raw credentials, or an unrelated connector.
5. Never say a message, task, Artifact, attachment, installation, role change, or traffic
   promotion ran without its owning receipt/post-check.
