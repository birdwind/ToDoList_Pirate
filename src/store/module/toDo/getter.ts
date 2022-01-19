import { ToDoState } from "@/store/module/toDo/state";
import { ToDoCard } from "@/model/ToDoCard";

export default {
  cardList: (state: ToDoState): ToDoCard[] => state.cardList,
};
