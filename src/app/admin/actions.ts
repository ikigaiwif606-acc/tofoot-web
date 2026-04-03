"use server";

import { compare } from "bcryptjs";
import { verifyAdmin } from "@/lib/auth";
import { createAdminSession, deleteAdminSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { calculateScore } from "@/lib/scoring";
import { getDb } from "@/lib/db/index";
import {
  videos,
  blogPosts,
  matches,
  predictions,
  fantasyUsers,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { ActionResult } from "@/lib/validations";
import {
  parseFormData,
  loginSchema,
  videoSchema,
  blogPostSchema,
  createMatchSchema,
  updateMatchScoreSchema,
  updateFantasyUserSchema,
} from "@/lib/validations";
import {
  getPredictionsForMatch,
  updatePredictionPoints,
} from "@/lib/db/queries";

// ---- Auth ----

export async function login(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    const parsed = parseFormData(loginSchema, formData);
    if (!parsed.success) return { success: false, error: parsed.error };

    const hash = process.env.ADMIN_PASSWORD_HASH;
    if (!hash) {
      // Fallback to plaintext comparison if hash not set yet
      const plain = process.env.ADMIN_PASSWORD;
      if (!plain || parsed.data.password !== plain) {
        return { success: false, error: "Incorrect password" };
      }
    } else {
      const isValid = await compare(parsed.data.password, hash);
      if (!isValid) return { success: false, error: "Incorrect password" };
    }

    await createAdminSession();
    return { success: true };
  } catch {
    return { success: false, error: "Login failed" };
  }
}

export async function logout() {
  await deleteAdminSession();
  redirect("/admin/login");
}

// ---- Videos ----

export async function createVideo(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    await verifyAdmin();
    const parsed = parseFormData(videoSchema, formData);
    if (!parsed.success) return { success: false, error: parsed.error };

    const db = getDb();
    const id = crypto.randomUUID().slice(0, 8);
    await db.insert(videos).values({
      id,
      title: parsed.data.title,
      titleEn: parsed.data.title_en,
      description: parsed.data.description,
      youtubeId: parsed.data.youtube_id,
      date: parsed.data.date,
      duration: parsed.data.duration,
      views: parsed.data.views,
      category: parsed.data.category,
    });

    revalidatePath("/admin/videos");
    revalidatePath("/");
    revalidatePath("/videos");
    return { success: true };
  } catch (e) {
    console.error("createVideo failed:", e);
    return { success: false, error: "Failed to create video" };
  }
}

export async function updateVideo(
  id: string,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    await verifyAdmin();
    const parsed = parseFormData(videoSchema, formData);
    if (!parsed.success) return { success: false, error: parsed.error };

    const db = getDb();
    await db
      .update(videos)
      .set({
        title: parsed.data.title,
        titleEn: parsed.data.title_en,
        description: parsed.data.description,
        youtubeId: parsed.data.youtube_id,
        date: parsed.data.date,
        duration: parsed.data.duration,
        views: parsed.data.views,
        category: parsed.data.category,
      })
      .where(eq(videos.id, id));

    revalidatePath("/admin/videos");
    revalidatePath("/");
    revalidatePath("/videos");
    return { success: true };
  } catch (e) {
    console.error("updateVideo failed:", e);
    return { success: false, error: "Failed to update video" };
  }
}

export async function deleteVideo(id: string): Promise<ActionResult> {
  try {
    await verifyAdmin();
    const db = getDb();
    await db.delete(videos).where(eq(videos.id, id));
    revalidatePath("/admin/videos");
    revalidatePath("/");
    revalidatePath("/videos");
    return { success: true };
  } catch (e) {
    console.error("deleteVideo failed:", e);
    return { success: false, error: "Failed to delete video" };
  }
}

// ---- Blog ----

export async function createBlogPost(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    await verifyAdmin();
    const parsed = parseFormData(blogPostSchema, formData);
    if (!parsed.success) return { success: false, error: parsed.error };

    const slug =
      parsed.data.slug ||
      parsed.data.title
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
        .replace(/^-|-$/g, "");

    const db = getDb();
    await db.insert(blogPosts).values({
      slug,
      title: parsed.data.title,
      excerpt: parsed.data.excerpt,
      content: parsed.data.content,
      date: parsed.data.date,
      category: parsed.data.category,
      readTime: parsed.data.read_time,
      coverEmoji: parsed.data.cover_emoji,
    });

    revalidatePath("/admin/blog");
    revalidatePath("/");
    revalidatePath("/blog");
    return { success: true };
  } catch (e) {
    console.error("createBlogPost failed:", e);
    return { success: false, error: "Failed to create blog post" };
  }
}

export async function updateBlogPost(
  slug: string,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    await verifyAdmin();
    const parsed = parseFormData(blogPostSchema, formData);
    if (!parsed.success) return { success: false, error: parsed.error };

    const db = getDb();
    await db
      .update(blogPosts)
      .set({
        title: parsed.data.title,
        excerpt: parsed.data.excerpt,
        content: parsed.data.content,
        date: parsed.data.date,
        category: parsed.data.category,
        readTime: parsed.data.read_time,
        coverEmoji: parsed.data.cover_emoji,
      })
      .where(eq(blogPosts.slug, slug));

    revalidatePath("/admin/blog");
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    return { success: true };
  } catch (e) {
    console.error("updateBlogPost failed:", e);
    return { success: false, error: "Failed to update blog post" };
  }
}

export async function deleteBlogPost(slug: string): Promise<ActionResult> {
  try {
    await verifyAdmin();
    const db = getDb();
    await db.delete(blogPosts).where(eq(blogPosts.slug, slug));
    revalidatePath("/admin/blog");
    revalidatePath("/");
    revalidatePath("/blog");
    return { success: true };
  } catch (e) {
    console.error("deleteBlogPost failed:", e);
    return { success: false, error: "Failed to delete blog post" };
  }
}

// ---- Matches ----

export async function updateMatchScore(
  id: string,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    await verifyAdmin();
    const parsed = parseFormData(updateMatchScoreSchema, formData);
    if (!parsed.success) return { success: false, error: parsed.error };

    const { home_score, away_score, status } = parsed.data;

    const db = getDb();
    await db
      .update(matches)
      .set({
        homeScore: home_score,
        awayScore: away_score,
        status,
      })
      .where(eq(matches.id, id));

    // If match just finished, recalculate points for all predictions
    if (status === "finished") {
      const preds = await getPredictionsForMatch(id);
      for (const p of preds) {
        const { points } = calculateScore(
          { homeScore: p.homeScore, awayScore: p.awayScore },
          { homeScore: home_score, awayScore: away_score }
        );
        await updatePredictionPoints(p.id, points);
      }
    }

    revalidatePath("/admin/matches");
    revalidatePath("/admin/leaderboard");
    revalidatePath("/world-cup");
    return { success: true };
  } catch (e) {
    console.error("updateMatchScore failed:", e);
    return { success: false, error: "Failed to update match score" };
  }
}

export async function createMatch(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    await verifyAdmin();
    const parsed = parseFormData(createMatchSchema, formData);
    if (!parsed.success) return { success: false, error: parsed.error };

    const db = getDb();
    const id = `m${Date.now()}`;
    await db.insert(matches).values({
      id,
      homeTeam: parsed.data.home_team,
      awayTeam: parsed.data.away_team,
      homeFlag: parsed.data.home_flag,
      awayFlag: parsed.data.away_flag,
      kickoff: parsed.data.kickoff,
      status: "upcoming",
      stage: parsed.data.stage,
      groupName: parsed.data.group_name ?? null,
    });

    revalidatePath("/admin/matches");
    revalidatePath("/world-cup");
    return { success: true };
  } catch (e) {
    console.error("createMatch failed:", e);
    return { success: false, error: "Failed to create match" };
  }
}

export async function updateMatch(
  id: string,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    await verifyAdmin();
    const parsed = parseFormData(createMatchSchema, formData);
    if (!parsed.success) return { success: false, error: parsed.error };

    const db = getDb();
    await db
      .update(matches)
      .set({
        homeTeam: parsed.data.home_team,
        awayTeam: parsed.data.away_team,
        homeFlag: parsed.data.home_flag,
        awayFlag: parsed.data.away_flag,
        kickoff: parsed.data.kickoff,
        stage: parsed.data.stage,
        groupName: parsed.data.group_name ?? null,
      })
      .where(eq(matches.id, id));

    revalidatePath("/admin/matches");
    revalidatePath("/world-cup");
    return { success: true };
  } catch (e) {
    console.error("updateMatch failed:", e);
    return { success: false, error: "Failed to update match" };
  }
}

export async function deleteMatch(id: string): Promise<ActionResult> {
  try {
    await verifyAdmin();
    const db = getDb();
    await db.delete(predictions).where(eq(predictions.matchId, id));
    await db.delete(matches).where(eq(matches.id, id));
    revalidatePath("/admin/matches");
    revalidatePath("/admin/leaderboard");
    revalidatePath("/world-cup");
    return { success: true };
  } catch (e) {
    console.error("deleteMatch failed:", e);
    return { success: false, error: "Failed to delete match" };
  }
}

// ---- Fantasy Users ----

export async function deleteFantasyUser(id: number): Promise<ActionResult> {
  try {
    await verifyAdmin();
    const db = getDb();
    await db.delete(predictions).where(eq(predictions.userId, id));
    await db.delete(fantasyUsers).where(eq(fantasyUsers.id, id));
    revalidatePath("/admin/leaderboard");
    revalidatePath("/world-cup");
    return { success: true };
  } catch (e) {
    console.error("deleteFantasyUser failed:", e);
    return { success: false, error: "Failed to delete user" };
  }
}

export async function updateFantasyUser(
  id: number,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    await verifyAdmin();
    const parsed = parseFormData(updateFantasyUserSchema, formData);
    if (!parsed.success) return { success: false, error: parsed.error };

    const db = getDb();
    await db
      .update(fantasyUsers)
      .set({
        name: parsed.data.name,
        avatar: parsed.data.avatar,
      })
      .where(eq(fantasyUsers.id, id));

    revalidatePath("/admin/leaderboard");
    revalidatePath("/world-cup");
    return { success: true };
  } catch (e) {
    console.error("updateFantasyUser failed:", e);
    return { success: false, error: "Failed to update user" };
  }
}
