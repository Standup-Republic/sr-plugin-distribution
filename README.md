# StandUp Republic Codex plugin

Released installation and update channel for **StandUp Republic Internal**.
The plugin can be installed in Codex using a personal Pro account without GitHub
access or membership of the StandUp Republic ChatGPT Workspace. Access to SR data
still requires your own authorized SR account and personal OAuth sign-in.

## Install

In a Codex terminal:

```sh
codex plugin marketplace add https://github.com/Standup-Republic/sr-plugin-distribution.git --ref main
codex plugin add standup-republic@standup-republic-private
```

Keep the marketplace name `standup-republic-private`: it is the established
technical identity, even though this distribution repository is public.

If that marketplace already points to a private repository or a local folder,
first inspect `codex plugin marketplace list --json` and record its old source.
Remove only that registration with
`codex plugin marketplace remove standup-republic-private`, then run the two
commands above. Keep your existing SR OAuth account; do not delete credentials or
change other marketplaces. Use a new Codex task after installation. If prompted,
connect the SR server using your own account.

## Updates

Codex's native Git marketplace refresh checks for releases on app startup.
No updater, cron job, ZIP delivery or GitHub login is required. Existing tasks can
retain their previously loaded tools: restart Codex and open a new task when an
update needs to take effect. A manual refresh is available:

```sh
codex plugin marketplace upgrade standup-republic-private
codex plugin list --marketplace standup-republic-private --json
```

Automatic startup refresh was verified with Codex 0.153.4 in an isolated local
test, including migration from the old RC2 package. Update timing depends on the
installed Codex client and network availability; it is not an instant background
push into a running task.

## Verify the connection

The bundled MCP server is `https://plugin-mcp.sr-admin.tools/mcp`. In a new task,
ask Codex to call `sr_runtime_health` with
`{"components":["mcp"],"catalog":{"kind":"overview"}}`.
An installed plugin alone does not prove that OAuth or live tool access works.

## Release provenance

GitHub Actions in the private development repository publishes only the reviewed
payload and marketplace manifest. `distribution.json` records its source commit,
plugin version and SHA-256 hash of every distributed file. The development
repository, its history, credentials and operational SR data are not copied.
These hashes verify consistency, not an independent cryptographic signature.

This repository is generated. Corrections belong in the private source repository
and are released through its main branch. The package is proprietary (`UNLICENSED`);
public download does not grant an open-source license.
