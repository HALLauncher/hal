import { listen } from './tauri-apps/api/event.js';
import { invoke } from './tauri-apps/api/tauri.js'
import { appDataDir } from './tauri-apps/api/path.js';


document.addEventListener('DOMContentLoaded', () => {
    const status = document.querySelector('.status_text');
    const start_area = document.querySelector('.start_area');
    const start_button = document.querySelector('#start_button');

    invoke('sync_with_paradox').then(async _ => {
        status.textContent = 'Updating mods...';

        invoke('update_mods').then(() => {
            status.textContent = 'Done';

            status.classList.add('hidden');
            start_area.classList.remove('hidden');
        }).catch(err => {
            status.textContent = "Can't update mods";
        });

    }).catch(err => {
        status.textContent = "Can't sync with paradox";
    });

    start_button.addEventListener('click', () => {
       invoke('start_game', { 
            options: []
       }).catch(err => {
           console.log(err);
       });
    });
});