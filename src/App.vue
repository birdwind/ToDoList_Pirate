<template>
  <div class="to-do-list">
    <MenubarComponent style="flex-shrink: 0"></MenubarComponent>
    <AuthGuard>
      <router-view v-if="!isReload"></router-view>
    </AuthGuard>
  </div>
</template>

<style lang="scss">
@import "~@/assets/styles/Theme.scss";
</style>

<script lang="ts">
import { BaseVue } from "@/base/view/BaseVue";
import Component from "vue-class-component";
import { AuthGuard } from "@/components/AuthGuard";
import MenubarComponent from "@/components/Menubar/Menubar.component.vue";
import { MyLogger } from "@/base/utils/MyLogger";
import { Browser } from "@/base/utils/Browser";
import { State } from "vuex-class";

@Component({
  components: {
    AuthGuard,
    MenubarComponent,
  },
})
export default class App extends BaseVue {
  @State("ElementUI/isReload")
  private isReload!: boolean;

  private isReady = false;

  async mounted() {
    // wait vue to prepare the router...
    await this.$nextTick();
    try {
      const search = window.location.search;
      MyLogger.debug(`search: ${search}`);
      const query = Browser.getCurrentQueryString();

      // 一些共用資料先 load
      // await this.initApp();
      //
    } catch (error) {
      throw error;
    } finally {
      // fetch privileges, delay to improve ui experience
      this.isReady = true;
    }

    window.ipcRenderer.on("getCurrentUrl", (event, arg) => {
      const temp = location.href as string;
      window.ipcRenderer.send("currentUrl", temp);
    });
  }
}
</script>
