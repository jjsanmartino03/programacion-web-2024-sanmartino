import {getPageBySlug} from "@/app/api/pages";
import NotFound from "next/dist/client/components/not-found-error";
import PageView from "@/app/pages/[slug]/ui";
import {getUserEmailByUserId} from "@/app/api/users";

export default async function Page({
                                     params
                                   }: {
  params: Promise<{ slug: string }>
}) {

  const slug = (await params).slug
  const page = await getPageBySlug(slug)
  if (!page) {
    return <NotFound/>
  }
  const userEmail = await getUserEmailByUserId(page.userId)

  if (!userEmail) {
    return <NotFound/>
  }

  // redirect to '/pages/[slug]' if the page has a slug
  return <PageView author={
    {email: userEmail}
  } page={page}/>
}