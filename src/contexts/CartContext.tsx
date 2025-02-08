"use client"; 

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Cart item ka type define karein
type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

// Cart context ko create karein
export const CartContext = createContext<any>(null);

// ✅ Props ke liye type define karein
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ Cart state ko localStorage se load karne ka function
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // ✅ Jab bhi cart update ho, localStorage ko update karein
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Cart mein item add karne ka function
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (cartItem) => cartItem.name === item.name
      );

      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, item];
      }
    });
  };

  // Cart ko clear karne ka function
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart"); // ✅ LocalStorage ko bhi clear karein
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// useCart hook define karein
export const useCart = () => {
  return useContext(CartContext);
};
