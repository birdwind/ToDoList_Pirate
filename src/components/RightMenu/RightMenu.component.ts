import Vue from "vue";
import Component from "vue-class-component";
import { MyLogger } from "@/base/utils/MyLogger";
import { Watch } from "vue-property-decorator";

@Component({
  name: "RightMenuComponent",
})
export default class RightMenuComponent extends Vue {
  style: any = null;
  rightMenuData: any = null;
  rightMenuRect: any = null;

  mounted() {
    this.$root.$on("contextmenu", (data: any) => {
      if (data === null) {
        this.resetCtx();
      } else {
        this.onContextMenu(data.event, data.rightMenuData);
      }
    });
  }

  beforeDestroy() {
    this.$root.$off("contextmenu", () => {});
  }

  resetCtx() {
    this.rightMenuData = null;
    this.rightMenuRect = null;
  }

  onContextMenu(ev: any, rightMenuData: any) {
    // prevent default behaviours
    ev.preventDefault();
    ev.stopPropagation();
    this.rightMenuData = rightMenuData;
    this.rightMenuRect = {
      x: ev.x,
      y: ev.y,
    };
    // populate the option
    this.onData();
    // then reevaluate and set context-menu position
    this.reevaluatePosition();
  }

  async reevaluatePosition() {
    if (this.rightMenuRect) {
      // using $nextTick to daley and make sure that the context-menu
      // options are fully rendered which will help us
      // to get the accurate height
      await this.$nextTick();
      await this.$nextTick();

      let { x, y } = this.rightMenuRect;
      // get the window current inner height and width
      const { innerHeight, innerWidth } = window;
      // get the component height and width through element.getClientRects
      const { height, width } = this.$el.getClientRects()[0];
      // then subtract window inner height and width with
      // context-menu event source points (x, y)
      const dY = innerHeight - y;
      const dX = innerWidth - x;
      // check if the context-menu height is not
      // longer than the available
      if (dY < height) {
        y = y - height;
      }
      if (dX < width) {
        x = x - width;
      }
      // set the position
      this.style = { left: x + "px", top: y + "px" };
    }
  }

  async onData() {
    // validate if the rightMenuData is an array and the lenght is not less then 1
    if (Array.isArray(this.rightMenuData) && this.rightMenuData.length) {
      await this.$nextTick();
      // loop through the options
      this.rightMenuData.forEach((item, index) => {
        // if this option type is equal's to divider and the handler property value is a function
        if (item.type !== "divider" && typeof item.handler === "function") {
          // select the option element with the help of the refs id
          const refs = this.$refs["right-menu-" + index];
          // accessing $refs prooerty with object square bracket notation alwasys returns arrays of
          // HTML Elements of Vue components instance
          // so you have to validate
          if (Array.isArray(refs)) {
            const el = refs[0] as HTMLElement;
            // then attach click event and pass an arrow function as a the
            // event handler callback
            el.addEventListener(
              "click",
              () => {
                // then on click on the option
                // envoke the handler
                // and reset the the rightMenuData to hide the context-menu
                item.handler();
                this.resetCtx();
              },
              false
            );
          }
        }
      });
    }
  }
}
