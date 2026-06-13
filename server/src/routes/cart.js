import express from 'express';
import { getPool } from '../db/index.js';

const router = express.Router();

// GET /api/cart/:userId — get a user's cart with product details
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    // Find or create cart for user
    let cart = await getPool().query(
      'SELECT * FROM carts WHERE user_id = $1',
      [userId]
    );

    if (cart.rows.length === 0) {
      cart = await getPool().query(
        'INSERT INTO carts (user_id) VALUES ($1) RETURNING *',
        [userId]
      );
    }

    const cartId = cart.rows[0].id;

    // Get cart items with product details
    const items = await getPool().query(
      `SELECT ci.id, ci.quantity, ci.cart_id,
              p.id as product_id, p.title, p.price, p.image_url, p.category
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.cart_id = $1`,
      [cartId]
    );

    res.json({ cartId, items: items.rows });
  } catch (err) {
    console.error('Error fetching cart:', err.message);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// POST /api/cart/:userId/items — add item to cart
router.post('/:userId/items', async (req, res) => {
  const { userId } = req.params;
  const { product_id, quantity = 1 } = req.body;

  if (!product_id) {
    return res.status(400).json({ error: 'product_id is required' });
  }

  try {
    // Find or create cart
    let cart = await getPool().query(
      'SELECT * FROM carts WHERE user_id = $1',
      [userId]
    );

    if (cart.rows.length === 0) {
      cart = await getPool().query(
        'INSERT INTO carts (user_id) VALUES ($1) RETURNING *',
        [userId]
      );
    }

    const cartId = cart.rows[0].id;

    // If item already in cart, increment quantity
    const existing = await getPool().query(
      'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2',
      [cartId, product_id]
    );

    let item;
    if (existing.rows.length > 0) {
      item = await getPool().query(
        'UPDATE cart_items SET quantity = quantity + $1 WHERE id = $2 RETURNING *',
        [quantity, existing.rows[0].id]
      );
    } else {
      item = await getPool().query(
        'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [cartId, product_id, quantity]
      );
    }

    res.status(201).json(item.rows[0]);
  } catch (err) {
    console.error('Error adding to cart:', err.message);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// DELETE /api/cart/:userId/items/:itemId — remove item from cart
router.delete('/:userId/items/:itemId', async (req, res) => {
  const { itemId } = req.params;
  try {
    await getPool().query('DELETE FROM cart_items WHERE id = $1', [itemId]);
    res.json({ message: 'Item removed' });
  } catch (err) {
    console.error('Error removing item:', err.message);
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

export default router;