(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const a of document.querySelectorAll('link[rel="modulepreload"]'))
        r(a);
    new MutationObserver((a) => {
        for (const s of a)
            if (s.type === "childList")
                for (const f of s.addedNodes)
                    f.tagName === "LINK" && f.rel === "modulepreload" && r(f);
    }).observe(document, { childList: !0, subtree: !0 });
    function i(a) {
        const s = {};
        return (
            a.integrity && (s.integrity = a.integrity),
            a.referrerPolicy && (s.referrerPolicy = a.referrerPolicy),
            a.crossOrigin === "use-credentials"
                ? (s.credentials = "include")
                : a.crossOrigin === "anonymous"
                ? (s.credentials = "omit")
                : (s.credentials = "same-origin"),
            s
        );
    }
    function r(a) {
        if (a.ep) return;
        a.ep = !0;
        const s = i(a);
        fetch(a.href, s);
    }
})();
var ge = /([:*])(\w+)/g,
    me = "([^/]+)",
    _e = /\*/g,
    ye = "?(?:.*)",
    Le = /\/\?/g,
    Ee = "/?([^/]+|)",
    Oe = "(?:/^|^)",
    Ae = "";
function z(e) {
    return (
        e === void 0 && (e = "/"),
        N() ? location.pathname + location.search + location.hash : e
    );
}
function h(e) {
    return e.replace(/\/+$/, "").replace(/^\/+/, "");
}
function P(e) {
    return typeof e == "string";
}
function Re(e) {
    return typeof e == "function";
}
function k(e) {
    return (e && e.indexOf("#") >= 0 && e.split("#").pop()) || "";
}
function Pe(e, t) {
    return t.length === 0 || !e
        ? null
        : e.slice(1, e.length).reduce(function (i, r, a) {
              return (
                  i === null && (i = {}), (i[t[a]] = decodeURIComponent(r)), i
              );
          }, null);
}
function b(e) {
    var t = h(e).split(/\?(.*)?$/);
    return [h(t[0]), t.slice(1).join("")];
}
function T(e) {
    for (var t = {}, i = e.split("&"), r = 0; r < i.length; r++) {
        var a = i[r].split("=");
        if (a[0] !== "") {
            var s = decodeURIComponent(a[0]);
            t[s]
                ? (Array.isArray(t[s]) || (t[s] = [t[s]]),
                  t[s].push(decodeURIComponent(a[1] || "")))
                : (t[s] = decodeURIComponent(a[1] || ""));
        }
    }
    return t;
}
function K(e, t) {
    var i = b(h(e.currentLocationPath)),
        r = i[0],
        a = i[1],
        s = a === "" ? null : T(a),
        f = [],
        d;
    if (P(t.path)) {
        if (
            ((d =
                Oe +
                h(t.path)
                    .replace(ge, function (L, _, E) {
                        return f.push(E), me;
                    })
                    .replace(_e, ye)
                    .replace(Le, Ee) +
                "$"),
            h(t.path) === "" && h(r) === "")
        )
            return {
                url: r,
                queryString: a,
                hashString: k(e.to),
                route: t,
                data: null,
                params: s,
            };
    } else d = t.path;
    var m = new RegExp(d, Ae),
        v = r.match(m);
    if (v) {
        var O = P(t.path) ? Pe(v, f) : v.groups ? v.groups : v.slice(1);
        return {
            url: h(r.replace(new RegExp("^" + e.instance.root), "")),
            queryString: a,
            hashString: k(e.to),
            route: t,
            data: O,
            params: s,
        };
    }
    return !1;
}
function V() {
    return !!(
        typeof window < "u" &&
        window.history &&
        window.history.pushState
    );
}
function y(e, t) {
    return typeof e[t] > "u" || e[t] === !0;
}
function ke(e) {
    if (!e) return {};
    var t = e.split(","),
        i = {},
        r;
    return (
        t.forEach(function (a) {
            var s = a.split(":").map(function (f) {
                return f.replace(/(^ +| +$)/g, "");
            });
            switch (s[0]) {
                case "historyAPIMethod":
                    i.historyAPIMethod = s[1];
                    break;
                case "resolveOptionsStrategy":
                    r || (r = {}), (r.strategy = s[1]);
                    break;
                case "resolveOptionsHash":
                    r || (r = {}), (r.hash = s[1] === "true");
                    break;
                case "updateBrowserURL":
                case "callHandler":
                case "updateState":
                case "force":
                    i[s[0]] = s[1] === "true";
                    break;
            }
        }),
        r && (i.resolveOptions = r),
        i
    );
}
function N() {
    return typeof window < "u";
}
function be(e, t) {
    return (
        e === void 0 && (e = []),
        t === void 0 && (t = {}),
        e
            .filter(function (i) {
                return i;
            })
            .forEach(function (i) {
                ["before", "after", "already", "leave"].forEach(function (r) {
                    i[r] && (t[r] || (t[r] = []), t[r].push(i[r]));
                });
            }),
        t
    );
}
function g(e, t, i) {
    var r = t || {},
        a = 0;
    (function s() {
        if (!e[a]) {
            i && i(r);
            return;
        }
        Array.isArray(e[a])
            ? (e.splice.apply(e, [a, 1].concat(e[a][0](r) ? e[a][1] : e[a][2])),
              s())
            : e[a](r, function (f) {
                  typeof f > "u" || f === !0 ? ((a += 1), s()) : i && i(r);
              });
    })();
}
g.if = function (e, t, i) {
    return (
        Array.isArray(t) || (t = [t]), Array.isArray(i) || (i = [i]), [e, t, i]
    );
};
function B(e, t) {
    typeof e.currentLocationPath > "u" &&
        (e.currentLocationPath = e.to = z(e.instance.root)),
        (e.currentLocationPath = e.instance._checkForAHash(
            e.currentLocationPath
        )),
        t();
}
function w(e, t) {
    for (var i = 0; i < e.instance.routes.length; i++) {
        var r = e.instance.routes[i],
            a = K(e, r);
        if (
            a &&
            (e.matches || (e.matches = []),
            e.matches.push(a),
            e.resolveOptions.strategy === "ONE")
        ) {
            t();
            return;
        }
    }
    t();
}
function Se(e, t) {
    e.navigateOptions &&
        (typeof e.navigateOptions.shouldResolve < "u" &&
            console.warn(
                '"shouldResolve" is deprecated. Please check the documentation.'
            ),
        typeof e.navigateOptions.silent < "u" &&
            console.warn(
                '"silent" is deprecated. Please check the documentation.'
            )),
        t();
}
function we(e, t) {
    e.navigateOptions.force === !0
        ? (e.instance._setCurrent([e.instance._pathToMatchObject(e.to)]), t(!1))
        : t();
}
var D = N(),
    He = V();
function Ce(e, t) {
    if (y(e.navigateOptions, "updateBrowserURL")) {
        var i = ("/" + e.to).replace(/\/\//g, "/"),
            r = D && e.resolveOptions && e.resolveOptions.hash === !0;
        He
            ? (history[e.navigateOptions.historyAPIMethod || "pushState"](
                  e.navigateOptions.stateObj || {},
                  e.navigateOptions.title || "",
                  r ? "#" + i : i
              ),
              location &&
                  location.hash &&
                  ((e.instance.__freezeListening = !0),
                  setTimeout(function () {
                      if (!r) {
                          var a = location.hash;
                          (location.hash = ""), (location.hash = a);
                      }
                      e.instance.__freezeListening = !1;
                  }, 1)))
            : D && (window.location.href = e.to);
    }
    t();
}
function Q(e, t) {
    var i = e.instance;
    if (!i.lastResolved()) {
        t();
        return;
    }
    g(
        i.lastResolved().map(function (r) {
            return function (a, s) {
                if (!r.route.hooks || !r.route.hooks.leave) {
                    s();
                    return;
                }
                var f = !1,
                    d = e.instance.matchLocation(
                        r.route.path,
                        e.currentLocationPath,
                        !1
                    );
                if (r.route.path !== "*") f = !d;
                else {
                    var m = e.matches
                        ? e.matches.find(function (v) {
                              return r.route.path === v.route.path;
                          })
                        : !1;
                    f = !m;
                }
                if (y(e.navigateOptions, "callHooks") && f) {
                    g(
                        r.route.hooks.leave
                            .map(function (v) {
                                return function (O, L) {
                                    return v(
                                        function (_) {
                                            _ === !1
                                                ? e.instance.__markAsClean(e)
                                                : L();
                                        },
                                        e.matches && e.matches.length > 0
                                            ? e.matches.length === 1
                                                ? e.matches[0]
                                                : e.matches
                                            : void 0
                                    );
                                };
                            })
                            .concat([
                                function () {
                                    return s();
                                },
                            ])
                    );
                    return;
                } else s();
            };
        }),
        {},
        function () {
            return t();
        }
    );
}
function Fe(e, t) {
    e.match.route.hooks &&
    e.match.route.hooks.before &&
    y(e.navigateOptions, "callHooks")
        ? g(
              e.match.route.hooks.before
                  .map(function (i) {
                      return function (a, s) {
                          return i(function (f) {
                              f === !1 ? e.instance.__markAsClean(e) : s();
                          }, e.match);
                      };
                  })
                  .concat([
                      function () {
                          return t();
                      },
                  ])
          )
        : t();
}
function Te(e, t) {
    y(e.navigateOptions, "callHandler") && e.match.route.handler(e.match),
        e.instance.updatePageLinks(),
        t();
}
function Ne(e, t) {
    e.match.route.hooks &&
        e.match.route.hooks.after &&
        y(e.navigateOptions, "callHooks") &&
        e.match.route.hooks.after.forEach(function (i) {
            return i(e.match);
        }),
        t();
}
function Ie(e, t) {
    var i = e.instance.lastResolved();
    if (
        i &&
        i[0] &&
        i[0].route === e.match.route &&
        i[0].url === e.match.url &&
        i[0].queryString === e.match.queryString
    ) {
        i.forEach(function (r) {
            r.route.hooks &&
                r.route.hooks.already &&
                y(e.navigateOptions, "callHooks") &&
                r.route.hooks.already.forEach(function (a) {
                    return a(e.match);
                });
        }),
            t(!1);
        return;
    }
    t();
}
function Me(e, t) {
    var i = e.instance._notFoundRoute;
    if (i) {
        e.notFoundHandled = !0;
        var r = b(e.currentLocationPath),
            a = r[0],
            s = r[1],
            f = k(e.to);
        i.path = h(a);
        var d = {
            url: i.path,
            queryString: s,
            hashString: f,
            data: null,
            route: i,
            params: s !== "" ? T(s) : null,
        };
        (e.matches = [d]), (e.match = d);
    }
    t();
}
function Ue(e, t) {
    (!e.resolveOptions ||
        e.resolveOptions.noMatchWarning === !1 ||
        typeof e.resolveOptions.noMatchWarning > "u") &&
        console.warn(
            'Navigo: "' +
                e.currentLocationPath +
                `" didn't match any of the registered routes.`
        ),
        t();
}
function Ge(e, t) {
    e.instance._setCurrent(null), t();
}
function Y(e, t) {
    y(e.navigateOptions, "updateState") && e.instance._setCurrent(e.matches),
        t();
}
var J = [Ie, Fe, Te, Ne],
    W = [
        Q,
        Me,
        g.if(
            function (e) {
                var t = e.notFoundHandled;
                return t;
            },
            J.concat([Y]),
            [Ue, Ge]
        ),
    ];
function C() {
    return (
        (C =
            Object.assign ||
            function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = arguments[t];
                    for (var r in i)
                        Object.prototype.hasOwnProperty.call(i, r) &&
                            (e[r] = i[r]);
                }
                return e;
            }),
        C.apply(this, arguments)
    );
}
function X(e, t) {
    var i = 0;
    function r() {
        if (i === e.matches.length) {
            Y(e, t);
            return;
        }
        g(J, C({}, e, { match: e.matches[i] }), function () {
            (i += 1), r();
        });
    }
    Q(e, r);
}
function H(e) {
    e.instance.__markAsClean(e);
}
function F() {
    return (
        (F =
            Object.assign ||
            function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = arguments[t];
                    for (var r in i)
                        Object.prototype.hasOwnProperty.call(i, r) &&
                            (e[r] = i[r]);
                }
                return e;
            }),
        F.apply(this, arguments)
    );
}
var $ = "[data-navigo]";
function je(e, t) {
    var i = t || {
            strategy: "ONE",
            hash: !1,
            noMatchWarning: !1,
            linksSelector: $,
        },
        r = this,
        a = "/",
        s = null,
        f = [],
        d = !1,
        m,
        v = V(),
        O = N();
    e
        ? (a = h(e))
        : console.warn(
              'Navigo requires a root path in its constructor. If not provided will use "/" as default.'
          );
    function L(n) {
        return (
            n.indexOf("#") >= 0 &&
                (i.hash === !0
                    ? (n = n.split("#")[1] || "/")
                    : (n = n.split("#")[0])),
            n
        );
    }
    function _(n) {
        return h(a + "/" + h(n));
    }
    function E(n, o, u, l) {
        return (
            (n = P(n) ? _(n) : n),
            { name: l || h(String(n)), path: n, handler: o, hooks: be(u) }
        );
    }
    function x(n, o, u) {
        var l = this;
        return typeof n == "object" && !(n instanceof RegExp)
            ? (Object.keys(n).forEach(function (c) {
                  if (typeof n[c] == "function") l.on(c, n[c]);
                  else {
                      var p = n[c],
                          A = p.uses,
                          ve = p.as,
                          pe = p.hooks;
                      f.push(E(c, A, [m, pe], ve));
                  }
              }),
              this)
            : (typeof n == "function" && ((u = o), (o = n), (n = a)),
              f.push(E(n, o, [m, u])),
              this);
    }
    function I(n, o) {
        if (r.__dirty) {
            r.__waiting.push(function () {
                return r.resolve(n, o);
            });
            return;
        } else r.__dirty = !0;
        n = n ? h(a) + "/" + h(n) : void 0;
        var u = {
            instance: r,
            to: n,
            currentLocationPath: n,
            navigateOptions: {},
            resolveOptions: F({}, i, o),
        };
        return (
            g(
                [
                    B,
                    w,
                    g.if(
                        function (l) {
                            var c = l.matches;
                            return c && c.length > 0;
                        },
                        X,
                        W
                    ),
                ],
                u,
                H
            ),
            u.matches ? u.matches : !1
        );
    }
    function M(n, o) {
        if (r.__dirty) {
            r.__waiting.push(function () {
                return r.navigate(n, o);
            });
            return;
        } else r.__dirty = !0;
        n = h(a) + "/" + h(n);
        var u = {
            instance: r,
            to: n,
            navigateOptions: o || {},
            resolveOptions: o && o.resolveOptions ? o.resolveOptions : i,
            currentLocationPath: L(n),
        };
        g(
            [
                Se,
                we,
                w,
                g.if(
                    function (l) {
                        var c = l.matches;
                        return c && c.length > 0;
                    },
                    X,
                    W
                ),
                Ce,
                H,
            ],
            u,
            H
        );
    }
    function ee(n, o, u) {
        var l = G(n, o);
        return l !== null
            ? (M(l.replace(new RegExp("^/?" + a), ""), u), !0)
            : !1;
    }
    function te(n) {
        return (
            (this.routes = f =
                f.filter(function (o) {
                    return P(n)
                        ? h(o.path) !== h(n)
                        : Re(n)
                        ? n !== o.handler
                        : String(o.path) !== String(n);
                })),
            this
        );
    }
    function ne() {
        v &&
            ((this.__popstateListener = function () {
                r.__freezeListening || I();
            }),
            window.addEventListener("popstate", this.__popstateListener));
    }
    function re() {
        (this.routes = f = []),
            v &&
                window.removeEventListener("popstate", this.__popstateListener),
            (this.destroyed = d = !0);
    }
    function ie(n, o) {
        return (r._notFoundRoute = E("*", n, [m, o], "__NOT_FOUND__")), this;
    }
    function U() {
        if (O)
            return (
                ae().forEach(function (n) {
                    if (
                        n.getAttribute("data-navigo") === "false" ||
                        n.getAttribute("target") === "_blank"
                    ) {
                        n.hasListenerAttached &&
                            n.removeEventListener("click", n.navigoHandler);
                        return;
                    }
                    n.hasListenerAttached ||
                        ((n.hasListenerAttached = !0),
                        (n.navigoHandler = function (o) {
                            if (
                                (o.ctrlKey || o.metaKey) &&
                                o.target.tagName.toLowerCase() === "a"
                            )
                                return !1;
                            var u = n.getAttribute("href");
                            if (typeof u > "u" || u === null) return !1;
                            if (u.match(/^(http|https)/) && typeof URL < "u")
                                try {
                                    var l = new URL(u);
                                    u = l.pathname + l.search;
                                } catch {}
                            var c = ke(n.getAttribute("data-navigo-options"));
                            d ||
                                (o.preventDefault(),
                                o.stopPropagation(),
                                r.navigate(h(u), c));
                        }),
                        n.addEventListener("click", n.navigoHandler));
                }),
                r
            );
    }
    function ae() {
        return O
            ? [].slice.call(document.querySelectorAll(i.linksSelector || $))
            : [];
    }
    function oe(n) {
        return "/" + a + "/" + h(n);
    }
    function se(n) {
        return (m = n), this;
    }
    function ue() {
        return s;
    }
    function G(n, o, u) {
        var l = f.find(function (A) {
                return A.name === n;
            }),
            c = null;
        if (l) {
            if (((c = l.path), o))
                for (var p in o) c = c.replace(":" + p, o[p]);
            c = c.match(/^\//) ? c : "/" + c;
        }
        return (
            c &&
                u &&
                !u.includeRoot &&
                (c = c.replace(new RegExp("^/" + a), "")),
            c
        );
    }
    function ce(n) {
        return n.getAttribute("href");
    }
    function j(n) {
        var o = b(h(n)),
            u = o[0],
            l = o[1],
            c = l === "" ? null : T(l),
            p = k(n),
            A = E(u, function () {}, [m], u);
        return {
            url: u,
            queryString: l,
            hashString: p,
            route: A,
            data: null,
            params: c,
        };
    }
    function fe() {
        return j(h(z(a)).replace(new RegExp("^" + a), ""));
    }
    function le(n) {
        var o = {
            instance: r,
            currentLocationPath: n,
            to: n,
            navigateOptions: {},
            resolveOptions: i,
        };
        return w(o, function () {}), o.matches ? o.matches : !1;
    }
    function he(n, o, u) {
        typeof o < "u" && (typeof u > "u" || u) && (o = _(o));
        var l = { instance: r, to: o, currentLocationPath: o };
        B(l, function () {}),
            typeof n == "string" && (n = typeof u > "u" || u ? _(n) : n);
        var c = K(l, {
            name: String(n),
            path: n,
            handler: function () {},
            hooks: {},
        });
        return c || !1;
    }
    function R(n, o, u) {
        return (
            typeof o == "string" && (o = q(o)),
            o
                ? (o.hooks[n] || (o.hooks[n] = []),
                  o.hooks[n].push(u),
                  function () {
                      o.hooks[n] = o.hooks[n].filter(function (l) {
                          return l !== u;
                      });
                  })
                : (console.warn("Route doesn't exists: " + o), function () {})
        );
    }
    function q(n) {
        return typeof n == "string"
            ? f.find(function (o) {
                  return o.name === _(n);
              })
            : f.find(function (o) {
                  return o.handler === n;
              });
    }
    function de(n) {
        (n.instance.__dirty = !1),
            n.instance.__waiting.length > 0 && n.instance.__waiting.shift()();
    }
    (this.root = a),
        (this.routes = f),
        (this.destroyed = d),
        (this.current = s),
        (this.__freezeListening = !1),
        (this.__waiting = []),
        (this.__dirty = !1),
        (this.__markAsClean = de),
        (this.on = x),
        (this.off = te),
        (this.resolve = I),
        (this.navigate = M),
        (this.navigateByName = ee),
        (this.destroy = re),
        (this.notFound = ie),
        (this.updatePageLinks = U),
        (this.link = oe),
        (this.hooks = se),
        (this.extractGETParameters = function (n) {
            return b(L(n));
        }),
        (this.lastResolved = ue),
        (this.generate = G),
        (this.getLinkPath = ce),
        (this.match = le),
        (this.matchLocation = he),
        (this.getCurrentLocation = fe),
        (this.addBeforeHook = R.bind(this, "before")),
        (this.addAfterHook = R.bind(this, "after")),
        (this.addAlreadyHook = R.bind(this, "already")),
        (this.addLeaveHook = R.bind(this, "leave")),
        (this.getRoute = q),
        (this._pathToMatchObject = j),
        (this._clean = h),
        (this._checkForAHash = L),
        (this._setCurrent = function (n) {
            return (s = r.current = n);
        }),
        ne.call(this),
        U.call(this);
}
const S = new je("/", { linksSelector: "a", hash: !0 }),
    qe = function (e, t = "") {
        return typeof t == "function"
            ? ((t = t()), { root: e, DefaultLayout: t })
            : { root: e, DefaultLayout: t };
    },
    Be = () => `
        <header class="mb-3">
            <div class="container">
                <h1><a href="/">HEADER</a></h1>
            </div>
        </header>
        <main>
            <div class="container">
                <div class="row">
                    <div class="col-3">
                        <h2>Menu</h2>
                        <ul>
                            <li><a href="/" data-router>Trang chủ</a></li>
                            <li><a href="/gioi-thieu" data-router>Giới thiệu</a></li>
                            <li><a href="/san-pham" data-router>Sản phẩm</a></li>
                        </ul>
                    </div>
                    <div class="col-9">
                        {body}
                    </div>
                </div>
            </div>
        </main>
        <footer class="mt-3">
            <div class="container">
                <h1>FOOTER</h1>
            </div>
        </footer>
    `,
    De = () => "<h2>About</h2>",
    We = () => "<h2>Home</h2>",
    Xe = function () {
        return `
        <h2>Danh sách sản phẩm</h2>
        <ul>
            <li><a href="/san-pham/1">Sản phẩm 1</a></li>
            <li><a href="/san-pham/2">Sản phẩm 2</a</li>
            <li><a href="/san-pham/3">Sản phẩm 3</a</li>
        </ul>
    `;
    },
    $e = function ({ data: e }) {
        const { id: t } = e;
        return `<h1>Chi tiết sản phẩm: ${t}</h1>
    <button class="back" ">Back</button>`;
    },
    ze = () =>
        qe(
            [
                { path: "/", component: We },
                { path: "/gioi-thieu", component: De },
                { path: "/san-pham", component: Xe },
                { path: "/san-pham/:id", component: $e },
            ],
            Be
        ),
    Ke = "./assets/error404-xY0uCCFj.png",
    Ve = () => `
        <div class="image">
            <img src="${Ke}" alt="error"/>
        </div>
    `,
    { root: Qe, DefaultLayout: Ye } = ze(),
    Z = (e, t, i = "") => {
        let r = e;
        const a = document.querySelector("#root");
        if ((console.log(t), r)) {
            const s = /{body}/;
            a.innerHTML = r.replace(s, t(i));
        } else a.innerHTML = t(i);
    };
Qe.forEach(({ path: e, component: t }, i) => {
    S.on(e, (r) => Z(Ye, t, r));
});
S.resolve();
S.notFound(() => {
    Z("", Ve);
}).resolve();
document.addEventListener("click", (e) => {
    e.preventDefault(),
        e.target.classList.contains("back") &&
            (console.log(1), S.navigate("san-pham"));
});
