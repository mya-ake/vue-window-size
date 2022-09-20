declare type Mixin = {
  computed: {
    $windowWidth: () => number;
    $windowHeight: () => number;
  };
};

declare type Config = {
  delay?: number;
};

declare const vueWindowSizeMixin: () => Mixin;
declare const vueWindowSizeAPI: {
  config(config: Config): void;
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
declare module 'vue/types/vue' {
  interface ComponentCustomProperties {
    $windowWidth: number;
    $windowHeight: number;
  }
}
declare module 'vue/types/vue' {
  interface Vue {
    $windowWidth: number;
    $windowHeight: number;
  }
}
declare type VueWindowSizeOptionApiConfig = Config;

export {
  VueWindowSizeOptionApiConfig,
  VueWindowSizePlugin,
  vueWindowSizeAPI,
  vueWindowSizeMixin,
};
