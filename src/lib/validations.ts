import { z } from "zod";

// ---- Action result type ----

export type ActionResult = {
  success: boolean;
  error?: string;
};

// ---- FormData parsing helper ----

export function parseFormData<T extends z.ZodType>(
  schema: T,
  formData: FormData
): { success: true; data: z.infer<T> } | { success: false; error: string } {
  const raw = Object.fromEntries(formData.entries());
  const result = schema.safeParse(raw);
  if (!result.success) {
    const firstError = result.error.issues[0];
    return {
      success: false,
      error: `${firstError.path.join(".")}: ${firstError.message}`,
    };
  }
  return { success: true, data: result.data };
}

// ---- Auth ----

export const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

// ---- Video ----

const videoCategories = [
  "analysis",
  "news",
  "prediction",
  "culture",
] as const;

export const videoSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  title_en: z.string().min(1, "English title is required").max(200),
  description: z.string().min(1, "Description is required").max(500),
  youtube_id: z
    .string()
    .min(1, "YouTube ID is required")
    .regex(/^[a-zA-Z0-9_-]{11}$/, "Invalid YouTube ID"),
  date: z
    .string()
    .min(1, "Date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  duration: z
    .string()
    .min(1, "Duration is required")
    .regex(/^\d{1,3}:\d{2}$/, "Use format MM:SS"),
  views: z.string().default("0"),
  category: z.enum(videoCategories),
});

// ---- Blog ----

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(300),
  slug: z.string().optional(),
  excerpt: z.string().min(1, "Excerpt is required").max(500),
  content: z.string().min(1, "Content is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  category: z.string().min(1, "Category is required").max(50),
  read_time: z.string().default("5 min"),
  cover_emoji: z.string().max(10).default("📝"),
});

// ---- Match ----

export const createMatchSchema = z.object({
  home_team: z.string().min(1, "Home team is required").max(50),
  away_team: z.string().min(1, "Away team is required").max(50),
  home_flag: z.string().min(1, "Home flag is required").max(10),
  away_flag: z.string().min(1, "Away flag is required").max(10),
  kickoff: z.string().min(1, "Kickoff time is required"),
  stage: z.string().min(1, "Stage is required").max(50),
  group_name: z.string().max(10).optional().nullable(),
});

export const updateMatchScoreSchema = z.object({
  home_score: z.coerce.number().int().min(0).max(20),
  away_score: z.coerce.number().int().min(0).max(20),
  status: z.enum(["upcoming", "live", "finished"]),
});

// ---- Fantasy user ----

export const joinFantasySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff _]+$/,
      "Invalid characters"
    ),
  avatar: z.string().max(10).default("⚽"),
});

// ---- Prediction ----

export const predictionSchema = z.object({
  matchId: z.string().min(1, "Match ID is required"),
  homeScore: z.coerce.number().int().min(0).max(20),
  awayScore: z.coerce.number().int().min(0).max(20),
});

// ---- Fantasy user update (admin) ----

export const updateFantasyUserSchema = z.object({
  name: z.string().min(1, "Name is required").max(20),
  avatar: z.string().min(1, "Avatar is required").max(10),
});
