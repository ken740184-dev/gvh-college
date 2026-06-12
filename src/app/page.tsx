import HomeClient from "@/components/home/HomeClient";
import { getAnnouncement } from "@/actions/announcements";

export const revalidate = 60;

export default async function Home() {
  const res = await getAnnouncement();
  const announcement = res.success ? res.announcement : null;

  return <HomeClient announcement={announcement} />;
}

