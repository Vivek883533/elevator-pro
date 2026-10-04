globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-10-04T09:18:02.736Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/Te.md": {
		"type": "text/markdown; charset=utf-8",
		"etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
		"mtime": "2026-10-04T09:13:33.396Z",
		"size": 0,
		"path": "../public/Te.md"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-10-04T09:18:02.737Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/AppHeader-66jDnGZi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"805-o9T11V7277kTW5sDJ1oaa06i+JY\"",
		"mtime": "2026-10-04T09:18:01.821Z",
		"size": 2053,
		"path": "../public/assets/AppHeader-66jDnGZi.js"
	},
	"/assets/Combination--n9hbUDH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6554-C7xcPcNpT1a5kdRdam4uqI2yPCk\"",
		"mtime": "2026-10-04T09:18:01.821Z",
		"size": 25940,
		"path": "../public/assets/Combination--n9hbUDH.js"
	},
	"/assets/attendance-BDT3snFB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5de-HWQaUqZfnJCSxUmLenlVtvhfcJs\"",
		"mtime": "2026-10-04T09:18:01.821Z",
		"size": 42462,
		"path": "../public/assets/attendance-BDT3snFB.js"
	},
	"/assets/button-CNHWcagY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"83ac-hFbAt8wpduyduWazrYIdctZgxKs\"",
		"mtime": "2026-10-04T09:18:01.821Z",
		"size": 33708,
		"path": "../public/assets/button-CNHWcagY.js"
	},
	"/assets/data-EDgKG90B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2aef-kGpT2mhYoGDXWZVDVn045xMF628\"",
		"mtime": "2026-10-04T09:18:01.821Z",
		"size": 10991,
		"path": "../public/assets/data-EDgKG90B.js"
	},
	"/assets/dist--2zzWwns.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bde2-s36tCUMPfMeyvskunsVEN1BhUKA\"",
		"mtime": "2026-10-04T09:18:01.821Z",
		"size": 48610,
		"path": "../public/assets/dist--2zzWwns.js"
	},
	"/assets/dist-C0Xr32Ha.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1367-mEld4D+mHW1yyAal6TmfypKrwkA\"",
		"mtime": "2026-10-04T09:18:01.821Z",
		"size": 4967,
		"path": "../public/assets/dist-C0Xr32Ha.js"
	},
	"/assets/editor-DVB7LGv8.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"5f2f-JlLPRuKKxSZxLbZnA4+w9qojxQE\"",
		"mtime": "2026-10-04T09:18:01.822Z",
		"size": 24367,
		"path": "../public/assets/editor-DVB7LGv8.css"
	},
	"/assets/editor._id-By21sw9S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17188-/G7ENSKNan+rDEvcykveKQF5/vU\"",
		"mtime": "2026-10-04T09:18:01.821Z",
		"size": 94600,
		"path": "../public/assets/editor._id-By21sw9S.js"
	},
	"/assets/editor._id-DLJlmHpN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14ef-O9ZyPDcUEFO7uEOFhHmPZ1U6Rvc\"",
		"mtime": "2026-10-04T09:18:01.821Z",
		"size": 5359,
		"path": "../public/assets/editor._id-DLJlmHpN.js"
	},
	"/assets/index-D0I3ORWO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"539d9-LvtkuFQUj/A/VDeiwSHJYV8os2Q\"",
		"mtime": "2026-10-04T09:18:01.820Z",
		"size": 342489,
		"path": "../public/assets/index-D0I3ORWO.js"
	},
	"/assets/employees-BUnDDCn7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2486-OWQ/PGZSf6/Oh+DVX+g/4fUHWqY\"",
		"mtime": "2026-10-04T09:18:01.821Z",
		"size": 9350,
		"path": "../public/assets/employees-BUnDDCn7.js"
	},
	"/assets/jsx-runtime-D3jfb0Ew.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22c5-Qh7NbnnF5pPMnr2eoPNshytf37o\"",
		"mtime": "2026-10-04T09:18:01.821Z",
		"size": 8901,
		"path": "../public/assets/jsx-runtime-D3jfb0Ew.js"
	},
	"/assets/lib-B9aZaBLp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32440-NfmXaPgR1SHnUgBSv+iH6GThfeI\"",
		"mtime": "2026-10-04T09:18:01.821Z",
		"size": 205888,
		"path": "../public/assets/lib-B9aZaBLp.js"
	},
	"/assets/preload-helper-V4fbyVMP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"587-GqECalTqg7EqsnpQkZEw8EAQtBA\"",
		"mtime": "2026-10-04T09:18:01.822Z",
		"size": 1415,
		"path": "../public/assets/preload-helper-V4fbyVMP.js"
	},
	"/assets/printer-o89OV7yT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"135-ky5yzA7RbZCq4uLrDckpHQJg4tM\"",
		"mtime": "2026-10-04T09:18:01.822Z",
		"size": 309,
		"path": "../public/assets/printer-o89OV7yT.js"
	},
	"/assets/routes-COoDRaAO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27b5-0WX5ROmDffm+CD6DZ1fxlEa54Pg\"",
		"mtime": "2026-10-04T09:18:01.822Z",
		"size": 10165,
		"path": "../public/assets/routes-COoDRaAO.js"
	},
	"/assets/search-BWNgSYlS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-Ba/6MqMwErNpcB7ovGsgeDz6ZgY\"",
		"mtime": "2026-10-04T09:18:01.822Z",
		"size": 164,
		"path": "../public/assets/search-BWNgSYlS.js"
	},
	"/assets/store-XKPBpeA0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cb5-gGx26cSAVJcSLZ8a2X2l+8Khffg\"",
		"mtime": "2026-10-04T09:18:01.822Z",
		"size": 3253,
		"path": "../public/assets/store-XKPBpeA0.js"
	},
	"/assets/store-BxP11YXh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a72-96qKfqrrWk2QNXLTFHgOJryrDgs\"",
		"mtime": "2026-10-04T09:18:01.822Z",
		"size": 2674,
		"path": "../public/assets/store-BxP11YXh.js"
	},
	"/assets/styles-D4NsauDY.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"146a1-AcHi4buHjrd6REDu35761275W4g\"",
		"mtime": "2026-10-04T09:18:01.822Z",
		"size": 83617,
		"path": "../public/assets/styles-D4NsauDY.css"
	},
	"/logo.png": {
		"type": "image/png",
		"etag": "\"1079c6-0L/8IBYNoKvbw2Q3azz8Dhqxalg\"",
		"mtime": "2026-10-04T09:18:02.738Z",
		"size": 1079750,
		"path": "../public/logo.png"
	},
	"/assets/trash-2-8siQG3dG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a2-fdkqdOFuBeD7DZAz/T9qd3Qj18o\"",
		"mtime": "2026-10-04T09:18:01.822Z",
		"size": 418,
		"path": "../public/assets/trash-2-8siQG3dG.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_M5y53N = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_M5y53N
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
