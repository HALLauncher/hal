"use strict";var s=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var f=Object.prototype.hasOwnProperty;var m=(e,t)=>{for(var i in t)s(e,i,{get:t[i],enumerable:!0})},d=(e,t,i,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of p(t))!f.call(e,n)&&n!==i&&s(e,n,{get:()=>t[n],enumerable:!(o=u(t,n))||o.enumerable});return e};var y=e=>d(s({},"__esModule",{value:!0}),e);var k={};m(k,{ask:()=>v,confirm:()=>O,message:()=>w,open:()=>D,save:()=>_});module.exports=y(k);function b(){return window.crypto.getRandomValues(new Uint32Array(1))[0]}function g(e,t=!1){let i=b(),o=`_${i}`;return Object.defineProperty(window,o,{value:n=>(t&&Reflect.deleteProperty(window,o),e?.(n)),writable:!1,configurable:!0}),i}async function c(e,t={}){return new Promise((i,o)=>{let n=g(a=>{i(a),Reflect.deleteProperty(window,`_${l}`)},!0),l=g(a=>{o(a),Reflect.deleteProperty(window,`_${n}`)},!0);window.__TAURI_IPC__({cmd:e,callback:n,error:l,...t})})}async function r(e){return c("tauri",e)}async function D(e={}){return typeof e=="object"&&Object.freeze(e),r({__tauriModule:"Dialog",message:{cmd:"openDialog",options:e}})}async function _(e={}){return typeof e=="object"&&Object.freeze(e),r({__tauriModule:"Dialog",message:{cmd:"saveDialog",options:e}})}async function w(e,t){let i=typeof t=="string"?{title:t}:t;return r({__tauriModule:"Dialog",message:{cmd:"messageDialog",message:e.toString(),title:i?.title?.toString(),type:i?.type,buttonLabel:i?.okLabel?.toString()}})}async function v(e,t){let i=typeof t=="string"?{title:t}:t;return r({__tauriModule:"Dialog",message:{cmd:"askDialog",message:e.toString(),title:i?.title?.toString(),type:i?.type,buttonLabels:[i?.okLabel?.toString()??"Yes",i?.cancelLabel?.toString()??"No"]}})}async function O(e,t){let i=typeof t=="string"?{title:t}:t;return r({__tauriModule:"Dialog",message:{cmd:"confirmDialog",message:e.toString(),title:i?.title?.toString(),type:i?.type,buttonLabels:[i?.okLabel?.toString()??"Ok",i?.cancelLabel?.toString()??"Cancel"]}})}