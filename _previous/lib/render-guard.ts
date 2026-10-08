/**
 * Any UI that depends on an unresolved content field (a missing URL, email,
 * screenshot set, etc.) must not render — no button, no empty slot. These
 * two checks are the single place that decision is made.
 */

export function isResolved(value?: string | null): value is string {
  return typeof value === "string" && value.trim().length > 0 && !value.trim().startsWith("TODO");
}

export function hasItems<T>(list?: readonly T[] | null): list is readonly T[] {
  return Array.isArray(list) && list.length > 0;
}
