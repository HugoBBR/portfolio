const month = new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" });

// "2022-08" → "Aug 2022"; undefined → "Present"
export const formatMonth = (ym?: string) => (ym ? month.format(new Date(`${ym}-01`)) : "Present");

export const formatPeriod = (start: string, end?: string) =>
  `${formatMonth(start)} – ${formatMonth(end)}`;
