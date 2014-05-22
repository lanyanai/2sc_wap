/**
 * Created by Administrator on 2014/5/12.
 */
var G = this.G = {};
!function(e)
{
    var t = {};
    e.config = function(e, n) {
        if (!arguments.length)
            return t;
        if (2 === arguments.length)
            t[e] = n;
        else {
            if ("object" != typeof e)
                return t[e];
            Object.keys(e).forEach(function(n) {
                t[n] = e[n]
            })
        }
    }
}(G), function(e)
{
    var t = e.util = {}, n = /([^:\/])\/\/+/g, r = /.*(?=\/.*$)/;
    t.path = {idToUrl: function(n) {
        return t.path.isAbsolute(n) ? n : t.path.realpath(e.config("baseUrl") + n)
    },dirname: function(e) {
        var t = e.match(r);
        return (t ? t[0] : ".") + "/"
    },isAbsolute: function(e) {
        return e.indexOf("://") > 0 || 0 === e.indexOf("//")
    },isRelative: function(e) {
        return 0 === e.indexOf("./") || 0 === e.indexOf("../")
    },realpath: function(e) {
        if (n.lastIndex = 0, n.test(e) && (e = e.replace(n, "$1/")), -1 === e.indexOf("."))
            return e;
        for (var t, r = e.split("/"), o = [], i = 0; i < r.length; i++)
            if (t = r[i], ".." === t) {
                if (0 === o.length)
                    throw new Error("The path is invalid: " + e);
                o.pop()
            } else
                "." !== t && o.push(t);
        return o.join("/")
    },map: function(t) {
        for (var n, r = t, o = e.config("map") || [], i = 0; i < o.length && (n = o[i], r = "function" == typeof n ? n(t) : t.replace(n[0], n[1]), r === t); i++)
            ;
        return r
    }}
}(G), function() {
    G.Deferred = function() {
        function e(e) {
            for (; (cb = e.shift()) || (cb = i.always.shift()); )
                setTimeout(function(e) {
                    return function() {
                        e.apply({}, a)
                    }
                }(cb), 0)
        }
        var t = "pending", n = "done", r = "fail", o = t, i = {done: [],fail: [],always: []}, a = [], u = {}, s = {done: function(e) {
            return o === n && setTimeout(function() {
                e.apply(u, a)
            }, 0), o === t && i.done.push(e), s
        },fail: function(e) {
            return o === r && setTimeout(function() {
                e.apply(u, a)
            }, 0), o === t && i.fail.push(e), s
        },always: function(e) {
            return o !== t ? void setTimeout(function() {
                e.apply(u, a)
            }, 0) : (i.always.push(e), s)
        },resolve: function() {
            return o !== t ? s : (a = [].slice.call(arguments), o = n, e(i.done), s)
        },reject: function() {
            return o !== t ? s : (a = [].slice.call(arguments), o = r, e(i.fail), s)
        },state: function() {
            return o
        },promise: function() {
            var e = {};
            return Object.keys(s).forEach(function(t) {
                "resolve" !== t && "reject" !== t && (e[t] = s[t])
            }), e
        }};
        return s
    }, G.when = function(e) {
        Array.isArray(e) || (e = [].slice.call(arguments));
        var t = G.Deferred(), n = e.length, r = 0;
        return n ? (e.forEach(function(e) {
            e.fail(function() {
                t.reject()
            }).done(function() {
                ++r === n && t.resolve()
            })
        }), t.promise()) : t.resolve().promise()
    }
}(G), function(e) {
    var t = [];
    e.Loader = {register: function(e, n) {
        var r = function(t) {
            return e.test(t) ? n : !1
        };
        t.push(r)
    },match: function(e) {
        var n, r = 0;
        do {
            if (n = t[r](e))
                break;
            r++
        } while (r < t.length);
        return n
    }}
}(G), function(e, t, n) {
    function r(e, t) {
        var n = f.getOrCreate("module_" + s++), r = n.id;
        return n.isAnonymous = !0, f.save(r, e, t, this.context), f.defers[r].promise()
    }
    function o(e) {
        function o(e) {
            if (e = o.resolve(e), !f.cache[e] || f.cache[e].status !== a.COMPILED)
                throw new Error("Module not found:" + e);
            return f.cache[e].exports
        }
        return e = e || window.location.href, o.resolve = function(r) {
            if (u.alias && u.alias[r])
                return u.alias[r];
            if (f.cache[r])
                return r;
            if (n.path.isAbsolute(r))
                return r;
            if (n.path.isRelative(r)) {
                r = n.path.realpath(n.path.dirname(e) + r);
                var o = t.config("baseUrl");
                0 === r.indexOf(o) && (r = r.replace(o, ""))
            }
            return /(\.[a-z]*$)|([\?;].*)$/.test(r) ? r : r + ".js"
        }, o.async = function(t, n) {
            return r.call({context: e}, t, n)
        }, o.cache = f.cache, o
    }
    function i(e, t) {
        var n = new o(t);
        Array.isArray(e) || (e = [e]);
        var r = e.map(function(e) {
            return f.getOrCreate(n.resolve(e))
        }), i = r.filter(function(e) {
            return e.status < a.FETCHING
        });
        return c ? f.holdedRequest = f.holdedRequest.concat(i) : i.forEach(f.fetch), r
    }
    var a = {ERROR: -2,FAILED: -1,FETCHING: 1,FETCHED: 2,SAVED: 3,READY: 4,COMPILING: 5,PAUSE: 6,COMPILED: 7}, u = t.config(), s = 0, c = 0;
    t.use = function(e, t) {
        return r.call({context: window.location.href}, e, t)
    }, e.define = function(e, t, n) {
        if ("string" != typeof e)
            throw new Error("ID must be a string");
        return n || (n = t, t = []), f.cache[e] && f.cache[e].status >= a.SAVED ? void 0 : f.save(e, t, n, e)
    }, t.Require = o;
    var f = {};
    f.cache = {}, f.defers = {}, f.queue = [], f.holdedRequest = [], f.STATUS = a, f.getOrCreate = function(e) {
        return f.cache[e] || (f.cache[e] = {id: e,status: 0,dependencies: []}, f.defers[e] = t.Deferred()), f.cache[e]
    }, f.wait = function(e) {
        var n = e.dependencies.map(function(e) {
            return f.defers[e.id]
        });
        t.when(n).done(function() {
            f.compile(e)
        }).fail(function(t) {
            f.fail(e, new Error(t))
        })
    }, f.compile = function(e) {
        var t, n;
        if (e.status = a.READY, "function" == typeof e.factory) {
            e.status = a.COMPILING;
            try {
                e.isAnonymous ? (t = e.dependencies.map(function(e) {
                    return e.exports
                }), e.exports = e.factory.apply(window, t)) : (e.exports = {}, e.async = function() {
                    return e.status = a.PAUSE, function() {
                        e.status = a.COMPILED, f.defers[e.id].resolve(e.exports)
                    }
                }, f.defers[e.id].always(function() {
                    delete e.async
                }), n = e.factory.call(window, new o(e.id), e.exports, e), n && (e.exports = n))
            } catch (r) {
                throw e.status = a.ERROR, f.fail(e, r), r
            }
        } else
            e.exports = e.factory;
        e.status !== a.PAUSE && (e.status = a.COMPILED, f.defers[e.id].resolve(e.exports))
    }, f.fail = function(e, t) {
        throw f.defers[e.id].reject(t), t
    }, f.fetch = function(e) {
        var r = t.Loader.match(e.id) || t.Loader.match(".js");
        e.url = n.path.map(n.path.idToUrl(e.id)), r.call({fail: function(t) {
            f.fail(e, t)
        },compile: function() {
            f.compile(e)
        },onLoad: function() {
            f.queue.length && (f.queue.filter(function(e) {
                return e.status < a.FETCHING
            }).forEach(f.fetch), f.queue = [])
        },holdRequest: function() {
            c++
        },flushRequest: function() {
            c--, f.holdedRequest.filter(function(e) {
                return e.status < a.FETCHING
            }).forEach(f.fetch), f.holdedRequest = []
        }}, e)
    }, f.save = function(e, t, n, r) {
        var o = f.getOrCreate(e);
        t = i(t, r), o.dependencies = t, o.factory = n, o.status = a.SAVED, f.wait(o)
    }, f.remove = function(e) {
        var t = f.getOrCreate(e);
        delete f.cache[t.id], delete f.defers[t.id]
    }, t.Module = f
}(window, G, G.util), function(e) {
    function t(e, t) {
        var i = n.createElement("script"), a = !1, u = setTimeout(function() {
            r.removeChild(i), t(new Error("Load timeout"))
        }, 3e4);
        i.setAttribute("type", "text/javascript"), i.setAttribute("charset", "utf-8"), i.setAttribute("src", e), i.setAttribute("async", !0), i.onload = i.onreadystatechange = function() {
            a || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (a = !0, clearTimeout(u), i.onload = i.onreadystatechange = null, t())
        }, i.onerror = function() {
            clearTimeout(u), r.removeChild(i), t(new Error("Load Fail"))
        }, o ? r.insertBefore(i, o) : r.appendChild(i)
    }
    var n = document, r = n.head || n.getElementsByTagName("head")[0] || n.documentElement, o = r.getElementsByTagName("base")[0], i = /\.cmb\.js$/;
    e.Loader.register(/\.js/, function(n) {
        var r = this, o = i.test(n.id);
        n.status = e.Module.STATUS.FETCHING, o && r.holdRequest(), t(n.url, function(t) {
            t ? r.fail(t) : (n.status === e.Module.STATUS.FETCHING && (n.status = e.Module.STATUS.FETCHED), n.status > 0 && n.status < e.Module.STATUS.SAVED && r.compile(), o && r.flushRequest(), r.onLoad())
        })
    })
}(G), function(e) {
    var t = document, n = t.head || t.getElementsByTagName("head")[0] || t.documentElement, r = +navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1") < 536, o = window.navigator.userAgent.indexOf("Firefox") > 0 && !("onload" in document.createElement("link"));
    e.Loader.register(/\.css/, function(i) {
        function a() {
            clearTimeout(s), i.status === e.STATUS.FETCHING && (i.status = e.STATUS.FETCHED), c.done()
        }
        function u(e, t) {
            var n;
            if (r)
                e.sheet && (n = !0);
            else if (e.sheet)
                try {
                    e.sheet.cssRules && (n = !0)
                } catch (o) {
                    "NS_ERROR_DOM_SECURITY_ERR" === o.name && (n = !0)
                }
            setTimeout(function() {
                n ? t() : u(e, t)
            }, 1)
        }
        var s, c = this, f = t.createElement("link");
        return f.setAttribute("type", "text/css"), f.setAttribute("href", i.url), f.setAttribute("rel", "stylesheet"), r || o ? setTimeout(function() {
            u(f, a)
        }, 0) : (f.onload = a, f.onerror = function() {
            clearTimeout(s), n.removeChild(f), c.fail(new Error("Load Fail"))
        }), i.status = e.STATUS.FETCHING, n.appendChild(f), s = setTimeout(function() {
            n.removeChild(f), c.fail(new Error("Load timeout"))
        }, 3e4), f
    })
}(G), G.config({baseUrl: "http://sta.ganjistatic1.com/ng/",map: [[/\/ng\/(.*\.(js|css))$/, function(e, t) {
    var n = G.config("version") || {}, r = n[t], o = G.config("expire") || 604800, i = Date.now() / 1e3;
    return r || (r = parseInt(i - i % o, 10)), e + "?v=" + r
}]]}), G.config({alias: {zepto: "com/mobile/lib/zepto/zepto.cmb.js",$: "com/mobile/lib/zepto/zepto.cmb.js",underscore: "com/mobile/lib/underscore/underscore.js"}}), /\.ganji\.com$/.test(window.location.host) && (document.domain = "ganji.com");
