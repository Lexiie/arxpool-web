interface ModeBadgeProps {
  className?: string;
}

export function ModeBadge({ className }: ModeBadgeProps) {
  const modeFlag = process.env.NEXT_PUBLIC_USE_STUB;
  const mode = modeFlag === "false" ? "Testnet" : "Stub";
  return (
    <span
      className={`rounded-full border border-zinc-700/60 bg-zinc-900/70 px-3 py-1 text-xs uppercase tracking-wide text-zinc-200 ${className ?? ""}`.trim()}
    >
      {`Mode: ${mode}`}
    </span>
  );
}
