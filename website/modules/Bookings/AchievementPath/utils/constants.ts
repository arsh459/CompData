import { AchievementPathData, AchievementPathDataItemTypes } from "./interface";

export const lowerNormalCycleLength = 21;
export const upperNormalCycleLength = 35;
export const lowerNormalPeriodLength = 2;
export const upperNormalPeriodLength = 7;
export const lowerNormalSleepTime = 6;
export const upperNormalSleepTime = 8;
export const normalWeightDelta = 3;

export type GetDataType = "genrate" | "fetch";

export const icons: { [key: string]: string } = {
  onboardingCall:
    "https://ik.imagekit.io/socialboat/__7eMcUXsZSH.png?updatedAt=1685464007534",
  dietConsultation:
    "https://ik.imagekit.io/socialboat/__l0UKFlLaxY.png?updatedAt=1683961991729",
  coachConsultation:
    "https://ik.imagekit.io/socialboat/___%EF%B8%8F__A-_tViYK.png?updatedAt=1683961992007",
  checkupDone:
    "https://ik.imagekit.io/socialboat/__igJCDA7S3M.png?updatedAt=1685688522201",
  goalAchieved:
    "https://ik.imagekit.io/socialboat/bagdd_1_sMXEo79x1.png?updatedAt=1685460448496",
  customisation:
    "https://ik.imagekit.io/socialboat/__dn9wSfe3tf.png?updatedAt=1685686888939",
  weightChange:
    "https://ik.imagekit.io/socialboat/__LqVECRsOv.png?updatedAt=1685686889107",
  moodBoost:
    "https://ik.imagekit.io/socialboat/__mMlup4hhl.png?updatedAt=1685686888880",
  cycleRegulation:
    "https://ik.imagekit.io/socialboat/regularcycle_jcfea9JVn_.png?updatedAt=1683184469698",
  sleepImprovement:
    "https://ik.imagekit.io/socialboat/__s_T7XBfRd.png?updatedAt=1685686888980",
  increaseStrength:
    "https://ik.imagekit.io/socialboat/___suNmoFvP4.png?updatedAt=1690893479918",
  acidityGastricIssue:
    "https://ik.imagekit.io/socialboat/__LGpdfdwV2e.png?updatedAt=1690893479967",
  facialHair:
    "https://ik.imagekit.io/socialboat/Frame%201897_EQdCBzdko.png?updatedAt=1690899288546",
  acne: "https://ik.imagekit.io/socialboat/Group%201000001030_RjnLtoGxa.png?updatedAt=1690893482668",
  headahe:
    "https://ik.imagekit.io/socialboat/___%E2%99%80%EF%B8%8F_h6rIdW1wa9.png?updatedAt=1690893479992",
  hairfall:
    "https://ik.imagekit.io/socialboat/Group%201143_Ot2Gs4uaB.png?updatedAt=1690893482582",
  cramps:
    "https://ik.imagekit.io/socialboat/__eSbh_wmHO.png?updatedAt=1690893483186",
  bloating:
    "https://ik.imagekit.io/socialboat/__L6BGSR0dp.png?updatedAt=1690893479965",
  fatigue:
    "https://ik.imagekit.io/socialboat/__P0JYdVPc3x.png?updatedAt=1690893479958",
  badMood:
    "https://ik.imagekit.io/socialboat/__9wQLl1jIuD.png?updatedAt=1690893479995",
  nausea:
    "https://ik.imagekit.io/socialboat/__2Fk-IbqOTi.png?updatedAt=1690893480028",
  diarrhea:
    "https://ik.imagekit.io/socialboat/__2neeX3l0-7.png?updatedAt=1690893479944",
  constipation:
    "https://ik.imagekit.io/socialboat/__MVq22J5-3.png?updatedAt=1690893479958",
  adbominalPain:
    "https://ik.imagekit.io/socialboat/Group%201000001032_SSlQvLlmhn.png?updatedAt=1690893483217",
  backPain:
    "https://ik.imagekit.io/socialboat/Group%201000001031_2IAQNix9nB.png?updatedAt=1690893483248",
  highEnergy:
    "https://ik.imagekit.io/socialboat/__Mpx80Y0T63.png?updatedAt=1690893480027",
};

export const onboarding: AchievementPathData = {
  items: [
    {
      icon: icons.dietConsultation,
      text: "Diet Consultation",
    },
    {
      icon: icons.coachConsultation,
      text: "Coach Consultation",
    },
  ],
  title: {
    icon: icons.conboardingCall,
    text: "Onboarding",
  },
};

export const achieved: AchievementPathData = {
  title: {
    icon: icons.goalAchieved,
    text: "100% Goal Acheived",
  },
};

export const AchievementPathDataItemTypesArr: AchievementPathDataItemTypes[] = [
  "acne",
  "darkening_skin",
  "facial_and_excess_hair",
  "hairfall",
  "bad_mood",
  "fatigue",
  "weight",
  "cycleLength",
  "periodLength",
  "mood",
  "energy",
  "customised_plan",
  "sleep",
];
