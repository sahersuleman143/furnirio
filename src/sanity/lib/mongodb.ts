import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string; // .env.local file se MongoDB URI lena
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Add MONGODB_URI in .env.local");
}

client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;
