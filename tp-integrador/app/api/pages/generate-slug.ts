
import clientPromise from "@/lib/db";

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export const isSlugUnique = async (slug: string): Promise<boolean> => {
  const db = await clientPromise;
  const existingPage = await db
    .db()
    .collection("pages")
    .findOne({ slug });

  return !existingPage;
};

export const generateUniqueSlug = async (title: string): Promise<string> => {
  const slug = generateSlug(title);
  let uniqueSlug = slug;
  let counter = 1;

  while (!(await isSlugUnique(uniqueSlug))) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
};