import { ToDoState } from "@/store/module/toDo/state";
import { TODO_ADD_CARD } from "@/store/mutationConstant";

export default {
  [TODO_ADD_CARD](state: ToDoState, title: string): void {
    state.cardList.push({
      name: title,
      task: [],
    });
  },
};
