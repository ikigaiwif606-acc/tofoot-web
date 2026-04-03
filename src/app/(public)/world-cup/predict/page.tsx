import { getMatches, getUserPredictions } from "@/lib/db/queries";
import type { Match, Prediction } from "@/lib/db/queries";
import { getFantasyUserId } from "@/lib/fantasy-session";
import PredictClient from "./PredictClient";

export const metadata = {
  title: "比賽預測 | ToFoot 世界盃",
  description: "預測2026世界盃每場比賽的比分",
};

export default async function PredictPage() {
  const userId = await getFantasyUserId();
  const allMatches = await getMatches();

  let predictions: Prediction[] = [];
  if (userId) {
    predictions = await getUserPredictions(userId);
  }

  return <PredictClient matches={allMatches} predictions={predictions} userId={userId} />;
}
