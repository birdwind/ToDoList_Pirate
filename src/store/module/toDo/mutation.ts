import { ToDoState } from "@/store/module/toDo/state";
import {
  TODO_ADD_CARD,
  TODO_ADD_TASK,
  TODO_ADD_WORK,
  TODO_UPDATE_CARD_TITLE,
  TODO_UPDATE_WORK_LIST,
} from "@/store/mutationConstant";
import { MyLogger } from "@/base/utils/MyLogger";

export default {
  [TODO_ADD_WORK](state: ToDoState, data: any): void {
    MyLogger.log(state.workList);
    state.workList.push(data);
  },
  [TODO_UPDATE_WORK_LIST](state: ToDoState, data: any): void {},
  [TODO_ADD_CARD](state: ToDoState, data: any): void {
    MyLogger.log(data);
    state.workList[data.workIndex].cardList.push({
      name: data.title,
      task: [],
    });
  },
  [TODO_UPDATE_CARD_TITLE](state: ToDoState, data: any): void {
    state.workList[data.workIndex].cardList[data.index].name = data.title;
  },
  [TODO_ADD_TASK](state: ToDoState, data: any): void {
    MyLogger.log(data);
    state.workList[data.workIndex].cardList[data.cardIndex].task.push(data.data);
  },
};
