---
name: sr-support
description: "Investigate forwarded or third-party Standup Republic support reports and draft grounded replies in German or English across Codex, ChatGPT, WhatsApp DM, or an authorized WhatsApp group through the same six-tool SR MCP contract. Use for prompts such as 'Eine Comedienne schreibt, dass ihre Bewerbung weg ist', 'Warum sieht Ben das Event nicht?', 'Eventim zeigt die falsche Kapazität', or when an employee forwards someone else's problem, asks why an observed symptom occurred, or wants a support reply draft. Do not use for direct data questions, lists, routine health checks, or clearly specified changes; route those directly to sr-data or sr-actions."
---

# SR Support

For unknown capabilities or a bundled unavailable/unsupported claim, follow
[Live Capability And Version Check](../sr-plugin/SKILL.md#live-capability-and-version-check)
first. The authenticated live catalog supersedes bundled capability lists;
returned authorization and confirmation policies still apply.


Turn a reported symptom into a grounded diagnosis, a minimal next step, and an
optional reply draft. A report describes an experience; verify the current SR
state before treating its explanation as fact.

## Route First

- Direct question about current data, a list, comparison, or runtime health:
  use SR Data without loading a support runbook.
- Clear request to change SR state: use SR Actions without support triage.
- Forwarded message, third-party problem, unexplained symptom, or requested
  reply draft: continue here.

## Investigate

1. Extract the affected person, direct object, symptom, time or event context,
   and desired outcome from the message and conversation.
2. Read exactly one relevant runbook below. Use the domain glossary only when
   terminology is ambiguous.
3. Use SR Data for the smallest read that confirms or rejects the symptom.
   Reuse conversation facts and refs; do not fan out across domains.
4. State the verified explanation, material uncertainty, and smallest next
   step. If a change is required, hand its exact target, operation, and
   qualifiers to SR Actions without weakening confirmation.

## Answer

Lead with the useful answer or diagnosis. Include only:

- verified facts necessary to explain it;
- material uncertainty or freshness;
- the smallest useful next step;
- a separate external reply draft when requested.

Do not expose internal refs, tool names, private notes, access detail, or finance
data in an external draft unless the recipient genuinely needs that information.
Never claim that a message was sent. Never report a mutation as completed until
SR Actions returns a successful receipt and post-check.

Apply [Response And Channel Policy](../sr-plugin/references/response-and-channel-policy.md)
to multi-step investigation, follow-up context, paginated evidence, group
audience authorization, private continuation, and the single terminal answer.

## Runbooks

- [Identity And Access](references/identity-and-access.md) for login, account,
  role, or access.
- [Bookings And Applications](references/bookings-and-applications.md) for
  applications or bookings.
- [Events And Lineups](references/events-and-lineups.md) for events, dates,
  slots, or lineups.
- [Ticketing And Providers](references/ticketing-and-providers.md) for ticketing
  or provider symptoms.
- [Finance And Payouts](references/finance-and-payouts.md) for payout or
  settlement questions.
- [Runtime And Incidents](references/runtime-and-incidents.md) for suspected
  degraded flows.
- [Response Writing](references/response-writing.md) only when an external
  reply is requested.
- [Error And Retry Patterns](../sr-plugin/references/error-and-retry-patterns.md)
  after a typed error, stale response, partial result, or timeout.
