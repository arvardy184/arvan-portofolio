import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-[44rem] pt-10 md:pt-14">
      <p className="meta">404</p>
      <h1 className="mt-4 text-[2.25rem] font-medium leading-[1] tracking-[-0.04em] md:text-[3.25rem]">
        Nothing is filed at this address.
      </h1>
      <p className="mt-4 max-w-[44ch] text-dim">
        The entry may have moved or never existed. Everything that does exist is on the index.
      </p>
      <p className="mt-6">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center underline decoration-rule underline-offset-4 hover:decoration-ink"
        >
          Go to the index
        </Link>
      </p>
    </div>
  );
}
