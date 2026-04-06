import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar({ theme, toggleTheme }) {
  const { getCartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on nav
  const closeMenu = () => {
    const navCollapse = document.getElementById('navbarNav');
    if (navCollapse && navCollapse.classList.contains('show')) {
      navCollapse.classList.remove('show');
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-sattva fixed-top ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand navbar-brand-sattva" to="/" onClick={closeMenu}>
          {/* SVG Logo */}
          <svg className="brand-logo" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="25" r="24" fill="#2d6a4f" opacity="0.1" stroke="#2d6a4f" strokeWidth="1"/>
            <path d="M25 8C25 8 15 15 15 25C15 30.5 19.5 35 25 35C30.5 35 35 30.5 35 25C35 15 25 8 25 8Z" fill="#2d6a4f" opacity="0.8"/>
            <path d="M25 12C25 12 18 18 18 25C18 28.9 21.1 32 25 32C28.9 32 32 28.9 32 25C32 18 25 12 25 12Z" fill="#40916c"/>
            <path d="M25 16L25 30" stroke="white" strokeWidth="1.5" opacity="0.6"/>
            <path d="M25 20C27 18 29 19 29 21" stroke="white" strokeWidth="1" opacity="0.4"/>
            <path d="M25 24C23 22 21 23 21 25" stroke="white" strokeWidth="1" opacity="0.4"/>
            <text x="25" y="45" textAnchor="middle" fill="#2d6a4f" fontSize="5" fontFamily="serif" fontWeight="bold">SATTVA</text>
          </svg>
          <div>
            <span className="brand-name">Sattva Care</span>
            <span className="brand-tagline">Natural. Safe. Effective.</span>
          </div>
        </Link>

        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-label="Toggle navigation">
          <i className="bi bi-list" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-sattva ${isActive ? 'active' : ''}`} to="/" onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-sattva ${isActive ? 'active' : ''}`} to="/shop" onClick={closeMenu}>
                Shop
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-sattva ${isActive ? 'active' : ''}`} to="/about" onClick={closeMenu}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-sattva ${isActive ? 'active' : ''}`} to="/contact" onClick={closeMenu}>
                Contact
              </NavLink>
            </li>
            <li className="nav-item ms-lg-2">
              <NavLink className={({ isActive }) => `nav-link nav-link-sattva position-relative ${isActive ? 'active' : ''}`} to="/cart" onClick={closeMenu}>
                <i className="bi bi-bag" style={{ fontSize: '1.15rem' }}></i>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </NavLink>
            </li>
            <li className="nav-item ms-lg-2">
              <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                {theme === 'light' ? <i className="bi bi-moon-fill"></i> : <i className="bi bi-sun-fill"></i>}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
