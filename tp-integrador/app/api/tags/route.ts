import {NextRequest, NextResponse} from "next/server";
import clientPromise from "@/lib/db";
import {Tag} from "@/types/common";
import {CreateTagSchema} from "@/schemas/common";



export const GET = async () => {
  const client = await clientPromise;

  const db = client.db();

  const tags = await db.collection<Tag>('tags').find().toArray();

  return NextResponse.json(tags);
}

export const POST = async (req: NextRequest) => {
  const tagData = CreateTagSchema.parse(await req.json());
  const client = await clientPromise;

  const db = client.db();

  // find if tag already exists
  const tagFound = await db.collection<Tag>('tags').findOne({
    name: tagData.name
  });

  if (tagFound) {
    return NextResponse.json({
      message: 'tag name already exists'
    }, {status: 409})
  }

  const result = await db.collection<Omit<Tag, '_id'>>('tags').insertOne(tagData)

  if (result) {
    return NextResponse.json(result)
  } else {
    return NextResponse.json({
      message: 'error',
    }, {status: 400})
  }
}