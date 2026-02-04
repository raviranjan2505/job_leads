"use client";
import Link from "next/link";
import Logo from "./Logo";
import { LuMenu, LuX, LuSearch } from "react-icons/lu";
import MobileNav from "./MobileNav";
import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import { useModalStore } from "@/store/useModalStore";
import SearchModal from "@/components/modals/SearchModal";

export const navLinks = [
  { url: "/", label: "Home" },
  { url: "/about", label: "About Company" },
  { url: "/services", label: "Our Services" },
  { url: "/client-enquiry", label: "Client/Company Enquiry" },
  { url: "/candidate-enquiry", label: "Candidate Enquiry" },
  { url: "/jobs", label: "Current Job Openings" },
  { url: "/contact-us", label: "Contact Us" },
];

export const services = [
  {
    title: "Recruitment Services",
    items: [
      "Permanent Staffing",
      "Temporary Staffing",
      "Contract Hiring",
      "Executive Search",
    ],
  },
  {
    title: "Industry Hiring",
    items: [
      "IT & Software",
      "Manufacturing",
      "Construction",
      "Healthcare",
    ],
  },
  {
    title: "HR Solutions",
    items: [
      "Payroll Management",
      "Background Verification",
      "HR Consulting",
      "Compliance Support",
    ],
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openSearch } = useModalStore();

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* 🔹 Top Info Bar */}
      <div className="bg-primary text-white text-sm">
        <div className="w-[95%] mx-auto flex flex-col md:flex-row justify-between items-center py-2">
          <p className="font-semibold">
            Job Leads, [Director - Mr. Ratan Giri]
          </p>
          <p>
            Call For Client: +91-7903010311 / Call For Candidates: +91-7903010311
          </p>
        </div>
      </div>

      {/* 🔹 Main Navbar */}
      <nav className="bg-secondary-background backdrop-blur-md">
        <div className="w-[95%] mx-auto flex items-center justify-between h-20">
          <Logo />

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-8 font-semibold text-gray-300 relative">
            {navLinks.map((link) => {
              if (link.label === "Our Services") {
                return (
                  <li key={link.url} className="relative group cursor-pointer">
                    <span className="flex items-center gap-1 hover:text-gray-100">
                      Our Services

                      {/* ⬇️ Arrow */}
                      <LuChevronDown
                        size={18}
                        className="transition-transform duration-300 group-hover:rotate-180"
                      />
                    </span>

                    {/* ✅ Mega Menu */}
                    <div
                      className="absolute left-1/2 top-full mt-6 w-187.5
    -translate-x-1/2 opacity-0 invisible
    group-hover:opacity-100 group-hover:visible
    transition-all duration-300"
                    >
                      <div
                        className="bg-secondary-background border border-white/10 
      rounded-2xl p-8 grid grid-cols-3 gap-8 shadow-xl"
                      >
                        {services.map((section) => (
                          <div key={section.title}>
                            <h4 className="text-white font-semibold mb-4">
                              {section.title}
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                              {section.items.map((item) => (
                                <li
                                  key={item}
                                  className="hover:text-gray-200 cursor-pointer"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>

                );
              }

              return (
                <li key={link.url} className="hover:text-gray-100">
                  <Link href={link.url}>{link.label}</Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Toggle & Search */}
          <div className="lg:hidden flex items-center gap-4 cursor-pointer text-white">
            <button
              onClick={openSearch}
              className="p-2 hover:bg-white/10 rounded-lg transition"
              aria-label="Search jobs"
            >
              <LuSearch size={22} />
            </button>
            <div onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <LuX size={26} /> : <LuMenu size={26} />}
            </div>
          </div>

          {/* Desktop Search Icon */}
          <button
            onClick={openSearch}
            className="hidden lg:flex items-center justify-center p-2 hover:bg-white/10 rounded-lg transition text-white"
            aria-label="Search jobs"
          >
            <LuSearch size={22} />
          </button>
        </div>

        {/* Mobile Menu */}
        <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </nav>

      {/* 🔹 Bottom Tagline */}
      <div className="bg-primary text-white text-center py-3 font-semibold">
        We Recruit, Right Person, Right Place, at Right Time
      </div>

      {/* Search Modal */}
      <SearchModal />
    </header>
  );
}
