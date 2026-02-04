import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";
import { verifyAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Borcelle - Admin Dashboard",
  description: "Admin dashboard to manage Borcelle's data",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    // Verify admin authentication on the server
    const admin = await verifyAdmin();
  
    if (!admin) {
      redirect("/sign-in");
    }

  return (
      <html lang="en">
        <body className={inter.className}>
          <div className="flex max-lg:flex-col text-grey-1">
            <LeftSideBar />
            <TopBar />
            <div className="flex-1">{children}</div>
          </div>
        </body>
      </html>
  );
}
