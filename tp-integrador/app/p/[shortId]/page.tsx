import {getPageByShortId} from "@/app/api/pages/route";
import NotFound from "next/dist/client/components/not-found-error";

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

  return (
    <div>
      <h1>{page.title}</h1>
      <img src={page.imageUrl} alt={page.title}/>
    </div>
  )
}