import { listen } from './tauri-apps/api/event.js';

listen("set_status", (e) => {
    document.querySelector(".status_text").textContent = e.payload;
});