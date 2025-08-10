import License from "../models/License.js";
import Case from "../models/Case.js";
import User from "../models/User.js";
import { createPayment } from "../services/paymentService.js";
import { audit } from "../services/auditService.js";
import { ROLES } from "../utils/roles.js";

export async function upsertLicense(req, res) {
  const { id } = req.params;
  const { ownerId, ownerEmail, ...data } = req.body;

  let owner = null;
  if (ownerId) owner = await User.findById(ownerId);
  if (!owner && ownerEmail) owner = await User.findOne({ email: ownerEmail });
  if (!owner && ownerEmail) {
    owner = await User.create({ email: ownerEmail, name: data.ownerName || "New Owner", password: "Temp@12345", role: ROLES.OWNER });
  }
  if (owner) data.owner = owner.id;

  let lic;
  if (id === "new") {
    if (!data.lorryNumber) return res.status(400).json({ message: "lorryNumber required" });
    data.lorryNumber = data.lorryNumber.toUpperCase();
    lic = await License.create(data);
    await audit(req.user.id, "LICENSE_CREATE", "License", lic.id, { lorryNumber: lic.lorryNumber });
  } else {
    lic = await License.findByIdAndUpdate(id, data, { new: true });
    await audit(req.user.id, "LICENSE_UPDATE", "License", id);
  }
  res.json(lic);
}

export async function listLicenses(req, res) {
  const items = await License.find().populate("owner", "name email phone");
  res.json(items);
}

export async function suspend(req, res) {
  const { licenseId, reason } = req.body;
  const lic = await License.findById(licenseId);
  if (!lic) return res.status(404).json({ message: "License not found" });
  lic.status = "SUSPENDED";
  await lic.save();
  await audit(req.user.id, "LICENSE_SUSPEND", "License", lic.id, { reason });
  res.json(lic);
}

export async function processCase(req, res) {
  const { caseId, fineAmount } = req.body;
  const c = await Case.findById(caseId).populate("license");
  if (!c || !c.license) return res.status(404).json({ message: "Case or license not found" });

  c.license.status = "SUSPENDED";
  await c.license.save();
  c.fineAmount = fineAmount;
  const payment = await createPayment({ owner: c.license.owner, license: c.license.id, amount: fineAmount });
  c.paymentId = payment.id;
  c.status = "FINED";
  await c.save();
  await audit(req.user.id, "CASE_PROCESSED", "Case", c.id, { fineAmount, paymentId: payment.id });
  res.json(c);
}

export async function reinstate(req, res) {
  const { licenseId } = req.body;
  const lic = await License.findById(licenseId);
  if (!lic) return res.status(404).json({ message: "License not found" });
  lic.status = "ACTIVE";
  await lic.save();
  await audit(req.user.id, "LICENSE_REINSTATE", "License", lic.id);
  res.json(lic);
}
