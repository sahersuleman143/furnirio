// src/utils/db.js
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

let client;
let db;

export async function connectToDatabase() {
  if (db) return db;

  try {
    client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db();
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Could not connect to database');
  }
}
