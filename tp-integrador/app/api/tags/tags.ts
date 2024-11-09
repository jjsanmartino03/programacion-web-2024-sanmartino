import {Tag} from "@/types/common";
import clientPromise from "@/lib/db";

export const getAllTags = async (): Promise<Tag[]> => {
  const client = await clientPromise;

  const db = client.db();

  const tags = await db.collection<Tag>('tags').find().toArray();

  return tags.map(t => ({...t, _id: t._id.toString()}))
}