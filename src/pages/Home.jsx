import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
        // Ambil 4 produk pertama sebagai featured
        setFeaturedProducts(data.products.slice(0, 4));
      })
      .catch(error => console.error('Error loading products:', error));
  }, []);

  return (
    <div>
      <Banner />
      
      <section className="container">
        <h2 style={{ marginBottom: '2rem', fontSize: '2rem', color: '#1f2937' }}>
          Produk Unggulan
        </h2>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart}
            />
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
            Masih banyak produk menarik lainnya!
          </p>
          <a href="/products" className="btn">Lihat Semua Produk</a>
        </div>
      </section>
    </div>
  );
};

export default Home;