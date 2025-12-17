import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '2rem' }}>
        {/* Header Section - Simplified */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          {/* Back Button */}
          <button 
            onClick={() => navigate('/products')}
            style={{ 
              background: 'white',
              border: '2px solid #e2e8f0',
              color: '#4b5563',
              cursor: 'pointer',
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

          {/* Title - Sejajar dengan back button */}
          <h1 style={{ 
            fontSize: '1.8rem', 
            fontWeight: '700',
            color: '#1e293b',
            margin: 0
          }}>
            Keranjang Belanja
          </h1>

          {/* Empty div untuk balance layout */}
          <div style={{ width: '120px' }}></div>
        </div>

        {/* Empty Cart State dengan spacing */}
        <div style={{ 
          textAlign: 'center', 
          padding: '5rem 2rem', // Increased padding
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {/* Icon dengan margin */}
          <div style={{ 
            fontSize: '4rem', 
            marginBottom: '1.5rem', // Added spacing
            color: '#cbd5e1'
          }}>
            🛒
          </div>
          
          {/* Judul dengan spacing */}
          <h2 style={{ 
            fontSize: '1.8rem', 
            color: '#334155',
            marginBottom: '1rem', // Added spacing
            fontWeight: '600'
          }}>
            Keranjang Anda Kosong
          </h2>
          
          {/* Deskripsi dengan spacing */}
          <p style={{ 
            color: '#64748b', 
            marginBottom: '2rem', // Increased spacing
            fontSize: '1.1rem',
            lineHeight: '1.6',
            maxWidth: '400px',
            margin: '0 auto 2rem' // Center and add spacing
          }}>
            Tambahkan beberapa produk untuk mulai berbelanja
          </p>
          
          {/* Button dengan spacing */}
          <button 
            onClick={() => navigate('/products')} 
            className="btn"
            style={{ 
              padding: '0.9rem 2.5rem',
              fontSize: '1.1rem',
              marginTop: '0.5rem' // Added spacing above button
            }}
          >
            Lihat Produk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-container" style={{ paddingTop: '2rem' }}>
      {/* Header Section - Simplified */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        {/* Back Button */}
        <button 
          onClick={() => navigate('/products')}
          style={{ 
            background: 'white',
            border: '2px solid #e2e8f0',
            color: '#4b5563',
            cursor: 'pointer',
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

        {/* Title - Sejajar dengan back button */}
        <h1 style={{ 
          fontSize: '1.8rem', 
          fontWeight: '700',
          color: '#1e293b',
          margin: 0
        }}>
          Keranjang Belanja
        </h1>

        {/* Empty div untuk balance layout */}
        <div style={{ width: '120px' }}></div>
      </div>
      
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p className="cart-item-price">Rp {item.price.toLocaleString('id-ID')}</p>
            </div>
            <div className="quantity-controls">
              <button 
                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                className="quantity-btn"
              >
                -
              </button>
              <span className="quantity-display">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="quantity-btn"
              >
                +
              </button>
            </div>
            <div style={{ fontWeight: 'bold' }}>
              Rp {(item.price * item.quantity).toLocaleString('id-ID')}
            </div>
            <button 
              onClick={() => removeFromCart(item.id)}
              className="btn-remove"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <h2>Ringkasan Belanja</h2>
        <div className="summary-row">
          <span>Subtotal ({cart.reduce((total, item) => total + item.quantity, 0)} items)</span>
          <span>Rp {calculateTotal().toLocaleString('id-ID')}</span>
        </div>
        <div className="summary-row">
          <span>Biaya Pengiriman</span>
          <span>Gratis</span>
        </div>
        <div className="summary-row summary-total">
          <span>Total</span>
          <span>Rp {calculateTotal().toLocaleString('id-ID')}</span>
        </div>
        <button 
          onClick={() => navigate('/checkout')}
          className="btn"
          style={{ 
            width: '100%', 
            marginTop: '1.5rem',
            marginBottom: '3rem' // Jarak antara button dan footer
          }}
        >
          Lanjut ke Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;