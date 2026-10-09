export type Role = {
  company: string;
  role: string;
  start: string; // YYYY-MM
  end?: string; // omit for current
  note?: string;
  highlights: string[];
  stack: string[];
  earlier?: boolean;
};

export const experience: Role[] = [
  {
    company: "Cotton Holdings",
    role: "Full-Stack Software Developer",
    start: "2022-08",
    highlights: [
      "Built an offline-first field inspection app on PowerSync and local SQLite, from sync design to security.",
      "Replaced a hosted form builder with a versioned, auditable forms platform on React and Postgres.",
      "Consolidated separate React and FastAPI repos into one monorepo with shared CI, preview environments and blue/green releases on Azure.",
      "Designed role-based access control tied to Entra ID groups, plus admin impersonation.",
      "Started on Angular and .NET (billing apps, Single Sign-On with IdentityServer4), then moved the team's work to React and FastAPI.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Azure",
      "GitHub Actions",
      "Angular",
      ".NET",
    ],
  },
  {
    company: "CAZ Investments",
    role: "Full-Stack Developer",
    start: "2026-01",
    end: "2026-06",
    note: "Investor portal",
    highlights: [
      "Established the architecture and tech stack for the investor portal: a monorepo with a React web app, an Expo mobile app and a FastAPI service in front of Salesforce.",
      "Shipped Auth0 sign-in, password reset, advisor tools with “view as client”, dashboards, an event calendar and support tickets.",
      "Created the shared design system and a style-guide page.",
    ],
    stack: [
      "React",
      "TanStack",
      "shadcn/ui",
      "Expo",
      "FastAPI",
      "Salesforce",
      "Auth0",
      "Sentry",
      "Playwright",
    ],
  },
  {
    company: "DevelopersRomo",
    role: "Freelance Full-Stack Developer",
    start: "2024-10",
    end: "2025-10",
    highlights: [
      "Built an e-commerce store for sportswear: roles and sign-in, product search, PayPal checkout, blog and SEO.",
      "Started a pharmacy mobile app for inventory, sales and stock control with Ionic and Capacitor.",
    ],
    stack: ["ASP.NET MVC", "Entity Framework", "SQL Server", "Angular", "Ionic", "Capacitor"],
  },
  {
    company: "Tomin Team",
    role: "Full-Stack Developer",
    start: "2022-03",
    end: "2022-08",
    highlights: ["Full-stack development on Angular and ASP.NET, with ASP.NET Core Identity."],
    stack: ["Angular", "ASP.NET"],
    earlier: true,
  },
  {
    company: "COVEICyDET",
    role: "Developer",
    start: "2021-12",
    end: "2022-06",
    highlights: [
      "Built a web inventory system for the Veracruz Council for Scientific Research and Technological Development, including database normalization.",
    ],
    stack: ["Web", "SQL"],
    earlier: true,
  },
  {
    company: "Paraxute",
    role: "Developer",
    start: "2021-02",
    end: "2021-08",
    highlights: [
      "Built a Laravel system to manage students for a music school and designed its database schema.",
    ],
    stack: ["Laravel", "PHP"],
    earlier: true,
  },
];
