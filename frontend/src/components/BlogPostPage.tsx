"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Check,
  CheckCircle2,
  Tag,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Terminal,
  ShieldCheck,
  Cpu,
  Layers,
  Network,
  BookOpen,
  ArrowRight,
  ListFilter,
  BarChart3,
  Bookmark,
} from "lucide-react";
import { type BlogPost, BLOG_POSTS } from "@/components/BlogSection";
import { usePageMetadata } from "@/lib/head";

interface BlogPostPageProps {
  post: BlogPost;
  onNavigateBack: () => void;
  onNavigateHome?: () => void;
}

// In-depth technical sections tailored to each engineering publication
const DETAILED_ARTICLE_SECTIONS: Record<
  string,
  {
    subheading: string;
    paragraphs: string[];
    callout?: { title: string; body: string };
  }[]
> = {
  "embodied-ai-neuromorphic-2026": [
    {
      subheading: "1. Overcoming the Edge Round-Trip Latency Barrier",
      paragraphs: [
        "In industrial robotics and high-velocity automation cells, a latency budget exceeding 10 milliseconds between spatial perception and actuation causes kinematic oscillation. Traditional cloud-tethered foundation models, despite their reasoning capacity, fail catastrophically under erratic WAN jitter.",
        "By mapping quantized 4-bit Vision-Language-Action (VLA) weights onto heterogeneous neuromorphic silicon, our architecture achieves deterministic forward passes in 4.2 milliseconds. Sensory inputs from synchronized event cameras stream spikes directly into asynchronous crossbar arrays, eliminating frame-buffering overhead.",
      ],
      callout: {
        title: "Deterministic Constraint",
        body: "All actuation decisions must resolve before the mechanical delta-T window expires. Fallback kinematic reflex circuits execute on bare-metal ARM Cortex-R52 cores if neuromorphic inference exceeds 6.0ms.",
      },
    },
    {
      subheading: "2. Hard-Realtime ROS2 Micro-Kernel Orchestration",
      paragraphs: [
        "To bridge spatial neural inference with physical motors, we deployed a customized ROS2 Galactic distribution running over a real-time Linux kernel with PREEMPT_RT patches. Lockless ring buffers decouple asynchronous neural weight streaming from synchronous 1000Hz trajectory generation.",
        "Zero-copy shared memory handles multi-modal sensor telemetry across stereo LiDAR, multi-spectral thermal, and ultra-high-speed event sensors without copying buffers across the kernel boundary.",
      ],
    },
    {
      subheading: "3. Dual-Ring Memory Fabric & Operational Telemetry",
      paragraphs: [
        "The architecture implements a split-plane memory architecture: Ring A maintains safety-critical kinematic matrices with zero allocations during runtime, while Ring B multiplexes contextual telemetry to central fleet monitoring at 20Hz over encrypted QUIC tunnels.",
        "Over 12 months in Tier-1 logistics facilities, autonomous mobile units running this stack achieved 99.4% first-pass pick accuracy with zero safety trip-wire disconnections.",
      ],
    },
  ],
  "zero-downtime-kubernetes-mesh": [
    {
      subheading: "1. The Inherent Fragility of Traditional DNS & Proxy Meshes",
      paragraphs: [
        "Global multi-tenant enterprise platforms processing hundreds of millions of transactions cannot rely on standard DNS TTL failovers or heavyweight sidecar proxies. In our production benchmarking, traditional Envoy sidecar injection introduced up to 14MB of baseline memory overhead per pod and added 3.8ms to P99 inter-service round trips.",
        "When an Atlantic transatlantic submarine fiber strand experienced an unannounced outage, standard routing controllers took 74 seconds to converge, violating our 99.999% availability SLA.",
      ],
      callout: {
        title: "eBPF Socket Redirection",
        body: "By attaching eBPF programs directly to the sockops and tc (traffic control) hooks in the Linux kernel, we bypassed the TCP/IP stack for local container-to-container calls, reducing P99 latency by 28%.",
      },
    },
    {
      subheading: "2. Autonomous Regional Draining & eBPF Routing Fabric",
      paragraphs: [
        "We re-engineered our mesh using Cilium eBPF and declarative GitOps pipelines driven by ArgoCD. Rather than waiting for DNS propagation, eBPF probes continuously evaluate synthetic ingress round-trip health across Frankfurt, Virginia, Tokyo, and Singapore clusters.",
        "When anomalous latency jitter is detected in a target region, regional drain controllers autonomously shift ingress traffic via BGP Anycast routes in under 12 seconds with zero dropped inflight sessions.",
      ],
    },
    {
      subheading: "3. Multi-Cluster Raft Consensus & Drift Prevention",
      paragraphs: [
        "State synchronization across geolocated control planes uses a Raft consensus cluster with tuned heartbeat timers. GitOps pull-based synchronization guarantees that all bare-metal nodes and managed cloud instances adhere strictly to immutable infrastructure manifests.",
        "The resulting topology delivered continuous five-nines uptime throughout peak financial quarters, handling over 850 million transactions with automated failover under 12 seconds.",
      ],
    },
  ],
  "zero-trust-cryptography-enclaves": [
    {
      subheading: "1. The Looming Harvest-Now-Decrypt-Later Vector",
      paragraphs: [
        "Nation-state actors and sophisticated criminal syndicates are systematically capturing and stockpiling encrypted corporate communications and financial clearing transactions. When cryptanalytically relevant quantum computers (CRQCs) come online, classical RSA-4096 and ECDSA-384 cryptographic envelopes will be trivial to invert retrospectively.",
        "Waiting for commercial quantum supremacy to upgrade cryptographic suites exposes decades of sovereign data to retroactive decryption.",
      ],
      callout: {
        title: "Dual-Layer Hybrid Tunnels",
        body: "All communication channels terminate through hybrid TLS 1.3 handshakes combining standard X25519 with CRYSTALS-Kyber-768. Compromising the session requires breaking both classical elliptic curves and lattice mathematics simultaneously.",
      },
    },
    {
      subheading: "2. Lattice Cryptography in AMD SEV-SNP Enclaves",
      paragraphs: [
        "We implemented NIST-standardized CRYSTALS-Kyber (key encapsulation) and CRYSTALS-Dilithium (digital signatures) directly inside AMD Secure Encrypted Virtualization-Secure Nested Paging (SEV-SNP) hardware enclaves.",
        "Even cloud hypervisors and root administrators cannot inspect or dump the contents of enclave registers. Ephemeral private keys exist solely within CPU cache registers and are automatically zeroized upon any hardware heartbeat deviation.",
      ],
    },
    {
      subheading: "3. Zero-Knowledge Remote Attestation & Sovereign Compliance",
      paragraphs: [
        "Prior to dispatching financial settlement batches, external clients receive cryptographic attestation receipts verifiable against trusted hardware roots of trust. The enclave proves its integrity without revealing secrets or underlying tenant states.",
        "Deploying this architecture enables tier-1 financial institutions to meet NIST 2030 post-quantum mandates four years ahead of compliance deadlines.",
      ],
    },
  ],
  "high-throughput-event-streaming": [
    {
      subheading: "1. Dissecting the Microsecond Penalty of Standard JVM Meshes",
      paragraphs: [
        "Standard event-streaming pipelines based on JVM architectures face unpredictable stop-the-world garbage collection pauses ranging from 15ms to several seconds. In high-frequency clearing and settlement systems, a 15ms pause creates order-book divergence and severe slippage.",
        "To achieve guaranteed sub-millisecond execution for 1.2 million events per second, we replaced the intermediate ingestion tier with bare-metal Rust utilizing Data Plane Development Kit (DPDK) kernel bypass.",
      ],
      callout: {
        title: "Mechanical Sympathy & NUMA Binding",
        body: "Worker threads are strictly pinned to dedicated physical CPU cores with isolated L1/L2 caches. Ingestion workers never perform cross-NUMA socket memory accesses, avoiding interconnect contention.",
      },
    },
    {
      subheading: "2. Lockless Ring Buffers & Zero-Copy Deserialization",
      paragraphs: [
        "Data ingested from 100GbE network interfaces streams directly into cache-aligned, single-producer single-consumer (SPSC) ring buffers. Zero-copy deserialization enables the risk-scoring engine to evaluate transaction payloads without moving bytes across memory addresses.",
        "Hardware-offloaded NIC filters discard malformed telemetry and spoofed packets directly at the network card level before triggering any CPU interrupt.",
      ],
    },
    {
      subheading: "3. Memory-Mapped NVMe Persistence & Crash Resilience",
      paragraphs: [
        "Audit ledgers write sequentially to enterprise NVMe arrays through memory-mapped (mmap) persistent files. If an unexpected operating system reboot occurs, the in-memory state is immediately intact upon restart without requiring database rebuild phases.",
        "In production stress simulations, the pipeline maintained a steady 0.35ms P99 latency while processing 1,200,000 events per second with zero dropped frames.",
      ],
    },
  ],
};

export default function BlogPostPage({
  post,
  onNavigateBack,
  onNavigateHome,
}: BlogPostPageProps) {
  const [copied, setCopied] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Scroll reading progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  usePageMetadata({
    title: `${post.title} — Engineering Publication`,
    description: post.summary,
    ogImage: post.image,
    canonical: `https://vrpisc.com/#/blog/${post.id}`,
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [post]);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim().includes("@")) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
    }
  };

  const sections = DETAILED_ARTICLE_SECTIONS[post.id] || [];
  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="w-full bg-white text-slate-900 min-h-screen pt-28 sm:pt-32 pb-20 font-sans relative">
      {/* Top Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FA6400] via-[#FF5500] to-[#E60038] z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Subtle warm ambient background highlights */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/6 -left-32 w-[700px] h-[700px] bg-[#FA6400]/[0.035] rounded-full blur-[180px]" />
        <div className="absolute top-1/2 -right-32 w-[700px] h-[700px] bg-[#E60038]/[0.025] rounded-full blur-[180px]" />
      </div>

      {/* Full-width container matching Navbar and Footer (max-w-7xl) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* TOP BREADCRUMB & BACK ACTION BAR                          */}
        {/* ========================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 group"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform">&larr;</span>
              <span>Home</span>
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={onNavigateBack}
              className="hover:text-slate-900 transition-colors cursor-pointer font-medium"
            >
              <span>Engineering Blog</span>
            </button>
            <span>/</span>
            <span className="text-[#E65100] font-semibold truncate max-w-[240px] sm:max-w-md">
              {post.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onNavigateBack}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Publications</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono transition-colors cursor-pointer"
              title="Copy link to publication"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Article</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* EDITORIAL ARTICLE HEADER                                  */}
        {/* ========================================================= */}
        <header className="mb-8 max-w-5xl">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 mb-4">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-orange-50 border border-orange-200 text-[#E65100]">
              {post.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {post.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {post.publishDate}
            </span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Production Verified
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black font-['Space_Grotesk'] text-slate-950 tracking-tight leading-[1.1] mb-5">
            {post.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-normal max-w-4xl">
            {post.summary}
          </p>
        </header>

        {/* ========================================================= */}
        {/* FULL-WIDTH HERO IMAGE & METRICS BANNER                    */}
        {/* ========================================================= */}
        <div className="relative rounded-3xl overflow-hidden aspect-[21/9] min-h-[280px] sm:min-h-[380px] lg:min-h-[440px] mb-12 border border-slate-200 shadow-xl bg-slate-950">
          <img
            src={post.image}
            alt={`Detailed engineering architecture schematic for ${post.title}`}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          {post.metricsHighlight && (
            <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-auto sm:max-w-lg p-3.5 sm:p-4 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-mono text-emerald-400 flex items-center gap-3 shadow-2xl">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>{post.metricsHighlight}</span>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* 12-COLUMN MAIN CONTENT & STICKY SIDEBAR GRID              */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Main Reading Pane (8 Columns) */}
          <article className="lg:col-span-8 space-y-8 text-slate-700 leading-relaxed">
            {/* Executive Lead Paragraph */}
            <div className="text-lg sm:text-xl text-slate-900 font-medium leading-relaxed border-l-4 border-[#FA6400] pl-6 py-2 bg-orange-50/50 rounded-r-2xl">
              {post.content.lead}
            </div>

            {/* Key Architectural Takeaways Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-4 my-8">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-6 rounded-full bg-gradient-to-b from-[#FA6400] to-[#E60038]" />
                <h2 className="font-mono text-xs uppercase tracking-wider text-[#E65100] font-bold">
                  KEY ARCHITECTURAL TAKEAWAYS &amp; PRODUCTION BENCHMARKS
                </h2>
              </div>
              <ul className="space-y-3 pt-2">
                {post.content.keyTakeaways.map((takeaway, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-3 text-sm sm:text-base text-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deep-Dive Technical Sections */}
            {sections.map((sec, sIdx) => (
              <section key={sIdx} className="space-y-4 pt-4">
                <h2 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-slate-950 tracking-tight">
                  {sec.subheading}
                </h2>
                {sec.paragraphs.map((pText, pIdx) => (
                  <p key={pIdx} className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                    {pText}
                  </p>
                ))}

                {sec.callout && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/[0.08] border border-amber-500/25 text-slate-800 text-sm sm:text-base space-y-1.5 my-6">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-800 block">
                      ARCHITECTURAL CONSTRAINT: {sec.callout.title}
                    </span>
                    <p className="text-slate-800 leading-relaxed font-normal">
                      {sec.callout.body}
                    </p>
                  </div>
                )}
              </section>
            ))}

            {/* System Topology Specification Terminal */}
            <div className="my-10 rounded-2xl bg-slate-950 border border-slate-800 p-5 sm:p-7 shadow-xl overflow-hidden font-mono text-xs sm:text-sm text-cyan-300">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400 text-xs">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>TOPOLOGY SPECIFICATION // VRPI ARCHITECTURE NOTE</span>
                </div>
                <span className="text-slate-500 font-semibold">PRODUCTION RUNTIME</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                {post.content.architectureNote}
              </p>
            </div>

            {/* Architectural Conclusion */}
            <div className="pt-6 border-t border-slate-200">
              <h2 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-slate-950 mb-3">
                Production Conclusion
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                {post.content.conclusion}
              </p>
            </div>

            {/* Tags & Action Bar */}
            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" /> Tags:
                </span>
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 text-white text-xs font-mono font-semibold hover:bg-slate-800 transition-colors cursor-pointer shadow-md"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? "Link Copied!" : "Share Publication"}</span>
                </button>
                <button
                  type="button"
                  onClick={onNavigateBack}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-semibold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Blog</span>
                </button>
              </div>
            </div>
          </article>

          {/* Sticky Sidebar (4 Columns) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            {/* Architectural Publication Dossier */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#E65100] font-bold">
                <BookOpen className="w-4 h-4 text-[#FA6400]" />
                <span>Publication Dossier</span>
              </div>
              <div className="space-y-2.5 text-xs font-mono pt-1">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Publisher</span>
                  <span className="font-semibold text-slate-900">VRPI Systems Engineering</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Classification</span>
                  <span className="font-semibold text-slate-900">Architecture Whitepaper</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Status</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Production Verified
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-500">Peer Review</span>
                  <span className="font-semibold text-slate-900">Systems Review Board</span>
                </div>
              </div>
            </div>

            {/* Key Metrics Highlight Card */}
            {post.metricsHighlight && (
              <div className="p-6 rounded-3xl bg-slate-950 text-white shadow-lg border border-slate-800">
                <div className="flex items-center gap-2 mb-3 text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                  <BarChart3 className="w-4 h-4" />
                  <span>Production SLA Benchmark</span>
                </div>
                <div className="text-lg font-bold font-mono text-white mb-2">
                  {post.metricsHighlight}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Empirically benchmarked under live enterprise workloads across distributed geo-clusters.
                </p>
              </div>
            )}

            {/* Table of Contents / Quick Jump */}
            {sections.length > 0 && (
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-wider text-[#E65100] font-bold">
                  <ListFilter className="w-4 h-4" />
                  <span>Publication Breakdown</span>
                </div>
                <ul className="space-y-2 text-xs font-mono text-slate-700">
                  <li className="flex items-start gap-2 text-slate-900 font-semibold">
                    <span className="text-[#FA6400]">•</span>
                    <span>Executive Summary &amp; Key Takeaways</span>
                  </li>
                  {sections.map((sec, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-600 hover:text-slate-900 transition-colors">
                      <span className="text-slate-400">•</span>
                      <span>{sec.subheading}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2 text-slate-600">
                    <span className="text-slate-400">•</span>
                    <span>System Topology Specification</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <span className="text-slate-400">•</span>
                    <span>Production Conclusion</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Quick Share Card */}
            <div className="p-5 rounded-2xl bg-orange-50/60 border border-orange-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold font-['Space_Grotesk'] text-slate-900 block">
                  Found this valuable?
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  Share with your engineering peers
                </span>
              </div>
              <button
                type="button"
                onClick={handleShare}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FA6400] to-[#E60038] text-white text-xs font-mono font-semibold cursor-pointer shadow-sm hover:brightness-110"
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </aside>
        </div>

        {/* ========================================================= */}
        {/* RELATED PUBLICATIONS (Full Width)                         */}
        {/* ========================================================= */}
        <div className="mt-16 pt-10 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E65100] block mb-1">
                CONTINUE EXPLORING
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-slate-950">
                Related Architectural Briefs
              </h2>
            </div>
            <button
              type="button"
              onClick={onNavigateBack}
              className="text-xs font-mono text-[#E65100] hover:text-[#FA6400] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View All Publications</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relPost) => (
              <a
                key={relPost.id}
                href={`#/blog/${relPost.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-3xl overflow-hidden border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl transition-all p-5 no-underline text-inherit cursor-pointer"
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-slate-950">
                    <img
                      src={relPost.image}
                      alt={`Technical architecture visual for ${relPost.title}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-slate-950/80 text-white border border-white/10">
                      {relPost.category}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-500 mb-2">
                    {relPost.readTime} • {relPost.publishDate}
                  </div>
                  <h3 className="text-base font-bold font-['Space_Grotesk'] text-slate-950 group-hover:text-[#FA6400] transition-colors line-clamp-2 leading-snug">
                    {relPost.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                    {relPost.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-slate-900 font-semibold">
                  <span>Open Publication</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#FA6400]" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* NEWSLETTER STRIP (Full Width)                             */}
        {/* ========================================================= */}
        <div className="mt-14 rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 p-6 sm:p-10 shadow-md flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white border border-slate-200 text-xs font-mono text-[#FA6400] font-bold mb-2 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#FA6400]" />
              <span>VRPI ARCHITECTURE DISPATCH</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-slate-950">
              Get fortnightly architectural briefs directly in your inbox.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              No marketing fluff. Peer-reviewed systems architecture, low-latency benchmarks, and distributed post-mortems.
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[320px]">
            {newsletterSubscribed ? (
              <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Confirmed. Subscribed to dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="architect@enterprise.com"
                  required
                  className="px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#FA6400] flex-1 min-w-0"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#FA6400] to-[#E60038] text-white font-mono text-xs font-bold hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer whitespace-nowrap uppercase tracking-wider"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
