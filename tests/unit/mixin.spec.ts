import { createMixin } from '~/mixin';
import type { WindowResizeSubject } from '~/type';

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

describe('mixin', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createMixin', () => {
    let mixin: ReturnType<typeof createMixin>;
    beforeEach(() => {
      mixin = createMixin(createSubject());
    });

    it('subscribe is called', () => {
      expect(mocks.subscribe).toBeCalledTimes(1);
    });

    it('observer is set', () => {
      expect(mocks.addObserver).toBeCalledWith('option', expect.any(Function));
    });

    it('has plugin properties', () => {
      expect(mixin.computed.windowWidth).toBeInstanceOf(Function);
      expect(mixin.computed.windowHeight).toBeInstanceOf(Function);
    });

    it(`windowWidth and windowHeight are vm's value`, () => {
      expect(mixin.computed.windowWidth()).toBe(800);
      expect(mixin.computed.windowHeight()).toBe(600);
    });
  });
});
