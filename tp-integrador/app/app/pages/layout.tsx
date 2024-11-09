import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/auth-options";
import {redirect} from "next/navigation";
import {pageLinks} from "@/utils/pages";

export default async function Dashboard(
  {children}: { children: React.ReactNode }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect(pageLinks.login);
  }
  return <>{children}</>
}