import { createClient } from "next-sanity";

// Initialize the Sanity client
const client = createClient({
  projectId: "nwqdwao6", // Your Sanity project ID
  dataset: "production", // Your dataset name
  apiVersion: "2024-02-07", // Use the latest API version
  useCdn: true, // Use `false` if you need the latest data
});

// Function to fetch data from Sanity
export async function sanityFetch({ query, params = {} }: { query: string; params?: any }) {
  return await client.fetch(query, params); // Use `client` here for fetching
}
