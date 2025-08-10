import cron from "node-cron";
import Payment from "../models/Payment.js";
import License from "../models/License.js";
import { audit } from "../services/auditService.js";

export function scheduleReinstatementJob() {
  cron.schedule("*/5 * * * *", async () => {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const paid = await Payment.find({ status: "PAID", paidAt: { $lte: since } });
    for (const p of paid) {
      const lic = await License.findById(p.license);
      if (lic && lic.status === "SUSPENDED") {
        lic.status = "ACTIVE";
        await lic.save();
        await audit("SYSTEM", "LICENSE_REINSTATED", "License", lic.id, { by: "cron" });
      }
    }
  });
}
