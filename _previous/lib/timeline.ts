const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

export function parseRoleDate(input: string, now: Date): Date {
  if (input.trim().toLowerCase() === "present") return now;
  const [month, year] = input.trim().split(" ");
  const monthIndex = MONTHS.indexOf(month.toLowerCase());
  return new Date(Number(year), monthIndex, 1);
}

export type TimelineBar = {
  leftPct: number;
  widthPct: number;
};

export type Timeline = {
  bars: TimelineBar[];
  rangeStartLabel: string;
  rangeEndLabel: string;
};

export function computeTimeline(
  ranges: { startDate: string; endDate: string }[]
): Timeline {
  const now = new Date();
  const parsed = ranges.map((r) => ({
    start: parseRoleDate(r.startDate, now),
    end: parseRoleDate(r.endDate, now),
    endIsPresent: r.endDate.trim().toLowerCase() === "present",
  }));

  const min = Math.min(...parsed.map((p) => p.start.getTime()));
  const max = Math.max(...parsed.map((p) => p.end.getTime()));
  const span = max - min || 1;

  const bars = parsed.map((p) => ({
    leftPct: ((p.start.getTime() - min) / span) * 100,
    widthPct: Math.max(((p.end.getTime() - p.start.getTime()) / span) * 100, 3),
  }));

  const earliest = parsed.find((p) => p.start.getTime() === min)!.start;
  const latestIsPresent = parsed.some((p) => p.end.getTime() === max && p.endIsPresent);

  return {
    bars,
    rangeStartLabel: earliest.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    rangeEndLabel: latestIsPresent ? "Present" : new Date(max).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
  };
}
