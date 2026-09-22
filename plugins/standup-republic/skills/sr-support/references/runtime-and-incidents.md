# Runtime And Incidents

## Use When

- several people report that the same workflow is unavailable;
- the user asks whether SR, a pipeline, or an integration is currently down;
- a single support symptom could be caused by a broader runtime degradation.

## Establish

1. Use runtime Health only for runtime-wide service or pipeline state. Do not
   replace an entity investigation with Health merely because the symptom is
   unclear.
2. Use summary for normal employee checks. Use diagnostic only for an
   authenticated Admin request that needs it.
3. Prefer a short recent time window for “now” or “currently”. Record returned
   coverage and freshness before drawing a conclusion.
4. Correlate the reported workflow with the affected service or pipeline only
   when the returned evidence supports that relationship.

## Decision Branches

- **Healthy runtime:** continue with the direct entity or access investigation;
  do not dismiss the person's report.
- **Confirmed degradation:** state affected surface, observed state, freshness,
  and known limitation. Do not claim an unreturned root cause.
- **Coverage gap or stale health:** report that the system state cannot be
  verified currently.
- **Single-record failure:** treat it as an operational support case unless
  broader evidence establishes an incident.

## Actions

This plugin may explain health and supported recovery actions, but must not
deploy, edit infrastructure, restart arbitrary services, or bypass a disabled
capability.

## Answer

Lead with healthy, degraded, or unverifiable. Then state affected scope,
freshness, user impact, and the smallest next step.
