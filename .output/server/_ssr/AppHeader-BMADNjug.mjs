import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as X, y as Menu } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppHeader-BMADNjug.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var links = [
	{
		to: "/",
		label: "Quotations"
	},
	{
		to: "/attendance",
		label: "Attendance"
	},
	{
		to: "/employees",
		label: "Employee Directory"
	}
];
function AppHeader({ subtitle }) {
	const [navOpen, setNavOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "no-print border-b border-border bg-primary text-primary-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center gap-x-4 px-4 sm:px-6 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-10 w-10 shrink-0 place-items-center rounded-md border-b-4 border-highlight bg-primary-foreground font-extrabold text-primary",
						children: "AE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-lg font-bold leading-tight",
							children: "Aayush Elevator"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-xs opacity-75",
							children: subtitle
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden sm:flex gap-1",
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						activeOptions: { exact: true },
						className: "rounded-md px-3 py-1.5 text-sm font-medium opacity-80 hover:bg-primary-foreground/10 hover:opacity-100",
						activeProps: { className: "bg-primary-foreground/15 opacity-100" },
						children: l.label
					}, l.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "sm:hidden flex h-10 w-10 items-center justify-center rounded-md hover:bg-primary-foreground/10",
					"aria-label": navOpen ? "Close menu" : "Open menu",
					onClick: () => setNavOpen((o) => !o),
					children: navOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
				})
			]
		}), navOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "sm:hidden border-t border-primary-foreground/10 bg-primary px-4 py-2 flex flex-col gap-1",
			children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: l.to,
				activeOptions: { exact: true },
				className: "block rounded-md px-3 py-2.5 text-sm font-medium opacity-80 hover:bg-primary-foreground/10 hover:opacity-100",
				activeProps: { className: "bg-primary-foreground/15 opacity-100" },
				onClick: () => setNavOpen(false),
				children: l.label
			}, l.to))
		})]
	});
}
//#endregion
export { AppHeader as t };
