import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { getPool } from './db/index.js';
import productsRouter from './routes/products.js';
import cartRouter from './routes/cart.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});