"use client";
import Link from 'next/link';
import './blog.css';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "How to Choose the Best Furniture for Your Temporary Home",
      description: "Discover tips to make your rented space comfortable and stylish...",
      slug: "how-to-choose-the-best-furniture-for-your-temporary-home",
      image: "/images/living-room.webp"
    },
    {
      id: 2,
      title: "Sustainable Furniture: Why Renting is Better for the Environment",
      description: "Renting furniture is a more sustainable way to furnish your home. Here's how...",
      slug: "sustainable-furniture",
      image: "/images/office.jpg"
    },
    {
      id: 3,
      title: "Create Your Dream Home with These 5 Simple Furniture Hacks",
      description: "Transform any space into a stylish, functional home with these easy tips...",
      slug: "furniture-hacks",
      image: "/images/bed-room (2).jpg"
    },
  ];

  return (
    <section className="blog-section">
      <header className="blog-hero">
        <h1>Furnish Your Life with Style: Expert Tips, Tricks, and Inspirations</h1>
        <p>Stay updated with the latest in furniture rental trends, home decor, and more.</p>
      </header>

      <div className="blog-grid">
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-card">
            <img src={post.image} alt={post.title} />
            <div className="blog-card-content">
              <h3 className="blog-category">Furniture Rental Tips</h3>
              <h2 className="blog-title">{post.title}</h2>
              <p className="blog-description">{post.description}</p>
              <Link href={`/blog/${post.slug}`} className="read-more">Read More</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
