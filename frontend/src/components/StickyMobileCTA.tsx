"use client";

import React, { useState, useEffect } from "react";
import { PhoneCall, Calendar, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface StickyMobileCTAProps {
  currentPage?: string;
  onNavigateContact?: () => void;
}

export default function StickyMobileCTA({ currentPage, onNavigateContact }: StickyMobileCTAProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);

  // Detect when user has scrolled near bottom footer to avoid overlapping
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 350;
      setIsNearFooter(scrollPosition >= threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Do not show on contact or thank-you page or if dismissed or near footer
  if (
    currentPage === "contact" ||
    currentPage === "thank-you" ||
    isDismissed ||
    isNearFooter
  ) {
    return null;
  }

  return (
    <aside
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-slate-950/90 backdrop-blur-xl border-t border-white/15 shadow-[0_-10px_30px_rgba(0,0,0,0.6)]"
      aria-label="Quick contact actions"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Direct Call Button */}
        <a
          href="tel:+918790946714"
          className="flex-1 inline-flex items-center justify-center gap-1.5 h-11 px-3 rounded-full bg-white/10 active:bg-white/15 border border-white/15 text-white text-xs font-semibold font-mono tracking-tight cursor-pointer"
          aria-label="Call VRPI Engineering Team"
        >
          <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
          <span>Call Us</span>
        </a>

        {/* Primary Schedule CTA Button */}
        <a
          href="#/contact"
          onClick={(e) => {
            if (onNavigateContact) {
              e.preventDefault();
              onNavigateContact();
            }
          }}
          className="flex-[2] inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-full bg-gradient-to-r from-[#FA6400] via-[#FF5500] to-[#E60038] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(250,100,0,0.4)] active:scale-95 transition-all cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Briefing</span>
          <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
        </a>

        {/* Dismiss Pill */}
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white bg-white/5 active:bg-white/10"
          aria-label="Dismiss sticky contact bar"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
