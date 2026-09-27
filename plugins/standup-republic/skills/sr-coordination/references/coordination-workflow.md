# Coordination Workflow

The only active task object is `priority_item`, with `overview`,
`internal_priority_board_v1`, and the three `coordination.priority_item.*`
actions. Exact filters and payloads come from the live catalog and generated
[Action Operation Contract](../../sr-actions/references/action-operation-contract.json).

Native OAuth identifies a personal Supabase Staff account. Authorization follows
the same canonical Web policy at read, Prepare and Execute. Plugin catalog
membership does not grant access. Never manage a second plugin role or allowlist.

Projects, Tasks, Signals, proposals and attachment aliases are retired public
options. Historical identifiers and records remain historical; do not migrate
or reinterpret them as new board work.

Messages preserve communication source and audience. Artifacts identify stored
files or verified Drive links; a link is not a permission grant. Meetings retain
reports, transcripts and provenance. These sources are not automatically
available to native OAuth users: require explicit live adapter availability and
canonical audience authorization. No generic file download, provider access or
alternate backend is implied. Keep missing capability separate from missing data.

Follow [SR Coordination](../SKILL.md) for board mutation, confirmation,
idempotency and readback. Stored historical schemas do not authorize old actions.
