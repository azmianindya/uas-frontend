import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <section className="hero">
      <div className="container">
        <h1>Selamat Datang di TechStyle</h1>
        <p>Temukan produk terbaik dengan harga spesial hanya untuk Anda. Belanja sekarang dan dapatkan pengalaman berbelanja online yang mudah dan aman.</p>
        <Link to="/products" className="btn">Belanja Sekarang</Link>
      </div>
    </section>
  );
};

export default Banner;