"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Check if it's a hash link or a link to the current page with a hash
      if (
        href.startsWith("#") ||
        (href.startsWith("/") && href.includes("#"))
      ) {
        const hashIndex = href.indexOf("#");
        const path = href.substring(0, hashIndex);
        const hash = href.substring(hashIndex + 1);

        // If it's just a hash (path is empty) or if the path matches current location
        if ((path === "" || path === window.location.pathname) && hash) {
          const targetElement = document.getElementById(hash);
          if (targetElement) {
            // Always scroll using Lenis
            lenis.scrollTo(targetElement);

            // Only prevent default and push state if it wasn't already handled (e.g. by Next.js)
            if (!e.defaultPrevented) {
              e.preventDefault();
              window.history.pushState(null, "", `#${hash}`);
            }
          }
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      lenis.destroy();
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
