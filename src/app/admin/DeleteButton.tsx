"use client";

export function DeleteButton({
  action,
  label = "Delete",
  confirmMessage = "Are you sure?",
}: {
  action: () => Promise<void>;
  label?: string;
  confirmMessage?: string;
}) {
  return (
    <form
      action={async () => {
        if (confirm(confirmMessage)) {
          await action();
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
