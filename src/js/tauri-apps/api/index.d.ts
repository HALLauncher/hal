export { a as app } from './app-5190a154.js';
export { c as cli } from './cli-373e13ed.js';
export { c as clipboard } from './clipboard-79413165.js';
export { d as dialog } from './dialog-20ff401c.js';
export { e as event, w as window } from './event-41a9edf5.js';
export { f as fs } from './fs-6ad2a328.js';
export { g as globalShortcut } from './globalShortcut-003b7421.js';
export { h as http } from './http-43c39402.js';
export { n as notification } from './notification-6cd45c32.js';
export { p as path } from './path-c062430b.js';
export { p as process } from './process-63838be1.js';
export { s as shell } from './shell-efff51a2.js';
import { i as invoke$1 } from './tauri-605fa63e.js';
export { t as tauri } from './tauri-605fa63e.js';
export { u as updater } from './updater-f9814f36.js';
export { o as os } from './os-650909c3.js';

/**
 * The Tauri API allows you to interface with the backend layer.
 *
 * This module exposes all other modules as an object where the key is the module name, and the value is the module exports.
 * @example
 * ```typescript
 * import { app, dialog, event, fs, globalShortcut } from '@tauri-apps/api'
 * ```
 * @module
 */

/** @ignore */
declare const invoke: typeof invoke$1;

export { invoke };
