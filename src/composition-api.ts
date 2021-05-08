import { reactive, computed, onUnmounted } from 'vue-demi';
import { createInitailSize } from './shared';
import type {
  WindowResizeSubject,
  WindowResizeObserver,
} from 'window-resize-subject';

export const createUseWindowSize = (getSubject: () => WindowResizeSubject) => {
  let count = 0;
  const subject = getSubject();
  const state = reactive(createInitailSize());
  const observer: WindowResizeObserver = ({ width, height }) => {
    state.width = width;
    state.height = height;
  };
  subject.addObserver('composition-api', observer);
  const increment = () => {
    ++count;
  };
  const decrement = () => {
    count = Math.max(count - 1, 0);
  };

  return () => {
    if (count === 0) {
      subject.subscribe().dispatch();
    }
    increment();

    onUnmounted(() => {
      decrement();
      if (count === 0) {
        subject.unsubscribe();
      }
    });

    return {
      width: computed(() => state.width),
      height: computed(() => state.height),
    };
  };
};
