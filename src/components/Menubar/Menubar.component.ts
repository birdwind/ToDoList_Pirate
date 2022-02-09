import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { Getter } from "vuex-class";

@Component({})
export default class MenubarComponent extends BaseVue {
  @Getter("ToDo/focusWork")
  focusWork!: string;

  headerTitle = process.env.VUE_APP_AppName;

  private min() {
    window.ipcRenderer.send("minimize");
  }
  private max() {
    window.ipcRenderer.send("maximize");
  }
  private hideToTray() {
    window.ipcRenderer.send("hideToTray");
  }
}
