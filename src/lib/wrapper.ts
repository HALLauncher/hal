import { invoke } from "@tauri-apps/api";
import * as fs from "@tauri-apps/api/fs";
import { sep } from "@tauri-apps/api/path";
import { Jomini } from "jomini";
import { writable } from "svelte/store";

export const cached_mod_images = writable<{id: string; url: string}[]>([]);

export type Uuid = string;

export type ModPack = { 
	name: string;
	mods: string[];
	uuid: Uuid;
};

export type Settings = {
	custom_background?: string;	
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

export type ModDescriptor = {
  path?: string;
  archive?: string;
  name: string;
  version?: string;
  supported_version?: string;
  remote_file_id?: string;
  uuid: Uuid;
};

export type RawModDescriptor = {
	version?: string;
	tags?: string[];
	name: string;
	picture?: string;
	dependencies?: string[];
	supported_version?: string;
	remote_file_id?: string;
};

export const start_game = async (options: string[], modpack?: Uuid): Promise<void> => invoke("start_game", { options, modpack }); // WTF
export const sync_with_paradox = async () => invoke("sync_with_paradox");
export const update_mods = async () => invoke("update_mods");
export const update_modpacks = async () => invoke("update_modpacks");
export const get_launcher_info = async (): Promise<LauncherInfo> => invoke("get_launcher_info");
export const get_mods = async (): Promise<ModDescriptor[]> => invoke("get_mods");
export const get_settings = async (): Promise<Settings> => invoke("get_settings");
export const save_settings = async (settings: Settings): Promise<void> => invoke("save_settings", { settings });

export const get_modpacks = async (): Promise<Uuid[]> => invoke("get_modpacks");
export const get_modpack = async (uuid: string): Promise<ModPack> => invoke("get_modpack", { uuid });
export const create_modpack = async (name: string, mods: Uuid[]): Promise<Uuid> => invoke("create_modpack", { name, mods });

const find_file_with_extension = async (path: string, regexp: RegExp): Promise<string | null> => {
	const files = await fs.readDir(path);
	for (const file of files) {
		if (regexp.test(file.path)) {
			return file.path;
		}
	}
	return null;
};

export const get_raw_mod_descriptor = async (desc: ModDescriptor): Promise<RawModDescriptor | null> => {
	const path = desc.path!.concat(sep, (await find_file_with_extension(desc.path!, /\.mod$/i))!);
	if (!await fs.exists(path)) {
		return null;
	}

	const raw = await fs.readTextFile(path);
	const jomini = await Jomini.initialize();

	return jomini.parseText(raw) as RawModDescriptor;
};

export const get_mod_thumbnail = async (mod: ModDescriptor): Promise<string | null> => {
	const raw = await get_raw_mod_descriptor(mod);
	let path = raw && raw.picture ? mod.path?.concat(sep, raw!.picture) : null;

	if (!path || (path && !await fs.exists(path))) {
		path = await find_file_with_extension(mod.path!, /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i);
	}

	return path;
};
