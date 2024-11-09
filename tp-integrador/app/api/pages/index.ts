import {CustomSession, Page, PageWithObjectId} from "@/types/common";
import clientPromise from "@/lib/db";
import {ObjectId} from "bson";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/auth-options";

export const getOnePageBy = async (params: Partial<PageWithObjectId>) => {
  const db = await clientPromise;

  const page = await db
    .db()
    .collection<PageWithObjectId>("pages")
    .findOne(params);

  if (!page) {
    return null;
  }

  return {
    ...page,
    _id: page._id.toString(),
    userId: page.userId.toString()
  };
}
export const getPageByShortId = async (shortId: string): Promise<Page | null> => {
  return getOnePageBy({shortId});
}

export const getPageById = async (id: string): Promise<Page | null> => {
  return getOnePageBy({_id: new ObjectId(id)});
}

export const getPageBySlug = async (slug: string): Promise<Page | null> => {
  return getOnePageBy({slug});
}


export const getPagesFromCurrentUser = async (): Promise<Page[]> => {
  const session: CustomSession | null = await getServerSession(authOptions);

  const db = await clientPromise;
  console.log(session);

  if (session) {
    const pages = await db
      .db()
      .collection<PageWithObjectId>("pages")
      .find({userId: new ObjectId(session.user?.id)})
      .sort({title: 1})
      .toArray();

    return pages.map(page => {
      return {
        ...page,
        _id: page._id.toString(),
        userId: page.userId.toString()
      }
    });
  }

  return [];
}
