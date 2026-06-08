import { getAchievements } from "@/actions/achievements";
import AchievementsClient from "./AchievementsClient";

export default async function AchievementsPage() {
  const res = await getAchievements();
  const achievements = res.success ? res.achievements : [];
  
  return <AchievementsClient initialAchievements={achievements} />;
}
