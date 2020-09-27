import { ComputedRef } from 'vue-demi';

declare const useWindowSize: () => {
  width: ComputedRef<number>;
  height: ComputedRef<number>;
};

export { useWindowSize };
