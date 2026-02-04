"use client";
import { navLinks, services } from "./Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { LuChevronDown } from "react-icons/lu";

interface MobileNavProps {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpen: boolean;
}

export default function MobileNav({ menuOpen, setMenuOpen }: MobileNavProps) {
  const [serviceOpen, setServiceOpen] = useState(false);

  // 🔒 Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="lg:hidden">
      <ul
        className={`
          fixed right-0 z-50 
          h-[calc(100vh-170px)] w-full
          bg-black/90 backdrop-blur-xl
          border-t border-white/10
          flex flex-col items-center gap-8 py-10
          overflow-y-auto   /* ✅ scrolling enabled */
          transition-transform duration-500 ease-in-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {navLinks.map((link) => {
          if (link.label === "Our Services") {
            return (
              <li key={link.url}>
                <button
                  onClick={() => setServiceOpen(!serviceOpen)}
                  className="flex items-center justify-center gap-2 text-xl font-semibold text-gray-200"
                >
                  Our Services

                  {/* ⬇️ Arrow */}
                  <LuChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${serviceOpen ? "rotate-180" : "rotate-0"
                      }`}
                  />
                </button>

                {serviceOpen && (
                  <div className="mt-6 space-y-6 text-gray-400 text-sm">
                    {services.map((section) => (
                      <div key={section.title}>
                        <p className="font-semibold text-gray-200 mb-2">
                          {section.title}
                        </p>
                        <ul className="space-y-1">
                          {section.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            );
          }

          return (
            <li key={link.url}>
              <Link
                href={link.url}
                onClick={() => setMenuOpen(false)}
                className="text-xl font-semibold text-gray-200"
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
