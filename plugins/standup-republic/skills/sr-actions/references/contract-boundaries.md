# Action Contract Boundaries

These are current backend-contract boundaries, not permissions to guess.

## Direct References

Resolve connects Product types `event`, `location`, `profile`, and `show`. The
Coordination also connects `artifact`, `plugin_user`, `message`, `project`,
`priority_item`, and the legacy `attachment` alias; SR Coordination owns those
workflows. Acquire Product refs:

- `slot_ref` from `available_slots_v1` or an event lineup projection;
- `booking_ref` from `bookings_v1` or a returned booking projection;
- `application_ref` from `open_applications_v1`;
- `class_ref` or ticket-area refs from an event Get using `ticketing`, `prices`,
  and `capacity`;
- other non-resolver refs only from an explicit returned projection.

Stop when the required ref is not exposed. Never substitute an event ref.

## Payload Detail

The generated operation registry publishes top-level field variants plus a
payload guide, but the two representations are not fully consistent. Treat:

- `payload_guide` as the stricter semantic shape and value constraint;
- `payload_variants.required` as additional required-field minima;
- variant-only optional fields absent from the guide as unavailable;
- guide-required fields that a variant marks optional as required.

Current known disagreements include `event.cancel`, `event.create_recurring`,
and the second `show.create_with_events` variant. Omit variant-only extras; add
the stricter guide-required field. If the requested outcome cannot be expressed
under both representations, report `blocked` with a backend-contract gap.

Some nested objects are described only by the guide and do not yet have a
complete machine-readable nested JSON Schema. When a nested value cannot be
represented exactly from the guide and returned context, report `blocked`.
Do not invent nested keys or use Prepare as a schema loop.

## Idempotency

Execute metadata requires `^[A-Za-z0-9._~-]{16,128}$`, while the current
generated JSON Schema is more permissive. Follow the stricter metadata rule.
Never repair a user-supplied key silently and never create a new key to bypass
an uncertain outcome. A first committed Execute returns `replayed=false`; an
identical same-token, same-key replay returns `replayed=true` with the identical
receipt and no second mutation.

## Current Execute State

The source candidate contains an explicit named action catalog. Discover live
adapter availability and exact payloads before Prepare; registry membership is
not authority to Execute. Both admitted Staff tiers use canonical Web rights.
There is no normal-Admin write ban or temporary plugin Admin-session bypass.
Follow the actual manifest confirmation policy. Retired coordination and
plugin-user administration operations are not available.

For operations with an external delivery stage, an internal committed entity
or queued outbox item is not delivery evidence. Report only the highest stage
proven by the canonical receipt and readback; never upgrade `committed` or
`queued` to sent, delivered, or received.

Tool visibility is not authorization. The MCP authenticates the actor and
revalidates role, policy, prepared state, target state, and required
confirmation before Execute. Stop on every typed denial and never reinterpret
a non-active operation merely because `sr_action_execute` is visible.
