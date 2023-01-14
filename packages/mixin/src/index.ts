import { createMixin, Mixin } from '~shared/mixin';
import { getSubject } from '~shared/subject';
import { createPublicAPI } from '~shared/public-api';
import type { Config } from '~shared/config';

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

/** types */
// vue 3
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $windowWidth: number;
    $windowHeight: number;
  }
}

export type VueWindowSizeOptionApiConfig = Config;
