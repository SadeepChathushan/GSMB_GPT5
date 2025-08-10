import { Router } from "express";
import { lookup, report, upload } from "../controllers/public.controller.js";
import { auth } from "../middleware/auth.js";

const r = Router();
r.get("/lookup", auth(false), lookup);
r.post("/report", auth(false), upload.single("photo"), report);
export default r;
