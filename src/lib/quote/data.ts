import type { Quote, Section, SectionType, Item } from "./types";

const S = (type: SectionType, title: string, extra: Partial<Section> = {}): Section => ({
  id: type + "-" + Math.random().toString(36).slice(2, 7), type, title, visible: true, style: {}, ...extra,
});

export const sectionLabels: Record<SectionType, string> = {
  header: "Company Header", meta: "Quotation Details", customer: "Customer & Site", specs: "Technical Specifications",
  items: "Items / Services", totals: "Totals & Tax", payment: "Payment Terms", terms: "Terms & Conditions",
  warranty: "Warranty", exclusions: "Exclusions", bank: "Bank Details", signature: "Signature & Stamp",
  footer: "Footer", custom: "Custom Text Block", custom_table: "Custom Grid/Table",
};

const defaultSections = (): Section[] => [
  S("header", "Aayush Elevator"),
  S("meta", "Quotation"),
  S("customer", "Customer & Site Details"),
  S("specs", "Elevator Technical Specifications"),
  S("items", "Scope of Supply & Pricing"),
  S("totals", "Summary"),
  S("payment", "Payment Terms"),
  S("terms", "Terms & Conditions"),
  S("warranty", "Warranty"),
  S("exclusions", "Exclusions"),
  S("bank", "Bank Details"),
  S("signature", "Authorised Signatory"),
  S("footer", "Footer"),
];

const it = (desc: string, hsn: string, qty: number, rate: number, unit = "Nos"): Item => ({
  id: Math.random().toString(36).slice(2, 9), cells: { desc, hsn, qty: String(qty), unit, rate: String(rate) },
});

const company = {
  name: "Aayush Elevator Pvt. Ltd.",
  tagline: "Lifts · Escalators · Modernization · AMC",
  address: "Plot 42, GIDC Industrial Estate, Naroda, Ahmedabad, Gujarat 382330",
  phone: "+91 98250 43120",
  email: "sales@aayushelevator.in",
  website: "www.aayushelevator.in",
  gstin: "24AAKCA4521M1Z6",
};

const bank = {
  accountName: "Aayush Elevator Pvt. Ltd.", bank: "HDFC Bank Ltd.", account: "50200061234789",
  ifsc: "HDFC0001234", branch: "Naroda, Ahmedabad", upi: "aayushelevator@hdfcbank",
};

const baseTerms = `Prices are ex-works Ahmedabad; transportation to site included within Gujarat.
Civil, electrical and structural works up to lift pit, machine room and shaft are in client's scope.
Delivery: 10–12 weeks from receipt of advance and approved drawings.
Installation time: 3–4 weeks after material reaches site and shaft is handed over.
GST and statutory levies as applicable at the time of invoicing.
Lift licence / inspection fees payable to Government authorities are extra at actuals.
Disputes subject to Ahmedabad jurisdiction only.`;

const columns = () => [
  { id: "desc", label: "Description", align: "left" as const },
  { id: "hsn", label: "HSN/SAC", align: "center" as const, width: 70 },
  { id: "qty", label: "Qty", align: "center" as const, width: 45 },
  { id: "unit", label: "Unit", align: "center" as const, width: 45 },
  { id: "rate", label: "Unit Rate", align: "right" as const, width: 90 },
  { id: "amount", label: "Amount", align: "right" as const, width: 100 },
];

function base(over: Partial<Quote>): Quote {
  const now = new Date().toISOString();
  return {
    id: Math.random().toString(36).slice(2, 10), kind: "template", name: "Untitled", status: "Draft",
    createdAt: now, updatedAt: now,
    theme: { primary: "#12355b", accent: "#c8102e", text: "#1e293b", font: "'IBM Plex Sans', sans-serif", baseSize: 11 },
    company: { ...company },
    meta: { number: "AE/Q/2026-27/001", date: now.slice(0, 10), validityDays: 30, reference: "", extra: [] },
    customer: { society: "", contact: "", phone: "", email: "", address: "", gstin: "", extra: [] },
    specs: [], columns: columns(), items: [], cellStyles: {}, discountPct: 0, taxMode: "intra",
    milestones: [
      { id: "m1", label: "Advance along with purchase order", pct: 30 },
      { id: "m2", label: "On delivery of material at site", pct: 50 },
      { id: "m3", label: "On completion of erection", pct: 15 },
      { id: "m4", label: "On testing & handover", pct: 5 },
    ],
    terms: baseTerms,
    warranty: "12 months from the date of handover or 18 months from date of supply, whichever is earlier, against manufacturing defects. Free maintenance service during warranty period.",
    exclusions: `Civil works, grouting, plastering and painting of shaft.
Three-phase power supply up to machine room / controller with isolator.
Scaffolding, pit waterproofing and machine room ventilation.
Any item not specifically mentioned in the scope above.`,
    bank: { ...bank },
    signatory: { name: "Rakesh Patel", designation: "Director – Sales" },
    footer: "Thank you for considering Aayush Elevator. We lift what matters. | This is a computer-generated quotation.",
    sections: defaultSections(),
    ...over,
  };
}

const specs = (arr: [string, string][]) => arr.map(([label, value], i) => ({ id: "s" + i, label, value }));

export function seedTemplates(): Quote[] {
  // ── 1. Classic Corporate — Standard Passenger Lift ──────────────────────────
  const installation = base({
    name: "Standard Installation \u2013 Passenger Lift", templateName: "Standard Installation",
    layout: "classic",
    theme: { primary: "#12355b", accent: "#c8102e", text: "#1e293b", font: "'IBM Plex Sans', sans-serif", baseSize: 11 },
    specs: specs([
      ["Type", "Passenger Elevator (MRL)"], ["Capacity", "8 Persons / 544 kg"], ["Speed", "1.0 m/s"],
      ["Stops / Openings", "G+7 / 8 Stops, 8 Openings (same side)"], ["Travel", "\u2248 21.0 m"],
      ["Drive", "Gearless PM Synchronous with VVVF"], ["Door Type", "Automatic Centre Opening, SS Hairline, 800 mm"],
      ["Car Finish", "SS Hairline walls, mirror rear, granite flooring"], ["Controller", "Microprocessor based, ARD"],
    ]),
    items: [
      it("Gearless machine with VVVF controller, ARD and complete wiring", "8428", 1, 685000, "Set"),
      it("Elevator car with SS hairline finish, false ceiling and LED lighting", "8431", 1, 245000, "Set"),
      it("Automatic centre-opening landing doors \u2013 SS hairline", "8431", 8, 38500, "Nos"),
      it("Guide rails, brackets, counterweight, ropes and pit equipment", "8431", 1, 172000, "Set"),
      it("Installation, testing & commissioning", "9987", 1, 95000, "Job"),
    ],
  });

  // ── 2. Bold Banner — Modernization / Upgrade ────────────────────────────────
  const modern = base({
    name: "Modernization \u2013 Existing Lift Upgrade", templateName: "Modernization",
    layout: "bold-banner",
    theme: { primary: "#0f172a", accent: "#f59e0b", text: "#1e293b", font: "'IBM Plex Sans', sans-serif", baseSize: 11 },
    specs: specs([
      ["Existing System", "Geared AC-2 speed, relay logic"], ["Proposed Drive", "Gearless PM with VVVF"],
      ["Capacity", "6 Persons / 408 kg"], ["Speed", "0.7 m/s \u2192 1.0 m/s"], ["Stops", "G+4 / 5 Stops"],
      ["Door Type", "Manual swing \u2192 Automatic telescopic"],
    ]),
    items: [
      it("Dismantling of old machine, controller and wiring", "9987", 1, 28000, "Job"),
      it("New gearless machine with VVVF controller & ARD", "8428", 1, 395000, "Set"),
      it("Automatic telescopic landing doors with car door operator", "8431", 5, 42000, "Nos"),
      it("COP/LOP with digital display and new travelling cable", "8537", 1, 48500, "Set"),
      it("Installation, testing & commissioning", "9987", 1, 65000, "Job"),
    ],
  });

  // ── 3. Minimal / Serif — AMC Comprehensive ──────────────────────────────────
  const amcC = base({
    name: "AMC \u2013 Comprehensive", templateName: "AMC Comprehensive",
    layout: "minimal",
    theme: { primary: "#065f46", accent: "#10b981", text: "#111827", font: "'Source Serif 4', Georgia, serif", baseSize: 11 },
    specs: specs([["Lift Make", "Any / Multi-brand"], ["No. of Lifts", "2"], ["Visits", "Monthly preventive maintenance"], ["Breakdown Response", "Within 4 hours, 24\u00d77"]]),
    items: [it("Comprehensive annual maintenance incl. spares (excluding ropes & major civil)", "998717", 2, 42000, "Lift/yr")],
    milestones: [{ id: "m1", label: "Quarterly in advance", pct: 100 }],
    warranty: "All spares replaced under the contract carry warranty until the contract end date.",
  });

  // ── 4. Split Header — AMC Non-Comprehensive ─────────────────────────────────
  const amcN = base({
    name: "AMC \u2013 Non-Comprehensive", templateName: "AMC Non-Comprehensive",
    layout: "split-header",
    theme: { primary: "#1e3a5f", accent: "#e85d04", text: "#1e293b", font: "'IBM Plex Sans', sans-serif", baseSize: 11 },
    specs: specs([["Lift Make", "Any / Multi-brand"], ["No. of Lifts", "1"], ["Visits", "Monthly preventive maintenance"], ["Spares", "Charged extra on actuals"]]),
    items: [it("Non-comprehensive annual maintenance (labour & lubricants only)", "998717", 1, 18000, "Lift/yr")],
    milestones: [{ id: "m1", label: "100% advance on signing contract", pct: 100 }],
  });

  // ── 5. Modern Card — Repair / Breakdown Work ────────────────────────────────
  const repair = base({
    name: "Repair Work", templateName: "Repair Work",
    layout: "modern-card",
    theme: { primary: "#312e81", accent: "#7c3aed", text: "#1e293b", font: "'IBM Plex Sans', sans-serif", baseSize: 11 },
    specs: specs([["Lift Location", "Tower B"], ["Issue Reported", "Door not closing, frequent trips"]]),
    items: [
      it("Replacement of car door operator motor", "8501", 1, 24500, "Nos"),
      it("Door hanger rollers set", "8431", 4, 1850, "Nos"),
      it("Service charges", "998717", 1, 6500, "Job"),
    ],
    milestones: [{ id: "m1", label: "Advance", pct: 50 }, { id: "m2", label: "On completion", pct: 50 }],
  });

  // ── 6. Formal / Serif — Escalator Supply & Installation ─────────────────────
  const escalator = base({
    name: "Escalator Supply & Installation", templateName: "Escalator Installation",
    layout: "formal",
    theme: { primary: "#7f1d1d", accent: "#b45309", text: "#1c1917", font: "'Source Serif 4', Georgia, serif", baseSize: 11 },
    specs: specs([
      ["Type", "Passenger Escalator (Indoor)"], ["Rise", "3.0 m (Approx.)"], ["Angle", "30\u00b0"],
      ["Speed", "0.5 m/s"], ["Width", "1000 mm (step width 600 mm)"],
      ["Step Finish", "Aluminium comb, stainless steel sides"], ["Handrail", "Black rubber, balustrade SS"],
      ["Drive", "Geared with VVVF, auto-start sensor"],
    ]),
    items: [
      it("Escalator unit \u2013 complete with drive & controls", "8428", 1, 1850000, "Set"),
      it("Civil pit drawings, supervision & coordination", "9987", 1, 35000, "Job"),
      it("Balustrade panels & handrail extensions (per site)", "8431", 1, 65000, "Set"),
      it("Installation, testing & commissioning", "9987", 1, 145000, "Job"),
      it("First year preventive maintenance (post warranty)", "998717", 1, 55000, "Year"),
    ],
    milestones: [
      { id: "m1", label: "Advance with purchase order", pct: 30 },
      { id: "m2", label: "On dispatch from factory", pct: 40 },
      { id: "m3", label: "On completion of installation", pct: 20 },
      { id: "m4", label: "On testing & handover", pct: 10 },
    ],
    warranty: "24 months from date of commissioning against manufacturing defects. Includes two free preventive maintenance visits per year during warranty.",
  });
  // ── 7. Clean Professional — Basic Scope ──────────────────────────────────
  const clean = base({
    name: "Clean & Professional", templateName: "Clean Professional",
    layout: "minimal",
    theme: { primary: "#0f172a", accent: "#3b82f6", text: "#1e293b", font: "'IBM Plex Sans', sans-serif", baseSize: 11 },
    specs: [],
    items: [
      it("Basic Item 1", "001", 1, 10000, "Nos"),
      it("Basic Item 2", "002", 1, 25000, "Nos"),
    ],
    sections: [
      S("header", "Company Header"),
      S("items", "Scope of Supply"),
      S("footer", "Footer")
    ]
  });

  return [installation, modern, amcC, amcN, repair, escalator, clean];
}


export function seedQuotations(tpls: Quote[]): Quote[] {
  const mk = (t: Quote, n: number, cust: Partial<Quote["customer"]>, status: Quote["status"], daysAgo: number, disc = 0, tax: Quote["taxMode"] = "intra"): Quote => {
    const d = new Date(Date.now() - daysAgo * 864e5).toISOString();
    const c = structuredClone(t);
    return {
      ...c, id: Math.random().toString(36).slice(2, 10), kind: "quotation", status, createdAt: d, updatedAt: d,
      name: `${cust.society} – ${t.templateName}`, discountPct: disc, taxMode: tax,
      meta: { ...c.meta, number: `AE/Q/2026-27/${String(n).padStart(3, "0")}`, date: d.slice(0, 10) },
      customer: { ...c.customer, ...cust },
    };
  };
  return [
    mk(tpls[0]!, 118, { society: "Shivalik Heights Co-op Housing Society", contact: "Mr. Hitesh Shah (Secretary)", phone: "+91 98240 11223", email: "shivalikheights@gmail.com", address: "Near Prahladnagar Garden, Satellite, Ahmedabad 380015", gstin: "" }, "Sent", 2, 5),
    mk(tpls[1]!, 117, { society: "Gokul Residency", contact: "Mrs. Priya Desai", phone: "+91 99090 45612", email: "gokulresidency@yahoo.in", address: "Bhatar Road, Surat 395017", gstin: "" }, "Accepted", 9),
    mk(tpls[2]!, 116, { society: "Nirmal Business Park", contact: "Mr. Anil Mehta (Facility Mgr)", phone: "+91 90990 77881", email: "facility@nirmalpark.com", address: "S.G. Highway, Ahmedabad 380054", gstin: "24AABFN1234K1Z2" }, "Draft", 14),
    mk(tpls[4]!, 115, { society: "Sai Krupa Apartments", contact: "Mr. Rohit Joshi", phone: "+91 97250 33410", email: "", address: "Kalawad Road, Rajkot 360005", gstin: "" }, "Rejected", 21),
    mk(tpls[0]!, 114, { society: "Skyline Infra Projects LLP", contact: "Mr. Vikram Rao", phone: "+91 98190 55667", email: "projects@skylineinfra.in", address: "Andheri East, Mumbai 400069", gstin: "27AAKFS9876L1Z4" }, "Sent", 30, 3, "inter"),
  ];
}

export function blankSection(type: SectionType): Section {
  if (type === "custom_table") {
    return S(type, sectionLabels[type], {
      columns: [
        { id: "c1", label: "Column 1", align: "left" },
        { id: "c2", label: "Column 2", align: "left" }
      ],
      items: [
        { id: "r1", cells: { c1: "Value 1", c2: "Value 2" } }
      ]
    });
  }
  return S(type, sectionLabels[type], type === "custom" ? { content: "Write your content here…" } : {});
}

export function createBlankTemplate(): Quote {
  return base({ 
    name: "Blank Template",
    sections: [],
    milestones: [],
    terms: "",
    warranty: "",
    exclusions: "",
    footer: ""
  });
}
