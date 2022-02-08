import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

window.ipcRenderer = ipcRenderer;
