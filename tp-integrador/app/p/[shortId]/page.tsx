import {getPageByShortId} from "@/app/api/pages";
import NotFound from "next/dist/client/components/not-found-error";
import {redirect} from "next/navigation";

export default async function Page({
                                     params
                                   }: {
  params: Promise<{ shortId: string }>
}) {

  const shortId = (await params).shortId
  const page = await getPageByShortId(shortId)

  if (!page) {
    return <NotFound/>
  }

  // redirect to '/pages/[slug]' if the page has a slug
  redirect(`/pages/${page.slug}`)
}