import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const variant = product.variants[0];
  const discount = Math.round(((variant.mrp - variant.price) / variant.mrp) * 100);

  const getTag = () => {
    if (product.tags.includes('bestseller')) return { text: 'Bestseller', class: 'tag-bestseller' };
    if (product.tags.includes('premium')) return { text: 'Premium', class: 'tag-premium' };
    if (product.tags.includes('new')) return { text: 'New', class: 'tag-new' };
    return null;
  };

  const tag = getTag();

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i key={i} className={`bi ${i <= Math.floor(rating) ? 'bi-star-fill' : i - 0.5 <= rating ? 'bi-star-half' : 'bi-star'}`}></i>
      );
    }
    return stars;
  };

  // Generate SVG placeholder based on product category
  const getProductSVG = () => {
    const colors = {
      shampoo: { bg: '#e8f5e9', main: '#2d6a4f', accent: '#81c784' },
      'hair-oil': { bg: '#fff3e0', main: '#e65100', accent: '#ffb74d' },
      soap: { bg: '#fce4ec', main: '#880e4f', accent: '#f48fb1' },
    };
    const c = colors[product.category] || colors.shampoo;
    
    if (product.category === 'shampoo') {
      return (
        <svg viewBox="0 0 200 300" style={{ maxHeight: '220px', width: 'auto' }}>
          <defs>
            <linearGradient id={`grad-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={c.main} />
              <stop offset="100%" stopColor={c.accent} />
            </linearGradient>
          </defs>
          {/* Bottle */}
          <rect x="60" y="30" width="80" height="25" rx="4" fill="#ddd"/>
          <rect x="75" y="10" width="50" height="25" rx="8" fill="#eee"/>
          <rect x="50" y="55" width="100" height="200" rx="15" fill={`url(#grad-${product.id})`}/>
          {/* Label */}
          <rect x="58" y="100" width="84" height="110" rx="6" fill="white" opacity="0.9"/>
          <text x="100" y="125" textAnchor="middle" fill={c.main} fontSize="9" fontWeight="bold" fontFamily="serif">SATTVA CARE</text>
          <text x="100" y="145" textAnchor="middle" fill={c.main} fontSize="7" fontFamily="sans-serif">Natural. Safe. Effective.</text>
          <line x1="70" y1="152" x2="130" y2="152" stroke={c.accent} strokeWidth="0.5"/>
          <text x="100" y="170" textAnchor="middle" fill={c.main} fontSize="11" fontWeight="bold" fontFamily="serif">HERBAL</text>
          <text x="100" y="185" textAnchor="middle" fill={c.main} fontSize="10" fontWeight="bold" fontFamily="serif">SHAMPOO</text>
          <text x="100" y="200" textAnchor="middle" fill={c.accent} fontSize="6" fontFamily="sans-serif">Nature's Care for Hair</text>
          {/* Leaves decoration */}
          <ellipse cx="75" cy="240" rx="8" ry="4" fill="white" opacity="0.3" transform="rotate(-30 75 240)"/>
          <ellipse cx="125" cy="235" rx="8" ry="4" fill="white" opacity="0.3" transform="rotate(30 125 235)"/>
        </svg>
      );
    }
    
    if (product.category === 'hair-oil') {
      return (
        <svg viewBox="0 0 200 300" style={{ maxHeight: '220px', width: 'auto' }}>
          <defs>
            <linearGradient id={`grad-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5d4037" />
              <stop offset="100%" stopColor="#8d6e63" />
            </linearGradient>
          </defs>
          {/* Bottle */}
          <rect x="80" y="15" width="40" height="30" rx="3" fill="#bbb"/>
          <circle cx="100" cy="10" r="8" fill="#999"/>
          <rect x="85" y="40" width="30" height="15" rx="2" fill="#ddd"/>
          <path d="M60 55 L140 55 L130 260 Q130 270 120 270 L80 270 Q70 270 70 260 Z" fill={`url(#grad-${product.id})`}/>
          {/* Label */}
          <rect x="68" y="100" width="64" height="120" rx="6" fill="#fdf6e3" opacity="0.95"/>
          <text x="100" y="120" textAnchor="middle" fill="#5d4037" fontSize="8" fontWeight="bold" fontFamily="serif">SATTVA CARE</text>
          <text x="100" y="133" textAnchor="middle" fill="#8d6e63" fontSize="5.5" fontFamily="sans-serif">Natural. Safe. Effective.</text>
          <line x1="76" y1="139" x2="124" y2="139" stroke="#d4a845" strokeWidth="0.5"/>
          <text x="100" y="157" textAnchor="middle" fill="#5d4037" fontSize="10" fontWeight="bold" fontFamily="serif">HERBAL</text>
          <text x="100" y="172" textAnchor="middle" fill="#5d4037" fontSize="9" fontWeight="bold" fontFamily="serif">HAIR OIL</text>
          <text x="100" y="188" textAnchor="middle" fill="#8d6e63" fontSize="5.5" fontFamily="sans-serif">Ayurvedic Formula</text>
          {/* Oil droplet */}
          <path d="M100 200 Q105 210 100 218 Q95 210 100 200" fill="#d4a845" opacity="0.5"/>
        </svg>
      );
    }
    
    // Soap
    return (
      <svg viewBox="0 0 200 200" style={{ maxHeight: '220px', width: 'auto' }}>
        <defs>
          <linearGradient id={`grad-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#66bb6a" />
            <stop offset="100%" stopColor="#a5d6a7" />
          </linearGradient>
        </defs>
        {/* Soap bar */}
        <rect x="25" y="50" width="150" height="100" rx="18" fill={`url(#grad-${product.id})`}/>
        <rect x="30" y="55" width="140" height="90" rx="15" fill="white" opacity="0.15"/>
        {/* Label area */}
        <rect x="40" y="65" width="120" height="70" rx="10" fill="white" opacity="0.85"/>
        <text x="100" y="85" textAnchor="middle" fill="#2d6a4f" fontSize="8" fontWeight="bold" fontFamily="serif">SATTVA CARE</text>
        <text x="100" y="96" textAnchor="middle" fill="#66bb6a" fontSize="5" fontFamily="sans-serif">Natural. Safe. Effective.</text>
        <line x1="55" y1="101" x2="145" y2="101" stroke="#a5d6a7" strokeWidth="0.5"/>
        <text x="100" y="116" textAnchor="middle" fill="#2d6a4f" fontSize="11" fontWeight="bold" fontFamily="serif">HERBAL SOAP</text>
        <text x="100" y="128" textAnchor="middle" fill="#66bb6a" fontSize="5" fontFamily="sans-serif">Pure Herbal Bathing</text>
        {/* Bubbles */}
        <circle cx="40" cy="45" r="8" fill="white" opacity="0.3"/>
        <circle cx="55" cy="35" r="5" fill="white" opacity="0.2"/>
        <circle cx="160" cy="40" r="6" fill="white" opacity="0.25"/>
        {/* Leaf */}
        <ellipse cx="155" cy="155" rx="15" ry="7" fill="#81c784" opacity="0.4" transform="rotate(-20 155 155)"/>
      </svg>
    );
  };

  return (
    <div className="product-card animate-fadeInUp">
      <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="product-card-img-wrapper">
          {tag && <span className={`product-card-tag ${tag.class}`}>{tag.text}</span>}
          {getProductSVG()}
        </div>
        <div className="product-card-body">
          <span className="product-card-category">{product.category.replace('-', ' ')}</span>
          <h3 className="product-card-name">{product.name}</h3>
          <div className="product-rating">
            {renderStars(product.rating)}
            <span className="rating-text">({product.reviewCount})</span>
          </div>
          <p className="product-card-desc">{product.shortDescription}</p>
          <div className="product-card-footer">
            <div className="product-price">
              <span className="price-current">₹{variant.price}</span>
              <span className="price-mrp">₹{variant.mrp}</span>
              <span className="price-discount">{discount}% off</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
