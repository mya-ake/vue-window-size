import { beforeEach, describe, expect, it, vi } from 'vitest';
import { WindowResizeSubject } from './WindowResizeSubject';

const spies = {
  addEventListener: vi.spyOn(window, 'addEventListener'),
  removeEventListener: vi.spyOn(window, 'removeEventListener'),
};

describe('WindowResizeSubject', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  describe('notifyObservers', () => {
    it('observers are called', () => {
      const observer1 = vi.fn();
      const observer2 = vi.fn();
      const subject = new WindowResizeSubject();
      const symbol = Symbol('test');
      subject.addObserver('test', observer1);
      subject.addObserver(symbol, observer2);

      subject.notifyObservers({ width: 200, height: 100 });

      expect(observer1).toBeCalledWith({ width: 200, height: 100 });
      expect(observer2).toBeCalledWith({ width: 200, height: 100 });
    });
  });

  describe('subscribe', () => {
    it('addEventListener is called with resize', () => {
      const subject = new WindowResizeSubject();
      subject.subscribe();
      expect(spies.addEventListener).toBeCalledWith(
        'resize',
        expect.any(Function),
      );
      subject.unsubscribe();
    });

    it('addEventListener is called with orientationchange', () => {
      const subject = new WindowResizeSubject();
      subject.subscribe();
      expect(spies.addEventListener).toBeCalledWith(
        'orientationchange',
        expect.any(Function),
      );
      subject.unsubscribe();
    });

    it('addEventListener is called once(resize and orientationchange) even if subscribe is called twice', () => {
      const subject = new WindowResizeSubject();
      subject.subscribe();
      subject.subscribe();
      expect(spies.addEventListener).toHaveBeenNthCalledWith(
        1,
        'resize',
        expect.any(Function),
      );
      expect(spies.addEventListener).toHaveBeenNthCalledWith(
        2,
        'orientationchange',
        expect.any(Function),
      );
      subject.unsubscribe();
    });
  });

  describe('unsubscribe', () => {
    it('removeEventListener is not called before subscribe is called', () => {
      const subject = new WindowResizeSubject();
      subject.unsubscribe();
      expect(spies.removeEventListener).not.toBeCalled();
    });

    it('removeEventListener is called with resize', () => {
      const subject = new WindowResizeSubject();
      subject.subscribe();
      subject.unsubscribe();
      expect(spies.removeEventListener).toBeCalledWith(
        'resize',
        expect.any(Function),
      );
    });

    it('removeEventListener is called with orientationchange', () => {
      const subject = new WindowResizeSubject();
      subject.subscribe();
      subject.unsubscribe();
      expect(spies.removeEventListener).toBeCalledWith(
        'orientationchange',
        expect.any(Function),
      );
    });
  });

  describe('delay', () => {
    it('delay is used by setTimeout', () => {
      vi.useRealTimers();
      const spy = vi
        .spyOn(window, 'setTimeout')
        .mockImplementation(() => 1 as any);
      const subject = new WindowResizeSubject({ delay: 100 });
      subject.subscribe();
      window.dispatchEvent(new Event('resize'));
      expect(spy).toBeCalledWith(expect.any(Function), 100);
      subject.unsubscribe();
    });

    it('delay is updated after setDelay is called', () => {
      const subject = new WindowResizeSubject({ delay: 100 });
      expect(subject.info().delay).toBe(100);
      subject.setDelay(200);
      expect(subject.info().delay).toBe(200);
    });
  });

  describe('resize envet', () => {
    it('notifyObservers is called', () => {
      const subject = new WindowResizeSubject();
      subject.subscribe();
      const spy = vi.spyOn(subject, 'notifyObservers');
      window.dispatchEvent(new Event('resize'));
      vi.runAllTimers();
      expect(spy).toBeCalledTimes(1);
      subject.unsubscribe();
    });
  });

  describe('dispatch', () => {
    it('observer is called with window size', () => {
      const observer = vi.fn();
      const subject = new WindowResizeSubject();
      subject.addObserver('test', observer);

      observer.mockClear();
      subject.dispatch();

      expect(observer).toBeCalledWith({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
  });
});
