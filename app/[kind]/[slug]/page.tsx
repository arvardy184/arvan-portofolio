import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { NoteItem, WorkItem } from "@/data/collection";
import { formatDate, hasPage, type Coded } from "@/lib/collection";
import { getCollection } from "@/lib/get-collection";
import { pageMetadata } from "@/lib/metadata";

// Ordinary static pages for single entries: /work/<id>/ and /notes/<id>/.
// They resolve on a direct visit, reload, or share, with no client state.

type Params = { kind: string; slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  const data = getCollection();
  return [
    ...data.works.map((item) => ({ kind: "work", slug: item.id })),
    ...data.notes.filter(hasPage).map((item) => ({ kind: "notes", slug: item.id })),
  ];
}

function find({ kind, slug }: Params) {
  const data = getCollection();
  if (kind === "work") {
    const index = data.works.findIndex((item) => item.id === slug);
    if (index < 0) return undefined;
    return { type: "work" as const, item: data.works[index], index, list: data.works };
  }
  if (kind === "notes") {
    const item = data.notes.find((entry) => entry.id === slug && hasPage(entry));
    return item ? { type: "note" as const, item } : undefined;
  }
  return undefined;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { kind, slug } = await params;
  const found = find({ kind, slug });
  if (!found) return {};
  return pageMetadata({
    title: found.item.title,
    description: found.item.summary,
    path: `/${kind}/${slug}/`,
  });
}

export default async function ItemPage({ params }: { params: Promise<Params> }) {
  const found = find(await params);
  if (!found) notFound();
  return found.type === "work" ? (
    <WorkPage item={found.item} index={found.index} list={found.list} />
  ) : (
    <NotePage item={found.item} />
  );
}

const LINK = "underline decoration-rule underline-offset-4 transition-colors duration-150 hover:decoration-ink";

function Back({ href, label }: { href: string; label: string }) {
  return (
    <p className="pt-5 md:pt-7">
      <Link href={href} className="meta inline-flex min-h-11 items-center gap-2 text-ink">
        <ArrowLeft size={14} aria-hidden />
        {label}
      </Link>
    </p>
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

function WorkPage({
  item,
  index,
  list,
}: {
  item: Coded<WorkItem>;
  index: number;
  list: Coded<WorkItem>[];
}) {
  const previous = list[index - 1];
  const next = list[index + 1];
  const [cover, ...gallery] = item.media;

  return (
    <article className="mx-auto max-w-[76rem]">
      <Back href="/work/" label="Work" />

      <header className="mt-2 border-t border-rule pt-6 md:pt-8">
        <p className="meta flex gap-3">
          <span className="text-ink">{item.code}</span>
          <span>Work</span>
        </p>
        <h1 className="mt-4 text-balance text-[clamp(2.75rem,9vw,6.5rem)] font-medium leading-[0.94] tracking-[-0.05em]">
          {item.title}
        </h1>
        <p className="mt-4 text-[1.1875rem] leading-snug text-dim">
          {item.role}, {item.employer}
        </p>
      </header>

      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover.src}
          width={cover.width}
          height={cover.height}
          alt={cover.alt}
          className="mt-8 block h-auto w-full bg-raised md:mt-10"
        />
      ) : (
        <div className="plate mt-8 aspect-[16/10] rounded-[2px] sm:aspect-[21/9] md:mt-10" aria-hidden>
          <span className="plate-mark">{item.mark}</span>
        </div>
      )}

      <div className="mt-9 grid gap-x-5 gap-y-10 md:mt-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="text-pretty text-[1.375rem] leading-[1.35] tracking-[-0.01em] md:text-[1.625rem]">
            {item.summary}
          </p>
          {item.body.map((paragraph) => (
            <p key={paragraph} className="mt-5 max-w-[62ch] text-pretty text-[1.0625rem] leading-[1.6]">
              {paragraph}
            </p>
          ))}
          {item.detail && (
            <section className="mt-10 max-w-[62ch] border-t border-rule pt-6">
              <h2 className="text-[1.375rem] font-medium leading-tight tracking-[-0.02em]">
                {item.detail.title}
              </h2>
              <p className="mt-3 text-pretty text-[1.0625rem] leading-[1.6] text-dim">{item.detail.body}</p>
            </section>
          )}
        </div>

        <dl className="self-start md:col-span-4 md:col-start-9">
          <Fact term="Role">{item.role}</Fact>
          <Fact term="Company">{item.employer}</Fact>
          <Fact term="Period">{item.period}</Fact>
          <Fact term="Built with">{item.technologies.join(", ")}</Fact>
          {item.sourceNote && <Fact term="Source">{item.sourceNote}</Fact>}
          {item.links.length > 0 && (
            <Fact term="Links">
              {item.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-8 items-center gap-1 ${LINK}`}
                >
                  {link.label}
                  <ArrowUpRight size={14} aria-hidden className="text-dim" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </Fact>
          )}
        </dl>
      </div>

      {gallery.length > 0 && (
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {gallery.map((media) => (
            <li key={media.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={media.src}
                width={media.width}
                height={media.height}
                alt={media.alt}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full bg-raised"
              />
            </li>
          ))}
        </ul>
      )}

      <nav aria-label="More work" className="mt-14 grid grid-cols-2 gap-x-5 border-t border-rule md:mt-20">
        <div>
          {previous && (
            <Link href={`/work/${previous.id}/`} className="block py-5">
              <span className="meta flex items-center gap-2">
                <ArrowLeft size={12} aria-hidden />
                {previous.code}
              </span>
              <span className="mt-2 block text-[1.125rem] font-medium leading-snug tracking-[-0.01em] md:text-[1.375rem]">
                {previous.title}
              </span>
            </Link>
          )}
        </div>
        <div className="text-right">
          {next && (
            <Link href={`/work/${next.id}/`} className="block py-5">
              <span className="meta flex items-center justify-end gap-2">
                {next.code}
                <ArrowRight size={12} aria-hidden />
              </span>
              <span className="mt-2 block text-[1.125rem] font-medium leading-snug tracking-[-0.01em] md:text-[1.375rem]">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}

function NotePage({ item }: { item: Coded<NoteItem> }) {
  return (
    <article className="mx-auto max-w-[76rem]">
      <Back href="/notes/" label="Notes" />

      <header className="mt-2 border-t border-rule pt-6 md:pt-8">
        <p className="meta flex flex-wrap gap-3">
          <span className="text-ink">{item.code}</span>
          <span>Essay</span>
          {item.date && <time dateTime={item.date}>{formatDate(item.date)}</time>}
        </p>
        <h1 className="mt-4 max-w-[18ch] text-balance text-[clamp(2.25rem,6.5vw,4.5rem)] font-medium leading-[1] tracking-[-0.04em]">
          {item.title}
        </h1>
      </header>

      <div className="prose-note mt-9 max-w-[40rem] text-pretty text-[1.125rem] leading-[1.65] md:mt-12">
        {item.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </article>
  );
}
