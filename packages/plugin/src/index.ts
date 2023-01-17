import { createMixin } from '~shared/mixin';
import { getSubject } from '~shared/subject';
import { createPublicAPI } from '~shared/public-api';
import type { Config } from '~shared/config';
import type { App } from 'vue';

// Public API
export const vueWindowSizeAPI = createPublicAPI(getSubject);

// plugin
function install(app: App, { delay = 33 }: Config = {}) {
  const mixin = createMixin(getSubject);
  getSubject().setDelay(delay);
  app.mixin({
    mixins: [mixin],
  });
}

export const VueWindowSizePlugin = { install };

declare module 'vue' {
  export interface ComponentCustomProperties {
    $windowWidth: number;
    $windowHeight: number;
  }
}

export type VueWindowSizeOptionApiConfig = Config;
