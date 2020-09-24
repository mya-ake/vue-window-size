import type { App } from 'vue-demi';
import type { Mixin } from './mixin';
export declare const vueWindowSizeMixin: () => Mixin;
export declare const vueWindowSizeAPI: {
    setDelay(delay: number): void;
    init(): void;
    destroy(): void;
};
declare function install(app: App, { delay }?: {
    delay?: number | undefined;
}): void;
export declare const useWindowSize: () => {
    width: import("vue-demi").ComputedRef<number>;
    height: import("vue-demi").ComputedRef<number>;
};
export declare const VueWindowSizePlugin: {
    install: typeof install;
};
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        windowWidth: number;
        windowHeight: number;
    }
}
export declare type VueWindowSizeOption = {
    delay?: number;
};
export {};
