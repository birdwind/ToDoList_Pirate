import { TODO_ADD_CARD } from "@/store/mutationConstant";

export default {
  addCard(context: any, title: any) {
    // context.store.cardList.push({
    //   name: title,
    //   task: [],
    // });
    context.commit(TODO_ADD_CARD, title);
  },
};
