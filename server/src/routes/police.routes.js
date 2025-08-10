import { Router } from "express";
import { listReports, openCase, addEvidence, confirmViolation, policeLookup } from "../controllers/police.controller.js";
import { auth, permit } from "../middleware/auth.js";
import { ROLES } from "../utils/roles.js";

const r = Router();
r.use(auth());
r.use(permit(ROLES.POLICE, ROLES.ADMIN));

r.get("/reports", listReports);
r.get("/lookup", policeLookup);
r.post("/cases/open", openCase);
r.post("/cases/evidence", addEvidence);
r.post("/cases/confirm", confirmViolation);

export default r;
