"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { client } from '@/sanity/lib/client';
import "./checkout.css";

const CheckoutPage = () => {
  const { cart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  // ✅ Fix: Explicitly define the type of acc as a number
  const totalAmount = cart.reduce((acc: number, item: { price: number; quantity: number; }) => acc + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    try {
      if (!process.env.SANITY_API_TOKEN) {
        alert("Error: Sanity API token is missing. Please check your .env.local file.");
        return;
      }

      const orderData = {
        _type: 'order',
        customerName: formData.fullName,
        shippingAddress: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        phone: formData.phone,
        email: formData.email,
        cartItems: cart.map((item: { name: any; price: any; quantity: any; }) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount,
      };

      const response = await client.create(orderData);
      console.log("Order placed successfully:", response);
      router.push('/thank-you');
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Order placement failed. Please check console logs for details.");
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout Page</h1>

      <div className="cart-summary">
        <h2>Your Cart Items:</h2>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item: { name: string; price: number; quantity: number }, index) => (
              <li key={index} className="cart-item">
                {item.name} - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>

      <div className="total-amount">
        <h3>Total: ${totalAmount.toFixed(2)}</h3>
      </div>

      <div className="shipping-info">
        <h3>Shipping Information:</h3>
        <input type="text" name="fullName" placeholder="Full Name" onChange={handleInputChange} required />
        <input type="text" name="address" placeholder="Address" onChange={handleInputChange} required />
        <input type="text" name="city" placeholder="City" onChange={handleInputChange} required />
        <input type="text" name="postalCode" placeholder="Postal Code" onChange={handleInputChange} required />
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
      </div>

      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>

      <button className="go-home-btn" onClick={() => router.push('/')}>Go to Home</button>
    </div>
  );
};

export default CheckoutPage;
