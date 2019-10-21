import {PluginObject} from 'vue'

export interface VueWindowSizeOption {
  delay?: number;
}

interface VueWindowSizeAPI {
  setDelay(delay: number): void;
  init(): void;
  destroy(): void;
}

export declare const VueWindowSizePlugin: PluginObject<VueWindowSizeOption>;

export declare const vueWindowSize: VueWindowSizeAPI;

export declare const vueWindowSizeMixin: {
  computed: {
    windowWidth(): number;
    windowHeight(): number;
  };
};
