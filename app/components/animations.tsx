import { Check, Lock } from "lucide-react";
import { FormAnimation } from "./form-animation";
import { SyncDiagram } from "./sync-diagram";

type Vars = Record<`--${string}`, string>;
const v = (vars: Vars) => vars as React.CSSProperties;

// Decorative content is aria-hidden; the caption carries the meaning.
function Fig({
  caption,
  style,
  children,
}: {
  caption: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <figure className="m-0 rounded-xl border p-5" style={style}>
      <div aria-hidden="true">{children}</div>
      <figcaption className="mt-4 text-sm text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

const ok = (
  <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-link text-background">
    <Check className="size-3" />
  </span>
);

const personas = [
  { who: "Investor", items: ["Dashboard", "Investments", "Documents", "Support"], note: "" },
  { who: "Advisor", items: ["Clients", "Subscriptions", "Insights", "Messages"], note: "" },
  {
    who: "Advisor",
    items: ["Dashboard", "Investments", "Documents", "Support"],
    note: "Viewing as a client",
  },
];

function PersonaAnimation() {
  return (
    <Fig caption="The same app shows different routes by user type, and an advisor can step into a client's view.">
      <div className="grid">
        {personas.map((p, i) => (
          <div
            key={p.who + p.note}
            className="persona col-start-1 row-start-1 rounded-lg border bg-secondary/40 p-4"
            style={v({ "--d": `${i * 3}s` })}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-semibold">{p.who}</span>
              {p.note && (
                <span className="rounded-full bg-link px-2 py-0.5 text-[11px] font-semibold text-background">
                  {p.note}
                </span>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.items.map((it) => (
                <span key={it} className="rounded-md border bg-background px-3 py-1.5 text-xs">
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Fig>
  );
}

const cacheRows = [
  { label: "Fresh", note: "served from the cache", w: "w-[14%]", d: 0 },
  {
    label: "Stale",
    note: "served instantly, refreshed in the background",
    w: "w-[14%]",
    d: 1.2,
    refresh: true,
  },
  { label: "Miss", note: "read from the warehouse", w: "w-[88%]", d: 2.4 },
];

function CacheAnimation() {
  return (
    <Fig caption="Bar length is time to first byte: cached answers return almost at once, even while a refresh runs.">
      <div className="space-y-4">
        {cacheRows.map((r) => (
          <div key={r.label}>
            <div className="mb-1 text-xs">
              <span className="font-semibold">{r.label}</span>{" "}
              <span className="text-muted-foreground">· {r.note}</span>
            </div>
            <div className="flex h-3 gap-1">
              <div className={`fld rounded-sm bg-link ${r.w}`} style={v({ "--d": `${r.d}s` })} />
              {r.refresh && (
                <div
                  className="fld w-[60%] rounded-sm bg-muted-foreground/40"
                  style={v({ "--d": `${r.d + 0.8}s` })}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </Fig>
  );
}

const pages = ["Inspections", "Corrective actions", "Admin"];
const roles = [
  { who: "QA/QC auditor", can: [true, true, false] },
  { who: "Response Team", can: [true, true, false] },
  { who: "System admin", can: [false, false, true] },
];

function AccessAnimation() {
  return (
    <Fig caption="Roles decide which pages each person gets. Admins don't act as QA/QC unless they hold that role too.">
      <div className="grid grid-cols-[1.3fr_repeat(3,1fr)] items-center gap-x-3 gap-y-2 text-xs">
        <span />
        {pages.map((p) => (
          <span key={p} className="font-semibold uppercase tracking-widest text-muted-foreground">
            {p}
          </span>
        ))}
        {roles.map((r, ri) => [
          <span key={r.who} className="font-medium">
            {r.who}
          </span>,
          ...r.can.map((c, ci) => (
            <span
              key={`${r.who}-${pages[ci]}`}
              className={c ? "pop" : "text-muted-foreground"}
              style={v({ "--d": `${ri * 0.8 + ci * 0.2}s` })}
            >
              {c ? ok : "–"}
            </span>
          )),
        ])}
      </div>
    </Fig>
  );
}

const stages = ["Pull request", "Preview", "Dev + tests", "Staging", "Production"];

function PipelineAnimation() {
  return (
    <Fig caption="Each stage passes before the next starts; the image that passed in Dev is the one that ships.">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {stages.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span className="flex items-center gap-2 rounded-md border bg-secondary/40 px-3 py-2">
              {s}
              <span className="late" style={v({ "--d": `${i * 0.8}s` })}>
                {ok}
              </span>
            </span>
            {i < stages.length - 1 && <span className="text-muted-foreground">→</span>}
          </div>
        ))}
      </div>
    </Fig>
  );
}

const cols = ["Labor", "Equipment", "Markup", "Total"];

function GridAnimation() {
  return (
    <Fig caption="Billing is edited like a spreadsheet: move with the keyboard, and totals update as lines change.">
      <div className="relative w-fit text-xs">
        <div className="grid grid-cols-[repeat(4,5rem)] gap-1">
          {cols.map((c) => (
            <span
              key={c}
              className="px-1 font-semibold uppercase tracking-widest text-muted-foreground"
            >
              {c}
            </span>
          ))}
          {[0, 1].flatMap((r) =>
            cols.map((c, ci) => (
              <span
                key={`${r}-${c}`}
                className="flex h-8 items-center rounded-md border bg-secondary/40 px-2"
              >
                <span
                  className={`h-2 rounded-sm bg-muted-foreground/40 ${ci === 3 ? "w-8 bg-link/50" : "w-6"}`}
                />
              </span>
            )),
          )}
        </div>
        <span className="cursor pointer-events-none absolute left-0 top-[1.4rem] h-8 w-20 rounded-md border-2 border-link" />
      </div>
    </Fig>
  );
}

const items = ["Failed item 1", "Failed item 2", "Failed item 3"];
const states = [
  { s: "Draft", d: -0.2 },
  { s: "Pending corrective actions", d: 3.3 },
  { s: "Closed", d: 7.3 },
];

function LifecycleAnimation() {
  return (
    <Fig
      style={v({ "--len": "12s", "--cycle": "12s" })}
      caption="Each failed item becomes its own task, approved one by one. Approving the last one closes the inspection."
    >
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {states.map((st, i) => (
          <div key={st.s} className="flex items-center gap-2">
            <span
              className="step rounded-md border bg-secondary/40 px-3 py-1.5"
              style={v({ "--d": `${st.d}s` })}
            >
              {st.s}
            </span>
            {i < states.length - 1 && <span className="text-muted-foreground">→</span>}
          </div>
        ))}
      </div>
      <ul className="m-0 mt-4 list-none space-y-2 p-0 text-xs">
        {items.map((it, i) => (
          <li key={it} className="flex items-center justify-between rounded-md border px-3 py-2">
            <span>{it}</span>
            <span className="grid">
              <span className="col-start-1 row-start-1 text-right text-muted-foreground">
                Pending
              </span>
              <span
                className="late col-start-1 row-start-1 flex items-center justify-end gap-1.5 bg-background font-semibold text-link"
                style={v({ "--d": `${i * 0.8}s` })}
              >
                {ok} Approved
              </span>
            </span>
          </li>
        ))}
      </ul>
      <p className="late m-0 mt-3 text-xs font-semibold text-link" style={v({ "--d": "3.2s" })}>
        Inspection closed · final PDF on request
      </p>
    </Fig>
  );
}

const botRows = [
  { pr: "Add reports export", tag: "queue-priority", base: "Behind main", done: "Updated", d: 0 },
  { pr: "Fix photo upload retry", base: "Behind main", done: "Updated", d: 0.9 },
  { pr: "WIP: new dashboard", base: "Draft · skipped" },
  { pr: "Update CI workflow", base: "Changes workflows · skipped" },
];

function BotAnimation() {
  return (
    <Fig caption="After each merge, ready PRs that fell behind are updated, priority first. Drafts and workflow changes are left alone.">
      <p className="m-0 mb-3 text-xs">
        <span className="step rounded-md border bg-secondary/40 px-3 py-1.5">Merged to main</span>
      </p>
      <ul className="m-0 list-none space-y-2 p-0 text-xs">
        {botRows.map((r) => (
          <li
            key={r.pr}
            className="flex items-center justify-between gap-3 rounded-md border px-3 py-2"
          >
            <span className="min-w-0 truncate">
              {r.pr}
              {r.tag && <code className="ml-2">{r.tag}</code>}
            </span>
            <span className="grid shrink-0">
              <span className="col-start-1 row-start-1 text-right text-muted-foreground">
                {r.base}
              </span>
              {r.done && (
                <span
                  className="late col-start-1 row-start-1 flex items-center justify-end gap-1.5 bg-background font-semibold text-link"
                  style={v({ "--d": `${r.d + 0.6}s` })}
                >
                  {ok} {r.done}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </Fig>
  );
}

const guardRows = [
  { what: "Edit code and run the tests", ok: "Runs freely", d: 0 },
  { what: "Read a design doc (file and line)", ok: "Runs freely", d: 0.7 },
  { what: "Run a migration", wait: "Needs a person", ok: "Approved by a person", d: 1.8 },
  { what: "Deploy", wait: "Needs a person" },
  { what: "Touch prod or dev data", wait: "Never without approval" },
];

function GuardrailAnimation() {
  return (
    <Fig caption="Safe actions run freely; risky ones stop and wait for a person.">
      <ul className="m-0 list-none space-y-2 p-0 text-xs">
        {guardRows.map((r) => (
          <li
            key={r.what}
            className="flex items-center justify-between gap-3 rounded-md border px-3 py-2"
          >
            <span>{r.what}</span>
            <span className="grid shrink-0">
              {r.wait && (
                <span className="col-start-1 row-start-1 flex items-center justify-end gap-1.5 text-right text-muted-foreground">
                  <Lock className="size-3" /> {r.wait}
                </span>
              )}
              {r.ok && (
                <span
                  className="late col-start-1 row-start-1 flex items-center justify-end gap-1.5 bg-background font-semibold text-link"
                  style={v({ "--d": `${r.d}s` })}
                >
                  {ok} {r.ok}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </Fig>
  );
}

export const animations: Record<string, React.ComponentType> = {
  personas: PersonaAnimation,
  lifecycle: LifecycleAnimation,
  sync: SyncDiagram,
  forms: FormAnimation,
  cache: CacheAnimation,
  access: AccessAnimation,
  pipeline: PipelineAnimation,
  grid: GridAnimation,
  bot: BotAnimation,
  guardrails: GuardrailAnimation,
};
