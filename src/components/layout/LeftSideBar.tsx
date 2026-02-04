"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { navLinks } from "@/lib/constants";
import { FiHome, FiBriefcase, FiFileText, FiUsers, FiSettings, FiLogOut } from "react-icons/fi";
import { adminLogoutAction } from "@/services/auth";
import { useState } from "react";

const iconMap: { [key: string]: React.ReactNode } = {
  Home: <FiHome size={20} />,
  Jobs: <FiBriefcase size={20} />,
  Posts: <FiFileText size={20} />,
  Users: <FiUsers size={20} />,
  Settings: <FiSettings size={20} />,
};

export default function LeftSideBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const res = await adminLogoutAction();
    if (res.success) {
      router.push("/sign-in");
    }
    setIsLoggingOut(false);
  };

  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-950 text-white p-6 hidden lg:flex flex-col border-r border-slate-700 sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">
          JL
        </div>
        <div>
          <h1 className="font-bold text-lg">Job Leads</h1>
          <p className="text-xs text-gray-400">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold px-2 mb-4">
          Main
        </p>

        {navLinks.map((link) => {
          const isActive = pathname === link.url;
          return (
            <Link
              key={link.label}
              href={link.url}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-slate-800"
              }`}
            >
              <span className="flex-shrink-0">
                {iconMap[link.label] || <FiHome size={20} />}
              </span>
              <span className="font-medium">{link.label}</span>
              {isActive && (
                <div className="ml-auto w-1 h-6 bg-indigo-400 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-slate-700 pt-4 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 transition-colors">
          <FiSettings size={20} />
          <span className="font-medium">Settings</span>
        </button>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-950/30 transition-colors disabled:opacity-50"
        >
          <FiLogOut size={20} />
          <span className="font-medium">
            {isLoggingOut ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>
    </aside>
  );
}
