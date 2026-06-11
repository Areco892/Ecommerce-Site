import express from 'express';
import { getPool } from '../db/index.js';

const router = express.Router();

// GET /api/products — fetch all products (with optional category filter)
router.get('/', async (req, res) => {
  const { category } = req.query;
  try {
    let query = 'SELECT * FROM products';
    const params = [];

    if (category) {
      query += ' WHERE category = $1';
      params.push(category);
    }

    query += ' ORDER BY created_at DESC';

    const result = await getPool().query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id — fetch a single product by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getPool().query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching product:', err.message);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

export default router;