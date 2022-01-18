import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { MyLogger } from "@/base/utils/MyLogger";
import ToDoCardComponent from "@/components/ToDoCard/ToDoCard.component.vue";
import { Prop } from "vue-property-decorator";
import Vuedraggable from "vuedraggable";

@Component({
  components: {
    ToDoCardComponent,
    Vuedraggable,
  },
})
export default class ToDoListComponent extends BaseVue {
  activeNames = null;

  @Prop()
  title!: "";

  @Prop()
  taskList!: any[];

  get dragOptions() {
    return {
      animation: 200,
      group: "description",
      disabled: false,
      ghostClass: "ghost",
    };
  }

  handleChange() {
    MyLogger.log(this.activeNames);
  }

  handlerMove(evt: any, originalEvent: any) {
    MyLogger.log(evt);
  }
}
