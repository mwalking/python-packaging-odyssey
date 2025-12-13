export const readingTime = (text) => {
  const words = text?.split(/\s+/)?.length || 0;
  return Math.max(3, Math.ceil(words / 200));
};
