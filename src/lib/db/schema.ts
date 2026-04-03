import {
  pgTable,
  text,
  integer,
  serial,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const videos = pgTable("videos", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  titleEn: text("title_en").notNull(),
  description: text("description").notNull(),
  youtubeId: text("youtube_id").notNull(),
  date: text("date").notNull(),
  duration: text("duration").notNull(),
  views: text("views").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  slug: text("slug").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  date: text("date").notNull(),
  category: text("category").notNull(),
  readTime: text("read_time").notNull(),
  coverEmoji: text("cover_emoji").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const matches = pgTable("matches", {
  id: text("id").primaryKey(),
  homeTeam: text("home_team").notNull(),
  awayTeam: text("away_team").notNull(),
  homeFlag: text("home_flag").notNull(),
  awayFlag: text("away_flag").notNull(),
  kickoff: text("kickoff").notNull(),
  homeScore: integer("home_score"),
  awayScore: integer("away_score"),
  status: text("status").notNull().default("upcoming"),
  stage: text("stage").notNull(),
  groupName: text("group_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const fantasyUsers = pgTable("fantasy_users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  avatar: text("avatar").default("⚽"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const predictions = pgTable(
  "predictions",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => fantasyUsers.id),
    matchId: text("match_id")
      .notNull()
      .references(() => matches.id),
    homeScore: integer("home_score").notNull(),
    awayScore: integer("away_score").notNull(),
    pointsEarned: integer("points_earned"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [unique().on(table.userId, table.matchId)]
);
