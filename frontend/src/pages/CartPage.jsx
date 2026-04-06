import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartMRP, getCartCount } = useCart();

  const total = getCartTotal();
  const mrp = getCartMRP();
  const savings = mrp - total;
  const shipping = total >= 499 ? 0 : 49;

  if (cart.length === 0) {
    return (
      <div className="page-enter" style={{ paddingTop: '100px' }}>
        <div className="container">
          <div className="empty-state" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="empty-icon">🛒</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: '12px' }}>Your Cart is Empty</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Looks like you haven't added any herbal goodness yet!</p>
            <Link to="/shop" className="btn btn-sattva btn-sattva-primary btn-lg">
              <i className="bi bi-bag"></i> Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter" style={{ paddingTop: '100px' }}>
      <div className="container">
        <nav className="breadcrumb-sattva">
          <Link to="/">Home</Link> / <span style={{ color: 'var(--text-primary)' }}>Shopping Cart</span>
        </nav>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '32px' }}>
          Shopping Cart <span className="badge rounded-pill" style={{ background: 'var(--primary-gradient)', fontSize: '0.8rem', verticalAlign: 'middle' }}>{getCartCount()} items</span>
        </h1>

        <div className="row g-4">
          {/* Cart Items */}
          <div className="col-lg-8">
            {cart.map((item, i) => (
              <div key={`${item.productId}-${item.variant.size}`} className="cart-item animate-fadeInUp">
                <Link to={`/product/${item.slug}`}>
                  <div className="cart-item-img d-flex align-items-center justify-content-center" style={{ background: 'var(--bg-secondary)' }}>
                    <svg viewBox="0 0 80 80" style={{ width: '60px', height: '60px' }}>
                      <rect x="10" y="5" width="60" height="70" rx="8" fill="#2d6a4f" opacity="0.7"/>
                      <rect x="18" y="25" width="44" height="35" rx="4" fill="white" opacity="0.9"/>
                      <text x="40" y="42" textAnchor="middle" fill="#2d6a4f" fontSize="5" fontWeight="bold" fontFamily="serif">SATTVA</text>
                      <text x="40" y="52" textAnchor="middle" fill="#2d6a4f" fontSize="4" fontFamily="serif">CARE</text>
                    </svg>
                  </div>
                </Link>
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <p className="cart-item-variant">Size: {item.variant.size}</p>
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="quantity-control">
                        <button className="quantity-btn" onClick={() => updateQuantity(item.productId, item.variant.size, item.quantity - 1)}>−</button>
                        <input className="quantity-value" value={item.quantity} readOnly />
                        <button className="quantity-btn" onClick={() => updateQuantity(item.productId, item.variant.size, item.quantity + 1)}>+</button>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeFromCart(item.productId, item.variant.size)}
                        style={{ borderRadius: 'var(--radius-sm)' }}
                      >
                        <i className="bi bi-trash"></i> Remove
                      </button>
                    </div>
                    <div className="text-end">
                      <div className="price-current" style={{ fontSize: '1.2rem' }}>₹{item.variant.price * item.quantity}</div>
                      {item.variant.mrp > item.variant.price && (
                        <div className="price-mrp" style={{ fontSize: '0.85rem' }}>₹{item.variant.mrp * item.quantity}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="checkout-summary animate-slideInRight">
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>Order Summary</h4>

              <div className="summary-row">
                <span>Subtotal ({getCartCount()} items)</span>
                <span>₹{mrp}</span>
              </div>
              <div className="summary-row" style={{ color: '#16a34a' }}>
                <span>Discount</span>
                <span>−₹{savings}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span style={{ color: '#16a34a' }}>FREE</span> : `₹${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <p style={{ fontSize: '0.78rem', color: 'var(--accent)', marginTop: '4px' }}>
                  Add ₹{499 - total} more for free shipping!
                </p>
              )}
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total + shipping}</span>
              </div>

              {savings > 0 && (
                <div className="coupon-applied mt-3">
                  <i className="bi bi-tag-fill"></i>
                  You're saving ₹{savings} on this order!
                </div>
              )}

              <Link to="/checkout" className="btn btn-sattva btn-sattva-primary btn-lg w-100 mt-4">
                Proceed to Checkout <i className="bi bi-arrow-right"></i>
              </Link>

              <Link to="/shop" className="btn btn-sattva btn-sattva-outline w-100 mt-2" style={{ fontSize: '0.9rem' }}>
                <i className="bi bi-arrow-left"></i> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
