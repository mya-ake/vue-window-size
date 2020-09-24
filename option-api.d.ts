declare type Mixin = {
  computed: {
    windowWidth: () => number;
    windowHeight: () => number;
  };
};

declare const vueWindowSizeMixin: () => Mixin;
declare const vueWindowSizeAPI: {
  setDelay(delay: number): void;
  init(): void;
  destroy(): void;
};
declare function install(
  app: any,
  {
    delay,
  }?: {
    delay?: number | undefined;
  },
): void;
declare const VueWindowSizePlugin: {
  install: typeof install;
};
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    windowWidth: number;
    windowHeight: number;
  }
}
declare module 'vue/types/vue' {
  interface Vue {
    windowWidth: number;
    windowHeight: number;
  }
}
declare type VueWindowSizeOption = {
  delay?: number;
};

export {
  VueWindowSizeOption,
  VueWindowSizePlugin,
  vueWindowSizeAPI,
  vueWindowSizeMixin,
};
