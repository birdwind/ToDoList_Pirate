import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Index extends Vue {
  items = [
    { title: "Home", icon: "mdi-view-dashboard" },
    { title: "About", icon: "mdi-forum" },
  ];
  links = ["Home", "Contacts", "Settings"];
  mini = true;
  drawer = null;
  copyRight = process.env.VUE_APP_CopyRight;
}
