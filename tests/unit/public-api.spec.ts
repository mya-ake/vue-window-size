import { createPublicAPI } from '~/public-api';
import type { WindowResizeSubject } from 'window-resize-subject';

const mocks = {
  setDelay: jest.fn(),
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
};

const createSubject = (): WindowResizeSubject =>
  (({
    setDelay: mocks.setDelay,
    subscribe: mocks.subscribe,
    unsubscribe: mocks.unsubscribe,
  } as unknown) as WindowResizeSubject);

describe('public API', () => {
  let api: ReturnType<typeof createPublicAPI>;
  beforeEach(() => {
    api = createPublicAPI(createSubject);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('setDelay', () => {
    it('setDelay is called', () => {
      api.setDelay(100);
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
