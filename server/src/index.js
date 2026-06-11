import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { getPool } from './db/index.js';
import productsRouter from './routes/products.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);

app.get('/health', async (req, res) => {
  try {
    await getPool().query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});