import "server-only";
import { eq, desc, asc, sql, count, and, gt } from "drizzle-orm";
import { getDb } from "./index";
import {
  videos,
  blogPosts,
  matches,
  fantasyUsers,
  predictions,
} from "./schema";
import type { InferSelectModel } from "drizzle-orm";

// ---- Exported types ----

export type Video = InferSelectModel<typeof videos>;
export type BlogPost = InferSelectModel<typeof blogPosts>;
export type Match = InferSelectModel<typeof matches>;
export type FantasyUser = InferSelectModel<typeof fantasyUsers>;
export type Prediction = InferSelectModel<typeof predictions>;

export interface LeaderboardEntry {
  id: number;
  name: string;
  avatar: string | null;
  totalPoints: number;
  exactScores: number;
  correctResults: number;
  totalPredictions: number;
}

export interface AdminStats {
  videoCount: number;
  blogCount: number;
  matchCount: number;
  upcomingMatches: number;
  finishedMatches: number;
  userCount: number;
  predictionCount: number;
}

// ---- Video queries ----

export async function getVideos(): Promise<Video[]> {
  const db = getDb();
  return db.select().from(videos).orderBy(desc(videos.date));
}

export async function getVideoById(id: string): Promise<Video | undefined> {
  const db = getDb();
  const rows = await db.select().from(videos).where(eq(videos.id, id)).limit(1);
  return rows[0];
}

// ---- Blog queries ----

export async function getBlogPosts(): Promise<BlogPost[]> {
  const db = getDb();
  return db.select().from(blogPosts).orderBy(desc(blogPosts.date));
}

export async function getBlogPost(
  slug: string
): Promise<BlogPost | undefined> {
  const db = getDb();
  const rows = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);
  return rows[0];
}

export async function getBlogPostsPaginated(
  cursor?: string,
  limit: number = 10
): Promise<{ posts: BlogPost[]; nextCursor: string | null }> {
  const db = getDb();
  const q = db.select().from(blogPosts);

  const rows = cursor
    ? await q
        .where(sql`(${blogPosts.date}, ${blogPosts.slug}) < (${cursor.split("|")[0]}, ${cursor.split("|")[1]})`)
        .orderBy(desc(blogPosts.date), desc(blogPosts.slug))
        .limit(limit + 1)
    : await q
        .orderBy(desc(blogPosts.date), desc(blogPosts.slug))
        .limit(limit + 1);

  const hasMore = rows.length > limit;
  const posts = hasMore ? rows.slice(0, limit) : rows;
  const nextCursor = hasMore
    ? `${posts[posts.length - 1].date}|${posts[posts.length - 1].slug}`
    : null;

  return { posts, nextCursor };
}

export async function searchBlogPosts(
  query: string,
  cursor?: string,
  limit: number = 10
): Promise<{ posts: BlogPost[]; nextCursor: string | null }> {
  const db = getDb();
  const pattern = `%${query}%`;

  const baseWhere = sql`(${blogPosts.title} ILIKE ${pattern} OR ${blogPosts.excerpt} ILIKE ${pattern} OR ${blogPosts.content} ILIKE ${pattern})`;

  const cursorWhere = cursor
    ? sql`${baseWhere} AND (${blogPosts.date}, ${blogPosts.slug}) < (${cursor.split("|")[0]}, ${cursor.split("|")[1]})`
    : baseWhere;

  const rows = await db
    .select()
    .from(blogPosts)
    .where(cursorWhere)
    .orderBy(desc(blogPosts.date), desc(blogPosts.slug))
    .limit(limit + 1);

  const hasMore = rows.length > limit;
  const posts = hasMore ? rows.slice(0, limit) : rows;
  const nextCursor = hasMore
    ? `${posts[posts.length - 1].date}|${posts[posts.length - 1].slug}`
    : null;

  return { posts, nextCursor };
}

// ---- Match queries ----

export async function getMatches(): Promise<Match[]> {
  const db = getDb();
  return db.select().from(matches).orderBy(asc(matches.kickoff));
}

export async function getMatchById(
  id: string
): Promise<Match | undefined> {
  const db = getDb();
  const rows = await db
    .select()
    .from(matches)
    .where(eq(matches.id, id))
    .limit(1);
  return rows[0];
}

export async function getNextUpcomingMatch(): Promise<Match | undefined> {
  const db = getDb();
  const rows = await db
    .select()
    .from(matches)
    .where(
      and(
        eq(matches.status, "upcoming"),
        sql`${matches.kickoff}::timestamp > NOW()`
      )
    )
    .orderBy(asc(matches.kickoff))
    .limit(1);
  return rows[0];
}

export async function getPredictionDistribution(
  matchId: string
): Promise<{ home: number; draw: number; away: number }> {
  const db = getDb();
  const rows = await db
    .select({
      home: sql<number>`COUNT(CASE WHEN home_score > away_score THEN 1 END)::int`,
      draw: sql<number>`COUNT(CASE WHEN home_score = away_score THEN 1 END)::int`,
      away: sql<number>`COUNT(CASE WHEN home_score < away_score THEN 1 END)::int`,
    })
    .from(predictions)
    .where(eq(predictions.matchId, matchId));
  return rows[0] ?? { home: 0, draw: 0, away: 0 };
}

// ---- Fantasy user queries ----

export async function getFantasyUserById(
  id: number
): Promise<FantasyUser | undefined> {
  const db = getDb();
  const rows = await db
    .select()
    .from(fantasyUsers)
    .where(eq(fantasyUsers.id, id))
    .limit(1);
  return rows[0];
}

export async function getFantasyUserByName(
  name: string
): Promise<FantasyUser | undefined> {
  const db = getDb();
  const rows = await db
    .select()
    .from(fantasyUsers)
    .where(eq(fantasyUsers.name, name))
    .limit(1);
  return rows[0];
}

export async function createFantasyUser(
  name: string,
  avatar: string = "⚽"
): Promise<FantasyUser> {
  const db = getDb();
  const rows = await db
    .insert(fantasyUsers)
    .values({ name, avatar })
    .returning();
  return rows[0];
}

// ---- Prediction queries ----

export async function getUserPredictions(
  userId: number
): Promise<Prediction[]> {
  const db = getDb();
  return db
    .select()
    .from(predictions)
    .where(eq(predictions.userId, userId))
    .orderBy(desc(predictions.createdAt));
}

export async function savePrediction(
  userId: number,
  matchId: string,
  homeScore: number,
  awayScore: number
): Promise<Prediction> {
  const db = getDb();
  const rows = await db
    .insert(predictions)
    .values({ userId, matchId, homeScore, awayScore })
    .onConflictDoUpdate({
      target: [predictions.userId, predictions.matchId],
      set: { homeScore, awayScore },
    })
    .returning();
  return rows[0];
}

export async function getPredictionsForMatch(
  matchId: string
): Promise<Prediction[]> {
  const db = getDb();
  return db
    .select()
    .from(predictions)
    .where(eq(predictions.matchId, matchId));
}

export async function updatePredictionPoints(
  predictionId: number,
  pointsEarned: number
): Promise<void> {
  const db = getDb();
  await db
    .update(predictions)
    .set({ pointsEarned })
    .where(eq(predictions.id, predictionId));
}

// ---- Leaderboard ----

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const db = getDb();
  const rows = await db.execute(sql`
    SELECT
      fu.id, fu.name, fu.avatar,
      COALESCE(SUM(p.points_earned), 0)::int as total_points,
      COUNT(CASE WHEN p.points_earned = 10 THEN 1 END)::int as exact_scores,
      COUNT(CASE WHEN p.points_earned IN (3, 5) THEN 1 END)::int as correct_results,
      COUNT(p.id)::int as total_predictions
    FROM fantasy_users fu
    LEFT JOIN predictions p ON p.user_id = fu.id
    GROUP BY fu.id, fu.name, fu.avatar
    ORDER BY total_points DESC
  `);
  return (rows.rows as Array<Record<string, unknown>>).map((row) => ({
    id: row.id as number,
    name: row.name as string,
    avatar: row.avatar as string | null,
    totalPoints: row.total_points as number,
    exactScores: row.exact_scores as number,
    correctResults: row.correct_results as number,
    totalPredictions: row.total_predictions as number,
  }));
}

export async function getUserStreak(
  userId: number
): Promise<{ current: number; best: number }> {
  const db = getDb();
  const preds = await db
    .select({
      pointsEarned: predictions.pointsEarned,
      matchKickoff: matches.kickoff,
    })
    .from(predictions)
    .innerJoin(matches, eq(predictions.matchId, matches.id))
    .where(
      and(eq(predictions.userId, userId), eq(matches.status, "finished"))
    )
    .orderBy(desc(matches.kickoff));

  let current = 0;
  let best = 0;
  let streak = 0;
  let currentActive = true;

  for (const p of preds) {
    if (p.pointsEarned !== null && p.pointsEarned > 0) {
      streak++;
      if (currentActive) current = streak;
      if (streak > best) best = streak;
    } else {
      currentActive = false;
      streak = 0;
    }
  }

  return { current, best };
}

// ---- Admin stats ----

export async function getAdminStats(): Promise<AdminStats> {
  const db = getDb();
  const [videoRows, blogRows, matchRows, userRows, predictionRows] =
    await Promise.all([
      db.select({ count: count() }).from(videos),
      db.select({ count: count() }).from(blogPosts),
      db.execute(sql`
        SELECT
          COUNT(*)::int as total,
          COUNT(CASE WHEN status = 'upcoming' THEN 1 END)::int as upcoming,
          COUNT(CASE WHEN status = 'finished' THEN 1 END)::int as finished
        FROM matches
      `),
      db.select({ count: count() }).from(fantasyUsers),
      db.select({ count: count() }).from(predictions),
    ]);

  const matchStats = matchRows.rows[0] as Record<string, number>;

  return {
    videoCount: videoRows[0].count,
    blogCount: blogRows[0].count,
    matchCount: matchStats.total,
    upcomingMatches: matchStats.upcoming,
    finishedMatches: matchStats.finished,
    userCount: userRows[0].count,
    predictionCount: predictionRows[0].count,
  };
}
