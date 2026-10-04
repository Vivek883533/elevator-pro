import type { BoxStyle, Quote } from "./types";
import type { CSSProperties } from "react";

export const uid = () => Math.random().toString(36).slice(2, 10);

export const inr = (n: number) =>
  "₹ " + (isFinite(n) ? n : 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
function two(n: number) { return n < 20 ? ones[n] : tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : ""); }
function three(n: number) { const h = Math.floor(n / 100), r = n % 100; return (h ? ones[h] + " Hundred" + (r ? " " : "") : "") + (r ? two(r) : ""); }
function intWords(n: number): string {
  if (n === 0) return "Zero";
  const parts: string[] = [];
  const crore = Math.floor(n / 1e7); n %= 1e7;
  const lakh = Math.floor(n / 1e5); n %= 1e5;
  const th = Math.floor(n / 1000); n %= 1000;
  if (crore) parts.push(intWords(crore) + " Crore");
  if (lakh) parts.push(two(lakh) + " Lakh");
  if (th) parts.push(two(th) + " Thousand");
  if (n) parts.push(three(n));
  return parts.join(" ");
}
export function amountInWords(n: number) {
  const r = Math.floor(n), p = Math.round((n - r) * 100);
  return "Rupees " + intWords(r) + (p ? " and " + two(p) + " Paise" : "") + " Only";
}

export const num = (s: string | undefined) => { const v = parseFloat(String(s ?? "").replace(/,/g, "")); return isNaN(v) ? 0 : v; };

export function calc(q: Quote) {
  const lines = q.items.map((it) => num(it.cells["qty"]) * num(it.cells["rate"]));
  const subtotal = lines.reduce((a, b) => a + b, 0);
  const discount = (subtotal * q.discountPct) / 100;
  const taxable = subtotal - discount;
  const cgst = q.taxMode === "intra" ? taxable * 0.09 : 0;
  const sgst = cgst;
  const igst = q.taxMode === "inter" ? taxable * 0.18 : 0;
  const total = Math.round(taxable + cgst + sgst + igst);
  return { lines, subtotal, discount, taxable, cgst, sgst, igst, total };
}

export function boxCss(s: BoxStyle = {}): CSSProperties {
  const o: Record<string, unknown> = {
    background: s.bg || undefined,
    color: s.color || undefined,
    fontSize: s.fontSize ? `${s.fontSize}px` : undefined,
    textAlign: s.align,
    border: s.borderWidth ? `${s.borderWidth}px solid ${s.borderColor || "#cbd5e1"}` : undefined,
    padding: s.padding != null ? `${s.padding}px` : undefined,
    marginTop: s.marginTop != null ? `${s.marginTop}px` : undefined,
    fontWeight: s.bold ? 700 : undefined,
  };
  Object.keys(o).forEach((k) => o[k] === undefined && delete o[k]);
  return o as CSSProperties;
}

export const fmtDate = (d: string) => {
  const x = new Date(d);
  return isNaN(+x) ? d : x.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};
