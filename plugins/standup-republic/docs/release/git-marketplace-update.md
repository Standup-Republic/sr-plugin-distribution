# Git Installation And Update

Personal Pro installations use the public distribution-only repository
`Standup-Republic/sr-plugin-distribution`, branch `main`, marketplace
`standup-republic-private`, plugin `standup-republic`. No GitHub account,
organization access or Workspace membership is required to read this package.
SR data still requires each employee's own authorized OAuth connection.

The private `Standup-Republic/sr-codex-plugin` repository remains the development
source and a valid source for developers and Workspace imports with read access.
The marketplace entry's relative source `./plugins/standup-republic` resolves
inside the Git snapshot. A marketplace configured from a developer worktree is
a local installation even if it has the same marketplace name.

## Diagnose Before Updating

SR tool responses carry server version/update guidance. Plugin 0.8.6 and later
send their version through `http_headers.X-SR-Plugin-Version` on MCP requests.
Older installations without a header have an unknown version; the server must
not invent it. The live Runtime Health catalog supplies current capabilities.

Run the bundled read-only diagnostic with the latest version reported by the
server (substitute the actual value):

```bash
node <installed-plugin-root>/scripts/check-update.mjs --latest-version <server-latest-version>
```

Without that option, the script compares only with its own packaged manifest;
that does not establish the latest published release. It reads
`codex plugin list --json` and `codex plugin marketplace list --json`, reports
version differences, source provenance and duplicate installations. The public
source is `canonical_git`; the supported private source is `developer_git`.
SemVer build metadata does not change release precedence: installed
`0.8.8+distribution.1` matches server version `0.8.8` and requires no downgrade.
Prerelease versions remain distinct. A version difference is a diagnostic,
not an instruction to downgrade a newer installation.

The list commands do not expose the configured branch, so branch verification
remains unknown. The diagnostic never installs, removes, logs in, edits config,
or fetches a Git update. It does not independently verify a supplied server hint.

## Install Or Migrate A Personal Pro Installation

After the user requests installation or migration, inspect existing sources:

```bash
codex plugin list --json
codex plugin marketplace list --json
```

For a new installation:

```bash
codex plugin marketplace add Standup-Republic/sr-plugin-distribution --ref main
codex plugin add standup-republic@standup-republic-private
```

If `standup-republic-private` already points to the private repository or a local
worktree, adding the same name does not replace its source. After identifying
that exact marketplace, migrate it explicitly:

```bash
codex plugin marketplace remove standup-republic-private
codex plugin marketplace add Standup-Republic/sr-plugin-distribution --ref main
codex plugin add standup-republic@standup-republic-private
```

These are local Codex marketplace commands, not Workspace Admin deletion.
Preserve the existing OAuth account; marketplace removal does not imply that
its authentication should be removed. Do not hand-edit caches, credentials,
unrelated marketplaces or global Git configuration. If a separate
`standup-republic@personal` duplicate exists, remove only that identified old
installation after verifying the canonical installation, within the authorized
migration.

Read back both lists: the installed plugin must be enabled and its marketplace
must have `sourceType: git` with the public distribution repository. A successful
marketplace command alone is not proof that the installed plugin changed.

### Copyable Request For Ben

> Installiere beziehungsweise migriere mein StandUp-Republic-Plugin in Codex
> auf den öffentlichen Git-Marketplace
> `Standup-Republic/sr-plugin-distribution`, Branch `main`. Prüfe zuerst
> `codex plugin list --json` und `codex plugin marketplace list --json`.
> Die Marketplace-ID bleibt `standup-republic-private`, die Plugin-ID
> `standup-republic@standup-republic-private`. Wenn dieser Marketplace noch
> auf eine private oder lokale Quelle zeigt, entferne nur diesen
> Marketplace-Eintrag und füge die öffentliche Quelle mit `--ref main` neu
> hinzu; installiere danach das Plugin. Erhalte meine persönliche
> SR-OAuth-Verbindung und alle anderen Marketplaces. Verifiziere anschließend
> Git-Quelle, aktivierte Installation und Version. Ich habe Personal Pro
> und benötige dafür keine GitHub- oder Workspace-Mitgliedschaft. Weise mich
> auf einen nötigen App-Neustart und eine neue Task für die abschließende
> lesende SR-Prüfung hin; führe keine fachlichen Änderungen aus.

## Automatic Update And Manual Fallback

Codex's native Git marketplace update runs at app startup. With Codex 0.153.4,
an isolated app-server startup using unauthenticated Git HTTP was verified to
update an installed `0.8.3+codex.personal-pro-git-rc2` to `0.8.8`. This verifies
the startup update mechanism; it does not promise immediate updates on every
client or replacement of configuration in already running tasks.

Restart Codex and open a new task to load updated skills, MCP configuration and
the version header. When an update is needed and authorized, the manual
fallback is:

```bash
codex plugin marketplace upgrade standup-republic-private
codex plugin add standup-republic@standup-republic-private
```

Read back the installed version and Git source. In a new task, confirm that a
fresh read-only SR call reports the expected version and current live catalog.
Do not retry a successful business mutation because its response included an
update hint.

OAuth remains the employee's separate personal connection. Preserve it across
updates; reconnect only when Codex reports it necessary, using that employee's
own SR identity. Never introduce a service token, alternate MCP URL, Business
Workspace App, or `.app.json` as a fallback.

## Native SR Login Cutover — 0.9.0

After the coordinated backend rollout, update the existing Git installation:

```bash
codex plugin marketplace upgrade standup-republic-private
codex plugin add standup-republic@standup-republic-private --json
codex plugin list --json
```

Verify version `0.9.0` and an enabled installation. Fully restart Codex, open a
new chat, and open **StandUp Republic Internal** in the plugin browser. Complete
its connection prompt; an old connection may require reconnecting once. Sign in
on the SR page with your personal SR work account, check the displayed account
and SR role, then choose **Erlauben**. Return to Codex and start a fresh chat.
No private repository checkout or Workspace membership is needed.

First test prompt:

> Prüfe meine StandUp-Republic-Verbindung und zeige meine persönliche Identität,
> meine aktuelle SR-Rolle und den verfügbaren Plugin-Katalog. Lies anschließend
> die nächsten drei Events, auf die ich Zugriff habe. Führe keine Änderungen aus.

Success means a fresh server response, the expected personal identity/role,
and actual permitted data. Merely seeing an installed plugin is insufficient.
For a write test, first choose a concrete harmless change and inspect its
preview before confirming it; do not mutate arbitrary events just to test access.

The update commands above were checked against the installed Codex CLI help.
OpenAI documents plugin installation/setup followed by a new chat, and restart
for updated local plugin files: [plugin setup](https://developers.openai.com/learn/developers-codex-plugin)
and [plugin packaging](https://developers.openai.com/plugins/build/plugins).
