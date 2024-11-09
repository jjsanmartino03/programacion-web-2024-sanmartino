import clientPromise from "@/lib/db";
import {ObjectId} from "bson";
import {User} from "@/types/common";

const getUserByUserId = async (userId: string) => {
  const client = await clientPromise;

  const db = client.db();
  const users = db.collection<User>("users");

  return users.findOne({_id: new ObjectId(userId)});
}

export const getUserEmailByUserId = async (userId: string) => {
  const user = await getUserByUserId(userId);

  return user?.email;
}