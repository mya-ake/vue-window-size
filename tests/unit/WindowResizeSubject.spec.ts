import { WindowResizeSubject } from '~/WindowResizeSubject';

const spies = {
  addEventListener: jest.spyOn(window, 'addEventListener'),
  removeEventListener: jest.spyOn(window, 'removeEventListener'),
};

describe('WindowResizeSubject', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addObserver', () => {
    it('observer is added', () => {
      const mock = jest.fn();
      const subject = new WindowResizeSubject();
      subject.addObserver('test', mock);
      expect(subject['_observers'].get('test')).toBe(mock);
    });
  });

  describe('deleteObserver', () => {
    it('observer is deleted', () => {
      const mock = jest.fn();
      const subject = new WindowResizeSubject();
      subject.addObserver('test', mock);
      subject.deleteObserver('test');
      expect(subject['_observers'].get('test')).toBeUndefined();
    });
  });

  describe('notifyObservers', () => {
    it('observers are called', () => {
      const mock = jest.fn();
      const observer2 = jest.fn();
      const subject = new WindowResizeSubject();
      subject.addObserver('test', mock);
      subject.addObserver('test2', observer2);

      subject.notifyObservers({ width: 200, height: 100 });

      expect(mock).toBeCalledWith({ width: 200, height: 100 });
      expect(observer2).toBeCalledWith({ width: 200, height: 100 });
    });
  });

  describe('subscribe', () => {
    it('addEventListener is called with resize', () => {
      const subject = new WindowResizeSubject();
      subject.subscribe();
      expect(spies.addEventListener).toBeCalledWith(
        'resize',
        subject['_handler'],
      );
      subject.unsubscribe();
    });

    it('addEventListener is called with orientationchange', () => {
      const subject = new WindowResizeSubject();
      subject.subscribe();
      expect(spies.addEventListener).toBeCalledWith(
        'orientationchange',
        subject['_handler'],
      );
      subject.unsubscribe();
    });

    it('update is called', () => {
      const subject = new WindowResizeSubject();
      // @ts-ignore
      const spy = jest.spyOn(subject, '_update');
      subject.subscribe();
      expect(spy).toBeCalledTimes(1);
      subject.unsubscribe();
    });

    it('addEventListener is called once(resize and orientationchange) even if subscribe is called twice', () => {
      const subject = new WindowResizeSubject();
      subject.subscribe();
      subject.subscribe();
      expect(spies.addEventListener).toBeCalledWith(
        'resize',
        subject['_handler'],
      );
      expect(spies.addEventListener).toBeCalledWith(
        'orientationchange',
        subject['_handler'],
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
        subject['_handler'],
      );
    });

    it('removeEventListener is called with orientationchange', () => {
      const subject = new WindowResizeSubject();
      subject.subscribe();
      subject.unsubscribe();
      expect(spies.removeEventListener).toBeCalledWith(
        'orientationchange',
        subject['_handler'],
      );
    });
  });

  describe('delay', () => {
    it('delay is used by setTimeout', () => {
      const subject = new WindowResizeSubject({ delay: 100 });
      subject.subscribe();
      window.dispatchEvent(new Event('resize'));
      jest.runAllTimers();
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);
      subject.unsubscribe();
    });

    it('delay is updated after setDelay is called', () => {
      const subject = new WindowResizeSubject({ delay: 100 });
      subject.setDelay(200);
      expect(subject['_delay']).toBe(200);
    });
  });

  describe('resize envet', () => {
    it('notifyObservers is called', () => {
      const subject = new WindowResizeSubject();
      subject.subscribe();
      const spy = jest.spyOn(subject, 'notifyObservers');
      window.dispatchEvent(new Event('resize'));
      jest.runAllTimers();
      expect(spy).toBeCalledTimes(1);
      subject.unsubscribe();
    });
  });
});
