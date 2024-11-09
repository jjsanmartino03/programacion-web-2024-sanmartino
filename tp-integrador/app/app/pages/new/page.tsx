import PageForm from "@/app/app/pages/new/ui";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Crear página | MeWeb'
}

export default function NewPage() {
  return <PageForm />
}