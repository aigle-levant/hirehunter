"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, FileText, Calendar } from "lucide-react";

const solutions = [
  {
    icon: <Trophy className="w-10 h-10 text-blue-500" />,
    title: "Smart Candidate Ranking",
    description:
      "AI analyzes skills, experience, and JD fit to rank candidates automatically, helping you focus on the best talent first.",
    button: "Rank candidates now",
  },
  {
    icon: <FileText className="w-10 h-10 text-green-500" />,
    title: "JD Parsing & Keyword Extraction",
    description:
      "Paste any job description and get structured job cards with key skills, experience, and responsibilities instantly.",
    button: "Parse a JD",
  },
  {
    icon: <Calendar className="w-10 h-10 text-purple-500" />,
    title: "Automated Interview Scheduling",
    description:
      "Sync calendars and let the AI automatically schedule interviews for shortlisted candidates, saving hours of coordination.",
    button: "Schedule interviews",
  },
];

export default function Solutions() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX - window.innerWidth / 2) * 0.02,
        y: (e.clientY - window.innerHeight / 2) * 0.02,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#155dfc]/5 via-[#1c398e]/10 to-[#155dfc]/5 dark:from-[#1c1c2c]/5 dark:via-[#2c2c3a]/10 dark:to-[#1c1c2c]/5 py-20 px-6 text-white dark:text-black"
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6"
      >
        <div className="inline-flex px-5 py-2 rounded-full border  font-semibold backdrop-blur-lg">
          Meet Hirehunter
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-basierCircle leading-tight ">
          Transform hiring from a{" "}
          <span className="italic font-bold font-dmSerif">painful</span> process
          into an effortless AI-powered workflow, powered by LangChain.
        </h2>
        <p className="text-base sm:text-lg lg:text-xl dark:text-black/70 text-gray-300  max-w-3xl mx-auto">
          Streamline candidate screening, JD parsing, and interview scheduling,
          all in one place.
        </p>
      </motion.div>

      {/* Solution Cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
      >
        {solutions.map((s, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            animate={{
              rotateX: mouse.y,
              rotateY: mouse.x,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            // Swap light <-> dark mode
            className="relative p-6 sm:p-8 
                 bg-gray-900/80 text-white 
                 dark:bg-white/80 dark:text-black
                 backdrop-blur-xl border border-black/10 dark:border-gray-200
                 rounded-2xl shadow-lg cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              {s.icon}
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="text-sm sm:text-base text-gray-300 dark:text-gray-700 leading-relaxed">
                {s.description}
              </p>
            </div>
            <button
              className="mt-4 self-start px-4 py-2 rounded-full 
                   bg-blue-600/30 text-white hover:bg-blue-600/50 
                   dark:bg-blue-500/20 dark:text-blue-600 dark:hover:bg-blue-500/30 dark:hover:text-white 
                   transition-all duration-200 text-sm font-medium"
            >
              {s.button}
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Optional background blobs for effect */}
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
    </section>
  );
}
