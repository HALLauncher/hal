/**
 * Options to send a notification.
 *
 * @since 1.0.0
 */
interface Options {
    /** Notification title. */
    title: string;
    /** Optional notification body. */
    body?: string;
    /** Optional notification icon. */
    icon?: string;
}
/** Possible permission values. */
type Permission = 'granted' | 'denied' | 'default';
/**
 * Checks if the permission to send notifications is granted.
 * @example
 * ```typescript
 * import { isPermissionGranted } from '@tauri-apps/api/notification';
 * const permissionGranted = await isPermissionGranted();
 * ```
 *
 * @since 1.0.0
 */
declare function isPermissionGranted(): Promise<boolean>;
/**
 * Requests the permission to send notifications.
 * @example
 * ```typescript
 * import { isPermissionGranted, requestPermission } from '@tauri-apps/api/notification';
 * let permissionGranted = await isPermissionGranted();
 * if (!permissionGranted) {
 *   const permission = await requestPermission();
 *   permissionGranted = permission === 'granted';
 * }
 * ```
 *
 * @returns A promise resolving to whether the user granted the permission or not.
 *
 * @since 1.0.0
 */
declare function requestPermission(): Promise<Permission>;
/**
 * Sends a notification to the user.
 * @example
 * ```typescript
 * import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';
 * let permissionGranted = await isPermissionGranted();
 * if (!permissionGranted) {
 *   const permission = await requestPermission();
 *   permissionGranted = permission === 'granted';
 * }
 * if (permissionGranted) {
 *   sendNotification('Tauri is awesome!');
 *   sendNotification({ title: 'TAURI', body: 'Tauri is awesome!' });
 * }
 * ```
 *
 * @since 1.0.0
 */
declare function sendNotification(options: Options | string): void;

type notification_Options = Options;
type notification_Permission = Permission;
declare const notification_sendNotification: typeof sendNotification;
declare const notification_requestPermission: typeof requestPermission;
declare const notification_isPermissionGranted: typeof isPermissionGranted;
declare namespace notification {
  export {
    notification_Options as Options,
    notification_Permission as Permission,
    notification_sendNotification as sendNotification,
    notification_requestPermission as requestPermission,
    notification_isPermissionGranted as isPermissionGranted,
  };
}

export { Options as O, Permission as P, isPermissionGranted as i, notification as n, requestPermission as r, sendNotification as s };