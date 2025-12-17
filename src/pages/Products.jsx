import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      })
      .catch(error => console.error('Error loading products:', error));
  }, []);

  useEffect(() => {
    let results = products;
    
    if (searchTerm) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter) {
      results = results.filter(product => product.category === categoryFilter);
    }
    
    setFilteredProducts(results);
  }, [searchTerm, categoryFilter, products]);

  const categories = ['all', ...new Set(products.map(product => product.category))];

  return (
    <div className="container">
      {/* TAMBAH MARGIN TOP DI SINI untuk jarak dengan header navbar */}
      <div style={{ marginTop: '2rem' }}>
        <div className="products-header">
          <h1>Semua Produk</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">Semua Kategori</option>
              {categories.filter(cat => cat !== 'all').map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <p style={{ marginBottom: '2rem', color: '#6b7280' }}>
        Menampilkan {filteredProducts.length} produk
      </p>
      
      {filteredProducts.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem',
          marginBottom: '3rem'
        }}>
          <h3>Produk tidak ditemukan</h3>
          <p>Coba kata kunci atau kategori yang berbeda</p>
        </div>
      ) : (
        <div className="products-grid" style={{ marginBottom: '3rem' }}>
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;