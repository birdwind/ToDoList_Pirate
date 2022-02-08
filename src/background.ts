// @ts-nocheck
"use strict";

import { app, protocol, BrowserWindow, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import * as path from "path";
import { close, currentUrl, maximize, minimize } from "@/electron/ipcHandler";
import { registerShortcut } from "@/electron/shortcutHandler";
import { MyLogger } from "@/base/utils/MyLogger";
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: "app", privileges: { secure: true, standard: true } }]);

async function createWindow() {
  // Create the browser window.
  const electron = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    frame: false,
    show: false,
    titleBarOverlay: true,
    webPreferences: {
      // devTools: false,
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION as unknown as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, "preload.js"), // 指定preload.js脚本
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await electron.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) {
      electron.webContents.openDevTools();
    }
    electron.once("ready-to-show", () => {
      electron.show();
    });
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    electron.loadURL("app://./index.html");
  }
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
      registerShortcut("CommandOrControl+F1", async () => {
        const mainWindow = BrowserWindow.getAllWindows()[0];
        const mainContent = mainWindow.webContents;
        if (mainContent) {
          mainContent.send("getCurrentUrl");
        }
      });
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

minimize();
maximize();
close();

currentUrl().then(async (urlString: string) => {
  MyLogger.log(urlString);
  const child = new BrowserWindow({
    parent: BrowserWindow.getAllWindows()[0],
    width: 400,
    height: 300,
    minWidth: 400,
    frame: false,
    titleBarOverlay: true,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION as unknown as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, "preload.js"), // 指定preload.js脚本
    },
  });
  await child.loadURL(urlString);
  child.webContents.openDevTools();
});
