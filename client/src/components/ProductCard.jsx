const ProductCard = ({ product }) => {
  return (
    <div style={styles.card}>
      <img src={product.image_url} alt={product.title} style={styles.image} />
      <div style={styles.info}>
        <h3 style={styles.title}>{product.title}</h3>
        <p style={styles.category}>{product.category}</p>
        <p style={styles.price}>${product.price}</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  info: {
    padding: '12px',
  },
  title: {
    margin: '0 0 4px',
    fontSize: '16px',
  },
  category: {
    margin: '0 0 4px',
    fontSize: '12px',
    color: '#888',
    textTransform: 'capitalize',
  },
  price: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: '16px',
  },
};

export default ProductCard;