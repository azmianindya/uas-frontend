import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartItemCount }) => {
  return (
    <header>
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo">TechStyle</Link>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li className="cart-link">
              <Link to="/cart">Cart</Link>
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;