"use client";

import React, { useEffect } from "react";
import { Terminal, Home, ArrowLeft, Search, Layers, BookOpen, Mail, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import { usePageMetadata } from "@/lib/head";

interface NotFoundPageProps {
  onNavigateHome?: () => void;
  onNavigatePage?: (page: string) => void;
}

export default function NotFoundPage({ onNavigateHome, onNavigatePage }: NotFoundPageProps) {
  usePageMetadata({
    title: "404 — Architectural Route Not Found",
    description: "The requested route does not exist in the VRPI Tech Solutions system registry.",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const currentPath = typeof window !== "undefined" ? window.location.hash || window.location.pathname : "/404";

  return (
    <div className="w-full min-h-[85vh] bg-[#07090D] text-slate-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative overflow-hidden">
      {/* Background Matrix/Circuit Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#E60038]/[0.08] rounded-full blur-[160px]" />
        <div className="absolute -bottom-20 left-1/4 w-[450px] h-[450px] bg-[#FA6400]/[0.06] rounded-full blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 w-full max-w-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] text-center"
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-slate-400">VRPI_SYS_ROUTER :: DISPATCH_FAULT</span>
          </div>
          <span className="text-rose-400 font-bold">STATUS 404</span>
        </div>

        {/* 404 Number Glitch Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono uppercase tracking-widest mb-4">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Error Code: ERR_ROUTE_NOT_REGISTERED</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black font-['Space_Grotesk'] text-white tracking-tight mb-3">
          Route Not Found
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed mb-6 font-normal">
          The requested path <code className="px-2 py-0.5 rounded bg-white/10 text-amber-300 font-mono text-xs">{currentPath}</code> does not exist in our production topology. It may have been migrated, refactored, or unpublished.
        </p>

        {/* Terminal Diagnostics Box */}
        <div className="text-left font-mono text-xs bg-black/60 border border-white/10 rounded-xl p-4 mb-8 text-slate-400 space-y-1">
          <div className="text-slate-500">// System Topology Diagnostic:</div>
          <div>&gt; HOST: <span className="text-slate-200">https://vrpisc.com</span></div>
          <div>&gt; TARGET_NODE: <span className="text-rose-400">{currentPath}</span></div>
          <div>&gt; LOOKUP_RESULT: <span className="text-amber-400">NULL_POINTER_EXCEPTION (0 entries)</span></div>
          <div>&gt; SUGGESTED_ACTION: <span className="text-emerald-400">Reroute to primary cluster index</span></div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              if (onNavigateHome) onNavigateHome();
              else window.location.hash = "/";
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#FA6400] via-[#FF5500] to-[#E60038] shadow-[0_0_25px_rgba(250,100,0,0.4)] hover:shadow-[0_0_35px_rgba(250,100,0,0.6)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <a
            href="#/services"
            onClick={() => onNavigatePage && onNavigatePage("services")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4 text-[#FA6400]" />
            <span>Explore Services</span>
          </a>

          <a
            href="#/contact"
            onClick={() => onNavigatePage && onNavigatePage("contact")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Contact Support</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}

