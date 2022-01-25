import { ToDoState } from "@/store/module/toDo/state";
import {
  TODO_ADD_CARD,
  TODO_ADD_TASK,
  TODO_ADD_WORK,
  TODO_DELETE_CARD,
  TODO_DELETE_TASK,
  TODO_DELETE_WORK,
  TODO_UPDATE_CARD_TITLE,
  TODO_UPDATE_FOCUS_WORK,
  TODO_UPDATE_WORK_LIST,
} from "@/store/mutationConstant";

export default {
  [TODO_UPDATE_FOCUS_WORK](state: ToDoState, data: any): void {
    state.focusWork = data;
  },
  [TODO_ADD_WORK](state: ToDoState, data: any): void {
    state.workList.push(data);
  },
  [TODO_UPDATE_WORK_LIST](state: ToDoState, data: any): void {},
  [TODO_DELETE_WORK](state: ToDoState, data: any): void {
    state.workList = state.workList.filter((item) => {
      return item.id !== data;
    });
  },
  [TODO_DELETE_CARD](state: ToDoState, data: any): void {
    state.workList[data.workIndex].cardList = state.workList[data.workIndex].cardList.filter((item) => {
      return item.id !== data.cardId;
    });
  },
  [TODO_DELETE_TASK](state: ToDoState, data: any): void {
    state.workList[data.workIndex].cardList[data.cardIndex].task = state.workList[data.workIndex].cardList[
      data.cardIndex
    ].task.filter((item) => {
      return item.id !== data.taskId;
    });
  },
  [TODO_ADD_CARD](state: ToDoState, data: any): void {
    state.workList[data.workIndex].cardList.push(data.toDoCard);
  },
  [TODO_UPDATE_CARD_TITLE](state: ToDoState, data: any): void {
    state.workList[data.workIndex].cardList[data.index].name = data.title;
  },
  [TODO_ADD_TASK](state: ToDoState, data: any): void {
    state.workList[data.workIndex].cardList[data.cardIndex].task.push(data.task);
  },
};
