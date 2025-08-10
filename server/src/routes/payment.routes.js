import { Router } from "express";
import { auth, permit } from "../middleware/auth.js";
import { ROLES } from "../utils/roles.js";
import { listMy, payMock } from "../controllers/payment.controller.js";

const r = Router();
r.use(auth());
r.use(permit(ROLES.OWNER, ROLES.ADMIN));

r.get("/", listMy);
r.post("/mock-pay", payMock);

export default r;
