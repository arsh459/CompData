import { formatWithCommas } from "@utils/number";

export const getFatBurn = (cal?: number) => {
  if (!cal) {
    return "0g of fat";
  }
  if (cal > 9) {
    return `${formatWithCommas(Math.round((cal * 1) / 9))}g of fat`;
  }

  return "0g of fat";
};

export const getPrizeImage = (rank: number) => {
  if (rank === 1) {
    return "https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-medal-awards-justicon-lineal-color-justicon.png";
  } else if (rank === 2) {
    return "https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-medal-awards-justicon-lineal-color-justicon-1.png";
  } else if (rank === 3) {
    return "https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-medal-awards-justicon-lineal-color-justicon-2.png";
  } else {
    return "https://img.icons8.com/fluency/96/000000/trophy.png";
  }
};
