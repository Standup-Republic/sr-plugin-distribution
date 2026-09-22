import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const pluginRoot = resolve(scriptDir, "..");
const toolsRoot = resolve(process.argv[2] ?? "");
if (process.argv[2] === undefined) {
  throw new Error("Usage: node scripts/sync-mcp-contracts.mjs <current-tools-repo>");
}

const contractsPackage = "packages/sr-mcp-contracts";
const canonicalArtifactPaths = [
  "apps/sr-mcp/SITE-API-CONTRACT.md",
  "apps/sr-mcp/PRODUCTION-RUNBOOK.md",
  "apps/sr-mcp/RUNTIME-API-CONTRACT.md",
  "apps/sr-mcp/GENERATED-PLUGIN-DATA-CONTRACT.json",
  "apps/sr-mcp/GENERATED-PLUGIN-ACTION-REFERENCE.md",
];
const dirtyContract = execFileSync(
  "git",
  ["-C", toolsRoot, "status", "--porcelain", "--", contractsPackage, ...canonicalArtifactPaths, "package.json", "package-lock.json"],
  { encoding: "utf8" },
).trim();
if (dirtyContract !== "") {
  throw new Error(`Refusing to attest dirty contract build inputs:\n${dirtyContract}`);
}
execFileSync(
  "npm",
  ["run", "build", "--workspace", "@standup-republic/sr-mcp-contracts"],
  { cwd: toolsRoot, stdio: "inherit" },
);

const contractsPath = resolve(toolsRoot, contractsPackage, "dist/index.js");
const zodPath = resolve(toolsRoot, "node_modules/zod/v4/index.js");
const contracts = await import(pathToFileURL(contractsPath));
const { z } = await import(pathToFileURL(zodPath));

const dataDir = resolve(pluginRoot, "skills/sr-data/references");
const actionsDir = resolve(pluginRoot, "skills/sr-actions/references");
const sourcePath = resolve(toolsRoot, "packages/sr-mcp-contracts/src/index.ts");
await Promise.all([mkdir(dataDir, { recursive: true }), mkdir(actionsDir, { recursive: true })]);

const dataContract = `${contracts.renderSrMcpPluginDataContract().trimEnd()}\n`;
const rawActionReference = contracts.renderSrMcpPluginActionReference().trimEnd();
const actionHeadings = [...rawActionReference.matchAll(/^### `(.+)`$/gm)].map((match) => match[1]);
const actionContents = [
  "## Contents",
  "",
  ...actionHeadings.map((heading) => `- [\`${heading}\`](#${heading.toLowerCase().replace(/[^a-z0-9 -]/g, "").replaceAll(" ", "-")})`),
  "",
].join("\n");
const actionReference = `${rawActionReference.replace("# SR MCP Action Reference\n\n", `# SR MCP Action Reference\n\n${actionContents}\n`)}\n`;
const toolSchemas = `${JSON.stringify({
  contract_version: contracts.SR_MCP_CONTRACT_VERSION,
  public_tool_count: contracts.SR_MCP_TOOL_NAMES.length,
  tools: Object.fromEntries(contracts.SR_MCP_TOOL_NAMES.map((name) => [name, {
    metadata: contracts.SR_MCP_TOOL_METADATA[name],
    input_schema: z.toJSONSchema(contracts.SrMcpToolInputSchemas[name]),
    output_schema: z.toJSONSchema(contracts.SrMcpToolOutputSchemas[name]),
  }])),
}, null, 2)}\n`;
const actionOperationContract = `${JSON.stringify({
  contract_version: contracts.SR_MCP_CONTRACT_VERSION,
  operations: contracts.SR_MCP_ACTION_OPERATION_REGISTRY,
}, null, 2)}\n`;
const canonicalArtifacts = Object.fromEntries(await Promise.all(canonicalArtifactPaths.map(async (path) => [
  path,
  await readFile(resolve(toolsRoot, path)),
])));
if (canonicalArtifacts["apps/sr-mcp/GENERATED-PLUGIN-DATA-CONTRACT.json"].toString() !== dataContract) {
  throw new Error("Generated Plugin data contract differs from the canonical SR MCP artifact");
}
if (canonicalArtifacts["apps/sr-mcp/GENERATED-PLUGIN-ACTION-REFERENCE.md"].toString().trimEnd() !== rawActionReference) {
  throw new Error("Generated Plugin action reference differs from the canonical SR MCP artifact");
}

const data = JSON.parse(dataContract);
const profileRows = Object.entries(data.entity_query.profiles).map(([name, value]) => {
  const list = (items) => items.length === 0 ? "—" : items.map((item) => `\`${typeof item === "string" ? item : `${item.field} ${item.direction}`}\``).join(", ");
  const filterContract = value.filter_contract === undefined ? "" : ` Details: ${Object.entries(value.filter_contract).map(([key, description]) => `\`${key}\`=${description}`).join("; ")}.`;
  const projection = value.select_fields.length === 0 ? "—" : `${list(value.select_fields)}; default: ${list(value.default_select)}`;
  return `| \`${name}\` | \`${value.availability}\` / \`${value.required_role}\` | ${value.purpose} | ${list(value.scope_entity_types)} | ${list(value.result_entity_types)} | ${list(value.filters)}${filterContract} | ${list(value.group_by)} | ${list(value.sorts)} | ${projection} |`;
});
const queryReference = `${[
  "# SR Query Profiles",
  "",
  `Generated from \`SR_MCP_QUERY_PROFILE_REGISTRY\` for contract ${contracts.SR_MCP_CONTRACT_VERSION}. Do not edit by hand.`,
  "",
  "Use one fitting profile. Filters, grouping, sorts, select fields, defaults, roles, scopes, and availability are exact. Preserve the complete query shape when following a cursor.",
  "",
  "| Profile | Availability / role | Purpose | Scope | Results | Filters | Group by | Sorts | Select / default |",
  "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
  ...profileRows,
].join("\n")}\n`;

const outputs = {
  "skills/sr-actions/references/action-operations.md": actionReference,
  "skills/sr-actions/references/action-operation-contract.json": actionOperationContract,
  "skills/sr-data/references/mcp-data-contract.json": dataContract,
  "skills/sr-data/references/mcp-tool-schemas.json": toolSchemas,
  "skills/sr-data/references/query-profiles.md": queryReference,
};
for (const [relativePath, content] of Object.entries(outputs)) {
  await writeFile(resolve(pluginRoot, relativePath), content);
}

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const source = await readFile(sourcePath);
const compiled = await readFile(contractsPath);
const sourceCommit = execFileSync("git", ["-C", toolsRoot, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const repositoryDirty = execFileSync("git", ["-C", toolsRoot, "status", "--porcelain"], { encoding: "utf8" }).trim() !== "";
const fingerprint = {
  schema_version: "sr_plugin_contract_source_v1",
  contract_version: contracts.SR_MCP_CONTRACT_VERSION,
  source_repository_commit: sourceCommit,
  source_repository_dirty: repositoryDirty,
  source_contract_inputs_dirty: false,
  source_contract_sha256: sha256(source),
  compiled_contract_sha256: sha256(compiled),
  canonical_artifacts: Object.fromEntries(Object.entries(canonicalArtifacts).map(([path, content]) => [path, sha256(content)])),
  generated: Object.fromEntries(Object.entries(outputs).map(([path, content]) => [path, sha256(content)])),
};
await writeFile(resolve(pluginRoot, "contract-source.json"), `${JSON.stringify(fingerprint, null, 2)}\n`);
