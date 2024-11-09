import {getPageByShortId} from "@/app/api/pages";
import NotFound from "next/dist/client/components/not-found-error";
import {getUserEmailByUserId} from "@/app/api/users";
import PageView from "@/app/p/[shortId]/ui";
import {Metadata} from "next";

export const generateMetadata = async ({
                                         params
                                       }: {
  params: Promise<{ shortId: string }>
}): Promise<Metadata> => {
  const shortId = (await params).shortId
  const page = await getPageByShortId(shortId)

  if (!page) {
    return {
      title: '404',
      description: '404',
      openGraph: {
        title: '404',
        description: '404',
      }
    }
  }

  return {
    title: page.title + ' | MeWeb',
    openGraph: {
      title: page.title,
      url: `https://meweb.juli.ar/p/${shortId}`,
      siteName: 'MeWeb',
      images: [
        {
          url: page.imageUrl,
        },
      ]
    }
  }
}

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
  const userEmail = await getUserEmailByUserId(page.userId)
  if (!userEmail) {
    return <NotFound/>
  }

  // redirect to '/pages/[slug]' if the page has a slug
  return <PageView author={
    {email: userEmail}
  } page={page}/>
}