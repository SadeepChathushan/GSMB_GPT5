import Payment from "../models/Payment.js";
import { markPaid } from "../services/paymentService.js";

export async function listMy(req, res) {
  const items = await Payment.find({ owner: req.user.id });
  res.json(items);
}

export async function payMock(req, res) {
  const { paymentId } = req.body;
  const p = await markPaid(paymentId);
  res.json(p);
}
