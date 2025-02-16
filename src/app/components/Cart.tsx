"use client"; 

import React from "react";
import CartItem from "./CartItem";
import { useCart } from "../../contexts/CartContext"; // ✅ Correct import path
import "../cart/cart.css"; // ✅ CSS Import
import { useRouter } from 'next/navigation'; // ✅ Router import

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart(); // ✅ removeFromCart add kiya
  const router = useRouter(); 

  // ✅ Checkout button handler
  const handleProceedToCheckout = () => {
    router.push("/checkout"); 
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>
      <div className="cart-items">
        {cart.length > 0 ? (
          cart.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onRemove={removeFromCart} // ✅ Remove button ke liye function pass kiya
            />
          ))
        ) : (
          <p>No items in cart.</p>
        )}
      </div>

      <div className="cart-summary">
        <p>Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
        
        {cart.length > 0 && (
          <>
            <button className="checkout-btn" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
            <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
