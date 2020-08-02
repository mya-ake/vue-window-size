import WindowSize from '~/window-size';

const spyAddEvent = jest.spyOn(window, 'addEventListener');
const spyRemoveEvent = jest.spyOn(window, 'removeEventListener');
const mockHandler = jest.fn();

let windowSize: WindowSize;

beforeEach(() => {
  jest.useFakeTimers();
  spyAddEvent.mockClear();
  spyRemoveEvent.mockClear();
  mockHandler.mockClear();

  windowSize = new WindowSize();
  windowSize['_handler'] = mockHandler;
  windowSize.init();
});

afterEach(() => {
  windowSize.destroy();
});

describe('init method', () => {
  it('runs', () => {
    expect(spyAddEvent).toHaveBeenCalledTimes(1);
    expect(spyAddEvent).toHaveBeenCalledWith('resize', windowSize['_handler']);
  });

  it('not runs multiple times', () => {
    windowSize.init();
    expect(spyAddEvent).toHaveBeenCalledTimes(1);
  });
});

describe('destroy method', () => {
  it('runs', () => {
    windowSize.destroy();
    expect(spyRemoveEvent).toHaveBeenCalledTimes(1);
    expect(spyRemoveEvent).toHaveBeenCalledWith(
      'resize',
      windowSize['_handler']
    );
  });

  it('not runs multiple times', () => {
    windowSize.destroy();
    windowSize.destroy();
    expect(spyRemoveEvent).toHaveBeenCalledTimes(1);
  });
});

describe('resize event', () => {
  it('runs handler', () => {
    window.dispatchEvent(new Event('resize'));
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it('not runs after destroy', () => {
    windowSize.destroy();
    window.dispatchEvent(new Event('resize'));
    expect(mockHandler).not.toHaveBeenCalled();
  });
});

describe('delay', () => {
  beforeEach(() => {
    windowSize = new WindowSize().init();
  });

  it('default', () => {
    window.dispatchEvent(new Event('resize'));
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 50);
  });

  it('runs delay method', () => {
    windowSize.setDelay(100);

    window.dispatchEvent(new Event('resize'));
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 100);
  });
});

describe('update', () => {
  let spyUpdate: jest.SpyInstance;

  beforeEach(() => {
    windowSize = new WindowSize().init();
    spyUpdate = jest.spyOn(windowSize, 'update');
  });

  it('runs', () => {
    window.dispatchEvent(new Event('resize'));
    jest.runAllTimers();
    expect(spyUpdate).toHaveBeenCalledTimes(1);
  });
});
