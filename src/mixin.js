import Vue from 'vue';
import WindowSize from './window-size';

export const windowSize = new WindowSize();
const vm = new Vue({ data: { windowSize } });

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
