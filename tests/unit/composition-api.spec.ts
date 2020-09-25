import { defineComponent } from 'vue';
import { shallowMount } from '@vue/test-utils';
import { createUseWindowSize } from '~/composition-api';
import type { WindowResizeSubject } from 'window-resize-subject';

const mocks = {
  addObserver: jest.fn(),
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
};
mocks.addObserver.mockReturnValue(mocks);
const createTestComponent = (
  useWindowSize: ReturnType<typeof createUseWindowSize>,
) =>
  defineComponent({
    template: `<div></div>`,
    setup() {
      useWindowSize();
      return {};
    },
  });

const createSubject = (): WindowResizeSubject =>
  (({
    addObserver: mocks.addObserver,
    subscribe: mocks.subscribe,
    unsubscribe: mocks.unsubscribe,
  } as unknown) as WindowResizeSubject);

describe('composition api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUseWindowSize', () => {
    beforeEach(() => {
      createUseWindowSize(createSubject);
    });

    it('subscribe is not called', () => {
      expect(mocks.subscribe).not.toBeCalled();
    });

    it('observer is set', () => {
      expect(mocks.addObserver).toBeCalledWith(
        'composition-api',
        expect.any(Function),
      );
    });
  });

  describe('useWindowSize', () => {
    let TestComponent: ReturnType<typeof createTestComponent>;
    beforeEach(() => {
      const useWindowSize = createUseWindowSize(createSubject);
      TestComponent = createTestComponent(useWindowSize);
    });

    it('subscribe is called when mounting the component', () => {
      shallowMount(TestComponent);
      expect(mocks.subscribe).toBeCalledTimes(1);
    });

    it('subscribe is called only once when multiple components are mounted', () => {
      shallowMount(TestComponent);
      shallowMount(TestComponent);
      expect(mocks.subscribe).toBeCalledTimes(1);
    });

    it('unsubscribe is called when unmounting the component', () => {
      const wrapper = shallowMount(TestComponent);
      wrapper.unmount();
      expect(mocks.unsubscribe).toBeCalledTimes(1);
    });

    it('unsubscribe is not called when at least one component is mounted', () => {
      const wrapper = shallowMount(TestComponent);
      shallowMount(TestComponent);
      wrapper.unmount();
      expect(mocks.unsubscribe).not.toBeCalled();
    });
  });
});
