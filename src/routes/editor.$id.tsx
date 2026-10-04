import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  Copy,
  FileDown,
  Printer,
  Save,
  Share2,
  ZoomIn,
  ZoomOut,
  FilePlus2,
  Maximize,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuotes, saveQuote, duplicateQuote } from "@/lib/quote/store";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import type { Quote } from "@/lib/quote/types";
import { Editor } from "@/components/quote/Editor";
import { QuoteSheet } from "@/components/quote/QuoteSheet";
import { calc, inr } from "@/lib/quote/utils";

export const Route = createFileRoute("/editor/$id")({
  head: () => ({
    meta: [
      { title: "Quotation Editor — Aayush Elevator" },
      {
        name: "description",
        content: "Edit elevator quotations with a live A4 print preview.",
      },
      { property: "og:title", content: "Quotation Editor — Aayush Elevator" },
      {
        property: "og:description",
        content: "Edit elevator quotations with a live A4 print preview.",
      },
    ],
  }),
  component: EditorPage,
});

function EditorPage() {
  const { id } = Route.useParams();
  const list = useQuotes();
  const navigate = useNavigate();
  const [q, setQ] = useState<Quote | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [activeFieldId, setActiveFieldId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [zoom, setZoom] = useState(0.5); // start small; fit() corrects on mount
  const paneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!list) return;
    const f = list.find((x) => x.id === id);
    if (f && (!q || q.id !== id)) {
      setQ(structuredClone(f));
      setDirty(false);
    }
  }, [list, id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-fit zoom to pane width on mount and on window resize
  const fit = useCallback(() => {
    const w = paneRef.current?.clientWidth ?? 800;
    setZoom(Math.min(1.5, Math.max(0.3, (w - 48) / 794)));
  }, []);

  useEffect(() => {
    // Small delay to let layout settle before measuring
    const t = setTimeout(fit, 100);
    window.addEventListener("resize", fit);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", fit);
    };
  }, [fit]);

  useEffect(() => {
    if (activeSectionId) {
      const el = document.getElementById(`sidebar-section-${activeSectionId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [activeSectionId]);

  if (!list)
    return (
      <div className="grid h-screen place-items-center text-muted-foreground">
        Loading…
      </div>
    );
  if (!q)
    return (
      <div className="grid h-screen place-items-center">
        <div className="text-center">
          <p className="mb-3">Quotation not found.</p>
          <Link to="/" className="text-primary underline">
            Back to dashboard
          </Link>
        </div>
      </div>
    );

  const upd = (fn: (d: Quote) => void) =>
    setQ((prev) => {
      const d = structuredClone(prev!);
      fn(d);
      return d;
    });
  const onChange: typeof upd = (fn) => {
    upd(fn);
    setDirty(true);
  };
  const save = () => {
    saveQuote(q);
    setDirty(false);
    toast.success(q.kind === "template" ? "Template saved" : "Quotation saved");
  };
  const saveAsTemplate = () => {
    const t = duplicateQuote(q, "template");
    saveQuote({
      ...t,
      name: q.name.replace(/ \(Copy\)$/, "") + " (Template)",
      templateName: q.name,
    });
    toast.success("Saved as a new template");
  };
  const dup = () => {
    if (dirty) saveQuote(q);
    const c = duplicateQuote(q);
    toast.success("Duplicated");
    navigate({ to: "/editor/$id", params: { id: c.id } });
  };
  const createFromTemplate = () => {
    if (dirty) saveQuote(q);
    const c = duplicateQuote(q, "quotation");
    toast.success("New quotation created from template");
    navigate({ to: "/editor/$id", params: { id: c.id } });
  };
  const print = () => {
    const old = document.title;
    document.title =
      q.meta.number.replace(/\//g, "-") + " " + q.customer.society;
    window.print();
    setTimeout(() => (document.title = old), 500);
  };
  const share = async () => {
    const text = `${q.company.name} – Quotation ${q.meta.number} for ${q.customer.society || "your project"}. Grand Total: ${inr(calc(q).total)}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Quotation ${q.meta.number}`,
          text,
          url: location.href,
        });
      } catch {
        /* cancelled */
      }
    } else {
      await navigator.clipboard.writeText(text + "\n" + location.href);
      toast.success("Share details copied to clipboard");
    }
  };

  const handleReorder = (draggedId: string, targetId: string) => {
    onChange((d) => {
      const i1 = d.sections.findIndex((s) => s.id === draggedId);
      const i2 = d.sections.findIndex((s) => s.id === targetId);
      if (i1 >= 0 && i2 >= 0 && i1 !== i2) {
        const [moved] = d.sections.splice(i1, 1);
        d.sections.splice(i2, 0, moved);
      }
    });
  };

  const handleFieldOffsetChange = (fieldId: string, x: number, y: number) => {
    onChange((d) => {
      if (!d.offsets) d.offsets = {};
      d.offsets[fieldId] = { x, y };
    });
  };

  const handleSectionAction = (
    id: string,
    action: "up" | "down" | "style" | "toggle" | "delete" | "edit",
  ) => {
    onChange((d) => {
      const i = d.sections.findIndex((s) => s.id === id);
      if (i < 0) return;
      if (action === "up" && i > 0) {
        [d.sections[i], d.sections[i - 1]] = [d.sections[i - 1], d.sections[i]];
      } else if (action === "down" && i < d.sections.length - 1) {
        [d.sections[i], d.sections[i + 1]] = [d.sections[i + 1], d.sections[i]];
      } else if (action === "toggle") {
        d.sections[i].visible = !d.sections[i].visible;
      } else if (action === "delete") {
        d.sections.splice(i, 1);
        if (activeSectionId === id) setActiveSectionId(null);
      }
    });
    if (action === "style" || action === "edit") {
      setActiveSectionId(id);
      setMobileOpen(true);
    }
  };

  const handleFieldTextChange = (path: string, val: string) => {
    onChange((d) => {
      const keys = path.split(".");
      let obj: Record<string, unknown> = d as Record<string, unknown>;

      for (let i = 0; i < keys.length - 1; i++) {
        const next = obj[keys[i]];
        if (typeof next !== "object" || next === null) return;
        obj = next as Record<string, unknown>;
      }

      obj[keys[keys.length - 1]] = val;
    });
  };

  const handleFieldAction = (
    id: string,
    action: "style" | "toggle" | "reset",
  ) => {
    if (action === "reset") {
      onChange((d) => {
        if (d.offsets) delete d.offsets[id];
        if (d.fieldStyles) delete d.fieldStyles[id];
      });
    } else if (action === "toggle") {
      onChange((d) => {
        if (!d.hiddenFields) d.hiddenFields = [];
        if (d.hiddenFields.includes(id))
          d.hiddenFields = d.hiddenFields.filter((x) => x !== id);
        else d.hiddenFields.push(id);
      });
    } else if (action === "style") {
      setMobileOpen(true);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="no-print flex flex-wrap items-center gap-2 border-b border-border bg-card px-3 py-2">
        <Link
          to="/"
          className="rounded-md p-2 hover:bg-accent"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="mr-auto min-w-0">
          <div className="flex items-center gap-2">
            <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground">
              {q.kind}
            </span>
            <h1 className="truncate font-semibold max-w-[160px] sm:max-w-xs md:max-w-sm">
              {q.name}
            </h1>
            {dirty && <span className="text-xs text-highlight">• unsaved</span>}
          </div>
          {/* Always visible on all screen sizes */}
          <div className="font-mono text-xs text-muted-foreground">
            {q.meta.number} · {inr(calc(q).total)}
          </div>
        </div>

        {/* Always-visible Save button */}
        <Button
          size="sm"
          variant={q.kind === "template" ? "outline" : "default"}
          onClick={save}
        >
          <Save className="h-4 w-4 sm:mr-1" />
          <span className="hidden sm:inline">Save</span>
        </Button>

        {/* Desktop-only actions */}
        {q.kind === "template" && (
          <Button
            size="sm"
            className="hidden sm:flex"
            onClick={createFromTemplate}
          >
            <FilePlus2 className="h-4 w-4 mr-1" />
            Create
          </Button>
        )}
        {q.kind === "quotation" && (
          <Button
            size="sm"
            variant="outline"
            className="hidden md:flex"
            onClick={saveAsTemplate}
          >
            <Save className="h-4 w-4 mr-1" />
            Save as Template
          </Button>
        )}
        <Button
          size="sm"
          variant="outline"
          className="hidden sm:flex"
          onClick={dup}
        >
          <Copy className="h-4 w-4 sm:mr-1" />
          <span className="hidden sm:inline">Duplicate</span>
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="hidden lg:flex"
          onClick={print}
        >
          <FileDown className="h-4 w-4 mr-1" />
          PDF
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="hidden sm:flex"
          onClick={print}
        >
          <Printer className="h-4 w-4 sm:mr-1" />
          <span className="hidden sm:inline">Print</span>
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="hidden sm:flex"
          onClick={share}
        >
          <Share2 className="h-4 w-4 sm:mr-1" />
          <span className="hidden sm:inline">Share</span>
        </Button>

        {/* Mobile sheet — contains Editor + all hidden actions */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="md:hidden"
              aria-label="Open editor menu"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[90vw] sm:w-[460px] p-0 flex flex-col overflow-hidden"
          >
            {/* Mobile action bar inside sheet */}
            <div className="flex flex-wrap gap-2 border-b border-border bg-muted/40 p-3">
              {q.kind === "template" && (
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    createFromTemplate();
                    setMobileOpen(false);
                  }}
                >
                  <FilePlus2 className="h-4 w-4 mr-1" />
                  Create Quotation
                </Button>
              )}
              {q.kind === "quotation" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    saveAsTemplate();
                    setMobileOpen(false);
                  }}
                >
                  <Save className="h-4 w-4 mr-1" />
                  Save as Template
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  dup();
                  setMobileOpen(false);
                }}
              >
                <Copy className="h-4 w-4 mr-1" />
                Duplicate
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  print();
                  setMobileOpen(false);
                }}
              >
                <Printer className="h-4 w-4 mr-1" />
                Print
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  print();
                  setMobileOpen(false);
                }}
              >
                <FileDown className="h-4 w-4 mr-1" />
                PDF
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  share();
                  setMobileOpen(false);
                }}
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
            {/* Editor panel */}
            <div className="flex-1 overflow-y-auto">
              <Editor
                q={q}
                upd={onChange}
                activeId={activeSectionId}
                onActiveChange={setActiveSectionId}
                activeFieldId={activeFieldId}
                onActiveFieldChange={setActiveFieldId}
              />
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <div className="no-print flex min-h-0 flex-1">
        <aside className="hidden md:block w-[320px] lg:w-[400px] xl:w-[460px] shrink-0 overflow-y-auto border-r border-border bg-muted/30">
          <Editor
            q={q}
            upd={onChange}
            activeId={activeSectionId}
            onActiveChange={setActiveSectionId}
            activeFieldId={activeFieldId}
            onActiveFieldChange={setActiveFieldId}
          />
        </aside>
        <section
          ref={paneRef}
          className="relative flex-1 overflow-auto bg-canvas"
        >
          {/* Zoom toolbar — larger touch targets on mobile */}
          <div className="sticky top-3 z-10 mx-auto flex w-fit items-center gap-0.5 rounded-full border border-border bg-card px-1.5 py-1 shadow-md">
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent active:bg-accent"
              aria-label="Zoom out"
              onClick={() =>
                setZoom((z) => Math.max(0.3, +(z - 0.1).toFixed(2)))
              }
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="w-11 text-center font-mono text-xs tabular-nums">
              {Math.round(zoom * 100)}%
            </span>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent active:bg-accent"
              aria-label="Zoom in"
              onClick={() => setZoom((z) => Math.min(2, +(z + 0.1).toFixed(2)))}
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              className="flex h-9 items-center justify-center rounded-full px-2 text-xs hover:bg-accent active:bg-accent"
              onClick={() => setZoom(1)}
            >
              1:1
            </button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent active:bg-accent"
              title="Fit width"
              aria-label="Fit to width"
              onClick={fit}
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
          <div
            className="py-6"
            style={{ zoom }}
            onClick={() => {
              setActiveSectionId(null);
              setActiveFieldId(null);
            }}
          >
            <div className="mx-auto w-fit shadow-2xl">
              <QuoteSheet
                q={q}
                activeId={activeSectionId}
                onActiveChange={(id) => {
                  setActiveSectionId(id);
                  setActiveFieldId(null);
                }}
                activeFieldId={activeFieldId}
                onActiveFieldChange={(id, sectionId) => {
                  setActiveFieldId(id);
                  if (sectionId) setActiveSectionId(sectionId);
                }}
                onReorder={handleReorder}
                zoom={zoom}
                onFieldOffsetChange={handleFieldOffsetChange}
                onFieldTextChange={handleFieldTextChange}
                onFieldAction={handleFieldAction}
                onSectionAction={handleSectionAction}
              />
            </div>
          </div>
        </section>
      </div>
      <div className="print-only">
        <QuoteSheet q={q} />
      </div>
    </div>
  );
}
