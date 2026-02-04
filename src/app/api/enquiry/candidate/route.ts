import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name:
    process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const file = formData.get("resume") as File | null;

    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    let resumeUrl = null;

    // Upload resume to Cloudinary if provided
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Remove file extension and sanitize filename (replace spaces/special chars with underscores)
      const fileNameWithoutExt = (file.name.substring(0, file.name.lastIndexOf('.')) || file.name)
        .replace(/[\s\W-]+/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "candidate_resumes",
            public_id: `${Date.now()}_${fileNameWithoutExt}`,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        uploadStream.end(buffer);
      });

      resumeUrl = (result as any).secure_url;
    }

    const enquiry = await prisma.candidateEnquiry.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
        resume: resumeUrl,
      },
    });

    // Send email notification
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          subject: `New Candidate Enquiry: ${subject}`,
          message: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}

Resume: ${resumeUrl ? resumeUrl : 'No resume uploaded'}
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
    console.error("CANDIDATE_ENQUIRY_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const enquiries = await prisma.candidateEnquiry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ enquiries }, { status: 200 });
  } catch (error) {
    console.error("FETCH_CANDIDATE_ENQUIRY_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    // Find the enquiry to get the resume URL
    const enquiry = await prisma.candidateEnquiry.findUnique({
      where: { id },
    });

    if (!enquiry) {
      return NextResponse.json(
        { error: "Enquiry not found" },
        { status: 404 }
      );
    }

    // Delete from Cloudinary if resume exists
    if (enquiry.resume) {
      try {
        // Extract public_id from Cloudinary URL
        // URL format: https://res.cloudinary.com/{cloud_name}/image/upload/{version}/{folder}/{public_id}
        const urlParts = enquiry.resume.split('/upload/');
        if (urlParts.length > 1) {
          const publicIdPath = urlParts[1].split('/').slice(1).join('/');
          const publicId = publicIdPath.split('.')[0]; // Remove extension

          await cloudinary.uploader.destroy(publicId);
        }
      } catch (cloudinaryError) {
        console.error("Error deleting from Cloudinary:", cloudinaryError);
        // Continue with DB deletion even if Cloudinary deletion fails
      }
    }

    // Delete from database
    await prisma.candidateEnquiry.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: "Enquiry deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE_CANDIDATE_ENQUIRY_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}
