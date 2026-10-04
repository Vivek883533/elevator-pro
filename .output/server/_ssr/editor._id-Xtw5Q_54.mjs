import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as FilePlusCorner, E as ChevronUp, M as Bold, N as ArrowLeft, T as Copy, a as Trash2, b as Maximize, c as TextAlignCenter, f as Save, g as Plus, h as Printer, k as ChevronDown, n as ZoomIn, o as TextAlignStart, p as RotateCcw, r as X, s as TextAlignEnd, t as ZoomOut, u as Share2, v as Paintbrush, w as FileDown, y as Menu } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as amountInWords, c as fmtDate, d as uid, f as blankSection, i as useQuotes, l as inr, m as sectionLabels, n as duplicateQuote, o as boxCss, r as saveQuote, s as calc, u as num } from "./store-Cx9hqypI.mjs";
import { t as Route } from "./editor._id-pdOOnq0a.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/editor._id-Xtw5Q_54.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
function StyleEditor({ value, onChange }) {
	const set = (p) => onChange({
		...value,
		...p
	});
	const Color = ({ k, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex items-center gap-1.5 text-xs text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "color",
			value: value[k] || (k === "bg" ? "#ffffff" : "#1e293b"),
			onChange: (e) => set({ [k]: e.target.value }),
			className: "h-6 w-7 cursor-pointer rounded border border-input bg-transparent p-0"
		}), label]
	});
	const N = ({ k, label, max = 40 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-0.5 text-[10px] uppercase tracking-wide text-muted-foreground",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "number",
			min: 0,
			max,
			value: value[k] ?? "",
			placeholder: "auto",
			onChange: (e) => set({ [k]: e.target.value === "" ? void 0 : Number(e.target.value) }),
			className: "h-7 w-full rounded border border-input bg-background px-1.5 text-xs text-foreground"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 rounded-md border border-dashed border-border bg-muted/40 p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Color, {
					k: "bg",
					label: "Fill"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Color, {
					k: "color",
					label: "Text"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Color, {
					k: "borderColor",
					label: "Border"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex gap-0.5",
					children: [
						[
							["left", TextAlignStart],
							["center", TextAlignCenter],
							["right", TextAlignEnd]
						].map(([a, I]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => set({ align: value.align === a ? void 0 : a }),
							className: cn("rounded p-1 hover:bg-accent", value.align === a && "bg-primary text-primary-foreground hover:bg-primary"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I, { className: "h-3.5 w-3.5" })
						}, a)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => set({ bold: !value.bold }),
							className: cn("rounded p-1 hover:bg-accent", value.bold && "bg-primary text-primary-foreground hover:bg-primary"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bold, { className: "h-3.5 w-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							title: "Reset",
							onClick: () => onChange({}),
							className: "rounded p-1 hover:bg-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5" })
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-4 gap-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(N, {
					k: "fontSize",
					label: "Font px"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(N, {
					k: "borderWidth",
					label: "Border",
					max: 10
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(N, {
					k: "padding",
					label: "Padding"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(N, {
					k: "marginTop",
					label: "Margin",
					max: 80
				})
			]
		})]
	});
}
var ReactQuill = (0, import_react.lazy)(() => import("../_libs/react-quill-new.mjs").then((n) => n.t));
var inputCls = "h-8 w-full rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
function F({ label, value, onChange, type = "text" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-1 text-xs font-medium text-muted-foreground",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			value,
			onChange: (e) => onChange(e.target.value),
			className: "h-8 w-full rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
		})]
	});
}
function TA({ label, value, onChange, rows = 5 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-1 text-xs font-medium text-muted-foreground",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			rows,
			value,
			onChange: (e) => onChange(e.target.value),
			className: "w-full rounded-md border border-input bg-background px-2 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
		})]
	});
}
var G = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "grid grid-cols-1 min-[380px]:grid-cols-2 gap-2",
	children
});
var AddBtn = ({ onClick, children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
	type: "button",
	onClick,
	className: "inline-flex items-center gap-1 rounded-md border border-dashed border-primary/40 px-2 py-1 text-xs font-medium text-primary hover:bg-primary/5",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" }), children]
});
function Fields({ list, onChange, add = "Add field" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [list.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "h-8 w-full rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring w-2/5 font-medium",
					value: f.label,
					placeholder: "Label",
					onChange: (e) => onChange(list.map((x, j) => j === i ? {
						...x,
						label: e.target.value
					} : x))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputCls,
					value: f.value,
					placeholder: "Value",
					onChange: (e) => onChange(list.map((x, j) => j === i ? {
						...x,
						value: e.target.value
					} : x))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onChange(list.filter((_, j) => j !== i)),
					className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
				})
			]
		}, f.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddBtn, {
			onClick: () => onChange([...list, {
				id: uid(),
				label: "",
				value: ""
			}]),
			children: add
		})]
	});
}
function ItemsEditor({ q, upd }) {
	const [sel, setSel] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-md border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [q.columns.map((c, ci) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
							className: "min-w-[70px] p-1 text-left font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: c.label,
									onChange: (e) => upd((d) => {
										d.columns[ci].label = e.target.value;
									}),
									className: "w-full rounded bg-transparent px-1 py-0.5 font-semibold focus:bg-background"
								}), ![
									"desc",
									"qty",
									"rate",
									"amount"
								].includes(c.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									title: "Remove column",
									onClick: () => upd((d) => {
										d.columns.splice(ci, 1);
									}),
									className: "text-muted-foreground hover:text-destructive",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: c.align,
								onChange: (e) => upd((d) => {
									d.columns[ci].align = e.target.value;
								}),
								className: "mt-0.5 w-full rounded border border-input bg-background text-[10px] font-normal",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "left",
										children: "Left"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "center",
										children: "Center"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "right",
										children: "Right"
									})
								]
							})]
						}, c.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "w-6" })] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: q.items.map((it, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [q.columns.map((c) => {
							const key = `${it.id}:${c.id}`;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: cn("p-0.5", sel === key && "bg-accent/60 outline outline-2 outline-primary"),
								children: c.id === "amount" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSel(key),
									className: "w-full px-1 py-1 text-right text-muted-foreground",
									children: "auto"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: it.cells[c.id] ?? "",
									onFocus: () => setSel(key),
									onChange: (e) => upd((d) => {
										d.items[ri].cells[c.id] = e.target.value;
									}),
									className: "w-full rounded bg-transparent px-1 py-1 focus:bg-background focus:outline-none"
								})
							}, c.id);
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-0.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => upd((d) => {
									d.items.splice(ri, 1);
								}),
								className: "flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
							})
						})]
					}, it.id)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddBtn, {
					onClick: () => upd((d) => {
						d.items.push({
							id: uid(),
							cells: {
								qty: "1",
								rate: "0",
								unit: "Nos"
							}
						});
					}),
					children: "Add row"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddBtn, {
					onClick: () => upd((d) => {
						d.columns.splice(d.columns.length - 1, 0, {
							id: "c" + uid(),
							label: "New Column",
							align: "left"
						});
					}),
					children: "Add column"
				})]
			}),
			sel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-1 flex items-center gap-1 text-xs font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paintbrush, { className: "h-3 w-3" }), "Selected cell style"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyleEditor, {
				value: q.cellStyles[sel] ?? {},
				onChange: (s) => upd((d) => {
					d.cellStyles[sel] = s;
				})
			})] })
		]
	});
}
function CustomTableEditor({ s, q, upd }) {
	const [sel, setSel] = (0, import_react.useState)(null);
	const cols = s.columns || [];
	const items = s.items || [];
	const setCols = (fn) => upd((d) => {
		const sc = d.sections.find((x) => x.id === s.id);
		if (sc) {
			if (!sc.columns) sc.columns = [];
			fn(sc.columns);
		}
	});
	const setItems = (fn) => upd((d) => {
		const sc = d.sections.find((x) => x.id === s.id);
		if (sc) {
			if (!sc.items) sc.items = [];
			fn(sc.items);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-md border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [cols.map((c, ci) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
							className: "min-w-[70px] p-1 text-left font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: c.label,
									onChange: (e) => setCols((cs) => {
										cs[ci].label = e.target.value;
									}),
									className: "w-full rounded bg-transparent px-1 py-0.5 font-semibold focus:bg-background"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									title: "Remove column",
									onClick: () => setCols((cs) => {
										cs.splice(ci, 1);
									}),
									className: "text-muted-foreground hover:text-destructive",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: c.align,
								onChange: (e) => setCols((cs) => {
									cs[ci].align = e.target.value;
								}),
								className: "mt-0.5 w-full rounded border border-input bg-background text-[10px] font-normal",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "left",
										children: "Left"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "center",
										children: "Center"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "right",
										children: "Right"
									})
								]
							})]
						}, c.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "w-6" })] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: items.map((it, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [cols.map((c) => {
							const key = `${it.id}:${c.id}`;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: cn("p-0.5", sel === key && "bg-accent/60 outline outline-2 outline-primary"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: it.cells[c.id] ?? "",
									onFocus: () => setSel(key),
									onChange: (e) => setItems((is) => {
										is[ri].cells[c.id] = e.target.value;
									}),
									className: "w-full rounded bg-transparent px-1 py-1 focus:bg-background focus:outline-none"
								})
							}, c.id);
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-0.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setItems((is) => {
									is.splice(ri, 1);
								}),
								className: "flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
							})
						})]
					}, it.id)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddBtn, {
					onClick: () => setItems((is) => {
						is.push({
							id: uid(),
							cells: {}
						});
					}),
					children: "Add row"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddBtn, {
					onClick: () => setCols((cs) => {
						cs.push({
							id: "c" + uid(),
							label: "New Column",
							align: "left"
						});
					}),
					children: "Add column"
				})]
			}),
			sel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-1 flex items-center gap-1 text-xs font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paintbrush, { className: "h-3 w-3" }), "Selected cell style"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyleEditor, {
				value: q.cellStyles[sel] ?? {},
				onChange: (st) => upd((d) => {
					d.cellStyles[sel] = st;
				})
			})] })
		]
	});
}
function ClientOnlyQuill({ s, upd }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	if (!mounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-4 text-center text-muted-foreground",
		children: "Loading editor..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4 text-center text-muted-foreground",
			children: "Loading editor..."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReactQuill, {
			theme: "snow",
			value: s.content ?? "",
			onChange: (v) => upd((d) => {
				d.sections.find((x) => x.id === s.id).content = v;
			}),
			modules: { toolbar: [
				[{ header: [
					1,
					2,
					3,
					false
				] }],
				[
					"bold",
					"italic",
					"underline",
					"strike"
				],
				[{ list: "ordered" }, { list: "bullet" }],
				[{ color: [] }, { background: [] }],
				["link"],
				["clean"]
			] }
		})
	});
}
function SectionBody({ s, q, upd }) {
	switch (s.type) {
		case "header": {
			const c = q.company;
			const set = (k) => (v) => upd((d) => {
				d.company[k] = v;
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(G, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
						label: "Company name",
						value: c.name,
						onChange: set("name")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
						label: "Tagline",
						value: c.tagline,
						onChange: set("tagline")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
						label: "Address",
						value: c.address,
						onChange: set("address")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(G, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
							label: "Phone",
							value: c.phone,
							onChange: set("phone")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
							label: "Email",
							value: c.email,
							onChange: set("email")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
							label: "Website",
							value: c.website,
							onChange: set("website")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
							label: "GSTIN",
							value: c.gstin,
							onChange: set("gstin")
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1 text-xs font-medium text-muted-foreground",
						children: ["Logo (optional)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "image/*",
							className: "text-xs",
							onChange: (e) => {
								const f = e.target.files?.[0];
								if (!f) return;
								const r = new FileReader();
								r.onload = () => upd((d) => {
									d.company.logo = String(r.result);
								});
								r.readAsDataURL(f);
							}
						})]
					}),
					c.logo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-xs text-destructive",
						onClick: () => upd((d) => {
							d.company.logo = void 0;
						}),
						children: "Remove logo"
					})
				]
			});
		}
		case "meta": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(G, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
					label: "Quotation No.",
					value: q.meta.number,
					onChange: (v) => upd((d) => {
						d.meta.number = v;
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
					label: "Date",
					type: "date",
					value: q.meta.date,
					onChange: (v) => upd((d) => {
						d.meta.date = v;
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
					label: "Validity (days)",
					type: "number",
					value: q.meta.validityDays,
					onChange: (v) => upd((d) => {
						d.meta.validityDays = Number(v);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
					label: "Reference",
					value: q.meta.reference,
					onChange: (v) => upd((d) => {
						d.meta.reference = v;
					})
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fields, {
				list: q.meta.extra,
				onChange: (l) => upd((d) => {
					d.meta.extra = l;
				}),
				add: "Add custom field"
			})]
		});
		case "customer": {
			const c = q.customer;
			const set = (k) => (v) => upd((d) => {
				d.customer[k] = v;
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
						label: "Society / Project name",
						value: c.society,
						onChange: set("society")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(G, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
							label: "Contact person",
							value: c.contact,
							onChange: set("contact")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
							label: "Phone",
							value: c.phone,
							onChange: set("phone")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
							label: "Email",
							value: c.email,
							onChange: set("email")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
							label: "Customer GSTIN",
							value: c.gstin,
							onChange: set("gstin")
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
						label: "Site address",
						value: c.address,
						onChange: set("address")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fields, {
						list: c.extra,
						onChange: (l) => upd((d) => {
							d.customer.extra = l;
						}),
						add: "Add custom field"
					})
				]
			});
		}
		case "specs": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fields, {
			list: q.specs,
			onChange: (l) => upd((d) => {
				d.specs = l;
			}),
			add: "Add specification"
		});
		case "items": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemsEditor, {
			q,
			upd
		});
		case "totals": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(G, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
			label: "Discount %",
			type: "number",
			value: q.discountPct,
			onChange: (v) => upd((d) => {
				d.discountPct = Number(v);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "flex flex-col gap-1 text-xs font-medium text-muted-foreground",
			children: ["GST", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: q.taxMode,
				onChange: (e) => upd((d) => {
					d.taxMode = e.target.value;
				}),
				className: "h-8 w-full rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "intra",
					children: "CGST 9% + SGST 9% (same state)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "inter",
					children: "IGST 18% (other state)"
				})]
			})]
		})] });
		case "payment": {
			const sum = q.milestones.reduce((a, m) => a + m.pct, 0);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [q.milestones.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputCls,
							value: m.label,
							onChange: (e) => upd((d) => {
								d.milestones[i].label = e.target.value;
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							className: "h-8 w-full rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring w-16",
							value: m.pct,
							onChange: (e) => upd((d) => {
								d.milestones[i].pct = Number(e.target.value);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => upd((d) => {
								d.milestones.splice(i, 1);
							}),
							className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
						})
					]
				}, m.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddBtn, {
						onClick: () => upd((d) => {
							d.milestones.push({
								id: uid(),
								label: "New milestone",
								pct: 0
							});
						}),
						children: "Add milestone"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: cn("text-xs font-semibold", sum === 100 ? "text-success" : "text-destructive"),
						children: [
							"Total ",
							sum,
							"%"
						]
					})]
				})]
			});
		}
		case "terms": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TA, {
			label: "One point per line",
			value: q.terms,
			onChange: (v) => upd((d) => {
				d.terms = v;
			}),
			rows: 7
		});
		case "exclusions": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TA, {
			label: "One point per line",
			value: q.exclusions,
			onChange: (v) => upd((d) => {
				d.exclusions = v;
			})
		});
		case "warranty": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TA, {
			label: "Warranty text",
			value: q.warranty,
			onChange: (v) => upd((d) => {
				d.warranty = v;
			}),
			rows: 3
		});
		case "custom": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-1 text-xs font-medium text-muted-foreground",
			children: ["Content", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "react-quill-wrapper rounded-md border border-input bg-background overflow-hidden mt-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnlyQuill, {
					s,
					upd
				})
			})]
		});
		case "custom_table": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTableEditor, {
			s,
			q,
			upd
		});
		case "bank": {
			const b = q.bank;
			const set = (k) => (v) => upd((d) => {
				d.bank[k] = v;
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(G, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
					label: "Account name",
					value: b.accountName,
					onChange: set("accountName")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
					label: "Bank",
					value: b.bank,
					onChange: set("bank")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
					label: "Account no.",
					value: b.account,
					onChange: set("account")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
					label: "IFSC",
					value: b.ifsc,
					onChange: set("ifsc")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
					label: "Branch",
					value: b.branch,
					onChange: set("branch")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
					label: "UPI ID",
					value: b.upi,
					onChange: set("upi")
				})
			] });
		}
		case "signature": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(G, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
			label: "Signatory name",
			value: q.signatory.name,
			onChange: (v) => upd((d) => {
				d.signatory.name = v;
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
			label: "Designation",
			value: q.signatory.designation,
			onChange: (v) => upd((d) => {
				d.signatory.designation = v;
			})
		})] });
		case "footer": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TA, {
			label: "Footer text",
			value: q.footer,
			onChange: (v) => upd((d) => {
				d.footer = v;
			}),
			rows: 2
		});
	}
}
function Editor({ q, upd, activeId, onActiveChange, activeFieldId, onActiveFieldChange }) {
	const [styling, setStyling] = (0, import_react.useState)(null);
	const [addType, setAddType] = (0, import_react.useState)("custom");
	const move = (i, dir) => upd((d) => {
		const j = i + dir;
		if (j < 0 || j >= d.sections.length) return;
		[d.sections[i], d.sections[j]] = [d.sections[j], d.sections[i]];
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-card p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground",
					children: "Document"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
						label: "Name",
						value: q.name,
						onChange: (v) => upd((d) => {
							d.name = v;
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end gap-3",
						children: [
							[
								"primary",
								"accent",
								"text"
							].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-1.5 text-xs capitalize text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "color",
									value: q.theme[k],
									onChange: (e) => upd((d) => {
										d.theme[k] = e.target.value;
									}),
									className: "h-7 w-8 cursor-pointer rounded border border-input p-0"
								}), k]
							}, k)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex flex-col gap-1 text-xs text-muted-foreground",
								children: ["Font", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: q.theme.font,
									onChange: (e) => upd((d) => {
										d.theme.font = e.target.value;
									}),
									className: "h-7 rounded border border-input bg-background text-xs text-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "'IBM Plex Sans', sans-serif",
											children: "IBM Plex Sans"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "'Source Serif 4', Georgia, serif",
											children: "Source Serif"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Arial, Helvetica, sans-serif",
											children: "Arial"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "'Times New Roman', serif",
											children: "Times"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex flex-col gap-1 text-xs text-muted-foreground",
								children: ["Base size", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: 8,
									max: 16,
									value: q.theme.baseSize,
									onChange: (e) => upd((d) => {
										d.theme.baseSize = Number(e.target.value);
									}),
									className: "h-7 w-14 rounded border border-input bg-background px-1 text-xs text-foreground"
								})]
							}),
							q.kind === "quotation" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex flex-col gap-1 text-xs text-muted-foreground",
								children: ["Status", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: q.status,
									onChange: (e) => upd((d) => {
										d.status = e.target.value;
									}),
									className: "h-7 rounded border border-input bg-background text-xs text-foreground",
									children: [
										"Draft",
										"Sent",
										"Accepted",
										"Rejected"
									].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
								})]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
				children: activeFieldId && activeId ? "Edit Section & Field" : activeFieldId ? "Edit Field" : activeId ? "Edit Section" : "Sections"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					activeId && q.sections.filter((s) => s.id === activeId).map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						id: `sidebar-section-${s.id}`,
						className: "rounded-lg border border-primary/50 bg-card shadow-sm ring-1 ring-primary/20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 px-3 py-2 border-b border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex-1 truncate text-left text-sm font-semibold",
										children: [
											s.title,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-1 text-[10px] font-normal uppercase text-muted-foreground",
												children: sectionLabels[s.type]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										title: "Move Up",
										onClick: () => move(q.sections.findIndex((x) => x.id === s.id), -1),
										className: "md:hidden flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium transition-colors hover:bg-accent active:bg-accent",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-3.5 w-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										title: "Move Down",
										onClick: () => move(q.sections.findIndex((x) => x.id === s.id), 1),
										className: "md:hidden flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium transition-colors hover:bg-accent active:bg-accent",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										title: "Style",
										onClick: () => setStyling(styling === s.id ? null : s.id),
										className: cn("flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium transition-colors hover:bg-accent active:bg-accent", styling === s.id && "bg-primary/10 text-primary border-primary/30"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paintbrush, { className: "h-3.5 w-3.5" })
									})
								]
							}),
							styling === s.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-3 border-b border-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyleEditor, {
									value: s.style,
									onChange: (st) => upd((d) => {
										const si = d.sections.findIndex((x) => x.id === s.id);
										if (si >= 0) d.sections[si].style = st;
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 p-3",
								children: [s.type !== "header" && s.type !== "footer" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
									label: "Section title",
									value: s.title,
									onChange: (v) => upd((d) => {
										const si = d.sections.findIndex((x) => x.id === s.id);
										if (si >= 0) d.sections[si].title = v;
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionBody, {
									s,
									q,
									upd
								})]
							})
						]
					}, s.id)),
					activeFieldId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-primary/50 bg-card shadow-sm ring-1 ring-primary/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 px-3 py-2 border-b border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1 truncate text-left text-sm font-semibold",
								children: "Field Styling"
							}), onActiveFieldChange && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								title: "Close field styling",
								onClick: () => onActiveFieldChange(null),
								className: "rounded-md border p-1 text-muted-foreground hover:bg-accent hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									width: "14",
									height: "14",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 6 6 18" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m6 6 12 12" })]
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyleEditor, {
								value: q.fieldStyles?.[activeFieldId] || {},
								onChange: (st) => upd((d) => {
									if (!d.fieldStyles) d.fieldStyles = {};
									d.fieldStyles[activeFieldId] = st;
								})
							})
						})]
					}),
					!activeId && !activeFieldId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-muted-foreground text-center py-8 border-2 border-dashed border-border rounded-lg",
						children: "Click on any section or text field in the preview to edit its details and styles here."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 rounded-lg border border-dashed border-border p-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: addType,
					onChange: (e) => setAddType(e.target.value),
					className: inputCls,
					children: Object.keys(sectionLabels).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: t,
						children: sectionLabels[t]
					}, t))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						const ns = blankSection(addType);
						upd((d) => {
							d.sections.splice(d.sections.length - 1, 0, ns);
						});
						onActiveChange(ns.id);
					},
					className: "inline-flex shrink-0 items-center gap-1 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Add section"]
				})]
			})
		]
	});
}
var cell = {
	border: "1px solid #cbd5e1",
	padding: "5px 7px",
	verticalAlign: "top"
};
var layouts = {
	classic: {
		renderHeader({ q, FM }) {
			const P = q.theme.primary, A = q.theme.accent;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					borderBottom: `4px solid ${P}`,
					paddingBottom: 10
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						gap: 16
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: 12,
							alignItems: "center"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "header.logo",
							children: q.company.logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: q.company.logo,
								alt: "logo",
								style: {
									height: 56,
									maxWidth: 120,
									objectFit: "contain"
								}
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 54,
									height: 54,
									background: P,
									color: "#fff",
									display: "grid",
									placeItems: "center",
									fontWeight: 800,
									fontSize: 22,
									borderRadius: 6,
									borderBottom: `4px solid ${A}`
								},
								children: "AE"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "header.companyName",
							block: true,
							onChangePath: "company.name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "1.9em",
									fontWeight: 800,
									color: P,
									lineHeight: 1.1
								},
								children: q.company.name
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "header.tagline",
							block: true,
							onChangePath: "company.tagline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									color: A,
									fontWeight: 600,
									fontSize: "0.9em"
								},
								children: q.company.tagline
							})
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							textAlign: "right",
							fontSize: "0.85em",
							lineHeight: 1.6
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: "header.address",
								block: true,
								onChangePath: "company.address",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: { maxWidth: 230 },
									children: q.company.address
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: "header.contact",
								block: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: [q.company.phone, q.company.email].filter(Boolean).join(" · ") })
							}),
							q.company.website && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: "header.website",
								block: true,
								onChangePath: "company.website",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: q.company.website })
							}),
							q.company.gstin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: "header.gstin",
								block: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: { fontWeight: 700 },
									children: ["GSTIN: ", q.company.gstin]
								})
							})
						]
					})]
				})
			});
		},
		renderItems({ q, FM }) {
			const t = calc(q);
			const P = q.theme.primary;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				style: {
					width: "100%",
					borderCollapse: "collapse"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					style: {
						...cell,
						background: P,
						color: "#fff",
						width: 28
					},
					children: "#"
				}), q.columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					style: {
						...cell,
						background: P,
						color: "#fff",
						textAlign: c.align,
						width: c.width
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
						id: `col.${c.id}`,
						children: c.label
					})
				}, c.id))] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: q.items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					style: { background: i % 2 ? "#f8fafc" : void 0 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: {
							...cell,
							textAlign: "center"
						},
						children: i + 1
					}), q.columns.map((c) => {
						const isAmt = c.id === "amount";
						const isRate = c.id === "rate";
						const v = isAmt ? inr(t.lines[i]) : isRate ? inr(num(it.cells["rate"])) : it.cells[c.id] ?? "";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: {
								...cell,
								textAlign: c.align
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: `cell.${it.id}.${c.id}`,
								...!isAmt ? { onChangePath: `items.${i}.cells.${c.id}` } : {},
								children: v
							})
						}, c.id);
					})]
				}, it.id)) })]
			});
		},
		renderNotes({ q, FM }) {
			const P = q.theme.primary;
			const lines = (s) => s.split("\n").filter(Boolean);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					fontSize: "0.92em",
					lineHeight: 1.6
				},
				children: [
					q.terms && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { marginBottom: 8 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontWeight: 700,
								color: P,
								marginBottom: 3,
								textTransform: "uppercase",
								letterSpacing: ".05em",
								fontSize: "0.9em"
							},
							children: "Terms & Conditions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							style: {
								paddingLeft: 18,
								margin: 0
							},
							children: lines(q.terms).map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								style: { marginBottom: 2 },
								children: l
							}, i))
						})]
					}),
					q.warranty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							background: "#f8fafc",
							border: "1px solid #e2e8f0",
							borderRadius: 4,
							padding: "6px 10px",
							marginBottom: 8
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { fontWeight: 700 },
							children: "Warranty: "
						}), q.warranty]
					}),
					q.exclusions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontWeight: 700,
							color: P,
							marginBottom: 3,
							textTransform: "uppercase",
							letterSpacing: ".05em",
							fontSize: "0.9em"
						},
						children: "Exclusions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						style: {
							paddingLeft: 18,
							margin: 0
						},
						children: lines(q.exclusions).map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							style: { marginBottom: 2 },
							children: l
						}, i))
					})] })
				]
			});
		},
		renderSignature({ q, FM }) {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-end",
					marginTop: 8
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
					id: "sig.cust",
					block: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: 50 } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							borderTop: "1px solid #94a3b8",
							paddingTop: 3,
							width: 180
						},
						children: "Customer Acceptance"
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { textAlign: "center" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "sig.for",
							block: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["For ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: q.company.name })] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: 64 } }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "sig.name",
							block: true,
							onChangePath: "signatory.name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									borderTop: "1px solid #94a3b8",
									paddingTop: 3,
									minWidth: 180,
									fontWeight: 700
								},
								children: q.signatory.name
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "sig.desig",
							block: true,
							onChangePath: "signatory.designation",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: q.signatory.designation })
						})
					]
				})]
			});
		}
	},
	"bold-banner": {
		renderHeader({ q, FM }) {
			const P = q.theme.primary, A = q.theme.accent;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						background: P,
						color: "#fff",
						padding: "14px 18px",
						display: "flex",
						alignItems: "center",
						gap: 16,
						marginBottom: 0
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "header.logo",
							children: q.company.logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: q.company.logo,
								alt: "logo",
								style: {
									height: 60,
									maxWidth: 130,
									objectFit: "contain",
									filter: "brightness(0) invert(1)"
								}
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 60,
									height: 60,
									background: "#fff",
									color: P,
									display: "grid",
									placeItems: "center",
									fontWeight: 900,
									fontSize: 24,
									borderRadius: 8
								},
								children: "AE"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { flex: 1 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: "header.companyName",
								block: true,
								onChangePath: "company.name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "2.2em",
										fontWeight: 900,
										lineHeight: 1.1,
										letterSpacing: "-0.02em"
									},
									children: q.company.name
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: "header.tagline",
								block: true,
								onChangePath: "company.tagline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										opacity: .85,
										fontSize: "0.9em",
										marginTop: 2
									},
									children: q.company.tagline
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								textAlign: "right",
								fontSize: "0.82em",
								opacity: .9,
								lineHeight: 1.7
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
									id: "header.contact",
									block: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: q.company.phone })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
									id: "header.email",
									block: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: q.company.email })
								}),
								q.company.website && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
									id: "header.website",
									block: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: q.company.website })
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					background: A,
					height: 5
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						background: "#f1f5f9",
						padding: "5px 18px",
						display: "flex",
						justifyContent: "space-between",
						fontSize: "0.82em",
						color: "#475569"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
						id: "header.address",
						block: true,
						onChangePath: "company.address",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: q.company.address })
					}), q.company.gstin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
						id: "header.gstin",
						block: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "GSTIN:" }),
							" ",
							q.company.gstin
						] })
					})]
				})
			] });
		},
		renderItems({ q, FM }) {
			const t = calc(q);
			const P = q.theme.primary, A = q.theme.accent;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				style: {
					width: "100%",
					borderCollapse: "collapse",
					borderRadius: 6,
					overflow: "hidden"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					style: { background: `linear-gradient(90deg, ${P}, ${A})` },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						style: {
							...cell,
							border: "none",
							color: "#fff",
							width: 28,
							textAlign: "center"
						},
						children: "#"
					}), q.columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						style: {
							...cell,
							border: "none",
							color: "#fff",
							textAlign: c.align,
							width: c.width,
							fontWeight: 700
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: `col.${c.id}`,
							children: c.label
						})
					}, c.id))]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: q.items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					style: { background: i % 2 ? `${P}09` : "#fff" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: {
							...cell,
							textAlign: "center",
							fontWeight: 600,
							color: P
						},
						children: i + 1
					}), q.columns.map((c) => {
						const isAmt = c.id === "amount";
						const isRate = c.id === "rate";
						const v = isAmt ? inr(t.lines[i]) : isRate ? inr(num(it.cells["rate"])) : it.cells[c.id] ?? "";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: {
								...cell,
								textAlign: c.align
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: `cell.${it.id}.${c.id}`,
								...!isAmt ? { onChangePath: `items.${i}.cells.${c.id}` } : {},
								children: v
							})
						}, c.id);
					})]
				}, it.id)) })]
			});
		},
		renderNotes({ q, FM }) {
			const A = q.theme.accent;
			const lines = (s) => s.split("\n").filter(Boolean);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: 12,
					fontSize: "0.9em"
				},
				children: [q.terms && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						borderLeft: `3px solid ${A}`,
						paddingLeft: 10
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontWeight: 800,
							marginBottom: 4,
							color: A,
							fontSize: "0.95em"
						},
						children: "TERMS & CONDITIONS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						style: {
							paddingLeft: 16,
							margin: 0
						},
						children: lines(q.terms).slice(0, 6).map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							style: { marginBottom: 2 },
							children: l
						}, i))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [q.warranty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						marginBottom: 8,
						padding: "8px 10px",
						background: `${A}15`,
						borderRadius: 4
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontWeight: 800,
							color: A,
							marginBottom: 3,
							fontSize: "0.95em"
						},
						children: "WARRANTY"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: q.warranty })]
				}), q.exclusions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						fontWeight: 800,
						marginBottom: 3,
						fontSize: "0.95em"
					},
					children: "EXCLUSIONS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					style: {
						paddingLeft: 16,
						margin: 0
					},
					children: lines(q.exclusions).slice(0, 4).map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						style: { marginBottom: 1 },
						children: l
					}, i))
				})] })] })]
			});
		},
		renderSignature({ q, FM }) {
			const P = q.theme.primary, A = q.theme.accent;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					gap: 16,
					alignItems: "stretch"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
					id: "sig.cust",
					block: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							flex: 1,
							border: `1px solid #e2e8f0`,
							borderRadius: 6,
							padding: "10px 14px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "0.85em",
								color: "#64748b",
								marginBottom: 40
							},
							children: "Customer's Signature & Stamp"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								borderTop: `2px solid ${P}`,
								paddingTop: 4,
								fontWeight: 600
							},
							children: "Accepted by"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						flex: 1,
						background: P,
						color: "#fff",
						borderRadius: 6,
						padding: "10px 14px"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "sig.for",
							block: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.85em",
									opacity: .8,
									marginBottom: 2
								},
								children: "For & on behalf of"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "sig.compname",
							block: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontWeight: 800,
									fontSize: "1.1em",
									marginBottom: 36
								},
								children: q.company.name
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "sig.name",
							block: true,
							onChangePath: "signatory.name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									borderTop: `2px solid ${A}`,
									paddingTop: 4,
									fontWeight: 700
								},
								children: q.signatory.name
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "sig.desig",
							block: true,
							onChangePath: "signatory.designation",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									opacity: .85,
									fontSize: "0.9em"
								},
								children: q.signatory.designation
							})
						})
					]
				})]
			});
		}
	},
	minimal: {
		renderHeader({ q, FM }) {
			const P = q.theme.primary, A = q.theme.accent;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { paddingBottom: 12 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-start"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "header.logo",
							children: q.company.logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: q.company.logo,
								alt: "logo",
								style: {
									height: 44,
									maxWidth: 120,
									objectFit: "contain",
									marginBottom: 6,
									display: "block"
								}
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 42,
									height: 42,
									background: P,
									color: "#fff",
									display: "grid",
									placeItems: "center",
									fontWeight: 800,
									fontSize: 18,
									borderRadius: 4,
									marginBottom: 6
								},
								children: "AE"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "header.companyName",
							block: true,
							onChangePath: "company.name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "1.6em",
									fontWeight: 700,
									color: P,
									letterSpacing: "-0.03em"
								},
								children: q.company.name
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "header.tagline",
							block: true,
							onChangePath: "company.tagline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									color: A,
									fontSize: "0.85em",
									marginTop: 2
								},
								children: q.company.tagline
							})
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							textAlign: "right",
							fontSize: "0.82em",
							color: "#64748b",
							lineHeight: 1.8
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: "header.address",
								block: true,
								onChangePath: "company.address",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: q.company.address })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: "header.phone",
								block: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: q.company.phone })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: "header.email",
								block: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: q.company.email })
							}),
							q.company.gstin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: "header.gstin",
								block: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["GSTIN: ", q.company.gstin] })
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					height: 1,
					background: `linear-gradient(90deg, ${A}, transparent)`,
					marginTop: 10
				} })]
			});
		},
		renderItems({ q, FM }) {
			const t = calc(q);
			const P = q.theme.primary;
			const borderlessCell = {
				borderBottom: "1px solid #f1f5f9",
				padding: "6px 8px",
				verticalAlign: "top"
			};
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				style: {
					width: "100%",
					borderCollapse: "collapse"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					style: { borderBottom: `2px solid ${P}` },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						style: {
							...borderlessCell,
							width: 26,
							fontWeight: 700,
							textAlign: "center",
							color: "#64748b",
							fontSize: "0.85em"
						},
						children: "#"
					}), q.columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						style: {
							...borderlessCell,
							textAlign: c.align,
							width: c.width,
							fontWeight: 700,
							color: P,
							fontSize: "0.88em",
							textTransform: "uppercase",
							letterSpacing: ".04em"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: `col.${c.id}`,
							children: c.label
						})
					}, c.id))]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: q.items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					style: {
						...borderlessCell,
						textAlign: "center",
						color: "#94a3b8",
						fontSize: "0.85em"
					},
					children: i + 1
				}), q.columns.map((c) => {
					const isAmt = c.id === "amount";
					const isRate = c.id === "rate";
					const v = isAmt ? inr(t.lines[i]) : isRate ? inr(num(it.cells["rate"])) : it.cells[c.id] ?? "";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: {
							...borderlessCell,
							textAlign: c.align
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: `cell.${it.id}.${c.id}`,
							...!isAmt ? { onChangePath: `items.${i}.cells.${c.id}` } : {},
							children: v
						})
					}, c.id);
				})] }, it.id)) })]
			});
		},
		renderNotes({ q, FM }) {
			const P = q.theme.primary;
			const lines = (s) => s.split("\n").filter(Boolean);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					fontSize: "0.88em",
					color: "#475569",
					lineHeight: 1.7
				},
				children: [
					q.terms && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { marginBottom: 10 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontWeight: 700,
								color: P,
								marginBottom: 4,
								fontSize: "0.9em",
								letterSpacing: ".08em",
								textTransform: "uppercase"
							},
							children: "Notes & Terms"
						}), lines(q.terms).map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 8,
								marginBottom: 2
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									color: P,
									fontWeight: 700,
									minWidth: 12
								},
								children: "·"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l })]
						}, i))]
					}),
					q.warranty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { marginBottom: 10 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								fontWeight: 700,
								color: P
							},
							children: "Warranty — "
						}), q.warranty]
					}),
					q.exclusions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontWeight: 700,
							color: P,
							marginBottom: 4,
							fontSize: "0.9em",
							letterSpacing: ".08em",
							textTransform: "uppercase"
						},
						children: "Exclusions"
					}), lines(q.exclusions).map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: 8,
							marginBottom: 2
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								color: "#94a3b8",
								minWidth: 12
							},
							children: "—"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l })]
					}, i))] })
				]
			});
		},
		renderSignature({ q, FM }) {
			const P = q.theme.primary;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					justifyContent: "flex-end",
					gap: 48
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
					id: "sig.cust",
					block: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { textAlign: "center" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: 48 } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								borderTop: `1px solid #cbd5e1`,
								paddingTop: 4,
								width: 160,
								fontSize: "0.85em",
								color: "#64748b"
							},
							children: "Client Signature"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { textAlign: "center" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "sig.for",
							block: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									fontSize: "0.82em",
									color: "#64748b"
								},
								children: ["For ", q.company.name]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: 48 } }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "sig.name",
							block: true,
							onChangePath: "signatory.name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									borderTop: `2px solid ${P}`,
									paddingTop: 4,
									width: 160,
									fontWeight: 700,
									color: P
								},
								children: q.signatory.name
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "sig.desig",
							block: true,
							onChangePath: "signatory.designation",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.85em",
									color: "#64748b"
								},
								children: q.signatory.designation
							})
						})
					]
				})]
			});
		}
	},
	"split-header": {
		renderHeader({ q, FM }) {
			const P = q.theme.primary, A = q.theme.accent;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					minHeight: 90,
					marginBottom: 2
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "12px 14px 12px 0",
						borderRight: `3px solid ${A}`
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "header.logo",
							children: q.company.logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: q.company.logo,
								alt: "logo",
								style: {
									height: 48,
									objectFit: "contain",
									display: "block",
									marginBottom: 6
								}
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 48,
									height: 48,
									background: P,
									color: "#fff",
									display: "grid",
									placeItems: "center",
									fontWeight: 900,
									fontSize: 20,
									borderRadius: 6,
									marginBottom: 6
								},
								children: "AE"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "header.companyName",
							block: true,
							onChangePath: "company.name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "1.5em",
									fontWeight: 800,
									color: P,
									lineHeight: 1.15
								},
								children: q.company.name
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "header.tagline",
							block: true,
							onChangePath: "company.tagline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									color: A,
									fontSize: "0.82em",
									fontWeight: 600
								},
								children: q.company.tagline
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								marginTop: 6,
								fontSize: "0.8em",
								color: "#475569",
								lineHeight: 1.6
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: "header.address",
								block: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: q.company.address })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: "header.contact",
								block: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									q.company.phone,
									" · ",
									q.company.email
								] })
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						background: P,
						color: "#fff",
						padding: "12px 14px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "1.4em",
							fontWeight: 900,
							letterSpacing: ".1em",
							opacity: .5,
							marginBottom: 8
						},
						children: "QUOTATION"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "auto 1fr",
							gap: "3px 10px",
							fontSize: "0.88em"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { opacity: .7 },
								children: "No."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { fontWeight: 700 },
								children: q.meta.number
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { opacity: .7 },
								children: "Date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtDate(q.meta.date) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { opacity: .7 },
								children: "Valid"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [q.meta.validityDays, " days"] }),
							q.company.gstin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { opacity: .7 },
								children: "GSTIN"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { fontSize: "0.9em" },
								children: q.company.gstin
							})] })
						]
					})]
				})]
			});
		},
		renderItems({ q, FM }) {
			const t = calc(q), P = q.theme.primary;
			q.theme.accent;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				style: {
					width: "100%",
					borderCollapse: "collapse"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					style: {
						...cell,
						background: "#1e293b",
						color: "#fff",
						width: 28,
						textAlign: "center"
					},
					children: "#"
				}), q.columns.map((c, ci) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					style: {
						...cell,
						background: ci === 0 ? "#1e293b" : P,
						color: "#fff",
						textAlign: c.align,
						width: c.width
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
						id: `col.${c.id}`,
						children: c.label
					})
				}, c.id))] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: q.items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					style: {
						...cell,
						textAlign: "center",
						background: "#f8fafc",
						fontWeight: 600
					},
					children: i + 1
				}), q.columns.map((c) => {
					const isAmt = c.id === "amount";
					const isRate = c.id === "rate";
					const v = isAmt ? inr(t.lines[i]) : isRate ? inr(num(it.cells["rate"])) : it.cells[c.id] ?? "";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: {
							...cell,
							textAlign: c.align,
							fontWeight: isAmt ? 700 : void 0,
							color: isAmt ? P : void 0
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: `cell.${it.id}.${c.id}`,
							...!isAmt ? { onChangePath: `items.${i}.cells.${c.id}` } : {},
							children: v
						})
					}, c.id);
				})] }, it.id)) })]
			});
		},
		renderNotes({ q, FM }) {
			const P = q.theme.primary, A = q.theme.accent;
			const lines = (s) => s.split("\n").filter(Boolean);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { fontSize: "0.88em" },
				children: [q.terms && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { marginBottom: 10 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 8,
							marginBottom: 5
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								width: 18,
								height: 18,
								background: A,
								borderRadius: "50%",
								display: "grid",
								placeItems: "center"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									color: "#fff",
									fontWeight: 800,
									fontSize: 11
								},
								children: "T"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								fontWeight: 800,
								color: P,
								textTransform: "uppercase",
								letterSpacing: ".06em"
							},
							children: "Terms & Conditions"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: "2px 16px"
						},
						children: lines(q.terms).map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 6,
								lineHeight: 1.5
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								style: {
									color: A,
									fontWeight: 700
								},
								children: [i + 1, "."]
							}), l]
						}, i))
					})]
				}), (q.warranty || q.exclusions) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: 12,
						marginTop: 6
					},
					children: [q.warranty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							background: "#f0fdf4",
							border: "1px solid #bbf7d0",
							borderRadius: 4,
							padding: "6px 10px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontWeight: 700,
								marginBottom: 2
							},
							children: "✓ Warranty"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { color: "#166534" },
							children: q.warranty
						})]
					}), q.exclusions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							background: "#fff7ed",
							border: "1px solid #fed7aa",
							borderRadius: 4,
							padding: "6px 10px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontWeight: 700,
								marginBottom: 2
							},
							children: "⚠ Exclusions"
						}), lines(q.exclusions).map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { color: "#9a3412" },
							children: l
						}, i))]
					})]
				})]
			});
		},
		renderSignature({ q, FM }) {
			const P = q.theme.primary, A = q.theme.accent;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1fr 1fr 1fr",
					gap: 12,
					marginTop: 12
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
						id: "sig.cust",
						block: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								textAlign: "center",
								border: "1px dashed #94a3b8",
								borderRadius: 6,
								padding: "8px 10px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: 50 } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									borderTop: "1px solid #94a3b8",
									paddingTop: 4,
									fontSize: "0.85em",
									color: "#64748b"
								},
								children: "Customer Acceptance"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
						id: "sig.date",
						block: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								textAlign: "center",
								border: "1px dashed #94a3b8",
								borderRadius: 6,
								padding: "8px 10px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: 50 } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									borderTop: "1px solid #94a3b8",
									paddingTop: 4,
									fontSize: "0.85em",
									color: "#64748b"
								},
								children: "Date"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							textAlign: "center",
							background: P,
							color: "#fff",
							borderRadius: 6,
							padding: "8px 10px"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: "sig.for",
								block: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "0.8em",
										opacity: .75,
										marginBottom: 2
									},
									children: "Authorised Signatory"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: 40 } }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: "sig.name",
								block: true,
								onChangePath: "signatory.name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										borderTop: `2px solid ${A}`,
										paddingTop: 4,
										fontWeight: 800
									},
									children: q.signatory.name
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: "sig.desig",
								block: true,
								onChangePath: "signatory.designation",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "0.82em",
										opacity: .8
									},
									children: q.signatory.designation
								})
							})
						]
					})
				]
			});
		}
	},
	"modern-card": {
		renderHeader({ q, FM }) {
			const P = q.theme.primary, A = q.theme.accent;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					gap: 0,
					borderRadius: 8,
					overflow: "hidden",
					border: `1px solid ${P}20`
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						background: P,
						width: 10,
						flexShrink: 0
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							flex: 1,
							padding: "12px 14px",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							gap: 12
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 12
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: "header.logo",
								children: q.company.logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: q.company.logo,
									alt: "logo",
									style: {
										height: 52,
										objectFit: "contain"
									}
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										width: 52,
										height: 52,
										background: P,
										color: "#fff",
										display: "grid",
										placeItems: "center",
										fontWeight: 900,
										fontSize: 20,
										borderRadius: "50%"
									},
									children: "AE"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: "header.companyName",
								block: true,
								onChangePath: "company.name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "1.6em",
										fontWeight: 800,
										color: P
									},
									children: q.company.name
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: "header.tagline",
								block: true,
								onChangePath: "company.tagline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										color: A,
										fontSize: "0.85em",
										fontWeight: 600
									},
									children: q.company.tagline
								})
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								textAlign: "right",
								fontSize: "0.8em",
								color: "#475569",
								lineHeight: 1.7
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
									id: "header.address",
									block: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: { maxWidth: 200 },
										children: q.company.address
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
									id: "header.contact",
									block: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										q.company.phone,
										" · ",
										q.company.email
									] })
								}),
								q.company.gstin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
									id: "header.gstin",
									block: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "GSTIN:" }),
										" ",
										q.company.gstin
									] })
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							background: `${P}12`,
							borderLeft: `3px solid ${A}`,
							padding: "12px 14px",
							minWidth: 140,
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							fontSize: "0.82em",
							gap: 3
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontWeight: 800,
									color: P,
									fontSize: "1em",
									letterSpacing: ".06em"
								},
								children: "QUOTATION"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { color: "#64748b" },
								children: "No. "
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: q.meta.number })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { color: "#64748b" },
								children: "Date "
							}), fmtDate(q.meta.date)] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { color: "#64748b" },
									children: "Valid "
								}),
								q.meta.validityDays,
								" days"
							] })
						]
					})
				]
			});
		},
		renderItems({ q, FM }) {
			const t = calc(q);
			const P = q.theme.primary;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					border: `1px solid ${P}25`,
					borderRadius: 6,
					overflow: "hidden"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					style: {
						width: "100%",
						borderCollapse: "collapse"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						style: { background: P },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							style: {
								color: "#fff",
								padding: "7px 8px",
								width: 28,
								textAlign: "center",
								fontSize: "0.85em"
							},
							children: "#"
						}), q.columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							style: {
								color: "#fff",
								padding: "7px 8px",
								textAlign: c.align,
								width: c.width,
								fontSize: "0.85em",
								fontWeight: 700
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: `col.${c.id}`,
								children: c.label
							})
						}, c.id))]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: q.items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						style: {
							borderTop: `1px solid ${P}15`,
							background: i % 2 ? `${P}06` : "#fff"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: {
								padding: "6px 8px",
								textAlign: "center",
								color: "#94a3b8",
								fontSize: "0.85em"
							},
							children: i + 1
						}), q.columns.map((c) => {
							const v = c.id === "amount" ? inr(t.lines[i]) : c.id === "rate" ? inr(num(it.cells["rate"])) : it.cells[c.id] ?? "";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									padding: "6px 8px",
									textAlign: c.align,
									borderLeft: c.id === "amount" ? `2px solid ${P}30` : void 0,
									fontWeight: c.id === "amount" ? 700 : void 0
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
									id: `cell.${it.id}.${c.id}`,
									children: v
								})
							}, c.id);
						})]
					}, it.id)) })]
				})
			});
		},
		renderNotes({ q, FM }) {
			const P = q.theme.primary, A = q.theme.accent;
			const lines = (s) => s.split("\n").filter(Boolean);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					fontSize: "0.88em",
					lineHeight: 1.65
				},
				children: [q.terms && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						border: `1px solid ${P}20`,
						borderRadius: 6,
						overflow: "hidden",
						marginBottom: 8
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							background: P,
							color: "#fff",
							padding: "4px 10px",
							fontWeight: 700,
							fontSize: "0.9em",
							letterSpacing: ".05em"
						},
						children: "TERMS & CONDITIONS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { padding: "6px 10px" },
						children: lines(q.terms).map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 8,
								marginBottom: 2
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								style: {
									color: A,
									fontWeight: 700,
									minWidth: 16
								},
								children: [i + 1, "."]
							}), l]
						}, i))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: 8
					},
					children: [q.warranty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							border: `1px solid ${P}20`,
							borderRadius: 6,
							overflow: "hidden"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								background: `${A}20`,
								color: P,
								padding: "4px 10px",
								fontWeight: 700,
								fontSize: "0.9em"
							},
							children: "WARRANTY"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { padding: "6px 10px" },
							children: q.warranty
						})]
					}), q.exclusions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							border: `1px solid ${P}20`,
							borderRadius: 6,
							overflow: "hidden"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								background: "#fef2f2",
								color: "#991b1b",
								padding: "4px 10px",
								fontWeight: 700,
								fontSize: "0.9em"
							},
							children: "EXCLUSIONS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { padding: "6px 10px" },
							children: lines(q.exclusions).map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { marginBottom: 1 },
								children: ["— ", l]
							}, i))
						})]
					})]
				})]
			});
		},
		renderSignature({ q, FM }) {
			const P = q.theme.primary, A = q.theme.accent;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					gap: 12,
					marginTop: 8
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
					id: "sig.cust",
					block: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							flex: 1,
							border: `1px solid ${P}25`,
							borderRadius: 6,
							padding: "10px 12px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "0.8em",
								color: "#64748b",
								marginBottom: 44
							},
							children: "Customer Signature & Stamp"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								borderTop: `1px solid #cbd5e1`,
								paddingTop: 4,
								fontSize: "0.85em",
								color: "#475569"
							},
							children: "Accepted By"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						flex: 1,
						border: `2px solid ${P}`,
						borderRadius: 6,
						padding: "10px 12px",
						background: `${P}06`
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 6,
								marginBottom: 8
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
								width: 6,
								height: 6,
								background: A,
								borderRadius: "50%"
							} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: "sig.for",
								block: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: {
										fontSize: "0.82em",
										color: "#475569"
									},
									children: ["For ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: q.company.name })]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: 36 } }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "sig.name",
							block: true,
							onChangePath: "signatory.name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									borderTop: `2px solid ${P}`,
									paddingTop: 4,
									fontWeight: 800,
									color: P
								},
								children: q.signatory.name
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "sig.desig",
							block: true,
							onChangePath: "signatory.designation",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "0.85em",
									color: "#64748b"
								},
								children: q.signatory.designation
							})
						})
					]
				})]
			});
		}
	},
	formal: {
		renderHeader({ q, FM }) {
			const P = q.theme.primary, A = q.theme.accent;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					textAlign: "center",
					paddingBottom: 10
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
						id: "header.logo",
						children: q.company.logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: q.company.logo,
							alt: "logo",
							style: {
								height: 64,
								objectFit: "contain",
								display: "block",
								margin: "0 auto 6px"
							}
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
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
								border: `3px solid ${A}`
							},
							children: "AE"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
						id: "header.companyName",
						block: true,
						onChangePath: "company.name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "2em",
								fontWeight: 900,
								color: P,
								letterSpacing: ".04em",
								lineHeight: 1.1
							},
							children: q.company.name
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
						id: "header.tagline",
						block: true,
						onChangePath: "company.tagline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								color: A,
								fontSize: "0.9em",
								fontWeight: 600,
								marginTop: 3
							},
							children: q.company.tagline
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
						id: "header.address",
						block: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "0.83em",
								color: "#475569",
								marginTop: 5
							},
							children: q.company.address
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
						id: "header.contact",
						block: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "0.83em",
								color: "#475569"
							},
							children: [
								q.company.phone,
								q.company.email,
								q.company.website
							].filter(Boolean).join(" · ")
						})
					}),
					q.company.gstin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
						id: "header.gstin",
						block: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								fontSize: "0.83em",
								fontWeight: 700,
								marginTop: 2
							},
							children: ["GSTIN: ", q.company.gstin]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						height: 4,
						background: P,
						marginTop: 10,
						borderRadius: 2
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						height: 1,
						background: A,
						marginTop: 2
					} })
				]
			});
		},
		renderItems({ q, FM }) {
			const t = calc(q);
			const P = q.theme.primary, A = q.theme.accent;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				style: {
					width: "100%",
					borderCollapse: "collapse",
					border: `2px solid ${P}`
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					style: {
						background: P,
						color: "#fff",
						padding: "6px 8px",
						width: 28,
						textAlign: "center",
						borderRight: `1px solid ${A}`
					},
					children: "#"
				}), q.columns.map((c, ci) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					style: {
						background: ci === 0 ? P : `${P}e0`,
						color: "#fff",
						padding: "6px 8px",
						textAlign: c.align,
						width: c.width,
						borderRight: `1px solid ${A}`,
						fontStyle: ci === 0 ? void 0 : void 0
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
						id: `col.${c.id}`,
						children: c.label
					})
				}, c.id))] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: q.items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					style: { borderBottom: `1px solid ${P}30` },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: {
							padding: "5px 8px",
							textAlign: "center",
							borderRight: `1px solid ${P}20`,
							background: `${P}08`
						},
						children: i + 1
					}), q.columns.map((c) => {
						const v = c.id === "amount" ? inr(t.lines[i]) : c.id === "rate" ? inr(num(it.cells["rate"])) : it.cells[c.id] ?? "";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: {
								padding: "5px 8px",
								textAlign: c.align,
								borderRight: `1px solid ${P}15`,
								fontWeight: c.id === "amount" ? 700 : void 0
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
								id: `cell.${it.id}.${c.id}`,
								children: v
							})
						}, c.id);
					})]
				}, it.id)) })]
			});
		},
		renderNotes({ q, FM }) {
			const P = q.theme.primary;
			const lines = (s) => s.split("\n").filter(Boolean);
			const SectionHead = ({ title }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: 8,
					marginBottom: 5
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						flex: 1,
						height: 1,
						background: P
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontWeight: 800,
							color: P,
							fontSize: "0.88em",
							letterSpacing: ".08em",
							textTransform: "uppercase",
							whiteSpace: "nowrap"
						},
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						flex: 1,
						height: 1,
						background: P
					} })
				]
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					fontSize: "0.88em",
					lineHeight: 1.65
				},
				children: [q.terms && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { marginBottom: 10 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Terms & Conditions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						style: {
							paddingLeft: 18,
							margin: 0,
							columns: 2,
							columnGap: 16
						},
						children: lines(q.terms).map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							style: {
								marginBottom: 2,
								breakInside: "avoid"
							},
							children: l
						}, i))
					})]
				}), (q.warranty || q.exclusions) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: 10
					},
					children: [q.warranty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Warranty" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { color: "#374151" },
						children: q.warranty
					})] }), q.exclusions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Exclusions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						style: {
							paddingLeft: 16,
							margin: 0
						},
						children: lines(q.exclusions).map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							style: { marginBottom: 2 },
							children: l
						}, i))
					})] })]
				})]
			});
		},
		renderSignature({ q, FM }) {
			const P = q.theme.primary, A = q.theme.accent;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					height: 1,
					background: A,
					marginBottom: 2
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					height: 4,
					background: P,
					borderRadius: 2,
					marginBottom: 14
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						justifyContent: "space-between"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "sig.cust",
							block: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { textAlign: "center" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: 56 } }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										borderTop: `2px solid ${P}`,
										paddingTop: 4,
										width: 170
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontWeight: 700,
											color: P
										},
										children: "Customer"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "0.85em",
											color: "#64748b"
										},
										children: "Signature & Seal"
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
							id: "sig.date",
							block: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { textAlign: "center" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: 56 } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										borderTop: `2px solid ${P}`,
										paddingTop: 4,
										width: 130
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontWeight: 700,
											color: P
										},
										children: "Date"
									})
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { textAlign: "center" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: 56 } }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									borderTop: `2px solid ${P}`,
									paddingTop: 4,
									width: 170
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
										id: "sig.name",
										block: true,
										onChangePath: "signatory.name",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												fontWeight: 800,
												color: P
											},
											children: q.signatory.name
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
										id: "sig.desig",
										block: true,
										onChangePath: "signatory.designation",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												fontSize: "0.85em",
												color: "#64748b"
											},
											children: q.signatory.designation
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											fontSize: "0.82em",
											color: "#94a3b8",
											marginTop: 2
										},
										children: ["For ", q.company.name]
									})
								]
							})]
						})
					]
				})
			] });
		}
	}
};
function QuoteSheet({ q, activeId, onActiveChange, onReorder, zoom = 1, onFieldOffsetChange, onSectionAction, activeFieldId, onActiveFieldChange, onFieldTextChange, onFieldAction }) {
	const [draggedId, setDraggedId] = (0, import_react.useState)(null);
	const [dragOverId, setDragOverId] = (0, import_react.useState)(null);
	const t = calc(q);
	const P = q.theme.primary, A = q.theme.accent;
	const layout = layouts[q.layout ?? "classic"] ?? layouts["classic"];
	const H = ({ s }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			color: P,
			borderBottom: `2px solid ${A}`,
			fontWeight: 700,
			textTransform: "uppercase",
			letterSpacing: ".06em",
			fontSize: "0.95em",
			paddingBottom: 3,
			marginBottom: 6
		},
		children: s.title
	});
	const cell = {
		border: "1px solid #cbd5e1",
		padding: "5px 6px",
		verticalAlign: "top"
	};
	const FieldMover = ({ id, children, block, value, onChangePath }) => {
		const off = q.offsets?.[id] || {
			x: 0,
			y: 0
		};
		const isActive = activeFieldId === id;
		const isHidden = q.hiddenFields?.includes(id);
		const fStyle = q.fieldStyles?.[id] || {};
		if (isHidden) return null;
		const startDrag = (e) => {
			if (!onFieldOffsetChange) return;
			const startX = e.clientX;
			const startY = e.clientY;
			const startOffX = off.x;
			const startOffY = off.y;
			const target = e.currentTarget;
			target.setPointerCapture(e.pointerId);
			const onMove = (ev) => {
				onFieldOffsetChange(id, startOffX + (ev.clientX - startX) / zoom, startOffY + (ev.clientY - startY) / zoom);
			};
			const onUp = (ev) => {
				target.releasePointerCapture(ev.pointerId);
				window.removeEventListener("pointermove", onMove);
				window.removeEventListener("pointerup", onUp);
				window.removeEventListener("pointercancel", onUp);
			};
			window.addEventListener("pointermove", onMove);
			window.addEventListener("pointerup", onUp);
			window.addEventListener("pointercancel", onUp);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			onPointerDown: (e) => {
				if (!onFieldOffsetChange) return;
				if (e.pointerType === "touch" && !isActive) {
					const sId = e.currentTarget.closest("[data-section-id]")?.getAttribute("data-section-id");
					onActiveFieldChange?.(id, sId);
					return;
				}
				e.stopPropagation();
				const sId = e.currentTarget.closest("[data-section-id]")?.getAttribute("data-section-id");
				onActiveFieldChange?.(id, sId);
				startDrag(e);
			},
			onClick: (e) => e.stopPropagation(),
			onDragStart: (e) => {
				e.preventDefault();
				e.stopPropagation();
			},
			draggable: true,
			className: "field-mover-wrapper",
			style: {
				transform: `translate(${off.x}px, ${off.y}px)`,
				cursor: onFieldOffsetChange ? "move" : "inherit",
				display: block ? "block" : "inline-block",
				outline: isActive ? `2px dashed ${P}` : "none",
				outlineOffset: 2,
				position: "relative",
				zIndex: isActive ? 30 : 1,
				opacity: isHidden ? .3 : 1,
				touchAction: isActive ? "none" : "auto",
				...boxCss(fStyle)
			},
			children: [isActive && onFieldAction && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute -top-10 sm:-top-7 right-0 flex bg-card border border-border rounded shadow-sm text-xs sm:text-[10px] overflow-hidden no-print z-50 field-toolbar",
				onPointerDown: (e) => e.stopPropagation(),
				onClick: (e) => e.stopPropagation(),
				style: {
					color: "black",
					fontFamily: "sans-serif"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-2 sm:p-1 cursor-move hover:bg-accent text-muted-foreground flex items-center justify-center",
						title: "Move",
						onPointerDown: (e) => {
							e.stopPropagation();
							startDrag(e);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							className: "w-5 h-5 sm:w-3.5 sm:h-3.5",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "5 9 2 12 5 15" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "9 5 12 2 15 5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "19 9 22 12 19 15" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "9 19 12 22 15 19" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "2",
									x2: "22",
									y1: "12",
									y2: "12"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "12",
									x2: "12",
									y1: "2",
									y2: "22"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-px h-6 sm:h-4 bg-border mx-0.5 mt-1.5 sm:mt-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						title: "Reset styles and position",
						className: "p-2 sm:p-1 hover:bg-accent",
						onClick: () => onFieldAction(id, "reset"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							className: "w-5 h-5 sm:w-3.5 sm:h-3.5",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 3v5h5" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-px h-6 sm:h-4 bg-border mx-0.5 mt-1.5 sm:mt-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						title: "Style",
						className: "p-2 sm:p-1 hover:bg-accent",
						onClick: () => onFieldAction(id, "style"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							className: "w-5 h-5 sm:w-3.5 sm:h-3.5",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13 8l3 3" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						title: isHidden ? "Show" : "Hide",
						className: "p-2 sm:p-1 hover:bg-accent",
						onClick: () => onFieldAction(id, "toggle"),
						children: isHidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							className: "w-5 h-5 sm:w-3.5 sm:h-3.5",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "12",
								cy: "12",
								r: "3"
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							className: "w-5 h-5 sm:w-3.5 sm:h-3.5",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9.88 9.88a3 3 0 1 0 4.24 4.24" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "2",
									x2: "22",
									y1: "2",
									y2: "22"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-px h-6 sm:h-4 bg-border mx-0.5 mt-1.5 sm:mt-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						title: "Delete",
						className: "p-2 sm:p-1 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground",
						onClick: (e) => {
							if (onChangePath && onFieldTextChange) {
								const ce = e.currentTarget.closest(".field-mover-wrapper")?.querySelector("[contenteditable]");
								if (ce) {
									ce.blur();
									ce.innerText = "";
								}
								onFieldTextChange(onChangePath, "");
							} else onFieldAction(id, "toggle");
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							className: "w-5 h-5 sm:w-3.5 sm:h-3.5",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 6h18" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" })
							]
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				contentEditable: isActive && !!onChangePath && !!onFieldTextChange,
				suppressContentEditableWarning: true,
				onBlur: (e) => {
					if (onChangePath && onFieldTextChange) onFieldTextChange(onChangePath, e.currentTarget.innerText);
				},
				style: {
					outline: "none",
					cursor: isActive && onChangePath ? "text" : "inherit"
				},
				children
			})]
		});
	};
	const render = (s) => {
		const FM = ({ id, children, block, onChangePath }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldMover, {
			id,
			block: block === true,
			...onChangePath !== void 0 ? { onChangePath } : {},
			children
		});
		const lp = {
			q,
			FM
		};
		const EKV = ({ k, id, path, v }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				gap: 6
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					color: "#64748b",
					minWidth: 92,
					flexShrink: 0
				},
				children: k
			}), path ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldMover, {
				id,
				onChangePath: path,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: { fontWeight: 500 },
					children: v
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: { fontWeight: 500 },
				children: v
			})]
		});
		switch (s.type) {
			case "header": return layout.renderHeader(lp);
			case "items": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
				id: `${s.id}.header`,
				block: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(H, { s })
			}), layout.renderItems(lp)] });
			case "signature": return layout.renderSignature(lp);
			case "terms": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
				id: `${s.id}.header`,
				block: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(H, { s })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
				id: `${s.id}.body`,
				block: true,
				onChangePath: "terms",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					style: {
						paddingLeft: 18,
						margin: 0,
						listStyle: "decimal",
						fontSize: "0.92em",
						lineHeight: 1.6
					},
					children: q.terms.split("\n").filter(Boolean).map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						style: { marginBottom: 2 },
						children: l
					}, i))
				})
			})] });
			case "exclusions": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
				id: `${s.id}.header`,
				block: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(H, { s })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FM, {
				id: `${s.id}.body`,
				block: true,
				onChangePath: "exclusions",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					style: {
						paddingLeft: 18,
						margin: 0,
						listStyle: "decimal",
						fontSize: "0.92em",
						lineHeight: 1.6
					},
					children: q.exclusions.split("\n").filter(Boolean).map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						style: { marginBottom: 2 },
						children: l
					}, i))
				})
			})] });
			case "meta": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldMover, {
				id: `${s.id}.title`,
				block: true,
				onChangePath: "meta.number",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						textAlign: "center",
						fontSize: "1.5em",
						fontWeight: 800,
						letterSpacing: ".2em",
						color: P,
						marginBottom: 6
					},
					children: s.title.toUpperCase()
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: "4px 20px"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EKV, {
						k: "Quotation No.",
						id: "meta.number",
						path: "meta.number",
						v: q.meta.number
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EKV, {
						k: "Date",
						id: "meta.date",
						v: fmtDate(q.meta.date)
					}),
					!!q.meta.validityDays && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EKV, {
						k: "Valid For",
						id: "meta.validity",
						path: "meta.validityDays",
						v: `${q.meta.validityDays} days`
					}),
					q.meta.reference && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EKV, {
						k: "Reference",
						id: "meta.ref",
						path: "meta.reference",
						v: q.meta.reference
					}),
					q.meta.extra.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EKV, {
						k: f.label,
						id: `meta.ext.${f.id}`,
						path: `meta.extra.${i}.value`,
						v: f.value
					}, f.id))
				]
			})] });
			case "customer": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldMover, {
				id: `${s.id}.header`,
				block: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(H, { s })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: "4px 20px"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EKV, {
						k: "Society / Project",
						id: "cust.society",
						path: "customer.society",
						v: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: q.customer.society || "—" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EKV, {
						k: "Contact Person",
						id: "cust.contact",
						path: "customer.contact",
						v: q.customer.contact
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EKV, {
						k: "Site Address",
						id: "cust.address",
						path: "customer.address",
						v: q.customer.address
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EKV, {
						k: "Phone",
						id: "cust.phone",
						path: "customer.phone",
						v: q.customer.phone
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EKV, {
						k: "Email",
						id: "cust.email",
						path: "customer.email",
						v: q.customer.email
					}),
					q.customer.gstin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EKV, {
						k: "Customer GSTIN",
						id: "cust.gstin",
						path: "customer.gstin",
						v: q.customer.gstin
					}),
					q.customer.extra.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EKV, {
						k: f.label,
						id: `cust.ext.${f.id}`,
						path: `customer.extra.${i}.value`,
						v: f.value
					}, f.id))
				]
			})] });
			case "specs": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldMover, {
				id: `${s.id}.header`,
				block: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(H, { s })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
				style: {
					width: "100%",
					borderCollapse: "collapse"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: Array.from({ length: Math.ceil(q.specs.length / 2) }).map((_, r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [0, 1].map((c) => {
					const idx = r * 2 + c;
					const f = q.specs[idx];
					return f ? [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: {
							...cell,
							background: "#f1f5f9",
							fontWeight: 600,
							width: "20%"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldMover, {
							id: `spec.l.${f.id}`,
							onChangePath: `specs.${idx}.label`,
							children: f.label
						})
					}, "l" + c), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: {
							...cell,
							width: "30%"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldMover, {
							id: `spec.v.${f.id}`,
							onChangePath: `specs.${idx}.value`,
							children: f.value
						})
					}, "v" + c)] : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 2,
						style: cell
					}, c);
				}) }, r)) })
			})] });
			case "totals": {
				const row = (k, v, strong = false, id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldMover, {
					id,
					block: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							justifyContent: "space-between",
							padding: "3px 8px",
							...strong ? {
								background: P,
								color: "#fff",
								fontWeight: 800,
								fontSize: "1.15em",
								padding: "6px 8px"
							} : {}
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: k }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: inr(v) })]
					})
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 16,
						alignItems: "flex-end"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							flex: 1,
							fontSize: "0.95em"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldMover, {
							id: "totals.words.label",
							block: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: { color: "#64748b" },
								children: "Amount in words"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldMover, {
							id: "totals.words.value",
							block: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontWeight: 700,
									fontStyle: "italic"
								},
								children: amountInWords(t.total)
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							width: 280,
							border: "1px solid #cbd5e1"
						},
						children: [
							row("Subtotal", t.subtotal, false, "totals.sub"),
							q.discountPct > 0 && row(`Discount (${q.discountPct}%)`, -t.discount, false, "totals.disc"),
							q.discountPct > 0 && row("Taxable Value", t.taxable, false, "totals.taxable"),
							q.taxMode === "intra" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [row("CGST @ 9%", t.cgst, false, "totals.cgst"), row("SGST @ 9%", t.sgst, false, "totals.sgst")] }) : row("IGST @ 18%", t.igst, false, "totals.igst"),
							row("Grand Total", t.total, true, "totals.grand")
						]
					})]
				});
			}
			case "payment": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldMover, {
				id: `${s.id}.header`,
				block: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(H, { s })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
				style: {
					width: "100%",
					borderCollapse: "collapse"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: q.milestones.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: {
							...cell,
							width: 28,
							textAlign: "center"
						},
						children: i + 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: cell,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldMover, {
							id: `ms.l.${m.id}`,
							onChangePath: `milestones.${i}.label`,
							children: m.label
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: {
							...cell,
							width: 50,
							textAlign: "center",
							fontWeight: 700
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldMover, {
							id: `ms.p.${m.id}`,
							onChangePath: `milestones.${i}.pct`,
							children: [m.pct, "%"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						style: {
							...cell,
							width: 110,
							textAlign: "right"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldMover, {
							id: `ms.v.${m.id}`,
							children: inr(t.total * m.pct / 100)
						})
					})
				] }, m.id)) })
			})] });
			case "warranty": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldMover, {
				id: `${s.id}.header`,
				block: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(H, { s })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldMover, {
				id: `${s.id}.content`,
				block: true,
				onChangePath: "warranty",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: { whiteSpace: "pre-wrap" },
					children: q.warranty
				})
			})] });
			case "custom": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldMover, {
				id: `${s.id}.header`,
				block: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(H, { s })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldMover, {
				id: `${s.id}.content`,
				block: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					dangerouslySetInnerHTML: { __html: s.content ?? "" },
					className: "prose prose-sm max-w-none prose-p:my-1 prose-table:my-2 prose-td:border prose-td:p-1 prose-th:border prose-th:p-1 prose-th:bg-muted"
				})
			})] });
			case "custom_table": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldMover, {
				id: `${s.id}.header`,
				block: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(H, { s })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				style: {
					width: "100%",
					borderCollapse: "collapse",
					marginTop: 4
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: s.columns?.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					style: {
						...cell,
						background: P,
						color: "#fff",
						textAlign: c.align
					},
					children: c.label
				}, c.id)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: s.items?.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					style: { background: i % 2 ? "#f8fafc" : void 0 },
					children: s.columns?.map((c) => {
						const st = q.cellStyles[`${it.id}:${c.id}`] || {};
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: {
								...cell,
								...boxCss(st),
								textAlign: c.align
							},
							children: it.cells[c.id]
						}, c.id);
					})
				}, it.id)) })]
			})] });
			case "bank": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldMover, {
					id: `${s.id}.header`,
					block: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(H, { s })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "4px 20px"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EKV, {
							k: "Account Name",
							id: "bank.name",
							path: "bank.accountName",
							v: q.bank.accountName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EKV, {
							k: "Bank",
							id: "bank.bank",
							path: "bank.bank",
							v: q.bank.bank
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EKV, {
							k: "Account No.",
							id: "bank.acc",
							path: "bank.account",
							v: q.bank.account
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EKV, {
							k: "IFSC",
							id: "bank.ifsc",
							path: "bank.ifsc",
							v: q.bank.ifsc
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EKV, {
							k: "Branch",
							id: "bank.branch",
							path: "bank.branch",
							v: q.bank.branch
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EKV, {
							k: "UPI",
							id: "bank.upi",
							path: "bank.upi",
							v: q.bank.upi
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldMover, {
					id: "bank.note",
					block: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "0.85em",
							color: "#64748b",
							marginTop: 3
						},
						children: "Payments accepted via NEFT / RTGS / IMPS / UPI."
					})
				})
			] });
			case "footer": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldMover, {
				id: "footer.text",
				block: true,
				onChangePath: "footer",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						borderTop: `3px solid ${P}`,
						paddingTop: 6,
						textAlign: "center",
						fontSize: "0.85em",
						color: "#64748b"
					},
					children: q.footer
				})
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "quote-sheet",
		style: {
			width: "210mm",
			minHeight: "297mm",
			background: "#fff",
			color: q.theme.text,
			fontFamily: q.theme.font,
			fontSize: q.theme.baseSize,
			padding: "12mm",
			boxSizing: "border-box",
			lineHeight: 1.45
		},
		children: q.sections.filter((s) => s.visible || !!onActiveChange).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-section-id": s.id,
			draggable: !!onReorder,
			onDragStart: (e) => {
				if (!onReorder) return;
				setDraggedId(s.id);
				e.dataTransfer.effectAllowed = "move";
			},
			onDragOver: (e) => {
				if (!onReorder || !draggedId || draggedId === s.id) return;
				e.preventDefault();
				setDragOverId(s.id);
			},
			onDragLeave: () => setDragOverId(null),
			onDrop: (e) => {
				if (!onReorder || !draggedId || draggedId === s.id) return;
				e.preventDefault();
				onReorder(draggedId, s.id);
				setDraggedId(null);
				setDragOverId(null);
			},
			onDragEnd: () => {
				setDraggedId(null);
				setDragOverId(null);
			},
			onClick: onActiveChange ? (e) => {
				e.stopPropagation();
				onActiveChange(s.id);
			} : void 0,
			onMouseOver: onActiveChange && activeId !== s.id ? (e) => {
				e.currentTarget.style.outline = `2px dashed ${q.theme.primary}50`;
				e.currentTarget.style.outlineOffset = "4px";
			} : void 0,
			onMouseOut: onActiveChange && activeId !== s.id ? (e) => {
				e.currentTarget.style.outline = "none";
			} : void 0,
			style: {
				marginTop: 12,
				opacity: s.visible ? 1 : .4,
				...boxCss(s.style),
				...onActiveChange ? {
					cursor: draggedId ? "grabbing" : "grab",
					transition: "outline 0.15s ease"
				} : {},
				...dragOverId === s.id ? {
					borderTop: `4px solid ${q.theme.primary}`,
					paddingTop: 8
				} : {},
				...draggedId === s.id ? { opacity: .2 } : {},
				...activeId === s.id ? {
					outline: `2px dashed ${q.theme.primary}`,
					outlineOffset: 4,
					zIndex: 10,
					position: "relative"
				} : {}
			},
			children: [onSectionAction && activeId === s.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute left-0 sm:-left-2 -top-10 flex items-center gap-1 rounded-md border border-border bg-card p-1 shadow-md z-40",
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						title: "Edit content",
						onClick: () => onSectionAction(s.id, "edit"),
						className: "rounded p-1 text-card-foreground hover:bg-accent md:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 20h9" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-1 h-4 w-px bg-border md:hidden" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						title: "Move up",
						onClick: () => onSectionAction(s.id, "up"),
						className: "rounded p-1 text-card-foreground hover:bg-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m18 15-6-6-6 6" })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						title: "Move down",
						onClick: () => onSectionAction(s.id, "down"),
						className: "rounded p-1 text-card-foreground hover:bg-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m6 9 6 6 6-6" })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-1 h-4 w-px bg-border" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						title: "Style",
						onClick: () => onSectionAction(s.id, "style"),
						className: "rounded p-1 text-card-foreground hover:bg-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13 8l3 3" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						title: s.visible ? "Hide" : "Show",
						onClick: () => onSectionAction(s.id, "toggle"),
						className: "rounded p-1 text-card-foreground hover:bg-accent",
						children: s.visible ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "12",
								cy: "12",
								r: "3"
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9.88 9.88a3 3 0 1 0 4.24 4.24" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "2",
									x2: "22",
									y1: "2",
									y2: "22"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-1 h-4 w-px bg-border" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						title: "Remove",
						onClick: () => onSectionAction(s.id, "delete"),
						className: "rounded p-1 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "14",
							height: "14",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 6h18" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" })
							]
						})
					})
				]
			}), render(s)]
		}, s.id))
	});
}
function EditorPage() {
	const { id } = Route.useParams();
	const list = useQuotes();
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)(null);
	const [activeSectionId, setActiveSectionId] = (0, import_react.useState)(null);
	const [activeFieldId, setActiveFieldId] = (0, import_react.useState)(null);
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [dirty, setDirty] = (0, import_react.useState)(false);
	const [zoom, setZoom] = (0, import_react.useState)(.5);
	const paneRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!list) return;
		const f = list.find((x) => x.id === id);
		if (f && (!q || q.id !== id)) {
			setQ(structuredClone(f));
			setDirty(false);
		}
	}, [list, id]);
	const fit = (0, import_react.useCallback)(() => {
		const w = paneRef.current?.clientWidth ?? 800;
		setZoom(Math.min(1.5, Math.max(.3, (w - 48) / 794)));
	}, []);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(fit, 100);
		window.addEventListener("resize", fit);
		return () => {
			clearTimeout(t);
			window.removeEventListener("resize", fit);
		};
	}, [fit]);
	(0, import_react.useEffect)(() => {
		if (activeSectionId) {
			const el = document.getElementById(`sidebar-section-${activeSectionId}`);
			if (el) el.scrollIntoView({
				behavior: "smooth",
				block: "nearest"
			});
		}
	}, [activeSectionId]);
	if (!list) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid h-screen place-items-center text-muted-foreground",
		children: "Loading…"
	});
	if (!q) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid h-screen place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3",
				children: "Quotation not found."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "text-primary underline",
				children: "Back to dashboard"
			})]
		})
	});
	const upd = (fn) => setQ((prev) => {
		const d = structuredClone(prev);
		fn(d);
		return d;
	});
	const onChange = (fn) => {
		upd(fn);
		setDirty(true);
	};
	const save = () => {
		saveQuote(q);
		setDirty(false);
		toast.success(q.kind === "template" ? "Template saved" : "Quotation saved");
	};
	const saveAsTemplate = () => {
		const t = duplicateQuote(q, "template");
		saveQuote({
			...t,
			name: q.name.replace(/ \(Copy\)$/, "") + " (Template)",
			templateName: q.name
		});
		toast.success("Saved as a new template");
	};
	const dup = () => {
		if (dirty) saveQuote(q);
		const c = duplicateQuote(q);
		toast.success("Duplicated");
		navigate({
			to: "/editor/$id",
			params: { id: c.id }
		});
	};
	const createFromTemplate = () => {
		if (dirty) saveQuote(q);
		const c = duplicateQuote(q, "quotation");
		toast.success("New quotation created from template");
		navigate({
			to: "/editor/$id",
			params: { id: c.id }
		});
	};
	const print = () => {
		const old = document.title;
		document.title = q.meta.number.replace(/\//g, "-") + " " + q.customer.society;
		window.print();
		setTimeout(() => document.title = old, 500);
	};
	const share = async () => {
		const text = `${q.company.name} – Quotation ${q.meta.number} for ${q.customer.society || "your project"}. Grand Total: ${inr(calc(q).total)}`;
		if (navigator.share) try {
			await navigator.share({
				title: `Quotation ${q.meta.number}`,
				text,
				url: location.href
			});
		} catch {}
		else {
			await navigator.clipboard.writeText(text + "\n" + location.href);
			toast.success("Share details copied to clipboard");
		}
	};
	const handleReorder = (draggedId, targetId) => {
		onChange((d) => {
			const i1 = d.sections.findIndex((s) => s.id === draggedId);
			const i2 = d.sections.findIndex((s) => s.id === targetId);
			if (i1 >= 0 && i2 >= 0 && i1 !== i2) {
				const [moved] = d.sections.splice(i1, 1);
				d.sections.splice(i2, 0, moved);
			}
		});
	};
	const handleFieldOffsetChange = (fieldId, x, y) => {
		onChange((d) => {
			if (!d.offsets) d.offsets = {};
			d.offsets[fieldId] = {
				x,
				y
			};
		});
	};
	const handleSectionAction = (id, action) => {
		onChange((d) => {
			const i = d.sections.findIndex((s) => s.id === id);
			if (i < 0) return;
			if (action === "up" && i > 0) [d.sections[i], d.sections[i - 1]] = [d.sections[i - 1], d.sections[i]];
			else if (action === "down" && i < d.sections.length - 1) [d.sections[i], d.sections[i + 1]] = [d.sections[i + 1], d.sections[i]];
			else if (action === "toggle") d.sections[i].visible = !d.sections[i].visible;
			else if (action === "delete") {
				d.sections.splice(i, 1);
				if (activeSectionId === id) setActiveSectionId(null);
			}
		});
		if (action === "style" || action === "edit") {
			setActiveSectionId(id);
			setMobileOpen(true);
		}
	};
	const handleFieldTextChange = (path, val) => {
		onChange((d) => {
			const keys = path.split(".");
			let obj = d;
			for (let i = 0; i < keys.length - 1; i++) {
				const next = obj[keys[i]];
				if (typeof next !== "object" || next === null) return;
				obj = next;
			}
			obj[keys[keys.length - 1]] = val;
		});
	};
	const handleFieldAction = (id, action) => {
		if (action === "reset") onChange((d) => {
			if (d.offsets) delete d.offsets[id];
			if (d.fieldStyles) delete d.fieldStyles[id];
		});
		else if (action === "toggle") onChange((d) => {
			if (!d.hiddenFields) d.hiddenFields = [];
			if (d.hiddenFields.includes(id)) d.hiddenFields = d.hiddenFields.filter((x) => x !== id);
			else d.hiddenFields.push(id);
		});
		else if (action === "style") setMobileOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-screen flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "no-print flex flex-wrap items-center gap-2 border-b border-border bg-card px-3 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "rounded-md p-2 hover:bg-accent",
						"aria-label": "Back to dashboard",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mr-auto min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-secondary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground",
									children: q.kind
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "truncate font-semibold max-w-[160px] sm:max-w-xs md:max-w-sm",
									children: q.name
								}),
								dirty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-highlight",
									children: "• unsaved"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-mono text-xs text-muted-foreground",
							children: [
								q.meta.number,
								" · ",
								inr(calc(q).total)
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: q.kind === "template" ? "outline" : "default",
						onClick: save,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4 sm:mr-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Save"
						})]
					}),
					q.kind === "template" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						className: "hidden sm:flex",
						onClick: createFromTemplate,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlusCorner, { className: "h-4 w-4 mr-1" }), "Create"]
					}),
					q.kind === "quotation" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						className: "hidden md:flex",
						onClick: saveAsTemplate,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4 mr-1" }), "Save as Template"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						className: "hidden sm:flex",
						onClick: dup,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4 sm:mr-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Duplicate"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						className: "hidden lg:flex",
						onClick: print,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, { className: "h-4 w-4 mr-1" }), "PDF"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						className: "hidden sm:flex",
						onClick: print,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4 sm:mr-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Print"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						className: "hidden sm:flex",
						onClick: share,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4 sm:mr-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Share"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
						open: mobileOpen,
						onOpenChange: setMobileOpen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								className: "md:hidden",
								"aria-label": "Open editor menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4 w-4" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
							side: "left",
							className: "w-[90vw] sm:w-[460px] p-0 flex flex-col overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2 border-b border-border bg-muted/40 p-3",
								children: [
									q.kind === "template" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										className: "flex-1",
										onClick: () => {
											createFromTemplate();
											setMobileOpen(false);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlusCorner, { className: "h-4 w-4 mr-1" }), "Create Quotation"]
									}),
									q.kind === "quotation" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										className: "flex-1",
										onClick: () => {
											saveAsTemplate();
											setMobileOpen(false);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4 mr-1" }), "Save as Template"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										className: "flex-1",
										onClick: () => {
											dup();
											setMobileOpen(false);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4 mr-1" }), "Duplicate"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										className: "flex-1",
										onClick: () => {
											print();
											setMobileOpen(false);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4 mr-1" }), "Print"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										className: "flex-1",
										onClick: () => {
											print();
											setMobileOpen(false);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, { className: "h-4 w-4 mr-1" }), "PDF"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										className: "flex-1",
										onClick: () => {
											share();
											setMobileOpen(false);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4 mr-1" }), "Share"]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 overflow-y-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editor, {
									q,
									upd: onChange,
									activeId: activeSectionId,
									onActiveChange: setActiveSectionId,
									activeFieldId,
									onActiveFieldChange: setActiveFieldId
								})
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-print flex min-h-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "hidden md:block w-[320px] lg:w-[400px] xl:w-[460px] shrink-0 overflow-y-auto border-r border-border bg-muted/30",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editor, {
						q,
						upd: onChange,
						activeId: activeSectionId,
						onActiveChange: setActiveSectionId,
						activeFieldId,
						onActiveFieldChange: setActiveFieldId
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					ref: paneRef,
					className: "relative flex-1 overflow-auto bg-canvas",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sticky top-3 z-10 mx-auto flex w-fit items-center gap-0.5 rounded-full border border-border bg-card px-1.5 py-1 shadow-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent active:bg-accent",
								"aria-label": "Zoom out",
								onClick: () => setZoom((z) => Math.max(.3, +(z - .1).toFixed(2))),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "w-11 text-center font-mono text-xs tabular-nums",
								children: [Math.round(zoom * 100), "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent active:bg-accent",
								"aria-label": "Zoom in",
								onClick: () => setZoom((z) => Math.min(2, +(z + .1).toFixed(2))),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "flex h-9 items-center justify-center rounded-full px-2 text-xs hover:bg-accent active:bg-accent",
								onClick: () => setZoom(1),
								children: "1:1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent active:bg-accent",
								title: "Fit width",
								"aria-label": "Fit to width",
								onClick: fit,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize, { className: "h-4 w-4" })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-6",
						style: { zoom },
						onClick: () => {
							setActiveSectionId(null);
							setActiveFieldId(null);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto w-fit shadow-2xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteSheet, {
								q,
								activeId: activeSectionId,
								onActiveChange: (id) => {
									setActiveSectionId(id);
									setActiveFieldId(null);
								},
								activeFieldId,
								onActiveFieldChange: (id, sectionId) => {
									setActiveFieldId(id);
									if (sectionId) setActiveSectionId(sectionId);
								},
								onReorder: handleReorder,
								zoom,
								onFieldOffsetChange: handleFieldOffsetChange,
								onFieldTextChange: handleFieldTextChange,
								onFieldAction: handleFieldAction,
								onSectionAction: handleSectionAction
							})
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "print-only",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteSheet, { q })
			})
		]
	});
}
//#endregion
export { EditorPage as component };
