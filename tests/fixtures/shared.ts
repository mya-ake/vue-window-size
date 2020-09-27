export const getWindowWidth = (): number => {
  return typeof window !== 'undefined' ? window.innerWidth : 0;
};

export const getWindowHeight = (): number => {
  return typeof window !== 'undefined' ? window.innerHeight : 0;
};

export const resizeWindow = (width: number, height: number) => {
  if (typeof width === 'number') {
    // @ts-ignore
    window.innerWidth = width;
  }
  if (typeof height === 'number') {
    // @ts-ignore
    window.innerHeight = height;
  }
  window.dispatchEvent(new Event('resize'));
};
