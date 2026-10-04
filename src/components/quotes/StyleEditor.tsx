import type { Align, BoxStyle } from "@/lib/quote/types";
import { AlignCenter, AlignLeft, AlignRight, Bold, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export function StyleEditor({ value, onChange }: { value: BoxStyle; onChange: (s: BoxStyle) => void }) {
  const set = (p: Partial<BoxStyle>) => onChange({ ...value, ...p });
  const Color = ({ k, label }: { k: "bg" | "color" | "borderColor"; label: string }) => (
    <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <input type="color" value={value[k] || (k === "bg" ? "#ffffff" : "#1e293b")} onChange={(e) => set({ [k]: e.target.value })} className="h-6 w-7 cursor-pointer rounded border border-input bg-transparent p-0" />
      {label}
    </label>
  );
  const N = ({ k, label, max = 40 }: { k: "fontSize" | "borderWidth" | "padding" | "marginTop"; label: string; max?: number }) => (
    <label className="flex flex-col gap-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
      {label}
      <input type="number" min={0} max={max} value={value[k] ?? ""} placeholder="auto" onChange={(e) => set({ [k]: e.target.value === "" ? undefined : Number(e.target.value) })} className="h-7 w-full rounded border border-input bg-background px-1.5 text-xs text-foreground" />
    </label>
  );
  const aligns: [Align, typeof AlignLeft][] = [["left", AlignLeft], ["center", AlignCenter], ["right", AlignRight]];
  return (
    <div className="space-y-2 rounded-md border border-dashed border-border bg-muted/40 p-2">
      <div className="flex flex-wrap items-center gap-3">
        <Color k="bg" label="Fill" /><Color k="color" label="Text" /><Color k="borderColor" label="Border" />
        <div className="ml-auto flex gap-0.5">
          {aligns.map(([a, I]) => (
            <button key={a} type="button" onClick={() => set({ align: value.align === a ? undefined : a })} className={cn("rounded p-1 hover:bg-accent", value.align === a && "bg-primary text-primary-foreground hover:bg-primary")}><I className="h-3.5 w-3.5" /></button>
          ))}
          <button type="button" onClick={() => set({ bold: !value.bold })} className={cn("rounded p-1 hover:bg-accent", value.bold && "bg-primary text-primary-foreground hover:bg-primary")}><Bold className="h-3.5 w-3.5" /></button>
          <button type="button" title="Reset" onClick={() => onChange({})} className="rounded p-1 hover:bg-accent"><RotateCcw className="h-3.5 w-3.5" /></button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        <N k="fontSize" label="Font px" /><N k="borderWidth" label="Border" max={10} /><N k="padding" label="Padding" /><N k="marginTop" label="Margin" max={80} />
      </div>
    </div>
  );
}
