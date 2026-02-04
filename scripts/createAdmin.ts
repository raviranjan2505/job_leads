import "dotenv/config";
import prisma from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.admin.create({
    data: {
      email: "admin@example.com",
      password: hashedPassword,
    },
  });

  console.log("✅ Admin created successfully");
}

main()
  .catch(console.error)
  .finally(() => process.exit(0));
