import Component from "vue-class-component";
import ToDoListComponent from "@/components/ToDoList/ToDoList.component.vue";
import { BaseVue } from "@/base/view/BaseVue";
import { MyLogger } from "@/base/utils/MyLogger";
import Vuedraggable from "vuedraggable";
import { Action, Getter, State } from "vuex-class";
import { ToDoCard } from "@/model/ToDoCard";
import { AddCard } from "@/store/types";

@Component({
  components: {
    ToDoListComponent,
    Vuedraggable,
  },
})
export default class ToDo extends BaseVue {
  $refs!: {
    card_name: any;
  };
  @Getter("ToDo/cardList")
  private cardList!: ToDoCard[];

  @Action("ToDo/addCard")
  private addCard!: AddCard;

  current = "";
  isShowAddCardNameArea = false;
  newCardName = "";

  get dragOptions() {
    return {
      animation: 200,
      group: "description",
      disabled: false,
      ghostClass: "ghost",
    };
  }

  handlerMove(evt: any, originalEvent: any) {
    MyLogger.log(evt);
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
      this.addCard(this.newCardName);
      this.newCardName = "";
    } else {
      this.isShowAddCardNameArea = false;
    }
  }
}
