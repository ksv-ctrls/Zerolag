import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  requirement: { type: String, required: true },
  contactInfo: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
}, { collection: "emaildata" });

export const Enquiry = mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);
