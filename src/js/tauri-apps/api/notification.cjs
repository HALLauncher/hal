"use strict";var s=Object.defineProperty;var l=Object.getOwnPropertyDescriptor;var f=Object.getOwnPropertyNames;var m=Object.prototype.hasOwnProperty;var p=(e,i)=>{for(var o in i)s(e,o,{get:i[o],enumerable:!0})},w=(e,i,o,t)=>{if(i&&typeof i=="object"||typeof i=="function")for(let n of f(i))!m.call(e,n)&&n!==o&&s(e,n,{get:()=>i[n],enumerable:!(t=l(i,n))||t.enumerable});return e};var g=e=>w(s({},"__esModule",{value:!0}),e);var T={};p(T,{isPermissionGranted:()=>P,requestPermission:()=>_,sendNotification:()=>v});module.exports=g(T);function y(){return window.crypto.getRandomValues(new Uint32Array(1))[0]}function d(e,i=!1){let o=y(),t=`_${o}`;return Object.defineProperty(window,t,{value:n=>(i&&Reflect.deleteProperty(window,t),e?.(n)),writable:!1,configurable:!0}),o}async function u(e,i={}){return new Promise((o,t)=>{let n=d(r=>{o(r),Reflect.deleteProperty(window,`_${a}`)},!0),a=d(r=>{t(r),Reflect.deleteProperty(window,`_${n}`)},!0);window.__TAURI_IPC__({cmd:e,callback:n,error:a,...i})})}async function c(e){return u("tauri",e)}async function P(){return window.Notification.permission!=="default"?Promise.resolve(window.Notification.permission==="granted"):c({__tauriModule:"Notification",message:{cmd:"isNotificationPermissionGranted"}})}async function _(){return window.Notification.requestPermission()}function v(e){typeof e=="string"?new window.Notification(e):new window.Notification(e.title,e)}