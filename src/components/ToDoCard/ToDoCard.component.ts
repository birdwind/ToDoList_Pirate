import Component from "vue-class-component";
import { BaseVue } from "@/base/view/BaseVue";
import { Prop } from "vue-property-decorator";

@Component({})
export default class ToDoCardComponent extends BaseVue {
  @Prop()
  id!: "";
  @Prop()
  statusColor!: "";
  @Prop()
  statusText!: "";
  @Prop()
  title!: "";
  @Prop()
  content!: "";
}
