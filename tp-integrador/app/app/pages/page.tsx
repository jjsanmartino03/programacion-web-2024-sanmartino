import UserPagesList from "@/app/app/pages/ui";
import {getPagesFromCurrentUser} from "@/app/api/pages";
import {Page, Tag} from "@/types/common";
import {getAllTags} from "@/app/api/tags/tags";
import {Metadata} from "next";
export const metadata: Metadata = {
  title: 'Mis páginas | MeWeb'
}
// Mock data for demonstration
export default async function UserDashboard() {
  const pagesPromise: Promise<Page[]> = getPagesFromCurrentUser();
  const tagsPromise: Promise<Tag[]> = getAllTags();

  const [pages, tags] = await Promise.all([pagesPromise, tagsPromise]);
  return <UserPagesList pages={pages} tags={tags}/>
}