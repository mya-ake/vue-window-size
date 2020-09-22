import { WindowResizeSubject } from 'window-resize-subject';
import { createMixin } from './mixin';
import { createPublicAPI } from './public-api';
import type { App } from 'vue-demi';

const subject = new WindowResizeSubject();

// mixin
export const vueWindowSizeMixin = createMixin(subject);

// Public API
export const vueWindowSize = createPublicAPI(subject);

function install(app: App, { delay = 33 } = {}) {
  subject.setDelay(delay);
  app.mixin({
    mixins: [vueWindowSizeMixin],
  });
}

const plugin = { install };

export default plugin;

/** types */
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    windowWidth: number;
    windowHeight: number;
  }
}

export type VueWindowSizeOption = {
  delay?: number;
};
