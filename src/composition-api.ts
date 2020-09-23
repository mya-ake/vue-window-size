import { reactive, computed } from 'vue-demi';
import { createInitailSize } from './shared';
import type {
  WindowResizeSubject,
  WindowResizeObserver,
} from 'window-resize-subject';

export const createUseWindowSize = (getSubject: () => WindowResizeSubject) => {
  const state = reactive(createInitailSize());
  const observer: WindowResizeObserver = ({ width, height }) => {
    state.width = width;
    state.height = height;
  };
  getSubject().addObserver('composition-api', observer).subscribe();

  return () => ({
    width: computed(() => state.width),
    height: computed(() => state.height),
  });
};
