import { Router } from "express";
import { login, me, seed } from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.js";
const r = Router();
r.post("/login", login);
r.get("/me", auth(), me);
r.post("/seed", seed);
export default r;
