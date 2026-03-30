import "server-only";
import { neon } from "@neondatabase/serverless";
import type { Video, BlogPost } from "./data";

export function getDb() {
  const sql = neon(process.env.DATABASE_URL!);
  return sql;
}

// ---- Raw row types (DB column names) ----

export interface VideoRow {
  id: string;
  title: string;
  title_en: string;
  description: string;
  youtube_id: string;
  date: string;
  duration: string;
  views: string;
  category: "analysis" | "news" | "prediction" | "culture";
}

export interface BlogRow {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  read_time: string;
  cover_emoji: string;
}

// ---- Video queries ----

function mapVideo(row: VideoRow): Video {
  return {
    id: row.id,
    title: row.title,
    titleEn: row.title_en,
    description: row.description,
    youtubeId: row.youtube_id,
    date: row.date,
    duration: row.duration,
    views: row.views,
    category: row.category,
  };
}

export async function getVideos(): Promise<Video[]> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM videos ORDER BY date DESC`;
  return (rows as VideoRow[]).map(mapVideo);
}

export async function getVideoById(id: string): Promise<Video | null> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM videos WHERE id = ${id}`;
  return rows[0] ? mapVideo(rows[0] as VideoRow) : null;
}

export async function getVideoRows(): Promise<VideoRow[]> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM videos ORDER BY date DESC`;
  return rows as VideoRow[];
}

// ---- Blog queries ----

function mapBlogPost(row: BlogRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    date: row.date,
    category: row.category,
    readTime: row.read_time,
    coverEmoji: row.cover_emoji,
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM blog_posts ORDER BY date DESC`;
  return (rows as BlogRow[]).map(mapBlogPost);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM blog_posts WHERE slug = ${slug}`;
  return rows[0] ? mapBlogPost(rows[0] as BlogRow) : null;
}

export async function getBlogRows(): Promise<BlogRow[]> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM blog_posts ORDER BY date DESC`;
  return rows as BlogRow[];
}

// ---- Match queries ----

export interface MatchRow {
  id: string;
  home_team: string;
  away_team: string;
  home_flag: string;
  away_flag: string;
  kickoff: string;
  home_score: number | null;
  away_score: number | null;
  status: "upcoming" | "live" | "finished";
  stage: string;
  group_name: string | null;
}

export async function getMatches(): Promise<MatchRow[]> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM matches ORDER BY kickoff ASC`;
  return rows as MatchRow[];
}

export async function getMatchById(id: string): Promise<MatchRow | null> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM matches WHERE id = ${id}`;
  return (rows[0] as MatchRow) ?? null;
}

export async function getNextUpcomingMatch(): Promise<MatchRow | null> {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM matches
    WHERE status = 'upcoming' AND kickoff > NOW()
    ORDER BY kickoff ASC LIMIT 1
  `;
  return (rows[0] as MatchRow) ?? null;
}

// ---- Fantasy user queries ----

export interface FantasyUserRow {
  id: number;
  name: string;
  avatar: string;
}

export async function getFantasyUserByName(
  name: string
): Promise<FantasyUserRow | null> {
  const sql = getDb();
  const rows = await sql`SELECT * FROM fantasy_users WHERE name = ${name}`;
  return (rows[0] as FantasyUserRow) ?? null;
}

export async function createFantasyUser(
  name: string,
  avatar: string = "⚽"
): Promise<FantasyUserRow> {
  const sql = getDb();
  const rows = await sql`
    INSERT INTO fantasy_users (name, avatar) VALUES (${name}, ${avatar})
    RETURNING *
  `;
  return rows[0] as FantasyUserRow;
}

// ---- Prediction queries ----

export interface PredictionRow {
  id: number;
  user_id: number;
  match_id: string;
  home_score: number;
  away_score: number;
  points_earned: number | null;
  created_at: string;
}

export async function getUserPredictions(
  userId: number
): Promise<PredictionRow[]> {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM predictions WHERE user_id = ${userId} ORDER BY created_at DESC
  `;
  return rows as PredictionRow[];
}

export async function savePrediction(
  userId: number,
  matchId: string,
  homeScore: number,
  awayScore: number
): Promise<PredictionRow> {
  const sql = getDb();
  const rows = await sql`
    INSERT INTO predictions (user_id, match_id, home_score, away_score)
    VALUES (${userId}, ${matchId}, ${homeScore}, ${awayScore})
    ON CONFLICT (user_id, match_id)
    DO UPDATE SET home_score = ${homeScore}, away_score = ${awayScore}
    RETURNING *
  `;
  return rows[0] as PredictionRow;
}

// ---- Leaderboard query ----

export interface LeaderboardRow {
  id: number;
  name: string;
  avatar: string;
  total_points: number;
  exact_scores: number;
  correct_results: number;
  total_predictions: number;
}

export async function getLeaderboard(): Promise<LeaderboardRow[]> {
  const sql = getDb();
  const rows = await sql`
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
  `;
  return rows as LeaderboardRow[];
}

// ---- Admin stats ----

export interface AdminStats {
  videoCount: number;
  blogCount: number;
  matchCount: number;
  upcomingMatches: number;
  finishedMatches: number;
  userCount: number;
  predictionCount: number;
}

export async function getAdminStats(): Promise<AdminStats> {
  const sql = getDb();
  const [videos, blogs, matches, users, predictions] = await Promise.all([
    sql`SELECT COUNT(*)::int as count FROM videos`,
    sql`SELECT COUNT(*)::int as count FROM blog_posts`,
    sql`
      SELECT
        COUNT(*)::int as total,
        COUNT(CASE WHEN status = 'upcoming' THEN 1 END)::int as upcoming,
        COUNT(CASE WHEN status = 'finished' THEN 1 END)::int as finished
      FROM matches
    `,
    sql`SELECT COUNT(*)::int as count FROM fantasy_users`,
    sql`SELECT COUNT(*)::int as count FROM predictions`,
  ]);
  return {
    videoCount: videos[0].count,
    blogCount: blogs[0].count,
    matchCount: matches[0].total,
    upcomingMatches: matches[0].upcoming,
    finishedMatches: matches[0].finished,
    userCount: users[0].count,
    predictionCount: predictions[0].count,
  };
}
