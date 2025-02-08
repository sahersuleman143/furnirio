"use client";  // Ensures this is a client-side component

import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import ProductCard from "@/components/productCard";  // Correct import path
import { useRouter } from "next/navigation";  // Correct usage of useRouter

type ProductGridProps = {
  products: { _id: string; title: string; description: string; price: number; imageUrl?: string; slug: { current: string } }[];
};

const ProductGrid = ({ products }: ProductGridProps) => {
  const { addToCart } = useContext(CartContext);  // useContext to add to cart
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();  // Use useRouter hook

  useEffect(() => {
    setIsClient(true);  // Ensure we are on the client-side
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);  // Add product to cart
    console.log("Item added to cart");
    router.push("/cart");  // Redirect to cart page after adding to cart
  };

  if (!isClient) {
    return null;  // Return null until client-side rendering is enabled
  }

  return (
    <div className="product-grid">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="product-card">
            <ProductCard {...product} addToCart={handleAddToCart} />
          </div>
        ))
      ) : (
        <p>No products available at the moment.</p>
      )}
    </div>
  );
};

export default ProductGrid;
