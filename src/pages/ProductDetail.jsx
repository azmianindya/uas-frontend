import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => {
        const foundProduct = data.products.find(p => p.id === parseInt(id));
        if (foundProduct) {
          setProduct(foundProduct);
        }
      })
      .catch(error => console.error('Error loading product:', error));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert('Produk berhasil ditambahkan ke keranjang!');
      navigate('/cart');
    }
  };

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <h2>Produk tidak ditemukan</h2>
          <button onClick={() => navigate('/products')} className="btn">
            Kembali ke Produk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Add spacing container */}
      <div style={{ marginTop: '2rem' }}></div> {/* Jarak antara header dan button */}
      
      {/* Back Button - dengan jarak dari atas */}
      <button 
        onClick={() => navigate('/products')}
        style={{ 
          background: 'white',
          border: '2px solid #e2e8f0',
          color: '#4b5563',
          cursor: 'pointer',
          marginBottom: '2rem',
          marginTop: '1rem', /* Tambahan margin top untuk lebih banyak jarak */
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '0.8rem 1.5rem',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '500',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}
        onMouseOver={(e) => {
          e.target.style.borderColor = '#2563eb';
          e.target.style.color = '#2563eb';
          e.target.style.transform = 'translateX(-5px)';
        }}
        onMouseOut={(e) => {
          e.target.style.borderColor = '#e2e8f0';
          e.target.style.color = '#4b5563';
          e.target.style.transform = 'translateX(0)';
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>←</span>
      </button>
      
      <div className="product-detail">
        <div>
          <img src={product.image} alt={product.name} className="product-detail-image" />
        </div>
        
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="product-detail-price">
            Rp {product.price.toLocaleString('id-ID')}
          </p>
          <span className="product-detail-category">
            {product.category}
          </span>
          <p className="product-detail-description">{product.description}</p>
          
          <div style={{ marginBottom: '1rem' }}>
            <strong>Stok Tersedia:</strong> {product.stock} unit
          </div>
          
          <div className="quantity-controls">
            <button onClick={decreaseQuantity} className="quantity-btn">-</button>
            <span className="quantity-display">{quantity}</span>
            <button onClick={increaseQuantity} className="quantity-btn">+</button>
          </div>
          
          <button onClick={handleAddToCart} className="btn" style={{ width: '100%' }}>
            Tambah ke Keranjang - Rp {(product.price * quantity).toLocaleString('id-ID')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;