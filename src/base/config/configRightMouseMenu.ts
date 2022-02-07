import Vue from "vue";
// import rightMenu from "vue-right-click-menu";
import VueContextMenu from "@xunlei/vue-context-menu";
import Contextmenu from "vue-contextmenujs";

export function configRightMouseMenu() {
  Vue.use(Contextmenu);
  // Vue.use(rightMenu);
  Vue.use(VueContextMenu);
}
