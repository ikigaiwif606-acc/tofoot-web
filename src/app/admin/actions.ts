"use server";

import { verifyAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { createAdminSession, deleteAdminSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { calculateScore } from "@/lib/scoring";

// ---- Auth ----

export async function login(
  _prev: { error: string },
  formData: FormData
): Promise<{ error: string }> {
  const password = formData.get("password") as string;
  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "Incorrect password" };
  }
  await createAdminSession();
  redirect("/admin");
}

export async function logout() {
  await deleteAdminSession();
  redirect("/admin/login");
}

// ---- Videos ----

export async function createVideo(formData: FormData) {
  await verifyAdmin();
  const sql = getDb();
  const id = crypto.randomUUID().slice(0, 8);
  await sql`
    INSERT INTO videos (id, title, title_en, description, youtube_id, date, duration, views, category)
    VALUES (
      ${id},
      ${formData.get("title") as string},
      ${formData.get("title_en") as string},
      ${formData.get("description") as string},
      ${formData.get("youtube_id") as string},
      ${formData.get("date") as string},
      ${formData.get("duration") as string},
      ${formData.get("views") as string || "0"},
      ${formData.get("category") as string}
    )
  `;
  revalidatePath("/admin/videos");
  revalidatePath("/");
  revalidatePath("/videos");
}

export async function updateVideo(id: string, formData: FormData) {
  await verifyAdmin();
  const sql = getDb();
  await sql`
    UPDATE videos SET
      title = ${formData.get("title") as string},
      title_en = ${formData.get("title_en") as string},
      description = ${formData.get("description") as string},
      youtube_id = ${formData.get("youtube_id") as string},
      date = ${formData.get("date") as string},
      duration = ${formData.get("duration") as string},
      views = ${formData.get("views") as string},
      category = ${formData.get("category") as string}
    WHERE id = ${id}
  `;
  revalidatePath("/admin/videos");
  revalidatePath("/");
  revalidatePath("/videos");
}

export async function deleteVideo(id: string) {
  await verifyAdmin();
  const sql = getDb();
  await sql`DELETE FROM videos WHERE id = ${id}`;
  revalidatePath("/admin/videos");
  revalidatePath("/");
  revalidatePath("/videos");
}

// ---- Blog ----

export async function createBlogPost(formData: FormData) {
  await verifyAdmin();
  const sql = getDb();
  const title = formData.get("title") as string;
  const slug =
    (formData.get("slug") as string) ||
    title
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
      .replace(/^-|-$/g, "");
  await sql`
    INSERT INTO blog_posts (slug, title, excerpt, content, date, category, read_time, cover_emoji)
    VALUES (
      ${slug},
      ${title},
      ${formData.get("excerpt") as string},
      ${formData.get("content") as string},
      ${formData.get("date") as string},
      ${formData.get("category") as string},
      ${formData.get("read_time") as string || "5 min"},
      ${formData.get("cover_emoji") as string || "📝"}
    )
  `;
  revalidatePath("/admin/blog");
  revalidatePath("/");
  revalidatePath("/blog");
}

export async function updateBlogPost(slug: string, formData: FormData) {
  await verifyAdmin();
  const sql = getDb();
  await sql`
    UPDATE blog_posts SET
      title = ${formData.get("title") as string},
      excerpt = ${formData.get("excerpt") as string},
      content = ${formData.get("content") as string},
      date = ${formData.get("date") as string},
      category = ${formData.get("category") as string},
      read_time = ${formData.get("read_time") as string},
      cover_emoji = ${formData.get("cover_emoji") as string}
    WHERE slug = ${slug}
  `;
  revalidatePath("/admin/blog");
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
}

export async function deleteBlogPost(slug: string) {
  await verifyAdmin();
  const sql = getDb();
  await sql`DELETE FROM blog_posts WHERE slug = ${slug}`;
  revalidatePath("/admin/blog");
  revalidatePath("/");
  revalidatePath("/blog");
}

// ---- Matches ----

export async function updateMatchScore(id: string, formData: FormData) {
  await verifyAdmin();
  const sql = getDb();

  const homeScore = parseInt(formData.get("home_score") as string);
  const awayScore = parseInt(formData.get("away_score") as string);
  const status = formData.get("status") as string;

  await sql`
    UPDATE matches SET
      home_score = ${isNaN(homeScore) ? null : homeScore},
      away_score = ${isNaN(awayScore) ? null : awayScore},
      status = ${status}
    WHERE id = ${id}
  `;

  // If match just finished, recalculate points for all predictions
  if (status === "finished" && !isNaN(homeScore) && !isNaN(awayScore)) {
    const predictions = await sql`
      SELECT id, home_score, away_score FROM predictions WHERE match_id = ${id}
    `;
    for (const p of predictions) {
      const { points } = calculateScore(
        { homeScore: p.home_score, awayScore: p.away_score },
        { homeScore, awayScore }
      );
      await sql`UPDATE predictions SET points_earned = ${points} WHERE id = ${p.id}`;
    }
  }

  revalidatePath("/admin/matches");
  revalidatePath("/admin/leaderboard");
  revalidatePath("/fantasy");
}

export async function createMatch(formData: FormData) {
  await verifyAdmin();
  const sql = getDb();
  const id = `m${Date.now()}`;
  await sql`
    INSERT INTO matches (id, home_team, away_team, home_flag, away_flag, kickoff, status, stage, group_name)
    VALUES (
      ${id},
      ${formData.get("home_team") as string},
      ${formData.get("away_team") as string},
      ${formData.get("home_flag") as string},
      ${formData.get("away_flag") as string},
      ${formData.get("kickoff") as string},
      ${"upcoming"},
      ${formData.get("stage") as string},
      ${(formData.get("group_name") as string) || null}
    )
  `;
  revalidatePath("/admin/matches");
  revalidatePath("/fantasy");
}
