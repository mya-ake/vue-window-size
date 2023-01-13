import { createMixin } from './mixin';
import { getSubject } from './subject';
import { createPublicAPI } from './public-api';
import type { Mixin } from './mixin';
import type { Config } from './config';

// mixin
let mixin: Mixin;
export const vueWindowSizeMixin = (): Mixin => {
  if (!mixin) {
    mixin = createMixin(getSubject);
  }
  return mixin;
};

// Public API
export const vueWindowSizeAPI = createPublicAPI(getSubject);

// plugin
function install(app: any, { delay = 33 } = {}) {
  const mixin = vueWindowSizeMixin();
  getSubject().setDelay(delay);
  app.mixin({
    mixins: [mixin],
  });
}

export const VueWindowSizePlugin = { install };

/** types */
// vue 3
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $windowWidth: number;
    $windowHeight: number;
  }
}

// vue 2
// @ts-ignore
declare module 'vue/types/vue' {
  interface Vue {
    $windowWidth: number;
    $windowHeight: number;
  }
}

export type VueWindowSizeOptionApiConfig = Config;
