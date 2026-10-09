import { ArrowUpRight, Download } from "lucide-react";
import { Link } from "react-router";
import { ProcessAnimation } from "~/components/process-animation";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { caseStudies } from "~/content/case-studies";
import { experience } from "~/content/experience";
import { profile } from "~/content/profile";
import { formatPeriod } from "~/lib/format";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  const title = `${profile.name} · ${profile.title}`;
  const tagline = `${profile.tagline} ${profile.taglineAccent}`;
  return [
    { title },
    { name: "description", content: tagline },
    { property: "og:title", content: title },
    { property: "og:description", content: tagline },
    { property: "og:type", content: "website" },
  ];
}

const eyebrow = "text-xs uppercase tracking-widest text-muted-foreground";

export default function Home() {
  const current = experience.filter((r) => !r.earlier);
  const earlier = experience.filter((r) => r.earlier);

  return (
    <>
      <section className="grid items-center gap-10 pb-20 pt-6 sm:pt-14 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-link">
            {profile.title} · {profile.line}
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl leading-[1.02] tracking-[-0.04em] sm:text-6xl">
            {profile.tagline} <span className="text-link">{profile.taglineAccent}</span>
          </h1>
          <p className="mt-6 max-w-prose text-lg text-muted-foreground">{profile.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild>
              <a href="#work">View work</a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/cv">
                <Download aria-hidden="true" /> CV
              </Link>
            </Button>
            <nav aria-label="Social" className="flex gap-5 pl-2 text-sm">
              <a
                className="underline-offset-4 hover:text-link hover:underline"
                href={`mailto:${profile.email}`}
              >
                Email
              </a>
              <a
                className="underline-offset-4 hover:text-link hover:underline"
                href={profile.links.linkedin}
              >
                LinkedIn
              </a>
              <a
                className="underline-offset-4 hover:text-link hover:underline"
                href={profile.links.github}
              >
                GitHub
              </a>
            </nav>
          </div>
        </div>
        <ProcessAnimation />
      </section>

      <section id="work" className="border-t py-16">
        <h2 className="text-4xl">Selected work</h2>
        <ol className="m-0 mt-8 list-none p-0">
          {caseStudies.map((c, i) => (
            <li key={c.slug} className="border-b first:border-t">
              <Link
                to={`/work/${c.slug}`}
                viewTransition
                className="group grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-6 transition-colors hover:text-link sm:grid-cols-[3rem_1fr_5rem_1.5rem]"
              >
                <span className="text-sm tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span
                    className="block font-display text-2xl sm:text-3xl"
                    style={{ viewTransitionName: `title-${c.slug}` }}
                  >
                    {c.title}
                  </span>
                  <span className="mt-1 block max-w-xl text-sm text-muted-foreground">
                    {c.summary}
                  </span>
                </span>
                <span className="text-sm tabular-nums text-muted-foreground sm:text-right">
                  {c.year}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="hidden size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block"
                />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section id="experience" className="border-t py-16">
        <h2 className="text-4xl">Experience</h2>
        <div className="mt-8 space-y-10">
          {current.map((r) => (
            <article
              key={r.company + r.start}
              className="grid gap-2 sm:grid-cols-[12rem_1fr] sm:gap-8"
            >
              <p className="text-sm tabular-nums text-muted-foreground">
                {formatPeriod(r.start, r.end)}
              </p>
              <div>
                <h3 className="text-2xl">
                  {r.role} · <span translate="no">{r.company}</span>
                </h3>
                {r.note && <p className="text-sm text-muted-foreground">{r.note}</p>}
                <ul className="mt-3 list-disc space-y-1.5 pl-5">
                  {r.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <p className="mt-4 flex flex-wrap gap-1.5">
                  {r.stack.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </p>
              </div>
            </article>
          ))}
        </div>
        <h3 className={`${eyebrow} mt-14 font-sans`}>Earlier</h3>
        <ul className="m-0 mt-4 list-none space-y-3 p-0">
          {earlier.map((r) => (
            <li key={r.company} className="grid gap-1 sm:grid-cols-[12rem_1fr] sm:gap-8">
              <span className="text-sm tabular-nums text-muted-foreground">
                {formatPeriod(r.start, r.end)}
              </span>
              <span>
                <span translate="no">{r.company}</span> · {r.highlights[0]}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section id="about" className="border-t py-16">
        <h2 className="text-4xl">About</h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div className="max-w-prose space-y-4 text-lg">
            {profile.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <h3 className="pt-4 text-2xl">How I work</h3>
            <p className="text-base text-muted-foreground">{profile.how}</p>
          </div>
          <dl className="m-0 grid gap-6 sm:grid-cols-2">
            {profile.toolbox.map((t) => (
              <div key={t.group}>
                <dt className={eyebrow}>{t.group}</dt>
                <dd className="m-0 mt-2">
                  <ul className="m-0 list-none space-y-1 p-0 text-sm">
                    {t.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="contact" className="border-t py-24">
        <h2 className="text-5xl sm:text-6xl">Let’s build something.</h2>
        <p className="mt-6">
          <a
            className="font-display text-2xl text-link underline underline-offset-4 sm:text-3xl"
            href={`mailto:${profile.email}`}
          >
            {profile.email}
          </a>
        </p>
        <p className="mt-6 flex gap-5 text-sm">
          <a className="underline underline-offset-4 hover:text-link" href={profile.links.linkedin}>
            LinkedIn
          </a>
          <a className="underline underline-offset-4 hover:text-link" href={profile.links.github}>
            GitHub
          </a>
        </p>
      </section>
    </>
  );
}
