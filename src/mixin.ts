import Vue from 'vue';
import WindowSize from './window-size';

export const windowSize = new WindowSize().init();

const vm = (() => {
  return typeof Vue.observable === 'function'
    ? Vue.observable({ windowSize })
    : new Vue({ data: { windowSize } });
})();

export const mixin = {
  computed: {
    windowWidth() {
      return vm.windowSize.width;
    },

    windowHeight() {
      return vm.windowSize.height;
    },
  },
};
