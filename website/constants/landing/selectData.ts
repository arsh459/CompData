import {
  beautyProfileData,
  cookingProfileData,
  financeProfileData,
  homeYogaProfileData,
} from "./home";

export const returnSelectedData = (num: number) => {
  if (num === 0) {
    return homeYogaProfileData;
  } else if (num === 2) {
    return financeProfileData;
  } else if (num === 1) {
    return beautyProfileData;
  } else if (num === 3) {
    return cookingProfileData;
  }

  return cookingProfileData;
};
