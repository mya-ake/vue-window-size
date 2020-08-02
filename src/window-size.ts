export default class WindowSize {
  private _width: number;
  private _height: number;
  private _delay: number;
  private _timer: number | undefined;
  private _initialized: boolean;
  private _handler: () => void;

  constructor({ defaults = { width: 800, height: 600 }, delay = 50 } = {}) {
    this._width = defaults.width;
    this._height = defaults.height;
    this._delay = delay;
    this._initialized = false;
    this._handler = this._handleResize.bind(this);
  }

  _handleResize() {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this.update();
    }, this._delay);
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get initialized() {
    return this._initialized;
  }

  update() {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
  }

  setDelay(delay: number) {
    this._delay = delay;
  }

  init() {
    if (typeof window === 'undefined') {
      return this;
    }
    if (this.initialized) {
      return this;
    }
    this.update();
    window.addEventListener('resize', this._handler);
    this._initialized = true;
    return this;
  }

  destroy() {
    if (!this.initialized) {
      return this;
    }
    window.removeEventListener('resize', this._handler);
    this._initialized = false;
    return this;
  }
}
