// src/app/Home.tsx
import { sanityFetch } from "@/sanity/lib/fetch";
import { allProducts } from "@/sanity/lib/queries"; 
import ProductGrid from "./components/ProductGrid";  // Client Component
import "../styles/style.css";  // Custom styles

// Server Component
export default async function Home() {
  // Fetch products data from Sanity
  const products = await sanityFetch({ query: allProducts });

  return (
    <div> 
      <header className="header">
        <h1>Stylish & Affordable Furniture Rentals</h1>
        <p>Furnish your home with ease and flexibility</p>
      </header>

      <div className="hero">
        <img src="/images/hero-image.jpg" alt="Furniture Showcase" className="hero-image" />
        <div className="hero-text">
          <h2>Our Latest Products</h2>
          <p>Furnish your home with ease and flexibility</p>
        </div>
      </div>

      {/* Pass products data to Client Component */}
      <ProductGrid products={products} />
    </div>
  );
}
