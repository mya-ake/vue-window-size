(function(r,n){typeof exports=="object"&&typeof module<"u"?n(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],n):(r=typeof globalThis<"u"?globalThis:r||self,n(r["vue-window-size"]={},r.Vue))})(this,function(r,n){"use strict";const d=typeof window<"u",u=()=>d?window.innerWidth:0,c=()=>d?window.innerHeight:0,a=e=>e??u(),p=e=>e??c(),b=e=>({width:a(e==null?void 0:e.width),height:p(e==null?void 0:e.height)}),f=e=>{let t=0;const i=e(),s=n.reactive(b()),l=({width:m,height:W})=>{s.width=m,s.height=W};i.addObserver("composition-api",l);const y=()=>{++t},g=()=>{t=Math.max(t-1,0)};return()=>(t===0&&i.subscribe().dispatch(),y(),n.onUnmounted(()=>{g(),t===0&&i.unsubscribe()}),{width:n.computed(()=>s.width),height:n.computed(()=>s.height)})};var h={};Object.defineProperty(h,"__esModule",{value:!0});var w=function(){function e(t){this._observers=new Map,this._subscribed=!1;var i=(t??{}).delay,s=i===void 0?33:i;this._delay=s,this._handler=this._handleResize.bind(this)}return e.prototype.addObserver=function(t,i){return this._observers.set(t,i),i(this._getEvent()),this},e.prototype.deleteObserver=function(t){return this._observers.delete(t),this},e.prototype.deleteObservers=function(){return this._observers.clear(),this},e.prototype.notifyObservers=function(t){return this._observers.forEach(function(i){i(t)}),this},e.prototype.subscribe=function(){return typeof window>"u"||this._subscribed||(window.addEventListener("resize",this._handler),window.addEventListener("orientationchange",this._handler),this._subscribed=!0),this},e.prototype.unsubscribe=function(){return this._subscribed?(window.removeEventListener("resize",this._handler),window.removeEventListener("orientationchange",this._handler),this._subscribed=!1,this):this},e.prototype.setDelay=function(t){return this._delay=t,this},e.prototype.hasObserver=function(){return this._observers.size>0},e.prototype.dispatch=function(){return this._dispatch(),this},e.prototype._getEvent=function(){return typeof window>"u"?{width:0,height:0}:{width:window.innerWidth,height:window.innerHeight}},e.prototype._dispatch=function(){var t=this._getEvent();this.notifyObservers(t)},e.prototype._handleResize=function(){var t=this;clearTimeout(this._timer),this._timer=setTimeout(function(){t._dispatch()},this._delay)},e}(),v=h.WindowResizeSubject=w;let o;const _=f(()=>(o||(o=new v),o));r.useWindowSize=_,Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})});
