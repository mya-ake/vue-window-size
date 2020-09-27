import { defineComponent } from 'vue-demi';
import { useWindowSize } from '~/index';

export default defineComponent({
  template: `
  <div>
    <div id="width">{{ width }}</div>
    <div id="height">{{ height }}</div>
  </div>
  `,
  setup() {
    const { width, height } = useWindowSize();
    return {
      width,
      height,
    };
  },
});
