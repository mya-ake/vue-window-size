/** types */
type SizeValue = number;
export type Size = {
  width: SizeValue;
  height: SizeValue;
};
export type InitailSize = Size;

const isBrowser = typeof window !== 'undefined';

const getWindowWidth = (): SizeValue => (isBrowser ? window.innerWidth : 0);
const getWindowHeight = (): SizeValue => (isBrowser ? window.innerHeight : 0);

const createInitailWidth = (value?: SizeValue): SizeValue =>
  value ?? getWindowWidth();
const createInitailHeight = (value?: SizeValue): SizeValue =>
  value ?? getWindowHeight();

export const createInitailSize = (size?: InitailSize): InitailSize => {
  return {
    width: createInitailWidth(size?.width),
    height: createInitailHeight(size?.height),
  };
};
