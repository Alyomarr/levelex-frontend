import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link href="/" className="logo">
              <span>Levelex</span>
            </Link>
            <p>Elevating businesses with intelligent solutions.</p>
          </div>
          <div className="footer-col">
            <h3>Follow Us</h3>
            <div className="social-links social-links-large">
              <a
                href="https://www.instagram.com/levelexcloud"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="bx bxl-instagram"></i>
              </a>
              <a
                href="https://www.tiktok.com/@levelex.cloud"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <i className="bx bxl-tiktok"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/levelex-cloud"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="bx bxl-linkedin-square"></i>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h3>Company</h3>
            <ul>
              <li>
                <Link href="/#capabilities">Capabilities</Link>
              </li>
              <li>
                <Link href="#">Blog</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Legal</h3>
            <ul>
              <li>
                <Link href="#">Privacy</Link>
              </li>
              <li>
                <Link href="#">Terms</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright-bar">
          <p>© 2025 Levelex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
