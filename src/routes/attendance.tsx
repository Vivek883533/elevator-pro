import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  FileDown,
  Printer,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AppHeader } from "@/components/AppHeader";
import { cn } from "@/lib/utils";
import {
  useAttendance,
  setStatus,
  setMany,
  sheetEmployees,
  rkey,
  ymd,
  type Status,
  type Employee,
} from "@/lib/attendance/store";

export const Route = createFileRoute("/attendance")({
  head: () => ({
    meta: [
      { title: "Attendance — Aayush Elevator" },
      {
        name: "description",
        content:
          "Daily, weekly and monthly attendance register for Aayush Elevator staff.",
      },
      { property: "og:title", content: "Attendance — Aayush Elevator" },
      {
        property: "og:description",
        content:
          "Daily, weekly and monthly attendance register for Aayush Elevator staff.",
      },
    ],
  }),
  component: AttendancePage,
});

type View = "day" | "week" | "month";
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const parse = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const addDays = (s: string, n: number) => {
  const d = parse(s);
  d.setDate(d.getDate() + n);
  return ymd(d);
};
const monday = (s: string) => {
  const d = parse(s);
  const off = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - off);
  return ymd(d);
};
const monthDates = (y: number, m: number) =>
  Array.from({ length: new Date(y, m + 1, 0).getDate() }, (_, i) =>
    ymd(new Date(y, m, i + 1)),
  );
const isSun = (s: string) => parse(s).getDay() === 0;

const statusCls: Record<Status, string> = {
  P: "bg-success text-success-foreground",
  A: "bg-destructive text-destructive-foreground",
  HD: "bg-warning text-warning-foreground",
};
const statusName: Record<Status, string> = {
  P: "Present",
  A: "Absent",
  HD: "Half Day",
};

function Cell({
  date,
  emp,
  value,
  size = "md",
}: {
  date: string;
  emp: Employee;
  value?: Status;
  size?: "sm" | "md";
}) {
  const [open, setOpen] = useState(false);
  const pick = (s: Status | null) => {
    setStatus(date, emp.id, s);
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`${emp.name} ${date}`}
          className={cn(
            "grid place-items-center rounded font-bold transition hover:ring-2 hover:ring-ring",
            size === "sm" ? "h-7 w-8 text-[11px]" : "h-9 w-14 text-sm",
            value
              ? statusCls[value]
              : "border border-dashed border-input text-muted-foreground/50",
          )}
        >
          {value ?? "–"}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align="center">
        <div className="mb-1.5 text-center text-[11px] text-muted-foreground">
          {emp.name} ·{" "}
          {parse(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          })}
        </div>
        <div className="flex gap-1.5">
          {(["P", "A", "HD"] as Status[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => pick(s)}
              className={cn(
                "flex w-16 flex-col items-center rounded-md py-1.5 font-bold",
                statusCls[s],
                value === s && "ring-2 ring-foreground ring-offset-1",
              )}
            >
              {s}
              <span className="text-[10px] font-medium opacity-90">
                {statusName[s]}
              </span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => pick(null)}
            className="flex w-14 flex-col items-center rounded-md border border-border py-1.5 text-muted-foreground hover:bg-accent"
          >
            <X className="h-4 w-4" />
            <span className="text-[10px]">Clear</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function AttendancePage() {
  const db = useAttendance();
  const [view, setView] = useState<View>("day");
  const [date, setDate] = useState("");
  const [ym, setYm] = useState({ y: 2026, m: 0 });
  const [printMode, setPrintMode] = useState<"blank" | "filled">("filled");
  const [printReq, setPrintReq] = useState(0);

  useEffect(() => {
    const t = new Date();
    setDate(ymd(t));
    setYm({ y: t.getFullYear(), m: t.getMonth() });
  }, []);
  useEffect(() => {
    if (!printReq) return;
    const old = document.title;
    document.title = `Attendance ${MONTHS[ym.m]} ${ym.y}${printMode === "blank" ? " (Blank)" : ""}`;
    const t = setTimeout(() => {
      window.print();
      document.title = old;
    }, 100);
    return () => clearTimeout(t);
  }, [printReq]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!db || !date)
    return (
      <div className="min-h-screen bg-background">
        <AppHeader subtitle="Attendance" />
        <p className="p-10 text-center text-muted-foreground">Loading…</p>
      </div>
    );

  const rec = (d: string, id: string) => db.records[rkey(d, id)];
  const weekDates = Array.from({ length: 7 }, (_, i) =>
    addDays(monday(date), i),
  );
  const mDates = monthDates(ym.y, ym.m);
  const dates = view === "day" ? [date] : view === "week" ? weekDates : mDates;
  const emps = sheetEmployees(db, dates);
  const count = (id: string, s: Status) =>
    dates.filter((d) => rec(d, id) === s).length;
  const shiftMonth = (n: number) => {
    const d = new Date(ym.y, ym.m + n, 1);
    setYm({ y: d.getFullYear(), m: d.getMonth() });
  };

  const dayTotals = { P: 0, A: 0, HD: 0, none: 0 };
  if (view === "day")
    emps.forEach((e) => {
      const s = rec(date, e.id);
      if (s) dayTotals[s]++;
      else dayTotals.none++;
    });

  return (
    <div className="min-h-screen bg-background">
      <AppHeader subtitle="Attendance Management" />
      <main className="no-print mx-auto max-w-7xl space-y-4 px-6 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-lg border border-border bg-card p-1">
            {(
              [
                ["day", "Today"],
                ["week", "This Week"],
                ["month", "This Month"],
              ] as [View, string][]
            ).map(([v, l]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "rounded-md px-4 py-1.5 text-sm font-medium",
                  view === v
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent",
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setPrintMode("blank");
                setPrintReq((n) => n + 1);
              }}
            >
              <Printer className="h-4 w-4" />
              Blank Sheet
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setPrintMode("filled");
                setPrintReq((n) => n + 1);
              }}
            >
              <FileDown className="h-4 w-4" />
              Filled Sheet (PDF / Print)
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-3">
          {view !== "month" ? (
            <>
              <button
                className="rounded p-1.5 hover:bg-accent"
                onClick={() => setDate(addDays(date, view === "day" ? -1 : -7))}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <input
                type="date"
                value={date}
                onChange={(e) => e.target.value && setDate(e.target.value)}
                className="h-8 rounded-md border border-input bg-background px-2 text-sm"
              />
              <button
                className="rounded p-1.5 hover:bg-accent"
                onClick={() => setDate(addDays(date, view === "day" ? 1 : 7))}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <span className="text-sm font-semibold">
                {view === "day"
                  ? parse(date).toLocaleDateString("en-IN", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : `Week: ${parse(weekDates[0]).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} – ${parse(weekDates[6]).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`}
              </span>
            </>
          ) : (
            <>
              <button
                className="rounded p-1.5 hover:bg-accent"
                onClick={() => shiftMonth(-1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <select
                value={ym.m}
                onChange={(e) => setYm({ ...ym, m: Number(e.target.value) })}
                className="h-8 rounded-md border border-input bg-background px-2 text-sm"
              >
                {MONTHS.map((m, i) => (
                  <option key={m} value={i}>
                    {m}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={ym.y}
                onChange={(e) =>
                  setYm({ ...ym, y: Number(e.target.value) || ym.y })
                }
                className="h-8 w-20 rounded-md border border-input bg-background px-2 text-sm"
              />
              <button
                className="rounded p-1.5 hover:bg-accent"
                onClick={() => shiftMonth(1)}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <span className="text-sm text-muted-foreground">
                {mDates.length} days
              </span>
            </>
          )}
          {view === "day" && (
            <div className="ml-auto flex items-center gap-3">
              <span className="text-xs text-muted-foreground">
                P {dayTotals.P} · A {dayTotals.A} · HD {dayTotals.HD} · Unmarked{" "}
                {dayTotals.none}
              </span>
              <Button
                size="sm"
                onClick={() => {
                  setMany(
                    date,
                    emps.filter((e) => e.active).map((e) => e.id),
                    "P",
                  );
                  toast.success("All marked present");
                }}
              >
                <CheckCheck className="h-4 w-4" />
                Mark All Present
              </Button>
            </div>
          )}
        </div>

        {view === "day" && (
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="w-10 p-3">#</th>
                  <th className="p-3">Employee</th>
                  <th className="p-3">Role</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {emps.map((e, i) => (
                  <tr key={e.id} className="border-t border-border">
                    <td className="p-3 text-muted-foreground">{i + 1}</td>
                    <td className="p-3 font-medium">
                      {e.name}
                      {!e.active && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          (inactive)
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-muted-foreground">{e.role}</td>
                    <td className="p-2">
                      <div className="flex justify-center">
                        <Cell date={date} emp={e} value={rec(date, e.id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view !== "day" && (
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground">
                  <th className="sticky left-0 z-10 min-w-[190px] border-b border-r border-border bg-muted p-2 text-left uppercase tracking-wider">
                    Employee
                  </th>
                  {dates.map((d) => (
                    <th
                      key={d}
                      className={cn(
                        "border-b border-border p-1 text-center font-medium",
                        isSun(d) ? "bg-sunday" : "bg-muted",
                        view === "week" && "min-w-[70px]",
                      )}
                    >
                      <div className="text-[10px] uppercase">
                        {DOW[parse(d).getDay()]}
                      </div>
                      <div className="text-sm font-bold text-foreground">
                        {parse(d).getDate()}
                      </div>
                    </th>
                  ))}
                  {(["P", "A", "HD"] as Status[]).map((s) => (
                    <th
                      key={s}
                      className="min-w-[44px] border-b border-l border-border bg-muted p-1 text-center"
                      title={statusName[s]}
                    >
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {emps.map((e) => (
                  <tr key={e.id}>
                    <td className="sticky left-0 z-10 border-b border-r border-border bg-card px-2 py-1">
                      <div className="truncate font-medium">{e.name}</div>
                      <div className="truncate text-[11px] text-muted-foreground">
                        {e.role}
                        {!e.active && " · inactive"}
                      </div>
                    </td>
                    {dates.map((d) => (
                      <td
                        key={d}
                        className={cn(
                          "border-b border-border p-0.5",
                          isSun(d) && "bg-sunday",
                        )}
                      >
                        <div className="flex justify-center">
                          <Cell
                            date={d}
                            emp={e}
                            value={rec(d, e.id)}
                            size={view === "month" ? "sm" : "md"}
                          />
                        </div>
                      </td>
                    ))}
                    <td className="border-b border-l border-border text-center font-mono font-bold text-success">
                      {count(e.id, "P")}
                    </td>
                    <td className="border-b border-l border-border text-center font-mono font-bold text-destructive">
                      {count(e.id, "A")}
                    </td>
                    <td className="border-b border-l border-border text-center font-mono font-bold text-warning">
                      {count(e.id, "HD")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          Click any cell to choose P (Present), A (Absent) or HD (Half Day).
          Printed sheets use the selected month.
        </p>
      </main>

      <PrintSheet
        mode={printMode}
        y={ym.y}
        m={ym.m}
        emps={sheetEmployees(db, printMode === "filled" ? mDates : [])}
        rec={rec}
      />
    </div>
  );
}

function PrintSheet({
  mode,
  y,
  m,
  emps,
  rec,
}: {
  mode: "blank" | "filled";
  y: number;
  m: number;
  emps: Employee[];
  rec: (d: string, id: string) => Status | undefined;
}) {
  const dates = monthDates(y, m);
  const blank = mode === "blank";
  const rows = blank
    ? [...emps, ...Array.from({ length: Math.max(0, 3) }, () => null)]
    : emps;
  return (
    <div className="print-only att-print">
      <div className="att-head">
        <div>
          <b style={{ fontSize: 15 }}>Aayush Elevator Pvt. Ltd.</b>
          <div>Attendance Register {blank ? "(Site Copy)" : ""}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <b style={{ fontSize: 14 }}>
            {MONTHS[m]} {y}
          </b>
          <div>Site: ____________________</div>
        </div>
      </div>
      <table className="att-table">
        <colgroup>
          <col style={{ width: "4%" }} />
          <col style={{ width: "15%" }} />
          {dates.map((d) => (
            <col key={d} />
          ))}
          <col style={{ width: "3%" }} />
          <col style={{ width: "3%" }} />
          <col style={{ width: "3%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>#</th>
            <th style={{ textAlign: "left" }}>Employee</th>
            {dates.map((d) => (
              <th key={d} className={isSun(d) ? "sun" : ""}>
                <div style={{ fontSize: 6 }}>
                  {DOW[parse(d).getDay()].slice(0, 2)}
                </div>
                {parse(d).getDate()}
              </th>
            ))}
            <th>P</th>
            <th>A</th>
            <th>HD</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((e, i) => (
            <tr key={e?.id ?? "x" + i}>
              <td style={{ textAlign: "center" }}>{i + 1}</td>
              <td style={{ textAlign: "left" }}>{e?.name ?? ""}</td>
              {dates.map((d) => (
                <td key={d} className={isSun(d) ? "sun" : ""}>
                  {!blank && e ? (rec(d, e.id) ?? "") : ""}
                </td>
              ))}
              {(["P", "A", "HD"] as Status[]).map((s) => (
                <td key={s}>
                  <b>
                    {!blank && e
                      ? dates.filter((d) => rec(d, e.id) === s).length
                      : ""}
                  </b>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="att-foot">
        <span>P = Present · A = Absent · HD = Half Day</span>
        <span>Supervisor Signature: ____________________</span>
        <span>Authorised Signatory: ____________________</span>
      </div>
    </div>
  );
}
