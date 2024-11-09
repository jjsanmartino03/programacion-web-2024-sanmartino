import {NextRequest, NextResponse} from "next/server";
import {getPageById} from "@/app/api/pages/route";
import {CustomSession, Page} from "@/types/common";
import {CreatePageSchema} from "@/schemas/common";
import clientPromise from "@/lib/db";
import {ObjectId} from "bson";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export const updatePage = async (originalPage: Page, data: Partial<Page>) => {
  // Update the page
  const client = await clientPromise

  const result = await client
    .db()
    .collection("pages")
    .updateOne({_id: new ObjectId(originalPage._id)}, {$set: data})

  return result;
}

export const PUT = async (req: Request, {params}: { params: Promise<{ id: string }> }) => {

  const id = (await params).id;

  const page = await getPageById(id);
  if (!page) {
    return NextResponse.json({error: 'Page not found'}, {status: 404});
  }

  const data = CreatePageSchema.parse(await req.json());

  const result = await updatePage(page, data)

  return NextResponse.json(result);
}

export const DELETE = async (req: NextRequest, {params}: { params: { id: string } }) => {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  const {id} = params;
  const db = await clientPromise;

  const result = await db
    .db()
    .collection("pages")
    .deleteOne({_id: new ObjectId(id), userId: new ObjectId(session.user.id)});

  if (result.deletedCount === 0) {
    return NextResponse.json({error: "Page not found or not authorized"}, {status: 404});
  }

  return NextResponse.json({message: "Page deleted successfully"}, {status: 200});
};