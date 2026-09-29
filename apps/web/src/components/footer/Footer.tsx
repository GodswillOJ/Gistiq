 "use client";
import {
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";

import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-12">

        {/* Main footer */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand / Description */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Your News
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-gray-600">
              Bringing you the latest news, stories, insights, and updates
              from Nigeria and around the world.
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="rounded-full p-2 text-gray-600 transition hover:bg-gray-200 hover:text-gray-900"
              >
                <FaFacebook size={19} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="rounded-full p-2 text-gray-600 transition hover:bg-gray-200 hover:text-gray-900"
              >
                <FaInstagram size={19} />
              </a>

              <a
                href="#"
                aria-label="X"
                className="rounded-full p-2 text-gray-600 transition hover:bg-gray-200 hover:text-gray-900"
              >
                <span className="text-sm font-semibold">𝕏</span>
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="rounded-full p-2 text-gray-600 transition hover:bg-gray-200 hover:text-gray-900"
              >
                <FaYoutube size={19} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="rounded-full p-2 text-gray-600 transition hover:bg-gray-200 hover:text-gray-900"
              >
                <FaLinkedin size={19} />
              </a>

              <a
                href="mailto:godswill.ogono@gmail.com"
                aria-label="Email"
                className="rounded-full p-2 text-gray-600 transition hover:bg-gray-200 hover:text-gray-900"
              >
                <Mail size={19} />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
              Company
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="/about" className="hover:text-black">
                  About Us
                </a>
              </li>

              <li>
                <a href="/contact" className="hover:text-black">
                  Contact
                </a>
              </li>

              <li>
                <a href="/careers" className="hover:text-black">
                  Careers
                </a>
              </li>

              <li>
                <a href="/advertise" className="hover:text-black">
                  Advertise With Us
                </a>
              </li>
            </ul>
          </div>

          {/* News */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
              News
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="/latest" className="hover:text-black">
                  Latest News
                </a>
              </li>

              <li>
                <a href="/categories" className="hover:text-black">
                  Categories
                </a>
              </li>

              <li>
                <a href="/politics" className="hover:text-black">
                  Politics
                </a>
              </li>

              <li>
                <a href="/business" className="hover:text-black">
                  Business
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-300" />

        {/* Bottom */}
        <div className="flex flex-col gap-4 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} Your News. All rights reserved.
          </p>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
            <a
              href="/privacy"
              className="hover:text-gray-900"
            >
              Privacy Policy
            </a>

            <a
              href="/terms"
              className="hover:text-gray-900"
            >
              Terms & Conditions
            </a>

            <span className="hidden text-gray-300 sm:inline">|</span>

            <span>
              Website made by{" "}
              <span className="font-medium text-gray-900">
                Godswill Ogono
              </span>
            </span>
          </div>
        </div>

        {/* Email */}
        <div className="mt-4 text-center text-sm text-gray-500">
          <a
            href="mailto:godswill.ogono@gmail.com"
            className="transition hover:text-gray-900"
          >
            godswill.ogono@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}