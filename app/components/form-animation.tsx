const fields = ["Site", "Inspector", "Findings"];
const log = ["Draft saved · rev 4", "Validated against v2", "Published · v2 pinned"];
const at = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export function FormAnimation() {
  return (
    <figure className="m-0 rounded-xl border p-5">
      <div aria-hidden="true" className="grid gap-5 sm:grid-cols-[1.2fr_1fr]">
        <div className="rounded-lg border bg-secondary/40 p-4">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-semibold">Inspection form</span>
            <span
              className="pop rounded-full bg-link px-2 py-0.5 text-[11px] font-semibold text-background"
              style={at(3.2)}
            >
              v2 · Published
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {fields.map((f, i) => (
              <div key={f}>
                <div className="text-[11px] text-muted-foreground">{f}</div>
                <div className="mt-1 h-7 rounded-md border bg-background p-1.5">
                  <div className="fld h-full rounded-sm bg-link/25" style={at(0.6 + i * 0.9)} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2 text-[12px] text-muted-foreground">
          <div className="text-[11px] font-semibold uppercase tracking-widest">Audit log</div>
          {log.map((l, i) => (
            <div key={l} className="pop rounded-md border px-3 py-2" style={at(2 + i * 1.3)}>
              {l}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-4 text-sm text-muted-foreground">
        A form definition becomes an immutable version; every change lands in the audit log.
      </figcaption>
    </figure>
  );
}
