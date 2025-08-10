import User from "../models/User.js";
import { ROLES } from "../utils/roles.js";
import { StatusCodes as S } from "http-status-codes";

export async function createOwner(req, res) {
  const { email, name, phone, password } = req.body;
  if (!email || !name || !password) return res.status(S.BAD_REQUEST).json({ message: "email, name, password required" });
  const exists = await User.findOne({ email });
  if (exists) return res.status(S.CONFLICT).json({ message: "Email already exists" });
  const user = await User.create({ email, name, phone, password, role: ROLES.OWNER });
  res.status(S.CREATED).json({ id: user.id, email: user.email, name: user.name, role: user.role, phone: user.phone });
}

export async function listOwners(req, res) {
  const owners = await User.find({ role: ROLES.OWNER }).select("name email phone createdAt");
  res.json(owners);
}
