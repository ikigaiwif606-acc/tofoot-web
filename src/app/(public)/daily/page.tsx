import type { Metadata } from "next";
import { fetchTodayChallenge, fetchPlayerNames } from "./actions";
import DailyClient from "./DailyClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "誰是我？ 每日猜球員 | ToFoot 火光足球",
  description: "每天猜一位足球員！從線索推理出今天的神秘球員，和朋友分享你的成績。",
};

export default async function DailyPage() {
  const [challenge, playerNames] = await Promise.all([
    fetchTodayChallenge(),
    fetchPlayerNames(),
  ]);

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-lg px-4 py-12 sm:px-6">
        <DailyClient
          date={challenge.date}
          challengeNumber={challenge.challengeNumber}
          answer={challenge.answer}
          clues={challenge.clues}
          playerNames={playerNames.map((p) => p.name)}
        />
      </section>
    </main>
  );
}
