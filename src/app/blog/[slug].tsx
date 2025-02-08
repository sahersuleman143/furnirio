"use client";
import { useRouter } from 'next/router';
import './post.css';

export default function BlogPostPage() {
  const router = useRouter();
  const { slug } = router.query;  // Getting the dynamic slug from the URL

  // Sample data (In real implementation, you can fetch it from an API or database)
  const blogPosts: { [key: string]: { title: string; content: string } } = {
    "how-to-choose-the-best-furniture-for-your-temporary-home": {
      title: "How to Choose the Best Furniture for Your Temporary Home",
      content: "When you move into a temporary living space, renting furniture can be the best option. Here's a guide to choosing the right pieces for your home..."
    },
    "sustainable-furniture": {
      title: "Sustainable Furniture: Why Renting is Better for the Environment",
      content: "Renting furniture reduces waste, and it’s a more eco-friendly choice. In this post, we discuss why renting makes a positive environmental impact..."
    },
    "furniture-hacks": {
      title: "Create Your Dream Home with These 5 Simple Furniture Hacks",
      content: "Learn how to make your space look great with minimal investment. Here are 5 simple hacks you can do with rented furniture..."
    }
  };

  // If slug is not available yet, return loading state
  if (!slug) {
    return <h1>Loading...</h1>;
  }

  // Ensure slug is a string before using it
  const slugString = Array.isArray(slug) ? slug[0] : slug;

  // Fetch the specific blog post using the slug
  const post = blogPosts[slugString];

  if (!post) {
    return <h1>Post not found</h1>;  // Error handling if the post does not exist
  }

  return (
    <section className="post-section">
      <header className="post-header">
        <h1>{post?.title}</h1>
      </header>
      <article className="post-content">
        <p>{post?.content}</p>
      </article>
    </section>
  );
}
