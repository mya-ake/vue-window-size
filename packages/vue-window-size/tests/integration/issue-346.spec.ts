import { beforeEach, describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';
import CompositionComponent from '~fixtures/CompositionComponent';
import { resizeWindow } from '~fixtures/shared';

// https://github.com/mya-ake/vue-window-size/issues/346
// Resizing before component mounting was not reflected in the component.
// This separates the test files because the window size of the first import is important.

vi.useFakeTimers();

it('issue #346', async () => {
  // resize
  resizeWindow(400, 300);

  // mount
  const wrapper = shallowMount(CompositionComponent);

  vi.runAllTimers();
  await nextTick();
  expect(wrapper.find('#width').text()).toBe('400');
  expect(wrapper.find('#height').text()).toBe('300');
});
