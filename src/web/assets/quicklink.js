/**
 * @fileoverview
 * @author liuduan
 * @Date 2020-05-21 22:57:53
 * @LastEditTime 2020-05-22 20:40:43
 */
function n(n) {
    return new Promise(((e, t, r) => { (r = new XMLHttpRequest()).open('GET', n, r.withCredentials = !0), r.onload = function () { r.status === 200 ? e() : t(); }, r.send(); }));
} let e; const t = (e = document.createElement('link')).relList && e.relList.supports && e.relList.supports('prefetch') ? function (n) { return new Promise(((e, t, r) => { (r = document.createElement('link')).rel = 'prefetch', r.href = n, r.onload = e, r.onerror = t, document.head.appendChild(r); })); } : n; const r = window.requestIdleCallback || function (n) { const e = Date.now(); return setTimeout(() => { n({ didTimeout: !1, timeRemaining() { return Math.max(0, 50 - (Date.now() - e)); } }); }, 1); }; const
    o = new Set(); function i(e, r, i) { if (!(i = navigator.connection) || !i.saveData && !/2g/.test(i.effectiveType)) return Promise.all([].concat(e).map((e) => { if (!o.has(e)) return o.add(e), (r ? function (e) { return window.fetch ? fetch(e, { credentials: 'include' }) : n(e); } : t)(new URL(e, location.href).toString()); })); } exports.listen = function (n) {
    if (n || (n = {}), window.IntersectionObserver) {
        const e = (function (n) {
            n = n || 1; const e = []; let
                t = 0; function r() { t < n && e.length > 0 && (e.shift()(), t++); } return [function (n) { e.push(n) > 1 || r(); }, function () { t--, r(); }];
        }(n.throttle || 1 / 0));
        const t = e[0];
        const c = e[1];
        const u = n.limit || 1 / 0;
        const s = n.origins || [location.hostname];
        const a = n.ignores || [];
        const f = n.timeoutFn || r;
        var l = new IntersectionObserver(((e) => { e.forEach((e) => { e.isIntersecting && (l.unobserve(e = e.target), o.size < u && t(() => { i(e.href, n.priority).then(c).catch((e) => { c(), n.onError && n.onError(e); }); })); }); })); return f(() => { (n.el || document).querySelectorAll('a').forEach((n) => { s.length && !s.includes(n.hostname) || (function n(e, t) { return Array.isArray(t) ? t.some((t) => n(e, t)) : (t.test || t).call(t, e.href, e); }(n, a)) || l.observe(n); }); }, { timeout: n.timeout || 2e3 }), function () { o.clear(), l.disconnect(); };
    }
}, exports.prefetch = i;
