import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const TESTIMONIALS = [
  { name: 'Priya Sharma', rating: 5, text: "Amazing shampoo! My hair fall has reduced significantly in just 2 weeks. The herbal fragrance is so refreshing!", avatar: 'PS' },
  { name: 'Amit Kumar', rating: 5, text: "Best herbal oil I've ever used. My hair feels stronger and looks healthier. Highly recommended!", avatar: 'AK' },
  { name: 'Meera Joshi', rating: 5, text: "The soap feels so luxurious on skin. My skin feels naturally moisturized even without lotion after bath.", avatar: 'MJ' },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.getProducts();
        if (res.success) setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="page-enter">
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 animate-slideInLeft">
              <span className="section-label" style={{ textAlign: 'left' }}>🌿 Handcrafted in India</span>
              <h1 className="hero-title">
                Pure Herbal Care for Your <span className="highlight">Hair & Skin</span>
              </h1>
              <p className="hero-subtitle">
                Discover the ancient power of Ayurveda with Sattva Care's range of 100% natural, 
                chemical-free herbal products. Handmade with care in Surat, Gujarat.
              </p>

              <div className="hero-badges">
                <div className="hero-badge"><i className="bi bi-leaf"></i> 100% Natural</div>
                <div className="hero-badge"><i className="bi bi-hand-thumbs-up"></i> No Harsh Chemicals</div>
                <div className="hero-badge"><i className="bi bi-heart"></i> Handmade with Care</div>
                <div className="hero-badge"><i className="bi bi-shield-check"></i> Safe for Daily Use</div>
              </div>

              <div className="hero-cta">
                <Link to="/shop" className="btn btn-sattva btn-sattva-primary btn-lg">
                  <i className="bi bi-bag"></i> Shop Now
                </Link>
                <Link to="/about" className="btn btn-sattva btn-sattva-outline btn-lg">
                  Our Story <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>

            <div className="col-lg-6 text-center animate-slideInRight hero-product-showcase">
              {/* Hero Product SVG Illustration */}
              <svg viewBox="0 0 500 500" className="hero-product-img" style={{ maxWidth: '100%' }}>
                <defs>
                  <linearGradient id="hero-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2d6a4f"/>
                    <stop offset="100%" stopColor="#52b788"/>
                  </linearGradient>
                  <linearGradient id="hero-grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5d4037"/>
                    <stop offset="100%" stopColor="#8d6e63"/>
                  </linearGradient>
                  <linearGradient id="hero-grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#66bb6a"/>
                    <stop offset="100%" stopColor="#a5d6a7"/>
                  </linearGradient>
                  <filter id="shadow1">
                    <feDropShadow dx="3" dy="6" stdDeviation="8" floodOpacity="0.15"/>
                  </filter>
                </defs>
                
                {/* Background circle */}
                <circle cx="250" cy="250" r="220" fill="#e8f5e9" opacity="0.3"/>
                <circle cx="250" cy="250" r="180" fill="#e8f5e9" opacity="0.2"/>
                
                {/* Decorative leaves */}
                <ellipse cx="120" cy="150" rx="30" ry="12" fill="#81c784" opacity="0.3" transform="rotate(-40 120 150)"/>
                <ellipse cx="380" cy="130" rx="25" ry="10" fill="#a5d6a7" opacity="0.3" transform="rotate(30 380 130)"/>
                <ellipse cx="400" cy="350" rx="20" ry="8" fill="#81c784" opacity="0.25" transform="rotate(-20 400 350)"/>
                
                {/* Shampoo bottle - center */}
                <g filter="url(#shadow1)" transform="translate(190, 60)">
                  <rect x="30" y="20" width="60" height="20" rx="4" fill="#ddd"/>
                  <rect x="40" y="5" width="40" height="20" rx="6" fill="#eee"/>
                  <rect x="20" y="40" width="80" height="170" rx="12" fill="url(#hero-grad1)"/>
                  <rect x="28" y="80" width="64" height="90" rx="5" fill="white" opacity="0.9"/>
                  <text x="60" y="100" textAnchor="middle" fill="#2d6a4f" fontSize="7" fontWeight="bold" fontFamily="serif">SATTVA CARE</text>
                  <text x="60" y="125" textAnchor="middle" fill="#2d6a4f" fontSize="9" fontWeight="bold" fontFamily="serif">HERBAL</text>
                  <text x="60" y="140" textAnchor="middle" fill="#2d6a4f" fontSize="8" fontWeight="bold" fontFamily="serif">SHAMPOO</text>
                  <text x="60" y="160" textAnchor="middle" fill="#52b788" fontSize="5">Nature's Care for Hair</text>
                </g>
                
                {/* Hair Oil - left */}
                <g filter="url(#shadow1)" transform="translate(60, 160)">
                  <rect x="25" y="8" width="30" height="22" rx="3" fill="#bbb"/>
                  <circle cx="40" cy="5" r="6" fill="#999"/>
                  <path d="M15 30 L65 30 L60 160 Q60 168 52 168 L28 168 Q20 168 20 160 Z" fill="url(#hero-grad2)"/>
                  <rect x="22" y="60" width="36" height="75" rx="4" fill="#fdf6e3" opacity="0.9"/>
                  <text x="40" y="78" textAnchor="middle" fill="#5d4037" fontSize="5.5" fontWeight="bold" fontFamily="serif">SATTVA CARE</text>
                  <text x="40" y="100" textAnchor="middle" fill="#5d4037" fontSize="7" fontWeight="bold" fontFamily="serif">HERBAL</text>
                  <text x="40" y="112" textAnchor="middle" fill="#5d4037" fontSize="6" fontWeight="bold" fontFamily="serif">HAIR OIL</text>
                  <text x="40" y="126" textAnchor="middle" fill="#8d6e63" fontSize="4">Ayurvedic Formula</text>
                </g>
                
                {/* Soap - right */}
                <g filter="url(#shadow1)" transform="translate(310, 280)">
                  <rect x="5" y="10" width="120" height="70" rx="14" fill="url(#hero-grad3)"/>
                  <rect x="15" y="18" width="100" height="54" rx="10" fill="white" opacity="0.85"/>
                  <text x="65" y="36" textAnchor="middle" fill="#2d6a4f" fontSize="6" fontWeight="bold" fontFamily="serif">SATTVA CARE</text>
                  <text x="65" y="55" textAnchor="middle" fill="#2d6a4f" fontSize="9" fontWeight="bold" fontFamily="serif">HERBAL SOAP</text>
                  <text x="65" y="67" textAnchor="middle" fill="#66bb6a" fontSize="4.5">Pure Herbal Bathing</text>
                  <circle cx="15" cy="5" r="5" fill="white" opacity="0.3"/>
                  <circle cx="120" cy="8" r="3" fill="white" opacity="0.2"/>
                </g>
                
                {/* Sparkles */}
                <text x="150" y="100" fontSize="16" opacity="0.4">✨</text>
                <text x="370" y="220" fontSize="14" opacity="0.3">🌿</text>
                <text x="100" cy="380" fontSize="12" opacity="0.3">🍃</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES / TRUST BADGES ===== */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="row g-4">
            {[
              { icon: 'bi-leaf', title: 'Natural Ingredients', desc: 'Made with 100% herbal & natural ingredients. No chemicals added.' },
              { icon: 'bi-hand-thumbs-up', title: 'Handmade with Care', desc: 'Each product is lovingly handcrafted for the best quality.' },
              { icon: 'bi-truck', title: 'Pan-India Delivery', desc: 'We deliver our herbal products across India with care.' },
              { icon: 'bi-shield-check', title: 'Quality Assured', desc: 'Rigorous quality checks ensure you get the best herbal experience.' },
            ].map((feature, i) => (
              <div key={i} className={`col-lg-3 col-md-6 animate-fadeInUp delay-${i + 1}`}>
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className={`bi ${feature.icon}`}></i>
                  </div>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-desc">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS SECTION ===== */}
      <section className="section">
        <div className="container">
          <span className="section-label">🌿 Our Products</span>
          <h2 className="section-title">Handcrafted <span className="highlight">Herbal</span> Essentials</h2>
          <p className="section-subtitle">Pure, natural care for your hair and skin — the way nature intended</p>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="row g-4">
              {products.map((product, i) => (
                <div key={product.id} className={`col-lg-4 col-md-6 delay-${i + 1}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-5">
            <Link to="/shop" className="btn btn-sattva btn-sattva-primary btn-lg">
              View All Products <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY SATTVA CARE ===== */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <span className="section-label">✨ Why Choose Us</span>
          <h2 className="section-title">The <span className="highlight">Sattva Care</span> Difference</h2>
          <p className="section-subtitle">What makes our herbal products truly special</p>

          <div className="row g-4">
            {[
              { emoji: '🌿', title: 'No Artificial Colours', desc: 'We never use synthetic dyes. Our products get their natural color from pure herbal ingredients.' },
              { emoji: '🚫', title: 'No Harsh Chemicals', desc: 'Completely free from SLS, parabens, sulfates, and other harmful chemicals.' },
              { emoji: '💐', title: 'No Artificial Fragrance', desc: 'Only natural aromas from herbs and essential oils. Gentle and soothing.' },
              { emoji: '🧴', title: 'Suitable for All Hair Types', desc: 'Whether dry, oily, or normal — our products work beautifully for everyone.' },
              { emoji: '🤲', title: 'Handcrafted in Surat', desc: 'Each product is carefully handmade in small batches ensuring premium quality.' },
              { emoji: '🇮🇳', title: 'Made in India', desc: 'Proudly handcrafted in India using traditional Ayurvedic wisdom & modern techniques.' },
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

      {/* ===== TESTIMONIALS ===== */}
      <section className="section">
        <div className="container">
          <span className="section-label">⭐ Happy Customers</span>
          <h2 className="section-title">What Our <span className="highlight">Customers</span> Say</h2>
          <p className="section-subtitle">Real reviews from people who love Sattva Care products</p>

          <div className="row g-4">
            {TESTIMONIALS.map((testimonial, i) => (
              <div key={i} className={`col-lg-4 col-md-6 animate-fadeInUp delay-${i + 1}`}>
                <div className="testimonial-card">
                  <div className="testimonial-stars">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <i key={j} className="bi bi-star-fill me-1"></i>
                    ))}
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">{testimonial.avatar}</div>
                    <div>
                      <div className="testimonial-name">{testimonial.name}</div>
                      <div className="testimonial-verified">
                        <i className="bi bi-patch-check-fill me-1"></i>Verified Buyer
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER / CTA ===== */}
      <section className="newsletter-section">
        <div className="container">
          <h2 className="newsletter-title">Join the Sattva Care Family 🌿</h2>
          <p className="newsletter-subtitle">Get exclusive offers, herbal tips, and new product updates</p>
          <div className="newsletter-form">
            <input type="email" className="newsletter-input" placeholder="Enter your email" />
            <button className="btn btn-sattva btn-sattva-accent">Subscribe</button>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', marginTop: '12px' }}>
            Use code <strong style={{ color: 'white' }}>WELCOME10</strong> for 10% off your first order!
          </p>
        </div>
      </section>
    </div>
  );
}
