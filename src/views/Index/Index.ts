import Component from "vue-class-component";
import ToDoWorkListComponent from "@/components/ToDoWorkList/ToDoWorkList.component.vue";
import { BaseVue } from "@/base/view/BaseVue";
import { Action, Getter } from "vuex-class";
import { UpdateFocusWork } from "@/store/types";
import { Watch } from "vue-property-decorator";
import { ToDoWorkInterface } from "@/model/ToDoWork";

@Component({
  components: {
    ToDoWorkListComponent,
  },
})
export default class Index extends BaseVue {
  @Getter("ToDo/workList")
  private workList!: ToDoWorkInterface[];

  @Action("ToDo/updateFocusWork")
  updateFocusWork!: UpdateFocusWork;

  copyRight = process.env.VUE_APP_CopyRight;
  workId = "";

  mounted() {
    this.workId = this.$route.params.workId;
    this.updateFocusWork("首頁");
  }

  @Watch("$route.params.workId")
  watchWorkID(after: string) {
    if (this.workId !== after) {
      this.$data.workId = this.$route.params.workId;
      let isHome = true;
      this.workList.forEach((item, index) => {
        if (item.id === this.workId) {
          isHome = false;
          this.updateFocusWork(item.name);
          return;
        }
      });
      if (isHome) {
        this.updateFocusWork("首頁");
      }
    }
  }
}
