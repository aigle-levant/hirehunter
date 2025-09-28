"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative w-full bg-gradient-to-br from-[#155dfc]/10 via-[#1c398e]/20 to-[#155dfc]/10 py-20 px-6 overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Background blobs for visual effect */}
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

      {/* CTA Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl mx-auto space-y-6"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-basierCircle leading-tight text-black dark:text-white">
          Let AI find the perfect candidates{" "}
          <span className="italic font-black font-dmSerif">
            in seconds, not weeks
          </span>
          .
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-black/70 dark:text-gray-400 font-body max-w-2xl mx-auto">
          Stop wasting time on endless resumes. Our AI sidekick spots top talent
          instantly so you can hire smarter, faster, and fairer.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/login">
            <button className="px-6 py-3 rounded-2xl bg-blue-500 text-white font-semibold text-lg hover:bg-blue-600 transition-all duration-200">
              Get Started
            </button>
          </Link>
          {/* <Link href="/demo">
            <button className="px-6 py-3 rounded-2xl bg-white/20 text-black font-semibold text-lg hover:bg-white/30 hover:text-white transition-all duration-200">
              See Demo
            </button>
          </Link> */}
        </div>
      </motion.div>
    </section>
  );
}
