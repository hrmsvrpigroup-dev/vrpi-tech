"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  X,
  ExternalLink,
  CheckCircle2,
  Search,
} from "lucide-react";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { usePageMetadata } from "@/lib/head";
import { BLOG_POSTS } from "@/components/BlogSection";

const CATEGORIES = [
  "All Publications",
  "AI & Agentic Systems",
  "Distributed Cloud",
  "Zero-Trust Security",
  "Fintech & High-Throughput",
] as const;

export default function BlogPage({ onNavigateHome }: { onNavigateHome?: () => void }) {
  usePageMetadata({
    title: "Engineering Blog & Technical Research",
    description: "Peer-reviewed architectural briefs, distributed systems post-mortems, and engineering benchmarks authored directly by VRPI principal engineers.",
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("All Publications");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === "All Publications" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find((p) => p.featured) || filteredPosts[0];
  const gridPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim().includes("@")) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="w-full bg-white text-slate-900 min-h-screen pt-28 sm:pt-32 pb-16 font-sans relative">
      {/* Subtle warm ambient background highlights */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-[#FA6400]/[0.035] rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-[#E60038]/[0.025] rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* BLOG HERO BANNER & BREADCRUMB                             */}
        {/* ========================================================= */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-3 sm:mb-4 text-xs font-mono text-slate-500">
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 group"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform">&larr;</span>
              <span>Home</span>
            </button>
            <span>/</span>
            <span className="text-[#E65100] font-semibold">Engineering Blog &amp; Publications</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 sm:pb-5 border-b border-slate-200">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 sm:gap-4 mb-1.5">
                <div className="w-1.5 sm:w-2 h-8 sm:h-10 rounded-full bg-gradient-to-b from-[#FA6400] to-[#E60038] shadow-[0_0_12px_rgba(250,100,0,0.3)] shrink-0" />
                <div>
                  <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#E65100] block mb-0.5">
                    PEER-REVIEWED ARCHITECTURAL BRIEFS
                  </span>
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-['Space_Grotesk'] text-slate-950 tracking-tight leading-[1.1]">
                    Engineering Blog
                  </h1>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 sm:mt-2 leading-relaxed font-normal pl-4 sm:pl-5">
                Technical research, distributed systems post-mortems, and architectural benchmarks authored directly by our principal engineers and researchers. Click any publication to read in a dedicated page.
              </p>
            </div>

            {/* Quick Publication Stats */}
            <div className="flex sm:flex-col gap-2.5 sm:gap-3 bg-slate-50 border border-slate-200 p-2.5 sm:p-3.5 rounded-2xl shrink-0 shadow-sm">
              <div>
                <span className="text-base sm:text-xl font-extrabold text-slate-950 font-['Space_Grotesk'] block leading-none">
                  10,000+
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-slate-500 block mt-0.5 sm:mt-1">Subscribed Engineers</span>
              </div>
              <div className="pl-2.5 sm:pl-0 border-l sm:border-l-0 sm:border-t border-slate-200 sm:pt-2">
                <span className="text-base sm:text-xl font-extrabold text-[#E65100] font-['Space_Grotesk'] block leading-none">
                  Fortnightly
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-slate-500 block mt-0.5 sm:mt-1">Production Dispatches</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE CATEGORY TABS & SEARCH                        */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? "bg-slate-950 text-white font-bold border-slate-950 shadow-md"
                      : "bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="relative min-w-[260px] sm:min-w-[300px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, paper, or tag..."
              className="w-full pl-10 pr-4 py-1.5 sm:py-2 rounded-full bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#FA6400] focus:ring-1 focus:ring-[#FA6400] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* FEATURED FLAGSHIP ARTICLE (Exact Same View Mobile/Desktop)*/}
        {/* ========================================================= */}
        {featuredPost && (
          <motion.a
            href={`#/blog/${featuredPost.id}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="group relative block rounded-3xl overflow-hidden border border-slate-200 bg-white hover:border-slate-300 transition-all duration-500 shadow-xl hover:shadow-2xl mb-8 cursor-pointer no-underline text-inherit"
          >
            {/* Main split grid: Media on left, Editorial on right across both mobile and desktop */}
            <div className="grid grid-cols-12 min-h-[220px] sm:min-h-[340px] lg:min-h-[420px]">
              {/* Media Column (Left) */}
              <div className="col-span-12 sm:col-span-5 relative overflow-hidden min-h-[190px] sm:min-h-full bg-slate-950">
                <img
                  src={featuredPost.image}
                  alt={`Technical diagram and architecture schematic for ${featuredPost.title}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase bg-[#FA6400] text-white shadow-lg">
                    FEATURED PUBLICATION
                  </span>
                </div>
                {featuredPost.metricsHighlight && (
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-mono text-emerald-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span className="truncate">{featuredPost.metricsHighlight}</span>
                  </div>
                )}
              </div>

              {/* Editorial Column (Right) */}
              <div className="col-span-12 sm:col-span-7 p-4 sm:p-6 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono text-slate-500 mb-2 sm:mb-3">
                    <span className="text-[#E65100] font-bold">{featuredPost.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredPost.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredPost.publishDate}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold font-['Space_Grotesk'] text-slate-950 group-hover:text-[#FA6400] transition-colors leading-snug sm:leading-tight mb-2 sm:mb-3">
                    {featuredPost.title}
                  </h2>

                  <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed mb-4 sm:mb-6 font-normal">
                    {featuredPost.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    {featuredPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-[11px] font-mono bg-slate-100 border border-slate-200 text-slate-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3.5 sm:pt-5 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="font-semibold text-slate-800">VRPI Engineering Publication</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-slate-100 group-hover:bg-slate-950 text-slate-800 group-hover:text-white text-[11px] sm:text-xs font-mono font-semibold tracking-wider transition-all duration-300 shadow-sm shrink-0">
                    <span>OPEN IN NEW PAGE</span>
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </motion.a>
        )}

        {/* ========================================================= */}
        {/* SECONDARY ARTICLE CARDS (Side-By-Side Row on Mobile & Grid on Desktop) */}
        {/* ========================================================= */}
        <div className="flex overflow-x-auto pb-4 gap-4 sm:gap-6 mb-16 snap-x snap-mandatory lg:grid lg:grid-cols-3 no-scrollbar">
          {gridPosts.map((post, idx) => (
            <motion.a
              key={post.id}
              href={`#/blog/${post.id}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-[85vw] max-w-[340px] sm:w-[320px] lg:w-auto shrink-0 snap-start group flex flex-col justify-between rounded-3xl overflow-hidden border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl transition-all duration-300 shadow-md cursor-pointer block no-underline text-inherit"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
                <img
                  src={post.image}
                  alt={`Architecture overview visual for ${post.title}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-slate-950/80 backdrop-blur-md border border-white/10 text-white font-medium">
                  {post.category}
                </span>

                {post.metricsHighlight && (
                  <span className="absolute bottom-2 right-3 text-[10px] font-mono text-emerald-300 bg-black/70 px-2 py-0.5 rounded border border-white/15">
                    {post.metricsHighlight.split("•")[0]}
                  </span>
                )}
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.publishDate}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-['Space_Grotesk'] text-slate-950 group-hover:text-[#FA6400] transition-colors line-clamp-2 leading-snug mb-2.5">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">
                    VRPI Systems Research
                  </span>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 group-hover:bg-slate-950 text-slate-700 group-hover:text-white transition-all shadow-sm text-xs font-mono">
                    <span>Open</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* ========================================================= */}
        {/* ENGINEERING DISPATCH NEWSLETTER STRIP                     */}
        {/* ========================================================= */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 p-5 sm:p-8 lg:p-10 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono text-[#FA6400] font-bold mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#FA6400]" />
              <span>VRPI ARCHITECTURE DISPATCH</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-slate-950 tracking-tight">
              Get peer-reviewed systems architecture briefs every fortnight.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              No marketing noise. Pure production post-mortems, edge benchmarks, and high-concurrency architecture blueprints.
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[280px] sm:min-w-[320px]">
            {newsletterSubscribed ? (
              <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Confirmed. Welcome to the VRPI Architecture Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="architect@enterprise.com"
                  required
                  className="px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#FA6400] focus:ring-1 focus:ring-[#FA6400] flex-1 min-w-0"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#FA6400] to-[#E60038] text-white font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer whitespace-nowrap"
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
