"use client";

import Link from "next/link";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-background border-t border-white/10 mt-24">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Job Leads</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your trusted partner in recruitment and career growth. Connecting talent with the right opportunities since 2024.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/jobs"
                  className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                >
                  Career Resources
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                >
                  Career Tips
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MdLocationOn className="text-indigo-400 mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-400 text-sm">
                  Job Leads Headquarters<br />
                  Pune, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MdEmail className="text-indigo-400 flex-shrink-0" size={20} />
                <a
                  href="mailto:contact@jobleads.com"
                  className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                >
                  contact@jobleads.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MdPhone className="text-indigo-400 flex-shrink-0" size={20} />
                <a
                  href="tel:+919876543210"
                  className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                >
                  +91 (98765) 43210
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Job Leads. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a
              href="#"
              className="text-gray-400 hover:text-indigo-400 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-indigo-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-indigo-400 transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
