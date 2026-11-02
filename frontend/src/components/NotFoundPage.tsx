"use client";

import React, { useEffect, useState } from "react";
import {
  Terminal,
  Home,
  ArrowRight,
  Search,
  Layers,
  BookOpen,
  Mail,
  ShieldAlert,
  Compass,
  Cpu,
  RefreshCw,
  Copy,
  Check,
  Pause,
  Play,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { usePageMetadata } from "@/lib/head";

interface NotFoundPageProps {
  onNavigateHome?: () => void;
  onNavigatePage?: (page: string) => void;
}

const POPULAR_DESTINATIONS = [
  { label: "Mobile Engineering", path: "#/services", category: "Services 01" },
  { label: "Enterprise Web Systems", path: "#/services", category: "Services 02" },
  { label: "AI & Neural Edge Brief", path: "#/blog/embodied-ai-neuromorphic-edge", category: "R&D Paper" },
  { label: "Kubernetes 99.999% Mesh", path: "#/blog/zero-downtime-kubernetes-mesh", category: "Architecture" },
  { label: "Executive Leadership", path: "#/about", category: "Company" },
  { label: "Book Technical Briefing", path: "#/contact", category: "Contact" },
];

export default function NotFoundPage({ onNavigateHome, onNavigatePage }: NotFoundPageProps) {
  usePageMetadata({
    title: "404 — Architectural Route Not Found",
    description: "The requested route does not exist in the VRPI Tech Solutions system registry.",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(12);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Auto-redirect countdown timer
  useEffect(() => {
    if (isPaused) return;
    if (countdown <= 0) {
      if (onNavigateHome) onNavigateHome();
      else window.location.hash = "/";
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, isPaused, onNavigateHome]);

  const currentPath =
    typeof window !== "undefined"
      ? window.location.hash || window.location.pathname
      : "/404";

  const copyDiagnostic = () => {
    const text = `VRPI_DIAGNOSTIC_ERR_404\nHOST: https://vrpisc.com\nTARGET: ${currentPath}\nTIMESTAMP: ${new Date().toISOString()}\nSTATUS: UNREGISTERED_ROUTE`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const filteredLinks = POPULAR_DESTINATIONS.filter(
    (d) =>
      searchQuery.trim() === "" ||
      d.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-[#06080C] text-slate-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative overflow-hidden font-sans selection:bg-[#FA6400]/30 selection:text-white">
      {/* ========================================================= */}
      {/* 3D PERSPECTIVE CYBERNETIC GRID FLOOR                      */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep ambient multi-spectrum nebula */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-gradient-to-br from-[#FA6400]/15 via-[#E60038]/15 to-transparent rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute -bottom-24 left-1/4 w-[600px] h-[500px] bg-[#FF3366]/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/3 -right-24 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

        {/* Perspective floor grid */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[45vh] opacity-25"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            transform: "perspective(500px) rotateX(60deg)",
            transformOrigin: "bottom center",
            maskImage: "linear-gradient(to top, rgba(0,0,0,1) 10%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 10%, transparent 95%)",
          }}
        />

        {/* Horizontal Laser Scanning Line */}
        <motion.div
          animate={{ y: ["-10%", "110%"] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FA6400]/40 to-transparent pointer-events-none opacity-60"
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        {/* ========================================================= */}
        {/* TELEMETRY HUD PILL BAR                                    */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-2xl border border-white/10 text-[11px] font-mono text-slate-400 shadow-xl"
        >
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">CORE NODES: 100% ONLINE</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-300">GATEWAY: AP-SOUTH-HYD</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-rose-400 font-semibold">ROUTE: 404 UNMAPPED</span>
        </motion.div>

        {/* ========================================================= */}
        {/* HEROIC 404 GLOWING VISUAL DISPLAY                         */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-4 select-none flex items-center justify-center"
        >
          {/* Giant Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FA6400] to-[#E60038] blur-3xl opacity-30 scale-125" />

          {/* Large Holographic Numbers with Animated Scanline */}
          <div className="relative font-black font-['Space_Grotesk'] text-8xl sm:text-[160px] lg:text-[190px] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_20px_50px_rgba(250,100,0,0.35)]">
            404
            {/* Overlay Gradient Glaze */}
            <span
              className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-[#FA6400] via-[#FF5500] to-[#E60038] opacity-80 mix-blend-color-dodge pointer-events-none"
              aria-hidden="true"
            >
              404
            </span>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* EDITORIAL HEADLINE & ROUTE CONTEXT                        */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-center max-w-2xl mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3 shadow-[0_0_20px_rgba(255,51,102,0.2)]">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
            <span>ERR_ROUTE_NOT_REGISTERED</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-['Space_Grotesk'] text-white tracking-tight mb-3">
            Requested Node Unreachable
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            The architectural endpoint <code className="px-2.5 py-0.5 rounded-lg bg-white/10 text-amber-300 font-mono text-xs border border-white/15">{currentPath}</code> does not match any registered service topology or engineering paper.
          </p>

          {/* Auto Reroute Countdown Strip */}
          <div className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <RefreshCw className={`w-3.5 h-3.5 ${isPaused ? "" : "animate-spin"}`} />
              Auto-rerouting in {countdown}s
            </span>
            <span className="text-slate-600">·</span>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3 text-amber-400" />}
              <span>{isPaused ? "Resume" : "Pause"}</span>
            </button>
            <span className="text-slate-600">·</span>
            <button
              onClick={() => {
                if (onNavigateHome) onNavigateHome();
                else window.location.hash = "/";
              }}
              className="text-[#FA6400] hover:underline font-semibold cursor-pointer"
            >
              Return Now &rarr;
            </button>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* INTERACTIVE HUB CARD: SEARCH & TOPOLOGY DIAGNOSTICS       */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="w-full bg-slate-950/75 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 sm:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.85)] relative overflow-hidden mb-8"
        >
          {/* Top Decorative Terminal Bar */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-slate-300 font-semibold">VRPI_SYS_ROUTER :: DISPATCH_FAULT_TRACE</span>
            </div>
            <button
              onClick={copyDiagnostic}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10"
              title="Copy diagnostic trace to clipboard"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
              <span>{copied ? "Trace Copied" : "Copy Trace"}</span>
            </button>
          </div>

          {/* Quick Route Search Bar */}
          <div className="relative mb-6">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter available architectural practices, whitepapers, or team pages..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.05] border border-white/15 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-[#FA6400] focus:ring-2 focus:ring-[#FA6400]/20 transition-all font-sans"
            />
          </div>

          {/* Recommended Destinations Grid */}
          <div>
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-slate-400 uppercase tracking-wider font-semibold">
                Available Production Clusters
              </span>
              <span className="text-slate-400">{filteredLinks.length} paths active</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {filteredLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.path}
                  className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#FA6400]/50 transition-all duration-200 group flex items-center justify-between no-underline"
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] font-mono text-[#FA6400] block mb-0.5 font-semibold">
                      {item.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate block">
                      {item.label}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* PRIMARY CALL TO ACTION BUTTONS                            */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full"
        >
          <button
            type="button"
            onClick={() => {
              if (onNavigateHome) onNavigateHome();
              else window.location.hash = "/";
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#FA6400] via-[#FF5500] to-[#E60038] shadow-[0_0_35px_rgba(250,100,0,0.5)] hover:shadow-[0_0_50px_rgba(250,100,0,0.7)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <a
            href="#/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/25 backdrop-blur-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-[#FA6400]" />
            <span>Explore Services</span>
          </a>

          <a
            href="#/blog"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/25 backdrop-blur-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Read Engineering Blog</span>
          </a>

          <a
            href="#/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/25 backdrop-blur-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Direct Architecture Desk</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
