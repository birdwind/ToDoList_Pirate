import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { Action, Getter } from "vuex-class";
import { AddWork, UpdateWorkList } from "@/store/types";
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
  @Action("ToDo/addWork")
  addWork!: AddWork;

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

  rightMenuObj = {
    text: ["查看資料", "移除"],
  };

  @Watch("isShowCreate")
  watchIsShowCreate(after: boolean) {
    if (after) {
      this.$data.workCreator = new ToDoWork();
      // this.$nextTick(() => {
      //   this.$refs.work_creator_input.focus();
      // });
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

  get rightMenuBody() {
    return document.body;
  }

  handlerConfirmAddWork() {
    this.isShowCreate = false;
    this.addWork(this.workCreator);
  }

  handlerMove(evt: any, originalEvent: any) {
    MyLogger.log(evt);
  }

  handlerEndDrag() {
    this.updateWorkList();
  }

  get temp() {
    return {
      this: this,
      text: ["測試1", "測試2", "測試3", "測試4", "測試5", "測試6", "測試5", "測試6"],
      handler: {
        test1() {
          MyLogger.log("test1");
        },
        test2() {
          MyLogger.log("test2");
        },
        test3() {
          MyLogger.log("test3");
        },
        test4() {
          MyLogger.log("test4");
        },
        test5() {
          MyLogger.log("test5");
        },
        test6() {
          MyLogger.log("test6");
        },
        test7() {
          MyLogger.log("test7");
        },
        test8() {
          MyLogger.log("test8");
        },
      },
    };
  }
}
