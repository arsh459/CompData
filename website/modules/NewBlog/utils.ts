import {
  call2020Icon,
  carbsIconWhiteFrame12,
  eggIconWhiteFrame12,
  fatsIconWhiteFrame12,
  fibreIconWhiteFrame12,
  nutri2020Icon,
  pace2020Icon,
} from "@constants/icons/iconURLs";

export interface TextAndIconInterface {
  text: string;
  imgUrl: string;
}
export interface StickyDataInterface {
  mainTitle: string;
  data: TextAndIconInterface[];
  btnText: string;
  link: string;
}
export const stickyData: StickyDataInterface = {
  mainTitle: "Fix acne related to PCOS/PCOD",
  data: [
    { imgUrl: call2020Icon, text: "Free consultation call" },
    { imgUrl: pace2020Icon, text: "Get Workout plan" },
    { imgUrl: nutri2020Icon, text: "Custom Nutrition plan" },
  ],
  btnText: "Talk to an Expert",
  link: "/start?origin=blog", //"https://api.whatsapp.com/send?phone=919958730020&text=Hi!",
};

export const getRoundedValue = (val?: number) => {
  if (val) {
    return (Math.round(val * 10) / 10).toFixed(1);
  }

  return "0.0";
};
export const getIconsNutriValues = (text: string) => {
  switch (text) {
    case "protein":
      return eggIconWhiteFrame12;
    case "carbs":
      return carbsIconWhiteFrame12;
    case "fats":
      return fatsIconWhiteFrame12;
    case "fibre":
      return fibreIconWhiteFrame12;
    default:
      null;
  }
};

export const percentageToFraction = (percentage: number): string => {
  if (isNaN(percentage) || percentage < 0 || percentage > 1) {
    return `${percentage}`;
  }

  const fraction = percentage;
  const wholeNumber = Math.floor(fraction);
  const remainder = fraction - wholeNumber;

  if (remainder === 0) {
    return `${wholeNumber}`;
  }

  let numerator = remainder * 100;
  let denominator = 100;

  // Reduce fraction to lowest terms
  const gcd = (a: number, b: number): number => {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  };
  const divisor = gcd(numerator, denominator);
  numerator /= divisor;
  denominator /= divisor;

  return wholeNumber === 0
    ? `${numerator}/${denominator}`
    : `${wholeNumber} ${numerator}/${denominator}`;
};

export const formatTimeFromSeconds = (seconds: number): string => {
  if (!seconds) return "";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);

  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};
