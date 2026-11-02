"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Calendar, PhoneCall, Mail, ArrowRight, ShieldCheck, Clock, FileText, Home } from "lucide-react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { usePageMetadata } from "@/lib/head";

interface ThankYouPageProps {
  onNavigateHome?: () => void;
  onNavigateBlog?: () => void;
}

export default function ThankYouPage({ onNavigateHome, onNavigateBlog }: ThankYouPageProps) {
  usePageMetadata({
    title: "Thank You — Architecture Briefing Received",
    description: "Your enterprise inquiry has been registered. A Principal Architect will respond within 2 business hours.",
  });

  const [referenceId] = useState(() => {
    const random = Math.floor(100000 + Math.random() * 900000);
    return `VRPI-REQ-${random}`;
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Trigger welcoming celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#FA6400", "#E60038", "#FFB703", "#10B981"],
      });
    } catch {
      // fallback
    }
  }, []);

  return (
    <div className="w-full bg-white text-slate-900 min-h-screen pt-28 sm:pt-32 pb-20 font-sans relative">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-[#FA6400]/[0.04] rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-emerald-500/[0.03] rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
        >
          {/* Success Badge */}
          <div className="flex flex-col items-center text-center pb-8 border-b border-slate-100">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-5 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-semibold uppercase tracking-wider mb-3 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Inquiry Registered Successfully</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk'] mb-3">
              Thank You for Connecting
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
              Your technical requirements brief has been encrypted and routed directly to our Principal Systems Engineering Council.
            </p>

            {/* Reference ID Pill */}
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700">
              <span className="text-slate-400">DISPATCH REF:</span>
              <span className="font-bold text-[#FA6400]">{referenceId}</span>
            </div>
          </div>

          {/* SLA & What Happens Next (3 Step Pipeline) */}
          <div className="py-8 border-b border-slate-100">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-6 text-center">
              Next Steps in Our Engagement Protocol
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-slate-400">STAGE 01</span>
                    <Clock className="w-4 h-4 text-[#FA6400]" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Architecture Review</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A Principal Architect reviews your technical stack, timeline, and throughput specifications.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200/50 text-[11px] font-mono font-semibold text-emerald-600">
                  Target: &lt; 2 Business Hours
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-slate-400">STAGE 02</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Bilateral NDA</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We countersign our bilateral non-disclosure agreement or execute your enterprise counsel's standard terms.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200/50 text-[11px] font-mono font-semibold text-slate-500">
                  Zero IP Disclosure Risk
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-slate-400">STAGE 03</span>
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Solution Blueprint Call</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A 30-minute interactive technical scoping session with high-level architectural topologies and estimates.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200/50 text-[11px] font-mono font-semibold text-slate-500">
                  Senior Staff Engineers
                </div>
              </div>
            </div>
          </div>

          {/* Direct Urgent Channels */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left w-full sm:w-auto">
              <span className="text-xs font-mono text-slate-400 block mb-1">Need Urgent Direct Escalation?</span>
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700">
                <a href="tel:+918790946714" className="hover:text-[#FA6400] flex items-center gap-1.5 transition-colors">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                  <span>+91 8790946714 (India)</span>
                </a>
                <a href="mailto:info@vrpigroup.co.in" className="hover:text-[#FA6400] flex items-center gap-1.5 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>info@vrpigroup.co.in</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => {
                  if (onNavigateHome) onNavigateHome();
                  else window.location.hash = "/";
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#FA6400] to-[#E60038] text-white hover:brightness-110 transition-all text-center shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Home</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

