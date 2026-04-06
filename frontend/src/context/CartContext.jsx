import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('sattva-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('sattva-cart', JSON.stringify(cart));
  }, [cart]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const addToCart = (product, variant, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.productId === product.id && item.variant.size === variant.size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        addToast(`Updated ${product.name} (${variant.size}) quantity!`);
        return updated;
      }

      addToast(`${product.name} (${variant.size}) added to cart! 🌿`);
      return [...prev, {
        productId: product.id,
        name: product.name,
        slug: product.slug,
        image: product.image,
        variant,
        quantity,
      }];
    });
  };

  const removeFromCart = (productId, size) => {
    setCart(prev => {
      const item = prev.find(i => i.productId === productId && i.variant.size === size);
      if (item) addToast(`${item.name} removed from cart`, 'info');
      return prev.filter(i => !(i.productId === productId && i.variant.size === size));
    });
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity < 1) return;
    setCart(prev =>
      prev.map(item =>
        item.productId === productId && item.variant.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.variant.price * item.quantity, 0);
  };

  const getCartMRP = () => {
    return cart.reduce((total, item) => total + item.variant.mrp * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart, toasts, addToCart, removeFromCart, updateQuantity,
      clearCart, getCartTotal, getCartMRP, getCartCount, addToast
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
