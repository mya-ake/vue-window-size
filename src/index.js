import { mixin, windowSize } from './mixin';

// mixin
export const vueWindowSizeMixin = mixin;

// Public API
export const vueWindowSize = {
  setDelay(delay) {
    windowSize.setDelay(delay);
  },
};

function install(Vue, { delay = 50 } = {}) {
  if (install.installed) return;
  install.installed = true;

  windowSize.setDelay(delay);
  Vue.mixin({
    mixins: [mixin],
  });
}

const plugin = { install };

let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default plugin;
