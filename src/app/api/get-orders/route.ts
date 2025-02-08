import { NextResponse } from "next/server";
import clientPromise from "../../../sanity/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("test"); // Apne database ka sahi naam likhein
    const orders = await db.collection("orders").find({}).toArray();

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
