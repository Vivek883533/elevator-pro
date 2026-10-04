import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { A as CheckCheck, D as ChevronRight, O as ChevronLeft, h as Printer, r as X, w as FileDown } from "../_libs/lucide-react.mjs";
import { t as AppHeader } from "./AppHeader-BMADNjug.mjs";
import { a as sheetEmployees, c as ymd, i as setStatus, n as rkey, r as setMany, s as useAttendance } from "./store-DIT1uomK.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/@radix-ui/react-popover+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/attendance-CycL4wv4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Popover = Root2;
var PopoverTrigger = Trigger;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = Content2.displayName;
var MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
var DOW = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
];
var parse = (s) => {
	const [y, m, d] = s.split("-").map(Number);
	return new Date(y, m - 1, d);
};
var addDays = (s, n) => {
	const d = parse(s);
	d.setDate(d.getDate() + n);
	return ymd(d);
};
var monday = (s) => {
	const d = parse(s);
	const off = (d.getDay() + 6) % 7;
	d.setDate(d.getDate() - off);
	return ymd(d);
};
var monthDates = (y, m) => Array.from({ length: new Date(y, m + 1, 0).getDate() }, (_, i) => ymd(new Date(y, m, i + 1)));
var isSun = (s) => parse(s).getDay() === 0;
var statusCls = {
	P: "bg-success text-success-foreground",
	A: "bg-destructive text-destructive-foreground",
	HD: "bg-warning text-warning-foreground"
};
var statusName = {
	P: "Present",
	A: "Absent",
	HD: "Half Day"
};
function Cell({ date, emp, value, size = "md" }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const pick = (s) => {
		setStatus(date, emp.id, s);
		setOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": `${emp.name} ${date}`,
				className: cn("grid place-items-center rounded font-bold transition hover:ring-2 hover:ring-ring", size === "sm" ? "h-7 w-8 text-[11px]" : "h-9 w-14 text-sm", value ? statusCls[value] : "border border-dashed border-input text-muted-foreground/50"),
				children: value ?? "–"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
			className: "w-auto p-2",
			align: "center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-1.5 text-center text-[11px] text-muted-foreground",
				children: [
					emp.name,
					" ·",
					" ",
					parse(date).toLocaleDateString("en-IN", {
						day: "numeric",
						month: "short"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-1.5",
				children: [[
					"P",
					"A",
					"HD"
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => pick(s),
					className: cn("flex w-16 flex-col items-center rounded-md py-1.5 font-bold", statusCls[s], value === s && "ring-2 ring-foreground ring-offset-1"),
					children: [s, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-medium opacity-90",
						children: statusName[s]
					})]
				}, s)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => pick(null),
					className: "flex w-14 flex-col items-center rounded-md border border-border py-1.5 text-muted-foreground hover:bg-accent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px]",
						children: "Clear"
					})]
				})]
			})]
		})]
	});
}
function AttendancePage() {
	const db = useAttendance();
	const [view, setView] = (0, import_react.useState)("day");
	const [date, setDate] = (0, import_react.useState)("");
	const [ym, setYm] = (0, import_react.useState)({
		y: 2026,
		m: 0
	});
	const [printMode, setPrintMode] = (0, import_react.useState)("filled");
	const [printReq, setPrintReq] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const t = /* @__PURE__ */ new Date();
		setDate(ymd(t));
		setYm({
			y: t.getFullYear(),
			m: t.getMonth()
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (!printReq) return;
		const old = document.title;
		document.title = `Attendance ${MONTHS[ym.m]} ${ym.y}${printMode === "blank" ? " (Blank)" : ""}`;
		const t = setTimeout(() => {
			window.print();
			document.title = old;
		}, 100);
		return () => clearTimeout(t);
	}, [printReq]);
	if (!db || !date) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, { subtitle: "Attendance" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "p-10 text-center text-muted-foreground",
			children: "Loading…"
		})]
	});
	const rec = (d, id) => db.records[rkey(d, id)];
	const weekDates = Array.from({ length: 7 }, (_, i) => addDays(monday(date), i));
	const mDates = monthDates(ym.y, ym.m);
	const dates = view === "day" ? [date] : view === "week" ? weekDates : mDates;
	const emps = sheetEmployees(db, dates);
	const count = (id, s) => dates.filter((d) => rec(d, id) === s).length;
	const shiftMonth = (n) => {
		const d = new Date(ym.y, ym.m + n, 1);
		setYm({
			y: d.getFullYear(),
			m: d.getMonth()
		});
	};
	const dayTotals = {
		P: 0,
		A: 0,
		HD: 0,
		none: 0
	};
	if (view === "day") emps.forEach((e) => {
		const s = rec(date, e.id);
		if (s) dayTotals[s]++;
		else dayTotals.none++;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, { subtitle: "Attendance Management" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "no-print mx-auto max-w-7xl space-y-4 px-6 py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-flex rounded-lg border border-border bg-card p-1",
							children: [
								["day", "Today"],
								["week", "This Week"],
								["month", "This Month"]
							].map(([v, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setView(v),
								className: cn("rounded-md px-4 py-1.5 text-sm font-medium", view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"),
								children: l
							}, v))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => {
									setPrintMode("blank");
									setPrintReq((n) => n + 1);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" }), "Blank Sheet"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => {
									setPrintMode("filled");
									setPrintReq((n) => n + 1);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, { className: "h-4 w-4" }), "Filled Sheet (PDF / Print)"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-3",
						children: [view !== "month" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "rounded p-1.5 hover:bg-accent",
								onClick: () => setDate(addDays(date, view === "day" ? -1 : -7)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								value: date,
								onChange: (e) => e.target.value && setDate(e.target.value),
								className: "h-8 rounded-md border border-input bg-background px-2 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "rounded p-1.5 hover:bg-accent",
								onClick: () => setDate(addDays(date, view === "day" ? 1 : 7)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-semibold",
								children: view === "day" ? parse(date).toLocaleDateString("en-IN", {
									weekday: "long",
									day: "numeric",
									month: "long",
									year: "numeric"
								}) : `Week: ${parse(weekDates[0]).toLocaleDateString("en-IN", {
									day: "numeric",
									month: "short"
								})} – ${parse(weekDates[6]).toLocaleDateString("en-IN", {
									day: "numeric",
									month: "short",
									year: "numeric"
								})}`
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "rounded p-1.5 hover:bg-accent",
								onClick: () => shiftMonth(-1),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: ym.m,
								onChange: (e) => setYm({
									...ym,
									m: Number(e.target.value)
								}),
								className: "h-8 rounded-md border border-input bg-background px-2 text-sm",
								children: MONTHS.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: i,
									children: m
								}, m))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: ym.y,
								onChange: (e) => setYm({
									...ym,
									y: Number(e.target.value) || ym.y
								}),
								className: "h-8 w-20 rounded-md border border-input bg-background px-2 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "rounded p-1.5 hover:bg-accent",
								onClick: () => shiftMonth(1),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm text-muted-foreground",
								children: [mDates.length, " days"]
							})
						] }), view === "day" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: [
									"P ",
									dayTotals.P,
									" · A ",
									dayTotals.A,
									" · HD ",
									dayTotals.HD,
									" · Unmarked",
									" ",
									dayTotals.none
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => {
									setMany(date, emps.filter((e) => e.active).map((e) => e.id), "P");
									toast.success("All marked present");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-4 w-4" }), "Mark All Present"]
							})]
						})]
					}),
					view === "day" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-lg border border-border bg-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "bg-muted text-left text-xs uppercase tracking-wider text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "w-10 p-3",
										children: "#"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Employee"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Role"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3 text-center",
										children: "Status"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: emps.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 text-muted-foreground",
										children: i + 1
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "p-3 font-medium",
										children: [e.name, !e.active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-2 text-xs text-muted-foreground",
											children: "(inactive)"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 text-muted-foreground",
										children: e.role
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
												date,
												emp: e,
												value: rec(date, e.id)
											})
										})
									})
								]
							}, e.id)) })]
						})
					}),
					view !== "day" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto rounded-lg border border-border bg-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "border-separate border-spacing-0 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "sticky left-0 z-10 min-w-[190px] border-b border-r border-border bg-muted p-2 text-left uppercase tracking-wider",
										children: "Employee"
									}),
									dates.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
										className: cn("border-b border-border p-1 text-center font-medium", isSun(d) ? "bg-sunday" : "bg-muted", view === "week" && "min-w-[70px]"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] uppercase",
											children: DOW[parse(d).getDay()]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-bold text-foreground",
											children: parse(d).getDate()
										})]
									}, d)),
									[
										"P",
										"A",
										"HD"
									].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "min-w-[44px] border-b border-l border-border bg-muted p-1 text-center",
										title: statusName[s],
										children: s
									}, s))
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: emps.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "sticky left-0 z-10 border-b border-r border-border bg-card px-2 py-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate font-medium",
										children: e.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "truncate text-[11px] text-muted-foreground",
										children: [e.role, !e.active && " · inactive"]
									})]
								}),
								dates.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: cn("border-b border-border p-0.5", isSun(d) && "bg-sunday"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
											date: d,
											emp: e,
											value: rec(d, e.id),
											size: view === "month" ? "sm" : "md"
										})
									})
								}, d)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "border-b border-l border-border text-center font-mono font-bold text-success",
									children: count(e.id, "P")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "border-b border-l border-border text-center font-mono font-bold text-destructive",
									children: count(e.id, "A")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "border-b border-l border-border text-center font-mono font-bold text-warning",
									children: count(e.id, "HD")
								})
							] }, e.id)) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Click any cell to choose P (Present), A (Absent) or HD (Half Day). Printed sheets use the selected month."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrintSheet, {
				mode: printMode,
				y: ym.y,
				m: ym.m,
				emps: sheetEmployees(db, printMode === "filled" ? mDates : []),
				rec
			})
		]
	});
}
function PrintSheet({ mode, y, m, emps, rec }) {
	const dates = monthDates(y, m);
	const blank = mode === "blank";
	const rows = blank ? [...emps, ...Array.from({ length: Math.max(0, 3) }, () => null)] : emps;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "print-only att-print",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "att-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
					style: { fontSize: 15 },
					children: "Aayush Elevator Pvt. Ltd."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Attendance Register ", blank ? "(Site Copy)" : ""] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { textAlign: "right" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
						style: { fontSize: 14 },
						children: [
							MONTHS[m],
							" ",
							y
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Site: ____________________" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "att-table",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("colgroup", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "4%" } }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "15%" } }),
						dates.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", {}, d)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "3%" } }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "3%" } }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "3%" } })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "#" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							style: { textAlign: "left" },
							children: "Employee"
						}),
						dates.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
							className: isSun(d) ? "sun" : "",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: { fontSize: 6 },
								children: DOW[parse(d).getDay()].slice(0, 2)
							}), parse(d).getDate()]
						}, d)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "P" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "A" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "HD" })
					] }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: { textAlign: "center" },
							children: i + 1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: { textAlign: "left" },
							children: e?.name ?? ""
						}),
						dates.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: isSun(d) ? "sun" : "",
							children: !blank && e ? rec(d, e.id) ?? "" : ""
						}, d)),
						[
							"P",
							"A",
							"HD"
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: !blank && e ? dates.filter((d) => rec(d, e.id) === s).length : "" }) }, s))
					] }, e?.id ?? "x" + i)) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "att-foot",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "P = Present · A = Absent · HD = Half Day" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Supervisor Signature: ____________________" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Authorised Signatory: ____________________" })
				]
			})
		]
	});
}
//#endregion
export { AttendancePage as component };
