type Platform = 'linux' | 'darwin' | 'ios' | 'freebsd' | 'dragonfly' | 'netbsd' | 'openbsd' | 'solaris' | 'android' | 'win32';
type OsType = 'Linux' | 'Darwin' | 'Windows_NT';
type Arch = 'x86' | 'x86_64' | 'arm' | 'aarch64' | 'mips' | 'mips64' | 'powerpc' | 'powerpc64' | 'riscv64' | 's390x' | 'sparc64';
/**
 * The operating system-specific end-of-line marker.
 * - `\n` on POSIX
 * - `\r\n` on Windows
 *
 * @since 1.0.0
 * */
declare const EOL: string;
/**
 * Returns a string identifying the operating system platform.
 * The value is set at compile time. Possible values are `'linux'`, `'darwin'`, `'ios'`, `'freebsd'`, `'dragonfly'`, `'netbsd'`, `'openbsd'`, `'solaris'`, `'android'`, `'win32'`
 * @example
 * ```typescript
 * import { platform } from '@tauri-apps/api/os';
 * const platformName = await platform();
 * ```
 *
 * @since 1.0.0
 *
 */
declare function platform(): Promise<Platform>;
/**
 * Returns a string identifying the kernel version.
 * @example
 * ```typescript
 * import { version } from '@tauri-apps/api/os';
 * const osVersion = await version();
 * ```
 *
 * @since 1.0.0
 */
declare function version(): Promise<string>;
/**
 * Returns `'Linux'` on Linux, `'Darwin'` on macOS, and `'Windows_NT'` on Windows.
 * @example
 * ```typescript
 * import { type } from '@tauri-apps/api/os';
 * const osType = await type();
 * ```
 *
 * @since 1.0.0
 */
declare function type(): Promise<OsType>;
/**
 * Returns the operating system CPU architecture for which the tauri app was compiled.
 * Possible values are `'x86'`, `'x86_64'`, `'arm'`, `'aarch64'`, `'mips'`, `'mips64'`, `'powerpc'`, `'powerpc64'`, `'riscv64'`, `'s390x'`, `'sparc64'`.
 * @example
 * ```typescript
 * import { arch } from '@tauri-apps/api/os';
 * const archName = await arch();
 * ```
 *
 * @since 1.0.0
 */
declare function arch(): Promise<Arch>;
/**
 * Returns the operating system's default directory for temporary files as a string.
 * @example
 * ```typescript
 * import { tempdir } from '@tauri-apps/api/os';
 * const tempdirPath = await tempdir();
 * ```
 *
 * @since 1.0.0
 */
declare function tempdir(): Promise<string>;
/**
 * Returns a String with a `BCP-47` language tag inside. If the locale couldn’t be obtained, `null` is returned instead.
 * @example
 * ```typescript
 * import { locale } from '@tauri-apps/api/os';
 * const locale = await locale();
 * if (locale) {
 *    // use the locale string here
 * }
 * ```
 *
 * @since 1.3.0
 */
declare function locale(): Promise<string | null>;

declare const os_EOL: typeof EOL;
declare const os_platform: typeof platform;
declare const os_version: typeof version;
declare const os_type: typeof type;
declare const os_arch: typeof arch;
declare const os_tempdir: typeof tempdir;
declare const os_locale: typeof locale;
type os_Platform = Platform;
type os_OsType = OsType;
type os_Arch = Arch;
declare namespace os {
  export {
    os_EOL as EOL,
    os_platform as platform,
    os_version as version,
    os_type as type,
    os_arch as arch,
    os_tempdir as tempdir,
    os_locale as locale,
    os_Platform as Platform,
    os_OsType as OsType,
    os_Arch as Arch,
  };
}

export { Arch as A, EOL as E, OsType as O, Platform as P, arch as a, tempdir as b, locale as l, os as o, platform as p, type as t, version as v };