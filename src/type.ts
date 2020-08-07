export type Observer<Event = void> = (event: Event) => void;

export interface Subject<Event = void> {
  addObserver(name: string, observer: Observer<Event>): this;
  deleteObserver(name: string): this;
  notifyObservers(event: Event): void;
  subscribe(): this;
  unsubscribe(): this;
}

export type WindowResizeObserver = Observer<WindowResizeSubjectEvent>;
export type WindowResizeSubject = Subject<WindowResizeSubjectEvent>;
export type WindowResizeSubjectEvent = {
  width: number;
  height: number;
};
