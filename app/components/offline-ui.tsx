import { useOffline } from "~/lib/offline";

export function OfflineSwitch() {
  const { offline, toggle } = useOffline();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={offline}
      onClick={toggle}
      className="flex items-center gap-2 rounded-full border py-1.5 pl-3 pr-2 text-xs font-semibold transition-colors hover:bg-secondary"
    >
      Offline
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

export function OfflineBanner() {
  const { offline } = useOffline();
  return (
    <div role="status" className="no-print">
      {offline && (
        <p className="m-0 flex items-center gap-2.5 bg-foreground px-4 py-2 text-[13px] text-background sm:px-6">
          <span aria-hidden="true" className="size-[7px] shrink-0 rounded-full bg-link" />
          You’re viewing a cached copy. 3 changes queued; they’ll sync when you’re back online.
        </p>
      )}
    </div>
  );
}
