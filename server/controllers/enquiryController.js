import { Enquiry } from "../models/Enquiry.js";
import { connectToDatabase } from "../config/db.js";
import { sendEnquiryEmail } from "../services/resendService.js";
import { z } from "zod";

const EnquirySchemaInput = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  requirement: z.string().min(1, "Requirement details are required"),
  contactInfo: z.string().optional()
});

export async function createEnquiry(req, res) {
  console.log("Received enquiry submission request:", req.body);
  
  // 1. Validate request body
  const validationResult = EnquirySchemaInput.safeParse(req.body);
  if (!validationResult.success) {
    console.error("Input validation failed:", validationResult.error.errors);
    return res.status(400).json({
      success: false,
      error: validationResult.error.errors.map(err => err.message).join(", ")
    });
  }

  const { name, email, requirement, contactInfo } = validationResult.data;

  try {
    // 2. Connect to Database
    await connectToDatabase();

    // 3. Save Enquiry to MongoDB
    console.log("Saving enquiry data to database...");
    const newEnquiry = new Enquiry({
      name,
      email,
      requirement,
      contactInfo: contactInfo || ""
    });
    const savedEnquiry = await newEnquiry.save();
    console.log("Successfully persisted in MongoDB with ID:", savedEnquiry._id);

    // 4. Send Email via Resend ONLY after successful DB Save
    console.log("DB save succeeded. Initiating Resend email dispatch...");
    const { data, error } = await sendEnquiryEmail({
      name,
      email,
      requirement,
      contactInfo,
      dbId: savedEnquiry._id
    });

    if (error) {
      console.error("Resend failed:", error);
      return res.status(500).json({
        success: false,
        message: "Email sending failed",
        error: error.message || error,
      });
    }

    console.log("Email sent successfully:", data);

    return res.status(201).json({
      success: true,
      message: "Enquiry processed, saved, and emailed successfully!",
      dbId: savedEnquiry._id,
      emailId: data?.id,
      emailStatus: "sent"
    });

  } catch (error) {
    console.error("CRITICAL: Enquiry processing pipeline failed:", error);
    return res.status(500).json({
      success: false,
      error: "An internal server error occurred while processing your enquiry. " + error.message
    });
  }
}
