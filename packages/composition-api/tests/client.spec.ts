import { beforeEach, describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';

import CompositionComponent from './fixtures/CompositionComponent';
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
      vi.runAllTimers();
      await nextTick();
      expect(wrapper.find('#width').text()).toBe('400');
      expect(wrapper.find('#height').text()).toBe('300');
    });
  });
});
