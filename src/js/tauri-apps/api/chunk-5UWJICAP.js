import{a as c}from"./chunk-FEIY7W7S.js";var w={};c(w,{convertFileSrc:()=>u,invoke:()=>d,transformCallback:()=>s});function l(){return window.crypto.getRandomValues(new Uint32Array(1))[0]}function s(r,n=!1){let e=l(),t=`_${e}`;return Object.defineProperty(window,t,{value:o=>(n&&Reflect.deleteProperty(window,t),r?.(o)),writable:!1,configurable:!0}),e}async function d(r,n={}){return new Promise((e,t)=>{let o=s(i=>{e(i),Reflect.deleteProperty(window,`_${a}`)},!0),a=s(i=>{t(i),Reflect.deleteProperty(window,`_${o}`)},!0);window.__TAURI_IPC__({cmd:r,callback:o,error:a,...n})})}function u(r,n="asset"){let e=encodeURIComponent(r);return navigator.userAgent.includes("Windows")?`https://${n}.localhost/${e}`:`${n}://localhost/${e}`}export{s as a,d as b,u as c,w as d};