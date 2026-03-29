export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  kickoff: string; // ISO date
  homeScore: number | null;
  awayScore: number | null;
  status: "upcoming" | "live" | "finished";
  stage: string;
  group?: string;
}

export interface Prediction {
  matchId: string;
  homeScore: number;
  awayScore: number;
  pointsEarned: number | null;
  createdAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  totalPoints: number;
  exactScores: number;
  correctResults: number;
  totalPredictions: number;
}

// 2026 World Cup Group Stage Matches (sample)
export const worldCupMatches: Match[] = [
  // Group A
  {
    id: "m1",
    homeTeam: "美國",
    awayTeam: "摩洛哥",
    homeFlag: "🇺🇸",
    awayFlag: "🇲🇦",
    kickoff: "2026-06-11T18:00:00Z",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    stage: "小組賽",
    group: "A",
  },
  {
    id: "m2",
    homeTeam: "墨西哥",
    awayTeam: "澳洲",
    homeFlag: "🇲🇽",
    awayFlag: "🇦🇺",
    kickoff: "2026-06-11T21:00:00Z",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    stage: "小組賽",
    group: "A",
  },
  // Group B
  {
    id: "m3",
    homeTeam: "法國",
    awayTeam: "丹麥",
    homeFlag: "🇫🇷",
    awayFlag: "🇩🇰",
    kickoff: "2026-06-12T15:00:00Z",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    stage: "小組賽",
    group: "B",
  },
  {
    id: "m4",
    homeTeam: "巴西",
    awayTeam: "塞爾維亞",
    homeFlag: "🇧🇷",
    awayFlag: "🇷🇸",
    kickoff: "2026-06-12T18:00:00Z",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    stage: "小組賽",
    group: "B",
  },
  // Group C
  {
    id: "m5",
    homeTeam: "西班牙",
    awayTeam: "日本",
    homeFlag: "🇪🇸",
    awayFlag: "🇯🇵",
    kickoff: "2026-06-12T21:00:00Z",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    stage: "小組賽",
    group: "C",
  },
  {
    id: "m6",
    homeTeam: "德國",
    awayTeam: "南韓",
    homeFlag: "🇩🇪",
    awayFlag: "🇰🇷",
    kickoff: "2026-06-13T15:00:00Z",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    stage: "小組賽",
    group: "C",
  },
  // Group D
  {
    id: "m7",
    homeTeam: "英格蘭",
    awayTeam: "奈及利亞",
    homeFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    awayFlag: "🇳🇬",
    kickoff: "2026-06-13T18:00:00Z",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    stage: "小組賽",
    group: "D",
  },
  {
    id: "m8",
    homeTeam: "荷蘭",
    awayTeam: "厄瓜多",
    homeFlag: "🇳🇱",
    awayFlag: "🇪🇨",
    kickoff: "2026-06-13T21:00:00Z",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    stage: "小組賽",
    group: "D",
  },
  // Group E
  {
    id: "m9",
    homeTeam: "阿根廷",
    awayTeam: "加拿大",
    homeFlag: "🇦🇷",
    awayFlag: "🇨🇦",
    kickoff: "2026-06-14T18:00:00Z",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    stage: "小組賽",
    group: "E",
  },
  {
    id: "m10",
    homeTeam: "葡萄牙",
    awayTeam: "烏拉圭",
    homeFlag: "🇵🇹",
    awayFlag: "🇺🇾",
    kickoff: "2026-06-14T21:00:00Z",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    stage: "小組賽",
    group: "E",
  },
  // Group F
  {
    id: "m11",
    homeTeam: "義大利",
    awayTeam: "哥倫比亞",
    homeFlag: "🇮🇹",
    awayFlag: "🇨🇴",
    kickoff: "2026-06-15T15:00:00Z",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    stage: "小組賽",
    group: "F",
  },
  {
    id: "m12",
    homeTeam: "比利時",
    awayTeam: "巴拉圭",
    homeFlag: "🇧🇪",
    awayFlag: "🇵🇾",
    kickoff: "2026-06-15T18:00:00Z",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    stage: "小組賽",
    group: "F",
  },
  // Finished demo matches (for leaderboard demo)
  {
    id: "demo1",
    homeTeam: "法國",
    awayTeam: "巴西",
    homeFlag: "🇫🇷",
    awayFlag: "🇧🇷",
    kickoff: "2026-03-25T20:00:00Z",
    homeScore: 2,
    awayScore: 1,
    status: "finished",
    stage: "友誼賽",
  },
  {
    id: "demo2",
    homeTeam: "西班牙",
    awayTeam: "荷蘭",
    homeFlag: "🇪🇸",
    awayFlag: "🇳🇱",
    kickoff: "2026-03-25T20:00:00Z",
    homeScore: 3,
    awayScore: 2,
    status: "finished",
    stage: "友誼賽",
  },
  {
    id: "demo3",
    homeTeam: "德國",
    awayTeam: "英格蘭",
    homeFlag: "🇩🇪",
    awayFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    kickoff: "2026-03-26T20:00:00Z",
    homeScore: 1,
    awayScore: 1,
    status: "finished",
    stage: "友誼賽",
  },
];

// Demo leaderboard data
export const demoLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "FootballKing_TW", avatar: "👑", totalPoints: 28, exactScores: 2, correctResults: 3, totalPredictions: 3 },
  { rank: 2, name: "Tofu 火光", avatar: "⚽", totalPoints: 23, exactScores: 1, correctResults: 3, totalPredictions: 3 },
  { rank: 3, name: "MarseilleForever", avatar: "🔵", totalPoints: 18, exactScores: 1, correctResults: 2, totalPredictions: 3 },
  { rank: 4, name: "台北球迷", avatar: "🏟️", totalPoints: 16, exactScores: 0, correctResults: 3, totalPredictions: 3 },
  { rank: 5, name: "Ligue1Fan", avatar: "🇫🇷", totalPoints: 13, exactScores: 1, correctResults: 1, totalPredictions: 3 },
  { rank: 6, name: "WorldCup2026", avatar: "🏆", totalPoints: 11, exactScores: 0, correctResults: 2, totalPredictions: 3 },
  { rank: 7, name: "高雄足球人", avatar: "⭐", totalPoints: 8, exactScores: 0, correctResults: 2, totalPredictions: 3 },
  { rank: 8, name: "MbappeFan", avatar: "💨", totalPoints: 6, exactScores: 0, correctResults: 1, totalPredictions: 3 },
  { rank: 9, name: "台中踢球的", avatar: "🎯", totalPoints: 3, exactScores: 0, correctResults: 1, totalPredictions: 3 },
  { rank: 10, name: "新手球迷", avatar: "🌱", totalPoints: 0, exactScores: 0, correctResults: 0, totalPredictions: 3 },
];
