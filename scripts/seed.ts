import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

async function seed() {
  console.log("Creating tables...");

  await sql`
    CREATE TABLE IF NOT EXISTS videos (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      title_en TEXT NOT NULL,
      description TEXT NOT NULL,
      youtube_id TEXT NOT NULL,
      date TEXT NOT NULL,
      duration TEXT NOT NULL,
      views TEXT NOT NULL,
      category TEXT NOT NULL CHECK (category IN ('analysis', 'news', 'prediction', 'culture')),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS blog_posts (
      slug TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      date TEXT NOT NULL,
      category TEXT NOT NULL,
      read_time TEXT NOT NULL,
      cover_emoji TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS matches (
      id TEXT PRIMARY KEY,
      home_team TEXT NOT NULL,
      away_team TEXT NOT NULL,
      home_flag TEXT NOT NULL,
      away_flag TEXT NOT NULL,
      kickoff TIMESTAMP NOT NULL,
      home_score INTEGER,
      away_score INTEGER,
      status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'live', 'finished')),
      stage TEXT NOT NULL,
      group_name TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS fantasy_users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      avatar TEXT DEFAULT '⚽',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS predictions (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES fantasy_users(id),
      match_id TEXT NOT NULL REFERENCES matches(id),
      home_score INTEGER NOT NULL,
      away_score INTEGER NOT NULL,
      points_earned INTEGER,
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(user_id, match_id)
    )
  `;

  console.log("Tables created. Seeding data...");

  // ---- Videos ----
  const videos = [
    {
      id: "1",
      title: "為2026世界盃準備：法國2:1贏下巴西",
      titleEn: "2026 World Cup Prep: France 2:1 Brazil",
      description: "法國2:1贏下巴西、Mbappe隊長風範、歐洲區資格賽預測！",
      youtubeId: "nMVk3m_Pvew",
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
      youtubeId: "ybYZTrFmXQY",
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
      youtubeId: "HCaPPjNGcps",
      date: "2026-03-21",
      duration: "14:39",
      views: "6,747",
      category: "prediction",
    },
    {
      id: "4",
      title: "2026世足預測｜西班牙無敵艦隊重回巔峰？",
      titleEn: "2026 WC Prediction: Spain's Golden Age",
      description:
        "18歲天才Yamal聯手金球獎Rodri，無敵艦隊時隔16年能重回巔峰？",
      youtubeId: "jB8EKkvqfFY",
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
      youtubeId: "qvop7gGvI-k",
      date: "2026-02-28",
      duration: "6:03",
      views: "5,209",
      category: "culture",
    },
  ];

  for (const v of videos) {
    await sql`
      INSERT INTO videos (id, title, title_en, description, youtube_id, date, duration, views, category)
      VALUES (${v.id}, ${v.title}, ${v.titleEn}, ${v.description}, ${v.youtubeId}, ${v.date}, ${v.duration}, ${v.views}, ${v.category})
      ON CONFLICT (id) DO NOTHING
    `;
  }
  console.log(`Seeded ${videos.length} videos`);

  // ---- Blog posts ----
  const blogPosts = [
    {
      slug: "2026-world-cup-france-preview",
      title: "2026世界盃法國隊完整預覽",
      excerpt:
        "從Mbappe的傷勢到Zidane的戰術革新，深入分析法國隊在2026年世界盃的奪冠機會。",
      content: `法國隊在2026年世界盃的陣容可以說是歐洲最豪華的之一。讓我們從幾個關鍵角度來分析他們的奪冠機會。

## Mbappe 的傷勢影響

Mbappe 在皇馬的這個賽季經歷了膝蓋韌帶的反覆困擾。雖然他已經恢復訓練，但明顯能看到他的爆發力不如巔峰時期。好消息是，世界盃在六月才開始，他還有充足的時間調整狀態。

作為法國隊的隊長，即使不是100%的Mbappe，他的存在本身就是對對手的巨大威脅。他的傳球視野和跑位能力不會因為傷勢而消失。

## Zidane 的戰術革新

Zidane接手法國隊後帶來了明顯的戰術變化。他放棄了Deschamps時期的保守反擊，轉向更積極的控球打法。4-3-3陣型中，中場的Tchouameni和Camavinga提供了強大的推進能力。

最讓我興奮的是Zidane對年輕球員的大膽使用。他不怕在大賽中給新人機會，這讓法國隊的板凳深度變得非常恐怖。

## 關鍵球員

- **Mbappe**：速度可能下降，但大賽經驗和領導力是無價的
- **Tchouameni**：中場的定海神針，防守和出球都是世界級
- **Saliba**：阿森納的表現證明他已經是頂級中衛
- **Camavinga**：皇馬的經歷讓他成熟了很多，可攻可守

## 奪冠機率評估

我給法國隊的奪冠機率是 **18%**，僅次於巴西和阿根廷。如果Mbappe能恢復到90%的狀態，這個數字可以提升到22%。

法國隊最大的優勢是陣容深度。即使主力受傷，替補球員的質量也足以碾壓大多數對手。Zidane需要解決的問題是如何讓這些超級球星在短時間內形成化學反應。`,
      date: "2026-03-28",
      category: "世界盃",
      readTime: "8 min",
      coverEmoji: "🇫🇷",
    },
    {
      slug: "taiwan-football-culture",
      title: "法國人眼中的台灣足球文化",
      excerpt:
        "在台灣生活六年，我發現台灣人對足球的熱情遠比想像中深厚。從街頭踢球到深夜看歐冠，這是我的觀察。",
      content: `在來台灣之前，我以為這裡只有棒球和籃球。六年後的今天，我必須說我錯了——台灣的足球文化正在悄悄成長。

## 深夜的歐冠時光

因為時差的關係，歐冠比賽通常在台灣凌晨兩三點開始。但你知道嗎？我在台北的運動酒吧裡，總能找到一群熬夜看球的台灣球迷。他們對戰術的理解、對球員的了解，完全不輸歐洲球迷。

有一次在信義區的酒吧看皇馬對曼城，旁邊的台灣球迷竟然跟我討論Ancelotti的輪換策略。那一刻我真的很感動。

## 街頭足球的驚喜

台灣的公園和學校操場上，越來越多人在踢足球。週末去大安森林公園或河濱公園，你會看到各種年齡層的人在踢球。有台灣人、有外國人，有正式的比賽、也有隨意的傳球。

我自己也加入了一個台北的業餘足球隊。隊裡有台灣人、日本人、法國人、巴西人。每週六下午一起踢球、一起喝啤酒，這就是足球最純粹的魅力。

## 世界盃效應

每四年一次的世界盃是台灣足球熱度的最高點。2022年卡達世界盃期間，台灣的運動酒吧場場爆滿。很多平常不看足球的人也被世界盃的氛圍吸引。

2026年世界盃在北美舉辦，時差對台灣更友善。我預計這將是台灣足球文化的一次大爆發。

## 我的使命

這就是我創立ToFoot的原因。台灣有熱情的球迷，但缺少用中文深入分析歐洲足球的內容。我希望能成為這個橋樑，用我的母語文化背景和在台灣生活的經驗，帶更多台灣朋友走進足球的世界。`,
      date: "2026-03-22",
      category: "文化",
      readTime: "6 min",
      coverEmoji: "🇹🇼",
    },
    {
      slug: "yamal-next-generation",
      title: "Yamal：下一代足球巨星的誕生",
      excerpt:
        "年僅18歲的Lamine Yamal如何改變了西班牙隊的進攻體系？從他的技術特點到戰術角色的完整分析。",
      content: `Lamine Yamal 今年才18歲，但他已經是世界上最好的右翼球員之一。讓我們深入分析這位天才少年的技術特點。

## 技術特點

Yamal 最可怕的地方是他的左腳。他的盤帶動作看起來簡單，但節奏變化讓防守球員完全無法預判。他的內切射門、直塞傳球、和弧線球都是頂級水平。

跟 Messi 不同的是，Yamal 的身體對抗能力更強。他不怕身體接觸，甚至會主動尋求對抗來創造空間。這讓他在面對強壯的後衛時也不落下風。

## 戰術角色

在巴塞隆納，Yamal 主要踢右翼。他會頻繁內切到中路，為右後衛提供套邊的空間。這種打法在西班牙國家隊也得到了延續。

Luis de la Fuente 給了 Yamal 很大的自由度。他可以在前場任意遊走，不受位置限制。這種信任對年輕球員來說非常珍貴。

## 數據說話

本賽季至今，Yamal 的關鍵數據：
- 進球：14
- 助攻：11
- 每場過人次數：4.2
- 射門轉化率：21%

這些數據對一個18歲的球員來說是令人難以置信的。

## 世界盃展望

在2026世界盃上，Yamal 將是西班牙隊最重要的進攻武器。搭配金球獎得主 Rodri 在中場的調度，西班牙的進攻組合可能是本屆世界盃最恐怖的。

如果你要我說出一個可能在世界盃上一鳴驚人的球員，我的答案毫無疑問是 Lamine Yamal。`,
      date: "2026-03-15",
      category: "球員分析",
      readTime: "7 min",
      coverEmoji: "⭐",
    },
    {
      slug: "how-to-watch-european-football-taiwan",
      title: "在台灣看歐洲足球的完整指南",
      excerpt:
        "時差、轉播平台、球迷社群——新手入門歐洲足球所需的一切資訊都在這裡。",
      content: `很多台灣朋友問我：「我想開始看歐洲足球，但不知道從哪裡開始。」這篇文章就是為你寫的。

## 時差指南

歐洲足球的比賽時間對台灣球迷來說是最大的挑戰：

- **英超**：台灣時間 20:30 - 03:00（最友善）
- **西甲**：台灣時間 01:00 - 04:00
- **法甲**：台灣時間 01:00 - 04:45
- **歐冠**：台灣時間 03:00 或 04:00

週末的早場英超比賽（台灣晚上8:30）是最容易觀看的。如果你剛入門，建議從這裡開始。

## 轉播平台

在台灣觀看歐洲足球的主要方式：

1. **DAZN**：英超、西甲、法甲都有轉播，月費合理
2. **愛爾達體育**：有部分歐冠和歐洲國家聯賽的轉播
3. **YouTube 精華**：各聯賽官方頻道會上傳精華片段

我個人推薦先訂閱 DAZN，性價比最高。

## 新手該看哪個聯賽？

如果你完全沒有偏好，我的建議：

- **想看節奏快的比賽** → 英超
- **想看技術流足球** → 西甲
- **想看戰術大師對決** → 義甲
- **想支持 Tofu 的主隊** → 法甲（馬賽！）

## 球迷社群

台灣有不少活躍的足球社群：

- Facebook 各隊球迷社團
- PTT 的足球版（Soccer）
- 各大運動酒吧的觀賽活動

當然，也歡迎關注 ToFoot 的 YouTube 和 Instagram，跟我一起聊足球！`,
      date: "2026-03-08",
      category: "指南",
      readTime: "5 min",
      coverEmoji: "📺",
    },
    {
      slug: "mbappe-leadership-evolution",
      title: "Mbappe的隊長之路：從天才到領袖",
      excerpt:
        "接過隊長袖標後的Mbappe如何改變了更衣室氛圍？從皇馬到國家隊的領導力蛻變。",
      content: `Kylian Mbappe 在足球場上的天賦毋庸置疑。但成為法國隊隊長後，他面對的是一個完全不同的挑戰：領導力。

## 從巴黎到馬德里

在巴黎聖日耳曼，Mbappe 是無可爭議的核心。但那個環境對他的領導力發展其實不利——他習慣了所有人圍繞他轉。

轉會皇馬後，他必須學會在 Vinicius Jr.、Bellingham 等其他超級球星身邊找到自己的位置。這是一個痛苦但必要的成長過程。

## 隊長袖標的重量

Zidane任命Mbappe為法國隊隊長時，外界有很多質疑。很多人認為應該給更有經驗的球員，比如Griezmann或Giroud。

但Zidane看到了Mbappe的改變。在皇馬的經歷讓他學會了傾聽、學會了為隊友犧牲、學會了在低谷時鼓勵團隊。

## 更衣室的變化

據法國隊內部人士透露，Mbappe 作為隊長後做了幾件重要的事：

1. **建立溝通機制**：每次集訓前都會跟每位球員單獨對話
2. **保護年輕球員**：在媒體面前為年輕隊員擋壓力
3. **以身作則**：訓練中永遠是最拼命的那個

這些細節不會出現在比賽集錦裡，但對一支球隊的凝聚力至關重要。

## 世界盃展望

2026年世界盃將是 Mbappe 作為隊長的第一次大賽。27歲的他正處於球員生涯的黃金期。如果他能在場上保持高水平的同時，在場下帶領團隊，法國隊的奪冠機會將大大提升。

Mbappe 是否能像他的偶像 Zidane 在1998年那樣，帶領法國隊站上世界之巔？讓我們拭目以待。`,
      date: "2026-03-01",
      category: "球員分析",
      readTime: "9 min",
      coverEmoji: "👑",
    },
  ];

  for (const p of blogPosts) {
    await sql`
      INSERT INTO blog_posts (slug, title, excerpt, content, date, category, read_time, cover_emoji)
      VALUES (${p.slug}, ${p.title}, ${p.excerpt}, ${p.content}, ${p.date}, ${p.category}, ${p.readTime}, ${p.coverEmoji})
      ON CONFLICT (slug) DO NOTHING
    `;
  }
  console.log(`Seeded ${blogPosts.length} blog posts`);

  // ---- World Cup Matches ----
  const matches = [
    { id: "m1", homeTeam: "美國", awayTeam: "摩洛哥", homeFlag: "🇺🇸", awayFlag: "🇲🇦", kickoff: "2026-06-11T18:00:00Z", homeScore: null, awayScore: null, status: "upcoming", stage: "小組賽", group: "A" },
    { id: "m2", homeTeam: "墨西哥", awayTeam: "澳洲", homeFlag: "🇲🇽", awayFlag: "🇦🇺", kickoff: "2026-06-11T21:00:00Z", homeScore: null, awayScore: null, status: "upcoming", stage: "小組賽", group: "A" },
    { id: "m3", homeTeam: "法國", awayTeam: "丹麥", homeFlag: "🇫🇷", awayFlag: "🇩🇰", kickoff: "2026-06-12T15:00:00Z", homeScore: null, awayScore: null, status: "upcoming", stage: "小組賽", group: "B" },
    { id: "m4", homeTeam: "巴西", awayTeam: "塞爾維亞", homeFlag: "🇧🇷", awayFlag: "🇷🇸", kickoff: "2026-06-12T18:00:00Z", homeScore: null, awayScore: null, status: "upcoming", stage: "小組賽", group: "B" },
    { id: "m5", homeTeam: "西班牙", awayTeam: "日本", homeFlag: "🇪🇸", awayFlag: "🇯🇵", kickoff: "2026-06-12T21:00:00Z", homeScore: null, awayScore: null, status: "upcoming", stage: "小組賽", group: "C" },
    { id: "m6", homeTeam: "德國", awayTeam: "南韓", homeFlag: "🇩🇪", awayFlag: "🇰🇷", kickoff: "2026-06-13T15:00:00Z", homeScore: null, awayScore: null, status: "upcoming", stage: "小組賽", group: "C" },
    { id: "m7", homeTeam: "英格蘭", awayTeam: "奈及利亞", homeFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayFlag: "🇳🇬", kickoff: "2026-06-13T18:00:00Z", homeScore: null, awayScore: null, status: "upcoming", stage: "小組賽", group: "D" },
    { id: "m8", homeTeam: "荷蘭", awayTeam: "厄瓜多", homeFlag: "🇳🇱", awayFlag: "🇪🇨", kickoff: "2026-06-13T21:00:00Z", homeScore: null, awayScore: null, status: "upcoming", stage: "小組賽", group: "D" },
    { id: "m9", homeTeam: "阿根廷", awayTeam: "加拿大", homeFlag: "🇦🇷", awayFlag: "🇨🇦", kickoff: "2026-06-14T18:00:00Z", homeScore: null, awayScore: null, status: "upcoming", stage: "小組賽", group: "E" },
    { id: "m10", homeTeam: "葡萄牙", awayTeam: "烏拉圭", homeFlag: "🇵🇹", awayFlag: "🇺🇾", kickoff: "2026-06-14T21:00:00Z", homeScore: null, awayScore: null, status: "upcoming", stage: "小組賽", group: "E" },
    { id: "m11", homeTeam: "義大利", awayTeam: "哥倫比亞", homeFlag: "🇮🇹", awayFlag: "🇨🇴", kickoff: "2026-06-15T15:00:00Z", homeScore: null, awayScore: null, status: "upcoming", stage: "小組賽", group: "F" },
    { id: "m12", homeTeam: "比利時", awayTeam: "巴拉圭", homeFlag: "🇧🇪", awayFlag: "🇵🇾", kickoff: "2026-06-15T18:00:00Z", homeScore: null, awayScore: null, status: "upcoming", stage: "小組賽", group: "F" },
    { id: "demo1", homeTeam: "法國", awayTeam: "巴西", homeFlag: "🇫🇷", awayFlag: "🇧🇷", kickoff: "2026-03-25T20:00:00Z", homeScore: 2, awayScore: 1, status: "finished", stage: "友誼賽", group: null },
    { id: "demo2", homeTeam: "西班牙", awayTeam: "荷蘭", homeFlag: "🇪🇸", awayFlag: "🇳🇱", kickoff: "2026-03-25T20:00:00Z", homeScore: 3, awayScore: 2, status: "finished", stage: "友誼賽", group: null },
    { id: "demo3", homeTeam: "德國", awayTeam: "英格蘭", homeFlag: "🇩🇪", awayFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", kickoff: "2026-03-26T20:00:00Z", homeScore: 1, awayScore: 1, status: "finished", stage: "友誼賽", group: null },
  ];

  for (const m of matches) {
    await sql`
      INSERT INTO matches (id, home_team, away_team, home_flag, away_flag, kickoff, home_score, away_score, status, stage, group_name)
      VALUES (${m.id}, ${m.homeTeam}, ${m.awayTeam}, ${m.homeFlag}, ${m.awayFlag}, ${m.kickoff}, ${m.homeScore}, ${m.awayScore}, ${m.status}, ${m.stage}, ${m.group})
      ON CONFLICT (id) DO NOTHING
    `;
  }
  console.log(`Seeded ${matches.length} matches`);

  // ---- Demo fantasy users + predictions ----
  const demoUsers = [
    { name: "FootballKing_TW", avatar: "👑" },
    { name: "Tofu 火光", avatar: "⚽" },
    { name: "MarseilleForever", avatar: "🔵" },
    { name: "台北球迷", avatar: "🏟️" },
    { name: "Ligue1Fan", avatar: "🇫🇷" },
    { name: "WorldCup2026", avatar: "🏆" },
    { name: "高雄足球人", avatar: "⭐" },
    { name: "MbappeFan", avatar: "💨" },
    { name: "台中踢球的", avatar: "🎯" },
    { name: "新手球迷", avatar: "🌱" },
  ];

  for (const u of demoUsers) {
    await sql`
      INSERT INTO fantasy_users (name, avatar) VALUES (${u.name}, ${u.avatar})
      ON CONFLICT (name) DO NOTHING
    `;
  }
  console.log(`Seeded ${demoUsers.length} demo users`);

  // Demo predictions for the 3 finished matches
  // Match results: demo1 (2-1), demo2 (3-2), demo3 (1-1)
  const demoPredictions = [
    // FootballKing_TW: 28 pts (exact + exact + exact-ish)
    { user: "FootballKing_TW", matchId: "demo1", h: 2, a: 1, pts: 10 },
    { user: "FootballKing_TW", matchId: "demo2", h: 3, a: 2, pts: 10 },
    { user: "FootballKing_TW", matchId: "demo3", h: 2, a: 2, pts: 5 },
    // Tofu: 23 pts
    { user: "Tofu 火光", matchId: "demo1", h: 2, a: 1, pts: 10 },
    { user: "Tofu 火光", matchId: "demo2", h: 2, a: 1, pts: 3 },
    { user: "Tofu 火光", matchId: "demo3", h: 0, a: 0, pts: 5 },
    // MarseilleForever: 18 pts
    { user: "MarseilleForever", matchId: "demo1", h: 1, a: 0, pts: 5 },
    { user: "MarseilleForever", matchId: "demo2", h: 3, a: 2, pts: 10 },
    { user: "MarseilleForever", matchId: "demo3", h: 1, a: 1, pts: 3 },
    // 台北球迷: 16 pts
    { user: "台北球迷", matchId: "demo1", h: 3, a: 1, pts: 3 },
    { user: "台北球迷", matchId: "demo2", h: 2, a: 1, pts: 3 },
    { user: "台北球迷", matchId: "demo3", h: 1, a: 1, pts: 10 },
    // Ligue1Fan: 13 pts
    { user: "Ligue1Fan", matchId: "demo1", h: 2, a: 1, pts: 10 },
    { user: "Ligue1Fan", matchId: "demo2", h: 0, a: 1, pts: 0 },
    { user: "Ligue1Fan", matchId: "demo3", h: 2, a: 1, pts: 3 },
    // WorldCup2026: 11 pts
    { user: "WorldCup2026", matchId: "demo1", h: 1, a: 0, pts: 5 },
    { user: "WorldCup2026", matchId: "demo2", h: 1, a: 0, pts: 3 },
    { user: "WorldCup2026", matchId: "demo3", h: 2, a: 1, pts: 3 },
    // 高雄足球人: 8 pts
    { user: "高雄足球人", matchId: "demo1", h: 1, a: 0, pts: 5 },
    { user: "高雄足球人", matchId: "demo2", h: 0, a: 1, pts: 0 },
    { user: "高雄足球人", matchId: "demo3", h: 2, a: 2, pts: 3 },
    // MbappeFan: 6 pts
    { user: "MbappeFan", matchId: "demo1", h: 3, a: 0, pts: 3 },
    { user: "MbappeFan", matchId: "demo2", h: 1, a: 0, pts: 3 },
    { user: "MbappeFan", matchId: "demo3", h: 2, a: 0, pts: 0 },
    // 台中踢球的: 3 pts
    { user: "台中踢球的", matchId: "demo1", h: 0, a: 2, pts: 0 },
    { user: "台中踢球的", matchId: "demo2", h: 2, a: 0, pts: 3 },
    { user: "台中踢球的", matchId: "demo3", h: 0, a: 2, pts: 0 },
    // 新手球迷: 0 pts
    { user: "新手球迷", matchId: "demo1", h: 0, a: 3, pts: 0 },
    { user: "新手球迷", matchId: "demo2", h: 0, a: 0, pts: 0 },
    { user: "新手球迷", matchId: "demo3", h: 3, a: 0, pts: 0 },
  ];

  for (const p of demoPredictions) {
    const userRows = await sql`SELECT id FROM fantasy_users WHERE name = ${p.user}`;
    if (userRows.length > 0) {
      const userId = userRows[0].id;
      await sql`
        INSERT INTO predictions (user_id, match_id, home_score, away_score, points_earned)
        VALUES (${userId}, ${p.matchId}, ${p.h}, ${p.a}, ${p.pts})
        ON CONFLICT (user_id, match_id) DO NOTHING
      `;
    }
  }
  console.log(`Seeded ${demoPredictions.length} demo predictions`);

  console.log("Seed complete!");
}

seed().catch(console.error);
