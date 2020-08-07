export type Observer<Event = void> = (event: Event) => void;

export interface Subject<Event = void> {
  addObserver(name: string, observer: Observer<Event>): void;
  deleteObserver(name: string): void;
  notifyObservers(event: Event): void;
  subscribe(): void;
  unsubscribe(): void;
}

export type WindowResizeObserver = Observer<WindowResizeSubjectEvent>;
export type WindowResizeSubjectEvent = {
  width: number;
  height: number;
};
