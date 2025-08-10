import { Router } from "express";
import { auth, permit } from "../middleware/auth.js";
import { ROLES } from "../utils/roles.js";
import { upsertLicense, listLicenses, suspend, processCase, reinstate } from "../controllers/gsmb.controller.js";
import { createOwner, listOwners } from "../controllers/ownerAdmin.controller.js";

const r = Router();
r.use(auth());
r.use(permit(ROLES.GSMB, ROLES.ADMIN));

r.get("/licenses", listLicenses);
r.post("/licenses/:id", upsertLicense); // id = new | :id
r.post("/licenses/suspend", suspend);
r.post("/cases/process", processCase);
r.post("/licenses/reinstate", reinstate);

// owner management
r.get("/owners", listOwners);
r.post("/owners", createOwner);

export default r;
