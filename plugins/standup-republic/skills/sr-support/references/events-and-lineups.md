# Events And Lineups

## Use When

- “show” could mean a show series or one dated performance;
- a date, venue, lineup, host, slot, or event relationship is unclear;
- someone reports the wrong event details or asks which event a record belongs
  to.

## Establish

1. Treat date or place wording as evidence for an event, even when the user says
   “Show”. Treat a reusable format without a date as a show.
2. Preserve provider identifiers, local calendar dates, city, venue, and
   relationship wording in Resolve.
3. Resolve all directly named dependencies together. Reuse any canonical refs
   already established in the conversation.
4. For one known event, Get all requested schedule, location, lineup, booking,
   ticketing, or finance sections in one call.

## Decision Branches

- **One clear candidate:** continue with its canonical event ref.
- **Several plausible candidates:** present the useful discriminators and ask
  one focused clarification.
- **No candidate:** state the criteria searched; do not invent an event or
  silently fall back to a show series.
- **Lineup relationship:** distinguish slot availability from an existing
  booking and from an application.

## Actions

Use SR Actions for event, show, slot, lineup, host, booking, or note changes.
Select the operation first and resolve the direct reference fields it requires.

## Answer

Use natural labels, date, city, venue, and time. Internal refs are unnecessary
unless they disambiguate two otherwise identical targets.
