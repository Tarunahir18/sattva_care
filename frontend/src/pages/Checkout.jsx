import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { api } from '../utils/api';

export default function Checkout() {
  const { cart, getCartTotal, getCartMRP, getCartCount, clearCart, addToast } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: 'Gujarat', pincode: '', notes: ''
  });
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(null);
  const [paymentDone, setPaymentDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const total = getCartTotal();
  const mrp = getCartMRP();
  const savings = mrp - total;
  const shipping = total >= 499 ? 0 : 49;
  const grandTotal = total + shipping - couponDiscount;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(form.phone)) newErrors.phone = 'Enter valid 10 digit phone';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(form.pincode)) newErrors.pincode = 'Enter valid 6 digit pincode';
    if (!paymentDone) newErrors.payment = 'Please complete payment via QR code';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    try {
      const res = await api.validateCoupon(couponCode, total);
      if (res.success) {
        setCouponDiscount(res.data.discount);
        setCouponApplied(res.data);
        addToast(res.message, 'success');
      } else {
        addToast(res.message, 'error');
      }
    } catch (err) {
      addToast('Error validating coupon', 'error');
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const orderData = {
        customer: form,
        items: cart.map(item => ({
          productId: item.productId,
          name: item.name,
          variant: item.variant,
          quantity: item.quantity,
          total: item.variant.price * item.quantity,
        })),
        subtotal: total,
        shipping,
        discount: couponDiscount,
        total: grandTotal,
        paymentMethod: 'qr',
        couponCode: couponApplied?.code || null,
      };

      const res = await api.createOrder(orderData);
      if (res.success) {
        clearCart();
        navigate(`/order-success/${res.data.id}`);
      } else {
        addToast(res.message || 'Error placing order', 'error');
      }
    } catch (err) {
      addToast('Something went wrong. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="page-enter" style={{ paddingTop: '100px' }}>
        <div className="container">
          <div className="empty-state" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="empty-icon">🛒</div>
            <h3 style={{ fontFamily: 'var(--font-heading)' }}>Nothing to checkout</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Add some products to your cart first</p>
            <Link to="/shop" className="btn btn-sattva btn-sattva-primary mt-3">Go to Shop</Link>
          </div>
        </div>
      </div>
    );
  }

  const indianStates = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi'];

  return (
    <div className="page-enter" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      <div className="container">
        <nav className="breadcrumb-sattva">
          <Link to="/">Home</Link> / <Link to="/cart">Cart</Link> / <span style={{ color: 'var(--text-primary)' }}>Checkout</span>
        </nav>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '32px' }}>Checkout</h1>

        <form onSubmit={handleSubmitOrder}>
          <div className="row g-4">
            {/* Shipping Form */}
            <div className="col-lg-7">
              <div className="glass-card p-4 mb-4">
                <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>
                  <i className="bi bi-truck me-2"></i>Shipping Details
                </h4>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label-sattva">Full Name *</label>
                    <input type="text" name="name" className={`form-control form-control-sattva ${errors.name ? 'border-danger' : ''}`} placeholder="Your full name" value={form.name} onChange={handleChange} />
                    {errors.name && <small className="text-danger">{errors.name}</small>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label-sattva">Email</label>
                    <input type="email" name="email" className="form-control form-control-sattva" placeholder="email@example.com" value={form.email} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label-sattva">Phone Number *</label>
                    <input type="tel" name="phone" className={`form-control form-control-sattva ${errors.phone ? 'border-danger' : ''}`} placeholder="10 digit number" value={form.phone} onChange={handleChange} maxLength={10} />
                    {errors.phone && <small className="text-danger">{errors.phone}</small>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label-sattva">Pincode *</label>
                    <input type="text" name="pincode" className={`form-control form-control-sattva ${errors.pincode ? 'border-danger' : ''}`} placeholder="6 digit pincode" value={form.pincode} onChange={handleChange} maxLength={6} />
                    {errors.pincode && <small className="text-danger">{errors.pincode}</small>}
                  </div>
                  <div className="col-12">
                    <label className="form-label-sattva">Address *</label>
                    <textarea name="address" className={`form-control form-control-sattva ${errors.address ? 'border-danger' : ''}`} rows="2" placeholder="House no., Street, Landmark" value={form.address} onChange={handleChange}></textarea>
                    {errors.address && <small className="text-danger">{errors.address}</small>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label-sattva">City *</label>
                    <input type="text" name="city" className={`form-control form-control-sattva ${errors.city ? 'border-danger' : ''}`} placeholder="City" value={form.city} onChange={handleChange} />
                    {errors.city && <small className="text-danger">{errors.city}</small>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label-sattva">State</label>
                    <select name="state" className="form-select form-control-sattva" value={form.state} onChange={handleChange}>
                      {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label-sattva">Order Notes (optional)</label>
                    <textarea name="notes" className="form-control form-control-sattva" rows="2" placeholder="Any special instructions..." value={form.notes} onChange={handleChange}></textarea>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="glass-card p-4">
                <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>
                  <i className="bi bi-credit-card me-2"></i>Payment
                </h4>

                <div className="qr-payment-box">
                  <h5 style={{ fontFamily: 'var(--font-accent)', color: 'var(--primary)' }}>Pay via UPI / QR Code</h5>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Scan the QR code below to pay <strong style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>₹{grandTotal}</strong>
                  </p>
                  
                  {/* QR Code Placeholder */}
                  <div style={{
                    width: '200px', height: '200px', margin: '16px auto',
                    background: 'white', borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-md)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column', padding: '16px',
                    border: '2px dashed var(--border-color)'
                  }}>
                    <i className="bi bi-qr-code" style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '8px' }}></i>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                      Payment QR Code<br/>(Owner will add)
                    </span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    UPI: sattvacare@upi
                  </p>

                  <div className="form-check mt-3 d-flex align-items-center justify-content-center gap-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="paymentConfirm"
                      checked={paymentDone}
                      onChange={(e) => {
                        setPaymentDone(e.target.checked);
                        if (errors.payment) setErrors({ ...errors, payment: '' });
                      }}
                      style={{ width: '20px', height: '20px' }}
                    />
                    <label className="form-check-label" htmlFor="paymentConfirm" style={{ fontFamily: 'var(--font-accent)', fontWeight: 500 }}>
                      I have completed the payment
                    </label>
                  </div>
                  {errors.payment && <small className="text-danger d-block mt-1">{errors.payment}</small>}
                </div>

                <div className="mt-3 p-3" style={{ background: 'rgba(45,106,79,0.05)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(45,106,79,0.1)' }}>
                  <p className="mb-0" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <i className="bi bi-shield-check me-1" style={{ color: 'var(--primary)' }}></i>
                    Your order will be confirmed after payment verification. For any issues, contact us at <strong>+91 8141887992</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="col-lg-5">
              <div className="checkout-summary">
                <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>Order Summary</h4>

                {/* Cart Items */}
                {cart.map(item => (
                  <div key={`${item.productId}-${item.variant.size}`} className="d-flex justify-content-between align-items-center py-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-accent)', fontWeight: 500, fontSize: '0.9rem' }}>{item.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.variant.size} × {item.quantity}</div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 600 }}>₹{item.variant.price * item.quantity}</span>
                  </div>
                ))}

                {/* Coupon */}
                <div className="mt-3 mb-3">
                  <label className="form-label-sattva">Apply Coupon</label>
                  {couponApplied ? (
                    <div className="coupon-applied">
                      <i className="bi bi-tag-fill"></i>
                      <span>{couponApplied.code} applied — You save ₹{couponApplied.discount}</span>
                      <button className="btn btn-sm btn-link text-danger ms-auto p-0" onClick={() => { setCouponApplied(null); setCouponDiscount(0); setCouponCode(''); }}>
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="coupon-input-wrapper">
                      <input
                        type="text"
                        className="form-control form-control-sattva"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={e => setCouponCode(e.target.value.toUpperCase())}
                      />
                      <button type="button" className="btn btn-sattva btn-sattva-outline" onClick={handleApplyCoupon} style={{ whiteSpace: 'nowrap' }}>
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                {/* Totals */}
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{mrp}</span>
                </div>
                {savings > 0 && (
                  <div className="summary-row" style={{ color: '#16a34a' }}>
                    <span>Product Discount</span>
                    <span>−₹{savings}</span>
                  </div>
                )}
                {couponDiscount > 0 && (
                  <div className="summary-row" style={{ color: '#16a34a' }}>
                    <span>Coupon Discount</span>
                    <span>−₹{couponDiscount}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span style={{ color: '#16a34a' }}>FREE</span> : `₹${shipping}`}</span>
                </div>
                <div className="summary-row total">
                  <span>Total Amount</span>
                  <span>₹{grandTotal}</span>
                </div>

                <button
                  type="submit"
                  className="btn btn-sattva btn-sattva-primary btn-lg w-100 mt-3"
                  disabled={submitting}
                >
                  {submitting ? (
                    <><span className="spinner-border spinner-border-sm me-2"></span>Placing Order...</>
                  ) : (
                    <>🌿 Place Order — ₹{grandTotal}</>
                  )}
                </button>

                <p className="text-center mt-3" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <i className="bi bi-lock me-1"></i>Secure checkout. Your data is safe with us.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
