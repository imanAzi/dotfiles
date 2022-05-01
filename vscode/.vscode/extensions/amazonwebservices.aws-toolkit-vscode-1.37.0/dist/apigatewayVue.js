(()=>{"use strict";var R={744:(e,u)=>{var c;c={value:!0},u.Z=(v,f)=>{for(const[b,k]of f)v[b]=k;return v}}},S={};function m(e){var u=S[e];if(u!==void 0)return u.exports;var c=S[e]={exports:{}};return R[e](c,c.exports,m),c.exports}m.r=e=>{typeof Symbol!="undefined"&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var D={};(()=>{m.r(D);const e=Vue,u=(0,e.createElementVNode)("br",null,null,-1),c={id:"app"},v=(0,e.createElementVNode)("h3",null,"Select a resource:",-1),f=(0,e.createElementVNode)("option",{disabled:"",value:""},"Select a resource",-1),b=["disabled","value"],k=(0,e.createElementVNode)("h3",null,"Select a method:",-1),V=(0,e.createElementVNode)("option",{disabled:"",value:""},"Select a method",-1),L=["value"],M={key:1},$=[(0,e.createElementVNode)("option",{disabled:"",value:""},"Select a resource first",-1)],B=(0,e.createElementVNode)("br",null,null,-1),O=(0,e.createElementVNode)("h3",null,"Query string (optional)",-1),j=(0,e.createElementVNode)("br",null,null,-1),I=(0,e.createElementVNode)("br",null,null,-1),T=(0,e.createElementVNode)("br",null,null,-1),C=["disabled"],q=(0,e.createElementVNode)("br",null,null,-1),z={key:2},F=(0,e.createElementVNode)("b",null,"Please correct the following error(s):",-1);function P(t,n,i,o,r,a){return(0,e.openBlock)(),(0,e.createElementBlock)(e.Fragment,null,[(0,e.createElementVNode)("h1",null,"Invoke methods on "+(0,e.toDisplayString)(t.initialData.ApiName)+" ("+(0,e.toDisplayString)(t.initialData.ApiId)+")",1),(0,e.createElementVNode)("pre",null,(0,e.toDisplayString)(t.initialData.ApiArn),1),u,(0,e.createElementVNode)("div",c,[v,(0,e.withDirectives)((0,e.createElementVNode)("select",{"onUpdate:modelValue":n[0]||(n[0]=s=>t.selectedApiResource=s),onChange:n[1]||(n[1]=(...s)=>t.setApiResource&&t.setApiResource(...s))},[f,((0,e.openBlock)(!0),(0,e.createElementBlock)(e.Fragment,null,(0,e.renderList)(Object.keys(t.initialData.Resources),s=>((0,e.openBlock)(),(0,e.createElementBlock)("option",{key:t.initialData.Resources[s].id,disabled:!t.initialData.Resources[s].resourceMethods,value:t.initialData.Resources[s].id},(0,e.toDisplayString)(`resource.path${t.initialData.Resources[s].resourceMethods===void 0?" -- No methods":""}`),9,b))),128))],544),[[e.vModelSelect,t.selectedApiResource]]),k,t.selectedApiResource?(0,e.withDirectives)(((0,e.openBlock)(),(0,e.createElementBlock)("select",{key:0,"onUpdate:modelValue":n[2]||(n[2]=s=>t.selectedMethod=s)},[V,((0,e.openBlock)(!0),(0,e.createElementBlock)(e.Fragment,null,(0,e.renderList)(t.methods,s=>((0,e.openBlock)(),(0,e.createElementBlock)("option",{key:s,value:s},(0,e.toDisplayString)(s),9,L))),128))],512)),[[e.vModelSelect,t.selectedMethod]]):((0,e.openBlock)(),(0,e.createElementBlock)("select",M,$)),B,O,(0,e.withDirectives)((0,e.createElementVNode)("input",{type:"text","onUpdate:modelValue":n[3]||(n[3]=s=>t.queryString=s)},null,512),[[e.vModelText,t.queryString]]),j,I,(0,e.withDirectives)((0,e.createElementVNode)("textarea",{rows:"20",cols:"90","onUpdate:modelValue":n[4]||(n[4]=s=>t.jsonInput=s)},null,512),[[e.vModelText,t.jsonInput]]),T,(0,e.createElementVNode)("input",{type:"submit",onClick:n[5]||(n[5]=(...s)=>t.sendInput&&t.sendInput(...s)),value:"Invoke",disabled:t.isLoading},null,8,C),q,t.errors.length?((0,e.openBlock)(),(0,e.createElementBlock)("div",z,[F,(0,e.createElementVNode)("ul",null,[((0,e.openBlock)(!0),(0,e.createElementBlock)(e.Fragment,null,(0,e.renderList)(t.errors,s=>((0,e.openBlock)(),(0,e.createElementBlock)("li",{key:s},(0,e.toDisplayString)(s),1))),128))])])):(0,e.createCommentVNode)("v-if",!0)])],64)}/*!
 * Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */class _{static registerGlobalCommands(){const n=new Event("remount");window.addEventListener("message",i=>{const{command:o}=i.data;o==="$clear"&&(vscode.setState({}),this.messageListeners.forEach(r=>this.removeListener(r)),window.dispatchEvent(n))})}static addListener(n){this.messageListeners.add(n),window.addEventListener("message",n)}static removeListener(n){this.messageListeners.delete(n),window.removeEventListener("message",n)}static sendRequest(n,i,o){const r=JSON.parse(JSON.stringify(o)),a=new Promise((s,h)=>{const l=w=>{const d=w.data;if(n===d.id)if(this.removeListener(l),window.clearTimeout(p),d.error===!0){const E=JSON.parse(d.data);h(new Error(E.message))}else d.event?(typeof o[0]!="function"&&h(new Error(`Expected frontend event handler to be a function: ${i}`)),s(this.registerEventHandler(i,o[0]))):s(d.data)},p=setTimeout(()=>{this.removeListener(l),h(new Error(`Timed out while waiting for response: id: ${n}, command: ${i}`))},3e5);this.addListener(l)});return vscode.postMessage({id:n,command:i,data:r}),a}static registerEventHandler(n,i){const o=r=>{const a=r.data;if(a.command===n){if(!a.event)throw new Error(`Expected backend handler to be an event emitter: ${n}`);i(a.data)}};return this.addListener(o),{dispose:()=>this.removeListener(o)}}static create(){return this.initialized||(this.initialized=!0,this.registerGlobalCommands()),new Proxy({},{set:()=>{throw new TypeError("Cannot set property to webview client")},get:(n,i)=>{var o;if(typeof i!="string"){console.warn(`Tried to index webview client with non-string property: ${String(i)}`);return}if(i==="init"){const a=(o=vscode.getState())!=null?o:{};if(a.__once)return()=>Promise.resolve();vscode.setState(Object.assign(a,{__once:!0}))}const r=(this.counter++).toString();return(...a)=>this.sendRequest(r,i,a)}})}}_.counter=0,_.initialized=!1,_.messageListeners=new Set;/*!
 * Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */const g=new Set;window.addEventListener("remount",()=>g.clear());const J={created(){var t,n,i,o,r;if(this.$data===void 0)return;const a=(t=vscode.getState())!=null?t:{};this.$options._count=((n=this.$options._count)!=null?n:0)+1;const s=(o=this.id)!=null?o:`${(i=this.name)!=null?i:`DEFAULT-${g.size}`}-${this.$options._count}`;if(this.$options._unid=s,g.has(s)){console.warn(`Component "${s}" already exists. State-saving functionality will be disabled.`);return}g.add(s);const h=(r=a[s])!=null?r:{};Object.keys(this.$data).forEach(l=>{var p;this.$data[l]=(p=h[l])!=null?p:this.$data[l]}),Object.keys(this.$data).forEach(l=>{this.$watch(l,p=>{var w,d;const E=(w=vscode.getState())!=null?w:{},Q=Object.assign((d=E[s])!=null?d:{},{[l]:JSON.parse(JSON.stringify(p))});vscode.setState(Object.assign(E,{[s]:Q}))},{deep:!0})})}},y=_.create(),U={ApiName:"",ApiId:"",ApiArn:"",Resources:{},Region:"",localizedMessages:{noApiResource:"noApiResource",noMethod:"noMethod"}},H=(0,e.defineComponent)({mixins:[J],data:()=>({initialData:U,selectedApiResource:"",selectedMethod:"",methods:[],jsonInput:"",queryString:"",errors:[],isLoading:!1}),async created(){var t;this.initialData=(t=await y.init())!=null?t:this.initialData},mounted(){this.$nextTick(function(){window.addEventListener("message",this.handleMessageReceived)})},methods:{handleMessageReceived:function(t){const n=t.data;switch(n.command){case"setMethods":this.methods=n.methods,this.methods&&(this.selectedMethod=this.methods[0]);break;case"invokeApiStarted":this.isLoading=!0;break;case"invokeApiFinished":this.isLoading=!1;break}},setApiResource:function(){y.handler({command:"apiResourceSelected",resource:this.initialData.Resources[this.selectedApiResource],region:this.initialData.Region})},sendInput:function(){this.errors=[],this.selectedApiResource||this.errors.push(this.initialData.localizedMessages.noApiResource),this.selectedMethod||this.errors.push(this.initialData.localizedMessages.noMethod),!(this.errors.length>0)&&y.handler({command:"invokeApi",body:this.jsonInput,api:this.initialData.ApiId,selectedApiResource:this.initialData.Resources[this.selectedApiResource],selectedMethod:this.selectedMethod,queryString:this.queryString,region:this.initialData.Region})}}});var G=m(744);const Z=(0,G.Z)(H,[["render",P]]);/*!
 * Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */const A=()=>(0,e.createApp)(Z),N=A();N.mount("#vue-app"),window.addEventListener("remount",()=>{N.unmount(),A().mount("#vue-app")})})(),module.exports=D})();

//# sourceMappingURL=apigatewayVue.js.map