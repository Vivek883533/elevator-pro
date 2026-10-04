import { useState, lazy, Suspense, useEffect, type ReactNode } from "react";
const ReactQuill = lazy(() => import("react-quill-new"));
import "react-quill-new/dist/quill.snow.css";
import type {
  Align,
  Quote,
  Section,
  SectionType,
  Field,
} from "@/lib/quote/types";
import { blankSection, sectionLabels } from "@/lib/quote/data";
import { uid } from "@/lib/quote/utils";
import { StyleEditor } from "./StyleEditor";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Paintbrush,
  GripVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Upd = (fn: (q: Quote) => void) => void;

const inputCls =
  "h-8 w-full rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
export function F({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
      {label}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls + " text-foreground"}
      />
    </label>
  );
}
function TA({
  label,
  value,
  onChange,
  rows = 5,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
      {label}
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}
const G = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-2">
    {children}
  </div>
);
const AddBtn = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center gap-1 rounded-md border border-dashed border-primary/40 px-2 py-1 text-xs font-medium text-primary hover:bg-primary/5"
  >
    <Plus className="h-3 w-3" />
    {children}
  </button>
);

function Fields({
  list,
  onChange,
  add = "Add field",
}: {
  list: Field[];
  onChange: (l: Field[]) => void;
  add?: string;
}) {
  return (
    <div className="space-y-1.5">
      {list.map((f, i) => (
        <div key={f.id} className="flex gap-1.5">
          <input
            className={inputCls + " w-2/5 font-medium"}
            value={f.label}
            placeholder="Label"
            onChange={(e) =>
              onChange(
                list.map((x, j) =>
                  j === i ? { ...x, label: e.target.value } : x,
                ),
              )
            }
          />
          <input
            className={inputCls}
            value={f.value}
            placeholder="Value"
            onChange={(e) =>
              onChange(
                list.map((x, j) =>
                  j === i ? { ...x, value: e.target.value } : x,
                ),
              )
            }
          />
          <button
            type="button"
            onClick={() => onChange(list.filter((_, j) => j !== i))}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <AddBtn
        onClick={() => onChange([...list, { id: uid(), label: "", value: "" }])}
      >
        {add}
      </AddBtn>
    </div>
  );
}

function ItemsEditor({ q, upd }: { q: Quote; upd: Upd }) {
  const [sel, setSel] = useState<string | null>(null);
  return (
    <div className="space-y-2">
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-xs">
          <thead className="bg-muted">
            <tr>
              {q.columns.map((c, ci) => (
                <th
                  key={c.id}
                  className="min-w-[70px] p-1 text-left font-medium"
                >
                  <div className="flex items-center gap-0.5">
                    <input
                      value={c.label}
                      onChange={(e) =>
                        upd((d) => {
                          d.columns[ci].label = e.target.value;
                        })
                      }
                      className="w-full rounded bg-transparent px-1 py-0.5 font-semibold focus:bg-background"
                    />
                    {!["desc", "qty", "rate", "amount"].includes(c.id) && (
                      <button
                        type="button"
                        title="Remove column"
                        onClick={() =>
                          upd((d) => {
                            d.columns.splice(ci, 1);
                          })
                        }
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                  <select
                    value={c.align}
                    onChange={(e) =>
                      upd((d) => {
                        d.columns[ci].align = e.target.value as never;
                      })
                    }
                    className="mt-0.5 w-full rounded border border-input bg-background text-[10px] font-normal"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </th>
              ))}
              <th className="w-6" />
            </tr>
          </thead>
          <tbody>
            {q.items.map((it, ri) => (
              <tr key={it.id} className="border-t border-border">
                {q.columns.map((c) => {
                  const key = `${it.id}:${c.id}`;
                  return (
                    <td
                      key={c.id}
                      className={cn(
                        "p-0.5",
                        sel === key &&
                          "bg-accent/60 outline outline-2 outline-primary",
                      )}
                    >
                      {c.id === "amount" ? (
                        <button
                          type="button"
                          onClick={() => setSel(key)}
                          className="w-full px-1 py-1 text-right text-muted-foreground"
                        >
                          auto
                        </button>
                      ) : (
                        <input
                          value={it.cells[c.id] ?? ""}
                          onFocus={() => setSel(key)}
                          onChange={(e) =>
                            upd((d) => {
                              d.items[ri].cells[c.id] = e.target.value;
                            })
                          }
                          className="w-full rounded bg-transparent px-1 py-1 focus:bg-background focus:outline-none"
                        />
                      )}
                    </td>
                  );
                })}
                <td className="p-0.5">
                  <button
                    type="button"
                    onClick={() =>
                      upd((d) => {
                        d.items.splice(ri, 1);
                      })
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <AddBtn
          onClick={() =>
            upd((d) => {
              d.items.push({
                id: uid(),
                cells: { qty: "1", rate: "0", unit: "Nos" },
              });
            })
          }
        >
          Add row
        </AddBtn>
        <AddBtn
          onClick={() =>
            upd((d) => {
              d.columns.splice(d.columns.length - 1, 0, {
                id: "c" + uid(),
                label: "New Column",
                align: "left",
              });
            })
          }
        >
          Add column
        </AddBtn>
      </div>
      {sel && (
        <div>
          <div className="mb-1 flex items-center gap-1 text-xs font-medium">
            <Paintbrush className="h-3 w-3" />
            Selected cell style
          </div>
          <StyleEditor
            value={q.cellStyles[sel] ?? {}}
            onChange={(s) =>
              upd((d) => {
                d.cellStyles[sel] = s;
              })
            }
          />
        </div>
      )}
    </div>
  );
}

function CustomTableEditor({ s, q, upd }: { s: Section; q: Quote; upd: Upd }) {
  const [sel, setSel] = useState<string | null>(null);
  const cols = s.columns || [];
  const items = s.items || [];

  const setCols = (fn: (c: typeof cols) => void) =>
    upd((d) => {
      const sc = d.sections.find((x) => x.id === s.id);
      if (sc) {
        if (!sc.columns) sc.columns = [];
        fn(sc.columns);
      }
    });
  const setItems = (fn: (i: typeof items) => void) =>
    upd((d) => {
      const sc = d.sections.find((x) => x.id === s.id);
      if (sc) {
        if (!sc.items) sc.items = [];
        fn(sc.items);
      }
    });

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-xs">
          <thead className="bg-muted">
            <tr>
              {cols.map((c, ci) => (
                <th
                  key={c.id}
                  className="min-w-[70px] p-1 text-left font-medium"
                >
                  <div className="flex items-center gap-0.5">
                    <input
                      value={c.label}
                      onChange={(e) =>
                        setCols((cs) => {
                          cs[ci].label = e.target.value;
                        })
                      }
                      className="w-full rounded bg-transparent px-1 py-0.5 font-semibold focus:bg-background"
                    />
                    <button
                      type="button"
                      title="Remove column"
                      onClick={() =>
                        setCols((cs) => {
                          cs.splice(ci, 1);
                        })
                      }
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                  <select
                    value={c.align}
                    onChange={(e) =>
                      setCols((cs) => {
                        cs[ci].align = e.target.value as Align;
                      })
                    }
                    className="mt-0.5 w-full rounded border border-input bg-background text-[10px] font-normal"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </th>
              ))}
              <th className="w-6" />
            </tr>
          </thead>
          <tbody>
            {items.map((it, ri) => (
              <tr key={it.id} className="border-t border-border">
                {cols.map((c) => {
                  const key = `${it.id}:${c.id}`;
                  return (
                    <td
                      key={c.id}
                      className={cn(
                        "p-0.5",
                        sel === key &&
                          "bg-accent/60 outline outline-2 outline-primary",
                      )}
                    >
                      <input
                        value={it.cells[c.id] ?? ""}
                        onFocus={() => setSel(key)}
                        onChange={(e) =>
                          setItems((is) => {
                            is[ri].cells[c.id] = e.target.value;
                          })
                        }
                        className="w-full rounded bg-transparent px-1 py-1 focus:bg-background focus:outline-none"
                      />
                    </td>
                  );
                })}
                <td className="p-0.5">
                  <button
                    type="button"
                    onClick={() =>
                      setItems((is) => {
                        is.splice(ri, 1);
                      })
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <AddBtn
          onClick={() =>
            setItems((is) => {
              is.push({ id: uid(), cells: {} });
            })
          }
        >
          Add row
        </AddBtn>
        <AddBtn
          onClick={() =>
            setCols((cs) => {
              cs.push({ id: "c" + uid(), label: "New Column", align: "left" });
            })
          }
        >
          Add column
        </AddBtn>
      </div>
      {sel && (
        <div>
          <div className="mb-1 flex items-center gap-1 text-xs font-medium">
            <Paintbrush className="h-3 w-3" />
            Selected cell style
          </div>
          <StyleEditor
            value={q.cellStyles[sel] ?? {}}
            onChange={(st) =>
              upd((d) => {
                d.cellStyles[sel] = st;
              })
            }
          />
        </div>
      )}
    </div>
  );
}

function ClientOnlyQuill({ s, upd }: { s: Section; upd: Upd }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted)
    return (
      <div className="p-4 text-center text-muted-foreground">
        Loading editor...
      </div>
    );
  return (
    <Suspense
      fallback={
        <div className="p-4 text-center text-muted-foreground">
          Loading editor...
        </div>
      }
    >
      <ReactQuill
        theme="snow"
        value={s.content ?? ""}
        onChange={(v) =>
          upd((d) => {
            d.sections.find((x) => x.id === s.id)!.content = v;
          })
        }
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }],
            ["link"],
            ["clean"],
          ],
        }}
      />
    </Suspense>
  );
}

function SectionBody({ s, q, upd }: { s: Section; q: Quote; upd: Upd }) {
  switch (s.type) {
    case "header": {
      const c = q.company;
      const set = (k: keyof typeof c) => (v: string) =>
        upd((d) => {
          (d.company as Record<string, string>)[k] = v;
        });
      return (
        <div className="space-y-2">
          <G>
            <F label="Company name" value={c.name} onChange={set("name")} />
            <F label="Tagline" value={c.tagline} onChange={set("tagline")} />
          </G>
          <F label="Address" value={c.address} onChange={set("address")} />
          <G>
            <F label="Phone" value={c.phone} onChange={set("phone")} />
            <F label="Email" value={c.email} onChange={set("email")} />
            <F label="Website" value={c.website} onChange={set("website")} />
            <F label="GSTIN" value={c.gstin} onChange={set("gstin")} />
          </G>
          <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
            Logo (optional)
            <input
              type="file"
              accept="image/*"
              className="text-xs"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                const r = new FileReader();
                r.onload = () =>
                  upd((d) => {
                    d.company.logo = String(r.result);
                  });
                r.readAsDataURL(f);
              }}
            />
          </label>
          {c.logo && (
            <button
              type="button"
              className="text-xs text-destructive"
              onClick={() =>
                upd((d) => {
                  d.company.logo = undefined;
                })
              }
            >
              Remove logo
            </button>
          )}
        </div>
      );
    }
    case "meta":
      return (
        <div className="space-y-2">
          <G>
            <F
              label="Quotation No."
              value={q.meta.number}
              onChange={(v) =>
                upd((d) => {
                  d.meta.number = v;
                })
              }
            />
            <F
              label="Date"
              type="date"
              value={q.meta.date}
              onChange={(v) =>
                upd((d) => {
                  d.meta.date = v;
                })
              }
            />
            <F
              label="Validity (days)"
              type="number"
              value={q.meta.validityDays}
              onChange={(v) =>
                upd((d) => {
                  d.meta.validityDays = Number(v);
                })
              }
            />
            <F
              label="Reference"
              value={q.meta.reference}
              onChange={(v) =>
                upd((d) => {
                  d.meta.reference = v;
                })
              }
            />
          </G>
          <Fields
            list={q.meta.extra}
            onChange={(l) =>
              upd((d) => {
                d.meta.extra = l;
              })
            }
            add="Add custom field"
          />
        </div>
      );
    case "customer": {
      const c = q.customer;
      const set = (k: Exclude<keyof typeof c, "extra">) => (v: string) =>
        upd((d) => {
          d.customer[k] = v;
        });
      return (
        <div className="space-y-2">
          <F
            label="Society / Project name"
            value={c.society}
            onChange={set("society")}
          />
          <G>
            <F
              label="Contact person"
              value={c.contact}
              onChange={set("contact")}
            />
            <F label="Phone" value={c.phone} onChange={set("phone")} />
            <F label="Email" value={c.email} onChange={set("email")} />
            <F label="Customer GSTIN" value={c.gstin} onChange={set("gstin")} />
          </G>
          <F label="Site address" value={c.address} onChange={set("address")} />
          <Fields
            list={c.extra}
            onChange={(l) =>
              upd((d) => {
                d.customer.extra = l;
              })
            }
            add="Add custom field"
          />
        </div>
      );
    }
    case "specs":
      return (
        <Fields
          list={q.specs}
          onChange={(l) =>
            upd((d) => {
              d.specs = l;
            })
          }
          add="Add specification"
        />
      );
    case "items":
      return <ItemsEditor q={q} upd={upd} />;
    case "totals":
      return (
        <G>
          <F
            label="Discount %"
            type="number"
            value={q.discountPct}
            onChange={(v) =>
              upd((d) => {
                d.discountPct = Number(v);
              })
            }
          />
          <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
            GST
            <select
              value={q.taxMode}
              onChange={(e) =>
                upd((d) => {
                  d.taxMode = e.target.value as Quote["taxMode"];
                })
              }
              className={inputCls + " text-foreground"}
            >
              <option value="intra">CGST 9% + SGST 9% (same state)</option>
              <option value="inter">IGST 18% (other state)</option>
            </select>
          </label>
        </G>
      );
    case "payment": {
      const sum = q.milestones.reduce((a, m) => a + m.pct, 0);
      return (
        <div className="space-y-1.5">
          {q.milestones.map((m, i) => (
            <div key={m.id} className="flex gap-1.5">
              <input
                className={inputCls}
                value={m.label}
                onChange={(e) =>
                  upd((d) => {
                    d.milestones[i].label = e.target.value;
                  })
                }
              />
              <input
                type="number"
                className={inputCls + " w-16"}
                value={m.pct}
                onChange={(e) =>
                  upd((d) => {
                    d.milestones[i].pct = Number(e.target.value);
                  })
                }
              />
              <button
                type="button"
                onClick={() =>
                  upd((d) => {
                    d.milestones.splice(i, 1);
                  })
                }
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <AddBtn
              onClick={() =>
                upd((d) => {
                  d.milestones.push({
                    id: uid(),
                    label: "New milestone",
                    pct: 0,
                  });
                })
              }
            >
              Add milestone
            </AddBtn>
            <span
              className={cn(
                "text-xs font-semibold",
                sum === 100 ? "text-success" : "text-destructive",
              )}
            >
              Total {sum}%
            </span>
          </div>
        </div>
      );
    }
    case "terms":
      return (
        <TA
          label="One point per line"
          value={q.terms}
          onChange={(v) =>
            upd((d) => {
              d.terms = v;
            })
          }
          rows={7}
        />
      );
    case "exclusions":
      return (
        <TA
          label="One point per line"
          value={q.exclusions}
          onChange={(v) =>
            upd((d) => {
              d.exclusions = v;
            })
          }
        />
      );
    case "warranty":
      return (
        <TA
          label="Warranty text"
          value={q.warranty}
          onChange={(v) =>
            upd((d) => {
              d.warranty = v;
            })
          }
          rows={3}
        />
      );
    case "custom":
      return (
        <div className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
          Content
          <div className="react-quill-wrapper rounded-md border border-input bg-background overflow-hidden mt-1">
            <ClientOnlyQuill s={s} upd={upd} />
          </div>
        </div>
      );
    case "custom_table":
      return <CustomTableEditor s={s} q={q} upd={upd} />;
    case "bank": {
      const b = q.bank;
      const set = (k: keyof typeof b) => (v: string) =>
        upd((d) => {
          d.bank[k] = v;
        });
      return (
        <G>
          <F
            label="Account name"
            value={b.accountName}
            onChange={set("accountName")}
          />
          <F label="Bank" value={b.bank} onChange={set("bank")} />
          <F label="Account no." value={b.account} onChange={set("account")} />
          <F label="IFSC" value={b.ifsc} onChange={set("ifsc")} />
          <F label="Branch" value={b.branch} onChange={set("branch")} />
          <F label="UPI ID" value={b.upi} onChange={set("upi")} />
        </G>
      );
    }
    case "signature":
      return (
        <G>
          <F
            label="Signatory name"
            value={q.signatory.name}
            onChange={(v) =>
              upd((d) => {
                d.signatory.name = v;
              })
            }
          />
          <F
            label="Designation"
            value={q.signatory.designation}
            onChange={(v) =>
              upd((d) => {
                d.signatory.designation = v;
              })
            }
          />
        </G>
      );
    case "footer":
      return (
        <TA
          label="Footer text"
          value={q.footer}
          onChange={(v) =>
            upd((d) => {
              d.footer = v;
            })
          }
          rows={2}
        />
      );
  }
}

export function Editor({
  q,
  upd,
  activeId,
  onActiveChange,
  activeFieldId,
  onActiveFieldChange,
}: {
  q: Quote;
  upd: Upd;
  activeId: string | null;
  onActiveChange: (id: string | null) => void;
  activeFieldId?: string | null;
  onActiveFieldChange?: (id: string | null) => void;
}) {
  const [styling, setStyling] = useState<string | null>(null);
  const [addType, setAddType] = useState<SectionType>("custom");
  const move = (i: number, dir: -1 | 1) =>
    upd((d) => {
      const j = i + dir;
      if (j < 0 || j >= d.sections.length) return;
      [d.sections[i], d.sections[j]] = [d.sections[j], d.sections[i]];
    });

  return (
    <div className="space-y-3 p-4">
      <div className="rounded-lg border border-border bg-card p-3">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Document
        </div>
        <div className="space-y-2">
          <F
            label="Name"
            value={q.name}
            onChange={(v) =>
              upd((d) => {
                d.name = v;
              })
            }
          />
          <div className="flex flex-wrap items-end gap-3">
            {(["primary", "accent", "text"] as const).map((k) => (
              <label
                key={k}
                className="flex items-center gap-1.5 text-xs capitalize text-muted-foreground"
              >
                <input
                  type="color"
                  value={q.theme[k]}
                  onChange={(e) =>
                    upd((d) => {
                      d.theme[k] = e.target.value;
                    })
                  }
                  className="h-7 w-8 cursor-pointer rounded border border-input p-0"
                />
                {k}
              </label>
            ))}
            <label className="flex flex-col gap-1 text-xs text-muted-foreground">
              Font
              <select
                value={q.theme.font}
                onChange={(e) =>
                  upd((d) => {
                    d.theme.font = e.target.value;
                  })
                }
                className="h-7 rounded border border-input bg-background text-xs text-foreground"
              >
                <option value="'IBM Plex Sans', sans-serif">
                  IBM Plex Sans
                </option>
                <option value="'Source Serif 4', Georgia, serif">
                  Source Serif
                </option>
                <option value="Arial, Helvetica, sans-serif">Arial</option>
                <option value="'Times New Roman', serif">Times</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs text-muted-foreground">
              Base size
              <input
                type="number"
                min={8}
                max={16}
                value={q.theme.baseSize}
                onChange={(e) =>
                  upd((d) => {
                    d.theme.baseSize = Number(e.target.value);
                  })
                }
                className="h-7 w-14 rounded border border-input bg-background px-1 text-xs text-foreground"
              />
            </label>
            {q.kind === "quotation" && (
              <label className="flex flex-col gap-1 text-xs text-muted-foreground">
                Status
                <select
                  value={q.status}
                  onChange={(e) =>
                    upd((d) => {
                      d.status = e.target.value as Quote["status"];
                    })
                  }
                  className="h-7 rounded border border-input bg-background text-xs text-foreground"
                >
                  {["Draft", "Sent", "Accepted", "Rejected"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {activeFieldId && activeId
          ? "Edit Section & Field"
          : activeFieldId
            ? "Edit Field"
            : activeId
              ? "Edit Section"
              : "Sections"}
      </div>

      <div className="space-y-4">
        {activeId &&
          q.sections
            .filter((s) => s.id === activeId)
            .map((s, i) => (
              <div
                key={s.id}
                id={`sidebar-section-${s.id}`}
                className="rounded-lg border border-primary/50 bg-card shadow-sm ring-1 ring-primary/20"
              >
                <div className="flex items-center gap-1 px-3 py-2 border-b border-border">
                  <span className="flex-1 truncate text-left text-sm font-semibold">
                    {s.title}{" "}
                    <span className="ml-1 text-[10px] font-normal uppercase text-muted-foreground">
                      {sectionLabels[s.type]}
                    </span>
                  </span>
                  <button
                    type="button"
                    title="Move Up"
                    onClick={() =>
                      move(
                        q.sections.findIndex((x) => x.id === s.id),
                        -1,
                      )
                    }
                    className="md:hidden flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium transition-colors hover:bg-accent active:bg-accent"
                  >
                    <ChevronUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    title="Move Down"
                    onClick={() =>
                      move(
                        q.sections.findIndex((x) => x.id === s.id),
                        1,
                      )
                    }
                    className="md:hidden flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium transition-colors hover:bg-accent active:bg-accent"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    title="Style"
                    onClick={() => setStyling(styling === s.id ? null : s.id)}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium transition-colors hover:bg-accent active:bg-accent",
                      styling === s.id &&
                        "bg-primary/10 text-primary border-primary/30",
                    )}
                  >
                    <Paintbrush className="h-3.5 w-3.5" />
                  </button>
                </div>

                {styling === s.id && (
                  <div className="p-3 border-b border-border">
                    <StyleEditor
                      value={s.style}
                      onChange={(st) =>
                        upd((d) => {
                          const si = d.sections.findIndex((x) => x.id === s.id);
                          if (si >= 0) d.sections[si].style = st;
                        })
                      }
                    />
                  </div>
                )}

                <div className="space-y-3 p-3">
                  {s.type !== "header" && s.type !== "footer" && (
                    <F
                      label="Section title"
                      value={s.title}
                      onChange={(v) =>
                        upd((d) => {
                          const si = d.sections.findIndex((x) => x.id === s.id);
                          if (si >= 0) d.sections[si].title = v;
                        })
                      }
                    />
                  )}
                  <SectionBody s={s} q={q} upd={upd} />
                </div>
              </div>
            ))}

        {activeFieldId && (
          <div className="rounded-lg border border-primary/50 bg-card shadow-sm ring-1 ring-primary/20">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
              <span className="flex-1 truncate text-left text-sm font-semibold">
                Field Styling
              </span>
              {onActiveFieldChange && (
                <button
                  type="button"
                  title="Close field styling"
                  onClick={() => onActiveFieldChange(null)}
                  className="rounded-md border p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              )}
            </div>
            <div className="p-3">
              <StyleEditor
                value={q.fieldStyles?.[activeFieldId] || {}}
                onChange={(st) =>
                  upd((d) => {
                    if (!d.fieldStyles) d.fieldStyles = {};
                    d.fieldStyles[activeFieldId] = st;
                  })
                }
              />
            </div>
          </div>
        )}

        {!activeId && !activeFieldId && (
          <div className="text-sm text-muted-foreground text-center py-8 border-2 border-dashed border-border rounded-lg">
            Click on any section or text field in the preview to edit its
            details and styles here.
          </div>
        )}
      </div>
      <div className="flex gap-2 rounded-lg border border-dashed border-border p-2">
        <select
          value={addType}
          onChange={(e) => setAddType(e.target.value as SectionType)}
          className={inputCls}
        >
          {(Object.keys(sectionLabels) as SectionType[]).map((t) => (
            <option key={t} value={t}>
              {sectionLabels[t]}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => {
            const ns = blankSection(addType);
            upd((d) => {
              d.sections.splice(d.sections.length - 1, 0, ns);
            });
            onActiveChange(ns.id);
          }}
          className="inline-flex shrink-0 items-center gap-1 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add section
        </button>
      </div>
    </div>
  );
}
