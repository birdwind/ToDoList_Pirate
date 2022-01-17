import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";

@Component({})
export default class MenubarComponent extends BaseVue {
  headerTitle = process.env.VUE_APP_AppName;

  private min() {
    window.ipcRenderer.send("minimize");
  }
  private max() {
    window.ipcRenderer.send("maximize");
  }
  private close() {
    window.ipcRenderer.send("close");
  }
}
