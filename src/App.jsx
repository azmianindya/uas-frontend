import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header cartItemCount={cartItemCount} />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/products" element={<Products addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="/cart" element={
              <Cart 
                cart={cart} 
                removeFromCart={removeFromCart} 
                updateQuantity={updateQuantity}
              />
            } />
            <Route path="/checkout" element={
              <Checkout 
                cart={cart} 
                clearCart={clearCart}
              />
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;