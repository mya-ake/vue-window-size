import { createLocalVue, shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';

import { vueWindowSizeMixin, VueWindowSizePlugin } from '~/option-api';
import OptionComponent from '~fixtures/OptionComponent';
import CompositionComponent from '~fixtures/CompositionComponent';
import { resizeWindow } from '~fixtures/shared';

declare module 'vue/types/vue' {
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

const localVue = createLocalVue();
localVue.use(VueWindowSizePlugin);

beforeEach(() => {
  resizeWindow(WINDOW_SIZE.WIDTH, WINDOW_SIZE.HEIGHT);
  jest.runAllTimers();
});

describe('Plugin', () => {
  describe('mounted', () => {
    it('has property', () => {
      const wrapper = shallowMount(OptionComponent as any, {
        localVue,
      });

      expect(wrapper.vm.$windowWidth).toBe(WINDOW_SIZE.WIDTH);
      expect(wrapper.vm.$windowHeight).toBe(WINDOW_SIZE.HEIGHT);
    });

    it('shown values', () => {
      const wrapper = shallowMount(OptionComponent as any, {
        localVue,
      });

      expect(wrapper.get('#width').text()).toBe(String(WINDOW_SIZE.WIDTH));
      expect(wrapper.get('#height').text()).toBe(String(WINDOW_SIZE.HEIGHT));
    });
  });

  describe('resize event', () => {
    it('reactivity', async () => {
      const wrapper = shallowMount(OptionComponent as any, {
        localVue,
      });

      resizeWindow(400, 300);
      jest.runAllTimers();
      await nextTick();
      expect(wrapper.find('#width').text()).toBe('400');
      expect(wrapper.find('#height').text()).toBe('300');
    });
  });
});

describe('Mixin', () => {
  describe('mounted', () => {
    it('has property', () => {
      const wrapper = shallowMount(OptionComponent as any, {
        localVue,
      });

      expect(wrapper.vm.$windowWidth).toBe(WINDOW_SIZE.WIDTH);
      expect(wrapper.vm.$windowHeight).toBe(WINDOW_SIZE.HEIGHT);
    });

    it('shown values', () => {
      const wrapper = shallowMount(OptionComponent as any, {
        localVue,
      });

      expect(wrapper.get('#width').text()).toBe(String(WINDOW_SIZE.WIDTH));
      expect(wrapper.get('#height').text()).toBe(String(WINDOW_SIZE.HEIGHT));
    });
  });

  describe('resize event', () => {
    it('reactivity', async () => {
      const wrapper = shallowMount(OptionComponent as any, {
        localVue,
      });

      resizeWindow(400, 300);
      jest.runAllTimers();
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
      jest.runAllTimers();
      await nextTick();
      expect(wrapper.find('#width').text()).toBe('400');
      expect(wrapper.find('#height').text()).toBe('300');
    });
  });
});
