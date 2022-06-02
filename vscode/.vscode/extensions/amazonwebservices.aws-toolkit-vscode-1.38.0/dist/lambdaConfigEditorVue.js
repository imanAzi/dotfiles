(()=>{var Y={18:(e,o,i)=>{"use strict";i.r(o),i.d(o,{default:()=>$});var r=i(537),d=i.n(r),m=i(645),V=i.n(m),N=i(667),I=i.n(N),P=new URL(i(558),i.b),O=new URL(i(798),i.b),M=V()(d()),D=I()(P),h=I()(O);M.push([e.id,`
.preload-transition[data-v-3e78b3d8] {
    transition: none !important;
}
.settings-title[data-v-3e78b3d8] {
    font-size: calc(1.1 * var(--vscode-font-size)); /* TODO: make this configurable */
    font-weight: bold;
    margin: 0 0 2px 0;
    padding: 0;
}
.sub-pane[data-v-3e78b3d8] {
    transition: max-height 0.5s, padding 0.5s;
    padding: 1rem;
    overflow: hidden;
}
[data-v-3e78b3d8] .sub-pane div:first-child {
    margin-top: 0;
}
.collapse-leave-from[data-v-3e78b3d8] {
    max-height: var(--max-height);
}
.collapse-leave-active[data-v-3e78b3d8] {
    transition: max-height 0.5s, visibility 0.5s, padding 0.5s;
    visibility: hidden;
    padding: 0 1rem;
    max-height: 0;
}
.collapse-enter-active[data-v-3e78b3d8] {
    transition: max-height 0.5s, padding 0.5s;
    max-height: 0;
    padding: 0 1rem;
}
.collapse-enter-to[data-v-3e78b3d8] {
    max-height: var(--max-height);
    padding: 1rem;
}
.collapse-button[data-v-3e78b3d8] {
    width: 24px;
    height: 24px;
    -webkit-appearance: none;
    display: inline;
    margin: -4px 12px 0 0;
    padding: 0;
    background: transparent;
    background-size: 24px;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.8;
    transition: transform 0.5s;
}
body.vscode-dark .collapse-button[data-v-3e78b3d8] {
    background-image: url(`+D+`);
}
body.vscode-light .collapse-button[data-v-3e78b3d8] {
    background-image: url(`+h+`);
}
.collapse-button[data-v-3e78b3d8] {
    transform: rotate(180deg);
}
.collapse-button[data-v-3e78b3d8]:checked {
    transform: rotate(90deg);
}
.settings-panel[data-v-3e78b3d8] {
    background: var(--vscode-menu-background);
    margin: 16px 0;
}
`,"",{version:3,sources:["webpack://./src/webviews/components/settingsPanel.vue"],names:[],mappings:";AA4FA;IACI,2BAA2B;AAC/B;AACA;IACI,8CAA8C,EAAE,iCAAiC;IACjF,iBAAiB;IACjB,iBAAiB;IACjB,UAAU;AACd;AACA;IACI,yCAAyC;IACzC,aAAa;IACb,gBAAgB;AACpB;AACA;IACI,aAAa;AACjB;AACA;IACI,6BAA6B;AACjC;AACA;IACI,0DAA0D;IAC1D,kBAAkB;IAClB,eAAe;IACf,aAAa;AACjB;AACA;IACI,yCAAyC;IACzC,aAAa;IACb,eAAe;AACnB;AACA;IACI,6BAA6B;IAC7B,aAAa;AACjB;AACA;IACI,WAAW;IACX,YAAY;IACZ,wBAAwB;IACxB,eAAe;IACf,qBAAqB;IACrB,UAAU;IACV,uBAAuB;IACvB,qBAAqB;IACrB,4BAA4B;IAC5B,2BAA2B;IAC3B,YAAY;IACZ,0BAA0B;AAC9B;AACA;IACI,yDAAwD;AAC5D;AACA;IACI,yDAAyD;AAC7D;AACA;IACI,yBAAyB;AAC7B;AACA;IACI,wBAAwB;AAC5B;AACA;IACI,yCAAyC;IACzC,cAAc;AAClB",sourcesContent:[`/*! * Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved. * SPDX-License-Identifier: Apache-2.0 */

<template>
    <div :id="id" class="settings-panel">
        <div class="header">
            <input
                ref="button"
                v-bind:id="buttonId"
                class="preload-transition collapse-button"
                type="checkbox"
                v-if="collapseable || startCollapsed"
                v-model="collapsed"
            />
            <label v-bind:for="buttonId">
                <p class="settings-title">{{ title }}</p>
                <p class="soft no-spacing">{{ description }}</p>
            </label>
        </div>
        <transition
            @enter="updateHeight"
            @beforeLeave="updateHeight"
            :name="collapseable || startCollapsed ? 'collapse' : ''"
        >
            <div ref="subPane" v-show="!collapsed" class="sub-pane">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { WebviewApi } from 'vscode-webview'
import { defineComponent } from 'vue'
import saveData from '../mixins/saveData'

declare const vscode: WebviewApi<{ [key: string]: VueModel }>

let count = 0

interface VueModel {
    collapsed: boolean
    buttonId: string
    lastHeight?: number
    subPane?: HTMLElement
}

/**
 * Settings panel is header + body, which may be collapseable
 */
export default defineComponent({
    name: 'settings-panel',
    props: {
        id: String,
        startCollapsed: Boolean,
        collapseable: Boolean,
        title: String,
        description: String,
    },
    data() {
        count += 1
        return {
            collapsed: this.$props.startCollapsed ?? false,
            buttonId: \`settings-panel-button-\${count}\`,
            lastHeight: undefined,
        } as VueModel
    },
    mixins: [saveData],
    methods: {
        updateHeight(el: Element & { style?: CSSStyleDeclaration }) {
            if (el.style) {
                this.lastHeight = el.scrollHeight
                el.style.setProperty('--max-height', \`\${this.lastHeight}px\`)
            }
        },
    },
    mounted() {
        this.subPane = this.$refs.subPane as HTMLElement | undefined
        this.lastHeight = this.collapsed ? this.lastHeight : this.subPane?.scrollHeight ?? this.lastHeight

        // TODO: write 'initial-style' as a directive
        // it will force a style until the first render
        // or just use Vue's transition element, but this is pretty heavy
        this.$nextTick(() => {
            setTimeout(() => {
                ;(this.$refs.button as HTMLElement | undefined)?.classList.remove('preload-transition')
            }, 100)
        })
    },
})
<\/script>

<style scoped>
.preload-transition {
    transition: none !important;
}
.settings-title {
    font-size: calc(1.1 * var(--vscode-font-size)); /* TODO: make this configurable */
    font-weight: bold;
    margin: 0 0 2px 0;
    padding: 0;
}
.sub-pane {
    transition: max-height 0.5s, padding 0.5s;
    padding: 1rem;
    overflow: hidden;
}
:deep(.sub-pane div:first-child) {
    margin-top: 0;
}
.collapse-leave-from {
    max-height: var(--max-height);
}
.collapse-leave-active {
    transition: max-height 0.5s, visibility 0.5s, padding 0.5s;
    visibility: hidden;
    padding: 0 1rem;
    max-height: 0;
}
.collapse-enter-active {
    transition: max-height 0.5s, padding 0.5s;
    max-height: 0;
    padding: 0 1rem;
}
.collapse-enter-to {
    max-height: var(--max-height);
    padding: 1rem;
}
.collapse-button {
    width: 24px;
    height: 24px;
    -webkit-appearance: none;
    display: inline;
    margin: -4px 12px 0 0;
    padding: 0;
    background: transparent;
    background-size: 24px;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.8;
    transition: transform 0.5s;
}
body.vscode-dark .collapse-button {
    background-image: url('/resources/dark/expand-less.svg');
}
body.vscode-light .collapse-button {
    background-image: url('/resources/light/expand-less.svg');
}
.collapse-button {
    transform: rotate(180deg);
}
.collapse-button:checked {
    transform: rotate(90deg);
}
.settings-panel {
    background: var(--vscode-menu-background);
    margin: 16px 0;
}
</style>
`],sourceRoot:""}]);const $=M},66:(e,o,i)=>{"use strict";i.r(o),i.d(o,{default:()=>I});var r=i(537),d=i.n(r),m=i(645),V=i.n(m),N=V()(d());N.push([e.id,`form[data-v-4c784f68] {
    padding: 15px;
}
.section-header[data-v-4c784f68] {
    margin: 0px;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
}
textarea[data-v-4c784f68] {
    max-width: 100%;
}
.config-item[data-v-4c784f68] {
    border-bottom: 1px solid var(--vscode-menubar-selectionBackground);
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding: 8px 0px;
}
.col2[data-v-4c784f68] {
    grid-column: 2;
}
.data-view[data-v-4c784f68] {
    display: none;
    border: dashed rgb(218, 31, 31) 1px;
    color: rgb(218, 31, 31);
}
#invoke-button-container[data-v-4c784f68] {
    padding: 15px 15px;
    position: sticky;
    bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    border: 1px solid var(--vscode-menu-separatorBackground);
    margin-top: 32px;
}
.required[data-v-4c784f68] {
    color: red;
}
#form-title[data-v-4c784f68] {
    font-size: large;
    font-weight: bold;
}
.form-buttons[data-v-4c784f68] {
    margin-left: 20px;
}
.margin-bottom-16[data-v-4c784f68] {
    margin-bottom: 16px;
}
#target-type-selector[data-v-4c784f68] {
    margin-bottom: 15px;
    margin-left: 8px;
}
`,"",{version:3,sources:["webpack://./src/lambda/configEditor/vue/samInvoke.css"],names:[],mappings:"AAAA;IACI,aAAa;AACjB;AACA;IACI,WAAW;IACX,mBAAmB;IACnB,aAAa;IACb,2BAA2B;AAC/B;AACA;IACI,eAAe;AACnB;AACA;IACI,kEAAkE;IAClE,aAAa;IACb,8BAA8B;IAC9B,gBAAgB;AACpB;AACA;IACI,cAAc;AAClB;AACA;IACI,aAAa;IACb,mCAAmC;IACnC,uBAAuB;AAC3B;AACA;IACI,kBAAkB;IAClB,gBAAgB;IAChB,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,yBAAyB;IACzB,wDAAwD;IACxD,gBAAgB;AACpB;AACA;IACI,UAAU;AACd;AACA;IACI,gBAAgB;IAChB,iBAAiB;AACrB;AACA;IACI,iBAAiB;AACrB;AACA;IACI,mBAAmB;AACvB;AACA;IACI,mBAAmB;IACnB,gBAAgB;AACpB",sourcesContent:[`form[data-v-4c784f68] {
    padding: 15px;
}
.section-header[data-v-4c784f68] {
    margin: 0px;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
}
textarea[data-v-4c784f68] {
    max-width: 100%;
}
.config-item[data-v-4c784f68] {
    border-bottom: 1px solid var(--vscode-menubar-selectionBackground);
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding: 8px 0px;
}
.col2[data-v-4c784f68] {
    grid-column: 2;
}
.data-view[data-v-4c784f68] {
    display: none;
    border: dashed rgb(218, 31, 31) 1px;
    color: rgb(218, 31, 31);
}
#invoke-button-container[data-v-4c784f68] {
    padding: 15px 15px;
    position: sticky;
    bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    border: 1px solid var(--vscode-menu-separatorBackground);
    margin-top: 32px;
}
.required[data-v-4c784f68] {
    color: red;
}
#form-title[data-v-4c784f68] {
    font-size: large;
    font-weight: bold;
}
.form-buttons[data-v-4c784f68] {
    margin-left: 20px;
}
.margin-bottom-16[data-v-4c784f68] {
    margin-bottom: 16px;
}
#target-type-selector[data-v-4c784f68] {
    margin-bottom: 15px;
    margin-left: 8px;
}
`],sourceRoot:""}]);const I=N},645:e=>{"use strict";e.exports=function(o){var i=[];return i.toString=function(){return this.map(function(d){var m="",V=typeof d[5]!="undefined";return d[4]&&(m+="@supports (".concat(d[4],") {")),d[2]&&(m+="@media ".concat(d[2]," {")),V&&(m+="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {")),m+=o(d),V&&(m+="}"),d[2]&&(m+="}"),d[4]&&(m+="}"),m}).join("")},i.i=function(d,m,V,N,I){typeof d=="string"&&(d=[[null,d,void 0]]);var P={};if(V)for(var O=0;O<this.length;O++){var M=this[O][0];M!=null&&(P[M]=!0)}for(var D=0;D<d.length;D++){var h=[].concat(d[D]);V&&P[h[0]]||(typeof I!="undefined"&&(typeof h[5]=="undefined"||(h[1]="@layer".concat(h[5].length>0?" ".concat(h[5]):""," {").concat(h[1],"}")),h[5]=I),m&&(h[2]&&(h[1]="@media ".concat(h[2]," {").concat(h[1],"}")),h[2]=m),N&&(h[4]?(h[1]="@supports (".concat(h[4],") {").concat(h[1],"}"),h[4]=N):h[4]="".concat(N)),i.push(h))}},i}},667:e=>{"use strict";e.exports=function(o,i){return i||(i={}),o&&(o=String(o.__esModule?o.default:o),/^['"].*['"]$/.test(o)&&(o=o.slice(1,-1)),i.hash&&(o+=i.hash),/["'() \t\n]|(%20)/.test(o)||i.needQuotes?'"'.concat(o.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):o)}},537:e=>{"use strict";e.exports=function(o){var i=o[1],r=o[3];if(!r)return i;if(typeof btoa=="function"){var d=btoa(unescape(encodeURIComponent(JSON.stringify(r)))),m="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(d),V="/*# ".concat(m," */"),N=r.sources.map(function(I){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(I," */")});return[i].concat(N).concat([V]).join(`
`)}return[i].join(`
`)}},744:(e,o)=>{"use strict";var i;i={value:!0},o.Z=(r,d)=>{for(const[m,V]of d)r[m]=V;return r}},138:(e,o,i)=>{var r=i(18);r.__esModule&&(r=r.default),typeof r=="string"&&(r=[[e.id,r,""]]),r.locals&&(e.exports=r.locals);var d=i(346).Z,m=d("6386bd73",r,!1,{})},408:(e,o,i)=>{var r=i(66);r.__esModule&&(r=r.default),typeof r=="string"&&(r=[[e.id,r,""]]),r.locals&&(e.exports=r.locals);var d=i(346).Z,m=d("0fa82932",r,!1,{})},346:(e,o,i)=>{"use strict";i.d(o,{Z:()=>$});function r(s,g){for(var p=[],c={},l=0;l<g.length;l++){var w=g[l],C=w[0],U=w[1],T=w[2],J=w[3],S={id:s+":"+l,css:U,media:T,sourceMap:J};c[C]?c[C].parts.push(S):p.push(c[C]={id:C,parts:[S]})}return p}var d=typeof document!="undefined";if(typeof DEBUG!="undefined"&&DEBUG&&!d)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var m={},V=d&&(document.head||document.getElementsByTagName("head")[0]),N=null,I=0,P=!1,O=function(){},M=null,D="data-vue-ssr-id",h=typeof navigator!="undefined"&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function $(s,g,p,c){P=p,M=c||{};var l=r(s,g);return j(l),function(C){for(var U=[],T=0;T<l.length;T++){var J=l[T],S=m[J.id];S.refs--,U.push(S)}C?(l=r(s,C),j(l)):l=[];for(var T=0;T<U.length;T++){var S=U[T];if(S.refs===0){for(var H=0;H<S.parts.length;H++)S.parts[H]();delete m[S.id]}}}}function j(s){for(var g=0;g<s.length;g++){var p=s[g],c=m[p.id];if(c){c.refs++;for(var l=0;l<c.parts.length;l++)c.parts[l](p.parts[l]);for(;l<p.parts.length;l++)c.parts.push(W(p.parts[l]));c.parts.length>p.parts.length&&(c.parts.length=p.parts.length)}else{for(var w=[],l=0;l<p.parts.length;l++)w.push(W(p.parts[l]));m[p.id]={id:p.id,refs:1,parts:w}}}}function x(){var s=document.createElement("style");return s.type="text/css",V.appendChild(s),s}function W(s){var g,p,c=document.querySelector("style["+D+'~="'+s.id+'"]');if(c){if(P)return O;c.parentNode.removeChild(c)}if(h){var l=I++;c=N||(N=x()),g=F.bind(null,c,l,!1),p=F.bind(null,c,l,!0)}else c=x(),g=G.bind(null,c),p=function(){c.parentNode.removeChild(c)};return g(s),function(C){if(C){if(C.css===s.css&&C.media===s.media&&C.sourceMap===s.sourceMap)return;g(s=C)}else p()}}var X=function(){var s=[];return function(g,p){return s[g]=p,s.filter(Boolean).join(`
`)}}();function F(s,g,p,c){var l=p?"":c.css;if(s.styleSheet)s.styleSheet.cssText=X(g,l);else{var w=document.createTextNode(l),C=s.childNodes;C[g]&&s.removeChild(C[g]),C.length?s.insertBefore(w,C[g]):s.appendChild(w)}}function G(s,g){var p=g.css,c=g.media,l=g.sourceMap;if(c&&s.setAttribute("media",c),M.ssrId&&s.setAttribute(D,g.id),l&&(p+=`
/*# sourceURL=`+l.sources[0]+" */",p+=`
/*# sourceMappingURL=data:application/json;base64,`+btoa(unescape(encodeURIComponent(JSON.stringify(l))))+" */"),s.styleSheet)s.styleSheet.cssText=p;else{for(;s.firstChild;)s.removeChild(s.firstChild);s.appendChild(document.createTextNode(p))}}},558:(e,o,i)=>{"use strict";e.exports=i.p+"cc7dacc55d3a9f3f983f.svg"},798:(e,o,i)=>{"use strict";e.exports=i.p+"44d827b5740d008688e0.svg"}},q={};function y(e){var o=q[e];if(o!==void 0)return o.exports;var i=q[e]={id:e,exports:{}};return Y[e](i,i.exports,y),i.exports}y.m=Y,y.n=e=>{var o=e&&e.__esModule?()=>e.default:()=>e;return y.d(o,{a:o}),o},y.d=(e,o)=>{for(var i in o)y.o(o,i)&&!y.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:o[i]})},y.g=function(){if(typeof globalThis=="object")return globalThis;try{return this||new Function("return this")()}catch(e){if(typeof window=="object")return window}}(),y.o=(e,o)=>Object.prototype.hasOwnProperty.call(e,o),y.r=e=>{typeof Symbol!="undefined"&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;y.g.importScripts&&(e=y.g.location+"");var o=y.g.document;if(!e&&o&&(o.currentScript&&(e=o.currentScript.src),!e)){var i=o.getElementsByTagName("script");i.length&&(e=i[i.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),y.p=e})(),(()=>{y.b=document.baseURI||self.location.href;var e={597:0}})();var Q={};(()=>{"use strict";y.r(Q);const e=Vue,o=t=>((0,e.pushScopeId)("data-v-4c784f68"),t=t(),(0,e.popScopeId)(),t),i={class:"invoke-lambda-form"},r=o(()=>(0,e.createElementVNode)("h1",null,"Edit SAM Debug Configuration",-1)),d=(0,e.createTextVNode)(" Using this form you can create, edit, and run launch configs of "),m=o(()=>(0,e.createElementVNode)("code",null,"type:aws-sam",-1)),V=(0,e.createTextVNode)(". When you "),N=o(()=>(0,e.createElementVNode)("strong",null,"Invoke",-1)),I=o(()=>(0,e.createElementVNode)("label",{for:"target-type-selector"},"Invoke Target Type",-1)),P=["value"],O={class:"data-view"},M={key:0,class:"target-code"},D={class:"config-item"},h=o(()=>(0,e.createElementVNode)("label",{for:"select-directory"},"Project Root",-1)),$={class:"data-view"},j={class:"config-item"},x=o(()=>(0,e.createElementVNode)("label",{for:"lambda-handler"},"Lambda Handler",-1)),W={class:"data-view"},X={class:"config-item"},F=o(()=>(0,e.createElementVNode)("label",{for:"runtime-selector"},"Runtime",-1)),G=o(()=>(0,e.createElementVNode)("option",{disabled:""},"Choose a runtime...",-1)),s=["value"],g={class:"data-view"},p={key:1,class:"target-template"},c=o(()=>(0,e.createElementVNode)("br",null,null,-1)),l={class:"config-item"},w=o(()=>(0,e.createElementVNode)("label",{for:"template-path"},"Template Path",-1)),C={class:"data-view"},U={class:"config-item"},T=o(()=>(0,e.createElementVNode)("label",{for:"logicalID"},"Resource (Logical Id)",-1)),J={class:"data-view"},S={class:"config-item"},H=o(()=>(0,e.createElementVNode)("label",{for:"runtime-selector"},"Runtime",-1)),de=o(()=>(0,e.createElementVNode)("option",{disabled:""},"Choose a runtime...",-1)),ce=["value"],pe={class:"data-view"},ue={key:2,class:"target-apigw"},me=o(()=>(0,e.createElementVNode)("br",null,null,-1)),ve={class:"config-item"},he=o(()=>(0,e.createElementVNode)("label",{for:"template-path"},"Template Path",-1)),ge={class:"data-view"},fe={class:"config-item"},_e=o(()=>(0,e.createElementVNode)("label",{for:"logicalID"},"Resource (Logical Id)",-1)),Ae={class:"config-item"},be=o(()=>(0,e.createElementVNode)("label",{for:"runtime-selector"},"Runtime",-1)),Ce=o(()=>(0,e.createElementVNode)("option",{disabled:""},"Choose a runtime...",-1)),ye=["value"],Ee={class:"data-view"},Ve={class:"config-item"},Ne=o(()=>(0,e.createElementVNode)("label",{for:"path"},"Path",-1)),Be={class:"config-item"},ke=o(()=>(0,e.createElementVNode)("label",{for:"http-method-selector"},"HTTP Method",-1)),Ie=o(()=>(0,e.createElementVNode)("option",{disabled:""},"Choose an HTTP Method",-1)),we=["value"],Se={class:"data-view"},Te={class:"config-item"},Me=o(()=>(0,e.createElementVNode)("label",{for:"query-string"},"Query String",-1)),De={class:"config-item"},Pe=o(()=>(0,e.createElementVNode)("label",{for:"headers"},"Headers",-1)),Oe=["data-invalid"],Le={key:0,class:"input-validation col2"},Ue={key:3},Re=o(()=>(0,e.createElementVNode)("h3",null,"aws",-1)),$e={class:"config-item"},Je=o(()=>(0,e.createElementVNode)("label",{for:"awsConnection"},"Credentials:",-1)),He={class:"config-item"},je=o(()=>(0,e.createElementVNode)("label",{for:"region"},"Region",-1)),xe=o(()=>(0,e.createElementVNode)("h3",null,"lambda",-1)),We={class:"config-item"},Fe=o(()=>(0,e.createElementVNode)("label",{for:""},"Environment Variables",-1)),ze=["data-invalid"],Ke={key:0,class:"input-validation col2"},Ze={class:"config-item"},Xe=o(()=>(0,e.createElementVNode)("label",{for:"memory"},"Memory (MB)",-1)),Ge={class:"config-item"},Ye=o(()=>(0,e.createElementVNode)("label",{for:"timeoutSec"},"Timeout (s)",-1)),qe=o(()=>(0,e.createElementVNode)("h3",null,"sam",-1)),Qe={class:"config-item"},et=o(()=>(0,e.createElementVNode)("label",{for:"buildArguments"},"Build Arguments",-1)),tt={class:"config-item"},nt=o(()=>(0,e.createElementVNode)("label",{for:"containerBuild"},"Container Build",-1)),at={class:"config-item"},ot=o(()=>(0,e.createElementVNode)("label",{for:"dockerNetwork"},"Docker Network",-1)),it={class:"config-item"},st=o(()=>(0,e.createElementVNode)("label",{for:"localArguments"},"Local Arguments",-1)),rt={class:"config-item"},lt=o(()=>(0,e.createElementVNode)("label",{for:"skipNewImageCheck"},"Skip New Image Check",-1)),dt={class:"config-item"},ct=o(()=>(0,e.createElementVNode)("label",{for:"templateParameters"},"Template - Parameters",-1)),pt=["data-invalid"],ut={key:0,class:"input-validation col2"},mt=o(()=>(0,e.createElementVNode)("h3",null,"api",-1)),vt={class:"config-item"},ht=o(()=>(0,e.createElementVNode)("label",{for:"querystring"},"Query String",-1)),gt={class:"config-item"},ft=o(()=>(0,e.createElementVNode)("label",{for:"stageVariables"},"Stage Variables",-1)),_t=["data-invalid"],At={key:0,class:"input-validation col2"},bt={class:"config-item"},Ct=o(()=>(0,e.createElementVNode)("label",{for:"clientCerificateId"},"Client Certificate ID",-1)),yt={class:"config-item"},Et=o(()=>(0,e.createElementVNode)("label",{for:"apiPayload"},"API Payload",-1)),Vt=["data-invalid"],Nt={key:0,class:"input-validation col2"},Bt=o(()=>(0,e.createElementVNode)("br",null,null,-1)),kt={class:"data-view"},It={key:0,class:"input-validation"},wt={class:"container",id:"invoke-button-container"};function St(t,n,u,f,b,A){const _=(0,e.resolveComponent)("settings-panel");return(0,e.openBlock)(),(0,e.createElementBlock)("form",i,[r,(0,e.createElementVNode)("p",null,[(0,e.createElementVNode)("em",null,[d,m,V,N,(0,e.createTextVNode)(" the launch config, "+(0,e.toDisplayString)(t.company)+" Toolkit calls SAM CLI and attaches the debugger to the code runing in a local Docker container. ",1)])]),(0,e.createVNode)(_,{id:"config-panel",title:"Configuration",description:""},{default:(0,e.withCtx)(()=>[I,(0,e.withDirectives)((0,e.createElementVNode)("select",{name:"target-types",id:"target-type-selector","onUpdate:modelValue":n[0]||(n[0]=a=>t.launchConfig.invokeTarget.target=a)},[((0,e.openBlock)(!0),(0,e.createElementBlock)(e.Fragment,null,(0,e.renderList)(t.targetTypes,(a,v)=>((0,e.openBlock)(),(0,e.createElementBlock)("option",{value:a.value,key:v},(0,e.toDisplayString)(a.name),9,P))),128))],512),[[e.vModelSelect,t.launchConfig.invokeTarget.target]]),(0,e.createElementVNode)("span",O,(0,e.toDisplayString)(t.launchConfig.invokeTarget.target),1),t.launchConfig.invokeTarget.target==="code"?((0,e.openBlock)(),(0,e.createElementBlock)("div",M,[(0,e.createElementVNode)("div",D,[h,(0,e.withDirectives)((0,e.createElementVNode)("input",{id:"select-directory",type:"text","onUpdate:modelValue":n[1]||(n[1]=a=>t.launchConfig.invokeTarget.projectRoot=a),placeholder:"Enter a directory"},null,512),[[e.vModelText,t.launchConfig.invokeTarget.projectRoot]]),(0,e.createElementVNode)("span",$,"the selected directory: "+(0,e.toDisplayString)(t.launchConfig.invokeTarget.projectRoot),1)]),(0,e.createElementVNode)("div",j,[x,(0,e.withDirectives)((0,e.createElementVNode)("input",{type:"text",placeholder:"Enter the lambda handler",name:"lambda-handler",id:"lambda-handler","onUpdate:modelValue":n[2]||(n[2]=a=>t.launchConfig.invokeTarget.lambdaHandler=a)},null,512),[[e.vModelText,t.launchConfig.invokeTarget.lambdaHandler]]),(0,e.createElementVNode)("span",W,"lamda handler :"+(0,e.toDisplayString)(t.launchConfig.invokeTarget.lambdaHandler),1)]),(0,e.createElementVNode)("div",X,[F,(0,e.withDirectives)((0,e.createElementVNode)("select",{name:"runtimeType","onUpdate:modelValue":n[3]||(n[3]=a=>t.launchConfig.lambda.runtime=a)},[G,((0,e.openBlock)(!0),(0,e.createElementBlock)(e.Fragment,null,(0,e.renderList)(t.runtimes,(a,v)=>((0,e.openBlock)(),(0,e.createElementBlock)("option",{value:a,key:v},(0,e.toDisplayString)(a),9,s))),128))],512),[[e.vModelSelect,t.launchConfig.lambda.runtime]]),(0,e.createElementVNode)("span",g,"runtime in data: "+(0,e.toDisplayString)(t.launchConfig.lambda.runtime),1)])])):t.launchConfig.invokeTarget.target==="template"?((0,e.openBlock)(),(0,e.createElementBlock)("div",p,[(0,e.createElementVNode)("button",{class:"margin-bottom-16",onClick:n[4]||(n[4]=(0,e.withModifiers)((...a)=>t.loadResource&&t.loadResource(...a),["prevent"]))},"Load Resource"),c,(0,e.createElementVNode)("div",l,[w,(0,e.withDirectives)((0,e.createElementVNode)("input",{id:"template-path-button",type:"text","onUpdate:modelValue":n[5]||(n[5]=a=>t.launchConfig.invokeTarget.templatePath=a),placeholder:"Enter the template path..."},null,512),[[e.vModelText,t.launchConfig.invokeTarget.templatePath]]),(0,e.createElementVNode)("span",C,"Template path from data: "+(0,e.toDisplayString)(t.launchConfig.invokeTarget.templatePath),1)]),(0,e.createElementVNode)("div",U,[T,(0,e.withDirectives)((0,e.createElementVNode)("input",{name:"template-logical-id",id:"template-logical-id",type:"text",placeholder:"Enter a resource","onUpdate:modelValue":n[6]||(n[6]=a=>t.launchConfig.invokeTarget.logicalId=a)},null,512),[[e.vModelText,t.launchConfig.invokeTarget.logicalId]]),(0,e.createElementVNode)("span",J," Logical Id from data: "+(0,e.toDisplayString)(t.launchConfig.invokeTarget.logicalId),1)]),(0,e.createElementVNode)("div",S,[H,(0,e.withDirectives)((0,e.createElementVNode)("select",{name:"runtimeType","onUpdate:modelValue":n[7]||(n[7]=a=>t.launchConfig.lambda.runtime=a)},[de,((0,e.openBlock)(!0),(0,e.createElementBlock)(e.Fragment,null,(0,e.renderList)(t.runtimes,(a,v)=>((0,e.openBlock)(),(0,e.createElementBlock)("option",{value:a,key:v},(0,e.toDisplayString)(a),9,ce))),128))],512),[[e.vModelSelect,t.launchConfig.lambda.runtime]]),(0,e.createElementVNode)("span",pe,"runtime in data: "+(0,e.toDisplayString)(t.launchConfig.lambda.runtime),1)])])):t.launchConfig.invokeTarget.target==="api"?((0,e.openBlock)(),(0,e.createElementBlock)("div",ue,[(0,e.createElementVNode)("button",{onClick:n[8]||(n[8]=(0,e.withModifiers)((...a)=>t.loadResource&&t.loadResource(...a),["prevent"]))},"Load Resource"),me,(0,e.createElementVNode)("div",ve,[he,(0,e.withDirectives)((0,e.createElementVNode)("input",{id:"template-path-button",type:"text","onUpdate:modelValue":n[9]||(n[9]=a=>t.launchConfig.invokeTarget.templatePath=a),placeholder:"Enter the template path..."},null,512),[[e.vModelText,t.launchConfig.invokeTarget.templatePath]]),(0,e.createElementVNode)("span",ge,"Template path from data: "+(0,e.toDisplayString)(t.launchConfig.invokeTarget.templatePath),1)]),(0,e.createElementVNode)("div",fe,[_e,(0,e.withDirectives)((0,e.createElementVNode)("input",{name:"template-logical-id",id:"template-logical-id",type:"text",placeholder:"Enter a resource","onUpdate:modelValue":n[10]||(n[10]=a=>t.launchConfig.invokeTarget.logicalId=a)},null,512),[[e.vModelText,t.launchConfig.invokeTarget.logicalId]])]),(0,e.createElementVNode)("div",Ae,[be,(0,e.withDirectives)((0,e.createElementVNode)("select",{name:"runtimeType","onUpdate:modelValue":n[11]||(n[11]=a=>t.launchConfig.lambda.runtime=a)},[Ce,((0,e.openBlock)(!0),(0,e.createElementBlock)(e.Fragment,null,(0,e.renderList)(t.runtimes,(a,v)=>((0,e.openBlock)(),(0,e.createElementBlock)("option",{value:a,key:v},(0,e.toDisplayString)(a),9,ye))),128))],512),[[e.vModelSelect,t.launchConfig.lambda.runtime]]),(0,e.createElementVNode)("span",Ee,"runtime in data: "+(0,e.toDisplayString)(t.launchConfig.lambda.runtime),1)]),(0,e.createElementVNode)("div",Ve,[Ne,(0,e.withDirectives)((0,e.createElementVNode)("input",{type:"text","onUpdate:modelValue":n[12]||(n[12]=a=>t.launchConfig.api.path=a)},null,512),[[e.vModelText,t.launchConfig.api.path]])]),(0,e.createElementVNode)("div",Be,[ke,(0,e.withDirectives)((0,e.createElementVNode)("select",{name:"http-method","onUpdate:modelValue":n[13]||(n[13]=a=>t.launchConfig.api.httpMethod=a)},[Ie,((0,e.openBlock)(!0),(0,e.createElementBlock)(e.Fragment,null,(0,e.renderList)(t.httpMethods,(a,v)=>((0,e.openBlock)(),(0,e.createElementBlock)("option",{value:a.toLowerCase(),key:v},(0,e.toDisplayString)(a),9,we))),128))],512),[[e.vModelSelect,t.launchConfig.api.httpMethod]]),(0,e.createElementVNode)("span",Se,(0,e.toDisplayString)(t.launchConfig.api.httpMethod),1)]),(0,e.createElementVNode)("div",Te,[Me,(0,e.withDirectives)((0,e.createElementVNode)("input",{name:"query-string",id:"query-string",type:"text",cols:"15",rows:"2",placeholder:"Enter a query","onUpdate:modelValue":n[14]||(n[14]=a=>t.launchConfig.api.querystring=a)},null,512),[[e.vModelText,t.launchConfig.api.querystring]])]),(0,e.createElementVNode)("div",De,[Pe,(0,e.withDirectives)((0,e.createElementVNode)("input",{type:"text","onUpdate:modelValue":n[15]||(n[15]=a=>t.headers.value=a),placeholder:"Enter as valid JSON","data-invalid":!!t.headers.errorMsg},null,8,Oe),[[e.vModelText,t.headers.value]]),t.headers.errorMsg?((0,e.openBlock)(),(0,e.createElementBlock)("div",Le," Error parsing JSON: "+(0,e.toDisplayString)(t.headers.errorMsg),1)):(0,e.createCommentVNode)("v-if",!0)])])):((0,e.openBlock)(),(0,e.createElementBlock)("div",Ue,"Select an Invoke Target"))]),_:1}),(0,e.createVNode)(_,{id:"more-fields-panel",title:"Additional Fields",description:"","start-collapsed":""},{default:(0,e.withCtx)(()=>[Re,(0,e.createElementVNode)("div",$e,[Je,(0,e.withDirectives)((0,e.createElementVNode)("input",{type:"text","onUpdate:modelValue":n[16]||(n[16]=a=>t.launchConfig.aws.credentials=a)},null,512),[[e.vModelText,t.launchConfig.aws.credentials]])]),(0,e.createElementVNode)("div",He,[je,(0,e.withDirectives)((0,e.createElementVNode)("input",{type:"text","onUpdate:modelValue":n[17]||(n[17]=a=>t.launchConfig.aws.region=a)},null,512),[[e.vModelText,t.launchConfig.aws.region]])]),xe,(0,e.createElementVNode)("div",We,[Fe,(0,e.withDirectives)((0,e.createElementVNode)("input",{type:"text",placeholder:"Enter as valid JSON","onUpdate:modelValue":n[18]||(n[18]=a=>t.environmentVariables.value=a),"data-invalid":!!t.environmentVariables.errorMsg},null,8,ze),[[e.vModelText,t.environmentVariables.value]]),t.environmentVariables.errorMsg?((0,e.openBlock)(),(0,e.createElementBlock)("div",Ke," Error parsing JSON: "+(0,e.toDisplayString)(t.environmentVariables.errorMsg),1)):(0,e.createCommentVNode)("v-if",!0)]),(0,e.createElementVNode)("div",Ze,[Xe,(0,e.withDirectives)((0,e.createElementVNode)("input",{type:"number","onUpdate:modelValue":n[19]||(n[19]=a=>t.launchConfig.lambda.memoryMb=a)},null,512),[[e.vModelText,t.launchConfig.lambda.memoryMb,void 0,{number:!0}]])]),(0,e.createElementVNode)("div",Ge,[Ye,(0,e.withDirectives)((0,e.createElementVNode)("input",{type:"number","onUpdate:modelValue":n[20]||(n[20]=a=>t.launchConfig.lambda.timeoutSec=a)},null,512),[[e.vModelText,t.launchConfig.lambda.timeoutSec,void 0,{number:!0}]])]),(0,e.createCommentVNode)(` <div class="config-item">
                <label for="pathMappings">Path Mappings</label>
                <input type="text" v-model="launchConfig.lambda.pathMappings" >
            </div> `),qe,(0,e.createElementVNode)("div",Qe,[et,(0,e.withDirectives)((0,e.createElementVNode)("input",{type:"text","onUpdate:modelValue":n[21]||(n[21]=a=>t.launchConfig.sam.buildArguments=a),placeholder:"Enter as a comma separated list"},null,512),[[e.vModelText,t.launchConfig.sam.buildArguments]])]),(0,e.createElementVNode)("div",tt,[nt,(0,e.withDirectives)((0,e.createElementVNode)("input",{type:"checkbox",name:"containerBuild",id:"containerBuild","onUpdate:modelValue":n[22]||(n[22]=a=>t.containerBuild=a)},null,512),[[e.vModelCheckbox,t.containerBuild]])]),(0,e.createElementVNode)("div",at,[ot,(0,e.withDirectives)((0,e.createElementVNode)("input",{type:"text","onUpdate:modelValue":n[23]||(n[23]=a=>t.launchConfig.sam.dockerNetwork=a)},null,512),[[e.vModelText,t.launchConfig.sam.dockerNetwork]])]),(0,e.createElementVNode)("div",it,[st,(0,e.withDirectives)((0,e.createElementVNode)("input",{type:"text","onUpdate:modelValue":n[24]||(n[24]=a=>t.launchConfig.sam.localArguments=a),placeholder:"Enter as a comma separated list"},null,512),[[e.vModelText,t.launchConfig.sam.localArguments]])]),(0,e.createElementVNode)("div",rt,[lt,(0,e.withDirectives)((0,e.createElementVNode)("input",{type:"checkbox",name:"skipNewImageCheck",id:"skipNewImageCheck","onUpdate:modelValue":n[25]||(n[25]=a=>t.skipNewImageCheck=a)},null,512),[[e.vModelCheckbox,t.skipNewImageCheck]])]),(0,e.createElementVNode)("div",dt,[ct,(0,e.withDirectives)((0,e.createElementVNode)("input",{type:"text","onUpdate:modelValue":n[26]||(n[26]=a=>t.parameters.value=a),"data-invalid":!!t.parameters.errorMsg},null,8,pt),[[e.vModelText,t.parameters.value]]),t.parameters.errorMsg?((0,e.openBlock)(),(0,e.createElementBlock)("div",ut," Error parsing JSON: "+(0,e.toDisplayString)(t.parameters.errorMsg),1)):(0,e.createCommentVNode)("v-if",!0)]),mt,(0,e.createElementVNode)("div",vt,[ht,(0,e.withDirectives)((0,e.createElementVNode)("input",{type:"text","onUpdate:modelValue":n[27]||(n[27]=a=>t.launchConfig.api.querystring=a)},null,512),[[e.vModelText,t.launchConfig.api.querystring]])]),(0,e.createElementVNode)("div",gt,[ft,(0,e.withDirectives)((0,e.createElementVNode)("input",{type:"text","onUpdate:modelValue":n[28]||(n[28]=a=>t.stageVariables.value=a),"data-invalid":!!t.stageVariables.errorMsg,placeholder:"Enter as valid JSON"},null,8,_t),[[e.vModelText,t.stageVariables.value]]),t.stageVariables.errorMsg?((0,e.openBlock)(),(0,e.createElementBlock)("div",At," Error parsing JSON: "+(0,e.toDisplayString)(t.stageVariables.errorMsg),1)):(0,e.createCommentVNode)("v-if",!0)]),(0,e.createElementVNode)("div",bt,[Ct,(0,e.withDirectives)((0,e.createElementVNode)("input",{type:"text","onUpdate:modelValue":n[29]||(n[29]=a=>t.launchConfig.api.clientCertificateId=a)},null,512),[[e.vModelText,t.launchConfig.api.clientCertificateId]])]),(0,e.createElementVNode)("div",yt,[Et,(0,e.withDirectives)((0,e.createElementVNode)("input",{type:"text","onUpdate:modelValue":n[30]||(n[30]=a=>t.apiPayload.value=a),placeholder:"Enter as valid JSON","data-invalid":!!t.apiPayload.errorMsg},null,8,Vt),[[e.vModelText,t.apiPayload.value]]),t.apiPayload.errorMsg?((0,e.openBlock)(),(0,e.createElementBlock)("div",Nt," Error parsing JSON: "+(0,e.toDisplayString)(t.apiPayload.errorMsg),1)):(0,e.createCommentVNode)("v-if",!0)])]),_:1}),(0,e.createVNode)(_,{id:"payload-panel",title:"Payload",description:"","start-collapsed":""},{default:(0,e.withCtx)(()=>[(0,e.createElementVNode)("button",{class:"margin-bottom-16",onClick:n[31]||(n[31]=(0,e.withModifiers)((...a)=>t.loadPayload&&t.loadPayload(...a),["prevent"]))},"Load Sample Payload"),Bt,(0,e.withDirectives)((0,e.createElementVNode)("textarea",{name:"lambda-payload",id:"lambda-payload",cols:"60",rows:"5","onUpdate:modelValue":n[32]||(n[32]=a=>t.payload.value=a)},null,512),[[e.vModelText,t.payload.value]]),(0,e.createElementVNode)("span",kt,"payload from data: "+(0,e.toDisplayString)(t.payload),1),t.payload.errorMsg?((0,e.openBlock)(),(0,e.createElementBlock)("div",It,"Error parsing JSON: "+(0,e.toDisplayString)(t.payload.errorMsg),1)):(0,e.createCommentVNode)("v-if",!0)]),_:1}),(0,e.createElementVNode)("div",wt,[(0,e.createElementVNode)("button",{class:"",onClick:n[33]||(n[33]=(0,e.withModifiers)((...a)=>t.launch&&t.launch(...a),["prevent"]))},"Invoke"),(0,e.createElementVNode)("button",{class:"form-buttons",onClick:n[34]||(n[34]=(0,e.withModifiers)((...a)=>t.loadConfig&&t.loadConfig(...a),["prevent"]))},"Load Existing Config"),(0,e.createElementVNode)("button",{class:"form-buttons",onClick:n[35]||(n[35]=(0,e.withModifiers)((...a)=>t.save&&t.save(...a),["prevent"]))},"Save")])])}const Wt=t=>(_pushScopeId("data-v-3e78b3d8"),t=t(),_popScopeId(),t),Tt=["id"],Mt={class:"header"},Dt=["id"],Pt=["for"],Ot={class:"settings-title"},Lt={class:"soft no-spacing"},Ut={ref:"subPane",class:"sub-pane"};function Rt(t,n,u,f,b,A){return(0,e.openBlock)(),(0,e.createElementBlock)("div",{id:t.id,class:"settings-panel"},[(0,e.createElementVNode)("div",Mt,[t.collapseable||t.startCollapsed?(0,e.withDirectives)(((0,e.openBlock)(),(0,e.createElementBlock)("input",{key:0,ref:"button",id:t.buttonId,class:"preload-transition collapse-button",type:"checkbox","onUpdate:modelValue":n[0]||(n[0]=_=>t.collapsed=_)},null,8,Dt)),[[e.vModelCheckbox,t.collapsed]]):(0,e.createCommentVNode)("v-if",!0),(0,e.createElementVNode)("label",{for:t.buttonId},[(0,e.createElementVNode)("p",Ot,(0,e.toDisplayString)(t.title),1),(0,e.createElementVNode)("p",Lt,(0,e.toDisplayString)(t.description),1)],8,Pt)]),(0,e.createVNode)(e.Transition,{onEnter:t.updateHeight,onBeforeLeave:t.updateHeight,name:t.collapseable||t.startCollapsed?"collapse":""},{default:(0,e.withCtx)(()=>[(0,e.withDirectives)((0,e.createElementVNode)("div",Ut,[(0,e.renderSlot)(t.$slots,"default",{},void 0,!0)],512),[[e.vShow,!t.collapsed]])]),_:3},8,["onEnter","onBeforeLeave","name"])],8,Tt)}/*!
 * Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */const z=new Set;window.addEventListener("remount",()=>z.clear());const ee={created(){var t,n,u,f,b;if(this.$data===void 0)return;const A=(t=vscode.getState())!=null?t:{};this.$options._count=((n=this.$options._count)!=null?n:0)+1;const _=(f=this.id)!=null?f:`${(u=this.name)!=null?u:`DEFAULT-${z.size}`}-${this.$options._count}`;if(this.$options._unid=_,z.has(_)){console.warn(`Component "${_}" already exists. State-saving functionality will be disabled.`);return}z.add(_);const a=(b=A[_])!=null?b:{};Object.keys(this.$data).forEach(v=>{var B;this.$data[v]=(B=a[v])!=null?B:this.$data[v]}),Object.keys(this.$data).forEach(v=>{this.$watch(v,B=>{var E,k;const R=(E=vscode.getState())!=null?E:{},Z=Object.assign((k=R[_])!=null?k:{},{[v]:JSON.parse(JSON.stringify(B))});vscode.setState(Object.assign(R,{[_]:Z}))},{deep:!0})})}};let te=0;const $t=(0,e.defineComponent)({name:"settings-panel",props:{id:String,startCollapsed:Boolean,collapseable:Boolean,title:String,description:String},data(){var t;return te+=1,{collapsed:(t=this.$props.startCollapsed)!=null?t:!1,buttonId:`settings-panel-button-${te}`,lastHeight:void 0}},mixins:[ee],methods:{updateHeight(t){t.style&&(this.lastHeight=t.scrollHeight,t.style.setProperty("--max-height",`${this.lastHeight}px`))}},mounted(){var t,n;this.subPane=this.$refs.subPane,this.lastHeight=this.collapsed?this.lastHeight:(n=(t=this.subPane)==null?void 0:t.scrollHeight)!=null?n:this.lastHeight,this.$nextTick(()=>{setTimeout(()=>{var u;(u=this.$refs.button)==null||u.classList.remove("preload-transition")},100)})}});var zt=y(138),ne=y(744);const Jt=(0,ne.Z)($t,[["render",Rt],["__scopeId","data-v-3e78b3d8"]]);/*!
 * Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */class K{static registerGlobalCommands(){const n=new Event("remount");window.addEventListener("message",u=>{const{command:f}=u.data;f==="$clear"&&(vscode.setState({}),this.messageListeners.forEach(b=>this.removeListener(b)),window.dispatchEvent(n))})}static addListener(n){this.messageListeners.add(n),window.addEventListener("message",n)}static removeListener(n){this.messageListeners.delete(n),window.removeEventListener("message",n)}static sendRequest(n,u,f){const b=JSON.parse(JSON.stringify(f)),A=new Promise((_,a)=>{const v=E=>{const k=E.data;if(n===k.id)if(this.removeListener(v),window.clearTimeout(B),k.error===!0){const R=JSON.parse(k.data);a(new Error(R.message))}else k.event?(typeof f[0]!="function"&&a(new Error(`Expected frontend event handler to be a function: ${u}`)),_(this.registerEventHandler(u,f[0]))):_(k.data)},B=setTimeout(()=>{this.removeListener(v),a(new Error(`Timed out while waiting for response: id: ${n}, command: ${u}`))},3e5);this.addListener(v)});return vscode.postMessage({id:n,command:u,data:b}),A}static registerEventHandler(n,u){const f=b=>{const A=b.data;if(A.command===n){if(!A.event)throw new Error(`Expected backend handler to be an event emitter: ${n}`);u(A.data)}};return this.addListener(f),{dispose:()=>this.removeListener(f)}}static create(){return this.initialized||(this.initialized=!0,this.registerGlobalCommands()),new Proxy({},{set:()=>{throw new TypeError("Cannot set property to webview client")},get:(n,u)=>{var f;if(typeof u!="string"){console.warn(`Tried to index webview client with non-string property: ${String(u)}`);return}if(u==="init"){const A=(f=vscode.getState())!=null?f:{};if(A.__once)return()=>Promise.resolve();vscode.setState(Object.assign(A,{__once:!0}))}const b=(this.counter++).toString();return(...A)=>this.sendRequest(b,u,A)}})}}K.counter=0,K.initialized=!1,K.messageListeners=new Set;/*!
 * Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */const L=K.create();function ae(t){var n,u,f,b,A,_,a,v,B,E,k;return{type:"aws-sam",request:"direct-invoke",name:"",aws:{credentials:"",region:"",...(t==null?void 0:t.aws)?t.aws:{}},invokeTarget:{target:"template",templatePath:"",logicalId:"",lambdaHandler:"",projectRoot:"",...t==null?void 0:t.invokeTarget},lambda:{runtime:(n=t==null?void 0:t.lambda)==null?void 0:n.runtime,memoryMb:void 0,timeoutSec:void 0,environmentVariables:{},...t==null?void 0:t.lambda,payload:{json:((f=(u=t==null?void 0:t.lambda)==null?void 0:u.payload)==null?void 0:f.json)?t.lambda.payload.json:{},path:((A=(b=t==null?void 0:t.lambda)==null?void 0:b.payload)==null?void 0:A.path)?t.lambda.payload.path:""}},sam:{buildArguments:void 0,containerBuild:!1,dockerNetwork:"",localArguments:void 0,skipNewImageCheck:!1,...(t==null?void 0:t.sam)?t.sam:{},template:{parameters:((a=(_=t==null?void 0:t.sam)==null?void 0:_.template)==null?void 0:a.parameters)?t.sam.template.parameters:{}}},api:{path:"",httpMethod:"get",clientCertificateId:"",querystring:"",headers:{},stageVariables:{},...(t==null?void 0:t.api)?t.api:{},payload:{json:((B=(v=t==null?void 0:t.api)==null?void 0:v.payload)==null?void 0:B.json)?t.api.payload.json:{},path:((k=(E=t==null?void 0:t.api)==null?void 0:E.payload)==null?void 0:k.path)?t.api.payload.path:""}}}}function oe(){return{containerBuild:!1,skipNewImageCheck:!1,launchConfig:ae(),payload:{value:"",errorMsg:""},apiPayload:{value:"",errorMsg:""},environmentVariables:{value:"",errorMsg:""},parameters:{value:"",errorMsg:""},headers:{value:"",errorMsg:""},stageVariables:{value:"",errorMsg:""}}}const Ht=(0,e.defineComponent)({name:"sam-invoke",components:{settingsPanel:Jt},created(){L.init().then(t=>this.parseConfig(t)),L.getRuntimes().then(t=>{this.runtimes=t}),L.getCompanyName().then(t=>{this.company=t})},mixins:[ee],data(){return{...oe(),msg:"Hello",company:"",targetTypes:[{name:"Code",value:"code"},{name:"Template",value:"template"},{name:"API Gateway (Template)",value:"api"}],runtimes:[],httpMethods:["GET","POST","PUT","DELETE","HEAD","OPTIONS","PATCH"]}},methods:{resetJsonErrors(){this.payload.errorMsg="",this.environmentVariables.errorMsg="",this.headers.errorMsg="",this.stageVariables.errorMsg=""},launch(){const t=this.formatConfig();t&&L.invokeLaunchConfig(t)},save(){const t=this.formatConfig();t&&L.saveLaunchConfig(t)},loadConfig(){L.loadSamLaunchConfig().then(t=>this.parseConfig(t))},parseConfig(t){var n,u,f,b,A,_,a,v,B,E,k,R,Z,re,le;if(!t)return;const xt=this.company;this.clearForm(),this.launchConfig=ae(t),((n=t.lambda)==null?void 0:n.payload)&&(this.payload.value=JSON.stringify(t.lambda.payload.json,void 0,4)),((u=t.lambda)==null?void 0:u.environmentVariables)&&(this.environmentVariables.value=JSON.stringify((f=t.lambda)==null?void 0:f.environmentVariables)),((A=(b=t.sam)==null?void 0:b.template)==null?void 0:A.parameters)&&(this.parameters.value=JSON.stringify((a=(_=t.sam)==null?void 0:_.template)==null?void 0:a.parameters)),((v=t.api)==null?void 0:v.headers)&&(this.headers.value=JSON.stringify((B=t.api)==null?void 0:B.headers)),((E=t.api)==null?void 0:E.stageVariables)&&(this.stageVariables.value=JSON.stringify((k=t.api)==null?void 0:k.stageVariables)),this.containerBuild=(Z=(R=t.sam)==null?void 0:R.containerBuild)!=null?Z:!1,this.skipNewImageCheck=(le=(re=t.sam)==null?void 0:re.skipNewImageCheck)!=null?le:!1,this.msg=`Loaded config ${t}`,this.company=xt},loadPayload(){this.resetJsonErrors(),L.getSamplePayload().then(t=>{!t||(this.payload.value=JSON.stringify(JSON.parse(t),void 0,4))})},loadResource(){this.resetJsonErrors(),L.getTemplate().then(t=>{!t||(this.launchConfig.invokeTarget.target="template",this.launchConfig.invokeTarget.logicalId=t.logicalId,this.launchConfig.invokeTarget.templatePath=t.template)})},formatFieldToStringArray(t){if(!t)return;const n=/\s*,\s*/g;return t.trim().split(n)},formatStringtoJSON(t){if(t.errorMsg="",t.value)try{return JSON.parse(t.value)}catch(n){throw t.errorMsg=n.message,n}},formatConfig(){var t,n,u,f;this.resetJsonErrors();let b,A,_,a,v,B;try{b=this.formatStringtoJSON(this.payload),A=this.formatStringtoJSON(this.environmentVariables),_=this.formatStringtoJSON(this.headers),a=this.formatStringtoJSON(this.stageVariables),v=this.formatStringtoJSON(this.parameters),B=this.formatStringtoJSON(this.apiPayload)}catch(k){return}const E=JSON.parse(JSON.stringify(this.launchConfig));return{...E,lambda:{...E.lambda,payload:{...E.payload,json:b},environmentVariables:A},sam:{...E.sam,buildArguments:this.formatFieldToStringArray((n=(t=E.sam)==null?void 0:t.buildArguments)==null?void 0:n.toString()),localArguments:this.formatFieldToStringArray((f=(u=E.sam)==null?void 0:u.localArguments)==null?void 0:f.toString()),containerBuild:this.containerBuild,skipNewImageCheck:this.skipNewImageCheck,template:{parameters:v}},api:E.api?{...E.api,headers:_,stageVariables:a,payload:{json:B}}:void 0}},clearForm(){const t=oe();Object.keys(t).forEach(n=>this.$data[n]=t[n])}}});var Zt=y(408);const jt=(0,ne.Z)(Ht,[["render",St],["__scopeId","data-v-4c784f68"]]);/*!
 * Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */const ie=()=>(0,e.createApp)(jt),se=ie();se.mount("#vue-app"),window.addEventListener("remount",()=>{se.unmount(),ie().mount("#vue-app")})})(),module.exports=Q})();

//# sourceMappingURL=lambdaConfigEditorVue.js.map