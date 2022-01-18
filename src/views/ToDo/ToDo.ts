import Component from "vue-class-component";
import ToDoListComponent from "@/components/ToDoList/ToDoList.component.vue";
import { BaseVue } from "@/base/view/BaseVue";
import { MyLogger } from "@/base/utils/MyLogger";
import Vuedraggable from "vuedraggable";
import {Getter, State} from "vuex-class";
import { ToDoCard } from "@/model/ToDoCard";

@Component({
  components: {
    ToDoListComponent,
    Vuedraggable,
  },
})
export default class ToDo extends BaseVue {
  @Getter("ToDo/cardList")
  private cardList!: ToDoCard[];

  current = "";

  get dragOptions() {
    return {
      animation: 200,
      group: "description",
      disabled: false,
      ghostClass: "ghost",
    };
  }

  handlerMove(evt: any, originalEvent: any) {
    MyLogger.log(evt);
  }
}
