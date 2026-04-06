import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [category, sort]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (category !== 'all') params.category = category;
      if (sort) params.sort = sort;
      if (search) params.search = search;
      const res = await api.getProducts(params);
      if (res.success) setProducts(res.data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const categories = [
    { value: 'all', label: 'All Products', icon: 'bi-grid' },
    { value: 'shampoo', label: 'Shampoo', icon: 'bi-droplet' },
    { value: 'hair-oil', label: 'Hair Oil', icon: 'bi-moisture' },
    { value: 'soap', label: 'Soap', icon: 'bi-flower2' },
  ];

  return (
    <div className="page-enter" style={{ paddingTop: '100px' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <span className="section-label">🛒 Shop</span>
          <h1 className="section-title">Our <span className="highlight">Herbal</span> Collection</h1>
          <p className="section-subtitle mb-4">Explore our range of handcrafted natural products</p>
        </div>

        {/* Filters */}
        <div className="row mb-4 g-3">
          <div className="col-lg-6">
            {/* Category Filter - Bootstrap Button Group */}
            <div className="btn-group flex-wrap" role="group">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  className={`btn ${category === cat.value ? 'btn-sattva btn-sattva-primary' : 'btn btn-outline-secondary'}`}
                  onClick={() => setCategory(cat.value)}
                  style={{ borderRadius: 'var(--radius-xl)', margin: '4px' }}
                >
                  <i className={`bi ${cat.icon} me-1`}></i> {cat.label}
                </button>
              ))}
            </div>
          </div>
          <div className="col-lg-3">
            {/* Sort Dropdown */}
            <select
              className="form-select form-control-sattva"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
          <div className="col-lg-3">
            {/* Search */}
            <form onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control form-control-sattva"
                  placeholder="Search products..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <button className="btn btn-sattva btn-sattva-primary" type="submit" style={{ borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No products found</h3>
            <p className="text-muted">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="row g-4">
            {products.map((product, i) => (
              <div key={product.id} className={`col-lg-4 col-md-6`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Coupon Banner */}
        <div className="glass-card text-center p-4 mt-5">
          <h4 style={{ fontFamily: 'var(--font-heading)' }}>🏷️ Special Offers</h4>
          <p className="mb-3" style={{ color: 'var(--text-secondary)' }}>Use these coupon codes at checkout:</p>
          <div className="d-flex justify-content-center flex-wrap gap-3">
            <span className="badge rounded-pill" style={{ background: 'var(--primary-gradient)', padding: '10px 20px', fontSize: '0.9rem' }}>
              WELCOME10 - 10% Off
            </span>
            <span className="badge rounded-pill" style={{ background: 'var(--accent-gradient)', padding: '10px 20px', fontSize: '0.9rem' }}>
              HERBAL20 - 20% Off (₹499+)
            </span>
            <span className="badge rounded-pill bg-dark" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
              FLAT50 - ₹50 Off (₹399+)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
