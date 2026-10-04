/**
 * QuoteLayouts.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Six completely different visual renderers for the header, items table,
 * notes/terms area, and signature block.
 *
 * Each layout exports four named render functions:
 *   renderHeader, renderItems, renderNotes, renderSignature
 *
 * These are consumed by QuoteSheet.tsx via a dispatch map.
 */

import type { CSSProperties, ReactNode } from "react";
import type { Quote } from "@/lib/quote/types";
import { amountInWords, calc, fmtDate, inr, num } from "@/lib/quote/utils";

// ─── shared helpers ───────────────────────────────────────────────────────────

export interface LayoutProps {
  q: Quote;
  FM: (props: {
    id: string;
    children: ReactNode;
    block?: boolean;
    onChangePath?: string;
  }) => ReactNode;
}

const cell: CSSProperties = {
  border: "1px solid #cbd5e1",
  padding: "5px 7px",
  verticalAlign: "top",
};

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT 1 — "classic"
// Corporate: logo left + contact right, solid-color table header
// ─────────────────────────────────────────────────────────────────────────────
export const classicLayout = {
  renderHeader({ q, FM }: LayoutProps) {
    const P = q.theme.primary,
      A = q.theme.accent;
    return (
      <div style={{ borderBottom: `4px solid ${P}`, paddingBottom: 10 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <FM id="header.logo">
              {q.company.logo ? (
                <img
                  src={q.company.logo}
                  alt="logo"
                  style={{ height: 56, maxWidth: 120, objectFit: "contain" }}
                />
              ) : (
                <div
                  style={{
                    width: 54,
                    height: 54,
                    background: P,
                    color: "#fff",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 800,
                    fontSize: 22,
                    borderRadius: 6,
                    borderBottom: `4px solid ${A}`,
                  }}
                >
                  AE
                </div>
              )}
            </FM>
            <div>
              <FM id="header.companyName" block onChangePath="company.name">
                <div
                  style={{
                    fontSize: "1.9em",
                    fontWeight: 800,
                    color: P,
                    lineHeight: 1.1,
                  }}
                >
                  {q.company.name}
                </div>
              </FM>
              <FM id="header.tagline" block onChangePath="company.tagline">
                <div style={{ color: A, fontWeight: 600, fontSize: "0.9em" }}>
                  {q.company.tagline}
                </div>
              </FM>
            </div>
          </div>
          <div
            style={{ textAlign: "right", fontSize: "0.85em", lineHeight: 1.6 }}
          >
            <FM id="header.address" block onChangePath="company.address">
              <div style={{ maxWidth: 230 }}>{q.company.address}</div>
            </FM>
            <FM id="header.contact" block>
              <div>
                {[q.company.phone, q.company.email].filter(Boolean).join(" · ")}
              </div>
            </FM>
            {q.company.website && (
              <FM id="header.website" block onChangePath="company.website">
                <div>{q.company.website}</div>
              </FM>
            )}
            {q.company.gstin && (
              <FM id="header.gstin" block>
                <div style={{ fontWeight: 700 }}>GSTIN: {q.company.gstin}</div>
              </FM>
            )}
          </div>
        </div>
      </div>
    );
  },

  renderItems({ q, FM }: LayoutProps) {
    const t = calc(q);
    const P = q.theme.primary;
    return (
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ ...cell, background: P, color: "#fff", width: 28 }}>
              #
            </th>
            {q.columns.map((c) => (
              <th
                key={c.id}
                style={{
                  ...cell,
                  background: P,
                  color: "#fff",
                  textAlign: c.align,
                  width: c.width,
                }}
              >
                <FM id={`col.${c.id}`}>{c.label}</FM>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {q.items.map((it, i) => (
            <tr
              key={it.id}
              style={{ background: i % 2 ? "#f8fafc" : undefined }}
            >
              <td style={{ ...cell, textAlign: "center" }}>{i + 1}</td>
              {q.columns.map((c) => {
                const isAmt = c.id === "amount";
                const isRate = c.id === "rate";
                const v = isAmt
                  ? inr(t.lines[i]!)
                  : isRate
                    ? inr(num(it.cells["rate"]))
                    : (it.cells[c.id] ?? "");
                return (
                  <td key={c.id} style={{ ...cell, textAlign: c.align }}>
                    <FM
                      id={`cell.${it.id}.${c.id}`}
                      {...(!isAmt
                        ? { onChangePath: `items.${i}.cells.${c.id}` }
                        : {})}
                    >
                      {v}
                    </FM>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },

  renderNotes({ q, FM }: LayoutProps) {
    const P = q.theme.primary;
    const lines = (s: string) => s.split("\n").filter(Boolean);
    return (
      <div style={{ fontSize: "0.92em", lineHeight: 1.6 }}>
        {q.terms && (
          <div style={{ marginBottom: 8 }}>
            <div
              style={{
                fontWeight: 700,
                color: P,
                marginBottom: 3,
                textTransform: "uppercase",
                letterSpacing: ".05em",
                fontSize: "0.9em",
              }}
            >
              Terms &amp; Conditions
            </div>
            <ol style={{ paddingLeft: 18, margin: 0 }}>
              {lines(q.terms).map((l, i) => (
                <li key={i} style={{ marginBottom: 2 }}>
                  {l}
                </li>
              ))}
            </ol>
          </div>
        )}
        {q.warranty && (
          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 4,
              padding: "6px 10px",
              marginBottom: 8,
            }}
          >
            <span style={{ fontWeight: 700 }}>Warranty: </span>
            {q.warranty}
          </div>
        )}
        {q.exclusions && (
          <div>
            <div
              style={{
                fontWeight: 700,
                color: P,
                marginBottom: 3,
                textTransform: "uppercase",
                letterSpacing: ".05em",
                fontSize: "0.9em",
              }}
            >
              Exclusions
            </div>
            <ol style={{ paddingLeft: 18, margin: 0 }}>
              {lines(q.exclusions).map((l, i) => (
                <li key={i} style={{ marginBottom: 2 }}>
                  {l}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  },

  renderSignature({ q, FM }: LayoutProps) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginTop: 8,
        }}
      >
        <FM id="sig.cust" block>
          <div>
            <div style={{ height: 50 }} />
            <div
              style={{
                borderTop: "1px solid #94a3b8",
                paddingTop: 3,
                width: 180,
              }}
            >
              Customer Acceptance
            </div>
          </div>
        </FM>
        <div style={{ textAlign: "center" }}>
          <FM id="sig.for" block>
            <div>
              For <b>{q.company.name}</b>
            </div>
          </FM>
          <div style={{ height: 64 }} />
          <FM id="sig.name" block onChangePath="signatory.name">
            <div
              style={{
                borderTop: "1px solid #94a3b8",
                paddingTop: 3,
                minWidth: 180,
                fontWeight: 700,
              }}
            >
              {q.signatory.name}
            </div>
          </FM>
          <FM id="sig.desig" block onChangePath="signatory.designation">
            <div>{q.signatory.designation}</div>
          </FM>
        </div>
      </div>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT 2 — "bold-banner"
// Full-width colored banner across the top, white text, large company name
// ─────────────────────────────────────────────────────────────────────────────
export const boldBannerLayout = {
  renderHeader({ q, FM }: LayoutProps) {
    const P = q.theme.primary,
      A = q.theme.accent;
    return (
      <div>
        {/* Full-width banner */}
        <div
          style={{
            background: P,
            color: "#fff",
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 0,
          }}
        >
          <FM id="header.logo">
            {q.company.logo ? (
              <img
                src={q.company.logo}
                alt="logo"
                style={{
                  height: 60,
                  maxWidth: 130,
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                }}
              />
            ) : (
              <div
                style={{
                  width: 60,
                  height: 60,
                  background: "#fff",
                  color: P,
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 900,
                  fontSize: 24,
                  borderRadius: 8,
                }}
              >
                AE
              </div>
            )}
          </FM>
          <div style={{ flex: 1 }}>
            <FM id="header.companyName" block onChangePath="company.name">
              <div
                style={{
                  fontSize: "2.2em",
                  fontWeight: 900,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                {q.company.name}
              </div>
            </FM>
            <FM id="header.tagline" block onChangePath="company.tagline">
              <div style={{ opacity: 0.85, fontSize: "0.9em", marginTop: 2 }}>
                {q.company.tagline}
              </div>
            </FM>
          </div>
          <div
            style={{
              textAlign: "right",
              fontSize: "0.82em",
              opacity: 0.9,
              lineHeight: 1.7,
            }}
          >
            <FM id="header.contact" block>
              <div>{q.company.phone}</div>
            </FM>
            <FM id="header.email" block>
              <div>{q.company.email}</div>
            </FM>
            {q.company.website && (
              <FM id="header.website" block>
                <div>{q.company.website}</div>
              </FM>
            )}
          </div>
        </div>
        {/* Accent stripe */}
        <div style={{ background: A, height: 5 }} />
        {/* Address ribbon */}
        <div
          style={{
            background: "#f1f5f9",
            padding: "5px 18px",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.82em",
            color: "#475569",
          }}
        >
          <FM id="header.address" block onChangePath="company.address">
            <span>{q.company.address}</span>
          </FM>
          {q.company.gstin && (
            <FM id="header.gstin" block>
              <span>
                <b>GSTIN:</b> {q.company.gstin}
              </span>
            </FM>
          )}
        </div>
      </div>
    );
  },

  renderItems({ q, FM }: LayoutProps) {
    const t = calc(q);
    const P = q.theme.primary,
      A = q.theme.accent;
    return (
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ background: `linear-gradient(90deg, ${P}, ${A})` }}>
            <th
              style={{
                ...cell,
                border: "none",
                color: "#fff",
                width: 28,
                textAlign: "center",
              }}
            >
              #
            </th>
            {q.columns.map((c) => (
              <th
                key={c.id}
                style={{
                  ...cell,
                  border: "none",
                  color: "#fff",
                  textAlign: c.align,
                  width: c.width,
                  fontWeight: 700,
                }}
              >
                <FM id={`col.${c.id}`}>{c.label}</FM>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {q.items.map((it, i) => (
            <tr key={it.id} style={{ background: i % 2 ? `${P}09` : "#fff" }}>
              <td
                style={{
                  ...cell,
                  textAlign: "center",
                  fontWeight: 600,
                  color: P,
                }}
              >
                {i + 1}
              </td>
              {q.columns.map((c) => {
                const isAmt = c.id === "amount";
                const isRate = c.id === "rate";
                const v = isAmt
                  ? inr(t.lines[i]!)
                  : isRate
                    ? inr(num(it.cells["rate"]))
                    : (it.cells[c.id] ?? "");
                return (
                  <td key={c.id} style={{ ...cell, textAlign: c.align }}>
                    <FM
                      id={`cell.${it.id}.${c.id}`}
                      {...(!isAmt
                        ? { onChangePath: `items.${i}.cells.${c.id}` }
                        : {})}
                    >
                      {v}
                    </FM>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },

  renderNotes({ q, FM }: LayoutProps) {
    const A = q.theme.accent;
    const lines = (s: string) => s.split("\n").filter(Boolean);
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          fontSize: "0.9em",
        }}
      >
        {q.terms && (
          <div style={{ borderLeft: `3px solid ${A}`, paddingLeft: 10 }}>
            <div
              style={{
                fontWeight: 800,
                marginBottom: 4,
                color: A,
                fontSize: "0.95em",
              }}
            >
              TERMS &amp; CONDITIONS
            </div>
            <ol style={{ paddingLeft: 16, margin: 0 }}>
              {lines(q.terms)
                .slice(0, 6)
                .map((l, i) => (
                  <li key={i} style={{ marginBottom: 2 }}>
                    {l}
                  </li>
                ))}
            </ol>
          </div>
        )}
        <div>
          {q.warranty && (
            <div
              style={{
                marginBottom: 8,
                padding: "8px 10px",
                background: `${A}15`,
                borderRadius: 4,
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                  color: A,
                  marginBottom: 3,
                  fontSize: "0.95em",
                }}
              >
                WARRANTY
              </div>
              <div>{q.warranty}</div>
            </div>
          )}
          {q.exclusions && (
            <div>
              <div
                style={{ fontWeight: 800, marginBottom: 3, fontSize: "0.95em" }}
              >
                EXCLUSIONS
              </div>
              <ol style={{ paddingLeft: 16, margin: 0 }}>
                {lines(q.exclusions)
                  .slice(0, 4)
                  .map((l, i) => (
                    <li key={i} style={{ marginBottom: 1 }}>
                      {l}
                    </li>
                  ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    );
  },

  renderSignature({ q, FM }: LayoutProps) {
    const P = q.theme.primary,
      A = q.theme.accent;
    return (
      <div style={{ display: "flex", gap: 16, alignItems: "stretch" }}>
        <FM id="sig.cust" block>
          <div
            style={{
              flex: 1,
              border: `1px solid #e2e8f0`,
              borderRadius: 6,
              padding: "10px 14px",
            }}
          >
            <div
              style={{ fontSize: "0.85em", color: "#64748b", marginBottom: 40 }}
            >
              Customer's Signature &amp; Stamp
            </div>
            <div
              style={{
                borderTop: `2px solid ${P}`,
                paddingTop: 4,
                fontWeight: 600,
              }}
            >
              Accepted by
            </div>
          </div>
        </FM>
        <div
          style={{
            flex: 1,
            background: P,
            color: "#fff",
            borderRadius: 6,
            padding: "10px 14px",
          }}
        >
          <FM id="sig.for" block>
            <div style={{ fontSize: "0.85em", opacity: 0.8, marginBottom: 2 }}>
              For &amp; on behalf of
            </div>
          </FM>
          <FM id="sig.compname" block>
            <div
              style={{ fontWeight: 800, fontSize: "1.1em", marginBottom: 36 }}
            >
              {q.company.name}
            </div>
          </FM>
          <FM id="sig.name" block onChangePath="signatory.name">
            <div
              style={{
                borderTop: `2px solid ${A}`,
                paddingTop: 4,
                fontWeight: 700,
              }}
            >
              {q.signatory.name}
            </div>
          </FM>
          <FM id="sig.desig" block onChangePath="signatory.designation">
            <div style={{ opacity: 0.85, fontSize: "0.9em" }}>
              {q.signatory.designation}
            </div>
          </FM>
        </div>
      </div>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT 3 — "minimal"
// Ultra-clean: left-aligned, thin rules, borderless items table, lots of space
// ─────────────────────────────────────────────────────────────────────────────
export const minimalLayout = {
  renderHeader({ q, FM }: LayoutProps) {
    const P = q.theme.primary,
      A = q.theme.accent;
    return (
      <div style={{ paddingBottom: 12 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <FM id="header.logo">
              {q.company.logo ? (
                <img
                  src={q.company.logo}
                  alt="logo"
                  style={{
                    height: 44,
                    maxWidth: 120,
                    objectFit: "contain",
                    marginBottom: 6,
                    display: "block",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 42,
                    height: 42,
                    background: P,
                    color: "#fff",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 800,
                    fontSize: 18,
                    borderRadius: 4,
                    marginBottom: 6,
                  }}
                >
                  AE
                </div>
              )}
            </FM>
            <FM id="header.companyName" block onChangePath="company.name">
              <div
                style={{
                  fontSize: "1.6em",
                  fontWeight: 700,
                  color: P,
                  letterSpacing: "-0.03em",
                }}
              >
                {q.company.name}
              </div>
            </FM>
            <FM id="header.tagline" block onChangePath="company.tagline">
              <div style={{ color: A, fontSize: "0.85em", marginTop: 2 }}>
                {q.company.tagline}
              </div>
            </FM>
          </div>
          <div
            style={{
              textAlign: "right",
              fontSize: "0.82em",
              color: "#64748b",
              lineHeight: 1.8,
            }}
          >
            <FM id="header.address" block onChangePath="company.address">
              <div>{q.company.address}</div>
            </FM>
            <FM id="header.phone" block>
              <div>{q.company.phone}</div>
            </FM>
            <FM id="header.email" block>
              <div>{q.company.email}</div>
            </FM>
            {q.company.gstin && (
              <FM id="header.gstin" block>
                <div>GSTIN: {q.company.gstin}</div>
              </FM>
            )}
          </div>
        </div>
        <div
          style={{
            height: 1,
            background: `linear-gradient(90deg, ${A}, transparent)`,
            marginTop: 10,
          }}
        />
      </div>
    );
  },

  renderItems({ q, FM }: LayoutProps) {
    const t = calc(q);
    const P = q.theme.primary;
    const borderlessCell: CSSProperties = {
      borderBottom: "1px solid #f1f5f9",
      padding: "6px 8px",
      verticalAlign: "top",
    };
    return (
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${P}` }}>
            <th
              style={{
                ...borderlessCell,
                width: 26,
                fontWeight: 700,
                textAlign: "center",
                color: "#64748b",
                fontSize: "0.85em",
              }}
            >
              #
            </th>
            {q.columns.map((c) => (
              <th
                key={c.id}
                style={{
                  ...borderlessCell,
                  textAlign: c.align,
                  width: c.width,
                  fontWeight: 700,
                  color: P,
                  fontSize: "0.88em",
                  textTransform: "uppercase",
                  letterSpacing: ".04em",
                }}
              >
                <FM id={`col.${c.id}`}>{c.label}</FM>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {q.items.map((it, i) => (
            <tr key={it.id}>
              <td
                style={{
                  ...borderlessCell,
                  textAlign: "center",
                  color: "#94a3b8",
                  fontSize: "0.85em",
                }}
              >
                {i + 1}
              </td>
              {q.columns.map((c) => {
                const isAmt = c.id === "amount";
                const isRate = c.id === "rate";
                const v = isAmt
                  ? inr(t.lines[i]!)
                  : isRate
                    ? inr(num(it.cells["rate"]))
                    : (it.cells[c.id] ?? "");
                return (
                  <td
                    key={c.id}
                    style={{ ...borderlessCell, textAlign: c.align }}
                  >
                    <FM
                      id={`cell.${it.id}.${c.id}`}
                      {...(!isAmt
                        ? { onChangePath: `items.${i}.cells.${c.id}` }
                        : {})}
                    >
                      {v}
                    </FM>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },

  renderNotes({ q, FM }: LayoutProps) {
    const P = q.theme.primary;
    const lines = (s: string) => s.split("\n").filter(Boolean);
    return (
      <div style={{ fontSize: "0.88em", color: "#475569", lineHeight: 1.7 }}>
        {q.terms && (
          <div style={{ marginBottom: 10 }}>
            <div
              style={{
                fontWeight: 700,
                color: P,
                marginBottom: 4,
                fontSize: "0.9em",
                letterSpacing: ".08em",
                textTransform: "uppercase",
              }}
            >
              Notes &amp; Terms
            </div>
            {lines(q.terms).map((l, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 2 }}>
                <span style={{ color: P, fontWeight: 700, minWidth: 12 }}>
                  ·
                </span>
                <span>{l}</span>
              </div>
            ))}
          </div>
        )}
        {q.warranty && (
          <div style={{ marginBottom: 10 }}>
            <span style={{ fontWeight: 700, color: P }}>Warranty — </span>
            {q.warranty}
          </div>
        )}
        {q.exclusions && (
          <div>
            <div
              style={{
                fontWeight: 700,
                color: P,
                marginBottom: 4,
                fontSize: "0.9em",
                letterSpacing: ".08em",
                textTransform: "uppercase",
              }}
            >
              Exclusions
            </div>
            {lines(q.exclusions).map((l, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 2 }}>
                <span style={{ color: "#94a3b8", minWidth: 12 }}>—</span>
                <span>{l}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },

  renderSignature({ q, FM }: LayoutProps) {
    const P = q.theme.primary;
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 48 }}>
        <FM id="sig.cust" block>
          <div style={{ textAlign: "center" }}>
            <div style={{ height: 48 }} />
            <div
              style={{
                borderTop: `1px solid #cbd5e1`,
                paddingTop: 4,
                width: 160,
                fontSize: "0.85em",
                color: "#64748b",
              }}
            >
              Client Signature
            </div>
          </div>
        </FM>
        <div style={{ textAlign: "center" }}>
          <FM id="sig.for" block>
            <div style={{ fontSize: "0.82em", color: "#64748b" }}>
              For {q.company.name}
            </div>
          </FM>
          <div style={{ height: 48 }} />
          <FM id="sig.name" block onChangePath="signatory.name">
            <div
              style={{
                borderTop: `2px solid ${P}`,
                paddingTop: 4,
                width: 160,
                fontWeight: 700,
                color: P,
              }}
            >
              {q.signatory.name}
            </div>
          </FM>
          <FM id="sig.desig" block onChangePath="signatory.designation">
            <div style={{ fontSize: "0.85em", color: "#64748b" }}>
              {q.signatory.designation}
            </div>
          </FM>
        </div>
      </div>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT 4 — "split-header"
// Left half: logo + company name; Right half: colored block with quote meta
// ─────────────────────────────────────────────────────────────────────────────
export const splitHeaderLayout = {
  renderHeader({ q, FM }: LayoutProps) {
    const P = q.theme.primary,
      A = q.theme.accent;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: 90,
          marginBottom: 2,
        }}
      >
        {/* Left: company info */}
        <div
          style={{ padding: "12px 14px 12px 0", borderRight: `3px solid ${A}` }}
        >
          <FM id="header.logo">
            {q.company.logo ? (
              <img
                src={q.company.logo}
                alt="logo"
                style={{
                  height: 48,
                  objectFit: "contain",
                  display: "block",
                  marginBottom: 6,
                }}
              />
            ) : (
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: P,
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 900,
                  fontSize: 20,
                  borderRadius: 6,
                  marginBottom: 6,
                }}
              >
                AE
              </div>
            )}
          </FM>
          <FM id="header.companyName" block onChangePath="company.name">
            <div
              style={{
                fontSize: "1.5em",
                fontWeight: 800,
                color: P,
                lineHeight: 1.15,
              }}
            >
              {q.company.name}
            </div>
          </FM>
          <FM id="header.tagline" block onChangePath="company.tagline">
            <div style={{ color: A, fontSize: "0.82em", fontWeight: 600 }}>
              {q.company.tagline}
            </div>
          </FM>
          <div
            style={{
              marginTop: 6,
              fontSize: "0.8em",
              color: "#475569",
              lineHeight: 1.6,
            }}
          >
            <FM id="header.address" block>
              <div>{q.company.address}</div>
            </FM>
            <FM id="header.contact" block>
              <div>
                {q.company.phone} · {q.company.email}
              </div>
            </FM>
          </div>
        </div>
        {/* Right: colored block with quotation identity */}
        <div
          style={{
            background: P,
            color: "#fff",
            padding: "12px 14px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: "1.4em",
              fontWeight: 900,
              letterSpacing: ".1em",
              opacity: 0.5,
              marginBottom: 8,
            }}
          >
            QUOTATION
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: "3px 10px",
              fontSize: "0.88em",
            }}
          >
            <span style={{ opacity: 0.7 }}>No.</span>
            <span style={{ fontWeight: 700 }}>{q.meta.number}</span>
            <span style={{ opacity: 0.7 }}>Date</span>
            <span>{fmtDate(q.meta.date)}</span>
            <span style={{ opacity: 0.7 }}>Valid</span>
            <span>{q.meta.validityDays} days</span>
            {q.company.gstin && (
              <>
                <span style={{ opacity: 0.7 }}>GSTIN</span>
                <span style={{ fontSize: "0.9em" }}>{q.company.gstin}</span>
              </>
            )}
          </div>
        </div>
      </div>
    );
  },

  renderItems({ q, FM }: LayoutProps) {
    const t = calc(q);
    const P = q.theme.primary,
      A = q.theme.accent;
    return (
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                ...cell,
                background: "#1e293b",
                color: "#fff",
                width: 28,
                textAlign: "center",
              }}
            >
              #
            </th>
            {q.columns.map((c, ci) => (
              <th
                key={c.id}
                style={{
                  ...cell,
                  background: ci === 0 ? "#1e293b" : P,
                  color: "#fff",
                  textAlign: c.align,
                  width: c.width,
                }}
              >
                <FM id={`col.${c.id}`}>{c.label}</FM>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {q.items.map((it, i) => (
            <tr key={it.id}>
              <td
                style={{
                  ...cell,
                  textAlign: "center",
                  background: "#f8fafc",
                  fontWeight: 600,
                }}
              >
                {i + 1}
              </td>
              {q.columns.map((c) => {
                const isAmt = c.id === "amount";
                const isRate = c.id === "rate";
                const v = isAmt
                  ? inr(t.lines[i]!)
                  : isRate
                    ? inr(num(it.cells["rate"]))
                    : (it.cells[c.id] ?? "");
                return (
                  <td
                    key={c.id}
                    style={{
                      ...cell,
                      textAlign: c.align,
                      fontWeight: isAmt ? 700 : undefined,
                      color: isAmt ? P : undefined,
                    }}
                  >
                    <FM
                      id={`cell.${it.id}.${c.id}`}
                      {...(!isAmt
                        ? { onChangePath: `items.${i}.cells.${c.id}` }
                        : {})}
                    >
                      {v}
                    </FM>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },

  renderNotes({ q, FM }: LayoutProps) {
    const P = q.theme.primary,
      A = q.theme.accent;
    const lines = (s: string) => s.split("\n").filter(Boolean);
    return (
      <div style={{ fontSize: "0.88em" }}>
        {q.terms && (
          <div style={{ marginBottom: 10 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 5,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  background: A,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <span style={{ color: "#fff", fontWeight: 800, fontSize: 11 }}>
                  T
                </span>
              </div>
              <span
                style={{
                  fontWeight: 800,
                  color: P,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                }}
              >
                Terms &amp; Conditions
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2px 16px",
              }}
            >
              {lines(q.terms).map((l, i) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: 6, lineHeight: 1.5 }}
                >
                  <span style={{ color: A, fontWeight: 700 }}>{i + 1}.</span>
                  {l}
                </div>
              ))}
            </div>
          </div>
        )}
        {(q.warranty || q.exclusions) && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginTop: 6,
            }}
          >
            {q.warranty && (
              <div
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: 4,
                  padding: "6px 10px",
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: 2 }}>
                  ✓ Warranty
                </div>
                <div style={{ color: "#166534" }}>{q.warranty}</div>
              </div>
            )}
            {q.exclusions && (
              <div
                style={{
                  background: "#fff7ed",
                  border: "1px solid #fed7aa",
                  borderRadius: 4,
                  padding: "6px 10px",
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: 2 }}>
                  ⚠ Exclusions
                </div>
                {lines(q.exclusions).map((l, i) => (
                  <div key={i} style={{ color: "#9a3412" }}>
                    {l}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },

  renderSignature({ q, FM }: LayoutProps) {
    const P = q.theme.primary,
      A = q.theme.accent;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 12,
          marginTop: 12,
        }}
      >
        <FM id="sig.cust" block>
          <div
            style={{
              textAlign: "center",
              border: "1px dashed #94a3b8",
              borderRadius: 6,
              padding: "8px 10px",
            }}
          >
            <div style={{ height: 50 }} />
            <div
              style={{
                borderTop: "1px solid #94a3b8",
                paddingTop: 4,
                fontSize: "0.85em",
                color: "#64748b",
              }}
            >
              Customer Acceptance
            </div>
          </div>
        </FM>
        <FM id="sig.date" block>
          <div
            style={{
              textAlign: "center",
              border: "1px dashed #94a3b8",
              borderRadius: 6,
              padding: "8px 10px",
            }}
          >
            <div style={{ height: 50 }} />
            <div
              style={{
                borderTop: "1px solid #94a3b8",
                paddingTop: 4,
                fontSize: "0.85em",
                color: "#64748b",
              }}
            >
              Date
            </div>
          </div>
        </FM>
        <div
          style={{
            textAlign: "center",
            background: P,
            color: "#fff",
            borderRadius: 6,
            padding: "8px 10px",
          }}
        >
          <FM id="sig.for" block>
            <div style={{ fontSize: "0.8em", opacity: 0.75, marginBottom: 2 }}>
              Authorised Signatory
            </div>
          </FM>
          <div style={{ height: 40 }} />
          <FM id="sig.name" block onChangePath="signatory.name">
            <div
              style={{
                borderTop: `2px solid ${A}`,
                paddingTop: 4,
                fontWeight: 800,
              }}
            >
              {q.signatory.name}
            </div>
          </FM>
          <FM id="sig.desig" block onChangePath="signatory.designation">
            <div style={{ fontSize: "0.82em", opacity: 0.8 }}>
              {q.signatory.designation}
            </div>
          </FM>
        </div>
      </div>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT 5 — "modern-card"
// Dark left accent bar, rounded card sections, modern sans-serif feel
// ─────────────────────────────────────────────────────────────────────────────
export const modernCardLayout = {
  renderHeader({ q, FM }: LayoutProps) {
    const P = q.theme.primary,
      A = q.theme.accent;
    return (
      <div
        style={{
          display: "flex",
          gap: 0,
          borderRadius: 8,
          overflow: "hidden",
          border: `1px solid ${P}20`,
        }}
      >
        {/* Left dark bar */}
        <div style={{ background: P, width: 10, flexShrink: 0 }} />
        {/* Main content */}
        <div
          style={{
            flex: 1,
            padding: "12px 14px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <FM id="header.logo">
              {q.company.logo ? (
                <img
                  src={q.company.logo}
                  alt="logo"
                  style={{ height: 52, objectFit: "contain" }}
                />
              ) : (
                <div
                  style={{
                    width: 52,
                    height: 52,
                    background: P,
                    color: "#fff",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 900,
                    fontSize: 20,
                    borderRadius: "50%",
                  }}
                >
                  AE
                </div>
              )}
            </FM>
            <div>
              <FM id="header.companyName" block onChangePath="company.name">
                <div style={{ fontSize: "1.6em", fontWeight: 800, color: P }}>
                  {q.company.name}
                </div>
              </FM>
              <FM id="header.tagline" block onChangePath="company.tagline">
                <div style={{ color: A, fontSize: "0.85em", fontWeight: 600 }}>
                  {q.company.tagline}
                </div>
              </FM>
            </div>
          </div>
          <div
            style={{
              textAlign: "right",
              fontSize: "0.8em",
              color: "#475569",
              lineHeight: 1.7,
            }}
          >
            <FM id="header.address" block>
              <div style={{ maxWidth: 200 }}>{q.company.address}</div>
            </FM>
            <FM id="header.contact" block>
              <div>
                {q.company.phone} · {q.company.email}
              </div>
            </FM>
            {q.company.gstin && (
              <FM id="header.gstin" block>
                <div>
                  <b>GSTIN:</b> {q.company.gstin}
                </div>
              </FM>
            )}
          </div>
        </div>
        {/* Right meta block */}
        <div
          style={{
            background: `${P}12`,
            borderLeft: `3px solid ${A}`,
            padding: "12px 14px",
            minWidth: 140,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontSize: "0.82em",
            gap: 3,
          }}
        >
          <div
            style={{
              fontWeight: 800,
              color: P,
              fontSize: "1em",
              letterSpacing: ".06em",
            }}
          >
            QUOTATION
          </div>
          <div>
            <span style={{ color: "#64748b" }}>No. </span>
            <b>{q.meta.number}</b>
          </div>
          <div>
            <span style={{ color: "#64748b" }}>Date </span>
            {fmtDate(q.meta.date)}
          </div>
          <div>
            <span style={{ color: "#64748b" }}>Valid </span>
            {q.meta.validityDays} days
          </div>
        </div>
      </div>
    );
  },

  renderItems({ q, FM }: LayoutProps) {
    const t = calc(q);
    const P = q.theme.primary;
    return (
      <div
        style={{
          border: `1px solid ${P}25`,
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: P }}>
              <th
                style={{
                  color: "#fff",
                  padding: "7px 8px",
                  width: 28,
                  textAlign: "center",
                  fontSize: "0.85em",
                }}
              >
                #
              </th>
              {q.columns.map((c) => (
                <th
                  key={c.id}
                  style={{
                    color: "#fff",
                    padding: "7px 8px",
                    textAlign: c.align,
                    width: c.width,
                    fontSize: "0.85em",
                    fontWeight: 700,
                  }}
                >
                  <FM id={`col.${c.id}`}>{c.label}</FM>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {q.items.map((it, i) => (
              <tr
                key={it.id}
                style={{
                  borderTop: `1px solid ${P}15`,
                  background: i % 2 ? `${P}06` : "#fff",
                }}
              >
                <td
                  style={{
                    padding: "6px 8px",
                    textAlign: "center",
                    color: "#94a3b8",
                    fontSize: "0.85em",
                  }}
                >
                  {i + 1}
                </td>
                {q.columns.map((c) => {
                  const v =
                    c.id === "amount"
                      ? inr(t.lines[i]!)
                      : c.id === "rate"
                        ? inr(num(it.cells["rate"]))
                        : (it.cells[c.id] ?? "");
                  return (
                    <td
                      key={c.id}
                      style={{
                        padding: "6px 8px",
                        textAlign: c.align,
                        borderLeft:
                          c.id === "amount" ? `2px solid ${P}30` : undefined,
                        fontWeight: c.id === "amount" ? 700 : undefined,
                      }}
                    >
                      <FM id={`cell.${it.id}.${c.id}`}>{v}</FM>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },

  renderNotes({ q, FM }: LayoutProps) {
    const P = q.theme.primary,
      A = q.theme.accent;
    const lines = (s: string) => s.split("\n").filter(Boolean);
    return (
      <div style={{ fontSize: "0.88em", lineHeight: 1.65 }}>
        {q.terms && (
          <div
            style={{
              border: `1px solid ${P}20`,
              borderRadius: 6,
              overflow: "hidden",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                background: P,
                color: "#fff",
                padding: "4px 10px",
                fontWeight: 700,
                fontSize: "0.9em",
                letterSpacing: ".05em",
              }}
            >
              TERMS &amp; CONDITIONS
            </div>
            <div style={{ padding: "6px 10px" }}>
              {lines(q.terms).map((l, i) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: 8, marginBottom: 2 }}
                >
                  <span style={{ color: A, fontWeight: 700, minWidth: 16 }}>
                    {i + 1}.
                  </span>
                  {l}
                </div>
              ))}
            </div>
          </div>
        )}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
        >
          {q.warranty && (
            <div
              style={{
                border: `1px solid ${P}20`,
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: `${A}20`,
                  color: P,
                  padding: "4px 10px",
                  fontWeight: 700,
                  fontSize: "0.9em",
                }}
              >
                WARRANTY
              </div>
              <div style={{ padding: "6px 10px" }}>{q.warranty}</div>
            </div>
          )}
          {q.exclusions && (
            <div
              style={{
                border: `1px solid ${P}20`,
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: "#fef2f2",
                  color: "#991b1b",
                  padding: "4px 10px",
                  fontWeight: 700,
                  fontSize: "0.9em",
                }}
              >
                EXCLUSIONS
              </div>
              <div style={{ padding: "6px 10px" }}>
                {lines(q.exclusions).map((l, i) => (
                  <div key={i} style={{ marginBottom: 1 }}>
                    — {l}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },

  renderSignature({ q, FM }: LayoutProps) {
    const P = q.theme.primary,
      A = q.theme.accent;
    return (
      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <FM id="sig.cust" block>
          <div
            style={{
              flex: 1,
              border: `1px solid ${P}25`,
              borderRadius: 6,
              padding: "10px 12px",
            }}
          >
            <div
              style={{ fontSize: "0.8em", color: "#64748b", marginBottom: 44 }}
            >
              Customer Signature &amp; Stamp
            </div>
            <div
              style={{
                borderTop: `1px solid #cbd5e1`,
                paddingTop: 4,
                fontSize: "0.85em",
                color: "#475569",
              }}
            >
              Accepted By
            </div>
          </div>
        </FM>
        <div
          style={{
            flex: 1,
            border: `2px solid ${P}`,
            borderRadius: 6,
            padding: "10px 12px",
            background: `${P}06`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                background: A,
                borderRadius: "50%",
              }}
            />
            <FM id="sig.for" block>
              <span style={{ fontSize: "0.82em", color: "#475569" }}>
                For <b>{q.company.name}</b>
              </span>
            </FM>
          </div>
          <div style={{ height: 36 }} />
          <FM id="sig.name" block onChangePath="signatory.name">
            <div
              style={{
                borderTop: `2px solid ${P}`,
                paddingTop: 4,
                fontWeight: 800,
                color: P,
              }}
            >
              {q.signatory.name}
            </div>
          </FM>
          <FM id="sig.desig" block onChangePath="signatory.designation">
            <div style={{ fontSize: "0.85em", color: "#64748b" }}>
              {q.signatory.designation}
            </div>
          </FM>
        </div>
      </div>
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT 6 — "formal"
// Centered logo & company name, double ruled lines, very traditional look
// ─────────────────────────────────────────────────────────────────────────────
export const formalLayout = {
  renderHeader({ q, FM }: LayoutProps) {
    const P = q.theme.primary,
      A = q.theme.accent;
    return (
      <div style={{ textAlign: "center", paddingBottom: 10 }}>
        <FM id="header.logo">
          {q.company.logo ? (
            <img
              src={q.company.logo}
              alt="logo"
              style={{
                height: 64,
                objectFit: "contain",
                display: "block",
                margin: "0 auto 6px",
              }}
            />
          ) : (
            <div
              style={{
                width: 60,
                height: 60,
                background: P,
                color: "#fff",
                display: "grid",
                placeItems: "center",
                fontWeight: 900,
                fontSize: 22,
                borderRadius: "50%",
                margin: "0 auto 8px",
                border: `3px solid ${A}`,
              }}
            >
              AE
            </div>
          )}
        </FM>
        <FM id="header.companyName" block onChangePath="company.name">
          <div
            style={{
              fontSize: "2em",
              fontWeight: 900,
              color: P,
              letterSpacing: ".04em",
              lineHeight: 1.1,
            }}
          >
            {q.company.name}
          </div>
        </FM>
        <FM id="header.tagline" block onChangePath="company.tagline">
          <div
            style={{
              color: A,
              fontSize: "0.9em",
              fontWeight: 600,
              marginTop: 3,
            }}
          >
            {q.company.tagline}
          </div>
        </FM>
        <FM id="header.address" block>
          <div style={{ fontSize: "0.83em", color: "#475569", marginTop: 5 }}>
            {q.company.address}
          </div>
        </FM>
        <FM id="header.contact" block>
          <div style={{ fontSize: "0.83em", color: "#475569" }}>
            {[q.company.phone, q.company.email, q.company.website]
              .filter(Boolean)
              .join(" · ")}
          </div>
        </FM>
        {q.company.gstin && (
          <FM id="header.gstin" block>
            <div style={{ fontSize: "0.83em", fontWeight: 700, marginTop: 2 }}>
              GSTIN: {q.company.gstin}
            </div>
          </FM>
        )}
        {/* Double rule */}
        <div
          style={{ height: 4, background: P, marginTop: 10, borderRadius: 2 }}
        />
        <div style={{ height: 1, background: A, marginTop: 2 }} />
      </div>
    );
  },

  renderItems({ q, FM }: LayoutProps) {
    const t = calc(q);
    const P = q.theme.primary,
      A = q.theme.accent;
    return (
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: `2px solid ${P}`,
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                background: P,
                color: "#fff",
                padding: "6px 8px",
                width: 28,
                textAlign: "center",
                borderRight: `1px solid ${A}`,
              }}
            >
              #
            </th>
            {q.columns.map((c, ci) => (
              <th
                key={c.id}
                style={{
                  background: ci === 0 ? P : `${P}e0`,
                  color: "#fff",
                  padding: "6px 8px",
                  textAlign: c.align,
                  width: c.width,
                  borderRight: `1px solid ${A}`,
                  fontStyle: ci === 0 ? undefined : undefined,
                }}
              >
                <FM id={`col.${c.id}`}>{c.label}</FM>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {q.items.map((it, i) => (
            <tr key={it.id} style={{ borderBottom: `1px solid ${P}30` }}>
              <td
                style={{
                  padding: "5px 8px",
                  textAlign: "center",
                  borderRight: `1px solid ${P}20`,
                  background: `${P}08`,
                }}
              >
                {i + 1}
              </td>
              {q.columns.map((c) => {
                const v =
                  c.id === "amount"
                    ? inr(t.lines[i]!)
                    : c.id === "rate"
                      ? inr(num(it.cells["rate"]))
                      : (it.cells[c.id] ?? "");
                return (
                  <td
                    key={c.id}
                    style={{
                      padding: "5px 8px",
                      textAlign: c.align,
                      borderRight: `1px solid ${P}15`,
                      fontWeight: c.id === "amount" ? 700 : undefined,
                    }}
                  >
                    <FM id={`cell.${it.id}.${c.id}`}>{v}</FM>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },

  renderNotes({ q, FM }: LayoutProps) {
    const P = q.theme.primary;
    const lines = (s: string) => s.split("\n").filter(Boolean);
    const SectionHead = ({ title }: { title: string }) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 5,
        }}
      >
        <div style={{ flex: 1, height: 1, background: P }} />
        <span
          style={{
            fontWeight: 800,
            color: P,
            fontSize: "0.88em",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </span>
        <div style={{ flex: 1, height: 1, background: P }} />
      </div>
    );
    return (
      <div style={{ fontSize: "0.88em", lineHeight: 1.65 }}>
        {q.terms && (
          <div style={{ marginBottom: 10 }}>
            <SectionHead title="Terms &amp; Conditions" />
            <ol
              style={{ paddingLeft: 18, margin: 0, columns: 2, columnGap: 16 }}
            >
              {lines(q.terms).map((l, i) => (
                <li key={i} style={{ marginBottom: 2, breakInside: "avoid" }}>
                  {l}
                </li>
              ))}
            </ol>
          </div>
        )}
        {(q.warranty || q.exclusions) && (
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            {q.warranty && (
              <div>
                <SectionHead title="Warranty" />
                <div style={{ color: "#374151" }}>{q.warranty}</div>
              </div>
            )}
            {q.exclusions && (
              <div>
                <SectionHead title="Exclusions" />
                <ol style={{ paddingLeft: 16, margin: 0 }}>
                  {lines(q.exclusions).map((l, i) => (
                    <li key={i} style={{ marginBottom: 2 }}>
                      {l}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },

  renderSignature({ q, FM }: LayoutProps) {
    const P = q.theme.primary,
      A = q.theme.accent;
    return (
      <div>
        {/* Double rule above signature */}
        <div style={{ height: 1, background: A, marginBottom: 2 }} />
        <div
          style={{
            height: 4,
            background: P,
            borderRadius: 2,
            marginBottom: 14,
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <FM id="sig.cust" block>
            <div style={{ textAlign: "center" }}>
              <div style={{ height: 56 }} />
              <div
                style={{
                  borderTop: `2px solid ${P}`,
                  paddingTop: 4,
                  width: 170,
                }}
              >
                <div style={{ fontWeight: 700, color: P }}>Customer</div>
                <div style={{ fontSize: "0.85em", color: "#64748b" }}>
                  Signature &amp; Seal
                </div>
              </div>
            </div>
          </FM>
          <FM id="sig.date" block>
            <div style={{ textAlign: "center" }}>
              <div style={{ height: 56 }} />
              <div
                style={{
                  borderTop: `2px solid ${P}`,
                  paddingTop: 4,
                  width: 130,
                }}
              >
                <div style={{ fontWeight: 700, color: P }}>Date</div>
              </div>
            </div>
          </FM>
          <div style={{ textAlign: "center" }}>
            <div style={{ height: 56 }} />
            <div
              style={{ borderTop: `2px solid ${P}`, paddingTop: 4, width: 170 }}
            >
              <FM id="sig.name" block onChangePath="signatory.name">
                <div style={{ fontWeight: 800, color: P }}>
                  {q.signatory.name}
                </div>
              </FM>
              <FM id="sig.desig" block onChangePath="signatory.designation">
                <div style={{ fontSize: "0.85em", color: "#64748b" }}>
                  {q.signatory.designation}
                </div>
              </FM>
              <div
                style={{ fontSize: "0.82em", color: "#94a3b8", marginTop: 2 }}
              >
                For {q.company.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// ─── Layout dispatch map ──────────────────────────────────────────────────────
export const layouts = {
  classic: classicLayout,
  "bold-banner": boldBannerLayout,
  minimal: minimalLayout,
  "split-header": splitHeaderLayout,
  "modern-card": modernCardLayout,
  formal: formalLayout,
} as const;
