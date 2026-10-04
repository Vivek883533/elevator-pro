import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-DIT1uomK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY = "aayush-attendance-v1";
var cache = null;
var listeners = /* @__PURE__ */ new Set();
var ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
var rkey = (date, empId) => `${date}|${empId}`;
function seed() {
	const e = (id, name, role, phone, active = true) => ({
		id,
		name,
		role,
		phone,
		active
	});
	const employees = [
		e("e1", "Rajesh Solanki", "Senior Lift Technician", "+91 98250 11234"),
		e("e2", "Mahesh Parmar", "Lift Technician", "+91 99250 22341"),
		e("e3", "Suresh Vaghela", "Installation Supervisor", "+91 97240 33412"),
		e("e4", "Imran Shaikh", "Electrician", "+91 98980 44123"),
		e("e5", "Dinesh Rathod", "Helper / Fitter", "+91 90990 55214"),
		e("e6", "Ketan Chauhan", "AMC Service Engineer", "+91 98790 66321"),
		e("e7", "Pooja Trivedi", "Office Coordinator", "+91 99099 77432"),
		e("e8", "Vijay Makwana", "Welder", "+91 97120 88543"),
		e("e9", "Nilesh Prajapati", "Helper / Fitter", "+91 96010 99654"),
		e("e10", "Bharat Thakor", "Lift Technician", "+91 93270 10765", false)
	];
	const records = {};
	const today = /* @__PURE__ */ new Date();
	const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
	let n = 7;
	for (let d = new Date(start); d < today; d.setDate(d.getDate() + 1)) {
		if (d.getDay() === 0) continue;
		for (const emp of employees) {
			n = (n * 9301 + 49297) % 233280;
			const r = n / 233280;
			records[rkey(ymd(d), emp.id)] = r < .84 ? "P" : r < .93 ? "HD" : "A";
		}
	}
	return {
		employees,
		records
	};
}
function load() {
	if (cache) return cache;
	try {
		const raw = localStorage.getItem(KEY);
		if (raw) return cache = JSON.parse(raw);
	} catch {}
	cache = seed();
	localStorage.setItem(KEY, JSON.stringify(cache));
	return cache;
}
function persist(db) {
	cache = db;
	localStorage.setItem(KEY, JSON.stringify(db));
	listeners.forEach((l) => l());
}
function useAttendance() {
	const [db, setDb] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const f = () => setDb({ ...load() });
		f();
		listeners.add(f);
		return () => {
			listeners.delete(f);
		};
	}, []);
	return db;
}
function setStatus(date, empId, s) {
	const db = load();
	const records = { ...db.records };
	if (s) records[rkey(date, empId)] = s;
	else delete records[rkey(date, empId)];
	persist({
		...db,
		records
	});
}
function setMany(date, ids, s) {
	const db = load();
	const records = { ...db.records };
	ids.forEach((id) => {
		records[rkey(date, id)] = s;
	});
	persist({
		...db,
		records
	});
}
function upsertEmployee(e) {
	const db = load();
	persist({
		...db,
		employees: db.employees.some((x) => x.id === e.id) ? db.employees.map((x) => x.id === e.id ? e : x) : [...db.employees, e]
	});
}
function deleteEmployee(id) {
	const db = load();
	persist({
		...db,
		employees: db.employees.filter((x) => x.id !== id)
	});
}
/** Active employees, plus inactive ones that have any record within the given dates (history preserved). */
function sheetEmployees(db, dates) {
	return db.employees.filter((e) => e.active || dates.some((d) => db.records[rkey(d, e.id)]));
}
//#endregion
export { sheetEmployees as a, ymd as c, setStatus as i, rkey as n, upsertEmployee as o, setMany as r, useAttendance as s, deleteEmployee as t };
