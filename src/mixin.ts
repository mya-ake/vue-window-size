import Vue from 'vue';
import type { WindowResizeObserver, WindowResizeSubject } from './type';

type Vm = {
  width: number;
  height: number;
};

const createInitailValue = (): Vm => ({
  width: 800,
  height: 600,
});

const createVm = () => {
  return typeof Vue.observable === 'function'
    ? Vue.observable<Vm>(createInitailValue())
    : new Vue<Vm>({ data: createInitailValue() });
};

export const createMixin = (subject: WindowResizeSubject) => {
  const vm = createVm();
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
