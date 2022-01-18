import Component from "vue-class-component";
import ToDoListComponent from "@/components/ToDoList/ToDoList.component.vue";
import { BaseVue } from "@/base/view/BaseVue";

@Component({
  components: {
    ToDoListComponent,
  },
})
export default class ToDo extends BaseVue {
  taskList = [
    {
      name: "待辦",
    },
    {
      name: "進行中",
    },
    {
      name: "已完成",
    },
  ];
  current = "";
}
