import { invoke } from '@tauri-apps/api';

export async function start_game(params: string[]): Promise<void> {
    return invoke('start_game', {
        options: params
    });
}

export async function sync_with_paradox() {
    return invoke('sync_with_paradox');
}

export async function update_mods() {
    return invoke('update_mods');
}