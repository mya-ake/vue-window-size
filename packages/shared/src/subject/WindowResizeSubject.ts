export type Observer<Event = void> = (event: Event) => void;

export type ObserverName = string | Symbol;

export interface Subject<Event = void> {
  addObserver(name: ObserverName, observer: Observer<Event>): this;
  deleteObserver(name: ObserverName): this;
  notifyObservers(event: Event): this;
  subscribe(): this;
  unsubscribe(): this;
}

export type WindowResizeObserver = Observer<WindowResizeSubjectEvent>;
export type WindowResizeSubjectEvent = {
  width: number;
  height: number;
};
export type WindowResizeSubjectOption = {
  delay?: number;
};

export class WindowResizeSubject implements Subject<WindowResizeSubjectEvent> {
  #observers: Map<ObserverName, WindowResizeObserver> = new Map();
  #delay: number;
  #timer: number | undefined;
  #subscribed = false;
  #handler: () => void;

  constructor(option?: WindowResizeSubjectOption) {
    const { delay = 33 } = option ?? {};
    this.#delay = delay;
    this.#handler = this.#handleResize.bind(this);
  }

  addObserver(name: ObserverName, observer: WindowResizeObserver) {
    this.#observers.set(name, observer);
    observer(this.#getEvent());
    return this;
  }

  deleteObserver(name: ObserverName) {
    this.#observers.delete(name);
    return this;
  }

  deleteObservers() {
    this.#observers.clear();
    return this;
  }

  notifyObservers(event: WindowResizeSubjectEvent) {
    this.#observers.forEach((observer) => {
      observer(event);
    });
    return this;
  }

  subscribe() {
    if (typeof window === 'undefined') {
      return this;
    }
    if (this.#subscribed) {
      return this;
    }
    window.addEventListener('resize', this.#handler);
    window.addEventListener('orientationchange', this.#handler);
    this.#subscribed = true;
    return this;
  }

  unsubscribe() {
    if (!this.#subscribed) {
      return this;
    }
    window.removeEventListener('resize', this.#handler);
    window.removeEventListener('orientationchange', this.#handler);
    this.#subscribed = false;
    return this;
  }

  setDelay(delay: number) {
    this.#delay = delay;
    return this;
  }

  info() {
    return {
      delay: this.#delay,
      subscribed: this.#subscribed,
      observersCount: this.#observers.size,
    };
  }

  dispatch() {
    this.#dispatch();
    return this;
  }

  #getEvent(): WindowResizeSubjectEvent {
    if (typeof window === 'undefined') {
      return {
        width: 0,
        height: 0,
      };
    }

    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  #dispatch() {
    const event = this.#getEvent();
    this.notifyObservers(event);
  }

  #handleResize() {
    clearTimeout(this.#timer);
    window.setTimeout(() => {}, 1);
    this.#timer = window.setTimeout(() => {
      this.#dispatch();
    }, this.#delay);
  }
}
