import { ToDoState } from "@/store/module/toDo/state";
import { ToDoCardInterface } from "@/model/ToDoCard";

export default {
  cardList: (state: ToDoState): ToDoCardInterface[] => state.cardList,
  taskStatus: (state: ToDoState): ToDoCardInterface[] => state.taskStatus,
};
