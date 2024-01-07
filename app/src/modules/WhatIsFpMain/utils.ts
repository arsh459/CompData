import {
  mealIconFrame60,
  paceIconFrame60,
  shopIconFrame60,
  stepIconFrame60,
} from "@constants/imageKitURL";
export type navigateFromFpDetail = "workouts" | "meals" | "steps" | "rewards";
export interface IconAndTextInterface {
  iconUri: string;
  text: string;
  navigateTo: navigateFromFpDetail;
}

export interface WhatIsFpData {
  heading: string;
  data: IconAndTextInterface[];
}

export const whatIsFpData: WhatIsFpData[] = [
  {
    heading: "What to do?",
    data: [
      {
        iconUri: paceIconFrame60,
        text: "Workouts. You can earn FP \nby working out on the app.",
        navigateTo: "workouts",
      },
      {
        iconUri: mealIconFrame60,
        text: "You can follow your nutrition \nplan. Each meal gets you FP.",
        navigateTo: "meals",
      },
      {
        iconUri: stepIconFrame60,
        text: "Walking. 1000 steps is 1FP. So, \nwalk away!",
        navigateTo: "steps",
      },
    ],
  },
  {
    heading: "Where to use fitpoints?",
    data: [
      {
        iconUri: shopIconFrame60,
        text: "You can redeem these points in the \nSocialBoat shop. We have products \n& deals from exciting brands.",
        navigateTo: "rewards",
      },
    ],
  },
];
