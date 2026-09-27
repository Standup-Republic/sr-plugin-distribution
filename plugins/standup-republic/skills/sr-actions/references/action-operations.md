# SR MCP Action Reference

## Contents

- [`application.accept`](#applicationaccept)
- [`application.reject`](#applicationreject)
- [`batch.execute`](#batchexecute)
- [`booking.move`](#bookingmove)
- [`booking.remove`](#bookingremove)
- [`comedian.book`](#comedianbook)
- [`communication.message.acknowledge`](#communicationmessageacknowledge)
- [`communication.message.archive`](#communicationmessagearchive)
- [`communication.message.complete`](#communicationmessagecomplete)
- [`communication.message.reply`](#communicationmessagereply)
- [`communication.message.send`](#communicationmessagesend)
- [`coordination.artifact.create`](#coordinationartifactcreate)
- [`coordination.artifact.delete`](#coordinationartifactdelete)
- [`coordination.artifact.grant.add`](#coordinationartifactgrantadd)
- [`coordination.artifact.grant.revoke`](#coordinationartifactgrantrevoke)
- [`coordination.artifact.link.add`](#coordinationartifactlinkadd)
- [`coordination.artifact.link.remove`](#coordinationartifactlinkremove)
- [`coordination.artifact.update`](#coordinationartifactupdate)
- [`coordination.artifact.upload_finalize`](#coordinationartifactuploadfinalize)
- [`coordination.artifact.version.create`](#coordinationartifactversioncreate)
- [`coordination.priority_item.complete`](#coordinationpriorityitemcomplete)
- [`coordination.priority_item.create`](#coordinationpriorityitemcreate)
- [`coordination.priority_item.update`](#coordinationpriorityitemupdate)
- [`coordination.whatsapp_history.import`](#coordinationwhatsapphistoryimport)
- [`coordination.whatsapp_history.rollback`](#coordinationwhatsapphistoryrollback)
- [`event.bulk_metadata_update`](#eventbulkmetadataupdate)
- [`event.cancel`](#eventcancel)
- [`event.create`](#eventcreate)
- [`event.create_recurring`](#eventcreaterecurring)
- [`event.internal_note.set`](#eventinternalnoteset)
- [`event.lineup_message.send`](#eventlineupmessagesend)
- [`event.public_description.set`](#eventpublicdescriptionset)
- [`event.public_title.set`](#eventpublictitleset)
- [`event.update`](#eventupdate)
- [`export.generate`](#exportgenerate)
- [`host.set`](#hostset)
- [`infrastructure.capacity_schedule`](#infrastructurecapacityschedule)
- [`invitation.create`](#invitationcreate)
- [`location.create`](#locationcreate)
- [`ownership_transfer.prepare`](#ownershiptransferprepare)
- [`payment_account.relink`](#paymentaccountrelink)
- [`payment_account.unlink_for_reonboarding`](#paymentaccountunlinkforreonboarding)
- [`product_access.change_role`](#productaccesschangerole)
- [`product_access.grant`](#productaccessgrant)
- [`profile.editorial.update`](#profileeditorialupdate)
- [`provider_event.create`](#providereventcreate)
- [`provider_link.bulk_set`](#providerlinkbulkset)
- [`provider_link.remove`](#providerlinkremove)
- [`provider_link.set`](#providerlinkset)
- [`provider_ticketing.override_live`](#providerticketingoverridelive)
- [`show.create`](#showcreate)
- [`show.create_with_events`](#showcreatewithevents)
- [`slot.create`](#slotcreate)
- [`slot.fee.set`](#slotfeeset)
- [`spot_mode.set`](#spotmodeset)
- [`ticketing.canonical_price.set`](#ticketingcanonicalpriceset)
- [`ticketing.contingent.set`](#ticketingcontingentset)
- [`ticketing.sync.request`](#ticketingsyncrequest)
- [`ticketing.sync_settings.set`](#ticketingsyncsettingsset)
- [`ticketing.ticket_class.create`](#ticketingticketclasscreate)
- [`ticketing.ticket_class.update`](#ticketingticketclassupdate)

Generated from `SR_MCP_ACTION_OPERATION_REGISTRY` for contract 2026-07-27. Do not edit by hand.

Availability: `active`, `gated`, `blocked`, `unsupported`, or `local-only`. `employee` means Employee and Admin; `admin` means Admin-only. Every action uses Prepare then Execute. `required` pauses for explicit user confirmation; `not_required` executes immediately after Prepare without another user turn.

## Result truthfulness

A successful action proves only its canonical internal contract unless `post_check.external_effects` separately contains canonical evidence. `requested` proves only durable Main App outbox acceptance; claim provider acceptance only from `provider_accepted`, sending only from `sent`, delivery only from `delivered`, and reading only from `read`. State `not_requested_by_policy`, `requested`, `queued`, `processing`, `provider_unknown`, `failed`, or `unknown` explicitly; never paraphrase them as sent, delivered, received, published, shared, or successfully dispatched. Reconcile unknown outcomes through the same `operation_run_ref` and idempotency key; never blind-retry with a new key.

### `application.accept`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `booking` (normally omit `domain`; the server derives it)
- External-effect mode: `receipt_required`
- External-effect kind: `email`
- Effect claim boundary: Use only the Main App-owned delivery intent and its current canonical stage; internal acceptance alone never proves sending or delivery.
- Evidence-safe success summary: Application accepted and Booking read back internally; email state is reported separately from the canonical Main App receipt.
- Targets: `application`, `booking`
- Required ref fields: `application_ref`
- Creates entity: `booking`
- Existing dependencies: `application`
- Use when: accept one existing open application.
- Not for: rejecting or moving a booking.
- Payload: `{application_ref}`

### `application.reject`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `booking` (normally omit `domain`; the server derives it)
- External-effect mode: `receipt_required`
- External-effect kind: `email`
- Effect claim boundary: Only the Main App delivery receipt proves the rejection email stage; a rejected application alone does not prove delivery.
- Evidence-safe success summary: Application rejected and read back internally; email state is reported separately from the canonical Main App receipt.
- Targets: `application`
- Required ref fields: `application_ref`
- Creates entity: no
- Existing dependencies: `application`
- Use when: reject one existing open application.
- Not for: accepting an application or removing a confirmed booking.
- Payload: `{application_ref,reason?}`

### `batch.execute`

- Availability: `active`
- Required role: `admin`
- Confirmation policy: `required`
- Domain: `admin` (normally omit `domain`; the server derives it)
- External-effect mode: `aggregate`
- External-effect kind: `none`
- Effect claim boundary: Derive external-effect claims only from the frozen child receipts; aggregate success never upgrades a child's not_requested, pending, failed, or unknown state.
- Evidence-safe success summary: Best-effort batch completed with independently typed child readbacks; external effects remain exactly as stated by each child receipt.
- Targets: `operation_run`
- Required ref fields: `items[].payload`
- Creates entity: `operation_run`
- Existing dependencies: none
- Use when: freeze 2-50 related, individually valid Admin-scope actions from one clear user intent into one preview, one confirmation, and one canonical aggregate receipt.
- Not for: unrelated intents, Finance/Payment/Payout/Credential/Identity/Role/destructive/irreversible/provider-wide actions, nested batches or sessions, or pretending best-effort execution is atomic.
- Payload: `{intent,items:[{operation,payload,reason?}] (2..50),failure_policy?:'stop'|'continue',atomicity:'best_effort'}`

### `booking.move`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `booking` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `booking`, `slot`
- Required ref fields: `from_slot_ref`, `to_slot_ref`
- Creates entity: no
- Existing dependencies: `booking`, `slot`
- Use when: move one existing booking between two identified slots; resolve an ambiguous person through the occupied source slot before preparing.
- Not for: creating a new booking or removing and recreating a booking.
- Payload: `{from_slot_ref,to_slot_ref}`

### `booking.remove`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `booking` (normally omit `domain`; the server derives it)
- External-effect mode: `receipt_required`
- External-effect kind: `email`
- Effect claim boundary: Use only the Main App-owned cancellation email intent and canonical delivery stage; the cancellation ledger alone proves no delivery.
- Evidence-safe success summary: Booking removed and cancellation state read back internally; email state is reported separately from the canonical Main App receipt.
- Targets: `booking`, `slot`
- Required ref fields: `booking_ref`, `slot_ref`
- Creates entity: no
- Existing dependencies: `booking`
- Use when: remove an identified booking or occupied slot without replacing it.
- Not for: rejecting an open application or moving/rescheduling/rebooking a comedian to another slot; use booking.move with both slot refs.
- Payload: `{booking_ref or slot_ref,reason?,notification_policy?}`

### `comedian.book`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `booking` (normally omit `domain`; the server derives it)
- External-effect mode: `receipt_required`
- External-effect kind: `email`
- Effect claim boundary: Use only the versioned Main App Product-policy decision; this operation currently reports not_requested_by_policy rather than inventing a notification.
- Evidence-safe success summary: Profile booked into the Slot and read back internally; the Main App policy decision is reported separately.
- Targets: `booking`, `profile`, `slot`
- Required ref fields: `profile_ref`, `slot_ref`
- Creates entity: `booking`
- Existing dependencies: `profile`, `slot`
- Use when: book one identified comedian into one identified free slot.
- Not for: creating an invitation.
- Payload: `{profile_ref,slot_ref}`

### `communication.message.acknowledge`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `not_required`
- Domain: `coordination` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `message`
- Required ref fields: `message_ref`
- Creates entity: no
- Existing dependencies: `message`
- Use when: mark one received pending internal message as acknowledged.
- Not for: completing, archiving, or merely reading a message.
- Payload: `{message_ref}`

### `communication.message.archive`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `not_required`
- Domain: `coordination` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `message`
- Required ref fields: `message_ref`
- Creates entity: no
- Existing dependencies: `message`
- Use when: archive one message visible to the authenticated sender or recipient.
- Not for: hard-deleting message history.
- Payload: `{message_ref}`

### `communication.message.complete`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `not_required`
- Domain: `coordination` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `message`
- Required ref fields: `message_ref`
- Creates entity: no
- Existing dependencies: `message`
- Use when: mark one received or sent internal message as completed.
- Not for: archiving or hard-deleting it.
- Payload: `{message_ref}`

### `communication.message.reply`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `not_required`
- Domain: `coordination` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: This replies only inside the canonical Coordination thread; never describe it as an email, WhatsApp, Slack, or other external reply.
- Evidence-safe success summary: One direct internal Coordination reply was created and read back; no external delivery is implied.
- Targets: `message`
- Required ref fields: `message_ref`
- Creates entity: `message`
- Existing dependencies: `message`
- Use when: reply to one visible direct internal Coordination message; the server derives the active counterpart and canonical thread from the source message.
- Not for: external email, WhatsApp or Slack delivery; provider destinations; selecting a recipient, conversation or thread in payload.
- Payload: `{message_ref,body_markdown,attachment_refs?:[...]}`

### `communication.message.send`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `not_required`
- Domain: `coordination` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: This sends only one canonical internal Coordination message; never describe it as an email, WhatsApp, Slack, or other external delivery.
- Evidence-safe success summary: One direct internal Coordination message was created and read back; no external delivery is implied.
- Targets: `message`, `plugin_user`
- Required ref fields: `recipient_ref`
- Creates entity: `message`
- Existing dependencies: `plugin_user`
- Use when: send one direct internal message to one active allowlisted plugin user; Prepare may be followed immediately by Execute.
- Not for: external email/WhatsApp delivery or selecting the sender in payload.
- Payload: `{recipient_ref,body_markdown,subject?,priority?:'normal'|'high',task_ref?,attachment_refs?:[...],batch_ref?}`

### `coordination.artifact.create`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `not_required`
- Domain: `coordination` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `artifact`
- Required ref fields: none
- Creates entity: `artifact`
- Existing dependencies: none
- Use when: create one canonical Artifact with exactly one backing: immutable private R2 content or a link-only Google Drive file pending readonly provider verification.
- Not for: mixing R2 and Drive fields, embedding bytes, inventing provider metadata, exposing a raw R2 URL, changing Drive permissions, or bypassing linked-entity visibility.
- Payload: `R2 {title,artifact_kind,backing_kind:'r2',original_filename,media_type,size_bytes,sha256,retention_class,...}; Drive {title,artifact_kind,backing_kind:'google_drive',drive_file_id,retention_class,...}`

### `coordination.artifact.delete`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `coordination` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `artifact`
- Required ref fields: `artifact_ref`
- Creates entity: no
- Existing dependencies: `artifact`
- Use when: logically delete one owned Artifact after optimistic concurrency, active-hold and authorization checks.
- Not for: direct R2 deletion, deleting provider/meeting evidence, bypassing retention, or erasing audit/version history.
- Payload: `{artifact_ref,expected_revision,reason}`

### `coordination.artifact.grant.add`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `coordination` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `artifact`, `plugin_user`
- Required ref fields: `artifact_ref`, `user_ref`
- Creates entity: no
- Existing dependencies: `artifact`, `plugin_user`
- Use when: grant one active allowlisted user viewer or editor access to an owned Artifact; linked-entity policy still applies independently.
- Not for: public links, team-wide implicit grants, Product role changes, or bypassing a linked entity's visibility.
- Payload: `{artifact_ref,user_ref,grant_role:'viewer'|'editor',expires_at?}`

### `coordination.artifact.grant.revoke`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `not_required`
- Domain: `coordination` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `artifact`, `plugin_user`
- Required ref fields: `artifact_ref`, `user_ref`
- Creates entity: no
- Existing dependencies: `artifact`, `plugin_user`
- Use when: revoke one active viewer/editor grant from an owned Artifact.
- Not for: removing ownership, deleting history, or changing Project membership.
- Payload: `{artifact_ref,user_ref,grant_role:'viewer'|'editor',reason?}`

### `coordination.artifact.link.add`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `not_required`
- Domain: `coordination` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `artifact`
- Required ref fields: `artifact_ref`, `entity_ref`
- Creates entity: no
- Existing dependencies: `artifact`
- Use when: link one owned Artifact to an independently authorized canonical Project, Task, Message, Meeting, Signal, Run or other supported entity.
- Not for: granting visibility through the link, arbitrary URLs, or linking an entity the actor cannot access.
- Payload: `{artifact_ref,entity_ref,link_role:'attachment'|'source'|'evidence'|'output'|'context'|'current_document'|'delivery'}`

### `coordination.artifact.link.remove`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `not_required`
- Domain: `coordination` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `artifact`
- Required ref fields: `artifact_ref`, `entity_ref`
- Creates entity: no
- Existing dependencies: `artifact`
- Use when: remove one active Artifact link while preserving immutable link/audit history.
- Not for: deleting the Artifact or weakening the linked entity's own visibility policy.
- Payload: `{artifact_ref,entity_ref,link_role}`

### `coordination.artifact.update`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `not_required`
- Domain: `coordination` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `artifact`
- Required ref fields: `artifact_ref`
- Creates entity: no
- Existing dependencies: `artifact`
- Use when: optimistically update the mutable Artifact identity, title, lifecycle or retention without rewriting content versions.
- Not for: changing immutable blob/version provenance or shortening retention below an active hold.
- Payload: `{artifact_ref,expected_revision,patch:{title?,lifecycle_state?,retention_class?,expires_at?},note?}`

### `coordination.artifact.upload_finalize`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `not_required`
- Domain: `coordination` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `artifact`
- Required ref fields: `artifact_ref`, `version_ref`
- Creates entity: no
- Existing dependencies: `artifact`
- Use when: verify the exact reserved Artifact bytes and activate the staged immutable version.
- Not for: Google Drive Artifacts, finalizing an unknown digest, changing retention/audience, or selecting another user's Artifact.
- Payload: `{artifact_ref,version_ref,sha256}`

### `coordination.artifact.version.create`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `not_required`
- Domain: `coordination` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `artifact`
- Required ref fields: `artifact_ref`
- Creates entity: no
- Existing dependencies: `artifact`
- Use when: append one immutable R2 content version to an editable long-lived R2 Artifact with optimistic concurrency.
- Not for: Google Drive Artifacts, rewriting an existing version, provider evidence, or retrying after a revision conflict without re-reading.
- Payload: `{artifact_ref,expected_revision,original_filename,media_type,size_bytes,sha256,change_note?}`

### `coordination.priority_item.complete`

- Availability: `active`
- Required role: `admin`
- Confirmation policy: `not_required`
- Domain: `coordination` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `priority_item`
- Required ref fields: `priority_item_ref`
- Creates entity: no
- Existing dependencies: `priority_item`
- Use when: mark one Admin priority board card done using its current revision.
- Not for: completing an archived Coordination task or overwriting a stale board revision.
- Payload: `{priority_item_ref,expected_revision}`

### `coordination.priority_item.create`

- Availability: `active`
- Required role: `admin`
- Confirmation policy: `not_required`
- Domain: `coordination` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `priority_item`
- Required ref fields: none
- Creates entity: `priority_item`
- Existing dependencies: none
- Use when: create one Admin priority board card without an assignee or Project.
- Not for: creating an archived Coordination task, assigning a person, attaching a Project, or adding comments.
- Payload: `{title,summary,state?:'active'|'next'|'waiting'|'backlog'|'done',status?:string,priority?:0..5,blocker?:string|null,deadline?:RFC3339|null,sort_order?:number}`

### `coordination.priority_item.update`

- Availability: `active`
- Required role: `admin`
- Confirmation policy: `not_required`
- Domain: `coordination` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `priority_item`
- Required ref fields: `priority_item_ref`
- Creates entity: no
- Existing dependencies: `priority_item`
- Use when: edit one Admin priority board card using its current revision.
- Not for: editing an archived Coordination task or overwriting a stale board revision.
- Payload: `{priority_item_ref,expected_revision,patch:{title?,summary?,state?,status?,priority?:0..5,blocker?:string|null,deadline?:RFC3339|null,sort_order?}}`

### `coordination.whatsapp_history.import`

- Availability: `active`
- Required role: `admin`
- Confirmation policy: `required`
- Domain: `coordination` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Prepare is a write-free dry-run. Execute may commit only the exact bounded historical WhatsApp batch, its digest-only import ledger, attachment metadata and canonical receipt. It never sends, replies, enriches, or contacts WhatsApp.
- Evidence-safe success summary: One bounded historical WhatsApp batch was atomically imported or exactly deduplicated and independently read back; provider delivery is not implied.
- Targets: `message`, `operation_run`
- Required ref fields: `source_ref`
- Creates entity: `operation_run`
- Existing dependencies: none
- Use when: dry-run and, after explicit confirmation, atomically import one 1..25 item batch from one registered historical WhatsApp source with stable provider keys and immutable provenance digests.
- Not for: source parsing, unregistered chats, inferred identities or visibility, direct SQL/webhook writes, external WhatsApp sends, unbounded files, or mixing source snapshots.
- Payload: `{source_ref,source_snapshot_digest,secret_policy_version,batch_ref,batch_index,batch_count,item_offset,source_total_count,messages:[{provider_message_key,external_conversation_id,external_sender_id,sender_display,occurred_at,payload_digest,source_content_digest,scanner_version,secret_disposition:'verbatim'|'redact'|'quarantine'|'exclude',body_markdown?,secret_scan?,false_positive_reason?,attachments?:[{provider_attachment_key,original_filename?,media_type?,size_bytes?,sha256?,metadata?}]}] (1..25)}`

### `coordination.whatsapp_history.rollback`

- Availability: `active`
- Required role: `admin`
- Confirmation policy: `required`
- Domain: `coordination` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Rollback removes only rows inserted by the exact import receipt after proving that no Task, Signal, Artifact, link, attachment or other derived record depends on them. Exact duplicates that predated the import are never removed.
- Evidence-safe success summary: The exact imported rows were removed atomically, the immutable import ledger was marked rolled_back and the zero-residue readback succeeded.
- Targets: `message`, `operation_run`
- Required ref fields: `import_ref`
- Creates entity: `operation_run`
- Existing dependencies: `operation_run`
- Use when: roll back one exact applied historical WhatsApp import batch while preserving its digest-only audit evidence.
- Not for: deleting pre-existing duplicates, erasing audit receipts, rolling back a batch with derived dependencies, or broad source reset.
- Payload: `{import_ref,applied_receipt_ref,reason}`

### `event.bulk_metadata_update`

- Availability: `local-only`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `event` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `event`
- Required ref fields: `event_refs`
- Creates entity: no
- Existing dependencies: `event`
- Use when: apply one category value to a frozen set of 1-200 events.
- Not for: a live filter evaluated during Execute.
- Payload: `{event_refs:[1..200],field:'category',value}`

### `event.cancel`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `event` (normally omit `domain`; the server derives it)
- External-effect mode: `receipt_required`
- External-effect kind: `email`
- Effect claim boundary: Use only per-Event and per-recipient Main App delivery intents and their canonical stages; cancellation state alone proves no notification.
- Evidence-safe success summary: Event cancellation state applied and read back internally; each email stage is reported separately from canonical Main App receipts.
- Targets: `event`
- Required ref fields: `event_ref`
- Creates entity: no
- Existing dependencies: `event`
- Use when: cancel one event or its explicit future recurring scope.
- Not for: deleting a show template.
- Payload: `{event_ref,scope:'single_event'|'future_recurring_siblings',reason?}`

### `event.create`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `event` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `event`
- Required ref fields: `show_ref`, `location_ref`
- Creates entity: `event`
- Existing dependencies: `show`, `location`
- Use when: create one dated event under an existing show at an existing location.
- Not for: creating the show or location dependency.
- Payload: `{show_ref,location_ref,starts_at RFC3339,duration_minutes?,event_type?}`

### `event.create_recurring`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `event` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `event`
- Required ref fields: `show_ref`, `location_ref`
- Creates entity: `event`
- Existing dependencies: `show`, `location`
- Use when: create a bounded recurring event series for an existing show and location.
- Not for: creating a new show template.
- Payload: `{show_ref,location_ref,starts_at RFC3339,duration_minutes?,recurrence_rule:{frequency:'daily'|'weekly'|'biweekly'|'monthly'|'yearly',count:1..52}}`

### `event.internal_note.set`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `event` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `event`
- Required ref fields: `event_ref`
- Creates entity: no
- Existing dependencies: `event`
- Use when: set or clear organizer-only internal Event notes; the user explicitly says internal or organizer-only.
- Not for: public Event copy, a public title, or ambiguous words such as Memo, Notiz, or Beschreibung without an explicit visibility.
- Payload: `{event_ref,value:string|null}; max 2000 characters`

### `event.lineup_message.send`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `event` (normally omit `domain`; the server derives it)
- External-effect mode: `receipt_required`
- External-effect kind: `external_message`
- Effect claim boundary: Use only the exact Event's server-resolved active line-up and the separate Main App email/WhatsApp policy receipts. This action never changes or closes the Event.
- Evidence-safe success summary: One canonical Line-up message was committed without changing Event status; email and WhatsApp stages are reported separately.
- Targets: `event`
- Required ref fields: `event_ref`
- Creates entity: no
- Existing dependencies: `event`
- Use when: send one bounded message to the current active canonical Line-up of one exact Event.
- Not for: closing or changing the Event; supplying recipient IDs, Event title, location, duration, templates, channels, provider configuration, or a free external destination.
- Payload: `{event_ref,message}; Main App resolves authorization, current active Line-up, Event details, product policy, email and WhatsApp intents`

### `event.public_description.set`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `event` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `event`
- Required ref fields: `event_ref`
- Creates entity: no
- Existing dependencies: `event`
- Use when: set or clear the public Event description shown to customers; the user explicitly says public description or customer-facing text.
- Not for: organizer-only notes, the public title, or ambiguous words such as Memo, Notiz, or Beschreibung without an explicit visibility.
- Payload: `{event_ref,value:string|null}; max 10000 characters`

### `event.public_title.set`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `event` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `event`
- Required ref fields: `event_ref`
- Creates entity: no
- Existing dependencies: `event`
- Use when: set or clear the Event-specific public title; the user explicitly says public title.
- Not for: the reusable Show title, public description, internal notes, or an ambiguous title request without Event scope.
- Payload: `{event_ref,value:string|null}; null clears the override, otherwise use 1-120 trimmed characters without control or Unicode line-separator characters`

### `event.update`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `event` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `event`
- Required ref fields: `event_ref`
- Creates entity: no
- Existing dependencies: `event`
- Use when: change schedule, duration, or location on one identified event.
- Not for: any Event text, ticket-class, or provider-live changes.
- Payload: `{event_ref,changes:{starts_at RFC3339?,duration_minutes?,location_ref?},expected?}`

### `export.generate`

- Availability: `unsupported`
- Required role: `admin`
- Confirmation policy: `required`
- Domain: `finance` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `payout_case`
- Required ref fields: none
- Creates entity: no
- Existing dependencies: none
- Use when: never in V1; explain that no private export-file surface exists.
- Not for: bounded read-only finance queries.
- Payload: `unsupported in V1; optional requested scope context {scope?}`

### `host.set`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `booking` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `booking`, `slot`
- Required ref fields: `booking_ref`, `slot_ref`
- Creates entity: no
- Existing dependencies: `booking`
- Use when: set or clear host status for an identified booking or slot.
- Not for: booking a new comedian.
- Payload: `{booking_ref or slot_ref,is_host:boolean}`

### `infrastructure.capacity_schedule`

- Availability: `local-only`
- Required role: `admin`
- Confirmation policy: `required`
- Domain: `admin` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `subscription`, `operation_run`
- Required ref fields: none
- Creates entity: `operation_run`
- Existing dependencies: `subscription`
- Use when: schedule a bounded local Vercel-capacity simulation with mandatory auto-revert.
- Not for: calling Vercel or mutating Production infrastructure.
- Payload: `local adapter only: {provider:'vercel',target_capacity,duration_hours:1..168,auto_revert:true,cost_limit_eur?}`

### `invitation.create`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `booking` (normally omit `domain`; the server derives it)
- External-effect mode: `receipt_required`
- External-effect kind: `email`
- Effect claim boundary: Use only the Main App-owned invitation email intent and its canonical stage; the open Application alone never proves sending, delivery, or receipt.
- Evidence-safe success summary: Open invitation Application created and assigned internally; email state is reported separately from the canonical Main App receipt.
- Targets: `slot`, `profile`
- Required ref fields: `slot_ref`, `profile_ref`
- Creates entity: `application`
- Existing dependencies: `slot`, `profile`
- Use when: create one open internal invitation Application for an identified profile and slot.
- Not for: directly booking the profile or claiming queued, sent, delivered, or received without the matching canonical Main App delivery stage.
- Payload: `{slot_ref,profile_ref,role?:'comedian'|'host'}; role=host marks the invited Slot as host`

### `location.create`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `event` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `location`
- Required ref fields: none
- Creates entity: `location`
- Existing dependencies: none
- Use when: create a canonical location from explicit venue data.
- Not for: creating an event at the new location in the same lifecycle.
- Payload: `{title,city,street?,zip?,region_ref?,seating_capacity?,contact_name?,contact_email?}`

### `ownership_transfer.prepare`

- Availability: `gated`
- Required role: `admin`
- Confirmation policy: `required`
- Domain: `finance` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `profile`
- Required ref fields: `from_profile_ref`, `to_profile_ref`
- Creates entity: no
- Existing dependencies: `profile`
- Use when: request a separately approved ownership-transfer preview.
- Not for: routine payout reads.
- Payload: `separately gated: {from_profile_ref,to_profile_ref,payment_account_ref?}`

### `payment_account.relink`

- Availability: `gated`
- Required role: `admin`
- Confirmation policy: `required`
- Domain: `finance` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `profile`
- Required ref fields: `profile_ref`
- Creates entity: no
- Existing dependencies: `profile`
- Use when: request a separately approved Finance account relink.
- Not for: reading payout state.
- Payload: `separately gated: {profile_ref}`

### `payment_account.unlink_for_reonboarding`

- Availability: `gated`
- Required role: `admin`
- Confirmation policy: `required`
- Domain: `finance` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `profile`
- Required ref fields: `profile_ref`
- Creates entity: no
- Existing dependencies: `profile`
- Use when: request a separately approved unlink for payment-account re-onboarding.
- Not for: routine account relinking.
- Payload: `separately gated: {profile_ref}`

### `product_access.change_role`

- Availability: `active`
- Required role: `admin`
- Confirmation policy: `required`
- Domain: `admin` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `profile`
- Required ref fields: `profile_ref`
- Creates entity: no
- Existing dependencies: `profile`
- Use when: compare-and-set the canonical Product role set for one profile.
- Not for: plugin access roles.
- Payload: `{profile_ref,expected_roles:[...],new_role:'Comedian'|'Veranstalter'|'Administrator'|'Customer'}`

### `product_access.grant`

- Availability: `gated`
- Required role: `admin`
- Confirmation policy: `required`
- Domain: `admin` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `organization`, `profile`
- Required ref fields: `profile_ref`, `organization_ref`
- Creates entity: no
- Existing dependencies: `organization`, `profile`
- Use when: request a separately gated organization Product-access grant.
- Not for: plugin access.
- Payload: `separately gated: {profile_ref,organization_ref,role}`

### `profile.editorial.update`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `booking` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `profile`
- Required ref fields: `profile_ref`
- Creates entity: no
- Existing dependencies: `profile`
- Use when: update explicitly supplied comedian editorial fields through the same canonical permission as the Web comedian form.
- Not for: changing account identity, email, staff roles, payment details, or arbitrary profile columns.
- Payload: `{profile_ref,patch:{name?:string(1..200),description?:string|null,region?:string|null,membership?:'Platin'|'Gold'|'Silber'|'Bronze'|null,is_female?:boolean,hide_from_website?:boolean,instagram?:string|null,facebook?:string|null,youtube?:string|null,twitter?:string|null,video_link?:string|null}}; nonempty patch; nullable text max 5000 characters`

### `provider_event.create`

- Availability: `active`
- Required role: `admin`
- Confirmation policy: `required`
- Domain: `ticketing` (normally omit `domain`; the server derives it)
- External-effect mode: `receipt_required`
- External-effect kind: `provider_event`
- Effect claim boundary: Claim provider creation only when the canonical Main App returns a bounded provider receipt whose external event ID matches the persisted SR link and independent readback.
- Evidence-safe success summary: Provider event accepted by the canonical provider path and independently linked back to the SR Event.
- Targets: `event`
- Required ref fields: `event_ref`
- Creates entity: no
- Existing dependencies: `event`
- Use when: request creation of one Eventim or Eventbrite provider event through the existing canonical Main App previewProviderEventAction/applyProviderEventAction provisioning path.
- Not for: browser automation, a second provider client, arbitrary provider payloads, linking an existing provider event, or bypassing the Main App event-management and provider-create gates.
- Payload: `{event_ref,provider:'eventim'|'eventbrite',publication_mode?:'draft'|'public'}; runtime-gated by the actor-bound Main App preview/apply Product Command bridge and provider-create flags`

### `provider_link.bulk_set`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `ticketing` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `event`
- Required ref fields: `links[].event_ref`
- Creates entity: no
- Existing dependencies: `event`
- Use when: apply a frozen exact provider-link manifest to up to 200 events.
- Not for: guessing low-confidence provider matches.
- Payload: `{links:[{event_ref,provider:'eventim'|'eventbrite',provider_event_ref}] up to 200}`

### `provider_link.remove`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `ticketing` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `event`
- Required ref fields: `event_ref`
- Creates entity: no
- Existing dependencies: `event`
- Use when: remove one canonical provider link from an event.
- Not for: deleting the external provider event.
- Payload: `{event_ref,provider:'eventim'|'eventbrite'}`

### `provider_link.set`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `ticketing` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `event`
- Required ref fields: `event_ref`
- Creates entity: no
- Existing dependencies: `event`
- Use when: set one exact canonical-to-provider event link.
- Not for: creating or mutating the external provider event.
- Payload: `{event_ref,provider:'eventim'|'eventbrite',provider_event_ref}`

### `provider_ticketing.override_live`

- Availability: `local-only`
- Required role: `admin`
- Confirmation policy: `required`
- Domain: `ticketing` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `ticket_class`
- Required ref fields: `ticket_area_ref`
- Creates entity: no
- Existing dependencies: `ticket_class`
- Use when: explicitly simulate a direct provider-live capacity override in the local adapter.
- Not for: canonical ticket-class configuration; use ticketing.ticket_class.update.
- Payload: `local adapter only: {ticket_area_ref,capacity>=0}`

### `show.create`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `event` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `show`
- Required ref fields: none
- Creates entity: `show`
- Existing dependencies: none
- Use when: create one reusable show series/template.
- Not for: creating its dated event occurrences.
- Payload: `{title,owner_ref?,defaults:{active?}?}`

### `show.create_with_events`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `event` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `show`, `event`
- Required ref fields: `location_ref`, `event_manifest.location_ref`
- Creates entity: `show`
- Existing dependencies: `location`
- Use when: atomically create a new show plus a bounded event series at an existing location.
- Not for: adding events to an existing show.
- Payload: `{title,location_ref,starts_at RFC3339,duration_minutes?,count:1..52,recurrence:{frequency,count}} or {show_manifest,event_manifest,recurrence}`

### `slot.create`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `booking` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `slot`
- Required ref fields: `event_ref`
- Creates entity: `slot`
- Existing dependencies: `event`
- Use when: create one bounded lineup slot on an existing event.
- Not for: booking a comedian into the slot.
- Payload: `{event_ref,starts_at RFC3339?,duration_minutes:1..240,mode:'private'|'public',fee_eur?}`

### `slot.fee.set`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `booking` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `slot`
- Required ref fields: `slot_refs`
- Creates entity: no
- Existing dependencies: `slot`
- Use when: change the EUR fee of an exact frozen set of existing slots, occupied or unoccupied, with Event management permission.
- Not for: creating slots, changing Show defaults, paying invoices, or changing financially closed bookings.
- Payload: `{slot_refs:[1..200 unique canonical sr:slot IDs],fee_eur:0..9999.99 with at most 2 decimal places}; use Event lineup/booking reads to identify every target; confirm the before/after fees`

### `spot_mode.set`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `booking` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `slot`
- Required ref fields: `slot_refs`
- Creates entity: no
- Existing dependencies: `slot`
- Use when: set private/public mode on a frozen set of slots.
- Not for: creating slots.
- Payload: `{slot_refs:[1..200],mode:'private'|'public'}`

### `ticketing.canonical_price.set`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `ticketing` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `event`
- Required ref fields: `event_ref`
- Creates entity: no
- Existing dependencies: `event`
- Use when: set the canonical event price in cents.
- Not for: a provider-live override.
- Payload: `{event_ref,price_cents>=0}`

### `ticketing.contingent.set`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `ticketing` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `event`
- Required ref fields: `event_ref`
- Creates entity: no
- Existing dependencies: `event`
- Use when: set the canonical ticket contingent for one event.
- Not for: changing one ticket class.
- Payload: `{event_ref,contingent:1..32767}`

### `ticketing.sync.request`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `ticketing` (normally omit `domain`; the server derives it)
- External-effect mode: `queued`
- External-effect kind: `provider_sync`
- Effect claim boundary: Success proves only that one canonical sync job was enqueued and read back; never claim provider state changed until a later provider receipt and readback prove it.
- Evidence-safe success summary: Canonical Ticketing sync job enqueued and read back; provider update remains pending.
- Targets: `event`, `operation_run`
- Required ref fields: `event_ref`
- Creates entity: `operation_run`
- Existing dependencies: `event`
- Use when: enqueue an idempotent canonical capacity-sync run for one future event whose capacity sync setting is enabled.
- Not for: changing sync settings or forcing a provider write when no eligible sync job can be enqueued.
- Payload: `{event_ref,retry_scope?:'failed'}`

### `ticketing.sync_settings.set`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `ticketing` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `event`
- Required ref fields: `event_ref`
- Creates entity: no
- Existing dependencies: `event`
- Use when: change canonical price/capacity sync settings for one event.
- Not for: requesting an immediate sync run.
- Payload: `{event_ref,price_sync?,capacity_sync?,canonical_price_cents?}; include at least one setting; enabling Price Sync requires a canonical price`

### `ticketing.ticket_class.create`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `ticketing` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `ticket_class`
- Required ref fields: `event_ref`
- Creates entity: `ticket_class`
- Existing dependencies: `event`
- Use when: create a canonical SR ticket class on one event without provisioning an external Stripe product or price.
- Not for: provider-live capacity overrides or Stripe catalog provisioning.
- Payload: `{event_ref,name,price_cents>=0,capacity>=1,active?}`

### `ticketing.ticket_class.update`

- Availability: `active`
- Required role: `employee`
- Confirmation policy: `required`
- Domain: `ticketing` (normally omit `domain`; the server derives it)
- External-effect mode: `internal_only`
- External-effect kind: `none`
- Effect claim boundary: Claim only the canonical internal state change and do not imply any email, notification, provider, file-delivery, calendar, or external-message effect.
- Evidence-safe success summary: Canonical internal state applied and independently read back; no external effect is implied.
- Targets: `ticket_class`
- Required ref fields: `class_ref`
- Creates entity: no
- Existing dependencies: `ticket_class`
- Use when: change canonical SR ticket-class configuration; price changes are executable only while the class has no Stripe product/price IDs.
- Not for: direct provider-live capacity override or Stripe price rotation; use the canonical Main App Stripe writer for a Stripe-backed price.
- Payload: `{class_ref,name?,price_cents?,capacity?,active?}; include at least one change`
