import { OpDataOverall } from "./utils";

export const getStringValues = (
  data: OpDataOverall,
  st: number,
  en: number
) => {
  const days = (en - st) / (24 * 60 * 60 * 1000);

  for (let i: number = 0; i < Math.ceil(days); i++) {}
};
