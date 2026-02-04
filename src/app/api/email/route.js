import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, subject, message, name, resume } = await req.json();

    // Validate required fields
    if (!email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Email, subject, and message are required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email, // Allow replying directly to sender
      subject: `New Enquiry: ${subject}`,
      html: `
        <h2>New Enquiry Received</h2>
        ${name ? `<p><strong>Name:</strong> ${name}</p>` : ""}
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        ${resume ? `<hr /><p><strong>Resume:</strong> <a href="${resume}" target="_blank">View Resume</a></p>` : ""}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
