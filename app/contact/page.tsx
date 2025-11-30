"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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
      <section id="contact" className="contact">
        <div className="container relative z-10">
          <h2 className="section-title" data-aos="fade-up">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p
            className="section-subheadline"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Have questions? We&apos;d love to hear from you...
          </p>
          <div className="info-grid">
            <div
              className="card info-card"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <i className="bx bxs-envelope card-icon"></i>
              <h3>Email</h3>
              <p>hello@levelex.com</p>
            </div>
            <div
              className="card info-card"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <i className="bx bxs-phone card-icon"></i>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>

          <div
            className="card contact-form-card"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <h3>Send us a Message</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
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
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>
              <div
                id="form-message"
                style={{
                  color: "var(--accent-cyan)",
                  textAlign: "center",
                  marginBottom: "1rem",
                  minHeight: "1em",
                }}
              >
                {message}
              </div>
              <button
                type="submit"
                className="btn btn-gradient btn-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>
                    Send Message <i className="bx bx-right-arrow-alt"></i>
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
