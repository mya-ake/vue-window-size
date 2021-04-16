import * as vue from 'vue';

declare const useWindowSize: () => {
  width: vue.ComputedRef<number>;
  height: vue.ComputedRef<number>;
};

export { useWindowSize };
