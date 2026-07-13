"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AOS from "aos";

import FeatureCarousel from "@/components/FeatureCarousel";
import CaseStudyModal from "@/components/CaseStudyModal";
import { caseStudies } from "@/lib/caseStudies";

export default function Home() {
  const [openCaseStudy, setOpenCaseStudy] = useState<string | null>(null);

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
                {/* Row 1: Card on left, Carousel on right */}
                <div className="zigzag-row">
                  {/* Card 1: The Command Center */}
                  <div
                    className="card feature-card"
                    data-aos="fade-right"
                    data-aos-delay="100"
                  >
                    <i className="bx bx-bar-chart-alt-2 card-icon"></i>
                    <h3>The Command Center</h3>
                    <p>
                      Ditch the spreadsheets. Our custom dashboards give you a
                      God-mode view of your automations, leads, and system
                      health in real-time.
                    </p>
                  </div>

                  {/* Carousel */}
                  <div
                    className="carousel-container"
                    data-aos="fade-left"
                    data-aos-delay="100"
                  >
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
                </div>

                {/* Row 2: Empty on left, Card on right */}
                <div className="zigzag-row">
                  {/* Security Visual - Glass Shield & Lock */}
                  <div
                    className="security-visual-container"
                    data-aos="fade-right"
                    data-aos-delay="200"
                  >
                    <div className="shield-wrapper">
                      <div className="shield-glow"></div>
                      <i className="bx bx-shield shield-icon"></i>
                      <div className="lock-wrapper">
                        <i className="bx bx-lock-alt lock-icon"></i>
                      </div>
                      {/* Scanning Line */}
                      <div className="scan-line"></div>
                    </div>
                  </div>

                  {/* Card 2: Local & Secure */}
                  <div
                    className="card feature-card"
                    data-aos="fade-left"
                    data-aos-delay="200"
                  >
                    <i className="bx bx-shield-quarter card-icon"></i>
                    <h3>Local & Secure</h3>
                    <p>
                      We deploy models locally on your hardware. Your
                      proprietary data never leaves your perimeter. GDPR &
                      Enterprise ready.
                    </p>
                  </div>
                </div>

                {/* Row 3: Card on left, Empty on right */}
                <div className="zigzag-row">
                  {/* Card 3: Full SLM training */}
                  <div
                    className="card feature-card"
                    data-aos="fade-right"
                    data-aos-delay="300"
                  >
                    <i className="bx bx-server card-icon"></i>
                    <h3>Full SLM training</h3>
                    <p>
                      We don&apos;t just write prompts., we train SLMs on
                      focused goals and ensure quality, security and fast queues
                    </p>
                  </div>

                  {/* SLM Logos - Horizontal Line */}
                  <div
                    className="slm-logos-container"
                    data-aos="fade-left"
                    data-aos-delay="300"
                  >
                    <div className="slm-logo blob">
                      <span className="slm-logo-text phi">φ</span>
                      <span className="slm-name">Phi</span>
                    </div>
                    <div className="slm-logo blob">
                      <span className="slm-logo-text gemma">◆</span>
                      <span className="slm-name">Gemma</span>
                    </div>
                    <div className="slm-logo blob">
                      <span className="slm-logo-text ollama">🦙</span>
                      <span className="slm-name">Ollama</span>
                    </div>
                    <div className="slm-logo blob">
                      <span className="slm-logo-text mistral">≋</span>
                      <span className="slm-name">Mistral</span>
                    </div>
                  </div>
                </div>
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
            Case <span className="gradient-text">Studies</span>
          </h2>
          <div className="case-teaser-grid">
            {caseStudies.map((cs, i) => (
              <button
                key={cs.id}
                type="button"
                className="card case-teaser-card"
                data-aos="fade-up"
                data-aos-delay={100 + i * 100}
                onClick={() => setOpenCaseStudy(cs.id)}
              >
                <span className="case-teaser-title">{cs.title}</span>
                <span className="featured-tagline">{cs.tagline}</span>
                <p>{cs.summary}</p>
                <span className="case-teaser-link">
                  View case study <i className="bx bx-right-arrow-alt"></i>
                </span>
              </button>
            ))}
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

      <CaseStudyModal
        caseStudy={caseStudies.find((cs) => cs.id === openCaseStudy) ?? null}
        onClose={() => setOpenCaseStudy(null)}
      />
    </main>
  );
}
