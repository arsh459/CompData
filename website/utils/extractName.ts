export const extractName = (str: string) => {
  return str?.search(/[^a-zA-Z]/) === -1
    ? str
    : str.slice(0, str.search(/[^a-zA-Z]/));
};
