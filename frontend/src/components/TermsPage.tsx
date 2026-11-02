"use client";

import React, { useEffect } from "react";
import { FileText, ArrowLeft, ShieldCheck, Scale, Award, Code2, AlertTriangle, Building2 } from "lucide-react";
import { motion } from "motion/react";
import { usePageMetadata } from "@/lib/head";

interface TermsPageProps {
  onNavigateHome?: () => void;
}

export default function TermsPage({ onNavigateHome }: TermsPageProps) {
  usePageMetadata({
    title: "Terms & Conditions — Master Services Agreement",
    description: "Review VRPI Tech Solutions Master Services Agreement, software engineering standards, IP ownership, and operational SLA commitments.",
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono uppercase tracking-wider mb-3">
            <Scale className="w-3.5 h-3.5 text-[#FA6400]" />
            <span>Master Services Agreement (MSA)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-['Space_Grotesk'] text-slate-900 tracking-tight mb-4">
            Terms &amp; Conditions of Engagement
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            These Terms and Conditions constitute a legally binding agreement between VRPI TECH SOLUTIONS PRIVATE LIMITED (&quot;VRPI&quot;) and the commissioning client entity (&quot;Client&quot;) governing the provision of software engineering, artificial intelligence, cloud architecture, and digital operations services.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-sm sm:text-base text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <section className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-3 font-['Space_Grotesk']">
              <span className="w-2 h-2 rounded-full bg-[#FA6400]" />
              1. Scope of Engineering Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              VRPI delivers engineering practices across digital platforms, including mobile application development, enterprise cloud architectures, neural system integrations, smart DOOH networks, and co-working node management. Each bespoke engagement is governed by an executed Statement of Work (SOW) outlining deliverables, milestones, and technical criteria.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-3 font-['Space_Grotesk']">
              <Code2 className="w-5 h-5 text-emerald-600" />
              2. Intellectual Property (Work-for-Hire Guarantee)
            </h2>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl mb-3 text-xs sm:text-sm text-emerald-900 font-medium">
              100% Client Ownership: All custom code, source repositories, database schemas, and documentation created specifically for the Client become the exclusive intellectual property of the Client immediately upon invoice settlement.
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              VRPI retains ownership solely over its pre-existing foundational frameworks, generic utility scripts, and open-source contributions. A perpetual, royalty-free, worldwide license is granted to the Client for any embedded standard libraries required to execute the deliverable.
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-3 font-['Space_Grotesk']">
              <Award className="w-5 h-5 text-blue-600" />
              3. Service Level Agreements &amp; Warranty
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              VRPI provides a standard 90-day post-launch warranty covering any architectural regressions, deviations from agreed technical specifications, or security vulnerabilities discovered within the contracted scope.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
              <li><strong>Critical Severity (Sev-1):</strong> Response within 30 minutes; continuous mitigation protocol until resolution.</li>
              <li><strong>High Severity (Sev-2):</strong> Response within 2 hours; hotfix dispatch within 12 hours.</li>
              <li><strong>Standard Maintenance:</strong> Scheduled within regular sprint release cycles.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-3 font-['Space_Grotesk']">
              <span className="w-2 h-2 rounded-full bg-[#E60038]" />
              4. Payment Terms &amp; Invoicing
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Invoices are issued based on agreed milestone completions or monthly sprint commitments. Payment terms are Net-15 days from invoice issuance via authorized wire transfer, ACH, or commercial credit. Milestone handovers and code repository access transfers are synchronized with milestone sign-off.
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-3 font-['Space_Grotesk']">
              <Building2 className="w-5 h-5 text-purple-600" />
              5. Governing Law &amp; Jurisdiction
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              This Agreement shall be governed by, and construed in accordance with, the laws of the Republic of India. In the event of any disputes that cannot be settled amicably through executive escalation, the courts located in Hyderabad, Telangana, India, shall hold exclusive judicial jurisdiction.
            </p>
          </section>

          {/* Section 6 */}
          <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3 font-['Space_Grotesk']">
              Corporate Legal Entity Details
            </h2>
            <div className="space-y-1.5 font-mono text-xs text-slate-300">
              <div><strong>Company Name:</strong> VRPI TECH SOLUTIONS PRIVATE LIMITED</div>
              <div><strong>Registered Office:</strong> Door No: 2-27-163, Gandhi Nagar, Near Jammichettu, Wanaparthy, Telangana 509103, India</div>
              <div><strong>Technology Campus:</strong> 8th Floor (B-Block), Meenakshi Tech Park, Phase-2, Gachibowli, Hyderabad, Telangana 500032, India</div>
              <div><strong>Legal Counsel &amp; Contracts Desk:</strong> <a href="mailto:info@vrpigroup.co.in" className="text-[#FFA040] hover:underline">info@vrpigroup.co.in</a></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
