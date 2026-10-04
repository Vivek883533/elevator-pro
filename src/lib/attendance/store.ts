import { useEffect, useState } from "react";

export type Status = "P" | "A" | "HD";
export interface Employee { id: string; name: string; role: string; phone: string; active: boolean }
interface DB { employees: Employee[]; records: Record<string, Status> } // key: yyyy-mm-dd|empId

const KEY = "aayush-attendance-v1";
let cache: DB | null = null;
const listeners = new Set<() => void>();

export const ymd = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const rkey = (date: string, empId: string) => `${date}|${empId}`;

function seed(): DB {
  const e = (id: string, name: string, role: string, phone: string, active = true): Employee => ({ id, name, role, phone, active });
  const employees = [
    e("e1", "Rajesh Solanki", "Senior Lift Technician", "+91 98250 11234"),
    e("e2", "Mahesh Parmar", "Lift Technician", "+91 99250 22341"),
    e("e3", "Suresh Vaghela", "Installation Supervisor", "+91 97240 33412"),
    e("e4", "Imran Shaikh", "Electrician", "+91 98980 44123"),
    e("e5", "Dinesh Rathod", "Helper / Fitter", "+91 90990 55214"),
    e("e6", "Ketan Chauhan", "AMC Service Engineer", "+91 98790 66321"),
    e("e7", "Pooja Trivedi", "Office Coordinator", "+91 99099 77432"),
    e("e8", "Vijay Makwana", "Welder", "+91 97120 88543"),
    e("e9", "Nilesh Prajapati", "Helper / Fitter", "+91 96010 99654"),
    e("e10", "Bharat Thakor", "Lift Technician", "+91 93270 10765", false),
  ];
  const records: Record<string, Status> = {};
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  let n = 7;
  for (let d = new Date(start); d < today; d.setDate(d.getDate() + 1)) {
    if (d.getDay() === 0) continue;
    for (const emp of employees) {
      n = (n * 9301 + 49297) % 233280;
      const r = n / 233280;
      records[rkey(ymd(d), emp.id)] = r < 0.84 ? "P" : r < 0.93 ? "HD" : "A";
    }
  }
  return { employees, records };
}

function load(): DB {
  if (cache) return cache;
  try { const raw = localStorage.getItem(KEY); if (raw) return (cache = JSON.parse(raw)); } catch { /* ignore */ }
  cache = seed();
  localStorage.setItem(KEY, JSON.stringify(cache));
  return cache;
}
function persist(db: DB) { cache = db; localStorage.setItem(KEY, JSON.stringify(db)); listeners.forEach((l) => l()); }

export function useAttendance() {
  const [db, setDb] = useState<DB | null>(null);
  useEffect(() => { const f = () => setDb({ ...load() }); f(); listeners.add(f); return () => { listeners.delete(f); }; }, []);
  return db;
}

export function setStatus(date: string, empId: string, s: Status | null) {
  const db = load(); const records = { ...db.records };
  if (s) records[rkey(date, empId)] = s; else delete records[rkey(date, empId)];
  persist({ ...db, records });
}
export function setMany(date: string, ids: string[], s: Status) {
  const db = load(); const records = { ...db.records };
  ids.forEach((id) => { records[rkey(date, id)] = s; });
  persist({ ...db, records });
}
export function upsertEmployee(e: Employee) {
  const db = load();
  persist({ ...db, employees: db.employees.some((x) => x.id === e.id) ? db.employees.map((x) => (x.id === e.id ? e : x)) : [...db.employees, e] });
}
export function deleteEmployee(id: string) { const db = load(); persist({ ...db, employees: db.employees.filter((x) => x.id !== id) }); }

/** Active employees, plus inactive ones that have any record within the given dates (history preserved). */
export function sheetEmployees(db: DB, dates: string[]) {
  return db.employees.filter((e) => e.active || dates.some((d) => db.records[rkey(d, e.id)]));
}
