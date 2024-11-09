import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/auth-options";
import {CustomSession, PageWithObjectId} from "@/types/common";
import clientPromise from "@/lib/db";
import {ObjectId} from "bson";
import {CreatePageSchema} from "@/schemas/common";
import * as z from 'zod'
import {nanoid} from "nanoid";
import {generateUniqueSlug} from "@/app/api/pages/generate-slug";

export const POST = async (request: Request) => {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  const db = await clientPromise;
  const pageData = await request.json();

  let page: z.infer<typeof CreatePageSchema>;
  try {
    page = CreatePageSchema.parse(pageData);
  } catch (e) {
    console.error(e);
    return NextResponse.json({error: 'Datos incorrectos', detail: e}, {
      status: 400,
    });
  }

  const slug = await generateUniqueSlug(page.title);

  const result = await db
    .db()
    .collection("pages")
    .insertOne({
      ...page,
      shortId: nanoid(10),
      userId: new ObjectId(session.user.id),
      slug,
    });

  return NextResponse.json(result, {status: 200});
};
export const GET = async (req: NextRequest) => {
  const session: CustomSession | null = await getServerSession(authOptions);
  // get query params
  const url = new URL(req.url);
  const queryParams = url.searchParams;

  const keyword = queryParams.get('keyword');

  if (!session) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  const db = await clientPromise;

  const pages = await db
    .db()
    .collection<PageWithObjectId>("pages")
    .find({
      userId: new ObjectId(session.user.id),
      ...(keyword && {title: new RegExp(keyword, 'i')})
    }).
    sort({title: 1})
    .toArray();

  return NextResponse.json(pages, {status: 200});
}