import { globalShortcut } from "electron";
import { MyLogger } from "@/base/utils/MyLogger";

export function registerShortcut(shortcutKey: string, action: AnyAsyncAction) {
  if (!globalShortcut.register(shortcutKey, action)) {
    MyLogger.log("快捷鍵註冊失敗", shortcutKey);
  }
}
