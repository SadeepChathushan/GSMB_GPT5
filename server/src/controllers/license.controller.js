import License from "../models/License.js";
export async function getById(req, res) {
  const lic = await License.findById(req.params.id);
  if (!lic) return res.status(404).json({ message: "License not found" });
  res.json(lic);
}
