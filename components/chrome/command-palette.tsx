"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { FEEDBACK } from "@/lib/motion";
import { useModal } from "@/lib/use-modal";
import { useOutsideClick } from "@/lib/use-outside-click";
import { Portal } from "./portal";

export type Command = {
  id: string;
  group: string;
  label: string;
  /** Right-aligned detail: a catalog code, a shortcut, a destination. */
  hint?: string;
  /** Extra words to match against. */
  keywords?: string;
  run: () => void;
};

type Props = {
  open: boolean;
  onClose: () => void;
  commands: Command[];
};

export function CommandPalette({ open, onClose, commands }: Props) {
  return (
    <Portal>
      <AnimatePresence>
        {open && <Palette onClose={onClose} commands={commands} />}
      </AnimatePresence>
    </Portal>
  );
}

function Palette({ onClose, commands }: Omit<Props, "open">) {
  const panel = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const listId = useId();
  const titleId = useId();

  useModal(panel, { onClose });
  useOutsideClick(panel, onClose);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.group} ${command.hint ?? ""} ${command.keywords ?? ""}`
        .toLowerCase()
        .includes(q),
    );
  }, [commands, query]);

  useEffect(() => setCursor(0), [query]);

  useEffect(() => {
    list.current
      ?.querySelector<HTMLElement>(`[data-index="${cursor}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  const run = (command: Command | undefined) => {
    if (!command) return;
    onClose();
    command.run();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(results[cursor]);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-3 pt-[max(0.75rem,env(safe-area-inset-top))] md:pt-[14vh]">
      <motion.div
        className="absolute inset-0 bg-bg/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={FEEDBACK}
      />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={FEEDBACK}
        className="relative flex max-h-[min(34rem,calc(100dvh-1.5rem))] w-full max-w-[36rem] flex-col border border-rule bg-raised"
      >
        <h2 id={titleId} className="sr-only">
          Search the index
        </h2>
        <div className="flex items-center gap-2 border-b border-rule pl-4 pr-1">
          <input
            data-autofocus
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results[cursor] ? `${listId}-${results[cursor].id}` : undefined}
            aria-label="Search views, entries, and links"
            placeholder="Search views, entries, links"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            className="h-14 min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-dim"
          />
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center text-dim hover:text-ink"
            aria-label="Close search"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        <ul
          ref={list}
          id={listId}
          role="listbox"
          aria-label="Results"
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-2"
        >
          {results.length === 0 && (
            <li className="px-4 py-6 text-dim">Nothing in the index matches “{query}”.</li>
          )}
          {results.map((command, i) => {
            const firstOfGroup = i === 0 || results[i - 1].group !== command.group;
            const selected = i === cursor;
            return (
              <li key={command.id} role="presentation">
                {firstOfGroup && (
                  <div className="meta px-4 pb-2 pt-3" aria-hidden>
                    {command.group}
                  </div>
                )}
                <div
                  id={`${listId}-${command.id}`}
                  role="option"
                  aria-selected={selected}
                  data-index={i}
                  onClick={() => run(command)}
                  onPointerMove={() => setCursor(i)}
                  className={cn(
                    "flex min-h-11 cursor-pointer items-center gap-3 px-4",
                    selected ? "bg-bg text-ink" : "text-dim",
                  )}
                >
                  <span className="flex w-[6px] justify-center">
                    {selected && <span className="mark" />}
                  </span>
                  <span className={cn("min-w-0 flex-1 truncate", selected && "font-medium")}>
                    {command.label}
                  </span>
                  {command.hint && <span className="meta shrink-0">{command.hint}</span>}
                </div>
              </li>
            );
          })}
        </ul>

        <p className="meta hidden gap-5 border-t border-rule px-4 py-3 md:flex">
          <span>↑↓ Move</span>
          <span>Enter Open</span>
          <span>Esc Close</span>
        </p>
      </motion.div>
    </div>
  );
}
