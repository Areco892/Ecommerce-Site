import { createContext, useContext, useEffect, useState } from 'react';

const BASE_URL = 'http://localhost:5001/api';
const USER_ID = 1; // hardcoded until auth is implemented

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ cartId: null, items: [] });
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await fetch(`${BASE_URL}/cart/${USER_ID}`);
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error('Failed to fetch cart:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await fetch(`${BASE_URL}/cart/${USER_ID}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, quantity }),
      });
      await fetchCart();
    } catch (err) {
      console.error('Failed to add to cart:', err.message);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await fetch(`${BASE_URL}/cart/${USER_ID}/items/${itemId}`, {
        method: 'DELETE',
      });
      await fetchCart();
    } catch (err) {
      console.error('Failed to remove from cart:', err.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);