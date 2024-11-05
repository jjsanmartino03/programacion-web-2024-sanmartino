import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {CustomSession, Page} from "@/types/common";
import clientPromise from "@/lib/db";
import {ObjectId} from "bson";
import {NextApiRequest, NextApiResponse} from "next";

export const getPagesFromCurrentUser = async (): Promise<Page[]> => {
  const session: CustomSession | null = await getServerSession(authOptions);

  const db = await clientPromise;

  if (session) {
    const pages = await db
      .db()
      .collection<Page>("pages")
      .find({userId: session.user?.id})
      .toArray();
    return pages;
  }

  return [];
}

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: CustomSession | null = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).end();
  }

  const db = await clientPromise;
  const page = req.body;

  if (req.method === "POST") {
    const result = await db
      .db()
      .collection("pages")
      .insertOne({...page, userId: new ObjectId(session.user.id)});
    return res.status(200).json(result);
  }
}
