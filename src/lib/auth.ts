// import { betterAuth } from "better-auth";
// import { prismaAdapter } from "better-auth/adapters/prisma";
// import prisma from "./prisma";

// export const auth = betterAuth({
//     database: prismaAdapter(prisma, {
//         provider: "postgresql", // or "mysql", "postgresql", ...etc
//     }),
//     baseURL:process.env.BETTER_AUTH_URL,
//       socialProviders: {
//         google: { 
//             clientId: process.env.GOOGLE_CLIENT_ID as string, 
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
//         }, 
//           github: { 
//             clientId: process.env.GITHUB_CLIENT_ID as string, 
//             clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
//         }, 
//     },
// });

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      role: string;
    };

    if (decoded.role !== "ADMIN") return null;

    return decoded; // { id, role }
  } catch {
    return null;
  }
}
