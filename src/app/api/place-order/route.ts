import { NextResponse } from "next/server";
import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Secret Token for Writing Data
});

export async function POST(req: Request) {
  try {
    const { name, email, items, total } = await req.json();

    if (!name || !email || !items || !total) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const newOrder = {
      _type: "order",
      name,
      email,
      items,
      total,
      createdAt: new Date().toISOString(),
    };

    const response = await client.create(newOrder);

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      orderId: response._id,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
