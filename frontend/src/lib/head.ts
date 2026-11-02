/**
 * Dynamic Document Head & SEO Meta Tags Manager
 * Dynamically updates document.title, description, and Open Graph tags per page
 */

import { useEffect } from "react";

export interface PageMetaOptions {
  title: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
}

export const DEFAULT_META: PageMetaOptions = {
  title: "VRPI TECH SOLUTIONS — Engineering the Digital Future",
  description:
    "We turn complexity into working software. Full-stack digital engineering partner building intelligent digital products, scalable software platforms, and cloud infrastructure.",
  ogImage: "https://vrpisc.com/og-image.png",
  canonical: "https://vrpisc.com/",
};

/**
 * Updates DOM head meta tags imperatively
 */
export function updatePageMetadata({
  title,
  description = DEFAULT_META.description,
  ogImage = DEFAULT_META.ogImage,
  canonical = DEFAULT_META.canonical,
}: PageMetaOptions) {
  if (typeof document === "undefined") return;

  // 1. Update Title
  const formattedTitle = title.includes("VRPI")
    ? title
    : `${title} | VRPI TECH SOLUTIONS`;
  document.title = formattedTitle;

  // 2. Helper to set or create meta tag
  const setMeta = (attribute: "name" | "property", key: string, content: string) => {
    let tag = document.querySelector(`meta[${attribute}="${key}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute(attribute, key);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  };

  // 3. Update Standard Meta Tags
  setMeta("name", "title", formattedTitle);
  if (description) {
    setMeta("name", "description", description);
  }

  // 4. Update Open Graph
  setMeta("property", "og:title", formattedTitle);
  if (description) {
    setMeta("property", "og:description", description);
  }
  if (ogImage) {
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:secure_url", ogImage);
  }
  if (canonical) {
    setMeta("property", "og:url", canonical);

    // Canonical link tag
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);
  }

  // 5. Update Twitter
  setMeta("property", "twitter:title", formattedTitle);
  if (description) {
    setMeta("property", "twitter:description", description);
  }
  if (ogImage) {
    setMeta("property", "twitter:image", ogImage);
  }
}

/**
 * React Hook for declaring page title and description
 */
export function usePageMetadata(options: PageMetaOptions) {
  useEffect(() => {
    updatePageMetadata(options);
  }, [options.title, options.description, options.ogImage, options.canonical]);
}
