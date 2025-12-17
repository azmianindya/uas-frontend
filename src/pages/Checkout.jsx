import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cart, clearCart }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'bank_transfer'
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Nama harus diisi';
    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email tidak valid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Nomor telepon harus diisi';
    if (!formData.address.trim()) newErrors.address = 'Alamat harus diisi';
    if (!formData.city.trim()) newErrors.city = 'Kota harus diisi';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Kode pos harus diisi';
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulasi proses checkout
    setTimeout(() => {
      const orderId = 'ORD' + Date.now();
      alert(`Pesanan berhasil! ID Pesanan: ${orderId}\nKami akan menghubungi Anda untuk konfirmasi.`);
      clearCart();
      navigate('/');
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="container checkout-container" style={{ paddingTop: '2rem' }}>
      {/* Header Section - Simplified */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        {/* Back Button */}
        <button 
          onClick={() => navigate('/cart')}
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
          Checkout
        </h1>

        {/* Empty div untuk balance layout */}
        <div style={{ width: '120px' }}></div>
      </div>
      
      <div className="checkout-form">
        <h2 style={{ 
          marginBottom: '1.5rem', 
          textAlign: 'center',
          color: '#4b5563'
        }}>
          Informasi Pengiriman
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nama Lengkap *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Masukkan nama lengkap"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="contoh@email.com"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Nomor Telepon *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="081234567890"
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Alamat Lengkap *</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Masukkan alamat lengkap"
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="city">Kota *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Nama kota"
              />
              {errors.city && <span className="error">{errors.city}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="postalCode">Kode Pos *</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                placeholder="12345"
              />
              {errors.postalCode && <span className="error">{errors.postalCode}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="paymentMethod">Metode Pembayaran *</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
            >
              <option value="bank_transfer">Transfer Bank</option>
              <option value="credit_card">Kartu Kredit</option>
              <option value="cod">Bayar di Tempat (COD)</option>
            </select>
          </div>
          
          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f3f4f6', borderRadius: '5px' }}>
            <h3 style={{ marginBottom: '1rem' }}>Ringkasan Pesanan</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Total Items:</span>
              <span>{cart.reduce((total, item) => total + item.quantity, 0)} items</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
              <span>Total Pembayaran:</span>
              <span>Rp {calculateTotal().toLocaleString('id-ID')}</span>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn"
            style={{ 
              width: '100%', 
              marginTop: '2rem',
              marginBottom: '3rem' // Jarak antara button dan footer
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Memproses...' : 'Konfirmasi Pesanan'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;