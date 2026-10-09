import type { Config } from "@react-router/dev/config";
import { caseStudies } from "./app/content/case-studies";

export default {
  ssr: false,
  prerender: ["/", "/cv", ...caseStudies.map((c) => `/work/${c.slug}`)],
} satisfies Config;
