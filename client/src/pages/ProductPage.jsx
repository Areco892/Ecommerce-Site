import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../api/products';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductById(id)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.back}>← Back</button>
      <div style={styles.content}>
        <img src={product.image_url} alt={product.title} style={styles.image} />
        <div style={styles.details}>
          <h1>{product.title}</h1>
          <p style={styles.category}>{product.category}</p>
          <p style={styles.description}>{product.description}</p>
          <p style={styles.price}>${product.price}</p>
          <button style={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px',
  },
  back: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '24px',
    padding: 0,
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '48px',
  },
  image: {
    width: '100%',
    borderRadius: '8px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  category: {
    color: '#888',
    textTransform: 'capitalize',
    margin: 0,
  },
  description: {
    lineHeight: '1.6',
    margin: 0,
  },
  price: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '12px',
  },
};

export default ProductPage;