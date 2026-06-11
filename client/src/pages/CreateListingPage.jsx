import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../api/products';

const CATEGORIES = ['art', 'photography', 'music'];

const CreateListingPage = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: 'art',
    image_url: '',
    file_url: '',
    quantity: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await createProduct({ ...form, price: parseFloat(form.price) });
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.back}>← Back</button>
      <h1>Create a New Listing</h1>

      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          style={styles.input}
        />

        <label style={styles.label}>Price ($) *</label>
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Category *</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          style={styles.input}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <label style={styles.label}>Image URL</label>
        <input
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          style={styles.input}
        />

        <label style={styles.label}>File URL</label>
        <input
          name="file_url"
          value={form.file_url}
          onChange={handleChange}
          style={styles.input}
        />

        <label style={styles.label}>Quantity</label>
        <input
          name="quantity"
          type="number"
          min="1"
          value={form.quantity}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" disabled={submitting} style={styles.button}>
          {submitting ? 'Creating...' : 'Create Listing'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '14px',
    marginTop: '8px',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
};

export default CreateListingPage;