export type Diagram = {
  caption: string;
  lanes: { label: string; steps: string[]; branches?: { when: string; steps: string[] }[] }[];
};

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
  steps: { icon: "offline" | "save" | "online" | "synced"; title: string; body: string }[];
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
  diagram?: Diagram;
  story?: Story;
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
      "JSONB",
      "PowerSync",
      "Microsoft Graph",
      "Feature flags",
    ],
    problem:
      "Business forms lived in a hosted form builder. The goal was versioned, auditable forms in our own database, rolled out gradually, with the QA/QC field audit as the first big workflow: a scored checklist where each failed item gets its own owner, review and history, and everything keeps working offline on phones as an installable web app.",
    diagram: {
      caption:
        "Definitions are code, submissions are data, and each form family plugs in as a profile with its own lifecycle.",
      lanes: [
        {
          label: "Definitions",
          steps: [
            "Form definition JSON in git",
            "Validated and hashed on deploy",
            "Immutable, versioned definition",
          ],
        },
        {
          label: "Submissions",
          steps: ["Submission: context · answers · profile state · revision"],
          branches: [
            { when: "Follow-ups", steps: ["Task", "Task entry (permanent, idempotent thread)"] },
            { when: "History", steps: ["Audit log"] },
          ],
        },
        {
          label: "QA/QC inspection",
          steps: ["Draft", "Pending corrective actions", "Closed", "Final PDF"],
          branches: [{ when: "No failed items needing follow-up", steps: ["Submit", "Closed"] }],
        },
        {
          label: "Each corrective action",
          steps: ["Pending Response Team", "Pending QA/QC approval", "Approved (locked)"],
          branches: [
            {
              when: "Changes requested, with a message",
              steps: ["Back to the Response Team, this action only"],
            },
          ],
        },
      ],
    },
    decisions: [
      {
        title: "Definitions live in code",
        body: "They're reviewed in PRs and loaded at deploy time. Identity is a hash of the normalized content, so reformatting doesn't create a new version. A published version never changes, and drafts stay on the version they started with.",
      },
      {
        title: "Shared platform, per-form rules",
        body: "The platform handles storage, versions, revisions, retry safety, attachments and history. Each form family (a profile) owns its statuses, validation, scoring and workflow. Task records work for any parent record, so job requisitions reuse the same table, and the remaining audit types become new form definitions with no new code.",
      },
      {
        title: "One task per failed item",
        body: "Submitting an inspection freezes the findings and creates a follow-up task for each failed item. The inspection becomes a frozen snapshot: findings and scores never change, follow-up work happens on the task records, and every edit to the general information is kept in the history with old and new values.",
      },
      {
        title: "A rejection reopens one action",
        body: "There is no “submit everything for review” step. QA/QC approves each completed action, which locks it with its photos, or requests changes with a message. Approving the last open action closes the inspection automatically.",
      },
      {
        title: "Permissions checked field by field",
        body: "The update endpoint compares the before and after value of every field and checks each change against the user's role. A client can't smuggle in a change by resending a whole record. Being on the Response Team says who answers for the work; what each person may do is checked separately.",
      },
      {
        title: "Optimistic concurrency",
        body: "The server keeps a revision number; the client sends the revision it expects plus a mutation UUID. An out-of-date write is rejected with a 409 and the user picks one complete version. There is no automatic field-by-field merge.",
      },
      {
        title: "Safe to retry",
        body: "The device generates IDs, so a retried save never creates a second inspection. Every entry in a task's permanent thread has its own ID, and attachments are idempotent by a client-generated UUID, so photos upload in parallel without false conflicts. This is what makes offline sync safe.",
      },
      {
        title: "Submit is one transaction",
        body: "Online only. The server re-looks up the project in the ERP, validates against the pinned form version, recalculates the score (the browser's score is only instant feedback), waits for every photo upload, then commits status, scores, tasks and history together.",
      },
      {
        title: "Upload limits on both sides",
        body: "Photos are compressed in the browser to about 0.7 MB and 1920 px. The server checks bytes, type and extension, caps files at 2 MB and allows 25 photos per item. Uploads run at most 3 at once.",
      },
      {
        title: "One email thread per inspection",
        body: "Notifications started as separate per-person emails. I moved them to one email to everyone through the Microsoft Graph API, so people can reply-all in a single conversation. Each person's opt-out is still honored, outside production emails go only to an allowlist, and the audit log records how many people were notified, not their addresses.",
      },
      {
        title: "Gradual migration",
        body: "One central router sends each legacy form to the new engine behind its own feature flag. Everything else stays on the old builder. Abandoned drafts are deleted after 15 days, and the Web Locks API keeps each draft editable in one tab.",
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
    stack: ["React", "TypeScript", "PowerSync", "SQLite", "FastAPI", "PostgreSQL", "IndexedDB"],
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
        title: "One write path",
        body: "Every change goes through one hook. Online it calls the API; offline it saves a working copy and a queued command in the same local transaction. UI code never checks connectivity itself.",
      },
      {
        title: "The server is the only writer",
        body: "The device never writes to server tables directly. The API re-checks every queued command, and each handler is idempotent by `mutation_id`, so a retried command has no extra effect.",
      },
      {
        title: "Upload order follows cause and effect",
        body: "Each submission's commands get increasing sequence numbers. A photo uploads before the comment that references it, repeated saves collapse into the latest, and each command carries the server version it expects, so a queue doesn't trigger false conflicts.",
      },
      {
        title: "Failures are sorted by type",
        body: "Network and server errors retry. Auth errors refresh the token. Permanent rejections become a visible sync issue, so one bad record never blocks the rest of the queue.",
      },
      {
        title: "Permissions work offline",
        body: "The device runs a copy of the server's permission function (status, owner, roles), so offline edits are allowed exactly when the server would allow them.",
      },
      {
        title: "Sync only what's needed",
        body: "Each user receives only inspections they created, are assigned to, or are on the crew for: one bucket per open inspection. Closed inspections stay online-only. Large lookup tables come through the API into IndexedDB, because the sync service bills by the volume it syncs.",
      },
      {
        title: "Security",
        body: "The API issues short-lived sync tokens, signed with RS256 so the sync service only holds a public key. A signed offline pass lasting up to 24 hours lets the app start cold. Logout, account switch or impersonation wipes the local database, caches, drafts and photos.",
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
    diagram: {
      caption:
        "Both apps talk only to the API; the API is the only thing that talks to Salesforce.",
      lanes: [
        {
          label: "Request path",
          steps: [
            "Web or mobile app",
            "Auth0 sign-in",
            "FastAPI (backend for the frontend)",
            "Salesforce",
          ],
          branches: [
            {
              when: "Advisor opens “view as client”",
              steps: ["Access check by user type", "The client's own view"],
            },
          ],
        },
        {
          label: "Shared code",
          steps: ["Portfolio utilities and types", "Used by web and mobile"],
        },
        { label: "Delivery", steps: ["Pull request", "Lint, types and tests", "Deploy to dev"] },
      ],
    },
    decisions: [
      {
        title: "One monorepo, three apps",
        body: "Web, mobile and API live side by side with shared code between the apps, so a change to a data shape reaches every consumer in the same pull request.",
      },
      {
        title: "A backend for the frontend",
        body: "The FastAPI service is the only thing that talks to Salesforce. Clients never see Salesforce field names: response models map them with aliases, one client wraps queries and error handling, and rate limiting protects the endpoints.",
      },
      {
        title: "Navigation by who you are",
        body: "Investors, advisors and shareholders get different routes and tabs, checked by user type. Advisors can open a “view as client” session to see exactly what the client sees.",
      },
      {
        title: "A design system from day one",
        body: "shadcn/ui and Tailwind on the web, with a style-guide page documenting the tokens and components. The mobile app follows the same approach with NativeWind and accessible primitives, so both feel like one product.",
      },
      {
        title: "Quality gates in CI",
        body: "Biome, type checks and unit tests on every pull request, Playwright end-to-end tests on the web, `ruff`, `mypy` and `pytest` on the API, error tracking with Sentry, and an automatic deploy to dev on merge.",
      },
      {
        title: "Written for people and agents",
        body: "An `AGENTS.md` describes the layout, commands and conventions, with shared skills and workflows, so new contributors and AI tools follow the same rules from the first commit.",
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
    diagram: {
      caption: "Agents work freely inside the rules and stop where a person needs to decide.",
      lanes: [
        {
          label: "An agent task",
          steps: ["Reads AGENTS.md and the playbooks", "Does the work", "Tests and checks run"],
          branches: [
            {
              when: "Touches prod or dev, runs a migration, or deploys",
              steps: ["Stops", "Waits for a person's approval"],
            },
          ],
        },
        {
          label: "Design docs",
          steps: ["Doc cites file and line", "Doc and code disagree", "The code wins"],
        },
      ],
    },
    decisions: [
      {
        title: "One entry point",
        body: "An `AGENTS.md` describes the layout, commands and conventions, with playbooks for the API, the frontend, end-to-end tests and engineering principles, plus project skills that agents and people can both follow.",
      },
      {
        title: "Approval rules",
        body: "Agents never run anything against prod or dev, run migrations, or deploy without a person's approval. The guardrails make risky actions slow on purpose and everything else fast.",
      },
      {
        title: "Docs you can check",
        body: "Design docs cite the file and line they describe, with one rule: where the doc and the code disagree, the code wins. That keeps the docs checkable by people and by agents.",
      },
      {
        title: "Used every day",
        body: "About 220 commits were co-authored with AI tools. The conventions are what made that safe to do on a production codebase.",
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
    stack: ["Python", "FastAPI", "Redis", "Delta Lake", "Polars", "Parquet", "zstd"],
    problem:
      "API list and report endpoints read Delta Lake tables directly, which was slow, and several API servers were refreshing the same tables at once.",
    diagram: {
      caption: "Fresh data is served as is; stale data is served instantly while a refresh runs.",
      lanes: [
        {
          label: "Read path",
          steps: ["Request", "Delta table reader", "Redis (zstd parquet + version metadata)"],
          branches: [
            { when: "Fresh", steps: ["Serve from cache"] },
            { when: "Older than 5 min", steps: ["Serve cached copy", "Refresh in background"] },
            {
              when: "Older than 1 h, or a miss",
              steps: ["Delta Lake", "Polars", "Parquet", "Redis"],
            },
            { when: "Redis down", steps: ["In-memory fallback"] },
          ],
        },
      ],
    },
    decisions: [
      {
        title: "Locking at four levels",
        body: "Within one process, per table across servers, one refresh slot for the whole cluster, and a CPU limit per server. If the cluster slot is busy, a request reads the source directly instead of waiting: availability over efficiency.",
      },
      {
        title: "Compress once",
        body: "Parquet is zstd-compressed and the cache layer's own compression is off, so data isn't compressed twice.",
      },
      {
        title: "Failure behavior depends on the data",
        body: "Data caches fall back to the source if Redis fails. Security state, such as impersonation sessions, refuses to proceed instead.",
      },
      {
        title: "Operations",
        body: "The eviction policy is `volatile-lru` (every key has an expiry), so losing a cached table means a slow first read, not an outage. Logs record hits, misses and refreshes using hashed keys.",
      },
      {
        title: "Related fixes",
        body: "Removed a slow query-per-row pattern in bulk edit, and cut one API's page size from 50,000 rows to 500.",
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
    diagram: {
      caption: "The server enforces; the front end only hides what the user can't use.",
      lanes: [
        { label: "Roles", steps: ["Entra ID groups", "Roles", "Pages, tabs & fields"] },
        {
          label: "Impersonation",
          steps: [
            "Admin request headers",
            "Server middleware swaps in the target user",
            "Session stored in Redis",
          ],
        },
      ],
    },
    decisions: [
      {
        title: "Roles from groups",
        body: "Roles come from Entra ID (Azure AD) groups and decide which pages, tabs and fields each user sees. The server enforces this; the front end hides what the user can't use.",
      },
      {
        title: "Impersonation by middleware",
        body: "An admin starts a session with dedicated request headers. Middleware swaps in the target user and the session lives in Redis.",
      },
      {
        title: "Refuse rather than guess",
        body: "If Redis is unavailable, impersonation refuses to proceed: a session held by only one server would be unsafe.",
      },
      {
        title: "A race worth fixing",
        body: "A slow earlier response could cancel a freshly started session in the front end. Fixed so the newest session always wins.",
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
    stack: ["GitHub Actions", "Docker", "Azure", "git-filter-repo", "Playwright"],
    problem:
      "Separate front-end and API repos meant duplicated tooling and no single place to test a change end to end.",
    diagram: {
      caption: "The Docker image tested in Dev is promoted to production unchanged.",
      lanes: [
        {
          label: "Pull request",
          steps: [
            "PR opened",
            "Preview environment (front end + API)",
            "Sign-in redirect URLs registered, removed on close",
          ],
        },
        { label: "Main", steps: ["Merge to main", "Deploy to Dev", "End-to-end tests"] },
        {
          label: "Release",
          steps: [
            "GitHub Release",
            "Staging slot",
            "Migrations + health checks",
            "Swap staging and production",
          ],
        },
      ],
    },
    decisions: [
      {
        title: "The merge",
        body: "Combined the repos into `apps/frontend`, `apps/api` and `tests/e2e`. History was rewritten with git-filter-repo so both repos keep their commits.",
      },
      {
        title: "CI that follows the change",
        body: "PRs are labeled by the area they touch, a bot keeps ready PRs up to date with main, and workflows only run for the area that changed.",
      },
      {
        title: "Delivery flow",
        body: "Each PR gets a throwaway preview. Merging to main deploys to Dev and runs end-to-end tests. A GitHub Release deploys to a staging slot, runs migrations and health checks, then swaps staging and production. A teammate led the deploy pipelines; I built the monorepo CI around them.",
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
    stack: ["GitHub Actions", "GitHub App", "Docker", "Azure", "Dependabot", "zizmor"],
    problem:
      "In a busy monorepo, pull requests fall behind main after every merge, a deploy can leave users with an old tab asking for JavaScript files that no longer exist, and every pipeline run costs time. The goal was to automate the repetitive parts without giving automation more power than it needs.",
    diagram: {
      caption: "Each automation has a narrow job and a safe way to fail.",
      lanes: [
        {
          label: "PR auto-updater",
          steps: ["Merge to main", "Find ready PRs behind main", "Update them, priority first"],
          branches: [
            { when: "Draft, merge conflict or workflow-file change", steps: ["Skipped"] },
            { when: "Rate limit or server error", steps: ["Retry"] },
            { when: "PR changed mid-update", steps: ["Re-read it", "Try again"] },
          ],
        },
        {
          label: "Safe frontend release",
          steps: [
            "New build",
            "Merged with earlier releases' files",
            "Live staging slot checked",
            "Deploy",
          ],
        },
        {
          label: "Per-change pipelines",
          steps: [
            "Pull request",
            "Labeled by area, reviewers assigned",
            "Only the affected pipeline runs",
          ],
        },
      ],
    },
    decisions: [
      {
        title: "Least-privilege automation",
        body: "The bot authenticates as a GitHub App with a short-lived token limited to the permissions it needs, not a personal access token. It skips drafts, PRs with merge conflicts and PRs that change workflow files, so it can never push changes to CI configuration.",
      },
      {
        title: "Built for the failure cases",
        body: "A PR labeled `queue-priority` is updated first. Rate limits and server errors are retried, and if a PR changes while the bot is updating it, the bot re-reads it and tries again. Runs are queued so two never overlap, and a dry-run mode logs what it would do without changing anything.",
      },
      {
        title: "Old tabs keep working",
        body: "After a deploy, users with an old tab or a cached service worker requested JavaScript files that no longer existed, and pages failed to load. A release script now combines the new build's files with the files from earlier production releases, so old file names keep working. Before deploying it checks the live staging slot, with timeouts so a stuck slot can't stall the pipeline, and the staging slot is cleaned on each production release.",
      },
      {
        title: "Run only what changed",
        body: "Each pipeline runs only for the part of the code that changed, frontend or API. Pull requests are labeled automatically by the area they touch, and reviewers are assigned automatically.",
      },
      {
        title: "Pipelines are scanned too",
        body: "A security scanner (zizmor) checks the workflows for issues, third-party actions are pinned to exact versions, and Dependabot keeps dependencies up to date.",
      },
      {
        title: "Shared pipeline pieces",
        body: "I contributed to blue/green production releases, per-PR preview environments (including a force-publish option) and per-environment feature flags injected at build time. A teammate led those.",
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
    stack: ["Angular", "ag-Grid", ".NET", "MediatR", "EF Core", "Dapper", "Azure Functions"],
    problem:
      "Weekly construction billing covers labor, equipment and markup, and billers expect to work in a grid with the keyboard, like a spreadsheet.",
    diagram: {
      caption: "One class per endpoint, with the right data-access tool for each job.",
      lanes: [
        {
          label: "Stack",
          steps: [
            "Angular 17 SPA (ag-Grid, Signals, MSAL)",
            ".NET API: one class per endpoint",
            "MediatR handlers",
          ],
          branches: [
            { when: "Writes", steps: ["EF Core"] },
            { when: "Heavy reads", steps: ["Dapper + stored procedures"] },
            { when: "Reference data", steps: ["Azure Functions", "Nightly ERP sync"] },
          ],
        },
      ],
    },
    decisions: [
      {
        title: "Code organized by feature",
        body: "Each API endpoint is its own class, so each feature is self-contained, with authorization policies on about 40 endpoints.",
      },
      {
        title: "Two data-access tools",
        body: "EF Core for writes, Dapper with stored procedures for heavy reports.",
      },
      {
        title: "A spreadsheet-style editor",
        body: "Editable ag-Grid tables with custom cells and full keyboard navigation. Each kind of billing line converts separately and the grid tracks which lines changed.",
      },
      {
        title: "Angular 13 to 17 in one migration",
        body: "Four major versions at once, TypeScript 4.5 to 5.3, ag-Grid 27 to 31, and a faster build tool.",
      },
      {
        title: "Retiring the legacy app",
        body: "Moved users off the old Ionic/Cordova app with an in-app countdown that redirected them to the new platform.",
      },
    ],
  },
];

export const getCaseStudy = (slug?: string) => caseStudies.find((c) => c.slug === slug);
