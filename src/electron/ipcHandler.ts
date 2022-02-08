import { BrowserWindow, ipcMain } from "electron";
import { MyLogger } from "@/base/utils/MyLogger";

export function minimize() {
  ipcMain.on("minimize", () => {
    const win = BrowserWindow.getFocusedWindow();
    win?.minimize();
  });
}

export function maximize() {
  ipcMain.on("maximize", () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win?.isMaximized()) {
      win?.unmaximize();
    } else {
      win?.maximize();
    }
  });
}
export function close() {
  ipcMain.on("close", () => {
    const win = BrowserWindow.getFocusedWindow();
    win?.close();
  });
}

export function fullScreen() {
  ipcMain.on("fullScreen", () => {
    const win = BrowserWindow.getFocusedWindow();
    win?.setFullScreen(!win?.isFullScreen());
  });
}

export function currentUrl() {
  return new Promise((resolve, reject) => {
    ipcMain.on("currentUrl", (event, url: string) => {
      MyLogger.log("輸出", url);
      resolve(url);
    });
  });
}
