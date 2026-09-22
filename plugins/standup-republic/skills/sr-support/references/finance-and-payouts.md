# Finance And Payouts

## Use When

- someone asks whether, when, or how much they will be paid;
- an employee needs an event finance summary, settlement, open-payout list, or
  accounting status;
- a payout or closing is reported missing, duplicated, stale, or incorrect.

## Establish

1. Identify whether the request concerns one event, one recipient, a list of
   payouts, or an accounting period.
2. For one known event, prefer Get when its finance section exposes the answer.
   Use Query only for a genuine list, aggregate, ranking, or timeline.
3. Verify amount, currency, recipient, status, period, and freshness separately.
4. Distinguish prepared, scheduled, paid, failed, and reconciled states. A
   settlement or closing does not prove that money was sent.
5. Accept Admin-only denials without searching for an alternate route.

## Decision Branches

- **Exact state available:** answer with the relevant amount and status.
- **Pending or open:** explain the verified state without promising a payment
  date that was not returned.
- **Missing finance capability:** report the boundary; do not derive private
  finance data from unrelated records.
- **Possible mismatch:** separate canonical amount, accounting evidence, and
  uncertainty before recommending an action.

## Actions

Finance actions remain Admin-only and confirmation-gated. Never infer approval,
mark a payout as complete from a read, or expose unrelated recipients' data.

## Answer

Use human amounts and dates. Include only the recipient and event or period
necessary for the case, and separate internal diagnosis from any external draft.
