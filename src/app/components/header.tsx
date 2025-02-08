"use client";
import Link from "next/link";
import { useState } from "react";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import "../../styles/style.css"; // Yeh import hona chahiye
 // Apni CSS file ka sahi path check karein

const Header = () => {
  const [cartCount, setCartCount] = useState(2); // Example count, replace with actual cart logic

  return (
    <header className="custom-header">
      <div className="header-container">
        {/* Logo */}
        <Link href="/" className="header-logo">
          Furnirio
        </Link>

        {/* Navigation */}
        <nav className="header-nav">
          <Link href="/" className="header-link">Home</Link>
          <Link href="/shop" className="header-link">Shop</Link>
          <Link href="/contact" className="header-link">Contact</Link>
          <Link href="/blog" className="header-link">Blog</Link>
          <Link href="/orders" className="header-link">Orders</Link>
        </nav>

        {/* Search & Cart */}
        <div className="header-actions">
          <div className="header-search">
            <input type="text" placeholder="Search..." className="search-input" />
            <button className="search-button">
              <FiSearch />
            </button>
          </div>

          {/* Cart Icon */}
          <Link href="/cart" className="cart-icon">
            <FiShoppingCart />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
