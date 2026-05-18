import { Resend } from "resend";

export async function sendEnquiryEmail({ name, email, requirement, contactInfo, dbId }) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL || process.env.NOTIFY_EMAIL || "zerolagstudioz@gmail.com";
  
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY");
    return { error: new Error("Missing RESEND_API_KEY in environment variables") };
  }

  console.log("Sending email...");
  console.log("Recipient:", adminEmail);

  const resend = new Resend(apiKey);
  const phoneVal = contactInfo && contactInfo.trim() !== "" ? contactInfo.trim() : "Not provided";

  const emailHtml = `
    <h2>New Enquiry</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${requirement}</p>
    <p><strong>Phone:</strong> ${phoneVal}</p>
    <p style="margin-top: 20px; font-size: 11px; color: #888; border-top: 1px solid #eee; padding-top: 10px;">Saved to MongoDB _id: ${dbId}</p>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: "Zerolag Studioz <onboarding@resend.dev>",
      to: [adminEmail],
      subject: "New Zerolag Enquiry Received",
      replyTo: email,
      html: emailHtml,
    });

    console.log("Resend response:", data);
    console.log("Resend error:", error);

    return { data, error };
  } catch (err) {
    console.error("Resend send execution threw exception:", err);
    return { error: err };
  }
}
