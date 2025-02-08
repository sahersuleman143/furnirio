export default {
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Customer Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "total",
      title: "Total Price",
      type: "number",
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    },
  ],
};
