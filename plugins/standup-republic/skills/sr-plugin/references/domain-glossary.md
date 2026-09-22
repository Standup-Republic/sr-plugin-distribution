# SR Domain Glossary

Use this reference when ordinary wording does not map cleanly to the canonical
SR entity or capability model. Prefer the user's intended real-world object;
do not force internal terminology into the final answer.

## Events And Lineups

- **Show:** reusable format or series, such as Comedyflash. It has no single
  performance date. In ordinary speech, users often say “Show” when they mean a
  dated event.
- **Event:** one scheduled performance of a show at a date, time, and location.
  Date or place wording normally indicates an event.
- **Location:** canonical venue or place record. It is not an event.
- **Slot:** a lineup time window belonging to an event. A slot can be free,
  private, public, or occupied depending on current state.
- **Booking:** the relationship placing one profile into a slot. Questions about
  a person's existing appearance normally concern a booking, not only a slot.
- **Application:** a person's request for an available slot. An application is
  not a confirmed booking.

## People, Organizations, And Access

- **Profile:** canonical SR person or account identity used by product records.
- **Organization:** promoter or operating organization associated with product
  access and events.
- **Product role/access:** authorization inside the SR product, such as
  Comedian, Veranstalter, Administrator, or Customer.
- **Plugin role:** authorization to use this internal plugin as Employee or
  Admin. It is separate from Product roles and must never be inferred from one.

## Internal Coordination

- **Plugin user:** allowlisted internal Plugin identity with its own role,
  scopes, revocation state, and optional Product actor mapping.
- **Message:** permission-filtered communication record from direct
  Coordination or an ingested text channel. It is not by itself proof of an
  external notification or complete source coverage.
- **Priority item:** Admin-only board card with `sr:priority_item:<uuid>` ref,
  state, status, numeric priority, optional blocker/deadline, order, and revision.
  It has no assignee, Project, comments, or attachments. Historical
  `sr:task:*` Coordination tasks remain archived and are never board cards.
- **Attachment:** private bounded file object with short-lived transfer grants;
  never expose or persist a grant. Existing 30-day file sends are compatibility
  views over canonical Artifacts.
- **Artifact:** stable identity backed exclusively by immutable private R2
  content versions or one verified link-only Google Drive file. Drive content
  and permissions remain at Google; lifecycle, retention, audience grants,
  provider metadata and links are audited. Raw provider and Meeting evidence
  is immutable.
- **Signal/link:** stored bounded operational signal or typed relationship.
  Coverage depends on the active source collectors and their freshness.
- **Activity event:** redacted team-visible Coordination activity. It excludes
  message bodies, prompts, file grants, and raw tool arguments.

## Ticketing And Providers

- **Ticket class:** canonical SR ticket configuration such as Hauptrang, price,
  capacity, and active state.
- **Provider ticket area:** external provider representation of inventory. It
  may correspond to a ticket class but is not canonical SR state.
- **Capacity:** maximum canonical inventory for the relevant event or class.
- **Sold quantity:** tickets already sold. Never propose capacity below this
  floor.
- **Remaining quantity:** capacity minus committed or sold inventory according
  to the returned projection. Do not recalculate when the projection provides
  the authoritative value.
- **Provider link:** association between an SR event and a provider event or
  identifier.
- **Sync settings:** configuration controlling whether price or capacity sync
  is enabled.
- **Sync request:** an instruction to run or retry synchronization. A request
  does not change the settings themselves.
- **Canonical state:** SR/Main App product truth used for general reads and
  writes.
- **Provider-live state:** current external-provider data, available only when
  an exposed Admin capability returns it.

## Finance And Reliability

- **Payout:** payment owed or made to a person or organization.
- **Closing/settlement:** financial aggregation or reconciliation for an event
  or accounting period. It is not proof that a payout was sent.
- **Prepare manifest:** immutable preview of one proposed action, including its
  target, expected change, warnings, expiry, and confirmation token.
- **Confirmation policy:** manifest-owned rule. Product operations currently
  require explicit approval of the prior preview; current Coordination
  operations are `not_required` and continue directly from Prepare to Execute.
- **Execute receipt:** evidence that the confirmed manifest ran or replayed.
- **Post-check:** canonical verification of the resulting state.
- **Unknown outcome:** transport or response uncertainty after a possible
  mutation. Reconcile the returned operation run; never retry blindly.
