"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
// import "aos/dist/aos.css";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("Sending...");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message || "Thanks! Message sent.");
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(result.error || "Form submission failed.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Contact form error:", error);
      setMessage(`Sorry, error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <section id="contact" className="contact-section">
        <div className="container relative z-10">
          <h2 className="section-title text-center mb-12" data-aos="fade-up">
            Get in <span className="gradient-text">Touch</span>
          </h2>

          <div className="contact-split-layout">
            {/* Left Column: Glassmorphic Form */}
            <div className="glass-panel form-panel" data-aos="fade-right">
              <h3>Send a Message</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="contact-input"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="contact-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="contact-input"
                    rows={5}
                    placeholder="How can we help?"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-gradient w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                {message && (
                  <p
                    className="form-message"
                    style={{ marginTop: "1rem", color: "var(--accent-cyan)" }}
                  >
                    {message}
                  </p>
                )}
              </form>
            </div>

            {/* Right Column: Contact Info & Socials */}
            <div className="contact-info-panel" data-aos="fade-left">
              <div className="info-item">
                <div className="icon-box">
                  <i className="bx bxs-envelope"></i>
                </div>
                <div>
                  <h4>Email Us</h4>
                  <p>levelexcloud@gmail.com</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-box">
                  <i className="bx bxs-phone"></i>
                </div>
                <div>
                  <h4>Call Us</h4>
                  <p>+20 10 3227 0126</p>
                </div>
              </div>

              <div className="social-connect">
                <h4>Connect With Us</h4>
                <div className="social-links-large">
                  <a href="#" aria-label="Instagram">
                    <i className="bx bxl-instagram"></i>
                  </a>
                  <a href="#" aria-label="TikTok">
                    <i className="bx bxl-tiktok"></i>
                  </a>
                  <a href="#" aria-label="LinkedIn">
                    <i className="bx bxl-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
