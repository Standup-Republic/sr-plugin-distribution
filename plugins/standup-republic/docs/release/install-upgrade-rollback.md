# Employee Plugin Install, Upgrade, And Rollback

Use [Shared Git Installation And Update](git-marketplace-update.md) for the
canonical install, source repair, diagnostic and upgrade workflow. The current
Personal Pro release is distributed from the public
`Standup-Republic/sr-plugin-distribution` Git marketplace on `main`, without
GitHub or Workspace membership. The private `Standup-Republic/sr-codex-plugin`
source remains valid for developers and Workspace imports. Both retain the
marketplace identity `standup-republic-private`.
Historical archive release records are not a second installation path.

Before an authorized update, record the working plugin identity, version and
Git source. Afterward verify the installed manifest, version header and one
fresh read-only catalog call from a new task. Preserve the employee OAuth
connection; log in again only when Codex actually requires it.

If the new release fails, restore the previously verified release from the
same distribution channel and verify its installed identity and read behavior.
Use Codex marketplace remove/add for an explicitly selected ref when changing
the source or rollback pin; preserve OAuth and unrelated marketplaces.
A temporary commit pin is a rollback state and must be made explicit; normal
updates follow `main`. Do not substitute a Business Workspace plugin or app,
create duplicate active variants, or reuse another person's OAuth identity.
