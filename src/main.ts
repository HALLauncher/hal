import { invoke } from '@tauri-apps/api';
import { open } from '@tauri-apps/api/shell';
import { appLogDir } from '@tauri-apps/api/path';

document.addEventListener('DOMContentLoaded', () => {
    const status = document.querySelector('.status_text');
    const start_area = document.querySelector('.start_area');
    const start_button = document.querySelector('#start_button');

    invoke('sync_with_paradox').then(() => {
        status!.textContent = 'Updating mods...';

        invoke('update_mods').then(() => {
            status!.textContent = 'Done';

            status!.classList.add('hidden');
            start_area!.classList.remove('hidden');
        }).catch(_ => {
            status!.textContent = "Can't update mods";
        });
    }).catch(_ => {
        status!.textContent = "Can't sync with paradox";
        status!.setAttribute('title', 'Click to open logs');
        status!.classList.add('status_text_err');

        status!.addEventListener('click', async _ => {
            console.log(await appLogDir())
            open((await appLogDir()).concat('hal.log'));
        })
    });

    start_button!.addEventListener('click', () => {
       invoke('start_game', { 
            options: []
       }).catch(err => {
           console.log(err);
       });
    });
});