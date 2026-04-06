import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <span className="section-label">🌿 Our Story</span>
          <h1 className="section-title" style={{ fontSize: '2.5rem' }}>
            About <span className="highlight">Sattva Care</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '650px', margin: '0 auto' }}>
            A journey from traditional Ayurvedic wisdom to modern herbal care — 
            handcrafted with love in Surat, Gujarat.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 animate-slideInLeft">
              <div className="glass-card p-5 text-center">
                <svg viewBox="0 0 300 300" style={{ maxWidth: '280px' }}>
                  <circle cx="150" cy="150" r="140" fill="#e8f5e9" opacity="0.5"/>
                  <circle cx="150" cy="150" r="110" fill="#c8e6c9" opacity="0.3"/>
                  {/* Mortar & Pestle */}
                  <ellipse cx="150" cy="200" rx="70" ry="30" fill="#8d6e63"/>
                  <path d="M80 200 Q80 160 150 150 Q220 160 220 200" fill="#a1887f"/>
                  <ellipse cx="150" cy="200" rx="65" ry="25" fill="#bcaaa4"/>
                  {/* Pestle */}
                  <line x1="150" y1="120" x2="200" y2="80" stroke="#795548" strokeWidth="12" strokeLinecap="round"/>
                  <circle cx="205" cy="75" r="10" fill="#795548"/>
                  {/* Herbs */}
                  <ellipse cx="120" cy="180" rx="10" ry="5" fill="#66bb6a" opacity="0.7" transform="rotate(-20 120 180)"/>
                  <ellipse cx="170" cy="175" rx="8" ry="4" fill="#81c784" opacity="0.6" transform="rotate(15 170 175)"/>
                  <ellipse cx="145" cy="185" rx="6" ry="3" fill="#a5d6a7" opacity="0.7"/>
                  {/* Leaves */}
                  <ellipse cx="80" cy="120" rx="20" ry="8" fill="#66bb6a" opacity="0.4" transform="rotate(-40 80 120)"/>
                  <ellipse cx="230" cy="130" rx="18" ry="7" fill="#81c784" opacity="0.4" transform="rotate(25 230 130)"/>
                  {/* Brand text */}
                  <text x="150" y="260" textAnchor="middle" fill="#2d6a4f" fontSize="14" fontWeight="bold" fontFamily="serif">SATTVA CARE</text>
                  <text x="150" y="278" textAnchor="middle" fill="#66bb6a" fontSize="8" fontFamily="sans-serif">Natural. Safe. Effective.</text>
                </svg>
              </div>
            </div>
            <div className="col-lg-6 animate-slideInRight">
              <span className="section-label" style={{ textAlign: 'left' }}>Our Mission</span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '16px' }}>
                Bringing Nature's Best to <span style={{ color: 'var(--primary)' }}>Your Doorstep</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 2, marginBottom: '16px' }}>
                Sattva Care was born from a simple belief — that nature has everything we need for healthy hair and skin. 
                In a world full of chemical-laden products, we chose to go back to our roots — literally.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 2, marginBottom: '16px' }}>
                Every Sattva Care product is handcrafted in small batches in Surat, Gujarat, using time-tested 
                Ayurvedic recipes and the finest natural ingredients. From Kalonji and Bhringraj to Amla and Shikakai — 
                each ingredient is carefully selected for its proven benefits.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 2 }}>
                We promise: <strong style={{ color: 'var(--primary)' }}>No harsh chemicals. No artificial colours. No artificial fragrance.</strong> 
                {' '}Just pure, herbal goodness that your hair and skin will love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <span className="section-label">💚 Our Values</span>
          <h2 className="section-title">What We <span className="highlight">Stand For</span></h2>
          <p className="section-subtitle">The principles that guide everything we do</p>

          <div className="row g-4">
            {[
              { emoji: '🌱', title: 'Purity', desc: 'Every ingredient we use is 100% natural and sourced responsibly. We believe purity is non-negotiable.' },
              { emoji: '🤲', title: 'Craftsmanship', desc: 'Each product is handmade with care, ensuring the highest quality in every batch we produce.' },
              { emoji: '🌍', title: 'Sustainability', desc: 'We are committed to eco-friendly practices, minimal packaging, and supporting local communities.' },
              { emoji: '🔬', title: 'Transparency', desc: 'We list every ingredient clearly. What you see is exactly what goes into our products — nothing hidden.' },
              { emoji: '❤️', title: 'Customer Love', desc: 'Our customers are family. We listen, improve, and ensure every experience with Sattva Care is delightful.' },
              { emoji: '🇮🇳', title: 'Made in India', desc: 'Proudly handcrafted in Surat, Gujarat. Supporting Indian heritage and the Make in India vision.' },
            ].map((value, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div className="value-card animate-fadeInUp">
                  <div className="value-icon">{value.emoji}</div>
                  <h4 className="feature-title">{value.title}</h4>
                  <p className="feature-desc">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="section">
        <div className="container">
          <div className="row g-4 text-center">
            {[
              { number: '3', label: 'Herbal Products', icon: '🧴' },
              { number: '17+', label: 'Natural Ingredients', icon: '🌿' },
              { number: '400+', label: 'Happy Customers', icon: '😊' },
              { number: '100%', label: 'Chemical Free', icon: '✅' },
            ].map((stat, i) => (
              <div key={i} className={`col-lg-3 col-md-6 animate-fadeInUp delay-${i + 1}`}>
                <div className="glass-card p-4">
                  <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{stat.icon}</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>{stat.number}</div>
                  <div style={{ fontFamily: 'var(--font-accent)', color: 'var(--text-secondary)', fontWeight: 500 }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="newsletter-section">
        <div className="container text-center">
          <h2 className="newsletter-title">Ready to Try Sattva Care? 🌿</h2>
          <p className="newsletter-subtitle">Experience the magic of natural herbal products today</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/shop" className="btn btn-sattva btn-sattva-accent btn-lg">
              <i className="bi bi-bag"></i> Shop Now
            </Link>
            <Link to="/contact" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid rgba(255,255,255,0.4)', borderRadius: 'var(--radius-xl)', padding: '12px 32px', fontFamily: 'var(--font-accent)', fontWeight: 600, backdropFilter: 'blur(10px)' }}>
              <i className="bi bi-chat-dots"></i> Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
