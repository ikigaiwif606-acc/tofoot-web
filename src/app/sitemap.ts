import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/db/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tofoot-web.vercel.app";

  const posts = await getBlogPosts();
  const blogEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily" },
    { url: `${baseUrl}/videos`, lastModified: new Date(), changeFrequency: "weekly" },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly" },
    { url: `${baseUrl}/world-cup`, lastModified: new Date(), changeFrequency: "daily" },
    { url: `${baseUrl}/world-cup/predict`, lastModified: new Date(), changeFrequency: "daily" },
    { url: `${baseUrl}/world-cup/leaderboard`, lastModified: new Date(), changeFrequency: "daily" },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" },
    ...blogEntries,
  ];
}
