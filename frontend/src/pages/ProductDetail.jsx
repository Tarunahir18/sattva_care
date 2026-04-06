import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../utils/api';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.getProduct(slug);
        if (res.success) {
          setProduct(res.data);
          const revRes = await api.getReviews(res.data.id);
          if (revRes.success) setReviews(revRes.data);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, product.variants[selectedVariant], quantity);
      setQuantity(1);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.createReview({
        productId: product.id,
        ...reviewForm,
      });
      if (res.success) {
        setReviews(prev => [...prev, res.data]);
        setReviewForm({ name: '', rating: 5, comment: '' });
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i key={i} className={`bi ${i < Math.floor(rating) ? 'bi-star-fill' : i < rating ? 'bi-star-half' : 'bi-star'}`} style={{ color: '#f59e0b' }}></i>
    ));
  };

  if (loading) {
    return (
      <div className="loading-spinner" style={{ minHeight: '80vh', paddingTop: '100px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="empty-state" style={{ paddingTop: '150px' }}>
        <div className="empty-icon">😕</div>
        <h3>Product not found</h3>
        <Link to="/shop" className="btn btn-sattva btn-sattva-primary mt-3">Back to Shop</Link>
      </div>
    );
  }

  const variant = product.variants[selectedVariant];
  const discount = Math.round(((variant.mrp - variant.price) / variant.mrp) * 100);

  return (
    <div className="page-enter" style={{ paddingTop: '100px' }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb-sattva" aria-label="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span style={{color: 'var(--text-primary)'}}>{product.name}</span>
        </nav>

        <div className="row g-5 mb-5">
          {/* Product Image */}
          <div className="col-lg-6 animate-slideInLeft">
            <div className="product-detail-img d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
              <svg viewBox="0 0 300 400" style={{ maxHeight: '420px', width: 'auto' }}>
                <defs>
                  <linearGradient id="detail-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={product.category === 'hair-oil' ? '#5d4037' : product.category === 'soap' ? '#66bb6a' : '#2d6a4f'}/>
                    <stop offset="100%" stopColor={product.category === 'hair-oil' ? '#8d6e63' : product.category === 'soap' ? '#a5d6a7' : '#52b788'}/>
                  </linearGradient>
                </defs>
                {product.category === 'soap' ? (
                  <g transform="translate(30, 100)">
                    <rect x="0" y="0" width="240" height="140" rx="24" fill="url(#detail-grad)"/>
                    <rect x="10" y="10" width="220" height="120" rx="18" fill="white" opacity="0.15"/>
                    <rect x="25" y="25" width="190" height="90" rx="12" fill="white" opacity="0.85"/>
                    <text x="120" y="55" textAnchor="middle" fill="#2d6a4f" fontSize="12" fontWeight="bold" fontFamily="serif">SATTVA CARE</text>
                    <text x="120" y="72" textAnchor="middle" fill="#66bb6a" fontSize="7" fontFamily="sans-serif">Natural. Safe. Effective.</text>
                    <line x1="45" y1="80" x2="195" y2="80" stroke="#a5d6a7" strokeWidth="0.5"/>
                    <text x="120" y="100" textAnchor="middle" fill="#2d6a4f" fontSize="16" fontWeight="bold" fontFamily="serif">HERBAL SOAP</text>
                    <circle cx="20" cy="-10" r="12" fill="white" opacity="0.3"/>
                    <circle cx="230" cy="-5" r="8" fill="white" opacity="0.2"/>
                  </g>
                ) : product.category === 'hair-oil' ? (
                  <g transform="translate(80, 20)">
                    <rect x="40" y="8" width="60" height="35" rx="4" fill="#ccc"/>
                    <circle cx="70" cy="5" r="10" fill="#aaa"/>
                    <rect x="48" y="38" width="44" height="18" rx="3" fill="#ddd"/>
                    <path d="M20 56 L120 56 L110 340 Q110 355 95 355 L45 355 Q30 355 30 340 Z" fill="url(#detail-grad)"/>
                    <rect x="32" y="110" width="76" height="150" rx="8" fill="#fdf6e3" opacity="0.95"/>
                    <text x="70" y="140" textAnchor="middle" fill="#5d4037" fontSize="10" fontWeight="bold" fontFamily="serif">SATTVA CARE</text>
                    <text x="70" y="156" textAnchor="middle" fill="#8d6e63" fontSize="7" fontFamily="sans-serif">Natural. Safe. Effective.</text>
                    <line x1="42" y1="165" x2="98" y2="165" stroke="#d4a845" strokeWidth="0.5"/>
                    <text x="70" y="190" textAnchor="middle" fill="#5d4037" fontSize="14" fontWeight="bold" fontFamily="serif">HERBAL</text>
                    <text x="70" y="210" textAnchor="middle" fill="#5d4037" fontSize="12" fontWeight="bold" fontFamily="serif">HAIR OIL</text>
                    <text x="70" y="235" textAnchor="middle" fill="#8d6e63" fontSize="7" fontFamily="sans-serif">Ayurvedic Formula</text>
                  </g>
                ) : (
                  <g transform="translate(60, 10)">
                    <rect x="40" y="25" width="100" height="30" rx="5" fill="#ddd"/>
                    <rect x="55" y="8" width="70" height="25" rx="8" fill="#eee"/>
                    <rect x="25" y="55" width="130" height="280" rx="18" fill="url(#detail-grad)"/>
                    <rect x="35" y="110" width="110" height="160" rx="8" fill="white" opacity="0.92"/>
                    <text x="90" y="138" textAnchor="middle" fill="#2d6a4f" fontSize="11" fontWeight="bold" fontFamily="serif">SATTVA CARE</text>
                    <text x="90" y="156" textAnchor="middle" fill="#52b788" fontSize="7" fontFamily="sans-serif">Natural. Safe. Effective.</text>
                    <line x1="48" y1="165" x2="132" y2="165" stroke="#81c784" strokeWidth="0.5"/>
                    <text x="90" y="192" textAnchor="middle" fill="#2d6a4f" fontSize="16" fontWeight="bold" fontFamily="serif">HERBAL</text>
                    <text x="90" y="212" textAnchor="middle" fill="#2d6a4f" fontSize="14" fontWeight="bold" fontFamily="serif">SHAMPOO</text>
                    <text x="90" y="235" textAnchor="middle" fill="#52b788" fontSize="7" fontFamily="sans-serif">Nature's Care for Hair</text>
                    <text x="90" y="255" textAnchor="middle" fill="#888" fontSize="6">{variant.size}</text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Product Info */}
          <div className="col-lg-6 animate-slideInRight">
            <span className="product-card-category" style={{ fontSize: '0.85rem' }}>{product.category.replace('-', ' ')}</span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, marginBottom: '8px' }}>
              {product.name}
            </h1>
            <p style={{ fontFamily: 'var(--font-accent)', color: 'var(--accent)', fontSize: '1.05rem', marginBottom: '16px' }}>
              {product.tagline}
            </p>

            {/* Rating */}
            <div className="product-rating mb-3" style={{ fontSize: '1rem' }}>
              {renderStars(product.rating)}
              <span className="rating-text" style={{ fontSize: '0.9rem' }}>
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="product-price mb-4" style={{ gap: '12px' }}>
              <span className="price-current" style={{ fontSize: '2rem' }}>₹{variant.price}</span>
              <span className="price-mrp" style={{ fontSize: '1.2rem' }}>₹{variant.mrp}</span>
              <span className="price-discount" style={{ fontSize: '0.9rem' }}>{discount}% OFF</span>
            </div>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '24px' }}>
              {product.shortDescription}
            </p>

            {/* Variant Selection */}
            <div className="mb-4">
              <label className="form-label-sattva mb-2">Select Size:</label>
              <div className="d-flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={i}
                    className={`variant-option ${selectedVariant === i ? 'selected' : ''}`}
                    onClick={() => { setSelectedVariant(i); setQuantity(1); }}
                  >
                    {v.size} — ₹{v.price}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <label className="form-label-sattva mb-2">Quantity:</label>
              <div className="quantity-control">
                <button className="quantity-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <input className="quantity-value" value={quantity} readOnly />
                <button className="quantity-btn" onClick={() => setQuantity(Math.min(variant.stock, quantity + 1))}>+</button>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '12px' }}>
                {variant.stock} in stock
              </span>
            </div>

            {/* Add to Cart */}
            <div className="d-flex gap-3 mb-4 flex-wrap">
              <button className="btn btn-sattva btn-sattva-primary btn-lg" onClick={handleAddToCart}>
                <i className="bi bi-bag-plus"></i> Add to Cart
              </button>
              <Link to="/cart" className="btn btn-sattva btn-sattva-outline btn-lg" onClick={handleAddToCart}>
                <i className="bi bi-lightning"></i> Buy Now
              </Link>
            </div>

            {/* Trust badges */}
            <div className="d-flex flex-wrap gap-3">
              {['🌿 100% Natural', '🚫 No Chemicals', '🤲 Handmade', '🇮🇳 Made in India'].map((badge, i) => (
                <span key={i} className="hero-badge" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>{badge}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-5">
          <ul className="nav nav-tabs" role="tablist">
            {[
              { key: 'description', label: 'Description' },
              { key: 'ingredients', label: 'Ingredients' },
              { key: 'howToUse', label: 'How to Use' },
              { key: 'reviews', label: `Reviews (${reviews.length})` },
            ].map(tab => (
              <li className="nav-item" key={tab.key} role="presentation">
                <button
                  className={`nav-link ${activeTab === tab.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                  style={{ fontFamily: 'var(--font-accent)', fontWeight: 500, color: activeTab === tab.key ? 'var(--primary)' : 'var(--text-secondary)' }}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="tab-content p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderTop: 'none', borderRadius: '0 0 var(--radius-md) var(--radius-md)' }}>
            {activeTab === 'description' && (
              <div className="animate-fadeIn">
                <p style={{ lineHeight: 2, color: 'var(--text-secondary)' }}>{product.description}</p>
                <h5 className="mt-4 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Key Benefits:</h5>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {product.benefits.map((benefit, i) => (
                    <li key={i} style={{ padding: '6px 0', color: 'var(--text-secondary)' }}>
                      <i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--primary)' }}></i>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="animate-fadeIn">
                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                  Our {product.name} is crafted with the following natural ingredients:
                </p>
                <div className="d-flex flex-wrap gap-2">
                  {product.ingredients.map((ing, i) => (
                    <span key={i} className="ingredient-tag">{ing}</span>
                  ))}
                </div>
                <div className="mt-4 p-3" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                  <p className="mb-0" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <i className="bi bi-info-circle me-1"></i>
                    All ingredients are 100% natural and herbal. No harsh chemicals, no artificial colours, no artificial fragrance. For external use only.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'howToUse' && (
              <div className="animate-fadeIn">
                <p style={{ lineHeight: 2, color: 'var(--text-secondary)' }}>{product.howToUse}</p>
                <div className="mt-3 p-3" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                  <strong style={{ color: 'var(--accent)' }}>💡 Pro Tip:</strong>
                  <span style={{ color: 'var(--text-secondary)' }}> For best results, use Sattva Care products consistently for at least 4 weeks.</span>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="animate-fadeIn">
                {reviews.length > 0 ? (
                  <div className="mb-4">
                    {reviews.map((review, i) => (
                      <div key={i} className="p-3 mb-3" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <div className="d-flex align-items-center gap-2">
                            <div className="testimonial-avatar" style={{ width: '36px', height: '36px', fontSize: '0.8rem' }}>
                              {review.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <strong style={{ fontSize: '0.9rem' }}>{review.name}</strong>
                              {review.verified && (
                                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', marginLeft: '8px' }}>
                                  <i className="bi bi-patch-check-fill"></i> Verified
                                </span>
                              )}
                            </div>
                          </div>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{review.date}</span>
                        </div>
                        <div className="mb-1">{renderStars(review.rating)}</div>
                        <p className="mb-0" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-muted)' }}>No reviews yet. Be the first to review!</p>
                )}

                {/* Review Form */}
                <h5 className="mt-4 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Write a Review</h5>
                <form onSubmit={handleReviewSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control form-control-sattva"
                        placeholder="Your Name"
                        value={reviewForm.name}
                        onChange={e => setReviewForm({ ...reviewForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <select
                        className="form-select form-control-sattva"
                        value={reviewForm.rating}
                        onChange={e => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                        <option value={4}>⭐⭐⭐⭐ Good</option>
                        <option value={3}>⭐⭐⭐ Average</option>
                        <option value={2}>⭐⭐ Poor</option>
                        <option value={1}>⭐ Very Poor</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <textarea
                        className="form-control form-control-sattva"
                        rows="3"
                        placeholder="Share your experience with this product..."
                        value={reviewForm.comment}
                        onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })}
                        required
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-sattva btn-sattva-primary" disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
