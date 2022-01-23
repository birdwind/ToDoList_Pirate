import { ToDoState } from "@/store/module/toDo/state";
import { TODO_ADD_CARD, TODO_ADD_TASK, TODO_UPDATE_CARD_TITLE, TODO_UPDATE_TASK_LIST } from "@/store/mutationConstant";
import { MyLogger } from "@/base/utils/MyLogger";

export default {
  [TODO_ADD_CARD](state: ToDoState, title: string): void {
    state.cardList.push({
      name: title,
      task: [],
    });
  },
  [TODO_UPDATE_CARD_TITLE](state: ToDoState, data: any): void {
    state.cardList[data.index].name = data.title;
  },
  [TODO_UPDATE_TASK_LIST](state: ToDoState, data: any): void {},
  [TODO_ADD_TASK](state: ToDoState, data: any): void {
    MyLogger.log(data);
    MyLogger.log(state.cardList[data.cardIndex]);
    state.cardList[data.cardIndex].task.push(data.data);
  },
};
