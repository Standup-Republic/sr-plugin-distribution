#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const canonical = "standup-republic-private";
const repository = "Standup-Republic/sr-plugin-distribution";
const developerRepository = "Standup-Republic/sr-codex-plugin";
// SemVer build metadata identifies packaging, not release precedence. Keep
// prerelease identifiers significant so an RC never matches a stable release.
const releaseVersion = (version) => String(version).split("+")[0];
export function inspectInstallation(plugins, marketplaces, expectedVersion, basis) {
  const installed = (plugins.installed ?? []).filter((p) => p.name === "standup-republic");
  const normalize = (s) => String(s ?? "").replace(/^https:\/\/github.com\//, "").replace(/^git@github.com:/, "").replace(/\.git$/, "").replace(/\/$/, "");
  const entries = installed.map((p) => {
    const market = (marketplaces.marketplaces ?? []).find((m) => m.name === p.marketplaceName);
    const source = p.marketplaceSource ?? market?.marketplaceSource;
    return {
      plugin_id: p.pluginId, version: p.version ?? null, enabled: p.enabled,
      version_status: !p.version ? "unknown" : (basis === "server_hint" ? releaseVersion(p.version) === releaseVersion(expectedVersion) : p.version === expectedVersion) ? "matches_expected" : "differs_from_expected",
      source_status: p.marketplaceName === canonical && source?.sourceType === "git" && normalize(source.source) === repository ? "canonical_git" : p.marketplaceName === canonical && source?.sourceType === "git" && normalize(source.source) === developerRepository ? "developer_git" : source?.sourceType === "local" || p.source?.source === "local" && !source ? "local" : "noncanonical_or_unknown",
      branch_status: "not_exposed_by_list_commands",
      marketplace_source: source ?? null, plugin_source: p.source ?? null,
    };
  });
  return { expected_version: expectedVersion, version_basis: basis, latest_release_independently_verified: false, installed: entries, duplicate_installations: entries.length > 1, needs_attention: entries.length !== 1 || entries.some((p) => p.version_status !== "matches_expected" || !["canonical_git", "developer_git"].includes(p.source_status) || p.enabled !== true), mutated: false };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    if (args.length && (args.length !== 2 || args[0] !== "--latest-version" || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(args[1]))) throw new Error("Usage: node check-update.mjs [--latest-version VERSION_FROM_SERVER_HINT]");
    const manifest = JSON.parse(readFileSync(new URL("../.codex-plugin/plugin.json", import.meta.url), "utf8"));
    const run = (args) => JSON.parse(execFileSync("codex", args, { encoding: "utf8", timeout: 30000, maxBuffer: 4 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"] }));
    const result = inspectInstallation(run(["plugin", "list", "--json"]), run(["plugin", "marketplace", "list", "--json"]), args[1] ?? manifest.version, args.length ? "server_hint" : "packaged_manifest_only");
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(JSON.stringify({ status: "diagnostic_failed", message: error.message, mutated: false }));
    process.exitCode = 1;
  }
}
