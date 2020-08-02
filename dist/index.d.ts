export declare const vueWindowSizeMixin: {
    computed: {
        windowWidth(): number;
        windowHeight(): number;
    };
};
export declare const vueWindowSize: {
    setDelay(delay: number): void;
    init(): void;
    destroy(): void;
};
declare function install(Vue: Vue.VueConstructor, { delay }?: {
    delay?: number | undefined;
}): void;
declare const plugin: {
    install: typeof install;
};
export default plugin;
declare module 'vue/types/vue' {
    interface Vue {
        windowWidth: number;
        windowHeight: number;
    }
}
export declare type VueWindowSizeOption = {
    delay?: number;
};
