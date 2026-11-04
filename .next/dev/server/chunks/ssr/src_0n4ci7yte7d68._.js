(()=>{"use strict";module.exports = [
"[project]/src/components/hero/Nav.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Nav",
    ()=>Nav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/image-component.js [app-ssr] (ecmascript) <export Image as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/content/site.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function Nav() {
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileOpen, setMobileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const isHero = pathname === "/" && !scrolled;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleScroll = ()=>{
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, {
            passive: true
        });
        return ()=>window.removeEventListener("scroll", handleScroll);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#f5f2ed]/90 backdrop-blur-md border-b border-[#e0dbd3] shadow-2xs" : "bg-transparent"}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto px-6 lg:px-10 flex items-center justify-between h-16 max-w-7xl",
                    children: [
                        isHero ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center transition-opacity hover:opacity-90 py-1",
                            "aria-label": "KeySpex home",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__["default"], {
                                src: "/brand/black.png",
                                alt: "KeySpex",
                                width: 180,
                                height: 66,
                                className: "h-10 sm:h-11 md:h-12 lg:h-[52px] w-auto object-contain",
                                priority: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/Nav.tsx",
                                lineNumber: 40,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/hero/Nav.tsx",
                            lineNumber: 35,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center gap-3 font-headline text-2xl lg:text-3xl font-bold tracking-tight text-[#1a1a1f] transition-opacity hover:opacity-90",
                            style: {
                                fontFamily: "var(--font-headline)"
                            },
                            "aria-label": "KeySpex home",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative size-7 shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__["default"], {
                                        src: "/brand/icon.png",
                                        alt: "KeySpex mark",
                                        fill: true,
                                        className: "object-contain",
                                        sizes: "28px"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/Nav.tsx",
                                        lineNumber: 57,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hero/Nav.tsx",
                                    lineNumber: 56,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "KEYSPEX",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "var(--brand)"
                                            },
                                            children: "."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/Nav.tsx",
                                            lineNumber: 66,
                                            columnNumber: 24
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/hero/Nav.tsx",
                                    lineNumber: 65,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/hero/Nav.tsx",
                            lineNumber: 50,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden md:flex items-center gap-8",
                            children: [
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navLinks"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: item.href,
                                        className: "text-sm text-[#5a5a65] hover:text-[#1a1a1f] transition-colors tracking-wide font-medium",
                                        children: item.label
                                    }, item.href, false, {
                                        fileName: "[project]/src/components/hero/Nav.tsx",
                                        lineNumber: 74,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/#contact",
                                    className: "text-sm font-medium tracking-wide uppercase px-5 py-2.5 bg-[#1a1a1f] text-[#f5f2ed] hover:bg-[#1a1a1f]/80 transition-colors rounded-none",
                                    children: "Talk to us"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hero/Nav.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/hero/Nav.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setMobileOpen(!mobileOpen),
                            className: "md:hidden flex flex-col gap-1.5 p-3 focus:outline-none",
                            "aria-label": "Toggle menu",
                            "aria-expanded": mobileOpen,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `block w-5 h-0.5 bg-[#1a1a1f] transition-transform duration-200 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hero/Nav.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `block w-5 h-0.5 bg-[#1a1a1f] transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hero/Nav.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `block w-5 h-0.5 bg-[#1a1a1f] transition-transform duration-200 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hero/Nav.tsx",
                                    lineNumber: 109,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/hero/Nav.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/hero/Nav.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/hero/Nav.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            mobileOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-40 bg-[#f5f2ed] pt-24 px-6 pb-10 flex flex-col justify-between md:hidden animate-in fade-in duration-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-6",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["navLinks"].map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                onClick: ()=>setMobileOpen(false),
                                className: "font-headline text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1a1f] hover:text-[var(--brand)] transition-colors flex items-baseline gap-4",
                                style: {
                                    fontFamily: "var(--font-headline)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-xs text-[#5a5a65]",
                                        children: [
                                            "0",
                                            idx + 1
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/hero/Nav.tsx",
                                        lineNumber: 130,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/Nav.tsx",
                                        lineNumber: 131,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, item.href, true, {
                                fileName: "[project]/src/components/hero/Nav.tsx",
                                lineNumber: 123,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/Nav.tsx",
                        lineNumber: 121,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-[#e0dbd3] pt-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/#contact",
                            onClick: ()=>setMobileOpen(false),
                            className: "flex items-center justify-center w-full py-4 text-sm font-semibold tracking-wide uppercase bg-[#1a1a1f] text-[#f5f2ed] rounded-none shadow-sm",
                            children: "Talk to us →"
                        }, void 0, false, {
                            fileName: "[project]/src/components/hero/Nav.tsx",
                            lineNumber: 137,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/Nav.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/hero/Nav.tsx",
                lineNumber: 120,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/hero/Nav.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/content/site.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "navLinks",
    ()=>navLinks,
    "site",
    ()=>site
]);
const navLinks = [
    {
        label: "Services",
        href: "/#services"
    },
    {
        label: "About",
        href: "/#about"
    },
    {
        label: "How we work",
        href: "/#process"
    },
    {
        label: "Why KeySpex",
        href: "/#why"
    },
    {
        label: "FAQ",
        href: "/#faq"
    }
];
const site = {
    name: "KeySpex",
    tagline: "Custom digital solutions for real businesses",
    hero: {
        eyebrow: "Custom digital solutions for real businesses \u00B7 Free consultation",
        title: "WEBSITES, TOOLS & MARKETING FOR",
        accent: "REAL BUSINESSES.",
        sub: "Websites, business tools, marketing and creative work from one digital partner. Shaped around what your business actually needs."
    },
    supports: [
        {
            n: "01",
            title: "Startups and new businesses",
            desc: "Build a credible first impression and right-sized digital foundations."
        },
        {
            n: "02",
            title: "Small & medium-sized businesses",
            desc: "Consolidate operations, improve customer reach, and look professional."
        },
        {
            n: "03",
            title: "Local and offline shops",
            desc: "Bring clarity to stock, sales, and local search visibility."
        },
        {
            n: "04",
            title: "Growing and established brands",
            desc: "Maintain visual consistency and run structured promotional campaigns."
        }
    ],
    categories: [
        {
            id: "A",
            name: "Website & Business Solutions",
            line: "Look credible. Stay organised."
        },
        {
            id: "B",
            name: "Digital Visibility & Marketing",
            line: "Be found. Stay consistent. Stand out."
        },
        {
            id: "C",
            name: "Creative & Content",
            line: "Look sharp. Tell your story."
        }
    ],
    services: [
        {
            slug: "business-portfolio-website",
            n: "01",
            cat: "A",
            title: "Business Portfolio Website",
            forWho: "Businesses that are hard to find, or hard to trust, online.",
            blurb: "A professional website that presents your services, work and contact details in one credible place, so potential customers can learn about you before they get in touch.",
            points: [
                "Services and portfolio shown clearly",
                "Contact details in one place",
                "A layout that works on phones and laptops"
            ],
            benefit: "A clear, credible first impression.",
            cta: "Not sure what your website should include? Ask us."
        },
        {
            slug: "business-dashboard",
            n: "02",
            cat: "A",
            title: "Business Dashboard",
            forWho: "Businesses whose data is scattered across sheets and notes.",
            blurb: "A digital interface that organises your business data and lets you monitor the metrics you choose to track. Features are agreed as part of your project scope.",
            points: [
                "Data organised in one place",
                "Selected metrics shown clearly",
                "Easier review and reporting"
            ],
            benefit: "Better visibility to support everyday decisions.",
            cta: "Tell us which numbers matter most to you."
        },
        {
            slug: "store-management-system",
            n: "03",
            cat: "A",
            title: "Store Management System",
            note: "Internal tool for offline stores, not an online store.",
            subnote: "This is an internal tool for running your shop, not a customer-facing online store. Exact features are agreed based on your store's needs.",
            forWho: "Shop owners who track stock and sales by hand.",
            blurb: "A digital system that helps offline store owners move away from manual records and keep inventory and revenue information in one place.",
            points: [
                "A more organised view of your inventory",
                "Digital tracking of relevant stock information",
                "Visibility into recorded sales and revenue",
                "Easier review of store records and performance"
            ],
            benefit: "A clearer picture of your stock and sales.",
            cta: "Running an offline store? Let's talk about what you track today."
        },
        {
            slug: "google-business-seo",
            n: "04",
            cat: "B",
            title: "Google Business SEO",
            forWho: "Local businesses with an incomplete or outdated Google listing.",
            blurb: "We help improve your Google Business Profile so your business information is accurate, complete and easy for people to understand.",
            points: [
                "Accurate business details",
                "Suitable categories and services",
                "A complete, well-presented profile"
            ],
            benefit: "A stronger local online presence.",
            cta: "Wondering how your listing looks today? Ask us."
        },
        {
            slug: "social-media-marketing",
            n: "05",
            cat: "B",
            title: "Social Media Marketing",
            forWho: "Brands whose posts look different every time, or stop altogether.",
            blurb: "Consistent, on-brand content that presents your products and services and builds recognition and engagement with your audience.",
            points: [
                "Content that reflects your brand",
                "Products and services showcased",
                "A consistent look across posts"
            ],
            benefit: "Stronger brand recognition over time.",
            cta: "Tell us what you'd like your audience to know."
        },
        {
            slug: "social-media-campaigns",
            n: "06",
            cat: "B",
            title: "Social Media Campaigns",
            forWho: "Launches, offers and seasons that deserve more than a single post.",
            blurb: "Coordinated promotional activity built around a defined business goal and run over an agreed period, such as a product launch, festival offer, seasonal push or brand-awareness drive.",
            flow: [
                "Goal",
                "Plan",
                "Create",
                "Launch"
            ],
            points: [
                "A defined objective for each campaign",
                "Coordinated communication over an agreed period"
            ],
            benefit: "A promotion with a plan behind it.",
            cta: "Got a launch or festival offer coming up? Let's plan it."
        },
        {
            slug: "graphic-designing",
            n: "07",
            cat: "C",
            title: "Graphic Designing",
            forWho: "Businesses whose materials look mismatched or unfinished.",
            blurb: "Professional design that improves how your business is presented and keeps your communication consistent across your brand and marketing materials.",
            points: [
                "Social media creatives",
                "Promotional graphics",
                "Banners and other marketing materials"
            ],
            benefit: "A polished, cohesive look across your brand.",
            cta: "Share what you need designed and we'll take it from there."
        },
        {
            slug: "video-editing",
            n: "08",
            cat: "C",
            title: "Video Editing",
            forWho: "Businesses with footage but no polished way to share it.",
            blurb: "Edited videos that present your products, services, promotional messages and brand story through engaging visual content.",
            points: [
                "Product and service videos",
                "Promotional and brand-story videos"
            ],
            benefit: "Clear, engaging content for your channels.",
            cta: "Have footage ready? Tell us what you want it to say."
        }
    ],
    marketingPrinciples: [
        {
            n: "01",
            title: "Be found.",
            desc: "Accurate local information so customers find you effortlessly."
        },
        {
            n: "02",
            title: "Stay consistent.",
            desc: "A steady, recognisable presence across every touchpoint."
        },
        {
            n: "03",
            title: "Promote with purpose.",
            desc: "A clear message designed for a clear, measurable goal."
        }
    ],
    process: [
        {
            n: "01",
            step: "Discuss",
            desc: "We talk through your goals, situation, and what you actually need."
        },
        {
            n: "02",
            step: "Identify",
            desc: "We identify suitable solutions and the right scope for your business."
        },
        {
            n: "03",
            step: "Agree",
            desc: "We agree on scope, deliverables, timeline and transparent pricing up front."
        },
        {
            n: "04",
            step: "Execute",
            desc: "We carry out the work with steady updates and zero guesswork."
        },
        {
            n: "05",
            step: "Hand over",
            desc: "We review and hand over everything, with clear guidance on how to use it."
        }
    ],
    why: [
        {
            n: "01",
            title: "Requirement-based and affordable",
            desc: "Solutions shaped around what your business needs, with scope and cost agreed up front. No bloated packages or hidden fees."
        },
        {
            n: "02",
            title: "Multiple services, one partner",
            desc: "Websites, business tools, marketing and creative work, all in one place — handled in sync, not by three disconnected agencies."
        },
        {
            n: "03",
            title: "Transparent communication",
            desc: "Clear conversations from the first call to the final handover. You always know what is being built and why."
        }
    ],
    faq: [
        {
            q: "Who do you work with?",
            a: "We work with startups, small and medium-sized businesses, local and offline shops, and growing or established brands across India."
        },
        {
            q: "How does pricing work?",
            a: "Every business is different, so every quote is too. We start with a free consultation to understand your requirements, then agree scope and cost together. Projects are scoped and quoted individually."
        },
        {
            q: "What is the Store Management System?",
            a: "It is an internal operational tool for running your offline shop (inventory tracking, stock review, and recorded sales) — not a customer-facing e-commerce or online store."
        },
        {
            q: "Do you promise specific rankings or enquiry numbers?",
            a: "No. Outcomes depend on your business, market dynamics, and agreed scope. KeySpex does not promise specific rankings, enquiry numbers or fixed timelines."
        },
        {
            q: "Can you tailor the scope to what I actually need?",
            a: "Yes. Every project begins with your requirements. If only one service fits your current stage, that is all we will propose."
        }
    ],
    disclaimer: "Outcomes depend on your business, market and agreed scope. KeySpex does not promise specific rankings, enquiry numbers or timelines.",
    contact: {
        email: "hello@keyspex.com",
        phone: "+91 98765 43210",
        location: "India",
        availability: "Accepting new client consultations"
    }
};
}),
];})()

//# sourceMappingURL=src_0n4ci7yte7d68._.js.map