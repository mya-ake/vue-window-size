import type { WindowResizeSubject } from './subject';
import type { Config } from './config';

export const createPublicAPI = (getSubject: () => WindowResizeSubject) => {
  return {
    config(config: Config) {
      if (typeof config.delay === 'number') {
        getSubject().setDelay(config.delay);
      }
    },

    init() {
      getSubject().subscribe();
    },

    destroy() {
      getSubject().unsubscribe();
    },
  };
};
