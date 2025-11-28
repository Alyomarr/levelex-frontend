// Initialize Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
});

// Integrate with requestAnimationFrame
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Integrate with AOS (Animate On Scroll)
// AOS relies on scroll events, so we need to make sure it updates with Lenis
// Lenis doesn't fire native scroll events in the same way, but usually AOS works fine with window scroll.
// However, for better sync, we can trigger AOS refresh on Lenis scroll.

/*
lenis.on('scroll', (e) => {
  // AOS.refresh(); // Optional: might be too heavy to call on every frame
});
*/

// Ensure anchor links work with Lenis
// Ensure anchor links work with Lenis
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      // Check if it's a hash link or a link to the current page with a hash
      if (!href) return;

      const isHash = href.startsWith("#");
      const isSamePage =
        href.includes("index.html#") ||
        href.includes(window.location.pathname + "#");

      if (isHash || isSamePage) {
        // Extract the hash part
        const hashIndex = href.indexOf("#");
        const targetId = href.substring(hashIndex);

        if (targetId === "#") return;

        // Only prevent default if the target element exists
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetId, {
            offset: -80, // Adjust for sticky navbar height
          });
        }
      }
    });
  });
});

console.log("Lenis Smooth Scroll Initialized");
