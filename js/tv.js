/**
 * Created by Administrator on 2014/4/22.
 */
(function() {
    var aa = void 0,
        f = !0,
        l = null,
        n = !1,
        ba;
    String.prototype.hasOwnProperty("trim") || (String.prototype.trim = function() {
        return this.replace(/^(\s|\r|\n|\r\n)*|(\s|\r|\n|\r\n)*$/g, "")
    });
    Function.prototype.hasOwnProperty("bind") || (Function.prototype.bind = function(a) {
        var b = this,
            c = 1 < arguments.length ? Array.slice(arguments, 1) : l;
        return function() {
            return b.apply(a || this, c)
        }
    });
    var p = document,
        q = window,
        ca = location,
        da = "ontouchstart" in q,
        r = q.navigator.userAgent,
        t = /Android|HTC/i.test(r) || !!(q.navigator.platform + "").match(/Linux/i),
        ga = t && /Pad/i.test(r),
        ha = !t && /iPad/i.test(r),
        ia = !t && /iPod|iPhone/i.test(r),
        ja = ha || ia,
        ka = /Windows Phone/i.test(r),
        ma = /Windows Pad/i.test(r),
        na = /BB10|BlackBerry/i.test(r),
        qa = /IEMobile/i.test(r),
        ra = /Symbian/i.test(r),
        sa = !!p.all,
        ta = !(!r.match(/Safari/i) || t),
        ua = !(!r.match(/Chrome/i) || t),
        va = !(!q.WeixinJSBridge && !/MicroMessenger/i.test(r)),
        wa = parseFloat(q.devicePixelRatio) || 1,
        xa = t ? 10 : 6,
        za = da ? "touchstart": "mousedown",
        Aa = da ? "touchmove": "mousemove",
        Ba = da ? "touchend": "mouseup",
        Ca = p.getElementsByClassName,
        Da = 1;
    if (sa) try {
        p.execCommand("BackgroundImageCache", n, f)
    } catch(Ea) {}
    t && (q.screen.width / q.innerWidth).toFixed(2) == wa.toFixed(2) && (Da = 1 / wa);
    var Fa = 1;
    function u(a, b) {
        return 1 > arguments.length ? Ha || new La: new v(a, b)
    }
    function La() {
        Ha = this;
        return this
    }
    function Ma() {}
    var Ha = l,
        Na = p.querySelectorAll ?
            function(a, b) {
                b = b || p;
                for (var c = a.slice(1), d, e = f, g = "+~[>#. ".split(""), h = g.length; h--;) if ( - 1 != c.indexOf(g[h])) {
                    e = n;
                    break
                }
                return e ? "#" == a.charAt(0) ? (d = p.getElementById(c)) ? [d] : [] : Ca && "." == a.charAt(0) ? b.getElementsByClassName(c) : b.getElementsByTagName(a) : b.querySelectorAll(a)
            }: function() {
            return []
        };
    function v(a, b) {
        this.b = [];
        if (a) if (a.nodeType || a === q) this.b = [a],
            this.length = 1;
        else if ("string" === typeof a) {
            var c = a.length;
            if ("<" === a.charAt(0) && 2 < c && ">" === a.charAt(c - 1)) {
                a = a.replace(/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, "<$1></$2>");
                c = p.createElement("div");
                c.innerHTML = a;
                for (var d = 0,
                         e = c.childNodes.length; d < e; d++) this.b.push(c.childNodes[d])
            } else {
                if (b instanceof v && (b = b.b[0], !b)) return this.b = [],
                    this.length = 0,
                    this;
                this.b = Na(a, b)
            }
            this.length = this.b.length
        } else {
            if (a instanceof v) return a;
            if (a.length) {
                for (var c = a,
                         d = [], e = 0, g = c.length; e < g; e++) d.push(c[e]);
                this.b = d;
                this.length = this.b.length
            }
        } else this.length = 0;
        return this
    }
    v.prototype = {};
    function y(a, b) {
        for (var c = 0,
                 d = a.length,
                 e; c < d; c++) e = a.b[c],
            b.call(a, e, c);
        return a
    }
    La.prototype = {
        extend: function(a, b) {
            var c, d;
            for (c in b) d = b[c],
                d !== l && (a[c] = "object" == typeof d && !d.nodeType && !(d instanceof Array) ? La.prototype.extend({},
                d) : d);
            return a
        },
        copy: function(a) {
            if (a instanceof Array) {
                for (var b = [], c = 0, d = a.length; c < d; c++) b[c] = La.prototype.copy(a[c]);
                return b
            }
            return "object" == typeof a ? La.prototype.extend({},
                a) : a
        }
    };
    var JSON = q.JSON || {
        U: {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        T: function(a) {
            return JSON.U[a] || "\\u00" + Math.floor(a.charCodeAt() / 16).toString(16) + (a.charCodeAt() % 16).toString(16)
        },
        stringify: function(a) {
            type = a instanceof Array ? "array": typeof a;
            switch (type) {
                case "string":
                    return '"' + a.replace(/[\x00-\x1f\\"]/g, JSON.T) + '"';
                case "array":
                    for (var b = [], c = 0, d = a.length; c < d; c++) b.push(JSON.stringify(a[c]));
                    return "[" + b.join(",") + "]";
                case "object":
                case "hash":
                    b = [];
                    for (c in a) d = a[c],
                        (d = JSON.stringify(d)) && b.push(JSON.stringify(c) + ":" + d);
                    return "{" + b.join(",") + "}";
                case "number":
                case "boolean":
                    return String(a);
                case n:
                    return "null"
            }
            return l
        },
        parse: function(a) {
            return eval("(" + a + ")")
        }
    };
    Array.isArray || (Array.isArray = function(a) {
        return a instanceof Array
    }); [].forEach || (Array.prototype.forEach = function(a, b) {
        b || (b = this);
        for (var c = 0,
                 d = b.length; c < d; c++) a.call(b, b[c], c, b)
    }); [].map || (Array.prototype.map = function(a, b) {
        b || (b = this);
        var c = [];
        b.forEach(function(b, e, g) {
            c.push(a.call(g, b, e, g))
        });
        return c
    });
    function Storage(a, b) {
        var c = Oa();
        if (c) {
            if ("undefined" === typeof b) return (b = c.getItem(a)) && JSON.parse(b);
            c.setItem(a, JSON.stringify(b))
        }
    }
    function Oa() {
        var a;
        try {
            a = q.localStorage
        } catch(b) {}
        Oa = function() {
            return q.localStorage
        };
        return a
    }
    function Pa(a) {
        var b = Oa();
        if (b) if (a) for (var c in b) 0 === c.indexOf(a) && b.removeItem(c);
        else b.clear()
    }
    function Qa(a, b) {
        Sa.hasOwnProperty(a) ? Sa[a].push(b) : Sa[a] = [b]
    }
    function Ta(a, b) {
        var c;
        c = c || q;
        b && !(b instanceof Array) && (b = [b]);
        var d = Sa[a] || [],
            e,
            g = d.length;
        for (e = 0; e < g; e++) d[e].apply(c, b)
    }
    var Sa = {};
    function Ua(a) {
        a = a.replace(/^\?+/, "").replace(/&amp;/, "&");
        a = a.split("&");
        for (var b = a.length,
                 c = {},
                 d; b--;) if (d = a[b].split("="), d[0]) {
            var e = d[1] || "";
            try {
                e = decodeURIComponent(e)
            } catch(g) {
                e = unescape(e)
            }
            c[decodeURIComponent(d[0])] = e
        }
        return c
    }
    function z(a, b) {
        var c;
        if (b) {
            var d;
            d = u(b).get(0);
            c = d.search || "";
            if (!c) {
                d = "FORM" == d.nodeName ? d.getAttribute("action") : d.getAttribute("href");
                var e = d.indexOf("?"); - 1 !== e && (c = d.slice(e))
            }
        } else c = q.location.search.substring(1);
        c = Ua(c);
        return a in c ? c[a] : l
    }
    function Va(a) {
        var b = [],
            c,
            d,
            e;
        for (c in a) if (d = a[c], d instanceof Array) for (e = d.length; e--;) b.push(c + "[]=" + encodeURIComponent(d[e]));
        else b.push(c + "=" + encodeURIComponent("undefined" === typeof d ? "": d));
        return b.join("&")
    }
    var Wa;
    function Xa(a, b) {
        return Va(b)
    }
    function Ya(a) {
        u();
        return z(a, aa)
    }
    function Za(a, b, c, d) {
        var e = "";
        0 !== c && (e = new Date, e.setTime(e.getTime() + 36E5 * (c || 24)), e = ";expires=" + e.toGMTString());
        p.cookie = escape(a) + "=" + escape(b) + e + ";path=/" + (d ? ";domain=" + d: "")
    }
    function B(a) {
        for (var b = p.cookie.split(";"), c, d = 0; d < b.length; d++) if (c = b[d].split("="), c[0].trim() == a) return unescape(c[1]);
        return l
    }
    La.prototype.d = v.prototype.d = function(a) {
        f === ab ? a() : (bb.push(a), cb());
        return this
    };
    ba = v.prototype;
    ba.remove = function() {
        return y(this,
            function(a) {
                a.parentNode.removeChild(a)
            })
    };
    function db(a, b, c) {
        var d = c ? "insertBefore": "appendChild";
        if (a.nodeType) b[d](a, c);
        else if (a instanceof v) for (var e = 0,
                                          g = a.length; e < g; e++) b[d](a.b[e], c);
        else if ("string" === typeof a) {
            var h = p.createElement("div");
            h.innerHTML = a;
            e = 0;
            for (g = h.childNodes.length; e < g; e++) b[d](h.childNodes[0], c)
        }
    }
    function hb(a, b) {
        y(a,
            function(a) {
                db(b, a.parentNode, a)
            })
    }
    function ib(a, b) {
        y(a,
            function(a) {
                db(b, a.parentNode, a.nextSibling)
            })
    }
    function jb(a, b) {
        y(a,
            function(a) {
                db(b, a, a.firstChild)
            })
    }
    ba.append = function(a) {
        return y(this,
            function(b) {
                db(a, b)
            })
    };
    ba.insertBefore = function(a) {
        hb(u(a), this);
        return this
    };
    function kb(a) {
        var b = u(".appbar");
        jb(u(b), a);
        return a
    }
    function lb(a, b) {
        u(b).append(a);
        return a
    }
    ba.width = function() {
        var a = this.b[0];
        return a && a.offsetWidth
    };
    ba.height = function() {
        var a = this.b[0];
        return a && a.offsetHeight
    };
    ba.offset = function() {
        var a = this.b[0];
        if (a) {
            var a = (a = a.getBoundingClientRect) && a(),
                b = p.body;
            if (a) return {
                left: a.left + (q.pageXOffset || b.scrollTop || 0),
                top: a.top + (q.pageYOffset || b.scrollLeft || 0)
            }
        }
        return {
            left: 0,
            top: 0
        }
    };
    function D(a, b) {
        return u(a.get(b))
    }
    ba.indexOf = [].indexOf;
    ba.get = function(a) {
        var b = this.length;
        a += 0 > a ? b: 0;
        return a > b - 1 ? l: this.b[a]
    };
    ba.parent = function() {
        var a = new v,
            b = [];
        y(this,
            function(a) {
                b.push(a.parentNode)
            });
        a.b = b;
        a.length = b.length;
        return a
    };
    ba.children = function() {
        var a = new v,
            b = [];
        y(this,
            function(a) {
                for (var d = 0,
                         e = a.childNodes.length; d < e; d++) {
                    var g = a.childNodes[d];
                    1 == g.nodeType && b.push(g)
                }
            });
        a.b = b;
        a.length = b.length;
        return a
    };
    v.uid = function(a) {
        return a.__ruid || (a.__ruid = Fa++)
    };
    var bb = [],
        mb = n,
        ab = n,
        nb = l;
    function ob() {
        sa && "interactive" == p.readyState ? (nb && clearTimeout(nb), nb = setTimeout(ob, 10)) : (cb(), mb = f)
    }
    function cb() {
        if (n === mb) {
            var a = p.readyState;
            0 > "loading|uninitialized".indexOf(a) ? sa && "interactive" == a ? ob() : pb() : (mb = f, p.addEventListener ? p.addEventListener("DOMContentLoaded", pb) : (a = p.getElementById("_ir_"), a || (p.write('<script id="_ir_" defer="true" src="://">\x3c/script>'), a = p.getElementById("_ir_")), a.onreadystatechange = a.onload = function() {
                "complete" == this.readyState && pb()
            }))
        }
    }
    function pb() {
        if (n === ab) {
            ab = f;
            for (var a = bb,
                     b = 0,
                     c = a.length; b < c; b++) try {
                a[b]()
            } catch(d) {}
            bb = []
        }
    }
    v.prototype.offset = function() {
        var a = this.b[0],
            b = {
                left: 0,
                top: 0
            };
        if (a) {
            do b.left += a.offsetLeft || 0,
                b.top += a.offsetTop || 0,
                a = a.offsetParent;
            while (a)
        }
        return b
    };
    function F(a, b) {
        var c = b;
        if ("undefined" !== typeof c) {
            var c = c + "",
                d = f; - 1 < c.indexOf("<") && -1 < c.indexOf(">") && (d = n);
            return y(a,
                function(a) {
                    a && "innerHTML" in a && (a.innerHTML = c, d || Ta("DOM.html", a))
                })
        }
        var e = a.b[0];
        return e && e.innerHTML
    }
    function qb(a, b) {
        if ("undefined" !== typeof b) return y(a,
            function(a) {
                a.value = b
            });
        var c = a.b[0];
        return c && c.value
    }
    function G(a, b, c) {
        return "undefined" !== typeof c ? y(a,
            function(a) {
                a.setAttribute(b, c)
            }) : (a = a.b[0]) && a.getAttribute && a.getAttribute(b)
    }
    function rb(a) {
        y(a,
            function(a) {
                a.removeAttribute && a.removeAttribute("float_menu")
            })
    }
    function I(a, b, c) {
        return "object" !== typeof b && c === aa ? (a = a.b[0]) && (a.currentStyle || q.getComputedStyle(a, l))[b] : y(a,
            function(a) {
                if ("object" !== typeof b) {
                    var e = {};
                    e[b] = c;
                    b = e
                }
                for (var g in b) e = b[g],
                    "opacity" !== g && ("" !== e && !isNaN(e) && 0 != e) && (e += "px"),
                    a.style[g] = e
            })
    }
    function J(a, b) {
        for (var c = (b || "").match(/\S+/g) || [], d = c.length, e = 0, g, h = a.length; e < h; e++) for (g = 0; g < d; g++) if ( - 1 < (" " + a.b[e].className + " ").indexOf(" " + c[g] + " ")) return f;
        return n
    }
    function K(a, b) {
        var c = (b || "").match(/\S+/g) || [],
            d = c.length;
        return y(a,
            function(a) {
                var b = " " + (a.className || "") + " ",
                    h,
                    k;
                for (k = 0; k < d; k++) h = c[k],
                    0 > b.indexOf(" " + h + " ") && (b += h + " ");
                a.className = b.trim()
            })
    }
    function L(a, b) {
        var c = (b || "").match(/\S+/g) || [],
            d = c.length;
        return y(a,
            function(a) {
                var b = " " + a.className + " ",
                    h = b,
                    k, m;
                for (m = 0; m < d; m++) k = c[m],
                    -1 < b.indexOf(k) && (b = b.replace(" " + k + " ", " "));
                h != b && (a.className = b.trim())
            })
    }
    function sb(a, b, c) {
        var d = (b || "").match(/\S+/g) || [],
            e = d.length;
        return y(a,
            function(a) {
                var b = " " + a.className + " ",
                    k, m, w;
                for (w = 0; w < e; w++) k = d[w],
                    m = 0 > b.indexOf(" " + k + " "),
                    "undefined" === typeof c && (c = m),
                    c ? m && (b += k + " ") : b = b.replace(" " + k + " ", " ");
                a.className = b.trim()
            })
    }
    var tb = n; ! t && 0 > r.indexOf("PlayStation") && (tb = f);
    function ub(a) {
        if (a instanceof ub) return a;
        var b = a.changedTouches,
            b = b && 0 < b.length ? b[0] : a;
        this.event = a;
        this.g = b;
        this.target = a.target || a.srcElement;
        this.type = a.type;
        return this
    }
    ub.prototype = {
        Q: n,
        preventDefault: function() {
            var a = this.event;
            a.preventDefault ? a.preventDefault() : a.returnValue = n
        },
        stopPropagation: function() {
            var a = this.event;
            this.Q = f;
            a.stopPropagation && a.stopPropagation()
        }
    };
    var vb = {},
        wb = p.addEventListener ?
            function(a, b, c, d) {
                b.addEventListener(a, c, d)
            }: function(a, b, c) {
            b.attachEvent("on" + a, c)
        };
    function xb(a, b, c, d) {
        var e = vb[a] || (vb[a] = {});
        b = e[b] || (e[b] = []);
        e = -1 !== "|focus|blur|".indexOf(a);
        1 > b.length && ( - 1 !== "|click|mouseover|mouseout|mousemove|focus|blur|touchstart|touchmove|touchend|touchcancel".indexOf(a) && (c = p), wb(a, c, yb, e));
        b.push(d)
    }
    function Eb(a) {
        xb("click", "tA", p, a)
    }
    function yb(a) {
        a = new ub(a);
        var b = a.type,
            c = a.target,
            d = vb[b] || {};
        if ("click" === b && tb && !a.g.R) a.preventDefault();
        else for (; c;) {
            var b = v.uid(c),
                b = d[b] || [],
                e = f,
                g = d["t" + c.nodeName];
            g && (b = b.concat(g));
            for (var g = 0,
                     h = b.length; g < h; g++) {
                a.currentTarget = c;
                var k = b[g].apply(c, [a]);
                n === k && (e = k)
            }
            n === e && (a.preventDefault(), a.stopPropagation());
            if (f === a.Q) break;
            c = c.parentNode
        }
    }
    v.prototype.a = function(a, b) {
        if ("object" === typeof a) {
            for (var c in a) this.a(c, a[c]);
            return this
        }
        return y(this,
            function(c) {
                var e = v.uid(c);
                xb(a, e, c, b)
            })
    };
    function Fb(a, b) {
        var c = p.createEvent("MouseEvents");
        c.initEvent(b, f, f);
        c.data = aa;
        c.R = f;
        return y(a,
            function(a) {
                if ("function" === typeof a[b]) a[b]();
                else a.dispatchEvent && a.dispatchEvent(c)
            })
    }
    var M = {
        J: "active",
        r: n,
        P: "__RR_EVENT_INITED__",
        A: function() {
            if (!q[M.P]) {
                var a = {
                        ca: za,
                        ba: Aa,
                        aa: Ba
                    },
                    b;
                for (b in a) wb(a[b], p, M[b], n);
                wb("touchcancel", p, M.C, n);
                tb && wb("click", p, yb, n);
                q[M.P] = f
            }
        },
        ca: function(a) {
            a = new ub(a);
            var b = a.g;
            a = a.target;
            var c = vb.click || {};
            M.L();
            M.r = f;
            M.M = a;
            M.S = [b.screenX * Da, b.screenY * Da];
            for (M.G = []; a;) b = v.uid(a),
                (c[b] || -1 < ["A", "INPUT", "BUTTON"].indexOf(a.nodeName)) && M.G.push(K(u(a), M.J)),
                a = a.parentNode
        },
        ba: function(a) {
            M.r && (a = new ub(a), a = a.g, Math.pow(Math.pow(a.screenX * Da - M.S[0], 2) + Math.pow(a.screenY * Da - M.S[1], 2), 0.5) > xa && M.C())
        },
        aa: function() {
            if (M.r) {
                var a = p.createEvent("MouseEvents"),
                    b = M.M;
                M.C();
                tb && (a.initEvent("click", f, f), a.R = f, b.dispatchEvent(a))
            }
        },
        C: function() {
            M.r = n;
            M.M = l;
            setTimeout(M.L, 50)
        },
        L: function() {
            var a = M.G,
                b = M.J;
            if (a) {
                for (var c = 0,
                         d = a.length; c < d; c++) L(a[c], b);
                M.G = l
            }
        }
    };
    M.A();
    function Gb() {}
    function Hb(a, b) {
        return this.s(a, b)
    }
    Hb.prototype = {
        m: n,
        s: function(a, b) {
            var c = {};
            "string" == typeof a ? c.url = a: "object" == typeof a && (b = a);
            b = b || {};
            c.i = b.i || Gb;
            c.X = b.X || Gb;
            c.j = b.j || b.fa || Gb;
            c.N = b.N || b.error || Gb;
            c.f = b.f || b.complete || Gb;
            c.W = !!b.W;
            c.dataType = (b.dataType || "json").toLowerCase();
            c.data = b.data || {};
            c.timeout = b.timeout || 0;
            c.type = (b.type || "GET").toUpperCase();
            this.options = c;
            return this
        },
        get: function(a) {
            this.options.type = "GET";
            a && (this.options.url = a);
            return this.send()
        },
        F: function(a) {
            this.options.type = "POST";
            a && (this.options.url = a);
            return this.send()
        },
        abort: function() {
            this.m && (this.I && this.I.abort(), this.m = n);
            return this
        },
        send: function() {
            var a = this.I || (q.XMLHttpRequest ? new XMLHttpRequest: n);
            if (a) {
                this.abort();
                this.I = a;
                this.l = n;
                var b = this,
                    c = this.options,
                    d = function() {
                        if (b && !(f === b.l || f == b.H)) {
                            var d = a.responseText;
                            b.responseText = d;
                            a.onreadystatechange = Gb;
                            b.m = n;
                            d ? "json" == c.dataType ? d && (responseData = Ib(d)) ? (b.ea = responseData, Jb(b, responseData, a.status)) : Kb(b, "parsererror") : Jb(b, d, a.status) : Kb(b, "parsererror");
                            b.l = f;
                            b = l
                        }
                    };
                a.onerror = function() {
                    b.m = n;
                    Kb(b, "offline")
                };
                a.onload = d;
                a.onreadystatechange = function() {
                    Lb(b);
                    4 === this.readyState && 0 !== this.status && d()
                }
            } else return Kb(this, "error"),
                this;
            if (n !== c.i(this, c)) {
                var e = c.data,
                    e = "string" == typeof e ? e: Xa(u(), e),
                    g = c.url;
                if ("GET" == c.type) {
                    var h = "";
                    0 < e.length && (h = -1 < g.indexOf("?") ? "&": "?");
                    a.open("get", g + h + e, f)
                } else a.open("post", g, f),
                    a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                a.setRequestHeader("Accept", "*/*");
                this.H = n;
                a.send(e);
                this.m = f
            }
            return this
        }
    };
    function Kb(a, b) {
        a.options.N.apply(a, [a, b]);
        a.options.f.apply(a, [a, b])
    }
    function Jb(a, b, c) {
        a.options.j.apply(a, [b, c, a]);
        a.options.f.apply(a, [a, "success"])
    }
    function Lb(a) {
        var b = a.options;
        b.timeout && (a.p && (clearTimeout(a.p), a.p = l), a.p = setTimeout(function() {
            f === a.H || f === a.l || (a.abort(), a.H = f, Kb(a, "timeout"))
        }.bind({
                p: a.p
            }), 1E3 * b.timeout))
    }
    function Ib(a) {
        if ("" !== a) try {
            return JSON.parse(a)
        } catch(b) {
            try {
                return eval("(" + a + ")")
            } catch(c) {
                console.log("JSON.parse(eval) failed!")
            }
        }
        return l
    }
    La.prototype.s = function(a, b) {
        return (new Hb(a, b)).send()
    };
    La.prototype.get = function(a, b) {
        return (new Hb(a, b)).get()
    };
    La.prototype.F = function(a, b) {
        return (new Hb(a, b)).F()
    };
    var Mb = {
            api_key: "695fe827ffeb7d74260a813025970bd5",
            plat: "17",
            sver: "1.0",
            partner: "1"
        },
        Nb = {
            android: {
                version: "4.0.2",
                tip: "\u624b\u52bf\u64cd\u4f5c\uff0c\u66f4\u4f73\u89c2\u5f71\u4f53\u9a8c"
            },
            ios: {
                version: "4.0.2",
                tip: "\u624b\u52bf\u64cd\u4f5c\uff0c\u66f4\u4f73\u89c2\u5f71\u4f53\u9a8c"
            }
        },
        O = n;
    location.href.match(/player=1/i) && (O = f);
    var Ob = n;
    if (r.match(/ UC(Browser)?/i) || r.match(/compatible;Android/i)) r.match(/ LT15i /i) || (Ob = f);
    var Pb = r.match(/MQQBrowser/i),
        Qb; (Qb = z("src") || z("SRC")) && Za("MTV_SRC", Qb, 86400, ".m.tv.sohu.com");
    Qb = B("MTV_SRC");
    var Rb = "";
    "m.s.sohu.com" == location.host && (Rb = "http://m.tv.sohu.com");
    function Sb() {}
    var Tb = va ? "1200230001": "1211010100",
        Ub = ca.pathname,
        Vb = !!Ub.match(/\/so(\.html)?$/),
        Wb = !!Ub.match(/\/history(\.html)?$/),
        Yb = f;
    "m.tv.sohu.com" === ca.host && (Yb = n);
    function Zb(a) {
        if (a) {
            a = a.split("|");
            for (var b = 0,
                     c = a.length; b < c; b++)(new Image).src = a[b]
        }
    }
    function $b() {
        var a = 0;
        if (ja) {
            var b = r.match(/os ([0-9_]+)/i);
            b && b[1] && (a = ac(b[1]))
        } else a = t ? (r.match(/android(.*?);/i) || [])[1] || 0 : "4.0.1";
        return a
    }
    function ac(a) {
        a = a.replace(/_/g, ".").replace(/^([0-9]+\.[0-9]+)[0-9\.]*/, "$1");
        return parseFloat(a || 0)
    }
    function kc(a) {
        a = parseInt(a);
        isNaN(a) && (a = 0);
        var b = Math.floor(a / 60);
        a %= 60;
        10 > a && (a = "0" + a);
        if (60 > b) return 10 > b && (b = "0" + b),
            b + ":" + a;
        var c = Math.floor(b / 60),
            b = b % 60;
        10 > b && (b = "0" + b);
        10 > c && (c = "0" + c);
        return c + ":" + b + ":" + a
    }
    function lc(a) {
        a = parseInt(a);
        isNaN(a) && (a = 0);
        var b = Math.floor(a / 60);
        a = a % 60 + "\u79d2";
        if (60 > b) return (0 < b ? b + "\u5206": "") + a;
        var c = Math.floor(b / 60);
        return (0 < c ? c + "\u5c0f\u65f6": "") + b % 60 + "\u5206" + a
    }
    function mc(a) {
        a = parseInt(a);
        1E8 < a ? a = Math.floor(a / 1E8) + "\u4ebf": 1E4 < a && (a = Math.floor(a / 1E4) + "\u4e07");
        return a
    }
    function nc(a) {
        var b;
        if (b = a.match(/([0-9]{4}\-[0-9]+\-[0-9]+)/)) a = b[1];
        return a
    }
    function oc(a) {
        a = u(a);
        J(a, "_load_inited") || K(a, "_load_inited").append(u('<i class="ui_loading"><u></u><u></u><u></u></i>'))
    }
    function Q(a, b, c) {
        var d = p.getElementsByTagName("head")[0] || p.body,
            e = p.createElement("script"),
            g = n;
        e.src = a;
        e.onload = e.onreadystatechange = function() {
            if (!g && (!this.readyState || "loading" !== this.readyState)) g = f,
                b && b.apply(l, c || []),
                e.onload = e.onreadystatechange = l,
                d.removeChild(e)
        };
        d.appendChild(e)
    }
    function pc() {
        return q.pageYOffset || p.body && p.body.scrollTop || 0
    }
    function qc(a) {
        var b = "http://m.tv.sohu.com/app";
        if (ia) if (1 == z("isappinstalled")) {
            if (b = "sohuvideo://", a = q.VideoData) b += "action.cmd?action=1.1&vid=" + a.vid + "&cid=" + a.cid + "&sid=" + a.sid + "&cateCode=" + a.cateCode
        } else b = "https://itunes.apple.com/cn/app/sou-hu-shi-pin-gao-qing/id458587755?mt=8";
        else ha ? b = "https://itunes.apple.com/cn/app/sou-hu-shi-pin-hd/id414430589?mt=8": t ? (b = a || "http://upgrade.m.tv.sohu.com/channels/hdv/all/SohuTV_4.0.2_680_201403101517.apk", O && p.referrer.match(/m\.sohu\.com/i) && (b = "http://upgrade.m.tv.sohu.com/channels/hdv/862/4.0.2/SohuTV_4.0.2_862_201403121205.apk")) : ka && (b = "http://www.windowsphone.com/zh-CN/apps/403faf93-d22c-4331-ac32-9560ee9fac94");
        return b
    }
    function rc() {
        var a = u(this);
        G(a, "channel");
        R(a);
        setTimeout(function() {
                location.href = G(a, "href") || qc()
            },
            50);
        return n
    }
    function sc() {
        u(this);
        var a = "";
        switch (String(Qb)) {
            case "433":
                a = "http://upgrade.m.tv.sohu.com/channels/hdv/all/SohuTV_4.0.2_433_201403101517.apk";
                break;
            case "435":
            case "1001|1100":
                a = "http://upgrade.m.tv.sohu.com/channels/hdv/all/SohuTV_4.0.2_435_201403101517.apk";
                break;
            case "1028|1100":
                a = "http://upgrade.m.tv.sohu.com/channels/hdv/all/SohuTV_4.0.2_436_201403101517.apk";
                break;
            default:
                a = "http://upgrade.m.tv.sohu.com/channels/hdv/all/SohuTV_4.0.2_983_201403101517.apk"
        }
        tc.da("1000120001", n);
        setTimeout(function() {
                location.href = qc(a)
            },
            50);
        return n
    }
    function uc() {
        var a = navigator.connection,
            b, c = "";
        a && (b = a.type, b == a.CELL_2G ? c = "2g": b == a.CELL_3G ? c = "3g": b == a.WIFI && (c = "wifi"));
        return c
    }
    var vc = n;
    function wc() {
        var a = n;
        if (t) if (!Ob && !Pb && r.match(/(M9|M032) Build/i)) a = f;
        else if (r.match(/Mac OS X/i) && !Ob) {
            var b = q.screen.width,
                c = q.screen.height;
            if (640 == b || 960 == b || 320 == b && 410 == c || 410 == b && 320 == c) a = f
        }
        vc = a;
        wc = function() {
            return vc
        };
        return a
    }
    function xc() {
        return q.scrollTo(0, pc() + 1)
    }
    function yc(a) {
        a = a || "";
        if ( - 1 < a.indexOf(".mp4") && (z("src") || B("src"))) a = a.replace("plat=17", "plat=3");
        return a
    }
    function zc() {
        var a = 1;
        ha && (a = 2);
        ia && (a = 3);
        t && (a = 5, /tv/i.test(r) && (a = 6));
        ga && (a = 4);
        ma && (a = 7);
        ka && (a = 8);
        ra && (a = 9);
        return a
    }
    function Ac(a, b) {
        var c = u("a[href],form", a),
            d = c.length,
            e,
            g;
        for (b = b || Wa; d--;) if (e = c.get(d), g = e.href, !g || !g.match(/^(sms|tel|mail)/i)) a: {
            g = b;
            e = u(e);
            var h = e.get(0),
                k = h.search,
                m = k || "",
                w = aa,
                x = aa;
            if (!k) {
                var A = aa,
                    C = h.nodeName;
                if ("FORM" == C) if ("post" == h.method.toLowerCase()) A = G(e, "action") || location + "";
                else {
                    for (w in g) x = g[w],
                        (h = u('input[name="' + w + '"]', e)) ? qb(h, x) : e.append(u('<input type="hidden" name="' + w + '" value="' + x + '" />'));
                    break a
                } else A = G(e, "href") || location + "";
                var s = A.indexOf("?"),
                    H = A.indexOf("#"); - 1 == H && (H = A.length);
                0 > s || s > H ? (m = "", s = H) : m = A.slice(s + 1, H)
            }
            var m = Ua(m),
                N = [];
            for (w in g) m[w] = g[w];
            for (w in m) x = m[w],
                N.push(w + (x ? "=" + encodeURIComponent(x) : ""));
            1 > N.length || (g = "?" + N.join("&"), k ? h.search = g: G(e, "FORM" == C ? "action": "href", A.slice(0, s) + g + A.slice(H)))
        }
    }
    u().d(function() {
        var a = "clientType clientVer actionVer plat startClient useVideoLink r player f".split(" "),
            b,
            c = Ua(location.search.substring(1)),
            d = {},
            e = 0;
        O && a.push("channeled");
        for (var g = a.length; g--;) b = a[g],
            c.hasOwnProperty(b) && (d[b] = c[b], e++);
        Wa = d;
        0 < e && (Ac(p, d), Qa("DOM.html", Ac))
    });
    var Bc = function() {
            function a() {
                var a;
                a = ["ppinf", "ppinfo", "passport"];
                var e, g, h;
                e = 0;
                for (g = a.length; e < g; e++) if ((h = RegExp("\\b" + a[e] + "\\b=(.*?)(?:$|;)").exec(p.cookie)) && h.length) {
                    h = h[1];
                    break
                }
                a = h;
                e = b;
                if (c != a) {
                    e = c = a;
                    a = "";
                    try {
                        if (e = unescape(e).split("|"), "1" == e[0] || "2" == e[0]) {
                            var k = e[3];
                            e = [];
                            var m, w;
                            g = "";
                            m = 0;
                            for (w = k.length; m < w; m += 4) {
                                var x;
                                a: {
                                    var A = k.substr(m, 4);
                                    h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split("");
                                    for (var C = 0,
                                             s = A.length,
                                             H = ""; C < s; C++) {
                                        for (var N = 0; 64 > N; N++) if (A.charAt(C) == h[N]) {
                                            var $a = N.toString(2),
                                                H = H + ("000000" + $a).substr($a.length);
                                            break
                                        }
                                        if (64 == N) {
                                            x = 2 == C ? H.substr(0, 8) : H.substr(0, 16);
                                            break a
                                        }
                                    }
                                    x = H
                                }
                                g += x
                            }
                            m = 0;
                            for (w = g.length; m < w; m += 8) {
                                k = 0;
                                x = 128;
                                for (A = 0; 8 > A; A++, x /= 2)"1" == g.substr(m, 8).charAt(A) && (k += x);
                                e += String.fromCharCode(k)
                            }
                            m = e;
                            var ea, P, Y, Ga, E, fa, Z, V, ya;
                            ea = [];
                            Ga = m.length;
                            for (P = Y = 0; P < Ga;) {
                                E = m.charCodeAt(P++);
                                switch (E >> 4) {
                                    case 0:
                                    case 1:
                                    case 2:
                                    case 3:
                                    case 4:
                                    case 5:
                                    case 6:
                                    case 7:
                                        ea[Y++] = m.charAt(P - 1);
                                        break;
                                    case 12:
                                    case 13:
                                        fa = m.charCodeAt(P++);
                                        ea[Y++] = String.fromCharCode((E & 31) << 6 | fa & 63);
                                        break;
                                    case 14:
                                        fa = m.charCodeAt(P++);
                                        Z = m.charCodeAt(P++);
                                        ea[Y++] = String.fromCharCode((E & 15) << 12 | (fa & 63) << 6 | Z & 63);
                                        break;
                                    case 15:
                                        switch (E & 15) {
                                            case 0:
                                            case 1:
                                            case 2:
                                            case 3:
                                            case 4:
                                            case 5:
                                            case 6:
                                            case 7:
                                                fa = m.charCodeAt(P++);
                                                Z = m.charCodeAt(P++);
                                                V = m.charCodeAt(P++);
                                                ya = (E & 7) << 18 | (fa & 63) << 12 | (Z & 63) << 6 | (V & 63) - 65536;
                                                0 <= ya && 1048575 >= ya ? ea[Y] = String.fromCharCode(ya >>> 10 & 1023 | 55296, ya & 1023 | 56320) : ea[Y] = "?";
                                                break;
                                            case 8:
                                            case 9:
                                            case 10:
                                            case 11:
                                                P += 4;
                                                ea[Y] = "?";
                                                break;
                                            case 12:
                                            case 13:
                                                P += 5,
                                                    ea[Y] = "?"
                                        }
                                }
                                Y++
                            }
                            a = ea.join("")
                        }
                    } catch(Xb) {}
                    ea = {};
                    P = (a || "").split("|");
                    Y = 0;
                    for (Ga = P.length; Y < Ga; Y++) E = P[Y].split(":"),
                        1 < E.length && (ea[E[0]] = E[2]);
                    b = e = ea
                }
                return e
            }
            var b = {},
                c;
            return {
                k: function() {
                    return a().userid || ""
                },
                q: function() {
                    return a().uid || ""
                },
                ha: function() {
                    return a().uuid || ""
                },
                ga: function() {
                    return a().uniqname || ""
                }
            }
        } (),
        S = function() {
            var a = q.screen,
                b = Math.floor(a.width * Da) + "x" + Math.floor(a.height * Da),
                c = Bc.k(),
                d = "",
                e = "";
            ja ? (e = "ios", ha ? d = "ipad": ia && (d = "iphone")) : t ? d = e = "android": ka && (d = e = "windowsphone");
            return {
                q: function() {
                    return B("SUV") || ""
                },
                z: function() {
                    return b
                },
                k: function() {
                    return c
                },
                u: function() {
                    return e
                },
                w: function() {
                    return d
                },
                e: function(a) {
                    return (q.VideoData || {})[a] || ""
                },
                O: function() {
                    return uc()
                }
            }
        } ();
    function R(a, b, c) {
        b = b || G(a, "position") || "";
        c = c || a && G(a, "details") || "";
        a = {
            t: +new Date,
            uid: S.q(),
            position: b,
            op: "click",
            details: c,
            nid: S.e("nid"),
            url: location.href,
            refer: p.referrer,
            screen: S.z(),
            os: S.u(),
            platform: S.w(),
            passport: S.k()
        };
        Zb("http://z.m.tv.sohu.com/h5_cc.gif?" + Xa(u(), a))
    }
    var Cc = "pushState" in history,
        Dc = n,
        Ec = 1,
        Fc = [],
        Gc = {},
        Hc = l,
        Ic = l,
        Jc = l,
        Kc = l,
        Lc = l,
        Mc = l,
        Nc = "/api/search2/album.json",
        Oc = "",
        Pc = {
            101 : "1002",
            106 : "1003",
            100 : "1004",
            115 : "1005",
            122 : "1006",
            112 : "1007",
            9004 : "1008",
            107 : "1009",
            121 : "1010",
            165 : "1014",
            166 : "1014",
            167 : "1014",
            168 : "1014"
        };
    function Qc() {
        if (! (1 > Hc.length)) if (l === Mc) Mc = location.href;
        else {
            location.pathname.match(/\/[^\/]+\/(.+)/);
            var a = Ua(location.search);
            if (Dc && !a.cat) {
                var b = D(u(".row[search_name=cat] a"), 0);
                0 < b.length && (b = G(b, "search_key").split("/"), 0 < b.length && (a.cat = b[1]))
            }
            Lc = l;
            Ec = 1;
            Gc = u().extend({},
                a);
            Rc();
            Sc(f)
        }
    }
    function Tc() {
        if (Cc) {
            var a, b, c = [],
                d = location.pathname.match(/\/[^\/\?]+/)[0];
            for (a in Gc) b = Gc[a],
                "" !== b && c.push(a + "=" + Gc[a]);
            a = (location.origin || "") + d + "?" + c.join("&");
            a !== location.href && (history.pushState(l, p.title, a), Mc = a)
        }
    }
    function Uc() {
        var a = u(".filter_wrap"),
            b = Vc;
        J(a, "filter_open") ? (t || I(b, {
            webkitTransform: ""
        }), L(a, "filter_open"), K(Wc, "white_button"), Rc()) : (K(a, "filter_open"), a = b.height() + 150, t || I(b, {
            top: -a,
            webkitTransform: "translate3d(0," + a + "px,0)"
        }))
    }
    function Rc() {
        var a = u(".filter_wrap");
        L(u("a", a), "c");
        var b = u().extend({
                o: "-1"
            },
            Gc);
        y(u("div[search_name]", a),
            function(a) {
                a = G(u(a), "search_name");
                K(u('a[search_key="' + (a + "/" + (b[a] || "")) + '"]'), "c")
            })
    }
    function Xc() {
        var a = {},
            b = [];
        y(u(".c[search_key]"),
            function(c) {
                c = u(c);
                var d = G(c, "search_key").split("/");
                a[d[0]] = d[1];
                "" !== d[1] && "o" !== d[0] && b.push(F(c).replace(/<.*>/, ""))
            });
        Fc = b;
        Gc = u().extend({},
            a);
        return a
    }
    function Yc(a) {
        Lc && L(Lc, "loading");
        Lc = a
    }
    function Zc() {
        var a = u(this),
            b = J(a, "o");
        J(a, "c") || (L(u(".c", a.parent()), "c"), K(a, "c"), b || L(Wc, "white_button"));
        if (768 <= q.innerWidth || b) Yc(a),
            Ec = 1,
            Sc();
        return n
    }
    function $c() {
        J(u(this), "white_button") || (Yc(u(".filter_handle em")), Ec = 1, Sc(), Uc());
        return n
    }
    function ad() {
        Yc(Jc);
        Ec++;
        Sc();
        return n
    }
    function Sc(a) {
        var b = Xc(),
            c = {
                cateCode: G(u(p.body), "cate_code") || "",
                pageSize: 15,
                page: Ec,
                o: "-1"
            };
        if (Dc) {
            var d = b.cat || "",
                e = [];
            d && (e = d.split("_"), 0 < e.length && (d = e[0]), 3 < d.length && (d = d.slice(0, 3)));
            c.c = d;
            c.cateCode = d
        } else c.c = 2;
        b = u().extend(u().extend(c, Mb), b);
        b = Nc + "?" + Xa(u(), b);
        u().get(b, {
            i: function() {
                Lc && oc(K(Lc, "loading"))
            },
            f: function() {
                Lc && L(Lc, "loading")
            },
            j: bd
        });
        a || Tc()
    }
    function bd(a) {
        var b = (a = a.data || a) && a.videos,
            c = b && b.length || 0,
            d = [],
            e = Fc.join(" "),
            g = G(u(p.body), "cate_code");
        if (g && (g = Pc[g])) var h = "12" + g + (1 < Ec ? "0200": "0100");
        F(u(".filter_handle b"), e || "\u7b5b\u9009");
        p.title = (F(u(".channel_nav .c")) || "") + (e ? ": " + e: "") + " - \u641c\u72d0\u89c6\u9891";
        if (0 < c) {
            for (var e = 0,
                     k; e < c; e++) k = b[e],
                g = Oc + "/v" + k.vid + ".shtml",
                h && (g += "?channeled=" + h),
                d.push("<dd>", '<a href="' + g + '" class="cover">', '<b style="background-image:url(' + (7 != k.cid && k.ver_big_pic || k.video_big_pic || "") + ')"></b>', "</a>", "<p>", '<a href="' + g + '">' + k.tv_name + "</a>", "<span>" + k.tip + "</span>", "</p>", "</dd>");
            sb(L(Hc, "blank_list"), "has_more", a.count > 15 * Ec)
        } else L(K(Hc, "blank_list"), "has_more");
        d = '<dl class="' + G(Kc, "class") + '">' + d.join("") + "</dl>";
        1 == Ec ? F(Ic, d) : Ic.append('<h1 class="cate_title">\u7b2c' + Ec + "\u9875</h1>" + d)
    }
    var Vc, Wc;
    u().d(function() {
        Hc = u(".channel_page .channel_list_wrap");
        Ic = u(".item_list_wrap");
        Kc = u(".item_list", Ic);
        if (0 < u(".filter_handle").a("click", Uc).length) {
            Xc();
            var a = Fc.join(" ");
            F(u(".filter_handle b"), a || "\u7b5b\u9009");
            Vc = u(".category_list_wrap");
            Wc = u(".button", Vc).a("click", $c);
            y(u("a[search_key]"),
                function(a) {
                    a.setAttribute("href", "#" + a.getAttribute("href"))
                }).a("click", Zc)
        }
        0 < Hc.length && (Jc = u(".more", Hc).a("click", ad), Cc && wb("popstate", q, Qc), J(u(p.body), "sports_page") && (Nc = "/h5/sportscat", Oc = "http://m.s.sohu.com", Dc = f))
    });
    var cd = n,
        dd = 1,
        md = 0;
    function nd() {
        var a = Storage("hot");
        a && 108E5 > +new Date - a.time ? od(a) : (a = u().extend(Mb, {
            n: 10,
            plat: 3
        }), a = "/api/searcher/hot.json?" + Xa(u(), a), u().get(a, {
            j: od
        }))
    }
    function od(a) {
        var b = a && a.data,
            c = b && b.hotList || [],
            d = c.length,
            b = ['<div class="hot_wrap">'],
            e,
            g = u(p.body);
        if (0 < d) {
            var h = "1211040200";
            J(g, "search_page") && (h = "1211040100");
            for (var k = 0; k < d; k++) e = c[k].tv_name,
                b.push('<a href="/so?wd=' + encodeURIComponent(e) + "&channeled=" + h + '">' + e + "</a>");
            a.time = +new Date;
            Storage("hot", a);
            b.push("</div>");
            a = u("nav");
            0 < a.length ? ib(a, b.join("")) : jb(u(".body_wrap"), b.join(""));
            K(g, "show_hot")
        }
    }
    function pd(a) {
        u("a", a).a("click",
            function() {
                var a = u(this);
                if (!J(a, "more") && !J(a, "item") && (R(l, "search_click"), "_blank" !== G(a, "target"))) return setTimeout(function() {
                        location.href = G(a, "href")
                    },
                    50),
                    n
            })
    }
    function qd() {
        J(rd, "loading") || (dd++, sd());
        return n
    }
    function sd() {
        var a = u().extend({
                    key: Ya("wd") || "",
                    pageSize: 15,
                    page: dd,
                    o: "0"
                },
                Mb),
            a = "/api/search2/keyword/video.json?" + Xa(u(), a);
        u().get(a, {
            i: function() {
                oc(K(rd, "loading"))
            },
            f: function() {
                L(rd, "loading")
            },
            j: td
        })
    }
    function td(a) {
        var b = (a = a && a.data && a.data.videos) && a.length || 0,
            c = [],
            d = u(".search_page .channel_list_wrap"),
            e = u(".search_page .item_list_wrap");
        if (0 < b) for (var g = 0,
                            h, k; g < b; g++) k = a[g],
            h = "/v" + k.vid + ".shtml",
            c.push("<dd>", '<a href="' + h + '" class="cover">', '<b style="background-image:url(' + (k.hor_big_pic || k.video_big_pic || "") + ')"></b>', "</a>", "<p>", '<a href="' + h + '">' + k.tv_name + "</a>", "<span>" + k.tip + "</span>", "</p>", "</dd>");
        sb(d, "has_more", md > 15 * dd);
        c = '<dl class="item_list">' + c.join("") + "</dl>";
        1 == dd ? F(e, c) : (e.append('<h1 class="cate_title">\u7b2c' + dd + "\u9875</h1>"), a = lb(u(c), e), pd(a))
    }
    var rd;
    u().d(function() {
        var a = u(p.body),
            b = u("#top_search").a({
                blur: function() {
                    setTimeout(function() {
                            n === cd && L(a, "search_actived");
                            cd = n
                        },
                        200)
                }
            });
        qb(b) || qb(b, F(u(".search_word")));
        var c = u(".search").a({
            submit: function() {
                var a = encodeURIComponent(qb(b));
                cd = f;
                if ("" !== a.trim()) R(l, "search_submit"),
                    setTimeout(function() {
                            location.href = Rb + "/so?wd=" + a
                        },
                        50);
                else return Fb(Fb(b, "focus"), "click"),
                    n
            },
            click: function() {
                Vb || (location.href = Rb + "/so");
                return n
            }
        });
        u(".white_button", c).a("click",
            function() {
                L(a, "search_actived");
                return n
            });
        var d = u(".video_src span").a("click",
            function() {
                var a = u(this);
                if (!J(a, "c")) {
                    var b = a.parent().parent();
                    L(u(".s_l", b), "c");
                    var c = K(u(".s_l_" + G(a, "src_id"), b), "c"),
                        k = u("a", c),
                        c = G(k, "href"),
                        k = G(k, "target") || "_self";
                    G(G(u(".cover,p a", b), "href", c), "target", k);
                    L(d, "c");
                    K(a, "c")
                }
            });
        rd = u(".search_page .more").a("click", qd.bind(q));
        md = parseInt(F(u(".search_count")) || 0, 10);
        0 < rd.length ? pd(u(".body_wrap")) : lb(u('<div class="mask search_mask"></div>'), a).a("click",
            function() {
                L(a, "search_actived")
            });
        0 < c.length && !(J(a, "search_page") && 0 < u(".search_album_list,.grid_list").length) && nd()
    });
    z("ht");
    var ud, vd = n,
        U = Storage("history") || [],
        W = Storage("watch_later") || [],
        wd = 0,
        xd = 0,
        yd = [];
    function zd(a) {
        for (var b = n,
                 c = W.length,
                 d = 0; d < c; d++) {
            var e = W[d];
            if (e[0] == a.sid) {
                c = 0;
                for (d = e[1].length; c < d; c++) if (e[1][c][0] == a.vid) {
                    b = f;
                    break
                }
                break
            }
        }
        return b
    }
    function Ad() {
        var a = q.VideoData;
        if (a) {
            var b = a.sid,
                c = a.vid,
                d = [],
                d = [],
                e = {
                    date: +new Date,
                    sid: b || "",
                    vid: c || "",
                    cid: a.cid || "",
                    videoCount: a.videoCount || 0,
                    time: xd || Bd.currentTime() || 0,
                    title: a.tv_name || "",
                    cover: a.video_cover || "about:blank",
                    url: "/v" + c + ".shtml"
                },
                a = u(this),
                g = W.length;
            if (J(a, "watch_later_menu_open")) L(a, "watch_later_menu_open");
            else if (9 < g || J(a, "watch_later_icon_done")) K(a, "watch_later_menu_open");
            else {
                K(a, "watch_later_icon_done");
                for (var h = 0; h < g; h++) {
                    var k = W[h];
                    if (k[0] == b) {
                        d = W.splice(h, 1);
                        d = 0;
                        for (g = k[1].length; d < g; d++) if (k[1][d][0] == c) {
                            k[1].splice(d, 1);
                            break
                        }
                        d = k[1];
                        break
                    }
                }
                d = [[c, e]].concat(d).slice(0, 10);
                W = [[b, d, +new Date]].concat(W).slice(0, 20);
                Storage("watch_later", W);
                R(l, "link_mark");
                var b = G(u('meta[property="og:image"]'), "content"),
                    m = u(".watch_later_flier");
                1 > m.length && (m = lb(u('<div class="watch_later_flier" style="background-image:url(' + b + ')"></div>'), p.body));
                b = a.offset().top;
                a = a.offset().left;
                c = u(".icon_history").offset().left;
                I(m, {
                    left: a + "px",
                    top: b + "px",
                    opacity: 1,
                    "-webkit-transform": "translate3d(" + (c - a - 25) + "px," + (pc() - b - 15) + "px,0) scale(0.5)"
                });
                setTimeout(function() {
                        I(m, "opacity", 0)
                    },
                    400);
                setTimeout(function() {
                        I(m, {
                            "-webkit-transform": "translate3d(0,0,0)",
                            left: "-1000",
                            top: "-1000"
                        });
                        Cd()
                    },
                    500)
            }
        }
    }
    function Cd() {
        F(u(".icon_history .num"), W.length + yd.length || "")
    }
    function Dd() {
        for (var a = U,
                 b, c = [], d = 0, e = a.length; d < e; d++) {
            b = a[d];
            var g = b[1][0][1]; - 1 < "|2|7|16|".indexOf(g.cid) && 300 < g.time && (b = b[0], c.push(b))
        }
        0 < c.length ? (a = Storage("album_update")) && 36E5 > +new Date - a.time ? Ed(a) : u().F("/api/v4/album/batch/latest.json", {
            data: {
                aids: c.join(","),
                api_key: "695fe827ffeb7d74260a813025970bd5"
            },
            fa: Ed
        }) : Cd()
    }
    function Ed(a) {
        a = a || {};
        for (var b = a.data || [], c, d = 0, e = b.length, g = [], h = [], k, m = u().copy(U), w = m.length, x; d < e; d++) if (c = b[d], k = c.aid + "", 0 > h.indexOf(k)) {
            for (x = 0; x < w; x++) {
                for (var A = m[x], C = A[0], s = A[1], H = 0, N = s.length; H < N; H++) s[H][1].latest_video_count = c.latest_video_count;
                if (k == C) if (C = c.show_date) {
                    if (C = C.replace("-", ""), s = s[0][1].date || 0) N = new Date(s),
                        s = N.getFullYear(),
                        H = N.getMonth(),
                        N = N.getDate(),
                        10 > H && (H = "0" + H),
                        10 > N && (N = "0" + N),
                        parseInt(s + "" + H + "" + N, 10) < parseInt(C, 10) && (A[3] = 1, g.push(A))
                } else c.latest_video_count > parseInt(s[0][1].videoCount, 10) && (A[3] = 1, g.push(A))
            }
            h.push(k)
        }
        a.time = +new Date;
        Storage("album_update", a);
        U = m;
        yd = g;
        Cd()
    }
    function Fd(a, b) {
        var c = +new Date;
        if (! (5E3 > c - wd && 5 > Math.abs(b - xd)) && (wd = c, xd = b, !("undefined" !== typeof b && 0 == b) && a)) {
            for (var c = a.sid,
                     d = a.vid,
                     e = [], g = [], h = {
                    date: +new Date,
                    sid: c || "",
                    vid: d,
                    cid: a.cid,
                    videoCount: a.videoCount || 0,
                    time: b || 0,
                    title: a.tv_name || "",
                    cover: a.video_cover || "about:blank",
                    url: "/v" + d + ".shtml"
                },
                     k = 0, m = U.length; k < m; k++) if (e = U[k], e[0] == c) {
                U.splice(k, 1);
                k = 0;
                for (g = e[1].length; k < g; k++) if (e[1][k][0] == d) {
                    e[1].splice(k, 1);
                    break
                }
                g = e[1];
                break
            }
            e = [[d, h]].concat(g).slice(0, 40);
            U = [[c, e, +new Date]].concat(U).slice(0, 50);
            Storage("history", U);
            h = W.length;
            for (k = 0; k < h; k++) if (e = W[k], e[0] == c) {
                k = 0;
                for (g = e[1].length; k < g; k++) if (e[1][k][0] == d) {
                    e[1][k][1].time = b;
                    break
                }
                break
            }
            Storage("watch_later", W)
        }
    }
    function Gd(a) {
        a || (a = "history");
        var b = Storage(a) || [];
        "watch_later" === a && (b = b.concat(yd));
        for (var c = [], d = 0, e = b.length, g, h, k, m, w = l, x, A = new Date, C = A.getFullYear() + "-" + A.getMonth(), s; d < e; d++) {
            h = b[d][0];
            g = b[d][1];
            m = new Date(b[d][2]);
            x = m.getDate();
            k = m.getMonth();
            m = m.getFullYear();
            x == A.getDate() && C == m + "-" + k ? x = "\u4eca\u5929": (x = k + "-" + x, m !== A.getFullYear() && (x = m + "-" + x));
            "history" === a && w !== x && c.push("<time>" + x + "</time>");
            c.push('<dl class="item_list' + (1 === b[d][3] ? " updated": "") + '">');
            w = "";
            w = "watch_later" === a ? 1 === b[d][3] ? "1211050002": "1211050001": "1211050003";
            for (k = g.length; 0 < k;) {
                k = g[0][1];
                m = k.time || 0;
                s = k.vid;
                cid = k.cid;
                m = 60 < m ? "\u5df2\u64ad\u653e: " + lc(m) : "\u64ad\u653e\u4e0d\u52301\u5206\u949f";
                g = "/v" + s + ".shtml?channeled=" + w;
                c.push("<dd>", '<a sid="' + h + '" vid="' + s + '" cid="' + cid + '" channeled="' + w + '" href="' + g + '" class="cover">', '<b style="background-image:url(' + (k.cover || "about:blank") + ')"></b>', "</a>", "<p>", '<a sid="' + h + '" vid="' + s + '" cid="' + cid + '" channeled="' + w + '" href="' + g + '">' + k.title + "</a>", "<span>" + m + "</span>", "</p>", '<span class="remove"><b></b></span>', "</dd> ");
                break
            }
            c.push("</dl>");
            w = x
        }
        b = F(u("." + a + "_content"), c.join(""));
        u("a", b).a("click",
            function(a) {
                a = G(u(a.currentTarget), "sid");
                Hd(a);
                Id(a)
            });
        u(".remove", b).a("click", Jd);
        sb(u("." + a + "_wrap"), "blank_list", 1 > d)
    }
    function Hd(a) {
        for (var b = W,
                 c = [], d = q.VideoData || {},
                 e = 0, g = b.length; e < g; e++) {
            var h = b[e];
            h[0] != a && c.push(h)
        }
        d.sid == a && L(u(".watch_later_icon_done"), "watch_later_icon_done");
        W = c;
        Storage("watch_later", c);
        Cd()
    }
    function Id(a) {
        for (var b = u().copy(U), c = 0, d = b.length; c < d; c++) {
            var e = b[c],
                g = e[0],
                e = e[1];
            if (g == a) for (var g = 0,
                                 h = e.length; g < h; g++) {
                var k = e[g][1].latest_video_count;
                k && (e[g][1].videoCount = k)
            }
        }
        d = yd;
        h = d.length;
        for (c = 0; c < h; c++) if (e = d[c], g = e[0], g == a) {
            d.splice(c, 1);
            break
        }
        U = b;
        Storage("history", U)
    }
    function Jd() {
        var a = u(this).parent().parent(),
            b = a.parent(),
            c = G(u("a", a), "sid");
        I(u("dd", a), {
            "-webkit-transform": "translate3d(-" + (a.width() + 98) + "px,0,0)",
            "-webkit-transition": "-webkit-transform 200ms linear 0"
        }).a("webkitTransitionEnd",
            function() {
                a.remove();
                if (J(b, "history_content")) {
                    for (var d = 0,
                             e = U.length; d < e; d++) if (U[d][0] == c) {
                        U.splice(d, 1);
                        break
                    }
                    Storage("history", U);
                    1 > U.length && (K(b.parent(), "blank_list"), Kd(".history_wrap"))
                } else J(a, "updated") ? Id(c) : Hd(c),
                    1 > u("dl", b).length && (Kd(".watch_later_wrap"), K(b.parent(), "blank_list")),
                    Cd()
            })
    }
    function Kd(a, b) {
        var c = u(a),
            d = u(".edit", c);
        J(c, "editing") || b ? (L(c, "editing"), K(F(d, "\u7ba1\u7406"), "white_button")) : (L(F(d, "\u5b8c\u6210"), "white_button"), L(K(c, "editing"), "clear_menu_open"))
    }
    function Ld() {
        var a = u(this).parent().parent(),
            b = J(a, "clear_menu_open");
        L(u(".watch_later_wrap"), "clear_menu_open");
        L(u(".history_wrap"), "clear_menu_open");
        sb(a, "clear_menu_open", !b);
        Kd(".watch_later_wrap", f);
        Kd(".history_wrap", f)
    }
    function Md() {
        var a = u(this).parent().parent().parent();
        L(K(a, "blank_list"), "clear_menu_open");
        if (J(a, "watch_later_wrap")) {
            Pa("watch_later");
            W = [];
            L(u(".watch_later_icon_done"), "watch_later_icon_done");
            var a = u().copy(yd),
                b = a.length;
            for (i = 0; i < b; i++) Id(a[i][0]);
            Cd()
        } else J(a, "history_wrap") && (Pa("history"), U = [])
    }
    function Nd(a, b) {
        for (var c = a && a.target; ! b && p !== c && p.body !== c;) {
            if (J(u(c), "clear_menu clear edit")) return;
            c = c.parentNode
        }
        L(u(".watch_later_wrap"), "clear_menu_open");
        L(u(".history_wrap"), "clear_menu_open")
    }
    function Od(a, b) {
        for (var c = a && a.target; ! b && p !== c && p.body !== c;) {
            if (J(u(c), "watch_later_icon")) return;
            c = c.parentNode
        }
        L(u(".watch_later_icon"), "watch_later_menu_open")
    }
    function Pd() {
        var a = q.VideoData;
        if (a) for (var b = a.sid,
                        a = a.vid,
                        c = 0,
                        d = U.length; c < d; c++) {
            var e = U[c];
            if (e[0] == b) {
                b = 0;
                for (c = e[1].length; b < c && e[1][b][0] != a; b++);
                break
            }
        }
    }
    u().d(function() {
        ud = u(p.body);
        Pd();
        Qa("playerOnStart", Fd);
        Qa("playerOnUnLoad", Fd);
        Qa("playerOnTimeupate", Fd);
        var a = F(lb(u('<div class="history_wacth_later_wrap">'), u(".body_wrap")), '<div class="watch_later_wrap"><div class="title"><span class="button white_button edit">\u7ba1\u7406</span><span class="button white_button clear">\u6e05\u7a7a</span><span>\u7a0d\u540e\u89c2\u770b</span><div class="clear_menu"><span class="button">\u786e\u5b9a</span></div></div><div class="blank_tip">\u6ca1\u6709\u7a0d\u540e\u89c2\u770b</div><div class="watch_later_content"></div></div><div class="history_wrap"><div class="title"><span class="button white_button edit">\u7ba1\u7406</span><span class="button white_button clear">\u6e05\u7a7a</span><span>\u64ad\u653e\u8bb0\u5f55</span><div class="clear_menu"><span class="button">\u786e\u5b9a</span></div></div><div class="blank_tip">\u6ca1\u6709\u64ad\u653e\u8bb0\u5f55</div><div class="history_content"></div></div>');
        u(".clear", a).a("click", Ld);
        u(".clear_menu .button", a).a("click", Md);
        u(".clear_menu .button", a).a("click", Md);
        u(p).a("click", Nd).a("click", Od);
        u(".watch_later_wrap .edit", a).a("click",
            function() {
                Kd(".watch_later_wrap")
            });
        u(".history_wrap .edit", a).a("click",
            function() {
                Kd(".history_wrap")
            });
        a = u(".icon_history").a("click",
            function() {
                J(ud, "history_open") || (ca.href = "/history" + (Yb ? ".html": ""))
            });
        0 < a.length && (lb(u('<div class="mask history_mask"></div>'), ud).a("click",
            function() {
                L(ud, "history_open search_actived");
                vd = n
            }), 1 > u(".num", a).length && u("span", a).append('<b class="num"></b>'), Dd());
        q.VideoData && kb(u('<div class="watch_later_icon">\u7a0d\u540e\u89c2\u770b<div class="watch_later_notice_menu"><span class="tip_1">\u60a8\u5df2\u7ecf\u8bb0\u5f55\u8d85\u8fc710\u4e2a\u89c6\u9891\u4e86\uff0c\u8bf7\u5148\u89c2\u770b\u5427</span><span class="tip_2">\u60a8\u5df2\u7ecf\u6dfb\u52a0\u8fc7\u6b64\u89c6\u9891\u4e86</span></div></div>')).a("click", Ad);
        if (Wb && (sb(ud, "history_open"), vd = J(ud, "history_open"))) L(ud, "search_actived"),
            Gd("watch_later"),
            Gd("history"),
            R(l, "link_toptip")
    });
    var Qd = B("SUV"),
        Rd = B("IPLOC");
    if (!Qd || !Rd) {
        var Sd = 1E3 * +new Date + Math.round(1E3 * Math.random());
        Qd || Za("SUV", Sd, 5E4, ".sohu.com");
        Rd || Q("//pv.sohu.com/suv/" + Sd)
    }
    u().d(function() {
        var a = {};
        try {
            a = {
                url: location.href,
                refer: p.referrer,
                uid: S.q(),
                webtype: "",
                screen: S.z(),
                catecode: S.e("cateCode"),
                pid: S.e("plid"),
                vid: S.e("vid"),
                os: S.u(),
                platform: S.w(),
                passport: S.k(),
                t: +new Date,
                channeled: z("channeled") || ""
            }
        } catch(b) {}
        Zb("http://z.m.tv.sohu.com/pv.gif?" + Xa(u(), a))
    });
    O || (q._iwt_UA = "UA-sohu-123456", Q("http://tv.sohu.com/upload/Trace/iwt-min.js"), Q("http://js.mail.sohu.com/pv/pv_tv.1107251650.js"), Q(("https:" == p.location.protocol ? "https://sb": "http://b") + ".scorecardresearch.com/beacon.js",
        function() {
            "undefined" !== typeof q.COMSCORE && q.COMSCORE.beacon({
                c1: "2",
                c2: "7395122",
                c3: "",
                c4: "",
                c5: "",
                c6: "",
                c15: ""
            })
        }), "m.s.sohu.com" === location.host ? u().d(function() {
        Q("http://js.sohu.com/wrating20120726.js",
            function() {
                var a;
                try {
                    a = q._getAcc()
                } catch(b) {}
                a && Q("http://sohu.wrating.com/a1.js",
                    function() {
                        q.vjAcc = a;
                        q.wrUrl = "http://sohu.wrating.com/";
                        try {
                            if (f === q.vjValidateTrack()) {
                                var b = q.wrUrl + "a.gif" + q.vjGetTrackImgUrl();
                                u(p.body).append('<div style="display:none"><img src="' + b + '" id="wrTagImage" /></div>');
                                q.vjSurveyCheck()
                            }
                        } catch(d) {}
                    })
            })
    }) : Q("http://tv.sohu.com/upload/Trace/wrating.js"));
    var Td = +new Date,
        Ud = +new Date,
        Vd = n;
    function Wd() {
        var a = 44,
            b = q.VideoData,
            c = "";
        ha ? (a = 4, c = "1h5") : ia ? (a = 41, c = "3h5") : t ? (a = 42, c = "6h5") : ka ? (a = 43, c = "11h5") : qa && (a = 43);
        Xd = c;
        Yd = a;
        Zd = (0.5 < Math.random() ? "qf1": "qf2") + ".hd.sohu.com.cn";
        $d = l !== z("r") && b ? "http://sptjs1.hd.sohu.com.cn/h5/tttst.html": "http://qc.hd.sohu.com.cn/caton/video/";
        Vd = f
    }
    function ae(a) {
        n === Vd && Wd();
        if ("1h5" != Xd) {
            var b = "",
                c = "",
                d = q.VideoData,
                e = q.VideoData.video_src || "";
            ja ? b = 1 : t ? b = 2 : ka && (b = 3);
            ha ? c = "ipad": /iPod/i.test(r) ? c = "ipod": ia ? c = "iphone": ka && (c = "windowsphone");
            var g = "";
            e.match(/\.m3u8/i) ? g = "m3u8": e.match(/\.mp4/i) && (g = "mp4");
            a += ["&uid=", B("SUV") || "", "&poid=&plat=", Xd, "&sver=&os=", b, "&sysver=", $b(), "&net=", S.O(), "&playmode=&vid=", d.vid || "", "&sid=", d.sid || "", "&vtype=", g, "&pn=", c, "&duFile=", encodeURIComponent(e), "&version=", q.VideoData.videoVersion || 0, "&isp2p=0&ltype=0&time=", +new Date].join("");
            Zb($d + "?" + a)
        }
    }
    function be(a) {
        n === Vd && Wd();
        var b = q.VideoData;
        a += ["&seekto=0&pt=", Yd, "&sid=", B("SUV") || "", "&vid=", b.vid || "", "&nid=&ref=", encodeURIComponent(location.href), "&dom=&t=", Td++].join("");
        Zb("http://" + Zd + "/dov.do?method=stat" + a)
    }
    function ce(a, b) {
        var c = q.CONFIG,
            c = c && c.videoTrans,
            d = z("channeled") || "";
        va && (d = "1211110001");
        a = u().extend({
                url: location.href,
                refer: p.referrer,
                uid: S.q(),
                webtype: S.O(),
                screen: S.z(),
                catecode: S.e("cateCode"),
                pid: S.e("plid"),
                vid: S.e("vid"),
                cateid: S.e("cid"),
                ltype: S.e("ltype"),
                company: S.e("company"),
                version: "0",
                type: "9001" == S.e("cid") ? "my": "vrs",
                td: S.e("duration"),
                apikey: "695fe827ffeb7d74260a813025970bd5",
                trans: c || "",
                _smuid: B("_smuid") || "-",
                t: +new Date,
                os: S.u(),
                platform: S.w(),
                passport: S.k(),
                channeled: d,
                playid: Ud
            },
            a);
        Zb((b || "http://z.m.tv.sohu.com/vv.gif") + "?" + Xa(u(), a))
    }
    function de() {
        be("&error=0&code=2&allno=0&vvmark=1&totTime=" + q.VideoData.duration);
        Zb("http://b.scorecardresearch.com/b?c1=1&c2=7395122&c3=&c4=&c5=&c6=&c11=" + (B("SUV") || ""));
        ce({
            msg: "playCount",
            time: "0"
        });
        Ud = +new Date;
        ae("code=10&duation=0")
    }
    function ee(a) {
        a = a ? ( + new Date - a) / 1E3: 0;
        ce({
            msg: "videoStart",
            time: ( + new Date - Ud) / 1E3
        });
        ae("code=5&duation=" + a)
    }
    function fe(a, b) {
        ce({
            msg: "videoEnds",
            time: a
        });
        ae("code=7&duration=" + a + "&ct=" + b)
    }
    var Xd, Yd, Zd, $d, X;
    X = {
        B: [],
        status: 1,
        h: 0,
        ia: 0,
        l: n,
        K: l,
        D: [],
        A: function() {
            return q.getAdsCallback = X.Z
        },
        load: function(a, b) {
            var c, d, e, g, h, k, m, w, x, A;
            X.K = b;
            if (!ja && !ta) return X.loaded();
            g = "h3";
            h = "iphone";
            t && (g = "h5", h = "androidphone");
            ga && (g = "h16", h = "androidpad");
            ha && (h = "ipad"); (c = a.cateCode || a.cid || "") && c.indexOf(";" > -1) && (c = c.replace(/.*?;/, ""));
            k = $b();
            x = c;
            A = a.vid || "";
            w = a.tvid || "";
            e = a.duration || 0;
            c = a.plid || a.sid || "";
            d = a.areaId || 0;
            m = B("MUV") || "";
            return Q("http://m.aty.sohu.com/h?" + ["callback=getAdsCallback&", "plat=" + g + "&", "sysver=" + k + "&", "pn=" + h + "&", "pt=oad&cat=1&", "al=" + c + "&", "vid=" + A + "&", "tvid=" + w + "&", "c=tv&", "du=" + e + "&", "ar=" + d + "&", "ag=&st=&", "vc=" + x + "&", "json=std&", "tuv=" + m + "&", "vu=&", "pageUrl=" + location.href + "&", "_t=" + +new Date].join(""))
        },
        Z: function(a) {
            var b, c, d, e, g, h;
            if (b = a && a.data) {
                e = b.oad;
                Array.isArray(e) || (e = [e]);
                c = [];
                b = 0;
                X.B = e;
                X.status = a.status || 1;
                g = 0;
                for (h = e.length; g < h; g++) d = e[g],
                    a = d.vid,
                    d = d.duration,
                    a && c.push(a),
                    b += Number(d);
                isNaN(b) || (X.h = b);
                if ((b = q.VideoData) && 1 === X.status) return b.urls.m3u8 = b.urls.m3u8.map(function(a) {
                    return a && a + ("" + (a.indexOf("?" > -1) ? "&": "?") + "ads=" + c.join(","))
                }),
                    X.Y(),
                    X.loaded()
            } else return X.loaded()
        },
        Y: function() {
            var a, b, c, d, e, g, h, k, m, w;
            b = X.B;
            e = [];
            d = k = g = 0;
            for (c = b.length; k < c; d = ++k) {
                a = b[d];
                0 !== d && (g += Number(b[d - 1].duration || 0));
                a.pingback && e.push([g, a.pingback]);
                h = a.pingbacks || [];
                if (0 < h.length) {
                    m = 0;
                    for (w = h.length; m < w; m++) d = h[m],
                        d.v && e.push([g + d.t, d.v])
                }
                a.finishedstatistics && e.push([g + a.duration, a.finishedstatistics])
            }
            e.sort(function(a, b) {
                return a[0] - b[0]
            });
            a = -1;
            b = [];
            g = 0;
            for (k = e.length; g < k; g++) if (c = e[g], w = c[0], c = "", w !== a) {
                a = w;
                d = 0;
                for (h = e.length; d < h; d++) m = e[d],
                    m[0] === w && (c += "|" + m[1]);
                c = c.substring(1);
                b.push([w, c])
            }
            return X.D = b
        },
        loaded: function() {
            X.l = f;
            return X.K(q.VideoData)
        }
    };
    X.A();
    var tc;
    function ge() {
        function a() {
            if (!z("clientType") && 1 > u(".player_message").length) {
                var a = u('<a class="player_message" position="appdownload_inplayer"><span class="button">\u4e0b\u8f7d</span>\u5982\u679c\u89c6\u9891\u65e0\u6cd5\u6b63\u5e38\u64ad\u653e\uff0c<br />\u8bf7\u70b9\u51fb\u4e0b\u8f7d\u641c\u72d0\u89c6\u9891\u5ba2\u6237\u7aef</a>').a("click", rc);
                ib(u(b), a)
            }
        }
        var b = u("#main_player"),
            c = n,
            d = n,
            e = !t && !ja && !ka && !qa && !na && !ua && !ta,
            g = n,
            h = ha || !ia,
            k = n,
            m,
            w;
        if (w = r.match(/MQQBrowser(?:\/([0-9\._]+))?/i)) w = ac(w[1]),
            4.3 > w && (g = f);
        if (t) {
            if ((navigator.appVersion || "").match(/UC\/8\.7/i)) g = f;
            r.match(/LT26w.+ MQQBrowser/i) && (g = f)
        }
        if (! (1 > b.length)) {
            var x = function() {
                    var a, c;
                    if (sa)(a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) && (c = parseInt(a.GetVariable("$version").split(" ")[1].split(",")[0], 10));
                    else if ((a = q.navigator.plugins) && 0 < a.length) if (a = a["Shockwave Flash"]) {
                        a = a.description.split(" ");
                        for (var d = 0,
                                 e = a.length; d < e; d++) {
                            var g = parseInt(a[d], 10);
                            isNaN(g) || (c = g)
                        }
                    }
                    return c ? (Q("http://js.tv.itc.cn/base/plugin/swfobject13072501.js",
                        function() {
                            if ("9001" == m.cid) var a = new SWFObject("http://share.vrs.sohu.com/my/v.swf&showRecommend=0&autoplay=true&sogouBtn=0&shareBtn=0&topBarFull=0&topBar=0&topBarNor=0&skinNum=8&topBarFull=0&id=" + m.vid + "&api_key=695fe827ffeb7d74260a813025970bd5", "sohuplayer", "100%", "100%", "9,0,115", "#000000");
                            else a = new SWFObject("http://tv.sohu.com/upload/swf/20131104/Main.swf", "sohuplayer", "100%", "100%", "9,0,115", "#000000"),
                                a.addVariable("skinNum", "1"),
                                a.addVariable("pageurl", location.href),
                                a.addVariable("vid", m.vid),
                                a.addVariable("pid", m.pid),
                                a.addVariable("nid", ""),
                                a.addVariable("seekTo", "0"),
                                a.addVariable("jump", "0"),
                                a.addVariable("autoplay", "true"),
                                a.addVariable("showRecommend", "0"),
                                a.addVariable("sid", B("SUV") || ""),
                                a.addVariable("api_key", "695fe827ffeb7d74260a813025970bd5");
                            a.addParam("allowscriptaccess", "always");
                            a.addParam("allowfullscreen", "true");
                            a.flashVars = "";
                            a = a.getFlashHtml();
                            K(b, "flash_player");
                            F(u(".video", b), a);
                            ce({
                                channeled: "1280020001"
                            })
                        }), f) : n
                },
                A = Ua(location.search.substring(1));
            1 == A.startClient ? c = t: 1 == A.useVideoLink && (g = f);
            w = " poster ";
            var C = [];
            r.match(/ HTC Desire S /i) ? c = f: wc() && (g = f);
            r.match(/MI\-ONE/i) && (h = n, C.push("hide_fullscreen"));
            r.match(/MI\-ONE|GT\-I9100/i) && !r.match(/MI\-ONE Plus/i) && C.push("hide_init_video");
            Ob && r.match(/HS\-U950/i) && C.push("auto_height"); (O || r.match(/HTC S720/i)) && C.push("hide_fullscreen");
            Ob && (w += " controls ");
            t && (r.match(/Mac OS X/i) && !r.match(/ UC(Browser)?/i)) && (wc() ? g = f: (a(), k = f, C.push("show_slider_bar")));
            0 < C.length && K(b, C.join(" "));
            r.match(/MI\-ONE Plus/i) && (4 <= $b() ? d = f: oa = n);
            d && K(u(p.body), "cover_mask_play");
            var d = u(".video", b).append("<video" + w + "></video>"),
                d = u("video", d),
                s = d.get(0),
                H = u(".poster", b),
                N = u(".duration", b),
                $a = u(".current_time", b),
                ea = u(".trackbar", b),
                P = u(".played", b),
                Y = u(".buffered", b),
                Ga = u(".button_play", b),
                E = u(".player_controls", b);
            w = u(".fullscreen", b);
            var fa = u(".video_quality", b),
                Z = n,
                V = [],
                ya = f,
                Xb = X.B || l,
                zb = X.D,
                T = 0 < X.h,
                Ce = n,
                De = 0,
                ed = lb(u('<div class="ad_timer"></div>'), b),
                fd = function() {
                    function a(b) {
                        return b && b + ((b.match(/\?/) ? "&": "?") + e)
                    }
                    var b, c = 0,
                        d = m.urls,
                        e = ["vid=" + m.vid, "&uid=" + B("SUV") || "", "&plat=17", "&pt=" + zc(), "&prod=h5&pg=1&eye=0", "&cateCode=" + m.cateCode].join("");
                    V = [];
                    if (Z) {
                        b = yc(d.downloadUrl) || d.mp4;
                        if (b instanceof Array) for (var d = 0,
                                                         g = b.length; d < g; d++) {
                            if (b[d]) {
                                b = a(b[d]);
                                break
                            }
                        } else b = a(b);
                        b && (b = (b + "").split(",")[0]);
                        V.push(b)
                    } else {
                        b = d.m3u8;
                        d = 0;
                        for (g = b.length; d < g; d++) if (b[d]) {
                            V.push(a(b[d]));
                            break
                        }
                        2 < V.length && (ha || 768 < q.screen.width) && V.shift();
                        2 <= V.length ? "hq" === Storage("quality") ? (K(L(fa, "video_quality_fast"), "video_quality_hq"), b = V[1], c = 21) : (L(K(fa, "video_quality_fast"), "video_quality_hq"), b = V[0], c = 1) : b = V[0]
                    }
                    I(fa, "display", 2 <= V.length ? "block": "none");
                    q.VideoData.video_src = b;
                    q.VideoData.videoVersion = c;
                    return b
                },
                cg = function(a) {
                    var b = Xb.length,
                        c = 0,
                        d = 0;
                    if (1 < b) for (var e = 0; e < b; e++) if (c += Number(Xb[e].duration || 0), c > a) {
                        d = e;
                        break
                    }
                    return d
                },
                Ee = function() {
                    ya = n;
                    F(u(".message p", E), '<a href="' + q.VideoData.video_src + '">\u8bf7\u70b9\u51fb\u64ad\u653e\u89c6\u9891</a>');
                    G(E, "class", "player_controls disabled show_message")
                };
            ja && 4.2 <= $b() && (Z = n);
            if (t || ka || r.match(/BB10|BlackBerry/i)) Z = f;
            c && (Z = n); (C = z("f")) && (Z = "m3u8" !== C);
            ua && (Z = f);
            var gd = n,
                Ab = n,
                eb = 0,
                hd = 0,
                bc = 0,
                Ra = n,
                cc = n,
                dc = n,
                Bb = n,
                fb = n,
                pa = n,
                ec = 0,
                la = 0,
                Fe = 0,
                Cb, Ia, fc, Db, Ja = 0,
                oa = f,
                id = function(b, c) {
                    setTimeout(function() {
                            ee( + new Date)
                        },
                        250);
                    var d = "sohuvideo" + (ha ? "hd": "://"),
                        e = {
                            action: 1.17,
                            vid: m.vid,
                            sid: m.sid,
                            cid: m.cid,
                            cateCode: m.cateCode,
                            ex1: 1
                        };
                    b && (e.more = '{"sourcedata":{"channeled":' + b + "}}");
                    var d = d + "action.cmd",
                        g = d + "?" + Va(e).replace(/index\.html%2C/, "index.html");
                    if (A.clientType || 1 == A.startClient) location.href = g;
                    else {
                        1 > u("#play_in_app").length && lb(u('<iframe id="play_in_app" frameborder="0" name="play_in_app" width="0" height="0"></iframe>').a("load", c ? a: Ma), p.body);
                        var h = g = "",
                            k = "";
                        for (h in e) k = e[h],
                            aa !== k && l !== k && (g += '<input type="hidden" name="' + h + '" value="' + k + '"/>');
                        Fb(lb(u('<form action="' + d + '" target="play_in_app">' + g + "</form>"), p.body), "submit")
                    }
                },
                Ka = function(a) {
                    if (c) return id();
                    O && (s.volume = 0.08);
                    if (t) {
                        if (r.match(/HS\-U950|HUAWEI_C8812|vivo/i) && !Ob && !Pb) {
                            s.play();
                            try {
                                s.webkitEnterFullscreen && s.webkitEnterFullscreen(),
                                    s.mozRequestFullScreen && s.mozRequestFullScreen()
                            } catch(b) {}
                        }
                        va && (!fb && r.match(/MI/i)) && Ge()
                    }
                    s.play();
                    a && a.stopPropagation()
                },
                Ge = function(a) {
                    J(b, "inline_player") && (s.play(), s.webkitEnterFullscreen && s.webkitEnterFullscreen(), s.mozRequestFullScreen && s.mozRequestFullScreen(), setTimeout(function() {
                            s.play()
                        },
                        0), a && a.stopPropagation())
                },
                jd = function() {
                    fc && (clearTimeout(fc), fc = l)
                },
                C = function() {
                    clearTimeout(Cb);
                    n === s.paused ? (J(b, "player_init") && (L(b, "player_init"), O && de(), R(l, "video_play_start", JSON.stringify({
                        vid: q.VideoData.vid
                    })), ae("code=15"), Ta("playerOnStart", m)), Ta("playerOnPlay", m), (!t || h) && K(E, "loading"), h && K(H, "hidden"), T && K(b, "player_ad"), cc = Ra = fb = pa = f, Ja = +new Date) : He()
                },
                He = function() {
                    pa = Ra = n;
                    L(E, "hidden loading");
                    h || L(H, "hidden");
                    L(Ga, "button_pause");
                    K(b, "player_pause");
                    Ia && (clearTimeout(Ia), Ia = l);
                    F($a, kc(la));
                    Ta("playerOnPause", m)
                },
                kd = function(a, c) {
                    f == pa && He();
                    I(P, "width", 0);
                    cc = gd = fb = n;
                    bc = 0;
                    F($a, kc(0));
                    0 < la && la >= s.duration - 15 && !c && (fe(s.currentTime, hd), Ta("playerOnEnd", m));
                    hd = la = 0;
                    setTimeout(function() {
                            K(b, "player_init");
                            L(H, "hidden");
                            L(E, "hidden");
                            try {
                                s.currentTime = 0
                            } catch(a) {}
                        },
                        10);
                    Db && (clearInterval(Db), Db = l)
                },
                Ie = function() {
                    gd = f;
                    n === k && (h = ha || !ia && (s.webkitSupportsFullscreen || s.mozRequestFullScreen || s.requestFullScreen), sb(b, "inline_player", h));
                    O && (t && !Ob && !Pb && h && oa) && (R(l, "video_play_autostart_external"), Ka())
                },
                gc = function() {
                    jd(); (ia || h) && K(E, "loading");
                    Ra = f;
                    if (!T) {
                        clearTimeout(Cb);
                        var a = +new Date;
                        if (!Ab && (!Bb && !cc && 1E3 < a - Fe) && 3 < (a - Ja) / 1E3) {
                            var b = ++hd,
                                c = ( + new Date - Ja) / 1E3; (1 == b || 4 == b) && be("&code=5&bufno=1&allbufno=" + b);
                            ae("code=" + (1 == b ? 6 : 4) + "&ct=" + b + "&duation=" + c);
                            l !== z("r") && 1 == b && "undefined" !== typeof he && ie("auto")
                        }
                        Fe = a;
                        cc = n
                    }
                },
                eg = function() {
                    h && (L(E, "loading"), K(Ga, "button_pause"), L(b, "player_pause"), K(H, "hidden"));
                    Ra = n;
                    T ? Ce || (Ce = f) : (h && (Cb = setTimeout(function() {
                            f === pa && K(E, "hidden")
                        },
                        3E3)), Bb = Ab = n, Ta("playerOnPlaying", [s.currentTime, n]), Db || (Db = setInterval(function() {
                            ce({
                                    tc: s.currentTime
                                },
                                "http://z.m.tv.sohu.com/playtime.gif")
                        },
                        12E4), ee(Ja), Ja = +new Date))
                },
                fg = function() {
                    var a = s.duration - X.h;
                    ec !== a && (F(N, kc(a)), ec = a)
                },
                Ke = function() {
                    var a = s.duration - X.h,
                        b = s.buffered - X.h,
                        c = 0,
                        d = 0;
                    try {
                        c = b.start(0),
                            d = b.end(0)
                    } catch(e) {}
                    0 < a && I(Y, {
                        left: 100 * (c / a) + "%",
                        width: 100 * ((d - c) / a) + "%"
                    })
                };
            d.a({
                play: C,
                pause: C,
                ended: kd,
                timeupdate: function() {
                    var a = s.currentTime,
                        c = X.h,
                        d = s.duration - c,
                        e = 2 < Math.abs(a - la);
                    T || (a -= c);
                    0 < a && e && (Ja = +new Date);
                    if (!Z && e && T) try {
                        s.currentTime = la
                    } catch(g) {} else if (0 <= la && la !== a && (Ia && (clearTimeout(Ia), Ia = l), f === Ra && eg()), Z && T && (T = n, L(b, "player_ad")), T && (0 < zb.length && a >= zb[0][0] && (Zb(zb[0][1]), zb.shift()), De = cg(a), e = Math.ceil(c - a), 0 > e && (e = 0), F(ed, 0 < d ? "\u5e7f\u544a\u5269\u4f59 <b>" + e + "</b> \u79d2": ""), 0 === e && (setTimeout(function() {
                            T = n
                        },
                        500), F(ed, ""), L(b, "player_ad"), K(E, "hidden"))), !ja || !(0 == a && pa)) ! Ra && (!gb && 0 < d) && (fg(), F($a, kc(a)), I(P, "width", 100 * (a / (T ? c: d)) + "%"), F(N, kc(d)), Ta("playerOnTimeupate", [m, a]), 0 < a && (la = a)),
                        Ke(),
                        jd(),
                        t && (!r.match(/( UC(Browser)?|QQBrowser)/i) && !dc) && (fc = setTimeout(function() {
                            pa && (h ? gc() : s.pause())
                        },
                        1200)),
                        dc = n
                },
                progress: Ke,
                loadedmetadata: Ie,
                error: function() {
                    if (T) kd();
                    else {
                        var a = this.error;
                        if (a && 4 == a.code) if (K(b, "player_init"), L(H, "hidden"), L(E, "loading"), Z) if (0 === bc) {
                            bc++;
                            s.src = fd();
                            s.play();
                            try {
                                s.currentTime = la
                            } catch(c) {}
                        } else Ee(),
                            a = Ja,
                            be("&error=500&code=2&allno=1&vvmark=0"),
                            ae("code=8&duation=" + ( + new Date - a) / 1E3 + "&error=" + (!q.VideoData.video_src ? "401": "1000"));
                        else Z = f,
                                s.src = fd(),
                                pa && s.play()
                    }
                },
                abort: function() { ! T && n === Ab && be("&code=8&error=800&allno=1&drag=-1")
                },
                stalled: function() {
                    if (f === Ab && (s.play(), 36 <= eb || !ha)) try {
                        s.currentTime = eb
                    } catch(a) {}
                },
                waiting: gc,
                seeking: function(a) {
                    if (T) return a = a || q.event,
                        a.preventDefault(),
                        n;
                    dc = f
                },
                playing: function() {
                    Ia || (Ia = setTimeout(gc, 1E3));
                    L(E, "loading");
                    dc = f;
                    n === gd && Ie();
                    f === Bb && (Ja = +new Date)
                }
            });
            E.a({
                click: function(a) {
                    if (J(u(this), "disabled") && je) return n;
                    if (c) return id();
                    if (n === ya) return ee( + new Date),
                        setTimeout(function() {
                                window.top.location.href = q.VideoData.video_src
                            },
                            50),
                        n;
                    if (T) {
                        var b = Xb[De] || l;
                        pa && b ? Zb(b.clickstatistics || "") : Ka(a)
                    } else h ? (J(E, "hidden") ? L(E, "hidden") : f === pa && K(E, "hidden"), clearTimeout(Cb), Cb = setTimeout(function() {
                            f === pa && K(E, "hidden")
                        },
                        3500), n === pa && Ka(a)) : Ka(a),
                        fb || ae("code=31")
                }
            });
            Ga.a("click",
                function() {
                    fb || ae("code=31");
                    J(E, "hidden") || n === ya || (f === s.paused && !Ra || !h ? Ka(aa) : T || s.pause())
                });
            fa.a("click",
                function(a) {
                    2 > V.length || (eb = s.currentTime, 3 < eb && (eb -= 3), Ab = f, la = -1, J(fa, "video_quality_fast") ? (K(L(fa, "video_quality_fast"), "video_quality_hq"), s.src = V[1], Storage("quality", "hq")) : (L(K(fa, "video_quality_fast"), "video_quality_hq"), s.src = V[0], Storage("quality", "fast")), gc(), a && a.stopPropagation())
                });
            w.a("click", Ge);
            var Le = u(".drag_timer", b),
                hc = n,
                gb = n,
                ic,
                jc = 0,
                ld = [0, 0],
                Me = 0,
                Ne = function() {
                    gb = hc = n;
                    L(E, "dragging")
                };
            u(".dragbar", b).a(za,
                function(a) {
                    if (h && fb && !T) {
                        jd();
                        gb = f;
                        var b = a.g;
                        ld = [b.clientX, b.clientY];
                        hc = f;
                        a && a.stopPropagation();
                        Me = P.width();
                        ic = ea.width();
                        F(Le, kc(jc));
                        K(E, "dragging")
                    }
                });
            u(p).a(Aa,
                function(a) {
                    if (n !== hc) {
                        var b = a.g,
                            c = b.clientX - ld[0],
                            b = b.clientY - ld[1]; ! gb && Math.abs(b) > Math.abs(c) ? hc = n: (a.preventDefault(), gb = f, a = Me + c, 0 > a && (a = 0), a > ic && (a = ic), jc = ec * (a / ic), F(Le, kc(jc)), I(P, "width", a + "px"))
                    }
                }).a(Ba,
                function() {
                    if (n !== gb) {
                        Bb = f;
                        try {
                            s.currentTime = jc + X.h
                        } catch(a) {}
                        Ne()
                    }
                }).a("touchcancel", Ne);
            var Oe = function() {
                kd(0, f);
                Ta("playerOnUnLoad", [m, s.currentTime])
            };
            wb("unload", q, Oe);
            if (r.match(/(HS\-U950|GT\-S756|GT\-I9100|Lenovo K860|SHV-E160L|OPPOX907|MI-ONE Plus|HTC S720|ZTE U970|HUAWEI_C8812|vivo)/i) && !Ob || g) oa = n;
            r.match(/MI/i) && va && (oa = n);
            if (O) {
                if ("wifi" !== uc()) oa = n;
                else if (parseInt(z("player_index") || 0)) oa = n;
                Pb && (oa = n)
            }
            je && (oa = n, K(E, "disabled"));
            "1058|0001" == Qb && (oa = n);
            this.play = function() {
                Ka()
            };
            this.pause = function() {
                s.pause()
            };
            this.duration = function() {
                return ec
            };
            this.currentTime = function(a) {
                if (isNaN(a)) return la;
                Bb = f;
                try {
                    s.currentTime = a
                } catch(b) {}
            };
            this.da = id;
            this.$ = function(a) {
                if (! (m && m.vid == a.vid) && (bc = 0, m && Oe(), m = a, T = f, zb = X.D, F(ed, ""), !(e && f === x()))) {
                    a = fd();
                    c || (s && !g ? (s.src = a, setTimeout(function() {
                            try {
                                s.currentTime = 0
                            } catch(a) {}
                        },
                        0)) : Ee());
                    if (O) {
                        if (s.load(), f === oa && t && (Ob || Pb)) if (a = r.match(/Android(?:[\/\s*]([0-9\._]+))?/i)) a = ac(a[1]),
                            2 < a && (R(l, "video_play_autostart_external"), setTimeout(Ka, 1E3))
                    } else de(),
                        oa && (ae("code=30"), setTimeout(Ka, 10));
                    Ta("playerOnLoad", m)
                }
            };
            return this
        }
    }
    var Bd = {
        V: {
            ready: "playerOnLoad",
            play: "playerOnPlay",
            pause: "playerOnPause",
            playing: "playerOnPlaying",
            end: "playerOnEnd"
        },
        play: function() {
            tc && tc.play()
        },
        pause: function() {
            tc && tc.pause()
        },
        duration: function() {
            if (tc) return tc.duration()
        },
        currentTime: function(a) {
            if (tc) return tc.currentTime(a)
        },
        on: function(a, b) {
            var c = Bd.V[a];
            c && Qa(c, b)
        }
    };
    q.SohuMobilePlayer = Bd;
    O && u().d(function() {
        var a = u("#main_player");
        if (0 < a.length) {
            var b = qc();
            "0" !== z("toolbar") ? 1 > u(".news_toolbar").length && ib(a, '<div class="share_tools news_toolbar"><a class="app_download_link" position="appdownload_external"><b></b>\u4e0b\u8f7d</a><a class="news_more"><b></b>\u66f4\u591a</a></div>') : K(a, "no_toolbar");
            G(u(".news_toolbar .app_download_link"), "href", b).a("click",
                function() {
                    R(u(this));
                    setTimeout(function() {
                            top.location.href = qc()
                        },
                        50);
                    return n
                });
            var c = u(".player_column");
            u(".news_more").a("click",
                function() {
                    J(sb(c, "player_recommand"), "player_recommand") && Fb(u("video"), "pause");
                    return n
                });
            lb(u('<a href="#nogo">\u66f4\u591a</a>'), u(".recommand_list .cate_title")).a("click",
                function() {
                    q.open("http://m.tv.sohu.com/");
                    return n
                })
        }
    });
    var ke = 0,
        le = l,
        me = l,
        ne = {},
        oe = 6,
        pe = {},
        qe = {},
        re = 0,
        se = n;
    function te() {
        var a = ne;
        return a && !!( - 1 < "|1000|2|16|".indexOf("|" + a.cid + "|"))
    }
    function ue() {
        var a = G(u(".vol_list_result .c"), "index");
        if (a == oe) D(u(".vol_list_wrap span"), ke).length && setTimeout(ve, 1E3);
        else {
            var b = pe[ke];
            me = b && b[a];
            se = n
        }
    }
    function we(a) {
        if (! (O && "0" === z("toolbar")) && a) {
            var b = ne,
                c = f;
            if (a.plid == b.plid) ne = b = a,
                c = n,
                se && xe.call(D(u(".vol_list_nav span"), ke)),
                ue();
            else {
                ne = a;
                pe = {};
                ke = re = 0;
                me = le = l;
                se = n;
                u(".vol_wrap").remove();
                var d = te() ? 20 : 6,
                    e = a.cid,
                    g = a.plid,
                    h = a.vid;
                oe = d;
                var k = u(".vol_wrap");
                u(".cate_title", k);
                1 > u(".vol_wrap").length && (ib(u(".appbar"), '<div class="vol_wrap"><div class="cate_title_wrap"><h2 class="cate_title" float_menu="vol_list" float_menu_label="&lt;span class=&quot;vol_label_tv&quot;&gt;\u5267\u96c6&lt;/span&gt;&lt;span class=&quot;vol_label_album&quot;&gt;\u4e13\u8f91&lt;/span&gt;"><b class="k_vol_list" key="vol_list"><span class="vol_label_tv">\u5267\u96c6</span><span class="vol_label_album">\u4e13\u8f91</span></b></h2></div><div class="vol_list_nav scroll_wrap" style="display:none"><div class="vol_list_wrap scroller"></div></div><div class="scroll_wrap"><dl class="item_list vol_list_result scroller"></dl></div></div>'), ye(I(u(".vol_wrap"), "display", "block")));
                g && Number(g) && h ? ze(g, h, d, 1) : I(D(u(".cate_title_wrap"), 0), "display", "none");
                G(u(".page_wrap_player"), "class", "page_wrap_player video_channel_" + e || "");
                setTimeout(ue, 3E3);
                b && (!O && f === c) && ((b = Storage("set_list")) && "20131229" === b.version ? Ae(b.data) : Q("http://tv.sohu.com/upload/touch/static/scripts/tv/min.set_lists.js"));
                a = u().extend({
                        cid: a.cid,
                        vid: a.vid,
                        pageSize: O ? 3 : 10,
                        pageNum: 1
                    },
                    Mb);
                a = "/api/search2/recommend.json?" + Xa(u(), a);
                u().get(a, {
                    i: function() {
                        K(u(".recommand_list"), "blank_list loading")
                    },
                    f: Be
                })
            }
        }
    }
    function ze(a, b, c, d) {
        O || (a = "http://api.tv.sohu.com/v4/album/videos/" + a + ".json?api_key=695fe827ffeb7d74260a813025970bd5&page_size=" + c + "&plat=17&sver=4.0&partner=78&callback=videoPageListCallback", a = b ? a + ("&vid=" + b + "&site=" + (d || 1)) : a + ("&page=" + ke), Q(a))
    }
    function xe(a, b) {
        if ("undefined" == typeof b) {
            var c = u(this);
            b = G(K(c, "c"), "index") || u(".vol_list_wrap span").length;
            if (ke == b) return;
            L(le, "c");
            le = c
        }
        var c = pe[b],
            d = ne,
            e = oe,
            g = d.plid;
        ke = b;
        if (c) {
            for (var g = [], h = c.length, k = 0, m = d.cid, w, x, A, C; k < h; k++) {
                A = c[k];
                C = A.vid;
                w = 2 == m || 16 == m ? k + 1 + e * (b - 1) : A.video_name.replace(/^\u300a.+?\u300b\s*/, "").replace(/^[0-9]{8}\s*/, "").trim();
                var s = "";
                C == d.vid && (s = ' class="c"');
                x = "/v" + A.vid + ".shtml?channeled=" + Tb;
                coverPic = O ? "about:blank": A.hor_high_pic || A.hor_big_pic || A.ver_high_pic;
                g.push("<dd" + s + ' data-key="vid" data-type="highlight" data-value="' + C + '" index=' + (k + 1) + ">", '<a href="' + x + '" class="cover" vid="' + C + '" channeled="' + Tb + '">', '<b style="background-image:url(' + coverPic + ')"></b>', "</a>", '<p><a href="' + x + '" vid="' + C + '" channeled="' + Tb + '"><b>\u7b2c</b>' + w + "<b>\u96c6</b></a></p>", "</dd>")
            }
            c = F(u(".vol_list_result"), g.join(""));
            t && I(I(c, {
                display: "none"
            }), {
                display: "block"
            });
            u(".c", c).length || D(u("dd", c), 0);
            Je(D(u(".vol_list_wrap span"), ke - 1))
        } else ze(g, 0, e)
    }
    function ve() {
        Q("http://api.tv.sohu.com/v4/album/videos/" + ne.plid + ".json?api_key=695fe827ffeb7d74260a813025970bd5&page_size=" + oe + "&page=" + (ke + 1) + "&plat=17&sver=4.0&partner=78&callback=loadNextPageDataCallback")
    }
    function Ae(a) {
        if (a) {
            for (var b = 0,
                     c = a.length,
                     d, e, g, h, k = ne,
                     m = n; b < c; b++) {
                d = a[b];
                g = d.length;
                for (e = 0; e < g; e++) if (h = d[e], h.sid == k.plid) {
                    e = d;
                    d = [];
                    g = 0;
                    h = e.length;
                    var m = aa,
                        w = ne,
                        x = e[0].season_name || e[0].name.replace(/\u7b2c.+?[\u5b63\u90e8]$/, ""),
                        A = 0;
                    for (Pe = x; g < h; g++) if (m = e[g].sid, m != w.plid) {
                        var C = e[g].name;
                        C.match(/\u7b2c.+?[\u5b63\u90e8]$/) && (C = C.replace(x, ""));
                        d.push('<span sid="' + m + '" index="' + g + '"' + (0 == A ? 'class="c"': "") + ">" + C + "</span>");
                        A++
                    }
                    1 > d.length || (e = F(u(".season_list"), ["<div>", '<div class="cate_title_wrap"><h2 class="cate_title" float_menu="season_list" float_menu_label="\u7cfb\u5217"><b class="k_season_list" key="season_list">' + x + "\u7cfb\u5217</b></h2></div>", '<div class="vol_list_nav scroll_wrap"><div class="season_list_nav scroller"></div></div><div class="scroll_wrap blank_list loading"><dl class="item_list season_list_vol_wrap scroller"></dl><div class="loading_tip">\u8f7d\u5165\u4e2d...</div></div></div>'].join("")), ye(e), d = F(u(".season_list_nav", e), d.join("")), u("span", d).a("click", Qe), Qe(0, 0), Re());
                    m = f;
                    break
                }
            }
            n === m && F(u(".season_list"), "");
            Storage("set_list", {
                version: "20131229",
                data: a
            });
            setTimeout(xc, 2E3)
        }
    }
    var Pe = "";
    function Qe(a, b) {
        var c;
        if ("undefined" !== typeof b) c = D(u(".season_list_nav span"), b);
        else {
            c = u(this);
            G(c, "index");
            if (J(c, "c")) return;
            L(u(".season_list_nav .c"), "c");
            K(c, "c")
        }
        Je(c, f);
        re = c = G(c, "sid");
        var d = qe[c];
        d ? Se(d, f) : Q("http://m.tv.sohu.com/videolist?playlistid=" + c + "&callback=seasonVolsListCallback")
    }
    function Se(a, b) {
        var c, d = re;
        if (c = b ? a: a && a.videos) {
            0 !== d && !b && (qe[d] = c);
            for (var d = [], e = 0, g = c.length, h, k, m, w; e < g; e++) h = c[e],
                w = h.vid,
                k = (h.subName || h.name || "").replace(/^[0-9]{8}\s*/, "").replace(a.albumName, "").replace(/\u7b2c.+?[\u5b63\u90e8]/, "").replace(Pe, ""),
                m = "/v" + w + ".shtml?channeled=1211010200",
                d.push("<dd>", '<a href="' + m + '" class="cover" vid="' + w + '" channeled="1211010200"><b style="background-image:url(' + h.largePicUrl + ')"></b></a>', '<p><a href="' + m + '" vid="' + w + '" channeled="1211010200">' + k + "</a></p>", "</dd>");
            0 < d.length && (I(G(F(u(".season_list_vol_wrap"), d.join("")), "startX", 0), {
                webkitTransform: "translate3d(0,0,0)",
                webkitTransitionDuration: "200ms"
            }), L(u(".season_list .scroll_wrap"), "blank_list loading"))
        }
    }
    function Be(a) {
        var b = (a = a.ea) && a.data && a.data.videos;
        a = "loading";
        var c = u(".recommand_list");
        if (b) {
            for (var d = 0,
                     e = b.length,
                     g = [], h, k, m, w, x; d < e; d++) h = b[d],
                x = h.vid || h.id,
                k = Rb + "/v" + x + ".shtml?channeled=1211010300",
                m = ha && 1 < wa ? h.ver_high_pic: h.ver_big_pic || h.video_big_pic,
                w = h.tv_play_count,
                g.push("<dd>", '<a href="' + k + '" class="cover" vid="' + x + '" channeled="1211010300"><b style="background-image:url(' + m + ')"></b></a>', '<p><a href="' + k + '" vid="' + x + '" channeled="1211010300">' + h.tv_name + "</a>" + (0 < w ? "<span>\u64ad\u653e: " + mc(w) + "</span>": "") + "</p>", "</dd>");
            0 < g.length && (a += " blank_list", b = F(u(".item_list", c), g.join("")), O && u("a", b).a("click",
                function() {
                    q.open(G(u(this), "href").replace("player=1", ""));
                    return n
                }))
        }
        L(c, a)
    }
    q.videoPageListCallback = function(a) {
        if (a) {
            var b = (a = a.data) && a.videos;
            if (b && 0 < b.length) {
                ke = a.page || ke;
                pe[ke] = b;
                a = a.count;
                var c = u(".vol_list_wrap"),
                    d = oe,
                    e = Math.ceil(a / d),
                    g = ne.cid,
                    h = [],
                    k = u(".vol_wrap"),
                    m = u(".cate_title", k);
                if (("1000" == g || "1" == g) && 2 > a) I(k, "display", "none"),
                    rb(m),
                    Re();
                else {
                    I(k, "display", "block");
                    G(m, "float_menu", "vol_list");
                    if (1 < e) for (g = 0; g < e; g++) endNum = (g + 1) * d,
                        endNum > a && (endNum = a),
                        h.push('<span index="' + (g + 1) + '">' + (g * d + 1) + "-" + endNum + "</span>");
                    I(u(".vol_list_nav", k), "display", 1 < e ? "block": "none");
                    F(u(".vol_list_wrap"), h.join(""));
                    u("span", c).a("click", xe)
                }
                le = D(u("span", c), ke - 1);
                K(le, "c");
                xe(0, ke)
            } else c = ne,
                a = c.plid,
                c = c.vid,
                a && ze(a, c, oe, 2);
            I(D(u(".cate_title_wrap"), 0), "display", b ? "block": "none")
        }
    };
    q.loadNextPageDataCallback = function(a) {
        a = (a = a.data) && a.videos;
        var b = ke + 1;
        a && 0 < a.length && (pe[b] = a, me = a[0], se = f)
    };
    q.seasonListCallback = Ae;
    q.seasonVolsListCallback = Se;
    Qa("playerOnEnd",
        function() {
            if (!r.match(/HS\-U950|HUAWEI_C8812/i) || Ob || r.match(/MQQBrowser/i)) {
                var a, b, c, d = Tb;
                if (me) b = me.vid,
                    a = "/v" + b + ".shtml",
                    (c = Va(Wa)) && (a = a + (0 > a.indexOf("?") ? "?": "&") + c);
                else {
                    c = u(".vol_list .c");
                    if (0 < c.length && (c = c.get(0).nextElementSibling)) a = G(u("a", c), "href"),
                        b = G(u("a", c), "vid");
                    a || (a = G(u(".recommand_list dd a"), "href"), b = G(u(".recommand_list dd a"), "vid"), d = "1211010300")
                }
                a && b && (R(l, "video_play_next" + (O ? "_external": "")), setTimeout(function() {
                        Te(b, d)
                    },
                    50))
            }
        });
    var Ue = "";
    q.getHotsRecommedCallback = function(a) {
        if (a = a && a.data) {
            var b = a.videos,
                c = [],
                d = [];
            a = ['<div class="hots_recommend_banner foucs_banner scroll_wrap">', '<div class="scroller">'];
            for (var e = ["1211010601", "1211010602", "1211010603", "1211010604", "1211010605"], g = "", h = "", k = "", m = 0; 5 > m && b[m];) g = b[m].tv_url,
                h = b[m].hor_big_pic || b[m].hor_high_pic || b[m].video_big_pic || "",
                k = b[m].video_name || "",
                g && (h && k) && (g += ( - 1 < g.indexOf("?") ? "&": "?") + "channeled=" + e[m], c.push('<a class="banner_item" href="' + g + '" style="background-image:url(' + h + ')"><span>' + k + "</span></a>"), d.push("<b" + (0 === m ? ' class="c"': "") + "></b>")),
                m++;
            b && 2 > b.length && (d = []);
            a = a.concat([c.join(""), '</div><div class="scroller_page">', d.join(""), "</div></div>"]).join("");
            b = u(".recommand_list");
            hb(u(".item_list", b), a);
            ye(b)
        }
    };
    if (q.VideoData) {
        var Ve = location.host.match(/^t\./i),
            We = Ve ? 142 : 140,
            Ue = "http://" + (Ve ? "dev.app.yule": "api.tv") + ".sohu.com/v4/mobile/video/list.json";
        Q(Ue + ["?api_key=695fe827ffeb7d74260a813025970bd5&plat=17&partner=1&sver=4.0&poid=1&cate_code=0", "&column_id=" + We, "&column_type=1&page=1&page_size=7&act=1&callback=getHotsRecommedCallback"].join(""))
    }
    var $, Xe = n,
        Ye = n,
        Ze = 1,
        $e = 0,
        af = l,
        bf = n;
    function cf() {
        if (f === bf) return f;
        var a = u("#comments_list");
        if (1 > a.length) return n;
        bf = f;
        df = a;
        ef = K(u("#comments_wrap"), "blank_list");
        ff = u(".more", ef);
        u(".more", ef).a("click", gf);
        hf = u("#post_comment_form").a("submit", jf);
        kf = u("button", hf);
        lf = u(".input_count", hf);
        mf = u("textarea", hf).a({
            focus: function() {
                Xe = n;
                L(hf, "closed");
                af = setInterval(nf, 200)
            },
            blur: function() {
                setTimeout(of, 0)
            }
        });
        "undefined" === typeof PassportSC && Q("http://tv.sohu.com/upload/jq_plugin/passport.js", pf);
        return f
    }
    function qf(a) {
        f === cf() && ($ = a, rf = f, sf(1))
    }
    function of() {
        f !== Xe && (af && (clearInterval(af), af = l), da && !t && setTimeout(function() {
                K(hf, "closed")
            },
            0))
    }
    function nf() {
        var a = G(mf, "max_length"),
            b = qb(mf).length;
        F(lf, b + "/" + a);
        b > a ? n === Ye && (K(lf, "overflow"), Ye = f) : f === Ye && (L(lf, "overflow"), Ye = n)
    }
    function pf() {
        PassportSC.cookieHandle() && ("0" == PassportSC.cookie.trust ? F(u(".text_wrap .login_tip", hf), '\u60a8\u7684\u8d26\u53f7\u672a\u6fc0\u6d3b <a href="http://my.tv.sohu.com/user/" target="_blank">\u6fc0\u6d3b\u8d26\u53f7</a>') : L(hf, "not_login"))
    }
    function jf(a) {
        if (J(lf, "overflow")) K(Fb(mf, "focus"), "error"),
            Xe = f;
        else if (L(mf, "error"), !J(kf, "loading") && !J(hf, "post_success") && !J(hf, "not_login")) if ("" === qb(mf).trim()) Fb(mf, "focus"),
            Xe = f;
        else {
            var b = u("#comment_target");
            1 > b.length && (b = u('<iframe name="comment_target" id="comment_target" frameborder="0"></iframe>'), u(p.body).append(b), G(hf, "target", "comment_target"), G(hf, "action", "http://my.tv.sohu.com/reply/save.do?redirect=blank"));
            Fb(hf, "submit");
            oc(K(kf, "loading"));
            setTimeout(tf, 500)
        }
        a.preventDefault();
        return n
    }
    function tf() {
        L(kf, "loading");
        K(hf, "post_success");
        var a = u(uf({
            authorimg: "http://tv.sohu.com/upload/space/skin/imgs/avatar_s.jpg",
            reply_from_user: "http://my.tv.sohu.com/user/",
            author: decodeURIComponent(PassportSC.cookie.uniqname || "\u641c\u72d0\u7f51\u53cb"),
            content: qb(mf).trim(),
            time: +new Date
        }));
        jb(df, a);
        qb(mf, "");
        setTimeout(function() {
                L(hf, "post_success")
            },
            3E3)
    }
    function gf() {
        rf = n;
        sf(Ze + 1)
    }
    function sf(a) {
        if (!J(ff, "loading")) {
            var b = $.cid; (a = !b || 9001 == b || 0 == b || 25 == b ? "": "http://access.tv.sohu.com/reply/list/" + b + "_" + ($.plid || $.sid) + "_" + ($.vid || 0) + "_" + 5 * (a - 1) + "_5.js?" + +new Date) && (K(ef, "loading"), K(ff, "loading"), Q(a, vf))
        }
    }
    function vf() {
        var a = q.returnComments,
            b = a.commentList || [],
            c = b.length || 0;
        L(ef, "loading");
        L(ff, "loading");
        if (c) {
            n === rf ? Ze++:(Ze = 1, $e = 0, F(df, ""));
            for (var d = [], e = 0; e < c; e++) d.push(uf(b[e]));
            b = p.createElement("div");
            b.style.display = "none";
            b.innerHTML = d.join("");
            for (var g, e = c = b.children.length; e--;) d = b.children[e],
                    (g = d.id) && 0 < u("#" + g, df).length ? (c--, b.removeChild(d)) : "DD" == d.nodeName && $e++;
            0 < c && (b.style.display = "block", df.append(b));
            c = u(".comment_count", ef);
            a = a.allCount;
            F(u("b", c), a);
            G(c, "class", "comment_count comment_count_" + a);
            sb(ef, "has_more", a > 5 * Ze);
            sb(ef, "blank_list", 1 > $e)
        }
    }
    function uf(a) {
        var b = a.reply_from_name && 0 > a.reply_from_url.indexOf("my.tv.sohu.com/user"),
            c = a.time,
            c = ( + new Date - parseInt(c)) / 1E3;
        return ['<dd id="comment-' + a.id + '">', '<em style="background-image:url(' + (a.user_small_photo || a.authorimg || "http://tv.sohu.com/upload/space/skin/imgs/avatar_s.jpg") + ')"></em>', "<div>", '<a class="u" ' + (b ? 'style="background-image:url(' + a.reply_from_icon + ')"': "about:blank") + ">" + unescape(a.author) + "</a>", '<div class="content">' + unescape(a.content) + "</div>", '<p class="f">', "<time>" + (31104E3 <= c ? Math.floor(c / 31104E3) + "\u5e74\u524d": 2592E3 <= c ? Math.floor(c / 2592E3) + "\u4e2a\u6708\u524d": 86400 <= c ? Math.floor(c / 86400) + "\u5929\u524d": 3600 <= c ? Math.floor(c / 3600) + "\u5c0f\u65f6\u524d": 60 <= c ? Math.floor(c / 60) + "\u5206\u949f\u524d": "\u521a\u521a") + "</time>", b ? ' \u6765\u81ea: <a href="' + a.reply_from_url + '" target="_blank">' + unescape(a.reply_from_name) + "</a>": "", "</p></div></dd>"].join("")
    }
    var df, ef, ff, hf, kf, lf, mf, rf, wf = 0,
        xf = [0, 0],
        yf = 0,
        zf = 0,
        Af = 0,
        Bf = n;
    function ye(a) {
        a = a || p;
        I(u(".scroll_wrap", a), {
            webkitBackfaceVisibility: "hidden",
            overflowX: "hidden",
            webkitTransform: "translate3d(0,0,0)"
        });
        I(u(".scroller", a), {
            webkitBackfaceVisibility: "hidden",
            webkitTransform: "translate3d(0,0,0)",
            webkitTransition: "-webkit-transform 0"
        }).a(za, Cf).a("webkitTransitionEnd",
            function() {
                var a = G(u(this), "page") || 1,
                    c = u(".scroller_page b", this.parentNode);
                L(c, "c");
                K(D(c, a - 1), "c")
            })
    }
    function Je(a, b) {
        var c = a.parent();
        if (0 != c.length) {
            var d = c.get(0),
                e = d.offsetLeft,
                g = d.offsetLeft,
                h = -(a.offset().left - e),
                d = d.lastElementChild,
                g = d.offsetLeft + d.offsetWidth + e + g,
                e = c.parent().width(),
                g = g - e,
                d = parseInt(G(c, "startX") || 0);
            h < d && -h + a.width() < -d + e || (h < -g && (h = -g), 0 < h && (h = 0), I(G(c, "startX", h), {
                webkitTransform: "translate3d(" + h + "px,0,0)",
                webkitTransitionDuration: b ? "200ms": 0
            }))
        }
    }
    function Cf(a) {
        var b = u(this);
        if (0 < this.childElementCount) {
            zf = 0;
            Df = Ef = this.offsetLeft;
            var c = this.lastElementChild;
            c && (zf = c.offsetLeft + c.offsetWidth + Ef + Df);
            if (! (zf <= this.parentNode.offsetWidth)) {
                Ff = b;
                Bf = f;
                I(b, "webkitTransitionDuration", "0");
                wf = parseInt(G(b, "startX") || 0, 10);
                Gf = Hf = l;
                Af = b.parent().width();
                b = this.firstElementChild;
                do
                    if (c = u(b).get(0).offsetLeft, !Hf && 0 <= c + wf && (Hf = b), c + b.offsetWidth + wf > Af) {
                        Gf = b;
                        break
                    }
                while (b = b.nextElementSibling);
                If = 0;
                a = a.g;
                xf = [a.clientX, a.clientY]
            }
        }
    }
    function Jf(a) {
        if (n !== Bf) {
            var b = a.g,
                c = b.clientX - xf[0],
                b = b.clientY - xf[1];
            0 < c && 0 <= wf ? yf = wf + c / 2 : 0 > c && -wf - c >= zf - Af ? yf = -(zf - Af) + (c - If) / 2 : (yf = wf + c, If = c); ! Kf && Math.abs(b) > Math.abs(c) ? Bf = n: (a.preventDefault(), Kf = f, Lf(yf))
        }
    }
    function Mf(a) {
        if (Kf) {
            var b = 0,
                c = G(Ff, "page") || 1;
            if (yf < wf) {
                Gf ? (b = -1 * Gf.offsetLeft, c++) : b = -1 * Hf.offsetLeft;
                var d = zf - Af;
                b < -d && (b = -d)
            } else if (yf > wf && Hf) {
                var d = Hf,
                    e = Af - d.offsetWidth - d.offsetLeft;
                do
                    if (b = -1 * d.offsetLeft, b > e) {
                        c--;
                        break
                    }
                while (d = d.previousElementSibling)
            }
            G(Ff, "page", c);
            0 < b && (b = 0);
            G(Ff, "startX", b);
            I(Ff, "webkitTransitionDuration", "200ms");
            Lf(b);
            a.preventDefault();
            Nf()
        }
    }
    function Nf() {
        Bf = Kf = n;
        Ff = l
    }
    function Lf(a) {
        I(Ff, "webkitTransform", "translate3d(" + a + "px,0,0)")
    }
    var Ef, Df, Ff, Hf, Gf, If, Kf;
    u().d(function() {
        ye();
        u(p).a(Ba, Mf).a(Aa, Jf).a("touchcancel", Nf).a("click", Nf);
        u(q).a("resize",
            function() {
                y(u(".scroller"),
                    function(a) {
                        var b = a.getAttribute("page") || 1;
                        Je(D(u(a).children(), b - 1))
                    })
            })
    });
    da || wb("mousedown", p,
        function(a) {
            a = new ub(a);
            for (var b = a.target; b;) {
                nodeName = b.nodeName;
                if ("A" == nodeName || "IMG" == nodeName) {
                    a.preventDefault();
                    break
                }
                b = b.parentNode
            }
        },
        n);
    function Of() {
        sb(u(p.body), "share_open")
    }
    function Pf(a, b) {
        for (var c = a && a.target; ! b && p !== c && p.body !== c;) {
            if (J(u(c), "share_buttons share_handle")) return;
            c = c.parentNode
        }
        L(u(p.body), "share_open")
    }
    function Qf(a) {
        var b = G(u("em", a), "class"),
            c,
            d = encodeURIComponent(location.href),
            e = encodeURIComponent(p.title),
            g = q.VideoData,
            h = u('link[rel="apple-touch-icon-precomposed"]').get(0),
            g = g && g.video_share_cover || h && h.href || "",
            h = encodeURIComponent(G(u('meta[name="description"]'), "content") || "");
        "weibo" == b ? c = "http://service.weibo.com/share/share.php?url=" + d + "&appkey=1753462873&title=" + e + "&pic=" + g + "&ralateUid=2230913455&searchPic=false": "renren" == b ? c = "http://widget.renren.com/dialog/share?resourceUrl=" + d + "&srcUrl=" + d + "&pic=" + g + "&description=" + h + "&title=" + e: "qzone" == b && (c = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + d + "&site=\u641c\u72d0\u89c6\u9891&pics=" + g + "&summary=" + h + "&title=" + e);
        a.href = c;
        a.target = "_blank"
    }
    u().d(function() {
        0 < y(u(".share_buttons a"), Qf).a("click",
            function() {
                Pf(l, f)
            }).length && (u(".share_handle").a("click", Of), u(p).a("click", Pf))
    });
    var je = n,
        Rf = n;
    u().d(function() {
        if (!z("clientType") && !va) {
            var a = q.VideoData;
            if (a) {
                var b = n,
                    c = function() {
                        var a = new Date;
                        return "" + a.getFullYear() + (1 + a.getMonth()) + a.getDate()
                    } (),
                    d = Qb || B("MTV_SRC"); - 1 < "2014311201431820143252014412014482014415".indexOf(c) && (b = f);
                if ("6494271" === a.sid && b && ("1001|1100" == d || "1028|1100" == d)) je = f,
                    K(u("body"), "dios_online");
                var e, g = "",
                    h = Sb,
                    k = Sb;
                je && (g = '<div class="fixed_pinner diors_pinner" play_in_client="1"' + (t ? 'href="http://upgrade.m.tv.sohu.com/channels/hdv/824/1.0/WebVideo_v1.0_824_201311271605.apk?t=1"': "") + ' position="tip_diaosi3_play"><b>\u4e0b\u8f7d\u641c\u72d0\u89c6\u9891\u5ba2\u6237\u7aef</b>\u300a\u5c4c\u4e1d\u7537\u58eb3\u300b\u9ad8\u6e05\u7248\u62a2\u5148\u770b<button>\u7acb\u5373\u89c2\u770b</button><em position="tip_diaosi3_close"></em></div>', R(l, "tip_diaosi3_show", ""), h = function() {
                    R(l, "tip_diaosi3_play", "");
                    sc.apply(this)
                },
                    k = function() {
                        e.remove();
                        R(l, "tip_diaosi3_close", "");
                        L(u("body"), "dios_online");
                        L(u("player_controls"), "disabled");
                        return je = n
                    });
                var m = function() {
                    var a = u(".fixed_pinner"),
                        b = u("body");
                    0 < a.length && a.remove();
                    e = lb(u(g), p.body).a("click", h);
                    u("em", e).a("click", k);
                    setTimeout(function() {
                            K(e, "show")
                        },
                        0);
                    J(b, "bookmark_show_tip bookmark_show_handle uc_bookmark_show bookmark") && !je && L(e, "show")
                };
                g && m(); (function() {
                    if (va || je) return n;
                    var a = Storage("hot_pinner") || 0;
                    if (864E5 > +new Date - parseInt(a, 10)) return n;
                    a = location.host.match(/^t\./i);
                    a = "http://" + (a ? "dev.app.yule": "api.tv") + ".sohu.com/v4/mobile/video/list.json?" + ["api_key=695fe827ffeb7d74260a813025970bd5&plat=17&partner=1&sver=4.0&poid=1&cate_code=0", "&column_id=" + (a ? 143 : 141) + "&column_type=1", "&page=1&page_size=7&act=1&callback=hotPushCallback"].join("");
                    q.hotPushCallback = function(a) {
                        if ((a = (a = a && a.data) && a.videos) && 0 < a.length) {
                            a = a[0];
                            var b = a.video_name || a.album_name,
                                c = a.tv_url || "";
                            location.href.split("?")[0] == c.split("?")[0] && Storage("hosts_push_url", c);
                            Storage("hosts_push_url") != c && (g = '<div class="fixed_pinner hots_pinner" href="' + c + '" position="marathon_floatdiv"><b>\u70ed\u70b9\u63a8\u8350</b>' + b + "<em></em></div>", h = function() {
                                L(e, "show");
                                Storage("hosts_push_url", c);
                                ca.href = G(e, "href")
                            },
                                k = function() {
                                    L(e, "show");
                                    Storage("hosts_push_url", c);
                                    return n
                                },
                                m())
                        }
                    };
                    Q(a)
                })()
            }
        }
    });
    u().d(function() {
        if (!z("clientType") && !Vb && !Wb) {
            var a = 1 == z("isappinstalled") ? "\u6253\u5f00\u5e94\u7528": t ? "": "\u7acb\u5373\u4e0b\u8f7d",
                b = n;
            je && (Rf = f, a = "\u7acb\u5373\u4e0b\u8f7d", b = f);
            var c = Storage("app_banner");
            if (2592E5 < +new Date - parseInt(c, 10) || b) c = l;
            b = qc();
            if (!c && (c = u(".body_wrap"), 0 < c.length)) {
                var d = 0;
                Rf && (d = 1);
                var e = u(['<a class="app_download app_download_2" position="appdownload_banner_2" href="' + b + '"><b>' + a + "</b><span></span><em></em></a>", '<a class="app_download app_download_2 diors" position="appdownload_banner_2" href="http://shouji.sogou.com/sapp/diorsman3/"><b>' + a + "</b><span></span><em></em></a>"][d]).a("click", rc),
                    a = u(".player_column", c);
                0 < a.length && (c = a);
                a = u("nav");
                0 < a.length && 1 > u(".player_column").length ? ib(a, e) : jb(c, e);
                elClose = u("em", e).a("click",
                    function() {
                        e.remove();
                        Storage("app_banner", +new Date);
                        return n
                    })
            }
            kb(u('<span class="app_download_link" position="appdownload_belowplayer"><b></b>\u4e0b\u8f7d</span>')).a("click", rc);
            var a = Storage("app_ver"),
                g = Nb[ja ? "ios": "android"].version;
            if (a !== g) {
                var h = u('<div class="app_notice_bar"><span class="close">\u6211\u5df2\u5b89\u88c5</span><span class="app_download_link" position="appdownload_hd_video">\u5b89\u88c5\u5ba2\u6237\u7aef\uff0c\u4f53\u9a8c\u9ad8\u6e05\u89c6\u9891</span></div>').insertBefore(u(".season_list"));
                u(".app_download_link", h).a("click", rc);
                u(".close", h).a("click",
                    function() {
                        Storage("app_ver", g);
                        h.remove();
                        elPinner && L(elPinner, "show");
                        R(l, "tip_installed")
                    })
            }
        }
    });
    var Sf = 0;
    function Tf() {
        var a = pc();
        Sf !== a && (sb(u(p.body), "nav_shadow", 0 < a), Sf = a)
    }
    u().d(function() {
        var a = "ipad";
        t || na ? a = "android": ia ? a = "iphone": ka && (a = "windows_phone");
        var b;
        if ((b = r.match(/Android[\s\/]([0-9\._]+)/i)) && !Pb) b = ac(b[1]),
            2.4 > b && (a += " fixed_nav"); - 1 < r.indexOf("PlayStation") && (a += " fixed_nav");
        z("ua");
        r.match(/MQQBrowser(?:\/([0-9\._]+))?/i) ? a += " qq_browser": Ob ? a += " uc_browser": r.match(/ MI 2 /i) ? a += " mi_2": r.match(/ (HTC|Desire) /i) && (a += " htc");
        O && (a += " all_player");
        K(u(p.body), a);
        if (!O) {
            setTimeout(Tf, 0);
            wb("scroll", q, Tf);
            setTimeout(function() {
                    1 > pc() && q.scrollTo(0, 0)
                },
                0);
            var c = u(".channel_nav .c");
            0 < c.length && (Je(c), setTimeout(function() {
                    Je(c)
                },
                100), setTimeout(function() {
                    Je(c)
                },
                500));
            u(".channel_nav a").a("click",
                function() {
                    var a = u(this),
                        b = "index_nav_" + G(a, "position");
                    R(l, b);
                    setTimeout(function() {
                            location.href = G(a, "href")
                        },
                        10);
                    return n
                });
            u(".channel_link").a("click",
                function() {
                    var a = u(this);
                    R(l, "link_channel");
                    setTimeout(function() {
                            location.href = G(a, "href")
                        },
                        50);
                    return n
                });
            t && Q("http://tv.sohu.com/upload/touch/static/scripts/tv/min.download_h5src.js",
                function() {
                    var a = q.getH5SrcDownloadLink,
                        a = a && a(Qb);
                    G(u(".app_download"), "href", a);
                    G(u(".app_download_link"), "href", a)
                })
        }
    });
    var Uf = q.VideoData;
    function Vf() {
        if (J(ud, "home") || Uf) {
            var a = 0;
            if (a = r.match(/UCBrowser[\s\/]([0-9\._]+)/i)) a = ac(a[1]);
            if (9 <= a && (a = Storage("ucmark") || 0, 2592E6 < +new Date - parseInt(a, 10))) {
                var b;
                lb(u('<div class="uc_bookmark_frame" ><iframe frameborder="0" src="http://app.uc.cn/appstore/AppCenter/frame?uc_param_str=nieidnutssvebipfcp&api_ver=2.0&id=513"></iframe></div>'), p.body);
                var c = function() {
                    K(ud, "bookmark");
                    b ? K(ud, "uc_bookmark_show") : (b = lb(u('<div class="uc_bookmark_handle"><em class="close"></em><span class="button">\u6dfb\u52a0</span>\u6dfb\u52a0<b>\u641c\u72d0\u89c6\u9891</b>\u5230\u4f60\u7684\u6d4f\u89c8\u5668\u9996\u9875\uff0c\u8bbf\u95ee\u66f4\u65b9\u4fbf</div>').a("click",
                        function() {
                            K(ud, "uc_bookmark_show")
                        }), p.body), u(".close", b).a("click",
                        function() {
                            b.remove();
                            Storage("ucmark", +new Date);
                            return n
                        }))
                };
                wb("message", q,
                    function(a) {
                        var e = a.data;
                        if (e) if (a = e.message, e = e.type, "not exist" == a || "" == a) J(u(".voice_pinner"), "show") || (c(), R(l, "tip_uc_nav_show"));
                        else if ("close" == a || "cancle" == a || "success" == a) L(ud, "bookmark_show uc_bookmark_show"),
                            "1" == e && (b.remove(), Storage("ucmark", "0"), R(l, "tip_uc_nav_add"))
                    })
            }
        }
    }
    u().d(function() {
        O || (ud = u(p.body), Ob && t && Vf())
    });
    var Wf = {},
        Xf = {},
        Yf = l,
        Zf = 0,
        $f = 0,
        ag = "";
    function Re() {
        if (!J(u(p.body), "fixed_nav")) {
            ag = "";
            Yf && L(Yf, "fixed_title");
            $f = u("nav").height() + 2;
            bg = u("*[float_menu]");
            Yf = D(bg, 0);
            var a = 0;
            y(bg,
                function(b) {
                    var c = b.getAttribute("float_menu"),
                        d = b.getAttribute("float_menu_label");
                    b = u(b);
                    var e = u(".k_" + c, Yf);
                    1 > e.length && (e = lb(u('<b class="k_' + c + '" key="' + c + '">' + d + "</b>"), Yf));
                    var d = e,
                        g = D(u("b[key]", Yf), a);
                    ib(u(g), d);
                    Xf[c] = e.a("click", dg);
                    Wf[c] = b.parent().parent();
                    if (0 < a) {
                        c = u("b[key]", b);
                        for (e = c.length; e--;) b = D(c, e),
                                0 < e ? b.remove() : L(b, "c")
                    }
                    a++
                });
            Zf = Yf.height();
            $f += Zf;
            setTimeout(gg, 0)
        }
    }
    function gg() {
        var a = Yf,
            b = a.parent().offset().top,
            c = pc(),
            d;
        b - c < $f - Zf ? K(a, "fixed_title") : L(a, "fixed_title");
        for (var e = 0,
                 g = bg.length; e < g; e++) {
            var h = G(D(bg, e), "float_menu"),
                k = Wf[h],
                b = k.offset().top,
                m = $f,
                w = q.innerHeight,
                a = b - c,
                b = b - c + k.height();
            if (0 === e && a >= m || a > m && a < w / 3 || a <= m && b >= w / 3 || e === g - 1 && b <= w) if (d = h, 0 === e) break
        }
        hg(d)
    }
    function hg(a) {
        if (a !== ag) {
            var b, c;
            for (b in Xf) c = Xf[b],
                    b === a ? K(c, "c") : L(c, "c");
            ag = a
        }
    }
    function dg(a, b) {
        b = G(u(this), "key");
        var c = Wf[b];
        c && (p.body.scrollTop = c.offset().top - $f + Zf + 2, setTimeout(function() {
                hg(b)
            },
            0))
    }
    var bg;
    u().d(function() { ! J(u(p.body), "fixed_nav") && (!wc() && 0 < u("*[float_menu]").length) && ($f = 48, Re(), wb("load", q, Re), wb("resize", q, gg), wb("scroll", q, gg), u(p).a("touchmove", gg))
    });
    $ = q.VideoData;
    var ig = {},
        jg = {
            1 : ["\u7535\u5f71", "movie"],
            1E3: ["\u7535\u5f71", "movie"],
            2 : ["\u7535\u89c6\u5267", "drama"],
            7 : ["\u7efc\u827a", "show"],
            8 : ["\u7eaa\u5f55\u7247", "documentary"],
            13 : ["\u5a31\u4e50", "yule"],
            16 : ["\u52a8\u6f2b", "comic"],
            25 : ["\u65b0\u95fb", "news"],
            24 : ["\u97f3\u4e50", "music"]
        },
        kg = l,
        lg = l,
        mg = 0;
    function ng() {
        if (l === kg) kg = location.href;
        else {
            var a = L(u(p.body), "page_home page_channel page_player"),
                b,
                c = location.pathname; (b = c.match(/\/v([0-9]+)\.shtml/i)) ? (Te(b[1], Ya("channeled")), K(a, "page_player")) : (b = c.match(/(\/[0-9]+\/n[0-9]+|\/us\/[0-9]+\/[0-9]+)\.shtml/i)) ? (b = ig[b[1]]) ? (Te(b, Ya("channeled")), K(a, "page_player")) : location.href = location.pathname: c.match(/\/(\?.*)?$/) ? K(a, "page_home") : K(a, "page_channel")
        }
    }
    function Te(a, b) {
        if (a != $.vid) {
            var c = u().extend({},
                Wa);
            b && (c.channeled = b);
            var d = Va(c),
                d = "//" + location.host + "/v" + a + ".shtml" + (d ? "?" + d: "");
            if ((!ja || !Cc) && !ta) location.href = d;
            else if (lg = a, c = u().extend({
                    callback: "loadVideoCallback"
                },
                Mb), mg = 0, c = "http://api.tv.sohu.com/v4/video/info/" + a + ".json?" + Xa(u(), c), K(u(p.body), "page_player_loading"), tc.pause(), Q(c), d !== location.href) {
                if (c = location.pathname.match(/(\/[0-9]+\/n[0-9]+|\/us\/[0-9]+\/[0-9]+)\.shtml/i)) if (c = ig[c[1]], c == a) return;
                history.pushState(l, l, d)
            }
        }
    }
    function og(a) {
        var b = K(u("#main_player"), "forbidden");
        1 > u(".player_message").length && (a = u('<span class="player_message">' + (a || "\u60a8\u6240\u5728\u7684\u56fd\u5bb6\u6216\u5730\u533a, \u4e0d\u5728\u6240\u64ad\u653e\u7684\u8282\u76ee\u7248\u6743\u8303\u56f4") + "</span>"), ib(u(b), a))
    }
    function pg(a, b) {
        var c = f;
        if (!b) {
            var d = a.fee || a.apiData && a.apiData.fee || 0;
            if ("2" == a.mobileLimit || "1" == a.h5Limit || "1" == d) {
                og("1" == d ? "\u60a8\u6240\u89c2\u770b\u7684\u5f71\u7247\u4e3a\u4ed8\u8d39\u7535\u5f71\uff0c\u6682\u65e0\u6cd5\u514d\u8d39\u89c2\u770b": "");
                c = n;
                return
            }
            if ("1" == a.ipLimit) {
                d = {
                    api_key: "695fe827ffeb7d74260a813025970bd5",
                    plat: "17",
                    sver: "1.0",
                    partner: "78",
                    from: "h5",
                    poid: "1",
                    sysver: $b() || "0"
                };
                Q("http://api.tv.sohu.com/mobile_user/device/clientconf.json?" + Xa(u(), d) + "&callback=ipLimitCallback");
                return
            }
        }
        X.load(a,
            function(a) {
                tc || (tc = new ge);
                f === c && (tc.currentTime(0), tc.$(a))
            });
        d = a.cid + "";
        if (!O) {
            var e = u(".score");
            if (0 < e.length && a) if (d.match(/^(2|1000|16|7|8)$/)) {
                var g = (G(e, "num") + "").replace(/^([0-9]+)\.([0-9]).*/, "<b>$1</b>.$2\u5206");
                I(F(e, g), "display", "block")
            } else I(e, "display", "none");
            qf(a);
            qg();
            y(u(".share_buttons a"), Qf);
            e = jg[d];
            g = "//" + location.host;
            e ? F(G(G(u(".channel_link"), "href", g + "/" + e[1]), "class", "channel_link channel_link_" + d), e[0] + "\u9891\u9053") : F(G(G(u(".channel_link"), "href", g), "class", "channel_link"), "\u66f4\u591a\u7cbe\u5f69\u89c6\u9891");
            d = zd(a);
            sb(u(".watch_later_icon"), "watch_later_icon_done", d)
        }
        setTimeout(function() {
                we(a)
            },
            50)
    }
    function qg() {
        var a = u(".video_detail .desc");
        sb(a, "has_more", 110 < u("span", a).height())
    }
    function rg(a) {
        var b = [],
            c,
            d = "|" + a.cid + "|";
        c = a.latest_video_count; - 1 < "|2|16|".indexOf(d) && b.push("<p>\u66f4\u65b0\u81f3" + c + "\u96c6</p>"); - 1 < "|8|".indexOf(d) && b.push("<p>\u66f4\u65b0\u81f3" + c + "\u671f</p>"); - 1 < "|7|".indexOf(d) && ((c = a.tvGuest) && b.push("<p>\u5609\u5bbe: " + c.replace(/;/g, " ") + "</p>"), (c = a.tvPresenter) && b.push("<p>\u4e3b\u6301\u4eba: " + c.replace(/;/g, " ") + "</p>")); - 1 < "|1|".indexOf(d) && (c = a.director) && b.push("<p>\u5bfc\u6f14: " + c.replace(/;/g, " ") + "</p>"); - 1 < "||0|13|24|".indexOf(d) && (c = a.update_time) && b.push("<p>" + nc(c) + "</p>"); - 1 < "|1|2|".indexOf(d) && (c = a.main_actor) && b.push("<p>\u4e3b\u6f14: " + c.replace(/;/g, " ") + "</p>"); - 1 < "|16|".indexOf(d) && (c = a.year) && b.push("<p>\u5e74\u4efd: " + c + "</p>"); - 1 < "|7|".indexOf(d) && (c = a.area) && b.push("<p>\u5730\u533a: " + c.replace(/;/g, " ") + "</p>"); - 1 < "|8|".indexOf(d) && (c = a.second_cate_name) && b.push("<p>\u7c7b\u578b: " + c.replace(/;/g, " ") + "</p>");
        return b.join("")
    }
    function sg(a) {
        var b = [],
            c,
            d = "|" + a.cid + "|",
            e = c = a.latest_video_count;
        if ( - 1 < "|2|16|7|8|".indexOf(d)) {
            b.push("<label>" + ("|7|" == d ? "\u671f": "\u96c6") + "\u6570:</label>");
            b.push("<p>");
            if ("|7|" == d) b.push("\u66f4\u65b0\u81f3" + c + "\u671f");
            else {
                var g = "|8|" == d ? "\u671f": "\u96c6";
                c != e ? b.push("\u7b2c" + c + g + "<span> \u00b7 \u5171" + e + g + "</span>") : b.push("\u5171" + e + g)
            }
            b.push("</p>")
        }
        if ( - 1 < "|1|2|8|16|24|33|".indexOf(d) && (c = a.year)) b.push("<label>\u5e74\u4efd:</label>"),
            b.push("<p>" + c + "</p>");
        if ( - 1 < "||0|13|25|".indexOf(d) && (c = a.show_date)) b.push("<label>\u65f6\u95f4:</label>"),
            b.push("<p>" + nc(c) + "</p>");
        if (c = a.second_cate_name) b.push("<label>\u7c7b\u578b:</label>"),
            b.push("<p>" + c.replace(/;/g, " ") + "</p>");
        if ( - 1 < "|7|8|".indexOf(d) && (c = a.area)) b.push("<label>\u5730\u533a:</label>"),
            b.push("<p>" + c.replace(/;/g, " ") + "</p>");
        if (c = a.director) b.push("<label>\u5bfc\u6f14:</label>"),
            b.push("<p>" + c.replace(/;/g, " ") + "</p>");
        if (c = a.main_actor) b.push("<label>\u4e3b\u6f14:</label>"),
            b.push("<p>" + c.replace(/;/g, " ") + "</p>");
        return b.join("")
    }
    q.loadVideoCallback = function(a) {
        a = a && a.data;
        if (!a || !a.video_name) if (1 < mg) L(u(p.body), "page_player_loading"),
            location.href = "v" + lg + ".shtml";
        else {
            var b = u().extend({
                        callback: "loadVideoCallback",
                        site: "2"
                    },
                    Mb),
                b = "http://api.tv.sohu.com/v4/video/info/" + lg + ".json?" + Xa(u(), b);
            Q(b);
            mg++
        } else L(u(p.body), "page_player_loading"),
            b = "|" + a.cid + "|",
            a.tv_desc = a.video_desc || a.video_name,
            a.tv_detail = sg(a),
            a.tv_summary = rg(a),
            a.video_cover = a.ver_high_pic || a[ - 1 < "|2|8|16|".indexOf(b) ? "ver_big_pic": "video_big_pic"],
            a.tv_name = a.video_name,
            a.tv_score = a.score,
            !a.video_cover && "|9001|" == b && (a.video_cover = a.hor_big_pic),
            b = a.video_name,
            p.title = b + (b ? " - ": "") + "\u641c\u72d0\u89c6\u9891\u624b\u673a\u7248",
            L(u('*[data-type="highlight"]'), "c"),
            y(u("*[data-key]"),
                function(b) {
                    b = u(b);
                    var d = G(b, "data-key"),
                        e = G(b, "data-type"),
                        d = a[d] || "";
                    "image" == e ? I(b, "backgroundImage", "url(" + (d || "about:blank") + ")") : "highlight" == e ? G(b, "data-value") == d && K(b, "c") : "attr" == e ? G(b, G(b, "data-value"), d) : ("time" == e && (d = kc(d)), F(b, d))
                }),
            a.mobileLimit = q.VideoData.mobileLimit,
            a.h5Limit = q.VideoData.h5Limit,
            $ = q.VideoData = {
                vid: a.vid || lg,
                cid: a.cid || "9001",
                cateCode: a.cate_code || "",
                areaId: a.area_id,
                sid: a.sid || "",
                plid: a.aid || "",
                tvid: a.tv_id || "",
                video_cover: a.video_cover,
                video_share_cover: a.video_big_pic,
                videoCount: a.total_video_count,
                tv_name: a.video_name,
                ipLimit: a.ip_limit || "0",
                mobileLimit: a.mobileLimit || "0",
                h5Limit: a.h5Limit || "0",
                urls: {
                    m3u8: [a.url_nor || "", a.url_high || "", a.url_super || ""],
                    mp4: [a.url_nor_mp4 || "", a.url_high_mp4 || ""],
                    downloadUrl: yc(a.download_url) || ""
                },
                duration: a.total_duration,
                apiData: a
            },
            $.video_cover ? pg($) : Q("http://api.tv.sohu.com/v4/album/info/" + $.plid + ".json?api_key=695fe827ffeb7d74260a813025970bd5&plat=17&sver=4.0&callback=loadVideoAlbumCallback")
    };
    q.loadVideoAlbumCallback = function(a) { (a = a && a.data) && (q.VideoData.video_cover = a.ver_big_pic || a.ver_high_pic);
        I(u('*[data-key="video_cover"]'), "backgroundImage", "url(" + (q.VideoData.video_cover || "about:blank") + ")");
        pg(q.VideoData)
    };
    q.ipLimitCallback = function(a) {
        a.data && "1" == a.data.iplimit ? og() : (L(u("#main_player"), "forbidden"), pg($, f))
    }; (function() {
        u(q).a("resize", qg);
        $ && Eb(function(a) {
            var c = u(this),
                d = G(c, "vid"),
                c = G(c, "channeled");
            if (d) return q.scrollTo(0, 0),
                L(ud, "search_actived history_open"),
                a.preventDefault(),
                Te(d, c),
                n
        });
        Cc && wb("popstate", q, ng);
        if ($) {
            q.vid = $.vid;
            q.pid = $.plid;
            $.video_cover = G(u('meta[property="og:image"]'), "content");
            $.tv_name = F(u(".player_info h3"));
            var a;
            if (a = location.pathname.match(/(\/[0-9]+\/n[0-9]+|\/us\/[0-9]+\/[0-9]+)\.shtml/i)) ig[a[1]] = $.vid;
            u().d(function() {
                var a = u(".video_detail .desc").a("click",
                    function() {
                        sb(a, "expand")
                    });
                pg($)
            })
        }
    })();
    $ = q.VideoData;
    var tg = "man",
        ug = "",
        vg = "",
        wg = [],
        xg = 0,
        yg = {},
        zg = {},
        Ag = 0;
    function ie(a) {
        tg = a;
        F(u(".rate_test div"), "");
        Bg("OpenAPI");
        ug = "http://api.tv.sohu.com/video/playinfo/" + $.vid + ".json?api_key=9854b2afa779e1a6bff1962447a09dbd&plat=6&sver=2.8&partner=999&c=1&sid=0";
        Cg(ug);
        var b = Ag++;
        a = $.urls.m3u8;
        for (var c, d = new Date,
                 e = 0,
                 g = a.length; e < g; e++) if (a[e]) {
            c = a[e];
            break
        }
        c && (vg = c, Bg("Hot VRS"), u(".rate_test div").append(Dg(b, c)), c.match(/\.m3u8/i) && (c = c.replace(/http:\/\/[^\/]+/i, "/hot_vrs")), u().s(c, {
            dataType: "html",
            f: function(a) {
                if (a = a.responseText) {
                    a = a.match(/(http:\/\/[^\s]+)/ig) || [];
                    var c = 0,
                        e = a.length,
                        g, x;
                    xg = e;
                    if (0 < e) {
                        Eg(b, d, vg);
                        Bg("m3u8 (" + e + ")", "rate_test_video");
                        c = 0;
                        for (e = a.length; c < e; c++) x = "m3u8callback_" + c,
                            g = a[c].replace(/http:\/\/[^\/]+/i, "http://61.135.183.62") + "&prot=2&callback=" + x + "&id=" + Ag++,
                            q[x] = function(a) {
                                var b = a.url,
                                    c = (this.url.match(/&id=([0-9]+)/i) || [])[1];
                                if (b) {
                                    var d = new Date,
                                        e = Cg(b, c, Fg);
                                    yg[b] = setTimeout(function() {
                                            Eg(e, d, b, c, l, f);
                                            Fg()
                                        },
                                        3E4)
                                }
                            }.bind({
                                    url: g
                                }),
                            wg.push(g);
                        Cg(wg.shift())
                    } else a = K(u(".rate_test .item_" + b), "error"),
                        F(u("time", a), "!")
                }
            }
        }))
    }
    function Fg() {
        var a = wg.shift(),
            b = u(".rate_test .item .loaded").length;
        a && Cg(a, l, l, "#rate_test_video");
        F(u("#rate_test_video"), "m3u8 (" + b + "/" + xg + ")");
        b == xg && L(u(".rate_test .button"), "disabled")
    }
    function Cg(a, b, c, d) {
        var e = (a.match(/&id=([0-9]+)/i) || [])[1];
        e || (e = Ag++);
        b ? u(".rate_test .item_" + b).append(Dg(e, a)) : d ? ib(u(d), Dg(e, a)) : u(".rate_test div").append(Dg(e, a));
        Q(a, Eg, [e, new Date, a, b, c]);
        return e
    }
    function Dg(a, b) {
        return '<p class="item item_' + a + '"><time>...</time><span>' + b + "</span></p>"
    }
    function Eg(a, b, c, d, e, g) {
        var h = yg[c];
        h && (clearTimeout(h), delete yg[c]);
        if (! (c in zg)) {
            g && (zg[c] = 1);
            a = K(u(".rate_test .item_" + a), g ? "error": "loaded");
            var k = h = "",
                m = "";
            b = ((new Date - b) / 1E3).toFixed(2);
            F(D(u("time", a), 0), g ? "!": b + " s");
            d && (h = F(u(".rate_test .item_" + d + " span")).replace(/&amp;/g, "&"));
            if (k = c.match(/cip=([0-9\.]+)/i)) k = k[1],
                m = c.match(/http:\/\/([^\/]+)/i)[1];
            c = ["http://sptjs1.hd.sohu.com.cn/h5/tttst.html?mode=", tg, "&uid=", B("SUV") || "", "&api=", encodeURIComponent(ug), "&hotvrs=", encodeURIComponent(vg), "&disp=", encodeURIComponent(h), "&url=", encodeURIComponent(c), "&clientip=", k, "&cdnip=", m, "&speed=", b, g ? "&timeout": ""].join("");
            Zb(c);
            e && e()
        }
    }
    function Bg(a, b) {
        u(".rate_test div").append('<p class="title" id="' + b + '">' + a + "</p>")
    }
    var he = {};
    u().d(function() {
        l !== z("r") && $ && (jb(u(".body_wrap"), '<div class="rate_test"><span class="button">\u901f\u5ea6\u6d4b\u8bd5</span><span class="tip">UID: ' + (B("SUV") || "-") + "</span><div></div></div>"), u(".rate_test .button").a("click",
            function() {
                var a = u(this);
                J(a, "disabled") || (K(a, "disabled"), ie("man"))
            }))
    });
})()