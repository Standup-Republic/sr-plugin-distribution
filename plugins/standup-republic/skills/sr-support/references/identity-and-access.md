# Identity And Access

## Use When

- someone cannot log in, see an event, apply, book, or perform an expected task;
- a profile, organization membership, Product role, or plugin role is disputed;
- the report says “no access” without establishing which access layer failed.

## Establish

1. Resolve the affected profile and, when relevant, organization or event.
2. Read current Product access and the specific object state needed for the
   reported workflow.
3. Distinguish identity mismatch, missing Product role, missing organization
   relationship, object-level visibility, and plugin authorization.
4. Treat a typed permission denial as authoritative. Do not infer access from a
   person's name, title, or expected responsibility.

## Decision Branches

- **Profile not found:** verify the smallest missing discriminator; do not
  create or merge identities implicitly.
- **Product role absent or wrong:** explain the observed role and route only a
  supported Product-access change through SR Actions.
- **Plugin role issue:** do not substitute a Product-role action. Current
  plugin-user add/role/disable operations remain blocked. Report that boundary.
- **Employee OAuth issue:** verify runtime readiness separately from the exact
  user's allowlist/status/role/scopes and completed OAuth session. An active
  email alias may map only to that same authoritative person; pending/revoked
  aliases and subject/email mismatches fail closed. An operator credential or
  Site HMAC request is not a workaround.
- **Plugin Skills loaded, MCP missing:** say that the Plugin content is loaded
  but its SR connection is not mounted. Do not call this an OAuth denial and do
  not recommend repeated restarts or reinstalls.
- **MCP mounted, OAuth not connected:** ask for one personal OAuth connection
  on the visible `StandUp Republic Internal` entry. Never request a URL, token,
  local config, shared credential or separate Custom App search.
- **Identity denied:** say that the connection reached SR but the authenticated
  person is not authorized or mapped. Reinstalling cannot fix identity policy.
- **Backend degraded:** say that connection and identity may be valid while the
  SR backend is unavailable or not ready. Retrying install/OAuth is not a
  generic remedy.
- **Site identity issue:** the Worker accepts only the server-verified,
  normalized Sign in with ChatGPT email inside a valid signed request and maps
  it through one explicitly active alias to exactly one active allowlisted
  Plugin person. Browser-supplied identity, pending aliases, domain wildcards,
  or email-only Product mapping are invalid.
- **Access exists:** inspect the direct event, slot, application, or booking
  state before concluding that authorization caused the symptom.

## Stop Conditions

Stop when the required access capability is blocked, gated, or unsupported.
Never suggest direct database edits, shared credentials, impersonation, or a
role escalation as a workaround.

## Answer

State which access layer was verified, what currently blocks the workflow, and
the smallest supported next step. Avoid exposing unrelated role memberships.
Distinguish exactly: Plugin not loaded, MCP not loaded, OAuth not connected,
identity denied, or backend degraded.
