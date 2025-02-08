"use client";  // This makes it a client-side component

import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import Link from "next/link";
import './product.css';  // Import the specific styles for this component

type ProductCardProps = {
  _id: string;
  title: string;
  description?: string;
  discountPercentage?: number;
  price: number;
  imageUrl?: string;
  slug: { current: string };
  addToCart: (product: { name: string; price: number; quantity: number }) => void;
};

export default function ProductCard({
  _id,
  title,
  description = "No Description Available",
  discountPercentage,
  price,
  imageUrl,
  slug,
  addToCart,
}: ProductCardProps) {
  const handleAddToCart = () => {
    const product = { name: title, price, quantity: 1 };  // Define the product object
    addToCart(product);  // Add the item to the cart
    console.log("Item added to cart");
  };

  const handleRentOnWhatsApp = () => {
    const message = `Hi, I am interested in renting the ${title}. Can you provide more details?`;  // Custom message
    const phoneNumber = "923242304044";  // Replace with your WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");  // Open WhatsApp in a new tab
  };

  return (
    <div className="product-card">
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="product-image" />
      ) : (
        <div className="placeholder">
          <p>No Image Available</p>
        </div>
      )}

      <h2 className="product-title">{title}</h2>

      {/* ✅ Chhoti si Description Show Karega */}
      <p className="product-description">
        {description.length > 50
          ? description.substring(0, 50) + "..." // Sirf 50 characters tak
          : description}
      </p>

      {discountPercentage && <p className="product-discount">Discount: {discountPercentage}%</p>}

      <p className="product-price">${price ? price.toFixed(2) : "N/A"}</p>

      {/* ✅ View Details Button (Slug Page per Full Description dikhegi) */}
      <Link href={`/product/${slug.current}`} className="view-details">
        View Details
      </Link>

      {/* Add to Cart button */}
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>

      {/* Rent on WhatsApp button */}
      <button className="rent-on-whatsapp-btn" onClick={handleRentOnWhatsApp}>
        Rent on WhatsApp
      </button>
    </div>
  );
}
