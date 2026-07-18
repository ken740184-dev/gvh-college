import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, phone, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email to admin
    await transporter.sendMail({
      from: `"GVH College Website" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #1a56db; border-bottom: 2px solid #1a56db; padding-bottom: 10px;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; font-weight: bold; color: #555; width: 120px;">Name:</td><td style="padding: 10px 0;">${name}</td></tr>
            <tr><td style="padding: 10px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 10px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 10px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 10px 0;">${phone || "Not provided"}</td></tr>
            <tr><td style="padding: 10px 0; font-weight: bold; color: #555; vertical-align: top;">Message:</td><td style="padding: 10px 0;">${message.replace(/\n/g, "<br/>")}</td></tr>
          </table>
          <p style="color: #888; font-size: 12px; margin-top: 20px;">Sent from GVH College Contact Form</p>
        </div>
      `,
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from: `"Gudleppa Hallikeri College" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "We received your message — GVH College",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #1a56db;">Thank you, ${name}!</h2>
          <p style="color: #444; line-height: 1.6;">We have received your message and will get back to you within 1-2 business days.</p>
          <div style="background: #f5f7ff; padding: 16px; border-radius: 6px; margin: 16px 0;">
            <p style="margin: 0; color: #666; font-size: 14px;"><strong>Your message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #888; font-size: 13px;">Gudleppa Hallikeri Arts and Commerce First Grade College<br/>Hosaritti, Haveri District, Karnataka — 581213</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error: any) {
    console.error("Contact email error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
