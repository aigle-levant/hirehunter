"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeSwitcher } from "../theme-switcher";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  //   custom hook for checking if user's logged in
  const user = useSupabaseUser();
  //   for get started btn
  const getStartedLink = user ? "/dashboard" : "/auth/login";

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Parse resumes", path: user ? "/parse-resumes" : "/auth/login" },
    { name: "Schedule", path: user ? "/schedule" : "/auth/login" },
    { name: "Leaderboard", path: user ? "/leaderboard" : "/auth/login" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-md shadow-md dark:bg-gray-900/70"
          : "bg-white text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className={`font-bold font-sans text-2xl tracking-tight ${
              scrolled ? "text-black/50" : "text-black"
            }`}
          >
            Hirehunter
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="font-medium relative group transition-colors duration-200 text-gray-900 dark:text-gray-200"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* Get Started */}
            <Link href={getStartedLink}>
              <Button
                className={`transition-all duration-200 rounded-2xl ${
                  scrolled
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-white text-blue-900 hover:bg-gray-100"
                }`}
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`focus:outline-none ${
                scrolled ? "text-gray-900 dark:text-gray-200" : "text-white"
              }`}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg transition-all">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setMenuOpen(false)}
                className="block font-medium py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {link.name}
              </Link>
            ))}

            {/* Theme Switcher (mobile) */}
            <div className="w-full flex items-center justify-center py-2">
              <ThemeSwitcher />
            </div>

            {/* Get Started (mobile) */}
            <Link href={getStartedLink} onClick={() => setMenuOpen(false)}>
              <Button className="w-full rounded-2xl bg-blue-600 text-white hover:bg-blue-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
