import type { WindowResizeSubject } from './WindowResizeSubject';

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
