import { WindowResizeSubject } from './WindowResizeSubject';
export type {
  WindowResizeSubject,
  WindowResizeObserver,
} from './WindowResizeSubject';

// subject
let subject: WindowResizeSubject;
export const getSubject = (): WindowResizeSubject => {
  if (!subject) {
    subject = new WindowResizeSubject();
  }
  return subject;
};
