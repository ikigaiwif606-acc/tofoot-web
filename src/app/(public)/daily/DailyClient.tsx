"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface Clues {
  nationality: string;
  nationalityFlag: string;
  position: string;
  clubCount: number;
  pastClub: string;
  league: string;
  currentClub: string;
}

interface GameState {
  date: string;
  guesses: string[];
  solved: boolean;
}

const MAX_GUESSES = 6;
const STORAGE_PREFIX = "tofoot_daily_";

function loadGameState(date: string): GameState {
  if (typeof window === "undefined") return { date, guesses: [], solved: false };
  const raw = localStorage.getItem(STORAGE_PREFIX + date);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      /* ignore */
    }
  }
  return { date, guesses: [], solved: false };
}

function saveGameState(state: GameState) {
  localStorage.setItem(STORAGE_PREFIX + state.date, JSON.stringify(state));
}

export default function DailyClient({
  date,
  challengeNumber,
  answer,
  clues,
  playerNames,
}: {
  date: string;
  challengeNumber: number;
  answer: string;
  clues: Clues;
  playerNames: string[];
}) {
  const [game, setGame] = useState<GameState>({ date, guesses: [], solved: false });
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setGame(loadGameState(date));
  }, [date]);

  const cluesRevealed = Math.min(1 + game.guesses.filter((g) => g !== answer).length, 5);
  const isGameOver = game.solved || game.guesses.length >= MAX_GUESSES;

  const filteredNames = input.length >= 1
    ? playerNames
        .filter(
          (name) =>
            name.toLowerCase().includes(input.toLowerCase()) &&
            !game.guesses.includes(name)
        )
        .slice(0, 8)
    : [];

  function submitGuess(playerName: string) {
    if (isGameOver) return;
    if (game.guesses.includes(playerName)) {
      toast.error("你已經猜過這位球員了");
      return;
    }

    const newGuesses = [...game.guesses, playerName];
    const solved = playerName === answer;
    const newState: GameState = { date, guesses: newGuesses, solved };

    setGame(newState);
    saveGameState(newState);
    setInput("");
    setShowSuggestions(false);

    if (solved) {
      toast.success("答對了！🎉");
    } else if (newGuesses.length >= MAX_GUESSES) {
      toast.error(`答案是 ${answer}`);
    }
  }

  function handleShare() {
    const emojiResult = game.guesses
      .map((g) => (g === answer ? "🟩" : "🟥"))
      .join("");
    const text = `誰是我？ #${challengeNumber} ⚽\n${emojiResult} ${game.guesses.length}/${MAX_GUESSES}\n\ntofoot.com/daily`;
    navigator.clipboard.writeText(text);
    toast.success("已複製到剪貼簿！");
  }

  const clueData = [
    {
      label: "國籍 & 位置",
      value: `${clues.nationalityFlag} ${clues.nationality} · ${clues.position}`,
      revealed: cluesRevealed >= 1,
    },
    {
      label: "效力過的俱樂部數",
      value: `${clues.clubCount} 間俱樂部`,
      revealed: cluesRevealed >= 2,
    },
    {
      label: "曾效力",
      value: clues.pastClub,
      revealed: cluesRevealed >= 3,
    },
    {
      label: "目前聯賽",
      value: clues.league,
      revealed: cluesRevealed >= 4,
    },
    {
      label: "目前俱樂部",
      value: clues.currentClub,
      revealed: cluesRevealed >= 5,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          誰是我？ <span className="text-accent">#{challengeNumber}</span>
        </h1>
        <p className="mt-1 text-sm text-muted">
          每天猜一位足球員 · {date}
        </p>
      </div>

      {/* Clues */}
      <div className="mt-8 space-y-3">
        {clueData.map((clue, i) => (
          <div
            key={i}
            className={`card transition-all ${
              clue.revealed
                ? "animate-slide-up"
                : "opacity-30 blur-sm select-none"
            }`}
          >
            <div className="text-xs text-muted font-medium uppercase tracking-wider">
              線索 {i + 1}: {clue.label}
            </div>
            <div className="mt-1 text-lg font-semibold">
              {clue.revealed ? clue.value : "???"}
            </div>
          </div>
        ))}
      </div>

      {/* Guesses */}
      {game.guesses.length > 0 && (
        <div className="mt-6">
          <div className="text-xs text-muted font-medium uppercase tracking-wider mb-2">
            你的猜測
          </div>
          <div className="space-y-2">
            {game.guesses.map((guess, i) => (
              <div
                key={i}
                className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium ${
                  guess === answer
                    ? "bg-success/15 text-success border border-success/30"
                    : "bg-danger/10 text-danger border border-danger/20"
                }`}
              >
                <span>{guess}</span>
                <span>{guess === answer ? "✓ 正確！" : "✗"}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guess counter */}
      <div className="mt-4 flex justify-center gap-1.5">
        {Array.from({ length: MAX_GUESSES }).map((_, i) => (
          <div
            key={i}
            className={`h-2 w-8 rounded-full ${
              i < game.guesses.length
                ? game.guesses[i] === answer
                  ? "bg-success"
                  : "bg-danger"
                : "bg-card-border"
            }`}
          />
        ))}
      </div>

      {/* Input or result */}
      {isGameOver ? (
        <div className="mt-8 text-center">
          <div className="card">
            <div className="text-2xl font-bold">
              {game.solved ? "🎉 恭喜！" : "😢 明天再試！"}
            </div>
            <div className="mt-2 text-muted">
              答案是{" "}
              <span className="font-bold text-foreground">{answer}</span>
            </div>
            <div className="mt-1 text-sm text-muted">
              {game.guesses.length}/{MAX_GUESSES} 次猜測
            </div>
          </div>
          <button
            onClick={handleShare}
            className="mt-4 rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
          >
            分享結果
          </button>
        </div>
      ) : (
        <div className="relative mt-6">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="輸入球員名字..."
            className="w-full rounded-lg border border-card-border bg-black/20 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50"
          />

          {/* Autocomplete dropdown */}
          {showSuggestions && filteredNames.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-10 mt-1 max-h-60 overflow-y-auto rounded-lg border border-card-border bg-background shadow-lg">
              {filteredNames.map((name) => (
                <button
                  key={name}
                  onClick={() => submitGuess(name)}
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-surface-hover transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  {name}
                </button>
              ))}
            </div>
          )}

          <div className="mt-2 text-center text-xs text-muted">
            剩餘 {MAX_GUESSES - game.guesses.length} 次猜測機會
          </div>
        </div>
      )}

      {/* How to play */}
      <details className="mt-8">
        <summary className="cursor-pointer text-sm text-muted hover:text-foreground transition-colors">
          怎麼玩？
        </summary>
        <div className="mt-3 card text-sm text-muted space-y-2">
          <p>每天有一位神秘球員等你猜！</p>
          <p>
            你有 <strong className="text-foreground">6 次</strong>
            猜測機會。每次猜錯會顯示更多線索。
          </p>
          <div className="space-y-1 mt-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-8 rounded-full bg-success inline-block" />
              <span>猜對了</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-8 rounded-full bg-danger inline-block" />
              <span>猜錯了（會顯示新線索）</span>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}
