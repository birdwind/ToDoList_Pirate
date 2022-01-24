import { ToDoState } from "@/store/module/toDo/state";
import { ToDoWorkInterface } from "@/model/ToDoWork";
import { ToDoTaskInterface } from "@/model/ToDoTask";

export default {
  workList: (state: ToDoState): ToDoWorkInterface[] => state.workList,
  taskStatus: (state: ToDoState): ToDoTaskInterface[] => state.taskStatus,
};
