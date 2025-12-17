import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>TechStyle</h3>
            <p>Toko online terpercaya dengan berbagai produk berkualitas dan harga terbaik.</p>
          </div>
          <div className="footer-section">
            <h3>Kontak</h3>
            <p>Email: info@TechStyle.com</p>
            <p>Telepon: (021) 1234-5678</p>
          </div>
          <div className="footer-section">
            <h3>Alamat</h3>
            <p>Jl. Teknologi No. 123, Jakarta</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 TechStyle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;