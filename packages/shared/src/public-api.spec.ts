import { describe, it, beforeEach, expect, vi } from 'vitest';
import { createPublicAPI } from './public-api';
import type { WindowResizeSubject } from 'window-resize-subject';

const mocks = {
  setDelay: vi.fn(),
  subscribe: vi.fn(),
  unsubscribe: vi.fn(),
};

const createSubject = (): WindowResizeSubject =>
  ({
    setDelay: mocks.setDelay,
    subscribe: mocks.subscribe,
    unsubscribe: mocks.unsubscribe,
  } as unknown as WindowResizeSubject);

describe('public API', () => {
  let api: ReturnType<typeof createPublicAPI>;
  beforeEach(() => {
    vi.clearAllMocks();
    api = createPublicAPI(createSubject);
  });

  describe('config', () => {
    it('setDelay is called', () => {
      api.config({ delay: 100 });
      expect(mocks.setDelay).toBeCalledWith(100);
    });
  });

  describe('init', () => {
    it('subscribe is called', () => {
      api.init();
      expect(mocks.subscribe).toBeCalledTimes(1);
    });
  });

  describe('destroy', () => {
    it('unsubscribe is called', () => {
      api.destroy();
      expect(mocks.unsubscribe).toBeCalledTimes(1);
    });
  });
});
