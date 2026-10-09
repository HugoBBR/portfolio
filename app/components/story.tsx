import { CheckCheck, Smartphone, Wifi, WifiOff } from "lucide-react";
import type { Story } from "~/content/case-studies";

const icons = { offline: WifiOff, save: Smartphone, online: Wifi, synced: CheckCheck };

// A plain-language walkthrough: numbered steps, no jargon.
export function StoryView({ story }: { story: Story }) {
  return (
    <figure className="m-0">
      <ol className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
        {story.steps.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <li key={s.title} className="rounded-xl border p-5">
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-link">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <span className="text-sm tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 text-xl">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.body}</p>
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-3 text-sm text-muted-foreground">{story.caption}</figcaption>
    </figure>
  );
}
