import "server-only";
import { cookies } from "next/headers";

const COOKIE_NAME = "tofoot_fantasy_user_id";

export async function getFantasyUserId(): Promise<number | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  if (!value) return null;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? null : parsed;
}

export async function setFantasySession(userId: number): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, String(userId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  });
}

export async function deleteFantasySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
