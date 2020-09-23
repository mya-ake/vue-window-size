import { WindowResizeSubject } from 'window-resize-subject';
import { createMixin } from './mixin';
import { createPublicAPI } from './public-api';
import { createUseWindowSize } from './composition-api';
import type { App } from 'vue-demi';
import type { Mixin } from './mixin';

// subject
let subject: WindowResizeSubject;
const getSubject = (): WindowResizeSubject => {
  if (!subject) {
    subject = new WindowResizeSubject();
  }
  return subject;
};

// mixin
let mixin: Mixin;
export const vueWindowSizeMixin = (): Mixin => {
  if (!mixin) {
    mixin = createMixin(getSubject());
  }
  return mixin;
};

// Public API
export const vueWindowSizeAPI = createPublicAPI(getSubject);

function install(app: App, { delay = 33 } = {}) {
  const mixin = vueWindowSizeMixin();
  subject.setDelay(delay);
  app.mixin({
    mixins: [mixin],
  });
}

// Composition API
export const useWindowSize = createUseWindowSize(getSubject);

// plugin
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
