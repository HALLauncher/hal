import { listen } from './tauri-apps/api/event.js';
import { invoke } from './tauri-apps/api/tauri.js'
import { appDataDir } from './tauri-apps/api/path.js';


document.addEventListener('DOMContentLoaded', () => {
    const status = document.querySelector('.status_text');
    invoke('sync_with_paradox').then(async _ => {
        status.textContent = 'Ok';
    }).catch(err => {
        status.textContent = "Can't sync with paradox";
    });
});