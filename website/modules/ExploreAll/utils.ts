export const getTailwindGradient = (colors?: string[]): string => {
  if (colors?.length !== 2) {
    return "";
  }

  const [color1, color2] = colors;

  return `from-[${color1}] to-[${color2}]`;
};

export const getGradient = (colors?: string[]): string => {
  const remoteColor =
    colors && colors.length > 1 ? colors : ["#FFFFFF", "#FFFFFF"];

  return `linear-gradient(180deg, ${remoteColor.join(",")})`;
};
