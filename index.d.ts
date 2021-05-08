import * as vue from 'vue-demi';

declare const useWindowSize: () => {
  width: vue.ComputedRef<number>;
  height: vue.ComputedRef<number>;
};

export { useWindowSize };
