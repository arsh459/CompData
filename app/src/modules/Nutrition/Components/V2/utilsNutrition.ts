export function toFirsttLowerCase(str: string) {
  if (str) {
    if (str.length > 1) {
      return str.charAt(0).toLowerCase() + str.slice(1);
    } else {
      return str.charAt(0).toLowerCase();
    }
  } else {
    return str;
  }
}
