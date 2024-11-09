import PageForm from "@/app/app/pages/new/ui";
import {getPageById} from "@/app/api/pages";
import NotFound from "next/dist/client/components/not-found-error";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Editar página | MeWeb'
}

export default async function EditPage({params}:
                                         { params: Promise<{ id: string }>}) {

  const {id} = await params;
  const page = await getPageById(id);

  if (!page) {
    return <NotFound/>
  }

  return <PageForm pageData={page} />;
}