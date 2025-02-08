"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ✅ Correct useParams import
import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

import "./product.css";

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  slug: { current: string };
  image?: any;
};

async function fetchProduct(slug: string): Promise<Product | null> {
  const query = groq`
    *[_type == "product" && slug.current == $slug][0]{
      _id,
      title,
      description,
      price,
      slug,
      image
    }
  `;
  return await sanityFetch({ query, params: { slug } });
}

const ProductPage = () => {
  const params = useParams(); // ✅ Next.js 15 ke liye correct tariqa
  const slug = params?.slug as string; // ✅ Slug ko safe cast karein

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    console.log("Fetching product for slug:", slug); // ✅ Debugging ke liye console log

    fetchProduct(slug).then((data) => {
      console.log("Fetched Product Data:", data); // ✅ API se aane wala data check karein
      setProduct(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!product) return <div className="product-not-found">Product not found</div>;

  const imageUrl = product.image ? urlFor(product.image).url() : null;

  return (
    <div className="product-container">
      <div className="product-content">
        <div className="product-image">
          {imageUrl ? (
            <Image src={imageUrl} alt={product.title} width={500} height={500} />
          ) : (
            <p className="no-image">No image available</p>
          )}
        </div>

        <div className="product-details">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
