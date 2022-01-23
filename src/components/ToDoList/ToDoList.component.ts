import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { MyLogger } from "@/base/utils/MyLogger";
import ToDoCardComponent from "@/components/ToDoCard/ToDoCard.component.vue";
import { Prop } from "vue-property-decorator";
import Vuedraggable from "vuedraggable";
import { Action } from "vuex-class";
import { UpdateCardTitle, UpdateTaskList } from "@/store/types";
import { StringUtility } from "@/base/utils/StringUtility";

@Component({
  components: {
    ToDoCardComponent,
    Vuedraggable,
  },
})
export default class ToDoListComponent extends BaseVue {
  @Action("ToDo/updateCardTitle")
  updateCardTitle!: UpdateCardTitle;

  @Action("ToDo/updateTaskList")
  updateTaskList!: UpdateTaskList;

  @Prop()
  title!: "";

  @Prop()
  cardIndex!: -1;

  @Prop()
  taskList!: any[];

  $refs!: {
    title_input: any;
  };

  activeNames = null;

  isShowCardEdit = false;
  titleEditInput = "";
  cardDropFromCardIndex = -1;
  cardDropToCardIndex = -1;
  cardDropToCardList = Array();
  cardDropElement = null;

  isShowTaskEdit = false;

  get dragOptions() {
    return {
      animation: 200,
      group: "description",
      disabled: false,
      ghostClass: "ghost",
    };
  }

  /**
   * Card 相關
   */
  handlerFocusHeader() {
    this.isShowCardEdit = true;
    this.$nextTick(() => {
      this.$refs.title_input.focus();
    });
  }

  updateTitleToVuex() {
    this.isShowCardEdit = false;
    if (!StringUtility.isNullOrEmpty(this.titleEditInput)) {
      this.updateCardTitle({ title: this.titleEditInput, index: this.cardIndex });
    }
  }

  /**
   * Card 相關
   */

  /**
   * Task 相關
   */

  addCard() {
    this.isShowTaskEdit = true;
  }

  handlerMove(evt: any, originalEvent: any) {
    this.cardDropFromCardIndex = evt.from.parentElement.dataset.index;
    this.cardDropToCardIndex = evt.to.parentElement.dataset.index;
    this.cardDropToCardList = evt.relatedContext.list;
    this.cardDropElement = evt.draggedContext.element;
  }

  handlerEndDrag() {
    this.updateTaskList({
      taskContent: this.cardDropElement,
      cardFromIndex: this.cardDropFromCardIndex,
      cardToIndex: this.cardDropToCardIndex,
      taskList: this.cardDropToCardList,
    });
  }

  handlerCardEdited() {
    this.isShowTaskEdit = false;
  }

  // handleChange() {
  //   MyLogger.log(this.activeNames);
  // }
}
