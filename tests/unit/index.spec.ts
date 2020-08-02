import { shallowMount, createLocalVue } from '@vue/test-utils';

import VueWindowSize, { vueWindowSizeMixin } from '~/index';
import TestComponent from '~fixtures/TestComponent';

declare module 'vue/types/vue' {
  interface Vue {
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
  const localVue = createLocalVue();
  localVue.use(VueWindowSize);

  describe('mounted', () => {
    it('has property', () => {
      const wrapper = shallowMount(TestComponent, {
        localVue,
      });

      expect(wrapper.vm.windowWidth).toBe(WINDOW_SIZE.WIDTH);
      expect(wrapper.vm.windowHeight).toBe(WINDOW_SIZE.HEIGHT);
    });

    it('shown values', () => {
      const wrapper = shallowMount(TestComponent, {
        localVue,
      });

      expect(wrapper.find('#width').text()).toBe(String(WINDOW_SIZE.WIDTH));
      expect(wrapper.find('#height').text()).toBe(String(WINDOW_SIZE.HEIGHT));
    });
  });

  describe('resize event', () => {
    it('reactivity', async () => {
      const wrapper = shallowMount(TestComponent, {
        localVue,
      });

      resizeWindow(400, 300);
      await localVue.nextTick();
      expect(wrapper.find('#width').text()).toBe('400');
      expect(wrapper.find('#height').text()).toBe('300');
    });
  });
});

describe('Mixin', () => {
  it('has property', () => {
    const wrapper = shallowMount(TestComponent, {
      mixins: [vueWindowSizeMixin],
    });

    expect(wrapper.vm.windowWidth).toBe(WINDOW_SIZE.WIDTH);
    expect(wrapper.vm.windowHeight).toBe(WINDOW_SIZE.HEIGHT);
  });
});
