import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Defensive check: ensure Prisma model exists in generated client
    if (!prisma || !("clientEnquiry" in prisma)) {
      console.error("Prisma model ClientEnquiry not found on prisma client. Did you run 'prisma generate' and apply migrations?");
      return NextResponse.json(
        { error: "Prisma model 'ClientEnquiry' not available. Run migrations and regenerate the client." },
        { status: 500 }
      );
    }

    const enquiry = await (prisma as any).clientEnquiry.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
      },
    });

    // Send email notification
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          subject: `New Client Enquiry: ${subject}`,
          message: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}
          `,
        }),
      });
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      { success: true, enquiry },
      { status: 201 }
    );
  } catch (error) {
    console.error("CLIENT_ENQUIRY_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!prisma || !("clientEnquiry" in prisma)) {
      console.error("Prisma model ClientEnquiry not found on prisma client. Did you run 'prisma generate' and apply migrations?");
      return NextResponse.json(
        { error: "Prisma model 'ClientEnquiry' not available. Run migrations and regenerate the client." },
        { status: 500 }
      );
    }

    const enquiries = await (prisma as any).clientEnquiry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ enquiries }, { status: 200 });
  } catch (error) {
    console.error("FETCH_CLIENT_ENQUIRY_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}
