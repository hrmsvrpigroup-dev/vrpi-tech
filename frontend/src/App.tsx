import React, { useState, useEffect } from "react";
import Navbar, { type AppPage } from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechBentoGrid from "@/components/TechBentoGrid";
import Services from "@/components/Services";
import ServicesPage from "@/components/ServicesPage";
import BlogPage from "@/components/BlogPage";
import BlogPostPage from "@/components/BlogPostPage";
import { BLOG_POSTS } from "@/components/BlogSection";
import AboutSection from "@/components/AboutSection";
import AboutPage from "@/components/AboutPage";
import ContactPage from "@/components/ContactPage";
import ThankYouPage from "@/components/ThankYouPage";
import PrivacyPolicyPage from "@/components/PrivacyPolicyPage";
import TermsPage from "@/components/TermsPage";
import NotFoundPage from "@/components/NotFoundPage";
import CookieBanner from "@/components/CookieBanner";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import PageTransitionBar from "@/components/PageTransitionBar";
import Footer from "@/components/Footer";
import { ReducedMotionProvider } from "@/providers/ReducedMotionProvider";
import { LenisProvider } from "@/providers/LenisProvider";
import { usePageMetadata } from "@/lib/head";
import { trackPageView, initAnalytics } from "@/lib/analytics";

function getBlogIdFromHash(hash: string): string | null {
  if (!hash) return null;
  const clean = hash.replace(/^#\/?/, "");
  const parts = clean.split("/").filter(Boolean);
  if (parts[0] && parts[0].toLowerCase() === "blog" && parts[1]) {
    return parts[1].split("?")[0].trim();
  }
  return null;
}

function resolvePageFromHash(hash: string): AppPage {
  if (!hash) return "home";
  const clean = hash.replace(/^#\/?/, "").toLowerCase();
  if (clean === "" || clean === "/" || clean === "hero" || clean === "projects" || clean === "ecosystem" || clean === "why-vrpi") {
    return "home";
  }
  if (clean.startsWith("service")) return "services";
  if (clean.startsWith("blog")) return "blog";
  if (clean.startsWith("about")) return "about";
  if (clean.startsWith("contact")) return "contact";
  if (clean.startsWith("thank-you")) return "thank-you";
  if (clean.startsWith("privacy")) return "privacy";
  if (clean.startsWith("terms")) return "terms";
  if (clean.startsWith("404")) return "404";
  return "404";
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>(() => {
    if (typeof window !== "undefined") {
      return resolvePageFromHash(window.location.hash);
    }
    return "home";
  });

  const [blogPostId, setBlogPostId] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return getBlogIdFromHash(window.location.hash);
    }
    return null;
  });

  const [isNavigating, setIsNavigating] = useState(false);

  // Set default homepage metadata
  usePageMetadata({
    title: "VRPI TECH SOLUTIONS — Engineering the Digital Future",
    description:
      "We turn complexity into working software. Full-stack digital engineering partner building intelligent digital products, scalable software platforms, and cloud infrastructure.",
    canonical: "https://vrpisc.com/",
  });

  // Initialize analytics telemetry
  useEffect(() => {
    initAnalytics(false);
    trackPageView(window.location.hash || "/");
  }, []);

  // Keep state in sync with URL hash & browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      setIsNavigating(true);
      const hash = window.location.hash;
      const resolved = resolvePageFromHash(hash);
      const detectedBlogId = getBlogIdFromHash(hash);

      setCurrentPage(resolved);
      setBlogPostId(detectedBlogId);
      trackPageView(hash || "/");

      const timer = setTimeout(() => setIsNavigating(false), 280);
      return () => clearTimeout(timer);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleNavigate = (page: AppPage, targetId?: string) => {
    setIsNavigating(true);
    setBlogPostId(null);
    setCurrentPage(page);

    if (page === "services") {
      window.location.hash = "/services";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (page === "blog") {
      window.location.hash = "/blog";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (page === "about") {
      window.location.hash = "/about";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (page === "contact") {
      window.location.hash = "/contact";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (page === "thank-you") {
      window.location.hash = "/thank-you";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (page === "privacy") {
      window.location.hash = "/privacy";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (page === "terms") {
      window.location.hash = "/terms";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (targetId && targetId !== "hero") {
        window.location.hash = `/${targetId}`;
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 60);
      } else {
        window.location.hash = "/";
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }

    setTimeout(() => setIsNavigating(false), 280);
  };

  const activeBlogPost = blogPostId
    ? BLOG_POSTS.find((p) => p.id.toLowerCase() === blogPostId.toLowerCase()) || null
    : null;

  return (
    <ReducedMotionProvider>
      <LenisProvider>
        {/* Route Loading Transition Bar */}
        <PageTransitionBar isLoading={isNavigating} />

        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        {/* Global Navigation with active pill state */}
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

        <main id="main-content" className="flex-1 flex flex-col w-full min-h-screen">
          {currentPage === "services" ? (
            <ServicesPage onNavigateHome={() => handleNavigate("home", "hero")} />
          ) : currentPage === "blog" ? (
            activeBlogPost ? (
              <BlogPostPage
                post={activeBlogPost}
                onNavigateBack={() => handleNavigate("blog")}
                onNavigateHome={() => handleNavigate("home", "hero")}
              />
            ) : (
              <BlogPage onNavigateHome={() => handleNavigate("home", "hero")} />
            )
          ) : currentPage === "about" ? (
            <AboutPage onNavigateHome={() => handleNavigate("home", "hero")} />
          ) : currentPage === "contact" ? (
            <ContactPage onNavigateHome={() => handleNavigate("home", "hero")} />
          ) : currentPage === "thank-you" ? (
            <ThankYouPage
              onNavigateHome={() => handleNavigate("home", "hero")}
              onNavigateBlog={() => handleNavigate("blog")}
            />
          ) : currentPage === "privacy" ? (
            <PrivacyPolicyPage onNavigateHome={() => handleNavigate("home", "hero")} />
          ) : currentPage === "terms" ? (
            <TermsPage onNavigateHome={() => handleNavigate("home", "hero")} />
          ) : currentPage === "404" ? (
            <NotFoundPage
              onNavigateHome={() => handleNavigate("home", "hero")}
              onNavigatePage={(p) => handleNavigate(p as AppPage)}
            />
          ) : (
            <>
              <Hero />
              <TechBentoGrid />
              <Services onViewFullPage={() => handleNavigate("services")} />
              <AboutSection onViewFullPage={() => handleNavigate("about")} />
            </>
          )}
        </main>

        {/* Sticky Mobile CTA Bar (Mobile only) */}
        <StickyMobileCTA
          currentPage={currentPage}
          onNavigateContact={() => handleNavigate("contact")}
        />

        {/* Compliant Cookie Banner */}
        <CookieBanner onNavigatePrivacy={() => handleNavigate("privacy")} />

        <Footer />
      </LenisProvider>
    </ReducedMotionProvider>
  );
}
