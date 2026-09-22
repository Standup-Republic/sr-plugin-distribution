# Bookings And Applications

## Use When

- a comedian asks where or when they are booked;
- an application appears missing, rejected, duplicated, or unresolved;
- someone should be booked, moved, removed, invited, accepted, or rejected;
- a slot appears unavailable despite an expected booking or application state.

## Establish

1. Resolve the profile and the relevant dated event, slot, booking, or
   application. A person's existing appearance is normally a booking.
2. For a list across events, use the fitting booking or application Query once;
   do not fan out into per-event Gets.
3. For one known event, Get the necessary booking or lineup sections.
4. Check status, slot time, event time, and conflicts independently. Do not bind
   a slot's time to the event start.

## Decision Branches

- **Application exists, no booking:** report the application state; do not call
  it a confirmed appearance.
- **Booking exists:** use its direct booking or slot ref for supported changes.
- **Free slot required:** resolve the profile and slot together before Prepare.
- **Ambiguous event or person:** ask for only the missing discriminator.
- **No returned rows:** say none were found only after verifying that the
  relevant result collection is actually empty.

## Actions

Use SR Actions for invitations, acceptance, rejection, booking, moving,
removal, host status, or slot visibility. Preserve all date, duration, fee,
conflict, and role qualifiers from the request.

## Answer

Name the dated event, relevant slot or booking state, and requested outcome.
For a list, summarize every returned matching row rather than reporting the
tool's generic success status.
