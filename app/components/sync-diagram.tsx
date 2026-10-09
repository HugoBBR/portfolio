import { useOffline } from "~/lib/offline";

const nodes = [
  { x: 8, label: "Device" },
  { x: 132, label: "Queue" },
  { x: 256, label: "API" },
  { x: 380, label: "Postgres" },
];
const stops = ["44px", "62px", "80px"];

export function SyncDiagram() {
  const { offline } = useOffline();
  return (
    <figure className="m-0 rounded-xl border p-4">
      <svg
        viewBox="0 28 480 104"
        role="img"
        aria-label="Diagram: a device sends changes through a local queue to the API and Postgres."
        className={`w-full ${offline ? "is-offline" : ""}`}
      >
        {[0, 1, 2].map((i) => (
          <line
            key={i}
            x1={nodes[i].x + 92}
            x2={nodes[i + 1].x}
            y1="78"
            y2="78"
            className={i === 1 && offline ? "stroke-foreground" : "stroke-muted-foreground"}
            strokeWidth="1.5"
            strokeDasharray={i === 1 && offline ? "4 4" : undefined}
          />
        ))}
        {nodes.map((n) => (
          <g key={n.label}>
            <rect
              x={n.x}
              y="56"
              width="92"
              height="44"
              rx="8"
              className="fill-secondary stroke-border"
            />
            <text
              x={n.x + 46}
              y="46"
              textAnchor="middle"
              className="fill-foreground text-[15px] font-medium"
            >
              {n.label}
            </text>
          </g>
        ))}
        {stops.map((stop, i) => (
          <circle
            key={stop}
            className="pkt"
            cx="104"
            cy="78"
            r="5"
            style={{ "--i": i, "--stop": stop } as React.CSSProperties}
          />
        ))}
        {offline && (
          <text
            x="236"
            y="124"
            textAnchor="middle"
            className="fill-muted-foreground text-[13px] font-medium"
          >
            no signal · changes wait in the queue
          </text>
        )}
      </svg>
      <figcaption className="mt-2 text-sm text-muted-foreground">
        {offline
          ? "Offline: edits are saved locally and queued. The server stays the only writer."
          : "Online: queued edits flow to the API and Postgres, in order. Try the Offline switch."}
      </figcaption>
    </figure>
  );
}
