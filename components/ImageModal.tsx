"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string;
  imageTitle: string;
  onClose: () => void;
}

export default function ImageModal({
  isOpen,
  imageSrc,
  imageTitle,
  onClose,
}: ImageModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // Lock background scroll (covers both native and Lenis smooth-scroll).
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    lenis?.stop();

    // Close on Escape.
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="image-modal-overlay" onClick={onClose}>
      <button
        className="image-modal-close"
        onClick={onClose}
        aria-label="Close"
      >
        <i className="bx bx-x"></i>
      </button>
      <div
        className="image-modal-content"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <h2 className="image-modal-title">{imageTitle}</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc} alt={imageTitle} className="image-modal-img" />
      </div>
    </div>,
    document.body
  );
}
