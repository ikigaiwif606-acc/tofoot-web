"use server";

import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/lib/validations";
import { parseFormData, joinFantasySchema, predictionSchema } from "@/lib/validations";
import {
  getFantasyUserByName,
  createFantasyUser,
  savePrediction as dbSavePrediction,
  getMatchById,
} from "@/lib/db/queries";
import {
  getFantasyUserId,
  setFantasySession,
  deleteFantasySession,
} from "@/lib/fantasy-session";

export async function joinGame(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    const parsed = parseFormData(joinFantasySchema, formData);
    if (!parsed.success) return { success: false, error: parsed.error };

    const existing = await getFantasyUserByName(parsed.data.name);
    if (existing) {
      // If name taken, log them in as that user
      await setFantasySession(existing.id);
      revalidatePath("/world-cup");
      return { success: true };
    }

    const user = await createFantasyUser(parsed.data.name, parsed.data.avatar);
    await setFantasySession(user.id);
    revalidatePath("/world-cup");
    return { success: true };
  } catch (e) {
    console.error("joinGame failed:", e);
    return { success: false, error: "Failed to join game" };
  }
}

export async function submitPrediction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    const userId = await getFantasyUserId();
    if (!userId) return { success: false, error: "Please join the game first" };

    const parsed = parseFormData(predictionSchema, formData);
    if (!parsed.success) return { success: false, error: parsed.error };

    const match = await getMatchById(parsed.data.matchId);
    if (!match) return { success: false, error: "Match not found" };
    if (match.status !== "upcoming") {
      return { success: false, error: "Match has already started" };
    }

    const kickoffTime = new Date(match.kickoff).getTime();
    if (kickoffTime <= Date.now()) {
      return { success: false, error: "Predictions are closed for this match" };
    }

    await dbSavePrediction(
      userId,
      parsed.data.matchId,
      parsed.data.homeScore,
      parsed.data.awayScore
    );

    revalidatePath("/world-cup/predict");
    revalidatePath("/world-cup/dashboard");
    return { success: true };
  } catch (e) {
    console.error("submitPrediction failed:", e);
    return { success: false, error: "Failed to save prediction" };
  }
}

export async function leaveGame(): Promise<void> {
  await deleteFantasySession();
  revalidatePath("/world-cup");
}
