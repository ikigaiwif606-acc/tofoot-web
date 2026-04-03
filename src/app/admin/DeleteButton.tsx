"use client";

import { toast } from "sonner";
import type { ActionResult } from "@/lib/validations";

export function DeleteButton({
  action,
  label = "Delete",
  confirmMessage = "Are you sure?",
}: {
  action: () => Promise<ActionResult>;
  label?: string;
  confirmMessage?: string;
}) {
  return (
    <form
      action={async () => {
        if (confirm(confirmMessage)) {
          const result = await action();
          if (result.success) toast.success("Deleted");
          else if (result.error) toast.error(result.error);
        }
      }}
    >
      <button
        type="submit"
        className="text-sm text-red-400 hover:text-red-300"
      >
        {label}
      </button>
    </form>
  );
}
