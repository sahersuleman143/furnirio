import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client"; // Ensure this path is correct

export async function GET() {
  try {
    // Sanity query to fetch orders
    const query = `*[_type == "order"] | order(_createdAt desc) { 
      _id,
      customerName,
      shippingAddress,
      city,
      postalCode,
      phone,
      email,
      cartItems,
      totalAmount,
      _createdAt
    }`;

    const orders = await client.fetch(query);

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
