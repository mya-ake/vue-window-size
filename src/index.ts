import { WindowResizeSubject } from 'window-resize-subject';
import { createMixin } from './mixin';
import { createPublicAPI } from './public-api';

const subject = new WindowResizeSubject();

// mixin
export const vueWindowSizeMixin = createMixin(subject);

// Public API
export const vueWindowSize = createPublicAPI(subject);

const state = {
  installed: false,
};

function install(Vue: Vue.VueConstructor, { delay = 50 } = {}) {
  if (state.installed) return;
  state.installed = true;

  subject.setDelay(delay);
  Vue.mixin({
    mixins: [vueWindowSizeMixin],
  });
}

const plugin = { install };

let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
  // @ts-ignore
} else if (typeof global !== 'undefined') {
  // @ts-ignore
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default plugin;

/** types */
declare module 'vue/types/vue' {
  interface Vue {
    windowWidth: number;
    windowHeight: number;
  }
}

export type VueWindowSizeOption = {
  delay?: number;
};
