import { title } from "process";

export default {
  name: "order",
  type: "document",
  title: "Orders",
  fields: [
    { name: "customerName", type: "string", title: "Customer Name", validation: (Rule: { required: () => any; }) => Rule.required() },
    { name: "shippingAddress", type: "string", title: "Shipping Address", validation: (Rule: { required: () => any; }) => Rule.required() },
    { name: "city", type: "string", title: "City", validation: (Rule: { required: () => any; }) => Rule.required() },
    { name: "postalCode", type: "string", title: "Postal Code", validation: (Rule: { required: () => any; }) => Rule.required() },
    { name: "phone", type: "string", title: "Phone Number", validation: (Rule: { required: () => any; }) => Rule.required() },
    { name: "email", type: "string", title: "Email Address", validation: (Rule: { required: () => { (): any; new(): any; email: { (): any; new(): any; }; }; }) => Rule.required().email() },
    {
      name: "cartItems",
      type: "array",
      title: "Cart Items",
      validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): any; new(): any; }; }; }) => Rule.required().min(1),
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Product Name" },
            { name: "price", type: "number", title: "Price" },
            { name: "quantity", type: "number", title: "Quantity" },
          ],
        },
      ],
    },
    { name: "totalAmount", type: "number", title: "Total Amount", validation: (Rule: { required: () => any; }) => Rule.required() },
  ],
};
