import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

async function seed() {
  console.log("Creating tables...");

  await sql`
    CREATE TABLE IF NOT EXISTS daily_players (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      nationality TEXT,
      nationality_flag TEXT,
      position TEXT,
      age INTEGER,
      club_count INTEGER,
      past_club TEXT,
      league TEXT,
      current_club TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS daily_challenges (
      id SERIAL PRIMARY KEY,
      date TEXT UNIQUE,
      player_id INTEGER REFERENCES daily_players(id)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS suggestions (
      id SERIAL PRIMARY KEY,
      name TEXT,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  console.log("Tables created. Inserting players...");

  const players = [
    // ===== FORWARDS (~30) =====
    { name: "Kylian Mbappé", nationality: "法國", nationalityFlag: "🇫🇷", position: "前鋒", age: 27, clubCount: 3, pastClub: "巴黎聖日耳曼", league: "西甲", currentClub: "皇家馬德里" },
    { name: "Erling Haaland", nationality: "挪威", nationalityFlag: "🇳🇴", position: "前鋒", age: 25, clubCount: 4, pastClub: "多特蒙德", league: "英超", currentClub: "曼城" },
    { name: "Lionel Messi", nationality: "阿根廷", nationalityFlag: "🇦🇷", position: "前鋒", age: 38, clubCount: 4, pastClub: "巴黎聖日耳曼", league: "美職", currentClub: "邁阿密國際" },
    { name: "Cristiano Ronaldo", nationality: "葡萄牙", nationalityFlag: "🇵🇹", position: "前鋒", age: 41, clubCount: 6, pastClub: "曼聯", league: "沙烏地聯賽", currentClub: "艾納斯" },
    { name: "Vinicius Jr", nationality: "巴西", nationalityFlag: "🇧🇷", position: "前鋒", age: 25, clubCount: 2, pastClub: "弗拉門戈", league: "西甲", currentClub: "皇家馬德里" },
    { name: "Lamine Yamal", nationality: "西班牙", nationalityFlag: "🇪🇸", position: "前鋒", age: 18, clubCount: 1, pastClub: "巴塞隆納B隊", league: "西甲", currentClub: "巴塞隆納" },
    { name: "Mohamed Salah", nationality: "埃及", nationalityFlag: "🇪🇬", position: "前鋒", age: 33, clubCount: 5, pastClub: "羅馬", league: "英超", currentClub: "利物浦" },
    { name: "Harry Kane", nationality: "英格蘭", nationalityFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "前鋒", age: 32, clubCount: 2, pastClub: "托特納姆熱刺", league: "德甲", currentClub: "拜仁慕尼黑" },
    { name: "Son Heung-min", nationality: "南韓", nationalityFlag: "🇰🇷", position: "前鋒", age: 33, clubCount: 4, pastClub: "勒沃庫森", league: "英超", currentClub: "托特納姆熱刺" },
    { name: "Victor Osimhen", nationality: "奈及利亞", nationalityFlag: "🇳🇬", position: "前鋒", age: 27, clubCount: 5, pastClub: "拿坡里", league: "英超", currentClub: "乍爾西" },
    { name: "Bukayo Saka", nationality: "英格蘭", nationalityFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "前鋒", age: 24, clubCount: 1, pastClub: "阿森納青年隊", league: "英超", currentClub: "阿森納" },
    { name: "Cole Palmer", nationality: "英格蘭", nationalityFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "前鋒", age: 23, clubCount: 2, pastClub: "曼城", league: "英超", currentClub: "乍爾西" },
    { name: "Julián Álvarez", nationality: "阿根廷", nationalityFlag: "🇦🇷", position: "前鋒", age: 26, clubCount: 3, pastClub: "曼城", league: "西甲", currentClub: "馬德里競技" },
    { name: "Rafael Leão", nationality: "葡萄牙", nationalityFlag: "🇵🇹", position: "前鋒", age: 26, clubCount: 3, pastClub: "里爾", league: "義甲", currentClub: "AC米蘭" },
    { name: "Randal Kolo Muani", nationality: "法國", nationalityFlag: "🇫🇷", position: "前鋒", age: 27, clubCount: 4, pastClub: "巴黎聖日耳曼", league: "義甲", currentClub: "尤文圖斯" },
    { name: "Marcus Rashford", nationality: "英格蘭", nationalityFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "前鋒", age: 28, clubCount: 2, pastClub: "曼聯", league: "西甲", currentClub: "巴塞隆納" },
    { name: "Robert Lewandowski", nationality: "波蘭", nationalityFlag: "🇵🇱", position: "前鋒", age: 37, clubCount: 4, pastClub: "拜仁慕尼黑", league: "西甲", currentClub: "巴塞隆納" },
    { name: "Lautaro Martínez", nationality: "阿根廷", nationalityFlag: "🇦🇷", position: "前鋒", age: 28, clubCount: 2, pastClub: "拉辛競技", league: "義甲", currentClub: "國際米蘭" },
    { name: "Karim Benzema", nationality: "法國", nationalityFlag: "🇫🇷", position: "前鋒", age: 38, clubCount: 3, pastClub: "皇家馬德里", league: "沙烏地聯賽", currentClub: "吉達聯合" },
    { name: "Neymar Jr", nationality: "巴西", nationalityFlag: "🇧🇷", position: "前鋒", age: 34, clubCount: 4, pastClub: "艾希拉爾", league: "巴甲", currentClub: "桑托斯" },
    { name: "Ousmane Dembélé", nationality: "法國", nationalityFlag: "🇫🇷", position: "前鋒", age: 28, clubCount: 4, pastClub: "巴塞隆納", league: "法甲", currentClub: "巴黎聖日耳曼" },
    { name: "Khvicha Kvaratskhelia", nationality: "喬治亞", nationalityFlag: "🇬🇪", position: "前鋒", age: 25, clubCount: 4, pastClub: "拿坡里", league: "法甲", currentClub: "巴黎聖日耳曼" },
    { name: "Phil Foden", nationality: "英格蘭", nationalityFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "前鋒", age: 25, clubCount: 1, pastClub: "曼城青年隊", league: "英超", currentClub: "曼城" },
    { name: "Alexander Isak", nationality: "瑞典", nationalityFlag: "🇸🇪", position: "前鋒", age: 26, clubCount: 4, pastClub: "皇家社會", league: "英超", currentClub: "紐卡索聯" },
    { name: "Darwin Núñez", nationality: "烏拉圭", nationalityFlag: "🇺🇾", position: "前鋒", age: 26, clubCount: 4, pastClub: "本菲卡", league: "英超", currentClub: "利物浦" },
    { name: "Dusan Vlahovic", nationality: "塞爾維亞", nationalityFlag: "🇷🇸", position: "前鋒", age: 26, clubCount: 3, pastClub: "費倫提那", league: "義甲", currentClub: "尤文圖斯" },
    { name: "Nico Williams", nationality: "西班牙", nationalityFlag: "🇪🇸", position: "前鋒", age: 23, clubCount: 1, pastClub: "畢爾包青年隊", league: "西甲", currentClub: "畢爾包競技" },
    { name: "Sadio Mané", nationality: "塞內加爾", nationalityFlag: "🇸🇳", position: "前鋒", age: 34, clubCount: 5, pastClub: "拜仁慕尼黑", league: "沙烏地聯賽", currentClub: "艾納斯" },
    { name: "Leroy Sané", nationality: "德國", nationalityFlag: "🇩🇪", position: "前鋒", age: 30, clubCount: 3, pastClub: "曼城", league: "德甲", currentClub: "拜仁慕尼黑" },
    { name: "Antoine Griezmann", nationality: "法國", nationalityFlag: "🇫🇷", position: "前鋒", age: 35, clubCount: 4, pastClub: "馬德里競技", league: "美職", currentClub: "洛杉磯FC" },

    // ===== MIDFIELDERS (~30) =====
    { name: "Jude Bellingham", nationality: "英格蘭", nationalityFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "中場", age: 22, clubCount: 2, pastClub: "多特蒙德", league: "西甲", currentClub: "皇家馬德里" },
    { name: "Kevin De Bruyne", nationality: "比利時", nationalityFlag: "🇧🇪", position: "中場", age: 34, clubCount: 4, pastClub: "沃爾夫斯堡", league: "英超", currentClub: "曼城" },
    { name: "Rodri", nationality: "西班牙", nationalityFlag: "🇪🇸", position: "中場", age: 29, clubCount: 3, pastClub: "馬德里競技", league: "英超", currentClub: "曼城" },
    { name: "Bruno Fernandes", nationality: "葡萄牙", nationalityFlag: "🇵🇹", position: "中場", age: 31, clubCount: 4, pastClub: "里斯本競技", league: "英超", currentClub: "曼聯" },
    { name: "Pedri", nationality: "西班牙", nationalityFlag: "🇪🇸", position: "中場", age: 23, clubCount: 2, pastClub: "拉斯帕爾馬斯", league: "西甲", currentClub: "巴塞隆納" },
    { name: "Gavi", nationality: "西班牙", nationalityFlag: "🇪🇸", position: "中場", age: 21, clubCount: 1, pastClub: "巴塞隆納青年隊", league: "西甲", currentClub: "巴塞隆納" },
    { name: "Declan Rice", nationality: "英格蘭", nationalityFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "中場", age: 27, clubCount: 2, pastClub: "西漢姆聯", league: "英超", currentClub: "阿森納" },
    { name: "Jamal Musiala", nationality: "德國", nationalityFlag: "🇩🇪", position: "中場", age: 23, clubCount: 1, pastClub: "拜仁慕尼黑青年隊", league: "德甲", currentClub: "拜仁慕尼黑" },
    { name: "Florian Wirtz", nationality: "德國", nationalityFlag: "🇩🇪", position: "中場", age: 22, clubCount: 2, pastClub: "科隆", league: "德甲", currentClub: "勒沃庫森" },
    { name: "Federico Valverde", nationality: "烏拉圭", nationalityFlag: "🇺🇾", position: "中場", age: 27, clubCount: 2, pastClub: "佩納羅爾", league: "西甲", currentClub: "皇家馬德里" },
    { name: "Aurélien Tchouaméni", nationality: "法國", nationalityFlag: "🇫🇷", position: "中場", age: 26, clubCount: 3, pastClub: "摩納哥", league: "西甲", currentClub: "皇家馬德里" },
    { name: "Eduardo Camavinga", nationality: "法國", nationalityFlag: "🇫🇷", position: "中場", age: 23, clubCount: 2, pastClub: "雷恩", league: "西甲", currentClub: "皇家馬德里" },
    { name: "Martin Ødegaard", nationality: "挪威", nationalityFlag: "🇳🇴", position: "中場", age: 27, clubCount: 3, pastClub: "皇家馬德里", league: "英超", currentClub: "阿森納" },
    { name: "Bernardo Silva", nationality: "葡萄牙", nationalityFlag: "🇵🇹", position: "中場", age: 31, clubCount: 3, pastClub: "摩納哥", league: "英超", currentClub: "曼城" },
    { name: "Nicolò Barella", nationality: "義大利", nationalityFlag: "🇮🇹", position: "中場", age: 29, clubCount: 3, pastClub: "卡利亞里", league: "義甲", currentClub: "國際米蘭" },
    { name: "Luka Modrić", nationality: "克羅埃西亞", nationalityFlag: "🇭🇷", position: "中場", age: 40, clubCount: 4, pastClub: "托特納姆熱刺", league: "西甲", currentClub: "皇家馬德里" },
    { name: "Toni Kroos", nationality: "德國", nationalityFlag: "🇩🇪", position: "中場", age: 36, clubCount: 3, pastClub: "皇家馬德里", league: "退役", currentClub: "已退役" },
    { name: "Vitinha", nationality: "葡萄牙", nationalityFlag: "🇵🇹", position: "中場", age: 25, clubCount: 3, pastClub: "波爾圖", league: "法甲", currentClub: "巴黎聖日耳曼" },
    { name: "Warren Zaïre-Emery", nationality: "法國", nationalityFlag: "🇫🇷", position: "中場", age: 19, clubCount: 1, pastClub: "巴黎聖日耳曼青年隊", league: "法甲", currentClub: "巴黎聖日耳曼" },
    { name: "Sandro Tonali", nationality: "義大利", nationalityFlag: "🇮🇹", position: "中場", age: 25, clubCount: 3, pastClub: "AC米蘭", league: "英超", currentClub: "紐卡索聯" },
    { name: "Dani Olmo", nationality: "西班牙", nationalityFlag: "🇪🇸", position: "中場", age: 27, clubCount: 3, pastClub: "萊比錫", league: "西甲", currentClub: "巴塞隆納" },
    { name: "Alexis Mac Allister", nationality: "阿根廷", nationalityFlag: "🇦🇷", position: "中場", age: 27, clubCount: 3, pastClub: "布萊頓", league: "英超", currentClub: "利物浦" },
    { name: "James Rodríguez", nationality: "哥倫比亞", nationalityFlag: "🇨🇴", position: "中場", age: 34, clubCount: 8, pastClub: "皇家馬德里", league: "墨超", currentClub: "萊昂" },
    { name: "Enzo Fernández", nationality: "阿根廷", nationalityFlag: "🇦🇷", position: "中場", age: 25, clubCount: 3, pastClub: "本菲卡", league: "英超", currentClub: "乍爾西" },
    { name: "Kobbie Mainoo", nationality: "英格蘭", nationalityFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "中場", age: 20, clubCount: 1, pastClub: "曼聯青年隊", league: "英超", currentClub: "曼聯" },
    { name: "Xavi Simons", nationality: "荷蘭", nationalityFlag: "🇳🇱", position: "中場", age: 22, clubCount: 3, pastClub: "巴黎聖日耳曼", league: "德甲", currentClub: "萊比錫" },
    { name: "Dominik Szoboszlai", nationality: "匈牙利", nationalityFlag: "🇭🇺", position: "中場", age: 25, clubCount: 4, pastClub: "萊比錫", league: "英超", currentClub: "利物浦" },
    { name: "N'Golo Kanté", nationality: "法國", nationalityFlag: "🇫🇷", position: "中場", age: 35, clubCount: 4, pastClub: "乍爾西", league: "沙烏地聯賽", currentClub: "艾伊蒂哈德" },
    { name: "Youri Tielemans", nationality: "比利時", nationalityFlag: "🇧🇪", position: "中場", age: 28, clubCount: 4, pastClub: "萊斯特城", league: "英超", currentClub: "阿斯頓維拉" },
    { name: "Mason Mount", nationality: "英格蘭", nationalityFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "中場", age: 27, clubCount: 2, pastClub: "乍爾西", league: "英超", currentClub: "曼聯" },

    // ===== DEFENDERS (~30) =====
    { name: "Virgil van Dijk", nationality: "荷蘭", nationalityFlag: "🇳🇱", position: "後衛", age: 34, clubCount: 4, pastClub: "南安普頓", league: "英超", currentClub: "利物浦" },
    { name: "Rúben Dias", nationality: "葡萄牙", nationalityFlag: "🇵🇹", position: "後衛", age: 28, clubCount: 2, pastClub: "本菲卡", league: "英超", currentClub: "曼城" },
    { name: "William Saliba", nationality: "法國", nationalityFlag: "🇫🇷", position: "後衛", age: 25, clubCount: 3, pastClub: "馬賽", league: "英超", currentClub: "阿森納" },
    { name: "Ronald Araújo", nationality: "烏拉圭", nationalityFlag: "🇺🇾", position: "後衛", age: 27, clubCount: 2, pastClub: "波士頓河床", league: "西甲", currentClub: "巴塞隆納" },
    { name: "Alessandro Bastoni", nationality: "義大利", nationalityFlag: "🇮🇹", position: "後衛", age: 26, clubCount: 3, pastClub: "帕爾馬", league: "義甲", currentClub: "國際米蘭" },
    { name: "Josko Gvardiol", nationality: "克羅埃西亞", nationalityFlag: "🇭🇷", position: "後衛", age: 24, clubCount: 3, pastClub: "萊比錫", league: "英超", currentClub: "曼城" },
    { name: "Trent Alexander-Arnold", nationality: "英格蘭", nationalityFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "後衛", age: 27, clubCount: 2, pastClub: "利物浦", league: "西甲", currentClub: "皇家馬德里" },
    { name: "Achraf Hakimi", nationality: "摩洛哥", nationalityFlag: "🇲🇦", position: "後衛", age: 27, clubCount: 4, pastClub: "國際米蘭", league: "法甲", currentClub: "巴黎聖日耳曼" },
    { name: "Theo Hernández", nationality: "法國", nationalityFlag: "🇫🇷", position: "後衛", age: 28, clubCount: 3, pastClub: "皇家馬德里", league: "義甲", currentClub: "AC米蘭" },
    { name: "Marquinhos", nationality: "巴西", nationalityFlag: "🇧🇷", position: "後衛", age: 31, clubCount: 2, pastClub: "羅馬", league: "法甲", currentClub: "巴黎聖日耳曼" },
    { name: "Antonio Rüdiger", nationality: "德國", nationalityFlag: "🇩🇪", position: "後衛", age: 33, clubCount: 4, pastClub: "乍爾西", league: "西甲", currentClub: "皇家馬德里" },
    { name: "Jules Koundé", nationality: "法國", nationalityFlag: "🇫🇷", position: "後衛", age: 27, clubCount: 3, pastClub: "塞維利亞", league: "西甲", currentClub: "巴塞隆納" },
    { name: "Dayot Upamecano", nationality: "法國", nationalityFlag: "🇫🇷", position: "後衛", age: 27, clubCount: 3, pastClub: "萊比錫", league: "德甲", currentClub: "拜仁慕尼黑" },
    { name: "Lisandro Martínez", nationality: "阿根廷", nationalityFlag: "🇦🇷", position: "後衛", age: 28, clubCount: 3, pastClub: "阿賈克斯", league: "英超", currentClub: "曼聯" },
    { name: "Kim Min-jae", nationality: "南韓", nationalityFlag: "🇰🇷", position: "後衛", age: 29, clubCount: 4, pastClub: "拿坡里", league: "德甲", currentClub: "拜仁慕尼黑" },
    { name: "Pau Cubarsí", nationality: "西班牙", nationalityFlag: "🇪🇸", position: "後衛", age: 18, clubCount: 1, pastClub: "巴塞隆納青年隊", league: "西甲", currentClub: "巴塞隆納" },
    { name: "Gabriel Magalhães", nationality: "巴西", nationalityFlag: "🇧🇷", position: "後衛", age: 28, clubCount: 3, pastClub: "里爾", league: "英超", currentClub: "阿森納" },
    { name: "Andrew Robertson", nationality: "蘇格蘭", nationalityFlag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", position: "後衛", age: 32, clubCount: 3, pastClub: "赫爾城", league: "英超", currentClub: "利物浦" },
    { name: "Dani Carvajal", nationality: "西班牙", nationalityFlag: "🇪🇸", position: "後衛", age: 34, clubCount: 2, pastClub: "勒沃庫森", league: "西甲", currentClub: "皇家馬德里" },
    { name: "Alphonso Davies", nationality: "加拿大", nationalityFlag: "🇨🇦", position: "後衛", age: 25, clubCount: 2, pastClub: "溫哥華白浪", league: "西甲", currentClub: "皇家馬德里" },
    { name: "Raphaël Varane", nationality: "法國", nationalityFlag: "🇫🇷", position: "後衛", age: 33, clubCount: 4, pastClub: "曼聯", league: "義甲", currentClub: "科莫" },
    { name: "Jonathan Tah", nationality: "德國", nationalityFlag: "🇩🇪", position: "後衛", age: 30, clubCount: 2, pastClub: "勒沃庫森", league: "德甲", currentClub: "拜仁慕尼黑" },
    { name: "Micky van de Ven", nationality: "荷蘭", nationalityFlag: "🇳🇱", position: "後衛", age: 24, clubCount: 3, pastClub: "沃爾夫斯堡", league: "英超", currentClub: "托特納姆熱刺" },
    { name: "Kyle Walker", nationality: "英格蘭", nationalityFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "後衛", age: 35, clubCount: 4, pastClub: "曼城", league: "義甲", currentClub: "AC米蘭" },
    { name: "Sergio Ramos", nationality: "西班牙", nationalityFlag: "🇪🇸", position: "後衛", age: 40, clubCount: 4, pastClub: "巴黎聖日耳曼", league: "退役", currentClub: "已退役" },
    { name: "João Cancelo", nationality: "葡萄牙", nationalityFlag: "🇵🇹", position: "後衛", age: 31, clubCount: 6, pastClub: "曼城", league: "沙烏地聯賽", currentClub: "艾希拉爾" },
    { name: "Jordi Alba", nationality: "西班牙", nationalityFlag: "🇪🇸", position: "後衛", age: 37, clubCount: 3, pastClub: "巴塞隆納", league: "美職", currentClub: "邁阿密國際" },
    { name: "Marc Cucurella", nationality: "西班牙", nationalityFlag: "🇪🇸", position: "後衛", age: 27, clubCount: 4, pastClub: "布萊頓", league: "英超", currentClub: "乍爾西" },
    { name: "Alejandro Balde", nationality: "西班牙", nationalityFlag: "🇪🇸", position: "後衛", age: 22, clubCount: 1, pastClub: "巴塞隆納青年隊", league: "西甲", currentClub: "巴塞隆納" },
    { name: "Ben White", nationality: "英格蘭", nationalityFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "後衛", age: 28, clubCount: 4, pastClub: "布萊頓", league: "英超", currentClub: "阿森納" },

    // ===== GOALKEEPERS (~10) =====
    { name: "Gianluigi Donnarumma", nationality: "義大利", nationalityFlag: "🇮🇹", position: "門將", age: 27, clubCount: 2, pastClub: "AC米蘭", league: "法甲", currentClub: "巴黎聖日耳曼" },
    { name: "Alisson Becker", nationality: "巴西", nationalityFlag: "🇧🇷", position: "門將", age: 33, clubCount: 3, pastClub: "羅馬", league: "英超", currentClub: "利物浦" },
    { name: "Ederson", nationality: "巴西", nationalityFlag: "🇧🇷", position: "門將", age: 32, clubCount: 3, pastClub: "本菲卡", league: "英超", currentClub: "曼城" },
    { name: "Thibaut Courtois", nationality: "比利時", nationalityFlag: "🇧🇪", position: "門將", age: 33, clubCount: 4, pastClub: "乍爾西", league: "西甲", currentClub: "皇家馬德里" },
    { name: "Manuel Neuer", nationality: "德國", nationalityFlag: "🇩🇪", position: "門將", age: 40, clubCount: 2, pastClub: "沙爾克04", league: "德甲", currentClub: "拜仁慕尼黑" },
    { name: "André Onana", nationality: "喀麥隆", nationalityFlag: "🇨🇲", position: "門將", age: 29, clubCount: 4, pastClub: "國際米蘭", league: "英超", currentClub: "曼聯" },
    { name: "Marc-André ter Stegen", nationality: "德國", nationalityFlag: "🇩🇪", position: "門將", age: 34, clubCount: 2, pastClub: "慕興格拉德巴赫", league: "西甲", currentClub: "巴塞隆納" },
    { name: "Emiliano Martínez", nationality: "阿根廷", nationalityFlag: "🇦🇷", position: "門將", age: 33, clubCount: 4, pastClub: "阿森納", league: "英超", currentClub: "阿斯頓維拉" },
    { name: "Mike Maignan", nationality: "法國", nationalityFlag: "🇫🇷", position: "門將", age: 30, clubCount: 3, pastClub: "里爾", league: "義甲", currentClub: "AC米蘭" },
    { name: "David Raya", nationality: "西班牙", nationalityFlag: "🇪🇸", position: "門將", age: 30, clubCount: 3, pastClub: "布倫特福德", league: "英超", currentClub: "阿森納" },
  ];

  for (const p of players) {
    await sql`
      INSERT INTO daily_players (name, nationality, nationality_flag, position, age, club_count, past_club, league, current_club)
      VALUES (${p.name}, ${p.nationality}, ${p.nationalityFlag}, ${p.position}, ${p.age}, ${p.clubCount}, ${p.pastClub}, ${p.league}, ${p.currentClub})
      ON CONFLICT DO NOTHING
    `;
  }

  console.log(`Seeded ${players.length} daily players`);
  console.log("Seed complete!");
}

seed().catch(console.error);
