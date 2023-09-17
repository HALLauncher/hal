import { invoke } from './tauri-apps/api/tauri.js';
import { appDataDir } from './tauri-apps/api/path.js';

document.addEventListener('DOMContentLoaded', () => {
   appDataDir().then(console.log);
   console.log(document.getElementById("start_button"));
   document.getElementById("start_button").addEventListener('click', () => {
      console.log('clicked');
      invoke('start_game', {
         options: [],
      });
   });
});