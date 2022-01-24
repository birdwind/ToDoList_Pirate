import Component from "vue-class-component";
import ToDoWorkListComponent from "@/components/ToDoWorkList/ToDoWorkList.component.vue";
import { BaseVue } from "@/base/view/BaseVue";

@Component({
  components: {
    ToDoWorkListComponent,
  },
})
export default class Index extends BaseVue {
  copyRight = process.env.VUE_APP_CopyRight;

  // mounted() {
  //   this.routerLink("/home");
  // }
}
