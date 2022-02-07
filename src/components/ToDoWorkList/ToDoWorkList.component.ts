import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { Action, Getter } from "vuex-class";
import { AddWork, DeleteWork, UpdateFocusWork, UpdateWorkList } from "@/store/types";
import { Watch } from "vue-property-decorator";
import { ToDoWork, ToDoWorkInterface } from "@/model/ToDoWork";
import { MyLogger } from "@/base/utils/MyLogger";
import Vuedraggable from "vuedraggable";

@Component({
  components: {
    Vuedraggable,
  },
})
export default class ToDoWorkListComponent extends BaseVue {
  $contextmenu: any;
  @Action("ToDo/updateFocusWork")
  updateFocusWork!: UpdateFocusWork;

  @Action("ToDo/addWork")
  addWork!: AddWork;

  @Action("ToDo/deleteWork")
  deleteWork!: DeleteWork;

  @Action("ToDo/updateWorkList")
  updateWorkList!: UpdateWorkList;

  @Getter("ToDo/workList")
  workList!: ToDoWorkInterface[];

  $refs!: {
    work_creator_input: any;
  };

  isShowRightMenu = false;
  isShowCreate = false;
  workCreator = new ToDoWork();

  mounted() {
    // this.$el.querySelectorAll(".el-avatar").forEach((element) => {
    //   element.addEventListener(
    //     "contextmenu",
    //     (event) => {
    //       const rightMenuData = [
    //         {
    //           title: `刪除`,
    //           handler: this.handlerDeleteWork.bind(this, element),
    //         },
    //       ];
    //       this.$root.$emit("contextmenu", { event, rightMenuData });
    //     },
    //     false
    //   );
    // });
  }

  @Watch("isShowCreate")
  watchIsShowCreate(after: boolean) {
    if (after) {
      this.$data.workCreator = new ToDoWork();
      this.$nextTick(() => {
        this.$refs.work_creator_input.focus();
      });
    }
  }

  get dragOptions() {
    return {
      animation: 200,
      group: "description",
      disabled: false,
      ghostClass: "ghost",
    };
  }

  handlerConfirmAddWork() {
    this.isShowCreate = false;
    this.addWork(this.workCreator);
    this.routerLink(`/todo/${this.workCreator.id}`);
  }

  handlerEndDrag() {
    this.updateWorkList();
  }

  handlerDeleteWork(workId: string) {
    this.updateFocusWork("首頁");
    this.deleteWork(workId);
  }

  onContextmenu(event: any) {
    this.$contextmenu({
      items: [
        {
          label: "刪除1",
          onClick: () => {
            this.handlerDeleteWork(event.path[0].getAttribute("workid"));
          },
        },
      ],
      event,
    });
  }
}
