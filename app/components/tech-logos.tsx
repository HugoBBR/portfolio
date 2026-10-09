import { Cloud } from "lucide-react";
import {
  siAngular,
  siDocker,
  siDotnet,
  siFastapi,
  siGithubactions,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siTailwindcss,
  siTypescript,
} from "simple-icons";

// Single-color marks that follow the theme text color. Azure's logo isn't in Simple Icons, so it gets a plain cloud glyph.
const logos = [
  { name: "React", path: siReact.path },
  { name: "TypeScript", path: siTypescript.path },
  { name: "Angular", path: siAngular.path },
  { name: "Tailwind CSS", path: siTailwindcss.path },
  { name: "Python", path: siPython.path },
  { name: "FastAPI", path: siFastapi.path },
  { name: ".NET", path: siDotnet.path, wordmark: true },
  { name: "PostgreSQL", path: siPostgresql.path },
  { name: "Redis", path: siRedis.path },
  { name: "Docker", path: siDocker.path },
  { name: "GitHub Actions", path: siGithubactions.path },
  { name: "Azure" },
];

export function TechLogos() {
  return (
    <section aria-label="Tools I work with" className="border-t py-10">
      <ul className="m-0 flex list-none flex-wrap gap-x-8 gap-y-6 p-0">
        {logos.map((l) => (
          <li
            key={l.name}
            className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            {l.path ? (
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 fill-current">
                <path d={l.path} />
              </svg>
            ) : (
              <Cloud aria-hidden="true" className="size-6" strokeWidth={1.75} />
            )}
            <span className={l.wordmark ? "sr-only" : "text-sm font-medium"}>{l.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
