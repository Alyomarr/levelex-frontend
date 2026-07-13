"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { CaseStudy } from "@/lib/caseStudies";

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyModal({
  caseStudy,
  onClose,
}: CaseStudyModalProps) {
  const [mounted, setMounted] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!caseStudy) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Lock background scroll (covers both native and Lenis smooth-scroll).
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    lenis?.stop();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [caseStudy, onClose]);

  if (!caseStudy || !mounted) return null;

  // Swipe-down-to-close on the drag handle (mobile bottom sheet).
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartY.current === null || !sheetRef.current) return;
    const delta = e.touches[0].clientY - dragStartY.current;
    if (delta > 0) {
      sheetRef.current.style.transform = `translateY(${delta}px)`;
      sheetRef.current.style.transition = "none";
    }
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartY.current === null || !sheetRef.current) return;
    const delta = e.changedTouches[0].clientY - dragStartY.current;
    dragStartY.current = null;
    sheetRef.current.style.transform = "";
    sheetRef.current.style.transition = "";
    if (delta > 100) onClose();
  };
  const handleTouchCancel = () => {
    if (dragStartY.current === null || !sheetRef.current) return;
    dragStartY.current = null;
    sheetRef.current.style.transform = "";
    sheetRef.current.style.transition = "";
  };

  return createPortal(
    <div className="case-modal-overlay" onClick={onClose}>
      <div
        ref={sheetRef}
        className="case-modal"
        role="dialog"
        aria-modal="true"
        aria-label={caseStudy.title}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div
          className="case-modal-handle"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
        >
          <span className="case-modal-handle-bar"></span>
        </div>
        <button
          ref={closeButtonRef}
          className="case-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <i className="bx bx-x"></i>
        </button>

        <div className="case-modal-scroll">
          <div className="featured-header">
            <h3>{caseStudy.title}</h3>
            <span className="featured-tagline">{caseStudy.tagline}</span>
          </div>

          <div className="case-modal-section">
            <span className="case-modal-label">The Client</span>
            <div className="case-modal-client">
              {caseStudy.clientLogo && (
                <span className="case-modal-client-logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={caseStudy.clientLogo.src}
                    alt={caseStudy.clientLogo.alt}
                    loading="lazy"
                  />
                </span>
              )}
              <p>{caseStudy.client}</p>
            </div>
          </div>

          <div className="case-modal-section">
            <span className="case-modal-label">The Challenge &amp; Story</span>
            {caseStudy.story.map((paragraph, i) => (
              <p key={i} className="case-modal-story-p">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="case-modal-section">
            <span className="case-modal-label">The Solution</span>
            <div className="featured-highlights">
              {caseStudy.highlights.map((h) => (
                <div className="highlight-item" key={h.title}>
                  <i className={`${h.icon} highlight-icon`}></i>
                  <div>
                    <h4>{h.title}</h4>
                    <p>{h.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="case-modal-section">
            <span className="case-modal-label">Tech Stack</span>
            <div className="case-modal-tech">
              {caseStudy.techStack.map((t) => (
                <div className="case-modal-tech-item" key={t.name}>
                  <svg
                    viewBox="0 0 24 24"
                    width="28"
                    height="28"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={t.iconPath} />
                  </svg>
                  <span>{t.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="case-modal-section">
            <span className="case-modal-label">Results &amp; Scalability</span>
            <div className="featured-stats">
              {caseStudy.stats.map((s) => (
                <div className="stat-box" key={s.label}>
                  <i className={s.icon}></i>
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
            <p className="case-modal-scalability">
              <i className="bx bx-trending-up"></i> {caseStudy.scalabilityNote}
            </p>
          </div>

          <div className="case-modal-cta">
            <p>Want something like this for your business?</p>
            <Link
              href="https://cal.com/levelexcloud/levelex-audit"
              className="btn btn-gradient"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                Schedule Discovery Call <i className="bx bx-right-arrow-alt"></i>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
