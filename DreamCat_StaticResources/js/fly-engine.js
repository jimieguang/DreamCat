let t, e;
const n = new Set,
    o = document.createElement("link"),
    s = o.relList && o.relList.supports && o.relList.supports("prefetch") && window.IntersectionObserver && "isIntersecting" in IntersectionObserverEntry.prototype,
    i = "instantAllowQueryString" in document.body.dataset,
    r = "instantAllowExternalLinks" in document.body.dataset,
    a = "instantWhitelist" in document.body.dataset;
let c = 65,
    d = !1,
    l = !1,
    u = !1;
if ("instantIntensity" in document.body.dataset) {
    const t = document.body.dataset.instantIntensity;
    if ("mousedown" == t.substr(0, "mousedown".length)) d = !0, "mousedown-only" == t && (l = !0);
    else if ("viewport" == t.substr(0, "viewport".length)) navigator.connection && (navigator.connection.saveData || navigator.connection.effectiveType.includes("2g")) || ("viewport" == t ? document.documentElement.clientWidth * document.documentElement.clientHeight < 45e4 && (u = !0) : "viewport-all" == t && (u = !0));
    else {
        const e = parseInt(t);
        isNaN(e) || (c = e)
    }
}
if (s) {
    const n = {
        capture: !0,
        passive: !0
    };
    if (l || document.addEventListener("touchstart", function (t) {
            e = performance.now();
            const n = t.target.closest("a");
            if (!f(n)) return;
            h(n.href)
        }, n), d ? document.addEventListener("mousedown", function (t) {
            const e = t.target.closest("a");
            if (!f(e)) return;
            h(e.href)
        }, n) : document.addEventListener("mouseover", function (n) {
            if (performance.now() - e < 1100) return;
            const o = n.target.closest("a");
            if (!f(o)) return;
            o.addEventListener("mouseout", m, {
                passive: !0
            }), t = setTimeout(() => {
                h(o.href), t = void 0
            }, c)
        }, n), u) {
        let t;
        (t = window.requestIdleCallback ? t => {
            requestIdleCallback(t, {
                timeout: 1500
            })
        } : t => {
            t()
        })(() => {
            const t = new IntersectionObserver(e => {
                e.forEach(e => {
                    if (e.isIntersecting) {
                        const n = e.target;
                        t.unobserve(n), h(n.href)
                    }
                })
            });
            document.querySelectorAll("a").forEach(e => {
                f(e) && t.observe(e)
            })
        })
    }
}

function m(e) {
    e.relatedTarget && e.target.closest("a") == e.relatedTarget.closest("a") || t && (clearTimeout(t), t = void 0)
}

function f(t) {
    if (t && t.href && (!a || "instant" in t.dataset) && (r || t.origin == location.origin || "instant" in t.dataset) && ["http:", "https:"].includes(t.protocol) && ("http:" != t.protocol || "https:" != location.protocol) && (i || !t.search || "instant" in t.dataset) && !(t.hash && t.pathname + t.search == location.pathname + location.search || "noInstant" in t.dataset)) return !0
}

function h(t) {
    if (n.has(t)) return;
    const e = document.createElement("link");
    e.rel = "prefetch", e.href = t, document.head.appendChild(e), n.add(t)
}
