export const getWindowWidth = (): number => {
  return typeof window !== 'undefined' ? window.innerWidth : 0;
};

export const getWindowHeight = (): number => {
  return typeof window !== 'undefined' ? window.innerHeight : 0;
};
