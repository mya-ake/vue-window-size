import { reactive as p, onUnmounted as w, computed as s } from "vue";
const o = typeof window < "u", v = () => o ? window.innerWidth : 0, _ = () => o ? window.innerHeight : 0, f = (t) => t ?? v(), l = (t) => t ?? _(), y = (t) => ({
  width: f(t == null ? void 0 : t.width),
  height: l(t == null ? void 0 : t.height)
}), g = (t) => {
  let e = 0;
  const i = t(), n = p(y()), d = ({ width: a, height: b }) => {
    n.width = a, n.height = b;
  };
  i.addObserver("composition-api", d);
  const c = () => {
    ++e;
  }, u = () => {
    e = Math.max(e - 1, 0);
  };
  return () => (e === 0 && i.subscribe().dispatch(), c(), w(() => {
    u(), e === 0 && i.unsubscribe();
  }), {
    width: s(() => n.width),
    height: s(() => n.height)
  });
};
var h = {};
Object.defineProperty(h, "__esModule", { value: !0 });
var m = function() {
  function t(e) {
    this._observers = /* @__PURE__ */ new Map(), this._subscribed = !1;
    var i = (e ?? {}).delay, n = i === void 0 ? 33 : i;
    this._delay = n, this._handler = this._handleResize.bind(this);
  }
  return t.prototype.addObserver = function(e, i) {
    return this._observers.set(e, i), i(this._getEvent()), this;
  }, t.prototype.deleteObserver = function(e) {
    return this._observers.delete(e), this;
  }, t.prototype.deleteObservers = function() {
    return this._observers.clear(), this;
  }, t.prototype.notifyObservers = function(e) {
    return this._observers.forEach(function(i) {
      i(e);
    }), this;
  }, t.prototype.subscribe = function() {
    return typeof window > "u" || this._subscribed || (window.addEventListener("resize", this._handler), window.addEventListener("orientationchange", this._handler), this._subscribed = !0), this;
  }, t.prototype.unsubscribe = function() {
    return this._subscribed ? (window.removeEventListener("resize", this._handler), window.removeEventListener("orientationchange", this._handler), this._subscribed = !1, this) : this;
  }, t.prototype.setDelay = function(e) {
    return this._delay = e, this;
  }, t.prototype.hasObserver = function() {
    return this._observers.size > 0;
  }, t.prototype.dispatch = function() {
    return this._dispatch(), this;
  }, t.prototype._getEvent = function() {
    return typeof window > "u" ? { width: 0, height: 0 } : { width: window.innerWidth, height: window.innerHeight };
  }, t.prototype._dispatch = function() {
    var e = this._getEvent();
    this.notifyObservers(e);
  }, t.prototype._handleResize = function() {
    var e = this;
    clearTimeout(this._timer), this._timer = setTimeout(function() {
      e._dispatch();
    }, this._delay);
  }, t;
}(), W = h.WindowResizeSubject = m;
let r;
const E = () => (r || (r = new W()), r), j = g(E);
export {
  j as useWindowSize
};
