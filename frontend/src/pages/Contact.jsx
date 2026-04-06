import { useState } from 'react';
import { api } from '../utils/api';
import { useCart } from '../context/CartContext';

export default function Contact() {
  const { addToast } = useCart();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      addToast('Please fill all required fields', 'error');
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.submitContact(form);
      if (res.success) {
        addToast(res.message, 'success');
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        addToast(res.message || 'Error sending message', 'error');
      }
    } catch (err) {
      addToast('Something went wrong. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <span className="section-label">📞 Get in Touch</span>
          <h1 className="section-title" style={{ fontSize: '2.5rem' }}>
            Contact <span className="highlight">Sattva Care</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Have questions? Want to place a bulk order? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section" style={{ marginTop: '-40px' }}>
        <div className="container">
          <div className="row g-4 mb-5">
            {[
              {
                icon: 'bi-telephone-fill',
                title: 'Call Us',
                lines: ['+91 8141887992', '+91 7041869850'],
                link: 'tel:+918141887992',
              },
              {
                icon: 'bi-instagram',
                title: 'Instagram',
                lines: ['@sattva.care', 'Follow us for updates!'],
                link: 'https://www.instagram.com/sattva.care',
              },
              {
                icon: 'bi-facebook',
                title: 'Facebook',
                lines: ['Sattva Care', 'Like our page!'],
                link: 'https://www.facebook.com/SattvaCare',
              },
              {
                icon: 'bi-geo-alt-fill',
                title: 'Location',
                lines: ['Surat, Gujarat', 'India 🇮🇳'],
                link: null,
              },
            ].map((info, i) => (
              <div key={i} className={`col-lg-3 col-md-6 animate-fadeInUp delay-${i + 1}`}>
                <div className="contact-card">
                  <div className="contact-icon">
                    <i className={`bi ${info.icon}`}></i>
                  </div>
                  <h5 className="feature-title">{info.title}</h5>
                  {info.lines.map((line, j) => (
                    <p key={j} className="mb-0" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      {info.link && j === 0 ? (
                        <a href={info.link} target={info.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
                          {line}
                        </a>
                      ) : line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="glass-card p-5 animate-fadeInUp">
                <h3 style={{ fontFamily: 'var(--font-heading)', textAlign: 'center', marginBottom: '8px' }}>
                  Send Us a Message
                </h3>
                <p className="text-center mb-4" style={{ color: 'var(--text-secondary)' }}>
                  Fill out the form below and we'll get back to you within 24 hours
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label-sattva">Full Name *</label>
                      <input type="text" name="name" className="form-control form-control-sattva" placeholder="Your name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-sattva">Email *</label>
                      <input type="email" name="email" className="form-control form-control-sattva" placeholder="email@example.com" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-sattva">Phone</label>
                      <input type="tel" name="phone" className="form-control form-control-sattva" placeholder="+91 XXXXXXXXXX" value={form.phone} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-sattva">Subject</label>
                      <select name="subject" className="form-select form-control-sattva" value={form.subject} onChange={handleChange}>
                        <option value="">Select a topic</option>
                        <option value="Product Inquiry">Product Inquiry</option>
                        <option value="Order Status">Order Status</option>
                        <option value="Bulk Order">Bulk Order</option>
                        <option value="Collaboration">Collaboration</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label-sattva">Message *</label>
                      <textarea name="message" className="form-control form-control-sattva" rows="5" placeholder="Write your message here..." value={form.message} onChange={handleChange} required></textarea>
                    </div>
                    <div className="col-12 text-center">
                      <button type="submit" className="btn btn-sattva btn-sattva-primary btn-lg" disabled={submitting}>
                        {submitting ? (
                          <><span className="spinner-border spinner-border-sm me-2"></span>Sending...</>
                        ) : (
                          <>Send Message <i className="bi bi-send ms-1"></i></>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="text-center mt-5 animate-fadeInUp">
            <div className="glass-card p-4 d-inline-block">
              <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '12px' }}>
                <i className="bi bi-whatsapp" style={{ color: '#25d366' }}></i> Prefer WhatsApp?
              </h4>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Chat with us directly for quick responses!
              </p>
              <a
                href="https://wa.me/918141887992?text=Hi%20Sattva%20Care!%20I%20have%20a%20query%20about%20your%20herbal%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg"
                style={{ background: '#25d366', color: 'white', borderRadius: 'var(--radius-xl)', padding: '12px 32px', fontFamily: 'var(--font-accent)', fontWeight: 600 }}
              >
                <i className="bi bi-whatsapp me-2"></i>Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
