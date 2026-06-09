import { getNews } from "@/actions/news";
import NewsClient from "./NewsClient";

export const revalidate = 60;

export default async function NewsPage() {
  const res = await getNews();
  const newsItems = res.success ? res.news : [];
  
  return <NewsClient initialNews={newsItems} />;
}
