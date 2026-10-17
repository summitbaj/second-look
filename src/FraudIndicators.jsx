import React from 'react';
import { getRiskScenario } from './riskScenarios';
const checks = [
  ['Rapid successive transfers', 'Compare payment count and timing against member history.', 'Not evaluated', 'Bank event history'],
  ['Unusual transaction time', 'Compare the payment time with established activity patterns.', 'Not evaluated', 'Bank event history'],
  ['Recent password reset', 'Check whether a password reset occurred shortly before the payment.', 'Not evaluated', 'Password-reset events'],
  ['New device login', 'Requires a reliable device-recognition integration.', 'Unavailable in challenge assumptions', 'Device intelligence'],
  ['Unusual login location', 'Requires approved network or location signals and a reliable baseline.', 'Not available to this prototype', 'Bank security integration'],
  ['Potential phishing URL', 'Analyze a link the member explicitly chooses to submit.', 'Not connected', 'URL reputation service'],
  ['Scam language in messages', 'Analyze only a message the member voluntarily submits.', 'Not connected', 'Consent + validated language model'],
  ['Suspicious phone number', 'Compare a member-submitted number with reliable reports; caller ID can be spoofed.', 'Not connected', 'Approved reputation source'],
  ['Active screen sharing', 'Requires supported platform security signals; cannot be assumed by a browser widget.', 'Unavailable in challenge assumptions', 'Device security integration'],
  ['Unusual interaction behavior', 'Requires validated behavioral analytics and an appropriate privacy basis.', 'Unavailable in challenge assumptions', 'Behavioral biometrics'],
  ['Possible remote access software', 'Requires device security integration; this web app cannot scan installed software.', 'Unavailable in challenge assumptions', 'Device security integration'],
  ['Caller impersonation', 'An employee call record provides context; it does not authenticate the voice on the line.', 'Employee-posted status', 'Authenticated bank records'],
  ['Coached transaction behavior', 'Member answers may suggest outside direction; uncertainty must remain explicit.', 'Scripted conversation only', 'Optional member answers'],
];
export default function FraudIndicators({ scenario = 'normal', compact = false }) {
  const selected = getRiskScenario(scenario);
  const activeTitles = new Set(selected.indicators.map(item => item.title));
  return <section className={`fraud-indicators ${compact ? 'compact' : ''}`} aria-label="Payment risk indicators"><div className="indicator-heading"><span className="assistant-label">WHAT PROMPTED THIS SECOND LOOK?</span><h3>{selected.title}</h3><p>{selected.summary}</p></div><details className="indicator-deep-dive"><summary>Understand in detail</summary>{selected.indicators.length ? <ul className="indicator-list">{selected.indicators.map(item => <li key={item.id}><span className="indicator-tag flagged">Worth a second look</span><strong>{item.title}</strong><p>{item.reason}</p><small>Production check: {item.needs} This preview uses preset signals, not live data.</small></li>)}</ul> : <p>No flags are selected in this scenario. Other checks have not been performed.</p>}{selected.indicators.length > 1 && <div className="combined-indicator"><strong>{selected.indicators.length} signals seen together</strong><p>This combination warrants context. It does not establish fraud or add an extra independent finding.</p></div>}<details className="indicator-catalog"><summary>Other indicators and what’s needed</summary><p>Not evaluated does not mean clear. Feasibility depends on bank data, permissions, platform support and validation. The supplied challenge does not allow us to assume device intelligence or behavioral biometrics.</p>{checks.filter(([name]) => !activeTitles.has(name)).map(([name,description,status,source]) => <article key={name}><strong>{name}</strong><span>{status}</span><p>{description}</p><small>Needs: {source}</small></article>)}</details></details><p className="indicator-footnote">Presentation scenario, not live ML. No private calls, messages, device activity or location are being monitored.</p></section>;
}
