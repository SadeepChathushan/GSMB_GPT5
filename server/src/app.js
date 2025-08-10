import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import xssClean from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import errorHandler from "./middleware/error.js";
import authRoutes from "./routes/auth.routes.js";
import publicRoutes from "./routes/public.routes.js";
import policeRoutes from "./routes/police.routes.js";
import gsmbRoutes from "./routes/gsmb.routes.js";
import ownerRoutes from "./routes/owner.routes.js";
import licenseRoutes from "./routes/license.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import { scheduleReinstatementJob } from "./jobs/reinstatementJob.js";

dotenv.config();
const app = express();
await connectDB();

const origin = process.env.ORIGIN || "http://localhost:5173";

app.use(helmet());
app.use(cors({ origin, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(xssClean());
app.use(mongoSanitize());
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/police", policeRoutes);
app.use("/api/gsmb", gsmbRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/licenses", licenseRoutes);
app.use("/api/payments", paymentRoutes);

// health
app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use(errorHandler);

scheduleReinstatementJob();

export default app;
