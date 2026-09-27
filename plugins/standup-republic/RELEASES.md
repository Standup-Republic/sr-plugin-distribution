## 0.9.0 — Native SR identity and bounded Web permissions (2026-09-27)

Prepared for coordinated App/MCP rollout; package publication and personal-account acceptance are separate release steps.

- Personal Supabase Staff identity replaces parallel plugin-user administration.
- Normal Admins can use supported writes according to the same canonical Web permissions.
- Explicit entities, sections, fields and named actions remain the plugin boundary.
- Retires public Project/Task/Signal/proposal/attachment-alias and temporary Admin-session options; retains the minimal priority board.
- Adds bounded identity evidence and named comedian editorial updates.
- Historical messages, Artifacts and meetings are not automatically connected in native OAuth.
- Generated contract source provenance is recorded separately in `contract-source.json`.
- Existing connections may need a one-time reconnect with the personal SR work account after the authentication cutover; no GitHub or Workspace membership is required.

## 0.8.8+distribution.1 — Public personal-account distribution (2026-09-22)

- Public Git marketplace at `Standup-Republic/sr-plugin-distribution`, without GitHub login or Workspace membership.
- Stable plugin/marketplace identity and personal OAuth remain unchanged.
- Native startup updates; GitHub Actions exports only reviewed files from the private release source.
- Update diagnostic accepts the public channel and recognizes packaging build metadata against the server release version.
- Existing 0.8.8 capabilities and generated MCP contracts are unchanged.

# Personal Pro Release History

## 0.8.8 — Admin Priority Board — pending coordinated cutover

- Uses distinct Admin-only `sr:priority_item:<uuid>` cards and
  `internal_priority_board_v1` in place of active Coordination Tasks.
- Creates, edits, and completes cards through the three
  `coordination.priority_item.*` actions; edits and completion require the
  current revision.
- Treats legacy `sr:task:*` records and Task workflows as archived. No old
  Tasks are imported into the board.
- Requires the paired Main App and MCP cutover before installation or serving
  this version. This source change alone does not mutate any board card.

## 0.8.7 — Safe Identity Recovery and Rebooking — 2026-09-16

- Checks personal Product execution readiness before presenting a confirmable
  Main-App-owned action.
- Distinguishes reconnect, retry, and operator repair without exposing the
  underlying identity evidence.
- Routes moves and rebookings directly through `booking.move`, resolving an
  ambiguous comedian through the occupied source slot.
- Requires a fresh read and new Prepare after identity recovery; a failed
  manifest is never reused or automatically executed.

## 0.8.6 — Live Capabilities and Update Detection — 2026-09-07

- Sends the installed package version on MCP requests through a static header.
- Uses the serving capability catalog before relying on bundled availability.
- Documents one shared Git source and adds read-only installation diagnostics.
- Server notices distinguish outdated, current, ahead, and unknown versions;
  updates remain user-directed and preserve personal OAuth and mutation safety.

## 0.8.5 — Show Details and Spot Fees — 2026-09-07

- Refreshes the generated six-tool contract and operation references, including
  controlled updates to existing slot fees.
- Documents Show-series details separately from dated-event sales rankings;
  booking and slot references remain the targets for individual spot fees.
- Uses the existing employee OAuth connection and stable plugin identity.
- Runtime capability availability depends on the paired server release. This
  source update does not itself change any fee or publish a Business variant.

## 0.8.4 — Durable Employee OAuth — 2026-08-15

- Keeps the stable Plugin ID `standup-republic` and the canonical human OAuth
  endpoint `https://plugin-mcp.sr-admin.tools/mcp`.
- Pins the Production OAuth policy to a 15-minute access token and a 30-day
  refresh-grant session. Roles and scopes are still revalidated server-side on
  refresh.
- Gives MCP startup 45 seconds while retaining the 60-second per-tool timeout.
- Never falls back from a personal employee connection to a service token or a
  second MCP endpoint.
- Existing expired or revoked grants require one explicit reconnect after the
  update. A new task is required so Codex loads the updated MCP configuration.

## 0.8.3 — Private Git Marketplace Snapshot rc2 — 2026-07-29

- Stable Plugin ID: `standup-republic`.
- Cachebuster: `0.8.3+codex.personal-pro-git-rc2`.
- Private marketplace: `standup-republic-private` from the dedicated Personal
  Pro Git branch.
- Updating refreshes the marketplace snapshot and reinstalls the same Plugin
  ID. A new task is required afterward so Codex loads the refreshed skills and
  MCP configuration.
- The update channel remains MCP-only, private and unavailable until GitHub
  read access and the remote Release-Pipeline receipt are complete.
- `distribution_authorized=false`; `published=false`; no Git push, access
  grant, OAuth authorization or business action is part of this snapshot.

## 0.8.3 — Personal Pro OAuth Candidate — 2026-07-29

- Candidate build ID: `0.8.3-personal-pro-rc.1`.
- Technical package identity remains `standup-republic`; visible name remains
  `StandUp Republic Internal`.
- This variant contains the same six skills and exact six public MCP tools as
  the Business Workspace candidate. Roles, scopes, confirmation policies,
  Product Action Firewall and server behavior are identical.
- It mounts `https://plugin-mcp.sr-admin.tools/mcp` through `.mcp.json` with
  interactive personal OAuth and contains no `.app.json` or Business Workspace
  App ID.
- Personal private sharing and installation are not claimed until the exact
  package is made available through a Personal surface and Ben completes his
  own login, OAuth, exact-six and bounded-read smoke.
- `distribution_authorized=false`; `published=false`; no upload, share,
  installation, OAuth authorization or business action is part of this build.

## Separate Business Workspace Variant

The independently admitted Business Workspace candidate remains
`0.8.3-rc.2`, archive SHA-256
`00ec939a88812c45f52b49d703bc9fe8e05f37a1c56e2417845e520325949159`.
It references the Workspace-owned App and is not a Personal Pro artifact.
