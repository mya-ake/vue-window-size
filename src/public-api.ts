import type { WindowResizeSubject } from 'window-resize-subject';

export const createPublicAPI = (subject: WindowResizeSubject) => {
  return {
    setDelay(delay: number) {
      subject.setDelay(delay);
    },

    init() {
      subject.subscribe();
    },

    destroy() {
      subject.unsubscribe();
    },
  };
};
