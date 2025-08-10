import Payment from "../models/Payment.js";
export async function createPayment({ owner, license, amount }) {
  return Payment.create({ owner, license, amount, status: "PENDING" });
}
export async function markPaid(paymentId) {
  const payment = await Payment.findByIdAndUpdate(paymentId, { status: "PAID", paidAt: new Date() }, { new: true });
  return payment;
}
