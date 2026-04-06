export default function EmptyState({
  icon = "📡",
  title = "NO SIGNAL",
  description = "沒有找到任何資料",
  action,
}: {
  icon?: string;
  title?: string;
  description?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="empty-state scanlines relative">
      <div className="text-4xl mb-4">{icon}</div>
      <div className="empty-state-title">{title}</div>
      <div className="empty-state-description">{description}</div>
      {action && (
        <a
          href={action.href}
          className="btn-press mt-6 inline-block font-display text-[10px] font-bold tracking-[2px] text-neon-cyan transition-colors hover:bg-[rgba(0,255,255,0.1)]"
          style={{
            border: "1px solid rgba(0, 255, 255, 0.4)",
            padding: "10px 24px",
          }}
        >
          {action.label}
        </a>
      )}
    </div>
  );
}
