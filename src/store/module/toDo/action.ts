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
  updateFocusWork(context: any, data: any) {
    context.commit(TODO_UPDATE_FOCUS_WORK, data);
  },
  addWork(context: any, data: any) {
    context.commit(TODO_ADD_WORK, data);
  },
  addCard(context: any, data: any) {
    context.commit(TODO_ADD_CARD, data);
  },
  deleteWork(context: any, data: any) {
    context.commit(TODO_DELETE_WORK, data);
  },
  deleteCard(context: any, data: any) {
    context.commit(TODO_DELETE_CARD, data);
  },
  deleteTask(context: any, data: any) {
    context.commit(TODO_DELETE_TASK, data);
  },
  updateCardTitle(context: any, data: any) {
    context.commit(TODO_UPDATE_CARD_TITLE, data);
  },
  updateWorkList(context: any, data: any) {
    context.commit(TODO_UPDATE_WORK_LIST, data);
  },
  updateCardList(context: any, data: any) {
    context.commit(TODO_UPDATE_WORK_LIST, data);
  },
  updateTaskList(context: any, data: any) {
    context.commit(TODO_UPDATE_WORK_LIST, data);
  },
  addTask(context: any, data: any) {
    context.commit(TODO_ADD_TASK, data);
  },
};
