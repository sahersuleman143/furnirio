// src/app/components/Cart.tsx
"use client"; // Add this line at the top to mark this as a client component

import React from "react";
import CartItem from "../components/CartItem";
import { useCart } from "../../contexts/CartContext"; // Correct path se import karein
import "../cart/cart.css"; // CSS Import
import { useRouter } from 'next/navigation'; // Import useRouter

const Cart: React.FC = () => {
  const { cart, addToCart, clearCart } = useCart(); // useCart ko use karein
  const router = useRouter(); // useRouter hook ko initialize karein

  // Handle Checkout Button Click
  const handleProceedToCheckout = () => {
    router.push("/checkout"); // Checkout page par navigate karein
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>
      <div className="cart-items">
        {cart.map((item: { name: string; price: number; quantity: number; }, index: React.Key | null | undefined) => (
          <CartItem
            key={index}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
          />
        ))}
      </div>
      <div className="cart-summary">
        <p>Total: ${cart.reduce((acc: number, item: { price: number; quantity: number; }) => acc + item.price * item.quantity, 0)}</p>
        <button className="checkout-btn" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
