const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Data file paths
const DATA_DIR = path.join(__dirname, 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');
const COUPONS_FILE = path.join(DATA_DIR, 'coupons.json');

// Helper functions
const readJSON = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeJSON = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// ========== PRODUCT ROUTES ==========

// GET all products
app.get('/api/products', (req, res) => {
  try {
    const products = readJSON(PRODUCTS_FILE);
    const { category, search, sort } = req.query;

    let filtered = [...products];

    // Filter by category
    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    // Search by name
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    if (sort === 'price-low') {
      filtered.sort((a, b) => a.variants[0].price - b.variants[0].price);
    } else if (sort === 'price-high') {
      filtered.sort((a, b) => b.variants[0].price - a.variants[0].price);
    } else if (sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    res.json({ success: true, data: filtered });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching products' });
  }
});

// GET single product by slug
app.get('/api/products/:slug', (req, res) => {
  try {
    const products = readJSON(PRODUCTS_FILE);
    const product = products.find(p => p.slug === req.params.slug || p.id === req.params.slug);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching product' });
  }
});

// GET products by category
app.get('/api/products/category/:category', (req, res) => {
  try {
    const products = readJSON(PRODUCTS_FILE);
    const filtered = products.filter(p => p.category === req.params.category);
    res.json({ success: true, data: filtered });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching products' });
  }
});

// ========== ORDER ROUTES ==========

// POST create order
app.post('/api/orders', (req, res) => {
  try {
    const { customer, items, subtotal, shipping, discount, total, paymentMethod, couponCode } = req.body;

    // Validation
    if (!customer || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Customer info and items are required' });
    }

    if (!customer.name || !customer.phone || !customer.address || !customer.city || !customer.pincode) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields' });
    }

    const orders = readJSON(ORDERS_FILE);
    const orderId = 'ORD-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();

    const newOrder = {
      id: orderId,
      customer,
      items,
      subtotal,
      shipping,
      discount: discount || 0,
      total,
      paymentMethod: paymentMethod || 'qr',
      couponCode: couponCode || null,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    orders.push(newOrder);
    writeJSON(ORDERS_FILE, orders);

    res.status(201).json({ success: true, data: newOrder, message: 'Order placed successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error placing order' });
  }
});

// GET order by ID
app.get('/api/orders/:id', (req, res) => {
  try {
    const orders = readJSON(ORDERS_FILE);
    const order = orders.find(o => o.id === req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching order' });
  }
});

// ========== REVIEW ROUTES ==========

// GET reviews for a product
app.get('/api/reviews/:productId', (req, res) => {
  try {
    const reviews = readJSON(REVIEWS_FILE);
    const productReviews = reviews.filter(r => r.productId === req.params.productId);
    res.json({ success: true, data: productReviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching reviews' });
  }
});

// POST create review
app.post('/api/reviews', (req, res) => {
  try {
    const { productId, name, rating, comment } = req.body;

    if (!productId || !name || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const reviews = readJSON(REVIEWS_FILE);
    const newReview = {
      id: 'rev-' + uuidv4().substring(0, 8),
      productId,
      name,
      rating: parseInt(rating),
      comment,
      date: new Date().toISOString().split('T')[0],
      verified: false
    };

    reviews.push(newReview);
    writeJSON(REVIEWS_FILE, reviews);

    // Update product rating
    const products = readJSON(PRODUCTS_FILE);
    const product = products.find(p => p.id === productId);
    if (product) {
      const productReviews = reviews.filter(r => r.productId === productId);
      const avgRating = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
      product.rating = Math.round(avgRating * 10) / 10;
      product.reviewCount = productReviews.length;
      writeJSON(PRODUCTS_FILE, products);
    }

    res.status(201).json({ success: true, data: newReview, message: 'Review submitted successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error submitting review' });
  }
});

// ========== CONTACT ROUTES ==========

// POST contact form
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email and message are required' });
    }

    const contacts = readJSON(CONTACTS_FILE);
    const newContact = {
      id: 'cnt-' + uuidv4().substring(0, 8),
      name,
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
      createdAt: new Date().toISOString(),
      read: false
    };

    contacts.push(newContact);
    writeJSON(CONTACTS_FILE, contacts);

    res.status(201).json({ success: true, message: 'Message sent successfully! We will get back to you soon.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error sending message' });
  }
});

// ========== COUPON ROUTES ==========

// POST validate coupon
app.post('/api/coupon/validate', (req, res) => {
  try {
    const { code, orderTotal } = req.body;

    if (!code) {
      return res.status(400).json({ success: false, message: 'Coupon code is required' });
    }

    const coupons = readJSON(COUPONS_FILE);
    const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.active);

    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Invalid or expired coupon code' });
    }

    if (orderTotal < coupon.minOrder) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount of ₹${coupon.minOrder} required for this coupon`
      });
    }

    let discountAmount;
    if (coupon.type === 'percentage') {
      discountAmount = Math.min((orderTotal * coupon.discount) / 100, coupon.maxDiscount);
    } else {
      discountAmount = coupon.discount;
    }

    res.json({
      success: true,
      data: {
        code: coupon.code,
        discount: Math.round(discountAmount),
        description: coupon.description
      },
      message: `Coupon applied! You save ₹${Math.round(discountAmount)}`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error validating coupon' });
  }
});

// ========== STATS ROUTE ==========

app.get('/api/stats', (req, res) => {
  try {
    const products = readJSON(PRODUCTS_FILE);
    const orders = readJSON(ORDERS_FILE);
    const reviews = readJSON(REVIEWS_FILE);

    res.json({
      success: true,
      data: {
        totalProducts: products.length,
        totalOrders: orders.length,
        totalReviews: reviews.length,
        averageRating: products.reduce((sum, p) => sum + p.rating, 0) / products.length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching stats' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🌿 Sattva Care Backend Server Running!`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`📦 API: http://localhost:${PORT}/api/products`);
  console.log(`\n✅ Ready to serve herbal goodness!\n`);
});
