"use client";

import { useEffect } from "react";
import Link from "next/link";
import GlowingBracket from "@/components/GlowingBracket";
import AOS from "aos";
// import "aos/dist/aos.css";
// import { N8n } from "@lobehub/icons";
// import { N8n } from "@lobehub/icons";
import FeatureCarousel from "@/components/FeatureCarousel";

export default function Home() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });

    // Spotlight Glow Effect
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main>
      <section id="home" className="hero">
        <div className="container hero-content">
          <h1 data-aos="fade-up" data-aos-delay="100">
            Secure AI Infrastructure.
            <span className="gradient-text">Locally Hosted.</span>
            Real-Time ROI.
          </h1>
          <p data-aos="fade-up" data-aos-delay="200">
            Architecting on-premise automation ecosystems. From PostgreSQL
            migrations to live ROI tracking—control your entire operation from
            one dashboard.
          </p>
          <div className="cta-buttons" data-aos="fade-up" data-aos-delay="300">
            <Link href="#capabilities" className="btn btn-gradient">
              <span>
                View System Architecture{" "}
                <i className="bx bx-right-arrow-alt"></i>
              </span>
            </Link>
            <Link
              href="https://cal.com/levelexcloud/levelex-audit"
              className="btn-link"
              target="_blank"
            >
              Book Technical Audit
            </Link>
          </div>
        </div>
      </section>

      <section className="tech-stack">
        <div className="container">
          <p className="tech-stack-label">Built with Industry Standards</p>
          <div className="tech-stack-logos">
            <i className="bx bxl-python" title="Python"></i>
            <i className="bx bxl-postgresql" title="PostgreSQL"></i>
            <i className="bx bxl-docker" title="Docker"></i>
            <i className="bx bxl-react" title="React"></i>
            {/* n8n Logo */}
            {/* <div className="tech-stack-icon-wrapper" title="n8n">
              <N8n size={40} />
            </div> */}
          </div>
        </div>
      </section>

      <section id="capabilities" className="capabilities">
        <div className="container">
          <h2 className="section-title text-left" data-aos="fade-up">
            Stop Renting Intelligence.{" "}
            <span className="gradient-text">Build Your Own.</span>
          </h2>
          <div className="capabilities-layout">
            <div className="capabilities-content">
              <div className="capabilities-cards">
                {/* Card 1: Local & Secure */}
                <div
                  className="card feature-card"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <i className="bx bx-shield-quarter card-icon"></i>
                  <h3>Local & Secure</h3>
                  <p>
                    We deploy models locally on your hardware. Your proprietary
                    data never leaves your perimeter. GDPR & Enterprise ready.
                  </p>
                </div>
                {/* Image 2: Moved from Right Column */}
                <div
                  className="image-wrapper stagger-right"
                  style={{ alignSelf: "center", width: "100%" }}
                >
                  <GlowingBracket position="top-left" />
                  <GlowingBracket position="top-right" />
                  <GlowingBracket position="bottom-left" />
                  <GlowingBracket position="bottom-right" />
                  <img
                    src="/assets/lead-gen.png"
                    alt="Lead Generation"
                    className="hero-dashboard-img"
                  />
                </div>
                {/* Carousel */}
                <div className="w-full h-[500px] relative mb-8">
                  <FeatureCarousel
                    slides={[
                      {
                        title: "Lead Generation",
                        button: "View Details",
                        src: "/assets/lead-gen.png",
                      },
                      {
                        title: "Levelex Dashboard",
                        button: "View Details",
                        src: "/assets/dashboard.png",
                      },
                      {
                        title: "CCTV Footage",
                        button: "View Details",
                        src: "/assets/cctv.png",
                      },
                    ]}
                  />
                </div>
                {/* Card 3: The Command Center */}
                <div
                  className="card feature-card"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <i className="bx bx-bar-chart-alt-2 card-icon"></i>
                  <h3>The Command Center</h3>
                  <p>
                    Ditch the spreadsheets. Our custom dashboards give you a
                    God-mode view of your automations, leads, and system health
                    in real-time.
                  </p>
                </div>
              </div>
            </div>

            {/* Dashboard Images */}
            <div
              className="capabilities-image-container"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              {/* Image 1: Left */}
              <div className="image-wrapper stagger-left">
                <GlowingBracket position="top-left" />
                <GlowingBracket position="top-right" />
                <GlowingBracket position="bottom-left" />
                <GlowingBracket position="bottom-right" />
                <img
                  src="/assets/dashboard.png"
                  alt="Levelex Dashboard"
                  className="hero-dashboard-img"
                />
              </div>
              {/* Card 2: Moved from Left Column + Updated Text */}
              <div className="card feature-card" style={{ width: "100%" }}>
                <i className="bx bx-server card-icon"></i>
                <h3>Full SLM training</h3>
                <p>
                  We don&apos;t just write prompts., we train SLMs on focused
                  goals and ensure quality, security and fast queues
                </p>
              </div>
              {/* Image 3: Left */}
              <div className="image-wrapper stagger-left">
                <GlowingBracket position="top-left" />
                <GlowingBracket position="top-right" />
                <GlowingBracket position="bottom-left" />
                <GlowingBracket position="bottom-right" />
                <img
                  src="/assets/cctv.png"
                  alt="CCTV Footage"
                  className="hero-dashboard-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="what-we-do" className="what-we-do">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            What We <span className="gradient-text">Do</span>
          </h2>
          <p
            className="section-subheadline"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Comprehensive solutions tailored to your business needs.
          </p>
          <div className="feature-grid-2">
            {/* Service 1 */}
            <div
              className="card feature-card-large"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <i className="bx bx-network-chart card-icon"></i>
              <h3>Intelligent Workflows</h3>
              <p>
                Automate complex business processes with self-healing AI agents
                that adapt to changing data and requirements in real-time.
              </p>
            </div>
            {/* Service 2 */}
            <div
              className="card feature-card-large"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <i className="bx bx-chip card-icon"></i>
              <h3>Local AI Infrastructure</h3>
              <p>
                Deploy open-source LLMs on your own hardware. Achieve total data
                sovereignty and zero latency without cloud dependencies.
              </p>
            </div>
            {/* Service 3 */}
            <div
              className="card feature-card-large"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <i className="bx bx-data card-icon"></i>
              <h3>Legacy Modernization</h3>
              <p>
                Bridge the gap between mainframe/SQL systems and modern AI
                tools. We modernize your backend without a complete rewrite.
              </p>
            </div>
            {/* Service 4 */}
            <div
              className="card feature-card-large"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <i className="bx bx-scan card-icon"></i>
              <h3>Computer Vision Systems</h3>
              <p>
                Implement secure, offline face matching and object detection for
                access control and automated monitoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="case-studies" className="case-studies">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            Featured <span className="gradient-text">Project</span>
          </h2>
          <div className="featured-projects-grid">
            {/* Project 1 */}
            <div
              className="featured-project-card"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="featured-header">
                <h3>Enterprise Legacy Modernization & Biometric Security</h3>
                <span className="featured-tagline">
                  Zero-Downtime Migration & Local Computer Vision
                </span>
              </div>

              <div className="featured-body">
                <div className="featured-main-text">
                  <p>
                    Migrated a high-volume facility from legacy SQL to
                    PostgreSQL while deploying a local, offline Face Match
                    system for secure access control.
                  </p>
                </div>

                <div className="featured-highlights">
                  <div className="highlight-item">
                    <i className="bx bx-target-lock highlight-icon"></i>
                    <div>
                      <h4>Automated Lead Gen</h4>
                      <p>
                        Implemented on-gate forms that automatically qualify and
                        generate leads for sales agents, streamlining the
                        funnel.
                      </p>
                    </div>
                  </div>
                  <div className="highlight-item">
                    <i className="bx bx-bot highlight-icon"></i>
                    <div>
                      <h4>WhatsApp RAG Bot</h4>
                      <p>
                        Developed a custom AI agent that answers member
                        inquiries, handles FAQs, and sends automated membership
                        & installment reminders.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="featured-stats">
                <div className="stat-box">
                  <i className="bx bx-data"></i>
                  <span className="stat-value">100%</span>
                  <span className="stat-label">Data Ownership</span>
                </div>
                <div className="stat-box">
                  <i className="bx bx-time-five"></i>
                  <span className="stat-value">40%</span>
                  <span className="stat-label">Reduction in Manual Admin</span>
                </div>
                <div className="stat-box">
                  <i className="bx bx-server"></i>
                  <span className="stat-value">99.9%</span>
                  <span className="stat-label">Uptime</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div
              className="featured-project-card"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="featured-header">
                <h3>Executive Virtual Assistant</h3>
                <span className="featured-tagline">
                  Intelligent Email Sorting & Meeting Summarization
                </span>
              </div>

              <div className="featured-body">
                <div className="featured-main-text">
                  <p>
                    A dedicated AI assistant for enterprise executives that
                    streamlines communication and manages information overload.
                  </p>
                </div>

                <div className="featured-highlights">
                  <div className="highlight-item">
                    <i className="bx bx-envelope highlight-icon"></i>
                    <div>
                      <h4>Smart Email Management</h4>
                      <p>
                        Automatically sorts incoming emails into custom labels
                        and drafts context-aware replies, saving hours of daily
                        triage.
                      </p>
                    </div>
                  </div>
                  <div className="highlight-item">
                    <i className="bx bx-calendar-event highlight-icon"></i>
                    <div>
                      <h4>Meeting Summarizer</h4>
                      <p>
                        Records and summarizes back-to-back meetings, extracting
                        key action items and decisions so nothing slips through
                        the cracks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="featured-stats">
                <div className="stat-box">
                  <i className="bx bx-time"></i>
                  <span className="stat-value">2h+</span>
                  <span className="stat-label">Saved Daily</span>
                </div>
                <div className="stat-box">
                  <i className="bx bx-check-shield"></i>
                  <span className="stat-value">100%</span>
                  <span className="stat-label">Privacy First</span>
                </div>
                <div className="stat-box">
                  <i className="bx bx-brain"></i>
                  <span className="stat-value">24/7</span>
                  <span className="stat-label">Availability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container">
          <div className="card final-cta-card" data-aos="fade-up">
            <h2>Ready to secure your infrastructure?</h2>
            <p>
              Stop leaking data to the cloud. Let&apos;s build a system you
              actually own.
            </p>
            <Link
              href="https://cal.com/levelexcloud/levelex-audit"
              className="btn btn-gradient"
              target="_blank"
            >
              <span>
                Schedule Discovery Call{" "}
                <i className="bx bx-right-arrow-alt"></i>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
