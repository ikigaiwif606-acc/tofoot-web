import type { Match, Prediction } from "./db/queries";

export interface ScoreBreakdown {
  points: number;
  reason: string;
  type: "exact" | "difference" | "result" | "wrong";
}

export function calculateScore(
  prediction: Pick<Prediction, "homeScore" | "awayScore">,
  match: Pick<Match, "homeScore" | "awayScore">
): ScoreBreakdown {
  if (match.homeScore === null || match.awayScore === null) {
    return { points: 0, reason: "比賽尚未結束", type: "wrong" };
  }

  const pH = prediction.homeScore;
  const pA = prediction.awayScore;
  const aH = match.homeScore;
  const aA = match.awayScore;

  // Exact score
  if (pH === aH && pA === aA) {
    return { points: 10, reason: "完美預測！比分完全正確", type: "exact" };
  }

  // Correct goal difference
  if (pH - pA === aH - aA) {
    return { points: 5, reason: "淨勝球正確", type: "difference" };
  }

  // Correct result (win/draw/loss)
  const pResult = Math.sign(pH - pA);
  const aResult = Math.sign(aH - aA);
  if (pResult === aResult) {
    return { points: 3, reason: "勝負結果正確", type: "result" };
  }

  return { points: 0, reason: "預測錯誤", type: "wrong" };
}

export function getResultLabel(homeScore: number, awayScore: number): string {
  if (homeScore > awayScore) return "主勝";
  if (homeScore < awayScore) return "客勝";
  return "平手";
}
