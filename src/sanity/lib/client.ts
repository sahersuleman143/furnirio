import { createClient } from "next-sanity";

if (!process.env.SANITY_API_TOKEN) {
  console.error("❌ Error: SANITY_API_TOKEN is missing. Make sure to set it in .env.local");
} else {
  console.log("✅ SANITY_API_TOKEN is available");
}

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "nwqdwao6",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-02-07",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, 
});

export async function sanityFetch({ query, params = {} }: { query: string; params?: any }) {
  return await client.fetch(query, params);
}

export async function createOrder(orderData: any) {
  try {
    const response = await client.create(orderData);
    console.log("✅ Order created successfully:", response);
    return response;
  } catch (error) {
    console.error("❌ Error creating order:", error);
    throw error;
  }
}

// Debugging
console.log("🔍 Debugging Environment Variables:");
console.log("Project ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log("Dataset:", process.env.NEXT_PUBLIC_SANITY_DATASET);
console.log("Sanity Token:", process.env.SANITY_API_TOKEN ? "✅ Loaded" : "❌ Missing");
console.log("🔍 Debugging ENV:", process.env);
