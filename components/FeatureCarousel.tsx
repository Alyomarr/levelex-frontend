"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Slide {
  title: string;
  button: string;
  src: string;
}

interface FeatureCarouselProps {
  slides: Slide[];
}

export default function FeatureCarousel({ slides }: FeatureCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <div
      className="feature-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
        >
          <div className="carousel-image-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.src} alt={slide.title} className="carousel-image" />
          </div>
          <div className="carousel-content">
            <h2 className="carousel-title">{slide.title}</h2>
            <Link href="/#contact" className="carousel-btn">
              {slide.button}
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button className="carousel-nav-btn carousel-prev" onClick={prevSlide}>
        <i className="bx bx-chevron-left"></i>
      </button>
      <button className="carousel-nav-btn carousel-next" onClick={nextSlide}>
        <i className="bx bx-chevron-right"></i>
      </button>

      {/* Indicators */}
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}
