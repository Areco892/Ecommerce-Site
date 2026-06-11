const BASE_URL = 'http://localhost:5001/api';

export const fetchProducts = async (category = '') => {
  const url = category
    ? `${BASE_URL}/products?category=${category}`
    : `${BASE_URL}/products`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
};