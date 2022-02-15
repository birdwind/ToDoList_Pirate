// @ts-nocheck
"use strict";

import { app, protocol, BrowserWindow, Tray, nativeImage, Menu, Notification, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import * as path from "path";
import { close, hideToTray, maximize, minimize } from "@/electron/ipcHandler";
import ElectronStore from "electron-store";
import { MyLogger } from "@/base/utils/MyLogger";
import { registerShortcut } from "@/electron/shortcutHandler";

const isDevelopment = process.env.NODE_ENV !== "production";
const appName = process.env.VUE_APP_Title;
const iconPath = path.join(__static, "images", "icon_logo.png");

const icon = nativeImage.createFromPath(iconPath);

const local = new ElectronStore({
  accessPropertiesByDotNotation: false,
});
const isMac = process.platform === "darwin";

let mainWindowId: any;
let tray = null;

const width = 800;
const height = 600;
const BrowserWindowMap = new Map<number, BrowserWindow>();

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: "app", privileges: { secure: true, standard: true } }]);

app.on("ready", async () => {
  await setup();
});

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

app.setAppUserModelId(appName);

function baseUrl() {
  if (isDevelopment) {
    return process.env.WEBPACK_DEV_SERVER_URL as string;
  } else {
    return `app://./index.html`;
  }
}

async function setup() {
  ElectronStore.initRenderer();
  await installDevTools();
  await createWindow();
  await createTray();
  shortcut();
  ipcMainHandler();
  createNotification("測試標題", "測試副標題", "測試內容");
}

async function createWindow() {
  const mainWindowIcon = icon.resize({
    width: 64,
    height: 64,
  });

  const browserWindow = new BrowserWindow({
    width: width,
    height: height,
    icon: mainWindowIcon,
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
    if (!process.env.IS_TEST) {
      browserWindow.webContents.openDevTools();
    }
  } else {
    createProtocol("app");
  }

  await browserWindow.loadURL(baseUrl());
  browserWindow.setMenu(null);

  browserWindow.once("ready-to-show", () => {
    browserWindow.setMinimumSize(width, height);
    browserWindow.show();
  });

  BrowserWindowMap.set(browserWindow.id, browserWindow);
  mainWindowId = browserWindow.id;
}

async function createChildWindow(
  width: number,
  height: number,
  parentWindow: any = null,
  url: string = BrowserWindowMap.get(mainWindowId).webContents.getURL()
) {
  const child = new BrowserWindow({
    parent: parentWindow,
    width: width,
    height: height,
    frame: false,
    titleBarOverlay: true,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION as unknown as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, "preload.js"), // 指定preload.js脚本
    },
  });

  await child.loadURL(url);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    if (!process.env.IS_TEST) {
      child.webContents.openDevTools();
    }
  }

  BrowserWindowMap.set(child.id, child);
}

async function createTray() {
  const mainWindow = BrowserWindowMap.get(mainWindowId);
  const trayIcon = icon.resize({
    width: 16,
    height: 16,
  });
  tray = new Tray(trayIcon);
  await setTrayMenu();
  tray.setToolTip(appName);
  tray.on("double-click", async () => {
    if (mainWindow && !mainWindow.isVisible()) {
      mainWindow.restore();
      mainWindow.show();
      await setTrayMenu();
    }
  });
}

async function showMainWindow() {
  BrowserWindowMap.get(mainWindowId).show();
  await setTrayMenu();
}

async function hideMainWindow() {
  BrowserWindowMap.get(mainWindowId).hide();
  await setTrayMenu();
}

async function exitMainWindow() {
  app.quit();
}

async function setTrayMenu() {
  const showHideText = BrowserWindowMap.get(mainWindowId).isVisible() ? "隱藏" : "顯示";
  const menu = Menu.buildFromTemplate([
    {
      label: showHideText,
      click: () => {
        if (BrowserWindowMap.get(mainWindowId).isVisible()) {
          hideMainWindow();
        } else {
          showMainWindow();
        }
      },
    },
    {
      label: "離開",
      click: () => {
        exitMainWindow();
      },
    },
  ]);

  tray.setContextMenu(menu);

  if (isMac) {
    app.dock.setMenu(menu);
  }
}

function createNotification(title: string, subTitle: string, contnet: string) {
  const notificationIcon = icon.resize({
    width: 64,
    height: 64,
  });
  const notification = new Notification({
    title: title,
    subtitle: subTitle, //macOS only
    body: contnet,
    silent: true,
    icon: notificationIcon,
    timeoutType: "default",
  });

  notification.show();

  return notification;
}

function shortcut() {
  registerShortcut("CommandOrControl+F1", async () => {
    createChildWindow(width, height, BrowserWindowMap.get(mainWindowId));
  });
}

async function installDevTools() {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      MyLogger.log("Vue開發插件安裝失敗", e.toString());
    }
  }
}

function ipcMainHandler() {
  ipcMain.on("minimize", () => {
    const win = BrowserWindow.getFocusedWindow();
    win?.minimize();
  });

  ipcMain.on("maximize", () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win?.isMaximized()) {
      win?.unmaximize();
    } else {
      win?.maximize();
    }
  });

  ipcMain.on("closeHide", () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win?.id === mainWindowId) {
      if (BrowserWindowMap.size > 1) {
        MyLogger.log("大於1");
        win?.hide();
        setTrayMenu();
      } else {
        MyLogger.log("小於等於1");
      }
    } else {
      BrowserWindowMap.delete(win?.id);
      win?.close();
    }
  });

  ipcMain.on("fullScreen", () => {
    const win = BrowserWindow.getFocusedWindow();
    win?.setFullScreen(!win?.isFullScreen());
  });

  ipcMain.on("currentUrl", (event, url: string) => {
    MyLogger.log("輸出", url);
  });
}

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
