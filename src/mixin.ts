import { reactive } from 'vue-demi';
import type {
  WindowResizeObserver,
  WindowResizeSubject,
} from 'window-resize-subject';

type Vm = {
  width: number;
  height: number;
};

const createInitailValue = (): Vm => ({
  width: 800,
  height: 600,
});

export const createMixin = (subject: WindowResizeSubject) => {
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
