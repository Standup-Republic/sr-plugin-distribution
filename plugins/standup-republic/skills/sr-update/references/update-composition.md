# Update Composition

## Source Order

1. Current conversation facts and stable canonical refs.
2. Fresh SR Data reads for requested Product or runtime facts.
3. Authenticated coordination reads only when the coordination capability is
   connected and requested.
4. User-provided external context, labeled as reported rather than verified.

## Output Shape

- **Stand:** the most important current result in one or two sentences.
- **Neu:** materially changed facts with freshness.
- **Offen:** blockers, decisions, due items, or unknowns actually evidenced.
- **Nächster Schritt:** one useful action or clear owner.
- **Abdeckung:** only when a requested source is unavailable, stale, or partial.

Deduplicate the same fact across sources. Do not treat old prose as current when
a cheap fresh read exists. Do not imply that no priority card or message is open when the
coordination source is unavailable.
