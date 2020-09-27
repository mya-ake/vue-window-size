import { WindowResizeSubject } from 'window-resize-subject';

// subject
let subject: WindowResizeSubject;
export const getSubject = (): WindowResizeSubject => {
  if (!subject) {
    subject = new WindowResizeSubject();
  }
  return subject;
};
