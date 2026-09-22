# Ticketing And Providers

## Use When

- reported price, capacity, sold count, or remaining inventory differs;
- a provider event is missing, linked incorrectly, stale, or unsynchronized;
- price or capacity sync is disabled, failed, or should run again;
- an Eventim, Eventbrite, or later-provider identifier must be related to SR.

## Establish

1. Resolve the exact dated event and direct ticket class or provider identifier
   when named.
2. Read canonical ticket classes, price, capacity, sold floor, remaining
   quantity, sync settings, link state, freshness, and warnings relevant to the
   symptom.
3. Use provider-live data only through an exposed and authorized Admin read.
   Absence of provider-live evidence is not proof of a discrepancy.
4. Distinguish canonical configuration, provider link, sync settings, sync run,
   and stale external display.

## Decision Branches

- **Canonical value wrong:** route the direct ticket-class or setting change.
- **Settings disabled:** a settings change is required; a sync retry will not
  enable them.
- **Failed sync:** preserve the failed-only retry scope when requesting a retry.
- **Missing or wrong link:** verify both sides before preparing a link change.
- **Capacity change:** never propose a value below the returned sold floor.
- **Provider-live unavailable:** report the limitation without inventing the
  external state.

## Actions

Read the generated Action Operations reference before preparing a ticket-class,
link, sync-setting, sync-request, or provider-live operation. Keep these intents
separate and carry all limits and state qualifiers into the payload.

## Answer

State canonical SR value first, then provider-live value and freshness when
actually returned, followed by the verified discrepancy and next step.
