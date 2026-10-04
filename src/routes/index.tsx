import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Building2,
  Copy,
  FileText,
  Pencil,
  Plus,
  Printer,
  Search,
  Trash2,
  Wrench,
  RefreshCcw,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useQuotes,
  duplicateQuote,
  deleteQuote,
  saveQuote,
} from "@/lib/quote/store";
import { calc, fmtDate, inr } from "@/lib/quote/utils";
import { cn } from "@/lib/utils";
import type { Quote } from "@/lib/quote/types";
import { AppHeader } from "@/components/AppHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quotation Maker — Aayush Elevator" },
      {
        name: "description",
        content:
          "Create, reuse and print elevator installation, modernization, AMC and repair quotations.",
      },
      { property: "og:title", content: "Quotation Maker — Aayush Elevator" },
      {
        property: "og:description",
        content: "Template-based quotation builder for Aayush Elevator.",
      },
    ],
  }),
  component: Dashboard,
});

const icons: Record<string, typeof Wrench> = {
  "Standard Installation": Building2,
  Modernization: RefreshCcw,
  "AMC Comprehensive": ShieldCheck,
  "AMC Non-Comprehensive": ShieldCheck,
  "Repair Work": Wrench,
};
const statusCls: Record<Quote["status"], string> = {
  Draft: "bg-muted text-muted-foreground",
  Sent: "bg-info/15 text-info",
  Accepted: "bg-success/15 text-success",
  Rejected: "bg-destructive/10 text-destructive",
};

function Dashboard() {
  const list = useQuotes();
  const navigate = useNavigate();
  const [qs, setQs] = useState("");
  const [status, setStatus] = useState<string>("All");
  const templates = list?.filter((x) => x.kind === "template") ?? [];
  const quotes = useMemo(
    () =>
      (list ?? [])
        .filter((x) => x.kind === "quotation")
        .filter((x) => status === "All" || x.status === status)
        .filter((x) =>
          (x.name + x.meta.number + x.customer.society)
            .toLowerCase()
            .includes(qs.toLowerCase()),
        )
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    [list, qs, status],
  );
  const all = list?.filter((x) => x.kind === "quotation") ?? [];
  const pipeline = all
    .filter((x) => x.status === "Sent")
    .reduce((a, x) => a + calc(x).total, 0);
  const won = all
    .filter((x) => x.status === "Accepted")
    .reduce((a, x) => a + calc(x).total, 0);

  const go = (id: string) => navigate({ to: "/editor/$id", params: { id } });
  const fromTemplate = (t: Quote) => {
    const c = duplicateQuote(t, "quotation");
    toast.success("Quotation created from " + t.name);
    go(c.id);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader subtitle="Quotation Maker" />

      <main className="mx-auto max-w-7xl space-y-10 px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Quotations", String(all.length)],
            ["Open pipeline", inr(pipeline)],
            ["Won value", inr(won)],
          ].map(([k, v]) => (
            <div
              key={k}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {k}
              </div>
              <div className="mt-1 font-mono text-2xl font-semibold">
                {list ? v : "—"}
              </div>
            </div>
          ))}
        </div>

        <section>
          <div className="mb-3 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold">Templates</h2>
              <p className="text-sm text-muted-foreground">
                Create once, reuse forever. Pick a template to start a new
                quotation.
              </p>
            </div>
            <Button
              onClick={() => {
                import("@/lib/quote/data").then(({ createBlankTemplate }) => {
                  const t = createBlankTemplate();
                  saveQuote(t);
                  toast.success("Blank template created");
                  go(t.id);
                });
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              New Blank Template
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {templates.map((t) => {
              const I = icons[t.templateName ?? ""] ?? Layers;
              return (
                <div
                  key={t.id}
                  className="group flex flex-col rounded-lg border border-border bg-card p-4 transition hover:border-primary hover:shadow-md"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary">
                      <I className="h-5 w-5" />
                    </div>
                    <div className="flex opacity-60 group-hover:opacity-100">
                      <button
                        title="Edit template"
                        onClick={() => go(t.id)}
                        className="rounded p-1 hover:bg-accent"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        title="Duplicate"
                        onClick={() => {
                          duplicateQuote(t);
                          toast.success("Template duplicated");
                        }}
                        className="rounded p-1 hover:bg-accent"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => {
                          if (confirm("Delete template?")) deleteQuote(t.id);
                        }}
                        className="rounded p-1 hover:bg-accent hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="font-semibold leading-snug">{t.name}</div>
                  <div className="mb-3 mt-1 text-xs text-muted-foreground">
                    {t.items.length} items ·{" "}
                    {t.sections.filter((s) => s.visible).length} sections
                  </div>
                  <Button
                    size="sm"
                    className="mt-auto"
                    onClick={() => fromTemplate(t)}
                  >
                    <Plus className="h-4 w-4" />
                    Use template
                  </Button>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">Quotation History</h2>
              <p className="text-sm text-muted-foreground">
                View, edit, duplicate or print previous quotations.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                <input
                  value={qs}
                  onChange={(e) => setQs(e.target.value)}
                  placeholder="Search customer or number"
                  className="h-8 w-64 rounded-md border border-input bg-card pl-8 pr-2 text-sm"
                />
              </div>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-8 rounded-md border border-input bg-card px-2 text-sm"
              >
                {["All", "Draft", "Sent", "Accepted", "Rejected"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="p-3">Quotation No.</th>
                  <th className="p-3">Customer / Site</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-right">Grand Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3" />
                </tr>
              </thead>
              <tbody>
                {!list && (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-6 text-center text-muted-foreground"
                    >
                      Loading…
                    </td>
                  </tr>
                )}
                {list && quotes.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-6 text-center text-muted-foreground"
                    >
                      No quotations found.
                    </td>
                  </tr>
                )}
                {quotes.map((x) => (
                  <tr
                    key={x.id}
                    className="cursor-pointer border-t border-border hover:bg-muted/50"
                    onClick={() => go(x.id)}
                  >
                    <td className="p-3 font-mono text-xs">{x.meta.number}</td>
                    <td className="p-3">
                      <div className="font-medium">
                        {x.customer.society || "—"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {x.customer.contact}
                      </div>
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {x.templateName}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {fmtDate(x.meta.date)}
                    </td>
                    <td className="p-3 text-right font-mono font-medium">
                      {inr(calc(x).total)}
                    </td>
                    <td className="p-3">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-semibold",
                          statusCls[x.status],
                        )}
                      >
                        {x.status}
                      </span>
                    </td>
                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-0.5">
                        <Link
                          to="/editor/$id"
                          params={{ id: x.id }}
                          title="Edit"
                          className="rounded p-1.5 hover:bg-accent"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          title="Duplicate"
                          onClick={() => {
                            duplicateQuote(x);
                            toast.success("Quotation duplicated");
                          }}
                          className="rounded p-1.5 hover:bg-accent"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <Link
                          to="/editor/$id"
                          params={{ id: x.id }}
                          title="Open to print"
                          className="rounded p-1.5 hover:bg-accent"
                        >
                          <Printer className="h-4 w-4" />
                        </Link>
                        <button
                          title="Delete"
                          onClick={() => {
                            if (confirm("Delete this quotation?"))
                              deleteQuote(x.id);
                          }}
                          className="rounded p-1.5 hover:bg-accent hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
            <FileText className="h-3.5 w-3.5" />
            Quotations are saved in this browser.
          </p>
        </section>
      </main>
    </div>
  );
}
