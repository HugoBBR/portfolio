import type { Diagram } from "~/content/case-studies";
import { Inline } from "./inline";

const chain = "flow m-0 flex list-none flex-col gap-1 p-0";
const step = "step inline-block rounded-md border bg-secondary/40 px-3 py-1.5 text-sm";
const STEP_S = 0.7;

function Steps({ steps }: { steps: string[] }) {
  const cycle = `${steps.length * STEP_S + 3}s`;
  return (
    <ol className={chain}>
      {steps.map((s, i) => (
        <li key={s} className="sm:flex sm:items-center">
          <span
            className={step}
            style={{ "--d": `${i * STEP_S}s`, "--cycle": cycle } as React.CSSProperties}
          >
            <Inline text={s} />
          </span>
        </li>
      ))}
    </ol>
  );
}

export function DiagramView({ diagram }: { diagram: Diagram }) {
  return (
    <figure className="my-0 rounded-xl border p-5 sm:p-6">
      <div className="space-y-6">
        {diagram.lanes.map((lane) => (
          <div key={lane.label}>
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              {lane.label}
            </p>
            <Steps steps={lane.steps} />
            {lane.branches && (
              <ul className="m-0 mt-3 list-none space-y-3 border-l p-0 pl-4">
                {lane.branches.map((b) => (
                  <li key={b.when}>
                    <p className="mb-1 text-xs text-muted-foreground">{b.when}</p>
                    <Steps steps={b.steps} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <figcaption className="mt-5 text-sm text-muted-foreground">{diagram.caption}</figcaption>
    </figure>
  );
}
