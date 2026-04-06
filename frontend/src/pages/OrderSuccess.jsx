import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../utils/api';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.getOrder(orderId);
        if (res.success) setOrder(res.data);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="loading-spinner" style={{ minHeight: '80vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="order-success-container page-enter">
      <div className="success-card animate-scaleIn">
        <div className="success-icon">
          <i className="bi bi-check-lg"></i>
        </div>

        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary)', marginBottom: '8px' }}>
          Order Placed Successfully! 🌿
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Thank you for choosing Sattva Care. Your order has been confirmed.
        </p>

        {order && (
          <div style={{ textAlign: 'left', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '24px' }}>
            <div className="d-flex justify-content-between mb-2">
              <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-accent)', fontSize: '0.9rem' }}>Order ID</span>
              <strong style={{ fontFamily: 'var(--font-accent)', color: 'var(--primary)' }}>{order.id}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-accent)', fontSize: '0.9rem' }}>Status</span>
              <span className="badge" style={{ background: 'var(--primary-gradient)', padding: '5px 12px' }}>Confirmed</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-accent)', fontSize: '0.9rem' }}>Items</span>
              <span style={{ fontFamily: 'var(--font-accent)' }}>{order.items.length} product(s)</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-accent)', fontSize: '0.9rem' }}>Total Paid</span>
              <strong style={{ fontFamily: 'var(--font-accent)', color: 'var(--primary)', fontSize: '1.1rem' }}>₹{order.total}</strong>
            </div>
            <hr style={{ borderColor: 'var(--border-color)' }} />
            <div>
              <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-accent)', fontSize: '0.85rem' }}>Delivering to:</span>
              <p style={{ fontFamily: 'var(--font-accent)', fontSize: '0.9rem', marginBottom: 0, marginTop: '4px' }}>
                {order.customer.name}<br />
                {order.customer.address}, {order.customer.city}<br />
                {order.customer.state} - {order.customer.pincode}<br />
                📞 {order.customer.phone}
              </p>
            </div>
          </div>
        )}

        <div className="p-3 mb-4" style={{ background: 'rgba(45,106,79,0.05)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(45,106,79,0.1)' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 0 }}>
            <i className="bi bi-whatsapp me-1" style={{ color: '#25d366' }}></i>
            For order updates or queries, WhatsApp us at <strong>+91 8141887992</strong>
          </p>
        </div>

        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Link to="/shop" className="btn btn-sattva btn-sattva-primary">
            <i className="bi bi-bag me-1"></i> Continue Shopping
          </Link>
          <Link to="/" className="btn btn-sattva btn-sattva-outline">
            <i className="bi bi-house me-1"></i> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
