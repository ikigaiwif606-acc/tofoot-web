import { getVideos } from "@/lib/db";

export const dynamic = "force-dynamic";
import { categories } from "@/lib/data";
import VideosClient from "./VideosClient";

export default async function VideosPage() {
  const videos = await getVideos();
  return <VideosClient videos={videos} categories={categories} />;
}
