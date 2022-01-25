import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { MyLogger } from "@/base/utils/MyLogger";
import ToDoTaskComponent from "@/components/ToDoTask/ToDoTask.component.vue";
import { Prop } from "vue-property-decorator";
import Vuedraggable from "vuedraggable";
import { Action } from "vuex-class";
import { DeleteTask, UpdateCardTitle, UpdateTaskList } from "@/store/types";
import { StringUtility } from "@/base/utils/StringUtility";

@Component({
  components: {
    ToDoTaskComponent,
    Vuedraggable,
  },
})
export default class ToDoCardComponent extends BaseVue {
  @Action("ToDo/updateCardTitle")
  updateCardTitle!: UpdateCardTitle;

  @Action("ToDo/updateTaskList")
  updateTaskList!: UpdateTaskList;

  @Action("ToDo/deleteTask")
  deleteTask!: DeleteTask;

  @Prop()
  workIndex!: number;

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

  mounted() {
    this.$el.querySelectorAll(".task-drop-area .to-do-task").forEach((element) => {
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
      this.updateCardTitle({
        workIndex: this.workIndex,
        title: this.titleEditInput,
        index: this.cardIndex,
      });
    }
  }

  /**
   * Card 相關
   */

  /**
   * Task 相關
   */

  showNewTaskArea() {
    this.isShowTaskEdit = true;
  }

  handlerMove(evt: any, originalEvent: any) {
    this.cardDropFromCardIndex = evt.from.parentElement.dataset.index;
    this.cardDropToCardIndex = evt.to.parentElement.dataset.index;
    this.cardDropToCardList = evt.relatedContext.list;
    this.cardDropElement = evt.draggedContext.element;
  }

  handlerEndDrag() {
    this.updateTaskList();
  }

  handlerCardEdited() {
    this.isShowTaskEdit = false;
  }

  handlerDeleteCard(element: Element) {
    const currentCardId = element.getAttribute("card-id");
    this.deleteTask({
      workIndex: this.workIndex,
      cardIndex: this.cardIndex,
      taskId: "",
    });
  }
}
