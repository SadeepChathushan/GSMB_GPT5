import mongoose from "mongoose";

const licenseSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lorryNumber: { type: String, required: true, index: true },
    siteName: String,
    routeGeoJson: Object,
    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED", "EXPIRED", "UNDER_INVESTIGATION"],
      default: "EXPIRED",
      index: true
    },
    expiresAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("License", licenseSchema);
