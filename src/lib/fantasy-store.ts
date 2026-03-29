"use client";

import type { Prediction } from "./fantasy-data";

const STORAGE_KEY = "tofoot_predictions";
const USER_KEY = "tofoot_user";

export interface FantasyUser {
  name: string;
  createdAt: string;
}

export function getUser(): FantasyUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setUser(name: string): FantasyUser {
  const user: FantasyUser = { name, createdAt: new Date().toISOString() };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export function clearUser(): void {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(STORAGE_KEY);
}

export function getPredictions(): Prediction[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function savePrediction(prediction: Prediction): void {
  const predictions = getPredictions();
  const idx = predictions.findIndex((p) => p.matchId === prediction.matchId);
  if (idx >= 0) {
    predictions[idx] = prediction;
  } else {
    predictions.push(prediction);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(predictions));
}

export function getPredictionForMatch(matchId: string): Prediction | null {
  const predictions = getPredictions();
  return predictions.find((p) => p.matchId === matchId) ?? null;
}
