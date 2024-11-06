import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {CustomSession, Page, PageWithObjectId} from "@/types/common";
import clientPromise from "@/lib/db";
import {ObjectId} from "bson";
import {CreatePageSchema} from "@/schemas/common";
import * as z from 'zod'
import {nanoid} from "nanoid";

export const getPagesFromCurrentUser = async (): Promise<Page[]> => {
  const session: CustomSession | null = await getServerSession(authOptions);

  const db = await clientPromise;
  console.log(session);

  if (session) {
    const pages = await db
      .db()
      .collection<PageWithObjectId>("pages")
      .find({userId: new ObjectId(session.user?.id)})
      .toArray();

    return pages.map(page => {
      return {
        ...page,
        id: page._id.toString(),
        userId: page.userId.toString()
      }
    });
  }

  return [];
}

export const POST = async (request: Request) => {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  const db = await clientPromise;
  const pageData = await request.json();

  let page: z.infer<typeof CreatePageSchema>
  try {
    page = CreatePageSchema.parse(pageData)
  } catch (e) {
    console.error(e)
    return NextResponse.json({error: 'Datos incorrectos', detail: e}, {
      status: 400,
    });
  }

  const result = await db
    .db()
    .collection("pages")
    .insertOne({
      ...page,
      shortId: nanoid(10),
      userId: new ObjectId(session.user.id)
    });

  return NextResponse.json(result, {status: 200});
}

export const GET = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  const db = await clientPromise;

  const pages = await db
    .db()
    .collection<PageWithObjectId>("pages")
    .find({userId: new ObjectId(session.user.id)})
    .toArray();

  return NextResponse.json(pages, {status: 200});
}

export const getPageByShortId = async (shortId: string): Promise<Page | null> => {
  const db = await clientPromise;

  const page = await db
    .db()
    .collection<PageWithObjectId>("pages")
    .findOne({shortId});

  if (!page) {
    return null;
  }

  return {
    ...page,
    _id: page._id.toString(),
    userId: page.userId.toString()
  };
}