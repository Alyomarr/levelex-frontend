"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Load saved state from localStorage
    const savedState = localStorage.getItem("navbarOpen");
    if (savedState === "true") {
      setIsOpen(true);
    }
  }, []);

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem("navbarOpen", String(newState));
  };

  const closeMenu = () => {
    // Do NOT update localStorage here to preserve persistence across pages
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link href="/#home" className="logo" onClick={closeMenu}>
          <Image
            src="/assets/LevelX-Photoroom.png"
            alt="Levelex Logo"
            width={40}
            height={40}
            className="logo-icon"
            style={{ width: "auto", height: "2.2rem" }}
          />
          <span>Levelex</span>
        </Link>
        <ul id="nav-links-ul" className={`nav-links ${isOpen ? "active" : ""}`}>
          <li>
            <Link href="/#home" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/#capabilities" onClick={closeMenu}>
              Capabilities
            </Link>
          </li>
          <li>
            <Link href="/#what-we-do" onClick={closeMenu}>
              What We Do
            </Link>
          </li>
          <li>
            <Link href="/#case-studies" onClick={closeMenu}>
              Case Studies
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={pathname === "/contact" ? "active" : ""}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>
        </ul>

        <i
          id="mobile-menu-btn"
          className={`bx ${isOpen ? "bx-x" : "bx-menu"} mobile-menu-toggle`}
          onClick={toggleMenu}
        ></i>
      </div>
    </nav>
  );
}
