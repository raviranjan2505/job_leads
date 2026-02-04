"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { navLinks } from "@/lib/constants";
import { FiMenu, FiX, FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import { adminLogoutAction } from "@/services/auth";

const iconMap: { [key: string]: React.ReactNode } = {
  Home: "🏠",
  Jobs: "💼",
  Posts: "📄",
  Users: "👥",
};

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const res = await adminLogoutAction();
    if (res.success) {
      closeMenu();
      router.push("/sign-in");
    }
    setIsLoggingOut(false);
  };

  return (
    <header className="lg:hidden bg-gradient-to-r from-slate-900 to-slate-950 text-white border-b border-slate-700 sticky top-0 z-50">
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">
            JL
          </div>
          <span className="font-bold">Job Leads</span>
        </div>

        {/* Menu Button */}
        <button
          onClick={toggleMenu}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <nav className="bg-slate-850 border-t border-slate-700 p-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.url}
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 transition-colors"
            >
              <span className="text-lg">{iconMap[link.label as keyof typeof iconMap] || "•"}</span>
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}

          {/* Divider */}
          <div className="border-t border-slate-700 my-2"></div>

          {/* Bottom Menu Items */}
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 transition-colors">
            <FiUser size={18} />
            <span className="font-medium">Profile</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 transition-colors">
            <FiSettings size={18} />
            <span className="font-medium">Settings</span>
          </button>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-950/30 transition-colors disabled:opacity-50"
          >
            <FiLogOut size={18} />
            <span className="font-medium">
              {isLoggingOut ? "Logging out..." : "Logout"}
            </span>
          </button>
        </nav>
      )}
    </header>
  );
}
