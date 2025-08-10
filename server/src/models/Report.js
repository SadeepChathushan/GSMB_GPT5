import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    lorryNumber: { type: String, index: true },
    location: { lat: Number, lng: Number },
    timestamp: { type: Date, default: Date.now },
    photoUrl: String,
    notes: String,
    status: {
      type: String,
      enum: ["NEW", "IN_PROGRESS", "CONFIRMED", "DISMISSED"],
      default: "NEW",
      index: true
    },
    priority: { type: String, enum: ["LOW", "MEDIUM", "HIGH"], default: "MEDIUM" },
    createdBy: { type: String, default: "PUBLIC" },
    handledBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
