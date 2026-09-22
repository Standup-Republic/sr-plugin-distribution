# SR Error And Retry Patterns

Use the structured result before prose. Branch on `status`, `error_code`, and
`error.retryable`; preserve the original business intent and exact inputs.
Keep correction, retry, reconciliation, and supersession internal. The visible
response is one current terminal result, not a transcript of attempts.

## Shared Error Evidence

All six public tools use an output-schema-valid typed error envelope. Read
`error.error_code`, `error.result_status`, `error.message`,
`error.retryable`, and optional `error.details`. A
`schema_validation_failed` result may include safe machine-readable
`missing_fields`, `unexpected_fields`, `expected_shapes`, or reconciliation
instructions. It never contains secrets or raw Product rows. Keep this
evidence internal unless technical diagnosis was explicitly requested.

## Read Calls

- **Invalid input:** correct one obvious schema error using the returned
  allowlist or expected shape. Do not probe aliases or unrelated profiles.
- **Ambiguous:** present the useful candidates and ask for one discriminator.
- **Not found:** report the exact searched criteria; do not switch entity type
  or claim an empty list without explicit empty-result evidence.
- **Permission denied:** report the role or policy boundary. Do not retry with a
  broader scope or alternate data source. Explain the denial once and briefly.
- **Not connected / unsupported / blocked:** stop and state the capability
  boundary. Do not emulate it.
- **Partial coverage or stale data:** answer only the grounded portion and name
  the missing or stale source.
- **Retryable transport failure:** retry the identical read once when the user
  still needs it. Preserve cursor and query shape for paginated reads. Suppress
  the failed intermediate attempt and any stale result it produced.

## Actions

- **Prepare invalid:** correct one obvious payload error within the same frozen
  operation. Never switch operations to obtain validation.
- **Prepare denied, blocked, or unsupported:** stop before Execute.
- **Expired manifest or state conflict:** do not Execute. Prepare again only if
  the user still wants the action, then follow the new manifest's returned
  confirmation policy. Never import confirmation from an expired manifest.
- **Execute partial:** report each completed and failed item; never imply full
  success or automatically execute a compensating action.
- **Replay:** the first committed Execute returns `replayed=false`; an
  identical same-token, same-key replay returns `replayed=true` with the
  identical receipt, and no second mutation occurs.
- **Unknown transport outcome:** use the returned `operation_run_ref` with Get
  sections `status`, `receipt`, and `post_check`. Reuse the same prepare token
  and idempotency key only if the reconciled contract explicitly permits the
  identical retry. Never invent or repair a caller-controlled idempotency key.

After any retry or reconciliation, discard every result older than the newest
canonical state. If the final state is still unknown, say only that it could
not yet be verified and that no second action was started; do not expose the
run, receipt, ref, error code, or English raw status unless technical diagnosis
was explicitly requested.

Never convert `retryable: true` or `confirmation_policy=not_required` into
permission to broaden scope, create a new idempotency key, or use a different
capability. Never ask for confirmation when the manifest says it is not
required, and never omit it when the manifest says it is required.
