export const setChar = (text: string, length: number) => {
  if (text && length && text.length > length) {
    return text.substring(0, length);
  }
  return text;
};
