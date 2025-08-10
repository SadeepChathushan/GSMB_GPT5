import AuditLog from "../models/AuditLog.js";
export async function audit(actor, action, entity, entityId, meta = {}) {
  try { await AuditLog.create({ actor, action, entity, entityId, meta }); }
  catch (e) { console.error("Audit error", e.message); }
}
