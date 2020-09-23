import { reactive } from 'vue-demi';
import type {
  WindowResizeObserver,
  WindowResizeSubject,
} from 'window-resize-subject';

type Vm = {
  width: number;
  height: number;
};

export type Mixin = {
  computed: {
    windowWidth: () => number;
    windowHeight: () => number;
  };
};

const createInitailValue = (): Vm => ({
  width: 800,
  height: 600,
});

export const createMixin = (subject: WindowResizeSubject): Mixin => {
  const vm = reactive(createInitailValue());
  const observer: WindowResizeObserver = ({ width, height }) => {
    vm.width = width;
    vm.height = height;
  };
  subject.addObserver('option', observer).subscribe();

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
