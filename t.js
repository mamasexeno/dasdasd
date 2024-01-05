function ds(t, e) {
  const n = /* @__PURE__ */ Object.create(null), r = t.split(",");
  for (let s = 0; s < r.length; s++)
    n[r[s]] = !0;
  return e ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
const ue = {}, Bt = [], Ue = () => {
}, vl = () => !1, xl = /^on[^a-z]/, or = (t) => xl.test(t), gs = (t) => t.startsWith("onUpdate:"), me = Object.assign, ms = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, yl = Object.prototype.hasOwnProperty, se = (t, e) => yl.call(t, e), Z = Array.isArray, $t = (t) => cr(t) === "[object Map]", qc = (t) => cr(t) === "[object Set]", ee = (t) => typeof t == "function", _e = (t) => typeof t == "string", _s = (t) => typeof t == "symbol", fe = (t) => t !== null && typeof t == "object", Mc = (t) => fe(t) && ee(t.then) && ee(t.catch), Nc = Object.prototype.toString, cr = (t) => Nc.call(t), kl = (t) => cr(t).slice(8, -1), Ic = (t) => cr(t) === "[object Object]", bs = (t) => _e(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Hn = /* @__PURE__ */ ds(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ir = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, El = /-(\w)/g, Gt = ir((t) => t.replace(El, (e, n) => n ? n.toUpperCase() : "")), wl = /\B([A-Z])/g, Mt = ir(
  (t) => t.replace(wl, "-$1").toLowerCase()
), Fc = ir(
  (t) => t.charAt(0).toUpperCase() + t.slice(1)
), Sr = ir(
  (t) => t ? `on${Fc(t)}` : ""
), bn = (t, e) => !Object.is(t, e), jn = (t, e) => {
  for (let n = 0; n < t.length; n++)
    t[n](e);
}, Gn = (t, e, n) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Xr = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
}, Cl = (t) => {
  const e = _e(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
};
let Qs;
const Qr = () => Qs || (Qs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function vs(t) {
  if (Z(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n], s = _e(r) ? Tl(r) : vs(r);
      if (s)
        for (const o in s)
          e[o] = s[o];
    }
    return e;
  } else {
    if (_e(t))
      return t;
    if (fe(t))
      return t;
  }
}
const Al = /;(?![^(]*\))/g, Sl = /:([^]+)/, Dl = /\/\*[^]*?\*\//g;
function Tl(t) {
  const e = {};
  return t.replace(Dl, "").split(Al).forEach((n) => {
    if (n) {
      const r = n.split(Sl);
      r.length > 1 && (e[r[0].trim()] = r[1].trim());
    }
  }), e;
}
function Sn(t) {
  let e = "";
  if (_e(t))
    e = t;
  else if (Z(t))
    for (let n = 0; n < t.length; n++) {
      const r = Sn(t[n]);
      r && (e += r + " ");
    }
  else if (fe(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const Rl = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ql = /* @__PURE__ */ ds(Rl);
function Lc(t) {
  return !!t || t === "";
}
const Zn = (t) => _e(t) ? t : t == null ? "" : Z(t) || fe(t) && (t.toString === Nc || !ee(t.toString)) ? JSON.stringify(t, Oc, 2) : String(t), Oc = (t, e) => e && e.__v_isRef ? Oc(t, e.value) : $t(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce((n, [r, s]) => (n[`${r} =>`] = s, n), {})
} : qc(e) ? {
  [`Set(${e.size})`]: [...e.values()]
} : fe(e) && !Z(e) && !Ic(e) ? String(e) : e;
let Be;
class Ml {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Be, !e && Be && (this.index = (Be.scopes || (Be.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(e) {
    if (this._active) {
      const n = Be;
      try {
        return Be = this, e();
      } finally {
        Be = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    Be = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    Be = this.parent;
  }
  stop(e) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++)
        this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !e) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Nl(t, e = Be) {
  e && e.active && e.effects.push(t);
}
function Il() {
  return Be;
}
const xs = (t) => {
  const e = new Set(t);
  return e.w = 0, e.n = 0, e;
}, Pc = (t) => (t.w & ft) > 0, Bc = (t) => (t.n & ft) > 0, Fl = ({ deps: t }) => {
  if (t.length)
    for (let e = 0; e < t.length; e++)
      t[e].w |= ft;
}, Ll = (t) => {
  const { deps: e } = t;
  if (e.length) {
    let n = 0;
    for (let r = 0; r < e.length; r++) {
      const s = e[r];
      Pc(s) && !Bc(s) ? s.delete(t) : e[n++] = s, s.w &= ~ft, s.n &= ~ft;
    }
    e.length = n;
  }
}, Kn = /* @__PURE__ */ new WeakMap();
let un = 0, ft = 1;
const es = 30;
let $e;
const At = Symbol(""), ts = Symbol("");
class ys {
  constructor(e, n = null, r) {
    this.fn = e, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Nl(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let e = $e, n = lt;
    for (; e; ) {
      if (e === this)
        return;
      e = e.parent;
    }
    try {
      return this.parent = $e, $e = this, lt = !0, ft = 1 << ++un, un <= es ? Fl(this) : eo(this), this.fn();
    } finally {
      un <= es && Ll(this), ft = 1 << --un, $e = this.parent, lt = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    $e === this ? this.deferStop = !0 : this.active && (eo(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function eo(t) {
  const { deps: e } = t;
  if (e.length) {
    for (let n = 0; n < e.length; n++)
      e[n].delete(t);
    e.length = 0;
  }
}
let lt = !0;
const $c = [];
function Yt() {
  $c.push(lt), lt = !1;
}
function Xt() {
  const t = $c.pop();
  lt = t === void 0 ? !0 : t;
}
function qe(t, e, n) {
  if (lt && $e) {
    let r = Kn.get(t);
    r || Kn.set(t, r = /* @__PURE__ */ new Map());
    let s = r.get(n);
    s || r.set(n, s = xs()), zc(s);
  }
}
function zc(t, e) {
  let n = !1;
  un <= es ? Bc(t) || (t.n |= ft, n = !Pc(t)) : n = !t.has($e), n && (t.add($e), $e.deps.push(t));
}
function tt(t, e, n, r, s, o) {
  const c = Kn.get(t);
  if (!c)
    return;
  let i = [];
  if (e === "clear")
    i = [...c.values()];
  else if (n === "length" && Z(t)) {
    const l = Number(r);
    c.forEach((a, u) => {
      (u === "length" || u >= l) && i.push(a);
    });
  } else
    switch (n !== void 0 && i.push(c.get(n)), e) {
      case "add":
        Z(t) ? bs(n) && i.push(c.get("length")) : (i.push(c.get(At)), $t(t) && i.push(c.get(ts)));
        break;
      case "delete":
        Z(t) || (i.push(c.get(At)), $t(t) && i.push(c.get(ts)));
        break;
      case "set":
        $t(t) && i.push(c.get(At));
        break;
    }
  if (i.length === 1)
    i[0] && ns(i[0]);
  else {
    const l = [];
    for (const a of i)
      a && l.push(...a);
    ns(xs(l));
  }
}
function ns(t, e) {
  const n = Z(t) ? t : [...t];
  for (const r of n)
    r.computed && to(r);
  for (const r of n)
    r.computed || to(r);
}
function to(t, e) {
  (t !== $e || t.allowRecurse) && (t.scheduler ? t.scheduler() : t.run());
}
function Ol(t, e) {
  var n;
  return (n = Kn.get(t)) == null ? void 0 : n.get(e);
}
const Pl = /* @__PURE__ */ ds("__proto__,__v_isRef,__isVue"), Uc = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(_s)
), Bl = /* @__PURE__ */ ks(), $l = /* @__PURE__ */ ks(!1, !0), zl = /* @__PURE__ */ ks(!0), no = /* @__PURE__ */ Ul();
function Ul() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...n) {
      const r = ce(this);
      for (let o = 0, c = this.length; o < c; o++)
        qe(r, "get", o + "");
      const s = r[e](...n);
      return s === -1 || s === !1 ? r[e](...n.map(ce)) : s;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...n) {
      Yt();
      const r = ce(this)[e].apply(this, n);
      return Xt(), r;
    };
  }), t;
}
function Hl(t) {
  const e = ce(this);
  return qe(e, "has", t), e.hasOwnProperty(t);
}
function ks(t = !1, e = !1) {
  return function(r, s, o) {
    if (s === "__v_isReactive")
      return !t;
    if (s === "__v_isReadonly")
      return t;
    if (s === "__v_isShallow")
      return e;
    if (s === "__v_raw" && o === (t ? e ? oa : Zc : e ? Gc : Vc).get(r))
      return r;
    const c = Z(r);
    if (!t) {
      if (c && se(no, s))
        return Reflect.get(no, s, o);
      if (s === "hasOwnProperty")
        return Hl;
    }
    const i = Reflect.get(r, s, o);
    return (_s(s) ? Uc.has(s) : Pl(s)) || (t || qe(r, "get", s), e) ? i : ye(i) ? c && bs(s) ? i : i.value : fe(i) ? t ? Kc(i) : Cs(i) : i;
  };
}
const jl = /* @__PURE__ */ Hc(), Vl = /* @__PURE__ */ Hc(!0);
function Hc(t = !1) {
  return function(n, r, s, o) {
    let c = n[r];
    if (Zt(c) && ye(c) && !ye(s))
      return !1;
    if (!t && (!Wn(s) && !Zt(s) && (c = ce(c), s = ce(s)), !Z(n) && ye(c) && !ye(s)))
      return c.value = s, !0;
    const i = Z(n) && bs(r) ? Number(r) < n.length : se(n, r), l = Reflect.set(n, r, s, o);
    return n === ce(o) && (i ? bn(s, c) && tt(n, "set", r, s) : tt(n, "add", r, s)), l;
  };
}
function Gl(t, e) {
  const n = se(t, e);
  t[e];
  const r = Reflect.deleteProperty(t, e);
  return r && n && tt(t, "delete", e, void 0), r;
}
function Zl(t, e) {
  const n = Reflect.has(t, e);
  return (!_s(e) || !Uc.has(e)) && qe(t, "has", e), n;
}
function Kl(t) {
  return qe(t, "iterate", Z(t) ? "length" : At), Reflect.ownKeys(t);
}
const jc = {
  get: Bl,
  set: jl,
  deleteProperty: Gl,
  has: Zl,
  ownKeys: Kl
}, Wl = {
  get: zl,
  set(t, e) {
    return !0;
  },
  deleteProperty(t, e) {
    return !0;
  }
}, Jl = /* @__PURE__ */ me(
  {},
  jc,
  {
    get: $l,
    set: Vl
  }
), Es = (t) => t, lr = (t) => Reflect.getPrototypeOf(t);
function Mn(t, e, n = !1, r = !1) {
  t = t.__v_raw;
  const s = ce(t), o = ce(e);
  n || (e !== o && qe(s, "get", e), qe(s, "get", o));
  const { has: c } = lr(s), i = r ? Es : n ? Ss : vn;
  if (c.call(s, e))
    return i(t.get(e));
  if (c.call(s, o))
    return i(t.get(o));
  t !== s && t.get(e);
}
function Nn(t, e = !1) {
  const n = this.__v_raw, r = ce(n), s = ce(t);
  return e || (t !== s && qe(r, "has", t), qe(r, "has", s)), t === s ? n.has(t) : n.has(t) || n.has(s);
}
function In(t, e = !1) {
  return t = t.__v_raw, !e && qe(ce(t), "iterate", At), Reflect.get(t, "size", t);
}
function ro(t) {
  t = ce(t);
  const e = ce(this);
  return lr(e).has.call(e, t) || (e.add(t), tt(e, "add", t, t)), this;
}
function so(t, e) {
  e = ce(e);
  const n = ce(this), { has: r, get: s } = lr(n);
  let o = r.call(n, t);
  o || (t = ce(t), o = r.call(n, t));
  const c = s.call(n, t);
  return n.set(t, e), o ? bn(e, c) && tt(n, "set", t, e) : tt(n, "add", t, e), this;
}
function oo(t) {
  const e = ce(this), { has: n, get: r } = lr(e);
  let s = n.call(e, t);
  s || (t = ce(t), s = n.call(e, t)), r && r.call(e, t);
  const o = e.delete(t);
  return s && tt(e, "delete", t, void 0), o;
}
function co() {
  const t = ce(this), e = t.size !== 0, n = t.clear();
  return e && tt(t, "clear", void 0, void 0), n;
}
function Fn(t, e) {
  return function(r, s) {
    const o = this, c = o.__v_raw, i = ce(c), l = e ? Es : t ? Ss : vn;
    return !t && qe(i, "iterate", At), c.forEach((a, u) => r.call(s, l(a), l(u), o));
  };
}
function Ln(t, e, n) {
  return function(...r) {
    const s = this.__v_raw, o = ce(s), c = $t(o), i = t === "entries" || t === Symbol.iterator && c, l = t === "keys" && c, a = s[t](...r), u = n ? Es : e ? Ss : vn;
    return !e && qe(
      o,
      "iterate",
      l ? ts : At
    ), {
      // iterator protocol
      next() {
        const { value: f, done: p } = a.next();
        return p ? { value: f, done: p } : {
          value: i ? [u(f[0]), u(f[1])] : u(f),
          done: p
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function rt(t) {
  return function(...e) {
    return t === "delete" ? !1 : this;
  };
}
function Yl() {
  const t = {
    get(o) {
      return Mn(this, o);
    },
    get size() {
      return In(this);
    },
    has: Nn,
    add: ro,
    set: so,
    delete: oo,
    clear: co,
    forEach: Fn(!1, !1)
  }, e = {
    get(o) {
      return Mn(this, o, !1, !0);
    },
    get size() {
      return In(this);
    },
    has: Nn,
    add: ro,
    set: so,
    delete: oo,
    clear: co,
    forEach: Fn(!1, !0)
  }, n = {
    get(o) {
      return Mn(this, o, !0);
    },
    get size() {
      return In(this, !0);
    },
    has(o) {
      return Nn.call(this, o, !0);
    },
    add: rt("add"),
    set: rt("set"),
    delete: rt("delete"),
    clear: rt("clear"),
    forEach: Fn(!0, !1)
  }, r = {
    get(o) {
      return Mn(this, o, !0, !0);
    },
    get size() {
      return In(this, !0);
    },
    has(o) {
      return Nn.call(this, o, !0);
    },
    add: rt("add"),
    set: rt("set"),
    delete: rt("delete"),
    clear: rt("clear"),
    forEach: Fn(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    t[o] = Ln(
      o,
      !1,
      !1
    ), n[o] = Ln(
      o,
      !0,
      !1
    ), e[o] = Ln(
      o,
      !1,
      !0
    ), r[o] = Ln(
      o,
      !0,
      !0
    );
  }), [
    t,
    n,
    e,
    r
  ];
}
const [
  Xl,
  Ql,
  ea,
  ta
] = /* @__PURE__ */ Yl();
function ws(t, e) {
  const n = e ? t ? ta : ea : t ? Ql : Xl;
  return (r, s, o) => s === "__v_isReactive" ? !t : s === "__v_isReadonly" ? t : s === "__v_raw" ? r : Reflect.get(
    se(n, s) && s in r ? n : r,
    s,
    o
  );
}
const na = {
  get: /* @__PURE__ */ ws(!1, !1)
}, ra = {
  get: /* @__PURE__ */ ws(!1, !0)
}, sa = {
  get: /* @__PURE__ */ ws(!0, !1)
}, Vc = /* @__PURE__ */ new WeakMap(), Gc = /* @__PURE__ */ new WeakMap(), Zc = /* @__PURE__ */ new WeakMap(), oa = /* @__PURE__ */ new WeakMap();
function ca(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function ia(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : ca(kl(t));
}
function Cs(t) {
  return Zt(t) ? t : As(
    t,
    !1,
    jc,
    na,
    Vc
  );
}
function la(t) {
  return As(
    t,
    !1,
    Jl,
    ra,
    Gc
  );
}
function Kc(t) {
  return As(
    t,
    !0,
    Wl,
    sa,
    Zc
  );
}
function As(t, e, n, r, s) {
  if (!fe(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const o = s.get(t);
  if (o)
    return o;
  const c = ia(t);
  if (c === 0)
    return t;
  const i = new Proxy(
    t,
    c === 2 ? r : n
  );
  return s.set(t, i), i;
}
function zt(t) {
  return Zt(t) ? zt(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Zt(t) {
  return !!(t && t.__v_isReadonly);
}
function Wn(t) {
  return !!(t && t.__v_isShallow);
}
function Wc(t) {
  return zt(t) || Zt(t);
}
function ce(t) {
  const e = t && t.__v_raw;
  return e ? ce(e) : t;
}
function Jc(t) {
  return Gn(t, "__v_skip", !0), t;
}
const vn = (t) => fe(t) ? Cs(t) : t, Ss = (t) => fe(t) ? Kc(t) : t;
function Yc(t) {
  lt && $e && (t = ce(t), zc(t.dep || (t.dep = xs())));
}
function Xc(t, e) {
  t = ce(t);
  const n = t.dep;
  n && ns(n);
}
function ye(t) {
  return !!(t && t.__v_isRef === !0);
}
function Ut(t) {
  return aa(t, !1);
}
function aa(t, e) {
  return ye(t) ? t : new ua(t, e);
}
class ua {
  constructor(e, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? e : ce(e), this._value = n ? e : vn(e);
  }
  get value() {
    return Yc(this), this._value;
  }
  set value(e) {
    const n = this.__v_isShallow || Wn(e) || Zt(e);
    e = n ? e : ce(e), bn(e, this._rawValue) && (this._rawValue = e, this._value = n ? e : vn(e), Xc(this));
  }
}
function ge(t) {
  return ye(t) ? t.value : t;
}
const fa = {
  get: (t, e, n) => ge(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const s = t[e];
    return ye(s) && !ye(n) ? (s.value = n, !0) : Reflect.set(t, e, n, r);
  }
};
function Qc(t) {
  return zt(t) ? t : new Proxy(t, fa);
}
function pa(t) {
  const e = Z(t) ? new Array(t.length) : {};
  for (const n in t)
    e[n] = da(t, n);
  return e;
}
class ha {
  constructor(e, n, r) {
    this._object = e, this._key = n, this._defaultValue = r, this.__v_isRef = !0;
  }
  get value() {
    const e = this._object[this._key];
    return e === void 0 ? this._defaultValue : e;
  }
  set value(e) {
    this._object[this._key] = e;
  }
  get dep() {
    return Ol(ce(this._object), this._key);
  }
}
function da(t, e, n) {
  const r = t[e];
  return ye(r) ? r : new ha(
    t,
    e,
    n
  );
}
class ga {
  constructor(e, n, r, s) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new ys(e, () => {
      this._dirty || (this._dirty = !0, Xc(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = r;
  }
  get value() {
    const e = ce(this);
    return Yc(e), (e._dirty || !e._cacheable) && (e._dirty = !1, e._value = e.effect.run()), e._value;
  }
  set value(e) {
    this._setter(e);
  }
}
function ma(t, e, n = !1) {
  let r, s;
  const o = ee(t);
  return o ? (r = t, s = Ue) : (r = t.get, s = t.set), new ga(r, s, o || !s, n);
}
function at(t, e, n, r) {
  let s;
  try {
    s = r ? t(...r) : t();
  } catch (o) {
    ar(o, e, n);
  }
  return s;
}
function Fe(t, e, n, r) {
  if (ee(t)) {
    const o = at(t, e, n, r);
    return o && Mc(o) && o.catch((c) => {
      ar(c, e, n);
    }), o;
  }
  const s = [];
  for (let o = 0; o < t.length; o++)
    s.push(Fe(t[o], e, n, r));
  return s;
}
function ar(t, e, n, r = !0) {
  const s = e ? e.vnode : null;
  if (e) {
    let o = e.parent;
    const c = e.proxy, i = n;
    for (; o; ) {
      const a = o.ec;
      if (a) {
        for (let u = 0; u < a.length; u++)
          if (a[u](t, c, i) === !1)
            return;
      }
      o = o.parent;
    }
    const l = e.appContext.config.errorHandler;
    if (l) {
      at(
        l,
        null,
        10,
        [t, c, i]
      );
      return;
    }
  }
  _a(t, n, s, r);
}
function _a(t, e, n, r = !0) {
  console.error(t);
}
let xn = !1, rs = !1;
const ke = [];
let Ke = 0;
const Ht = [];
let et = null, xt = 0;
const ei = /* @__PURE__ */ Promise.resolve();
let Ds = null;
function Kt(t) {
  const e = Ds || ei;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function ba(t) {
  let e = Ke + 1, n = ke.length;
  for (; e < n; ) {
    const r = e + n >>> 1;
    yn(ke[r]) < t ? e = r + 1 : n = r;
  }
  return e;
}
function Ts(t) {
  (!ke.length || !ke.includes(
    t,
    xn && t.allowRecurse ? Ke + 1 : Ke
  )) && (t.id == null ? ke.push(t) : ke.splice(ba(t.id), 0, t), ti());
}
function ti() {
  !xn && !rs && (rs = !0, Ds = ei.then(ri));
}
function va(t) {
  const e = ke.indexOf(t);
  e > Ke && ke.splice(e, 1);
}
function xa(t) {
  Z(t) ? Ht.push(...t) : (!et || !et.includes(
    t,
    t.allowRecurse ? xt + 1 : xt
  )) && Ht.push(t), ti();
}
function io(t, e = xn ? Ke + 1 : 0) {
  for (; e < ke.length; e++) {
    const n = ke[e];
    n && n.pre && (ke.splice(e, 1), e--, n());
  }
}
function ni(t) {
  if (Ht.length) {
    const e = [...new Set(Ht)];
    if (Ht.length = 0, et) {
      et.push(...e);
      return;
    }
    for (et = e, et.sort((n, r) => yn(n) - yn(r)), xt = 0; xt < et.length; xt++)
      et[xt]();
    et = null, xt = 0;
  }
}
const yn = (t) => t.id == null ? 1 / 0 : t.id, ya = (t, e) => {
  const n = yn(t) - yn(e);
  if (n === 0) {
    if (t.pre && !e.pre)
      return -1;
    if (e.pre && !t.pre)
      return 1;
  }
  return n;
};
function ri(t) {
  rs = !1, xn = !0, ke.sort(ya);
  const e = Ue;
  try {
    for (Ke = 0; Ke < ke.length; Ke++) {
      const n = ke[Ke];
      n && n.active !== !1 && at(n, null, 14);
    }
  } finally {
    Ke = 0, ke.length = 0, ni(), xn = !1, Ds = null, (ke.length || Ht.length) && ri();
  }
}
function ka(t, e, ...n) {
  if (t.isUnmounted)
    return;
  const r = t.vnode.props || ue;
  let s = n;
  const o = e.startsWith("update:"), c = o && e.slice(7);
  if (c && c in r) {
    const u = `${c === "modelValue" ? "model" : c}Modifiers`, { number: f, trim: p } = r[u] || ue;
    p && (s = n.map((d) => _e(d) ? d.trim() : d)), f && (s = n.map(Xr));
  }
  let i, l = r[i = Sr(e)] || // also try camelCase event handler (#2249)
  r[i = Sr(Gt(e))];
  !l && o && (l = r[i = Sr(Mt(e))]), l && Fe(
    l,
    t,
    6,
    s
  );
  const a = r[i + "Once"];
  if (a) {
    if (!t.emitted)
      t.emitted = {};
    else if (t.emitted[i])
      return;
    t.emitted[i] = !0, Fe(
      a,
      t,
      6,
      s
    );
  }
}
function si(t, e, n = !1) {
  const r = e.emitsCache, s = r.get(t);
  if (s !== void 0)
    return s;
  const o = t.emits;
  let c = {}, i = !1;
  if (!ee(t)) {
    const l = (a) => {
      const u = si(a, e, !0);
      u && (i = !0, me(c, u));
    };
    !n && e.mixins.length && e.mixins.forEach(l), t.extends && l(t.extends), t.mixins && t.mixins.forEach(l);
  }
  return !o && !i ? (fe(t) && r.set(t, null), null) : (Z(o) ? o.forEach((l) => c[l] = null) : me(c, o), fe(t) && r.set(t, c), c);
}
function ur(t, e) {
  return !t || !or(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), se(t, e[0].toLowerCase() + e.slice(1)) || se(t, Mt(e)) || se(t, e));
}
let Ee = null, oi = null;
function Jn(t) {
  const e = Ee;
  return Ee = t, oi = t && t.type.__scopeId || null, e;
}
function ut(t, e = Ee, n) {
  if (!e || t._n)
    return t;
  const r = (...s) => {
    r._d && xo(-1);
    const o = Jn(e);
    let c;
    try {
      c = t(...s);
    } finally {
      Jn(o), r._d && xo(1);
    }
    return c;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function Dr(t) {
  const {
    type: e,
    vnode: n,
    proxy: r,
    withProxy: s,
    props: o,
    propsOptions: [c],
    slots: i,
    attrs: l,
    emit: a,
    render: u,
    renderCache: f,
    data: p,
    setupState: d,
    ctx: k,
    inheritAttrs: b
  } = t;
  let I, T;
  const C = Jn(t);
  try {
    if (n.shapeFlag & 4) {
      const A = s || r;
      I = Ze(
        u.call(
          A,
          A,
          f,
          o,
          d,
          p,
          k
        )
      ), T = l;
    } else {
      const A = e;
      I = Ze(
        A.length > 1 ? A(
          o,
          { attrs: l, slots: i, emit: a }
        ) : A(
          o,
          null
          /* we know it doesn't need it */
        )
      ), T = e.props ? l : Ea(l);
    }
  } catch (A) {
    gn.length = 0, ar(A, t, 1), I = he(Le);
  }
  let N = I;
  if (T && b !== !1) {
    const A = Object.keys(T), { shapeFlag: j } = N;
    A.length && j & 7 && (c && A.some(gs) && (T = wa(
      T,
      c
    )), N = pt(N, T));
  }
  return n.dirs && (N = pt(N), N.dirs = N.dirs ? N.dirs.concat(n.dirs) : n.dirs), n.transition && (N.transition = n.transition), I = N, Jn(C), I;
}
const Ea = (t) => {
  let e;
  for (const n in t)
    (n === "class" || n === "style" || or(n)) && ((e || (e = {}))[n] = t[n]);
  return e;
}, wa = (t, e) => {
  const n = {};
  for (const r in t)
    (!gs(r) || !(r.slice(9) in e)) && (n[r] = t[r]);
  return n;
};
function Ca(t, e, n) {
  const { props: r, children: s, component: o } = t, { props: c, children: i, patchFlag: l } = e, a = o.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (n && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return r ? lo(r, c, a) : !!c;
    if (l & 8) {
      const u = e.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        const p = u[f];
        if (c[p] !== r[p] && !ur(a, p))
          return !0;
      }
    }
  } else
    return (s || i) && (!i || !i.$stable) ? !0 : r === c ? !1 : r ? c ? lo(r, c, a) : !0 : !!c;
  return !1;
}
function lo(t, e, n) {
  const r = Object.keys(e);
  if (r.length !== Object.keys(t).length)
    return !0;
  for (let s = 0; s < r.length; s++) {
    const o = r[s];
    if (e[o] !== t[o] && !ur(n, o))
      return !0;
  }
  return !1;
}
function Aa({ vnode: t, parent: e }, n) {
  for (; e && e.subTree === t; )
    (t = e.vnode).el = n, e = e.parent;
}
const Sa = (t) => t.__isSuspense;
function Da(t, e) {
  e && e.pendingBranch ? Z(t) ? e.effects.push(...t) : e.effects.push(t) : xa(t);
}
const On = {};
function Tr(t, e, n) {
  return ci(t, e, n);
}
function ci(t, e, { immediate: n, deep: r, flush: s, onTrack: o, onTrigger: c } = ue) {
  var i;
  const l = Il() === ((i = xe) == null ? void 0 : i.scope) ? xe : null;
  let a, u = !1, f = !1;
  if (ye(t) ? (a = () => t.value, u = Wn(t)) : zt(t) ? (a = () => t, r = !0) : Z(t) ? (f = !0, u = t.some((A) => zt(A) || Wn(A)), a = () => t.map((A) => {
    if (ye(A))
      return A.value;
    if (zt(A))
      return wt(A);
    if (ee(A))
      return at(A, l, 2);
  })) : ee(t) ? e ? a = () => at(t, l, 2) : a = () => {
    if (!(l && l.isUnmounted))
      return p && p(), Fe(
        t,
        l,
        3,
        [d]
      );
  } : a = Ue, e && r) {
    const A = a;
    a = () => wt(A());
  }
  let p, d = (A) => {
    p = C.onStop = () => {
      at(A, l, 4);
    };
  }, k;
  if (En)
    if (d = Ue, e ? n && Fe(e, l, 3, [
      a(),
      f ? [] : void 0,
      d
    ]) : a(), s === "sync") {
      const A = ku();
      k = A.__watcherHandles || (A.__watcherHandles = []);
    } else
      return Ue;
  let b = f ? new Array(t.length).fill(On) : On;
  const I = () => {
    if (C.active)
      if (e) {
        const A = C.run();
        (r || u || (f ? A.some(
          (j, q) => bn(j, b[q])
        ) : bn(A, b))) && (p && p(), Fe(e, l, 3, [
          A,
          // pass undefined as the old value when it's changed for the first time
          b === On ? void 0 : f && b[0] === On ? [] : b,
          d
        ]), b = A);
      } else
        C.run();
  };
  I.allowRecurse = !!e;
  let T;
  s === "sync" ? T = I : s === "post" ? T = () => Te(I, l && l.suspense) : (I.pre = !0, l && (I.id = l.uid), T = () => Ts(I));
  const C = new ys(a, T);
  e ? n ? I() : b = C.run() : s === "post" ? Te(
    C.run.bind(C),
    l && l.suspense
  ) : C.run();
  const N = () => {
    C.stop(), l && l.scope && ms(l.scope.effects, C);
  };
  return k && k.push(N), N;
}
function Ta(t, e, n) {
  const r = this.proxy, s = _e(t) ? t.includes(".") ? ii(r, t) : () => r[t] : t.bind(r, r);
  let o;
  ee(e) ? o = e : (o = e.handler, n = e);
  const c = xe;
  Wt(this);
  const i = ci(s, o.bind(r), n);
  return c ? Wt(c) : St(), i;
}
function ii(t, e) {
  const n = e.split(".");
  return () => {
    let r = t;
    for (let s = 0; s < n.length && r; s++)
      r = r[n[s]];
    return r;
  };
}
function wt(t, e) {
  if (!fe(t) || t.__v_skip || (e = e || /* @__PURE__ */ new Set(), e.has(t)))
    return t;
  if (e.add(t), ye(t))
    wt(t.value, e);
  else if (Z(t))
    for (let n = 0; n < t.length; n++)
      wt(t[n], e);
  else if (qc(t) || $t(t))
    t.forEach((n) => {
      wt(n, e);
    });
  else if (Ic(t))
    for (const n in t)
      wt(t[n], e);
  return t;
}
function li(t, e) {
  const n = Ee;
  if (n === null)
    return t;
  const r = gr(n) || n.proxy, s = t.dirs || (t.dirs = []);
  for (let o = 0; o < e.length; o++) {
    let [c, i, l, a = ue] = e[o];
    c && (ee(c) && (c = {
      mounted: c,
      updated: c
    }), c.deep && wt(i), s.push({
      dir: c,
      instance: r,
      value: i,
      oldValue: void 0,
      arg: l,
      modifiers: a
    }));
  }
  return t;
}
function gt(t, e, n, r) {
  const s = t.dirs, o = e && e.dirs;
  for (let c = 0; c < s.length; c++) {
    const i = s[c];
    o && (i.oldValue = o[c].value);
    let l = i.dir[r];
    l && (Yt(), Fe(l, n, 8, [
      t.el,
      i,
      t,
      e
    ]), Xt());
  }
}
function Ra() {
  const t = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Dn(() => {
    t.isMounted = !0;
  }), Rs(() => {
    t.isUnmounting = !0;
  }), t;
}
const Ie = [Function, Array], ai = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: Ie,
  onEnter: Ie,
  onAfterEnter: Ie,
  onEnterCancelled: Ie,
  // leave
  onBeforeLeave: Ie,
  onLeave: Ie,
  onAfterLeave: Ie,
  onLeaveCancelled: Ie,
  // appear
  onBeforeAppear: Ie,
  onAppear: Ie,
  onAfterAppear: Ie,
  onAppearCancelled: Ie
}, qa = {
  name: "BaseTransition",
  props: ai,
  setup(t, { slots: e }) {
    const n = gu(), r = Ra();
    let s;
    return () => {
      const o = e.default && fi(e.default(), !0);
      if (!o || !o.length)
        return;
      let c = o[0];
      if (o.length > 1) {
        for (const b of o)
          if (b.type !== Le) {
            c = b;
            break;
          }
      }
      const i = ce(t), { mode: l } = i;
      if (r.isLeaving)
        return Rr(c);
      const a = ao(c);
      if (!a)
        return Rr(c);
      const u = ss(
        a,
        i,
        r,
        n
      );
      os(a, u);
      const f = n.subTree, p = f && ao(f);
      let d = !1;
      const { getTransitionKey: k } = a.type;
      if (k) {
        const b = k();
        s === void 0 ? s = b : b !== s && (s = b, d = !0);
      }
      if (p && p.type !== Le && (!yt(a, p) || d)) {
        const b = ss(
          p,
          i,
          r,
          n
        );
        if (os(p, b), l === "out-in")
          return r.isLeaving = !0, b.afterLeave = () => {
            r.isLeaving = !1, n.update.active !== !1 && n.update();
          }, Rr(c);
        l === "in-out" && a.type !== Le && (b.delayLeave = (I, T, C) => {
          const N = ui(
            r,
            p
          );
          N[String(p.key)] = p, I._leaveCb = () => {
            T(), I._leaveCb = void 0, delete u.delayedLeave;
          }, u.delayedLeave = C;
        });
      }
      return c;
    };
  }
}, Ma = qa;
function ui(t, e) {
  const { leavingVNodes: n } = t;
  let r = n.get(e.type);
  return r || (r = /* @__PURE__ */ Object.create(null), n.set(e.type, r)), r;
}
function ss(t, e, n, r) {
  const {
    appear: s,
    mode: o,
    persisted: c = !1,
    onBeforeEnter: i,
    onEnter: l,
    onAfterEnter: a,
    onEnterCancelled: u,
    onBeforeLeave: f,
    onLeave: p,
    onAfterLeave: d,
    onLeaveCancelled: k,
    onBeforeAppear: b,
    onAppear: I,
    onAfterAppear: T,
    onAppearCancelled: C
  } = e, N = String(t.key), A = ui(n, t), j = ($, X) => {
    $ && Fe(
      $,
      r,
      9,
      X
    );
  }, q = ($, X) => {
    const z = X[1];
    j($, X), Z($) ? $.every((J) => J.length <= 1) && z() : $.length <= 1 && z();
  }, W = {
    mode: o,
    persisted: c,
    beforeEnter($) {
      let X = i;
      if (!n.isMounted)
        if (s)
          X = b || i;
        else
          return;
      $._leaveCb && $._leaveCb(
        !0
        /* cancelled */
      );
      const z = A[N];
      z && yt(t, z) && z.el._leaveCb && z.el._leaveCb(), j(X, [$]);
    },
    enter($) {
      let X = l, z = a, J = u;
      if (!n.isMounted)
        if (s)
          X = I || l, z = T || a, J = C || u;
        else
          return;
      let B = !1;
      const re = $._enterCb = (D) => {
        B || (B = !0, D ? j(J, [$]) : j(z, [$]), W.delayedLeave && W.delayedLeave(), $._enterCb = void 0);
      };
      X ? q(X, [$, re]) : re();
    },
    leave($, X) {
      const z = String(t.key);
      if ($._enterCb && $._enterCb(
        !0
        /* cancelled */
      ), n.isUnmounting)
        return X();
      j(f, [$]);
      let J = !1;
      const B = $._leaveCb = (re) => {
        J || (J = !0, X(), re ? j(k, [$]) : j(d, [$]), $._leaveCb = void 0, A[z] === t && delete A[z]);
      };
      A[z] = t, p ? q(p, [$, B]) : B();
    },
    clone($) {
      return ss($, e, n, r);
    }
  };
  return W;
}
function Rr(t) {
  if (fr(t))
    return t = pt(t), t.children = null, t;
}
function ao(t) {
  return fr(t) ? t.children ? t.children[0] : void 0 : t;
}
function os(t, e) {
  t.shapeFlag & 6 && t.component ? os(t.component.subTree, e) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
function fi(t, e = !1, n) {
  let r = [], s = 0;
  for (let o = 0; o < t.length; o++) {
    let c = t[o];
    const i = n == null ? c.key : String(n) + String(c.key != null ? c.key : o);
    c.type === Re ? (c.patchFlag & 128 && s++, r = r.concat(
      fi(c.children, e, i)
    )) : (e || c.type !== Le) && r.push(i != null ? pt(c, { key: i }) : c);
  }
  if (s > 1)
    for (let o = 0; o < r.length; o++)
      r[o].patchFlag = -2;
  return r;
}
function He(t, e) {
  return ee(t) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => me({ name: t.name }, e, { setup: t }))()
  ) : t;
}
const pn = (t) => !!t.type.__asyncLoader, fr = (t) => t.type.__isKeepAlive;
function Na(t, e) {
  pi(t, "a", e);
}
function Ia(t, e) {
  pi(t, "da", e);
}
function pi(t, e, n = xe) {
  const r = t.__wdc || (t.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return t();
  });
  if (pr(e, r, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      fr(s.parent.vnode) && Fa(r, e, n, s), s = s.parent;
  }
}
function Fa(t, e, n, r) {
  const s = pr(
    e,
    t,
    r,
    !0
    /* prepend */
  );
  hi(() => {
    ms(r[e], s);
  }, n);
}
function pr(t, e, n = xe, r = !1) {
  if (n) {
    const s = n[t] || (n[t] = []), o = e.__weh || (e.__weh = (...c) => {
      if (n.isUnmounted)
        return;
      Yt(), Wt(n);
      const i = Fe(e, n, t, c);
      return St(), Xt(), i;
    });
    return r ? s.unshift(o) : s.push(o), o;
  }
}
const nt = (t) => (e, n = xe) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!En || t === "sp") && pr(t, (...r) => e(...r), n)
), La = nt("bm"), Dn = nt("m"), Oa = nt("bu"), Pa = nt("u"), Rs = nt("bum"), hi = nt("um"), Ba = nt("sp"), $a = nt(
  "rtg"
), za = nt(
  "rtc"
);
function Ua(t, e = xe) {
  pr("ec", t, e);
}
const Ha = Symbol.for("v-ndc");
function uo(t, e, n, r) {
  let s;
  const o = n && n[r];
  if (Z(t) || _e(t)) {
    s = new Array(t.length);
    for (let c = 0, i = t.length; c < i; c++)
      s[c] = e(t[c], c, void 0, o && o[c]);
  } else if (typeof t == "number") {
    s = new Array(t);
    for (let c = 0; c < t; c++)
      s[c] = e(c + 1, c, void 0, o && o[c]);
  } else if (fe(t))
    if (t[Symbol.iterator])
      s = Array.from(
        t,
        (c, i) => e(c, i, void 0, o && o[i])
      );
    else {
      const c = Object.keys(t);
      s = new Array(c.length);
      for (let i = 0, l = c.length; i < l; i++) {
        const a = c[i];
        s[i] = e(t[a], a, i, o && o[i]);
      }
    }
  else
    s = [];
  return n && (n[r] = s), s;
}
function hn(t, e, n = {}, r, s) {
  if (Ee.isCE || Ee.parent && pn(Ee.parent) && Ee.parent.isCE)
    return e !== "default" && (n.name = e), he("slot", n, r && r());
  let o = t[e];
  o && o._c && (o._d = !1), oe();
  const c = o && di(o(n)), i = Se(
    Re,
    {
      key: n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      c && c.key || `_${e}`
    },
    c || (r ? r() : []),
    c && t._ === 1 ? 64 : -2
  );
  return !s && i.scopeId && (i.slotScopeIds = [i.scopeId + "-s"]), o && o._c && (o._d = !0), i;
}
function di(t) {
  return t.some((e) => Qn(e) ? !(e.type === Le || e.type === Re && !di(e.children)) : !0) ? t : null;
}
const cs = (t) => t ? Ci(t) ? gr(t) || t.proxy : cs(t.parent) : null, dn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ me(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => cs(t.parent),
    $root: (t) => cs(t.root),
    $emit: (t) => t.emit,
    $options: (t) => qs(t),
    $forceUpdate: (t) => t.f || (t.f = () => Ts(t.update)),
    $nextTick: (t) => t.n || (t.n = Kt.bind(t.proxy)),
    $watch: (t) => Ta.bind(t)
  })
), qr = (t, e) => t !== ue && !t.__isScriptSetup && se(t, e), ja = {
  get({ _: t }, e) {
    const { ctx: n, setupState: r, data: s, props: o, accessCache: c, type: i, appContext: l } = t;
    let a;
    if (e[0] !== "$") {
      const d = c[e];
      if (d !== void 0)
        switch (d) {
          case 1:
            return r[e];
          case 2:
            return s[e];
          case 4:
            return n[e];
          case 3:
            return o[e];
        }
      else {
        if (qr(r, e))
          return c[e] = 1, r[e];
        if (s !== ue && se(s, e))
          return c[e] = 2, s[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (a = t.propsOptions[0]) && se(a, e)
        )
          return c[e] = 3, o[e];
        if (n !== ue && se(n, e))
          return c[e] = 4, n[e];
        is && (c[e] = 0);
      }
    }
    const u = dn[e];
    let f, p;
    if (u)
      return e === "$attrs" && qe(t, "get", e), u(t);
    if (
      // css module (injected by vue-loader)
      (f = i.__cssModules) && (f = f[e])
    )
      return f;
    if (n !== ue && se(n, e))
      return c[e] = 4, n[e];
    if (
      // global properties
      p = l.config.globalProperties, se(p, e)
    )
      return p[e];
  },
  set({ _: t }, e, n) {
    const { data: r, setupState: s, ctx: o } = t;
    return qr(s, e) ? (s[e] = n, !0) : r !== ue && se(r, e) ? (r[e] = n, !0) : se(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (o[e] = n, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: n, ctx: r, appContext: s, propsOptions: o }
  }, c) {
    let i;
    return !!n[c] || t !== ue && se(t, c) || qr(e, c) || (i = o[0]) && se(i, c) || se(r, c) || se(dn, c) || se(s.config.globalProperties, c);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : se(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
function fo(t) {
  return Z(t) ? t.reduce(
    (e, n) => (e[n] = null, e),
    {}
  ) : t;
}
let is = !0;
function Va(t) {
  const e = qs(t), n = t.proxy, r = t.ctx;
  is = !1, e.beforeCreate && po(e.beforeCreate, t, "bc");
  const {
    // state
    data: s,
    computed: o,
    methods: c,
    watch: i,
    provide: l,
    inject: a,
    // lifecycle
    created: u,
    beforeMount: f,
    mounted: p,
    beforeUpdate: d,
    updated: k,
    activated: b,
    deactivated: I,
    beforeDestroy: T,
    beforeUnmount: C,
    destroyed: N,
    unmounted: A,
    render: j,
    renderTracked: q,
    renderTriggered: W,
    errorCaptured: $,
    serverPrefetch: X,
    // public API
    expose: z,
    inheritAttrs: J,
    // assets
    components: B,
    directives: re,
    filters: D
  } = e;
  if (a && Ga(a, r, null), c)
    for (const v in c) {
      const S = c[v];
      ee(S) && (r[v] = S.bind(n));
    }
  if (s) {
    const v = s.call(n, n);
    fe(v) && (t.data = Cs(v));
  }
  if (is = !0, o)
    for (const v in o) {
      const S = o[v], G = ee(S) ? S.bind(n, n) : ee(S.get) ? S.get.bind(n, n) : Ue, te = !ee(S) && ee(S.set) ? S.set.bind(n) : Ue, ie = Tt({
        get: G,
        set: te
      });
      Object.defineProperty(r, v, {
        enumerable: !0,
        configurable: !0,
        get: () => ie.value,
        set: (ae) => ie.value = ae
      });
    }
  if (i)
    for (const v in i)
      gi(i[v], r, n, v);
  if (l) {
    const v = ee(l) ? l.call(n) : l;
    Reflect.ownKeys(v).forEach((S) => {
      Xa(S, v[S]);
    });
  }
  u && po(u, t, "c");
  function V(v, S) {
    Z(S) ? S.forEach((G) => v(G.bind(n))) : S && v(S.bind(n));
  }
  if (V(La, f), V(Dn, p), V(Oa, d), V(Pa, k), V(Na, b), V(Ia, I), V(Ua, $), V(za, q), V($a, W), V(Rs, C), V(hi, A), V(Ba, X), Z(z))
    if (z.length) {
      const v = t.exposed || (t.exposed = {});
      z.forEach((S) => {
        Object.defineProperty(v, S, {
          get: () => n[S],
          set: (G) => n[S] = G
        });
      });
    } else
      t.exposed || (t.exposed = {});
  j && t.render === Ue && (t.render = j), J != null && (t.inheritAttrs = J), B && (t.components = B), re && (t.directives = re);
}
function Ga(t, e, n = Ue) {
  Z(t) && (t = ls(t));
  for (const r in t) {
    const s = t[r];
    let o;
    fe(s) ? "default" in s ? o = jt(
      s.from || r,
      s.default,
      !0
      /* treat default function as factory */
    ) : o = jt(s.from || r) : o = jt(s), ye(o) ? Object.defineProperty(e, r, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (c) => o.value = c
    }) : e[r] = o;
  }
}
function po(t, e, n) {
  Fe(
    Z(t) ? t.map((r) => r.bind(e.proxy)) : t.bind(e.proxy),
    e,
    n
  );
}
function gi(t, e, n, r) {
  const s = r.includes(".") ? ii(n, r) : () => n[r];
  if (_e(t)) {
    const o = e[t];
    ee(o) && Tr(s, o);
  } else if (ee(t))
    Tr(s, t.bind(n));
  else if (fe(t))
    if (Z(t))
      t.forEach((o) => gi(o, e, n, r));
    else {
      const o = ee(t.handler) ? t.handler.bind(n) : e[t.handler];
      ee(o) && Tr(s, o, t);
    }
}
function qs(t) {
  const e = t.type, { mixins: n, extends: r } = e, {
    mixins: s,
    optionsCache: o,
    config: { optionMergeStrategies: c }
  } = t.appContext, i = o.get(e);
  let l;
  return i ? l = i : !s.length && !n && !r ? l = e : (l = {}, s.length && s.forEach(
    (a) => Yn(l, a, c, !0)
  ), Yn(l, e, c)), fe(e) && o.set(e, l), l;
}
function Yn(t, e, n, r = !1) {
  const { mixins: s, extends: o } = e;
  o && Yn(t, o, n, !0), s && s.forEach(
    (c) => Yn(t, c, n, !0)
  );
  for (const c in e)
    if (!(r && c === "expose")) {
      const i = Za[c] || n && n[c];
      t[c] = i ? i(t[c], e[c]) : e[c];
    }
  return t;
}
const Za = {
  data: ho,
  props: go,
  emits: go,
  // objects
  methods: fn,
  computed: fn,
  // lifecycle
  beforeCreate: Ae,
  created: Ae,
  beforeMount: Ae,
  mounted: Ae,
  beforeUpdate: Ae,
  updated: Ae,
  beforeDestroy: Ae,
  beforeUnmount: Ae,
  destroyed: Ae,
  unmounted: Ae,
  activated: Ae,
  deactivated: Ae,
  errorCaptured: Ae,
  serverPrefetch: Ae,
  // assets
  components: fn,
  directives: fn,
  // watch
  watch: Wa,
  // provide / inject
  provide: ho,
  inject: Ka
};
function ho(t, e) {
  return e ? t ? function() {
    return me(
      ee(t) ? t.call(this, this) : t,
      ee(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function Ka(t, e) {
  return fn(ls(t), ls(e));
}
function ls(t) {
  if (Z(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function Ae(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function fn(t, e) {
  return t ? me(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function go(t, e) {
  return t ? Z(t) && Z(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : me(
    /* @__PURE__ */ Object.create(null),
    fo(t),
    fo(e ?? {})
  ) : e;
}
function Wa(t, e) {
  if (!t)
    return e;
  if (!e)
    return t;
  const n = me(/* @__PURE__ */ Object.create(null), t);
  for (const r in e)
    n[r] = Ae(t[r], e[r]);
  return n;
}
function mi() {
  return {
    app: null,
    config: {
      isNativeTag: vl,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Ja = 0;
function Ya(t, e) {
  return function(r, s = null) {
    ee(r) || (r = me({}, r)), s != null && !fe(s) && (s = null);
    const o = mi(), c = /* @__PURE__ */ new Set();
    let i = !1;
    const l = o.app = {
      _uid: Ja++,
      _component: r,
      _props: s,
      _container: null,
      _context: o,
      _instance: null,
      version: Eu,
      get config() {
        return o.config;
      },
      set config(a) {
      },
      use(a, ...u) {
        return c.has(a) || (a && ee(a.install) ? (c.add(a), a.install(l, ...u)) : ee(a) && (c.add(a), a(l, ...u))), l;
      },
      mixin(a) {
        return o.mixins.includes(a) || o.mixins.push(a), l;
      },
      component(a, u) {
        return u ? (o.components[a] = u, l) : o.components[a];
      },
      directive(a, u) {
        return u ? (o.directives[a] = u, l) : o.directives[a];
      },
      mount(a, u, f) {
        if (!i) {
          const p = he(
            r,
            s
          );
          return p.appContext = o, u && e ? e(p, a) : t(p, a, f), i = !0, l._container = a, a.__vue_app__ = l, gr(p.component) || p.component.proxy;
        }
      },
      unmount() {
        i && (t(null, l._container), delete l._container.__vue_app__);
      },
      provide(a, u) {
        return o.provides[a] = u, l;
      },
      runWithContext(a) {
        Xn = l;
        try {
          return a();
        } finally {
          Xn = null;
        }
      }
    };
    return l;
  };
}
let Xn = null;
function Xa(t, e) {
  if (xe) {
    let n = xe.provides;
    const r = xe.parent && xe.parent.provides;
    r === n && (n = xe.provides = Object.create(r)), n[t] = e;
  }
}
function jt(t, e, n = !1) {
  const r = xe || Ee;
  if (r || Xn) {
    const s = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : Xn._context.provides;
    if (s && t in s)
      return s[t];
    if (arguments.length > 1)
      return n && ee(e) ? e.call(r && r.proxy) : e;
  }
}
function Qa(t, e, n, r = !1) {
  const s = {}, o = {};
  Gn(o, dr, 1), t.propsDefaults = /* @__PURE__ */ Object.create(null), _i(t, e, s, o);
  for (const c in t.propsOptions[0])
    c in s || (s[c] = void 0);
  n ? t.props = r ? s : la(s) : t.type.props ? t.props = s : t.props = o, t.attrs = o;
}
function eu(t, e, n, r) {
  const {
    props: s,
    attrs: o,
    vnode: { patchFlag: c }
  } = t, i = ce(s), [l] = t.propsOptions;
  let a = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || c > 0) && !(c & 16)
  ) {
    if (c & 8) {
      const u = t.vnode.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        let p = u[f];
        if (ur(t.emitsOptions, p))
          continue;
        const d = e[p];
        if (l)
          if (se(o, p))
            d !== o[p] && (o[p] = d, a = !0);
          else {
            const k = Gt(p);
            s[k] = as(
              l,
              i,
              k,
              d,
              t,
              !1
              /* isAbsent */
            );
          }
        else
          d !== o[p] && (o[p] = d, a = !0);
      }
    }
  } else {
    _i(t, e, s, o) && (a = !0);
    let u;
    for (const f in i)
      (!e || // for camelCase
      !se(e, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = Mt(f)) === f || !se(e, u))) && (l ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[u] !== void 0) && (s[f] = as(
        l,
        i,
        f,
        void 0,
        t,
        !0
        /* isAbsent */
      )) : delete s[f]);
    if (o !== i)
      for (const f in o)
        (!e || !se(e, f)) && (delete o[f], a = !0);
  }
  a && tt(t, "set", "$attrs");
}
function _i(t, e, n, r) {
  const [s, o] = t.propsOptions;
  let c = !1, i;
  if (e)
    for (let l in e) {
      if (Hn(l))
        continue;
      const a = e[l];
      let u;
      s && se(s, u = Gt(l)) ? !o || !o.includes(u) ? n[u] = a : (i || (i = {}))[u] = a : ur(t.emitsOptions, l) || (!(l in r) || a !== r[l]) && (r[l] = a, c = !0);
    }
  if (o) {
    const l = ce(n), a = i || ue;
    for (let u = 0; u < o.length; u++) {
      const f = o[u];
      n[f] = as(
        s,
        l,
        f,
        a[f],
        t,
        !se(a, f)
      );
    }
  }
  return c;
}
function as(t, e, n, r, s, o) {
  const c = t[n];
  if (c != null) {
    const i = se(c, "default");
    if (i && r === void 0) {
      const l = c.default;
      if (c.type !== Function && !c.skipFactory && ee(l)) {
        const { propsDefaults: a } = s;
        n in a ? r = a[n] : (Wt(s), r = a[n] = l.call(
          null,
          e
        ), St());
      } else
        r = l;
    }
    c[
      0
      /* shouldCast */
    ] && (o && !i ? r = !1 : c[
      1
      /* shouldCastTrue */
    ] && (r === "" || r === Mt(n)) && (r = !0));
  }
  return r;
}
function bi(t, e, n = !1) {
  const r = e.propsCache, s = r.get(t);
  if (s)
    return s;
  const o = t.props, c = {}, i = [];
  let l = !1;
  if (!ee(t)) {
    const u = (f) => {
      l = !0;
      const [p, d] = bi(f, e, !0);
      me(c, p), d && i.push(...d);
    };
    !n && e.mixins.length && e.mixins.forEach(u), t.extends && u(t.extends), t.mixins && t.mixins.forEach(u);
  }
  if (!o && !l)
    return fe(t) && r.set(t, Bt), Bt;
  if (Z(o))
    for (let u = 0; u < o.length; u++) {
      const f = Gt(o[u]);
      mo(f) && (c[f] = ue);
    }
  else if (o)
    for (const u in o) {
      const f = Gt(u);
      if (mo(f)) {
        const p = o[u], d = c[f] = Z(p) || ee(p) ? { type: p } : me({}, p);
        if (d) {
          const k = vo(Boolean, d.type), b = vo(String, d.type);
          d[
            0
            /* shouldCast */
          ] = k > -1, d[
            1
            /* shouldCastTrue */
          ] = b < 0 || k < b, (k > -1 || se(d, "default")) && i.push(f);
        }
      }
    }
  const a = [c, i];
  return fe(t) && r.set(t, a), a;
}
function mo(t) {
  return t[0] !== "$";
}
function _o(t) {
  const e = t && t.toString().match(/^\s*(function|class) (\w+)/);
  return e ? e[2] : t === null ? "null" : "";
}
function bo(t, e) {
  return _o(t) === _o(e);
}
function vo(t, e) {
  return Z(e) ? e.findIndex((n) => bo(n, t)) : ee(e) && bo(e, t) ? 0 : -1;
}
const vi = (t) => t[0] === "_" || t === "$stable", Ms = (t) => Z(t) ? t.map(Ze) : [Ze(t)], tu = (t, e, n) => {
  if (e._n)
    return e;
  const r = ut((...s) => Ms(e(...s)), n);
  return r._c = !1, r;
}, xi = (t, e, n) => {
  const r = t._ctx;
  for (const s in t) {
    if (vi(s))
      continue;
    const o = t[s];
    if (ee(o))
      e[s] = tu(s, o, r);
    else if (o != null) {
      const c = Ms(o);
      e[s] = () => c;
    }
  }
}, yi = (t, e) => {
  const n = Ms(e);
  t.slots.default = () => n;
}, nu = (t, e) => {
  if (t.vnode.shapeFlag & 32) {
    const n = e._;
    n ? (t.slots = ce(e), Gn(e, "_", n)) : xi(
      e,
      t.slots = {}
    );
  } else
    t.slots = {}, e && yi(t, e);
  Gn(t.slots, dr, 1);
}, ru = (t, e, n) => {
  const { vnode: r, slots: s } = t;
  let o = !0, c = ue;
  if (r.shapeFlag & 32) {
    const i = e._;
    i ? n && i === 1 ? o = !1 : (me(s, e), !n && i === 1 && delete s._) : (o = !e.$stable, xi(e, s)), c = e;
  } else
    e && (yi(t, e), c = { default: 1 });
  if (o)
    for (const i in s)
      !vi(i) && !(i in c) && delete s[i];
};
function us(t, e, n, r, s = !1) {
  if (Z(t)) {
    t.forEach(
      (p, d) => us(
        p,
        e && (Z(e) ? e[d] : e),
        n,
        r,
        s
      )
    );
    return;
  }
  if (pn(r) && !s)
    return;
  const o = r.shapeFlag & 4 ? gr(r.component) || r.component.proxy : r.el, c = s ? null : o, { i, r: l } = t, a = e && e.r, u = i.refs === ue ? i.refs = {} : i.refs, f = i.setupState;
  if (a != null && a !== l && (_e(a) ? (u[a] = null, se(f, a) && (f[a] = null)) : ye(a) && (a.value = null)), ee(l))
    at(l, i, 12, [c, u]);
  else {
    const p = _e(l), d = ye(l);
    if (p || d) {
      const k = () => {
        if (t.f) {
          const b = p ? se(f, l) ? f[l] : u[l] : l.value;
          s ? Z(b) && ms(b, o) : Z(b) ? b.includes(o) || b.push(o) : p ? (u[l] = [o], se(f, l) && (f[l] = u[l])) : (l.value = [o], t.k && (u[t.k] = l.value));
        } else
          p ? (u[l] = c, se(f, l) && (f[l] = c)) : d && (l.value = c, t.k && (u[t.k] = c));
      };
      c ? (k.id = -1, Te(k, n)) : k();
    }
  }
}
const Te = Da;
function su(t) {
  return ou(t);
}
function ou(t, e) {
  const n = Qr();
  n.__VUE__ = !0;
  const {
    insert: r,
    remove: s,
    patchProp: o,
    createElement: c,
    createText: i,
    createComment: l,
    setText: a,
    setElementText: u,
    parentNode: f,
    nextSibling: p,
    setScopeId: d = Ue,
    insertStaticContent: k
  } = t, b = (h, g, _, E = null, x = null, M = null, O = !1, m = null, F = !!g.dynamicChildren) => {
    if (h === g)
      return;
    h && !yt(h, g) && (E = ht(h), ae(h, x, M, !0), h = null), g.patchFlag === -2 && (F = !1, g.dynamicChildren = null);
    const { type: y, ref: L, shapeFlag: P } = g;
    switch (y) {
      case hr:
        I(h, g, _, E);
        break;
      case Le:
        T(h, g, _, E);
        break;
      case Mr:
        h == null && C(g, _, E, O);
        break;
      case Re:
        B(
          h,
          g,
          _,
          E,
          x,
          M,
          O,
          m,
          F
        );
        break;
      default:
        P & 1 ? j(
          h,
          g,
          _,
          E,
          x,
          M,
          O,
          m,
          F
        ) : P & 6 ? re(
          h,
          g,
          _,
          E,
          x,
          M,
          O,
          m,
          F
        ) : (P & 64 || P & 128) && y.process(
          h,
          g,
          _,
          E,
          x,
          M,
          O,
          m,
          F,
          Qe
        );
    }
    L != null && x && us(L, h && h.ref, M, g || h, !g);
  }, I = (h, g, _, E) => {
    if (h == null)
      r(
        g.el = i(g.children),
        _,
        E
      );
    else {
      const x = g.el = h.el;
      g.children !== h.children && a(x, g.children);
    }
  }, T = (h, g, _, E) => {
    h == null ? r(
      g.el = l(g.children || ""),
      _,
      E
    ) : g.el = h.el;
  }, C = (h, g, _, E) => {
    [h.el, h.anchor] = k(
      h.children,
      g,
      _,
      E,
      h.el,
      h.anchor
    );
  }, N = ({ el: h, anchor: g }, _, E) => {
    let x;
    for (; h && h !== g; )
      x = p(h), r(h, _, E), h = x;
    r(g, _, E);
  }, A = ({ el: h, anchor: g }) => {
    let _;
    for (; h && h !== g; )
      _ = p(h), s(h), h = _;
    s(g);
  }, j = (h, g, _, E, x, M, O, m, F) => {
    O = O || g.type === "svg", h == null ? q(
      g,
      _,
      E,
      x,
      M,
      O,
      m,
      F
    ) : X(
      h,
      g,
      x,
      M,
      O,
      m,
      F
    );
  }, q = (h, g, _, E, x, M, O, m) => {
    let F, y;
    const { type: L, props: P, shapeFlag: U, transition: K, dirs: Q } = h;
    if (F = h.el = c(
      h.type,
      M,
      P && P.is,
      P
    ), U & 8 ? u(F, h.children) : U & 16 && $(
      h.children,
      F,
      null,
      E,
      x,
      M && L !== "foreignObject",
      O,
      m
    ), Q && gt(h, null, E, "created"), W(F, h, h.scopeId, O, E), P) {
      for (const R in P)
        R !== "value" && !Hn(R) && o(
          F,
          R,
          null,
          P[R],
          M,
          h.children,
          E,
          x,
          de
        );
      "value" in P && o(F, "value", null, P.value), (y = P.onVnodeBeforeMount) && Ge(y, E, h);
    }
    Q && gt(h, null, E, "beforeMount");
    const w = (!x || x && !x.pendingBranch) && K && !K.persisted;
    w && K.beforeEnter(F), r(F, g, _), ((y = P && P.onVnodeMounted) || w || Q) && Te(() => {
      y && Ge(y, E, h), w && K.enter(F), Q && gt(h, null, E, "mounted");
    }, x);
  }, W = (h, g, _, E, x) => {
    if (_ && d(h, _), E)
      for (let M = 0; M < E.length; M++)
        d(h, E[M]);
    if (x) {
      let M = x.subTree;
      if (g === M) {
        const O = x.vnode;
        W(
          h,
          O,
          O.scopeId,
          O.slotScopeIds,
          x.parent
        );
      }
    }
  }, $ = (h, g, _, E, x, M, O, m, F = 0) => {
    for (let y = F; y < h.length; y++) {
      const L = h[y] = m ? ct(h[y]) : Ze(h[y]);
      b(
        null,
        L,
        g,
        _,
        E,
        x,
        M,
        O,
        m
      );
    }
  }, X = (h, g, _, E, x, M, O) => {
    const m = g.el = h.el;
    let { patchFlag: F, dynamicChildren: y, dirs: L } = g;
    F |= h.patchFlag & 16;
    const P = h.props || ue, U = g.props || ue;
    let K;
    _ && mt(_, !1), (K = U.onVnodeBeforeUpdate) && Ge(K, _, g, h), L && gt(g, h, _, "beforeUpdate"), _ && mt(_, !0);
    const Q = x && g.type !== "foreignObject";
    if (y ? z(
      h.dynamicChildren,
      y,
      m,
      _,
      E,
      Q,
      M
    ) : O || S(
      h,
      g,
      m,
      null,
      _,
      E,
      Q,
      M,
      !1
    ), F > 0) {
      if (F & 16)
        J(
          m,
          g,
          P,
          U,
          _,
          E,
          x
        );
      else if (F & 2 && P.class !== U.class && o(m, "class", null, U.class, x), F & 4 && o(m, "style", P.style, U.style, x), F & 8) {
        const w = g.dynamicProps;
        for (let R = 0; R < w.length; R++) {
          const H = w[R], Y = P[H], pe = U[H];
          (pe !== Y || H === "value") && o(
            m,
            H,
            Y,
            pe,
            x,
            h.children,
            _,
            E,
            de
          );
        }
      }
      F & 1 && h.children !== g.children && u(m, g.children);
    } else
      !O && y == null && J(
        m,
        g,
        P,
        U,
        _,
        E,
        x
      );
    ((K = U.onVnodeUpdated) || L) && Te(() => {
      K && Ge(K, _, g, h), L && gt(g, h, _, "updated");
    }, E);
  }, z = (h, g, _, E, x, M, O) => {
    for (let m = 0; m < g.length; m++) {
      const F = h[m], y = g[m], L = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        F.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (F.type === Re || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !yt(F, y) || // - In the case of a component, it could contain anything.
        F.shapeFlag & 70) ? f(F.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          _
        )
      );
      b(
        F,
        y,
        L,
        null,
        E,
        x,
        M,
        O,
        !0
      );
    }
  }, J = (h, g, _, E, x, M, O) => {
    if (_ !== E) {
      if (_ !== ue)
        for (const m in _)
          !Hn(m) && !(m in E) && o(
            h,
            m,
            _[m],
            null,
            O,
            g.children,
            x,
            M,
            de
          );
      for (const m in E) {
        if (Hn(m))
          continue;
        const F = E[m], y = _[m];
        F !== y && m !== "value" && o(
          h,
          m,
          y,
          F,
          O,
          g.children,
          x,
          M,
          de
        );
      }
      "value" in E && o(h, "value", _.value, E.value);
    }
  }, B = (h, g, _, E, x, M, O, m, F) => {
    const y = g.el = h ? h.el : i(""), L = g.anchor = h ? h.anchor : i("");
    let { patchFlag: P, dynamicChildren: U, slotScopeIds: K } = g;
    K && (m = m ? m.concat(K) : K), h == null ? (r(y, _, E), r(L, _, E), $(
      g.children,
      _,
      L,
      x,
      M,
      O,
      m,
      F
    )) : P > 0 && P & 64 && U && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    h.dynamicChildren ? (z(
      h.dynamicChildren,
      U,
      _,
      x,
      M,
      O,
      m
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (g.key != null || x && g === x.subTree) && ki(
      h,
      g,
      !0
      /* shallow */
    )) : S(
      h,
      g,
      _,
      L,
      x,
      M,
      O,
      m,
      F
    );
  }, re = (h, g, _, E, x, M, O, m, F) => {
    g.slotScopeIds = m, h == null ? g.shapeFlag & 512 ? x.ctx.activate(
      g,
      _,
      E,
      O,
      F
    ) : D(
      g,
      _,
      E,
      x,
      M,
      O,
      F
    ) : ne(h, g, F);
  }, D = (h, g, _, E, x, M, O) => {
    const m = h.component = du(
      h,
      E,
      x
    );
    if (fr(h) && (m.ctx.renderer = Qe), mu(m), m.asyncDep) {
      if (x && x.registerDep(m, V), !h.el) {
        const F = m.subTree = he(Le);
        T(null, F, g, _);
      }
      return;
    }
    V(
      m,
      h,
      g,
      _,
      x,
      M,
      O
    );
  }, ne = (h, g, _) => {
    const E = g.component = h.component;
    if (Ca(h, g, _))
      if (E.asyncDep && !E.asyncResolved) {
        v(E, g, _);
        return;
      } else
        E.next = g, va(E.update), E.update();
    else
      g.el = h.el, E.vnode = g;
  }, V = (h, g, _, E, x, M, O) => {
    const m = () => {
      if (h.isMounted) {
        let { next: L, bu: P, u: U, parent: K, vnode: Q } = h, w = L, R;
        mt(h, !1), L ? (L.el = Q.el, v(h, L, O)) : L = Q, P && jn(P), (R = L.props && L.props.onVnodeBeforeUpdate) && Ge(R, K, L, Q), mt(h, !0);
        const H = Dr(h), Y = h.subTree;
        h.subTree = H, b(
          Y,
          H,
          // parent may have changed if it's in a teleport
          f(Y.el),
          // anchor may have changed if it's in a fragment
          ht(Y),
          h,
          x,
          M
        ), L.el = H.el, w === null && Aa(h, H.el), U && Te(U, x), (R = L.props && L.props.onVnodeUpdated) && Te(
          () => Ge(R, K, L, Q),
          x
        );
      } else {
        let L;
        const { el: P, props: U } = g, { bm: K, m: Q, parent: w } = h, R = pn(g);
        if (mt(h, !1), K && jn(K), !R && (L = U && U.onVnodeBeforeMount) && Ge(L, w, g), mt(h, !0), P && sn) {
          const H = () => {
            h.subTree = Dr(h), sn(
              P,
              h.subTree,
              h,
              x,
              null
            );
          };
          R ? g.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !h.isUnmounted && H()
          ) : H();
        } else {
          const H = h.subTree = Dr(h);
          b(
            null,
            H,
            _,
            E,
            h,
            x,
            M
          ), g.el = H.el;
        }
        if (Q && Te(Q, x), !R && (L = U && U.onVnodeMounted)) {
          const H = g;
          Te(
            () => Ge(L, w, H),
            x
          );
        }
        (g.shapeFlag & 256 || w && pn(w.vnode) && w.vnode.shapeFlag & 256) && h.a && Te(h.a, x), h.isMounted = !0, g = _ = E = null;
      }
    }, F = h.effect = new ys(
      m,
      () => Ts(y),
      h.scope
      // track it in component's effect scope
    ), y = h.update = () => F.run();
    y.id = h.uid, mt(h, !0), y();
  }, v = (h, g, _) => {
    g.component = h;
    const E = h.vnode.props;
    h.vnode = g, h.next = null, eu(h, g.props, E, _), ru(h, g.children, _), Yt(), io(), Xt();
  }, S = (h, g, _, E, x, M, O, m, F = !1) => {
    const y = h && h.children, L = h ? h.shapeFlag : 0, P = g.children, { patchFlag: U, shapeFlag: K } = g;
    if (U > 0) {
      if (U & 128) {
        te(
          y,
          P,
          _,
          E,
          x,
          M,
          O,
          m,
          F
        );
        return;
      } else if (U & 256) {
        G(
          y,
          P,
          _,
          E,
          x,
          M,
          O,
          m,
          F
        );
        return;
      }
    }
    K & 8 ? (L & 16 && de(y, x, M), P !== y && u(_, P)) : L & 16 ? K & 16 ? te(
      y,
      P,
      _,
      E,
      x,
      M,
      O,
      m,
      F
    ) : de(y, x, M, !0) : (L & 8 && u(_, ""), K & 16 && $(
      P,
      _,
      E,
      x,
      M,
      O,
      m,
      F
    ));
  }, G = (h, g, _, E, x, M, O, m, F) => {
    h = h || Bt, g = g || Bt;
    const y = h.length, L = g.length, P = Math.min(y, L);
    let U;
    for (U = 0; U < P; U++) {
      const K = g[U] = F ? ct(g[U]) : Ze(g[U]);
      b(
        h[U],
        K,
        _,
        null,
        x,
        M,
        O,
        m,
        F
      );
    }
    y > L ? de(
      h,
      x,
      M,
      !0,
      !1,
      P
    ) : $(
      g,
      _,
      E,
      x,
      M,
      O,
      m,
      F,
      P
    );
  }, te = (h, g, _, E, x, M, O, m, F) => {
    let y = 0;
    const L = g.length;
    let P = h.length - 1, U = L - 1;
    for (; y <= P && y <= U; ) {
      const K = h[y], Q = g[y] = F ? ct(g[y]) : Ze(g[y]);
      if (yt(K, Q))
        b(
          K,
          Q,
          _,
          null,
          x,
          M,
          O,
          m,
          F
        );
      else
        break;
      y++;
    }
    for (; y <= P && y <= U; ) {
      const K = h[P], Q = g[U] = F ? ct(g[U]) : Ze(g[U]);
      if (yt(K, Q))
        b(
          K,
          Q,
          _,
          null,
          x,
          M,
          O,
          m,
          F
        );
      else
        break;
      P--, U--;
    }
    if (y > P) {
      if (y <= U) {
        const K = U + 1, Q = K < L ? g[K].el : E;
        for (; y <= U; )
          b(
            null,
            g[y] = F ? ct(g[y]) : Ze(g[y]),
            _,
            Q,
            x,
            M,
            O,
            m,
            F
          ), y++;
      }
    } else if (y > U)
      for (; y <= P; )
        ae(h[y], x, M, !0), y++;
    else {
      const K = y, Q = y, w = /* @__PURE__ */ new Map();
      for (y = Q; y <= U; y++) {
        const Me = g[y] = F ? ct(g[y]) : Ze(g[y]);
        Me.key != null && w.set(Me.key, y);
      }
      let R, H = 0;
      const Y = U - Q + 1;
      let pe = !1, Ne = 0;
      const dt = new Array(Y);
      for (y = 0; y < Y; y++)
        dt[y] = 0;
      for (y = K; y <= P; y++) {
        const Me = h[y];
        if (H >= Y) {
          ae(Me, x, M, !0);
          continue;
        }
        let Ve;
        if (Me.key != null)
          Ve = w.get(Me.key);
        else
          for (R = Q; R <= U; R++)
            if (dt[R - Q] === 0 && yt(Me, g[R])) {
              Ve = R;
              break;
            }
        Ve === void 0 ? ae(Me, x, M, !0) : (dt[Ve - Q] = y + 1, Ve >= Ne ? Ne = Ve : pe = !0, b(
          Me,
          g[Ve],
          _,
          null,
          x,
          M,
          O,
          m,
          F
        ), H++);
      }
      const qn = pe ? cu(dt) : Bt;
      for (R = qn.length - 1, y = Y - 1; y >= 0; y--) {
        const Me = Q + y, Ve = g[Me], Xs = Me + 1 < L ? g[Me + 1].el : E;
        dt[y] === 0 ? b(
          null,
          Ve,
          _,
          Xs,
          x,
          M,
          O,
          m,
          F
        ) : pe && (R < 0 || y !== qn[R] ? ie(Ve, _, Xs, 2) : R--);
      }
    }
  }, ie = (h, g, _, E, x = null) => {
    const { el: M, type: O, transition: m, children: F, shapeFlag: y } = h;
    if (y & 6) {
      ie(h.component.subTree, g, _, E);
      return;
    }
    if (y & 128) {
      h.suspense.move(g, _, E);
      return;
    }
    if (y & 64) {
      O.move(h, g, _, Qe);
      return;
    }
    if (O === Re) {
      r(M, g, _);
      for (let P = 0; P < F.length; P++)
        ie(F[P], g, _, E);
      r(h.anchor, g, _);
      return;
    }
    if (O === Mr) {
      N(h, g, _);
      return;
    }
    if (E !== 2 && y & 1 && m)
      if (E === 0)
        m.beforeEnter(M), r(M, g, _), Te(() => m.enter(M), x);
      else {
        const { leave: P, delayLeave: U, afterLeave: K } = m, Q = () => r(M, g, _), w = () => {
          P(M, () => {
            Q(), K && K();
          });
        };
        U ? U(M, Q, w) : w();
      }
    else
      r(M, g, _);
  }, ae = (h, g, _, E = !1, x = !1) => {
    const {
      type: M,
      props: O,
      ref: m,
      children: F,
      dynamicChildren: y,
      shapeFlag: L,
      patchFlag: P,
      dirs: U
    } = h;
    if (m != null && us(m, null, _, h, !0), L & 256) {
      g.ctx.deactivate(h);
      return;
    }
    const K = L & 1 && U, Q = !pn(h);
    let w;
    if (Q && (w = O && O.onVnodeBeforeUnmount) && Ge(w, g, h), L & 6)
      Ce(h.component, _, E);
    else {
      if (L & 128) {
        h.suspense.unmount(_, E);
        return;
      }
      K && gt(h, null, g, "beforeUnmount"), L & 64 ? h.type.remove(
        h,
        g,
        _,
        x,
        Qe,
        E
      ) : y && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (M !== Re || P > 0 && P & 64) ? de(
        y,
        g,
        _,
        !1,
        !0
      ) : (M === Re && P & 384 || !x && L & 16) && de(F, g, _), E && De(h);
    }
    (Q && (w = O && O.onVnodeUnmounted) || K) && Te(() => {
      w && Ge(w, g, h), K && gt(h, null, g, "unmounted");
    }, _);
  }, De = (h) => {
    const { type: g, el: _, anchor: E, transition: x } = h;
    if (g === Re) {
      It(_, E);
      return;
    }
    if (g === Mr) {
      A(h);
      return;
    }
    const M = () => {
      s(_), x && !x.persisted && x.afterLeave && x.afterLeave();
    };
    if (h.shapeFlag & 1 && x && !x.persisted) {
      const { leave: O, delayLeave: m } = x, F = () => O(_, M);
      m ? m(h.el, M, F) : F();
    } else
      M();
  }, It = (h, g) => {
    let _;
    for (; h !== g; )
      _ = p(h), s(h), h = _;
    s(g);
  }, Ce = (h, g, _) => {
    const { bum: E, scope: x, update: M, subTree: O, um: m } = h;
    E && jn(E), x.stop(), M && (M.active = !1, ae(O, h, g, _)), m && Te(m, g), Te(() => {
      h.isUnmounted = !0;
    }, g), g && g.pendingBranch && !g.isUnmounted && h.asyncDep && !h.asyncResolved && h.suspenseId === g.pendingId && (g.deps--, g.deps === 0 && g.resolve());
  }, de = (h, g, _, E = !1, x = !1, M = 0) => {
    for (let O = M; O < h.length; O++)
      ae(h[O], g, _, E, x);
  }, ht = (h) => h.shapeFlag & 6 ? ht(h.component.subTree) : h.shapeFlag & 128 ? h.suspense.next() : p(h.anchor || h.el), nn = (h, g, _) => {
    h == null ? g._vnode && ae(g._vnode, null, null, !0) : b(g._vnode || null, h, g, null, null, null, _), io(), ni(), g._vnode = h;
  }, Qe = {
    p: b,
    um: ae,
    m: ie,
    r: De,
    mt: D,
    mc: $,
    pc: S,
    pbc: z,
    n: ht,
    o: t
  };
  let rn, sn;
  return e && ([rn, sn] = e(
    Qe
  )), {
    render: nn,
    hydrate: rn,
    createApp: Ya(nn, rn)
  };
}
function mt({ effect: t, update: e }, n) {
  t.allowRecurse = e.allowRecurse = n;
}
function ki(t, e, n = !1) {
  const r = t.children, s = e.children;
  if (Z(r) && Z(s))
    for (let o = 0; o < r.length; o++) {
      const c = r[o];
      let i = s[o];
      i.shapeFlag & 1 && !i.dynamicChildren && ((i.patchFlag <= 0 || i.patchFlag === 32) && (i = s[o] = ct(s[o]), i.el = c.el), n || ki(c, i)), i.type === hr && (i.el = c.el);
    }
}
function cu(t) {
  const e = t.slice(), n = [0];
  let r, s, o, c, i;
  const l = t.length;
  for (r = 0; r < l; r++) {
    const a = t[r];
    if (a !== 0) {
      if (s = n[n.length - 1], t[s] < a) {
        e[r] = s, n.push(r);
        continue;
      }
      for (o = 0, c = n.length - 1; o < c; )
        i = o + c >> 1, t[n[i]] < a ? o = i + 1 : c = i;
      a < t[n[o]] && (o > 0 && (e[r] = n[o - 1]), n[o] = r);
    }
  }
  for (o = n.length, c = n[o - 1]; o-- > 0; )
    n[o] = c, c = e[c];
  return n;
}
const iu = (t) => t.__isTeleport, Re = Symbol.for("v-fgt"), hr = Symbol.for("v-txt"), Le = Symbol.for("v-cmt"), Mr = Symbol.for("v-stc"), gn = [];
let ze = null;
function oe(t = !1) {
  gn.push(ze = t ? null : []);
}
function lu() {
  gn.pop(), ze = gn[gn.length - 1] || null;
}
let kn = 1;
function xo(t) {
  kn += t;
}
function Ei(t) {
  return t.dynamicChildren = kn > 0 ? ze || Bt : null, lu(), kn > 0 && ze && ze.push(t), t;
}
function be(t, e, n, r, s, o) {
  return Ei(
    we(
      t,
      e,
      n,
      r,
      s,
      o,
      !0
      /* isBlock */
    )
  );
}
function Se(t, e, n, r, s) {
  return Ei(
    he(
      t,
      e,
      n,
      r,
      s,
      !0
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function Qn(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function yt(t, e) {
  return t.type === e.type && t.key === e.key;
}
const dr = "__vInternal", wi = ({ key: t }) => t ?? null, Vn = ({
  ref: t,
  ref_key: e,
  ref_for: n
}) => (typeof t == "number" && (t = "" + t), t != null ? _e(t) || ye(t) || ee(t) ? { i: Ee, r: t, k: e, f: !!n } : t : null);
function we(t, e = null, n = null, r = 0, s = null, o = t === Re ? 0 : 1, c = !1, i = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && wi(e),
    ref: e && Vn(e),
    scopeId: oi,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: Ee
  };
  return i ? (Is(l, n), o & 128 && t.normalize(l)) : n && (l.shapeFlag |= _e(n) ? 8 : 16), kn > 0 && // avoid a block node from tracking itself
  !c && // has current parent block
  ze && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && ze.push(l), l;
}
const he = au;
function au(t, e = null, n = null, r = 0, s = null, o = !1) {
  if ((!t || t === Ha) && (t = Le), Qn(t)) {
    const i = pt(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && Is(i, n), kn > 0 && !o && ze && (i.shapeFlag & 6 ? ze[ze.indexOf(t)] = i : ze.push(i)), i.patchFlag |= -2, i;
  }
  if (xu(t) && (t = t.__vccOpts), e) {
    e = uu(e);
    let { class: i, style: l } = e;
    i && !_e(i) && (e.class = Sn(i)), fe(l) && (Wc(l) && !Z(l) && (l = me({}, l)), e.style = vs(l));
  }
  const c = _e(t) ? 1 : Sa(t) ? 128 : iu(t) ? 64 : fe(t) ? 4 : ee(t) ? 2 : 0;
  return we(
    t,
    e,
    n,
    r,
    s,
    c,
    o,
    !0
  );
}
function uu(t) {
  return t ? Wc(t) || dr in t ? me({}, t) : t : null;
}
function pt(t, e, n = !1) {
  const { props: r, ref: s, patchFlag: o, children: c } = t, i = e ? fu(r || {}, e) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: i,
    key: i && wi(i),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? Z(s) ? s.concat(Vn(e)) : [s, Vn(e)] : Vn(e)
    ) : s,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: c,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== Re ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && pt(t.ssContent),
    ssFallback: t.ssFallback && pt(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
}
function Ns(t = " ", e = 0) {
  return he(hr, null, t, e);
}
function mn(t = "", e = !1) {
  return e ? (oe(), Se(Le, null, t)) : he(Le, null, t);
}
function Ze(t) {
  return t == null || typeof t == "boolean" ? he(Le) : Z(t) ? he(
    Re,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : typeof t == "object" ? ct(t) : he(hr, null, String(t));
}
function ct(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : pt(t);
}
function Is(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null)
    e = null;
  else if (Z(e))
    n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const s = e.default;
      s && (s._c && (s._d = !1), Is(t, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = e._;
      !s && !(dr in e) ? e._ctx = Ee : s === 3 && Ee && (Ee.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else
    ee(e) ? (e = { default: e, _ctx: Ee }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [Ns(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function fu(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const s in r)
      if (s === "class")
        e.class !== r.class && (e.class = Sn([e.class, r.class]));
      else if (s === "style")
        e.style = vs([e.style, r.style]);
      else if (or(s)) {
        const o = e[s], c = r[s];
        c && o !== c && !(Z(o) && o.includes(c)) && (e[s] = o ? [].concat(o, c) : c);
      } else
        s !== "" && (e[s] = r[s]);
  }
  return e;
}
function Ge(t, e, n, r = null) {
  Fe(t, e, 7, [
    n,
    r
  ]);
}
const pu = mi();
let hu = 0;
function du(t, e, n) {
  const r = t.type, s = (e ? e.appContext : t.appContext) || pu, o = {
    uid: hu++,
    vnode: t,
    type: r,
    parent: e,
    appContext: s,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new Ml(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: e ? e.provides : Object.create(s.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: bi(r, s),
    emitsOptions: si(r, s),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ue,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: ue,
    data: ue,
    props: ue,
    attrs: ue,
    slots: ue,
    refs: ue,
    setupState: ue,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return o.ctx = { _: o }, o.root = e ? e.root : o, o.emit = ka.bind(null, o), t.ce && t.ce(o), o;
}
let xe = null;
const gu = () => xe || Ee;
let Fs, Ft, yo = "__VUE_INSTANCE_SETTERS__";
(Ft = Qr()[yo]) || (Ft = Qr()[yo] = []), Ft.push((t) => xe = t), Fs = (t) => {
  Ft.length > 1 ? Ft.forEach((e) => e(t)) : Ft[0](t);
};
const Wt = (t) => {
  Fs(t), t.scope.on();
}, St = () => {
  xe && xe.scope.off(), Fs(null);
};
function Ci(t) {
  return t.vnode.shapeFlag & 4;
}
let En = !1;
function mu(t, e = !1) {
  En = e;
  const { props: n, children: r } = t.vnode, s = Ci(t);
  Qa(t, n, s, e), nu(t, r);
  const o = s ? _u(t, e) : void 0;
  return En = !1, o;
}
function _u(t, e) {
  const n = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = Jc(new Proxy(t.ctx, ja));
  const { setup: r } = n;
  if (r) {
    const s = t.setupContext = r.length > 1 ? vu(t) : null;
    Wt(t), Yt();
    const o = at(
      r,
      t,
      0,
      [t.props, s]
    );
    if (Xt(), St(), Mc(o)) {
      if (o.then(St, St), e)
        return o.then((c) => {
          ko(t, c, e);
        }).catch((c) => {
          ar(c, t, 0);
        });
      t.asyncDep = o;
    } else
      ko(t, o, e);
  } else
    Ai(t, e);
}
function ko(t, e, n) {
  ee(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : fe(e) && (t.setupState = Qc(e)), Ai(t, n);
}
let Eo;
function Ai(t, e, n) {
  const r = t.type;
  if (!t.render) {
    if (!e && Eo && !r.render) {
      const s = r.template || qs(t).template;
      if (s) {
        const { isCustomElement: o, compilerOptions: c } = t.appContext.config, { delimiters: i, compilerOptions: l } = r, a = me(
          me(
            {
              isCustomElement: o,
              delimiters: i
            },
            c
          ),
          l
        );
        r.render = Eo(s, a);
      }
    }
    t.render = r.render || Ue;
  }
  Wt(t), Yt(), Va(t), Xt(), St();
}
function bu(t) {
  return t.attrsProxy || (t.attrsProxy = new Proxy(
    t.attrs,
    {
      get(e, n) {
        return qe(t, "get", "$attrs"), e[n];
      }
    }
  ));
}
function vu(t) {
  const e = (n) => {
    t.exposed = n || {};
  };
  return {
    get attrs() {
      return bu(t);
    },
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function gr(t) {
  if (t.exposed)
    return t.exposeProxy || (t.exposeProxy = new Proxy(Qc(Jc(t.exposed)), {
      get(e, n) {
        if (n in e)
          return e[n];
        if (n in dn)
          return dn[n](t);
      },
      has(e, n) {
        return n in e || n in dn;
      }
    }));
}
function xu(t) {
  return ee(t) && "__vccOpts" in t;
}
const Tt = (t, e) => ma(t, e, En);
function Si(t, e, n) {
  const r = arguments.length;
  return r === 2 ? fe(e) && !Z(e) ? Qn(e) ? he(t, null, [e]) : he(t, e) : he(t, null, e) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && Qn(n) && (n = [n]), he(t, e, n));
}
const yu = Symbol.for("v-scx"), ku = () => jt(yu), Eu = "3.3.4", wu = "http://www.w3.org/2000/svg", kt = typeof document < "u" ? document : null, wo = kt && /* @__PURE__ */ kt.createElement("template"), Cu = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, r) => {
    const s = e ? kt.createElementNS(wu, t) : kt.createElement(t, n ? { is: n } : void 0);
    return t === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple), s;
  },
  createText: (t) => kt.createTextNode(t),
  createComment: (t) => kt.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => kt.querySelector(t),
  setScopeId(t, e) {
    t.setAttribute(e, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(t, e, n, r, s, o) {
    const c = n ? n.previousSibling : e.lastChild;
    if (s && (s === o || s.nextSibling))
      for (; e.insertBefore(s.cloneNode(!0), n), !(s === o || !(s = s.nextSibling)); )
        ;
    else {
      wo.innerHTML = r ? `<svg>${t}</svg>` : t;
      const i = wo.content;
      if (r) {
        const l = i.firstChild;
        for (; l.firstChild; )
          i.appendChild(l.firstChild);
        i.removeChild(l);
      }
      e.insertBefore(i, n);
    }
    return [
      // first
      c ? c.nextSibling : e.firstChild,
      // last
      n ? n.previousSibling : e.lastChild
    ];
  }
};
function Au(t, e, n) {
  const r = t._vtc;
  r && (e = (e ? [e, ...r] : [...r]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
}
function Su(t, e, n) {
  const r = t.style, s = _e(n);
  if (n && !s) {
    if (e && !_e(e))
      for (const o in e)
        n[o] == null && fs(r, o, "");
    for (const o in n)
      fs(r, o, n[o]);
  } else {
    const o = r.display;
    s ? e !== n && (r.cssText = n) : e && t.removeAttribute("style"), "_vod" in t && (r.display = o);
  }
}
const Co = /\s*!important$/;
function fs(t, e, n) {
  if (Z(n))
    n.forEach((r) => fs(t, e, r));
  else if (n == null && (n = ""), e.startsWith("--"))
    t.setProperty(e, n);
  else {
    const r = Du(t, e);
    Co.test(n) ? t.setProperty(
      Mt(r),
      n.replace(Co, ""),
      "important"
    ) : t[r] = n;
  }
}
const Ao = ["Webkit", "Moz", "ms"], Nr = {};
function Du(t, e) {
  const n = Nr[e];
  if (n)
    return n;
  let r = Gt(e);
  if (r !== "filter" && r in t)
    return Nr[e] = r;
  r = Fc(r);
  for (let s = 0; s < Ao.length; s++) {
    const o = Ao[s] + r;
    if (o in t)
      return Nr[e] = o;
  }
  return e;
}
const So = "http://www.w3.org/1999/xlink";
function Tu(t, e, n, r, s) {
  if (r && e.startsWith("xlink:"))
    n == null ? t.removeAttributeNS(So, e.slice(6, e.length)) : t.setAttributeNS(So, e, n);
  else {
    const o = ql(e);
    n == null || o && !Lc(n) ? t.removeAttribute(e) : t.setAttribute(e, o ? "" : n);
  }
}
function Ru(t, e, n, r, s, o, c) {
  if (e === "innerHTML" || e === "textContent") {
    r && c(r, s, o), t[e] = n ?? "";
    return;
  }
  const i = t.tagName;
  if (e === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    t._value = n;
    const a = i === "OPTION" ? t.getAttribute("value") : t.value, u = n ?? "";
    a !== u && (t.value = u), n == null && t.removeAttribute(e);
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const a = typeof t[e];
    a === "boolean" ? n = Lc(n) : n == null && a === "string" ? (n = "", l = !0) : a === "number" && (n = 0, l = !0);
  }
  try {
    t[e] = n;
  } catch {
  }
  l && t.removeAttribute(e);
}
function Pt(t, e, n, r) {
  t.addEventListener(e, n, r);
}
function qu(t, e, n, r) {
  t.removeEventListener(e, n, r);
}
function Mu(t, e, n, r, s = null) {
  const o = t._vei || (t._vei = {}), c = o[e];
  if (r && c)
    c.value = r;
  else {
    const [i, l] = Nu(e);
    if (r) {
      const a = o[e] = Lu(r, s);
      Pt(t, i, a, l);
    } else
      c && (qu(t, i, c, l), o[e] = void 0);
  }
}
const Do = /(?:Once|Passive|Capture)$/;
function Nu(t) {
  let e;
  if (Do.test(t)) {
    e = {};
    let r;
    for (; r = t.match(Do); )
      t = t.slice(0, t.length - r[0].length), e[r[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : Mt(t.slice(2)), e];
}
let Ir = 0;
const Iu = /* @__PURE__ */ Promise.resolve(), Fu = () => Ir || (Iu.then(() => Ir = 0), Ir = Date.now());
function Lu(t, e) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    Fe(
      Ou(r, n.value),
      e,
      5,
      [r]
    );
  };
  return n.value = t, n.attached = Fu(), n;
}
function Ou(t, e) {
  if (Z(e)) {
    const n = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      n.call(t), t._stopped = !0;
    }, e.map((r) => (s) => !s._stopped && r && r(s));
  } else
    return e;
}
const To = /^on[a-z]/, Pu = (t, e, n, r, s = !1, o, c, i, l) => {
  e === "class" ? Au(t, r, s) : e === "style" ? Su(t, n, r) : or(e) ? gs(e) || Mu(t, e, n, r, c) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : Bu(t, e, r, s)) ? Ru(
    t,
    e,
    r,
    o,
    c,
    i,
    l
  ) : (e === "true-value" ? t._trueValue = r : e === "false-value" && (t._falseValue = r), Tu(t, e, r, s));
};
function Bu(t, e, n, r) {
  return r ? !!(e === "innerHTML" || e === "textContent" || e in t && To.test(e) && ee(n)) : e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA" || To.test(e) && _e(n) ? !1 : e in t;
}
const st = "transition", on = "animation", er = (t, { slots: e }) => Si(Ma, $u(t), e);
er.displayName = "Transition";
const Di = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
er.props = /* @__PURE__ */ me(
  {},
  ai,
  Di
);
const _t = (t, e = []) => {
  Z(t) ? t.forEach((n) => n(...e)) : t && t(...e);
}, Ro = (t) => t ? Z(t) ? t.some((e) => e.length > 1) : t.length > 1 : !1;
function $u(t) {
  const e = {};
  for (const B in t)
    B in Di || (e[B] = t[B]);
  if (t.css === !1)
    return e;
  const {
    name: n = "v",
    type: r,
    duration: s,
    enterFromClass: o = `${n}-enter-from`,
    enterActiveClass: c = `${n}-enter-active`,
    enterToClass: i = `${n}-enter-to`,
    appearFromClass: l = o,
    appearActiveClass: a = c,
    appearToClass: u = i,
    leaveFromClass: f = `${n}-leave-from`,
    leaveActiveClass: p = `${n}-leave-active`,
    leaveToClass: d = `${n}-leave-to`
  } = t, k = zu(s), b = k && k[0], I = k && k[1], {
    onBeforeEnter: T,
    onEnter: C,
    onEnterCancelled: N,
    onLeave: A,
    onLeaveCancelled: j,
    onBeforeAppear: q = T,
    onAppear: W = C,
    onAppearCancelled: $ = N
  } = e, X = (B, re, D) => {
    bt(B, re ? u : i), bt(B, re ? a : c), D && D();
  }, z = (B, re) => {
    B._isLeaving = !1, bt(B, f), bt(B, d), bt(B, p), re && re();
  }, J = (B) => (re, D) => {
    const ne = B ? W : C, V = () => X(re, B, D);
    _t(ne, [re, V]), qo(() => {
      bt(re, B ? l : o), ot(re, B ? u : i), Ro(ne) || Mo(re, r, b, V);
    });
  };
  return me(e, {
    onBeforeEnter(B) {
      _t(T, [B]), ot(B, o), ot(B, c);
    },
    onBeforeAppear(B) {
      _t(q, [B]), ot(B, l), ot(B, a);
    },
    onEnter: J(!1),
    onAppear: J(!0),
    onLeave(B, re) {
      B._isLeaving = !0;
      const D = () => z(B, re);
      ot(B, f), ju(), ot(B, p), qo(() => {
        B._isLeaving && (bt(B, f), ot(B, d), Ro(A) || Mo(B, r, I, D));
      }), _t(A, [B, D]);
    },
    onEnterCancelled(B) {
      X(B, !1), _t(N, [B]);
    },
    onAppearCancelled(B) {
      X(B, !0), _t($, [B]);
    },
    onLeaveCancelled(B) {
      z(B), _t(j, [B]);
    }
  });
}
function zu(t) {
  if (t == null)
    return null;
  if (fe(t))
    return [Fr(t.enter), Fr(t.leave)];
  {
    const e = Fr(t);
    return [e, e];
  }
}
function Fr(t) {
  return Cl(t);
}
function ot(t, e) {
  e.split(/\s+/).forEach((n) => n && t.classList.add(n)), (t._vtc || (t._vtc = /* @__PURE__ */ new Set())).add(e);
}
function bt(t, e) {
  e.split(/\s+/).forEach((r) => r && t.classList.remove(r));
  const { _vtc: n } = t;
  n && (n.delete(e), n.size || (t._vtc = void 0));
}
function qo(t) {
  requestAnimationFrame(() => {
    requestAnimationFrame(t);
  });
}
let Uu = 0;
function Mo(t, e, n, r) {
  const s = t._endId = ++Uu, o = () => {
    s === t._endId && r();
  };
  if (n)
    return setTimeout(o, n);
  const { type: c, timeout: i, propCount: l } = Hu(t, e);
  if (!c)
    return r();
  const a = c + "end";
  let u = 0;
  const f = () => {
    t.removeEventListener(a, p), o();
  }, p = (d) => {
    d.target === t && ++u >= l && f();
  };
  setTimeout(() => {
    u < l && f();
  }, i + 1), t.addEventListener(a, p);
}
function Hu(t, e) {
  const n = window.getComputedStyle(t), r = (k) => (n[k] || "").split(", "), s = r(`${st}Delay`), o = r(`${st}Duration`), c = No(s, o), i = r(`${on}Delay`), l = r(`${on}Duration`), a = No(i, l);
  let u = null, f = 0, p = 0;
  e === st ? c > 0 && (u = st, f = c, p = o.length) : e === on ? a > 0 && (u = on, f = a, p = l.length) : (f = Math.max(c, a), u = f > 0 ? c > a ? st : on : null, p = u ? u === st ? o.length : l.length : 0);
  const d = u === st && /\b(transform|all)(,|$)/.test(
    r(`${st}Property`).toString()
  );
  return {
    type: u,
    timeout: f,
    propCount: p,
    hasTransform: d
  };
}
function No(t, e) {
  for (; t.length < e.length; )
    t = t.concat(t);
  return Math.max(...e.map((n, r) => Io(n) + Io(t[r])));
}
function Io(t) {
  return Number(t.slice(0, -1).replace(",", ".")) * 1e3;
}
function ju() {
  return document.body.offsetHeight;
}
const Fo = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return Z(e) ? (n) => jn(e, n) : e;
};
function Vu(t) {
  t.target.composing = !0;
}
function Lo(t) {
  const e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
const Gu = {
  created(t, { modifiers: { lazy: e, trim: n, number: r } }, s) {
    t._assign = Fo(s);
    const o = r || s.props && s.props.type === "number";
    Pt(t, e ? "change" : "input", (c) => {
      if (c.target.composing)
        return;
      let i = t.value;
      n && (i = i.trim()), o && (i = Xr(i)), t._assign(i);
    }), n && Pt(t, "change", () => {
      t.value = t.value.trim();
    }), e || (Pt(t, "compositionstart", Vu), Pt(t, "compositionend", Lo), Pt(t, "change", Lo));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(t, { value: e }) {
    t.value = e ?? "";
  },
  beforeUpdate(t, { value: e, modifiers: { lazy: n, trim: r, number: s } }, o) {
    if (t._assign = Fo(o), t.composing || document.activeElement === t && t.type !== "range" && (n || r && t.value.trim() === e || (s || t.type === "number") && Xr(t.value) === e))
      return;
    const c = e ?? "";
    t.value !== c && (t.value = c);
  }
}, Zu = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Ku = (t, e) => (n) => {
  if (!("key" in n))
    return;
  const r = Mt(n.key);
  if (e.some((s) => s === r || Zu[s] === r))
    return t(n);
}, Wu = {
  beforeMount(t, { value: e }, { transition: n }) {
    t._vod = t.style.display === "none" ? "" : t.style.display, n && e ? n.beforeEnter(t) : cn(t, e);
  },
  mounted(t, { value: e }, { transition: n }) {
    n && e && n.enter(t);
  },
  updated(t, { value: e, oldValue: n }, { transition: r }) {
    !e != !n && (r ? e ? (r.beforeEnter(t), cn(t, !0), r.enter(t)) : r.leave(t, () => {
      cn(t, !1);
    }) : cn(t, e));
  },
  beforeUnmount(t, { value: e }) {
    cn(t, e);
  }
};
function cn(t, e) {
  t.style.display = e ? t._vod : "none";
}
const Ju = /* @__PURE__ */ me({ patchProp: Pu }, Cu);
let Oo;
function Yu() {
  return Oo || (Oo = su(Ju));
}
const Xu = (...t) => {
  const e = Yu().createApp(...t), { mount: n } = e;
  return e.mount = (r) => {
    const s = Qu(r);
    if (!s)
      return;
    const o = e._component;
    !ee(o) && !o.render && !o.template && (o.template = s.innerHTML), s.innerHTML = "";
    const c = n(s, !1, s instanceof SVGElement);
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), c;
  }, e;
};
function Qu(t) {
  return _e(t) ? document.querySelector(t) : t;
}
const Ti = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, s] of e)
    n[r] = s;
  return n;
}, ef = {}, tf = { class: "chat-button" };
function nf(t, e) {
  return oe(), be("button", tf, [
    hn(t.$slots, "default")
  ]);
}
const rf = /* @__PURE__ */ Ti(ef, [["render", nf]]);
function sf() {
  const t = /* @__PURE__ */ new Map();
  function e(s, o) {
    const c = t.get(s);
    c && c.splice(c.indexOf(o) >>> 0, 1);
  }
  function n(s, o) {
    let c = t.get(s);
    return c ? c.push(o) : c = [o], t.set(s, c), () => e(s, o);
  }
  function r(s, o) {
    const c = t.get(s);
    c && c.slice().forEach(async (i) => {
      await i(o);
    });
  }
  return {
    on: n,
    off: e,
    emit: r
  };
}
function of(t) {
  if (!document.querySelector(t)) {
    const n = document.createElement("div");
    t.startsWith("#") && (n.id = t.replace("#", "")), t.startsWith(".") && n.classList.add(t.replace(".", "")), document.body.appendChild(n);
  }
}
const Rt = sf(), cf = { class: "chat-layout" }, lf = {
  key: 0,
  class: "chat-header"
}, af = {
  key: 2,
  class: "chat-footer"
}, uf = /* @__PURE__ */ He({
  __name: "Layout",
  setup(t) {
    const e = Ut(null);
    function n() {
      const r = e.value;
      r && (r.scrollTop = r.scrollHeight);
    }
    return Dn(() => {
      Rt.on("scrollToBottom", n), window.addEventListener("resize", n);
    }), Rs(() => {
      Rt.off("scrollToBottom", n), window.removeEventListener("resize", n);
    }), (r, s) => (oe(), be("main", cf, [
      r.$slots.header ? (oe(), be("div", lf, [
        hn(r.$slots, "header")
      ])) : mn("", !0),
      r.$slots.default ? (oe(), be("div", {
        key: 1,
        class: "chat-body",
        ref_key: "chatBodyRef",
        ref: e
      }, [
        hn(r.$slots, "default")
      ], 512)) : mn("", !0),
      r.$slots.footer ? (oe(), be("div", af, [
        hn(r.$slots, "footer")
      ])) : mn("", !0)
    ]));
  }
});
const ln = {
  webhookUrl: "http://localhost:5678",
  webhookConfig: {
    method: "POST",
    headers: {}
  },
  target: "#n8n-chat",
  mode: "window",
  loadPreviousSession: !0,
  chatInputKey: "chatInput",
  chatSessionKey: "sessionId",
  defaultLanguage: "en",
  showWelcomeScreen: !1,
  initialMessages: ["Hi there! ðŸ‘‹", "My name is Nathan. How can I assist you today?"],
  i18n: {
    en: {
      title: "Hi there! ðŸ‘‹",
      subtitle: "Start a chat. We're here to help you 24/7.",
      footer: "",
      getStarted: "New Conversation",
      inputPlaceholder: "Type your question.."
    }
  },
  theme: {}
}, ff = "#n8n-chat", pf = "n8n-chat", Po = `${pf}/sessionId`, Ri = "Chat", qi = "ChatOptions";
function Ls() {
  return jt(Ri);
}
function Os() {
  return {
    options: jt(qi)
  };
}
function mr() {
  const { options: t } = Os(), e = (t == null ? void 0 : t.defaultLanguage) ?? "en";
  function n(s) {
    var o, c;
    return ((c = (o = t == null ? void 0 : t.i18n) == null ? void 0 : o[e]) == null ? void 0 : c[s]) ?? s;
  }
  function r(s) {
    var o, c;
    return !!((c = (o = t == null ? void 0 : t.i18n) == null ? void 0 : o[e]) != null && c[s]);
  }
  return { t: n, te: r };
}
const hf = { class: "chat-get-started" }, df = /* @__PURE__ */ He({
  __name: "GetStarted",
  setup(t) {
    const { t: e } = mr();
    return (n, r) => (oe(), be("div", hf, [
      he(rf, {
        onClick: r[0] || (r[0] = (s) => n.$emit("click:button"))
      }, {
        default: ut(() => [
          Ns(Zn(ge(e)("getStarted")), 1)
        ]),
        _: 1
      })
    ]));
  }
});
const gf = {}, mf = { class: "chat-powered-by" }, _f = /* @__PURE__ */ we("a", { href: "#" }, "Pandawatools", -1);
function bf(t, e) {
  return oe(), be("div", mf, [
    Ns(" Powered by "),
    _f
  ]);
}
const vf = /* @__PURE__ */ Ti(gf, [["render", bf]]), xf = { class: "chat-get-started-footer" }, yf = { key: 0 }, kf = /* @__PURE__ */ He({
  __name: "GetStartedFooter",
  setup(t) {
    const { t: e, te: n } = mr();
    return (r, s) => (oe(), be("div", xf, [
      ge(n)("footer") ? (oe(), be("div", yf, Zn(ge(e)("footer")), 1)) : mn("", !0),
      he(vf)
    ]));
  }
});
function Mi(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Ef(t) {
  if (t.__esModule)
    return t;
  var e = t.default;
  if (typeof e == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    n.prototype = e.prototype;
  } else
    n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(t).forEach(function(r) {
    var s = Object.getOwnPropertyDescriptor(t, r);
    Object.defineProperty(n, r, s.get ? s : {
      enumerable: !0,
      get: function() {
        return t[r];
      }
    });
  }), n;
}
var le = {};
const wf = "Ã", Cf = "Ã¡", Af = "Ä‚", Sf = "Äƒ", Df = "âˆ¾", Tf = "âˆ¿", Rf = "âˆ¾Ì³", qf = "Ã‚", Mf = "Ã¢", Nf = "Â´", If = "Ð", Ff = "Ð°", Lf = "Ã†", Of = "Ã¦", Pf = "â¡", Bf = "ð”„", $f = "ð”ž", zf = "Ã€", Uf = "Ã ", Hf = "â„µ", jf = "â„µ", Vf = "Î‘", Gf = "Î±", Zf = "Ä€", Kf = "Ä", Wf = "â¨¿", Jf = "&", Yf = "&", Xf = "â©•", Qf = "â©“", ep = "âˆ§", tp = "â©œ", np = "â©˜", rp = "â©š", sp = "âˆ ", op = "â¦¤", cp = "âˆ ", ip = "â¦¨", lp = "â¦©", ap = "â¦ª", up = "â¦«", fp = "â¦¬", pp = "â¦­", hp = "â¦®", dp = "â¦¯", gp = "âˆ¡", mp = "âˆŸ", _p = "âŠ¾", bp = "â¦", vp = "âˆ¢", xp = "Ã…", yp = "â¼", kp = "Ä„", Ep = "Ä…", wp = "ð”¸", Cp = "ð•’", Ap = "â©¯", Sp = "â‰ˆ", Dp = "â©°", Tp = "â‰Š", Rp = "â‰‹", qp = "'", Mp = "â¡", Np = "â‰ˆ", Ip = "â‰Š", Fp = "Ã…", Lp = "Ã¥", Op = "ð’œ", Pp = "ð’¶", Bp = "â‰”", $p = "*", zp = "â‰ˆ", Up = "â‰", Hp = "Ãƒ", jp = "Ã£", Vp = "Ã„", Gp = "Ã¤", Zp = "âˆ³", Kp = "â¨‘", Wp = "â‰Œ", Jp = "Ï¶", Yp = "â€µ", Xp = "âˆ½", Qp = "â‹", eh = "âˆ–", th = "â«§", nh = "âŠ½", rh = "âŒ…", sh = "âŒ†", oh = "âŒ…", ch = "âŽµ", ih = "âŽ¶", lh = "â‰Œ", ah = "Ð‘", uh = "Ð±", fh = "â€ž", ph = "âˆµ", hh = "âˆµ", dh = "âˆµ", gh = "â¦°", mh = "Ï¶", _h = "â„¬", bh = "â„¬", vh = "Î’", xh = "Î²", yh = "â„¶", kh = "â‰¬", Eh = "ð”…", wh = "ð”Ÿ", Ch = "â‹‚", Ah = "â—¯", Sh = "â‹ƒ", Dh = "â¨€", Th = "â¨", Rh = "â¨‚", qh = "â¨†", Mh = "â˜…", Nh = "â–½", Ih = "â–³", Fh = "â¨„", Lh = "â‹", Oh = "â‹€", Ph = "â¤", Bh = "â§«", $h = "â–ª", zh = "â–´", Uh = "â–¾", Hh = "â—‚", jh = "â–¸", Vh = "â£", Gh = "â–’", Zh = "â–‘", Kh = "â–“", Wh = "â–ˆ", Jh = "=âƒ¥", Yh = "â‰¡âƒ¥", Xh = "â«­", Qh = "âŒ", ed = "ð”¹", td = "ð•“", nd = "âŠ¥", rd = "âŠ¥", sd = "â‹ˆ", od = "â§‰", cd = "â”", id = "â••", ld = "â•–", ad = "â•—", ud = "â”Œ", fd = "â•’", pd = "â•“", hd = "â•”", dd = "â”€", gd = "â•", md = "â”¬", _d = "â•¤", bd = "â•¥", vd = "â•¦", xd = "â”´", yd = "â•§", kd = "â•¨", Ed = "â•©", wd = "âŠŸ", Cd = "âŠž", Ad = "âŠ ", Sd = "â”˜", Dd = "â•›", Td = "â•œ", Rd = "â•", qd = "â””", Md = "â•˜", Nd = "â•™", Id = "â•š", Fd = "â”‚", Ld = "â•‘", Od = "â”¼", Pd = "â•ª", Bd = "â•«", $d = "â•¬", zd = "â”¤", Ud = "â•¡", Hd = "â•¢", jd = "â•£", Vd = "â”œ", Gd = "â•ž", Zd = "â•Ÿ", Kd = "â• ", Wd = "â€µ", Jd = "Ë˜", Yd = "Ë˜", Xd = "Â¦", Qd = "ð’·", eg = "â„¬", tg = "â", ng = "âˆ½", rg = "â‹", sg = "â§…", og = "\\", cg = "âŸˆ", ig = "â€¢", lg = "â€¢", ag = "â‰Ž", ug = "âª®", fg = "â‰", pg = "â‰Ž", hg = "â‰", dg = "Ä†", gg = "Ä‡", mg = "â©„", _g = "â©‰", bg = "â©‹", vg = "âˆ©", xg = "â‹’", yg = "â©‡", kg = "â©€", Eg = "â……", wg = "âˆ©ï¸€", Cg = "â", Ag = "Ë‡", Sg = "â„­", Dg = "â©", Tg = "ÄŒ", Rg = "Ä", qg = "Ã‡", Mg = "Ã§", Ng = "Äˆ", Ig = "Ä‰", Fg = "âˆ°", Lg = "â©Œ", Og = "â©", Pg = "ÄŠ", Bg = "Ä‹", $g = "Â¸", zg = "Â¸", Ug = "â¦²", Hg = "Â¢", jg = "Â·", Vg = "Â·", Gg = "ð” ", Zg = "â„­", Kg = "Ð§", Wg = "Ñ‡", Jg = "âœ“", Yg = "âœ“", Xg = "Î§", Qg = "Ï‡", em = "Ë†", tm = "â‰—", nm = "â†º", rm = "â†»", sm = "âŠ›", om = "âŠš", cm = "âŠ", im = "âŠ™", lm = "Â®", am = "â“ˆ", um = "âŠ–", fm = "âŠ•", pm = "âŠ—", hm = "â—‹", dm = "â§ƒ", gm = "â‰—", mm = "â¨", _m = "â«¯", bm = "â§‚", vm = "âˆ²", xm = "â€", ym = "â€™", km = "â™£", Em = "â™£", wm = ":", Cm = "âˆ·", Am = "â©´", Sm = "â‰”", Dm = "â‰”", Tm = ",", Rm = "@", qm = "âˆ", Mm = "âˆ˜", Nm = "âˆ", Im = "â„‚", Fm = "â‰…", Lm = "â©­", Om = "â‰¡", Pm = "âˆ®", Bm = "âˆ¯", $m = "âˆ®", zm = "ð•”", Um = "â„‚", Hm = "âˆ", jm = "âˆ", Vm = "Â©", Gm = "Â©", Zm = "â„—", Km = "âˆ³", Wm = "â†µ", Jm = "âœ—", Ym = "â¨¯", Xm = "ð’ž", Qm = "ð’¸", e_ = "â«", t_ = "â«‘", n_ = "â«", r_ = "â«’", s_ = "â‹¯", o_ = "â¤¸", c_ = "â¤µ", i_ = "â‹ž", l_ = "â‹Ÿ", a_ = "â†¶", u_ = "â¤½", f_ = "â©ˆ", p_ = "â©†", h_ = "â‰", d_ = "âˆª", g_ = "â‹“", m_ = "â©Š", __ = "âŠ", b_ = "â©…", v_ = "âˆªï¸€", x_ = "â†·", y_ = "â¤¼", k_ = "â‹ž", E_ = "â‹Ÿ", w_ = "â‹Ž", C_ = "â‹", A_ = "Â¤", S_ = "â†¶", D_ = "â†·", T_ = "â‹Ž", R_ = "â‹", q_ = "âˆ²", M_ = "âˆ±", N_ = "âŒ­", I_ = "â€ ", F_ = "â€¡", L_ = "â„¸", O_ = "â†“", P_ = "â†¡", B_ = "â‡“", $_ = "â€", z_ = "â«¤", U_ = "âŠ£", H_ = "â¤", j_ = "Ë", V_ = "ÄŽ", G_ = "Ä", Z_ = "Ð”", K_ = "Ð´", W_ = "â€¡", J_ = "â‡Š", Y_ = "â……", X_ = "â…†", Q_ = "â¤‘", eb = "â©·", tb = "Â°", nb = "âˆ‡", rb = "Î”", sb = "Î´", ob = "â¦±", cb = "â¥¿", ib = "ð”‡", lb = "ð”¡", ab = "â¥¥", ub = "â‡ƒ", fb = "â‡‚", pb = "Â´", hb = "Ë™", db = "Ë", gb = "`", mb = "Ëœ", _b = "â‹„", bb = "â‹„", vb = "â‹„", xb = "â™¦", yb = "â™¦", kb = "Â¨", Eb = "â…†", wb = "Ï", Cb = "â‹²", Ab = "Ã·", Sb = "Ã·", Db = "â‹‡", Tb = "â‹‡", Rb = "Ð‚", qb = "Ñ’", Mb = "âŒž", Nb = "âŒ", Ib = "$", Fb = "ð”»", Lb = "ð••", Ob = "Â¨", Pb = "Ë™", Bb = "âƒœ", $b = "â‰", zb = "â‰‘", Ub = "â‰", Hb = "âˆ¸", jb = "âˆ”", Vb = "âŠ¡", Gb = "âŒ†", Zb = "âˆ¯", Kb = "Â¨", Wb = "â‡“", Jb = "â‡", Yb = "â‡”", Xb = "â«¤", Qb = "âŸ¸", e0 = "âŸº", t0 = "âŸ¹", n0 = "â‡’", r0 = "âŠ¨", s0 = "â‡‘", o0 = "â‡•", c0 = "âˆ¥", i0 = "â¤“", l0 = "â†“", a0 = "â†“", u0 = "â‡“", f0 = "â‡µ", p0 = "Ì‘", h0 = "â‡Š", d0 = "â‡ƒ", g0 = "â‡‚", m0 = "â¥", _0 = "â¥ž", b0 = "â¥–", v0 = "â†½", x0 = "â¥Ÿ", y0 = "â¥—", k0 = "â‡", E0 = "â†§", w0 = "âŠ¤", C0 = "â¤", A0 = "âŒŸ", S0 = "âŒŒ", D0 = "ð’Ÿ", T0 = "ð’¹", R0 = "Ð…", q0 = "Ñ•", M0 = "â§¶", N0 = "Ä", I0 = "Ä‘", F0 = "â‹±", L0 = "â–¿", O0 = "â–¾", P0 = "â‡µ", B0 = "â¥¯", $0 = "â¦¦", z0 = "Ð", U0 = "ÑŸ", H0 = "âŸ¿", j0 = "Ã‰", V0 = "Ã©", G0 = "â©®", Z0 = "Äš", K0 = "Ä›", W0 = "ÃŠ", J0 = "Ãª", Y0 = "â‰–", X0 = "â‰•", Q0 = "Ð­", ev = "Ñ", tv = "â©·", nv = "Ä–", rv = "Ä—", sv = "â‰‘", ov = "â…‡", cv = "â‰’", iv = "ð”ˆ", lv = "ð”¢", av = "âªš", uv = "Ãˆ", fv = "Ã¨", pv = "âª–", hv = "âª˜", dv = "âª™", gv = "âˆˆ", mv = "â§", _v = "â„“", bv = "âª•", vv = "âª—", xv = "Ä’", yv = "Ä“", kv = "âˆ…", Ev = "âˆ…", wv = "â—»", Cv = "âˆ…", Av = "â–«", Sv = "â€„", Dv = "â€…", Tv = "â€ƒ", Rv = "ÅŠ", qv = "Å‹", Mv = "â€‚", Nv = "Ä˜", Iv = "Ä™", Fv = "ð”¼", Lv = "ð•–", Ov = "â‹•", Pv = "â§£", Bv = "â©±", $v = "Îµ", zv = "Î•", Uv = "Îµ", Hv = "Ïµ", jv = "â‰–", Vv = "â‰•", Gv = "â‰‚", Zv = "âª–", Kv = "âª•", Wv = "â©µ", Jv = "=", Yv = "â‰‚", Xv = "â‰Ÿ", Qv = "â‡Œ", ex = "â‰¡", tx = "â©¸", nx = "â§¥", rx = "â¥±", sx = "â‰“", ox = "â„¯", cx = "â„°", ix = "â‰", lx = "â©³", ax = "â‰‚", ux = "Î—", fx = "Î·", px = "Ã", hx = "Ã°", dx = "Ã‹", gx = "Ã«", mx = "â‚¬", _x = "!", bx = "âˆƒ", vx = "âˆƒ", xx = "â„°", yx = "â…‡", kx = "â…‡", Ex = "â‰’", wx = "Ð¤", Cx = "Ñ„", Ax = "â™€", Sx = "ï¬ƒ", Dx = "ï¬€", Tx = "ï¬„", Rx = "ð”‰", qx = "ð”£", Mx = "ï¬", Nx = "â—¼", Ix = "â–ª", Fx = "fj", Lx = "â™­", Ox = "ï¬‚", Px = "â–±", Bx = "Æ’", $x = "ð”½", zx = "ð•—", Ux = "âˆ€", Hx = "âˆ€", jx = "â‹”", Vx = "â«™", Gx = "â„±", Zx = "â¨", Kx = "Â½", Wx = "â…“", Jx = "Â¼", Yx = "â…•", Xx = "â…™", Qx = "â…›", ey = "â…”", ty = "â…–", ny = "Â¾", ry = "â…—", sy = "â…œ", oy = "â…˜", cy = "â…š", iy = "â…", ly = "â…ž", ay = "â„", uy = "âŒ¢", fy = "ð’»", py = "â„±", hy = "Çµ", dy = "Î“", gy = "Î³", my = "Ïœ", _y = "Ï", by = "âª†", vy = "Äž", xy = "ÄŸ", yy = "Ä¢", ky = "Äœ", Ey = "Ä", wy = "Ð“", Cy = "Ð³", Ay = "Ä ", Sy = "Ä¡", Dy = "â‰¥", Ty = "â‰§", Ry = "âªŒ", qy = "â‹›", My = "â‰¥", Ny = "â‰§", Iy = "â©¾", Fy = "âª©", Ly = "â©¾", Oy = "âª€", Py = "âª‚", By = "âª„", $y = "â‹›ï¸€", zy = "âª”", Uy = "ð”Š", Hy = "ð”¤", jy = "â‰«", Vy = "â‹™", Gy = "â‹™", Zy = "â„·", Ky = "Ðƒ", Wy = "Ñ“", Jy = "âª¥", Yy = "â‰·", Xy = "âª’", Qy = "âª¤", ek = "âªŠ", tk = "âªŠ", nk = "âªˆ", rk = "â‰©", sk = "âªˆ", ok = "â‰©", ck = "â‹§", ik = "ð”¾", lk = "ð•˜", ak = "`", uk = "â‰¥", fk = "â‹›", pk = "â‰§", hk = "âª¢", dk = "â‰·", gk = "â©¾", mk = "â‰³", _k = "ð’¢", bk = "â„Š", vk = "â‰³", xk = "âªŽ", yk = "âª", kk = "âª§", Ek = "â©º", wk = ">", Ck = ">", Ak = "â‰«", Sk = "â‹—", Dk = "â¦•", Tk = "â©¼", Rk = "âª†", qk = "â¥¸", Mk = "â‹—", Nk = "â‹›", Ik = "âªŒ", Fk = "â‰·", Lk = "â‰³", Ok = "â‰©ï¸€", Pk = "â‰©ï¸€", Bk = "Ë‡", $k = "â€Š", zk = "Â½", Uk = "â„‹", Hk = "Ðª", jk = "ÑŠ", Vk = "â¥ˆ", Gk = "â†”", Zk = "â‡”", Kk = "â†­", Wk = "^", Jk = "â„", Yk = "Ä¤", Xk = "Ä¥", Qk = "â™¥", eE = "â™¥", tE = "â€¦", nE = "âŠ¹", rE = "ð”¥", sE = "â„Œ", oE = "â„‹", cE = "â¤¥", iE = "â¤¦", lE = "â‡¿", aE = "âˆ»", uE = "â†©", fE = "â†ª", pE = "ð•™", hE = "â„", dE = "â€•", gE = "â”€", mE = "ð’½", _E = "â„‹", bE = "â„", vE = "Ä¦", xE = "Ä§", yE = "â‰Ž", kE = "â‰", EE = "âƒ", wE = "â€", CE = "Ã", AE = "Ã­", SE = "â£", DE = "ÃŽ", TE = "Ã®", RE = "Ð˜", qE = "Ð¸", ME = "Ä°", NE = "Ð•", IE = "Ðµ", FE = "Â¡", LE = "â‡”", OE = "ð”¦", PE = "â„‘", BE = "ÃŒ", $E = "Ã¬", zE = "â…ˆ", UE = "â¨Œ", HE = "âˆ­", jE = "â§œ", VE = "â„©", GE = "Ä²", ZE = "Ä³", KE = "Äª", WE = "Ä«", JE = "â„‘", YE = "â…ˆ", XE = "â„", QE = "â„‘", ew = "Ä±", tw = "â„‘", nw = "âŠ·", rw = "Æµ", sw = "â‡’", ow = "â„…", cw = "âˆž", iw = "â§", lw = "Ä±", aw = "âŠº", uw = "âˆ«", fw = "âˆ¬", pw = "â„¤", hw = "âˆ«", dw = "âŠº", gw = "â‹‚", mw = "â¨—", _w = "â¨¼", bw = "â£", vw = "â¢", xw = "Ð", yw = "Ñ‘", kw = "Ä®", Ew = "Ä¯", ww = "ð•€", Cw = "ð•š", Aw = "Î™", Sw = "Î¹", Dw = "â¨¼", Tw = "Â¿", Rw = "ð’¾", qw = "â„", Mw = "âˆˆ", Nw = "â‹µ", Iw = "â‹¹", Fw = "â‹´", Lw = "â‹³", Ow = "âˆˆ", Pw = "â¢", Bw = "Ä¨", $w = "Ä©", zw = "Ð†", Uw = "Ñ–", Hw = "Ã", jw = "Ã¯", Vw = "Ä´", Gw = "Äµ", Zw = "Ð™", Kw = "Ð¹", Ww = "ð”", Jw = "ð”§", Yw = "È·", Xw = "ð•", Qw = "ð•›", eC = "ð’¥", tC = "ð’¿", nC = "Ðˆ", rC = "Ñ˜", sC = "Ð„", oC = "Ñ”", cC = "Îš", iC = "Îº", lC = "Ï°", aC = "Ä¶", uC = "Ä·", fC = "Ðš", pC = "Ðº", hC = "ð”Ž", dC = "ð”¨", gC = "Ä¸", mC = "Ð¥", _C = "Ñ…", bC = "ÐŒ", vC = "Ñœ", xC = "ð•‚", yC = "ð•œ", kC = "ð’¦", EC = "ð“€", wC = "â‡š", CC = "Ä¹", AC = "Äº", SC = "â¦´", DC = "â„’", TC = "Î›", RC = "Î»", qC = "âŸ¨", MC = "âŸª", NC = "â¦‘", IC = "âŸ¨", FC = "âª…", LC = "â„’", OC = "Â«", PC = "â‡¤", BC = "â¤Ÿ", $C = "â†", zC = "â†ž", UC = "â‡", HC = "â¤", jC = "â†©", VC = "â†«", GC = "â¤¹", ZC = "â¥³", KC = "â†¢", WC = "â¤™", JC = "â¤›", YC = "âª«", XC = "âª­", QC = "âª­ï¸€", eA = "â¤Œ", tA = "â¤Ž", nA = "â²", rA = "{", sA = "[", oA = "â¦‹", cA = "â¦", iA = "â¦", lA = "Ä½", aA = "Ä¾", uA = "Ä»", fA = "Ä¼", pA = "âŒˆ", hA = "{", dA = "Ð›", gA = "Ð»", mA = "â¤¶", _A = "â€œ", bA = "â€ž", vA = "â¥§", xA = "â¥‹", yA = "â†²", kA = "â‰¤", EA = "â‰¦", wA = "âŸ¨", CA = "â‡¤", AA = "â†", SA = "â†", DA = "â‡", TA = "â‡†", RA = "â†¢", qA = "âŒˆ", MA = "âŸ¦", NA = "â¥¡", IA = "â¥™", FA = "â‡ƒ", LA = "âŒŠ", OA = "â†½", PA = "â†¼", BA = "â‡‡", $A = "â†”", zA = "â†”", UA = "â‡”", HA = "â‡†", jA = "â‡‹", VA = "â†­", GA = "â¥Ž", ZA = "â†¤", KA = "âŠ£", WA = "â¥š", JA = "â‹‹", YA = "â§", XA = "âŠ²", QA = "âŠ´", e1 = "â¥‘", t1 = "â¥ ", n1 = "â¥˜", r1 = "â†¿", s1 = "â¥’", o1 = "â†¼", c1 = "âª‹", i1 = "â‹š", l1 = "â‰¤", a1 = "â‰¦", u1 = "â©½", f1 = "âª¨", p1 = "â©½", h1 = "â©¿", d1 = "âª", g1 = "âªƒ", m1 = "â‹šï¸€", _1 = "âª“", b1 = "âª…", v1 = "â‹–", x1 = "â‹š", y1 = "âª‹", k1 = "â‹š", E1 = "â‰¦", w1 = "â‰¶", C1 = "â‰¶", A1 = "âª¡", S1 = "â‰²", D1 = "â©½", T1 = "â‰²", R1 = "â¥¼", q1 = "âŒŠ", M1 = "ð”", N1 = "ð”©", I1 = "â‰¶", F1 = "âª‘", L1 = "â¥¢", O1 = "â†½", P1 = "â†¼", B1 = "â¥ª", $1 = "â–„", z1 = "Ð‰", U1 = "Ñ™", H1 = "â‡‡", j1 = "â‰ª", V1 = "â‹˜", G1 = "âŒž", Z1 = "â‡š", K1 = "â¥«", W1 = "â—º", J1 = "Ä¿", Y1 = "Å€", X1 = "âŽ°", Q1 = "âŽ°", eS = "âª‰", tS = "âª‰", nS = "âª‡", rS = "â‰¨", sS = "âª‡", oS = "â‰¨", cS = "â‹¦", iS = "âŸ¬", lS = "â‡½", aS = "âŸ¦", uS = "âŸµ", fS = "âŸµ", pS = "âŸ¸", hS = "âŸ·", dS = "âŸ·", gS = "âŸº", mS = "âŸ¼", _S = "âŸ¶", bS = "âŸ¶", vS = "âŸ¹", xS = "â†«", yS = "â†¬", kS = "â¦…", ES = "ð•ƒ", wS = "ð•", CS = "â¨­", AS = "â¨´", SS = "âˆ—", DS = "_", TS = "â†™", RS = "â†˜", qS = "â—Š", MS = "â—Š", NS = "â§«", IS = "(", FS = "â¦“", LS = "â‡†", OS = "âŒŸ", PS = "â‡‹", BS = "â¥­", $S = "â€Ž", zS = "âŠ¿", US = "â€¹", HS = "ð“", jS = "â„’", VS = "â†°", GS = "â†°", ZS = "â‰²", KS = "âª", WS = "âª", JS = "[", YS = "â€˜", XS = "â€š", QS = "Å", eD = "Å‚", tD = "âª¦", nD = "â©¹", rD = "<", sD = "<", oD = "â‰ª", cD = "â‹–", iD = "â‹‹", lD = "â‹‰", aD = "â¥¶", uD = "â©»", fD = "â—ƒ", pD = "âŠ´", hD = "â—‚", dD = "â¦–", gD = "â¥Š", mD = "â¥¦", _D = "â‰¨ï¸€", bD = "â‰¨ï¸€", vD = "Â¯", xD = "â™‚", yD = "âœ ", kD = "âœ ", ED = "â†¦", wD = "â†¦", CD = "â†§", AD = "â†¤", SD = "â†¥", DD = "â–®", TD = "â¨©", RD = "Ðœ", qD = "Ð¼", MD = "â€”", ND = "âˆº", ID = "âˆ¡", FD = "âŸ", LD = "â„³", OD = "ð”", PD = "ð”ª", BD = "â„§", $D = "Âµ", zD = "*", UD = "â«°", HD = "âˆ£", jD = "Â·", VD = "âŠŸ", GD = "âˆ’", ZD = "âˆ¸", KD = "â¨ª", WD = "âˆ“", JD = "â«›", YD = "â€¦", XD = "âˆ“", QD = "âŠ§", eT = "ð•„", tT = "ð•ž", nT = "âˆ“", rT = "ð“‚", sT = "â„³", oT = "âˆ¾", cT = "Îœ", iT = "Î¼", lT = "âŠ¸", aT = "âŠ¸", uT = "âˆ‡", fT = "Åƒ", pT = "Å„", hT = "âˆ âƒ’", dT = "â‰‰", gT = "â©°Ì¸", mT = "â‰‹Ì¸", _T = "Å‰", bT = "â‰‰", vT = "â™®", xT = "â„•", yT = "â™®", kT = " ", ET = "â‰ŽÌ¸", wT = "â‰Ì¸", CT = "â©ƒ", AT = "Å‡", ST = "Åˆ", DT = "Å…", TT = "Å†", RT = "â‰‡", qT = "â©­Ì¸", MT = "â©‚", NT = "Ð", IT = "Ð½", FT = "â€“", LT = "â¤¤", OT = "â†—", PT = "â‡—", BT = "â†—", $T = "â‰ ", zT = "â‰Ì¸", UT = "â€‹", HT = "â€‹", jT = "â€‹", VT = "â€‹", GT = "â‰¢", ZT = "â¤¨", KT = "â‰‚Ì¸", WT = "â‰«", JT = "â‰ª", YT = `
`, XT = "âˆ„", QT = "âˆ„", eR = "ð”‘", tR = "ð”«", nR = "â‰§Ì¸", rR = "â‰±", sR = "â‰±", oR = "â‰§Ì¸", cR = "â©¾Ì¸", iR = "â©¾Ì¸", lR = "â‹™Ì¸", aR = "â‰µ", uR = "â‰«âƒ’", fR = "â‰¯", pR = "â‰¯", hR = "â‰«Ì¸", dR = "â†®", gR = "â‡Ž", mR = "â«²", _R = "âˆ‹", bR = "â‹¼", vR = "â‹º", xR = "âˆ‹", yR = "ÐŠ", kR = "Ñš", ER = "â†š", wR = "â‡", CR = "â€¥", AR = "â‰¦Ì¸", SR = "â‰°", DR = "â†š", TR = "â‡", RR = "â†®", qR = "â‡Ž", MR = "â‰°", NR = "â‰¦Ì¸", IR = "â©½Ì¸", FR = "â©½Ì¸", LR = "â‰®", OR = "â‹˜Ì¸", PR = "â‰´", BR = "â‰ªâƒ’", $R = "â‰®", zR = "â‹ª", UR = "â‹¬", HR = "â‰ªÌ¸", jR = "âˆ¤", VR = "â ", GR = " ", ZR = "ð•Ÿ", KR = "â„•", WR = "â«¬", JR = "Â¬", YR = "â‰¢", XR = "â‰­", QR = "âˆ¦", eq = "âˆ‰", tq = "â‰ ", nq = "â‰‚Ì¸", rq = "âˆ„", sq = "â‰¯", oq = "â‰±", cq = "â‰§Ì¸", iq = "â‰«Ì¸", lq = "â‰¹", aq = "â©¾Ì¸", uq = "â‰µ", fq = "â‰ŽÌ¸", pq = "â‰Ì¸", hq = "âˆ‰", dq = "â‹µÌ¸", gq = "â‹¹Ì¸", mq = "âˆ‰", _q = "â‹·", bq = "â‹¶", vq = "â§Ì¸", xq = "â‹ª", yq = "â‹¬", kq = "â‰®", Eq = "â‰°", wq = "â‰¸", Cq = "â‰ªÌ¸", Aq = "â©½Ì¸", Sq = "â‰´", Dq = "âª¢Ì¸", Tq = "âª¡Ì¸", Rq = "âˆŒ", qq = "âˆŒ", Mq = "â‹¾", Nq = "â‹½", Iq = "âŠ€", Fq = "âª¯Ì¸", Lq = "â‹ ", Oq = "âˆŒ", Pq = "â§Ì¸", Bq = "â‹«", $q = "â‹­", zq = "âŠÌ¸", Uq = "â‹¢", Hq = "âŠÌ¸", jq = "â‹£", Vq = "âŠ‚âƒ’", Gq = "âŠˆ", Zq = "âŠ", Kq = "âª°Ì¸", Wq = "â‹¡", Jq = "â‰¿Ì¸", Yq = "âŠƒâƒ’", Xq = "âŠ‰", Qq = "â‰", eM = "â‰„", tM = "â‰‡", nM = "â‰‰", rM = "âˆ¤", sM = "âˆ¦", oM = "âˆ¦", cM = "â«½âƒ¥", iM = "âˆ‚Ì¸", lM = "â¨”", aM = "âŠ€", uM = "â‹ ", fM = "âŠ€", pM = "âª¯Ì¸", hM = "âª¯Ì¸", dM = "â¤³Ì¸", gM = "â†›", mM = "â‡", _M = "â†Ì¸", bM = "â†›", vM = "â‡", xM = "â‹«", yM = "â‹­", kM = "âŠ", EM = "â‹¡", wM = "âª°Ì¸", CM = "ð’©", AM = "ð“ƒ", SM = "âˆ¤", DM = "âˆ¦", TM = "â‰", RM = "â‰„", qM = "â‰„", MM = "âˆ¤", NM = "âˆ¦", IM = "â‹¢", FM = "â‹£", LM = "âŠ„", OM = "â«…Ì¸", PM = "âŠˆ", BM = "âŠ‚âƒ’", $M = "âŠˆ", zM = "â«…Ì¸", UM = "âŠ", HM = "âª°Ì¸", jM = "âŠ…", VM = "â«†Ì¸", GM = "âŠ‰", ZM = "âŠƒâƒ’", KM = "âŠ‰", WM = "â«†Ì¸", JM = "â‰¹", YM = "Ã‘", XM = "Ã±", QM = "â‰¸", eN = "â‹ª", tN = "â‹¬", nN = "â‹«", rN = "â‹­", sN = "Î", oN = "Î½", cN = "#", iN = "â„–", lN = "â€‡", aN = "â‰âƒ’", uN = "âŠ¬", fN = "âŠ­", pN = "âŠ®", hN = "âŠ¯", dN = "â‰¥âƒ’", gN = ">âƒ’", mN = "â¤„", _N = "â§ž", bN = "â¤‚", vN = "â‰¤âƒ’", xN = "<âƒ’", yN = "âŠ´âƒ’", kN = "â¤ƒ", EN = "âŠµâƒ’", wN = "âˆ¼âƒ’", CN = "â¤£", AN = "â†–", SN = "â‡–", DN = "â†–", TN = "â¤§", RN = "Ã“", qN = "Ã³", MN = "âŠ›", NN = "Ã”", IN = "Ã´", FN = "âŠš", LN = "Ðž", ON = "Ð¾", PN = "âŠ", BN = "Å", $N = "Å‘", zN = "â¨¸", UN = "âŠ™", HN = "â¦¼", jN = "Å’", VN = "Å“", GN = "â¦¿", ZN = "ð”’", KN = "ð”¬", WN = "Ë›", JN = "Ã’", YN = "Ã²", XN = "â§", QN = "â¦µ", eI = "Î©", tI = "âˆ®", nI = "â†º", rI = "â¦¾", sI = "â¦»", oI = "â€¾", cI = "â§€", iI = "ÅŒ", lI = "Å", aI = "Î©", uI = "Ï‰", fI = "ÎŸ", pI = "Î¿", hI = "â¦¶", dI = "âŠ–", gI = "ð•†", mI = "ð• ", _I = "â¦·", bI = "â€œ", vI = "â€˜", xI = "â¦¹", yI = "âŠ•", kI = "â†»", EI = "â©”", wI = "âˆ¨", CI = "â©", AI = "â„´", SI = "â„´", DI = "Âª", TI = "Âº", RI = "âŠ¶", qI = "â©–", MI = "â©—", NI = "â©›", II = "â“ˆ", FI = "ð’ª", LI = "â„´", OI = "Ã˜", PI = "Ã¸", BI = "âŠ˜", $I = "Ã•", zI = "Ãµ", UI = "â¨¶", HI = "â¨·", jI = "âŠ—", VI = "Ã–", GI = "Ã¶", ZI = "âŒ½", KI = "â€¾", WI = "âž", JI = "âŽ´", YI = "âœ", XI = "Â¶", QI = "âˆ¥", eF = "âˆ¥", tF = "â«³", nF = "â«½", rF = "âˆ‚", sF = "âˆ‚", oF = "ÐŸ", cF = "Ð¿", iF = "%", lF = ".", aF = "â€°", uF = "âŠ¥", fF = "â€±", pF = "ð”“", hF = "ð”­", dF = "Î¦", gF = "Ï†", mF = "Ï•", _F = "â„³", bF = "â˜Ž", vF = "Î ", xF = "Ï€", yF = "â‹”", kF = "Ï–", EF = "â„", wF = "â„Ž", CF = "â„", AF = "â¨£", SF = "âŠž", DF = "â¨¢", TF = "+", RF = "âˆ”", qF = "â¨¥", MF = "â©²", NF = "Â±", IF = "Â±", FF = "â¨¦", LF = "â¨§", OF = "Â±", PF = "â„Œ", BF = "â¨•", $F = "ð•¡", zF = "â„™", UF = "Â£", HF = "âª·", jF = "âª»", VF = "â‰º", GF = "â‰¼", ZF = "âª·", KF = "â‰º", WF = "â‰¼", JF = "â‰º", YF = "âª¯", XF = "â‰¼", QF = "â‰¾", eL = "âª¯", tL = "âª¹", nL = "âªµ", rL = "â‹¨", sL = "âª¯", oL = "âª³", cL = "â‰¾", iL = "â€²", lL = "â€³", aL = "â„™", uL = "âª¹", fL = "âªµ", pL = "â‹¨", hL = "âˆ", dL = "âˆ", gL = "âŒ®", mL = "âŒ’", _L = "âŒ“", bL = "âˆ", vL = "âˆ", xL = "âˆ·", yL = "âˆ", kL = "â‰¾", EL = "âŠ°", wL = "ð’«", CL = "ð“…", AL = "Î¨", SL = "Ïˆ", DL = "â€ˆ", TL = "ð””", RL = "ð”®", qL = "â¨Œ", ML = "ð•¢", NL = "â„š", IL = "â—", FL = "ð’¬", LL = "ð“†", OL = "â„", PL = "â¨–", BL = "?", $L = "â‰Ÿ", zL = '"', UL = '"', HL = "â‡›", jL = "âˆ½Ì±", VL = "Å”", GL = "Å•", ZL = "âˆš", KL = "â¦³", WL = "âŸ©", JL = "âŸ«", YL = "â¦’", XL = "â¦¥", QL = "âŸ©", eO = "Â»", tO = "â¥µ", nO = "â‡¥", rO = "â¤ ", sO = "â¤³", oO = "â†’", cO = "â† ", iO = "â‡’", lO = "â¤ž", aO = "â†ª", uO = "â†¬", fO = "â¥…", pO = "â¥´", hO = "â¤–", dO = "â†£", gO = "â†", mO = "â¤š", _O = "â¤œ", bO = "âˆ¶", vO = "â„š", xO = "â¤", yO = "â¤", kO = "â¤", EO = "â³", wO = "}", CO = "]", AO = "â¦Œ", SO = "â¦Ž", DO = "â¦", TO = "Å˜", RO = "Å™", qO = "Å–", MO = "Å—", NO = "âŒ‰", IO = "}", FO = "Ð ", LO = "Ñ€", OO = "â¤·", PO = "â¥©", BO = "â€", $O = "â€", zO = "â†³", UO = "â„œ", HO = "â„›", jO = "â„œ", VO = "â„", GO = "â„œ", ZO = "â–­", KO = "Â®", WO = "Â®", JO = "âˆ‹", YO = "â‡‹", XO = "â¥¯", QO = "â¥½", eP = "âŒ‹", tP = "ð”¯", nP = "â„œ", rP = "â¥¤", sP = "â‡", oP = "â‡€", cP = "â¥¬", iP = "Î¡", lP = "Ï", aP = "Ï±", uP = "âŸ©", fP = "â‡¥", pP = "â†’", hP = "â†’", dP = "â‡’", gP = "â‡„", mP = "â†£", _P = "âŒ‰", bP = "âŸ§", vP = "â¥", xP = "â¥•", yP = "â‡‚", kP = "âŒ‹", EP = "â‡", wP = "â‡€", CP = "â‡„", AP = "â‡Œ", SP = "â‡‰", DP = "â†", TP = "â†¦", RP = "âŠ¢", qP = "â¥›", MP = "â‹Œ", NP = "â§", IP = "âŠ³", FP = "âŠµ", LP = "â¥", OP = "â¥œ", PP = "â¥”", BP = "â†¾", $P = "â¥“", zP = "â‡€", UP = "Ëš", HP = "â‰“", jP = "â‡„", VP = "â‡Œ", GP = "â€", ZP = "âŽ±", KP = "âŽ±", WP = "â«®", JP = "âŸ­", YP = "â‡¾", XP = "âŸ§", QP = "â¦†", eB = "ð•£", tB = "â„", nB = "â¨®", rB = "â¨µ", sB = "â¥°", oB = ")", cB = "â¦”", iB = "â¨’", lB = "â‡‰", aB = "â‡›", uB = "â€º", fB = "ð“‡", pB = "â„›", hB = "â†±", dB = "â†±", gB = "]", mB = "â€™", _B = "â€™", bB = "â‹Œ", vB = "â‹Š", xB = "â–¹", yB = "âŠµ", kB = "â–¸", EB = "â§Ž", wB = "â§´", CB = "â¥¨", AB = "â„ž", SB = "Åš", DB = "Å›", TB = "â€š", RB = "âª¸", qB = "Å ", MB = "Å¡", NB = "âª¼", IB = "â‰»", FB = "â‰½", LB = "âª°", OB = "âª´", PB = "Åž", BB = "ÅŸ", $B = "Åœ", zB = "Å", UB = "âªº", HB = "âª¶", jB = "â‹©", VB = "â¨“", GB = "â‰¿", ZB = "Ð¡", KB = "Ñ", WB = "âŠ¡", JB = "â‹…", YB = "â©¦", XB = "â¤¥", QB = "â†˜", e2 = "â‡˜", t2 = "â†˜", n2 = "Â§", r2 = ";", s2 = "â¤©", o2 = "âˆ–", c2 = "âˆ–", i2 = "âœ¶", l2 = "ð”–", a2 = "ð”°", u2 = "âŒ¢", f2 = "â™¯", p2 = "Ð©", h2 = "Ñ‰", d2 = "Ð¨", g2 = "Ñˆ", m2 = "â†“", _2 = "â†", b2 = "âˆ£", v2 = "âˆ¥", x2 = "â†’", y2 = "â†‘", k2 = "Â­", E2 = "Î£", w2 = "Ïƒ", C2 = "Ï‚", A2 = "Ï‚", S2 = "âˆ¼", D2 = "â©ª", T2 = "â‰ƒ", R2 = "â‰ƒ", q2 = "âªž", M2 = "âª ", N2 = "âª", I2 = "âªŸ", F2 = "â‰†", L2 = "â¨¤", O2 = "â¥²", P2 = "â†", B2 = "âˆ˜", $2 = "âˆ–", z2 = "â¨³", U2 = "â§¤", H2 = "âˆ£", j2 = "âŒ£", V2 = "âªª", G2 = "âª¬", Z2 = "âª¬ï¸€", K2 = "Ð¬", W2 = "ÑŒ", J2 = "âŒ¿", Y2 = "â§„", X2 = "/", Q2 = "ð•Š", e$ = "ð•¤", t$ = "â™ ", n$ = "â™ ", r$ = "âˆ¥", s$ = "âŠ“", o$ = "âŠ“ï¸€", c$ = "âŠ”", i$ = "âŠ”ï¸€", l$ = "âˆš", a$ = "âŠ", u$ = "âŠ‘", f$ = "âŠ", p$ = "âŠ‘", h$ = "âŠ", d$ = "âŠ’", g$ = "âŠ", m$ = "âŠ’", _$ = "â–¡", b$ = "â–¡", v$ = "âŠ“", x$ = "âŠ", y$ = "âŠ‘", k$ = "âŠ", E$ = "âŠ’", w$ = "âŠ”", C$ = "â–ª", A$ = "â–¡", S$ = "â–ª", D$ = "â†’", T$ = "ð’®", R$ = "ð“ˆ", q$ = "âˆ–", M$ = "âŒ£", N$ = "â‹†", I$ = "â‹†", F$ = "â˜†", L$ = "â˜…", O$ = "Ïµ", P$ = "Ï•", B$ = "Â¯", $$ = "âŠ‚", z$ = "â‹", U$ = "âª½", H$ = "â«…", j$ = "âŠ†", V$ = "â«ƒ", G$ = "â«", Z$ = "â«‹", K$ = "âŠŠ", W$ = "âª¿", J$ = "â¥¹", Y$ = "âŠ‚", X$ = "â‹", Q$ = "âŠ†", ez = "â«…", tz = "âŠ†", nz = "âŠŠ", rz = "â«‹", sz = "â«‡", oz = "â«•", cz = "â«“", iz = "âª¸", lz = "â‰»", az = "â‰½", uz = "â‰»", fz = "âª°", pz = "â‰½", hz = "â‰¿", dz = "âª°", gz = "âªº", mz = "âª¶", _z = "â‹©", bz = "â‰¿", vz = "âˆ‹", xz = "âˆ‘", yz = "âˆ‘", kz = "â™ª", Ez = "Â¹", wz = "Â²", Cz = "Â³", Az = "âŠƒ", Sz = "â‹‘", Dz = "âª¾", Tz = "â«˜", Rz = "â«†", qz = "âŠ‡", Mz = "â«„", Nz = "âŠƒ", Iz = "âŠ‡", Fz = "âŸ‰", Lz = "â«—", Oz = "â¥»", Pz = "â«‚", Bz = "â«Œ", $z = "âŠ‹", zz = "â«€", Uz = "âŠƒ", Hz = "â‹‘", jz = "âŠ‡", Vz = "â«†", Gz = "âŠ‹", Zz = "â«Œ", Kz = "â«ˆ", Wz = "â«”", Jz = "â«–", Yz = "â¤¦", Xz = "â†™", Qz = "â‡™", eU = "â†™", tU = "â¤ª", nU = "ÃŸ", rU = "	", sU = "âŒ–", oU = "Î¤", cU = "Ï„", iU = "âŽ´", lU = "Å¤", aU = "Å¥", uU = "Å¢", fU = "Å£", pU = "Ð¢", hU = "Ñ‚", dU = "âƒ›", gU = "âŒ•", mU = "ð”—", _U = "ð”±", bU = "âˆ´", vU = "âˆ´", xU = "âˆ´", yU = "Î˜", kU = "Î¸", EU = "Ï‘", wU = "Ï‘", CU = "â‰ˆ", AU = "âˆ¼", SU = "âŸâ€Š", DU = "â€‰", TU = "â€‰", RU = "â‰ˆ", qU = "âˆ¼", MU = "Ãž", NU = "Ã¾", IU = "Ëœ", FU = "âˆ¼", LU = "â‰ƒ", OU = "â‰…", PU = "â‰ˆ", BU = "â¨±", $U = "âŠ ", zU = "Ã—", UU = "â¨°", HU = "âˆ­", jU = "â¤¨", VU = "âŒ¶", GU = "â«±", ZU = "âŠ¤", KU = "ð•‹", WU = "ð•¥", JU = "â«š", YU = "â¤©", XU = "â€´", QU = "â„¢", e3 = "â„¢", t3 = "â–µ", n3 = "â–¿", r3 = "â—ƒ", s3 = "âŠ´", o3 = "â‰œ", c3 = "â–¹", i3 = "âŠµ", l3 = "â—¬", a3 = "â‰œ", u3 = "â¨º", f3 = "âƒ›", p3 = "â¨¹", h3 = "â§", d3 = "â¨»", g3 = "â¢", m3 = "ð’¯", _3 = "ð“‰", b3 = "Ð¦", v3 = "Ñ†", x3 = "Ð‹", y3 = "Ñ›", k3 = "Å¦", E3 = "Å§", w3 = "â‰¬", C3 = "â†ž", A3 = "â† ", S3 = "Ãš", D3 = "Ãº", T3 = "â†‘", R3 = "â†Ÿ", q3 = "â‡‘", M3 = "â¥‰", N3 = "ÐŽ", I3 = "Ñž", F3 = "Å¬", L3 = "Å­", O3 = "Ã›", P3 = "Ã»", B3 = "Ð£", $3 = "Ñƒ", z3 = "â‡…", U3 = "Å°", H3 = "Å±", j3 = "â¥®", V3 = "â¥¾", G3 = "ð”˜", Z3 = "ð”²", K3 = "Ã™", W3 = "Ã¹", J3 = "â¥£", Y3 = "â†¿", X3 = "â†¾", Q3 = "â–€", eH = "âŒœ", tH = "âŒœ", nH = "âŒ", rH = "â—¸", sH = "Åª", oH = "Å«", cH = "Â¨", iH = "_", lH = "âŸ", aH = "âŽµ", uH = "â", fH = "â‹ƒ", pH = "âŠŽ", hH = "Å²", dH = "Å³", gH = "ð•Œ", mH = "ð•¦", _H = "â¤’", bH = "â†‘", vH = "â†‘", xH = "â‡‘", yH = "â‡…", kH = "â†•", EH = "â†•", wH = "â‡•", CH = "â¥®", AH = "â†¿", SH = "â†¾", DH = "âŠŽ", TH = "â†–", RH = "â†—", qH = "Ï…", MH = "Ï’", NH = "Ï’", IH = "Î¥", FH = "Ï…", LH = "â†¥", OH = "âŠ¥", PH = "â‡ˆ", BH = "âŒ", $H = "âŒ", zH = "âŒŽ", UH = "Å®", HH = "Å¯", jH = "â—¹", VH = "ð’°", GH = "ð“Š", ZH = "â‹°", KH = "Å¨", WH = "Å©", JH = "â–µ", YH = "â–´", XH = "â‡ˆ", QH = "Ãœ", e6 = "Ã¼", t6 = "â¦§", n6 = "â¦œ", r6 = "Ïµ", s6 = "Ï°", o6 = "âˆ…", c6 = "Ï•", i6 = "Ï–", l6 = "âˆ", a6 = "â†•", u6 = "â‡•", f6 = "Ï±", p6 = "Ï‚", h6 = "âŠŠï¸€", d6 = "â«‹ï¸€", g6 = "âŠ‹ï¸€", m6 = "â«Œï¸€", _6 = "Ï‘", b6 = "âŠ²", v6 = "âŠ³", x6 = "â«¨", y6 = "â««", k6 = "â«©", E6 = "Ð’", w6 = "Ð²", C6 = "âŠ¢", A6 = "âŠ¨", S6 = "âŠ©", D6 = "âŠ«", T6 = "â«¦", R6 = "âŠ»", q6 = "âˆ¨", M6 = "â‹", N6 = "â‰š", I6 = "â‹®", F6 = "|", L6 = "â€–", O6 = "|", P6 = "â€–", B6 = "âˆ£", $6 = "|", z6 = "â˜", U6 = "â‰€", H6 = "â€Š", j6 = "ð”™", V6 = "ð”³", G6 = "âŠ²", Z6 = "âŠ‚âƒ’", K6 = "âŠƒâƒ’", W6 = "ð•", J6 = "ð•§", Y6 = "âˆ", X6 = "âŠ³", Q6 = "ð’±", e8 = "ð“‹", t8 = "â«‹ï¸€", n8 = "âŠŠï¸€", r8 = "â«Œï¸€", s8 = "âŠ‹ï¸€", o8 = "âŠª", c8 = "â¦š", i8 = "Å´", l8 = "Åµ", a8 = "â©Ÿ", u8 = "âˆ§", f8 = "â‹€", p8 = "â‰™", h8 = "â„˜", d8 = "ð”š", g8 = "ð”´", m8 = "ð•Ž", _8 = "ð•¨", b8 = "â„˜", v8 = "â‰€", x8 = "â‰€", y8 = "ð’²", k8 = "ð“Œ", E8 = "â‹‚", w8 = "â—¯", C8 = "â‹ƒ", A8 = "â–½", S8 = "ð”›", D8 = "ð”µ", T8 = "âŸ·", R8 = "âŸº", q8 = "Îž", M8 = "Î¾", N8 = "âŸµ", I8 = "âŸ¸", F8 = "âŸ¼", L8 = "â‹»", O8 = "â¨€", P8 = "ð•", B8 = "ð•©", $8 = "â¨", z8 = "â¨‚", U8 = "âŸ¶", H8 = "âŸ¹", j8 = "ð’³", V8 = "ð“", G8 = "â¨†", Z8 = "â¨„", K8 = "â–³", W8 = "â‹", J8 = "â‹€", Y8 = "Ã", X8 = "Ã½", Q8 = "Ð¯", ej = "Ñ", tj = "Å¶", nj = "Å·", rj = "Ð«", sj = "Ñ‹", oj = "Â¥", cj = "ð”œ", ij = "ð”¶", lj = "Ð‡", aj = "Ñ—", uj = "ð•", fj = "ð•ª", pj = "ð’´", hj = "ð“Ž", dj = "Ð®", gj = "ÑŽ", mj = "Ã¿", _j = "Å¸", bj = "Å¹", vj = "Åº", xj = "Å½", yj = "Å¾", kj = "Ð—", Ej = "Ð·", wj = "Å»", Cj = "Å¼", Aj = "â„¨", Sj = "â€‹", Dj = "Î–", Tj = "Î¶", Rj = "ð”·", qj = "â„¨", Mj = "Ð–", Nj = "Ð¶", Ij = "â‡", Fj = "ð•«", Lj = "â„¤", Oj = "ð’µ", Pj = "ð“", Bj = "â€", $j = "â€Œ", zj = {
  Aacute: wf,
  aacute: Cf,
  Abreve: Af,
  abreve: Sf,
  ac: Df,
  acd: Tf,
  acE: Rf,
  Acirc: qf,
  acirc: Mf,
  acute: Nf,
  Acy: If,
  acy: Ff,
  AElig: Lf,
  aelig: Of,
  af: Pf,
  Afr: Bf,
  afr: $f,
  Agrave: zf,
  agrave: Uf,
  alefsym: Hf,
  aleph: jf,
  Alpha: Vf,
  alpha: Gf,
  Amacr: Zf,
  amacr: Kf,
  amalg: Wf,
  amp: Jf,
  AMP: Yf,
  andand: Xf,
  And: Qf,
  and: ep,
  andd: tp,
  andslope: np,
  andv: rp,
  ang: sp,
  ange: op,
  angle: cp,
  angmsdaa: ip,
  angmsdab: lp,
  angmsdac: ap,
  angmsdad: up,
  angmsdae: fp,
  angmsdaf: pp,
  angmsdag: hp,
  angmsdah: dp,
  angmsd: gp,
  angrt: mp,
  angrtvb: _p,
  angrtvbd: bp,
  angsph: vp,
  angst: xp,
  angzarr: yp,
  Aogon: kp,
  aogon: Ep,
  Aopf: wp,
  aopf: Cp,
  apacir: Ap,
  ap: Sp,
  apE: Dp,
  ape: Tp,
  apid: Rp,
  apos: qp,
  ApplyFunction: Mp,
  approx: Np,
  approxeq: Ip,
  Aring: Fp,
  aring: Lp,
  Ascr: Op,
  ascr: Pp,
  Assign: Bp,
  ast: $p,
  asymp: zp,
  asympeq: Up,
  Atilde: Hp,
  atilde: jp,
  Auml: Vp,
  auml: Gp,
  awconint: Zp,
  awint: Kp,
  backcong: Wp,
  backepsilon: Jp,
  backprime: Yp,
  backsim: Xp,
  backsimeq: Qp,
  Backslash: eh,
  Barv: th,
  barvee: nh,
  barwed: rh,
  Barwed: sh,
  barwedge: oh,
  bbrk: ch,
  bbrktbrk: ih,
  bcong: lh,
  Bcy: ah,
  bcy: uh,
  bdquo: fh,
  becaus: ph,
  because: hh,
  Because: dh,
  bemptyv: gh,
  bepsi: mh,
  bernou: _h,
  Bernoullis: bh,
  Beta: vh,
  beta: xh,
  beth: yh,
  between: kh,
  Bfr: Eh,
  bfr: wh,
  bigcap: Ch,
  bigcirc: Ah,
  bigcup: Sh,
  bigodot: Dh,
  bigoplus: Th,
  bigotimes: Rh,
  bigsqcup: qh,
  bigstar: Mh,
  bigtriangledown: Nh,
  bigtriangleup: Ih,
  biguplus: Fh,
  bigvee: Lh,
  bigwedge: Oh,
  bkarow: Ph,
  blacklozenge: Bh,
  blacksquare: $h,
  blacktriangle: zh,
  blacktriangledown: Uh,
  blacktriangleleft: Hh,
  blacktriangleright: jh,
  blank: Vh,
  blk12: Gh,
  blk14: Zh,
  blk34: Kh,
  block: Wh,
  bne: Jh,
  bnequiv: Yh,
  bNot: Xh,
  bnot: Qh,
  Bopf: ed,
  bopf: td,
  bot: nd,
  bottom: rd,
  bowtie: sd,
  boxbox: od,
  boxdl: cd,
  boxdL: id,
  boxDl: ld,
  boxDL: ad,
  boxdr: ud,
  boxdR: fd,
  boxDr: pd,
  boxDR: hd,
  boxh: dd,
  boxH: gd,
  boxhd: md,
  boxHd: _d,
  boxhD: bd,
  boxHD: vd,
  boxhu: xd,
  boxHu: yd,
  boxhU: kd,
  boxHU: Ed,
  boxminus: wd,
  boxplus: Cd,
  boxtimes: Ad,
  boxul: Sd,
  boxuL: Dd,
  boxUl: Td,
  boxUL: Rd,
  boxur: qd,
  boxuR: Md,
  boxUr: Nd,
  boxUR: Id,
  boxv: Fd,
  boxV: Ld,
  boxvh: Od,
  boxvH: Pd,
  boxVh: Bd,
  boxVH: $d,
  boxvl: zd,
  boxvL: Ud,
  boxVl: Hd,
  boxVL: jd,
  boxvr: Vd,
  boxvR: Gd,
  boxVr: Zd,
  boxVR: Kd,
  bprime: Wd,
  breve: Jd,
  Breve: Yd,
  brvbar: Xd,
  bscr: Qd,
  Bscr: eg,
  bsemi: tg,
  bsim: ng,
  bsime: rg,
  bsolb: sg,
  bsol: og,
  bsolhsub: cg,
  bull: ig,
  bullet: lg,
  bump: ag,
  bumpE: ug,
  bumpe: fg,
  Bumpeq: pg,
  bumpeq: hg,
  Cacute: dg,
  cacute: gg,
  capand: mg,
  capbrcup: _g,
  capcap: bg,
  cap: vg,
  Cap: xg,
  capcup: yg,
  capdot: kg,
  CapitalDifferentialD: Eg,
  caps: wg,
  caret: Cg,
  caron: Ag,
  Cayleys: Sg,
  ccaps: Dg,
  Ccaron: Tg,
  ccaron: Rg,
  Ccedil: qg,
  ccedil: Mg,
  Ccirc: Ng,
  ccirc: Ig,
  Cconint: Fg,
  ccups: Lg,
  ccupssm: Og,
  Cdot: Pg,
  cdot: Bg,
  cedil: $g,
  Cedilla: zg,
  cemptyv: Ug,
  cent: Hg,
  centerdot: jg,
  CenterDot: Vg,
  cfr: Gg,
  Cfr: Zg,
  CHcy: Kg,
  chcy: Wg,
  check: Jg,
  checkmark: Yg,
  Chi: Xg,
  chi: Qg,
  circ: em,
  circeq: tm,
  circlearrowleft: nm,
  circlearrowright: rm,
  circledast: sm,
  circledcirc: om,
  circleddash: cm,
  CircleDot: im,
  circledR: lm,
  circledS: am,
  CircleMinus: um,
  CirclePlus: fm,
  CircleTimes: pm,
  cir: hm,
  cirE: dm,
  cire: gm,
  cirfnint: mm,
  cirmid: _m,
  cirscir: bm,
  ClockwiseContourIntegral: vm,
  CloseCurlyDoubleQuote: xm,
  CloseCurlyQuote: ym,
  clubs: km,
  clubsuit: Em,
  colon: wm,
  Colon: Cm,
  Colone: Am,
  colone: Sm,
  coloneq: Dm,
  comma: Tm,
  commat: Rm,
  comp: qm,
  compfn: Mm,
  complement: Nm,
  complexes: Im,
  cong: Fm,
  congdot: Lm,
  Congruent: Om,
  conint: Pm,
  Conint: Bm,
  ContourIntegral: $m,
  copf: zm,
  Copf: Um,
  coprod: Hm,
  Coproduct: jm,
  copy: Vm,
  COPY: Gm,
  copysr: Zm,
  CounterClockwiseContourIntegral: Km,
  crarr: Wm,
  cross: Jm,
  Cross: Ym,
  Cscr: Xm,
  cscr: Qm,
  csub: e_,
  csube: t_,
  csup: n_,
  csupe: r_,
  ctdot: s_,
  cudarrl: o_,
  cudarrr: c_,
  cuepr: i_,
  cuesc: l_,
  cularr: a_,
  cularrp: u_,
  cupbrcap: f_,
  cupcap: p_,
  CupCap: h_,
  cup: d_,
  Cup: g_,
  cupcup: m_,
  cupdot: __,
  cupor: b_,
  cups: v_,
  curarr: x_,
  curarrm: y_,
  curlyeqprec: k_,
  curlyeqsucc: E_,
  curlyvee: w_,
  curlywedge: C_,
  curren: A_,
  curvearrowleft: S_,
  curvearrowright: D_,
  cuvee: T_,
  cuwed: R_,
  cwconint: q_,
  cwint: M_,
  cylcty: N_,
  dagger: I_,
  Dagger: F_,
  daleth: L_,
  darr: O_,
  Darr: P_,
  dArr: B_,
  dash: $_,
  Dashv: z_,
  dashv: U_,
  dbkarow: H_,
  dblac: j_,
  Dcaron: V_,
  dcaron: G_,
  Dcy: Z_,
  dcy: K_,
  ddagger: W_,
  ddarr: J_,
  DD: Y_,
  dd: X_,
  DDotrahd: Q_,
  ddotseq: eb,
  deg: tb,
  Del: nb,
  Delta: rb,
  delta: sb,
  demptyv: ob,
  dfisht: cb,
  Dfr: ib,
  dfr: lb,
  dHar: ab,
  dharl: ub,
  dharr: fb,
  DiacriticalAcute: pb,
  DiacriticalDot: hb,
  DiacriticalDoubleAcute: db,
  DiacriticalGrave: gb,
  DiacriticalTilde: mb,
  diam: _b,
  diamond: bb,
  Diamond: vb,
  diamondsuit: xb,
  diams: yb,
  die: kb,
  DifferentialD: Eb,
  digamma: wb,
  disin: Cb,
  div: Ab,
  divide: Sb,
  divideontimes: Db,
  divonx: Tb,
  DJcy: Rb,
  djcy: qb,
  dlcorn: Mb,
  dlcrop: Nb,
  dollar: Ib,
  Dopf: Fb,
  dopf: Lb,
  Dot: Ob,
  dot: Pb,
  DotDot: Bb,
  doteq: $b,
  doteqdot: zb,
  DotEqual: Ub,
  dotminus: Hb,
  dotplus: jb,
  dotsquare: Vb,
  doublebarwedge: Gb,
  DoubleContourIntegral: Zb,
  DoubleDot: Kb,
  DoubleDownArrow: Wb,
  DoubleLeftArrow: Jb,
  DoubleLeftRightArrow: Yb,
  DoubleLeftTee: Xb,
  DoubleLongLeftArrow: Qb,
  DoubleLongLeftRightArrow: e0,
  DoubleLongRightArrow: t0,
  DoubleRightArrow: n0,
  DoubleRightTee: r0,
  DoubleUpArrow: s0,
  DoubleUpDownArrow: o0,
  DoubleVerticalBar: c0,
  DownArrowBar: i0,
  downarrow: l0,
  DownArrow: a0,
  Downarrow: u0,
  DownArrowUpArrow: f0,
  DownBreve: p0,
  downdownarrows: h0,
  downharpoonleft: d0,
  downharpoonright: g0,
  DownLeftRightVector: m0,
  DownLeftTeeVector: _0,
  DownLeftVectorBar: b0,
  DownLeftVector: v0,
  DownRightTeeVector: x0,
  DownRightVectorBar: y0,
  DownRightVector: k0,
  DownTeeArrow: E0,
  DownTee: w0,
  drbkarow: C0,
  drcorn: A0,
  drcrop: S0,
  Dscr: D0,
  dscr: T0,
  DScy: R0,
  dscy: q0,
  dsol: M0,
  Dstrok: N0,
  dstrok: I0,
  dtdot: F0,
  dtri: L0,
  dtrif: O0,
  duarr: P0,
  duhar: B0,
  dwangle: $0,
  DZcy: z0,
  dzcy: U0,
  dzigrarr: H0,
  Eacute: j0,
  eacute: V0,
  easter: G0,
  Ecaron: Z0,
  ecaron: K0,
  Ecirc: W0,
  ecirc: J0,
  ecir: Y0,
  ecolon: X0,
  Ecy: Q0,
  ecy: ev,
  eDDot: tv,
  Edot: nv,
  edot: rv,
  eDot: sv,
  ee: ov,
  efDot: cv,
  Efr: iv,
  efr: lv,
  eg: av,
  Egrave: uv,
  egrave: fv,
  egs: pv,
  egsdot: hv,
  el: dv,
  Element: gv,
  elinters: mv,
  ell: _v,
  els: bv,
  elsdot: vv,
  Emacr: xv,
  emacr: yv,
  empty: kv,
  emptyset: Ev,
  EmptySmallSquare: wv,
  emptyv: Cv,
  EmptyVerySmallSquare: Av,
  emsp13: Sv,
  emsp14: Dv,
  emsp: Tv,
  ENG: Rv,
  eng: qv,
  ensp: Mv,
  Eogon: Nv,
  eogon: Iv,
  Eopf: Fv,
  eopf: Lv,
  epar: Ov,
  eparsl: Pv,
  eplus: Bv,
  epsi: $v,
  Epsilon: zv,
  epsilon: Uv,
  epsiv: Hv,
  eqcirc: jv,
  eqcolon: Vv,
  eqsim: Gv,
  eqslantgtr: Zv,
  eqslantless: Kv,
  Equal: Wv,
  equals: Jv,
  EqualTilde: Yv,
  equest: Xv,
  Equilibrium: Qv,
  equiv: ex,
  equivDD: tx,
  eqvparsl: nx,
  erarr: rx,
  erDot: sx,
  escr: ox,
  Escr: cx,
  esdot: ix,
  Esim: lx,
  esim: ax,
  Eta: ux,
  eta: fx,
  ETH: px,
  eth: hx,
  Euml: dx,
  euml: gx,
  euro: mx,
  excl: _x,
  exist: bx,
  Exists: vx,
  expectation: xx,
  exponentiale: yx,
  ExponentialE: kx,
  fallingdotseq: Ex,
  Fcy: wx,
  fcy: Cx,
  female: Ax,
  ffilig: Sx,
  fflig: Dx,
  ffllig: Tx,
  Ffr: Rx,
  ffr: qx,
  filig: Mx,
  FilledSmallSquare: Nx,
  FilledVerySmallSquare: Ix,
  fjlig: Fx,
  flat: Lx,
  fllig: Ox,
  fltns: Px,
  fnof: Bx,
  Fopf: $x,
  fopf: zx,
  forall: Ux,
  ForAll: Hx,
  fork: jx,
  forkv: Vx,
  Fouriertrf: Gx,
  fpartint: Zx,
  frac12: Kx,
  frac13: Wx,
  frac14: Jx,
  frac15: Yx,
  frac16: Xx,
  frac18: Qx,
  frac23: ey,
  frac25: ty,
  frac34: ny,
  frac35: ry,
  frac38: sy,
  frac45: oy,
  frac56: cy,
  frac58: iy,
  frac78: ly,
  frasl: ay,
  frown: uy,
  fscr: fy,
  Fscr: py,
  gacute: hy,
  Gamma: dy,
  gamma: gy,
  Gammad: my,
  gammad: _y,
  gap: by,
  Gbreve: vy,
  gbreve: xy,
  Gcedil: yy,
  Gcirc: ky,
  gcirc: Ey,
  Gcy: wy,
  gcy: Cy,
  Gdot: Ay,
  gdot: Sy,
  ge: Dy,
  gE: Ty,
  gEl: Ry,
  gel: qy,
  geq: My,
  geqq: Ny,
  geqslant: Iy,
  gescc: Fy,
  ges: Ly,
  gesdot: Oy,
  gesdoto: Py,
  gesdotol: By,
  gesl: $y,
  gesles: zy,
  Gfr: Uy,
  gfr: Hy,
  gg: jy,
  Gg: Vy,
  ggg: Gy,
  gimel: Zy,
  GJcy: Ky,
  gjcy: Wy,
  gla: Jy,
  gl: Yy,
  glE: Xy,
  glj: Qy,
  gnap: ek,
  gnapprox: tk,
  gne: nk,
  gnE: rk,
  gneq: sk,
  gneqq: ok,
  gnsim: ck,
  Gopf: ik,
  gopf: lk,
  grave: ak,
  GreaterEqual: uk,
  GreaterEqualLess: fk,
  GreaterFullEqual: pk,
  GreaterGreater: hk,
  GreaterLess: dk,
  GreaterSlantEqual: gk,
  GreaterTilde: mk,
  Gscr: _k,
  gscr: bk,
  gsim: vk,
  gsime: xk,
  gsiml: yk,
  gtcc: kk,
  gtcir: Ek,
  gt: wk,
  GT: Ck,
  Gt: Ak,
  gtdot: Sk,
  gtlPar: Dk,
  gtquest: Tk,
  gtrapprox: Rk,
  gtrarr: qk,
  gtrdot: Mk,
  gtreqless: Nk,
  gtreqqless: Ik,
  gtrless: Fk,
  gtrsim: Lk,
  gvertneqq: Ok,
  gvnE: Pk,
  Hacek: Bk,
  hairsp: $k,
  half: zk,
  hamilt: Uk,
  HARDcy: Hk,
  hardcy: jk,
  harrcir: Vk,
  harr: Gk,
  hArr: Zk,
  harrw: Kk,
  Hat: Wk,
  hbar: Jk,
  Hcirc: Yk,
  hcirc: Xk,
  hearts: Qk,
  heartsuit: eE,
  hellip: tE,
  hercon: nE,
  hfr: rE,
  Hfr: sE,
  HilbertSpace: oE,
  hksearow: cE,
  hkswarow: iE,
  hoarr: lE,
  homtht: aE,
  hookleftarrow: uE,
  hookrightarrow: fE,
  hopf: pE,
  Hopf: hE,
  horbar: dE,
  HorizontalLine: gE,
  hscr: mE,
  Hscr: _E,
  hslash: bE,
  Hstrok: vE,
  hstrok: xE,
  HumpDownHump: yE,
  HumpEqual: kE,
  hybull: EE,
  hyphen: wE,
  Iacute: CE,
  iacute: AE,
  ic: SE,
  Icirc: DE,
  icirc: TE,
  Icy: RE,
  icy: qE,
  Idot: ME,
  IEcy: NE,
  iecy: IE,
  iexcl: FE,
  iff: LE,
  ifr: OE,
  Ifr: PE,
  Igrave: BE,
  igrave: $E,
  ii: zE,
  iiiint: UE,
  iiint: HE,
  iinfin: jE,
  iiota: VE,
  IJlig: GE,
  ijlig: ZE,
  Imacr: KE,
  imacr: WE,
  image: JE,
  ImaginaryI: YE,
  imagline: XE,
  imagpart: QE,
  imath: ew,
  Im: tw,
  imof: nw,
  imped: rw,
  Implies: sw,
  incare: ow,
  in: "âˆˆ",
  infin: cw,
  infintie: iw,
  inodot: lw,
  intcal: aw,
  int: uw,
  Int: fw,
  integers: pw,
  Integral: hw,
  intercal: dw,
  Intersection: gw,
  intlarhk: mw,
  intprod: _w,
  InvisibleComma: bw,
  InvisibleTimes: vw,
  IOcy: xw,
  iocy: yw,
  Iogon: kw,
  iogon: Ew,
  Iopf: ww,
  iopf: Cw,
  Iota: Aw,
  iota: Sw,
  iprod: Dw,
  iquest: Tw,
  iscr: Rw,
  Iscr: qw,
  isin: Mw,
  isindot: Nw,
  isinE: Iw,
  isins: Fw,
  isinsv: Lw,
  isinv: Ow,
  it: Pw,
  Itilde: Bw,
  itilde: $w,
  Iukcy: zw,
  iukcy: Uw,
  Iuml: Hw,
  iuml: jw,
  Jcirc: Vw,
  jcirc: Gw,
  Jcy: Zw,
  jcy: Kw,
  Jfr: Ww,
  jfr: Jw,
  jmath: Yw,
  Jopf: Xw,
  jopf: Qw,
  Jscr: eC,
  jscr: tC,
  Jsercy: nC,
  jsercy: rC,
  Jukcy: sC,
  jukcy: oC,
  Kappa: cC,
  kappa: iC,
  kappav: lC,
  Kcedil: aC,
  kcedil: uC,
  Kcy: fC,
  kcy: pC,
  Kfr: hC,
  kfr: dC,
  kgreen: gC,
  KHcy: mC,
  khcy: _C,
  KJcy: bC,
  kjcy: vC,
  Kopf: xC,
  kopf: yC,
  Kscr: kC,
  kscr: EC,
  lAarr: wC,
  Lacute: CC,
  lacute: AC,
  laemptyv: SC,
  lagran: DC,
  Lambda: TC,
  lambda: RC,
  lang: qC,
  Lang: MC,
  langd: NC,
  langle: IC,
  lap: FC,
  Laplacetrf: LC,
  laquo: OC,
  larrb: PC,
  larrbfs: BC,
  larr: $C,
  Larr: zC,
  lArr: UC,
  larrfs: HC,
  larrhk: jC,
  larrlp: VC,
  larrpl: GC,
  larrsim: ZC,
  larrtl: KC,
  latail: WC,
  lAtail: JC,
  lat: YC,
  late: XC,
  lates: QC,
  lbarr: eA,
  lBarr: tA,
  lbbrk: nA,
  lbrace: rA,
  lbrack: sA,
  lbrke: oA,
  lbrksld: cA,
  lbrkslu: iA,
  Lcaron: lA,
  lcaron: aA,
  Lcedil: uA,
  lcedil: fA,
  lceil: pA,
  lcub: hA,
  Lcy: dA,
  lcy: gA,
  ldca: mA,
  ldquo: _A,
  ldquor: bA,
  ldrdhar: vA,
  ldrushar: xA,
  ldsh: yA,
  le: kA,
  lE: EA,
  LeftAngleBracket: wA,
  LeftArrowBar: CA,
  leftarrow: AA,
  LeftArrow: SA,
  Leftarrow: DA,
  LeftArrowRightArrow: TA,
  leftarrowtail: RA,
  LeftCeiling: qA,
  LeftDoubleBracket: MA,
  LeftDownTeeVector: NA,
  LeftDownVectorBar: IA,
  LeftDownVector: FA,
  LeftFloor: LA,
  leftharpoondown: OA,
  leftharpoonup: PA,
  leftleftarrows: BA,
  leftrightarrow: $A,
  LeftRightArrow: zA,
  Leftrightarrow: UA,
  leftrightarrows: HA,
  leftrightharpoons: jA,
  leftrightsquigarrow: VA,
  LeftRightVector: GA,
  LeftTeeArrow: ZA,
  LeftTee: KA,
  LeftTeeVector: WA,
  leftthreetimes: JA,
  LeftTriangleBar: YA,
  LeftTriangle: XA,
  LeftTriangleEqual: QA,
  LeftUpDownVector: e1,
  LeftUpTeeVector: t1,
  LeftUpVectorBar: n1,
  LeftUpVector: r1,
  LeftVectorBar: s1,
  LeftVector: o1,
  lEg: c1,
  leg: i1,
  leq: l1,
  leqq: a1,
  leqslant: u1,
  lescc: f1,
  les: p1,
  lesdot: h1,
  lesdoto: d1,
  lesdotor: g1,
  lesg: m1,
  lesges: _1,
  lessapprox: b1,
  lessdot: v1,
  lesseqgtr: x1,
  lesseqqgtr: y1,
  LessEqualGreater: k1,
  LessFullEqual: E1,
  LessGreater: w1,
  lessgtr: C1,
  LessLess: A1,
  lesssim: S1,
  LessSlantEqual: D1,
  LessTilde: T1,
  lfisht: R1,
  lfloor: q1,
  Lfr: M1,
  lfr: N1,
  lg: I1,
  lgE: F1,
  lHar: L1,
  lhard: O1,
  lharu: P1,
  lharul: B1,
  lhblk: $1,
  LJcy: z1,
  ljcy: U1,
  llarr: H1,
  ll: j1,
  Ll: V1,
  llcorner: G1,
  Lleftarrow: Z1,
  llhard: K1,
  lltri: W1,
  Lmidot: J1,
  lmidot: Y1,
  lmoustache: X1,
  lmoust: Q1,
  lnap: eS,
  lnapprox: tS,
  lne: nS,
  lnE: rS,
  lneq: sS,
  lneqq: oS,
  lnsim: cS,
  loang: iS,
  loarr: lS,
  lobrk: aS,
  longleftarrow: uS,
  LongLeftArrow: fS,
  Longleftarrow: pS,
  longleftrightarrow: hS,
  LongLeftRightArrow: dS,
  Longleftrightarrow: gS,
  longmapsto: mS,
  longrightarrow: _S,
  LongRightArrow: bS,
  Longrightarrow: vS,
  looparrowleft: xS,
  looparrowright: yS,
  lopar: kS,
  Lopf: ES,
  lopf: wS,
  loplus: CS,
  lotimes: AS,
  lowast: SS,
  lowbar: DS,
  LowerLeftArrow: TS,
  LowerRightArrow: RS,
  loz: qS,
  lozenge: MS,
  lozf: NS,
  lpar: IS,
  lparlt: FS,
  lrarr: LS,
  lrcorner: OS,
  lrhar: PS,
  lrhard: BS,
  lrm: $S,
  lrtri: zS,
  lsaquo: US,
  lscr: HS,
  Lscr: jS,
  lsh: VS,
  Lsh: GS,
  lsim: ZS,
  lsime: KS,
  lsimg: WS,
  lsqb: JS,
  lsquo: YS,
  lsquor: XS,
  Lstrok: QS,
  lstrok: eD,
  ltcc: tD,
  ltcir: nD,
  lt: rD,
  LT: sD,
  Lt: oD,
  ltdot: cD,
  lthree: iD,
  ltimes: lD,
  ltlarr: aD,
  ltquest: uD,
  ltri: fD,
  ltrie: pD,
  ltrif: hD,
  ltrPar: dD,
  lurdshar: gD,
  luruhar: mD,
  lvertneqq: _D,
  lvnE: bD,
  macr: vD,
  male: xD,
  malt: yD,
  maltese: kD,
  Map: "â¤…",
  map: ED,
  mapsto: wD,
  mapstodown: CD,
  mapstoleft: AD,
  mapstoup: SD,
  marker: DD,
  mcomma: TD,
  Mcy: RD,
  mcy: qD,
  mdash: MD,
  mDDot: ND,
  measuredangle: ID,
  MediumSpace: FD,
  Mellintrf: LD,
  Mfr: OD,
  mfr: PD,
  mho: BD,
  micro: $D,
  midast: zD,
  midcir: UD,
  mid: HD,
  middot: jD,
  minusb: VD,
  minus: GD,
  minusd: ZD,
  minusdu: KD,
  MinusPlus: WD,
  mlcp: JD,
  mldr: YD,
  mnplus: XD,
  models: QD,
  Mopf: eT,
  mopf: tT,
  mp: nT,
  mscr: rT,
  Mscr: sT,
  mstpos: oT,
  Mu: cT,
  mu: iT,
  multimap: lT,
  mumap: aT,
  nabla: uT,
  Nacute: fT,
  nacute: pT,
  nang: hT,
  nap: dT,
  napE: gT,
  napid: mT,
  napos: _T,
  napprox: bT,
  natural: vT,
  naturals: xT,
  natur: yT,
  nbsp: kT,
  nbump: ET,
  nbumpe: wT,
  ncap: CT,
  Ncaron: AT,
  ncaron: ST,
  Ncedil: DT,
  ncedil: TT,
  ncong: RT,
  ncongdot: qT,
  ncup: MT,
  Ncy: NT,
  ncy: IT,
  ndash: FT,
  nearhk: LT,
  nearr: OT,
  neArr: PT,
  nearrow: BT,
  ne: $T,
  nedot: zT,
  NegativeMediumSpace: UT,
  NegativeThickSpace: HT,
  NegativeThinSpace: jT,
  NegativeVeryThinSpace: VT,
  nequiv: GT,
  nesear: ZT,
  nesim: KT,
  NestedGreaterGreater: WT,
  NestedLessLess: JT,
  NewLine: YT,
  nexist: XT,
  nexists: QT,
  Nfr: eR,
  nfr: tR,
  ngE: nR,
  nge: rR,
  ngeq: sR,
  ngeqq: oR,
  ngeqslant: cR,
  nges: iR,
  nGg: lR,
  ngsim: aR,
  nGt: uR,
  ngt: fR,
  ngtr: pR,
  nGtv: hR,
  nharr: dR,
  nhArr: gR,
  nhpar: mR,
  ni: _R,
  nis: bR,
  nisd: vR,
  niv: xR,
  NJcy: yR,
  njcy: kR,
  nlarr: ER,
  nlArr: wR,
  nldr: CR,
  nlE: AR,
  nle: SR,
  nleftarrow: DR,
  nLeftarrow: TR,
  nleftrightarrow: RR,
  nLeftrightarrow: qR,
  nleq: MR,
  nleqq: NR,
  nleqslant: IR,
  nles: FR,
  nless: LR,
  nLl: OR,
  nlsim: PR,
  nLt: BR,
  nlt: $R,
  nltri: zR,
  nltrie: UR,
  nLtv: HR,
  nmid: jR,
  NoBreak: VR,
  NonBreakingSpace: GR,
  nopf: ZR,
  Nopf: KR,
  Not: WR,
  not: JR,
  NotCongruent: YR,
  NotCupCap: XR,
  NotDoubleVerticalBar: QR,
  NotElement: eq,
  NotEqual: tq,
  NotEqualTilde: nq,
  NotExists: rq,
  NotGreater: sq,
  NotGreaterEqual: oq,
  NotGreaterFullEqual: cq,
  NotGreaterGreater: iq,
  NotGreaterLess: lq,
  NotGreaterSlantEqual: aq,
  NotGreaterTilde: uq,
  NotHumpDownHump: fq,
  NotHumpEqual: pq,
  notin: hq,
  notindot: dq,
  notinE: gq,
  notinva: mq,
  notinvb: _q,
  notinvc: bq,
  NotLeftTriangleBar: vq,
  NotLeftTriangle: xq,
  NotLeftTriangleEqual: yq,
  NotLess: kq,
  NotLessEqual: Eq,
  NotLessGreater: wq,
  NotLessLess: Cq,
  NotLessSlantEqual: Aq,
  NotLessTilde: Sq,
  NotNestedGreaterGreater: Dq,
  NotNestedLessLess: Tq,
  notni: Rq,
  notniva: qq,
  notnivb: Mq,
  notnivc: Nq,
  NotPrecedes: Iq,
  NotPrecedesEqual: Fq,
  NotPrecedesSlantEqual: Lq,
  NotReverseElement: Oq,
  NotRightTriangleBar: Pq,
  NotRightTriangle: Bq,
  NotRightTriangleEqual: $q,
  NotSquareSubset: zq,
  NotSquareSubsetEqual: Uq,
  NotSquareSuperset: Hq,
  NotSquareSupersetEqual: jq,
  NotSubset: Vq,
  NotSubsetEqual: Gq,
  NotSucceeds: Zq,
  NotSucceedsEqual: Kq,
  NotSucceedsSlantEqual: Wq,
  NotSucceedsTilde: Jq,
  NotSuperset: Yq,
  NotSupersetEqual: Xq,
  NotTilde: Qq,
  NotTildeEqual: eM,
  NotTildeFullEqual: tM,
  NotTildeTilde: nM,
  NotVerticalBar: rM,
  nparallel: sM,
  npar: oM,
  nparsl: cM,
  npart: iM,
  npolint: lM,
  npr: aM,
  nprcue: uM,
  nprec: fM,
  npreceq: pM,
  npre: hM,
  nrarrc: dM,
  nrarr: gM,
  nrArr: mM,
  nrarrw: _M,
  nrightarrow: bM,
  nRightarrow: vM,
  nrtri: xM,
  nrtrie: yM,
  nsc: kM,
  nsccue: EM,
  nsce: wM,
  Nscr: CM,
  nscr: AM,
  nshortmid: SM,
  nshortparallel: DM,
  nsim: TM,
  nsime: RM,
  nsimeq: qM,
  nsmid: MM,
  nspar: NM,
  nsqsube: IM,
  nsqsupe: FM,
  nsub: LM,
  nsubE: OM,
  nsube: PM,
  nsubset: BM,
  nsubseteq: $M,
  nsubseteqq: zM,
  nsucc: UM,
  nsucceq: HM,
  nsup: jM,
  nsupE: VM,
  nsupe: GM,
  nsupset: ZM,
  nsupseteq: KM,
  nsupseteqq: WM,
  ntgl: JM,
  Ntilde: YM,
  ntilde: XM,
  ntlg: QM,
  ntriangleleft: eN,
  ntrianglelefteq: tN,
  ntriangleright: nN,
  ntrianglerighteq: rN,
  Nu: sN,
  nu: oN,
  num: cN,
  numero: iN,
  numsp: lN,
  nvap: aN,
  nvdash: uN,
  nvDash: fN,
  nVdash: pN,
  nVDash: hN,
  nvge: dN,
  nvgt: gN,
  nvHarr: mN,
  nvinfin: _N,
  nvlArr: bN,
  nvle: vN,
  nvlt: xN,
  nvltrie: yN,
  nvrArr: kN,
  nvrtrie: EN,
  nvsim: wN,
  nwarhk: CN,
  nwarr: AN,
  nwArr: SN,
  nwarrow: DN,
  nwnear: TN,
  Oacute: RN,
  oacute: qN,
  oast: MN,
  Ocirc: NN,
  ocirc: IN,
  ocir: FN,
  Ocy: LN,
  ocy: ON,
  odash: PN,
  Odblac: BN,
  odblac: $N,
  odiv: zN,
  odot: UN,
  odsold: HN,
  OElig: jN,
  oelig: VN,
  ofcir: GN,
  Ofr: ZN,
  ofr: KN,
  ogon: WN,
  Ograve: JN,
  ograve: YN,
  ogt: XN,
  ohbar: QN,
  ohm: eI,
  oint: tI,
  olarr: nI,
  olcir: rI,
  olcross: sI,
  oline: oI,
  olt: cI,
  Omacr: iI,
  omacr: lI,
  Omega: aI,
  omega: uI,
  Omicron: fI,
  omicron: pI,
  omid: hI,
  ominus: dI,
  Oopf: gI,
  oopf: mI,
  opar: _I,
  OpenCurlyDoubleQuote: bI,
  OpenCurlyQuote: vI,
  operp: xI,
  oplus: yI,
  orarr: kI,
  Or: EI,
  or: wI,
  ord: CI,
  order: AI,
  orderof: SI,
  ordf: DI,
  ordm: TI,
  origof: RI,
  oror: qI,
  orslope: MI,
  orv: NI,
  oS: II,
  Oscr: FI,
  oscr: LI,
  Oslash: OI,
  oslash: PI,
  osol: BI,
  Otilde: $I,
  otilde: zI,
  otimesas: UI,
  Otimes: HI,
  otimes: jI,
  Ouml: VI,
  ouml: GI,
  ovbar: ZI,
  OverBar: KI,
  OverBrace: WI,
  OverBracket: JI,
  OverParenthesis: YI,
  para: XI,
  parallel: QI,
  par: eF,
  parsim: tF,
  parsl: nF,
  part: rF,
  PartialD: sF,
  Pcy: oF,
  pcy: cF,
  percnt: iF,
  period: lF,
  permil: aF,
  perp: uF,
  pertenk: fF,
  Pfr: pF,
  pfr: hF,
  Phi: dF,
  phi: gF,
  phiv: mF,
  phmmat: _F,
  phone: bF,
  Pi: vF,
  pi: xF,
  pitchfork: yF,
  piv: kF,
  planck: EF,
  planckh: wF,
  plankv: CF,
  plusacir: AF,
  plusb: SF,
  pluscir: DF,
  plus: TF,
  plusdo: RF,
  plusdu: qF,
  pluse: MF,
  PlusMinus: NF,
  plusmn: IF,
  plussim: FF,
  plustwo: LF,
  pm: OF,
  Poincareplane: PF,
  pointint: BF,
  popf: $F,
  Popf: zF,
  pound: UF,
  prap: HF,
  Pr: jF,
  pr: VF,
  prcue: GF,
  precapprox: ZF,
  prec: KF,
  preccurlyeq: WF,
  Precedes: JF,
  PrecedesEqual: YF,
  PrecedesSlantEqual: XF,
  PrecedesTilde: QF,
  preceq: eL,
  precnapprox: tL,
  precneqq: nL,
  precnsim: rL,
  pre: sL,
  prE: oL,
  precsim: cL,
  prime: iL,
  Prime: lL,
  primes: aL,
  prnap: uL,
  prnE: fL,
  prnsim: pL,
  prod: hL,
  Product: dL,
  profalar: gL,
  profline: mL,
  profsurf: _L,
  prop: bL,
  Proportional: vL,
  Proportion: xL,
  propto: yL,
  prsim: kL,
  prurel: EL,
  Pscr: wL,
  pscr: CL,
  Psi: AL,
  psi: SL,
  puncsp: DL,
  Qfr: TL,
  qfr: RL,
  qint: qL,
  qopf: ML,
  Qopf: NL,
  qprime: IL,
  Qscr: FL,
  qscr: LL,
  quaternions: OL,
  quatint: PL,
  quest: BL,
  questeq: $L,
  quot: zL,
  QUOT: UL,
  rAarr: HL,
  race: jL,
  Racute: VL,
  racute: GL,
  radic: ZL,
  raemptyv: KL,
  rang: WL,
  Rang: JL,
  rangd: YL,
  range: XL,
  rangle: QL,
  raquo: eO,
  rarrap: tO,
  rarrb: nO,
  rarrbfs: rO,
  rarrc: sO,
  rarr: oO,
  Rarr: cO,
  rArr: iO,
  rarrfs: lO,
  rarrhk: aO,
  rarrlp: uO,
  rarrpl: fO,
  rarrsim: pO,
  Rarrtl: hO,
  rarrtl: dO,
  rarrw: gO,
  ratail: mO,
  rAtail: _O,
  ratio: bO,
  rationals: vO,
  rbarr: xO,
  rBarr: yO,
  RBarr: kO,
  rbbrk: EO,
  rbrace: wO,
  rbrack: CO,
  rbrke: AO,
  rbrksld: SO,
  rbrkslu: DO,
  Rcaron: TO,
  rcaron: RO,
  Rcedil: qO,
  rcedil: MO,
  rceil: NO,
  rcub: IO,
  Rcy: FO,
  rcy: LO,
  rdca: OO,
  rdldhar: PO,
  rdquo: BO,
  rdquor: $O,
  rdsh: zO,
  real: UO,
  realine: HO,
  realpart: jO,
  reals: VO,
  Re: GO,
  rect: ZO,
  reg: KO,
  REG: WO,
  ReverseElement: JO,
  ReverseEquilibrium: YO,
  ReverseUpEquilibrium: XO,
  rfisht: QO,
  rfloor: eP,
  rfr: tP,
  Rfr: nP,
  rHar: rP,
  rhard: sP,
  rharu: oP,
  rharul: cP,
  Rho: iP,
  rho: lP,
  rhov: aP,
  RightAngleBracket: uP,
  RightArrowBar: fP,
  rightarrow: pP,
  RightArrow: hP,
  Rightarrow: dP,
  RightArrowLeftArrow: gP,
  rightarrowtail: mP,
  RightCeiling: _P,
  RightDoubleBracket: bP,
  RightDownTeeVector: vP,
  RightDownVectorBar: xP,
  RightDownVector: yP,
  RightFloor: kP,
  rightharpoondown: EP,
  rightharpoonup: wP,
  rightleftarrows: CP,
  rightleftharpoons: AP,
  rightrightarrows: SP,
  rightsquigarrow: DP,
  RightTeeArrow: TP,
  RightTee: RP,
  RightTeeVector: qP,
  rightthreetimes: MP,
  RightTriangleBar: NP,
  RightTriangle: IP,
  RightTriangleEqual: FP,
  RightUpDownVector: LP,
  RightUpTeeVector: OP,
  RightUpVectorBar: PP,
  RightUpVector: BP,
  RightVectorBar: $P,
  RightVector: zP,
  ring: UP,
  risingdotseq: HP,
  rlarr: jP,
  rlhar: VP,
  rlm: GP,
  rmoustache: ZP,
  rmoust: KP,
  rnmid: WP,
  roang: JP,
  roarr: YP,
  robrk: XP,
  ropar: QP,
  ropf: eB,
  Ropf: tB,
  roplus: nB,
  rotimes: rB,
  RoundImplies: sB,
  rpar: oB,
  rpargt: cB,
  rppolint: iB,
  rrarr: lB,
  Rrightarrow: aB,
  rsaquo: uB,
  rscr: fB,
  Rscr: pB,
  rsh: hB,
  Rsh: dB,
  rsqb: gB,
  rsquo: mB,
  rsquor: _B,
  rthree: bB,
  rtimes: vB,
  rtri: xB,
  rtrie: yB,
  rtrif: kB,
  rtriltri: EB,
  RuleDelayed: wB,
  ruluhar: CB,
  rx: AB,
  Sacute: SB,
  sacute: DB,
  sbquo: TB,
  scap: RB,
  Scaron: qB,
  scaron: MB,
  Sc: NB,
  sc: IB,
  sccue: FB,
  sce: LB,
  scE: OB,
  Scedil: PB,
  scedil: BB,
  Scirc: $B,
  scirc: zB,
  scnap: UB,
  scnE: HB,
  scnsim: jB,
  scpolint: VB,
  scsim: GB,
  Scy: ZB,
  scy: KB,
  sdotb: WB,
  sdot: JB,
  sdote: YB,
  searhk: XB,
  searr: QB,
  seArr: e2,
  searrow: t2,
  sect: n2,
  semi: r2,
  seswar: s2,
  setminus: o2,
  setmn: c2,
  sext: i2,
  Sfr: l2,
  sfr: a2,
  sfrown: u2,
  sharp: f2,
  SHCHcy: p2,
  shchcy: h2,
  SHcy: d2,
  shcy: g2,
  ShortDownArrow: m2,
  ShortLeftArrow: _2,
  shortmid: b2,
  shortparallel: v2,
  ShortRightArrow: x2,
  ShortUpArrow: y2,
  shy: k2,
  Sigma: E2,
  sigma: w2,
  sigmaf: C2,
  sigmav: A2,
  sim: S2,
  simdot: D2,
  sime: T2,
  simeq: R2,
  simg: q2,
  simgE: M2,
  siml: N2,
  simlE: I2,
  simne: F2,
  simplus: L2,
  simrarr: O2,
  slarr: P2,
  SmallCircle: B2,
  smallsetminus: $2,
  smashp: z2,
  smeparsl: U2,
  smid: H2,
  smile: j2,
  smt: V2,
  smte: G2,
  smtes: Z2,
  SOFTcy: K2,
  softcy: W2,
  solbar: J2,
  solb: Y2,
  sol: X2,
  Sopf: Q2,
  sopf: e$,
  spades: t$,
  spadesuit: n$,
  spar: r$,
  sqcap: s$,
  sqcaps: o$,
  sqcup: c$,
  sqcups: i$,
  Sqrt: l$,
  sqsub: a$,
  sqsube: u$,
  sqsubset: f$,
  sqsubseteq: p$,
  sqsup: h$,
  sqsupe: d$,
  sqsupset: g$,
  sqsupseteq: m$,
  square: _$,
  Square: b$,
  SquareIntersection: v$,
  SquareSubset: x$,
  SquareSubsetEqual: y$,
  SquareSuperset: k$,
  SquareSupersetEqual: E$,
  SquareUnion: w$,
  squarf: C$,
  squ: A$,
  squf: S$,
  srarr: D$,
  Sscr: T$,
  sscr: R$,
  ssetmn: q$,
  ssmile: M$,
  sstarf: N$,
  Star: I$,
  star: F$,
  starf: L$,
  straightepsilon: O$,
  straightphi: P$,
  strns: B$,
  sub: $$,
  Sub: z$,
  subdot: U$,
  subE: H$,
  sube: j$,
  subedot: V$,
  submult: G$,
  subnE: Z$,
  subne: K$,
  subplus: W$,
  subrarr: J$,
  subset: Y$,
  Subset: X$,
  subseteq: Q$,
  subseteqq: ez,
  SubsetEqual: tz,
  subsetneq: nz,
  subsetneqq: rz,
  subsim: sz,
  subsub: oz,
  subsup: cz,
  succapprox: iz,
  succ: lz,
  succcurlyeq: az,
  Succeeds: uz,
  SucceedsEqual: fz,
  SucceedsSlantEqual: pz,
  SucceedsTilde: hz,
  succeq: dz,
  succnapprox: gz,
  succneqq: mz,
  succnsim: _z,
  succsim: bz,
  SuchThat: vz,
  sum: xz,
  Sum: yz,
  sung: kz,
  sup1: Ez,
  sup2: wz,
  sup3: Cz,
  sup: Az,
  Sup: Sz,
  supdot: Dz,
  supdsub: Tz,
  supE: Rz,
  supe: qz,
  supedot: Mz,
  Superset: Nz,
  SupersetEqual: Iz,
  suphsol: Fz,
  suphsub: Lz,
  suplarr: Oz,
  supmult: Pz,
  supnE: Bz,
  supne: $z,
  supplus: zz,
  supset: Uz,
  Supset: Hz,
  supseteq: jz,
  supseteqq: Vz,
  supsetneq: Gz,
  supsetneqq: Zz,
  supsim: Kz,
  supsub: Wz,
  supsup: Jz,
  swarhk: Yz,
  swarr: Xz,
  swArr: Qz,
  swarrow: eU,
  swnwar: tU,
  szlig: nU,
  Tab: rU,
  target: sU,
  Tau: oU,
  tau: cU,
  tbrk: iU,
  Tcaron: lU,
  tcaron: aU,
  Tcedil: uU,
  tcedil: fU,
  Tcy: pU,
  tcy: hU,
  tdot: dU,
  telrec: gU,
  Tfr: mU,
  tfr: _U,
  there4: bU,
  therefore: vU,
  Therefore: xU,
  Theta: yU,
  theta: kU,
  thetasym: EU,
  thetav: wU,
  thickapprox: CU,
  thicksim: AU,
  ThickSpace: SU,
  ThinSpace: DU,
  thinsp: TU,
  thkap: RU,
  thksim: qU,
  THORN: MU,
  thorn: NU,
  tilde: IU,
  Tilde: FU,
  TildeEqual: LU,
  TildeFullEqual: OU,
  TildeTilde: PU,
  timesbar: BU,
  timesb: $U,
  times: zU,
  timesd: UU,
  tint: HU,
  toea: jU,
  topbot: VU,
  topcir: GU,
  top: ZU,
  Topf: KU,
  topf: WU,
  topfork: JU,
  tosa: YU,
  tprime: XU,
  trade: QU,
  TRADE: e3,
  triangle: t3,
  triangledown: n3,
  triangleleft: r3,
  trianglelefteq: s3,
  triangleq: o3,
  triangleright: c3,
  trianglerighteq: i3,
  tridot: l3,
  trie: a3,
  triminus: u3,
  TripleDot: f3,
  triplus: p3,
  trisb: h3,
  tritime: d3,
  trpezium: g3,
  Tscr: m3,
  tscr: _3,
  TScy: b3,
  tscy: v3,
  TSHcy: x3,
  tshcy: y3,
  Tstrok: k3,
  tstrok: E3,
  twixt: w3,
  twoheadleftarrow: C3,
  twoheadrightarrow: A3,
  Uacute: S3,
  uacute: D3,
  uarr: T3,
  Uarr: R3,
  uArr: q3,
  Uarrocir: M3,
  Ubrcy: N3,
  ubrcy: I3,
  Ubreve: F3,
  ubreve: L3,
  Ucirc: O3,
  ucirc: P3,
  Ucy: B3,
  ucy: $3,
  udarr: z3,
  Udblac: U3,
  udblac: H3,
  udhar: j3,
  ufisht: V3,
  Ufr: G3,
  ufr: Z3,
  Ugrave: K3,
  ugrave: W3,
  uHar: J3,
  uharl: Y3,
  uharr: X3,
  uhblk: Q3,
  ulcorn: eH,
  ulcorner: tH,
  ulcrop: nH,
  ultri: rH,
  Umacr: sH,
  umacr: oH,
  uml: cH,
  UnderBar: iH,
  UnderBrace: lH,
  UnderBracket: aH,
  UnderParenthesis: uH,
  Union: fH,
  UnionPlus: pH,
  Uogon: hH,
  uogon: dH,
  Uopf: gH,
  uopf: mH,
  UpArrowBar: _H,
  uparrow: bH,
  UpArrow: vH,
  Uparrow: xH,
  UpArrowDownArrow: yH,
  updownarrow: kH,
  UpDownArrow: EH,
  Updownarrow: wH,
  UpEquilibrium: CH,
  upharpoonleft: AH,
  upharpoonright: SH,
  uplus: DH,
  UpperLeftArrow: TH,
  UpperRightArrow: RH,
  upsi: qH,
  Upsi: MH,
  upsih: NH,
  Upsilon: IH,
  upsilon: FH,
  UpTeeArrow: LH,
  UpTee: OH,
  upuparrows: PH,
  urcorn: BH,
  urcorner: $H,
  urcrop: zH,
  Uring: UH,
  uring: HH,
  urtri: jH,
  Uscr: VH,
  uscr: GH,
  utdot: ZH,
  Utilde: KH,
  utilde: WH,
  utri: JH,
  utrif: YH,
  uuarr: XH,
  Uuml: QH,
  uuml: e6,
  uwangle: t6,
  vangrt: n6,
  varepsilon: r6,
  varkappa: s6,
  varnothing: o6,
  varphi: c6,
  varpi: i6,
  varpropto: l6,
  varr: a6,
  vArr: u6,
  varrho: f6,
  varsigma: p6,
  varsubsetneq: h6,
  varsubsetneqq: d6,
  varsupsetneq: g6,
  varsupsetneqq: m6,
  vartheta: _6,
  vartriangleleft: b6,
  vartriangleright: v6,
  vBar: x6,
  Vbar: y6,
  vBarv: k6,
  Vcy: E6,
  vcy: w6,
  vdash: C6,
  vDash: A6,
  Vdash: S6,
  VDash: D6,
  Vdashl: T6,
  veebar: R6,
  vee: q6,
  Vee: M6,
  veeeq: N6,
  vellip: I6,
  verbar: F6,
  Verbar: L6,
  vert: O6,
  Vert: P6,
  VerticalBar: B6,
  VerticalLine: $6,
  VerticalSeparator: z6,
  VerticalTilde: U6,
  VeryThinSpace: H6,
  Vfr: j6,
  vfr: V6,
  vltri: G6,
  vnsub: Z6,
  vnsup: K6,
  Vopf: W6,
  vopf: J6,
  vprop: Y6,
  vrtri: X6,
  Vscr: Q6,
  vscr: e8,
  vsubnE: t8,
  vsubne: n8,
  vsupnE: r8,
  vsupne: s8,
  Vvdash: o8,
  vzigzag: c8,
  Wcirc: i8,
  wcirc: l8,
  wedbar: a8,
  wedge: u8,
  Wedge: f8,
  wedgeq: p8,
  weierp: h8,
  Wfr: d8,
  wfr: g8,
  Wopf: m8,
  wopf: _8,
  wp: b8,
  wr: v8,
  wreath: x8,
  Wscr: y8,
  wscr: k8,
  xcap: E8,
  xcirc: w8,
  xcup: C8,
  xdtri: A8,
  Xfr: S8,
  xfr: D8,
  xharr: T8,
  xhArr: R8,
  Xi: q8,
  xi: M8,
  xlarr: N8,
  xlArr: I8,
  xmap: F8,
  xnis: L8,
  xodot: O8,
  Xopf: P8,
  xopf: B8,
  xoplus: $8,
  xotime: z8,
  xrarr: U8,
  xrArr: H8,
  Xscr: j8,
  xscr: V8,
  xsqcup: G8,
  xuplus: Z8,
  xutri: K8,
  xvee: W8,
  xwedge: J8,
  Yacute: Y8,
  yacute: X8,
  YAcy: Q8,
  yacy: ej,
  Ycirc: tj,
  ycirc: nj,
  Ycy: rj,
  ycy: sj,
  yen: oj,
  Yfr: cj,
  yfr: ij,
  YIcy: lj,
  yicy: aj,
  Yopf: uj,
  yopf: fj,
  Yscr: pj,
  yscr: hj,
  YUcy: dj,
  yucy: gj,
  yuml: mj,
  Yuml: _j,
  Zacute: bj,
  zacute: vj,
  Zcaron: xj,
  zcaron: yj,
  Zcy: kj,
  zcy: Ej,
  Zdot: wj,
  zdot: Cj,
  zeetrf: Aj,
  ZeroWidthSpace: Sj,
  Zeta: Dj,
  zeta: Tj,
  zfr: Rj,
  Zfr: qj,
  ZHcy: Mj,
  zhcy: Nj,
  zigrarr: Ij,
  zopf: Fj,
  Zopf: Lj,
  Zscr: Oj,
  zscr: Pj,
  zwj: Bj,
  zwnj: $j
};
var Ni = zj, Ps = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/, Qt = {}, Bo = {};
function Uj(t) {
  var e, n, r = Bo[t];
  if (r)
    return r;
  for (r = Bo[t] = [], e = 0; e < 128; e++)
    n = String.fromCharCode(e), /^[0-9a-z]$/i.test(n) ? r.push(n) : r.push("%" + ("0" + e.toString(16).toUpperCase()).slice(-2));
  for (e = 0; e < t.length; e++)
    r[t.charCodeAt(e)] = t[e];
  return r;
}
function _r(t, e, n) {
  var r, s, o, c, i, l = "";
  for (typeof e != "string" && (n = e, e = _r.defaultChars), typeof n > "u" && (n = !0), i = Uj(e), r = 0, s = t.length; r < s; r++) {
    if (o = t.charCodeAt(r), n && o === 37 && r + 2 < s && /^[0-9a-f]{2}$/i.test(t.slice(r + 1, r + 3))) {
      l += t.slice(r, r + 3), r += 2;
      continue;
    }
    if (o < 128) {
      l += i[o];
      continue;
    }
    if (o >= 55296 && o <= 57343) {
      if (o >= 55296 && o <= 56319 && r + 1 < s && (c = t.charCodeAt(r + 1), c >= 56320 && c <= 57343)) {
        l += encodeURIComponent(t[r] + t[r + 1]), r++;
        continue;
      }
      l += "%EF%BF%BD";
      continue;
    }
    l += encodeURIComponent(t[r]);
  }
  return l;
}
_r.defaultChars = ";/?:@&=+$,-_.!~*'()#";
_r.componentChars = "-_.!~*'()";
var Hj = _r, $o = {};
function jj(t) {
  var e, n, r = $o[t];
  if (r)
    return r;
  for (r = $o[t] = [], e = 0; e < 128; e++)
    n = String.fromCharCode(e), r.push(n);
  for (e = 0; e < t.length; e++)
    n = t.charCodeAt(e), r[n] = "%" + ("0" + n.toString(16).toUpperCase()).slice(-2);
  return r;
}
function br(t, e) {
  var n;
  return typeof e != "string" && (e = br.defaultChars), n = jj(e), t.replace(/(%[a-f0-9]{2})+/gi, function(r) {
    var s, o, c, i, l, a, u, f = "";
    for (s = 0, o = r.length; s < o; s += 3) {
      if (c = parseInt(r.slice(s + 1, s + 3), 16), c < 128) {
        f += n[c];
        continue;
      }
      if ((c & 224) === 192 && s + 3 < o && (i = parseInt(r.slice(s + 4, s + 6), 16), (i & 192) === 128)) {
        u = c << 6 & 1984 | i & 63, u < 128 ? f += "ï¿½ï¿½" : f += String.fromCharCode(u), s += 3;
        continue;
      }
      if ((c & 240) === 224 && s + 6 < o && (i = parseInt(r.slice(s + 4, s + 6), 16), l = parseInt(r.slice(s + 7, s + 9), 16), (i & 192) === 128 && (l & 192) === 128)) {
        u = c << 12 & 61440 | i << 6 & 4032 | l & 63, u < 2048 || u >= 55296 && u <= 57343 ? f += "ï¿½ï¿½ï¿½" : f += String.fromCharCode(u), s += 6;
        continue;
      }
      if ((c & 248) === 240 && s + 9 < o && (i = parseInt(r.slice(s + 4, s + 6), 16), l = parseInt(r.slice(s + 7, s + 9), 16), a = parseInt(r.slice(s + 10, s + 12), 16), (i & 192) === 128 && (l & 192) === 128 && (a & 192) === 128)) {
        u = c << 18 & 1835008 | i << 12 & 258048 | l << 6 & 4032 | a & 63, u < 65536 || u > 1114111 ? f += "ï¿½ï¿½ï¿½ï¿½" : (u -= 65536, f += String.fromCharCode(55296 + (u >> 10), 56320 + (u & 1023))), s += 9;
        continue;
      }
      f += "ï¿½";
    }
    return f;
  });
}
br.defaultChars = ";/?:@&=+$,#";
br.componentChars = "";
var Vj = br, Gj = function(e) {
  var n = "";
  return n += e.protocol || "", n += e.slashes ? "//" : "", n += e.auth ? e.auth + "@" : "", e.hostname && e.hostname.indexOf(":") !== -1 ? n += "[" + e.hostname + "]" : n += e.hostname || "", n += e.port ? ":" + e.port : "", n += e.pathname || "", n += e.search || "", n += e.hash || "", n;
};
function tr() {
  this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;
}
var Zj = /^([a-z0-9.+-]+:)/i, Kj = /:[0-9]*$/, Wj = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, Jj = ["<", ">", '"', "`", " ", "\r", `
`, "	"], Yj = ["{", "}", "|", "\\", "^", "`"].concat(Jj), Xj = ["'"].concat(Yj), zo = ["%", "/", "?", ";", "#"].concat(Xj), Uo = ["/", "?", "#"], Qj = 255, Ho = /^[+a-z0-9A-Z_-]{0,63}$/, e4 = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, jo = {
  javascript: !0,
  "javascript:": !0
}, Vo = {
  http: !0,
  https: !0,
  ftp: !0,
  gopher: !0,
  file: !0,
  "http:": !0,
  "https:": !0,
  "ftp:": !0,
  "gopher:": !0,
  "file:": !0
};
function t4(t, e) {
  if (t && t instanceof tr)
    return t;
  var n = new tr();
  return n.parse(t, e), n;
}
tr.prototype.parse = function(t, e) {
  var n, r, s, o, c, i = t;
  if (i = i.trim(), !e && t.split("#").length === 1) {
    var l = Wj.exec(i);
    if (l)
      return this.pathname = l[1], l[2] && (this.search = l[2]), this;
  }
  var a = Zj.exec(i);
  if (a && (a = a[0], s = a.toLowerCase(), this.protocol = a, i = i.substr(a.length)), (e || a || i.match(/^\/\/[^@\/]+@[^@\/]+/)) && (c = i.substr(0, 2) === "//", c && !(a && jo[a]) && (i = i.substr(2), this.slashes = !0)), !jo[a] && (c || a && !Vo[a])) {
    var u = -1;
    for (n = 0; n < Uo.length; n++)
      o = i.indexOf(Uo[n]), o !== -1 && (u === -1 || o < u) && (u = o);
    var f, p;
    for (u === -1 ? p = i.lastIndexOf("@") : p = i.lastIndexOf("@", u), p !== -1 && (f = i.slice(0, p), i = i.slice(p + 1), this.auth = f), u = -1, n = 0; n < zo.length; n++)
      o = i.indexOf(zo[n]), o !== -1 && (u === -1 || o < u) && (u = o);
    u === -1 && (u = i.length), i[u - 1] === ":" && u--;
    var d = i.slice(0, u);
    i = i.slice(u), this.parseHost(d), this.hostname = this.hostname || "";
    var k = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!k) {
      var b = this.hostname.split(/\./);
      for (n = 0, r = b.length; n < r; n++) {
        var I = b[n];
        if (I && !I.match(Ho)) {
          for (var T = "", C = 0, N = I.length; C < N; C++)
            I.charCodeAt(C) > 127 ? T += "x" : T += I[C];
          if (!T.match(Ho)) {
            var A = b.slice(0, n), j = b.slice(n + 1), q = I.match(e4);
            q && (A.push(q[1]), j.unshift(q[2])), j.length && (i = j.join(".") + i), this.hostname = A.join(".");
            break;
          }
        }
      }
    }
    this.hostname.length > Qj && (this.hostname = ""), k && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
  }
  var W = i.indexOf("#");
  W !== -1 && (this.hash = i.substr(W), i = i.slice(0, W));
  var $ = i.indexOf("?");
  return $ !== -1 && (this.search = i.substr($), i = i.slice(0, $)), i && (this.pathname = i), Vo[s] && this.hostname && !this.pathname && (this.pathname = ""), this;
};
tr.prototype.parseHost = function(t) {
  var e = Kj.exec(t);
  e && (e = e[0], e !== ":" && (this.port = e.substr(1)), t = t.substr(0, t.length - e.length)), t && (this.hostname = t);
};
var n4 = t4;
Qt.encode = Hj;
Qt.decode = Vj;
Qt.format = Gj;
Qt.parse = n4;
var vt = {}, Lr, Go;
function Ii() {
  return Go || (Go = 1, Lr = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/), Lr;
}
var Or, Zo;
function Fi() {
  return Zo || (Zo = 1, Or = /[\0-\x1F\x7F-\x9F]/), Or;
}
var Pr, Ko;
function r4() {
  return Ko || (Ko = 1, Pr = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/), Pr;
}
var Br, Wo;
function Li() {
  return Wo || (Wo = 1, Br = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/), Br;
}
var Jo;
function s4() {
  return Jo || (Jo = 1, vt.Any = Ii(), vt.Cc = Fi(), vt.Cf = r4(), vt.P = Ps, vt.Z = Li()), vt;
}
(function(t) {
  function e(D) {
    return Object.prototype.toString.call(D);
  }
  function n(D) {
    return e(D) === "[object String]";
  }
  var r = Object.prototype.hasOwnProperty;
  function s(D, ne) {
    return r.call(D, ne);
  }
  function o(D) {
    var ne = Array.prototype.slice.call(arguments, 1);
    return ne.forEach(function(V) {
      if (V) {
        if (typeof V != "object")
          throw new TypeError(V + "must be object");
        Object.keys(V).forEach(function(v) {
          D[v] = V[v];
        });
      }
    }), D;
  }
  function c(D, ne, V) {
    return [].concat(D.slice(0, ne), V, D.slice(ne + 1));
  }
  function i(D) {
    return !(D >= 55296 && D <= 57343 || D >= 64976 && D <= 65007 || (D & 65535) === 65535 || (D & 65535) === 65534 || D >= 0 && D <= 8 || D === 11 || D >= 14 && D <= 31 || D >= 127 && D <= 159 || D > 1114111);
  }
  function l(D) {
    if (D > 65535) {
      D -= 65536;
      var ne = 55296 + (D >> 10), V = 56320 + (D & 1023);
      return String.fromCharCode(ne, V);
    }
    return String.fromCharCode(D);
  }
  var a = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g, u = /&([a-z#][a-z0-9]{1,31});/gi, f = new RegExp(a.source + "|" + u.source, "gi"), p = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i, d = Ni;
  function k(D, ne) {
    var V = 0;
    return s(d, ne) ? d[ne] : ne.charCodeAt(0) === 35 && p.test(ne) && (V = ne[1].toLowerCase() === "x" ? parseInt(ne.slice(2), 16) : parseInt(ne.slice(1), 10), i(V)) ? l(V) : D;
  }
  function b(D) {
    return D.indexOf("\\") < 0 ? D : D.replace(a, "$1");
  }
  function I(D) {
    return D.indexOf("\\") < 0 && D.indexOf("&") < 0 ? D : D.replace(f, function(ne, V, v) {
      return V || k(ne, v);
    });
  }
  var T = /[&<>"]/, C = /[&<>"]/g, N = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  };
  function A(D) {
    return N[D];
  }
  function j(D) {
    return T.test(D) ? D.replace(C, A) : D;
  }
  var q = /[.?*+^$[\]\\(){}|-]/g;
  function W(D) {
    return D.replace(q, "\\$&");
  }
  function $(D) {
    switch (D) {
      case 9:
      case 32:
        return !0;
    }
    return !1;
  }
  function X(D) {
    if (D >= 8192 && D <= 8202)
      return !0;
    switch (D) {
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 32:
      case 160:
      case 5760:
      case 8239:
      case 8287:
      case 12288:
        return !0;
    }
    return !1;
  }
  var z = Ps;
  function J(D) {
    return z.test(D);
  }
  function B(D) {
    switch (D) {
      case 33:
      case 34:
      case 35:
      case 36:
      case 37:
      case 38:
      case 39:
      case 40:
      case 41:
      case 42:
      case 43:
      case 44:
      case 45:
      case 46:
      case 47:
      case 58:
      case 59:
      case 60:
      case 61:
      case 62:
      case 63:
      case 64:
      case 91:
      case 92:
      case 93:
      case 94:
      case 95:
      case 96:
      case 123:
      case 124:
      case 125:
      case 126:
        return !0;
      default:
        return !1;
    }
  }
  function re(D) {
    return D = D.trim().replace(/\s+/g, " "), "áºž".toLowerCase() === "á¹¾" && (D = D.replace(/áºž/g, "ÃŸ")), D.toLowerCase().toUpperCase();
  }
  t.lib = {}, t.lib.mdurl = Qt, t.lib.ucmicro = s4(), t.assign = o, t.isString = n, t.has = s, t.unescapeMd = b, t.unescapeAll = I, t.isValidEntityCode = i, t.fromCodePoint = l, t.escapeHtml = j, t.arrayReplaceAt = c, t.isSpace = $, t.isWhiteSpace = X, t.isMdAsciiPunct = B, t.isPunctChar = J, t.escapeRE = W, t.normalizeReference = re;
})(le);
var vr = {}, o4 = function(e, n, r) {
  var s, o, c, i, l = -1, a = e.posMax, u = e.pos;
  for (e.pos = n + 1, s = 1; e.pos < a; ) {
    if (c = e.src.charCodeAt(e.pos), c === 93 && (s--, s === 0)) {
      o = !0;
      break;
    }
    if (i = e.pos, e.md.inline.skipToken(e), c === 91) {
      if (i === e.pos - 1)
        s++;
      else if (r)
        return e.pos = u, -1;
    }
  }
  return o && (l = e.pos), e.pos = u, l;
}, Yo = le.unescapeAll, c4 = function(e, n, r) {
  var s, o, c = 0, i = n, l = {
    ok: !1,
    pos: 0,
    lines: 0,
    str: ""
  };
  if (e.charCodeAt(n) === 60) {
    for (n++; n < r; ) {
      if (s = e.charCodeAt(n), s === 10 || s === 60)
        return l;
      if (s === 62)
        return l.pos = n + 1, l.str = Yo(e.slice(i + 1, n)), l.ok = !0, l;
      if (s === 92 && n + 1 < r) {
        n += 2;
        continue;
      }
      n++;
    }
    return l;
  }
  for (o = 0; n < r && (s = e.charCodeAt(n), !(s === 32 || s < 32 || s === 127)); ) {
    if (s === 92 && n + 1 < r) {
      if (e.charCodeAt(n + 1) === 32)
        break;
      n += 2;
      continue;
    }
    if (s === 40 && (o++, o > 32))
      return l;
    if (s === 41) {
      if (o === 0)
        break;
      o--;
    }
    n++;
  }
  return i === n || o !== 0 || (l.str = Yo(e.slice(i, n)), l.lines = c, l.pos = n, l.ok = !0), l;
}, i4 = le.unescapeAll, l4 = function(e, n, r) {
  var s, o, c = 0, i = n, l = {
    ok: !1,
    pos: 0,
    lines: 0,
    str: ""
  };
  if (n >= r || (o = e.charCodeAt(n), o !== 34 && o !== 39 && o !== 40))
    return l;
  for (n++, o === 40 && (o = 41); n < r; ) {
    if (s = e.charCodeAt(n), s === o)
      return l.pos = n + 1, l.lines = c, l.str = i4(e.slice(i + 1, n)), l.ok = !0, l;
    if (s === 40 && o === 41)
      return l;
    s === 10 ? c++ : s === 92 && n + 1 < r && (n++, e.charCodeAt(n) === 10 && c++), n++;
  }
  return l;
};
vr.parseLinkLabel = o4;
vr.parseLinkDestination = c4;
vr.parseLinkTitle = l4;
var a4 = le.assign, u4 = le.unescapeAll, qt = le.escapeHtml, Ye = {};
Ye.code_inline = function(t, e, n, r, s) {
  var o = t[e];
  return "<code" + s.renderAttrs(o) + ">" + qt(t[e].content) + "</code>";
};
Ye.code_block = function(t, e, n, r, s) {
  var o = t[e];
  return "<pre" + s.renderAttrs(o) + "><code>" + qt(t[e].content) + `</code></pre>
`;
};
Ye.fence = function(t, e, n, r, s) {
  var o = t[e], c = o.info ? u4(o.info).trim() : "", i = "", l = "", a, u, f, p, d;
  return c && (f = c.split(/(\s+)/g), i = f[0], l = f.slice(2).join("")), n.highlight ? a = n.highlight(o.content, i, l) || qt(o.content) : a = qt(o.content), a.indexOf("<pre") === 0 ? a + `
` : c ? (u = o.attrIndex("class"), p = o.attrs ? o.attrs.slice() : [], u < 0 ? p.push(["class", n.langPrefix + i]) : (p[u] = p[u].slice(), p[u][1] += " " + n.langPrefix + i), d = {
    attrs: p
  }, "<pre><code" + s.renderAttrs(d) + ">" + a + `</code></pre>
`) : "<pre><code" + s.renderAttrs(o) + ">" + a + `</code></pre>
`;
};
Ye.image = function(t, e, n, r, s) {
  var o = t[e];
  return o.attrs[o.attrIndex("alt")][1] = s.renderInlineAsText(o.children, n, r), s.renderToken(t, e, n);
};
Ye.hardbreak = function(t, e, n) {
  return n.xhtmlOut ? `<br />
` : `<br>
`;
};
Ye.softbreak = function(t, e, n) {
  return n.breaks ? n.xhtmlOut ? `<br />
` : `<br>
` : `
`;
};
Ye.text = function(t, e) {
  return qt(t[e].content);
};
Ye.html_block = function(t, e) {
  return t[e].content;
};
Ye.html_inline = function(t, e) {
  return t[e].content;
};
function en() {
  this.rules = a4({}, Ye);
}
en.prototype.renderAttrs = function(e) {
  var n, r, s;
  if (!e.attrs)
    return "";
  for (s = "", n = 0, r = e.attrs.length; n < r; n++)
    s += " " + qt(e.attrs[n][0]) + '="' + qt(e.attrs[n][1]) + '"';
  return s;
};
en.prototype.renderToken = function(e, n, r) {
  var s, o = "", c = !1, i = e[n];
  return i.hidden ? "" : (i.block && i.nesting !== -1 && n && e[n - 1].hidden && (o += `
`), o += (i.nesting === -1 ? "</" : "<") + i.tag, o += this.renderAttrs(i), i.nesting === 0 && r.xhtmlOut && (o += " /"), i.block && (c = !0, i.nesting === 1 && n + 1 < e.length && (s = e[n + 1], (s.type === "inline" || s.hidden || s.nesting === -1 && s.tag === i.tag) && (c = !1))), o += c ? `>
` : ">", o);
};
en.prototype.renderInline = function(t, e, n) {
  for (var r, s = "", o = this.rules, c = 0, i = t.length; c < i; c++)
    r = t[c].type, typeof o[r] < "u" ? s += o[r](t, c, e, n, this) : s += this.renderToken(t, c, e);
  return s;
};
en.prototype.renderInlineAsText = function(t, e, n) {
  for (var r = "", s = 0, o = t.length; s < o; s++)
    t[s].type === "text" ? r += t[s].content : t[s].type === "image" ? r += this.renderInlineAsText(t[s].children, e, n) : t[s].type === "softbreak" && (r += `
`);
  return r;
};
en.prototype.render = function(t, e, n) {
  var r, s, o, c = "", i = this.rules;
  for (r = 0, s = t.length; r < s; r++)
    o = t[r].type, o === "inline" ? c += this.renderInline(t[r].children, e, n) : typeof i[o] < "u" ? c += i[t[r].type](t, r, e, n, this) : c += this.renderToken(t, r, e, n);
  return c;
};
var f4 = en;
function je() {
  this.__rules__ = [], this.__cache__ = null;
}
je.prototype.__find__ = function(t) {
  for (var e = 0; e < this.__rules__.length; e++)
    if (this.__rules__[e].name === t)
      return e;
  return -1;
};
je.prototype.__compile__ = function() {
  var t = this, e = [""];
  t.__rules__.forEach(function(n) {
    n.enabled && n.alt.forEach(function(r) {
      e.indexOf(r) < 0 && e.push(r);
    });
  }), t.__cache__ = {}, e.forEach(function(n) {
    t.__cache__[n] = [], t.__rules__.forEach(function(r) {
      r.enabled && (n && r.alt.indexOf(n) < 0 || t.__cache__[n].push(r.fn));
    });
  });
};
je.prototype.at = function(t, e, n) {
  var r = this.__find__(t), s = n || {};
  if (r === -1)
    throw new Error("Parser rule not found: " + t);
  this.__rules__[r].fn = e, this.__rules__[r].alt = s.alt || [], this.__cache__ = null;
};
je.prototype.before = function(t, e, n, r) {
  var s = this.__find__(t), o = r || {};
  if (s === -1)
    throw new Error("Parser rule not found: " + t);
  this.__rules__.splice(s, 0, {
    name: e,
    enabled: !0,
    fn: n,
    alt: o.alt || []
  }), this.__cache__ = null;
};
je.prototype.after = function(t, e, n, r) {
  var s = this.__find__(t), o = r || {};
  if (s === -1)
    throw new Error("Parser rule not found: " + t);
  this.__rules__.splice(s + 1, 0, {
    name: e,
    enabled: !0,
    fn: n,
    alt: o.alt || []
  }), this.__cache__ = null;
};
je.prototype.push = function(t, e, n) {
  var r = n || {};
  this.__rules__.push({
    name: t,
    enabled: !0,
    fn: e,
    alt: r.alt || []
  }), this.__cache__ = null;
};
je.prototype.enable = function(t, e) {
  Array.isArray(t) || (t = [t]);
  var n = [];
  return t.forEach(function(r) {
    var s = this.__find__(r);
    if (s < 0) {
      if (e)
        return;
      throw new Error("Rules manager: invalid rule name " + r);
    }
    this.__rules__[s].enabled = !0, n.push(r);
  }, this), this.__cache__ = null, n;
};
je.prototype.enableOnly = function(t, e) {
  Array.isArray(t) || (t = [t]), this.__rules__.forEach(function(n) {
    n.enabled = !1;
  }), this.enable(t, e);
};
je.prototype.disable = function(t, e) {
  Array.isArray(t) || (t = [t]);
  var n = [];
  return t.forEach(function(r) {
    var s = this.__find__(r);
    if (s < 0) {
      if (e)
        return;
      throw new Error("Rules manager: invalid rule name " + r);
    }
    this.__rules__[s].enabled = !1, n.push(r);
  }, this), this.__cache__ = null, n;
};
je.prototype.getRules = function(t) {
  return this.__cache__ === null && this.__compile__(), this.__cache__[t] || [];
};
var Bs = je, p4 = /\r\n?|\n/g, h4 = /\0/g, d4 = function(e) {
  var n;
  n = e.src.replace(p4, `
`), n = n.replace(h4, "ï¿½"), e.src = n;
}, g4 = function(e) {
  var n;
  e.inlineMode ? (n = new e.Token("inline", "", 0), n.content = e.src, n.map = [0, 1], n.children = [], e.tokens.push(n)) : e.md.block.parse(e.src, e.md, e.env, e.tokens);
}, m4 = function(e) {
  var n = e.tokens, r, s, o;
  for (s = 0, o = n.length; s < o; s++)
    r = n[s], r.type === "inline" && e.md.inline.parse(r.content, e.md, e.env, r.children);
}, _4 = le.arrayReplaceAt;
function b4(t) {
  return /^<a[>\s]/i.test(t);
}
function v4(t) {
  return /^<\/a\s*>/i.test(t);
}
var x4 = function(e) {
  var n, r, s, o, c, i, l, a, u, f, p, d, k, b, I, T, C = e.tokens, N;
  if (e.md.options.linkify) {
    for (r = 0, s = C.length; r < s; r++)
      if (!(C[r].type !== "inline" || !e.md.linkify.pretest(C[r].content)))
        for (o = C[r].children, k = 0, n = o.length - 1; n >= 0; n--) {
          if (i = o[n], i.type === "link_close") {
            for (n--; o[n].level !== i.level && o[n].type !== "link_open"; )
              n--;
            continue;
          }
          if (i.type === "html_inline" && (b4(i.content) && k > 0 && k--, v4(i.content) && k++), !(k > 0) && i.type === "text" && e.md.linkify.test(i.content)) {
            for (u = i.content, N = e.md.linkify.match(u), l = [], d = i.level, p = 0, a = 0; a < N.length; a++)
              b = N[a].url, I = e.md.normalizeLink(b), e.md.validateLink(I) && (T = N[a].text, N[a].schema ? N[a].schema === "mailto:" && !/^mailto:/i.test(T) ? T = e.md.normalizeLinkText("mailto:" + T).replace(/^mailto:/, "") : T = e.md.normalizeLinkText(T) : T = e.md.normalizeLinkText("http://" + T).replace(/^http:\/\//, ""), f = N[a].index, f > p && (c = new e.Token("text", "", 0), c.content = u.slice(p, f), c.level = d, l.push(c)), c = new e.Token("link_open", "a", 1), c.attrs = [["href", I]], c.level = d++, c.markup = "linkify", c.info = "auto", l.push(c), c = new e.Token("text", "", 0), c.content = T, c.level = d, l.push(c), c = new e.Token("link_close", "a", -1), c.level = --d, c.markup = "linkify", c.info = "auto", l.push(c), p = N[a].lastIndex);
            p < u.length && (c = new e.Token("text", "", 0), c.content = u.slice(p), c.level = d, l.push(c)), C[r].children = o = _4(o, n, l);
          }
        }
  }
}, Oi = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, y4 = /\((c|tm|r|p)\)/i, k4 = /\((c|tm|r|p)\)/ig, E4 = {
  c: "Â©",
  r: "Â®",
  p: "Â§",
  tm: "â„¢"
};
function w4(t, e) {
  return E4[e.toLowerCase()];
}
function C4(t) {
  var e, n, r = 0;
  for (e = t.length - 1; e >= 0; e--)
    n = t[e], n.type === "text" && !r && (n.content = n.content.replace(k4, w4)), n.type === "link_open" && n.info === "auto" && r--, n.type === "link_close" && n.info === "auto" && r++;
}
function A4(t) {
  var e, n, r = 0;
  for (e = t.length - 1; e >= 0; e--)
    n = t[e], n.type === "text" && !r && Oi.test(n.content) && (n.content = n.content.replace(/\+-/g, "Â±").replace(/\.{2,}/g, "â€¦").replace(/([?!])â€¦/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/mg, "$1â€”").replace(/(^|\s)--(?=\s|$)/mg, "$1â€“").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, "$1â€“")), n.type === "link_open" && n.info === "auto" && r--, n.type === "link_close" && n.info === "auto" && r++;
}
var S4 = function(e) {
  var n;
  if (e.md.options.typographer)
    for (n = e.tokens.length - 1; n >= 0; n--)
      e.tokens[n].type === "inline" && (y4.test(e.tokens[n].content) && C4(e.tokens[n].children), Oi.test(e.tokens[n].content) && A4(e.tokens[n].children));
}, Xo = le.isWhiteSpace, Qo = le.isPunctChar, ec = le.isMdAsciiPunct, D4 = /['"]/, tc = /['"]/g, nc = "â€™";
function Pn(t, e, n) {
  return t.substr(0, e) + n + t.substr(e + 1);
}
function T4(t, e) {
  var n, r, s, o, c, i, l, a, u, f, p, d, k, b, I, T, C, N, A, j, q;
  for (A = [], n = 0; n < t.length; n++) {
    for (r = t[n], l = t[n].level, C = A.length - 1; C >= 0 && !(A[C].level <= l); C--)
      ;
    if (A.length = C + 1, r.type === "text") {
      s = r.content, c = 0, i = s.length;
      e:
        for (; c < i && (tc.lastIndex = c, o = tc.exec(s), !!o); ) {
          if (I = T = !0, c = o.index + 1, N = o[0] === "'", u = 32, o.index - 1 >= 0)
            u = s.charCodeAt(o.index - 1);
          else
            for (C = n - 1; C >= 0 && !(t[C].type === "softbreak" || t[C].type === "hardbreak"); C--)
              if (t[C].content) {
                u = t[C].content.charCodeAt(t[C].content.length - 1);
                break;
              }
          if (f = 32, c < i)
            f = s.charCodeAt(c);
          else
            for (C = n + 1; C < t.length && !(t[C].type === "softbreak" || t[C].type === "hardbreak"); C++)
              if (t[C].content) {
                f = t[C].content.charCodeAt(0);
                break;
              }
          if (p = ec(u) || Qo(String.fromCharCode(u)), d = ec(f) || Qo(String.fromCharCode(f)), k = Xo(u), b = Xo(f), b ? I = !1 : d && (k || p || (I = !1)), k ? T = !1 : p && (b || d || (T = !1)), f === 34 && o[0] === '"' && u >= 48 && u <= 57 && (T = I = !1), I && T && (I = p, T = d), !I && !T) {
            N && (r.content = Pn(r.content, o.index, nc));
            continue;
          }
          if (T) {
            for (C = A.length - 1; C >= 0 && (a = A[C], !(A[C].level < l)); C--)
              if (a.single === N && A[C].level === l) {
                a = A[C], N ? (j = e.md.options.quotes[2], q = e.md.options.quotes[3]) : (j = e.md.options.quotes[0], q = e.md.options.quotes[1]), r.content = Pn(r.content, o.index, q), t[a.token].content = Pn(
                  t[a.token].content,
                  a.pos,
                  j
                ), c += q.length - 1, a.token === n && (c += j.length - 1), s = r.content, i = s.length, A.length = C;
                continue e;
              }
          }
          I ? A.push({
            token: n,
            pos: o.index,
            single: N,
            level: l
          }) : T && N && (r.content = Pn(r.content, o.index, nc));
        }
    }
  }
}
var R4 = function(e) {
  var n;
  if (e.md.options.typographer)
    for (n = e.tokens.length - 1; n >= 0; n--)
      e.tokens[n].type !== "inline" || !D4.test(e.tokens[n].content) || T4(e.tokens[n].children, e);
};
function tn(t, e, n) {
  this.type = t, this.tag = e, this.attrs = null, this.map = null, this.nesting = n, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = !1, this.hidden = !1;
}
tn.prototype.attrIndex = function(e) {
  var n, r, s;
  if (!this.attrs)
    return -1;
  for (n = this.attrs, r = 0, s = n.length; r < s; r++)
    if (n[r][0] === e)
      return r;
  return -1;
};
tn.prototype.attrPush = function(e) {
  this.attrs ? this.attrs.push(e) : this.attrs = [e];
};
tn.prototype.attrSet = function(e, n) {
  var r = this.attrIndex(e), s = [e, n];
  r < 0 ? this.attrPush(s) : this.attrs[r] = s;
};
tn.prototype.attrGet = function(e) {
  var n = this.attrIndex(e), r = null;
  return n >= 0 && (r = this.attrs[n][1]), r;
};
tn.prototype.attrJoin = function(e, n) {
  var r = this.attrIndex(e);
  r < 0 ? this.attrPush([e, n]) : this.attrs[r][1] = this.attrs[r][1] + " " + n;
};
var $s = tn, q4 = $s;
function Pi(t, e, n) {
  this.src = t, this.env = n, this.tokens = [], this.inlineMode = !1, this.md = e;
}
Pi.prototype.Token = q4;
var M4 = Pi, N4 = Bs, $r = [
  ["normalize", d4],
  ["block", g4],
  ["inline", m4],
  ["linkify", x4],
  ["replacements", S4],
  ["smartquotes", R4]
];
function zs() {
  this.ruler = new N4();
  for (var t = 0; t < $r.length; t++)
    this.ruler.push($r[t][0], $r[t][1]);
}
zs.prototype.process = function(t) {
  var e, n, r;
  for (r = this.ruler.getRules(""), e = 0, n = r.length; e < n; e++)
    r[e](t);
};
zs.prototype.State = M4;
var I4 = zs, zr = le.isSpace;
function Ur(t, e) {
  var n = t.bMarks[e] + t.tShift[e], r = t.eMarks[e];
  return t.src.substr(n, r - n);
}
function rc(t) {
  var e = [], n = 0, r = t.length, s, o = !1, c = 0, i = "";
  for (s = t.charCodeAt(n); n < r; )
    s === 124 && (o ? (i += t.substring(c, n - 1), c = n) : (e.push(i + t.substring(c, n)), i = "", c = n + 1)), o = s === 92, n++, s = t.charCodeAt(n);
  return e.push(i + t.substring(c)), e;
}
var F4 = function(e, n, r, s) {
  var o, c, i, l, a, u, f, p, d, k, b, I, T, C, N, A, j, q;
  if (n + 2 > r || (u = n + 1, e.sCount[u] < e.blkIndent) || e.sCount[u] - e.blkIndent >= 4 || (i = e.bMarks[u] + e.tShift[u], i >= e.eMarks[u]) || (j = e.src.charCodeAt(i++), j !== 124 && j !== 45 && j !== 58) || i >= e.eMarks[u] || (q = e.src.charCodeAt(i++), q !== 124 && q !== 45 && q !== 58 && !zr(q)) || j === 45 && zr(q))
    return !1;
  for (; i < e.eMarks[u]; ) {
    if (o = e.src.charCodeAt(i), o !== 124 && o !== 45 && o !== 58 && !zr(o))
      return !1;
    i++;
  }
  for (c = Ur(e, n + 1), f = c.split("|"), k = [], l = 0; l < f.length; l++) {
    if (b = f[l].trim(), !b) {
      if (l === 0 || l === f.length - 1)
        continue;
      return !1;
    }
    if (!/^:?-+:?$/.test(b))
      return !1;
    b.charCodeAt(b.length - 1) === 58 ? k.push(b.charCodeAt(0) === 58 ? "center" : "right") : b.charCodeAt(0) === 58 ? k.push("left") : k.push("");
  }
  if (c = Ur(e, n).trim(), c.indexOf("|") === -1 || e.sCount[n] - e.blkIndent >= 4 || (f = rc(c), f.length && f[0] === "" && f.shift(), f.length && f[f.length - 1] === "" && f.pop(), p = f.length, p === 0 || p !== k.length))
    return !1;
  if (s)
    return !0;
  for (C = e.parentType, e.parentType = "table", A = e.md.block.ruler.getRules("blockquote"), d = e.push("table_open", "table", 1), d.map = I = [n, 0], d = e.push("thead_open", "thead", 1), d.map = [n, n + 1], d = e.push("tr_open", "tr", 1), d.map = [n, n + 1], l = 0; l < f.length; l++)
    d = e.push("th_open", "th", 1), k[l] && (d.attrs = [["style", "text-align:" + k[l]]]), d = e.push("inline", "", 0), d.content = f[l].trim(), d.children = [], d = e.push("th_close", "th", -1);
  for (d = e.push("tr_close", "tr", -1), d = e.push("thead_close", "thead", -1), u = n + 2; u < r && !(e.sCount[u] < e.blkIndent); u++) {
    for (N = !1, l = 0, a = A.length; l < a; l++)
      if (A[l](e, u, r, !0)) {
        N = !0;
        break;
      }
    if (N || (c = Ur(e, u).trim(), !c) || e.sCount[u] - e.blkIndent >= 4)
      break;
    for (f = rc(c), f.length && f[0] === "" && f.shift(), f.length && f[f.length - 1] === "" && f.pop(), u === n + 2 && (d = e.push("tbody_open", "tbody", 1), d.map = T = [n + 2, 0]), d = e.push("tr_open", "tr", 1), d.map = [u, u + 1], l = 0; l < p; l++)
      d = e.push("td_open", "td", 1), k[l] && (d.attrs = [["style", "text-align:" + k[l]]]), d = e.push("inline", "", 0), d.content = f[l] ? f[l].trim() : "", d.children = [], d = e.push("td_close", "td", -1);
    d = e.push("tr_close", "tr", -1);
  }
  return T && (d = e.push("tbody_close", "tbody", -1), T[1] = u), d = e.push("table_close", "table", -1), I[1] = u, e.parentType = C, e.line = u, !0;
}, L4 = function(e, n, r) {
  var s, o, c;
  if (e.sCount[n] - e.blkIndent < 4)
    return !1;
  for (o = s = n + 1; s < r; ) {
    if (e.isEmpty(s)) {
      s++;
      continue;
    }
    if (e.sCount[s] - e.blkIndent >= 4) {
      s++, o = s;
      continue;
    }
    break;
  }
  return e.line = o, c = e.push("code_block", "code", 0), c.content = e.getLines(n, o, 4 + e.blkIndent, !1) + `
`, c.map = [n, e.line], !0;
}, O4 = function(e, n, r, s) {
  var o, c, i, l, a, u, f, p = !1, d = e.bMarks[n] + e.tShift[n], k = e.eMarks[n];
  if (e.sCount[n] - e.blkIndent >= 4 || d + 3 > k || (o = e.src.charCodeAt(d), o !== 126 && o !== 96) || (a = d, d = e.skipChars(d, o), c = d - a, c < 3) || (f = e.src.slice(a, d), i = e.src.slice(d, k), o === 96 && i.indexOf(String.fromCharCode(o)) >= 0))
    return !1;
  if (s)
    return !0;
  for (l = n; l++, !(l >= r || (d = a = e.bMarks[l] + e.tShift[l], k = e.eMarks[l], d < k && e.sCount[l] < e.blkIndent)); )
    if (e.src.charCodeAt(d) === o && !(e.sCount[l] - e.blkIndent >= 4) && (d = e.skipChars(d, o), !(d - a < c) && (d = e.skipSpaces(d), !(d < k)))) {
      p = !0;
      break;
    }
  return c = e.sCount[n], e.line = l + (p ? 1 : 0), u = e.push("fence", "code", 0), u.info = i, u.content = e.getLines(n + 1, l, c, !0), u.markup = f, u.map = [n, e.line], !0;
}, sc = le.isSpace, P4 = function(e, n, r, s) {
  var o, c, i, l, a, u, f, p, d, k, b, I, T, C, N, A, j, q, W, $, X = e.lineMax, z = e.bMarks[n] + e.tShift[n], J = e.eMarks[n];
  if (e.sCount[n] - e.blkIndent >= 4 || e.src.charCodeAt(z++) !== 62)
    return !1;
  if (s)
    return !0;
  for (l = d = e.sCount[n] + 1, e.src.charCodeAt(z) === 32 ? (z++, l++, d++, o = !1, A = !0) : e.src.charCodeAt(z) === 9 ? (A = !0, (e.bsCount[n] + d) % 4 === 3 ? (z++, l++, d++, o = !1) : o = !0) : A = !1, k = [e.bMarks[n]], e.bMarks[n] = z; z < J && (c = e.src.charCodeAt(z), sc(c)); ) {
    c === 9 ? d += 4 - (d + e.bsCount[n] + (o ? 1 : 0)) % 4 : d++;
    z++;
  }
  for (b = [e.bsCount[n]], e.bsCount[n] = e.sCount[n] + 1 + (A ? 1 : 0), u = z >= J, C = [e.sCount[n]], e.sCount[n] = d - l, N = [e.tShift[n]], e.tShift[n] = z - e.bMarks[n], q = e.md.block.ruler.getRules("blockquote"), T = e.parentType, e.parentType = "blockquote", p = n + 1; p < r && ($ = e.sCount[p] < e.blkIndent, z = e.bMarks[p] + e.tShift[p], J = e.eMarks[p], !(z >= J)); p++) {
    if (e.src.charCodeAt(z++) === 62 && !$) {
      for (l = d = e.sCount[p] + 1, e.src.charCodeAt(z) === 32 ? (z++, l++, d++, o = !1, A = !0) : e.src.charCodeAt(z) === 9 ? (A = !0, (e.bsCount[p] + d) % 4 === 3 ? (z++, l++, d++, o = !1) : o = !0) : A = !1, k.push(e.bMarks[p]), e.bMarks[p] = z; z < J && (c = e.src.charCodeAt(z), sc(c)); ) {
        c === 9 ? d += 4 - (d + e.bsCount[p] + (o ? 1 : 0)) % 4 : d++;
        z++;
      }
      u = z >= J, b.push(e.bsCount[p]), e.bsCount[p] = e.sCount[p] + 1 + (A ? 1 : 0), C.push(e.sCount[p]), e.sCount[p] = d - l, N.push(e.tShift[p]), e.tShift[p] = z - e.bMarks[p];
      continue;
    }
    if (u)
      break;
    for (j = !1, i = 0, a = q.length; i < a; i++)
      if (q[i](e, p, r, !0)) {
        j = !0;
        break;
      }
    if (j) {
      e.lineMax = p, e.blkIndent !== 0 && (k.push(e.bMarks[p]), b.push(e.bsCount[p]), N.push(e.tShift[p]), C.push(e.sCount[p]), e.sCount[p] -= e.blkIndent);
      break;
    }
    k.push(e.bMarks[p]), b.push(e.bsCount[p]), N.push(e.tShift[p]), C.push(e.sCount[p]), e.sCount[p] = -1;
  }
  for (I = e.blkIndent, e.blkIndent = 0, W = e.push("blockquote_open", "blockquote", 1), W.markup = ">", W.map = f = [n, 0], e.md.block.tokenize(e, n, p), W = e.push("blockquote_close", "blockquote", -1), W.markup = ">", e.lineMax = X, e.parentType = T, f[1] = e.line, i = 0; i < N.length; i++)
    e.bMarks[i + n] = k[i], e.tShift[i + n] = N[i], e.sCount[i + n] = C[i], e.bsCount[i + n] = b[i];
  return e.blkIndent = I, !0;
}, B4 = le.isSpace, $4 = function(e, n, r, s) {
  var o, c, i, l, a = e.bMarks[n] + e.tShift[n], u = e.eMarks[n];
  if (e.sCount[n] - e.blkIndent >= 4 || (o = e.src.charCodeAt(a++), o !== 42 && o !== 45 && o !== 95))
    return !1;
  for (c = 1; a < u; ) {
    if (i = e.src.charCodeAt(a++), i !== o && !B4(i))
      return !1;
    i === o && c++;
  }
  return c < 3 ? !1 : (s || (e.line = n + 1, l = e.push("hr", "hr", 0), l.map = [n, e.line], l.markup = Array(c + 1).join(String.fromCharCode(o))), !0);
}, Bi = le.isSpace;
function oc(t, e) {
  var n, r, s, o;
  return r = t.bMarks[e] + t.tShift[e], s = t.eMarks[e], n = t.src.charCodeAt(r++), n !== 42 && n !== 45 && n !== 43 || r < s && (o = t.src.charCodeAt(r), !Bi(o)) ? -1 : r;
}
function cc(t, e) {
  var n, r = t.bMarks[e] + t.tShift[e], s = r, o = t.eMarks[e];
  if (s + 1 >= o || (n = t.src.charCodeAt(s++), n < 48 || n > 57))
    return -1;
  for (; ; ) {
    if (s >= o)
      return -1;
    if (n = t.src.charCodeAt(s++), n >= 48 && n <= 57) {
      if (s - r >= 10)
        return -1;
      continue;
    }
    if (n === 41 || n === 46)
      break;
    return -1;
  }
  return s < o && (n = t.src.charCodeAt(s), !Bi(n)) ? -1 : s;
}
function z4(t, e) {
  var n, r, s = t.level + 2;
  for (n = e + 2, r = t.tokens.length - 2; n < r; n++)
    t.tokens[n].level === s && t.tokens[n].type === "paragraph_open" && (t.tokens[n + 2].hidden = !0, t.tokens[n].hidden = !0, n += 2);
}
var U4 = function(e, n, r, s) {
  var o, c, i, l, a, u, f, p, d, k, b, I, T, C, N, A, j, q, W, $, X, z, J, B, re, D, ne, V, v = !1, S = !0;
  if (e.sCount[n] - e.blkIndent >= 4 || e.listIndent >= 0 && e.sCount[n] - e.listIndent >= 4 && e.sCount[n] < e.blkIndent)
    return !1;
  if (s && e.parentType === "paragraph" && e.sCount[n] >= e.blkIndent && (v = !0), (J = cc(e, n)) >= 0) {
    if (f = !0, re = e.bMarks[n] + e.tShift[n], T = Number(e.src.slice(re, J - 1)), v && T !== 1)
      return !1;
  } else if ((J = oc(e, n)) >= 0)
    f = !1;
  else
    return !1;
  if (v && e.skipSpaces(J) >= e.eMarks[n])
    return !1;
  if (I = e.src.charCodeAt(J - 1), s)
    return !0;
  for (b = e.tokens.length, f ? (V = e.push("ordered_list_open", "ol", 1), T !== 1 && (V.attrs = [["start", T]])) : V = e.push("bullet_list_open", "ul", 1), V.map = k = [n, 0], V.markup = String.fromCharCode(I), N = n, B = !1, ne = e.md.block.ruler.getRules("list"), q = e.parentType, e.parentType = "list"; N < r; ) {
    for (z = J, C = e.eMarks[N], u = A = e.sCount[N] + J - (e.bMarks[n] + e.tShift[n]); z < C; ) {
      if (o = e.src.charCodeAt(z), o === 9)
        A += 4 - (A + e.bsCount[N]) % 4;
      else if (o === 32)
        A++;
      else
        break;
      z++;
    }
    if (c = z, c >= C ? a = 1 : a = A - u, a > 4 && (a = 1), l = u + a, V = e.push("list_item_open", "li", 1), V.markup = String.fromCharCode(I), V.map = p = [n, 0], f && (V.info = e.src.slice(re, J - 1)), X = e.tight, $ = e.tShift[n], W = e.sCount[n], j = e.listIndent, e.listIndent = e.blkIndent, e.blkIndent = l, e.tight = !0, e.tShift[n] = c - e.bMarks[n], e.sCount[n] = A, c >= C && e.isEmpty(n + 1) ? e.line = Math.min(e.line + 2, r) : e.md.block.tokenize(e, n, r, !0), (!e.tight || B) && (S = !1), B = e.line - n > 1 && e.isEmpty(e.line - 1), e.blkIndent = e.listIndent, e.listIndent = j, e.tShift[n] = $, e.sCount[n] = W, e.tight = X, V = e.push("list_item_close", "li", -1), V.markup = String.fromCharCode(I), N = n = e.line, p[1] = N, c = e.bMarks[n], N >= r || e.sCount[N] < e.blkIndent || e.sCount[n] - e.blkIndent >= 4)
      break;
    for (D = !1, i = 0, d = ne.length; i < d; i++)
      if (ne[i](e, N, r, !0)) {
        D = !0;
        break;
      }
    if (D)
      break;
    if (f) {
      if (J = cc(e, N), J < 0)
        break;
      re = e.bMarks[N] + e.tShift[N];
    } else if (J = oc(e, N), J < 0)
      break;
    if (I !== e.src.charCodeAt(J - 1))
      break;
  }
  return f ? V = e.push("ordered_list_close", "ol", -1) : V = e.push("bullet_list_close", "ul", -1), V.markup = String.fromCharCode(I), k[1] = N, e.line = N, e.parentType = q, S && z4(e, b), !0;
}, H4 = le.normalizeReference, Bn = le.isSpace, j4 = function(e, n, r, s) {
  var o, c, i, l, a, u, f, p, d, k, b, I, T, C, N, A, j = 0, q = e.bMarks[n] + e.tShift[n], W = e.eMarks[n], $ = n + 1;
  if (e.sCount[n] - e.blkIndent >= 4 || e.src.charCodeAt(q) !== 91)
    return !1;
  for (; ++q < W; )
    if (e.src.charCodeAt(q) === 93 && e.src.charCodeAt(q - 1) !== 92) {
      if (q + 1 === W || e.src.charCodeAt(q + 1) !== 58)
        return !1;
      break;
    }
  for (l = e.lineMax, N = e.md.block.ruler.getRules("reference"), k = e.parentType, e.parentType = "reference"; $ < l && !e.isEmpty($); $++)
    if (!(e.sCount[$] - e.blkIndent > 3) && !(e.sCount[$] < 0)) {
      for (C = !1, u = 0, f = N.length; u < f; u++)
        if (N[u](e, $, l, !0)) {
          C = !0;
          break;
        }
      if (C)
        break;
    }
  for (T = e.getLines(n, $, e.blkIndent, !1).trim(), W = T.length, q = 1; q < W; q++) {
    if (o = T.charCodeAt(q), o === 91)
      return !1;
    if (o === 93) {
      d = q;
      break;
    } else
      o === 10 ? j++ : o === 92 && (q++, q < W && T.charCodeAt(q) === 10 && j++);
  }
  if (d < 0 || T.charCodeAt(d + 1) !== 58)
    return !1;
  for (q = d + 2; q < W; q++)
    if (o = T.charCodeAt(q), o === 10)
      j++;
    else if (!Bn(o))
      break;
  if (b = e.md.helpers.parseLinkDestination(T, q, W), !b.ok || (a = e.md.normalizeLink(b.str), !e.md.validateLink(a)))
    return !1;
  for (q = b.pos, j += b.lines, c = q, i = j, I = q; q < W; q++)
    if (o = T.charCodeAt(q), o === 10)
      j++;
    else if (!Bn(o))
      break;
  for (b = e.md.helpers.parseLinkTitle(T, q, W), q < W && I !== q && b.ok ? (A = b.str, q = b.pos, j += b.lines) : (A = "", q = c, j = i); q < W && (o = T.charCodeAt(q), !!Bn(o)); )
    q++;
  if (q < W && T.charCodeAt(q) !== 10 && A)
    for (A = "", q = c, j = i; q < W && (o = T.charCodeAt(q), !!Bn(o)); )
      q++;
  return q < W && T.charCodeAt(q) !== 10 || (p = H4(T.slice(1, d)), !p) ? !1 : (s || (typeof e.env.references > "u" && (e.env.references = {}), typeof e.env.references[p] > "u" && (e.env.references[p] = { title: A, href: a }), e.parentType = k, e.line = n + j + 1), !0);
}, V4 = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "section",
  "source",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], xr = {}, G4 = "[a-zA-Z_:][a-zA-Z0-9:._-]*", Z4 = "[^\"'=<>`\\x00-\\x20]+", K4 = "'[^']*'", W4 = '"[^"]*"', J4 = "(?:" + Z4 + "|" + K4 + "|" + W4 + ")", Y4 = "(?:\\s+" + G4 + "(?:\\s*=\\s*" + J4 + ")?)", $i = "<[A-Za-z][A-Za-z0-9\\-]*" + Y4 + "*\\s*\\/?>", zi = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", X4 = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->", Q4 = "<[?][\\s\\S]*?[?]>", eV = "<![A-Z]+\\s+[^>]*>", tV = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>", nV = new RegExp("^(?:" + $i + "|" + zi + "|" + X4 + "|" + Q4 + "|" + eV + "|" + tV + ")"), rV = new RegExp("^(?:" + $i + "|" + zi + ")");
xr.HTML_TAG_RE = nV;
xr.HTML_OPEN_CLOSE_TAG_RE = rV;
var sV = V4, oV = xr.HTML_OPEN_CLOSE_TAG_RE, Lt = [
  [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, !0],
  [/^<!--/, /-->/, !0],
  [/^<\?/, /\?>/, !0],
  [/^<![A-Z]/, />/, !0],
  [/^<!\[CDATA\[/, /\]\]>/, !0],
  [new RegExp("^</?(" + sV.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0],
  [new RegExp(oV.source + "\\s*$"), /^$/, !1]
], cV = function(e, n, r, s) {
  var o, c, i, l, a = e.bMarks[n] + e.tShift[n], u = e.eMarks[n];
  if (e.sCount[n] - e.blkIndent >= 4 || !e.md.options.html || e.src.charCodeAt(a) !== 60)
    return !1;
  for (l = e.src.slice(a, u), o = 0; o < Lt.length && !Lt[o][0].test(l); o++)
    ;
  if (o === Lt.length)
    return !1;
  if (s)
    return Lt[o][2];
  if (c = n + 1, !Lt[o][1].test(l)) {
    for (; c < r && !(e.sCount[c] < e.blkIndent); c++)
      if (a = e.bMarks[c] + e.tShift[c], u = e.eMarks[c], l = e.src.slice(a, u), Lt[o][1].test(l)) {
        l.length !== 0 && c++;
        break;
      }
  }
  return e.line = c, i = e.push("html_block", "", 0), i.map = [n, c], i.content = e.getLines(n, c, e.blkIndent, !0), !0;
}, ic = le.isSpace, iV = function(e, n, r, s) {
  var o, c, i, l, a = e.bMarks[n] + e.tShift[n], u = e.eMarks[n];
  if (e.sCount[n] - e.blkIndent >= 4 || (o = e.src.charCodeAt(a), o !== 35 || a >= u))
    return !1;
  for (c = 1, o = e.src.charCodeAt(++a); o === 35 && a < u && c <= 6; )
    c++, o = e.src.charCodeAt(++a);
  return c > 6 || a < u && !ic(o) ? !1 : (s || (u = e.skipSpacesBack(u, a), i = e.skipCharsBack(u, 35, a), i > a && ic(e.src.charCodeAt(i - 1)) && (u = i), e.line = n + 1, l = e.push("heading_open", "h" + String(c), 1), l.markup = "########".slice(0, c), l.map = [n, e.line], l = e.push("inline", "", 0), l.content = e.src.slice(a, u).trim(), l.map = [n, e.line], l.children = [], l = e.push("heading_close", "h" + String(c), -1), l.markup = "########".slice(0, c)), !0);
}, lV = function(e, n, r) {
  var s, o, c, i, l, a, u, f, p, d = n + 1, k, b = e.md.block.ruler.getRules("paragraph");
  if (e.sCount[n] - e.blkIndent >= 4)
    return !1;
  for (k = e.parentType, e.parentType = "paragraph"; d < r && !e.isEmpty(d); d++)
    if (!(e.sCount[d] - e.blkIndent > 3)) {
      if (e.sCount[d] >= e.blkIndent && (a = e.bMarks[d] + e.tShift[d], u = e.eMarks[d], a < u && (p = e.src.charCodeAt(a), (p === 45 || p === 61) && (a = e.skipChars(a, p), a = e.skipSpaces(a), a >= u)))) {
        f = p === 61 ? 1 : 2;
        break;
      }
      if (!(e.sCount[d] < 0)) {
        for (o = !1, c = 0, i = b.length; c < i; c++)
          if (b[c](e, d, r, !0)) {
            o = !0;
            break;
          }
        if (o)
          break;
      }
    }
  return f ? (s = e.getLines(n, d, e.blkIndent, !1).trim(), e.line = d + 1, l = e.push("heading_open", "h" + String(f), 1), l.markup = String.fromCharCode(p), l.map = [n, e.line], l = e.push("inline", "", 0), l.content = s, l.map = [n, e.line - 1], l.children = [], l = e.push("heading_close", "h" + String(f), -1), l.markup = String.fromCharCode(p), e.parentType = k, !0) : !1;
}, aV = function(e, n) {
  var r, s, o, c, i, l, a = n + 1, u = e.md.block.ruler.getRules("paragraph"), f = e.lineMax;
  for (l = e.parentType, e.parentType = "paragraph"; a < f && !e.isEmpty(a); a++)
    if (!(e.sCount[a] - e.blkIndent > 3) && !(e.sCount[a] < 0)) {
      for (s = !1, o = 0, c = u.length; o < c; o++)
        if (u[o](e, a, f, !0)) {
          s = !0;
          break;
        }
      if (s)
        break;
    }
  return r = e.getLines(n, a, e.blkIndent, !1).trim(), e.line = a, i = e.push("paragraph_open", "p", 1), i.map = [n, e.line], i = e.push("inline", "", 0), i.content = r, i.map = [n, e.line], i.children = [], i = e.push("paragraph_close", "p", -1), e.parentType = l, !0;
}, Ui = $s, yr = le.isSpace;
function Xe(t, e, n, r) {
  var s, o, c, i, l, a, u, f;
  for (this.src = t, this.md = e, this.env = n, this.tokens = r, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.bsCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.ddIndent = -1, this.listIndent = -1, this.parentType = "root", this.level = 0, this.result = "", o = this.src, f = !1, c = i = a = u = 0, l = o.length; i < l; i++) {
    if (s = o.charCodeAt(i), !f)
      if (yr(s)) {
        a++, s === 9 ? u += 4 - u % 4 : u++;
        continue;
      } else
        f = !0;
    (s === 10 || i === l - 1) && (s !== 10 && i++, this.bMarks.push(c), this.eMarks.push(i), this.tShift.push(a), this.sCount.push(u), this.bsCount.push(0), f = !1, a = 0, u = 0, c = i + 1);
  }
  this.bMarks.push(o.length), this.eMarks.push(o.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;
}
Xe.prototype.push = function(t, e, n) {
  var r = new Ui(t, e, n);
  return r.block = !0, n < 0 && this.level--, r.level = this.level, n > 0 && this.level++, this.tokens.push(r), r;
};
Xe.prototype.isEmpty = function(e) {
  return this.bMarks[e] + this.tShift[e] >= this.eMarks[e];
};
Xe.prototype.skipEmptyLines = function(e) {
  for (var n = this.lineMax; e < n && !(this.bMarks[e] + this.tShift[e] < this.eMarks[e]); e++)
    ;
  return e;
};
Xe.prototype.skipSpaces = function(e) {
  for (var n, r = this.src.length; e < r && (n = this.src.charCodeAt(e), !!yr(n)); e++)
    ;
  return e;
};
Xe.prototype.skipSpacesBack = function(e, n) {
  if (e <= n)
    return e;
  for (; e > n; )
    if (!yr(this.src.charCodeAt(--e)))
      return e + 1;
  return e;
};
Xe.prototype.skipChars = function(e, n) {
  for (var r = this.src.length; e < r && this.src.charCodeAt(e) === n; e++)
    ;
  return e;
};
Xe.prototype.skipCharsBack = function(e, n, r) {
  if (e <= r)
    return e;
  for (; e > r; )
    if (n !== this.src.charCodeAt(--e))
      return e + 1;
  return e;
};
Xe.prototype.getLines = function(e, n, r, s) {
  var o, c, i, l, a, u, f, p = e;
  if (e >= n)
    return "";
  for (u = new Array(n - e), o = 0; p < n; p++, o++) {
    for (c = 0, f = l = this.bMarks[p], p + 1 < n || s ? a = this.eMarks[p] + 1 : a = this.eMarks[p]; l < a && c < r; ) {
      if (i = this.src.charCodeAt(l), yr(i))
        i === 9 ? c += 4 - (c + this.bsCount[p]) % 4 : c++;
      else if (l - f < this.tShift[p])
        c++;
      else
        break;
      l++;
    }
    c > r ? u[o] = new Array(c - r + 1).join(" ") + this.src.slice(l, a) : u[o] = this.src.slice(l, a);
  }
  return u.join("");
};
Xe.prototype.Token = Ui;
var uV = Xe, fV = Bs, $n = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  ["table", F4, ["paragraph", "reference"]],
  ["code", L4],
  ["fence", O4, ["paragraph", "reference", "blockquote", "list"]],
  ["blockquote", P4, ["paragraph", "reference", "blockquote", "list"]],
  ["hr", $4, ["paragraph", "reference", "blockquote", "list"]],
  ["list", U4, ["paragraph", "reference", "blockquote"]],
  ["reference", j4],
  ["html_block", cV, ["paragraph", "reference", "blockquote"]],
  ["heading", iV, ["paragraph", "reference", "blockquote"]],
  ["lheading", lV],
  ["paragraph", aV]
];
function kr() {
  this.ruler = new fV();
  for (var t = 0; t < $n.length; t++)
    this.ruler.push($n[t][0], $n[t][1], { alt: ($n[t][2] || []).slice() });
}
kr.prototype.tokenize = function(t, e, n) {
  for (var r, s, o = this.ruler.getRules(""), c = o.length, i = e, l = !1, a = t.md.options.maxNesting; i < n && (t.line = i = t.skipEmptyLines(i), !(i >= n || t.sCount[i] < t.blkIndent)); ) {
    if (t.level >= a) {
      t.line = n;
      break;
    }
    for (s = 0; s < c && (r = o[s](t, i, n, !1), !r); s++)
      ;
    t.tight = !l, t.isEmpty(t.line - 1) && (l = !0), i = t.line, i < n && t.isEmpty(i) && (l = !0, i++, t.line = i);
  }
};
kr.prototype.parse = function(t, e, n, r) {
  var s;
  t && (s = new this.State(t, e, n, r), this.tokenize(s, s.line, s.lineMax));
};
kr.prototype.State = uV;
var pV = kr;
function hV(t) {
  switch (t) {
    case 10:
    case 33:
    case 35:
    case 36:
    case 37:
    case 38:
    case 42:
    case 43:
    case 45:
    case 58:
    case 60:
    case 61:
    case 62:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 125:
    case 126:
      return !0;
    default:
      return !1;
  }
}
var dV = function(e, n) {
  for (var r = e.pos; r < e.posMax && !hV(e.src.charCodeAt(r)); )
    r++;
  return r === e.pos ? !1 : (n || (e.pending += e.src.slice(e.pos, r)), e.pos = r, !0);
}, gV = le.isSpace, mV = function(e, n) {
  var r, s, o, c = e.pos;
  if (e.src.charCodeAt(c) !== 10)
    return !1;
  if (r = e.pending.length - 1, s = e.posMax, !n)
    if (r >= 0 && e.pending.charCodeAt(r) === 32)
      if (r >= 1 && e.pending.charCodeAt(r - 1) === 32) {
        for (o = r - 1; o >= 1 && e.pending.charCodeAt(o - 1) === 32; )
          o--;
        e.pending = e.pending.slice(0, o), e.push("hardbreak", "br", 0);
      } else
        e.pending = e.pending.slice(0, -1), e.push("softbreak", "br", 0);
    else
      e.push("softbreak", "br", 0);
  for (c++; c < s && gV(e.src.charCodeAt(c)); )
    c++;
  return e.pos = c, !0;
}, _V = le.isSpace, Us = [];
for (var lc = 0; lc < 256; lc++)
  Us.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(t) {
  Us[t.charCodeAt(0)] = 1;
});
var bV = function(e, n) {
  var r, s = e.pos, o = e.posMax;
  if (e.src.charCodeAt(s) !== 92)
    return !1;
  if (s++, s < o) {
    if (r = e.src.charCodeAt(s), r < 256 && Us[r] !== 0)
      return n || (e.pending += e.src[s]), e.pos += 2, !0;
    if (r === 10) {
      for (n || e.push("hardbreak", "br", 0), s++; s < o && (r = e.src.charCodeAt(s), !!_V(r)); )
        s++;
      return e.pos = s, !0;
    }
  }
  return n || (e.pending += "\\"), e.pos++, !0;
}, vV = function(e, n) {
  var r, s, o, c, i, l, a, u, f = e.pos, p = e.src.charCodeAt(f);
  if (p !== 96)
    return !1;
  for (r = f, f++, s = e.posMax; f < s && e.src.charCodeAt(f) === 96; )
    f++;
  if (o = e.src.slice(r, f), a = o.length, e.backticksScanned && (e.backticks[a] || 0) <= r)
    return n || (e.pending += o), e.pos += a, !0;
  for (i = l = f; (i = e.src.indexOf("`", l)) !== -1; ) {
    for (l = i + 1; l < s && e.src.charCodeAt(l) === 96; )
      l++;
    if (u = l - i, u === a)
      return n || (c = e.push("code_inline", "code", 0), c.markup = o, c.content = e.src.slice(f, i).replace(/\n/g, " ").replace(/^ (.+) $/, "$1")), e.pos = l, !0;
    e.backticks[u] = i;
  }
  return e.backticksScanned = !0, n || (e.pending += o), e.pos += a, !0;
}, Er = {};
Er.tokenize = function(e, n) {
  var r, s, o, c, i, l = e.pos, a = e.src.charCodeAt(l);
  if (n || a !== 126 || (s = e.scanDelims(e.pos, !0), c = s.length, i = String.fromCharCode(a), c < 2))
    return !1;
  for (c % 2 && (o = e.push("text", "", 0), o.content = i, c--), r = 0; r < c; r += 2)
    o = e.push("text", "", 0), o.content = i + i, e.delimiters.push({
      marker: a,
      length: 0,
      // disable "rule of 3" length checks meant for emphasis
      token: e.tokens.length - 1,
      end: -1,
      open: s.can_open,
      close: s.can_close
    });
  return e.pos += s.length, !0;
};
function ac(t, e) {
  var n, r, s, o, c, i = [], l = e.length;
  for (n = 0; n < l; n++)
    s = e[n], s.marker === 126 && s.end !== -1 && (o = e[s.end], c = t.tokens[s.token], c.type = "s_open", c.tag = "s", c.nesting = 1, c.markup = "~~", c.content = "", c = t.tokens[o.token], c.type = "s_close", c.tag = "s", c.nesting = -1, c.markup = "~~", c.content = "", t.tokens[o.token - 1].type === "text" && t.tokens[o.token - 1].content === "~" && i.push(o.token - 1));
  for (; i.length; ) {
    for (n = i.pop(), r = n + 1; r < t.tokens.length && t.tokens[r].type === "s_close"; )
      r++;
    r--, n !== r && (c = t.tokens[r], t.tokens[r] = t.tokens[n], t.tokens[n] = c);
  }
}
Er.postProcess = function(e) {
  var n, r = e.tokens_meta, s = e.tokens_meta.length;
  for (ac(e, e.delimiters), n = 0; n < s; n++)
    r[n] && r[n].delimiters && ac(e, r[n].delimiters);
};
var wr = {};
wr.tokenize = function(e, n) {
  var r, s, o, c = e.pos, i = e.src.charCodeAt(c);
  if (n || i !== 95 && i !== 42)
    return !1;
  for (s = e.scanDelims(e.pos, i === 42), r = 0; r < s.length; r++)
    o = e.push("text", "", 0), o.content = String.fromCharCode(i), e.delimiters.push({
      // Char code of the starting marker (number).
      //
      marker: i,
      // Total length of these series of delimiters.
      //
      length: s.length,
      // A position of the token this delimiter corresponds to.
      //
      token: e.tokens.length - 1,
      // If this delimiter is matched as a valid opener, `end` will be
      // equal to its position, otherwise it's `-1`.
      //
      end: -1,
      // Boolean flags that determine if this delimiter could open or close
      // an emphasis.
      //
      open: s.can_open,
      close: s.can_close
    });
  return e.pos += s.length, !0;
};
function uc(t, e) {
  var n, r, s, o, c, i, l = e.length;
  for (n = l - 1; n >= 0; n--)
    r = e[n], !(r.marker !== 95 && r.marker !== 42) && r.end !== -1 && (s = e[r.end], i = n > 0 && e[n - 1].end === r.end + 1 && // check that first two markers match and adjacent
    e[n - 1].marker === r.marker && e[n - 1].token === r.token - 1 && // check that last two markers are adjacent (we can safely assume they match)
    e[r.end + 1].token === s.token + 1, c = String.fromCharCode(r.marker), o = t.tokens[r.token], o.type = i ? "strong_open" : "em_open", o.tag = i ? "strong" : "em", o.nesting = 1, o.markup = i ? c + c : c, o.content = "", o = t.tokens[s.token], o.type = i ? "strong_close" : "em_close", o.tag = i ? "strong" : "em", o.nesting = -1, o.markup = i ? c + c : c, o.content = "", i && (t.tokens[e[n - 1].token].content = "", t.tokens[e[r.end + 1].token].content = "", n--));
}
wr.postProcess = function(e) {
  var n, r = e.tokens_meta, s = e.tokens_meta.length;
  for (uc(e, e.delimiters), n = 0; n < s; n++)
    r[n] && r[n].delimiters && uc(e, r[n].delimiters);
};
var xV = le.normalizeReference, Hr = le.isSpace, yV = function(e, n) {
  var r, s, o, c, i, l, a, u, f, p = "", d = "", k = e.pos, b = e.posMax, I = e.pos, T = !0;
  if (e.src.charCodeAt(e.pos) !== 91 || (i = e.pos + 1, c = e.md.helpers.parseLinkLabel(e, e.pos, !0), c < 0))
    return !1;
  if (l = c + 1, l < b && e.src.charCodeAt(l) === 40) {
    for (T = !1, l++; l < b && (s = e.src.charCodeAt(l), !(!Hr(s) && s !== 10)); l++)
      ;
    if (l >= b)
      return !1;
    if (I = l, a = e.md.helpers.parseLinkDestination(e.src, l, e.posMax), a.ok) {
      for (p = e.md.normalizeLink(a.str), e.md.validateLink(p) ? l = a.pos : p = "", I = l; l < b && (s = e.src.charCodeAt(l), !(!Hr(s) && s !== 10)); l++)
        ;
      if (a = e.md.helpers.parseLinkTitle(e.src, l, e.posMax), l < b && I !== l && a.ok)
        for (d = a.str, l = a.pos; l < b && (s = e.src.charCodeAt(l), !(!Hr(s) && s !== 10)); l++)
          ;
    }
    (l >= b || e.src.charCodeAt(l) !== 41) && (T = !0), l++;
  }
  if (T) {
    if (typeof e.env.references > "u")
      return !1;
    if (l < b && e.src.charCodeAt(l) === 91 ? (I = l + 1, l = e.md.helpers.parseLinkLabel(e, l), l >= 0 ? o = e.src.slice(I, l++) : l = c + 1) : l = c + 1, o || (o = e.src.slice(i, c)), u = e.env.references[xV(o)], !u)
      return e.pos = k, !1;
    p = u.href, d = u.title;
  }
  return n || (e.pos = i, e.posMax = c, f = e.push("link_open", "a", 1), f.attrs = r = [["href", p]], d && r.push(["title", d]), e.md.inline.tokenize(e), f = e.push("link_close", "a", -1)), e.pos = l, e.posMax = b, !0;
}, kV = le.normalizeReference, jr = le.isSpace, EV = function(e, n) {
  var r, s, o, c, i, l, a, u, f, p, d, k, b, I = "", T = e.pos, C = e.posMax;
  if (e.src.charCodeAt(e.pos) !== 33 || e.src.charCodeAt(e.pos + 1) !== 91 || (l = e.pos + 2, i = e.md.helpers.parseLinkLabel(e, e.pos + 1, !1), i < 0))
    return !1;
  if (a = i + 1, a < C && e.src.charCodeAt(a) === 40) {
    for (a++; a < C && (s = e.src.charCodeAt(a), !(!jr(s) && s !== 10)); a++)
      ;
    if (a >= C)
      return !1;
    for (b = a, f = e.md.helpers.parseLinkDestination(e.src, a, e.posMax), f.ok && (I = e.md.normalizeLink(f.str), e.md.validateLink(I) ? a = f.pos : I = ""), b = a; a < C && (s = e.src.charCodeAt(a), !(!jr(s) && s !== 10)); a++)
      ;
    if (f = e.md.helpers.parseLinkTitle(e.src, a, e.posMax), a < C && b !== a && f.ok)
      for (p = f.str, a = f.pos; a < C && (s = e.src.charCodeAt(a), !(!jr(s) && s !== 10)); a++)
        ;
    else
      p = "";
    if (a >= C || e.src.charCodeAt(a) !== 41)
      return e.pos = T, !1;
    a++;
  } else {
    if (typeof e.env.references > "u")
      return !1;
    if (a < C && e.src.charCodeAt(a) === 91 ? (b = a + 1, a = e.md.helpers.parseLinkLabel(e, a), a >= 0 ? c = e.src.slice(b, a++) : a = i + 1) : a = i + 1, c || (c = e.src.slice(l, i)), u = e.env.references[kV(c)], !u)
      return e.pos = T, !1;
    I = u.href, p = u.title;
  }
  return n || (o = e.src.slice(l, i), e.md.inline.parse(
    o,
    e.md,
    e.env,
    k = []
  ), d = e.push("image", "img", 0), d.attrs = r = [["src", I], ["alt", ""]], d.children = k, d.content = o, p && r.push(["title", p])), e.pos = a, e.posMax = C, !0;
}, wV = /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/, CV = /^([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)$/, AV = function(e, n) {
  var r, s, o, c, i, l, a = e.pos;
  if (e.src.charCodeAt(a) !== 60)
    return !1;
  for (i = e.pos, l = e.posMax; ; ) {
    if (++a >= l || (c = e.src.charCodeAt(a), c === 60))
      return !1;
    if (c === 62)
      break;
  }
  return r = e.src.slice(i + 1, a), CV.test(r) ? (s = e.md.normalizeLink(r), e.md.validateLink(s) ? (n || (o = e.push("link_open", "a", 1), o.attrs = [["href", s]], o.markup = "autolink", o.info = "auto", o = e.push("text", "", 0), o.content = e.md.normalizeLinkText(r), o = e.push("link_close", "a", -1), o.markup = "autolink", o.info = "auto"), e.pos += r.length + 2, !0) : !1) : wV.test(r) ? (s = e.md.normalizeLink("mailto:" + r), e.md.validateLink(s) ? (n || (o = e.push("link_open", "a", 1), o.attrs = [["href", s]], o.markup = "autolink", o.info = "auto", o = e.push("text", "", 0), o.content = e.md.normalizeLinkText(r), o = e.push("link_close", "a", -1), o.markup = "autolink", o.info = "auto"), e.pos += r.length + 2, !0) : !1) : !1;
}, SV = xr.HTML_TAG_RE;
function DV(t) {
  var e = t | 32;
  return e >= 97 && e <= 122;
}
var TV = function(e, n) {
  var r, s, o, c, i = e.pos;
  return !e.md.options.html || (o = e.posMax, e.src.charCodeAt(i) !== 60 || i + 2 >= o) || (r = e.src.charCodeAt(i + 1), r !== 33 && r !== 63 && r !== 47 && !DV(r)) || (s = e.src.slice(i).match(SV), !s) ? !1 : (n || (c = e.push("html_inline", "", 0), c.content = e.src.slice(i, i + s[0].length)), e.pos += s[0].length, !0);
}, fc = Ni, RV = le.has, qV = le.isValidEntityCode, pc = le.fromCodePoint, MV = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i, NV = /^&([a-z][a-z0-9]{1,31});/i, IV = function(e, n) {
  var r, s, o, c = e.pos, i = e.posMax;
  if (e.src.charCodeAt(c) !== 38)
    return !1;
  if (c + 1 < i) {
    if (r = e.src.charCodeAt(c + 1), r === 35) {
      if (o = e.src.slice(c).match(MV), o)
        return n || (s = o[1][0].toLowerCase() === "x" ? parseInt(o[1].slice(1), 16) : parseInt(o[1], 10), e.pending += qV(s) ? pc(s) : pc(65533)), e.pos += o[0].length, !0;
    } else if (o = e.src.slice(c).match(NV), o && RV(fc, o[1]))
      return n || (e.pending += fc[o[1]]), e.pos += o[0].length, !0;
  }
  return n || (e.pending += "&"), e.pos++, !0;
};
function hc(t, e) {
  var n, r, s, o, c, i, l, a, u = {}, f = e.length;
  if (f) {
    var p = 0, d = -2, k = [];
    for (n = 0; n < f; n++)
      if (s = e[n], k.push(0), (e[p].marker !== s.marker || d !== s.token - 1) && (p = n), d = s.token, s.length = s.length || 0, !!s.close) {
        for (u.hasOwnProperty(s.marker) || (u[s.marker] = [-1, -1, -1, -1, -1, -1]), c = u[s.marker][(s.open ? 3 : 0) + s.length % 3], r = p - k[p] - 1, i = r; r > c; r -= k[r] + 1)
          if (o = e[r], o.marker === s.marker && o.open && o.end < 0 && (l = !1, (o.close || s.open) && (o.length + s.length) % 3 === 0 && (o.length % 3 !== 0 || s.length % 3 !== 0) && (l = !0), !l)) {
            a = r > 0 && !e[r - 1].open ? k[r - 1] + 1 : 0, k[n] = n - r + a, k[r] = a, s.open = !1, o.end = n, o.close = !1, i = -1, d = -2;
            break;
          }
        i !== -1 && (u[s.marker][(s.open ? 3 : 0) + (s.length || 0) % 3] = i);
      }
  }
}
var FV = function(e) {
  var n, r = e.tokens_meta, s = e.tokens_meta.length;
  for (hc(e, e.delimiters), n = 0; n < s; n++)
    r[n] && r[n].delimiters && hc(e, r[n].delimiters);
}, LV = function(e) {
  var n, r, s = 0, o = e.tokens, c = e.tokens.length;
  for (n = r = 0; n < c; n++)
    o[n].nesting < 0 && s--, o[n].level = s, o[n].nesting > 0 && s++, o[n].type === "text" && n + 1 < c && o[n + 1].type === "text" ? o[n + 1].content = o[n].content + o[n + 1].content : (n !== r && (o[r] = o[n]), r++);
  n !== r && (o.length = r);
}, Hs = $s, dc = le.isWhiteSpace, gc = le.isPunctChar, mc = le.isMdAsciiPunct;
function Tn(t, e, n, r) {
  this.src = t, this.env = n, this.md = e, this.tokens = r, this.tokens_meta = Array(r.length), this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [], this._prev_delimiters = [], this.backticks = {}, this.backticksScanned = !1;
}
Tn.prototype.pushPending = function() {
  var t = new Hs("text", "", 0);
  return t.content = this.pending, t.level = this.pendingLevel, this.tokens.push(t), this.pending = "", t;
};
Tn.prototype.push = function(t, e, n) {
  this.pending && this.pushPending();
  var r = new Hs(t, e, n), s = null;
  return n < 0 && (this.level--, this.delimiters = this._prev_delimiters.pop()), r.level = this.level, n > 0 && (this.level++, this._prev_delimiters.push(this.delimiters), this.delimiters = [], s = { delimiters: this.delimiters }), this.pendingLevel = this.level, this.tokens.push(r), this.tokens_meta.push(s), r;
};
Tn.prototype.scanDelims = function(t, e) {
  var n = t, r, s, o, c, i, l, a, u, f, p = !0, d = !0, k = this.posMax, b = this.src.charCodeAt(t);
  for (r = t > 0 ? this.src.charCodeAt(t - 1) : 32; n < k && this.src.charCodeAt(n) === b; )
    n++;
  return o = n - t, s = n < k ? this.src.charCodeAt(n) : 32, a = mc(r) || gc(String.fromCharCode(r)), f = mc(s) || gc(String.fromCharCode(s)), l = dc(r), u = dc(s), u ? p = !1 : f && (l || a || (p = !1)), l ? d = !1 : a && (u || f || (d = !1)), e ? (c = p, i = d) : (c = p && (!d || a), i = d && (!p || f)), {
    can_open: c,
    can_close: i,
    length: o
  };
};
Tn.prototype.Token = Hs;
var OV = Tn, _c = Bs, Vr = [
  ["text", dV],
  ["newline", mV],
  ["escape", bV],
  ["backticks", vV],
  ["strikethrough", Er.tokenize],
  ["emphasis", wr.tokenize],
  ["link", yV],
  ["image", EV],
  ["autolink", AV],
  ["html_inline", TV],
  ["entity", IV]
], Gr = [
  ["balance_pairs", FV],
  ["strikethrough", Er.postProcess],
  ["emphasis", wr.postProcess],
  ["text_collapse", LV]
];
function Rn() {
  var t;
  for (this.ruler = new _c(), t = 0; t < Vr.length; t++)
    this.ruler.push(Vr[t][0], Vr[t][1]);
  for (this.ruler2 = new _c(), t = 0; t < Gr.length; t++)
    this.ruler2.push(Gr[t][0], Gr[t][1]);
}
Rn.prototype.skipToken = function(t) {
  var e, n, r = t.pos, s = this.ruler.getRules(""), o = s.length, c = t.md.options.maxNesting, i = t.cache;
  if (typeof i[r] < "u") {
    t.pos = i[r];
    return;
  }
  if (t.level < c)
    for (n = 0; n < o && (t.level++, e = s[n](t, !0), t.level--, !e); n++)
      ;
  else
    t.pos = t.posMax;
  e || t.pos++, i[r] = t.pos;
};
Rn.prototype.tokenize = function(t) {
  for (var e, n, r = this.ruler.getRules(""), s = r.length, o = t.posMax, c = t.md.options.maxNesting; t.pos < o; ) {
    if (t.level < c)
      for (n = 0; n < s && (e = r[n](t, !1), !e); n++)
        ;
    if (e) {
      if (t.pos >= o)
        break;
      continue;
    }
    t.pending += t.src[t.pos++];
  }
  t.pending && t.pushPending();
};
Rn.prototype.parse = function(t, e, n, r) {
  var s, o, c, i = new this.State(t, e, n, r);
  for (this.tokenize(i), o = this.ruler2.getRules(""), c = o.length, s = 0; s < c; s++)
    o[s](i);
};
Rn.prototype.State = OV;
var PV = Rn, Zr, bc;
function BV() {
  return bc || (bc = 1, Zr = function(t) {
    var e = {};
    e.src_Any = Ii().source, e.src_Cc = Fi().source, e.src_Z = Li().source, e.src_P = Ps.source, e.src_ZPCc = [e.src_Z, e.src_P, e.src_Cc].join("|"), e.src_ZCc = [e.src_Z, e.src_Cc].join("|");
    var n = "[><ï½œ]";
    return e.src_pseudo_letter = "(?:(?!" + n + "|" + e.src_ZPCc + ")" + e.src_Any + ")", e.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", e.src_auth = "(?:(?:(?!" + e.src_ZCc + "|[@/\\[\\]()]).)+@)?", e.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", e.src_host_terminator = "(?=$|" + n + "|" + e.src_ZPCc + ")(?!-|_|:\\d|\\.-|\\.(?!$|" + e.src_ZPCc + "))", e.src_path = "(?:[/?#](?:(?!" + e.src_ZCc + "|" + n + `|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + e.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + e.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + e.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + e.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + e.src_ZCc + "|[']).)+\\'|\\'(?=" + e.src_pseudo_letter + "|[-]).|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + e.src_ZCc + "|[.]).|" + (t && t["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + ",(?!" + e.src_ZCc + ").|;(?!" + e.src_ZCc + ").|\\!+(?!" + e.src_ZCc + "|[!]).|\\?(?!" + e.src_ZCc + "|[?]).)+|\\/)?", e.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*', e.src_xn = "xn--[a-z0-9\\-]{1,59}", e.src_domain_root = // Allow letters & digits (http://test1)
    "(?:" + e.src_xn + "|" + e.src_pseudo_letter + "{1,63})", e.src_domain = "(?:" + e.src_xn + "|(?:" + e.src_pseudo_letter + ")|(?:" + e.src_pseudo_letter + "(?:-|" + e.src_pseudo_letter + "){0,61}" + e.src_pseudo_letter + "))", e.src_host = "(?:(?:(?:(?:" + e.src_domain + ")\\.)*" + e.src_domain + "))", e.tpl_host_fuzzy = "(?:" + e.src_ip4 + "|(?:(?:(?:" + e.src_domain + ")\\.)+(?:%TLDS%)))", e.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + e.src_domain + ")\\.)+(?:%TLDS%))", e.src_host_strict = e.src_host + e.src_host_terminator, e.tpl_host_fuzzy_strict = e.tpl_host_fuzzy + e.src_host_terminator, e.src_host_port_strict = e.src_host + e.src_port + e.src_host_terminator, e.tpl_host_port_fuzzy_strict = e.tpl_host_fuzzy + e.src_port + e.src_host_terminator, e.tpl_host_port_no_ip_fuzzy_strict = e.tpl_host_no_ip_fuzzy + e.src_port + e.src_host_terminator, e.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + e.src_ZPCc + "|>|$))", e.tpl_email_fuzzy = "(^|" + n + '|"|\\(|' + e.src_ZCc + ")(" + e.src_email_name + "@" + e.tpl_host_fuzzy_strict + ")", e.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
    // but can start with > (markdown blockquote)
    "(^|(?![.:/\\-_@])(?:[$+<=>^`|ï½œ]|" + e.src_ZPCc + "))((?![$+<=>^`|ï½œ])" + e.tpl_host_port_fuzzy_strict + e.src_path + ")", e.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
    // but can start with > (markdown blockquote)
    "(^|(?![.:/\\-_@])(?:[$+<=>^`|ï½œ]|" + e.src_ZPCc + "))((?![$+<=>^`|ï½œ])" + e.tpl_host_port_no_ip_fuzzy_strict + e.src_path + ")", e;
  }), Zr;
}
function ps(t) {
  var e = Array.prototype.slice.call(arguments, 1);
  return e.forEach(function(n) {
    n && Object.keys(n).forEach(function(r) {
      t[r] = n[r];
    });
  }), t;
}
function Cr(t) {
  return Object.prototype.toString.call(t);
}
function $V(t) {
  return Cr(t) === "[object String]";
}
function zV(t) {
  return Cr(t) === "[object Object]";
}
function UV(t) {
  return Cr(t) === "[object RegExp]";
}
function vc(t) {
  return Cr(t) === "[object Function]";
}
function HV(t) {
  return t.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
var Hi = {
  fuzzyLink: !0,
  fuzzyEmail: !0,
  fuzzyIP: !1
};
function jV(t) {
  return Object.keys(t || {}).reduce(function(e, n) {
    return e || Hi.hasOwnProperty(n);
  }, !1);
}
var VV = {
  "http:": {
    validate: function(t, e, n) {
      var r = t.slice(e);
      return n.re.http || (n.re.http = new RegExp(
        "^\\/\\/" + n.re.src_auth + n.re.src_host_port_strict + n.re.src_path,
        "i"
      )), n.re.http.test(r) ? r.match(n.re.http)[0].length : 0;
    }
  },
  "https:": "http:",
  "ftp:": "http:",
  "//": {
    validate: function(t, e, n) {
      var r = t.slice(e);
      return n.re.no_http || (n.re.no_http = new RegExp(
        "^" + n.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
        // with code comments
        "(?:localhost|(?:(?:" + n.re.src_domain + ")\\.)+" + n.re.src_domain_root + ")" + n.re.src_port + n.re.src_host_terminator + n.re.src_path,
        "i"
      )), n.re.no_http.test(r) ? e >= 3 && t[e - 3] === ":" || e >= 3 && t[e - 3] === "/" ? 0 : r.match(n.re.no_http)[0].length : 0;
    }
  },
  "mailto:": {
    validate: function(t, e, n) {
      var r = t.slice(e);
      return n.re.mailto || (n.re.mailto = new RegExp(
        "^" + n.re.src_email_name + "@" + n.re.src_host_strict,
        "i"
      )), n.re.mailto.test(r) ? r.match(n.re.mailto)[0].length : 0;
    }
  }
}, GV = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]", ZV = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|Ñ€Ñ„".split("|");
function KV(t) {
  t.__index__ = -1, t.__text_cache__ = "";
}
function WV(t) {
  return function(e, n) {
    var r = e.slice(n);
    return t.test(r) ? r.match(t)[0].length : 0;
  };
}
function xc() {
  return function(t, e) {
    e.normalize(t);
  };
}
function nr(t) {
  var e = t.re = BV()(t.__opts__), n = t.__tlds__.slice();
  t.onCompile(), t.__tlds_replaced__ || n.push(GV), n.push(e.src_xn), e.src_tlds = n.join("|");
  function r(i) {
    return i.replace("%TLDS%", e.src_tlds);
  }
  e.email_fuzzy = RegExp(r(e.tpl_email_fuzzy), "i"), e.link_fuzzy = RegExp(r(e.tpl_link_fuzzy), "i"), e.link_no_ip_fuzzy = RegExp(r(e.tpl_link_no_ip_fuzzy), "i"), e.host_fuzzy_test = RegExp(r(e.tpl_host_fuzzy_test), "i");
  var s = [];
  t.__compiled__ = {};
  function o(i, l) {
    throw new Error('(LinkifyIt) Invalid schema "' + i + '": ' + l);
  }
  Object.keys(t.__schemas__).forEach(function(i) {
    var l = t.__schemas__[i];
    if (l !== null) {
      var a = { validate: null, link: null };
      if (t.__compiled__[i] = a, zV(l)) {
        UV(l.validate) ? a.validate = WV(l.validate) : vc(l.validate) ? a.validate = l.validate : o(i, l), vc(l.normalize) ? a.normalize = l.normalize : l.normalize ? o(i, l) : a.normalize = xc();
        return;
      }
      if ($V(l)) {
        s.push(i);
        return;
      }
      o(i, l);
    }
  }), s.forEach(function(i) {
    t.__compiled__[t.__schemas__[i]] && (t.__compiled__[i].validate = t.__compiled__[t.__schemas__[i]].validate, t.__compiled__[i].normalize = t.__compiled__[t.__schemas__[i]].normalize);
  }), t.__compiled__[""] = { validate: null, normalize: xc() };
  var c = Object.keys(t.__compiled__).filter(function(i) {
    return i.length > 0 && t.__compiled__[i];
  }).map(HV).join("|");
  t.re.schema_test = RegExp("(^|(?!_)(?:[><ï½œ]|" + e.src_ZPCc + "))(" + c + ")", "i"), t.re.schema_search = RegExp("(^|(?!_)(?:[><ï½œ]|" + e.src_ZPCc + "))(" + c + ")", "ig"), t.re.pretest = RegExp(
    "(" + t.re.schema_test.source + ")|(" + t.re.host_fuzzy_test.source + ")|@",
    "i"
  ), KV(t);
}
function JV(t, e) {
  var n = t.__index__, r = t.__last_index__, s = t.__text_cache__.slice(n, r);
  this.schema = t.__schema__.toLowerCase(), this.index = n + e, this.lastIndex = r + e, this.raw = s, this.text = s, this.url = s;
}
function yc(t, e) {
  var n = new JV(t, e);
  return t.__compiled__[n.schema].normalize(n, t), n;
}
function Oe(t, e) {
  if (!(this instanceof Oe))
    return new Oe(t, e);
  e || jV(t) && (e = t, t = {}), this.__opts__ = ps({}, Hi, e), this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", this.__schemas__ = ps({}, VV, t), this.__compiled__ = {}, this.__tlds__ = ZV, this.__tlds_replaced__ = !1, this.re = {}, nr(this);
}
Oe.prototype.add = function(e, n) {
  return this.__schemas__[e] = n, nr(this), this;
};
Oe.prototype.set = function(e) {
  return this.__opts__ = ps(this.__opts__, e), this;
};
Oe.prototype.test = function(e) {
  if (this.__text_cache__ = e, this.__index__ = -1, !e.length)
    return !1;
  var n, r, s, o, c, i, l, a, u;
  if (this.re.schema_test.test(e)) {
    for (l = this.re.schema_search, l.lastIndex = 0; (n = l.exec(e)) !== null; )
      if (o = this.testSchemaAt(e, n[2], l.lastIndex), o) {
        this.__schema__ = n[2], this.__index__ = n.index + n[1].length, this.__last_index__ = n.index + n[0].length + o;
        break;
      }
  }
  return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (a = e.search(this.re.host_fuzzy_test), a >= 0 && (this.__index__ < 0 || a < this.__index__) && (r = e.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null && (c = r.index + r[1].length, (this.__index__ < 0 || c < this.__index__) && (this.__schema__ = "", this.__index__ = c, this.__last_index__ = r.index + r[0].length))), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && (u = e.indexOf("@"), u >= 0 && (s = e.match(this.re.email_fuzzy)) !== null && (c = s.index + s[1].length, i = s.index + s[0].length, (this.__index__ < 0 || c < this.__index__ || c === this.__index__ && i > this.__last_index__) && (this.__schema__ = "mailto:", this.__index__ = c, this.__last_index__ = i))), this.__index__ >= 0;
};
Oe.prototype.pretest = function(e) {
  return this.re.pretest.test(e);
};
Oe.prototype.testSchemaAt = function(e, n, r) {
  return this.__compiled__[n.toLowerCase()] ? this.__compiled__[n.toLowerCase()].validate(e, r, this) : 0;
};
Oe.prototype.match = function(e) {
  var n = 0, r = [];
  this.__index__ >= 0 && this.__text_cache__ === e && (r.push(yc(this, n)), n = this.__last_index__);
  for (var s = n ? e.slice(n) : e; this.test(s); )
    r.push(yc(this, n)), s = s.slice(this.__last_index__), n += this.__last_index__;
  return r.length ? r : null;
};
Oe.prototype.tlds = function(e, n) {
  return e = Array.isArray(e) ? e : [e], n ? (this.__tlds__ = this.__tlds__.concat(e).sort().filter(function(r, s, o) {
    return r !== o[s - 1];
  }).reverse(), nr(this), this) : (this.__tlds__ = e.slice(), this.__tlds_replaced__ = !0, nr(this), this);
};
Oe.prototype.normalize = function(e) {
  e.schema || (e.url = "http://" + e.url), e.schema === "mailto:" && !/^mailto:/i.test(e.url) && (e.url = "mailto:" + e.url);
};
Oe.prototype.onCompile = function() {
};
var YV = Oe;
const Vt = 2147483647, We = 36, js = 1, wn = 26, XV = 38, QV = 700, ji = 72, Vi = 128, Gi = "-", e5 = /^xn--/, t5 = /[^\0-\x7E]/, n5 = /[\x2E\u3002\uFF0E\uFF61]/g, r5 = {
  overflow: "Overflow: input needs wider integers to process",
  "not-basic": "Illegal input >= 0x80 (not a basic code point)",
  "invalid-input": "Invalid input"
}, Kr = We - js, Je = Math.floor, Wr = String.fromCharCode;
function Et(t) {
  throw new RangeError(r5[t]);
}
function s5(t, e) {
  const n = [];
  let r = t.length;
  for (; r--; )
    n[r] = e(t[r]);
  return n;
}
function Zi(t, e) {
  const n = t.split("@");
  let r = "";
  n.length > 1 && (r = n[0] + "@", t = n[1]), t = t.replace(n5, ".");
  const s = t.split("."), o = s5(s, e).join(".");
  return r + o;
}
function Vs(t) {
  const e = [];
  let n = 0;
  const r = t.length;
  for (; n < r; ) {
    const s = t.charCodeAt(n++);
    if (s >= 55296 && s <= 56319 && n < r) {
      const o = t.charCodeAt(n++);
      (o & 64512) == 56320 ? e.push(((s & 1023) << 10) + (o & 1023) + 65536) : (e.push(s), n--);
    } else
      e.push(s);
  }
  return e;
}
const Ki = (t) => String.fromCodePoint(...t), o5 = function(t) {
  return t - 48 < 10 ? t - 22 : t - 65 < 26 ? t - 65 : t - 97 < 26 ? t - 97 : We;
}, kc = function(t, e) {
  return t + 22 + 75 * (t < 26) - ((e != 0) << 5);
}, Wi = function(t, e, n) {
  let r = 0;
  for (t = n ? Je(t / QV) : t >> 1, t += Je(t / e); t > Kr * wn >> 1; r += We)
    t = Je(t / Kr);
  return Je(r + (Kr + 1) * t / (t + XV));
}, Gs = function(t) {
  const e = [], n = t.length;
  let r = 0, s = Vi, o = ji, c = t.lastIndexOf(Gi);
  c < 0 && (c = 0);
  for (let i = 0; i < c; ++i)
    t.charCodeAt(i) >= 128 && Et("not-basic"), e.push(t.charCodeAt(i));
  for (let i = c > 0 ? c + 1 : 0; i < n; ) {
    let l = r;
    for (let u = 1, f = We; ; f += We) {
      i >= n && Et("invalid-input");
      const p = o5(t.charCodeAt(i++));
      (p >= We || p > Je((Vt - r) / u)) && Et("overflow"), r += p * u;
      const d = f <= o ? js : f >= o + wn ? wn : f - o;
      if (p < d)
        break;
      const k = We - d;
      u > Je(Vt / k) && Et("overflow"), u *= k;
    }
    const a = e.length + 1;
    o = Wi(r - l, a, l == 0), Je(r / a) > Vt - s && Et("overflow"), s += Je(r / a), r %= a, e.splice(r++, 0, s);
  }
  return String.fromCodePoint(...e);
}, Zs = function(t) {
  const e = [];
  t = Vs(t);
  let n = t.length, r = Vi, s = 0, o = ji;
  for (const l of t)
    l < 128 && e.push(Wr(l));
  let c = e.length, i = c;
  for (c && e.push(Gi); i < n; ) {
    let l = Vt;
    for (const u of t)
      u >= r && u < l && (l = u);
    const a = i + 1;
    l - r > Je((Vt - s) / a) && Et("overflow"), s += (l - r) * a, r = l;
    for (const u of t)
      if (u < r && ++s > Vt && Et("overflow"), u === r) {
        let f = s;
        for (let p = We; ; p += We) {
          const d = p <= o ? js : p >= o + wn ? wn : p - o;
          if (f < d)
            break;
          const k = f - d, b = We - d;
          e.push(
            Wr(kc(d + k % b, 0))
          ), f = Je(k / b);
        }
        e.push(Wr(kc(f, 0))), o = Wi(s, a, i === c), s = 0, ++i;
      }
    ++s, ++r;
  }
  return e.join("");
}, Ji = function(t) {
  return Zi(t, function(e) {
    return e5.test(e) ? Gs(e.slice(4).toLowerCase()) : e;
  });
}, Yi = function(t) {
  return Zi(t, function(e) {
    return t5.test(e) ? "xn--" + Zs(e) : e;
  });
}, c5 = {
  /**
   * A string representing the current Punycode.js version number.
   * @memberOf punycode
   * @type String
   */
  version: "2.1.0",
  /**
   * An object of methods to convert from JavaScript's internal character
   * representation (UCS-2) to Unicode code points, and back.
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode
   * @type Object
   */
  ucs2: {
    decode: Vs,
    encode: Ki
  },
  decode: Gs,
  encode: Zs,
  toASCII: Yi,
  toUnicode: Ji
}, i5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: Gs,
  default: c5,
  encode: Zs,
  toASCII: Yi,
  toUnicode: Ji,
  ucs2decode: Vs,
  ucs2encode: Ki
}, Symbol.toStringTag, { value: "Module" })), l5 = /* @__PURE__ */ Ef(i5);
var a5 = {
  options: {
    html: !1,
    // Enable HTML tags in source
    xhtmlOut: !1,
    // Use '/' to close single tags (<br />)
    breaks: !1,
    // Convert '\n' in paragraphs into <br>
    langPrefix: "language-",
    // CSS language prefix for fenced blocks
    linkify: !1,
    // autoconvert URL-like texts to links
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use 'Â«Â»â€žâ€œ' for Russian, 'â€žâ€œâ€šâ€˜' for German,
    // and ['Â«\xA0', '\xA0Â»', 'â€¹\xA0', '\xA0â€º'] for French (including nbsp).
    quotes: "â€œâ€â€˜â€™",
    /* â€œâ€â€˜â€™ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    maxNesting: 100
    // Internal protection, recursion limit
  },
  components: {
    core: {},
    block: {},
    inline: {}
  }
}, u5 = {
  options: {
    html: !1,
    // Enable HTML tags in source
    xhtmlOut: !1,
    // Use '/' to close single tags (<br />)
    breaks: !1,
    // Convert '\n' in paragraphs into <br>
    langPrefix: "language-",
    // CSS language prefix for fenced blocks
    linkify: !1,
    // autoconvert URL-like texts to links
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use 'Â«Â»â€žâ€œ' for Russian, 'â€žâ€œâ€šâ€˜' for German,
    // and ['Â«\xA0', '\xA0Â»', 'â€¹\xA0', '\xA0â€º'] for French (including nbsp).
    quotes: "â€œâ€â€˜â€™",
    /* â€œâ€â€˜â€™ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    maxNesting: 20
    // Internal protection, recursion limit
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline"
      ]
    },
    block: {
      rules: [
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "text"
      ],
      rules2: [
        "balance_pairs",
        "text_collapse"
      ]
    }
  }
}, f5 = {
  options: {
    html: !0,
    // Enable HTML tags in source
    xhtmlOut: !0,
    // Use '/' to close single tags (<br />)
    breaks: !1,
    // Convert '\n' in paragraphs into <br>
    langPrefix: "language-",
    // CSS language prefix for fenced blocks
    linkify: !1,
    // autoconvert URL-like texts to links
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use 'Â«Â»â€žâ€œ' for Russian, 'â€žâ€œâ€šâ€˜' for German,
    // and ['Â«\xA0', '\xA0Â»', 'â€¹\xA0', '\xA0â€º'] for French (including nbsp).
    quotes: "â€œâ€â€˜â€™",
    /* â€œâ€â€˜â€™ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    maxNesting: 20
    // Internal protection, recursion limit
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline"
      ]
    },
    block: {
      rules: [
        "blockquote",
        "code",
        "fence",
        "heading",
        "hr",
        "html_block",
        "lheading",
        "list",
        "reference",
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "autolink",
        "backticks",
        "emphasis",
        "entity",
        "escape",
        "html_inline",
        "image",
        "link",
        "newline",
        "text"
      ],
      rules2: [
        "balance_pairs",
        "emphasis",
        "text_collapse"
      ]
    }
  }
}, _n = le, p5 = vr, h5 = f4, d5 = I4, g5 = pV, m5 = PV, _5 = YV, Ct = Qt, Xi = l5, b5 = {
  default: a5,
  zero: u5,
  commonmark: f5
}, v5 = /^(vbscript|javascript|file|data):/, x5 = /^data:image\/(gif|png|jpeg|webp);/;
function y5(t) {
  var e = t.trim().toLowerCase();
  return v5.test(e) ? !!x5.test(e) : !0;
}
var Qi = ["http:", "https:", "mailto:"];
function k5(t) {
  var e = Ct.parse(t, !0);
  if (e.hostname && (!e.protocol || Qi.indexOf(e.protocol) >= 0))
    try {
      e.hostname = Xi.toASCII(e.hostname);
    } catch {
    }
  return Ct.encode(Ct.format(e));
}
function E5(t) {
  var e = Ct.parse(t, !0);
  if (e.hostname && (!e.protocol || Qi.indexOf(e.protocol) >= 0))
    try {
      e.hostname = Xi.toUnicode(e.hostname);
    } catch {
    }
  return Ct.decode(Ct.format(e), Ct.decode.defaultChars + "%");
}
function Pe(t, e) {
  if (!(this instanceof Pe))
    return new Pe(t, e);
  e || _n.isString(t) || (e = t || {}, t = "default"), this.inline = new m5(), this.block = new g5(), this.core = new d5(), this.renderer = new h5(), this.linkify = new _5(), this.validateLink = y5, this.normalizeLink = k5, this.normalizeLinkText = E5, this.utils = _n, this.helpers = _n.assign({}, p5), this.options = {}, this.configure(t), e && this.set(e);
}
Pe.prototype.set = function(t) {
  return _n.assign(this.options, t), this;
};
Pe.prototype.configure = function(t) {
  var e = this, n;
  if (_n.isString(t) && (n = t, t = b5[n], !t))
    throw new Error('Wrong `markdown-it` preset "' + n + '", check name');
  if (!t)
    throw new Error("Wrong `markdown-it` preset, can't be empty");
  return t.options && e.set(t.options), t.components && Object.keys(t.components).forEach(function(r) {
    t.components[r].rules && e[r].ruler.enableOnly(t.components[r].rules), t.components[r].rules2 && e[r].ruler2.enableOnly(t.components[r].rules2);
  }), this;
};
Pe.prototype.enable = function(t, e) {
  var n = [];
  Array.isArray(t) || (t = [t]), ["core", "block", "inline"].forEach(function(s) {
    n = n.concat(this[s].ruler.enable(t, !0));
  }, this), n = n.concat(this.inline.ruler2.enable(t, !0));
  var r = t.filter(function(s) {
    return n.indexOf(s) < 0;
  });
  if (r.length && !e)
    throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + r);
  return this;
};
Pe.prototype.disable = function(t, e) {
  var n = [];
  Array.isArray(t) || (t = [t]), ["core", "block", "inline"].forEach(function(s) {
    n = n.concat(this[s].ruler.disable(t, !0));
  }, this), n = n.concat(this.inline.ruler2.disable(t, !0));
  var r = t.filter(function(s) {
    return n.indexOf(s) < 0;
  });
  if (r.length && !e)
    throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + r);
  return this;
};
Pe.prototype.use = function(t) {
  var e = [this].concat(Array.prototype.slice.call(arguments, 1));
  return t.apply(t, e), this;
};
Pe.prototype.parse = function(t, e) {
  if (typeof t != "string")
    throw new Error("Input data should be a String");
  var n = new this.core.State(t, this, e);
  return this.core.process(n), n.tokens;
};
Pe.prototype.render = function(t, e) {
  return e = e || {}, this.renderer.render(this.parse(t, e), this.options, e);
};
Pe.prototype.parseInline = function(t, e) {
  var n = new this.core.State(t, this, e);
  return n.inlineMode = !0, this.core.process(n), n.tokens;
};
Pe.prototype.renderInline = function(t, e) {
  return e = e || {}, this.renderer.render(this.parseInline(t, e), this.options, e);
};
var w5 = Pe, C5 = w5;
const A5 = /* @__PURE__ */ Mi(C5);
var S5 = He({
  name: "VueMarkdown",
  props: {
    source: {
      type: String,
      required: !0
    },
    options: {
      type: Object,
      required: !1
    }
  },
  data: function() {
    return {
      md: null
    };
  },
  computed: {
    content: function() {
      var t, e = this.source;
      return (t = this.md) === null || t === void 0 ? void 0 : t.render(e);
    }
  },
  created: function() {
    var t;
    this.md = new A5((t = this.options) !== null && t !== void 0 ? t : {});
  },
  render: function() {
    return Si("div", { innerHTML: this.content });
  }
});
const D5 = S5;
function el(t) {
  return t instanceof Map ? t.clear = t.delete = t.set = function() {
    throw new Error("map is read-only");
  } : t instanceof Set && (t.add = t.clear = t.delete = function() {
    throw new Error("set is read-only");
  }), Object.freeze(t), Object.getOwnPropertyNames(t).forEach((e) => {
    const n = t[e], r = typeof n;
    (r === "object" || r === "function") && !Object.isFrozen(n) && el(n);
  }), t;
}
class Ec {
  /**
   * @param {CompiledMode} mode
   */
  constructor(e) {
    e.data === void 0 && (e.data = {}), this.data = e.data, this.isMatchIgnored = !1;
  }
  ignoreMatch() {
    this.isMatchIgnored = !0;
  }
}
function tl(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}
function it(t, ...e) {
  const n = /* @__PURE__ */ Object.create(null);
  for (const r in t)
    n[r] = t[r];
  return e.forEach(function(r) {
    for (const s in r)
      n[s] = r[s];
  }), /** @type {T} */
  n;
}
const T5 = "</span>", wc = (t) => !!t.scope, R5 = (t, { prefix: e }) => {
  if (t.startsWith("language:"))
    return t.replace("language:", "language-");
  if (t.includes(".")) {
    const n = t.split(".");
    return [
      `${e}${n.shift()}`,
      ...n.map((r, s) => `${r}${"_".repeat(s + 1)}`)
    ].join(" ");
  }
  return `${e}${t}`;
};
class q5 {
  /**
   * Creates a new HTMLRenderer
   *
   * @param {Tree} parseTree - the parse tree (must support `walk` API)
   * @param {{classPrefix: string}} options
   */
  constructor(e, n) {
    this.buffer = "", this.classPrefix = n.classPrefix, e.walk(this);
  }
  /**
   * Adds texts to the output stream
   *
   * @param {string} text */
  addText(e) {
    this.buffer += tl(e);
  }
  /**
   * Adds a node open to the output stream (if needed)
   *
   * @param {Node} node */
  openNode(e) {
    if (!wc(e))
      return;
    const n = R5(
      e.scope,
      { prefix: this.classPrefix }
    );
    this.span(n);
  }
  /**
   * Adds a node close to the output stream (if needed)
   *
   * @param {Node} node */
  closeNode(e) {
    wc(e) && (this.buffer += T5);
  }
  /**
   * returns the accumulated buffer
  */
  value() {
    return this.buffer;
  }
  // helpers
  /**
   * Builds a span element
   *
   * @param {string} className */
  span(e) {
    this.buffer += `<span class="${e}">`;
  }
}
const Cc = (t = {}) => {
  const e = { children: [] };
  return Object.assign(e, t), e;
};
class Ks {
  constructor() {
    this.rootNode = Cc(), this.stack = [this.rootNode];
  }
  get top() {
    return this.stack[this.stack.length - 1];
  }
  get root() {
    return this.rootNode;
  }
  /** @param {Node} node */
  add(e) {
    this.top.children.push(e);
  }
  /** @param {string} scope */
  openNode(e) {
    const n = Cc({ scope: e });
    this.add(n), this.stack.push(n);
  }
  closeNode() {
    if (this.stack.length > 1)
      return this.stack.pop();
  }
  closeAllNodes() {
    for (; this.closeNode(); )
      ;
  }
  toJSON() {
    return JSON.stringify(this.rootNode, null, 4);
  }
  /**
   * @typedef { import("./html_renderer").Renderer } Renderer
   * @param {Renderer} builder
   */
  walk(e) {
    return this.constructor._walk(e, this.rootNode);
  }
  /**
   * @param {Renderer} builder
   * @param {Node} node
   */
  static _walk(e, n) {
    return typeof n == "string" ? e.addText(n) : n.children && (e.openNode(n), n.children.forEach((r) => this._walk(e, r)), e.closeNode(n)), e;
  }
  /**
   * @param {Node} node
   */
  static _collapse(e) {
    typeof e != "string" && e.children && (e.children.every((n) => typeof n == "string") ? e.children = [e.children.join("")] : e.children.forEach((n) => {
      Ks._collapse(n);
    }));
  }
}
class M5 extends Ks {
  /**
   * @param {*} options
   */
  constructor(e) {
    super(), this.options = e;
  }
  /**
   * @param {string} text
   */
  addText(e) {
    e !== "" && this.add(e);
  }
  /** @param {string} scope */
  startScope(e) {
    this.openNode(e);
  }
  endScope() {
    this.closeNode();
  }
  /**
   * @param {Emitter & {root: DataNode}} emitter
   * @param {string} name
   */
  __addSublanguage(e, n) {
    const r = e.root;
    n && (r.scope = `language:${n}`), this.add(r);
  }
  toHTML() {
    return new q5(this, this.options).value();
  }
  finalize() {
    return this.closeAllNodes(), !0;
  }
}
function Cn(t) {
  return t ? typeof t == "string" ? t : t.source : null;
}
function nl(t) {
  return Nt("(?=", t, ")");
}
function N5(t) {
  return Nt("(?:", t, ")*");
}
function I5(t) {
  return Nt("(?:", t, ")?");
}
function Nt(...t) {
  return t.map((n) => Cn(n)).join("");
}
function F5(t) {
  const e = t[t.length - 1];
  return typeof e == "object" && e.constructor === Object ? (t.splice(t.length - 1, 1), e) : {};
}
function Ws(...t) {
  return "(" + (F5(t).capture ? "" : "?:") + t.map((r) => Cn(r)).join("|") + ")";
}
function rl(t) {
  return new RegExp(t.toString() + "|").exec("").length - 1;
}
function L5(t, e) {
  const n = t && t.exec(e);
  return n && n.index === 0;
}
const O5 = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
function Js(t, { joinWith: e }) {
  let n = 0;
  return t.map((r) => {
    n += 1;
    const s = n;
    let o = Cn(r), c = "";
    for (; o.length > 0; ) {
      const i = O5.exec(o);
      if (!i) {
        c += o;
        break;
      }
      c += o.substring(0, i.index), o = o.substring(i.index + i[0].length), i[0][0] === "\\" && i[1] ? c += "\\" + String(Number(i[1]) + s) : (c += i[0], i[0] === "(" && n++);
    }
    return c;
  }).map((r) => `(${r})`).join(e);
}
const P5 = /\b\B/, sl = "[a-zA-Z]\\w*", Ys = "[a-zA-Z_]\\w*", ol = "\\b\\d+(\\.\\d+)?", cl = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", il = "\\b(0b[01]+)", B5 = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", $5 = (t = {}) => {
  const e = /^#![ ]*\//;
  return t.binary && (t.begin = Nt(
    e,
    /.*\b/,
    t.binary,
    /\b.*/
  )), it({
    scope: "meta",
    begin: e,
    end: /$/,
    relevance: 0,
    /** @type {ModeCallback} */
    "on:begin": (n, r) => {
      n.index !== 0 && r.ignoreMatch();
    }
  }, t);
}, An = {
  begin: "\\\\[\\s\\S]",
  relevance: 0
}, z5 = {
  scope: "string",
  begin: "'",
  end: "'",
  illegal: "\\n",
  contains: [An]
}, U5 = {
  scope: "string",
  begin: '"',
  end: '"',
  illegal: "\\n",
  contains: [An]
}, H5 = {
  begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
}, Ar = function(t, e, n = {}) {
  const r = it(
    {
      scope: "comment",
      begin: t,
      end: e,
      contains: []
    },
    n
  );
  r.contains.push({
    scope: "doctag",
    // hack to avoid the space from being included. the space is necessary to
    // match here to prevent the plain text rule below from gobbling up doctags
    begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
    end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
    excludeBegin: !0,
    relevance: 0
  });
  const s = Ws(
    // list of common 1 and 2 letter words in English
    "I",
    "a",
    "is",
    "so",
    "us",
    "to",
    "at",
    "if",
    "in",
    "it",
    "on",
    // note: this is not an exhaustive list of contractions, just popular ones
    /[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
    // contractions - can't we'd they're let's, etc
    /[A-Za-z]+[-][a-z]+/,
    // `no-way`, etc.
    /[A-Za-z][a-z]{2,}/
    // allow capitalized words at beginning of sentences
  );
  return r.contains.push(
    {
      // TODO: how to include ", (, ) without breaking grammars that use these for
      // comment delimiters?
      // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
      // ---
      // this tries to find sequences of 3 english words in a row (without any
      // "programming" type syntax) this gives us a strong signal that we've
      // TRULY found a comment - vs perhaps scanning with the wrong language.
      // It's possible to find something that LOOKS like the start of the
      // comment - but then if there is no readable text - good chance it is a
      // false match and not a comment.
      //
      // for a visual example please see:
      // https://github.com/highlightjs/highlight.js/issues/2827
      begin: Nt(
        /[ ]+/,
        // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
        "(",
        s,
        /[.]?[:]?([.][ ]|[ ])/,
        "){3}"
      )
      // look for 3 words in a row
    }
  ), r;
}, j5 = Ar("//", "$"), V5 = Ar("/\\*", "\\*/"), G5 = Ar("#", "$"), Z5 = {
  scope: "number",
  begin: ol,
  relevance: 0
}, K5 = {
  scope: "number",
  begin: cl,
  relevance: 0
}, W5 = {
  scope: "number",
  begin: il,
  relevance: 0
}, J5 = {
  scope: "regexp",
  begin: /\/(?=[^/\n]*\/)/,
  end: /\/[gimuy]*/,
  contains: [
    An,
    {
      begin: /\[/,
      end: /\]/,
      relevance: 0,
      contains: [An]
    }
  ]
}, Y5 = {
  scope: "title",
  begin: sl,
  relevance: 0
}, X5 = {
  scope: "title",
  begin: Ys,
  relevance: 0
}, Q5 = {
  // excludes method names from keyword processing
  begin: "\\.\\s*" + Ys,
  relevance: 0
}, e9 = function(t) {
  return Object.assign(
    t,
    {
      /** @type {ModeCallback} */
      "on:begin": (e, n) => {
        n.data._beginMatch = e[1];
      },
      /** @type {ModeCallback} */
      "on:end": (e, n) => {
        n.data._beginMatch !== e[1] && n.ignoreMatch();
      }
    }
  );
};
var zn = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  APOS_STRING_MODE: z5,
  BACKSLASH_ESCAPE: An,
  BINARY_NUMBER_MODE: W5,
  BINARY_NUMBER_RE: il,
  COMMENT: Ar,
  C_BLOCK_COMMENT_MODE: V5,
  C_LINE_COMMENT_MODE: j5,
  C_NUMBER_MODE: K5,
  C_NUMBER_RE: cl,
  END_SAME_AS_BEGIN: e9,
  HASH_COMMENT_MODE: G5,
  IDENT_RE: sl,
  MATCH_NOTHING_RE: P5,
  METHOD_GUARD: Q5,
  NUMBER_MODE: Z5,
  NUMBER_RE: ol,
  PHRASAL_WORDS_MODE: H5,
  QUOTE_STRING_MODE: U5,
  REGEXP_MODE: J5,
  RE_STARTERS_RE: B5,
  SHEBANG: $5,
  TITLE_MODE: Y5,
  UNDERSCORE_IDENT_RE: Ys,
  UNDERSCORE_TITLE_MODE: X5
});
function t9(t, e) {
  t.input[t.index - 1] === "." && e.ignoreMatch();
}
function n9(t, e) {
  t.className !== void 0 && (t.scope = t.className, delete t.className);
}
function r9(t, e) {
  e && t.beginKeywords && (t.begin = "\\b(" + t.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", t.__beforeBegin = t9, t.keywords = t.keywords || t.beginKeywords, delete t.beginKeywords, t.relevance === void 0 && (t.relevance = 0));
}
function s9(t, e) {
  Array.isArray(t.illegal) && (t.illegal = Ws(...t.illegal));
}
function o9(t, e) {
  if (t.match) {
    if (t.begin || t.end)
      throw new Error("begin & end are not supported with match");
    t.begin = t.match, delete t.match;
  }
}
function c9(t, e) {
  t.relevance === void 0 && (t.relevance = 1);
}
const i9 = (t, e) => {
  if (!t.beforeMatch)
    return;
  if (t.starts)
    throw new Error("beforeMatch cannot be used with starts");
  const n = Object.assign({}, t);
  Object.keys(t).forEach((r) => {
    delete t[r];
  }), t.keywords = n.keywords, t.begin = Nt(n.beforeMatch, nl(n.begin)), t.starts = {
    relevance: 0,
    contains: [
      Object.assign(n, { endsParent: !0 })
    ]
  }, t.relevance = 0, delete n.beforeMatch;
}, l9 = [
  "of",
  "and",
  "for",
  "in",
  "not",
  "or",
  "if",
  "then",
  "parent",
  // common variable name
  "list",
  // common variable name
  "value"
  // common variable name
], a9 = "keyword";
function ll(t, e, n = a9) {
  const r = /* @__PURE__ */ Object.create(null);
  return typeof t == "string" ? s(n, t.split(" ")) : Array.isArray(t) ? s(n, t) : Object.keys(t).forEach(function(o) {
    Object.assign(
      r,
      ll(t[o], e, o)
    );
  }), r;
  function s(o, c) {
    e && (c = c.map((i) => i.toLowerCase())), c.forEach(function(i) {
      const l = i.split("|");
      r[l[0]] = [o, u9(l[0], l[1])];
    });
  }
}
function u9(t, e) {
  return e ? Number(e) : f9(t) ? 0 : 1;
}
function f9(t) {
  return l9.includes(t.toLowerCase());
}
const Ac = {}, Dt = (t) => {
  console.error(t);
}, Sc = (t, ...e) => {
  console.log(`WARN: ${t}`, ...e);
}, Ot = (t, e) => {
  Ac[`${t}/${e}`] || (console.log(`Deprecated as of ${t}. ${e}`), Ac[`${t}/${e}`] = !0);
}, rr = new Error();
function al(t, e, { key: n }) {
  let r = 0;
  const s = t[n], o = {}, c = {};
  for (let i = 1; i <= e.length; i++)
    c[i + r] = s[i], o[i + r] = !0, r += rl(e[i - 1]);
  t[n] = c, t[n]._emit = o, t[n]._multi = !0;
}
function p9(t) {
  if (Array.isArray(t.begin)) {
    if (t.skip || t.excludeBegin || t.returnBegin)
      throw Dt("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), rr;
    if (typeof t.beginScope != "object" || t.beginScope === null)
      throw Dt("beginScope must be object"), rr;
    al(t, t.begin, { key: "beginScope" }), t.begin = Js(t.begin, { joinWith: "" });
  }
}
function h9(t) {
  if (Array.isArray(t.end)) {
    if (t.skip || t.excludeEnd || t.returnEnd)
      throw Dt("skip, excludeEnd, returnEnd not compatible with endScope: {}"), rr;
    if (typeof t.endScope != "object" || t.endScope === null)
      throw Dt("endScope must be object"), rr;
    al(t, t.end, { key: "endScope" }), t.end = Js(t.end, { joinWith: "" });
  }
}
function d9(t) {
  t.scope && typeof t.scope == "object" && t.scope !== null && (t.beginScope = t.scope, delete t.scope);
}
function g9(t) {
  d9(t), typeof t.beginScope == "string" && (t.beginScope = { _wrap: t.beginScope }), typeof t.endScope == "string" && (t.endScope = { _wrap: t.endScope }), p9(t), h9(t);
}
function m9(t) {
  function e(c, i) {
    return new RegExp(
      Cn(c),
      "m" + (t.case_insensitive ? "i" : "") + (t.unicodeRegex ? "u" : "") + (i ? "g" : "")
    );
  }
  class n {
    constructor() {
      this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
    }
    // @ts-ignore
    addRule(i, l) {
      l.position = this.position++, this.matchIndexes[this.matchAt] = l, this.regexes.push([l, i]), this.matchAt += rl(i) + 1;
    }
    compile() {
      this.regexes.length === 0 && (this.exec = () => null);
      const i = this.regexes.map((l) => l[1]);
      this.matcherRe = e(Js(i, { joinWith: "|" }), !0), this.lastIndex = 0;
    }
    /** @param {string} s */
    exec(i) {
      this.matcherRe.lastIndex = this.lastIndex;
      const l = this.matcherRe.exec(i);
      if (!l)
        return null;
      const a = l.findIndex((f, p) => p > 0 && f !== void 0), u = this.matchIndexes[a];
      return l.splice(0, a), Object.assign(l, u);
    }
  }
  class r {
    constructor() {
      this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
    }
    // @ts-ignore
    getMatcher(i) {
      if (this.multiRegexes[i])
        return this.multiRegexes[i];
      const l = new n();
      return this.rules.slice(i).forEach(([a, u]) => l.addRule(a, u)), l.compile(), this.multiRegexes[i] = l, l;
    }
    resumingScanAtSamePosition() {
      return this.regexIndex !== 0;
    }
    considerAll() {
      this.regexIndex = 0;
    }
    // @ts-ignore
    addRule(i, l) {
      this.rules.push([i, l]), l.type === "begin" && this.count++;
    }
    /** @param {string} s */
    exec(i) {
      const l = this.getMatcher(this.regexIndex);
      l.lastIndex = this.lastIndex;
      let a = l.exec(i);
      if (this.resumingScanAtSamePosition() && !(a && a.index === this.lastIndex)) {
        const u = this.getMatcher(0);
        u.lastIndex = this.lastIndex + 1, a = u.exec(i);
      }
      return a && (this.regexIndex += a.position + 1, this.regexIndex === this.count && this.considerAll()), a;
    }
  }
  function s(c) {
    const i = new r();
    return c.contains.forEach((l) => i.addRule(l.begin, { rule: l, type: "begin" })), c.terminatorEnd && i.addRule(c.terminatorEnd, { type: "end" }), c.illegal && i.addRule(c.illegal, { type: "illegal" }), i;
  }
  function o(c, i) {
    const l = (
      /** @type CompiledMode */
      c
    );
    if (c.isCompiled)
      return l;
    [
      n9,
      // do this early so compiler extensions generally don't have to worry about
      // the distinction between match/begin
      o9,
      g9,
      i9
    ].forEach((u) => u(c, i)), t.compilerExtensions.forEach((u) => u(c, i)), c.__beforeBegin = null, [
      r9,
      // do this later so compiler extensions that come earlier have access to the
      // raw array if they wanted to perhaps manipulate it, etc.
      s9,
      // default to 1 relevance if not specified
      c9
    ].forEach((u) => u(c, i)), c.isCompiled = !0;
    let a = null;
    return typeof c.keywords == "object" && c.keywords.$pattern && (c.keywords = Object.assign({}, c.keywords), a = c.keywords.$pattern, delete c.keywords.$pattern), a = a || /\w+/, c.keywords && (c.keywords = ll(c.keywords, t.case_insensitive)), l.keywordPatternRe = e(a, !0), i && (c.begin || (c.begin = /\B|\b/), l.beginRe = e(l.begin), !c.end && !c.endsWithParent && (c.end = /\B|\b/), c.end && (l.endRe = e(l.end)), l.terminatorEnd = Cn(l.end) || "", c.endsWithParent && i.terminatorEnd && (l.terminatorEnd += (c.end ? "|" : "") + i.terminatorEnd)), c.illegal && (l.illegalRe = e(
      /** @type {RegExp | string} */
      c.illegal
    )), c.contains || (c.contains = []), c.contains = [].concat(...c.contains.map(function(u) {
      return _9(u === "self" ? c : u);
    })), c.contains.forEach(function(u) {
      o(
        /** @type Mode */
        u,
        l
      );
    }), c.starts && o(c.starts, i), l.matcher = s(l), l;
  }
  if (t.compilerExtensions || (t.compilerExtensions = []), t.contains && t.contains.includes("self"))
    throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
  return t.classNameAliases = it(t.classNameAliases || {}), o(
    /** @type Mode */
    t
  );
}
function ul(t) {
  return t ? t.endsWithParent || ul(t.starts) : !1;
}
function _9(t) {
  return t.variants && !t.cachedVariants && (t.cachedVariants = t.variants.map(function(e) {
    return it(t, { variants: null }, e);
  })), t.cachedVariants ? t.cachedVariants : ul(t) ? it(t, { starts: t.starts ? it(t.starts) : null }) : Object.isFrozen(t) ? it(t) : t;
}
var b9 = "11.9.0";
class v9 extends Error {
  constructor(e, n) {
    super(e), this.name = "HTMLInjectionError", this.html = n;
  }
}
const Jr = tl, Dc = it, Tc = Symbol("nomatch"), x9 = 7, fl = function(t) {
  const e = /* @__PURE__ */ Object.create(null), n = /* @__PURE__ */ Object.create(null), r = [];
  let s = !0;
  const o = "Could not find the language '{}', did you forget to load/include a language module?", c = { disableAutodetect: !0, name: "Plain text", contains: [] };
  let i = {
    ignoreUnescapedHTML: !1,
    throwUnescapedHTML: !1,
    noHighlightRe: /^(no-?highlight)$/i,
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
    classPrefix: "hljs-",
    cssSelector: "pre code",
    languages: null,
    // beta configuration options, subject to change, welcome to discuss
    // https://github.com/highlightjs/highlight.js/issues/1086
    __emitter: M5
  };
  function l(v) {
    return i.noHighlightRe.test(v);
  }
  function a(v) {
    let S = v.className + " ";
    S += v.parentNode ? v.parentNode.className : "";
    const G = i.languageDetectRe.exec(S);
    if (G) {
      const te = X(G[1]);
      return te || (Sc(o.replace("{}", G[1])), Sc("Falling back to no-highlight mode for this block.", v)), te ? G[1] : "no-highlight";
    }
    return S.split(/\s+/).find((te) => l(te) || X(te));
  }
  function u(v, S, G) {
    let te = "", ie = "";
    typeof S == "object" ? (te = v, G = S.ignoreIllegals, ie = S.language) : (Ot("10.7.0", "highlight(lang, code, ...args) has been deprecated."), Ot("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), ie = v, te = S), G === void 0 && (G = !0);
    const ae = {
      code: te,
      language: ie
    };
    ne("before:highlight", ae);
    const De = ae.result ? ae.result : f(ae.language, ae.code, G);
    return De.code = ae.code, ne("after:highlight", De), De;
  }
  function f(v, S, G, te) {
    const ie = /* @__PURE__ */ Object.create(null);
    function ae(w, R) {
      return w.keywords[R];
    }
    function De() {
      if (!m.keywords) {
        y.addText(L);
        return;
      }
      let w = 0;
      m.keywordPatternRe.lastIndex = 0;
      let R = m.keywordPatternRe.exec(L), H = "";
      for (; R; ) {
        H += L.substring(w, R.index);
        const Y = x.case_insensitive ? R[0].toLowerCase() : R[0], pe = ae(m, Y);
        if (pe) {
          const [Ne, dt] = pe;
          if (y.addText(H), H = "", ie[Y] = (ie[Y] || 0) + 1, ie[Y] <= x9 && (P += dt), Ne.startsWith("_"))
            H += R[0];
          else {
            const qn = x.classNameAliases[Ne] || Ne;
            de(R[0], qn);
          }
        } else
          H += R[0];
        w = m.keywordPatternRe.lastIndex, R = m.keywordPatternRe.exec(L);
      }
      H += L.substring(w), y.addText(H);
    }
    function It() {
      if (L === "")
        return;
      let w = null;
      if (typeof m.subLanguage == "string") {
        if (!e[m.subLanguage]) {
          y.addText(L);
          return;
        }
        w = f(m.subLanguage, L, !0, F[m.subLanguage]), F[m.subLanguage] = /** @type {CompiledMode} */
        w._top;
      } else
        w = d(L, m.subLanguage.length ? m.subLanguage : null);
      m.relevance > 0 && (P += w.relevance), y.__addSublanguage(w._emitter, w.language);
    }
    function Ce() {
      m.subLanguage != null ? It() : De(), L = "";
    }
    function de(w, R) {
      w !== "" && (y.startScope(R), y.addText(w), y.endScope());
    }
    function ht(w, R) {
      let H = 1;
      const Y = R.length - 1;
      for (; H <= Y; ) {
        if (!w._emit[H]) {
          H++;
          continue;
        }
        const pe = x.classNameAliases[w[H]] || w[H], Ne = R[H];
        pe ? de(Ne, pe) : (L = Ne, De(), L = ""), H++;
      }
    }
    function nn(w, R) {
      return w.scope && typeof w.scope == "string" && y.openNode(x.classNameAliases[w.scope] || w.scope), w.beginScope && (w.beginScope._wrap ? (de(L, x.classNameAliases[w.beginScope._wrap] || w.beginScope._wrap), L = "") : w.beginScope._multi && (ht(w.beginScope, R), L = "")), m = Object.create(w, { parent: { value: m } }), m;
    }
    function Qe(w, R, H) {
      let Y = L5(w.endRe, H);
      if (Y) {
        if (w["on:end"]) {
          const pe = new Ec(w);
          w["on:end"](R, pe), pe.isMatchIgnored && (Y = !1);
        }
        if (Y) {
          for (; w.endsParent && w.parent; )
            w = w.parent;
          return w;
        }
      }
      if (w.endsWithParent)
        return Qe(w.parent, R, H);
    }
    function rn(w) {
      return m.matcher.regexIndex === 0 ? (L += w[0], 1) : (Q = !0, 0);
    }
    function sn(w) {
      const R = w[0], H = w.rule, Y = new Ec(H), pe = [H.__beforeBegin, H["on:begin"]];
      for (const Ne of pe)
        if (Ne && (Ne(w, Y), Y.isMatchIgnored))
          return rn(R);
      return H.skip ? L += R : (H.excludeBegin && (L += R), Ce(), !H.returnBegin && !H.excludeBegin && (L = R)), nn(H, w), H.returnBegin ? 0 : R.length;
    }
    function h(w) {
      const R = w[0], H = S.substring(w.index), Y = Qe(m, w, H);
      if (!Y)
        return Tc;
      const pe = m;
      m.endScope && m.endScope._wrap ? (Ce(), de(R, m.endScope._wrap)) : m.endScope && m.endScope._multi ? (Ce(), ht(m.endScope, w)) : pe.skip ? L += R : (pe.returnEnd || pe.excludeEnd || (L += R), Ce(), pe.excludeEnd && (L = R));
      do
        m.scope && y.closeNode(), !m.skip && !m.subLanguage && (P += m.relevance), m = m.parent;
      while (m !== Y.parent);
      return Y.starts && nn(Y.starts, w), pe.returnEnd ? 0 : R.length;
    }
    function g() {
      const w = [];
      for (let R = m; R !== x; R = R.parent)
        R.scope && w.unshift(R.scope);
      w.forEach((R) => y.openNode(R));
    }
    let _ = {};
    function E(w, R) {
      const H = R && R[0];
      if (L += w, H == null)
        return Ce(), 0;
      if (_.type === "begin" && R.type === "end" && _.index === R.index && H === "") {
        if (L += S.slice(R.index, R.index + 1), !s) {
          const Y = new Error(`0 width match regex (${v})`);
          throw Y.languageName = v, Y.badRule = _.rule, Y;
        }
        return 1;
      }
      if (_ = R, R.type === "begin")
        return sn(R);
      if (R.type === "illegal" && !G) {
        const Y = new Error('Illegal lexeme "' + H + '" for mode "' + (m.scope || "<unnamed>") + '"');
        throw Y.mode = m, Y;
      } else if (R.type === "end") {
        const Y = h(R);
        if (Y !== Tc)
          return Y;
      }
      if (R.type === "illegal" && H === "")
        return 1;
      if (K > 1e5 && K > R.index * 3)
        throw new Error("potential infinite loop, way more iterations than matches");
      return L += H, H.length;
    }
    const x = X(v);
    if (!x)
      throw Dt(o.replace("{}", v)), new Error('Unknown language: "' + v + '"');
    const M = m9(x);
    let O = "", m = te || M;
    const F = {}, y = new i.__emitter(i);
    g();
    let L = "", P = 0, U = 0, K = 0, Q = !1;
    try {
      if (x.__emitTokens)
        x.__emitTokens(S, y);
      else {
        for (m.matcher.considerAll(); ; ) {
          K++, Q ? Q = !1 : m.matcher.considerAll(), m.matcher.lastIndex = U;
          const w = m.matcher.exec(S);
          if (!w)
            break;
          const R = S.substring(U, w.index), H = E(R, w);
          U = w.index + H;
        }
        E(S.substring(U));
      }
      return y.finalize(), O = y.toHTML(), {
        language: v,
        value: O,
        relevance: P,
        illegal: !1,
        _emitter: y,
        _top: m
      };
    } catch (w) {
      if (w.message && w.message.includes("Illegal"))
        return {
          language: v,
          value: Jr(S),
          illegal: !0,
          relevance: 0,
          _illegalBy: {
            message: w.message,
            index: U,
            context: S.slice(U - 100, U + 100),
            mode: w.mode,
            resultSoFar: O
          },
          _emitter: y
        };
      if (s)
        return {
          language: v,
          value: Jr(S),
          illegal: !1,
          relevance: 0,
          errorRaised: w,
          _emitter: y,
          _top: m
        };
      throw w;
    }
  }
  function p(v) {
    const S = {
      value: Jr(v),
      illegal: !1,
      relevance: 0,
      _top: c,
      _emitter: new i.__emitter(i)
    };
    return S._emitter.addText(v), S;
  }
  function d(v, S) {
    S = S || i.languages || Object.keys(e);
    const G = p(v), te = S.filter(X).filter(J).map(
      (Ce) => f(Ce, v, !1)
    );
    te.unshift(G);
    const ie = te.sort((Ce, de) => {
      if (Ce.relevance !== de.relevance)
        return de.relevance - Ce.relevance;
      if (Ce.language && de.language) {
        if (X(Ce.language).supersetOf === de.language)
          return 1;
        if (X(de.language).supersetOf === Ce.language)
          return -1;
      }
      return 0;
    }), [ae, De] = ie, It = ae;
    return It.secondBest = De, It;
  }
  function k(v, S, G) {
    const te = S && n[S] || G;
    v.classList.add("hljs"), v.classList.add(`language-${te}`);
  }
  function b(v) {
    let S = null;
    const G = a(v);
    if (l(G))
      return;
    if (ne(
      "before:highlightElement",
      { el: v, language: G }
    ), v.dataset.highlighted) {
      console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", v);
      return;
    }
    if (v.children.length > 0 && (i.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(v)), i.throwUnescapedHTML))
      throw new v9(
        "One of your code blocks includes unescaped HTML.",
        v.innerHTML
      );
    S = v;
    const te = S.textContent, ie = G ? u(te, { language: G, ignoreIllegals: !0 }) : d(te);
    v.innerHTML = ie.value, v.dataset.highlighted = "yes", k(v, G, ie.language), v.result = {
      language: ie.language,
      // TODO: remove with version 11.0
      re: ie.relevance,
      relevance: ie.relevance
    }, ie.secondBest && (v.secondBest = {
      language: ie.secondBest.language,
      relevance: ie.secondBest.relevance
    }), ne("after:highlightElement", { el: v, result: ie, text: te });
  }
  function I(v) {
    i = Dc(i, v);
  }
  const T = () => {
    A(), Ot("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
  };
  function C() {
    A(), Ot("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
  }
  let N = !1;
  function A() {
    if (document.readyState === "loading") {
      N = !0;
      return;
    }
    document.querySelectorAll(i.cssSelector).forEach(b);
  }
  function j() {
    N && A();
  }
  typeof window < "u" && window.addEventListener && window.addEventListener("DOMContentLoaded", j, !1);
  function q(v, S) {
    let G = null;
    try {
      G = S(t);
    } catch (te) {
      if (Dt("Language definition for '{}' could not be registered.".replace("{}", v)), s)
        Dt(te);
      else
        throw te;
      G = c;
    }
    G.name || (G.name = v), e[v] = G, G.rawDefinition = S.bind(null, t), G.aliases && z(G.aliases, { languageName: v });
  }
  function W(v) {
    delete e[v];
    for (const S of Object.keys(n))
      n[S] === v && delete n[S];
  }
  function $() {
    return Object.keys(e);
  }
  function X(v) {
    return v = (v || "").toLowerCase(), e[v] || e[n[v]];
  }
  function z(v, { languageName: S }) {
    typeof v == "string" && (v = [v]), v.forEach((G) => {
      n[G.toLowerCase()] = S;
    });
  }
  function J(v) {
    const S = X(v);
    return S && !S.disableAutodetect;
  }
  function B(v) {
    v["before:highlightBlock"] && !v["before:highlightElement"] && (v["before:highlightElement"] = (S) => {
      v["before:highlightBlock"](
        Object.assign({ block: S.el }, S)
      );
    }), v["after:highlightBlock"] && !v["after:highlightElement"] && (v["after:highlightElement"] = (S) => {
      v["after:highlightBlock"](
        Object.assign({ block: S.el }, S)
      );
    });
  }
  function re(v) {
    B(v), r.push(v);
  }
  function D(v) {
    const S = r.indexOf(v);
    S !== -1 && r.splice(S, 1);
  }
  function ne(v, S) {
    const G = v;
    r.forEach(function(te) {
      te[G] && te[G](S);
    });
  }
  function V(v) {
    return Ot("10.7.0", "highlightBlock will be removed entirely in v12.0"), Ot("10.7.0", "Please use highlightElement now."), b(v);
  }
  Object.assign(t, {
    highlight: u,
    highlightAuto: d,
    highlightAll: A,
    highlightElement: b,
    // TODO: Remove with v12 API
    highlightBlock: V,
    configure: I,
    initHighlighting: T,
    initHighlightingOnLoad: C,
    registerLanguage: q,
    unregisterLanguage: W,
    listLanguages: $,
    getLanguage: X,
    registerAliases: z,
    autoDetection: J,
    inherit: Dc,
    addPlugin: re,
    removePlugin: D
  }), t.debugMode = function() {
    s = !1;
  }, t.safeMode = function() {
    s = !0;
  }, t.versionString = b9, t.regex = {
    concat: Nt,
    lookahead: nl,
    either: Ws,
    optional: I5,
    anyNumberOfTimes: N5
  };
  for (const v in zn)
    typeof zn[v] == "object" && el(zn[v]);
  return Object.assign(t, zn), t;
}, Jt = fl({});
Jt.newInstance = () => fl({});
var y9 = Jt;
Jt.HighlightJS = Jt;
Jt.default = Jt;
const sr = /* @__PURE__ */ Mi(y9), hs = /* @__PURE__ */ He({
  __name: "Message",
  props: {
    message: {
      type: Object,
      required: !0
    }
  },
  setup(t) {
    const e = t, { message: n } = pa(e), r = Tt(() => n.value.text || "&lt;Empty response&gt;"), s = Tt(() => ({
      "chat-message-from-user": n.value.sender === "user",
      "chat-message-from-bot": n.value.sender === "bot"
    })), o = {
      highlight(c, i) {
        if (i && sr.getLanguage(i))
          try {
            return sr.highlight(c, { language: i }).value;
          } catch {
          }
        return "";
      }
    };
    return (c, i) => (oe(), be("div", {
      class: Sn(["chat-message", s.value])
    }, [
      hn(c.$slots, "default", {}, () => [
        he(ge(D5), {
          class: "chat-message-markdown",
          source: r.value,
          options: o
        }, null, 8, ["source"])
      ])
    ], 2));
  }
});
const k9 = /* @__PURE__ */ we("div", { class: "chat-message-typing-body" }, [
  /* @__PURE__ */ we("span", { class: "chat-message-typing-circle" }),
  /* @__PURE__ */ we("span", { class: "chat-message-typing-circle" }),
  /* @__PURE__ */ we("span", { class: "chat-message-typing-circle" })
], -1), E9 = /* @__PURE__ */ He({
  __name: "MessageTyping",
  props: {
    animation: {
      type: String,
      default: "bouncing"
    }
  },
  setup(t) {
    const e = t, n = {
      id: "typing",
      text: "",
      sender: "bot",
      createdAt: ""
    }, r = Tt(() => ({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "chat-message-typing": !0,
      [`chat-message-typing-animation-${e.animation}`]: !0
    }));
    return (s, o) => (oe(), Se(ge(hs), {
      class: Sn(r.value),
      message: n
    }, {
      default: ut(() => [
        k9
      ]),
      _: 1
    }, 8, ["class"]));
  }
});
const w9 = { class: "chat-messages-list" }, C9 = /* @__PURE__ */ He({
  __name: "MessagesList",
  props: {
    messages: {
      type: Array,
      required: !0
    }
  },
  setup(t) {
    const e = Ls(), { initialMessages: n, waitingForResponse: r } = e;
    return (s, o) => (oe(), be("div", w9, [
      (oe(!0), be(Re, null, uo(ge(n), (c) => (oe(), Se(hs, {
        key: c.id,
        message: c
      }, null, 8, ["message"]))), 128)),
      (oe(!0), be(Re, null, uo(t.messages, (c) => (oe(), Se(hs, {
        key: c.id,
        message: c
      }, null, 8, ["message"]))), 128)),
      ge(r) ? (oe(), Se(E9, { key: 0 })) : mn("", !0)
    ]));
  }
});
const A9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
}, S9 = /* @__PURE__ */ we("path", {
  fill: "currentColor",
  d: "m2 21l21-9L2 3v7l15 2l-15 2v7Z"
}, null, -1), D9 = [
  S9
];
function T9(t, e) {
  return oe(), be("svg", A9, D9);
}
const R9 = { name: "mdi-send", render: T9 }, q9 = { class: "chat-input" }, M9 = ["placeholder", "onKeydown"], N9 = ["disabled"], I9 = /* @__PURE__ */ He({
  __name: "Input",
  setup(t) {
    const e = Ls(), { waitingForResponse: n } = e, { t: r } = mr(), s = Ut(""), o = Tt(() => s.value === "" || n.value);
    async function c(l) {
      if (l.preventDefault(), o.value)
        return;
      const a = s.value;
      s.value = "", await e.sendMessage(a);
    }
    async function i(l) {
      l.shiftKey || await c(l);
    }
    return (l, a) => (oe(), be("div", q9, [
      li(we("textarea", {
        "onUpdate:modelValue": a[0] || (a[0] = (u) => s.value = u),
        rows: "1",
        placeholder: ge(r)("inputPlaceholder"),
        onKeydown: Ku(i, ["enter"])
      }, null, 40, M9), [
        [Gu, s.value]
      ]),
      we("button", {
        disabled: o.value,
        class: "chat-input-send-button",
        onClick: c
      }, [
        he(ge(R9), {
          height: "32",
          width: "32"
        })
      ], 8, N9)
    ]));
  }
});
const pl = /* @__PURE__ */ He({
  __name: "Chat",
  setup(t) {
    const { t: e } = mr(), n = Ls(), { messages: r, currentSessionId: s } = n, { options: o } = Os();
    async function c() {
      n.startNewSession(), Kt(() => {
        Rt.emit("scrollToBottom");
      });
    }
    async function i() {
      await n.loadPreviousSession(), Kt(() => {
        Rt.emit("scrollToBottom");
      });
    }
    return Dn(async () => {
      await i(), !o.showWelcomeScreen && !s.value && await c();
    }), (l, a) => (oe(), Se(uf, { class: "chat-wrapper" }, {
      header: ut(() => [
        we("h1", null, Zn(ge(e)("title")), 1),
        we("p", null, Zn(ge(e)("subtitle")), 1)
      ]),
      footer: ut(() => [
        ge(s) ? (oe(), Se(I9, { key: 0 })) : (oe(), Se(kf, { key: 1 }))
      ]),
      default: ut(() => [
        !ge(s) && ge(o).showWelcomeScreen ? (oe(), Se(df, {
          key: 0,
          "onClick:button": c
        })) : (oe(), Se(C9, {
          key: 1,
          messages: ge(r)
        }, null, 8, ["messages"]))
      ]),
      _: 1
    }));
  }
}), F9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
}, L9 = /* @__PURE__ */ we("path", {
  fill: "currentColor",
  d: "M12 3c5.5 0 10 3.58 10 8s-4.5 8-10 8c-1.24 0-2.43-.18-3.53-.5C5.55 21 2 21 2 21c2.33-2.33 2.7-3.9 2.75-4.5C3.05 15.07 2 13.13 2 11c0-4.42 4.5-8 10-8Z"
}, null, -1), O9 = [
  L9
];
function P9(t, e) {
  return oe(), be("svg", F9, O9);
}
const B9 = { name: "mdi-chat", render: P9 }, $9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
}, z9 = /* @__PURE__ */ we("path", {
  fill: "currentColor",
  d: "M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z"
}, null, -1), U9 = [
  z9
];
function H9(t, e) {
  return oe(), be("svg", $9, U9);
}
const j9 = { name: "mdi-chevron-down", render: H9 }, V9 = { class: "chat-window-wrapper" }, G9 = { class: "chat-window" }, Z9 = /* @__PURE__ */ He({
  __name: "ChatWindow",
  setup(t) {
    const e = Ut(!1);
    function n() {
      e.value = !e.value, e.value && Kt(() => {
        Rt.emit("scrollToBottom");
      });
    }
    return (r, s) => (oe(), be("div", V9, [
      he(er, { name: "chat-window-transition" }, {
        default: ut(() => [
          li(we("div", G9, [
            he(pl)
          ], 512), [
            [Wu, e.value]
          ])
        ]),
        _: 1
      }),
      we("div", {
        class: "chat-window-toggle",
        onClick: n
      }, [
        he(er, {
          name: "chat-window-toggle-transition",
          mode: "out-in"
        }, {
          default: ut(() => [
            e.value ? (oe(), Se(ge(j9), {
              key: 1,
              height: "32",
              width: "32"
            })) : (oe(), Se(ge(B9), {
              key: 0,
              height: "32",
              width: "32"
            }))
          ]),
          _: 1
        })
      ])
    ]));
  }
});
function K9(t) {
  const e = t.regex, n = e.concat(/[\p{L}_]/u, e.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u), r = /[\p{L}0-9._:-]+/u, s = {
    className: "symbol",
    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
  }, o = {
    begin: /\s/,
    contains: [
      {
        className: "keyword",
        begin: /#?[a-z_][a-z1-9_-]+/,
        illegal: /\n/
      }
    ]
  }, c = t.inherit(o, {
    begin: /\(/,
    end: /\)/
  }), i = t.inherit(t.APOS_STRING_MODE, { className: "string" }), l = t.inherit(t.QUOTE_STRING_MODE, { className: "string" }), a = {
    endsWithParent: !0,
    illegal: /</,
    relevance: 0,
    contains: [
      {
        className: "attr",
        begin: r,
        relevance: 0
      },
      {
        begin: /=\s*/,
        relevance: 0,
        contains: [
          {
            className: "string",
            endsParent: !0,
            variants: [
              {
                begin: /"/,
                end: /"/,
                contains: [s]
              },
              {
                begin: /'/,
                end: /'/,
                contains: [s]
              },
              { begin: /[^\s"'=<>`]+/ }
            ]
          }
        ]
      }
    ]
  };
  return {
    name: "HTML, XML",
    aliases: [
      "html",
      "xhtml",
      "rss",
      "atom",
      "xjb",
      "xsd",
      "xsl",
      "plist",
      "wsf",
      "svg"
    ],
    case_insensitive: !0,
    unicodeRegex: !0,
    contains: [
      {
        className: "meta",
        begin: /<![a-z]/,
        end: />/,
        relevance: 10,
        contains: [
          o,
          l,
          i,
          c,
          {
            begin: /\[/,
            end: /\]/,
            contains: [
              {
                className: "meta",
                begin: /<![a-z]/,
                end: />/,
                contains: [
                  o,
                  c,
                  l,
                  i
                ]
              }
            ]
          }
        ]
      },
      t.COMMENT(
        /<!--/,
        /-->/,
        { relevance: 10 }
      ),
      {
        begin: /<!\[CDATA\[/,
        end: /\]\]>/,
        relevance: 10
      },
      s,
      // xml processing instructions
      {
        className: "meta",
        end: /\?>/,
        variants: [
          {
            begin: /<\?xml/,
            relevance: 10,
            contains: [
              l
            ]
          },
          {
            begin: /<\?[a-z][a-z0-9]+/
          }
        ]
      },
      {
        className: "tag",
        /*
        The lookahead pattern (?=...) ensures that 'begin' only matches
        '<style' as a single word, followed by a whitespace or an
        ending bracket.
        */
        begin: /<style(?=\s|>)/,
        end: />/,
        keywords: { name: "style" },
        contains: [a],
        starts: {
          end: /<\/style>/,
          returnEnd: !0,
          subLanguage: [
            "css",
            "xml"
          ]
        }
      },
      {
        className: "tag",
        // See the comment in the <style tag about the lookahead pattern
        begin: /<script(?=\s|>)/,
        end: />/,
        keywords: { name: "script" },
        contains: [a],
        starts: {
          end: /<\/script>/,
          returnEnd: !0,
          subLanguage: [
            "javascript",
            "handlebars",
            "xml"
          ]
        }
      },
      // we need this for now for jSX
      {
        className: "tag",
        begin: /<>|<\/>/
      },
      // open tag
      {
        className: "tag",
        begin: e.concat(
          /</,
          e.lookahead(e.concat(
            n,
            // <tag/>
            // <tag>
            // <tag ...
            e.either(/\/>/, />/, /\s/)
          ))
        ),
        end: /\/?>/,
        contains: [
          {
            className: "name",
            begin: n,
            relevance: 0,
            starts: a
          }
        ]
      },
      // close tag
      {
        className: "tag",
        begin: e.concat(
          /<\//,
          e.lookahead(e.concat(
            n,
            />/
          ))
        ),
        contains: [
          {
            className: "name",
            begin: n,
            relevance: 0
          },
          {
            begin: />/,
            relevance: 0,
            endsParent: !0
          }
        ]
      }
    ]
  };
}
const Rc = "[A-Za-z$_][0-9A-Za-z$_]*", W9 = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends"
], J9 = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], hl = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
], dl = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], gl = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
], Y9 = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
], X9 = [].concat(
  gl,
  hl,
  dl
);
function Q9(t) {
  const e = t.regex, n = (S, { after: G }) => {
    const te = "</" + S[0].slice(1);
    return S.input.indexOf(te, G) !== -1;
  }, r = Rc, s = {
    begin: "<>",
    end: "</>"
  }, o = /<[A-Za-z0-9\\._:-]+\s*\/>/, c = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (S, G) => {
      const te = S[0].length + S.index, ie = S.input[te];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        ie === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        ie === ","
      ) {
        G.ignoreMatch();
        return;
      }
      ie === ">" && (n(S, { after: te }) || G.ignoreMatch());
      let ae;
      const De = S.input.substring(te);
      if (ae = De.match(/^\s*=/)) {
        G.ignoreMatch();
        return;
      }
      if ((ae = De.match(/^\s+extends\s+/)) && ae.index === 0) {
        G.ignoreMatch();
        return;
      }
    }
  }, i = {
    $pattern: Rc,
    keyword: W9,
    literal: J9,
    built_in: X9,
    "variable.language": Y9
  }, l = "[0-9](_?[0-9])*", a = `\\.(${l})`, u = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", f = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${u})((${a})|\\.)?|(${a}))[eE][+-]?(${l})\\b` },
      { begin: `\\b(${u})\\b((${a})\\b|\\.)?|(${a})\\b` },
      // DecimalBigIntegerLiteral
      { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  }, p = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: i,
    contains: []
    // defined later
  }, d = {
    begin: "html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        t.BACKSLASH_ESCAPE,
        p
      ],
      subLanguage: "xml"
    }
  }, k = {
    begin: "css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        t.BACKSLASH_ESCAPE,
        p
      ],
      subLanguage: "css"
    }
  }, b = {
    begin: "gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        t.BACKSLASH_ESCAPE,
        p
      ],
      subLanguage: "graphql"
    }
  }, I = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      t.BACKSLASH_ESCAPE,
      p
    ]
  }, C = {
    className: "comment",
    variants: [
      t.COMMENT(
        /\/\*\*(?!\/)/,
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              begin: "(?=@[A-Za-z]+)",
              relevance: 0,
              contains: [
                {
                  className: "doctag",
                  begin: "@[A-Za-z]+"
                },
                {
                  className: "type",
                  begin: "\\{",
                  end: "\\}",
                  excludeEnd: !0,
                  excludeBegin: !0,
                  relevance: 0
                },
                {
                  className: "variable",
                  begin: r + "(?=\\s*(-)|$)",
                  endsParent: !0,
                  relevance: 0
                },
                // eat spaces (not newlines) so we can find
                // types or variables
                {
                  begin: /(?=[^\n])\s/,
                  relevance: 0
                }
              ]
            }
          ]
        }
      ),
      t.C_BLOCK_COMMENT_MODE,
      t.C_LINE_COMMENT_MODE
    ]
  }, N = [
    t.APOS_STRING_MODE,
    t.QUOTE_STRING_MODE,
    d,
    k,
    b,
    I,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    f
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  p.contains = N.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: i,
    contains: [
      "self"
    ].concat(N)
  });
  const A = [].concat(C, p.contains), j = A.concat([
    // eat recursive parens in sub expressions
    {
      begin: /\(/,
      end: /\)/,
      keywords: i,
      contains: ["self"].concat(A)
    }
  ]), q = {
    className: "params",
    begin: /\(/,
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: i,
    contains: j
  }, W = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          r,
          /\s+/,
          /extends/,
          /\s+/,
          e.concat(r, "(", e.concat(/\./, r), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          r
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  }, $ = {
    relevance: 0,
    match: e.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...hl,
        ...dl
      ]
    }
  }, X = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, z = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          r,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [q],
    illegal: /%/
  }, J = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function B(S) {
    return e.concat("(?!", S.join("|"), ")");
  }
  const re = {
    match: e.concat(
      /\b/,
      B([
        ...gl,
        "super",
        "import"
      ]),
      r,
      e.lookahead(/\(/)
    ),
    className: "title.function",
    relevance: 0
  }, D = {
    begin: e.concat(/\./, e.lookahead(
      e.concat(r, /(?![0-9A-Za-z$_(])/)
    )),
    end: r,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, ne = {
    match: [
      /get|set/,
      /\s+/,
      r,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      q
    ]
  }, V = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + t.UNDERSCORE_IDENT_RE + ")\\s*=>", v = {
    match: [
      /const|var|let/,
      /\s+/,
      r,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      e.lookahead(V)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      q
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: i,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: j, CLASS_REFERENCE: $ },
    illegal: /#(?![$_A-z])/,
    contains: [
      t.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      X,
      t.APOS_STRING_MODE,
      t.QUOTE_STRING_MODE,
      d,
      k,
      b,
      I,
      C,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      f,
      $,
      {
        className: "attr",
        begin: r + e.lookahead(":"),
        relevance: 0
      },
      v,
      {
        // "value" container
        begin: "(" + t.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          C,
          t.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: V,
            returnBegin: !0,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: t.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: !0
                  },
                  {
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: i,
                    contains: j
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: s.begin, end: s.end },
              { match: o },
              {
                begin: c.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": c.isTrulyOpeningTag,
                end: c.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: c.begin,
                end: c.end,
                skip: !0,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      z,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + t.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: !0,
        label: "func.def",
        contains: [
          q,
          t.inherit(t.TITLE_MODE, { begin: r, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      D,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + r,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [q]
      },
      re,
      J,
      W,
      ne,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
const eG = /* @__PURE__ */ He({
  __name: "App",
  props: {},
  setup(t) {
    const { options: e } = Os(), n = Tt(() => e.mode === "fullscreen");
    return Dn(() => {
      sr.registerLanguage("xml", K9), sr.registerLanguage("javascript", Q9);
    }), (r, s) => n.value ? (oe(), Se(ge(pl), {
      key: 0,
      class: "n8n-chat"
    })) : (oe(), Se(ge(Z9), {
      key: 1,
      class: "n8n-chat"
    }));
  }
});
var Un, tG = new Uint8Array(16);
function nG() {
  if (!Un && (Un = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), !Un))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Un(tG);
}
const rG = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function sG(t) {
  return typeof t == "string" && rG.test(t);
}
var ve = [];
for (var Yr = 0; Yr < 256; ++Yr)
  ve.push((Yr + 256).toString(16).substr(1));
function oG(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = (ve[t[e + 0]] + ve[t[e + 1]] + ve[t[e + 2]] + ve[t[e + 3]] + "-" + ve[t[e + 4]] + ve[t[e + 5]] + "-" + ve[t[e + 6]] + ve[t[e + 7]] + "-" + ve[t[e + 8]] + ve[t[e + 9]] + "-" + ve[t[e + 10]] + ve[t[e + 11]] + ve[t[e + 12]] + ve[t[e + 13]] + ve[t[e + 14]] + ve[t[e + 15]]).toLowerCase();
  if (!sG(n))
    throw TypeError("Stringified UUID is invalid");
  return n;
}
function an(t, e, n) {
  t = t || {};
  var r = t.random || (t.rng || nG)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, e) {
    n = n || 0;
    for (var s = 0; s < 16; ++s)
      e[n + s] = r[s];
    return e;
  }
  return oG(r);
}
async function cG() {
  return "";
}
async function ml(...t) {
  var r;
  const e = await cG();
  return await (await fetch(t[0], {
    ...t[1],
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      ...e ? { authorization: `Bearer ${e}` } : {},
      ...(r = t[1]) == null ? void 0 : r.headers
    }
  })).json();
}
async function _l(t, e = {}, n = {}) {
  let r = t;
  return Object.keys(e).length > 0 && (r = `${r}?${new URLSearchParams(
    e
  ).toString()}`), ml(r, { ...n, method: "GET" });
}
async function bl(t, e = {}, n = {}) {
  return ml(t, {
    ...n,
    method: "POST",
    body: JSON.stringify(e)
  });
}
async function iG(t, e) {
  var r, s;
  return (((r = e.webhookConfig) == null ? void 0 : r.method) === "POST" ? bl : _l)(
    `${e.webhookUrl}`,
    {
      action: "loadPreviousSession",
      [e.chatSessionKey]: t,
      ...e.metadata ? { metadata: e.metadata } : {}
    },
    {
      headers: (s = e.webhookConfig) == null ? void 0 : s.headers
    }
  );
}
async function lG(t, e, n) {
  var s, o;
  return (((s = n.webhookConfig) == null ? void 0 : s.method) === "POST" ? bl : _l)(
    `${n.webhookUrl}`,
    {
      action: "sendMessage",
      [n.chatSessionKey]: e,
      [n.chatInputKey]: t,
      ...n.metadata ? { metadata: n.metadata } : {}
    },
    {
      headers: (o = n.webhookConfig) == null ? void 0 : o.headers
    }
  );
}
const aG = {
  install(t, e) {
    t.provide(qi, e);
    const n = Ut([]), r = Ut(null), s = Ut(!1), o = Tt(
      () => (e.initialMessages ?? []).map((u) => ({
        id: an(),
        text: u,
        sender: "bot",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }))
    );
    async function c(u) {
      const f = {
        id: an(),
        text: u,
        sender: "user",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      n.value.push(f), s.value = !0, Kt(() => {
        Rt.emit("scrollToBottom");
      });
      const p = await lG(
        u,
        r.value,
        e
      ), d = {
        id: an(),
        text: p.output,
        sender: "bot",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      n.value.push(d), s.value = !1, Kt(() => {
        Rt.emit("scrollToBottom");
      });
    }
    async function i() {
      if (!e.loadPreviousSession)
        return;
      const u = localStorage.getItem(Po) ?? an(), f = await iG(u, e), p = (/* @__PURE__ */ new Date()).toISOString();
      return n.value = ((f == null ? void 0 : f.data) || []).map((d, k) => ({
        id: `${k}`,
        text: d.kwargs.content,
        sender: d.id.includes("HumanMessage") ? "user" : "bot",
        createdAt: p
      })), n.value.length && (r.value = u), u;
    }
    async function l() {
      r.value = an(), localStorage.setItem(Po, r.value);
    }
    const a = {
      initialMessages: o,
      messages: n,
      currentSessionId: r,
      waitingForResponse: s,
      loadPreviousSession: i,
      startNewSession: l,
      sendMessage: c
    };
    t.provide(Ri, a), t.config.globalProperties.$chat = a;
  }
};
function uG(t) {
  var s, o;
  const e = {
    ...ln,
    ...t,
    webhookConfig: {
      ...ln.webhookConfig,
      ...t == null ? void 0 : t.webhookConfig
    },
    i18n: {
      ...ln.i18n,
      ...t == null ? void 0 : t.i18n,
      en: {
        ...(s = ln.i18n) == null ? void 0 : s.en,
        ...(o = t == null ? void 0 : t.i18n) == null ? void 0 : o.en
      }
    },
    theme: {
      ...ln.theme,
      ...t == null ? void 0 : t.theme
    }
  }, n = e.target ?? ff;
  typeof n == "string" && of(n);
  const r = Xu(eG);
  return r.use(aG, e), r.mount(n), r;
}
export {
  uG as createChat
};
