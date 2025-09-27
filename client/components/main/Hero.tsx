"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Trophy, FileText, Calendar } from "lucide-react";
import Link from "next/link";

// common array for typewriter effect
const examples = [
  "Rank candidates for the web developer role.",
  "Parse this JD and extract keywords.",
  "Schedule interviews for shortlisted candidates.",
  "Send rejection mail to candidates.",
];

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [exampleIndex, setExampleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentExample = examples[exampleIndex];
    const typingSpeed = isDeleting ? 20 : 30;

    const handleTyping = () => {
      if (!isDeleting && charIndex < currentExample.length) {
        setDisplayText(currentExample.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentExample.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === currentExample.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setExampleIndex((prev) => (prev + 1) % examples.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, exampleIndex]);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-gradient-to-br from-[#155dfc]/10 via-[#1c398e]/20 to-[#155dfc]/10 flex flex-col items-center justify-center overflow-hidden px-6 text-white dark:text-black"
    >
      <motion.div
        animate={{ x: [0, 120, 0], y: [0, -80, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 left-10 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-r from-[#155dfc]/20 to-[#1c398e]/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -150, 0], y: [0, 120, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 right-10 w-64 h-64 md:w-80 md:h-80 bg-gradient-to-tr from-[#1c398e]/20 to-[#155dfc]/10 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10 space-y-4 mt-10"
      >
        <h1 className="text-[4rem] font-basierCircle font-bold leading-tight text-white dark:text-black">
          Your perfect hire just got
          <br />
          <span className="italic font-black font-dmSerif">
            auto-rejected
          </span>{" "}
          by a broken filter.
        </h1>
        <p className="text-lg lg:text-2xl font-body dark:text-[#0a0a0a]/90 text-gray-300 max-w-2xl mx-auto">
          Your AI sidekick spots talent patterns humans miss.
        </p>
      </motion.div>

      <div className="w-full max-w-3xl mt-8 z-10">
        <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-4 md:p-6 border border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <p className="flex-1 w-full bg-transparent text-white/60 text-base md:text-lg font-medium leading-relaxed min-h-[60px]">
              {displayText}
            </p>
            <button className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 bg-white/50 hover:bg-white/80 mt-2 md:mt-0">
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mt-4 pt-4 border-t border-white/10 gap-4 md:gap-0">
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/login">
                <button className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium bg-white/10 text-white/70 border border-white/20 hover:bg-white/20 hover:text-white transition-all duration-200">
                  <Trophy className="w-4 h-4" />
                  Leaderboard
                </button>
              </Link>
              <Link href="/login">
                <button className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium bg-white/10 text-white/70 border border-white/20 hover:bg-white/20 hover:text-white transition-all duration-200">
                  <FileText className="w-4 h-4" />
                  Parse resumes
                </button>
              </Link>
              <Link href="/login">
                <button className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium bg-white/10 text-white/70 border border-white/20 hover:bg-white/20 hover:text-white transition-all duration-200">
                  <Calendar className="w-4 h-4" />
                  Schedule interviews
                </button>
              </Link>
            </div>
            <div className="text-white/40 text-sm mt-2 md:mt-0">
              {examples[exampleIndex].length}/2000
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
