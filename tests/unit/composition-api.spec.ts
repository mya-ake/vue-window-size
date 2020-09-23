import { createUseWindowSize } from '~/composition-api';
import { getWindowWidth, getWindowHeight } from '~fixtures/shared';
import type { WindowResizeSubject } from 'window-resize-subject';

const mocks = {
  addObserver: jest.fn(),
  subscribe: jest.fn(),
};
mocks.addObserver.mockReturnValue(mocks);

const createSubject = (): WindowResizeSubject =>
  (({
    addObserver: mocks.addObserver,
    subscribe: mocks.subscribe,
  } as unknown) as WindowResizeSubject);

describe('composition api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUseWindowSize', () => {
    let useWindowSize: ReturnType<typeof createUseWindowSize>;
    beforeEach(() => {
      useWindowSize = createUseWindowSize(createSubject);
    });

    it('subscribe is called', () => {
      expect(mocks.subscribe).toBeCalledTimes(1);
    });

    it('observer is set', () => {
      expect(mocks.addObserver).toBeCalledWith(
        'composition-api',
        expect.any(Function),
      );
    });

    it(`width and height are state's value`, () => {
      const { width, height } = useWindowSize();
      expect(width.value).toBe(getWindowWidth());
      expect(height.value).toBe(getWindowHeight());
    });
  });
});
