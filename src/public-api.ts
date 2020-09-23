import type { WindowResizeSubject } from 'window-resize-subject';

export const createPublicAPI = (getSubject: () => WindowResizeSubject) => {
  return {
    setDelay(delay: number) {
      getSubject().setDelay(delay);
    },

    init() {
      getSubject().subscribe();
    },

    destroy() {
      getSubject().unsubscribe();
    },
  };
};
