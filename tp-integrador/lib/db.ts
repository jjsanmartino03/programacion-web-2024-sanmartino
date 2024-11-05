import { MongoClient } from "mongodb";
import '../types/global.d.ts';

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!(global as unknown as NodeJS.Global)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as unknown as NodeJS.Global)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as unknown as NodeJS.Global)._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;