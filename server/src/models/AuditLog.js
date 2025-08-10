import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    actor: { type: String }, // user id or 'SYSTEM'
    action: { type: String, required: true },
    entity: { type: String },
    entityId: { type: String },
    meta: Object
  },
  { timestamps: true }
);

export default mongoose.model("AuditLog", auditLogSchema);
