import mongoose, { Schema, models } from "mongoose";

const RFQSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    service: { type: String },
    details: { type: String, required: true },
    status: { type: String, default: "new" }
  },
  { timestamps: true }
);

export const RFQ = models.RFQ || mongoose.model("RFQ", RFQSchema);
