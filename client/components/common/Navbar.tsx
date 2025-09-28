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
  const user = useSupabaseUser();
  const getStartedLink = user ? "/dashboard" : "/auth/login";

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
      className={`fixed w-full z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-blue-300/50 backdrop-blur-md shadow-md dark:text-white dark:bg-blue-900/70"
          : "bg-black text-white dark:bg-white dark:text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className={`font-bold font-sans text-2xl tracking-tight transition-colors duration-500 ${
              scrolled
                ? "text-black/70 dark:text-white/70"
                : "text-white dark:text-black"
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
                className={`font-medium relative group transition-colors duration-500 ${
                  scrolled
                    ? "text-black/70 dark:text-white/70"
                    : "text-white dark:text-black"
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* Get Started Button */}
            <Link href={getStartedLink}>
              <Button
                className={`transition-colors duration-500 rounded-2xl ${
                  scrolled
                    ? "bg-white text-black dark:text-white hover:bg-gray-100 dark:bg-black  dark:hover:bg-gray-900"
                    : "bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100"
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
              className={`focus:outline-none transition-colors duration-500 ${
                scrolled
                  ? "text-black dark:text-white"
                  : "text-white dark:text-black"
              }`}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 dark:bg-white/95 backdrop-blur-md shadow-lg transition-all duration-500">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setMenuOpen(false)}
                className="block font-medium py-2 px-4 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}

            <div className="w-full flex items-center justify-center py-2">
              <ThemeSwitcher />
            </div>

            <Link href={getStartedLink} onClick={() => setMenuOpen(false)}>
              <Button className="w-full rounded-2xl bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-300">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
