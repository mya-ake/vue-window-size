import type {
  Subject,
  WindowResizeObserver,
  WindowResizeSubjectEvent,
} from './type';

export class WindowResizeSubject implements Subject<WindowResizeSubjectEvent> {
  private _observers: Map<string, WindowResizeObserver> = new Map();
  private _delay: number;
  private _timer: number | undefined;
  private _subscribed = false;
  private _handler: () => void;

  constructor({ delay = 50 } = {}) {
    this._delay = delay;
    this._handler = this._handleResize.bind(this);
  }

  addObserver(name: string, observer: WindowResizeObserver) {
    this._observers.set(name, observer);
  }

  deleteObserver(name: string) {
    this._observers.delete(name);
  }

  notifyObservers(event: WindowResizeSubjectEvent) {
    this._observers.forEach((observer) => {
      observer(event);
    });
  }

  subscribe() {
    if (typeof window === 'undefined') {
      return this;
    }
    if (this._subscribed) {
      return this;
    }
    this._update();
    window.addEventListener('resize', this._handler);
    window.addEventListener('orientationchange', this._handler);
    this._subscribed = true;
    return this;
  }

  unsubscribe() {
    if (!this._subscribed) {
      return this;
    }
    window.removeEventListener('resize', this._handler);
    window.removeEventListener('orientationchange', this._handler);
    this._subscribed = false;
    return this;
  }

  setDelay(delay: number) {
    this._delay = delay;
  }

  private _update() {
    this.notifyObservers({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  private _handleResize() {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this._update();
    }, this._delay);
  }
}
