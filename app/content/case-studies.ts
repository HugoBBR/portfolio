type A =
  | "sync"
  | "forms"
  | "personas"
  | "lifecycle"
  | "cache"
  | "access"
  | "pipeline"
  | "grid"
  | "bot"
  | "guardrails";

type Animation =
  | "sync"
  | "forms"
  | "personas"
  | "lifecycle"
  | "cache"
  | "access"
  | "pipeline"
  | "grid"
  | "bot"
  | "guardrails";

export type Story = {
  caption: string;
  steps: {
    icon:
      | "offline"
      | "save"
      | "online"
      | "synced"
      | "clipboard"
      | "tasks"
      | "shield"
      | "users"
      | "eye"
      | "phone"
      | "file"
      | "zap"
      | "lock"
      | "search"
      | "timer"
      | "layers"
      | "refresh"
      | "key"
      | "merge"
      | "rocket"
      | "bot"
      | "table";
    title: string;
    body: string;
  }[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  role: "Owned" | "Co-owned" | "Contributed";
  company: string;
  stack: string[];
  problem: string;
  story: Story;
  decisions: { title: string; body: string }[];
  note?: string;
  animation?: Animation | Animation[];
};

// Inline `code` in any string renders as <code>. No code, resource names, tickets or client names here.
export const caseStudies: CaseStudy[] = [
  {
    slug: "forms-platform",
    animation: ["lifecycle", "forms"],
    title: "A forms platform, and QA/QC inspections on top of it",
    summary:
      "Replaced a hosted form builder with versioned, auditable forms, then built the QA/QC field audit on it: every failed item becomes its own reviewed task.",
    year: "2026",
    role: "Owned",
    company: "Cotton Holdings",
    stack: [
      "React",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "PowerSync",
      "Microsoft Graph",
      "Feature flags",
    ],
    problem:
      "Business forms lived in a hosted form builder. The goal was versioned, auditable forms in our own database, rolled out gradually, with the QA/QC field audit as the first big workflow: a scored checklist where each failed item gets its own owner, review and history, and everything keeps working offline on phones as an installable web app.",
    story: {
      caption:
        "Behind it: versioned forms, a full history of every change, and permissions checked field by field.",
      steps: [
        {
          icon: "clipboard",
          title: "An auditor inspects the site",
          body: "A scored checklist of 68 items, filled in any order, with notes and photos for anything that fails.",
        },
        {
          icon: "tasks",
          title: "Each failed item becomes its own task",
          body: "Submitting freezes the findings and hands every failed item to the people responsible for fixing it.",
        },
        {
          icon: "shield",
          title: "Fixes are reviewed one by one",
          body: "QA/QC approves each fix or sends it back with a message. Only that one task reopens.",
        },
        {
          icon: "synced",
          title: "The last approval closes it",
          body: "The inspection closes by itself, and a final PDF is ready whenever someone asks for it.",
        },
      ],
    },
    decisions: [
      {
        title: "Forms are reviewed like code",
        body: "Form definitions live in the repository, so changes are reviewed in pull requests and go live with a deploy. Once a version is published it never changes, and drafts stay on the version they started with.",
      },
      {
        title: "One platform, many kinds of forms",
        body: "The platform handles storage, versions, history and attachments. Each kind of form, like inspections or job requisitions, adds only its own rules. New forms don't need new database work, and the remaining audit types become new form definitions with no new code.",
      },
      {
        title: "One task per failed item",
        body: "Submitting an inspection locks the findings and creates a follow-up task for each failed item. The inspection stays a frozen record, and every later edit to its general information is kept in the history.",
      },
      {
        title: "A rejection reopens one task",
        body: "QA/QC approves each fix, or sends it back with a message. Only that task reopens, and approving the last open task closes the inspection automatically.",
      },
      {
        title: "Permissions checked on every field",
        body: "The server checks each change against the person's role, so nobody can change something they shouldn't by resending a whole record. Being on the Response Team says who is accountable; what each person can do is checked separately.",
      },
      {
        title: "Two people, one form",
        body: "If two people edit at the same time, the second save is stopped and they choose which complete version to keep, instead of a silent merge that could lose work.",
      },
      {
        title: "Safe to retry on a bad connection",
        body: "Every save, comment and photo carries its own ID, so sending it twice never creates a duplicate. That is what makes working offline safe.",
      },
      {
        title: "Submitting is all or nothing",
        body: "When an inspection is submitted online, the server re-checks the project in the company's ERP, validates against the exact form version, recalculates the score and waits for every photo before saving everything together.",
      },
      {
        title: "Photos stay light",
        body: "Photos are compressed on the phone before upload, and the server checks the size, type and number again, so nothing oversized gets through.",
      },
      {
        title: "One email thread per inspection",
        body: "Notifications moved from separate emails to one reply-all thread through Microsoft Graph. Opt-outs are still honored, outside production emails only go to a test list, and the audit log records how many people were notified, not their addresses.",
      },
      {
        title: "Rolled out gradually",
        body: "Each legacy form moved off Form.io behind its own feature flag while the rest stayed where they were. Unfinished drafts are cleaned up after 15 days.",
      },
    ],
    note: "Everything except submitting, the final PDF and resolving conflicts works with no signal.",
  },
  {
    slug: "offline-inspections",
    animation: "sync",
    title: "Field inspections that work with no signal",
    summary:
      "An offline-first QA/QC app where nothing is lost or applied twice when the connection returns.",
    year: "2026",
    role: "Owned",
    company: "Cotton Holdings",
    stack: ["React", "TypeScript", "PowerSync", "SQLite", "FastAPI", "PostgreSQL"],
    problem:
      "Inspectors work inside buildings with no signal. They need to create, fill in, photograph, submit and approve inspections fully offline, and nothing can be lost or applied twice when they reconnect.",
    story: {
      caption: "From the field to the office, without anyone having to think about the connection.",
      steps: [
        {
          icon: "offline",
          title: "No signal, no problem",
          body: "An inspector opens the app inside a building with no connection. Everything they need is already on the phone.",
        },
        {
          icon: "save",
          title: "Work is saved on the phone",
          body: "Answers, notes and photos are saved as they go and lined up to be sent later.",
        },
        {
          icon: "online",
          title: "The signal comes back",
          body: "The app notices the connection and starts sending, oldest change first.",
        },
        {
          icon: "synced",
          title: "Nothing lost, nothing doubled",
          body: "The server checks every change and applies it once, even if it gets sent twice.",
        },
      ],
    },
    decisions: [
      {
        title: "One way to save",
        body: "Every change goes through a single path: online it goes straight to the server, offline it's saved on the phone and queued. Screens never need to know whether there's a connection.",
      },
      {
        title: "The server has the last word",
        body: "The phone never writes to the database directly. The FastAPI server re-checks every queued change, and replaying a change twice has no effect.",
      },
      {
        title: "Changes go out in the right order",
        body: "Photos upload before the comment that mentions them, repeated saves collapse into the latest one, and each change remembers which version it was based on, so a long queue doesn't cause false conflicts.",
      },
      {
        title: "Failures are handled by type",
        body: "Network hiccups retry, expired sign-ins refresh, and changes the server rejects show up as a clear “sync issue” without blocking everything behind them.",
      },
      {
        title: "Permissions work offline too",
        body: "The phone carries a copy of the server's permission rules, so what you can edit offline matches what the server would allow.",
      },
      {
        title: "Only the data you need",
        body: "With PowerSync, each person receives only the inspections they created, are assigned to, or are on the crew for. Closed inspections stay online, and large lookup lists load separately to keep syncing light and affordable.",
      },
      {
        title: "Security on a shared phone",
        body: "Sync uses short-lived tokens, and the sync service only holds the public half of the signing key. A signed pass lets the app start with no signal for up to 24 hours, and signing out or switching users wipes everything stored on the phone.",
      },
    ],
    note: "Deliberately online-only: PDF generation and conflict resolution.",
  },
  {
    slug: "investor-portal",
    animation: "personas",
    title: "An investor portal on web, mobile and a Salesforce API",
    summary:
      "A monorepo with a React web app, an Expo mobile app and a FastAPI layer in front of Salesforce, with the architecture and standards set from day one.",
    year: "2026",
    role: "Owned",
    company: "CAZ Investments",
    stack: [
      "React",
      "TypeScript",
      "TanStack",
      "shadcn/ui",
      "Expo",
      "FastAPI",
      "Salesforce",
      "Auth0",
      "GitHub Actions",
    ],
    problem:
      "Investors, advisors and shareholders needed one secure place for their investments, documents and support, on the web and on their phones, on top of data that lives in Salesforce.",
    story: {
      caption:
        "Set up as one repository with shared standards, so it stays consistent as it grows.",
      steps: [
        {
          icon: "users",
          title: "One portal for everyone",
          body: "Investors, advisors and shareholders each see the pages that fit them.",
        },
        {
          icon: "eye",
          title: "Advisors see what clients see",
          body: "A “view as client” mode shows an advisor exactly what their client sees, with the right access checks.",
        },
        {
          icon: "shield",
          title: "One safe door to Salesforce",
          body: "Both apps talk to a single API, and that API is the only thing that talks to Salesforce.",
        },
        {
          icon: "phone",
          title: "Web and mobile, one product",
          body: "Shared code and one design system keep the web app and the phone app consistent.",
        },
      ],
    },
    decisions: [
      {
        title: "One repository, three apps",
        body: "Web, mobile and API live together with shared code, so a change to the data reaches every app in the same pull request.",
      },
      {
        title: "One API in front of Salesforce",
        body: "The FastAPI service is the only thing that talks to Salesforce. The apps never see Salesforce's internal field names: the API translates them, and rate limiting protects it.",
      },
      {
        title: "Pages by who you are",
        body: "Sign-in runs on Auth0. Investors, advisors and shareholders get different pages, and advisors can open a “view as client” session to see exactly what a client sees.",
      },
      {
        title: "A design system from day one",
        body: "shadcn/ui and Tailwind on the web, with a style-guide page documenting colors and components. The Expo mobile app follows the same approach so both feel like one product.",
      },
      {
        title: "Checks on every pull request",
        body: "GitHub Actions run linters, type checks, unit tests and end-to-end tests on every pull request, Sentry tracks errors, and merging deploys to a dev environment automatically.",
      },
      {
        title: "Written for people and AI tools",
        body: "An AGENTS.md describes the layout, commands and conventions, with shared skills and workflows, so new contributors and AI tools follow the same rules from the first commit.",
      },
    ],
    note: "Client data and screens are not shown.",
  },
  {
    slug: "ai-guardrails",
    animation: "guardrails",
    title: "Making AI-assisted work safe on a production codebase",
    summary:
      "An AGENTS.md, agent playbooks and approval rules that let the team use AI tools every day without handing them the keys.",
    year: "2026",
    role: "Owned",
    company: "Cotton Holdings",
    stack: ["AGENTS.md", "Agent playbooks", "Project skills", "GitHub Actions"],
    problem:
      "AI coding tools are fast, but on a production codebase speed without rules is a risk. The goal was conventions and guardrails that make AI-assisted work safe, and checkable by people and agents alike.",
    story: {
      caption: "Agents work freely inside the rules and stop where a person needs to decide.",
      steps: [
        {
          icon: "file",
          title: "One place to start",
          body: "An AGENTS.md and playbooks explain how the codebase works and how to change it.",
        },
        {
          icon: "zap",
          title: "Safe work runs freely",
          body: "Editing code, running tests and reading docs need no sign-off.",
        },
        {
          icon: "lock",
          title: "Risky work waits for a person",
          body: "Anything that touches real data, migrations or deployments stops until someone approves.",
        },
        {
          icon: "search",
          title: "Docs you can trust",
          body: "Docs point to the exact file and line, and when a doc and the code disagree, the code wins.",
        },
      ],
    },
    decisions: [
      {
        title: "One place to start",
        body: "An AGENTS.md explains how the codebase is laid out, how to run things and which conventions to follow, with separate playbooks for the API, the frontend, end-to-end tests and engineering principles, plus project skills.",
      },
      {
        title: "Approval rules",
        body: "Agents never run anything against prod or dev, run migrations, or deploy without a person's approval. Risky actions are slow on purpose and everything else is fast.",
      },
      {
        title: "Docs you can check",
        body: "Design docs point to the exact file and line they describe, with one rule: where a doc and the code disagree, the code wins. People and agents can both verify them.",
      },
      {
        title: "Used every day",
        body: "About 220 commits were co-authored with AI tools. The conventions are what made that safe on a production codebase.",
      },
    ],
  },
  {
    slug: "warehouse-cache",
    animation: "cache",
    title: "A cache in front of the data warehouse",
    summary:
      "Warehouse tables served from Redis, refreshed in the background, with locks so servers don't pile on.",
    year: "2026",
    role: "Co-owned",
    company: "Cotton Holdings",
    stack: ["Python", "FastAPI", "Redis", "Delta Lake"],
    problem:
      "API list and report endpoints read Delta Lake tables directly, which was slow, and several API servers were refreshing the same tables at once.",
    story: {
      caption: "Most people never notice the cache. They just notice that the reports are fast.",
      steps: [
        {
          icon: "timer",
          title: "Slow data, slow pages",
          body: "Reports used to read the data warehouse directly, which was slow, and several servers did it at once.",
        },
        {
          icon: "layers",
          title: "Keep a recent copy close",
          body: "A recent copy sits in a fast cache, so most requests are answered right away.",
        },
        {
          icon: "refresh",
          title: "Refresh without waiting",
          body: "When the copy gets old, people still get it instantly while a fresh one loads in the background.",
        },
        {
          icon: "shield",
          title: "Servers don't pile on",
          body: "Locks make sure only one server refreshes a table at a time, and if the cache is down the data still loads from the source.",
        },
      ],
    },
    decisions: [
      {
        title: "A copy kept in Redis",
        body: "Delta Lake tables are stored in Redis, so most requests are answered from memory instead of reading the warehouse every time.",
      },
      {
        title: "Fast now, fresh soon",
        body: "When the copy gets old, people still get it instantly while a fresh one loads in the background.",
      },
      {
        title: "Only one refresh at a time",
        body: "Locks make sure only one server refreshes a table, and each server has a cap on how much work it does. If the shared slot is busy, a request reads the source directly instead of waiting.",
      },
      {
        title: "Different data, different failure rules",
        body: "If Redis is down, ordinary data falls back to the source, but sensitive things like admin sessions refuse to continue rather than risk being wrong.",
      },
      {
        title: "A cache that can't take the site down",
        body: "Every entry expires and the oldest are dropped first, so losing a cached table means one slow first request, not an outage.",
      },
      {
        title: "Smaller fixes along the way",
        body: "I removed a slow lookup-per-row pattern in bulk edit and cut one API's page size from 50,000 rows to 500.",
      },
    ],
  },
  {
    slug: "access-control",
    animation: "access",
    title: "Access control and admin impersonation",
    summary:
      "Roles from Entra ID decide what each user sees, and admins can safely see what a user sees.",
    year: "2026",
    role: "Owned",
    company: "Cotton Holdings",
    stack: ["React", "FastAPI", "Entra ID", "Redis"],
    problem:
      "Different people need different pages and fields, and support staff need to reproduce exactly what a user sees without sharing credentials.",
    story: {
      caption: "The screen hides what you can't use, and the server is what actually enforces it.",
      steps: [
        {
          icon: "users",
          title: "Roles come from the company directory",
          body: "The groups people belong to in the company directory decide what role they have.",
        },
        {
          icon: "key",
          title: "Each role sees what it needs",
          body: "Pages, tabs and fields appear only for the roles that should see them.",
        },
        {
          icon: "shield",
          title: "The server decides",
          body: "Hiding things on screen is a convenience. The server checks every request.",
        },
        {
          icon: "eye",
          title: "Support can step into a user's view",
          body: "Admins can open a session as another user to see what they see, and it stops safely if something goes wrong.",
        },
      ],
    },
    decisions: [
      {
        title: "Roles from Microsoft Entra ID",
        body: "Groups in Entra ID (Azure AD) decide which pages, tabs and fields each person sees.",
      },
      {
        title: "The server enforces it",
        body: "The screen hides what you can't use, but the API checks every request, so hiding is only a convenience.",
      },
      {
        title: "Support can step into a user's view",
        body: "An admin can start a session as another user to see exactly what they see. The session is kept in Redis.",
      },
      {
        title: "Fail safe, not open",
        body: "If Redis is unavailable, impersonation refuses to start rather than risk showing the wrong person's data.",
      },
      {
        title: "A timing bug worth fixing",
        body: "A slow earlier response could cancel a freshly started session on screen. I fixed it so the newest session always wins.",
      },
    ],
  },
  {
    slug: "monorepo-delivery",
    animation: "pipeline",
    title: "One monorepo, one delivery pipeline",
    summary:
      "Merged React and FastAPI repos with their history intact, plus preview environments and blue/green releases.",
    year: "2026",
    role: "Co-owned",
    company: "Cotton Holdings",
    stack: ["GitHub Actions", "Docker", "Azure", "Playwright"],
    problem:
      "Separate front-end and API repos meant duplicated tooling and no single place to test a change end to end.",
    story: {
      caption: "The version that was tested in dev is the version that ships.",
      steps: [
        {
          icon: "merge",
          title: "Two repos become one",
          body: "The front end and the API moved into one repository, keeping the full history of both.",
        },
        {
          icon: "eye",
          title: "Every change gets a preview",
          body: "Each pull request gets its own temporary copy of the app to try out.",
        },
        {
          icon: "synced",
          title: "Merging tests it end to end",
          body: "Merging deploys to a dev environment and runs end-to-end tests.",
        },
        {
          icon: "rocket",
          title: "Releases swap in safely",
          body: "A release goes to a staging copy first, then swaps with production once it checks out.",
        },
      ],
    },
    decisions: [
      {
        title: "Two repos became one",
        body: "The front end, the API and the end-to-end tests now live together, and the full history of both repos was kept.",
      },
      {
        title: "CI that follows the change",
        body: "GitHub Actions label pull requests by the area they touch, keep ready ones up to date with main, and run only the checks for what changed.",
      },
      {
        title: "Preview, dev, staging, production",
        body: "Each pull request gets a temporary preview. Merging deploys to dev and runs end-to-end tests. A GitHub Release goes to a staging copy of the app on Azure, runs database updates and health checks, then swaps with production. The Docker image tested in dev is the one that ships. A teammate led the deploy pipelines; I built the monorepo CI around them.",
      },
    ],
  },
  {
    slug: "ci-automation",
    animation: "bot",
    title: "Automation that keeps the pipeline moving",
    summary:
      "A GitHub App bot that keeps ready pull requests up to date, safer frontend releases, and CI that only runs for the part of the monorepo that changed.",
    year: "2026",
    role: "Owned",
    company: "Cotton Holdings",
    stack: ["GitHub Actions", "GitHub App", "Docker", "Azure", "Dependabot"],
    problem:
      "In a busy monorepo, pull requests fall behind main after every merge, a deploy can leave users with an old tab asking for JavaScript files that no longer exist, and every pipeline run costs time. The goal was to automate the repetitive parts without giving automation more power than it needs.",
    story: {
      caption: "Each automation has a narrow job and a safe way to fail.",
      steps: [
        {
          icon: "bot",
          title: "Pull requests stay up to date",
          body: "After every merge, a bot brings ready pull requests up to date, priority ones first.",
        },
        {
          icon: "shield",
          title: "It knows what to leave alone",
          body: "Drafts, conflicts and changes to the pipeline itself are skipped, and the bot only has the permissions it needs.",
        },
        {
          icon: "refresh",
          title: "Deploys don't break open tabs",
          body: "Old files stay available after a release, so people with an old tab keep working.",
        },
        {
          icon: "zap",
          title: "Only what changed runs",
          body: "Each change triggers only the checks for the part of the code it touched, and the pipelines themselves are scanned for security issues.",
        },
      ],
    },
    decisions: [
      {
        title: "Least-privilege automation",
        body: "The bot signs in as a GitHub App with a short-lived token limited to what it needs, not a personal access token. It skips drafts, pull requests with conflicts and anything that changes the workflows, so it can never alter CI configuration.",
      },
      {
        title: "Built for the messy cases",
        body: "A pull request labeled queue-priority goes first. Rate limits and server errors are retried, and if a pull request changes mid-update the bot reads it again and retries. Runs never overlap, and a dry-run mode shows what it would do without changing anything.",
      },
      {
        title: "Old tabs keep working",
        body: "After a deploy, people with an old tab asked for files that no longer existed and pages failed to load. A release script now keeps earlier releases' files available, and checks the live staging copy first, with timeouts so a stuck one can't stall a release.",
      },
      {
        title: "Run only what changed",
        body: "Each pipeline runs only for the part of the code that changed, frontend or API. Pull requests are labeled and assigned reviewers automatically.",
      },
      {
        title: "Pipelines are checked too",
        body: "A security scanner checks the workflows, third-party actions are pinned to exact versions, and Dependabot keeps dependencies up to date.",
      },
      {
        title: "Shared pipeline pieces",
        body: "I contributed to blue/green production releases, per-pull-request preview environments and per-environment feature flags. A teammate led those.",
      },
    ],
    note: "The PR bot and the safe-release script are my work; the blue/green releases, previews and build-time flags were shared.",
  },
  {
    slug: "billing-platform",
    animation: "grid",
    title: "A construction billing platform",
    summary:
      "Spreadsheet-style billing on Angular and .NET, including a four-major-version Angular upgrade.",
    year: "2024",
    role: "Contributed",
    company: "Cotton Holdings",
    stack: ["Angular", "ag-Grid", ".NET", "Entity Framework", "Dapper", "Azure Functions"],
    problem:
      "Weekly construction billing covers labor, equipment and markup, and billers expect to work in a grid with the keyboard, like a spreadsheet.",
    story: {
      caption: "Built so billers can work fast without leaving the keyboard.",
      steps: [
        {
          icon: "table",
          title: "Billing like a spreadsheet",
          body: "Weekly billing for labor, equipment and markup is edited in a grid, with full keyboard control.",
        },
        {
          icon: "layers",
          title: "The right tool for each job",
          body: "Simple saves and heavy reports use different ways of talking to the database.",
        },
        {
          icon: "refresh",
          title: "Reference data stays fresh",
          body: "A nightly job brings in reference data from the company's ERP.",
        },
        {
          icon: "rocket",
          title: "Upgraded, then retired the old app",
          body: "Angular went from version 13 to 17 in one migration, and users were moved off the old mobile app with an in-app countdown.",
        },
      ],
    },
    decisions: [
      {
        title: "Organized by feature",
        body: "Each part of the API is self-contained, with permission rules on about 40 endpoints.",
      },
      {
        title: "Two ways to talk to the database",
        body: "Entity Framework for saving data, and Dapper with stored procedures for heavy reports.",
      },
      {
        title: "A spreadsheet-style editor",
        body: "Editable ag-Grid tables with custom cells and full keyboard navigation. Each kind of billing line is handled separately, and the grid tracks which lines changed.",
      },
      {
        title: "Angular 13 to 17 in one go",
        body: "Four major versions at once, with TypeScript, ag-Grid and the build tooling upgraded alongside.",
      },
      {
        title: "Retiring the old app",
        body: "Users were moved off the old Ionic/Cordova app with an in-app countdown that sent them to the new platform.",
      },
    ],
  },
];

export const getCaseStudy = (slug?: string) => caseStudies.find((c) => c.slug === slug);
