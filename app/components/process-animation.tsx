import { Check } from "lucide-react";

const before = ["Email thread", "Spreadsheet", "Paper form"];
const steps = ["Submitted", "Reviewed", "Approved"];
const at = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

// Decorative loop: scattered inputs on the left become a tracked request on the right.
export function ProcessAnimation() {
  return (
    <figure className="m-0 rounded-xl border p-4">
      <div aria-hidden="true" className="grid grid-cols-[1fr_auto_1.2fr] items-center gap-3">
        <div className="space-y-2">
          {before.map((b, i) => (
            <div
              key={b}
              className="chip rounded-md border bg-secondary/60 px-3 py-2 text-xs text-muted-foreground"
              style={{ ...at(i * 0.4), rotate: `${[-2, 1.5, -1][i]}deg` }}
            >
              {b}
            </div>
          ))}
        </div>
        <span className="text-muted-foreground">→</span>
        <div className="rounded-lg border bg-background p-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-semibold">Request #1042</span>
            <span
              className="late rounded-full bg-link px-2 py-0.5 text-[11px] font-semibold text-background"
              style={at(2.4)}
            >
              Done
            </span>
          </div>
          <ul className="m-0 mt-3 list-none space-y-2 p-0">
            {steps.map((s, i) => (
              <li
                key={s}
                className="late flex items-center gap-2 text-xs"
                style={at(0.4 + i * 0.7)}
              >
                <span className="flex size-4 items-center justify-center rounded-full bg-link text-background">
                  <Check className="size-3" />
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-muted-foreground">
        Scattered emails, sheets and paper become one tracked request with a clear status.
      </figcaption>
    </figure>
  );
}
