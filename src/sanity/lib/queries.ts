import { groq } from "next-sanity";

export const allProducts = groq`
  *[_type == "product"]{
    _id,
    title,
    description,
    discountPercentage,
    price,
    "imageUrl": productImage.asset->url, // Fetch the image URL
    "slug": slug.current // Corrected the slug reference
  }
`;

export const fourProducts = groq`
  *[_type == "product"][0..3]{
    _id,
    title,
    description,
    discountPercentage,
    price,
    "imageUrl": productImage.asset->url, // Fetch the image URL
    "slug": slug.current // Corrected the slug reference
  }
`;

export const getProduct = (slug: string) => groq`
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
    price,
    description,
    discountPercentage,
    "imageUrl": productImage.asset->url, // Fetch the image URL
    "slug": slug.current // Corrected the slug reference
  }
`;
