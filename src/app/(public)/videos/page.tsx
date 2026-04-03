import { getVideos } from "@/lib/db/queries";
import VideosClient from "./VideosClient";

export const dynamic = "force-dynamic";

const categories = [
  { key: "all", label: "全部", labelEn: "All" },
  { key: "analysis", label: "賽事分析", labelEn: "Analysis" },
  { key: "news", label: "新聞", labelEn: "News" },
  { key: "prediction", label: "預測", labelEn: "Predictions" },
  { key: "culture", label: "文化", labelEn: "Culture" },
];

export default async function VideosPage() {
  const videos = await getVideos();
  return <VideosClient videos={videos} categories={categories} />;
}
