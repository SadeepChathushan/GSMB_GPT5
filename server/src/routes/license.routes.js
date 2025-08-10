import { Router } from "express";
import { getById } from "../controllers/license.controller.js";
import { auth } from "../middleware/auth.js";

const r = Router();
r.use(auth());
r.get("/:id", getById);
export default r;
