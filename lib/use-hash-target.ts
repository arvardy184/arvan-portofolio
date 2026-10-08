"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Keeps "which object is open" in the URL hash, so previews and the frame
 * viewer survive reload, can be shared, and close on browser Back.
 */
export function useHashTarget() {
  const pathname = usePathname();
  const [target, setTarget] = useState<string | null>(null);
  // History entries this hook pushed and has not yet seen popped.
  const pushed = useRef(0);

  useEffect(() => {
    const read = () => {
      const raw = window.location.hash.slice(1);
      if (!raw) pushed.current = 0;
      setTarget(raw ? decodeURIComponent(raw) : null);
    };
    read();
    window.addEventListener("popstate", read);
    window.addEventListener("hashchange", read);
    return () => {
      window.removeEventListener("popstate", read);
      window.removeEventListener("hashchange", read);
    };
  }, [pathname]);

  const open = useCallback((id: string) => {
    window.history.pushState(null, "", `#${encodeURIComponent(id)}`);
    pushed.current += 1;
    setTarget(id);
  }, []);

  /** Move to another object without adding a history entry (viewer prev/next). */
  const swap = useCallback((id: string) => {
    window.history.replaceState(null, "", `#${encodeURIComponent(id)}`);
    setTarget(id);
  }, []);

  const close = useCallback(() => {
    setTarget(null);
    if (pushed.current > 0) {
      pushed.current -= 1;
      window.history.back();
    } else {
      // Opened from a shared link or a reload: there is no entry of ours to pop.
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  return { target, open, swap, close };
}
