"use client";
import { useState, useContext } from 'react';
import { CartContext } from "../../contexts/CartContext";  // CartContext ko import karein
import { useRouter } from "next/navigation";  // useRouter hook ko import karein
import './shop.css';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useContext(CartContext);  // CartContext ka use
  const router = useRouter();  // useRouter ka hook use karein

  const products = [
    { id: 1, src: '/images/wooden-chair.webp', alt: 'wooden-chair', category: 'Furniture', title: 'Wooden Chair', price: '$16.00' },
    { id: 2, src: '/images/dining-table.jpg', alt: 'dining-table', category: 'Furniture', title: 'Dining Table', price: '$21.15' },
    { id: 3, src: '/images/office-tc.jpg', alt: 'office-tc', category: 'Office', title: 'Office Table', price: '$12.00' },
    { id: 4, src: '/images/multi-chair.jpg', alt: 'Multi-Chair', category: 'Chairs', title: 'Unique Chairs', price: '$18.40' },
    { id: 5, src: '/images/chair1.webp', alt: 'Chair1', category: 'Chairs', title: 'Unique Chair', price: '$16.00' },
    { id: 6, src: '/images/sofaSet2.jpg', alt: 'SofaSet2', category: 'Sofa', title: 'Sofa Set', price: '$21.15' },
    { id: 7, src: '/images/bed-room.jpg', alt: 'Bed-Room', category: 'Bedroom', title: 'Bed Room', price: '$12.00' },
    { id: 8, src: '/images/baba-table.jpg', alt: 'baba-table', category: 'Tables', title: 'Stylish Table', price: '$18.40' },
  ];

  const categories = ['All', 'Furniture', 'Office', 'Chairs', 'Sofa', 'Bedroom', 'Tables'];
  const filteredProducts = selectedCategory === 'All' ? products : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product) => {
    const productToAdd = { name: product.title, price: parseFloat(product.price.slice(1)), quantity: 1 };
    addToCart(productToAdd);  // Cart mein product ko add karna
    console.log(`${product.title} added to cart.`);

    router.push("/cart");  // Cart page pe navigate karna
  };

  return (
    <section className="shop-section">
      <div className="filter-container">
        {categories.map(category => (
          <button key={category} onClick={() => setSelectedCategory(category)} className={selectedCategory === category ? 'active' : ''}>
            {category}
          </button>
        ))}
      </div>

      <div className="shop-container">
        {filteredProducts.map((product) => (
          <div key={product.id} className="shop-card">
            <img src={product.src} alt={product.alt} />
            <div className="shop-card-content">
              <h3 className="shop-card-category">{product.category}</h3>
              <h2 className="shop-card-title">{product.title}</h2>
              <p className="shop-card-price">{product.price}</p>
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>  {/* Add to Cart button */}
              <a href={`https://wa.me/923242304044?text=I%20am%20interested%20in%20renting%20${encodeURIComponent(product.title)}`} className="whatsapp-btn" target="_blank" rel="noopener noreferrer">Rent on WhatsApp</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
