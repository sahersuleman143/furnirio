"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { client } from "@/sanity/lib/client";
import "./checkout.css";

// ✅ CartItem ka type define kiya
interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  // ✅ TypeScript Error Fixed (Added number type for acc)
  const totalAmount = cart.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0);

  // ✅ Input change handler fix kiya
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Form validation
  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== "");
  };

  const handlePlaceOrder = async () => {
    if (!isFormValid()) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      const orderData = {
        _type: "order",
        customerName: formData.fullName,
        shippingAddress: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        phone: formData.phone,
        email: formData.email,
        cartItems: cart.map((item: CartItem) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount,
        createdAt: new Date().toISOString(),
      };

      await client.create(orderData);
      clearCart(); // ✅ Order hone ke baad cart clear karna
      router.push("/thank-you");
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Order placement failed. Please try again.");
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout Page</h1>

      <div className="cart-summary">
        <h2>Your Cart Items:</h2>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item: CartItem, index: number) => (
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
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} required />
        <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleInputChange} required />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
      </div>

      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>

      <button className="go-home-btn" onClick={() => router.push("/")}>
        Go to Home
      </button>
    </div>
  );
};

export default CheckoutPage;
