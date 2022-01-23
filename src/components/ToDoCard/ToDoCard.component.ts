import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { Emit, Prop, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { ToDoTask, ToDoTaskInterface } from "@/model/ToDoTask";
import { AddTask } from "@/store/types";

@Component({})
export default class ToDoCardComponent extends BaseVue {
  @Prop()
  cardIndex!: number;
  @Prop()
  toDoTask!: ToDoTaskInterface;
  @Prop()
  isCreat!: boolean;

  @Getter("ToDo/taskStatus")
  taskStatus!: any[];

  @Action("ToDo/addTask")
  addTask!: AddTask;

  isEdit = false;
  toDoTaskAddItem!: ToDoTaskInterface;
  status = "";

  created() {
    if (this.isCreat) {
      this.toDoTaskAddItem = new ToDoTask();
    } else {
      this.status = this.toDoTask.statusText;
    }
  }

  get toDoTaskItem() {
    if (this.isCreat) {
      return this.toDoTaskAddItem;
    }
    return this.toDoTask;
  }

  handlerStatusChanged(data: any) {
    if (this.isCreat) {
      this.toDoTaskAddItem.statusColor = this.taskStatus[data].color;
      this.toDoTaskAddItem.statusText = this.taskStatus[data].value;
    } else {
      this.toDoTask.statusColor = this.taskStatus[data].color;
      this.toDoTask.statusText = this.taskStatus[data].value;
    }
  }

  @Emit("handlerCardEdited")
  handlerCardEdited() {
    return true;
  }

  handlerCancel() {
    if (this.isCreat) {
      this.handlerCardEdited();
    } else {
      this.isEdit = false;
    }
  }

  handlerConfirm() {
    this.addTask({
      cardIndex: this.cardIndex,
      data: this.toDoTask ? this.toDoTask : this.toDoTaskAddItem,
    });
    this.handlerCardEdited();
  }
}
