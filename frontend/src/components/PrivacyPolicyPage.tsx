"use client";

import React, { useEffect } from "react";
import { Shield, ArrowLeft, Lock, FileCheck, Eye, Database, Globe, Mail } from "lucide-react";
import { motion } from "motion/react";
import { usePageMetadata } from "@/lib/head";

interface PrivacyPolicyPageProps {
  onNavigateHome?: () => void;
}

export default function PrivacyPolicyPage({ onNavigateHome }: PrivacyPolicyPageProps) {
  usePageMetadata({
    title: "Privacy Policy — Enterprise Data Protection",
    description: "Learn how VRPI Tech Solutions safeguards corporate confidentiality, technical briefs, and personal data under global compliance frameworks.",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full bg-white text-slate-900 min-h-screen pt-28 sm:pt-32 pb-20 font-sans relative">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => {
              if (onNavigateHome) onNavigateHome();
              else window.location.hash = "/";
            }}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-slate-900 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Return to VRPI Tech Homepage</span>
          </button>
          <span className="text-xs font-mono text-slate-400">LAST REVISED: NOVEMBER 2026</span>
        </div>

        {/* Header */}
        <div className="border-b border-slate-200 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#E60038] text-xs font-mono uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Enterprise Compliance Standard</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-['Space_Grotesk'] text-slate-900 tracking-tight mb-4">
            Privacy Policy &amp; Data Protection
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            VRPI TECH SOLUTIONS PRIVATE LIMITED (&quot;VRPI&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to upholding strict confidentiality, data privacy, and intellectual property rights. This statement articulates how we collect, process, and safeguard information submitted through our web portal and technical consultations.
          </p>
        </div>

        {/* Content Sections */}
        <div className="prose prose-slate max-w-none space-y-10 text-sm sm:text-base text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <section className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-3 font-['Space_Grotesk']">
              <span className="w-2 h-2 rounded-full bg-[#FA6400]" />
              1. Information We Collect
            </h2>
            <p className="mb-3">
              We collect information strictly necessary to formulate engineering feasibility analyses, architectural proposals, and client service delivery:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
              <li><strong>Technical Consultation Data:</strong> Full name, corporate email address, enterprise name, target platform specifications, estimated budget brackets, and scope descriptions provided in contact forms.</li>
              <li><strong>Telemetry &amp; Usage Metadata:</strong> Anonymous routing analytics, browser engine, approximate geolocation (country/region level), and interaction timestamps to ensure platform uptime and security performance.</li>
              <li><strong>Communication Records:</strong> Transcripts of emails, design brief clarifications, and scheduling calls conducted under prospective service inquiries.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-3 font-['Space_Grotesk']">
              <span className="w-2 h-2 rounded-full bg-[#E60038]" />
              2. Bilateral NDA &amp; Intellectual Property Protection
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              We operate under an institutional standard of zero client IP disclosure. Any preliminary software architecture, product wireframes, API contracts, or business logic submitted to VRPI are held in strict confidence.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Upon engagement, all client codebases, proprietary algorithms, database schemas, and intellectual property remain 100% the sole property of the client as Work-for-Hire. VRPI enforces cryptographic isolation and role-based access control (RBAC) across engineering pods.
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-3 font-['Space_Grotesk']">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              3. Global Regulatory Compliance
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              Our data governance framework adheres to recognized statutory standards:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                <strong className="text-slate-900 block mb-1">EU GDPR</strong>
                <span className="text-slate-500">Lawful basis processing, right of access, rectification, and erasure under European law.</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                <strong className="text-slate-900 block mb-1">India DPDP Act (2023)</strong>
                <span className="text-slate-500">Explicit consent management and digital fiduciary safeguards under Indian data law.</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                <strong className="text-slate-900 block mb-1">California CCPA/CPRA</strong>
                <span className="text-slate-500">Zero sale of consumer or business data. Full opt-out rights honoured without penalty.</span>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-3 font-['Space_Grotesk']">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              4. Cookies &amp; Telemetry
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We employ strictly essential session cookies necessary for website security and navigation preferences. Anonymous aggregated performance telemetry is activated only upon your explicit consent via our interactive Cookie Banner. You may revoke consent at any time by clearing your browser cache.
            </p>
          </section>

          {/* Section 5: Real Registered Entity & Contact */}
          <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2.5 mb-3 font-['Space_Grotesk']">
              <Mail className="w-5 h-5 text-[#FA6400]" />
              5. Data Protection Officer &amp; Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              To exercise your rights to review, rectify, or purge personal data or technical briefs held in our registry, contact our Data Protection Officer:
            </p>
            <div className="space-y-1.5 font-mono text-xs text-slate-300">
              <div><strong>Entity:</strong> VRPI TECH SOLUTIONS PRIVATE LIMITED</div>
              <div><strong>Registered Office:</strong> Door No: 2-27-163, Gandhi Nagar, Near Jammichettu, Wanaparthy, Telangana 509103, India</div>
              <div><strong>Tech Campus:</strong> 8th Floor (B-Block), Meenakshi Tech Park, Phase-2, Gachibowli, Hyderabad, Telangana 500032, India</div>
              <div><strong>Official Email:</strong> <a href="mailto:info@vrpigroup.co.in" className="text-[#FFA040] hover:underline">info@vrpigroup.co.in</a></div>
              <div><strong>Direct Phone:</strong> <a href="tel:+918790946714" className="text-emerald-400 hover:underline">+91 8790946714</a></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

