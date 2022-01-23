import { TODO_ADD_CARD, TODO_ADD_TASK, TODO_UPDATE_CARD_TITLE, TODO_UPDATE_TASK_LIST } from "@/store/mutationConstant";

export default {
  addCard(context: any, title: any) {
    context.commit(TODO_ADD_CARD, title);
  },
  updateCardTitle(context: any, card: any) {
    context.commit(TODO_UPDATE_CARD_TITLE, card);
  },
  updateTaskList(context: any, data: any) {
    context.commit(TODO_UPDATE_TASK_LIST, data);
  },
  addTask(context: any, data: any) {
    context.commit(TODO_ADD_TASK, data);
  },
};
