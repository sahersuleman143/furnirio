import { NextResponse } from "next/server";
import clientPromise from "../../../sanity/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("myDatabase"); // Apne database ka naam use karo
    const collections = await db.listCollections().toArray();

    return NextResponse.json({ message: "MongoDB Connected!", collections });
  } catch (error) {
    return NextResponse.json({ error: "MongoDB Connection Failed!" });
  }
}
