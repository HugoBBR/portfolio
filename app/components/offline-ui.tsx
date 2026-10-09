export function OfflineSwitch({ offline, onToggle }: { offline: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={offline}
      onClick={onToggle}
      className="flex items-center gap-2 rounded-full border py-1.5 pl-3 pr-2 text-xs font-semibold transition-colors hover:bg-secondary"
    >
      Go offline
      <span
        className={`relative h-[18px] w-8 rounded-full transition-colors ${offline ? "bg-link" : "bg-muted-foreground/40"}`}
      >
        <span
          className={`absolute left-[3px] top-[3px] size-3 rounded-full bg-background transition-transform ${offline ? "translate-x-3.5" : ""}`}
        />
      </span>
    </button>
  );
}
