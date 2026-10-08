"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import type { Employment } from "@/data/collection";
import { cn } from "@/lib/cn";
import type { ContactLink } from "@/lib/contact";
import { REFLOW } from "@/lib/motion";

export type Profile = {
  name: string;
  role: string;
  location: string;
  experience: string;
  statement: string;
  about: string;
  leadership: string;
  exploring: string[];
};

/** Type-only objects sit straight on the sheet under a hairline, no plate. */
const SHELL = "flex h-full flex-col border-t border-rule pt-4";

function OpenInfo({ label }: { label: string }) {
  return (
    <Link
      href="/info/"
      scroll={false}
      onClick={() => window.scrollTo({ top: 0 })}
      className="object meta -mb-2 mt-auto inline-flex min-h-11 items-center gap-1 self-start pt-4 text-ink"
    >
      {label}
      <Plus size={12} aria-hidden />
      <span className="select-mark mark ml-1" aria-hidden />
    </Link>
  );
}

function Label({ code, children }: { code: string; children: string }) {
  return (
    <p className="meta flex gap-3">
      <span className="text-ink">{code}</span>
      <span>{children}</span>
    </p>
  );
}

export function StatementObject({ profile, expanded }: { profile: Profile; expanded: boolean }) {
  return (
    <motion.article layout="position" transition={REFLOW} className={SHELL}>
      <Label code="I.01">Profile</Label>
      <p
        className={cn(
          "mt-5 text-balance font-medium tracking-[-0.035em]",
          expanded
            ? "max-w-[16ch] text-[2.25rem] leading-[1] md:text-[3.25rem] wide:text-[3.75rem]"
            : "text-[1.75rem] leading-[1.06] md:text-[1.5rem] rail:text-[1.75rem] wide:text-[2rem]",
        )}
      >
        {profile.statement}
      </p>

      {expanded ? (
        <>
          <p className="mt-8 max-w-[52ch] text-pretty text-[1.125rem] leading-[1.5]">{profile.about}</p>
          <dl className="mt-9 max-w-[38rem]">
            <Fact term="Name">{profile.name}</Fact>
            <Fact term="Role">{profile.role}</Fact>
            <Fact term="Based in">{profile.location}</Fact>
            <Fact term="Experience">{profile.experience}</Fact>
            <Fact term="Leadership">{profile.leadership}</Fact>
          </dl>
        </>
      ) : (
        <OpenInfo label="Open profile" />
      )}
    </motion.article>
  );
}

function Fact({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-x-4 border-t border-rule py-3">
      <dt className="meta pt-1">{term}</dt>
      <dd className="leading-snug">{children}</dd>
    </div>
  );
}

export function RecordObject({ employment, expanded }: { employment: Employment[]; expanded: boolean }) {
  return (
    <motion.article layout="position" transition={REFLOW} className={SHELL}>
      <Label code="I.02">{expanded ? "Employment record" : "Record"}</Label>
      <ol className={expanded ? "mt-3" : "mt-2"}>
        {employment.map((job) => (
          <li
            key={`${job.company}-${job.start}`}
            className={cn("border-b border-rule last:border-b-0", expanded ? "py-4" : "py-2.5")}
          >
            <p
              className={cn(
                "font-medium leading-snug tracking-[-0.01em]",
                expanded ? "text-[1.25rem]" : "text-[0.9375rem]",
              )}
            >
              {job.title}
            </p>
            <p className={cn("leading-snug text-dim", expanded ? "mt-0.5" : "text-[0.875rem]")}>{job.company}</p>
            <p className={cn("meta", expanded ? "mt-2.5" : "mt-1.5")}>
              {job.start} – {job.end}
            </p>
          </li>
        ))}
      </ol>
      {!expanded && <OpenInfo label="Open record" />}
    </motion.article>
  );
}

export function ExploringObject({ profile, expanded }: { profile: Profile; expanded: boolean }) {
  return (
    <motion.article layout="position" transition={REFLOW} className={SHELL}>
      <Label code="I.03">Currently exploring</Label>
      <ul className="mt-4">
        {profile.exploring.map((topic) => (
          <li
            key={topic}
            className={cn(
              "leading-snug tracking-[-0.01em]",
              expanded ? "py-1.5 text-[1.375rem]" : "py-1 text-[1.0625rem]",
            )}
          >
            {topic}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export function ContactObject({ links }: { links: ContactLink[] }) {
  return (
    <motion.article layout="position" transition={REFLOW} className={SHELL}>
      <Label code="I.04">Contact</Label>
      <ul className="mt-3">
        {links.map((link) => (
          <li key={link.id} className="border-b border-rule last:border-b-0">
            <a
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="object group grid min-h-14 grid-cols-[1fr_auto] items-center gap-x-4 py-3"
            >
              <span>
                <span className="block text-[1.25rem] font-medium leading-snug tracking-[-0.01em]">
                  {link.label}
                </span>
                <span className="block break-all text-[0.875rem] text-dim">{link.display}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="select-mark mark" aria-hidden />
                <ArrowUpRight size={18} aria-hidden className="text-dim transition-colors group-hover:text-ink" />
              </span>
              {link.external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
