import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { Getter } from "vuex-class";

@Component({})
export default class MenubarComponent extends BaseVue {
  @Getter("ToDo/focusWork")
  focusWork!: string;

  headerTitle = process.env.VUE_APP_AppName;

  mounted() {
    window.ipcRenderer.on("closeHaveChild", (event, args) => {
      this.$confirm(`<div>目前還有其他視窗開啟中，是否關閉其他視窗?</div>`, {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        customClass: "pirate-message",
        cancelButtonClass: "pirate-message-cancel",
        confirmButtonClass: "pirate-message-confirm",
        closeOnClickModal: false,
      })
        .then(async () => {
          window.ipcRenderer.send("closeChild");
        })
        .catch((action) => {
          if (action === "cancel") {
          }
        });
    });
  }

  private min() {
    window.ipcRenderer.send("minimize");
  }
  private max() {
    window.ipcRenderer.send("maximize");
  }
  private hideToTray() {
    window.ipcRenderer.send("closeHide");
  }
}
