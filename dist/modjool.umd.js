!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).modjool={})}(this,(function(e){"use strict";function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function n(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function r(e){for(var r=1;r<arguments.length;r++){var o=null!=arguments[r]?arguments[r]:{};r%2?n(Object(o),!0).forEach((function(n){t(e,n,o[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return n}(e,t)||a(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){if(e){if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function c(e){if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=a(e))){var t=0,n=function(){};return{s:n,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,o,i=!0,c=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return i=e.done,e},e:function(e){c=!0,o=e},f:function(){try{i||null==r.return||r.return()}finally{if(c)throw o}}}}var l={config:{tag:"no-name",attr:[],shadowDom:!1,modjoolId:!0,scopedCss:!0,unhide:!1,reactive:!0,enter:void 0,ready:void 0,js:void 0,complete:void 0,leave:void 0,html:()=>"",css:()=>""},warnings:[],classes:[],elements:[],addElement(e){this.elements.push(e)},removeElement(e){this.elements=this.elements.filter(t=>t!==e)},getElements(e){return e?this.elements.filter(t=>t.mj.tag===e):this.elements}};function s(e){"interactive"===document.readyState||"complete"===document.readyState?e():document.addEventListener("DOMContentLoaded",()=>{e()})}function u(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(t=1===t.length?t[0]:t,Array.isArray(t)){if(0===t.length)return m(e);var r,o=[],a=c(t);try{for(a.s();!(r=a.n()).done;){var i=r.value;o.push(d(e,i,n))}}catch(e){a.e(e)}finally{a.f()}return Promise.all(o).then(e=>!!e.every(e=>!1!==e)&&e)}return d(e,t,n)}function d(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r="string"==typeof t||t instanceof String;return e(t,!r).then(e=>{if(!0!==n)return e.class||!1;try{customElements.define(e.tag,e.class)}catch(e){console.error(e)}return!!customElements.get(e.tag)&&e.options})}function m(e){var t,n=document.querySelectorAll(":not(:defined)"),r=[],o=c(n);try{for(o.s();!(t=o.n()).done;){var a=t.value;if(!r.includes(a.tagName)){var i=a.tagName.toLowerCase()||a.nodeName.toLowerCase()||a.localName;r.push(i)}}}catch(e){o.e(e)}finally{o.f()}return new Promise(t=>{s(()=>{r.length?t(u(e,r,!0)):t(!1)})})}function f(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]&&arguments[3],a=e.mj,i=null,c=a.runningLifecycle;return c||(a.runningLifecycle=!0),a.new&&null!==a.new[n]&&void 0!==a.new[n]&&(i=a.new[n]()||void 0),null===i&&void 0!==t[n]&&(i=(o?t[n](r(r({},a.instance),o)):t[n](a.instance))||void 0),c||(a.runningLifecycle=!1),i}function v(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return function(t){var r;if("string"==typeof t||t instanceof String)r=t;else{r=t[0];for(var o=0;o<(arguments.length<=1?0:arguments.length-1);o++)r+=(o+1<1||arguments.length<=o+1?void 0:arguments[o+1])+t[o+1]}return n?e.mj.body.querySelectorAll(r):e.mj.body.querySelector(r)}}var j=h(),y=h(!0);function h(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t={},n={};return e?function(e){if(t[e])return t[e];if(e===e.toLowerCase())return e;var r=e.replace(/[A-Z]/g,"-$&").toLowerCase();return t[e]=r,n[r]=e,r}:function(e){if(n[e])return n[e];if(!e.includes("-"))return e;var r=e.split("-").map((e,t)=>t?e.charAt(0).toUpperCase()+e.slice(1).toLowerCase():e.toLowerCase()).join("");return n[e]=r,t[r]=e,r}}function g(e,t){if(e.isConnected){e.mj.settingAttributes=!0,e.mj.attributes={};for(var n=0;n<e.attributes.length;n++){var r=e.attributes[n].nodeName.toLowerCase();if(!r.toLowerCase().startsWith("mj-")){var a=e.attributes[n].nodeValue;""===a&&(a=!0),e.mj.attributes[j(r)]=a}}!function(e,t,n){for(var r=e.mj.instance.attr,a=0,i=Object.keys(r);a<i.length;a++){delete r[i[a]]}for(var c=0,l=Object.entries(n);c<l.length;c++){var s=o(l[c],2),u=s[0],d=s[1];r[u]=d}}(e,0,e.mj.attributes),e.mj.settingAttributes=!1}}function b(e,t){if(e.isConnected){var n=function(e,t){var n,r,o="mj-8Wi7fiDtPtAWMhLQop1Smg",a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=document.createDocumentFragment(),r=document.createElement("div");return r.innerHTML=e,r.id=t,n.appendChild(r),n}(e.mj.bodyContent,o).querySelectorAll("#".concat(o," > [slot]"));if(a.length>0){n={},r={};var i,l=c(a);try{for(l.s();!(i=l.n()).done;){var s=i.value,u=s.getAttribute("slot");r[u]=s.innerHTML,n[u]=t.shadowDom?'<slot name="'.concat(u,'"></slot>'):s.outerHTML}}catch(e){l.e(e)}finally{l.f()}}else{var d=e.mj.bodyContent.length?"<slot></slot>":"";r=e.mj.bodyContent,n=t.shadowDom?d:e.mj.bodyContent}return{slot:n,slotVal:r}}(e,t),r=n.slot,o=n.slotVal;e.mj.instance.slot=r,e.mj.instance.slotVal=o}}function p(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(e.isConnected&&(!e.mj.runningLifecycle||n)){var r=A(e,t),o=L(e,t),a=r+o;if(a!==e.mj.currentBody){var i=document.createDocumentFragment();w(i,r),C(i,o,e,t),S(e.mj.body),e.mj.body.appendChild(i),e.mj.currentBody=a}}}function w(e,t){if(t){var n=document.createElement("template");n.innerHTML=t,e.appendChild(n.content)}}function C(e,t,n,r){var o,a,i=r.scopedCss;if(t){var c=document.createElement("style");c.setAttribute("id","mj-style-".concat(n.mj.id)),c.textContent=i?(o=n.mj.instance.self.select,a=/(?!.*@media)[\t ]*([a-zA-Z#.:*[][^{/]*\s*){[\s\S]*?}/gm,t.replace(a,(e,t)=>{var n=t.trimStart().split(",");return e=e.trimStart(),function(e,t,n){for(var r in n){var o=/:self\(([^\s]*)\)/im,a=n[r].match(o);a?n[r]=n[r].replace(a[0],e(a[1])):n[r].includes(":self")?n[r]=n[r].replace(":self",e()):n[r]="".concat(e()," ").concat(n[r])}return n}(o,0,n).join(", ")+e.slice(t.length)})):t,e.appendChild(c)}}function A(e,t){var n=t.html;return e.mj.new.html?e.mj.new.html(r({},e.mj.instance)):n(r({},e.mj.instance))||e.mj.bodyContent}function L(e,t){var n=t.css;return e.mj.new.css?e.mj.new.css(r({},e.mj.instance)):n(r({},e.mj.instance))||e.mj.styleContent}function S(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function O(e,t,n){for(var r=0,a=Object.entries(n);r<a.length;r++){var i=o(a[r],2),c=i[0],l=i[1];e.mj.new[c]=l,p(e,t)}}var E={advanced:function(e,t,n){var r=n.attrName,o=n.oldVal,a=void 0===o?"":o,i=n.newVal,c=void 0===i?"":i,l=[e,t];if(!0===e.mj.loaded&&a!==c){var s="attr_"+j(r);g(...l),f(e,t,s,{oldVal:a,newVal:c}),e.mj.runningLifecycle||(p(...l),f(...l,"complete"))}},simple:function(){}};function V(e,t){var n=new MutationObserver(n=>{n.forEach(n=>{"attributes"===n.type&&e.mj.loaded&&(n.attributeName.startsWith("mj-")||E.advanced(e,t,{attrName:n.attributeName,oldVal:n.oldValue,newVal:e.getAttribute(n.attributeName)}))})});return n.observe(e,{attributes:!0,attributeOldValue:!0}),n}var M=["tag","shadowDom","reactive","modjoolId","unhide","scopedCss","enter","data","ready","js","complete","leave","html","css"];var P={advanced:function(e,t){var n=Math.random().toString(36).slice(-6);e.mj={tag:t.tag,id:n,attributes:{},observer:{},body:{},bodyContent:"",styleContent:"",currentBody:"",runningLifecycle:!1,settingAttributes:!1,loaded:!1,reactiveAttributes:t.attributes,instance:{attr:{},data:{},elem:{},find:v(e,t),findAll:v(e,t,!0),self:{id:n,tag:t.tag,options:t,select:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return t.shadowDom?":host(".concat(t.tag,'[mj-id="').concat(n,'"]').concat(e,")"):"".concat(t.tag,'[mj-id="').concat(n,'"]').concat(e)},element:{},update:()=>{p(e,t,!0),e.mj.runningLifecycle||f(e,t,"complete")},updateSlot:()=>b(e,t),updateAttr:()=>g(e),updateAll:()=>{!function(){g(...arguments),b(...arguments),p(...arguments)}(e,t,!0),e.mj.runningLifecycle||f(e,t,"complete")},remove:()=>e.mj.body.host?e.mj.body.host.remove():e.mj.body.remove(),css:n=>O(e,t,{css:n}),data:n=>O(e,t,{data:n}),enter:n=>O(e,t,{enter:n}),html:n=>O(e,t,{html:n}),js:n=>O(e,t,{js:n}),complete:n=>O(e,t,{complete:n}),leave:n=>O(e,t,{leave:n}),ready:n=>O(e,t,{ready:n}),attrHook:(n,r)=>{t.attr.length||e.mj.observer||(e.mj.observer=V(e,t)),O(e,t,{["attr_"+n]:r})},dataHook:(n,r)=>{O(e,t,{["data_"+n]:r})}},slot:{},slotVal:{}},new:{css:null,data:null,enter:null,html:null,js:null,leave:null,ready:null},options:t},t.reactive&&(e.mj.instance.attr=function(e,t){return new Proxy(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},{set(t,n,r){return e.mj.settingAttributes||e.setAttribute(y(n),r),Reflect.set(...arguments)}})}(e,t,{}),e.mj.instance.data=function(e,t){return new Proxy(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},{set(n,r,o){if(e.mj.dataInit)return Reflect.set(...arguments);var a,i=f(e,t,"data_"+r,{oldVal:n[r],newVal:o});return a=null!=i?Reflect.set(n,r,i):Reflect.set(...arguments),e.mj.runningLifecycle||(p(e,t),f(e,t,"complete")),a}})}(e,t,{}),!t.attr.length&&function(e){for(var t=0,n=Object.keys(e);t<n.length;t++){var r=n[t];if(!M.includes(r))return!0}return!1}(t)&&(e.mj.observer=V(e,t))),t.shadowDom?(e.attachShadow({mode:"open"}),e.mj.body=e.shadowRoot):e.mj.body=e,e.mj.instance.self.element=e.mj.body.host?e.mj.body.host:e.mj.body,e.mj.instance.elem=e.mj.instance.self.element,e.mj.constructorRun=!0,f(e,t,"enter")},simple:function(){}};var D={advanced:function(e,t){return void 0!==t.attr?t.attr.map(e=>{if(e=e.toLowerCase(),!M.includes(e))return e;console.error("[Modjool] ERROR: Keyword used as element attribute name [".concat(e,"]"))}):[]},simple:function(){}};var T={advanced:function(e,t){null!==f(e,t,"js",{adopted:!0})&&p(e,t),f(e,t,"complete")},simple:function(){}};var I={advanced:function(e,t){var n=[e,t];if(!e.mj.alreadyConnected){var r=function(){e.mj.bodyContent=e.innerHTML,function(e,t){t.modjoolId&&e.setAttribute("mj-id",e.mj.id)}(...n),g(...n),b(...n),function(e,t,n){if(null===n)return null;e.mj.dataInit=!0;for(var r=0,a=Object.entries(n);r<a.length;r++){var i=o(a[r],2),c=i[0],l=i[1];e.mj.instance.data[c]=l}e.mj.dataInit=!1}(...n,e.mj.new&&e.mj.new.data||f(e,t,"data")||{}),f(e,t,"ready"),p(...n),function(e,t){t.unhide&&e.removeAttribute("hidden")}(...n),e.mj.loaded=!0,f(e,t,"js"),function(e,t){e.mj.instance&&(e.mj.runningLifecycle=!0,n(),r(),e.mj.runningLifecycle=!1);function n(){for(var n in e.mj.attributes){var r="attr_"+n,o=e.mj.attributes[n];f(e,t,r,{newVal:o})}}function r(){for(var n in e.mj.dataInit=!0,e.mj.instance.data){var r="data_"+n,o=e.mj.instance.data[n],a=f(e,t,r,{newVal:o});null!=a&&(e.mj.instance.data[n]=a)}e.mj.dataInit=!1}}(e,t),p(e,t),f(e,t,"complete"),l.addElement(e),e.dispatchEvent(new Event("mj-defined"))};e.mj.alreadyConnected=!0,t.shadowDom?r():function e(t,n){if(t.mj.constructorRun)try{var r=t.closest(":not(:defined)");if(null===r)n();else{var o=()=>{e(t,n),r.removeEventListener("mj-defined",o)};r.addEventListener("mj-defined",o)}}catch(e){!l.warnings.includes(":defined")&&e.toString().includes(":defined")?(l.warnings.push(":defined"),console.warn("[Modjool] Browser does not support :defined CSS selector, possible custom element nesting bugs"),n()):console.error(e)}}(e,()=>r())}},simple:function(e,t){e.mj={},e.mj.tag=t.tag,l.addElement(e),e.dispatchEvent(new Event("mj-defined"))}};var N={advanced:function(e,t){f(e,t,"leave"),e.mj.body.innerHTML="",e.mj.observer&&e.mj.observer.disconnect&&e.mj.observer.disconnect(),l.removeElement(e)},simple:function(e,t){l.removeElement(e)}};function x(e,t){return t&&(e=r(r({},l.config),e)),new Promise((n,r)=>{s(()=>{n(function(e,t){var n=t?"advanced":"simple";class r extends HTMLElement{constructor(){var t=super(...arguments);return this.mj={},P[n](this,e),t}static get observedAttributes(){return D[n](this,e)}attributeChangedCallback(t,r,o){E[n](this,e,{attrName:t,oldVal:r,newVal:o})}connectedCallback(){I[n](this,e)}adoptedCallback(){T[n](this,e)}disconnectedCallback(){N[n](this,e),this.mj={}}}return{tag:t?e.tag:e,options:e,class:r}}(e,t))})})}var H={create:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return u(x,t,!0)},createClass:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return u(x,t,!1)},createUndefined:function(){return u(x,[],!0)},options:function(e){return l.config=r(r({},l.config),e),l.config},get:R,getAsync:function(e){return _().then(()=>R(e))},getUndefined:k,getUndefinedAsync:function(){return _().then(()=>k())},complete:function(e){_().then(()=>e())},wait:_};function R(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return l.getElements(e)}function k(){return document.querySelectorAll(":not(:defined)")}function _(){return new Promise((e,t)=>{"interactive"===document.readyState||"complete"===document.readyState?setTimeout(()=>{e()},0):document.addEventListener("DOMContentLoaded",()=>{setTimeout(()=>{e()},1)})})}var q={create:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return u(U,t)}};function U(e){class t extends HTMLElement{constructor(){return super(...arguments)}}return{tag:e,options:e,class:t}}e.modjool=H,e.modjoolLite=q,Object.defineProperty(e,"__esModule",{value:!0})}));//# sourceMappingURL=modjool.umd.js.map
