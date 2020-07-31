import { mixin, windowSize } from './mixin';

declare module 'vue/types/vue' {
  interface Vue {
    windowWidth: number;
    windowHeight: number;
  }
}

// mixin
export const vueWindowSizeMixin = mixin;

// Public API
export const vueWindowSize = {
  setDelay(delay: number) {
    windowSize.setDelay(delay);
  },

  init() {
    windowSize.init();
  },

  destroy() {
    windowSize.destroy();
  },
};

const state = {
  installed: false,
};

function install(Vue: Vue.VueConstructor, { delay = 50 } = {}) {
  if (state.installed) return;
  state.installed = true;

  windowSize.setDelay(delay);
  Vue.mixin({
    mixins: [mixin],
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
