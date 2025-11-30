"use client";

import { useEffect } from "react";

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
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div
        className="image-modal-content"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <button className="image-modal-close" onClick={onClose}>
          <i className="bx bx-x"></i>
        </button>
        <h2 className="image-modal-title">{imageTitle}</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc} alt={imageTitle} className="image-modal-img" />
      </div>
    </div>
  );
}
