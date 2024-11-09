import LoginPage from "@/app/auth/[path]/ui";
import NotFound from "next/dist/client/components/not-found-error";
import {Metadata} from "next";

export const generateMetadata = async (  {params}:
                                  { params: Promise<{ path: string }> } ):Promise<Metadata> => {
  const path = (await params).path
  if (path === 'signin') return {title: 'Iniciar sesión | MeWeb'}
  else if (path === 'signup') return {title: 'Crear cuenta | MeWeb'}

  return {title: 'Página no encontrada'}
}


export default async function Auth(
  {params}:
    { params: Promise<{ path: string }> }
) {
  const path = (await params).path

  if (path !== 'signin' && path !== 'signup') {
    // return 404
    return <NotFound/>
  }
  return <LoginPage type={path}/>
}