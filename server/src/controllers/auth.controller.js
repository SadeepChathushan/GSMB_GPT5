import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { StatusCodes as S } from "http-status-codes";
import { ROLES } from "../utils/roles.js";

function sign(user) {
  const payload = { sub: user.id, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "12h" });
  return token;
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(S.UNAUTHORIZED).json({ message: "Invalid credentials" });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(S.UNAUTHORIZED).json({ message: "Invalid credentials" });
  const token = sign(user);
  res.json({ token, user: { id: user.id, email: user.email, role: user.role, name: user.name } });
}

export async function me(req, res) { res.json({ user: req.user }); }

export async function seed(req, res) {
  const seedUsers = [
    { email: "admin@gov.lk", name: "Admin", role: ROLES.ADMIN },
    { email: "police@gov.lk", name: "Police", role: ROLES.POLICE },
    { email: "gsmb@gov.lk", name: "GSMB", role: ROLES.GSMB },
    { email: "owner@mine.lk", name: "Owner", role: ROLES.OWNER }
  ];
  for (const u of seedUsers) {
    const exists = await User.findOne({ email: u.email });
    if (!exists) await User.create({ ...u, password: "Password@123" });
  }
  res.json({ ok: true });
}
