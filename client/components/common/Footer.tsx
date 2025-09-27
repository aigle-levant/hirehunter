"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faShieldDog } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="w-full bg-blue-950 text-gray-300 px-6 sm:px-12 py-12 border-t border-white/10">
      {/* Top CTA Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
        <p className="text-lg font-light max-w-lg">
          Your AI Wingman for Hiring
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/jd"
            className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all"
          >
            Scan resumes
          </Link>
          <Link
            href="/schedule"
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            Schedule an interview
          </Link>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Branding & Socials */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faShieldDog} size="2xl" />
            <h2 className="text-2xl font-semibold text-white">Hirehunter</h2>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Made by Team Technoblasters
          </p>

          <div className="flex gap-4 mt-4">
            <a
              href="https://github.com/aigle-levant/hirehunter"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
            <a
              href="https://www.linkedin.com/in/prajanya-subramanian/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
            <a
              href="https://x.com/aiglelevant"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faXTwitter} size="lg" />
            </a>
          </div>
        </div>

        {/* Column 1 */}
        <div className="space-y-6">
          <div>
            <Link href="/jd" className="block text-white hover:underline">
              Scan resumes
            </Link>
            <p className="text-sm text-gray-400 mt-1">
              Let the AI scan resumes and bring you the details.
            </p>
          </div>
          <div>
            <Link
              href="/leaderboard"
              className="block text-white hover:underline"
            >
              Leaderboard
            </Link>
            <p className="text-sm text-gray-400 mt-1">
              Rank your candidates and select the best of the best!
            </p>
          </div>
          <div>
            <Link href="/about" className="block text-white hover:underline">
              About
            </Link>
            <p className="text-sm text-gray-400 mt-1">
              Take a look at how Hirehunter was built.
            </p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          <div>
            <Link href="/schedule" className="block text-white hover:underline">
              Schedule
            </Link>
            <p className="text-sm text-gray-400 mt-1">
              Prepare interviews and queries real quick!
            </p>
          </div>
          <div>
            <Link href="/schedule" className="block text-white hover:underline">
              Feedback
            </Link>
            <p className="text-sm text-gray-400 mt-1">
              Send and receive feedback and analyze their tone.
            </p>
          </div>
          <div>
            <Link href="/contact" className="block text-white hover:underline">
              Contact us
            </Link>
            <p className="text-sm text-gray-400 mt-1">
              Have a query? Contact us!
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-12 pt-6 border-t border-white/10 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} Hirehunter. All rights reserved.
      </div>
    </footer>
  );
}
