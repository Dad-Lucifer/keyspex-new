(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/hero/HeroStatement.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroStatement",
    ()=>HeroStatement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$motion$2f$Reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/motion/Reveal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
/* ─────────────────────────────────────────────
   Counter animation hook
───────────────────────────────────────────── */ function useCounter(target, duration = 1400) {
    _s();
    const [count, setCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [started, setStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCounter.useEffect": ()=>{
            const el = ref.current;
            if (!el) return;
            const observer = new IntersectionObserver({
                "useCounter.useEffect": ([entry])=>{
                    if (entry.isIntersecting && !started) setStarted(true);
                }
            }["useCounter.useEffect"], {
                threshold: 0.4
            });
            observer.observe(el);
            return ({
                "useCounter.useEffect": ()=>observer.disconnect()
            })["useCounter.useEffect"];
        }
    }["useCounter.useEffect"], [
        started
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCounter.useEffect": ()=>{
            if (!started) return;
            let raf;
            const startTime = performance.now();
            function animate(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - (1 - progress) * (1 - progress);
                setCount(Math.round(eased * target));
                if (progress < 1) raf = requestAnimationFrame(animate);
            }
            raf = requestAnimationFrame(animate);
            return ({
                "useCounter.useEffect": ()=>cancelAnimationFrame(raf)
            })["useCounter.useEffect"];
        }
    }["useCounter.useEffect"], [
        started,
        target,
        duration
    ]);
    return {
        count,
        ref
    };
}
_s(useCounter, "kFU/K7UJraKbZi9hROPOtzcoROE=");
function StatCard({ target, suffix = "", label, sublabel }) {
    _s1();
    const { count, ref } = useCounter(target, 1200);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "relative flex items-start gap-3.5 sm:gap-4 border px-4 sm:px-5 py-3 sm:py-4",
        style: {
            borderColor: "#e5e7eb",
            background: "#ffffff"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute left-0 top-0 bottom-0 w-[3px]",
                style: {
                    background: "#0A5CF0"
                },
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/hero/HeroStatement.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-headline font-black leading-none tracking-tight",
                        style: {
                            fontFamily: "var(--font-headline)",
                            fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                            color: "#0a0a0f"
                        },
                        children: [
                            count,
                            suffix
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hero/HeroStatement.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 font-mono text-[9px] sm:text-[10px] tracking-[0.18em] uppercase",
                        style: {
                            color: "#6b7280",
                            fontFamily: "var(--font-mono)"
                        },
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroStatement.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    sublabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-0.5 font-mono text-[8px] sm:text-[9px] tracking-[0.1em] uppercase",
                        style: {
                            color: "#9ca3af",
                            fontFamily: "var(--font-mono)"
                        },
                        children: sublabel
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroStatement.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/hero/HeroStatement.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/hero/HeroStatement.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s1(StatCard, "J24G2fSn659oWPqJfIUfhhnM9gE=", false, function() {
    return [
        useCounter
    ];
});
_c = StatCard;
/* ─────────────────────────────────────────────
   Service pill list
───────────────────────────────────────────── */ const SERVICE_PILLS = [
    "Portfolio Website",
    "Business Dashboard",
    "Store Management",
    "Google SEO",
    "Social Marketing",
    "Campaigns",
    "Graphic Design",
    "Video Editing"
];
function HeroStatement() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full border-b",
        style: {
            background: "#ffffff",
            borderColor: "#e5e7eb"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-12 sm:py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-start",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$motion$2f$Reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase mb-5 sm:mb-7",
                                style: {
                                    color: "#0A5CF0",
                                    fontFamily: "var(--font-mono)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "relative flex size-2 shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute inline-flex size-full animate-ping opacity-70",
                                                style: {
                                                    background: "#0A5CF0",
                                                    borderRadius: "9999px"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                                lineNumber: 133,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "relative inline-flex size-2",
                                                style: {
                                                    background: "#0A5CF0",
                                                    borderRadius: "9999px"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                                lineNumber: 137,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                        lineNumber: 132,
                                        columnNumber: 15
                                    }, this),
                                    "WEBSITES · TOOLS · MARKETING · CREATIVE"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/hero/HeroStatement.tsx",
                            lineNumber: 127,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$motion$2f$Reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                            delay: 0.06,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-headline font-black uppercase leading-[0.96] tracking-tight",
                                style: {
                                    fontFamily: "var(--font-headline)",
                                    fontSize: "clamp(2rem, 5.5vw, 4.2rem)",
                                    color: "#0a0a0f"
                                },
                                children: [
                                    "ONE DIGITAL PARTNER.",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "#0A5CF0"
                                        },
                                        children: "EVERYTHING YOUR BUSINESS NEEDS."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                        lineNumber: 156,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                lineNumber: 147,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/hero/HeroStatement.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$motion$2f$Reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                            delay: 0.14,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 sm:mt-6 text-sm sm:text-base md:text-lg leading-relaxed",
                                style: {
                                    color: "#6b7280",
                                    maxWidth: "38rem"
                                },
                                children: "Websites, business tools, marketing and creative work — built around your requirements. Not a package. A partnership."
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                lineNumber: 163,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/hero/HeroStatement.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$motion$2f$Reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                            delay: 0.2,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 sm:mt-7 flex flex-wrap gap-1.5 sm:gap-2",
                                children: SERVICE_PILLS.map((pill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-1.5 border px-2.5 sm:px-3 py-1 sm:py-1.5 font-mono text-[9px] sm:text-[10px] tracking-[0.14em] uppercase transition-colors",
                                        style: {
                                            borderColor: "#e5e7eb",
                                            color: "#374151",
                                            background: "#f8f9fc"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "size-1.5 shrink-0",
                                                style: {
                                                    background: "#0A5CF0",
                                                    borderRadius: "9999px"
                                                },
                                                "aria-hidden": "true"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                                lineNumber: 181,
                                                columnNumber: 19
                                            }, this),
                                            pill
                                        ]
                                    }, pill, true, {
                                        fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                        lineNumber: 176,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                lineNumber: 174,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/hero/HeroStatement.tsx",
                            lineNumber: 173,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$motion$2f$Reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                            delay: 0.28,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/#contact",
                                        className: "w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-200 active:scale-[0.98] shadow-sm text-center",
                                        style: {
                                            background: "#0A5CF0",
                                            color: "#ffffff"
                                        },
                                        onMouseEnter: (e)=>e.currentTarget.style.background = "#0842B0",
                                        onMouseLeave: (e)=>e.currentTarget.style.background = "#0A5CF0",
                                        children: "Free consultation →"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                        lineNumber: 194,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "#services",
                                        className: "w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-200 border border-[#0a0a0f] text-[#0a0a0f] active:scale-[0.98] text-center",
                                        onMouseEnter: (e)=>{
                                            e.currentTarget.style.background = "#0a0a0f";
                                            e.currentTarget.style.color = "#ffffff";
                                        },
                                        onMouseLeave: (e)=>{
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.color = "#0a0a0f";
                                        },
                                        children: "See all services"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                        lineNumber: 208,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                lineNumber: 193,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/hero/HeroStatement.tsx",
                            lineNumber: 192,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$motion$2f$Reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                            delay: 0.34,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 font-mono text-[9px] sm:text-[10px] tracking-[0.12em] uppercase flex flex-wrap items-center gap-x-2 gap-y-1",
                                style: {
                                    color: "#9ca3af",
                                    fontFamily: "var(--font-mono)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[#0A5CF0] font-bold",
                                        children: "✓ Free consultation"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                        lineNumber: 231,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "opacity-40",
                                        children: "·"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                        lineNumber: 232,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Scope agreed before work begins"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                        lineNumber: 233,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "opacity-40",
                                        children: "·"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                        lineNumber: 234,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Transparent pricing"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                        lineNumber: 235,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                lineNumber: 227,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/hero/HeroStatement.tsx",
                            lineNumber: 226,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/hero/HeroStatement.tsx",
                    lineNumber: 125,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3 sm:gap-4 w-full mt-4 md:mt-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$motion$2f$Reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                            delay: 0.1,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border px-4 sm:px-5 py-3.5 sm:py-4 mb-1",
                                style: {
                                    borderColor: "#e5e7eb",
                                    background: "#f8f9fc"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold",
                                                style: {
                                                    color: "#6b7280",
                                                    fontFamily: "var(--font-mono)"
                                                },
                                                children: "SERVICES AT A GLANCE"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                                lineNumber: 248,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[8px] sm:text-[9px] text-[#0A5CF0] font-bold bg-[#0A5CF0]/10 px-2 py-0.5",
                                                children: "8 CAPABILITIES"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                                lineNumber: 254,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                        lineNumber: 247,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5 sm:space-y-2",
                                        children: [
                                            {
                                                cat: "A",
                                                name: "WEBSITE & BUSINESS SOLUTIONS",
                                                count: 3
                                            },
                                            {
                                                cat: "B",
                                                name: "DIGITAL VISIBILITY & MARKETING",
                                                count: 3
                                            },
                                            {
                                                cat: "C",
                                                name: "CREATIVE & CONTENT",
                                                count: 2
                                            }
                                        ].map(({ cat, name, count })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 sm:gap-3 py-1 border-b border-[#e5e7eb]/60 last:border-b-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] sm:text-xs font-black font-mono w-4 sm:w-5 shrink-0",
                                                        style: {
                                                            color: "#0A5CF0"
                                                        },
                                                        children: cat
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                                        lineNumber: 265,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-[8px] sm:text-[9px] tracking-[0.08em] uppercase flex-1 text-[#374151] truncate",
                                                        children: name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                                        lineNumber: 271,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-[8px] sm:text-[9px] font-bold shrink-0",
                                                        style: {
                                                            color: "#0A5CF0"
                                                        },
                                                        children: [
                                                            count,
                                                            " services"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                                        lineNumber: 276,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, cat, true, {
                                                fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                                lineNumber: 264,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                        lineNumber: 258,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                lineNumber: 243,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/hero/HeroStatement.tsx",
                            lineNumber: 242,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-3 sm:gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$motion$2f$Reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                                    delay: 0.16,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                        target: 8,
                                        suffix: "",
                                        label: "Services available",
                                        sublabel: "Across 3 categories"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                        lineNumber: 290,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                    lineNumber: 289,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$motion$2f$Reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                                    delay: 0.22,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                        target: 100,
                                        suffix: "%",
                                        label: "Free consultation",
                                        sublabel: "No upfront commitment"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                        lineNumber: 293,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                    lineNumber: 292,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$motion$2f$Reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                                    delay: 0.28,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                        target: 1,
                                        suffix: "",
                                        label: "Partner for everything",
                                        sublabel: "Websites · Tools · Marketing"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                        lineNumber: 296,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hero/HeroStatement.tsx",
                                    lineNumber: 295,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/hero/HeroStatement.tsx",
                            lineNumber: 288,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/hero/HeroStatement.tsx",
                    lineNumber: 241,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/hero/HeroStatement.tsx",
            lineNumber: 123,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/hero/HeroStatement.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, this);
}
_c1 = HeroStatement;
var _c, _c1;
__turbopack_context__.k.register(_c, "StatCard");
__turbopack_context__.k.register(_c1, "HeroStatement");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/hero/HeroVisualStage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroVisualStage",
    ()=>HeroVisualStage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@gsap/react/src/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
/* eslint-disable */ "use client";
;
;
;
// ─── Services Data (from services.md) ─────────────────────────────────────────
const SERVICES = [
    {
        id: 1,
        num: "01",
        tag: "WEBSITE",
        title: "BUSINESS PORTFOLIO WEBSITE",
        cat: "WEBSITE & BUSINESS"
    },
    {
        id: 2,
        num: "02",
        tag: "DASHBOARD",
        title: "BUSINESS DASHBOARD",
        cat: "WEBSITE & BUSINESS"
    },
    {
        id: 3,
        num: "03",
        tag: "STORE OS",
        title: "STORE MANAGEMENT SYSTEM",
        cat: "WEBSITE & BUSINESS"
    },
    {
        id: 4,
        num: "04",
        tag: "GOOGLE SEO",
        title: "GOOGLE BUSINESS SEO",
        cat: "VISIBILITY & MARKETING"
    },
    {
        id: 5,
        num: "05",
        tag: "SOCIAL",
        title: "SOCIAL MEDIA MARKETING",
        cat: "VISIBILITY & MARKETING"
    },
    {
        id: 6,
        num: "06",
        tag: "CAMPAIGNS",
        title: "SOCIAL MEDIA CAMPAIGNS",
        cat: "VISIBILITY & MARKETING"
    },
    {
        id: 7,
        num: "07",
        tag: "DESIGN",
        title: "GRAPHIC DESIGNING",
        cat: "CREATIVE & CONTENT"
    },
    {
        id: 8,
        num: "08",
        tag: "VIDEO",
        title: "VIDEO EDITING",
        cat: "CREATIVE & CONTENT"
    }
];
const WIPE = 0.24; // Ultra-short switch between two screens
// ─── Subtle Blueprint Grid Overlay ──────────────────────────────────────────
function Grid({ id, color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "absolute inset-0 w-full h-full pointer-events-none",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                    id: id,
                    width: "64",
                    height: "64",
                    patternUnits: "userSpaceOnUse",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M 64 0 L 0 0 0 64",
                        fill: "none",
                        stroke: color,
                        strokeWidth: "1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 28,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                width: "100%",
                height: "100%",
                fill: `url(#${id})`
            }, void 0, false, {
                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_c = Grid;
function HeroVisualStage() {
    _s();
    const stageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const tlRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const progRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const progRefMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dotRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const hudContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const btnRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const [activeIdx, setActiveIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [playing, setPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [motionOk, setMotionOk] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Client-side detection of reduced motion preference to avoid SSR mismatch
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroVisualStage.useEffect": ()=>{
            const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
            setMotionOk(!mq.matches);
            const onChange = {
                "HeroVisualStage.useEffect.onChange": (e)=>setMotionOk(!e.matches)
            }["HeroVisualStage.useEffect.onChange"];
            mq.addEventListener("change", onChange);
            return ({
                "HeroVisualStage.useEffect": ()=>mq.removeEventListener("change", onChange)
            })["HeroVisualStage.useEffect"];
        }
    }["HeroVisualStage.useEffect"], []);
    // ─── GSAP Master Timeline ──────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGSAP"])({
        "HeroVisualStage.useGSAP": ()=>{
            if (motionOk !== true) return;
            const stage = stageRef.current;
            if (!stage) return;
            const ease = "power4.out";
            const scenes = Array.from({
                length: 8
            }, {
                "HeroVisualStage.useGSAP.scenes": (_, i)=>stage.querySelector(`#sc${i + 1}`)
            }["HeroVisualStage.useGSAP.scenes"]);
            // Dot HUD styling without causing React re-renders
            let lastScene = -1;
            function highlightDot(idx) {
                dotRefs.current.forEach({
                    "HeroVisualStage.useGSAP.highlightDot": (d, i)=>{
                        if (!d) return;
                        d.style.background = i === idx ? "#0A5CF0" : "transparent";
                        d.style.borderColor = i === idx ? "#0A5CF0" : "rgba(255,255,255,0.3)";
                    }
                }["HeroVisualStage.useGSAP.highlightDot"]);
                if (idx !== lastScene) {
                    lastScene = idx;
                    setActiveIdx(idx);
                }
            }
            // Reset state — guarantees Scene 1 is the ONLY active slide on load and repeat
            function resetAll() {
                scenes.forEach({
                    "HeroVisualStage.useGSAP.resetAll": (sc, i)=>{
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(sc, {
                            zIndex: i === 0 ? 10 : 1,
                            autoAlpha: i === 0 ? 1 : 0,
                            clipPath: i === 0 ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)"
                        });
                    }
                }["HeroVisualStage.useGSAP.resetAll"]);
                if (progRef.current) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(progRef.current, {
                    width: "0%"
                });
                if (progRefMobile.current) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(progRefMobile.current, {
                    width: "0%"
                });
                highlightDot(0);
            }
            // Hard reset immediately on load
            resetAll();
            // Master Timeline
            const master = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].timeline({
                repeat: -1,
                onRepeat: resetAll,
                defaults: {
                    ease: "power2.out"
                }
            });
            tlRef.current = master;
            // ─── Scene Animation Builders ──────────────────────────────────────────
            // ─── Scene Animation Builders (Cinematic, Liquid-Smooth Entrances) ────
            // 01: Portfolio Website
            function addScene1(pos) {
                const sc = scenes[0];
                master.fromTo(sc.querySelectorAll(".h-line"), {
                    y: "105%",
                    opacity: 0
                }, {
                    y: "0%",
                    opacity: 1,
                    stagger: 0.08,
                    duration: 0.65,
                    ease: "power3.out"
                }, pos).fromTo(sc.querySelector(".sc-sub"), {
                    opacity: 0,
                    y: 12
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, "-=0.35").fromTo(sc.querySelector(".browser-mock"), {
                    opacity: 0,
                    y: 24,
                    scale: 0.96
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.65,
                    ease: "power2.out"
                }, "-=0.4").fromTo(sc.querySelectorAll(".br-card"), {
                    opacity: 0,
                    x: -16
                }, {
                    opacity: 1,
                    x: 0,
                    stagger: 0.08,
                    duration: 0.45,
                    ease: "power2.out"
                }, "-=0.3").fromTo(sc.querySelector(".br-live"), {
                    opacity: 0,
                    scale: 0.8
                }, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    ease: "back.out(1.5)"
                }, "-=0.2");
            }
            // 02: Business Dashboard
            function addScene2(pos) {
                const sc = scenes[1];
                master.fromTo(sc.querySelectorAll(".h-line"), {
                    y: "105%",
                    opacity: 0
                }, {
                    y: "0%",
                    opacity: 1,
                    stagger: 0.08,
                    duration: 0.65,
                    ease: "power3.out"
                }, pos).fromTo(sc.querySelector(".sc-sub"), {
                    opacity: 0,
                    y: 12
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, "-=0.35").fromTo(sc.querySelectorAll(".db-card"), {
                    opacity: 0,
                    y: 18,
                    scale: 0.95
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    stagger: 0.08,
                    duration: 0.5,
                    ease: "power2.out"
                }, "-=0.35").fromTo(sc.querySelector(".db-line"), {
                    scaleX: 0,
                    transformOrigin: "left center"
                }, {
                    scaleX: 1,
                    duration: 0.6,
                    ease: "power2.out"
                }, "-=0.2").fromTo(sc.querySelector(".db-spark polyline"), {
                    strokeDashoffset: 500
                }, {
                    strokeDashoffset: 0,
                    duration: 1.1,
                    ease: "power2.out"
                }, "-=0.4");
            }
            // 03: Store Management
            function addScene3(pos) {
                const sc = scenes[2];
                master.fromTo(sc.querySelectorAll(".h-line"), {
                    clipPath: "inset(0 100% 0 0)",
                    opacity: 0
                }, {
                    clipPath: "inset(0 0% 0 0)",
                    opacity: 1,
                    stagger: 0.08,
                    duration: 0.6,
                    ease: "power3.out"
                }, pos).fromTo(sc.querySelector(".sc-sub"), {
                    opacity: 0,
                    y: 12
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, "-=0.35").fromTo(sc.querySelectorAll(".st-row"), {
                    x: 20,
                    opacity: 0
                }, {
                    x: 0,
                    opacity: 1,
                    stagger: 0.07,
                    duration: 0.42,
                    ease: "power2.out"
                }, "-=0.3").fromTo(sc.querySelector(".st-total"), {
                    opacity: 0,
                    y: 10
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.45,
                    ease: "power2.out"
                }, "-=0.2");
            }
            // 04: Google Business SEO
            function addScene4(pos) {
                const sc = scenes[3];
                master.fromTo(sc.querySelectorAll(".h-line"), {
                    clipPath: "inset(0 100% 0 0)",
                    opacity: 0
                }, {
                    clipPath: "inset(0 0% 0 0)",
                    opacity: 1,
                    stagger: 0.08,
                    duration: 0.6,
                    ease: "power3.out"
                }, pos).fromTo(sc.querySelector(".sc-sub"), {
                    opacity: 0,
                    y: 12
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, "-=0.35").fromTo(sc.querySelector(".goog-card"), {
                    opacity: 0,
                    y: 22,
                    scale: 0.96
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out"
                }, "-=0.35").fromTo(sc.querySelectorAll(".goog-star"), {
                    scale: 0,
                    opacity: 0
                }, {
                    scale: 1,
                    opacity: 1,
                    stagger: 0.05,
                    duration: 0.3,
                    ease: "back.out(1.8)"
                }, "-=0.25").fromTo(sc.querySelectorAll(".goog-detail"), {
                    x: -12,
                    opacity: 0
                }, {
                    x: 0,
                    opacity: 1,
                    stagger: 0.07,
                    duration: 0.4
                }, "-=0.2").fromTo(sc.querySelector(".goog-badge"), {
                    scale: 1.3,
                    opacity: 0,
                    rotation: 6
                }, {
                    scale: 1,
                    opacity: 1,
                    rotation: 0,
                    duration: 0.4,
                    ease: "back.out(1.8)"
                }, "-=0.15").fromTo(sc.querySelectorAll(".radar-ring"), {
                    scale: 0.3,
                    opacity: 0.8
                }, {
                    scale: 2,
                    opacity: 0,
                    stagger: 0.22,
                    duration: 1.3,
                    ease: "power1.out"
                }, "-=0.5");
            }
            // 05: Social Media Marketing
            function addScene5(pos) {
                const sc = scenes[4];
                master.fromTo(sc.querySelectorAll(".h-line"), {
                    y: "105%",
                    opacity: 0
                }, {
                    y: "0%",
                    opacity: 1,
                    stagger: 0.08,
                    duration: 0.65,
                    ease: "power3.out"
                }, pos).fromTo(sc.querySelector(".sc-sub"), {
                    opacity: 0,
                    y: 12
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, "-=0.35").fromTo(sc.querySelectorAll(".post-card"), {
                    scale: 0.9,
                    opacity: 0,
                    y: 16
                }, {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    stagger: 0.09,
                    duration: 0.55,
                    ease: "power2.out"
                }, "-=0.35").fromTo(sc.querySelectorAll(".soc-stat"), {
                    y: 10,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.07,
                    duration: 0.4
                }, "-=0.2");
            }
            // 06: Social Media Campaigns
            function addScene6(pos) {
                const sc = scenes[5];
                master.fromTo(sc.querySelectorAll(".h-line"), {
                    clipPath: "inset(0 100% 0 0)",
                    opacity: 0
                }, {
                    clipPath: "inset(0 0% 0 0)",
                    opacity: 1,
                    stagger: 0.08,
                    duration: 0.6
                }, pos).fromTo(sc.querySelector(".sc-sub"), {
                    opacity: 0,
                    y: 12
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, "-=0.35").fromTo(sc.querySelectorAll(".pipe-node"), {
                    scale: 0,
                    opacity: 0
                }, {
                    scale: 1,
                    opacity: 1,
                    stagger: 0.09,
                    duration: 0.45,
                    ease: "back.out(1.8)"
                }, "-=0.3").fromTo(sc.querySelector(".pipe-bullet"), {
                    left: "0%"
                }, {
                    left: "calc(100% - 12px)",
                    duration: 1.2,
                    ease: "power1.inOut"
                }, "-=0.25").fromTo(sc.querySelectorAll(".pipe-tag"), {
                    opacity: 0,
                    y: 8
                }, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.07,
                    duration: 0.38
                }, "-=0.3");
            }
            // 07: Graphic Designing
            function addScene7(pos) {
                const sc = scenes[6];
                master.fromTo(sc.querySelectorAll(".h-line"), {
                    y: "105%",
                    opacity: 0
                }, {
                    y: "0%",
                    opacity: 1,
                    stagger: 0.08,
                    duration: 0.65,
                    ease: "power3.out"
                }, pos).fromTo(sc.querySelector(".sc-sub"), {
                    opacity: 0,
                    y: 12
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, "-=0.35").fromTo(sc.querySelector(".canvas-frame"), {
                    opacity: 0,
                    scale: 0.95
                }, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.55,
                    ease: "power2.out"
                }, "-=0.35").fromTo(sc.querySelector(".canvas-dark"), {
                    scaleX: 0,
                    transformOrigin: "left center"
                }, {
                    scaleX: 1,
                    duration: 0.55,
                    ease: "power3.out"
                }, "-=0.25").fromTo(sc.querySelectorAll(".canvas-bar"), {
                    scaleX: 0,
                    transformOrigin: "left center"
                }, {
                    scaleX: 1,
                    stagger: 0.08,
                    duration: 0.35
                }, "-=0.2").fromTo(sc.querySelector(".canvas-accent"), {
                    scale: 0,
                    opacity: 0
                }, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.35,
                    ease: "back.out(1.8)"
                }, "-=0.15").fromTo(sc.querySelectorAll(".canvas-handle"), {
                    scale: 0,
                    opacity: 0
                }, {
                    scale: 1,
                    opacity: 1,
                    stagger: 0.04,
                    duration: 0.28,
                    ease: "back.out(1.8)"
                }, "-=0.15").fromTo(sc.querySelector(".export-bar"), {
                    scaleX: 0,
                    transformOrigin: "left center"
                }, {
                    scaleX: 1,
                    duration: 0.9,
                    ease: "none"
                }, "-=0.3");
            }
            // 08: Video Editing
            function addScene8(pos) {
                const sc = scenes[7];
                master.fromTo(sc.querySelectorAll(".h-line"), {
                    clipPath: "inset(0 100% 0 0)",
                    opacity: 0
                }, {
                    clipPath: "inset(0 0% 0 0)",
                    opacity: 1,
                    stagger: 0.08,
                    duration: 0.6,
                    ease: "power3.out"
                }, pos).fromTo(sc.querySelector(".sc-sub"), {
                    opacity: 0,
                    y: 12
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                }, "-=0.35").fromTo(sc.querySelector(".vid-monitor"), {
                    opacity: 0,
                    scale: 0.95
                }, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.55,
                    ease: "power2.out"
                }, "-=0.35").fromTo(sc.querySelector(".vid-playbtn"), {
                    scale: 0,
                    opacity: 0
                }, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.38,
                    ease: "back.out(1.8)"
                }, "-=0.25").fromTo(sc.querySelectorAll(".vid-track"), {
                    scaleX: 0,
                    transformOrigin: "left center"
                }, {
                    scaleX: 1,
                    stagger: 0.08,
                    duration: 0.45,
                    ease: "power2.out"
                }, "-=0.2").fromTo(sc.querySelector(".vid-playhead"), {
                    left: "0%"
                }, {
                    left: "calc(100% - 2px)",
                    duration: 1.4,
                    ease: "none"
                }, "-=0.3").fromTo(sc.querySelectorAll(".vid-label"), {
                    opacity: 0,
                    y: 6
                }, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.08,
                    duration: 0.28
                }, "-=1.1");
            }
            const builders = [
                addScene1,
                addScene2,
                addScene3,
                addScene4,
                addScene5,
                addScene6,
                addScene7,
                addScene8
            ];
            // Assemble all 8 scenes sequentially on master timeline
            for(let i = 0; i < 8; i++){
                const label = `scene-${i}`;
                const currentScene = scenes[i];
                const nextScene = scenes[(i + 1) % 8];
                const isVertical = i % 2 === 1;
                // Label for instant laser-precise seeking
                master.addLabel(label);
                // Update HUD dot and active index
                master.call({
                    "HeroVisualStage.useGSAP": ()=>{
                        highlightDot(i);
                    }
                }["HeroVisualStage.useGSAP"]);
                // Scene content entrance animations (smooth, liquid reveals)
                builders[i](label);
                // Progress bar for this scene (~3.2s total smooth cycle)
                if (progRef.current) {
                    master.fromTo(progRef.current, {
                        width: "0%"
                    }, {
                        width: "100%",
                        duration: 3.2,
                        ease: "none"
                    }, label);
                }
                if (progRefMobile.current) {
                    master.fromTo(progRefMobile.current, {
                        width: "0%"
                    }, {
                        width: "100%",
                        duration: 3.2,
                        ease: "none"
                    }, label);
                }
                // Comfortable reading dwell time
                master.to({}, {
                    duration: 2.2
                });
                // Ultra-short switch between two screens (rapid snap/cut: 0.24s)
                master.set(nextScene, {
                    zIndex: 20,
                    autoAlpha: 1,
                    clipPath: isVertical ? "inset(100% 0 0 0)" : "inset(0 100% 0 0)"
                }).to(nextScene, {
                    clipPath: "inset(0% 0 0 0)",
                    duration: WIPE,
                    ease
                }).set(currentScene, {
                    autoAlpha: 0,
                    zIndex: 1,
                    clipPath: "inset(0 100% 0 0)"
                }).set(nextScene, {
                    zIndex: 10
                });
            }
            // Explicitly start at slide 1, time 0 immediately
            master.seek(0);
            master.play();
            // Pause/resume when tab is hidden or element scrolls off screen
            const onVis = {
                "HeroVisualStage.useGSAP.onVis": ()=>{
                    document.hidden ? master.pause() : master.resume();
                }
            }["HeroVisualStage.useGSAP.onVis"];
            document.addEventListener("visibilitychange", onVis);
            const io = new IntersectionObserver({
                "HeroVisualStage.useGSAP": ([e])=>e.isIntersecting ? master.resume() : master.pause()
            }["HeroVisualStage.useGSAP"], {
                threshold: 0.1
            });
            io.observe(stage);
            return ({
                "HeroVisualStage.useGSAP": ()=>{
                    document.removeEventListener("visibilitychange", onVis);
                    io.disconnect();
                    master.kill();
                }
            })["HeroVisualStage.useGSAP"];
        }
    }["HeroVisualStage.useGSAP"], {
        scope: stageRef,
        dependencies: [
            motionOk
        ]
    });
    // ─── Controls (Instant Kinetic Snap on Switch) ───────────────────────────
    const jump = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HeroVisualStage.useCallback[jump]": (idx)=>{
            if (!tlRef.current || !stageRef.current) return;
            const stage = stageRef.current;
            const scenes = Array.from({
                length: 8
            }, {
                "HeroVisualStage.useCallback[jump].scenes": (_, i)=>stage.querySelector(`#sc${i + 1}`)
            }["HeroVisualStage.useCallback[jump].scenes"]);
            const target = scenes[idx];
            // Instantly hide other scenes and wipe target into view with zero delay
            scenes.forEach({
                "HeroVisualStage.useCallback[jump]": (sc, i)=>{
                    if (i !== idx) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(sc, {
                            zIndex: 1,
                            autoAlpha: 0,
                            clipPath: "inset(0 100% 0 0)"
                        });
                    }
                }
            }["HeroVisualStage.useCallback[jump]"]);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(target, {
                zIndex: 20,
                autoAlpha: 1,
                clipPath: "inset(0 100% 0 0)"
            }, {
                clipPath: "inset(0 0% 0 0)",
                duration: 0.2,
                ease: "power4.out",
                onComplete: {
                    "HeroVisualStage.useCallback[jump]": ()=>{
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(target, {
                            zIndex: 10
                        });
                    }
                }["HeroVisualStage.useCallback[jump]"]
            });
            // Update HUD dots instantly
            dotRefs.current.forEach({
                "HeroVisualStage.useCallback[jump]": (d, i)=>{
                    if (!d) return;
                    d.style.background = i === idx ? "#0A5CF0" : "transparent";
                    d.style.borderColor = i === idx ? "#0A5CF0" : "rgba(255,255,255,0.3)";
                }
            }["HeroVisualStage.useCallback[jump]"]);
            tlRef.current.seek(`scene-${idx}`);
            tlRef.current.play();
            setPlaying(true);
            setActiveIdx(idx);
        }
    }["HeroVisualStage.useCallback[jump]"], []);
    const togglePlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HeroVisualStage.useCallback[togglePlay]": ()=>{
            if (!tlRef.current) return;
            if (playing) {
                tlRef.current.pause();
                setPlaying(false);
            } else {
                tlRef.current.resume();
                setPlaying(true);
            }
        }
    }["HeroVisualStage.useCallback[togglePlay]"], [
        playing
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroVisualStage.useEffect": ()=>{
            const onKey = {
                "HeroVisualStage.useEffect.onKey": (e)=>{
                    if (e.key === "ArrowRight") {
                        jump((activeIdx + 1) % 8);
                    }
                    if (e.key === "ArrowLeft") {
                        jump((activeIdx + 7) % 8);
                    }
                    if (e.key === " ") {
                        e.preventDefault();
                        togglePlay();
                    }
                }
            }["HeroVisualStage.useEffect.onKey"];
            window.addEventListener("keydown", onKey);
            return ({
                "HeroVisualStage.useEffect": ()=>window.removeEventListener("keydown", onKey)
            })["HeroVisualStage.useEffect"];
        }
    }["HeroVisualStage.useEffect"], [
        activeIdx,
        jump,
        togglePlay
    ]);
    // Auto-center active HUD tab on mobile / small screens
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroVisualStage.useEffect": ()=>{
            const btn = btnRefs.current[activeIdx];
            if (btn && hudContainerRef.current) {
                btn.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                    block: "nearest"
                });
            }
        }
    }["HeroVisualStage.useEffect"], [
        activeIdx
    ]);
    // Native mobile touch swipe gestures (fluid thumb swipe left/right)
    const touchStartX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const touchStartY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const onTouchStart = (e)=>{
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e)=>{
        if (touchStartX.current === null || touchStartY.current === null) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX.current;
        const deltaY = e.changedTouches[0].clientY - touchStartY.current;
        if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
            if (deltaX < 0) {
                jump((activeIdx + 1) % 8);
            } else {
                jump((activeIdx + 7) % 8);
            }
        }
        touchStartX.current = null;
        touchStartY.current = null;
    };
    const currentSvc = SERVICES[activeIdx];
    // ─── Shared JSX Helpers ───────────────────────────────────────────────────
    function Eyebrow({ text, light = false }) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "h-line anim font-mono text-[9px] sm:text-[11px] tracking-[0.25em] uppercase mb-2 sm:mb-4",
            style: {
                color: light ? "rgba(255,255,255,0.7)" : "#0A5CF0",
                fontFamily: "var(--font-mono)",
                opacity: 0
            },
            children: text
        }, void 0, false, {
            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
            lineNumber: 586,
            columnNumber: 7
        }, this);
    }
    // ─── Render ───────────────────────────────────────────────────────────────
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: stageRef,
        onTouchStart: onTouchStart,
        onTouchEnd: onTouchEnd,
        className: "relative w-full overflow-hidden select-none h-[calc(100svh-64px)] min-h-[580px] sm:min-h-[620px] md:h-[calc(100vh-64px)] md:min-h-[580px]",
        style: {
            marginTop: 64
        },
        "aria-label": "KeySpex — Digital Services Showcase",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-2.5 sm:top-4 left-0 right-0 z-50 flex justify-center px-3 sm:px-4",
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: hudContainerRef,
                    className: "flex items-center border border-[#1f2937]/90 bg-[#0a0a0f]/90 backdrop-blur-md shadow-2xl overflow-x-auto max-w-full rounded-full sm:rounded-none px-1 sm:px-0",
                    style: {
                        scrollbarWidth: "none"
                    },
                    children: SERVICES.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            ref: (el)=>{
                                btnRefs.current[i] = el;
                            },
                            onClick: ()=>jump(i),
                            className: "relative px-2.5 sm:px-4 py-1.5 sm:py-2 font-mono text-[9px] sm:text-[11px] font-bold tracking-wider transition-all cursor-pointer border-r border-[#1f2937]/60 last:border-r-0 shrink-0 rounded-full sm:rounded-none",
                            style: {
                                background: i === activeIdx ? "#0A5CF0" : "transparent",
                                color: i === activeIdx ? "#ffffff" : "#9ca3af"
                            },
                            title: s.title,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden sm:inline mr-1 opacity-60",
                                    children: s.num
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 622,
                                    columnNumber: 15
                                }, this),
                                s.tag,
                                i === activeIdx && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden sm:block absolute bottom-0 left-0 right-0 h-[2px] bg-white/70"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 625,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, s.id, true, {
                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                            lineNumber: 611,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                    lineNumber: 605,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                lineNumber: 604,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "sc1",
                className: "absolute inset-0 flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-14 lg:px-20 pt-10 sm:pt-12 md:pt-0 pb-14 sm:pb-16 md:pb-0 gap-3.5 sm:gap-4 md:gap-12 overflow-hidden",
                style: {
                    background: "#0a0a0f",
                    zIndex: 10,
                    opacity: 1
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Grid, {
                        id: "g1",
                        color: "rgba(10,92,240,0.08)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 636,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 flex flex-col justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Eyebrow, {
                                text: "01 / WEBSITE & BUSINESS SOLUTIONS"
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 640,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-headline font-black uppercase leading-[0.94] tracking-tight",
                                style: {
                                    fontFamily: "var(--font-headline)",
                                    fontSize: "clamp(1.75rem,4.8vw,5.2rem)",
                                    color: "#f8f9fc"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-line anim block",
                                            style: {
                                                opacity: 0
                                            },
                                            children: "YOUR BUSINESS"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 643,
                                            columnNumber: 46
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 643,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-line anim block",
                                            style: {
                                                opacity: 0
                                            },
                                            children: "DESERVES TO"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 644,
                                            columnNumber: 46
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 644,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-line anim block",
                                            style: {
                                                opacity: 0
                                            },
                                            children: [
                                                "BE ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: "#0A5CF0",
                                                        textShadow: "0 0 24px rgba(10,92,240,0.6)"
                                                    },
                                                    children: "FOUND."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 647,
                                                    columnNumber: 20
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 646,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 645,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 641,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "sc-sub anim mt-2 sm:mt-4 font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase leading-relaxed max-w-md",
                                style: {
                                    color: "#9ca3af",
                                    fontFamily: "var(--font-mono)",
                                    opacity: 0
                                },
                                children: "A high-performance portfolio that turns visitors into paying clients before you even pick up the phone."
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 651,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2.5 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2",
                                children: [
                                    "LCP < 0.6s",
                                    "100/100 SPEED",
                                    "SEO READY"
                                ].map((tag, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 sm:py-1 border border-[#1f2937] bg-[#121318] text-[#60a5fa] font-bold",
                                        children: tag
                                    }, i, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 657,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 655,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 639,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 flex items-center justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0",
                        "aria-hidden": "true",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "browser-mock anim w-full max-w-[330px] sm:max-w-[390px] md:max-w-[440px] border border-[#1f2937] bg-[#0d0e12] shadow-2xl overflow-hidden",
                            style: {
                                opacity: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 border-b border-[#1f2937] bg-[#121318]",
                                    children: [
                                        [
                                            "#0A5CF0",
                                            "#374151",
                                            "#1f2937"
                                        ].map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "size-2 sm:size-2.5 rounded-full",
                                                style: {
                                                    background: c
                                                }
                                            }, i, false, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 670,
                                                columnNumber: 17
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ml-2 sm:ml-3 flex-1 h-5 border border-[#1f2937] bg-[#0a0a0f] px-2 flex items-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[8px] sm:text-[9px] text-[#60a5fa] whitespace-nowrap truncate",
                                                children: "https://yourdomain.com"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 673,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 672,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[7px] sm:text-[8px] text-[#60a5fa] ml-2 flex items-center gap-1 shrink-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "size-1.5 rounded-full bg-[#60a5fa] animate-pulse"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 678,
                                                    columnNumber: 17
                                                }, this),
                                                "LIVE"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 677,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 668,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-3.5 sm:px-5 py-2.5 sm:py-4 space-y-2 sm:space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between pb-1.5 sm:pb-2 border-b border-[#1f2937]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-headline font-black text-[10px] sm:text-xs text-white tracking-wider",
                                                    children: "YOUR BRAND STUDIO"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 685,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "br-live anim font-mono text-[9px] sm:text-[10px] bg-[#0A5CF0] text-white px-2 sm:px-3 py-0.5 sm:py-1 font-bold",
                                                    style: {
                                                        opacity: 0
                                                    },
                                                    children: "BOOK CALL →"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 686,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 684,
                                            columnNumber: 15
                                        }, this),
                                        [
                                            {
                                                label: "CORE SERVICES & PORTFOLIO",
                                                stat: "0.3s LOAD"
                                            },
                                            {
                                                label: "LEAD INTAKE — WHATSAPP",
                                                stat: "3.4× CONVERT"
                                            },
                                            {
                                                label: "MOBILE + DESKTOP RESPONSIVE",
                                                stat: "ALL DEVICES"
                                            }
                                        ].map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "br-card anim flex items-center justify-between border border-[#1f2937] bg-[#13141a] px-2.5 sm:px-3 py-1.5 sm:py-2.5",
                                                style: {
                                                    opacity: 0
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-[9px] sm:text-[10px] text-white/70 font-bold tracking-wide truncate",
                                                        children: item.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                        lineNumber: 696,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-[8px] sm:text-[9px] text-[#0A5CF0] font-bold border border-[#0A5CF0]/30 px-1.5 py-0.5 whitespace-nowrap ml-2 shrink-0",
                                                        children: item.stat
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                        lineNumber: 697,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 695,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 683,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                            lineNumber: 666,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 665,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                lineNumber: 635,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "sc2",
                className: "absolute inset-0 flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-14 lg:px-20 pt-10 sm:pt-12 md:pt-0 pb-14 sm:pb-16 md:pb-0 gap-3.5 sm:gap-4 md:gap-12 overflow-hidden",
                style: {
                    background: "#f8f9fc",
                    zIndex: 1,
                    opacity: 0,
                    clipPath: "inset(0 100% 0 0)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Grid, {
                        id: "g2",
                        color: "rgba(10,92,240,0.06)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 709,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 flex flex-col justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-hidden mb-1 sm:mb-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "h-line anim font-mono text-[9px] sm:text-[11px] tracking-[0.25em] uppercase",
                                    style: {
                                        color: "#0A5CF0",
                                        fontFamily: "var(--font-mono)",
                                        opacity: 0
                                    },
                                    children: "02 / BUSINESS TOOLS & METRICS"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 713,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 712,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-headline font-black uppercase leading-[0.94] tracking-tight text-[#0a0a0f]",
                                style: {
                                    fontFamily: "var(--font-headline)",
                                    fontSize: "clamp(1.75rem,4.8vw,5.2rem)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-line anim block",
                                            style: {
                                                opacity: 0
                                            },
                                            children: "YOUR DATA."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 719,
                                            columnNumber: 46
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 719,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-line anim block",
                                            style: {
                                                opacity: 0
                                            },
                                            children: [
                                                "ONE CLEAR ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: "#0A5CF0"
                                                    },
                                                    children: "DASHBOARD."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 722,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 721,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 720,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 717,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "sc-sub anim mt-2 sm:mt-4 font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase leading-relaxed max-w-md text-[#6b7280]",
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    opacity: 0
                                },
                                children: "From scattered WhatsApp notes and paper ledgers to a live command interface with real metrics."
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 726,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2.5 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2",
                                children: [
                                    "REAL-TIME SYNC",
                                    "MULTI-STORE",
                                    "ZERO LATENCY"
                                ].map((tag, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 sm:py-1 border border-[#e5e7eb] bg-white text-[#0A5CF0] font-bold",
                                        children: tag
                                    }, i, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 732,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 730,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 711,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 flex items-center justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0",
                        "aria-hidden": "true",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full max-w-[330px] sm:max-w-[390px] md:max-w-[440px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3",
                                    children: [
                                        {
                                            val: "₹4.8L",
                                            label: "MONTHLY REVENUE",
                                            delta: "↑ 24.8% MOM"
                                        },
                                        {
                                            val: "99.4%",
                                            label: "ORDER FULFILLMENT",
                                            delta: "TARGET: 98%"
                                        },
                                        {
                                            val: "1,240",
                                            label: "ACTIVE CUSTOMERS",
                                            delta: "+38 THIS WEEK"
                                        },
                                        {
                                            val: "18.2H",
                                            label: "AVG TURNAROUND",
                                            delta: "↓ 4.6H FASTER"
                                        }
                                    ].map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "db-card anim relative border border-[#e5e7eb] bg-white px-2.5 sm:px-4 py-2 sm:py-3 shadow-xs",
                                            style: {
                                                opacity: 0
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "absolute top-0 left-0 bottom-0 w-[2.5px] sm:w-[3px] bg-[#0A5CF0]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 749,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-headline font-black text-base sm:text-xl leading-none text-[#0a0a0f]",
                                                    children: m.val
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 750,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-mono text-[7px] sm:text-[8px] tracking-widest text-[#6b7280] uppercase mt-1 truncate",
                                                    children: m.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 751,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-mono text-[7px] sm:text-[8px] text-[#0A5CF0] font-bold mt-0.5",
                                                    children: m.delta
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 752,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 748,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 741,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "db-line anim h-[2px] bg-[#0A5CF0] mb-2 sm:mb-3",
                                    style: {
                                        transformOrigin: "left center",
                                        transform: "scaleX(0)"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 758,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "db-spark border border-[#e5e7eb] bg-white p-2.5 sm:p-3 shadow-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-1 sm:mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono text-[8px] sm:text-[9px] text-[#4b5563] uppercase font-bold tracking-wider",
                                                    children: "REVENUE SPARKLINE (30d)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 763,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono text-[8px] sm:text-[9px] text-[#0A5CF0] font-bold",
                                                    children: "PEAK: ₹2.8L"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 764,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 762,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            viewBox: "0 0 360 70",
                                            className: "w-full h-12 sm:h-16",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                        id: "spGrad",
                                                        x1: "0",
                                                        y1: "0",
                                                        x2: "0",
                                                        y2: "1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                offset: "0%",
                                                                stopColor: "#0A5CF0",
                                                                stopOpacity: "0.3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                                lineNumber: 769,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                offset: "100%",
                                                                stopColor: "#0A5CF0",
                                                                stopOpacity: "0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                                lineNumber: 770,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                        lineNumber: 768,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 767,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                                    fill: "url(#spGrad)",
                                                    points: "0,65 40,52 80,58 120,36 160,44 200,22 240,32 280,14 320,20 360,8 360,70 0,70"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 773,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                    className: "anim",
                                                    fill: "none",
                                                    stroke: "#0A5CF0",
                                                    strokeWidth: "2",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeDasharray: "500",
                                                    style: {
                                                        strokeDashoffset: 500
                                                    },
                                                    points: "0,65 40,52 80,58 120,36 160,44 200,22 240,32 280,14 320,20 360,8"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 775,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "360",
                                                    cy: "8",
                                                    r: "3.5",
                                                    fill: "#0A5CF0"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 782,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 766,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 761,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                            lineNumber: 740,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 739,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                lineNumber: 708,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "sc3",
                className: "absolute inset-0 flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-14 lg:px-20 pt-10 sm:pt-12 md:pt-0 pb-14 sm:pb-16 md:pb-0 gap-3.5 sm:gap-4 md:gap-12 overflow-hidden",
                style: {
                    background: "#0e131d",
                    zIndex: 1,
                    opacity: 0,
                    clipPath: "inset(0 100% 0 0)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Grid, {
                        id: "g3",
                        color: "rgba(10,92,240,0.06)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 793,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 flex flex-col justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Eyebrow, {
                                text: "03 / RETAIL & STORE SOLUTIONS",
                                light: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 796,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-headline font-black uppercase leading-[0.94] tracking-tight text-[#f8f9fc]",
                                style: {
                                    fontFamily: "var(--font-headline)",
                                    fontSize: "clamp(1.75rem,4.8vw,5.2rem)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-line anim block",
                                        style: {
                                            clipPath: "inset(0 100% 0 0)",
                                            opacity: 0
                                        },
                                        children: "STOP COUNTING"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 799,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-line anim block",
                                        style: {
                                            clipPath: "inset(0 100% 0 0)",
                                            opacity: 0
                                        },
                                        children: "INVENTORY"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 800,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-line anim block",
                                        style: {
                                            clipPath: "inset(0 100% 0 0)",
                                            opacity: 0
                                        },
                                        children: [
                                            "BY ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "#0A5CF0"
                                                },
                                                children: "HAND."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 802,
                                                columnNumber: 18
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 801,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 797,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "sc-sub anim mt-2 sm:mt-4 font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase leading-relaxed max-w-md text-[#9ca3af]",
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    opacity: 0
                                },
                                children: "Digital stock and sales ledger for offline store owners — barcode scanning, billing, and re-order alerts in one tap."
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 805,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2.5 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2",
                                children: [
                                    "INSTANT BILLING",
                                    "BARCODE SCAN",
                                    "AUTO-ALERT"
                                ].map((tag, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 sm:py-1 border border-[#1f2937] bg-[#12141e] text-[#60a5fa] font-bold",
                                        children: tag
                                    }, i, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 811,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 809,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 795,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 flex items-center justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0",
                        "aria-hidden": "true",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full max-w-[330px] sm:max-w-[390px] md:max-w-[460px] border border-[#374151] bg-[#0c1017] shadow-2xl overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border-b border-[#1f2937] bg-[#12141e]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[9px] sm:text-[10px] text-white font-bold tracking-widest uppercase",
                                            children: "STORE_OS // SKU LEDGER"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 821,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[8px] sm:text-[9px] text-[#60a5fa] border border-[#60a5fa]/40 px-2 py-0.5 flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "size-1.5 rounded-full bg-[#60a5fa] animate-pulse"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 823,
                                                    columnNumber: 17
                                                }, this),
                                                "SCANNER ON"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 822,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 820,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-5 bg-[#161d2b] px-2.5 sm:px-3 py-1.5 sm:py-2 text-[8px] sm:text-[9px] font-mono text-[#9ca3af] font-bold uppercase tracking-wider",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "col-span-2",
                                            children: "SKU ITEM"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 828,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "STOCK"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 828,
                                            columnNumber: 59
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "SOLD"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 828,
                                            columnNumber: 77
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-right",
                                            children: "STATUS"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 828,
                                            columnNumber: 94
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 827,
                                    columnNumber: 13
                                }, this),
                                [
                                    {
                                        sku: "OVERSHIRT-1048",
                                        stock: "142",
                                        sold: "38",
                                        status: "IN STOCK",
                                        dot: "#60a5fa"
                                    },
                                    {
                                        sku: "TROUSER-2091",
                                        stock: "08",
                                        sold: "94",
                                        status: "LOW STOCK",
                                        dot: "#9ca3af"
                                    },
                                    {
                                        sku: "HOODIE-3120",
                                        stock: "00",
                                        sold: "210",
                                        status: "RESTOCK",
                                        dot: "#0A5CF0"
                                    },
                                    {
                                        sku: "LEATHER-4910",
                                        stock: "64",
                                        sold: "19",
                                        status: "IN STOCK",
                                        dot: "#60a5fa"
                                    }
                                ].map((row, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "st-row anim grid grid-cols-5 px-2.5 sm:px-3 py-2 sm:py-2.5 border-t border-[#1f2937] text-[9px] sm:text-[10px] font-mono text-white items-center bg-[#0e131d]",
                                        style: {
                                            opacity: 0
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "col-span-2 font-bold text-[10px] sm:text-xs truncate mr-1",
                                                children: row.sku
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 837,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[#60a5fa]",
                                                children: row.stock
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 838,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[#9ca3af]",
                                                children: row.sold
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 839,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-right text-[8px] sm:text-[9px] font-bold flex items-center justify-end gap-1",
                                                style: {
                                                    color: row.dot
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "●"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                        lineNumber: 841,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "hidden sm:inline",
                                                        children: row.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                        lineNumber: 841,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 840,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 836,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "st-total anim px-3 sm:px-4 py-2 sm:py-3 border-t border-[#0A5CF0]/30 bg-[#0A5CF0]/10 flex items-center justify-between",
                                    style: {
                                        opacity: 0
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-mono text-[8px] sm:text-[9px] text-[#60a5fa] uppercase font-bold tracking-wider",
                                                    children: "TOTAL REVENUE TODAY"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 847,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-headline font-black text-base sm:text-xl text-white mt-0.5",
                                                    children: "₹38,450.00"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 848,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 846,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[9px] sm:text-[10px] bg-[#0A5CF0] text-white px-2.5 sm:px-3 py-1 font-bold uppercase",
                                            children: "EXPORT →"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 850,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 845,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                            lineNumber: 819,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 818,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                lineNumber: 792,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "sc4",
                className: "absolute inset-0 flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-14 lg:px-20 pt-10 sm:pt-12 md:pt-0 pb-14 sm:pb-16 md:pb-0 gap-3.5 sm:gap-4 md:gap-12 overflow-hidden",
                style: {
                    background: "#0A5CF0",
                    zIndex: 1,
                    opacity: 0,
                    clipPath: "inset(0 100% 0 0)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Grid, {
                        id: "g4",
                        color: "rgba(255,255,255,0.08)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 860,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 flex flex-col justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Eyebrow, {
                                text: "04 / LOCAL VISIBILITY & SEO",
                                light: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 863,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-headline font-black uppercase leading-[0.94] tracking-tight text-white",
                                style: {
                                    fontFamily: "var(--font-headline)",
                                    fontSize: "clamp(1.75rem,4.8vw,5.2rem)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-line anim block",
                                        style: {
                                            clipPath: "inset(0 100% 0 0)",
                                            opacity: 0
                                        },
                                        children: "DOMINATE"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 866,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-line anim block",
                                        style: {
                                            clipPath: "inset(0 100% 0 0)",
                                            opacity: 0
                                        },
                                        children: "LOCAL SEARCH"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 867,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-line anim block",
                                        style: {
                                            clipPath: "inset(0 100% 0 0)",
                                            opacity: 0
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "#0a0a0f"
                                            },
                                            children: "RANK #1."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 869,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 868,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 864,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "sc-sub anim mt-2 sm:mt-4 font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase leading-relaxed max-w-md text-white/90",
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    opacity: 0
                                },
                                children: "Optimize your Google Business Profile so local customers in your city call you before competitors."
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 872,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2.5 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2",
                                children: [
                                    "3.8× MORE CALLS",
                                    "MAP PACK #1",
                                    "GEO-TAGGED"
                                ].map((tag, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 sm:py-1 border border-white/30 bg-black/20 text-white font-bold",
                                        children: tag
                                    }, i, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 878,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 876,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 862,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 flex items-center justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0 relative",
                        "aria-hidden": "true",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center justify-center pointer-events-none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "radar-ring anim absolute size-32 sm:size-48 rounded-full border border-white/30",
                                        style: {
                                            opacity: 0
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 888,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "radar-ring anim absolute size-48 sm:size-72 rounded-full border border-white/20",
                                        style: {
                                            opacity: 0
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 889,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "radar-ring anim absolute size-64 sm:size-96 rounded-full border border-white/10",
                                        style: {
                                            opacity: 0
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 890,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 887,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "goog-card anim w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] bg-white border border-white/40 shadow-2xl p-3.5 sm:p-5",
                                style: {
                                    opacity: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 border border-[#e5e7eb] px-2.5 sm:px-3 py-1.5 sm:py-2 bg-[#f9fafb] mb-2 sm:mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs sm:text-sm",
                                                children: "🔍"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 896,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[9px] sm:text-[11px] text-[#374151] font-bold truncate",
                                                children: "top rated studio near me"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 897,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-auto font-mono text-[8px] sm:text-[9px] bg-[#0A5CF0] text-white px-1.5 sm:px-2 py-0.5 font-bold shrink-0",
                                                children: "RANK #1"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 898,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 895,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between border-b border-[#e5e7eb] pb-2 sm:pb-3 mb-2 sm:mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-headline font-black text-xs sm:text-base text-[#0a0a0f]",
                                                        children: "YOUR BUSINESS NAME"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                        lineNumber: 904,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-xs sm:text-sm text-[#0A5CF0]",
                                                                children: "5.0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                                lineNumber: 906,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex text-[#0A5CF0]",
                                                                children: [
                                                                    1,
                                                                    2,
                                                                    3,
                                                                    4,
                                                                    5
                                                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "goog-star anim text-xs sm:text-sm",
                                                                        style: {
                                                                            opacity: 0
                                                                        },
                                                                        children: "★"
                                                                    }, i, false, {
                                                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                                        lineNumber: 908,
                                                                        columnNumber: 43
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                                lineNumber: 907,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono text-[8px] sm:text-[9px] text-[#6b7280]",
                                                                children: "(184 Reviews)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                                lineNumber: 910,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                        lineNumber: 905,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 903,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "goog-badge anim border border-[#0A5CF0] px-1.5 sm:px-2 py-0.5 sm:py-1 flex items-center gap-1 shrink-0",
                                                style: {
                                                    opacity: 0
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[#0A5CF0] text-[10px] sm:text-xs font-bold",
                                                        children: "✓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                        lineNumber: 914,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-[7px] sm:text-[8px] text-[#0A5CF0] font-bold",
                                                        children: "VERIFIED"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                        lineNumber: 915,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 913,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 902,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5 sm:space-y-2",
                                        children: [
                                            [
                                                {
                                                    ico: "📍",
                                                    text: "123 Main Street, Your City"
                                                },
                                                {
                                                    ico: "🕐",
                                                    text: "Mon–Sat: 9:00 AM – 7:00 PM"
                                                },
                                                {
                                                    ico: "📞",
                                                    text: "+91 98765 43210"
                                                }
                                            ].map(({ ico, text }, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "goog-detail anim flex items-center gap-2",
                                                    style: {
                                                        opacity: 0
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs sm:text-sm",
                                                            children: ico
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                            lineNumber: 927,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-mono text-[8px] sm:text-[10px] text-[#374151] truncate",
                                                            children: text
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                            lineNumber: 928,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 926,
                                                    columnNumber: 17
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "goog-detail anim flex items-center gap-1.5 mt-1 sm:mt-2",
                                                style: {
                                                    opacity: 0
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "size-1.5 sm:size-2 rounded-full bg-[#0A5CF0] animate-pulse"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                        lineNumber: 932,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-[8px] sm:text-[9px] font-bold text-[#0A5CF0]",
                                                        children: "OPEN NOW"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                        lineNumber: 933,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 931,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 920,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-3 gap-1.5 sm:gap-2 mt-2.5 sm:mt-4 font-mono text-[8px] sm:text-[10px] font-bold uppercase text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border border-[#e5e7eb] py-1.5 sm:py-2 bg-[#f8f9fc] text-[#0A5CF0]",
                                                children: "🌐 WEBSITE"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 939,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border border-[#e5e7eb] py-1.5 sm:py-2 bg-[#f8f9fc] text-[#0A5CF0]",
                                                children: "📍 DIRECTIONS"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 940,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-[#0A5CF0] text-white py-1.5 sm:py-2",
                                                children: "📞 CALL NOW"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 941,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 938,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 893,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 885,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                lineNumber: 859,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "sc5",
                className: "absolute inset-0 flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-14 lg:px-20 pt-10 sm:pt-12 md:pt-0 pb-14 sm:pb-16 md:pb-0 gap-3.5 sm:gap-4 md:gap-12 overflow-hidden",
                style: {
                    background: "#f8f9fc",
                    zIndex: 1,
                    opacity: 0,
                    clipPath: "inset(0 100% 0 0)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Grid, {
                        id: "g5",
                        color: "rgba(10,92,240,0.06)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 951,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 flex flex-col justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-hidden mb-1 sm:mb-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "h-line anim font-mono text-[9px] sm:text-[11px] tracking-[0.25em] uppercase text-[#0A5CF0]",
                                    style: {
                                        fontFamily: "var(--font-mono)",
                                        opacity: 0
                                    },
                                    children: "05 / ORGANIC SOCIAL & RETENTION"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 955,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 954,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-headline font-black uppercase leading-[0.94] tracking-tight text-[#0a0a0f]",
                                style: {
                                    fontFamily: "var(--font-headline)",
                                    fontSize: "clamp(1.75rem,4.8vw,5.2rem)"
                                },
                                children: [
                                    "CONSISTENT.",
                                    "ON-BRAND.",
                                    "EVERY POST."
                                ].map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-line anim block",
                                            style: {
                                                opacity: 0
                                            },
                                            children: t
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 963,
                                            columnNumber: 17
                                        }, this)
                                    }, i, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 962,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 959,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "sc-sub anim mt-2 sm:mt-4 font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase leading-relaxed max-w-md text-[#6b7280]",
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    opacity: 0
                                },
                                children: "Stop posting mismatched designs. We build a cohesive visual language that commands authority on every feed."
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 967,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2.5 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2",
                                children: [
                                    "BRAND GUIDES",
                                    "30 POSTS/MO",
                                    "RETENTION FIRST"
                                ].map((tag, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 sm:py-1 border border-[#e5e7eb] bg-white text-[#0A5CF0] font-bold",
                                        children: tag
                                    }, i, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 973,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 971,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 953,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 flex items-center justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0",
                        "aria-hidden": "true",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full max-w-[330px] sm:max-w-[390px] md:max-w-[420px] space-y-2 sm:space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 gap-2 sm:gap-3",
                                    children: [
                                        {
                                            tag: "PRODUCT POST",
                                            bg: "#eff6ff",
                                            accent: "#0A5CF0"
                                        },
                                        {
                                            tag: "PROMO BANNER",
                                            bg: "#dbeafe",
                                            accent: "#3b82f6"
                                        },
                                        {
                                            tag: "BRAND STORY 9:16",
                                            bg: "#f0f4ff",
                                            accent: "#0842B0"
                                        }
                                    ].map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "post-card anim border border-[#e5e7eb] bg-white shadow-xs overflow-hidden",
                                            style: {
                                                aspectRatio: "4/5",
                                                opacity: 0
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full flex-1 flex flex-col justify-between p-2 sm:p-2.5 h-full",
                                                style: {
                                                    background: c.bg
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "size-1.5 sm:size-2 rounded-full",
                                                                style: {
                                                                    background: "#0A5CF0"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                                lineNumber: 991,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono text-[6px] sm:text-[7px] font-bold",
                                                                style: {
                                                                    color: c.accent
                                                                },
                                                                children: "KEYSPEX"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                                lineNumber: 992,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                        lineNumber: 990,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-10 sm:h-16 border border-white/60 mb-1.5 sm:mb-2 flex items-center justify-center bg-white/40",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-mono text-[6px] sm:text-[7px] font-bold",
                                                                    style: {
                                                                        color: c.accent
                                                                    },
                                                                    children: "CONTENT"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                                    lineNumber: 996,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                                lineNumber: 995,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-mono text-[6px] sm:text-[7px] uppercase font-bold truncate",
                                                                style: {
                                                                    color: c.accent
                                                                },
                                                                children: c.tag
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                                lineNumber: 998,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                        lineNumber: 994,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 989,
                                                columnNumber: 19
                                            }, this)
                                        }, i, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 988,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 982,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border border-[#e5e7eb] bg-white p-2.5 sm:p-3.5 flex items-center justify-between shadow-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-3 sm:gap-5",
                                            children: [
                                                {
                                                    label: "AVG REACH",
                                                    val: "+184%"
                                                },
                                                {
                                                    label: "ENGAGEMENT",
                                                    val: "4.8×"
                                                },
                                                {
                                                    label: "RETENTION",
                                                    val: "92%"
                                                }
                                            ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "soc-stat anim",
                                                    style: {
                                                        opacity: 0
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-mono text-[7px] sm:text-[8px] text-[#9ca3af] uppercase font-bold",
                                                            children: s.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                            lineNumber: 1013,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-headline font-black text-xs sm:text-sm text-[#0a0a0f]",
                                                            children: s.val
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                            lineNumber: 1014,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 1012,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 1006,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[8px] sm:text-[9px] bg-[#0A5CF0] text-white px-2 sm:px-2.5 py-1 font-bold uppercase shrink-0",
                                            children: "100% SCORE"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 1018,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 1005,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                            lineNumber: 981,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 980,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                lineNumber: 950,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "sc6",
                className: "absolute inset-0 flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-14 lg:px-20 pt-10 sm:pt-12 md:pt-0 pb-14 sm:pb-16 md:pb-0 gap-3.5 sm:gap-4 md:gap-12 overflow-hidden",
                style: {
                    background: "#0a0a0f",
                    zIndex: 1,
                    opacity: 0,
                    clipPath: "inset(0 100% 0 0)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Grid, {
                        id: "g6",
                        color: "rgba(10,92,240,0.08)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 1028,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 flex flex-col justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Eyebrow, {
                                text: "06 / STRUCTURED PAID CAMPAIGNS"
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 1031,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-headline font-black uppercase leading-[0.94] tracking-tight text-[#f8f9fc]",
                                style: {
                                    fontFamily: "var(--font-headline)",
                                    fontSize: "clamp(1.75rem,4.8vw,5.2rem)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-line anim block",
                                        style: {
                                            clipPath: "inset(0 100% 0 0)",
                                            opacity: 0
                                        },
                                        children: "A PROMOTION"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 1034,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-line anim block",
                                        style: {
                                            clipPath: "inset(0 100% 0 0)",
                                            opacity: 0
                                        },
                                        children: "WITH A STRATEGIC"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 1035,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-line anim block",
                                        style: {
                                            clipPath: "inset(0 100% 0 0)",
                                            opacity: 0
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "#0A5CF0"
                                            },
                                            children: "PLAN."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 1037,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 1036,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 1032,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "sc-sub anim mt-2 sm:mt-4 font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase leading-relaxed max-w-md text-[#9ca3af]",
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    opacity: 0
                                },
                                children: "Goal → Plan → Create → Launch. Coordinated marketing sprints tailored for seasonal peaks and product launches."
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 1040,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2.5 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2",
                                children: [
                                    "HIGH ROAS",
                                    "A/B CREATIVES",
                                    "LEAD FUNNELS"
                                ].map((tag, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 sm:py-1 border border-[#1f2937] bg-[#121318] text-[#60a5fa] font-bold",
                                        children: tag
                                    }, i, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 1046,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 1044,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 1030,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 flex items-center justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0",
                        "aria-hidden": "true",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full max-w-[330px] sm:max-w-[390px] md:max-w-[460px] border border-[#1f2937] bg-[#0d0f14] p-3 sm:p-6 shadow-2xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between border-b border-[#1f2937] pb-2 sm:pb-3 mb-3 sm:mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[9px] sm:text-[10px] text-[#60a5fa] font-bold tracking-widest uppercase",
                                            children: "CAMPAIGN_PIPELINE"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 1056,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[8px] sm:text-[9px] text-[#60a5fa] border border-[#0A5CF0]/40 px-1.5 sm:px-2 py-0.5",
                                            children: "STATUS: LIVE"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 1057,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 1055,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative flex items-start justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute",
                                            style: {
                                                top: 16,
                                                left: 16,
                                                right: 16,
                                                height: 2,
                                                background: "#1f2937"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 1063,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pipe-bullet anim absolute size-2.5 sm:size-3 rounded-full bg-[#0A5CF0] z-10",
                                            style: {
                                                top: 11,
                                                left: 16,
                                                boxShadow: "0 0 12px #0A5CF0"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 1065,
                                            columnNumber: 15
                                        }, this),
                                        [
                                            {
                                                num: "01",
                                                name: "GOAL",
                                                desc: "ROAS"
                                            },
                                            {
                                                num: "02",
                                                name: "PLAN",
                                                desc: "14-Day"
                                            },
                                            {
                                                num: "03",
                                                name: "CREATE",
                                                desc: "12 Ads"
                                            },
                                            {
                                                num: "04",
                                                name: "LAUNCH",
                                                desc: "Live"
                                            }
                                        ].map((node, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "pipe-node anim relative z-10 flex flex-col items-center",
                                                style: {
                                                    opacity: 0
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "size-8 sm:size-10 border flex items-center justify-center font-mono font-bold text-[10px] sm:text-xs",
                                                        style: {
                                                            borderColor: i === 3 ? "#0A5CF0" : "#1f2937",
                                                            background: i === 3 ? "#0A5CF0" : "#13161f",
                                                            color: "#fff"
                                                        },
                                                        children: node.num
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                        lineNumber: 1075,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-headline font-bold text-[10px] sm:text-xs text-white mt-1 sm:mt-2",
                                                        children: node.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                        lineNumber: 1083,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-[7px] sm:text-[8px] text-[#6b7280] uppercase",
                                                        children: node.desc
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                        lineNumber: 1084,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 1074,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 1061,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 sm:mt-8 pt-2.5 sm:pt-4 border-t border-[#1f2937] grid grid-cols-3 gap-1.5 sm:gap-2 text-center font-mono text-[8px] sm:text-[9px]",
                                    children: [
                                        "PRODUCT LAUNCH",
                                        "FESTIVAL FLASH",
                                        "RETARGETING"
                                    ].map((tag, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pipe-tag anim border border-[#1f2937] py-1.5 sm:py-2 bg-[#12151d] text-[#9ca3af] font-bold uppercase truncate",
                                            style: {
                                                opacity: 0
                                            },
                                            children: [
                                                "✓ ",
                                                tag
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 1091,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 1089,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                            lineNumber: 1054,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 1053,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                lineNumber: 1027,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "sc7",
                className: "absolute inset-0 flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-14 lg:px-20 pt-10 sm:pt-12 md:pt-0 pb-14 sm:pb-16 md:pb-0 gap-3.5 sm:gap-4 md:gap-12 overflow-hidden",
                style: {
                    background: "#f8f9fc",
                    zIndex: 1,
                    opacity: 0,
                    clipPath: "inset(0 100% 0 0)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Grid, {
                        id: "g7",
                        color: "rgba(10,92,240,0.06)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 1104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 flex flex-col justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-hidden mb-1 sm:mb-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "h-line anim font-mono text-[9px] sm:text-[11px] tracking-[0.25em] uppercase text-[#0A5CF0]",
                                    style: {
                                        fontFamily: "var(--font-mono)",
                                        opacity: 0
                                    },
                                    children: "07 / CREATIVE DESIGN & COLLATERAL"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 1108,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 1107,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-headline font-black uppercase leading-[0.94] tracking-tight text-[#0a0a0f]",
                                style: {
                                    fontFamily: "var(--font-headline)",
                                    fontSize: "clamp(1.75rem,4.8vw,5.2rem)"
                                },
                                children: [
                                    "LOOK SHARP.",
                                    "EVERY ASSET",
                                    "INTENTIONAL."
                                ].map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-line anim block",
                                            style: {
                                                opacity: 0
                                            },
                                            children: t
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 1116,
                                            columnNumber: 17
                                        }, this)
                                    }, i, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 1115,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 1112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "sc-sub anim mt-2 sm:mt-4 font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase leading-relaxed max-w-md text-[#6b7280]",
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    opacity: 0
                                },
                                children: "Brochures, packaging, banners, presentations and flyers crafted to make your brand look world-class."
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 1120,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2.5 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2",
                                children: [
                                    "VECTOR PRECISION",
                                    "300 DPI PRINT",
                                    "FIGMA SYSTEM"
                                ].map((tag, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 sm:py-1 border border-[#e5e7eb] bg-white text-[#0A5CF0] font-bold",
                                        children: tag
                                    }, i, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 1126,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 1124,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 1106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 flex items-center justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0",
                        "aria-hidden": "true",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "canvas-frame anim w-full max-w-[320px] sm:max-w-[380px] md:max-w-[440px] border border-[#e5e7eb] bg-white shadow-2xl p-3 sm:p-5",
                            style: {
                                opacity: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between border-b border-[#e5e7eb] pb-2 sm:pb-3 mb-2.5 sm:mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[8px] sm:text-[9px] text-[#0a0a0f] font-bold uppercase tracking-wider",
                                            children: "VECTOR_CANVAS // 300 DPI"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 1137,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-24 sm:w-32 h-1.5 sm:h-2 border border-[#e5e7eb] bg-[#f3f4f6] overflow-hidden",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "export-bar anim h-full bg-[#0A5CF0]",
                                                style: {
                                                    transform: "scaleX(0)",
                                                    transformOrigin: "left center"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 1139,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 1138,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 1136,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative border border-[#e5e7eb] bg-[#f8f9fc] p-3 sm:p-5",
                                    style: {
                                        aspectRatio: "4/3"
                                    },
                                    children: [
                                        [
                                            [
                                                "0",
                                                "0"
                                            ],
                                            [
                                                "0",
                                                "auto"
                                            ],
                                            [
                                                "auto",
                                                "0"
                                            ],
                                            [
                                                "auto",
                                                "auto"
                                            ]
                                        ].map(([t, b], i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "canvas-handle anim absolute w-1.5 sm:w-2 h-1.5 sm:h-2 border-2 bg-white",
                                                style: {
                                                    borderColor: "#0A5CF0",
                                                    top: t === "0" ? -3 : "auto",
                                                    bottom: t === "auto" ? -3 : "auto",
                                                    left: b === "0" ? -3 : "auto",
                                                    right: b === "auto" ? -3 : "auto",
                                                    opacity: 0
                                                }
                                            }, i, false, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 1147,
                                                columnNumber: 17
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "canvas-dark anim mb-2 sm:mb-3",
                                            style: {
                                                height: 28,
                                                background: "#0a0a0f",
                                                transform: "scaleX(0)",
                                                transformOrigin: "left center"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 1158,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1.5 sm:space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "canvas-bar anim h-2 sm:h-2.5 w-full bg-[#e5e7eb]",
                                                    style: {
                                                        transform: "scaleX(0)",
                                                        transformOrigin: "left center"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 1161,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "canvas-bar anim h-2 sm:h-2.5 w-2/3 bg-[#e5e7eb]",
                                                    style: {
                                                        transform: "scaleX(0)",
                                                        transformOrigin: "left center"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 1162,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 1160,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "canvas-accent anim absolute bottom-3 sm:bottom-5 left-3 sm:left-5 w-10 sm:w-14 h-7 sm:h-10 bg-[#0A5CF0]",
                                            style: {
                                                opacity: 0
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 1165,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 1144,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-mono text-[8px] sm:text-[9px] text-[#9ca3af] uppercase tracking-widest mt-2 sm:mt-3",
                                    children: "EVERY PIXEL CRAFTED WITH PURPOSE"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 1167,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                            lineNumber: 1134,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 1133,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                lineNumber: 1103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "sc8",
                className: "absolute inset-0 flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-14 lg:px-20 pt-10 sm:pt-12 md:pt-0 pb-14 sm:pb-16 md:pb-0 gap-3.5 sm:gap-4 md:gap-12 overflow-hidden",
                style: {
                    background: "#111827",
                    zIndex: 1,
                    opacity: 0,
                    clipPath: "inset(0 100% 0 0)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Grid, {
                        id: "g8",
                        color: "rgba(10,92,240,0.06)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 1176,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 flex flex-col justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Eyebrow, {
                                text: "08 / DYNAMIC VIDEO PRODUCTION",
                                light: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 1179,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-headline font-black uppercase leading-[0.94] tracking-tight text-[#f8f9fc]",
                                style: {
                                    fontFamily: "var(--font-headline)",
                                    fontSize: "clamp(1.75rem,4.8vw,5.2rem)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-line anim block",
                                        style: {
                                            clipPath: "inset(0 100% 0 0)",
                                            opacity: 0
                                        },
                                        children: "RAW FOOTAGE."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 1182,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-line anim block",
                                        style: {
                                            clipPath: "inset(0 100% 0 0)",
                                            opacity: 0
                                        },
                                        children: "CINEMATIC"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 1183,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-line anim block",
                                        style: {
                                            clipPath: "inset(0 100% 0 0)",
                                            opacity: 0
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "#0A5CF0"
                                            },
                                            children: "STORIES."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 1185,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 1184,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 1180,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "sc-sub anim mt-2 sm:mt-4 font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase leading-relaxed max-w-md text-[#9ca3af]",
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    opacity: 0
                                },
                                children: "Fast-paced reels, brand commercials and promotional cuts engineered to hook attention in the first 3 seconds."
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 1188,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2.5 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2",
                                children: [
                                    "4K 60FPS",
                                    "SOUND DESIGN",
                                    "RETENTION EDITS"
                                ].map((tag, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 sm:py-1 border border-[#374151] bg-[#0c1017] text-[#60a5fa] font-bold",
                                        children: tag
                                    }, i, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 1194,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 1192,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 1178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 flex items-center justify-center w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-1/2 mx-auto md:mx-0",
                        "aria-hidden": "true",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "vid-monitor anim w-full max-w-[330px] sm:max-w-[390px] md:max-w-[460px] border border-[#374151] bg-[#0c1017] shadow-2xl p-3 sm:p-5",
                            style: {
                                opacity: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between border-b border-[#1f2937] pb-1.5 sm:pb-2 mb-2 sm:mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[8px] sm:text-[9px] text-white font-bold tracking-widest uppercase",
                                            children: "TIMELINE // 4K 60FPS"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 1204,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[8px] sm:text-[9px] text-[#60a5fa]",
                                            children: "TC: 00:01:24"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 1205,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 1203,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative border border-[#1f2937] bg-black h-24 sm:h-36 flex items-center justify-center overflow-hidden mb-2 sm:mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "vid-playbtn anim size-9 sm:size-12 rounded-full border-2 border-[#0A5CF0] bg-[#0A5CF0]/20 flex items-center justify-center",
                                            style: {
                                                opacity: 0
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[#0A5CF0] text-xs sm:text-sm ml-0.5",
                                                children: "▶"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 1211,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 1210,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute bottom-1.5 left-2 sm:bottom-2 sm:left-3 font-mono text-[7px] sm:text-[8px] bg-black/80 px-1.5 sm:px-2 py-0.5 text-white",
                                            children: "REC.709 GRADE"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 1213,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 1209,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative border border-[#1f2937] bg-[#131722] p-1.5 sm:p-2 space-y-1 sm:space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "vid-playhead anim absolute top-0 bottom-0 w-0.5 bg-white z-10",
                                            style: {
                                                left: "0%",
                                                boxShadow: "0 0 6px #fff"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 1220,
                                            columnNumber: 15
                                        }, this),
                                        [
                                            {
                                                bg: "#0A5CF0",
                                                w: "88%"
                                            },
                                            {
                                                bg: "#3b82f6",
                                                w: "64%"
                                            },
                                            {
                                                bg: "#60a5fa",
                                                w: "76%",
                                                opacity: 0.6
                                            }
                                        ].map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-2 sm:h-3 bg-[#1e293b] overflow-hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "vid-track anim h-full",
                                                    style: {
                                                        background: t.bg,
                                                        width: t.w,
                                                        opacity: t.opacity ?? 1,
                                                        transform: "scaleX(0)",
                                                        transformOrigin: "left center"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 1227,
                                                    columnNumber: 19
                                                }, this)
                                            }, i, false, {
                                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                lineNumber: 1226,
                                                columnNumber: 17
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between pt-1 border-t border-[#1f2937]",
                                            children: [
                                                "CUT",
                                                "COLOR",
                                                "EXPORT"
                                            ].map((l, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "vid-label anim font-mono text-[7px] sm:text-[8px] tracking-widest uppercase",
                                                    style: {
                                                        color: i === 2 ? "#0A5CF0" : "rgba(248,249,252,0.35)",
                                                        opacity: 0
                                                    },
                                                    children: l
                                                }, i, false, {
                                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                                    lineNumber: 1232,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                            lineNumber: 1230,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 1219,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                            lineNumber: 1202,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 1201,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                lineNumber: 1175,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sm:hidden absolute bottom-17 left-0 right-0 flex justify-center items-center pointer-events-none z-30",
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-mono text-[7px] uppercase tracking-[0.2em] text-white/40 bg-black/50 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/10 flex items-center gap-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "‹"
                        }, void 0, false, {
                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                            lineNumber: 1243,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "SWIPE TO EXPLORE"
                        }, void 0, false, {
                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                            lineNumber: 1244,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "›"
                        }, void 0, false, {
                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                            lineNumber: 1245,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                    lineNumber: 1242,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                lineNumber: 1241,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-12 sm:bottom-16 left-0 right-0 flex justify-center gap-2 z-40 pointer-events-none",
                "aria-hidden": "true",
                children: SERVICES.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        ref: (el)=>{
                            dotRefs.current[i] = el;
                        },
                        style: {
                            display: "inline-block",
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            border: "1.5px solid rgba(255,255,255,0.3)",
                            background: "transparent",
                            transition: "background 0.3s, border-color 0.3s"
                        }
                    }, i, false, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 1252,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                lineNumber: 1250,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 left-0 right-0 z-40 bg-[#0a0a0f]/95 border-t border-[#1f2937] backdrop-blur-md px-4 sm:px-6 md:px-10 py-2.5 sm:py-3 flex items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sm:hidden absolute top-0 left-0 right-0 h-[2px] bg-[#1f2937] overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: progRefMobile,
                            className: "h-full bg-[#0A5CF0] shadow-[0_0_8px_#0A5CF0]",
                            style: {
                                width: "0%"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                            lineNumber: 1272,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 1271,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 sm:gap-3 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[11px] sm:text-xs font-black text-[#0A5CF0] shrink-0",
                                children: [
                                    currentSvc.num,
                                    " / 08"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 1277,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-headline font-bold text-xs sm:text-sm text-white uppercase tracking-wide truncate",
                                children: currentSvc.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 1278,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden lg:inline font-mono text-[10px] text-[#4b5563] shrink-0",
                                children: [
                                    "[",
                                    currentSvc.cat,
                                    "]"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 1281,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 1276,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden sm:flex flex-col gap-1 flex-1 max-w-xs mx-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between font-mono text-[8px] text-[#4b5563] uppercase",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "SCENE TIMELINE"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 1287,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "AUTO-CYCLE"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                        lineNumber: 1288,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 1286,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full h-0.5 bg-[#1f2937]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ref: progRef,
                                    className: "h-full bg-[#0A5CF0]",
                                    style: {
                                        width: "0%"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                    lineNumber: 1291,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 1290,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 1285,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1 sm:gap-1.5 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>jump((activeIdx + 7) % 8),
                                className: "p-1.5 sm:px-2.5 sm:py-1.5 border border-[#1f2937] text-white active:bg-white/10 hover:border-[#0A5CF0] hover:text-[#0A5CF0] transition-colors font-mono text-xs cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center",
                                title: "Previous (←)",
                                "aria-label": "Previous slide",
                                children: "◀"
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 1297,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: togglePlay,
                                className: "px-2.5 sm:px-3 py-1.5 border border-[#1f2937] text-white active:bg-[#0842B0] hover:border-[#0A5CF0] hover:bg-[#0A5CF0] transition-all font-mono text-[9px] sm:text-[10px] font-bold cursor-pointer min-h-[32px]",
                                title: "Play/Pause (Space)",
                                "aria-label": playing ? "Pause animation" : "Play animation",
                                children: playing ? "⏸ PAUSE" : "▶ PLAY"
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 1305,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>jump((activeIdx + 1) % 8),
                                className: "p-1.5 sm:px-2.5 sm:py-1.5 border border-[#1f2937] text-white active:bg-white/10 hover:border-[#0A5CF0] hover:text-[#0A5CF0] transition-colors font-mono text-xs cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center",
                                title: "Next (→)",
                                "aria-label": "Next slide",
                                children: "▶"
                            }, void 0, false, {
                                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                                lineNumber: 1313,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                        lineNumber: 1296,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                lineNumber: 1269,
                columnNumber: 7
            }, this),
            motionOk === false && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
          #sc1 { opacity:1!important; clip-path:none!important; visibility:visible!important; z-index:10!important; }
          #sc2,#sc3,#sc4,#sc5,#sc6,#sc7,#sc8 { display:none!important; }
          #sc1 .anim { opacity:1!important; clip-path:none!important; transform:none!important; }
        `
            }, void 0, false, {
                fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
                lineNumber: 1326,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/hero/HeroVisualStage.tsx",
        lineNumber: 595,
        columnNumber: 5
    }, this);
}
_s(HeroVisualStage, "v4BWvCJXF3DAGJOdlZFDQt3/vJc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGSAP"]
    ];
});
_c1 = HeroVisualStage;
var _c, _c1;
__turbopack_context__.k.register(_c, "Grid");
__turbopack_context__.k.register(_c1, "HeroVisualStage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/hero/Nav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Nav",
    ()=>Nav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/image-component.js [app-client] (ecmascript) <export Image as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/content/site.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function Nav() {
    _s();
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileOpen, setMobileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isHero = pathname === "/" && !scrolled;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Nav.useEffect": ()=>{
            const handleScroll = {
                "Nav.useEffect.handleScroll": ()=>{
                    setScrolled(window.scrollY > 20);
                }
            }["Nav.useEffect.handleScroll"];
            window.addEventListener("scroll", handleScroll, {
                passive: true
            });
            return ({
                "Nav.useEffect": ()=>window.removeEventListener("scroll", handleScroll)
            })["Nav.useEffect"];
        }
    }["Nav.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#f5f2ed]/90 backdrop-blur-md border-b border-[#e0dbd3] shadow-2xs" : "bg-transparent"}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto px-6 lg:px-10 flex items-center justify-between h-16 max-w-7xl",
                    children: [
                        isHero ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center transition-opacity hover:opacity-90 py-1",
                            "aria-label": "KeySpex home",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__["default"], {
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
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center gap-3 font-headline text-2xl lg:text-3xl font-bold tracking-tight text-[#1a1a1f] transition-opacity hover:opacity-90",
                            style: {
                                fontFamily: "var(--font-headline)"
                            },
                            "aria-label": "KeySpex home",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative size-7 shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__["default"], {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "KEYSPEX",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden md:flex items-center gap-8",
                            children: [
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navLinks"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: item.href,
                                        className: "text-sm text-[#5a5a65] hover:text-[#1a1a1f] transition-colors tracking-wide font-medium",
                                        children: item.label
                                    }, item.href, false, {
                                        fileName: "[project]/src/components/hero/Nav.tsx",
                                        lineNumber: 74,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setMobileOpen(!mobileOpen),
                            className: "md:hidden flex flex-col gap-1.5 p-3 focus:outline-none",
                            "aria-label": "Toggle menu",
                            "aria-expanded": mobileOpen,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `block w-5 h-0.5 bg-[#1a1a1f] transition-transform duration-200 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hero/Nav.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `block w-5 h-0.5 bg-[#1a1a1f] transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/hero/Nav.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            mobileOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-40 bg-[#f5f2ed] pt-24 px-6 pb-10 flex flex-col justify-between md:hidden animate-in fade-in duration-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-6",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navLinks"].map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                onClick: ()=>setMobileOpen(false),
                                className: "font-headline text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1a1f] hover:text-[var(--brand)] transition-colors flex items-baseline gap-4",
                                style: {
                                    fontFamily: "var(--font-headline)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-[#e0dbd3] pt-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
_s(Nav, "s6ocrhKj6pd28GN2meMVe5ILxTg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Nav;
var _c;
__turbopack_context__.k.register(_c, "Nav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/motion/Reveal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Reveal",
    ()=>Reveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-client] (ecmascript) <locals>");
"use client";
;
;
function Reveal({ children, delay = 0, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
        className: className,
        initial: {
            opacity: 0,
            y: 16
        },
        whileInView: {
            opacity: 1,
            y: 0
        },
        viewport: {
            once: true,
            margin: "-80px"
        },
        transition: {
            duration: 0.6,
            ease: [
                0.22,
                1,
                0.36,
                1
            ],
            delay
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/motion/Reveal.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = Reveal;
var _c;
__turbopack_context__.k.register(_c, "Reveal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/ContactSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContactSection",
    ()=>ContactSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$motion$2f$Reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/motion/Reveal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/content/site.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ContactSection() {
    _s();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: ""
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContactSection.useEffect": ()=>{
            // 1. Auto-select service if ?service=... is present in URL
            if ("TURBOPACK compile-time truthy", 1) {
                const params = new URLSearchParams(window.location.search);
                const serviceQuery = params.get("service");
                if (serviceQuery) {
                    const matched = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].services.find({
                        "ContactSection.useEffect.matched": (s)=>s.slug === serviceQuery || s.title.toLowerCase() === serviceQuery.toLowerCase()
                    }["ContactSection.useEffect.matched"]);
                    if (matched) {
                        setForm({
                            "ContactSection.useEffect": (prev)=>({
                                    ...prev,
                                    service: matched.title
                                })
                        }["ContactSection.useEffect"]);
                    }
                }
            }
            // 2. Reliable scroll to contact / talk to us section
            const scrollToTarget = {
                "ContactSection.useEffect.scrollToTarget": ()=>{
                    const hash = window.location.hash;
                    if (hash === "#contact" || hash === "#talk-to-us") {
                        const target = document.getElementById("contact");
                        if (target) {
                            setTimeout({
                                "ContactSection.useEffect.scrollToTarget": ()=>{
                                    target.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start"
                                    });
                                }
                            }["ContactSection.useEffect.scrollToTarget"], 80);
                        }
                    }
                }
            }["ContactSection.useEffect.scrollToTarget"];
            scrollToTarget();
            window.addEventListener("hashchange", scrollToTarget);
            return ({
                "ContactSection.useEffect": ()=>window.removeEventListener("hashchange", scrollToTarget)
            })["ContactSection.useEffect"];
        }
    }["ContactSection.useEffect"], []);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setStatus("submitting");
        try {
            await new Promise((resolve)=>setTimeout(resolve, 800));
            setStatus("success");
        } catch  {
            setStatus("error");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "contact",
        className: "scroll-mt-20 py-24 md:py-36 bg-[#ebe7e0]/60 border-t border-[#e0dbd3] relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "talk-to-us",
                className: "-translate-y-24 scroll-mt-24 pointer-events-none",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/sections/ContactSection.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-[1280px] px-6 lg:px-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:items-start",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$motion$2f$Reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65]",
                                        style: {
                                            fontFamily: "var(--font-mono)"
                                        },
                                        children: "07 · Talk to Us · Start a Project"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/ContactSection.tsx",
                                        lineNumber: 73,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mb-6 font-headline font-bold tracking-tight leading-[0.98] text-[#1a1a1f]",
                                        style: {
                                            fontFamily: "var(--font-headline)",
                                            fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)"
                                        },
                                        children: "Let's discuss what your business needs."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/ContactSection.tsx",
                                        lineNumber: 79,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-10 max-w-md text-base leading-relaxed text-[#5a5a65]",
                                        children: "Tell us a little about your business and goals. We'll schedule a free, no-obligation consultation to map out the right scope and pricing."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/ContactSection.tsx",
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-6 border-t border-[#e0dbd3] pt-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65] mb-1",
                                                        children: "Direct Email"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                        lineNumber: 94,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: `mailto:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].contact.email}`,
                                                        className: "text-base font-semibold text-[#1a1a1f] transition-colors hover:text-[var(--brand)]",
                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].contact.email
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                        lineNumber: 97,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 font-mono text-[10px] text-[#5a5a65]",
                                                        children: "// TODO: confirm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                        lineNumber: 103,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                lineNumber: 93,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65] mb-1",
                                                        children: "Phone / WhatsApp"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                        lineNumber: 107,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: `tel:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].contact.phone.replace(/\s+/g, "")}`,
                                                        className: "text-base font-semibold text-[#1a1a1f] transition-colors hover:text-[var(--brand)]",
                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].contact.phone
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                        lineNumber: 110,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 font-mono text-[10px] text-[#5a5a65]",
                                                        children: "// TODO: confirm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                        lineNumber: 116,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                lineNumber: 106,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65] mb-1",
                                                        children: "Location & Service Area"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                        lineNumber: 120,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-[#1a1a1f]",
                                                        children: "Operating across India · Remote-first partner"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                        lineNumber: 123,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                lineNumber: 119,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/ContactSection.tsx",
                                        lineNumber: 92,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/ContactSection.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/ContactSection.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$motion$2f$Reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                            delay: 0.15,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-none border border-[#e0dbd3] bg-[#f5f2ed] p-8 md:p-12 shadow-2xs",
                                children: status === "success" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex min-h-[360px] flex-col items-center justify-center text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4 flex size-14 items-center justify-center rounded-none text-2xl text-white font-bold",
                                            style: {
                                                background: "var(--brand)"
                                            },
                                            children: "✓"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/ContactSection.tsx",
                                            lineNumber: 135,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "mb-2 font-headline font-bold text-2xl tracking-tight text-[#1a1a1f]",
                                            style: {
                                                fontFamily: "var(--font-headline)"
                                            },
                                            children: "Consultation Request Received"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/ContactSection.tsx",
                                            lineNumber: 141,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "max-w-md text-sm leading-relaxed text-[#5a5a65]",
                                            children: [
                                                "Thank you. We will review your requirements and reach out to ",
                                                form.email || "you",
                                                " within 24 hours to schedule our call."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/ContactSection.tsx",
                                            lineNumber: 147,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>{
                                                setStatus("idle");
                                                setForm({
                                                    name: "",
                                                    email: "",
                                                    phone: "",
                                                    service: "",
                                                    message: ""
                                                });
                                            },
                                            className: "mt-8 text-xs font-mono uppercase tracking-[0.18em] text-[var(--brand)] underline underline-offset-4",
                                            children: "Send another inquiry"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/ContactSection.tsx",
                                            lineNumber: 150,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/ContactSection.tsx",
                                    lineNumber: 134,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: handleSubmit,
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid gap-6 sm:grid-cols-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "name",
                                                            className: "mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65]",
                                                            children: "Your Name *"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                            lineNumber: 165,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "name",
                                                            type: "text",
                                                            required: true,
                                                            value: form.name,
                                                            onChange: (e)=>setForm({
                                                                    ...form,
                                                                    name: e.target.value
                                                                }),
                                                            className: "w-full rounded-none border border-[#e0dbd3] bg-white px-4 py-3.5 text-sm text-[#1a1a1f] outline-none transition-all focus:border-[var(--brand)]",
                                                            placeholder: "e.g. Rahul Sharma"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "email",
                                                            className: "mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65]",
                                                            children: "Email Address *"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                            lineNumber: 183,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "email",
                                                            type: "email",
                                                            required: true,
                                                            value: form.email,
                                                            onChange: (e)=>setForm({
                                                                    ...form,
                                                                    email: e.target.value
                                                                }),
                                                            className: "w-full rounded-none border border-[#e0dbd3] bg-white px-4 py-3.5 text-sm text-[#1a1a1f] outline-none transition-all focus:border-[var(--brand)]",
                                                            placeholder: "you@company.com"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                            lineNumber: 189,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                    lineNumber: 182,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/ContactSection.tsx",
                                            lineNumber: 163,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid gap-6 sm:grid-cols-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "phone",
                                                            className: "mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65]",
                                                            children: "Phone / WhatsApp"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                            lineNumber: 203,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "phone",
                                                            type: "tel",
                                                            value: form.phone,
                                                            onChange: (e)=>setForm({
                                                                    ...form,
                                                                    phone: e.target.value
                                                                }),
                                                            className: "w-full rounded-none border border-[#e0dbd3] bg-white px-4 py-3.5 text-sm text-[#1a1a1f] outline-none transition-all focus:border-[var(--brand)]",
                                                            placeholder: "+91 ..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                            lineNumber: 209,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "service",
                                                            className: "mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65]",
                                                            children: "Primary Need"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                            lineNumber: 220,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            id: "service",
                                                            value: form.service,
                                                            onChange: (e)=>setForm({
                                                                    ...form,
                                                                    service: e.target.value
                                                                }),
                                                            className: "w-full rounded-none border border-[#e0dbd3] bg-white px-4 py-3.5 text-sm text-[#1a1a1f] outline-none transition-all focus:border-[var(--brand)]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "Select a service category"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                                    lineNumber: 232,
                                                                    columnNumber: 25
                                                                }, this),
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].services.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: s.title,
                                                                        children: [
                                                                            s.n,
                                                                            " · ",
                                                                            s.title
                                                                        ]
                                                                    }, s.slug, true, {
                                                                        fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                                        lineNumber: 234,
                                                                        columnNumber: 27
                                                                    }, this)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "multiple",
                                                                    children: "Multiple services / Consultation"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                                    lineNumber: 238,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                            lineNumber: 226,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                    lineNumber: 219,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/ContactSection.tsx",
                                            lineNumber: 201,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "message",
                                                    className: "mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65]",
                                                    children: "Project Notes *"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    id: "message",
                                                    required: true,
                                                    rows: 4,
                                                    value: form.message,
                                                    onChange: (e)=>setForm({
                                                            ...form,
                                                            message: e.target.value
                                                        }),
                                                    className: "w-full resize-none rounded-none border border-[#e0dbd3] bg-white px-4 py-3.5 text-sm text-[#1a1a1f] outline-none transition-all focus:border-[var(--brand)]",
                                                    placeholder: "Tell us about your business and what you need..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/ContactSection.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/ContactSection.tsx",
                                            lineNumber: 243,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            disabled: status === "submitting",
                                            className: "inline-flex h-12 w-full items-center justify-center rounded-none text-sm font-semibold uppercase tracking-wider text-white transition-all hover:opacity-95 disabled:opacity-50",
                                            style: {
                                                background: "var(--brand)"
                                            },
                                            children: status === "submitting" ? "Sending Request..." : "Request Free Consultation →"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/ContactSection.tsx",
                                            lineNumber: 261,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/ContactSection.tsx",
                                    lineNumber: 162,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/ContactSection.tsx",
                                lineNumber: 132,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/ContactSection.tsx",
                            lineNumber: 131,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/ContactSection.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/ContactSection.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/ContactSection.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_s(ContactSection, "02w8CC8D9cJW3oIyEOzGc2wPODQ=");
_c = ContactSection;
var _c;
__turbopack_context__.k.register(_c, "ContactSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/FAQSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FAQSection",
    ()=>FAQSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/content/site.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$motion$2f$Reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/motion/Reveal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function FAQSection() {
    _s();
    const [openIndex, setOpenIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const toggle = (index)=>{
        setOpenIndex(openIndex === index ? null : index);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "faq",
        className: "py-24 md:py-36 bg-[#f5f2ed] border-t border-[#e0dbd3]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-[1280px] px-6 lg:px-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-16 lg:grid-cols-[1fr_2fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$motion$2f$Reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:sticky lg:top-28",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65]",
                                    style: {
                                        fontFamily: "var(--font-mono)"
                                    },
                                    children: "06 · FAQ"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/FAQSection.tsx",
                                    lineNumber: 19,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-headline font-bold tracking-tight leading-[0.98] text-[#1a1a1f]",
                                    style: {
                                        fontFamily: "var(--font-headline)",
                                        fontSize: "clamp(2.25rem, 4vw, 3.5rem)"
                                    },
                                    children: "Common questions answered plainly."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/FAQSection.tsx",
                                    lineNumber: 25,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-6 text-base text-[#5a5a65] leading-relaxed max-w-sm",
                                    children: "Have a specific question not covered here? We discuss everything in detail during our initial consultation."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/FAQSection.tsx",
                                    lineNumber: 34,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/FAQSection.tsx",
                            lineNumber: 18,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/FAQSection.tsx",
                        lineNumber: 17,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$motion$2f$Reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                        delay: 0.1,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "divide-y divide-[#e0dbd3] border-t border-b border-[#e0dbd3]",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].faq.map((item, i)=>{
                                const isOpen = openIndex === i;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "py-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>toggle(i),
                                            className: "group flex w-full items-baseline justify-between py-6 text-left transition-colors focus:outline-none",
                                            "aria-expanded": isOpen,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `text-xl md:text-2xl font-headline font-bold tracking-tight transition-colors ${isOpen ? "text-[var(--brand)]" : "text-[#1a1a1f] group-hover:text-[var(--brand)]"}`,
                                                    style: {
                                                        fontFamily: "var(--font-headline)"
                                                    },
                                                    children: item.q
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/FAQSection.tsx",
                                                    lineNumber: 52,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `ml-6 flex size-8 shrink-0 items-center justify-center rounded-none border text-lg font-light transition-all duration-300 ${isOpen ? "rotate-45 border-[var(--brand)] bg-[var(--brand)] text-white" : "border-[#e0dbd3] text-[#5a5a65] group-hover:border-[#1a1a1f] group-hover:text-[#1a1a1f]"}`,
                                                    "aria-hidden": "true",
                                                    children: "+"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/FAQSection.tsx",
                                                    lineNumber: 60,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/FAQSection.tsx",
                                            lineNumber: 46,
                                            columnNumber: 21
                                        }, this),
                                        isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pb-8 pt-1 text-base leading-relaxed text-[#5a5a65] max-w-2xl animate-in fade-in slide-in-from-top-2 duration-200",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: item.a
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/FAQSection.tsx",
                                                lineNumber: 73,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/FAQSection.tsx",
                                            lineNumber: 72,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/components/sections/FAQSection.tsx",
                                    lineNumber: 45,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/FAQSection.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/FAQSection.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/FAQSection.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/sections/FAQSection.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sections/FAQSection.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_s(FAQSection, "6UZ+mnQ9sKC06YXeyhrfGXQCT10=");
_c = FAQSection;
var _c;
__turbopack_context__.k.register(_c, "FAQSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/ProcessSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProcessSection",
    ()=>ProcessSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/content/site.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$gsap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/gsap.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__gsap$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals> <export default as gsap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@gsap/react/src/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$motion$2f$Reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/motion/Reveal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function ProcessSection() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGSAP"])({
        "ProcessSection.useGSAP": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__gsap$3e$__["gsap"].matchMedia().add("(prefers-reduced-motion: no-preference)", {
                "ProcessSection.useGSAP": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__gsap$3e$__["gsap"].fromTo(".process-line", {
                        scaleY: 0
                    }, {
                        scaleY: 1,
                        ease: "none",
                        transformOrigin: "top",
                        scrollTrigger: {
                            trigger: ref.current,
                            start: "top 70%",
                            end: "bottom 65%",
                            scrub: true
                        }
                    });
                }
            }["ProcessSection.useGSAP"]);
        }
    }["ProcessSection.useGSAP"], {
        scope: ref
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "process",
        className: "py-24 md:py-36",
        style: {
            background: "var(--tint)"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: ref,
            className: "mx-auto max-w-[1280px] px-5 md:px-10",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$motion$2f$Reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]",
                                        style: {
                                            fontFamily: "var(--font-mono)"
                                        },
                                        children: "04 · How we work"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/ProcessSection.tsx",
                                        lineNumber: 36,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-extrabold tracking-tight leading-[0.95] text-[var(--ink)]",
                                        style: {
                                            fontFamily: "var(--font-display)",
                                            fontSize: "clamp(2.25rem, 5vw, 4rem)"
                                        },
                                        children: "Simple, transparent and step by step."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/ProcessSection.tsx",
                                        lineNumber: 42,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/ProcessSection.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "max-w-md text-sm text-[var(--muted)] leading-relaxed",
                                children: "No guesswork. From the first discussion to handover, you know exactly what is happening at each milestone."
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/ProcessSection.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/ProcessSection.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/ProcessSection.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative grid gap-0 md:grid-cols-[48px_1fr]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative hidden md:flex md:flex-col md:items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-4 bottom-8 w-px",
                                    style: {
                                        background: "var(--line)"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/ProcessSection.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "process-line absolute top-4 bottom-8 w-[2px] origin-top",
                                    style: {
                                        background: "var(--brand)"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/ProcessSection.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/ProcessSection.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-0",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$content$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].process.map((step, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$motion$2f$Reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                                    delay: i * 0.08,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "group flex flex-col sm:flex-row sm:items-baseline gap-6 border-b py-10 transition-colors hover:bg-white/60 md:px-6 rounded-[var(--radius)]",
                                        style: {
                                            borderColor: "var(--line)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "shrink-0 font-mono text-xs font-bold tracking-[0.18em] text-[var(--brand)]",
                                                style: {
                                                    fontFamily: "var(--font-mono)"
                                                },
                                                children: step.n
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/ProcessSection.tsx",
                                                lineNumber: 80,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "sm:w-56 shrink-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-extrabold text-2xl tracking-tight text-[var(--ink)]",
                                                    style: {
                                                        fontFamily: "var(--font-display)"
                                                    },
                                                    children: step.step
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/ProcessSection.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/ProcessSection.tsx",
                                                lineNumber: 86,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm leading-relaxed text-[var(--muted)] max-w-xl",
                                                children: step.desc
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/ProcessSection.tsx",
                                                lineNumber: 94,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/ProcessSection.tsx",
                                        lineNumber: 76,
                                        columnNumber: 17
                                    }, this)
                                }, step.step, false, {
                                    fileName: "[project]/src/components/sections/ProcessSection.tsx",
                                    lineNumber: 75,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/ProcessSection.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/ProcessSection.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/sections/ProcessSection.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sections/ProcessSection.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_s(ProcessSection, "nKKHggZXpngBxL+e4Le1LUPYkpw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGSAP"]
    ];
});
_c = ProcessSection;
var _c;
__turbopack_context__.k.register(_c, "ProcessSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/content/site.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/gsap.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@gsap/react/src/index.js [app-client] (ecmascript)");
"use client";
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGSAP"]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=src_0rwgyctedg9i6._.js.map