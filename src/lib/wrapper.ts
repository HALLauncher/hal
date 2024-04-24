import { invoke } from "@tauri-apps/api";

export type ModPack = { 
    name: string;
    mods: string[];
};

export type LauncherInfo = {
    gameId: string;
    displayName: string;
    version: string;
    rawVersion: string;
    distPlatform: string;
    ingameSettingsPath: string;
    gameDataPath: string;
    dlcPath: string;
    ingameSettingsLayoutPath: string;
    themeFile: string;
    browserDlcUrl: string;
    browserModUrl: string;
    exePath: string;
    exeArgs: string[];
    alternativeExecutables: {
      label: {
        de: string;
        en: string;
        es: string;
        fr: string;
        ja: string;
        ko: string;
        pl: string;
        pt: string;
        ru: string;
        "zh-hans": string;
      };
      exePath: string;
      exeArgs: string[];
    }[];
    gameCachePaths: string[];
  };

export const start_game = async (options: string[]): Promise<void> => invoke("start_game", { options }); // WTF
export const sync_with_paradox = async () => invoke("sync_with_paradox");
export const update_mods = async () => invoke("update_mods");
export const update_modpacks = async () => invoke("update_modpacks");
export const get_launcher_info = async (): Promise<LauncherInfo> => invoke("get_launcher_info");