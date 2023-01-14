import { beforeEach, describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';

import { VueWindowSizePlugin } from '../src/index';
import OptionComponent from './fixtures/OptionComponent';
import { resizeWindow } from '~fixtures/shared';

vi.useFakeTimers();

const WINDOW_SIZE = {
  WIDTH: 600,
  HEIGHT: 800,
};

beforeEach(() => {
  resizeWindow(WINDOW_SIZE.WIDTH, WINDOW_SIZE.HEIGHT);
  vi.runAllTimers();
});

describe('Plugin', () => {
  describe('mounted', () => {
    it('has property', () => {
      const wrapper = shallowMount(OptionComponent, {
        global: {
          plugins: [VueWindowSizePlugin],
        },
      });

      expect(wrapper.vm.$windowWidth).toBe(WINDOW_SIZE.WIDTH);
      expect(wrapper.vm.$windowHeight).toBe(WINDOW_SIZE.HEIGHT);
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
      vi.runAllTimers();
      await nextTick();
      expect(wrapper.find('#width').text()).toBe('400');
      expect(wrapper.find('#height').text()).toBe('300');
    });
  });
});
