import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as FileText, T as Copy, _ as Pencil, a as Trash2, d as Search, g as Plus, h as Printer, i as Wrench, j as Building2, l as ShieldCheck, m as RefreshCcw, x as Layers } from "../_libs/lucide-react.mjs";
import { t as AppHeader } from "./AppHeader-BMADNjug.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as fmtDate, i as useQuotes, l as inr, n as duplicateQuote, r as saveQuote, s as calc, t as deleteQuote } from "./store-Cx9hqypI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BP7Szbra.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var icons = {
	"Standard Installation": Building2,
	Modernization: RefreshCcw,
	"AMC Comprehensive": ShieldCheck,
	"AMC Non-Comprehensive": ShieldCheck,
	"Repair Work": Wrench
};
var statusCls = {
	Draft: "bg-muted text-muted-foreground",
	Sent: "bg-info/15 text-info",
	Accepted: "bg-success/15 text-success",
	Rejected: "bg-destructive/10 text-destructive"
};
function Dashboard() {
	const list = useQuotes();
	const navigate = useNavigate();
	const [qs, setQs] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("All");
	const templates = list?.filter((x) => x.kind === "template") ?? [];
	const quotes = (0, import_react.useMemo)(() => (list ?? []).filter((x) => x.kind === "quotation").filter((x) => status === "All" || x.status === status).filter((x) => (x.name + x.meta.number + x.customer.society).toLowerCase().includes(qs.toLowerCase())).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)), [
		list,
		qs,
		status
	]);
	const all = list?.filter((x) => x.kind === "quotation") ?? [];
	const pipeline = all.filter((x) => x.status === "Sent").reduce((a, x) => a + calc(x).total, 0);
	const won = all.filter((x) => x.status === "Accepted").reduce((a, x) => a + calc(x).total, 0);
	const go = (id) => navigate({
		to: "/editor/$id",
		params: { id }
	});
	const fromTemplate = (t) => {
		const c = duplicateQuote(t, "quotation");
		toast.success("Quotation created from " + t.name);
		go(c.id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, { subtitle: "Quotation Maker" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-7xl space-y-10 px-6 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-3",
					children: [
						["Quotations", String(all.length)],
						["Open pipeline", inr(pipeline)],
						["Won value", inr(won)]
					].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 font-mono text-2xl font-semibold",
							children: list ? v : "—"
						})]
					}, k))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-bold",
						children: "Templates"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Create once, reuse forever. Pick a template to start a new quotation."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => {
							import("./store-Cx9hqypI.mjs").then((n) => n.p).then(({ createBlankTemplate }) => {
								const t = createBlankTemplate();
								saveQuote(t);
								toast.success("Blank template created");
								go(t.id);
							});
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-1" }), "New Blank Template"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
					children: templates.map((t) => {
						const I = icons[t.templateName ?? ""] ?? Layers;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group flex flex-col rounded-lg border border-border bg-card p-4 transition hover:border-primary hover:shadow-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-3 flex items-start justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I, { className: "h-5 w-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex opacity-60 group-hover:opacity-100",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												title: "Edit template",
												onClick: () => go(t.id),
												className: "rounded p-1 hover:bg-accent",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												title: "Duplicate",
												onClick: () => {
													duplicateQuote(t);
													toast.success("Template duplicated");
												},
												className: "rounded p-1 hover:bg-accent",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												title: "Delete",
												onClick: () => {
													if (confirm("Delete template?")) deleteQuote(t.id);
												},
												className: "rounded p-1 hover:bg-accent hover:text-destructive",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold leading-snug",
									children: t.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-3 mt-1 text-xs text-muted-foreground",
									children: [
										t.items.length,
										" items ·",
										" ",
										t.sections.filter((s) => s.visible).length,
										" sections"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									className: "mt-auto",
									onClick: () => fromTemplate(t),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Use template"]
								})
							]
						}, t.id);
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex flex-wrap items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-bold",
							children: "Quotation History"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "View, edit, duplicate or print previous quotations."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2 top-2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: qs,
									onChange: (e) => setQs(e.target.value),
									placeholder: "Search customer or number",
									className: "h-8 w-64 rounded-md border border-input bg-card pl-8 pr-2 text-sm"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: status,
								onChange: (e) => setStatus(e.target.value),
								className: "h-8 rounded-md border border-input bg-card px-2 text-sm",
								children: [
									"All",
									"Draft",
									"Sent",
									"Accepted",
									"Rejected"
								].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-lg border border-border bg-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "bg-muted text-left text-xs uppercase tracking-wider text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Quotation No."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Customer / Site"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Type"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Date"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3 text-right",
										children: "Grand Total"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-3" })
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
								!list && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 7,
									className: "p-6 text-center text-muted-foreground",
									children: "Loading…"
								}) }),
								list && quotes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 7,
									className: "p-6 text-center text-muted-foreground",
									children: "No quotations found."
								}) }),
								quotes.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "cursor-pointer border-t border-border hover:bg-muted/50",
									onClick: () => go(x.id),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 font-mono text-xs",
											children: x.meta.number
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-medium",
												children: x.customer.society || "—"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-muted-foreground",
												children: x.customer.contact
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 text-muted-foreground",
											children: x.templateName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 text-muted-foreground",
											children: fmtDate(x.meta.date)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 text-right font-mono font-medium",
											children: inr(calc(x).total)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("rounded-full px-2 py-0.5 text-xs font-semibold", statusCls[x.status]),
												children: x.status
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3",
											onClick: (e) => e.stopPropagation(),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-end gap-0.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/editor/$id",
														params: { id: x.id },
														title: "Edit",
														className: "rounded p-1.5 hover:bg-accent",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														title: "Duplicate",
														onClick: () => {
															duplicateQuote(x);
															toast.success("Quotation duplicated");
														},
														className: "rounded p-1.5 hover:bg-accent",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/editor/$id",
														params: { id: x.id },
														title: "Open to print",
														className: "rounded p-1.5 hover:bg-accent",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														title: "Delete",
														onClick: () => {
															if (confirm("Delete this quotation?")) deleteQuote(x.id);
														},
														className: "rounded p-1.5 hover:bg-accent hover:text-destructive",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
													})
												]
											})
										})
									]
								}, x.id))
							] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 flex items-center gap-1 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5" }), "Quotations are saved in this browser."]
					})
				] })
			]
		})]
	});
}
//#endregion
export { Dashboard as component };
