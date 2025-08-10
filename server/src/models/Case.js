import mongoose from "mongoose";

const caseSchema = new mongoose.Schema(
  {
    report: { type: mongoose.Schema.Types.ObjectId, ref: "Report", required: true },
    license: { type: mongoose.Schema.Types.ObjectId, ref: "License" },
    police: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    gsmb: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    evidence: [
      {
        photoUrl: String,
        gps: { lat: Number, lng: Number },
        notes: String,
        at: { type: Date, default: Date.now }
      }
    ],
    status: {
      type: String,
      enum: ["OPEN", "AWAITING_GSMB", "FINED", "CLOSED"],
      default: "OPEN",
      index: true
    },
    fineAmount: { type: Number, default: 0 },
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" }
  },
  { timestamps: true }
);

export default mongoose.model("Case", caseSchema);
