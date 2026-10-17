# Second Look widget architecture proposal

See public/architecture.html and public/diagrams for the viewable mind map and architecture. These are proposed production components, not claims about implemented services.

## Host contract

Web: a framework-neutral adapter mounts a React widget or a separately hosted iframe with strict origin checking. Native: use a bank-approved web view bridge or native wrapper. Validate accessibility, keyboard behavior, safe-area handling and app navigation on the actual host platform. The current PaymentDemo is a host mock; it is not a production SDK.

The host backend supplies a short-lived, member-scoped session and opaque payment intent ID. Inputs: intent reference, approved reason codes, locale, accessibility preferences and server decision state. Avoid full account identifiers and raw event history in the widget. Never put model/provider secrets in the browser.

Illustrative events: assistance_opened, assistance_dismissed, explanation_viewed, support_requested, trusted_contact_consent, education_viewed. Payment status is received from the bank backend. The widget can request an action, but an authenticated bank service authorizes and enforces it. Validate origin/schema, session scope and idempotency; poll or subscribe to authoritative server decisions.

Proposed APIs: POST /widget-sessions; POST /risk-assessments; GET /payment-intents/:id/decision; POST /cases; POST /cases/:id/reviews; POST /payment-intents/:id/hold-requests. These are design examples, not routes implemented by the local Node scaffold.

## ML and policy

Only features permitted in the supplied challenge dataset: payment amount, timing, channel, rail, status, recipient novelty, profile change, password reset, payment holds, balances/history and enrollment where provided. No device intelligence, voice analysis, private-message scanning or perfect labels.

An interpretable baseline and a candidate tabular model can produce calibrated risk plus stable reason codes, confidence/model health and model version. LLM text explains those reason codes and grounded education; it must not invent evidence or authorize money movement. Member chat is untrusted input, not permission to invoke privileged tools.

Use time-separated, member-grouped evaluation to reduce leakage. Measure precision/recall at chosen friction and workload limits, calibration and slice performance; investigate drift and disparate burden. Choose thresholds with bank stakeholders using validated outcomes. No numeric threshold or fraud-performance claim is justified by the prototype.

Decision tiers: normal permits the host's standard review; concern offers optional chat and employee review; critical plus corroborating evidence can trigger a narrow temporary hold under an approved policy. Full account restriction is separately governed. Enforce every action at the bank backend before payment execution; log scope/reason, explicit expiry, idempotency and appeal/release authority. User-dismissed chat does not override a hold. Model/service failures follow a bank-defined fallback; the LLM never improvises action.

Begin in shadow mode, then a 90-day human-review pilot before limited automated holds. Measure unnecessary interruptions, legitimate-payment release time, review workload, member comprehension and confirmed outcomes. Synthetic data illustrates journeys only. Incorporate false positives and missed-scam recovery, retain audit evidence with a defined deletion policy, and enable rollback.

## Current implementation

React demonstration on GitHub Pages, optional local Node profile API, scripted chat, preset risk signals, session-only review cases and demo freeze. No deployed LLM, trained ML, bank core connection, employee authentication, contact delivery or real action enforcement. The educational screen is available inside chat and uses Sound-inspired colors; wording is adapted from the user-supplied Zelle reference without promising recovery.
