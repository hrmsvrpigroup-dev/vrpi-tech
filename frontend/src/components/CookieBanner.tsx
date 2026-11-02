"use client";

import React, { useState, useEffect } from "react";
import { Cookie, ShieldCheck, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { updateAnalyticsConsent } from "@/lib/analytics";

interface CookieBannerProps {
  onNavigatePrivacy?: () => void;
}

export default function CookieBanner({ onNavigatePrivacy }: CookieBannerProps) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("vrpi_cookie_consent");
      if (!consent) {
        // Show after a brief delay for optimal UX
        const timer = setTimeout(() => setShowBanner(true), 1200);
        return () => clearTimeout(timer);
      } else if (consent === "accepted") {
        updateAnalyticsConsent(true);
      }
    } catch {
      // safe fallback
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem("vrpi_cookie_consent", "accepted");
    } catch {}
    updateAnalyticsConsent(true);
    setShowBanner(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem("vrpi_cookie_consent", "essential_only");
    } catch {}
    updateAnalyticsConsent(false);
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-4 left-3 right-3 sm:left-6 sm:right-auto sm:max-w-md z-50 pointer-events-auto"
          role="region"
          aria-label="Cookie consent banner"
        >
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-white/15 text-slate-200 shadow-[0_20px_45px_rgba(0,0,0,0.6)] flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FA6400]/20 border border-[#FA6400]/40 flex items-center justify-center text-[#FA6400] shrink-0">
                  <Cookie className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white font-['Space_Grotesk']">
                    Enterprise Privacy &amp; Cookies
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-400 font-medium">
                    Zero Marketing Trackers
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleEssentialOnly}
                className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
                aria-label="Dismiss cookie notice"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
              We employ strictly essential tokens to secure platform routing. Optional anonymous telemetry helps us measure system latency and uptime. We never sell or share data.
            </p>

            <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
              <a
                href="#/privacy"
                onClick={(e) => {
                  if (onNavigatePrivacy) {
                    e.preventDefault();
                    onNavigatePrivacy();
                  }
                }}
                className="text-[11px] font-mono text-slate-400 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
              >
                Privacy Policy
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleEssentialOnly}
                  className="px-3 py-1.5 rounded-full text-[11px] font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                >
                  Essential Only
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold text-white bg-gradient-to-r from-[#FA6400] to-[#E60038] hover:brightness-110 shadow-sm transition-all cursor-pointer"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

