import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/general/navbar/Navbar";
import Footer from "@/components/general/Footer";
import SearchModal from "@/components/modals/SearchModal";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/QueryProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Job Leads",
  description: "Techblog EgbonTech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased bg-background`}>
        <QueryProvider>
          <Navbar />
          <main className="pt-30 md:pt-25">
            {children}
          </main>
          <Footer />
          <SearchModal />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
