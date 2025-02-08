import { defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().error("Title is required"),
      description: "The name of the product",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required().error("Slug is required"),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule
        .required()
        .min(10)
        .error("Description must be at least 10 characters"),
      description: "Detailed description of the product",
    },
    {
      name: "productImage",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required().error("Product image is required"),
      description: "Upload an image of the product",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required().min(0).error("Price must be a positive value"),
      description: "The price of the product in your currency",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Tags to categorize the product (e.g., furniture, living room)",
    },
    {
      name: "discountPercentage",
      title: "Discount Percentage",
      type: "number",
      validation: (rule) => rule.min(0).max(100).error("Discount must be between 0 and 100"),
      description: "Discount percentage for this product (if applicable)",
    },
    {
      name: "isNew",
      title: "New Badge",
      type: "boolean",
      description: "Mark this product as new to display a 'New' badge",
    },
  ],
});
