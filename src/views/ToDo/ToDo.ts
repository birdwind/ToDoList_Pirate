import Component from "vue-class-component";
import ToDoCardComponent from "@/components/ToDoCard/ToDoCard.component.vue";
import { BaseVue } from "@/base/view/BaseVue";
import { MyLogger } from "@/base/utils/MyLogger";
import Vuedraggable from "vuedraggable";
import { Action, Getter } from "vuex-class";
import { AddCard, DeleteCard, UpdateCardList, UpdateFocusWork } from "@/store/types";
import { ToDoWorkInterface } from "@/model/ToDoWork";
import { Watch } from "vue-property-decorator";
import { ToDoCard } from "@/model/ToDoCard";

@Component({
  components: {
    ToDoCardComponent,
    Vuedraggable,
  },
})
export default class ToDo extends BaseVue {
  @Getter("ToDo/workList")
  private workList!: ToDoWorkInterface[];

  @Action("ToDo/addCard")
  addCard!: AddCard;

  @Action("ToDo/updateCardList")
  updateCardList!: UpdateCardList;

  @Action("ToDo/deleteCard")
  deleteCard!: DeleteCard;

  workId = "";

  $refs!: {
    card_name: any;
  };

  current = "";
  isShowAddCardNameArea = false;
  toDoCard: ToDoCard = new ToDoCard();

  mounted() {
    this.workId = this.$route.params.workId;
    this.registerRightMenuForCard();
  }

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
      this.toDoCard = new ToDoCard();
      this.isShowAddCardNameArea = true;
      this.$nextTick(() => {
        this.$refs.card_name.focus();
      });
    }
  }

  addCardToVuex() {
    if (this.toDoCard.name !== "") {
      this.addCard({
        workIndex: this.workPosition,
        toDoCard: this.toDoCard,
      });
      this.toDoCard = new ToDoCard();
    } else {
      this.isShowAddCardNameArea = false;
    }
  }

  registerRightMenuForCard() {
    this.$el.querySelectorAll(".card-drop-area .pirate-do-card").forEach((element) => {
      element.addEventListener(
        "contextmenu",
        (event) => {
          const rightMenuData = [
            {
              title: `刪除`,
              handler: this.handlerDeleteCard.bind(this, element),
            },
          ];
          this.$root.$emit("contextmenu", { event, rightMenuData });
        },
        false
      );
    });
  }

  handlerDeleteCard(element: Element) {
    MyLogger.log("temp");
    const currentCardId = element.getAttribute("card-id");
    this.deleteCard({
      workIndex: this.workPosition,
      cardId: currentCardId!,
    });
  }
}
