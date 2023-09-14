import { B as BaseDirectory } from './fs-6ad2a328.js';

/**
 * Returns the path to the suggested directory for your app config files.
 *
 * @deprecated since 1.2.0: Will be removed in 2.0.0. Use {@link appConfigDir} or {@link appDataDir} instead.
 * @since 1.0.0
 */
declare function appDir(): Promise<string>;
/**
 * Returns the path to the suggested directory for your app's config files.
 * Resolves to `${configDir}/${bundleIdentifier}`, where `bundleIdentifier` is the value [`tauri.bundle.identifier`](https://tauri.app/v1/api/config/#bundleconfig.identifier) is configured in `tauri.conf.json`.
 * @example
 * ```typescript
 * import { appConfigDir } from '@tauri-apps/api/path';
 * const appConfigDirPath = await appConfigDir();
 * ```
 *
 * @since 1.2.0
 */
declare function appConfigDir(): Promise<string>;
/**
 * Returns the path to the suggested directory for your app's data files.
 * Resolves to `${dataDir}/${bundleIdentifier}`, where `bundleIdentifier` is the value [`tauri.bundle.identifier`](https://tauri.app/v1/api/config/#bundleconfig.identifier) is configured in `tauri.conf.json`.
 * @example
 * ```typescript
 * import { appDataDir } from '@tauri-apps/api/path';
 * const appDataDirPath = await appDataDir();
 * ```
 *
 * @since 1.2.0
 */
declare function appDataDir(): Promise<string>;
/**
 * Returns the path to the suggested directory for your app's local data files.
 * Resolves to `${localDataDir}/${bundleIdentifier}`, where `bundleIdentifier` is the value [`tauri.bundle.identifier`](https://tauri.app/v1/api/config/#bundleconfig.identifier) is configured in `tauri.conf.json`.
 * @example
 * ```typescript
 * import { appLocalDataDir } from '@tauri-apps/api/path';
 * const appLocalDataDirPath = await appLocalDataDir();
 * ```
 *
 * @since 1.2.0
 */
declare function appLocalDataDir(): Promise<string>;
/**
 * Returns the path to the suggested directory for your app's cache files.
 * Resolves to `${cacheDir}/${bundleIdentifier}`, where `bundleIdentifier` is the value [`tauri.bundle.identifier`](https://tauri.app/v1/api/config/#bundleconfig.identifier) is configured in `tauri.conf.json`.
 * @example
 * ```typescript
 * import { appCacheDir } from '@tauri-apps/api/path';
 * const appCacheDirPath = await appCacheDir();
 * ```
 *
 * @since 1.2.0
 */
declare function appCacheDir(): Promise<string>;
/**
 * Returns the path to the user's audio directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)' `XDG_MUSIC_DIR`.
 * - **macOS:** Resolves to `$HOME/Music`.
 * - **Windows:** Resolves to `{FOLDERID_Music}`.
 * @example
 * ```typescript
 * import { audioDir } from '@tauri-apps/api/path';
 * const audioDirPath = await audioDir();
 * ```
 *
 * @since 1.0.0
 */
declare function audioDir(): Promise<string>;
/**
 * Returns the path to the user's cache directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to `$XDG_CACHE_HOME` or `$HOME/.cache`.
 * - **macOS:** Resolves to `$HOME/Library/Caches`.
 * - **Windows:** Resolves to `{FOLDERID_LocalAppData}`.
 * @example
 * ```typescript
 * import { cacheDir } from '@tauri-apps/api/path';
 * const cacheDirPath = await cacheDir();
 * ```
 *
 * @since 1.0.0
 */
declare function cacheDir(): Promise<string>;
/**
 * Returns the path to the user's config directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to `$XDG_CONFIG_HOME` or `$HOME/.config`.
 * - **macOS:** Resolves to `$HOME/Library/Application Support`.
 * - **Windows:** Resolves to `{FOLDERID_RoamingAppData}`.
 * @example
 * ```typescript
 * import { configDir } from '@tauri-apps/api/path';
 * const configDirPath = await configDir();
 * ```
 *
 * @since 1.0.0
 */
declare function configDir(): Promise<string>;
/**
 * Returns the path to the user's data directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to `$XDG_DATA_HOME` or `$HOME/.local/share`.
 * - **macOS:** Resolves to `$HOME/Library/Application Support`.
 * - **Windows:** Resolves to `{FOLDERID_RoamingAppData}`.
 * @example
 * ```typescript
 * import { dataDir } from '@tauri-apps/api/path';
 * const dataDirPath = await dataDir();
 * ```
 *
 * @since 1.0.0
 */
declare function dataDir(): Promise<string>;
/**
 * Returns the path to the user's desktop directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)' `XDG_DESKTOP_DIR`.
 * - **macOS:** Resolves to `$HOME/Desktop`.
 * - **Windows:** Resolves to `{FOLDERID_Desktop}`.
 * @example
 * ```typescript
 * import { desktopDir } from '@tauri-apps/api/path';
 * const desktopPath = await desktopDir();
 * ```
 *
 * @since 1.0.0
 */
declare function desktopDir(): Promise<string>;
/**
 * Returns the path to the user's document directory.
 * @example
 * ```typescript
 * import { documentDir } from '@tauri-apps/api/path';
 * const documentDirPath = await documentDir();
 * ```
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)' `XDG_DOCUMENTS_DIR`.
 * - **macOS:** Resolves to `$HOME/Documents`.
 * - **Windows:** Resolves to `{FOLDERID_Documents}`.
 *
 * @since 1.0.0
 */
declare function documentDir(): Promise<string>;
/**
 * Returns the path to the user's download directory.
 *
 * #### Platform-specific
 *
 * - **Linux**: Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)' `XDG_DOWNLOAD_DIR`.
 * - **macOS**: Resolves to `$HOME/Downloads`.
 * - **Windows**: Resolves to `{FOLDERID_Downloads}`.
 * @example
 * ```typescript
 * import { downloadDir } from '@tauri-apps/api/path';
 * const downloadDirPath = await downloadDir();
 * ```
 *
 * @since 1.0.0
 */
declare function downloadDir(): Promise<string>;
/**
 * Returns the path to the user's executable directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to `$XDG_BIN_HOME/../bin` or `$XDG_DATA_HOME/../bin` or `$HOME/.local/bin`.
 * - **macOS:** Not supported.
 * - **Windows:** Not supported.
 * @example
 * ```typescript
 * import { executableDir } from '@tauri-apps/api/path';
 * const executableDirPath = await executableDir();
 * ```
 *
 * @since 1.0.0
 */
declare function executableDir(): Promise<string>;
/**
 * Returns the path to the user's font directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to `$XDG_DATA_HOME/fonts` or `$HOME/.local/share/fonts`.
 * - **macOS:** Resolves to `$HOME/Library/Fonts`.
 * - **Windows:** Not supported.
 * @example
 * ```typescript
 * import { fontDir } from '@tauri-apps/api/path';
 * const fontDirPath = await fontDir();
 * ```
 *
 * @since 1.0.0
 */
declare function fontDir(): Promise<string>;
/**
 * Returns the path to the user's home directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to `$HOME`.
 * - **macOS:** Resolves to `$HOME`.
 * - **Windows:** Resolves to `{FOLDERID_Profile}`.
 * @example
 * ```typescript
 * import { homeDir } from '@tauri-apps/api/path';
 * const homeDirPath = await homeDir();
 * ```
 *
 * @since 1.0.0
 */
declare function homeDir(): Promise<string>;
/**
 * Returns the path to the user's local data directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to `$XDG_DATA_HOME` or `$HOME/.local/share`.
 * - **macOS:** Resolves to `$HOME/Library/Application Support`.
 * - **Windows:** Resolves to `{FOLDERID_LocalAppData}`.
 * @example
 * ```typescript
 * import { localDataDir } from '@tauri-apps/api/path';
 * const localDataDirPath = await localDataDir();
 * ```
 *
 * @since 1.0.0
 */
declare function localDataDir(): Promise<string>;
/**
 * Returns the path to the user's picture directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)' `XDG_PICTURES_DIR`.
 * - **macOS:** Resolves to `$HOME/Pictures`.
 * - **Windows:** Resolves to `{FOLDERID_Pictures}`.
 * @example
 * ```typescript
 * import { pictureDir } from '@tauri-apps/api/path';
 * const pictureDirPath = await pictureDir();
 * ```
 *
 * @since 1.0.0
 */
declare function pictureDir(): Promise<string>;
/**
 * Returns the path to the user's public directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)' `XDG_PUBLICSHARE_DIR`.
 * - **macOS:** Resolves to `$HOME/Public`.
 * - **Windows:** Resolves to `{FOLDERID_Public}`.
 * @example
 * ```typescript
 * import { publicDir } from '@tauri-apps/api/path';
 * const publicDirPath = await publicDir();
 * ```
 *
 * @since 1.0.0
 */
declare function publicDir(): Promise<string>;
/**
 * Returns the path to the application's resource directory.
 * To resolve a resource path, see the [[resolveResource | `resolveResource API`]].
 * @example
 * ```typescript
 * import { resourceDir } from '@tauri-apps/api/path';
 * const resourceDirPath = await resourceDir();
 * ```
 *
 * @since 1.0.0
 */
declare function resourceDir(): Promise<string>;
/**
 * Resolve the path to a resource file.
 * @example
 * ```typescript
 * import { resolveResource } from '@tauri-apps/api/path';
 * const resourcePath = await resolveResource('script.sh');
 * ```
 *
 * @param resourcePath The path to the resource.
 * Must follow the same syntax as defined in `tauri.conf.json > tauri > bundle > resources`, i.e. keeping subfolders and parent dir components (`../`).
 * @returns The full path to the resource.
 *
 * @since 1.0.0
 */
declare function resolveResource(resourcePath: string): Promise<string>;
/**
 * Returns the path to the user's runtime directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to `$XDG_RUNTIME_DIR`.
 * - **macOS:** Not supported.
 * - **Windows:** Not supported.
 * @example
 * ```typescript
 * import { runtimeDir } from '@tauri-apps/api/path';
 * const runtimeDirPath = await runtimeDir();
 * ```
 *
 * @since 1.0.0
 */
declare function runtimeDir(): Promise<string>;
/**
 * Returns the path to the user's template directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)' `XDG_TEMPLATES_DIR`.
 * - **macOS:** Not supported.
 * - **Windows:** Resolves to `{FOLDERID_Templates}`.
 * @example
 * ```typescript
 * import { templateDir } from '@tauri-apps/api/path';
 * const templateDirPath = await templateDir();
 * ```
 *
 * @since 1.0.0
 */
declare function templateDir(): Promise<string>;
/**
 * Returns the path to the user's video directory.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to [`xdg-user-dirs`](https://www.freedesktop.org/wiki/Software/xdg-user-dirs/)' `XDG_VIDEOS_DIR`.
 * - **macOS:** Resolves to `$HOME/Movies`.
 * - **Windows:** Resolves to `{FOLDERID_Videos}`.
 * @example
 * ```typescript
 * import { videoDir } from '@tauri-apps/api/path';
 * const videoDirPath = await videoDir();
 * ```
 *
 * @since 1.0.0
 */
declare function videoDir(): Promise<string>;
/**
 * Returns the path to the suggested log directory.
 *
 * @deprecated since 1.2.0: Will be removed in 2.0.0. Use {@link appLogDir} instead.
 * @since 1.0.0
 */
declare function logDir(): Promise<string>;
/**
 * Returns the path to the suggested directory for your app's log files.
 *
 * #### Platform-specific
 *
 * - **Linux:** Resolves to `${configDir}/${bundleIdentifier}/logs`.
 * - **macOS:** Resolves to `${homeDir}/Library/Logs/{bundleIdentifier}`
 * - **Windows:** Resolves to `${configDir}/${bundleIdentifier}/logs`.
 * @example
 * ```typescript
 * import { appLogDir } from '@tauri-apps/api/path';
 * const appLogDirPath = await appLogDir();
 * ```
 *
 * @since 1.2.0
 */
declare function appLogDir(): Promise<string>;
/**
 * Provides the platform-specific path segment separator:
 * - `\` on Windows
 * - `/` on POSIX
 *
 * @since 1.0.0
 */
declare const sep: string;
/**
 * Provides the platform-specific path segment delimiter:
 * - `;` on Windows
 * - `:` on POSIX
 *
 * @since 1.0.0
 */
declare const delimiter: string;
/**
 * Resolves a sequence of `paths` or `path` segments into an absolute path.
 * @example
 * ```typescript
 * import { resolve, appDataDir } from '@tauri-apps/api/path';
 * const appDataDirPath = await appDataDir();
 * const path = await resolve(appDataDirPath, '..', 'users', 'tauri', 'avatar.png');
 * ```
 *
 * @since 1.0.0
 */
declare function resolve(...paths: string[]): Promise<string>;
/**
 * Normalizes the given `path`, resolving `'..'` and `'.'` segments and resolve symbolic links.
 * @example
 * ```typescript
 * import { normalize, appDataDir } from '@tauri-apps/api/path';
 * const appDataDirPath = await appDataDir();
 * const path = await normalize(appDataDirPath, '..', 'users', 'tauri', 'avatar.png');
 * ```
 *
 * @since 1.0.0
 */
declare function normalize(path: string): Promise<string>;
/**
 *  Joins all given `path` segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.
 * @example
 * ```typescript
 * import { join, appDataDir } from '@tauri-apps/api/path';
 * const appDataDirPath = await appDataDir();
 * const path = await join(appDataDirPath, 'users', 'tauri', 'avatar.png');
 * ```
 *
 * @since 1.0.0
 */
declare function join(...paths: string[]): Promise<string>;
/**
 * Returns the directory name of a `path`. Trailing directory separators are ignored.
 * @example
 * ```typescript
 * import { dirname, appDataDir } from '@tauri-apps/api/path';
 * const appDataDirPath = await appDataDir();
 * const dir = await dirname(appDataDirPath);
 * ```
 *
 * @since 1.0.0
 */
declare function dirname(path: string): Promise<string>;
/**
 * Returns the extension of the `path`.
 * @example
 * ```typescript
 * import { extname, resolveResource } from '@tauri-apps/api/path';
 * const resourcePath = await resolveResource('app.conf');
 * const ext = await extname(resourcePath);
 * assert(ext === 'conf');
 * ```
 *
 * @since 1.0.0
 */
declare function extname(path: string): Promise<string>;
/**
 * Returns the last portion of a `path`. Trailing directory separators are ignored.
 * @example
 * ```typescript
 * import { basename, resolveResource } from '@tauri-apps/api/path';
 * const resourcePath = await resolveResource('app.conf');
 * const base = await basename(resourcePath);
 * assert(base === 'app.conf');
 * ```
 *
 * @param ext An optional file extension to be removed from the returned path.
 *
 * @since 1.0.0
 */
declare function basename(path: string, ext?: string): Promise<string>;
/**
 * Returns whether the path is absolute or not.
 * @example
 * ```typescript
 * import { isAbsolute } from '@tauri-apps/api/path';
 * assert(await isAbsolute('/home/tauri'));
 * ```
 *
 * @since 1.0.0
 */
declare function isAbsolute(path: string): Promise<boolean>;

declare const path_appDir: typeof appDir;
declare const path_appConfigDir: typeof appConfigDir;
declare const path_appDataDir: typeof appDataDir;
declare const path_appLocalDataDir: typeof appLocalDataDir;
declare const path_appCacheDir: typeof appCacheDir;
declare const path_appLogDir: typeof appLogDir;
declare const path_audioDir: typeof audioDir;
declare const path_cacheDir: typeof cacheDir;
declare const path_configDir: typeof configDir;
declare const path_dataDir: typeof dataDir;
declare const path_desktopDir: typeof desktopDir;
declare const path_documentDir: typeof documentDir;
declare const path_downloadDir: typeof downloadDir;
declare const path_executableDir: typeof executableDir;
declare const path_fontDir: typeof fontDir;
declare const path_homeDir: typeof homeDir;
declare const path_localDataDir: typeof localDataDir;
declare const path_pictureDir: typeof pictureDir;
declare const path_publicDir: typeof publicDir;
declare const path_resourceDir: typeof resourceDir;
declare const path_resolveResource: typeof resolveResource;
declare const path_runtimeDir: typeof runtimeDir;
declare const path_templateDir: typeof templateDir;
declare const path_videoDir: typeof videoDir;
declare const path_logDir: typeof logDir;
declare const path_BaseDirectory: typeof BaseDirectory;
declare const path_sep: typeof sep;
declare const path_delimiter: typeof delimiter;
declare const path_resolve: typeof resolve;
declare const path_normalize: typeof normalize;
declare const path_join: typeof join;
declare const path_dirname: typeof dirname;
declare const path_extname: typeof extname;
declare const path_basename: typeof basename;
declare const path_isAbsolute: typeof isAbsolute;
declare namespace path {
  export {
    path_appDir as appDir,
    path_appConfigDir as appConfigDir,
    path_appDataDir as appDataDir,
    path_appLocalDataDir as appLocalDataDir,
    path_appCacheDir as appCacheDir,
    path_appLogDir as appLogDir,
    path_audioDir as audioDir,
    path_cacheDir as cacheDir,
    path_configDir as configDir,
    path_dataDir as dataDir,
    path_desktopDir as desktopDir,
    path_documentDir as documentDir,
    path_downloadDir as downloadDir,
    path_executableDir as executableDir,
    path_fontDir as fontDir,
    path_homeDir as homeDir,
    path_localDataDir as localDataDir,
    path_pictureDir as pictureDir,
    path_publicDir as publicDir,
    path_resourceDir as resourceDir,
    path_resolveResource as resolveResource,
    path_runtimeDir as runtimeDir,
    path_templateDir as templateDir,
    path_videoDir as videoDir,
    path_logDir as logDir,
    path_BaseDirectory as BaseDirectory,
    path_sep as sep,
    path_delimiter as delimiter,
    path_resolve as resolve,
    path_normalize as normalize,
    path_join as join,
    path_dirname as dirname,
    path_extname as extname,
    path_basename as basename,
    path_isAbsolute as isAbsolute,
  };
}

export { sep as A, delimiter as B, resolve as C, normalize as D, join as E, dirname as F, extname as G, basename as H, isAbsolute as I, appDir as a, appConfigDir as b, appDataDir as c, appLocalDataDir as d, appCacheDir as e, appLogDir as f, audioDir as g, cacheDir as h, configDir as i, dataDir as j, desktopDir as k, documentDir as l, downloadDir as m, executableDir as n, fontDir as o, path as p, homeDir as q, localDataDir as r, pictureDir as s, publicDir as t, resourceDir as u, resolveResource as v, runtimeDir as w, templateDir as x, videoDir as y, logDir as z };