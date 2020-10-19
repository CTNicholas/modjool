var modjool=function(){"use strict";function e(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function t(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function n(n){for(var r=1;r<arguments.length;r++){var o=null!=arguments[r]?arguments[r]:{};r%2?t(Object(o),!0).forEach((function(t){e(n,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):t(Object(o)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(o,e))}))}return n}function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return n}(e,t)||o(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){if(e){if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e){if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=o(e))){var t=0,n=function(){};return{s:n,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a,i=!0,c=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return i=e.done,e},e:function(e){c=!0,a=e},f:function(){try{i||null==r.return||r.return()}finally{if(c)throw a}}}}var c={config:{tag:"no-name",attr:[],shadowDom:!1,modjoolId:!0,scopedCss:!0,unhide:!1,reactive:!0,enter:void 0,ready:void 0,js:void 0,complete:void 0,leave:void 0,html:()=>"",css:()=>""},warnings:[],classes:[],elements:[],addElement(e){this.elements.push(e)},removeElement(e){this.elements=this.elements.filter(t=>t!==e)},getElements(e){return e?this.elements.filter(t=>t.mj.tag===e):this.elements}};function l(e){if("interactive"===document.readyState||"complete"===document.readyState)return e();document.addEventListener("DOMContentLoaded",()=>e())}function s(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(t=1===t.length?t[0]:t,Array.isArray(t)){if(0===t.length)return l(()=>d(e))||!1;var n,r=[],o=i(t);try{for(o.s();!(n=o.n()).done;){var a=n.value;r.push(u(e,a))}}catch(e){o.e(e)}finally{o.f()}return!!r.every(e=>!0===e)&&t}return!!u(e,t)&&t.tag}function u(e,t){return e(t,!("string"==typeof t||t instanceof String))}function d(e){var t,n=[],r=i(document.querySelectorAll(":not(:defined)"));try{for(r.s();!(t=r.n()).done;){var o=t.value;n.includes(o.tagName)||(u(e,o.tagName.toLowerCase()||o.nodeName.toLowerCase()||o.localName),n.push(o.tagName))}}catch(e){r.e(e)}finally{r.f()}return n}function m(e,t,r){var o=e.mj,a=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=null,c=!1;return o.runningLifecycle?c=!0:o.runningLifecycle=!0,o.new&&null!==o.new[r]&&void 0!==o.new[r]&&(i=o.new[r]()||void 0),null===i&&void 0!==t[r]&&(i=(a?t[r](n(n({},o.instance),a)):t[r](o.instance))||void 0),c||(o.runningLifecycle=!1),i}function f(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return function(t){var r;if("string"==typeof t||t instanceof String)r=t;else{r=t[0];for(var o=0;o<(arguments.length<=1?0:arguments.length-1);o++)r+=(o+1<1||arguments.length<=o+1?void 0:arguments[o+1])+t[o+1]}return n?e.mj.body.querySelectorAll(r):e.mj.body.querySelector(r)}}var v=y(),j=y(!0);function y(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t={},n={};return e?function(e){if(t[e])return t[e];if(e===e.toLowerCase())return e;var r=e.replace(/[A-Z]/g,"-$&").toLowerCase();return t[e]=r,n[r]=e,r}:function(e){if(n[e])return n[e];if(!e.includes("-"))return e;var r=e.split("-").map((e,t)=>t?e.charAt(0).toUpperCase()+e.slice(1).toLowerCase():e.toLowerCase()).join("");return n[e]=r,t[r]=e,r}}function h(e,t){if(e.isConnected){e.mj.settingAttributes=!0,e.mj.attributes={};for(var n=0;n<e.attributes.length;n++){var o=e.attributes[n].nodeName.toLowerCase();if(!o.toLowerCase().startsWith("mj-")){var a=e.attributes[n].nodeValue;""===a&&(a=!0),e.mj.attributes[v(o)]=a}}!function(e,t,n){for(var o=e.mj.instance.attr,a=0,i=Object.keys(o);a<i.length;a++){delete o[i[a]]}for(var c=0,l=Object.entries(n);c<l.length;c++){var s=r(l[c],2),u=s[0],d=s[1];o[u]=d}}(e,0,e.mj.attributes),e.mj.settingAttributes=!1}}function b(e,t){if(e.isConnected){var n=function(e,t){var n,r,o="mj-8Wi7fiDtPtAWMhLQop1Smg",a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=document.createDocumentFragment(),r=document.createElement("div");return r.innerHTML=e,r.id=t,n.appendChild(r),n}(e.mj.bodyContent,o).querySelectorAll("#".concat(o," > [slot]"));if(a.length>0){n={},r={};var c,l=i(a);try{for(l.s();!(c=l.n()).done;){var s=c.value,u=s.getAttribute("slot");r[u]=s.innerHTML,n[u]=t.shadowDom?'<slot name="'.concat(u,'"></slot>'):s.outerHTML}}catch(e){l.e(e)}finally{l.f()}}else{var d=e.mj.bodyContent.length?"<slot></slot>":"";r=e.mj.bodyContent,n=t.shadowDom?d:e.mj.bodyContent}return{slot:n,slotVal:r}}(e,t),r=n.slot,o=n.slotVal;e.slotConnected=!0,e.mj.instance.slot=r,e.mj.instance.slotVal=o}}function g(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(e.isConnected&&(!e.mj.runningLifecycle||n)){var r=C(e,t),o=A(e,t),a=r+o;if(a!==e.mj.currentBody){var i=document.createDocumentFragment();p(i,r),w(i,o,e,t),L(e.mj.body),e.mj.body.appendChild(i),e.mj.currentBody=a}}}function p(e,t){if(t){var n=document.createElement("template");n.innerHTML=t,e.appendChild(n.content)}}function w(e,t,n,r){var o,a,i=r.scopedCss;if(t){var c=document.createElement("style");c.setAttribute("id","mj-style-".concat(n.mj.id)),c.textContent=i?(o=n.mj.instance.self.select,a=/(?!.*@media)[\t ]*([a-zA-Z#.:*[][^{/]*\s*){[\s\S]*?}/gm,t.replace(a,(e,t)=>{var n=t.trimStart().split(",");return e=e.trimStart(),function(e,t,n){for(var r in n){var o=/:self\(([^\s]*)\)/im,a=n[r].match(o);a?n[r]=n[r].replace(a[0],e(a[1])):n[r].includes(":self")?n[r]=n[r].replace(":self",e()):n[r]="".concat(e()," ").concat(n[r])}return n}(o,0,n).join(", ")+e.slice(t.length)})):t,e.appendChild(c)}}function C(e,t){var r=t.html;return e.mj.new.html?e.mj.new.html(n({},e.mj.instance)):r(n({},e.mj.instance))||e.mj.bodyContent}function A(e,t){var r=t.css;return e.mj.new.css?e.mj.new.css(n({},e.mj.instance)):r(n({},e.mj.instance))||e.mj.styleContent}function L(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function S(e,t,n){for(var o=0,a=Object.entries(n);o<a.length;o++){var i=r(a[o],2),c=i[0],l=i[1];e.mj.new[c]=l,g(e,t)}}var E={advanced:function(e,t,n){var r=n.attrName,o=n.oldVal,a=n.newVal,i=[e,t];if(e.mj.loaded&&o!==a){var c="attr_"+v(r);h(...i),m(...i,c,{oldVal:o,newVal:a}),e.mj.runningLifecycle||(g(...i),m(...i,"complete"))}},simple:function(){}};function O(e,t){var n=new MutationObserver(n=>{n.forEach(n=>{"attributes"===n.type&&e.mj.loaded&&E.advanced(e,t,{attrName:n.attributeName,oldVal:n.oldValue,newVal:e.getAttribute(n.attributeName)})})});return n.observe(e,{attributes:!0,attributeOldValue:!0}),n}function V(e,t){return{get:t=>e.mj.body.querySelector(t),when(e,t,n){var r=this.get(e);return r.addEventListener(t,n),D(r,t,n)},on:(t,n)=>(e.mj.body.addEventListener(t,n),D(e.mj.body,t,n)),array(e){var t="{{@#MJ[]£=+}}",n=e.replace("/,",t).split(",");for(var r in n)n[r]=n[r].replace(t,",");return n},for(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e=>e,n=Array.isArray(e)?e:this.array(e),r="";for(var o in n)r+=t(n[o],o);return r}}}function D(e,t,n){return{element:e,type:t,function:n,stop(){e.removeEventListener(t,n)}}}var M=["tag","shadowDom","reactive","modjoolId","unhide","scopedCss","enter","data","ready","js","complete","leave","html","css"];var P={advanced:function(e,t){var n=Math.random().toString(36).slice(-6);e.mj={},e.mj={tag:t.tag,id:n,attributes:{},observer:{},body:{},bodyContent:"",styleContent:"",currentBody:"",runningLifecycle:!1,settingAttributes:!1,loaded:!1,reactiveAttributes:t.attributes,instance:{attr:{},data:{},elem:{},find:f(e,t),findAll:f(e,t,!0),func:V(e),self:{id:n,tag:t.tag,options:t,select:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return t.shadowDom?":host(".concat(t.tag,'[mj-id="').concat(n,'"]').concat(e,")"):"".concat(t.tag,'[mj-id="').concat(n,'"]').concat(e)},element:{},update:()=>{g(e,t,!0),e.mj.runningLifecycle||m(e,t,"complete")},updateSlot:()=>b(e,t),updateAttr:()=>h(e),updateAll:()=>{!function(){h(...arguments),b(...arguments),g(...arguments)}(e,t,!0),e.mj.runningLifecycle||m(e,t,"complete")},remove:()=>e.mj.body.host?e.mj.body.host.remove():e.mj.body.remove(),css:n=>S(e,t,{css:n}),data:n=>S(e,t,{data:n}),enter:n=>S(e,t,{enter:n}),html:n=>S(e,t,{html:n}),js:n=>S(e,t,{js:n}),complete:n=>S(e,t,{complete:n}),leave:n=>S(e,t,{leave:n}),ready:n=>S(e,t,{ready:n}),attrHook:(n,r)=>{t.attr.length||e.mj.observer||(e.mj.observer=O(e,t)),S(e,t,{["attr_"+n]:r})},dataHook:(n,r)=>{S(e,t,{["data_"+n]:r})}},slot:{},slotVal:{}},new:{css:null,data:null,enter:null,html:null,js:null,leave:null,ready:null},options:t},t.modjoolId&&e.setAttribute("mj-id",e.mj.id),t.reactive&&(e.mj.instance.attr=function(e,t){return new Proxy(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},{set(t,n,r){return e.mj.settingAttributes||e.setAttribute(j(n),r),Reflect.set(...arguments)}})}(e,t,{}),e.mj.instance.data=function(e,t){return new Proxy(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},{set(n,r,o){if(e.mj.dataInit)return Reflect.set(...arguments);var a,i=m(e,t,"data_"+r,{oldVal:n[r],newVal:o});return a=i?Reflect.set(n,r,i):Reflect.set(...arguments),e.mj.runningLifecycle||(g(e,t),m(e,t,"complete")),a}})}(e,t,{}),!t.attr.length&&function(e){for(var t=0,n=Object.keys(e);t<n.length;t++){var r=n[t];if(!M.includes(r))return!0}return!1}(t)&&(e.mj.observer=O(e,t))),t.shadowDom?(e.attachShadow({mode:"open"}),e.mj.body=e.shadowRoot):e.mj.body=e,e.mj.instance.self.element=e.mj.body.host?e.mj.body.host:e.mj.body,e.mj.instance.elem=e.mj.instance.self.element,e.mj.constructorRun=!0,m(e,t,"enter")},simple:function(){}};var I={advanced:function(e,t){return void 0!==t.attr?t.attr.map(e=>{if(e=e.toLowerCase(),!M.includes(e))return e;console.error("[Modjool] ERROR: Keyword used as element attribute name [".concat(e,"]"))}):[]},simple:function(){}};var N={advanced:function(e,t){null!==m(e,t,"js",{adopted:!0})&&g(e,t),m(e,t,"complete")},simple:function(){}};var T={advanced:function(e,t){var n=[e,t];if(!e.mj.alreadyConnected){var o=function(){e.mj.bodyContent=e.innerHTML,h(...n),b(...n),function(e,t,n){if(null===n)return null;e.mj.dataInit=!0;for(var o=0,a=Object.entries(n);o<a.length;o++){var i=r(a[o],2),c=i[0],l=i[1];e.mj.instance.data[c]=l}e.mj.dataInit=!1}(...n,e.mj.new.data||m(e,t,"data")||{}),m(e,t,"ready"),g(...n),function(e,t){t.unhide&&e.removeAttribute("hidden")}(...n),e.mj.loaded=!0,null!==m(e,t,"js")&&g(e,t),m(e,t,"complete"),c.addElement(e),e.dispatchEvent(new Event("mj-defined"))};e.mj.alreadyConnected=!0,t.shadowDom?o():function e(t,n){if(t.mj.constructorRun)try{var r=t.closest(":not(:defined)");if(null===r)n();else{var o=()=>{e(t,n),r.removeEventListener("mj-defined",o)};r.addEventListener("mj-defined",o)}}catch(e){!c.warnings.includes(":defined")&&e.toString().includes(":defined")?(c.warnings.push(":defined"),console.warn("[Modjool] Browser does not support :defined CSS selector, possible custom element nesting bugs"),n()):console.error(e)}}(e,()=>o())}},simple:function(e,t){e.mj={},e.mj.tag=t.tag,c.addElement(e),e.dispatchEvent(new Event("mj-defined"))}};var R={advanced:function(e,t){m(e,t,"leave"),e.mj.body.innerHTML="",e.mj.observer&&e.mj.observer.disconnect&&e.mj.observer.disconnect(),e.mj={},c.removeElement(e)},simple:function(e,t){c.removeElement(e)}};function k(e,t){return t&&(e=n(n({},c.config),e)),l(()=>function(e,t){var n=t?"advanced":"simple";class r extends HTMLElement{constructor(){var t=super(...arguments);return P[n](this,e),t}static get observedAttributes(){return I[n](this,e)}attributeChangedCallback(t,r,o){E[n](this,e,{attrName:t,oldVal:r,newVal:o})}connectedCallback(){T[n](this,e)}adoptedCallback(){N[n](this,e)}disconnectedCallback(){R[n](this,e)}}try{return"advanced"===n?(customElements.define(e.tag,r),!!customElements.get(e.tag)):(customElements.define(e,r),!!customElements.get(e))}catch(e){console.error(e)}}(e,t))}function H(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return c.getElements(e)}function q(){return document.querySelectorAll(":not(:defined)")}function x(){return new Promise((e,t)=>{"interactive"===document.readyState||"complete"===document.readyState?setTimeout(()=>{e()},0):document.addEventListener("DOMContentLoaded",()=>{setTimeout(()=>{e()},1)})})}return{create:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return s(k,t)},createUndefined:function(){return s(k,[])},options:function(e){return c.config=n(n({},c.config),e),c.config},get:H,getAsync:function(e){return x().then(()=>H(e))},getUndefined:q,getUndefinedAsync:function(){return x().then(()=>q())},complete:function(e){x().then(()=>e())},wait:x}}();//# sourceMappingURL=modjool.js.map
