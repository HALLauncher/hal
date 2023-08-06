const { invoke } = window.__TAURI__.tauri;
const { appWindow } = window.__TAURI__.window;

document.getElementById("exit_button").onclick = () => {
    invoke("exit");
}