import jwt from "jsonwebtoken";
import { ROLES } from "../utils/roles.js";
import User from "../models/User.js";

export function auth(required = true) {
  return async (req, res, next) => {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) {
      if (required) return res.status(401).json({ message: "No token" });
      req.user = { role: ROLES.PUBLIC };
      return next();
    }
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(payload.sub).select("-password");
      if (!user) return res.status(401).json({ message: "Invalid token user" });
      req.user = user;
      next();
    } catch (e) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}

export function permit(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
