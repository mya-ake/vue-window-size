import { reactive } from 'vue-demi';
import { createInitailSize } from './shared';
import type {
  WindowResizeObserver,
  WindowResizeSubject,
} from 'window-resize-subject';

export type Mixin = {
  computed: {
    windowWidth: () => number;
    windowHeight: () => number;
  };
};

export const createMixin = (getSubject: () => WindowResizeSubject): Mixin => {
  const vm = reactive(createInitailSize());
  const observer: WindowResizeObserver = ({ width, height }) => {
    vm.width = width;
    vm.height = height;
  };
  getSubject().addObserver('option-api', observer).subscribe();

  return {
    computed: {
      windowWidth() {
        return vm.width;
      },

      windowHeight() {
        return vm.height;
      },
    },
  };
};
