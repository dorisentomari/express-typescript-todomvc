export const randomStr = (): string => Math.random()
  .toString(32)
  .slice(2, 10)
  .toUpperCase();
