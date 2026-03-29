export interface Video {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  youtubeId: string;
  date: string;
  duration: string;
  views: string;
  category: "analysis" | "news" | "prediction" | "culture";
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  coverEmoji: string;
}

export const videos: Video[] = [
  {
    id: "1",
    title: "為2026世界盃準備：法國2:1贏下巴西",
    titleEn: "2026 World Cup Prep: France 2:1 Brazil",
    description: "法國2:1贏下巴西、Mbappe隊長風範、歐洲區資格賽預測！",
    youtubeId: "dQw4w9WgXcQ",
    date: "2026-03-28",
    duration: "11:12",
    views: "3,570",
    category: "analysis",
  },
  {
    id: "2",
    title: "法國新聞更新：Griezmann轉美職",
    titleEn: "France News: Griezmann to MLS",
    description: "Griezmann轉美職、Zidane接手法國隊、Deschamps選才問題！",
    youtubeId: "dQw4w9WgXcQ",
    date: "2026-03-25",
    duration: "10:01",
    views: "3,232",
    category: "news",
  },
  {
    id: "3",
    title: "2026世足預測｜法國豪華陣容該怎麼安排？",
    titleEn: "2026 WC Prediction: France Squad",
    description: "豪華陣容該怎麼安排？Mbappe受傷法國還有希望嗎？",
    youtubeId: "dQw4w9WgXcQ",
    date: "2026-03-21",
    duration: "14:39",
    views: "6,747",
    category: "prediction",
  },
  {
    id: "4",
    title: "2026世足預測｜西班牙無敵艦隊重回巔峰？",
    titleEn: "2026 WC Prediction: Spain's Golden Age",
    description: "18歲天才Yamal聯手金球獎Rodri，無敵艦隊時隔16年能重回巔峰？",
    youtubeId: "dQw4w9WgXcQ",
    date: "2026-03-15",
    duration: "10:56",
    views: "7,694",
    category: "prediction",
  },
  {
    id: "5",
    title: "2026世足預測｜荷蘭隊會奪冠嗎？",
    titleEn: "2026 WC Prediction: Can Netherlands Win?",
    description: "看他們如何用「文化」踢出獨一無二的足球！",
    youtubeId: "dQw4w9WgXcQ",
    date: "2026-02-28",
    duration: "6:03",
    views: "5,209",
    category: "culture",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "2026-world-cup-france-preview",
    title: "2026世界盃法國隊完整預覽",
    excerpt: "從Mbappe的傷勢到Zidane的戰術革新，深入分析法國隊在2026年世界盃的奪冠機會。",
    date: "2026-03-28",
    category: "世界盃",
    readTime: "8 min",
    coverEmoji: "🇫🇷",
  },
  {
    slug: "taiwan-football-culture",
    title: "法國人眼中的台灣足球文化",
    excerpt: "在台灣生活六年，我發現台灣人對足球的熱情遠比想像中深厚。從街頭踢球到深夜看歐冠，這是我的觀察。",
    date: "2026-03-22",
    category: "文化",
    readTime: "6 min",
    coverEmoji: "🇹🇼",
  },
  {
    slug: "yamal-next-generation",
    title: "Yamal：下一代足球巨星的誕生",
    excerpt: "年僅18歲的Lamine Yamal如何改變了西班牙隊的進攻體系？從他的技術特點到戰術角色的完整分析。",
    date: "2026-03-15",
    category: "球員分析",
    readTime: "7 min",
    coverEmoji: "⭐",
  },
  {
    slug: "how-to-watch-european-football-taiwan",
    title: "在台灣看歐洲足球的完整指南",
    excerpt: "時差、轉播平台、球迷社群——新手入門歐洲足球所需的一切資訊都在這裡。",
    date: "2026-03-08",
    category: "指南",
    readTime: "5 min",
    coverEmoji: "📺",
  },
  {
    slug: "mbappe-leadership-evolution",
    title: "Mbappe的隊長之路：從天才到領袖",
    excerpt: "接過隊長袖標後的Mbappe如何改變了更衣室氛圍？從皇馬到國家隊的領導力蛻變。",
    date: "2026-03-01",
    category: "球員分析",
    readTime: "9 min",
    coverEmoji: "👑",
  },
];

export const categories = [
  { key: "all", label: "全部", labelEn: "All" },
  { key: "analysis", label: "賽事分析", labelEn: "Analysis" },
  { key: "news", label: "新聞", labelEn: "News" },
  { key: "prediction", label: "預測", labelEn: "Predictions" },
  { key: "culture", label: "文化", labelEn: "Culture" },
];
