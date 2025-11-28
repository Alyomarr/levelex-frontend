document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. MOBILE MENU TOGGLE
  // ==========================================
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navLinksUl = document.getElementById("nav-links-ul");

  if (mobileMenuBtn && navLinksUl) {
    // --- 1. Load Saved State ---
    const savedState = localStorage.getItem("navbarOpen");
    if (savedState === "true") {
      navLinksUl.classList.add("active");
      mobileMenuBtn.classList.remove("bx-menu");
      mobileMenuBtn.classList.add("bx-x");
    } else {
      // Ensure default closed state
      navLinksUl.classList.remove("active");
      mobileMenuBtn.classList.remove("bx-x");
      mobileMenuBtn.classList.add("bx-menu");
    }

    // --- 2. Toggle Button Click ---
    mobileMenuBtn.addEventListener("click", () => {
      navLinksUl.classList.toggle("active");
      const isActive = navLinksUl.classList.contains("active");

      // Update Icon
      if (isActive) {
        mobileMenuBtn.classList.remove("bx-menu");
        mobileMenuBtn.classList.add("bx-x");
      } else {
        mobileMenuBtn.classList.remove("bx-x");
        mobileMenuBtn.classList.add("bx-menu");
      }

      // Save State
      localStorage.setItem("navbarOpen", isActive);
    });

    // --- 3. Close menu when a link is clicked ---
    // IMPORTANT: We do NOT update localStorage here.
    // If the user clicks a link, we want the menu to visually close (for on-page anchors)
    // or just navigate away. If they navigate away, the "open" state persists.
    // If they stay on page (anchor), it closes but "remembers" it was open if they refresh?
    // Actually, for better UX on single-page anchors, we might want to keep it closed if they click an anchor.
    // BUT the requirement is "stays open in contact and vice versa".
    // So if I click "Contact", it goes to contact.html and should be OPEN.
    // So we definitely do NOT set 'false' in localStorage here.
    navLinksUl.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinksUl.classList.contains("active")) {
          navLinksUl.classList.remove("active");
          mobileMenuBtn.classList.remove("bx-x");
          mobileMenuBtn.classList.add("bx-menu");
          // Intentionally NOT updating localStorage here to preserve cross-page persistence
        }
      });
    });
  }

  // ==========================================
  // 2. SPOTLIGHT GLOW EFFECT (CARDS)
  // ==========================================
  document.addEventListener("mousemove", (e) => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // ==========================================
  // 3. FLOATING GLASS NAVBAR
  // ==========================================
  // Scroll listener removed
});
