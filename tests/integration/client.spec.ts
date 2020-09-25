import { shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';

import { VueWindowSizePlugin, vueWindowSizeMixin } from '~/option-api';
import OptionComponent from '~fixtures/OptionComponent';
import CompositionComponent from '~fixtures/CompositionComponent';

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    windowWidth: number;
    windowHeight: number;
  }
}

jest.useFakeTimers();

const WINDOW_SIZE = {
  WIDTH: 600,
  HEIGHT: 800,
};

const resizeWindow = (width: number, height: number) => {
  if (typeof width === 'number') {
    // @ts-ignore
    window.innerWidth = width;
  }
  if (typeof height === 'number') {
    // @ts-ignore
    window.innerHeight = height;
  }
  window.dispatchEvent(new Event('resize'));
  jest.runAllTimers();
};

beforeEach(() => {
  resizeWindow(WINDOW_SIZE.WIDTH, WINDOW_SIZE.HEIGHT);
});

describe('Plugin', () => {
  describe('mounted', () => {
    it('has property', () => {
      const wrapper = shallowMount(OptionComponent, {
        global: {
          plugins: [VueWindowSizePlugin],
        },
      });

      expect(wrapper.vm.windowWidth).toBe(WINDOW_SIZE.WIDTH);
      expect(wrapper.vm.windowHeight).toBe(WINDOW_SIZE.HEIGHT);
    });

    it('shown values', () => {
      const wrapper = shallowMount(OptionComponent, {
        global: {
          plugins: [VueWindowSizePlugin],
        },
      });

      expect(wrapper.get('#width').text()).toBe(String(WINDOW_SIZE.WIDTH));
      expect(wrapper.get('#height').text()).toBe(String(WINDOW_SIZE.HEIGHT));
    });
  });

  describe('resize event', () => {
    it('reactivity', async () => {
      const wrapper = shallowMount(OptionComponent, {
        global: {
          plugins: [VueWindowSizePlugin],
        },
      });

      resizeWindow(400, 300);
      await nextTick();
      expect(wrapper.find('#width').text()).toBe('400');
      expect(wrapper.find('#height').text()).toBe('300');
    });
  });
});

describe('Mixin', () => {
  describe('mounted', () => {
    it('has property', () => {
      const wrapper = shallowMount(OptionComponent, {
        global: {
          mixins: [vueWindowSizeMixin()],
        },
      });

      expect(wrapper.vm.windowWidth).toBe(WINDOW_SIZE.WIDTH);
      expect(wrapper.vm.windowHeight).toBe(WINDOW_SIZE.HEIGHT);
    });

    it('shown values', () => {
      const wrapper = shallowMount(OptionComponent, {
        global: {
          mixins: [vueWindowSizeMixin()],
        },
      });

      expect(wrapper.get('#width').text()).toBe(String(WINDOW_SIZE.WIDTH));
      expect(wrapper.get('#height').text()).toBe(String(WINDOW_SIZE.HEIGHT));
    });
  });

  describe('resize event', () => {
    it('reactivity', async () => {
      const wrapper = shallowMount(OptionComponent, {
        global: {
          plugins: [VueWindowSizePlugin],
        },
      });

      resizeWindow(400, 300);
      await nextTick();
      expect(wrapper.find('#width').text()).toBe('400');
      expect(wrapper.find('#height').text()).toBe('300');
    });
  });
});

describe('Composition API', () => {
  describe('mounted', () => {
    it('shown values', () => {
      const wrapper = shallowMount(CompositionComponent);

      expect(wrapper.get('#width').text()).toBe(String(WINDOW_SIZE.WIDTH));
      expect(wrapper.get('#height').text()).toBe(String(WINDOW_SIZE.HEIGHT));
    });
  });

  describe('resize event', () => {
    it('reactivity', async () => {
      const wrapper = shallowMount(CompositionComponent);

      resizeWindow(400, 300);
      await nextTick();
      expect(wrapper.find('#width').text()).toBe('400');
      expect(wrapper.find('#height').text()).toBe('300');
    });
  });
});
