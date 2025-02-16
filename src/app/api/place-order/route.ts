import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: { json: () => PromiseLike<{ customerName: any; email: any; phone: any; shippingAddress: any; city: any; postalCode: any; cartItems: any; totalAmount: any; }> | { customerName: any; email: any; phone: any; shippingAddress: any; city: any; postalCode: any; cartItems: any; totalAmount: any; }; }) {
  try {
    const { customerName, email, phone, shippingAddress, city, postalCode, cartItems, totalAmount } = await req.json();

    // ✅ Validate Required Fields
    if (!customerName || !email || !phone || !shippingAddress || !city || !postalCode || !cartItems.length || !totalAmount) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    // ✅ Create Order in Sanity
    const newOrder = await client.create({
      _type: "order",
      customerName,
      email,
      phone,
      shippingAddress,
      city,
      postalCode,
      cartItems,
      totalAmount,
    });

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
