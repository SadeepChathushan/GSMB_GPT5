import License from "../models/License.js";
import Case from "../models/Case.js";
import Payment from "../models/Payment.js";

export async function myLicenses(req, res) {
  const items = await License.find({ owner: req.user.id });
  res.json(items);
}

export async function myCases(req, res) {
  const items = await Case.find().populate("license").where("license.owner").equals(req.user.id);
  res.json(items);
}

export async function myPayments(req, res) {
  const items = await Payment.find({ owner: req.user.id });
  res.json(items);
}
