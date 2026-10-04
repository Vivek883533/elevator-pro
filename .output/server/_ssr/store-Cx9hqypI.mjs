import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-Cx9hqypI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var data_exports = /* @__PURE__ */ __exportAll({
	blankSection: () => blankSection,
	createBlankTemplate: () => createBlankTemplate,
	sectionLabels: () => sectionLabels,
	seedQuotations: () => seedQuotations,
	seedTemplates: () => seedTemplates
});
var S = (type, title, extra = {}) => ({
	id: type + "-" + Math.random().toString(36).slice(2, 7),
	type,
	title,
	visible: true,
	style: {},
	...extra
});
var sectionLabels = {
	header: "Company Header",
	meta: "Quotation Details",
	customer: "Customer & Site",
	specs: "Technical Specifications",
	items: "Items / Services",
	totals: "Totals & Tax",
	payment: "Payment Terms",
	terms: "Terms & Conditions",
	warranty: "Warranty",
	exclusions: "Exclusions",
	bank: "Bank Details",
	signature: "Signature & Stamp",
	footer: "Footer",
	custom: "Custom Text Block",
	custom_table: "Custom Grid/Table"
};
var defaultSections = () => [
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
	S("footer", "Footer")
];
var it = (desc, hsn, qty, rate, unit = "Nos") => ({
	id: Math.random().toString(36).slice(2, 9),
	cells: {
		desc,
		hsn,
		qty: String(qty),
		unit,
		rate: String(rate)
	}
});
var company = {
	name: "Aayush Elevator Pvt. Ltd.",
	tagline: "Lifts · Escalators · Modernization · AMC",
	address: "Plot 42, GIDC Industrial Estate, Naroda, Ahmedabad, Gujarat 382330",
	phone: "+91 98250 43120",
	email: "sales@aayushelevator.in",
	website: "www.aayushelevator.in",
	gstin: "24AAKCA4521M1Z6"
};
var bank = {
	accountName: "Aayush Elevator Pvt. Ltd.",
	bank: "HDFC Bank Ltd.",
	account: "50200061234789",
	ifsc: "HDFC0001234",
	branch: "Naroda, Ahmedabad",
	upi: "aayushelevator@hdfcbank"
};
var baseTerms = `Prices are ex-works Ahmedabad; transportation to site included within Gujarat.
Civil, electrical and structural works up to lift pit, machine room and shaft are in client's scope.
Delivery: 10–12 weeks from receipt of advance and approved drawings.
Installation time: 3–4 weeks after material reaches site and shaft is handed over.
GST and statutory levies as applicable at the time of invoicing.
Lift licence / inspection fees payable to Government authorities are extra at actuals.
Disputes subject to Ahmedabad jurisdiction only.`;
var columns = () => [
	{
		id: "desc",
		label: "Description",
		align: "left"
	},
	{
		id: "hsn",
		label: "HSN/SAC",
		align: "center",
		width: 70
	},
	{
		id: "qty",
		label: "Qty",
		align: "center",
		width: 45
	},
	{
		id: "unit",
		label: "Unit",
		align: "center",
		width: 45
	},
	{
		id: "rate",
		label: "Unit Rate",
		align: "right",
		width: 90
	},
	{
		id: "amount",
		label: "Amount",
		align: "right",
		width: 100
	}
];
function base(over) {
	const now = (/* @__PURE__ */ new Date()).toISOString();
	return {
		id: Math.random().toString(36).slice(2, 10),
		kind: "template",
		name: "Untitled",
		status: "Draft",
		createdAt: now,
		updatedAt: now,
		theme: {
			primary: "#12355b",
			accent: "#c8102e",
			text: "#1e293b",
			font: "'IBM Plex Sans', sans-serif",
			baseSize: 11
		},
		company: { ...company },
		meta: {
			number: "AE/Q/2026-27/001",
			date: now.slice(0, 10),
			validityDays: 30,
			reference: "",
			extra: []
		},
		customer: {
			society: "",
			contact: "",
			phone: "",
			email: "",
			address: "",
			gstin: "",
			extra: []
		},
		specs: [],
		columns: columns(),
		items: [],
		cellStyles: {},
		discountPct: 0,
		taxMode: "intra",
		milestones: [
			{
				id: "m1",
				label: "Advance along with purchase order",
				pct: 30
			},
			{
				id: "m2",
				label: "On delivery of material at site",
				pct: 50
			},
			{
				id: "m3",
				label: "On completion of erection",
				pct: 15
			},
			{
				id: "m4",
				label: "On testing & handover",
				pct: 5
			}
		],
		terms: baseTerms,
		warranty: "12 months from the date of handover or 18 months from date of supply, whichever is earlier, against manufacturing defects. Free maintenance service during warranty period.",
		exclusions: `Civil works, grouting, plastering and painting of shaft.
Three-phase power supply up to machine room / controller with isolator.
Scaffolding, pit waterproofing and machine room ventilation.
Any item not specifically mentioned in the scope above.`,
		bank: { ...bank },
		signatory: {
			name: "Rakesh Patel",
			designation: "Director – Sales"
		},
		footer: "Thank you for considering Aayush Elevator. We lift what matters. | This is a computer-generated quotation.",
		sections: defaultSections(),
		...over
	};
}
var specs = (arr) => arr.map(([label, value], i) => ({
	id: "s" + i,
	label,
	value
}));
function seedTemplates() {
	return [
		base({
			name: "Standard Installation – Passenger Lift",
			templateName: "Standard Installation",
			layout: "classic",
			theme: {
				primary: "#12355b",
				accent: "#c8102e",
				text: "#1e293b",
				font: "'IBM Plex Sans', sans-serif",
				baseSize: 11
			},
			specs: specs([
				["Type", "Passenger Elevator (MRL)"],
				["Capacity", "8 Persons / 544 kg"],
				["Speed", "1.0 m/s"],
				["Stops / Openings", "G+7 / 8 Stops, 8 Openings (same side)"],
				["Travel", "≈ 21.0 m"],
				["Drive", "Gearless PM Synchronous with VVVF"],
				["Door Type", "Automatic Centre Opening, SS Hairline, 800 mm"],
				["Car Finish", "SS Hairline walls, mirror rear, granite flooring"],
				["Controller", "Microprocessor based, ARD"]
			]),
			items: [
				it("Gearless machine with VVVF controller, ARD and complete wiring", "8428", 1, 685e3, "Set"),
				it("Elevator car with SS hairline finish, false ceiling and LED lighting", "8431", 1, 245e3, "Set"),
				it("Automatic centre-opening landing doors – SS hairline", "8431", 8, 38500, "Nos"),
				it("Guide rails, brackets, counterweight, ropes and pit equipment", "8431", 1, 172e3, "Set"),
				it("Installation, testing & commissioning", "9987", 1, 95e3, "Job")
			]
		}),
		base({
			name: "Modernization – Existing Lift Upgrade",
			templateName: "Modernization",
			layout: "bold-banner",
			theme: {
				primary: "#0f172a",
				accent: "#f59e0b",
				text: "#1e293b",
				font: "'IBM Plex Sans', sans-serif",
				baseSize: 11
			},
			specs: specs([
				["Existing System", "Geared AC-2 speed, relay logic"],
				["Proposed Drive", "Gearless PM with VVVF"],
				["Capacity", "6 Persons / 408 kg"],
				["Speed", "0.7 m/s → 1.0 m/s"],
				["Stops", "G+4 / 5 Stops"],
				["Door Type", "Manual swing → Automatic telescopic"]
			]),
			items: [
				it("Dismantling of old machine, controller and wiring", "9987", 1, 28e3, "Job"),
				it("New gearless machine with VVVF controller & ARD", "8428", 1, 395e3, "Set"),
				it("Automatic telescopic landing doors with car door operator", "8431", 5, 42e3, "Nos"),
				it("COP/LOP with digital display and new travelling cable", "8537", 1, 48500, "Set"),
				it("Installation, testing & commissioning", "9987", 1, 65e3, "Job")
			]
		}),
		base({
			name: "AMC – Comprehensive",
			templateName: "AMC Comprehensive",
			layout: "minimal",
			theme: {
				primary: "#065f46",
				accent: "#10b981",
				text: "#111827",
				font: "'Source Serif 4', Georgia, serif",
				baseSize: 11
			},
			specs: specs([
				["Lift Make", "Any / Multi-brand"],
				["No. of Lifts", "2"],
				["Visits", "Monthly preventive maintenance"],
				["Breakdown Response", "Within 4 hours, 24×7"]
			]),
			items: [it("Comprehensive annual maintenance incl. spares (excluding ropes & major civil)", "998717", 2, 42e3, "Lift/yr")],
			milestones: [{
				id: "m1",
				label: "Quarterly in advance",
				pct: 100
			}],
			warranty: "All spares replaced under the contract carry warranty until the contract end date."
		}),
		base({
			name: "AMC – Non-Comprehensive",
			templateName: "AMC Non-Comprehensive",
			layout: "split-header",
			theme: {
				primary: "#1e3a5f",
				accent: "#e85d04",
				text: "#1e293b",
				font: "'IBM Plex Sans', sans-serif",
				baseSize: 11
			},
			specs: specs([
				["Lift Make", "Any / Multi-brand"],
				["No. of Lifts", "1"],
				["Visits", "Monthly preventive maintenance"],
				["Spares", "Charged extra on actuals"]
			]),
			items: [it("Non-comprehensive annual maintenance (labour & lubricants only)", "998717", 1, 18e3, "Lift/yr")],
			milestones: [{
				id: "m1",
				label: "100% advance on signing contract",
				pct: 100
			}]
		}),
		base({
			name: "Repair Work",
			templateName: "Repair Work",
			layout: "modern-card",
			theme: {
				primary: "#312e81",
				accent: "#7c3aed",
				text: "#1e293b",
				font: "'IBM Plex Sans', sans-serif",
				baseSize: 11
			},
			specs: specs([["Lift Location", "Tower B"], ["Issue Reported", "Door not closing, frequent trips"]]),
			items: [
				it("Replacement of car door operator motor", "8501", 1, 24500, "Nos"),
				it("Door hanger rollers set", "8431", 4, 1850, "Nos"),
				it("Service charges", "998717", 1, 6500, "Job")
			],
			milestones: [{
				id: "m1",
				label: "Advance",
				pct: 50
			}, {
				id: "m2",
				label: "On completion",
				pct: 50
			}]
		}),
		base({
			name: "Escalator Supply & Installation",
			templateName: "Escalator Installation",
			layout: "formal",
			theme: {
				primary: "#7f1d1d",
				accent: "#b45309",
				text: "#1c1917",
				font: "'Source Serif 4', Georgia, serif",
				baseSize: 11
			},
			specs: specs([
				["Type", "Passenger Escalator (Indoor)"],
				["Rise", "3.0 m (Approx.)"],
				["Angle", "30°"],
				["Speed", "0.5 m/s"],
				["Width", "1000 mm (step width 600 mm)"],
				["Step Finish", "Aluminium comb, stainless steel sides"],
				["Handrail", "Black rubber, balustrade SS"],
				["Drive", "Geared with VVVF, auto-start sensor"]
			]),
			items: [
				it("Escalator unit – complete with drive & controls", "8428", 1, 185e4, "Set"),
				it("Civil pit drawings, supervision & coordination", "9987", 1, 35e3, "Job"),
				it("Balustrade panels & handrail extensions (per site)", "8431", 1, 65e3, "Set"),
				it("Installation, testing & commissioning", "9987", 1, 145e3, "Job"),
				it("First year preventive maintenance (post warranty)", "998717", 1, 55e3, "Year")
			],
			milestones: [
				{
					id: "m1",
					label: "Advance with purchase order",
					pct: 30
				},
				{
					id: "m2",
					label: "On dispatch from factory",
					pct: 40
				},
				{
					id: "m3",
					label: "On completion of installation",
					pct: 20
				},
				{
					id: "m4",
					label: "On testing & handover",
					pct: 10
				}
			],
			warranty: "24 months from date of commissioning against manufacturing defects. Includes two free preventive maintenance visits per year during warranty."
		}),
		base({
			name: "Clean & Professional",
			templateName: "Clean Professional",
			layout: "minimal",
			theme: {
				primary: "#0f172a",
				accent: "#3b82f6",
				text: "#1e293b",
				font: "'IBM Plex Sans', sans-serif",
				baseSize: 11
			},
			specs: [],
			items: [it("Basic Item 1", "001", 1, 1e4, "Nos"), it("Basic Item 2", "002", 1, 25e3, "Nos")],
			sections: [
				S("header", "Company Header"),
				S("items", "Scope of Supply"),
				S("footer", "Footer")
			]
		})
	];
}
function seedQuotations(tpls) {
	const mk = (t, n, cust, status, daysAgo, disc = 0, tax = "intra") => {
		const d = (/* @__PURE__ */ new Date(Date.now() - daysAgo * 864e5)).toISOString();
		const c = structuredClone(t);
		return {
			...c,
			id: Math.random().toString(36).slice(2, 10),
			kind: "quotation",
			status,
			createdAt: d,
			updatedAt: d,
			name: `${cust.society} – ${t.templateName}`,
			discountPct: disc,
			taxMode: tax,
			meta: {
				...c.meta,
				number: `AE/Q/2026-27/${String(n).padStart(3, "0")}`,
				date: d.slice(0, 10)
			},
			customer: {
				...c.customer,
				...cust
			}
		};
	};
	return [
		mk(tpls[0], 118, {
			society: "Shivalik Heights Co-op Housing Society",
			contact: "Mr. Hitesh Shah (Secretary)",
			phone: "+91 98240 11223",
			email: "shivalikheights@gmail.com",
			address: "Near Prahladnagar Garden, Satellite, Ahmedabad 380015",
			gstin: ""
		}, "Sent", 2, 5),
		mk(tpls[1], 117, {
			society: "Gokul Residency",
			contact: "Mrs. Priya Desai",
			phone: "+91 99090 45612",
			email: "gokulresidency@yahoo.in",
			address: "Bhatar Road, Surat 395017",
			gstin: ""
		}, "Accepted", 9),
		mk(tpls[2], 116, {
			society: "Nirmal Business Park",
			contact: "Mr. Anil Mehta (Facility Mgr)",
			phone: "+91 90990 77881",
			email: "facility@nirmalpark.com",
			address: "S.G. Highway, Ahmedabad 380054",
			gstin: "24AABFN1234K1Z2"
		}, "Draft", 14),
		mk(tpls[4], 115, {
			society: "Sai Krupa Apartments",
			contact: "Mr. Rohit Joshi",
			phone: "+91 97250 33410",
			email: "",
			address: "Kalawad Road, Rajkot 360005",
			gstin: ""
		}, "Rejected", 21),
		mk(tpls[0], 114, {
			society: "Skyline Infra Projects LLP",
			contact: "Mr. Vikram Rao",
			phone: "+91 98190 55667",
			email: "projects@skylineinfra.in",
			address: "Andheri East, Mumbai 400069",
			gstin: "27AAKFS9876L1Z4"
		}, "Sent", 30, 3, "inter")
	];
}
function blankSection(type) {
	if (type === "custom_table") return S(type, sectionLabels[type], {
		columns: [{
			id: "c1",
			label: "Column 1",
			align: "left"
		}, {
			id: "c2",
			label: "Column 2",
			align: "left"
		}],
		items: [{
			id: "r1",
			cells: {
				c1: "Value 1",
				c2: "Value 2"
			}
		}]
	});
	return S(type, sectionLabels[type], type === "custom" ? { content: "Write your content here…" } : {});
}
function createBlankTemplate() {
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
var uid = () => Math.random().toString(36).slice(2, 10);
var inr = (n) => "₹ " + (isFinite(n) ? n : 0).toLocaleString("en-IN", {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});
var ones = [
	"",
	"One",
	"Two",
	"Three",
	"Four",
	"Five",
	"Six",
	"Seven",
	"Eight",
	"Nine",
	"Ten",
	"Eleven",
	"Twelve",
	"Thirteen",
	"Fourteen",
	"Fifteen",
	"Sixteen",
	"Seventeen",
	"Eighteen",
	"Nineteen"
];
var tens = [
	"",
	"",
	"Twenty",
	"Thirty",
	"Forty",
	"Fifty",
	"Sixty",
	"Seventy",
	"Eighty",
	"Ninety"
];
function two(n) {
	return n < 20 ? ones[n] : tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
}
function three(n) {
	const h = Math.floor(n / 100), r = n % 100;
	return (h ? ones[h] + " Hundred" + (r ? " " : "") : "") + (r ? two(r) : "");
}
function intWords(n) {
	if (n === 0) return "Zero";
	const parts = [];
	const crore = Math.floor(n / 1e7);
	n %= 1e7;
	const lakh = Math.floor(n / 1e5);
	n %= 1e5;
	const th = Math.floor(n / 1e3);
	n %= 1e3;
	if (crore) parts.push(intWords(crore) + " Crore");
	if (lakh) parts.push(two(lakh) + " Lakh");
	if (th) parts.push(two(th) + " Thousand");
	if (n) parts.push(three(n));
	return parts.join(" ");
}
function amountInWords(n) {
	const r = Math.floor(n), p = Math.round((n - r) * 100);
	return "Rupees " + intWords(r) + (p ? " and " + two(p) + " Paise" : "") + " Only";
}
var num = (s) => {
	const v = parseFloat(String(s ?? "").replace(/,/g, ""));
	return isNaN(v) ? 0 : v;
};
function calc(q) {
	const lines = q.items.map((it) => num(it.cells["qty"]) * num(it.cells["rate"]));
	const subtotal = lines.reduce((a, b) => a + b, 0);
	const discount = subtotal * q.discountPct / 100;
	const taxable = subtotal - discount;
	const cgst = q.taxMode === "intra" ? taxable * .09 : 0;
	const sgst = cgst;
	const igst = q.taxMode === "inter" ? taxable * .18 : 0;
	return {
		lines,
		subtotal,
		discount,
		taxable,
		cgst,
		sgst,
		igst,
		total: Math.round(taxable + cgst + sgst + igst)
	};
}
function boxCss(s = {}) {
	const o = {
		background: s.bg || void 0,
		color: s.color || void 0,
		fontSize: s.fontSize ? `${s.fontSize}px` : void 0,
		textAlign: s.align,
		border: s.borderWidth ? `${s.borderWidth}px solid ${s.borderColor || "#cbd5e1"}` : void 0,
		padding: s.padding != null ? `${s.padding}px` : void 0,
		marginTop: s.marginTop != null ? `${s.marginTop}px` : void 0,
		fontWeight: s.bold ? 700 : void 0
	};
	Object.keys(o).forEach((k) => o[k] === void 0 && delete o[k]);
	return o;
}
var fmtDate = (d) => {
	const x = new Date(d);
	return isNaN(+x) ? d : x.toLocaleDateString("en-IN", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	});
};
var KEY = "aayush-quotes-v1";
var cache = null;
var listeners = /* @__PURE__ */ new Set();
function load() {
	if (cache) return cache;
	try {
		const raw = localStorage.getItem(KEY);
		if (raw) {
			cache = JSON.parse(raw);
			return cache;
		}
	} catch {}
	const t = seedTemplates();
	cache = [...t, ...seedQuotations(t)];
	localStorage.setItem(KEY, JSON.stringify(cache));
	return cache;
}
function persist(next) {
	cache = next;
	localStorage.setItem(KEY, JSON.stringify(next));
	listeners.forEach((l) => l());
}
function useQuotes() {
	const [list, setList] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const f = () => setList([...load()]);
		f();
		listeners.add(f);
		return () => {
			listeners.delete(f);
		};
	}, []);
	return list;
}
var saveQuote = (q) => {
	const all = load();
	const u = {
		...q,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	persist(all.some((x) => x.id === q.id) ? all.map((x) => x.id === q.id ? u : x) : [u, ...all]);
};
var deleteQuote = (id) => persist(load().filter((x) => x.id !== id));
function duplicateQuote(q, kind = q.kind) {
	const all = load();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const nextNo = all.filter((x) => x.kind === "quotation").length + 114;
	const c = {
		...structuredClone(q),
		id: uid(),
		kind,
		status: "Draft",
		createdAt: now,
		updatedAt: now,
		name: kind === q.kind ? q.name + " (Copy)" : q.name
	};
	if (kind === "quotation") {
		c.meta.number = `AE/Q/2026-27/${String(nextNo).padStart(3, "0")}`;
		c.meta.date = now.slice(0, 10);
		c.templateName = q.kind === "template" ? q.templateName ?? q.name : q.templateName;
	}
	persist([c, ...all]);
	return c;
}
//#endregion
export { amountInWords as a, fmtDate as c, uid as d, blankSection as f, useQuotes as i, inr as l, sectionLabels as m, duplicateQuote as n, boxCss as o, data_exports as p, saveQuote as r, calc as s, deleteQuote as t, num as u };
