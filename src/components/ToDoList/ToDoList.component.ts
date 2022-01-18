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
  cardList = [
    {
      id: "001",
      statusColor: "#f06d73",
      statusText: "普通",
      title: "測試",
      content: "這是測試資料",
    },
    {
      id: "002",
      statusColor: "#f06d73",
      statusText: "普通",
      title: "測試1",
      content: "這是測試資料",
    },
    {
      id: "003",
      statusColor: "#A6A6a6",
      statusText: "普通",
      title: "測試2",
      content: "這是測試資料",
    },
  ];

  @Prop()
  title!: "";

  handleChange() {
    MyLogger.log(this.activeNames);
  }
}
