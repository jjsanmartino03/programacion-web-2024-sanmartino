import LoginPage from "@/app/app/auth/[path]/ui";
import NotFound from "next/dist/client/components/not-found-error";

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