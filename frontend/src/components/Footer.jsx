import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer-sattva">
      <div className="container">
        <div className="row g-4">
          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand">🌿 Sattva Care</div>
            <div className="footer-tagline">Natural. Safe. Effective.</div>
            <p className="footer-desc">
              Handcrafted herbal products made with 100% natural ingredients. 
              No harsh chemicals. No artificial colours & fragrance. 
              Made with love in Surat, India.
            </p>
            <div className="footer-social">
              <a href="https://www.instagram.com/sattva.care" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://www.facebook.com/SattvaCare" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://wa.me/918141887992" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="footer-heading">Quick Links</h5>
            <Link className="footer-link" to="/">Home</Link>
            <Link className="footer-link" to="/shop">Shop</Link>
            <Link className="footer-link" to="/about">About Us</Link>
            <Link className="footer-link" to="/contact">Contact</Link>
          </div>

          {/* Products */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-heading">Our Products</h5>
            <Link className="footer-link" to="/product/herbal-shampoo">Herbal Shampoo</Link>
            <Link className="footer-link" to="/product/herbal-hair-oil">Herbal Hair Oil</Link>
            <Link className="footer-link" to="/product/herbal-soap">Herbal Soap</Link>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-heading">Contact Us</h5>
            <a className="footer-link" href="tel:+918141887992">
              <i className="bi bi-telephone me-2"></i>+91 8141887992
            </a>
            <a className="footer-link" href="tel:+917041869850">
              <i className="bi bi-telephone me-2"></i>+91 7041869850
            </a>
            <a className="footer-link" href="https://www.instagram.com/sattva.care" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-instagram me-2"></i>@sattva.care
            </a>
            <span className="footer-link">
              <i className="bi bi-geo-alt me-2"></i>Surat, Gujarat, India
            </span>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="mb-1">© {new Date().getFullYear()} Sattva Care. All rights reserved.</p>
          <p className="mb-0" style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            Handcrafted in India 🇮🇳 with ❤️ and Herbal Goodness
          </p>
        </div>
      </div>
    </footer>
  );
}
