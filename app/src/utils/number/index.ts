export const formatWithCommas = (x: string | number | undefined) =>
  typeof x === "number" || typeof x === "string"
    ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "0";

export const nFormatter = (num: number) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
};

export const getScale = (
  start: number,
  end: number,
  reverse?: boolean
): number[] => {
  const scale: number[] = [];
  if (reverse) {
    for (let i: number = end; i >= start; i--) {
      scale.push(i);
    }
  } else {
    for (let i: number = start; i <= end; i++) {
      scale.push(i);
    }
  }
  return scale;
};
