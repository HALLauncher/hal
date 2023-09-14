"use strict";var l=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var c=Object.prototype.hasOwnProperty;var g=(e,t)=>{for(var i in t)l(e,i,{get:t[i],enumerable:!0})},O=(e,t,i,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of m(t))!c.call(e,s)&&s!==i&&l(e,s,{get:()=>t[s],enumerable:!(o=f(t,s))||o.enumerable});return e};var _=e=>O(l({},"__esModule",{value:!0}),e);var I={};g(I,{BaseDirectory:()=>F,Dir:()=>F,copyFile:()=>y,createDir:()=>h,exists:()=>k,readBinaryFile:()=>P,readDir:()=>A,readTextFile:()=>v,removeDir:()=>x,removeFile:()=>C,renameFile:()=>M,writeBinaryFile:()=>b,writeFile:()=>T,writeTextFile:()=>T});module.exports=_(I);function w(){return window.crypto.getRandomValues(new Uint32Array(1))[0]}function u(e,t=!1){let i=w(),o=`_${i}`;return Object.defineProperty(window,o,{value:s=>(t&&Reflect.deleteProperty(window,o),e?.(s)),writable:!1,configurable:!0}),i}async function d(e,t={}){return new Promise((i,o)=>{let s=u(a=>{i(a),Reflect.deleteProperty(window,`_${p}`)},!0),p=u(a=>{o(a),Reflect.deleteProperty(window,`_${s}`)},!0);window.__TAURI_IPC__({cmd:e,callback:s,error:p,...t})})}async function r(e){return d("tauri",e)}var F=(n=>(n[n.Audio=1]="Audio",n[n.Cache=2]="Cache",n[n.Config=3]="Config",n[n.Data=4]="Data",n[n.LocalData=5]="LocalData",n[n.Desktop=6]="Desktop",n[n.Document=7]="Document",n[n.Download=8]="Download",n[n.Executable=9]="Executable",n[n.Font=10]="Font",n[n.Home=11]="Home",n[n.Picture=12]="Picture",n[n.Public=13]="Public",n[n.Runtime=14]="Runtime",n[n.Template=15]="Template",n[n.Video=16]="Video",n[n.Resource=17]="Resource",n[n.App=18]="App",n[n.Log=19]="Log",n[n.Temp=20]="Temp",n[n.AppConfig=21]="AppConfig",n[n.AppData=22]="AppData",n[n.AppLocalData=23]="AppLocalData",n[n.AppCache=24]="AppCache",n[n.AppLog=25]="AppLog",n))(F||{});async function v(e,t={}){return r({__tauriModule:"Fs",message:{cmd:"readTextFile",path:e,options:t}})}async function P(e,t={}){let i=await r({__tauriModule:"Fs",message:{cmd:"readFile",path:e,options:t}});return Uint8Array.from(i)}async function T(e,t,i){typeof i=="object"&&Object.freeze(i),typeof e=="object"&&Object.freeze(e);let o={path:"",contents:""},s=i;return typeof e=="string"?o.path=e:(o.path=e.path,o.contents=e.contents),typeof t=="string"?o.contents=t??"":s=t,r({__tauriModule:"Fs",message:{cmd:"writeFile",path:o.path,contents:Array.from(new TextEncoder().encode(o.contents)),options:s}})}async function b(e,t,i){typeof i=="object"&&Object.freeze(i),typeof e=="object"&&Object.freeze(e);let o={path:"",contents:[]},s=i;return typeof e=="string"?o.path=e:(o.path=e.path,o.contents=e.contents),t&&"dir"in t?s=t:typeof e=="string"&&(o.contents=t??[]),r({__tauriModule:"Fs",message:{cmd:"writeFile",path:o.path,contents:Array.from(o.contents instanceof ArrayBuffer?new Uint8Array(o.contents):o.contents),options:s}})}async function A(e,t={}){return r({__tauriModule:"Fs",message:{cmd:"readDir",path:e,options:t}})}async function h(e,t={}){return r({__tauriModule:"Fs",message:{cmd:"createDir",path:e,options:t}})}async function x(e,t={}){return r({__tauriModule:"Fs",message:{cmd:"removeDir",path:e,options:t}})}async function y(e,t,i={}){return r({__tauriModule:"Fs",message:{cmd:"copyFile",source:e,destination:t,options:i}})}async function C(e,t={}){return r({__tauriModule:"Fs",message:{cmd:"removeFile",path:e,options:t}})}async function M(e,t,i={}){return r({__tauriModule:"Fs",message:{cmd:"renameFile",oldPath:e,newPath:t,options:i}})}async function k(e,t={}){return r({__tauriModule:"Fs",message:{cmd:"exists",path:e,options:t}})}