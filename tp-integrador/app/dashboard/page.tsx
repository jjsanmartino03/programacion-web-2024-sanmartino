import UserPagesList from "@/app/dashboard/ui";
import {getPagesFromCurrentUser} from "@/app/api/pages/route";
import {Page} from "@/types/common";

// Mock data for demonstration
export default async function UserDashboard() {
  const pages: Page[] = await getPagesFromCurrentUser();
  return <UserPagesList pages={pages}/>
}