export const riskSignals = {
  amount: { title: 'Unusually large transfer', reason: 'This amount is above your usual transfer range.', needs: 'Compare payment amounts with established member history.' },
  recipient: { title: 'First-time recipient', reason: 'You haven’t paid this recipient before.', needs: 'Compare recipient identity with previous payments.' },
  rapid: { title: 'Rapid successive transfers', reason: 'Several payments occurred close together before this one.', needs: 'Compare event counts and timing with normal activity.' },
  time: { title: 'Unusual transaction time', reason: 'This payment is at a time outside your usual activity pattern.', needs: 'Compare transaction time with a member-specific history baseline.' },
  reset: { title: 'Recent password reset', reason: 'A password reset happened shortly before this payment.', needs: 'Combine password-reset events with payment timestamps.' },
};
export const riskScenarios = {
  flagged: { label: 'New recipient + unusual amount', title: 'A new recipient. A larger payment.', summary: 'You’re paying someone new and sending more than usual. It may be completely legitimate—we’re offering a moment to check before you decide.', signals: ['recipient', 'amount'] },
  large: { label: 'Unusually large transfer', title: 'More than you usually send.', summary: 'This amount is above your usual range. A larger payment can be legitimate; take a moment to check the details.', signals: ['amount'] },
  first: { label: 'First-time recipient', title: 'Someone new to your payment history.', summary: 'You haven’t paid this recipient before. Make sure the request and recipient are who you expect.', signals: ['recipient'] },
  rapid: { label: 'Rapid successive transfers', title: 'Several payments close together.', summary: 'A short series of payments prompted this second look. You can check that each one was intended.', signals: ['rapid'] },
  late: { label: 'Unusual transaction time', title: 'A different time than usual.', summary: 'This payment falls outside your usual activity pattern. That may be expected—we’re offering a chance to check.', signals: ['time'] },
  reset: { label: 'Password reset followed by transfer', title: 'An account change before a payment.', summary: 'A password reset happened shortly before this payment. If you didn’t request the reset, you can pause and ask for support.', signals: ['reset'] },
  combined: { label: 'Multiple signals: reset + new recipient + rapid transfers', title: 'A few changes worth checking together.', summary: 'A recent password reset, a new recipient and several payments close together prompted a second look. These signals don’t establish fraud.', signals: ['reset', 'recipient', 'rapid'] },
  legitimate: { label: 'Legitimate look-alike: planned large payment to new recipient', title: 'An expected payment can still look unusual.', summary: 'A planned contractor payment can involve a new recipient and a larger amount. This example shows why a flag needs context, rather than an automatic fraud conclusion.', signals: ['recipient', 'amount'] },
  normal: { label: 'Routine payment · No invitation', title: 'No payment flags.', summary: 'No indicators are flagged in this routine preview. That does not establish that a payment is safe; help is still available.', signals: [] },
};
export function getRiskScenario(key) { const scenario = riskScenarios[key] || riskScenarios.normal; return { ...scenario, indicators: scenario.signals.map(id => ({ id, ...riskSignals[id] })) }; }
