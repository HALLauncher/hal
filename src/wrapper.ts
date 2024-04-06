import { invoke } from '@tauri-apps/api';

export const start_game = async (options: string[]): Promise<void> => invoke('start_game', { options: options }); // WTF

export const sync_with_paradox = async () => invoke('sync_with_paradox');

export const update_mods = async () => invoke('update_mods');