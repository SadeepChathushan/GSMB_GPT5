import Report from "../models/Report.js";
import Case from "../models/Case.js";
import License from "../models/License.js";
import { audit } from "../services/auditService.js";

export async function listReports(req, res) {
  const items = await Report.find().sort({ createdAt: -1 }).limit(200);
  res.json(items);
}

export async function openCase(req, res) {
  const { reportId } = req.body;
  const report = await Report.findById(reportId);
  if (!report) return res.status(404).json({ message: "Report not found" });
  const lic = await License.findOne({ lorryNumber: report.lorryNumber });
  const c = await Case.create({ report: report.id, license: lic?.id, police: req.user.id });
  report.status = "IN_PROGRESS";
  report.handledBy = req.user.id;
  await report.save();
  await audit(req.user.id, "CASE_OPEN", "Case", c.id, { reportId });
  res.json(c);
}

export async function addEvidence(req, res) {
  const { caseId, notes, lat, lng, photoUrl } = req.body;
  const c = await Case.findById(caseId);
  if (!c) return res.status(404).json({ message: "Case not found" });
  c.evidence.push({ notes, gps: { lat, lng }, photoUrl });
  await c.save();
  res.json(c);
}

export async function confirmViolation(req, res) {
  const { caseId } = req.body;
  const c = await Case.findById(caseId).populate("license");
  if (!c) return res.status(404).json({ message: "Case not found" });
  if (!c.license) return res.status(400).json({ message: "License missing" });
  c.status = "AWAITING_GSMB";
  await c.save();
  await audit(req.user.id, "VIOLATION_CONFIRMED", "Case", c.id);
  res.json(c);
}

// detailed lookup for police, even if ACTIVE
export async function policeLookup(req, res) {
  const { lorryNumber } = req.query;
  if (!lorryNumber) return res.status(400).json({ message: "lorryNumber required" });
  const lic = await License.findOne({ lorryNumber: lorryNumber.toUpperCase() }).populate("owner", "name email phone");
  if (!lic) return res.json({ status: "INVALID", lorryNumber: lorryNumber.toUpperCase() });
  res.json({
    status: lic.status,
    lorryNumber: lic.lorryNumber,
    owner: lic.owner,
    siteName: lic.siteName,
    routeGeoJson: lic.routeGeoJson,
    expiresAt: lic.expiresAt
  });
}
