import Component from "vue-class-component";
import ToDoListComponent from "@/components/ToDoList/ToDoList.component.vue";
import { BaseVue } from "@/base/view/BaseVue";
import { MyLogger } from "@/base/utils/MyLogger";
import Vuedraggable from "vuedraggable";
import { Action, Getter } from "vuex-class";
import { AddCard, UpdateCardList, UpdateTaskList, UpdateWorkList } from "@/store/types";
import { ToDoWorkInterface } from "@/model/ToDoWork";
import { Watch } from "vue-property-decorator";

@Component({
  components: {
    ToDoListComponent,
    Vuedraggable,
  },
})
export default class ToDo extends BaseVue {
  @Getter("ToDo/workList")
  private workList!: ToDoWorkInterface[];

  @Action("ToDo/addCard")
  private addCard!: AddCard;
  @Action("ToDo/updateCardList")
  updateCardList!: UpdateCardList;

  workId = "";

  $refs!: {
    card_name: any;
  };

  current = "";
  isShowAddCardNameArea = false;
  newCardName = "";

  @Watch("$route.params.workId")
  watchWorkID(after: string) {
    try {
      if (this.workId !== after) {
        this.$data.workId = this.$route.params.workId;
        this.$data.isShowAddCardNameArea = false;
      }
    } catch (err) {
      MyLogger.log("FUCK", err);
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

  get cardList() {
    return this.workList[this.workPosition].cardList;
  }

  get workPosition() {
    let position = 0;
    this.workList.forEach((item, index) => {
      if (item.id === this.workId) {
        position = index;
        return;
      }
    });
    return position;
  }

  handlerMove(evt: any, originalEvent: any) {
    MyLogger.log(evt);
  }

  handlerEndDrag() {
    this.updateCardList();
  }

  createCard() {
    if (!this.isShowAddCardNameArea) {
      this.newCardName = "";
      this.isShowAddCardNameArea = true;
      this.$nextTick(() => {
        this.$refs.card_name.focus();
      });
    }
  }

  addCardToVuex() {
    if (this.newCardName !== "") {
      this.addCard({
        workIndex: this.workPosition,
        title: this.newCardName,
      });
      this.newCardName = "";
    } else {
      this.isShowAddCardNameArea = false;
    }
  }
}
