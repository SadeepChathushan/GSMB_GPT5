import { Router } from "express";
import { auth, permit } from "../middleware/auth.js";
import { ROLES } from "../utils/roles.js";
import { myLicenses, myCases, myPayments } from "../controllers/owner.controller.js";

const r = Router();
r.use(auth());
r.use(permit(ROLES.OWNER, ROLES.ADMIN));

r.get("/licenses", myLicenses);
r.get("/cases", myCases);
r.get("/payments", myPayments);

export default r;
