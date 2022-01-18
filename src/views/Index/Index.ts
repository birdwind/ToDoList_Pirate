import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Index extends Vue {
  copyRight = process.env.VUE_APP_CopyRight;
}
