import { awardTypes } from "@models/Prizes/Prize";

export const getPrizeImgData = (
  prizeType: awardTypes,
  rank?: number,
  toName?: string,
  isTeam?: boolean
) => {
  if (
    // prizeType === "rank" ||
    prizeType === "monthlyRank" ||
    prizeType === "weeklyRank"
  ) {
    if (rank === 1) {
      return {
        img: "https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-medal-awards-justicon-lineal-color-justicon.png",
        name: "1st",
        subtext: isTeam ? "Team" : getName(toName),
      };
    } else if (rank === 2) {
      return {
        img: "https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-medal-awards-justicon-lineal-color-justicon-1.png",
        name: "2nd",
        subtext: isTeam ? "Team" : getName(toName),
      };
    } else {
      return {
        img: "https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-medal-awards-justicon-lineal-color-justicon-2.png",
        name: "3rd",
        subtext: isTeam ? "Team" : getName(toName),
      };
    }
  } else if (prizeType === "streak") {
    return {
      img: "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/000000/external-repeat-arrow-flatart-icons-lineal-color-flatarticons.png",
      name: "Hot streak",
      subtext: isTeam ? "Team" : `${getName(toName)}`,
    };
  } else if (prizeType === "tree") {
    return {
      img: "https://img.icons8.com/cotton/64/000000/tree.png",
      name: "Tree",
      subtext: isTeam ? "Team" : `${getName(toName)}`,
    };
  }
};

const getName = (nameString?: string) => {
  if (!nameString) {
    return "";
  }

  if (nameString.length > 24) {
    return `${nameString.slice(0, 20)}...`;
  }

  return nameString;
};
