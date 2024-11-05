import {NextResponse} from "next/server";
import clientPromise from "@/lib/db";
import {hash} from "bcrypt";

export async function POST(request: Request) {
  const {email, password} = await request.json();
  const client = await clientPromise;
  const usersCollection = client.db().collection("users");

  const existingUser = await usersCollection.findOne({email});
  if (existingUser) {
    return NextResponse.json({error: "User already exists"}, {status: 400});
  }

  const hashedPassword = await hash(password, 12);
  await usersCollection.insertOne({email, password: hashedPassword});

  return NextResponse.json({message: "User created"}, {status: 201});
}