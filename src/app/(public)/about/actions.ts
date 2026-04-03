"use server";

import type { ActionResult } from "@/lib/validations";
import { createSuggestion } from "@/lib/db/queries";
import { z } from "zod";

const suggestionSchema = z.object({
  name: z.string().max(50).optional(),
  content: z.string().min(5, "請至少寫 5 個字").max(1000),
});

export async function submitSuggestion(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    const raw = {
      name: (formData.get("name") as string) || undefined,
      content: formData.get("content") as string,
    };
    const parsed = suggestionSchema.safeParse(raw);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    await createSuggestion(parsed.data.content, parsed.data.name);
    return { success: true };
  } catch (e) {
    console.error("submitSuggestion failed:", e);
    return { success: false, error: "提交失敗，請稍後再試" };
  }
}
