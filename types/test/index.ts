/* eslint-disable no-unused-vars */
import Vue, { ComponentOptions } from 'vue';
import VueWindowSizePlugin, {
  vueWindowSize,
  vueWindowSizeMixin,
} from './../../src/index';

/** plugin */
Vue.use(VueWindowSizePlugin);

const vm = new Vue({
  mounted() {
    const width: number = this.windowWidth;
    const height: number = this.windowHeight;
  },
});
const width: number = vm.windowWidth;
const height: number = vm.windowHeight;

/** public api */
vueWindowSize.init();
vueWindowSize.setDelay(10);
vueWindowSize.destroy();

/** mixin */
const Mixin: ComponentOptions<Vue> = {
  mixins: [vueWindowSizeMixin],
};
