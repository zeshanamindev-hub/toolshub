"use client";

import { useEffect } from "react";

/**
 * Custom hook to update the page title dynamically
 * This is useful for client components that can't use generateMetadata
 */
export function usePageTitle(title: string, description?: string) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Wrext Admin`;
    }

    // Update meta description if provided
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", description);
    }

    // Update Open Graph title if title provided
    if (title) {
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement("meta");
        ogTitle.setAttribute("property", "og:title");
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute("content", `${title} | Wrext Admin`);
    }

    // Update Open Graph description if provided
    if (description) {
      let ogDescription = document.querySelector(
        'meta[property="og:description"]',
      );
      if (!ogDescription) {
        ogDescription = document.createElement("meta");
        ogDescription.setAttribute("property", "og:description");
        document.head.appendChild(ogDescription);
      }
      ogDescription.setAttribute("content", description);
    }
  }, [title, description]);
}
