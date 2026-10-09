import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { animations } from "~/components/animations";
import { Inline } from "~/components/inline";
import { StoryView } from "~/components/story";
import { Badge } from "~/components/ui/badge";
import { caseStudies, getCaseStudy } from "~/content/case-studies";
import { profile } from "~/content/profile";
import type { Route } from "./+types/case-study";

export function meta({ params }: Route.MetaArgs) {
  const c = getCaseStudy(params.slug);
  if (!c) return [{ title: "Not found" }];
  const title = `${c.title} · ${profile.name}`;
  return [
    { title },
    { name: "description", content: c.summary },
    { property: "og:title", content: title },
    { property: "og:description", content: c.summary },
    { property: "og:type", content: "article" },
  ];
}

const eyebrow = "text-xs uppercase tracking-widest text-muted-foreground";

export default function CaseStudy({ params }: Route.ComponentProps) {
  const i = caseStudies.findIndex((c) => c.slug === params.slug);
  if (i < 0) throw new Response("Not Found", { status: 404 });
  const c = caseStudies[i];
  const prev = caseStudies[i - 1];
  const next = caseStudies[i + 1];
  const anims = [c.animation ?? []].flat();

  return (
    <article className="mx-auto max-w-3xl pb-16 pt-6">
      <Link
        to="/#work"
        viewTransition
        className="inline-flex items-center gap-1 py-2 text-sm text-muted-foreground hover:text-link"
      >
        <ArrowLeft aria-hidden="true" className="size-4" /> All work
      </Link>
      <p className={`${eyebrow} mt-8`}>
        Case study · {c.year} · {c.role}
      </p>
      <h1
        className="mt-4 text-4xl leading-[1.1] sm:text-6xl"
        style={{ viewTransitionName: `title-${c.slug}` }}
      >
        {c.title}
      </h1>
      <p className="mt-6 text-xl text-muted-foreground">{c.summary}</p>

      <dl className="m-0 mt-10 grid gap-6 border-y py-6 sm:grid-cols-3">
        <div>
          <dt className={eyebrow}>Company</dt>
          <dd className="m-0 mt-1" translate="no">
            {c.company}
          </dd>
        </div>
        <div>
          <dt className={eyebrow}>Role</dt>
          <dd className="m-0 mt-1">{c.role}</dd>
        </div>
        <div className="sm:col-span-3">
          <dt className={eyebrow}>Stack</dt>
          <dd className="m-0 mt-2 flex flex-wrap gap-1.5">
            {c.stack.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </dd>
        </div>
      </dl>

      <section className="mt-12">
        <h2 className="text-3xl">The problem</h2>
        <p className="mt-4 text-lg">
          <Inline text={c.problem} />
        </p>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-3xl">How it works</h2>
        {anims.map((a) => {
          const Anim = animations[a];
          return (
            <div key={a} className="mb-4">
              <Anim />
            </div>
          );
        })}
        <StoryView story={c.story} />
      </section>

      <section className="mt-12">
        <h2 className="text-3xl">Key decisions</h2>
        <ol className="m-0 mt-6 list-none space-y-8 p-0">
          {c.decisions.map((d, n) => (
            <li key={d.title} className="grid grid-cols-[2rem_1fr] gap-x-4">
              <span className="pt-1 text-sm tabular-nums text-muted-foreground">
                {String(n + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-2xl">{d.title}</h3>
                <p className="mt-2">
                  <Inline text={d.body} />
                </p>
              </div>
            </li>
          ))}
        </ol>
        {c.note && <p className="mt-8 text-sm text-muted-foreground">{c.note}</p>}
      </section>

      <nav aria-label="More case studies" className="mt-16 grid gap-4 border-t pt-8 sm:grid-cols-2">
        {prev ? (
          <Link
            to={`/work/${prev.slug}`}
            viewTransition
            className="group block py-2 hover:text-link"
          >
            <span className={`${eyebrow} flex items-center gap-1`}>
              <ArrowLeft aria-hidden="true" className="size-3" /> Previous
            </span>
            <span className="mt-1 block font-display text-xl">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to={`/work/${next.slug}`}
            viewTransition
            className="group block py-2 hover:text-link sm:text-right"
          >
            <span className={`${eyebrow} flex items-center gap-1 sm:justify-end`}>
              Next <ArrowRight aria-hidden="true" className="size-3" />
            </span>
            <span className="mt-1 block font-display text-xl">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
