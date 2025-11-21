document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. MOBILE MENU TOGGLE
  // ==========================================
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navLinksUl = document.getElementById("nav-links-ul");

  if (mobileMenuBtn && navLinksUl) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinksUl.classList.toggle("active");
      if (navLinksUl.classList.contains("active")) {
        mobileMenuBtn.classList.remove("bx-menu");
        mobileMenuBtn.classList.add("bx-x");
      } else {
        mobileMenuBtn.classList.remove("bx-x");
        mobileMenuBtn.classList.add("bx-menu");
      }
    });

    // Close menu when a link is clicked
    navLinksUl.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinksUl.classList.contains("active")) {
          navLinksUl.classList.remove("active");
          mobileMenuBtn.classList.remove("bx-x");
          mobileMenuBtn.classList.add("bx-menu");
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
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }
});
