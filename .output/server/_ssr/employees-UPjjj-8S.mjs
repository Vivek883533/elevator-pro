import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { a as Trash2, d as Search, g as Plus } from "../_libs/lucide-react.mjs";
import { t as AppHeader } from "./AppHeader-BMADNjug.mjs";
import { o as upsertEmployee, s as useAttendance, t as deleteEmployee } from "./store-DIT1uomK.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employees-UPjjj-8S.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
var inp = "h-8 w-full rounded-md border border-transparent bg-transparent px-2 text-sm hover:border-input focus:border-input focus:bg-background focus:outline-none";
function EmployeesPage() {
	const db = useAttendance();
	const [q, setQ] = (0, import_react.useState)("");
	const [draft, setDraft] = (0, import_react.useState)({
		name: "",
		role: "",
		phone: ""
	});
	const list = (db?.employees ?? []).filter((e) => (e.name + e.role + e.phone).toLowerCase().includes(q.toLowerCase()));
	const upd = (e, p) => upsertEmployee({
		...e,
		...p
	});
	const add = () => {
		if (!draft.name.trim()) {
			toast.error("Enter a name");
			return;
		}
		upsertEmployee({
			id: "e" + Date.now().toString(36),
			...draft,
			active: true
		});
		setDraft({
			name: "",
			role: "",
			phone: ""
		});
		toast.success("Employee added");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, { subtitle: "Employee Directory" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-5xl space-y-4 px-6 py-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-bold",
					children: "Employee Directory"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Active employees appear on attendance sheets automatically. Inactive employees keep their past attendance."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2 top-2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search",
						className: "h-8 w-56 rounded-md border border-input bg-card pl-8 pr-2 text-sm"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-lg border border-border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-muted text-left text-xs uppercase tracking-wider text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Role / Designation"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Phone"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "w-10" })
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
						!db && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 5,
							className: "p-6 text-center text-muted-foreground",
							children: "Loading…"
						}) }),
						list.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border " + (e.active ? "" : "opacity-60"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "h-8 w-full rounded-md border border-transparent bg-transparent px-2 text-sm hover:border-input focus:border-input focus:bg-background focus:outline-none font-medium",
										value: e.name,
										onChange: (x) => upd(e, { name: x.target.value })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: inp,
										value: e.role,
										onChange: (x) => upd(e, { role: x.target.value })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "h-8 w-full rounded-md border border-transparent bg-transparent px-2 text-sm hover:border-input focus:border-input focus:bg-background focus:outline-none font-mono",
										value: e.phone,
										onChange: (x) => upd(e, { phone: x.target.value })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-2 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											checked: e.active,
											onCheckedChange: (v) => upd(e, { active: v })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: e.active ? "text-success" : "text-muted-foreground",
											children: e.active ? "Active" : "Inactive"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										title: "Delete",
										onClick: () => {
											if (confirm(`Delete ${e.name}? Consider marking Inactive to keep history.`)) deleteEmployee(e.id);
										},
										className: "rounded p-1.5 text-muted-foreground hover:bg-accent hover:text-destructive",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})
								})
							]
						}, e.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border bg-muted/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "h-8 w-full rounded-md border border-transparent bg-transparent px-2 text-sm hover:border-input focus:border-input focus:bg-background focus:outline-none border-input bg-background",
										placeholder: "Full name",
										value: draft.name,
										onChange: (x) => setDraft({
											...draft,
											name: x.target.value
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "h-8 w-full rounded-md border border-transparent bg-transparent px-2 text-sm hover:border-input focus:border-input focus:bg-background focus:outline-none border-input bg-background",
										placeholder: "Role",
										value: draft.role,
										onChange: (x) => setDraft({
											...draft,
											role: x.target.value
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "h-8 w-full rounded-md border border-transparent bg-transparent px-2 text-sm hover:border-input focus:border-input focus:bg-background focus:outline-none border-input bg-background",
										placeholder: "Phone",
										value: draft.phone,
										onChange: (x) => setDraft({
											...draft,
											phone: x.target.value
										}),
										onKeyDown: (x) => x.key === "Enter" && add()
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-1.5",
									colSpan: 2,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										onClick: add,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Add employee"]
									})
								})
							]
						})
					] })]
				})
			})]
		})]
	});
}
//#endregion
export { EmployeesPage as component };
