import { invoke } from './tauri-apps/api/tauri.js';

document.addEventListener('DOMContentLoaded', () => {
   console.log(document.getElementById("start_button"));
   document.getElementById("start_button").addEventListener('click', () => {
      console.log('clicked');
      invoke('start_game', {
         options: [],
      });
   });
});