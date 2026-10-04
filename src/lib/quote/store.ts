import { useEffect, useState } from "react";
import type { Quote } from "./types";
import { seedQuotations, seedTemplates } from "./data";
import { uid } from "./utils";

const KEY = "aayush-quotes-v1";
let cache: Quote[] | null = null;
const listeners = new Set<() => void>();

function load(): Quote[] {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      cache = JSON.parse(raw);
      return cache!;
    }
  } catch {
    /* ignore */
  }
  const t = seedTemplates();
  cache = [...t, ...seedQuotations(t)];
  localStorage.setItem(KEY, JSON.stringify(cache));
  return cache;
}
function persist(next: Quote[]) {
  cache = next;
  localStorage.setItem(KEY, JSON.stringify(next));
  listeners.forEach((l) => l());
}

export function useQuotes() {
  const [list, setList] = useState<Quote[] | null>(null);
  useEffect(() => {
    const f = () => setList([...load()]);
    f();
    listeners.add(f);
    return () => {
      listeners.delete(f);
    };
  }, []);
  return list;
}

export const saveQuote = (q: Quote) => {
  const all = load();
  const u = { ...q, updatedAt: new Date().toISOString() };
  persist(
    all.some((x) => x.id === q.id)
      ? all.map((x) => (x.id === q.id ? u : x))
      : [u, ...all],
  );
};
export const deleteQuote = (id: string) =>
  persist(load().filter((x) => x.id !== id));
export function duplicateQuote(q: Quote, kind: Quote["kind"] = q.kind): Quote {
  const all = load();
  const now = new Date().toISOString();
  const nextNo = all.filter((x) => x.kind === "quotation").length + 114;
  const c: Quote = {
    ...structuredClone(q),
    id: uid(),
    kind,
    status: "Draft",
    createdAt: now,
    updatedAt: now,
    name: kind === q.kind ? q.name + " (Copy)" : q.name,
  };
  if (kind === "quotation") {
    c.meta.number = `AE/Q/2026-27/${String(nextNo).padStart(3, "0")}`;
    c.meta.date = now.slice(0, 10);
    c.templateName =
      q.kind === "template" ? (q.templateName ?? q.name) : q.templateName;
  }
  persist([c, ...all]);
  return c;
}
