import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">Rp {product.price.toLocaleString('id-ID')}</p>
        <span className="product-category">{product.category}</span>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button 
            onClick={() => onAddToCart(product)}
            className="btn-add-to-cart"
          >
            Add to Cart
          </button>
          <Link to={`/product/${product.id}`} className="btn btn-secondary" style={{ padding: '0.8rem' }}>
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;