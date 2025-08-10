import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    license: { type: mongoose.Schema.Types.ObjectId, ref: "License", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["PENDING", "PAID", "FAILED"], default: "PENDING" },
    provider: { type: String, default: "MOCK" },
    paidAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
