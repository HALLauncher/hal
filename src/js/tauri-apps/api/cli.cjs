"use strict";var i=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var p=Object.prototype.hasOwnProperty;var g=(e,n)=>{for(var r in n)i(e,r,{get:n[r],enumerable:!0})},f=(e,n,r,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let t of m(n))!p.call(e,t)&&t!==r&&i(e,t,{get:()=>n[t],enumerable:!(o=d(n,t))||o.enumerable});return e};var h=e=>f(i({},"__esModule",{value:!0}),e);var y={};g(y,{getMatches:()=>M});module.exports=h(y);function w(){return window.crypto.getRandomValues(new Uint32Array(1))[0]}function s(e,n=!1){let r=w(),o=`_${r}`;return Object.defineProperty(window,o,{value:t=>(n&&Reflect.deleteProperty(window,o),e?.(t)),writable:!1,configurable:!0}),r}async function u(e,n={}){return new Promise((r,o)=>{let t=s(a=>{r(a),Reflect.deleteProperty(window,`_${c}`)},!0),c=s(a=>{o(a),Reflect.deleteProperty(window,`_${t}`)},!0);window.__TAURI_IPC__({cmd:e,callback:t,error:c,...n})})}async function l(e){return u("tauri",e)}async function M(){return l({__tauriModule:"Cli",message:{cmd:"cliMatches"}})}