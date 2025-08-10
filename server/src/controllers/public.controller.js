import License from "../models/License.js";
import Report from "../models/Report.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { notify } from "../services/notificationService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../../uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + Math.round(Math.random()*1e9) + path.extname(file.originalname))
});
export const upload = multer({ storage });

export async function lookup(req, res) {
  const { lorryNumber } = req.query;
  const lic = await License.findOne({ lorryNumber: lorryNumber?.toUpperCase() }).populate("owner", "name");
  if (!lic) return res.json({ status: "INVALID", lorryNumber: lorryNumber?.toUpperCase() });
  res.json({ status: lic.status, owner: lic.owner ? { name: lic.owner.name } : null, lorryNumber: lic.lorryNumber, expiresAt: lic.expiresAt });
}

export async function report(req, res) {
  const { lorryNumber, lat, lng, notes } = req.body;
  const photoUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
  const r = await Report.create({
    lorryNumber: lorryNumber?.toUpperCase(),
    location: { lat, lng },
    photoUrl,
    notes,
    createdBy: "PUBLIC",
    priority: "HIGH"
  });
  notify("POLICE", "report:new", r);
  res.json({ ok: true, report: r });
}
