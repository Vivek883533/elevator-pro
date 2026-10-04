import type { Quote, Section } from "@/lib/quote/types";
import {
  amountInWords,
  boxCss,
  calc,
  fmtDate,
  inr,
  num,
} from "@/lib/quote/utils";
import { useState, type CSSProperties, type ReactNode } from "react";
import { layouts } from "./QuoteLayouts";

export function QuoteSheet({
  q,
  activeId,
  onActiveChange,
  onReorder,
  zoom = 1,
  onFieldOffsetChange,
  onSectionAction,
  activeFieldId,
  onActiveFieldChange,
  onFieldTextChange,
  onFieldAction,
}: {
  q: Quote;
  activeId?: string | null;
  onActiveChange?: (id: string | null) => void;
  onReorder?: (draggedId: string, targetId: string) => void;
  zoom?: number;
  onFieldOffsetChange?: (id: string, x: number, y: number) => void;
  onSectionAction?: (
    id: string,
    action: "up" | "down" | "style" | "toggle" | "delete" | "edit",
  ) => void;
  activeFieldId?: string | null;
  onActiveFieldChange?: (id: string | null, sectionId?: string | null) => void;
  onFieldTextChange?: (path: string, v: string) => void;
  onFieldAction?: (id: string, action: "style" | "toggle" | "reset") => void;
}) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const t = calc(q);
  const P = q.theme.primary,
    A = q.theme.accent;
  // Pick the active layout — default to "classic" if not set
  const layout = layouts[q.layout ?? "classic"] ?? layouts["classic"];
  const H = ({ s }: { s: Section }) => (
    <div
      style={{
        color: P,
        borderBottom: `2px solid ${A}`,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: ".06em",
        fontSize: "0.95em",
        paddingBottom: 3,
        marginBottom: 6,
      }}
    >
      {s.title}
    </div>
  );
  const lines = (s: string) => s.split("\n").filter(Boolean);
  const cell: CSSProperties = {
    border: "1px solid #cbd5e1",
    padding: "5px 6px",
    verticalAlign: "top",
  };
  const KV = ({ k, v }: { k: string; v: ReactNode }) => (
    <div style={{ display: "flex", gap: 6 }}>
      <span style={{ color: "#64748b", minWidth: 92 }}>{k}</span>
      <span style={{ fontWeight: 500 }}>{v}</span>
    </div>
  );

  const FieldMover = ({
    id,
    children,
    block,
    value,
    onChangePath,
  }: {
    id: string;
    children: ReactNode;
    block?: boolean;
    value?: string;
    onChangePath?: string;
  }) => {
    const off = q.offsets?.[id] || { x: 0, y: 0 };
    const isActive = activeFieldId === id;
    const isHidden = q.hiddenFields?.includes(id);
    const fStyle = q.fieldStyles?.[id] || {};

    if (isHidden) return null;

    const startDrag = (e: React.PointerEvent) => {
      if (!onFieldOffsetChange) return;
      const startX = e.clientX;
      const startY = e.clientY;
      const startOffX = off.x;
      const startOffY = off.y;
      const target = e.currentTarget;
      target.setPointerCapture(e.pointerId);

      const onMove = (ev: PointerEvent) => {
        onFieldOffsetChange(
          id,
          startOffX + (ev.clientX - startX) / zoom,
          startOffY + (ev.clientY - startY) / zoom,
        );
      };
      const onUp = (ev: PointerEvent) => {
        target.releasePointerCapture(ev.pointerId);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    };

    return (
      <div
        onPointerDown={(e) => {
          if (!onFieldOffsetChange) return;

          // Smart mobile scrolling: if it's a touch screen and the field isn't active yet,
          // just select it and let the browser handle scrolling.
          // They can drag it on the second touch when it's active.
          if (e.pointerType === "touch" && !isActive) {
            const parentSection = (e.currentTarget as HTMLElement).closest(
              "[data-section-id]",
            );
            const sId = parentSection?.getAttribute("data-section-id");
            onActiveFieldChange?.(id, sId);
            return;
          }

          e.stopPropagation();
          // Smart parent selection: if we click a field, also silently activate its parent section
          // so if the user clicks "Back" in the sidebar, they land in the section editor!
          const parentSection = (e.currentTarget as HTMLElement).closest(
            "[data-section-id]",
          );
          const sId = parentSection?.getAttribute("data-section-id");
          onActiveFieldChange?.(id, sId);

          startDrag(e);
        }}
        onClick={(e) => e.stopPropagation()}
        onDragStart={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        draggable
        className="field-mover-wrapper"
        style={{
          transform: `translate(${off.x}px, ${off.y}px)`,
          cursor: onFieldOffsetChange ? "move" : "inherit",
          display: block ? "block" : "inline-block",
          outline: isActive ? `2px dashed ${P}` : "none",
          outlineOffset: 2,
          position: "relative",
          zIndex: isActive ? 30 : 1,
          opacity: isHidden ? 0.3 : 1,
          touchAction: isActive ? "none" : "auto",
          ...boxCss(fStyle),
        }}
      >
        {isActive && onFieldAction && (
          <div
            className="absolute -top-10 sm:-top-7 right-0 flex bg-card border border-border rounded shadow-sm text-xs sm:text-[10px] overflow-hidden no-print z-50 field-toolbar"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            style={{ color: "black", fontFamily: "sans-serif" }}
          >
            <div
              className="p-2 sm:p-1 cursor-move hover:bg-accent text-muted-foreground flex items-center justify-center"
              title="Move"
              onPointerDown={(e) => {
                e.stopPropagation();
                startDrag(e);
              }}
            >
              <svg
                className="w-5 h-5 sm:w-3.5 sm:h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="5 9 2 12 5 15" />
                <polyline points="9 5 12 2 15 5" />
                <polyline points="19 9 22 12 19 15" />
                <polyline points="9 19 12 22 15 19" />
                <line x1="2" x2="22" y1="12" y2="12" />
                <line x1="12" x2="12" y1="2" y2="22" />
              </svg>
            </div>
            <div className="w-px h-6 sm:h-4 bg-border mx-0.5 mt-1.5 sm:mt-1" />
            <button
              title="Reset styles and position"
              className="p-2 sm:p-1 hover:bg-accent"
              onClick={() => onFieldAction(id, "reset")}
            >
              <svg
                className="w-5 h-5 sm:w-3.5 sm:h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
            <div className="w-px h-6 sm:h-4 bg-border mx-0.5 mt-1.5 sm:mt-1" />
            <button
              title="Style"
              className="p-2 sm:p-1 hover:bg-accent"
              onClick={() => onFieldAction(id, "style")}
            >
              <svg
                className="w-5 h-5 sm:w-3.5 sm:h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z" />
                <path d="M13 8l3 3" />
              </svg>
            </button>
            <button
              title={isHidden ? "Show" : "Hide"}
              className="p-2 sm:p-1 hover:bg-accent"
              onClick={() => onFieldAction(id, "toggle")}
            >
              {isHidden ? (
                <svg
                  className="w-5 h-5 sm:w-3.5 sm:h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 sm:w-3.5 sm:h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" x2="22" y1="2" y2="22" />
                </svg>
              )}
            </button>
            <div className="w-px h-6 sm:h-4 bg-border mx-0.5 mt-1.5 sm:mt-1" />
            <button
              title="Delete"
              className="p-2 sm:p-1 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
              onClick={(e) => {
                if (onChangePath && onFieldTextChange) {
                  const ce = e.currentTarget
                    .closest(".field-mover-wrapper")
                    ?.querySelector("[contenteditable]") as HTMLElement;
                  if (ce) {
                    ce.blur();
                    ce.innerText = "";
                  }
                  onFieldTextChange(onChangePath, "");
                } else {
                  onFieldAction(id, "toggle");
                }
              }}
            >
              <svg
                className="w-5 h-5 sm:w-3.5 sm:h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
          </div>
        )}
        <div
          contentEditable={isActive && !!onChangePath && !!onFieldTextChange}
          suppressContentEditableWarning
          onBlur={(e) => {
            if (onChangePath && onFieldTextChange)
              onFieldTextChange(onChangePath, e.currentTarget.innerText);
          }}
          style={{
            outline: "none",
            cursor: isActive && onChangePath ? "text" : "inherit",
          }}
        >
          {children}
        </div>
      </div>
    );
  };

  const render = (s: Section): ReactNode => {
    // Build a thin FM adapter so layout renderers can use FieldMover
    const FM = ({
      id,
      children,
      block,
      onChangePath,
    }: {
      id: string;
      children: ReactNode;
      block?: boolean;
      onChangePath?: string;
    }) => (
      <FieldMover
        id={id}
        block={block === true}
        {...(onChangePath !== undefined ? { onChangePath } : {})}
      >
        {children}
      </FieldMover>
    );
    const lp = { q, FM };
    // EKV: static label + inline-editable value only
    const EKV = ({
      k,
      id,
      path,
      v,
    }: {
      k: string;
      id: string;
      path?: string;
      v: ReactNode;
    }) => (
      <div style={{ display: "flex", gap: 6 }}>
        <span style={{ color: "#64748b", minWidth: 92, flexShrink: 0 }}>
          {k}
        </span>
        {path ? (
          <FieldMover id={id} {...{ onChangePath: path }}>
            <span style={{ fontWeight: 500 }}>{v}</span>
          </FieldMover>
        ) : (
          <span style={{ fontWeight: 500 }}>{v}</span>
        )}
      </div>
    );

    switch (s.type) {
      case "header":
        return layout.renderHeader(lp);
      case "items":
        return (
          <div>
            <FM id={`${s.id}.header`} block>
              <H s={s} />
            </FM>
            {layout.renderItems(lp)}
          </div>
        );
      case "signature":
        return layout.renderSignature(lp);
      case "terms":
        return (
          <div>
            <FM id={`${s.id}.header`} block>
              <H s={s} />
            </FM>
            {/* Single editable block — innerText on blur gives lines joined by \n */}
            <FM id={`${s.id}.body`} block onChangePath="terms">
              <ol
                style={{
                  paddingLeft: 18,
                  margin: 0,
                  listStyle: "decimal",
                  fontSize: "0.92em",
                  lineHeight: 1.6,
                }}
              >
                {q.terms
                  .split("\n")
                  .filter(Boolean)
                  .map((l, i) => (
                    <li key={i} style={{ marginBottom: 2 }}>
                      {l}
                    </li>
                  ))}
              </ol>
            </FM>
          </div>
        );
      case "exclusions":
        return (
          <div>
            <FM id={`${s.id}.header`} block>
              <H s={s} />
            </FM>
            <FM id={`${s.id}.body`} block onChangePath="exclusions">
              <ol
                style={{
                  paddingLeft: 18,
                  margin: 0,
                  listStyle: "decimal",
                  fontSize: "0.92em",
                  lineHeight: 1.6,
                }}
              >
                {q.exclusions
                  .split("\n")
                  .filter(Boolean)
                  .map((l, i) => (
                    <li key={i} style={{ marginBottom: 2 }}>
                      {l}
                    </li>
                  ))}
              </ol>
            </FM>
          </div>
        );
      case "meta":
        return (
          <div>
            <FieldMover id={`${s.id}.title`} block onChangePath="meta.number">
              <div
                style={{
                  textAlign: "center",
                  fontSize: "1.5em",
                  fontWeight: 800,
                  letterSpacing: ".2em",
                  color: P,
                  marginBottom: 6,
                }}
              >
                {s.title.toUpperCase()}
              </div>
            </FieldMover>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4px 20px",
              }}
            >
              <EKV
                k="Quotation No."
                id="meta.number"
                path="meta.number"
                v={q.meta.number}
              />
              <EKV k="Date" id="meta.date" v={fmtDate(q.meta.date)} />
              {!!q.meta.validityDays && (
                <EKV
                  k="Valid For"
                  id="meta.validity"
                  path="meta.validityDays"
                  v={`${q.meta.validityDays} days`}
                />
              )}
              {q.meta.reference && (
                <EKV
                  k="Reference"
                  id="meta.ref"
                  path="meta.reference"
                  v={q.meta.reference}
                />
              )}
              {q.meta.extra.map((f, i) => (
                <EKV
                  key={f.id}
                  k={f.label}
                  id={`meta.ext.${f.id}`}
                  path={`meta.extra.${i}.value`}
                  v={f.value}
                />
              ))}
            </div>
          </div>
        );
      case "customer":
        return (
          <div>
            <FieldMover id={`${s.id}.header`} block>
              <H s={s} />
            </FieldMover>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4px 20px",
              }}
            >
              <EKV
                k="Society / Project"
                id="cust.society"
                path="customer.society"
                v={<b>{q.customer.society || "—"}</b>}
              />
              <EKV
                k="Contact Person"
                id="cust.contact"
                path="customer.contact"
                v={q.customer.contact}
              />
              <EKV
                k="Site Address"
                id="cust.address"
                path="customer.address"
                v={q.customer.address}
              />
              <EKV
                k="Phone"
                id="cust.phone"
                path="customer.phone"
                v={q.customer.phone}
              />
              <EKV
                k="Email"
                id="cust.email"
                path="customer.email"
                v={q.customer.email}
              />
              {q.customer.gstin && (
                <EKV
                  k="Customer GSTIN"
                  id="cust.gstin"
                  path="customer.gstin"
                  v={q.customer.gstin}
                />
              )}
              {q.customer.extra.map((f, i) => (
                <EKV
                  key={f.id}
                  k={f.label}
                  id={`cust.ext.${f.id}`}
                  path={`customer.extra.${i}.value`}
                  v={f.value}
                />
              ))}
            </div>
          </div>
        );
      case "specs":
        return (
          <div>
            <FieldMover id={`${s.id}.header`} block>
              <H s={s} />
            </FieldMover>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {Array.from({ length: Math.ceil(q.specs.length / 2) }).map(
                  (_, r) => (
                    <tr key={r}>
                      {[0, 1].map((c) => {
                        const idx = r * 2 + c;
                        const f = q.specs[idx];
                        return f ? (
                          [
                            <td
                              key={"l" + c}
                              style={{
                                ...cell,
                                background: "#f1f5f9",
                                fontWeight: 600,
                                width: "20%",
                              }}
                            >
                              <FieldMover
                                id={`spec.l.${f.id}`}
                                onChangePath={`specs.${idx}.label`}
                              >
                                {f.label}
                              </FieldMover>
                            </td>,
                            <td key={"v" + c} style={{ ...cell, width: "30%" }}>
                              <FieldMover
                                id={`spec.v.${f.id}`}
                                onChangePath={`specs.${idx}.value`}
                              >
                                {f.value}
                              </FieldMover>
                            </td>,
                          ]
                        ) : (
                          <td key={c} colSpan={2} style={cell} />
                        );
                      })}
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        );
      case "totals": {
        const row = (k: string, v: number, strong = false, id: string) => (
          <FieldMover id={id} block>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "3px 8px",
                ...(strong
                  ? {
                      background: P,
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: "1.15em",
                      padding: "6px 8px",
                    }
                  : {}),
              }}
            >
              <span>{k}</span>
              <span>{inr(v)}</span>
            </div>
          </FieldMover>
        );
        return (
          <div style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
            <div style={{ flex: 1, fontSize: "0.95em" }}>
              <FieldMover id="totals.words.label" block>
                <div style={{ color: "#64748b" }}>Amount in words</div>
              </FieldMover>
              <FieldMover id="totals.words.value" block>
                <div style={{ fontWeight: 700, fontStyle: "italic" }}>
                  {amountInWords(t.total)}
                </div>
              </FieldMover>
            </div>
            <div style={{ width: 280, border: "1px solid #cbd5e1" }}>
              {row("Subtotal", t.subtotal, false, "totals.sub")}
              {q.discountPct > 0 &&
                row(
                  `Discount (${q.discountPct}%)`,
                  -t.discount,
                  false,
                  "totals.disc",
                )}
              {q.discountPct > 0 &&
                row("Taxable Value", t.taxable, false, "totals.taxable")}
              {q.taxMode === "intra" ? (
                <>
                  {row("CGST @ 9%", t.cgst, false, "totals.cgst")}
                  {row("SGST @ 9%", t.sgst, false, "totals.sgst")}
                </>
              ) : (
                row("IGST @ 18%", t.igst, false, "totals.igst")
              )}
              {row("Grand Total", t.total, true, "totals.grand")}
            </div>
          </div>
        );
      }
      case "payment":
        return (
          <div>
            <FieldMover id={`${s.id}.header`} block>
              <H s={s} />
            </FieldMover>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {q.milestones.map((m, i) => (
                  <tr key={m.id}>
                    <td style={{ ...cell, width: 28, textAlign: "center" }}>
                      {i + 1}
                    </td>
                    <td style={cell}>
                      <FieldMover
                        id={`ms.l.${m.id}`}
                        onChangePath={`milestones.${i}.label`}
                      >
                        {m.label}
                      </FieldMover>
                    </td>
                    <td
                      style={{
                        ...cell,
                        width: 50,
                        textAlign: "center",
                        fontWeight: 700,
                      }}
                    >
                      <FieldMover
                        id={`ms.p.${m.id}`}
                        onChangePath={`milestones.${i}.pct`}
                      >
                        {m.pct}%
                      </FieldMover>
                    </td>
                    <td style={{ ...cell, width: 110, textAlign: "right" }}>
                      <FieldMover id={`ms.v.${m.id}`}>
                        {inr((t.total * m.pct) / 100)}
                      </FieldMover>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "warranty":
        return (
          <div>
            <FieldMover id={`${s.id}.header`} block>
              <H s={s} />
            </FieldMover>
            <FieldMover id={`${s.id}.content`} block onChangePath="warranty">
              <div style={{ whiteSpace: "pre-wrap" }}>{q.warranty}</div>
            </FieldMover>
          </div>
        );
      case "custom":
        return (
          <div>
            <FieldMover id={`${s.id}.header`} block>
              <H s={s} />
            </FieldMover>
            <FieldMover id={`${s.id}.content`} block>
              <div
                dangerouslySetInnerHTML={{ __html: s.content ?? "" }}
                className="prose prose-sm max-w-none prose-p:my-1 prose-table:my-2 prose-td:border prose-td:p-1 prose-th:border prose-th:p-1 prose-th:bg-muted"
              />
            </FieldMover>
          </div>
        );
      case "custom_table":
        return (
          <div>
            <FieldMover id={`${s.id}.header`} block>
              <H s={s} />
            </FieldMover>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: 4,
              }}
            >
              <thead>
                <tr>
                  {s.columns?.map((c) => (
                    <th
                      key={c.id}
                      style={{
                        ...cell,
                        background: P,
                        color: "#fff",
                        textAlign: c.align,
                      }}
                    >
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {s.items?.map((it, i) => (
                  <tr
                    key={it.id}
                    style={{ background: i % 2 ? "#f8fafc" : undefined }}
                  >
                    {s.columns?.map((c) => {
                      const st = q.cellStyles[`${it.id}:${c.id}`] || {};
                      return (
                        <td
                          key={c.id}
                          style={{ ...cell, ...boxCss(st), textAlign: c.align }}
                        >
                          {it.cells[c.id]}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "bank":
        return (
          <div>
            <FieldMover id={`${s.id}.header`} block>
              <H s={s} />
            </FieldMover>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4px 20px",
              }}
            >
              <EKV
                k="Account Name"
                id="bank.name"
                path="bank.accountName"
                v={q.bank.accountName}
              />
              <EKV k="Bank" id="bank.bank" path="bank.bank" v={q.bank.bank} />
              <EKV
                k="Account No."
                id="bank.acc"
                path="bank.account"
                v={q.bank.account}
              />
              <EKV k="IFSC" id="bank.ifsc" path="bank.ifsc" v={q.bank.ifsc} />
              <EKV
                k="Branch"
                id="bank.branch"
                path="bank.branch"
                v={q.bank.branch}
              />
              <EKV k="UPI" id="bank.upi" path="bank.upi" v={q.bank.upi} />
            </div>
            <FieldMover id="bank.note" block>
              <div
                style={{ fontSize: "0.85em", color: "#64748b", marginTop: 3 }}
              >
                Payments accepted via NEFT / RTGS / IMPS / UPI.
              </div>
            </FieldMover>
          </div>
        );
      case "footer":
        return (
          <FieldMover id="footer.text" block onChangePath="footer">
            <div
              style={{
                borderTop: `3px solid ${P}`,
                paddingTop: 6,
                textAlign: "center",
                fontSize: "0.85em",
                color: "#64748b",
              }}
            >
              {q.footer}
            </div>
          </FieldMover>
        );
    }
  };

  return (
    <div
      className="quote-sheet"
      style={{
        width: "210mm",
        minHeight: "297mm",
        background: "#fff",
        color: q.theme.text,
        fontFamily: q.theme.font,
        fontSize: q.theme.baseSize,
        padding: "12mm",
        boxSizing: "border-box",
        lineHeight: 1.45,
      }}
    >
      {q.sections
        .filter((s) => s.visible || !!onActiveChange)
        .map((s) => (
          <div
            key={s.id}
            data-section-id={s.id}
            draggable={!!onReorder}
            onDragStart={(e) => {
              if (!onReorder) return;
              setDraggedId(s.id);
              e.dataTransfer.effectAllowed = "move";
            }}
            onDragOver={(e) => {
              if (!onReorder || !draggedId || draggedId === s.id) return;
              e.preventDefault();
              setDragOverId(s.id);
            }}
            onDragLeave={() => setDragOverId(null)}
            onDrop={(e) => {
              if (!onReorder || !draggedId || draggedId === s.id) return;
              e.preventDefault();
              onReorder(draggedId, s.id);
              setDraggedId(null);
              setDragOverId(null);
            }}
            onDragEnd={() => {
              setDraggedId(null);
              setDragOverId(null);
            }}
            onClick={
              onActiveChange
                ? (e) => {
                    e.stopPropagation();
                    onActiveChange(s.id);
                  }
                : undefined
            }
            onMouseOver={
              onActiveChange && activeId !== s.id
                ? (e) => {
                    e.currentTarget.style.outline = `2px dashed ${q.theme.primary}50`;
                    e.currentTarget.style.outlineOffset = "4px";
                  }
                : undefined
            }
            onMouseOut={
              onActiveChange && activeId !== s.id
                ? (e) => {
                    e.currentTarget.style.outline = "none";
                  }
                : undefined
            }
            style={{
              marginTop: 12,
              opacity: s.visible ? 1 : 0.4,
              ...boxCss(s.style),
              ...(onActiveChange
                ? {
                    cursor: draggedId ? "grabbing" : "grab",
                    transition: "outline 0.15s ease",
                  }
                : {}),
              ...(dragOverId === s.id
                ? { borderTop: `4px solid ${q.theme.primary}`, paddingTop: 8 }
                : {}),
              ...(draggedId === s.id ? { opacity: 0.2 } : {}),
              ...(activeId === s.id
                ? {
                    outline: `2px dashed ${q.theme.primary}`,
                    outlineOffset: 4,
                    zIndex: 10,
                    position: "relative",
                  }
                : {}),
            }}
          >
            {onSectionAction && activeId === s.id && (
              <div
                className="absolute left-0 sm:-left-2 -top-10 flex items-center gap-1 rounded-md border border-border bg-card p-1 shadow-md z-40"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  title="Edit content"
                  onClick={() => onSectionAction(s.id, "edit")}
                  className="rounded p-1 text-card-foreground hover:bg-accent md:hidden"
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
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </button>
                <div className="mx-1 h-4 w-px bg-border md:hidden" />
                <button
                  type="button"
                  title="Move up"
                  onClick={() => onSectionAction(s.id, "up")}
                  className="rounded p-1 text-card-foreground hover:bg-accent"
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
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  title="Move down"
                  onClick={() => onSectionAction(s.id, "down")}
                  className="rounded p-1 text-card-foreground hover:bg-accent"
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
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div className="mx-1 h-4 w-px bg-border" />
                <button
                  type="button"
                  title="Style"
                  onClick={() => onSectionAction(s.id, "style")}
                  className="rounded p-1 text-card-foreground hover:bg-accent"
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
                    <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z" />
                    <path d="M13 8l3 3" />
                  </svg>
                </button>
                <button
                  type="button"
                  title={s.visible ? "Hide" : "Show"}
                  onClick={() => onSectionAction(s.id, "toggle")}
                  className="rounded p-1 text-card-foreground hover:bg-accent"
                >
                  {s.visible ? (
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
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
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
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                      <line x1="2" x2="22" y1="2" y2="22" />
                    </svg>
                  )}
                </button>
                <div className="mx-1 h-4 w-px bg-border" />
                <button
                  type="button"
                  title="Remove"
                  onClick={() => onSectionAction(s.id, "delete")}
                  className="rounded p-1 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
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
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>
              </div>
            )}
            {render(s)}
          </div>
        ))}
    </div>
  );
}
