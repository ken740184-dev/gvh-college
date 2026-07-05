import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, phone, lastSchool, percentage, yearOfPassing, program } =
      await req.json();

    if (!firstName || !email || !program) {
      return NextResponse.json(
        { error: "First name, email, and program are required." },
        { status: 400 }
      );
    }

    const fullName = `${firstName} ${lastName}`.trim();
    const programLabel =
      program === "B.Com"
        ? "Bachelor of Commerce (B.Com)"
        : program === "B.A."
        ? "Bachelor of Arts (B.A.)"
        : program;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Confirmation email to applicant
    await transporter.sendMail({
      from: `"Gudleppa Hallikeri College Admissions" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Application Received — ${programLabel} | GVH College`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="background: linear-gradient(135deg, #1a56db, #0891b2); padding: 24px; border-radius: 6px; text-align: center; margin-bottom: 24px;">
            <h1 style="color: white; margin: 0; font-size: 22px;">Application Received!</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0;">Gudleppa Hallikeri Arts and Commerce First Grade College</p>
          </div>

          <p style="color: #444; line-height: 1.7;">Dear <strong>${fullName}</strong>,</p>
          <p style="color: #444; line-height: 1.7;">
            Thank you for applying to <strong>GVH College</strong>. We have successfully received your application for 
            <strong>${programLabel}</strong> for the 2026 academic year.
          </p>

          <div style="background: #f5f7ff; border-left: 4px solid #1a56db; padding: 16px; border-radius: 4px; margin: 20px 0;">
            <h3 style="margin: 0 0 12px; color: #1a56db; font-size: 15px;">Application Summary</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 5px 0; color: #666; width: 140px;">Full Name:</td><td style="color: #333;"><strong>${fullName}</strong></td></tr>
              <tr><td style="padding: 5px 0; color: #666;">Email:</td><td style="color: #333;">${email}</td></tr>
              <tr><td style="padding: 5px 0; color: #666;">Phone:</td><td style="color: #333;">${phone || "Not provided"}</td></tr>
              <tr><td style="padding: 5px 0; color: #666;">Program:</td><td style="color: #333;"><strong>${programLabel}</strong></td></tr>
              <tr><td style="padding: 5px 0; color: #666;">Previous School:</td><td style="color: #333;">${lastSchool}</td></tr>
              <tr><td style="padding: 5px 0; color: #666;">Percentage:</td><td style="color: #333;">${percentage}% (${yearOfPassing})</td></tr>
            </table>
          </div>

          <p style="color: #444; line-height: 1.7;">
            Our admissions team will review your application and contact you within <strong>3-5 working days</strong>.
            If you have any questions, please contact our Admission Office.
          </p>

          <div style="background: #f9f9f9; padding: 14px; border-radius: 6px; margin-top: 20px; font-size: 13px; color: #666;">
            <strong>Admission Office</strong><br/>
            📞 +91 XXXXX XXXXX<br/>
            ✉️ admissions@gvhcollege.edu<br/>
            📍 Hosaritti, Haveri District, Karnataka — 581115
          </div>
        </div>
      `,
    });

    // Notification email to admin
    await transporter.sendMail({
      from: `"GVH Admissions Portal" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Application: ${fullName} — ${programLabel}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #1a56db; border-bottom: 2px solid #1a56db; padding-bottom: 10px;">New Admission Application</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 140px;">Name:</td><td>${fullName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td>${phone || "Not provided"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Program:</td><td><strong>${programLabel}</strong></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Previous School:</td><td>${lastSchool}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Percentage:</td><td>${percentage}% — Passed ${yearOfPassing}</td></tr>
          </table>
          <p style="color: #888; font-size: 12px; margin-top: 20px;">Submitted via GVH College Admissions Portal</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Application submitted successfully!" });
  } catch (error: any) {
    console.error("Admissions email error:", error);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again later." },
      { status: 500 }
    );
  }
}
