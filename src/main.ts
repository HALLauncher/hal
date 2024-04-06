import { open } from '@tauri-apps/api/shell';
import { appLogDir } from '@tauri-apps/api/path';
import { start_game, sync_with_paradox, update_mods } from "./wrapper";

import $ from "jquery";

let click_on_popup_window = false;

document.addEventListener('DOMContentLoaded', () => {
    const status = $('.status_text');
    const start_area = $('.start_area');
    const start_button = $('#start_button');

    sync_with_paradox().then(() => {
        status.text('Updating mods...');

        update_mods().then(() => {
            status.text('Done');

            status.hide();
            start_area.show();

            $('.popup_window').on('click', () => {
                click_on_popup_window = true;
            });

            $('.popup_area').on('click', () => {
                if (click_on_popup_window) {
                    click_on_popup_window = false;
                    return;
                }

                $('#settings_window').hide(100);
            });

            $('.settings_button').on('click', () => {
                $('#settings_window').show(100);
            });

        }).catch(_ => {
            status.text("Can't update mods");
        });
    }).catch(_ => {
        status.text("Can't sync with paradox");
        status.attr('title', 'Click to open logs');
        status.addClass('status_text_err');

        status.on('click', async _ => {
            console.log(await appLogDir())
            open((await appLogDir()).concat('hal.log'));
        })
    });

    start_button.on('click', () => {
        start_game([]).catch(err => {
           console.log(err);
       });
    });
});