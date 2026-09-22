import { createHash } from "node:crypto";
import { access, readFile, readdir } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const expectedSkills = ["sr-actions", "sr-coordination", "sr-data", "sr-plugin", "sr-support", "sr-update"];
const expectedTools = ["sr_entity_resolve", "sr_entity_get", "sr_entity_query", "sr_runtime_health", "sr_action_prepare", "sr_action_execute"];
const endpoint = "https://plugin-mcp.sr-admin.tools/mcp";

const manifest = JSON.parse(await readFile(resolve(root, ".codex-plugin/plugin.json"), "utf8"));
const mcp = JSON.parse(await readFile(resolve(root, ".mcp.json"), "utf8"));
const oauth = JSON.parse(await readFile(resolve(root, "employee-oauth.contract.json"), "utf8"));
const lock = JSON.parse(await readFile(resolve(root, "artifact-followup.lock.json"), "utf8"));
const dataContract = JSON.parse(await readFile(resolve(root, "skills/sr-data/references/mcp-data-contract.json"), "utf8"));
const contractSource = JSON.parse(await readFile(resolve(root, "contract-source.json"), "utf8"));

const skills = (await readdir(resolve(root, "skills"), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
if (JSON.stringify(skills) !== JSON.stringify(expectedSkills)) failures.push("Personal Pro package must contain exactly six canonical skills");
if (JSON.stringify(Object.keys(dataContract.public_tools)) !== JSON.stringify(expectedTools)) failures.push("Personal Pro public tool contract differs from exact-six");
if (manifest.name !== "standup-republic" || !/^[0-9]+\.[0-9]+\.[0-9]+(?:\+[A-Za-z0-9.-]+)?$/.test(manifest.version)) failures.push("Personal Pro Git marketplace identity/version mismatch");
if (manifest.mcpServers !== "./.mcp.json" || "apps" in manifest) failures.push("Personal Pro manifest must mount only bundled MCP");
try {
  await access(resolve(root, ".app.json"));
  failures.push("Personal Pro package must not contain .app.json");
} catch {}
const server = mcp.mcpServers?.["standup-republic"];
if (server?.http_headers?.["X-SR-Plugin-Version"] !== manifest.version || lock.candidate_owner?.personal_pro_contract?.candidate_version !== manifest.version) failures.push("Release version declarations differ");
if (
  server?.url !== endpoint ||
  server?.auth !== "oauth" ||
  server?.startup_timeout_sec !== 45 ||
  server?.tool_timeout_sec !== 60 ||
  "bearer_token_env_var" in (server ?? {})
) failures.push("Personal Pro MCP must use the durable canonical interactive OAuth configuration");
if (
  oauth.distribution_surface !== "personal_pro" ||
  oauth.employee_mcp_endpoint !== endpoint ||
  oauth.resource !== endpoint ||
  oauth.authentication !== "interactive_personal_oauth" ||
  oauth.schema_version !== "sr_employee_oauth_resource_v2" ||
  oauth.grant_policy?.access_token_lifetime !== "15m" ||
  oauth.grant_policy?.refresh_grant_session_duration !== "720h" ||
  oauth.grant_policy?.reauthorization_required_after_expiry_or_revocation !== true ||
  oauth.grant_policy?.server_side_role_and_scope_revalidation_on_refresh !== true ||
  oauth.client_registration_policy?.dynamic_client_registration_required !== true ||
  oauth.client_registration_policy?.preserve_registered_client_during_runtime_releases !== true ||
  oauth.client_registration_policy?.service_token_fallback_for_people !== false ||
  oauth.mcp_mount?.kind !== "bundled_mcp_json" ||
  oauth.mcp_mount?.workspace_app_dependency !== false ||
  "registered_workspace_app" in oauth ||
  JSON.stringify({ manifest, mcp, oauth }).includes("asdk_app_")
) failures.push("Personal Pro OAuth contract depends on a Workspace App");
if (lock.skill_bundle_version !== `${manifest.version}-personal-pro.1` || lock.mcp_contract?.public_tool_count !== 6 || JSON.stringify(lock.mcp_contract?.public_tools) !== JSON.stringify(expectedTools)) failures.push("Personal Pro content lock mismatch");
if (lock.candidate_owner?.personal_pro_contract?.capability_fork !== false || lock.candidate_owner?.personal_pro_contract?.workspace_app_dependency !== false) failures.push("Personal Pro candidate ownership mismatch");
for (const [path, expectedHash] of Object.entries(contractSource.generated)) {
  const actualHash = createHash("sha256").update(await readFile(resolve(root, path))).digest("hex");
  if (actualHash !== expectedHash) failures.push(`${path}: generated contract drift`);
}

const contentHash = createHash("sha256");
async function listFiles(directory) {
  const nested = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === ".DS_Store") continue;
    const target = join(directory, entry.name);
    if (entry.isDirectory()) nested.push(...await listFiles(target));
    else if (entry.isFile() && !["baseline.lock.json", "artifact-followup.lock.json"].includes(entry.name)) nested.push(target);
  }
  return nested;
}
for (const path of (await listFiles(root)).sort((left, right) => left.localeCompare(right))) {
  contentHash.update(relative(root, path));
  contentHash.update("\0");
  contentHash.update(await readFile(path));
  contentHash.update("\0");
}
const actualContentHash = contentHash.digest("hex");
if (lock.content_sha256_excluding_lock !== actualContentHash) failures.push("Personal Pro content fingerprint mismatch");

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(JSON.stringify({
  status: "ok",
  distribution_surface: "personal_pro",
  plugin_id: manifest.name,
  plugin_version: manifest.version,
  update_channel: "public_git_marketplace",
  public_tools: expectedTools,
  mcp_endpoint: endpoint,
  workspace_app_dependency: false,
  personal_pro_live_status: "production_resource_live_employee_reconnect_required",
  content_sha256: actualContentHash,
}));
