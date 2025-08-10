import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import License from "./models/License.js";
import { ROLES } from "./utils/roles.js";

dotenv.config();
await connectDB();

const users = [
  { email: "admin@gov.lk", password: "Password@123", name: "Admin", role: ROLES.ADMIN },
  { email: "police@gov.lk", password: "Password@123", name: "Police", role: ROLES.POLICE },
  { email: "gsmb@gov.lk", password: "Password@123", name: "GSMB", role: ROLES.GSMB },
  { email: "owner@mine.lk", password: "Password@123", name: "Owner", role: ROLES.OWNER }
];

for (const u of users) {
  const ex = await User.findOne({ email: u.email });
  if (!ex) await User.create(u);
}

const owner = await User.findOne({ email: "owner@mine.lk" });
const licExists = await License.findOne({ lorryNumber: "LL-2345" });
if (!licExists) {
  await License.create({
    owner: owner.id,
    lorryNumber: "LL-2345",
    siteName: "Anuradhapura Quarry",
    status: "ACTIVE",
    expiresAt: new Date(Date.now() + 90*24*3600*1000)
  });
}

console.log("Seed complete");
process.exit(0);
