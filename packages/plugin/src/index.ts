import { createMixin } from '~shared/mixin';
import { getSubject } from '~shared/subject';
import { createPublicAPI } from '~shared/public-api';
import type { Config } from '~shared/config';

// Public API
export const vueWindowSizeAPI = createPublicAPI(getSubject);

// plugin
function install(app: any, { delay = 33 } = {}) {
  const mixin = createMixin(getSubject);
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

export type VueWindowSizeOptionApiConfig = Config;
