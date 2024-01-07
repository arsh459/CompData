import {
  allTimeIconWhiteFrame16,
  cycleIconWhiteFrame16,
  docIcon,
  doctorConsultIconWhiteFrame16,
  fireIconWhiteFrame16,
  gainWeightWhiteFrame16,
  getFitIconWhiteFrame16,
  gymIconWhiteFrame16,
  homeWorkoutDietIconWhiteFrame16,
  neverTriedIconWhiteFrame16,
  otherAndLessTimeIconWhiteFrame16,
  paidDietIconWhiteFrame16,
  selfDiagnoseIconWhiteFrame16,
  shapeIconWhiteFrame16,
  workingNoTimeIconWhiteFrame16,
  workingSomeTimeIconWhiteFrame16,
} from "@constants/icons/iconURLs";
import {
  accurateGoalType,
  dailyHealthIssues,
  howBusyTypes,
  pastUsedMethodTypes,
} from "@models/User/User";

export const accurateGoalData: {
  icon: string;
  text: string;
  type: accurateGoalType;
}[] = [
  {
    icon: fireIconWhiteFrame16,
    type: "looseWeight",
    text: "Loose weight before a function",
  },
  {
    icon: cycleIconWhiteFrame16,
    type: "regularisePeriod",
    text: "Get regular periods",
  },
  {
    icon: gainWeightWhiteFrame16,
    type: "gainWeight",
    text: "Gain weight",
  },
  {
    icon: shapeIconWhiteFrame16,
    type: "motherBackInShape",
    text: "A new mother, want to get back in shape",
  },
  {
    icon: getFitIconWhiteFrame16,
    type: "getFitToConceive",
    text: "Get fit, Want to conceive soon",
  },
];
export const pastUsedMethodData: {
  icon: string;
  text: string;
  type: pastUsedMethodTypes;
}[] = [
  {
    icon: gymIconWhiteFrame16,
    type: "gym",
    text: "Worked out at a gym",
  },
  {
    icon: paidDietIconWhiteFrame16,
    type: "paidDiet",
    text: "Took paid diet plans",
  },
  {
    icon: doctorConsultIconWhiteFrame16,
    type: "doctorConsult",
    text: "Consulted with a doctor",
  },
  {
    icon: selfDiagnoseIconWhiteFrame16,
    type: "selfDiagnose",
    text: "Self Diagnosed Supplements",
  },
  {
    icon: homeWorkoutDietIconWhiteFrame16,
    type: "homeWorkoutDiet",
    text: "At Home workouts and Normal diet",
  },
  {
    icon: neverTriedIconWhiteFrame16,
    type: "notTried",
    text: "Never Tried Anything",
  },
];
export const howBusyData: {
  icon: string;
  text: string;
  type: howBusyTypes;
}[] = [
  {
    icon: workingNoTimeIconWhiteFrame16,
    type: "workingNoTime",
    text: "Working professional have no time",
  },
  {
    icon: workingSomeTimeIconWhiteFrame16,
    type: "workingSomeTime",
    text: "Working professional have some time",
  },
  {
    icon: allTimeIconWhiteFrame16,
    type: "allTime",
    text: "I have all the time for myself",
  },
  {
    icon: otherAndLessTimeIconWhiteFrame16,
    type: "otherAndLessTime",
    text: "I have limited time for myself",
  },
];

export const DailyIssuesList: {
  text: string;
  type: keyof dailyHealthIssues;
}[] = [
  {
    text: "PCOS",
    type: "pcos",
  },
  {
    text: "Thyroid",
    type: "thyroid",
  },
  {
    text: "Irregular periods",
    type: "irregularPeriods",
  },
  {
    text: "Back Issues",
    type: "backIssues",
  },
  {
    text: "Arthritis",
    type: "arthritis",
  },
  {
    text: "High BP",
    type: "highBp",
  },
  {
    text: "Cholestrol",
    type: "cholestrol",
  },
];

export const bookSlotData: { text: string; icon: string }[] = [
  {
    text: "Gynaecologist Consultation",
    icon: docIcon,
  },
  {
    text: "Menstrual Wellness workouts",
    icon: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Component%20150%20(1)_Mtn2DIw9D.png?updatedAt=1691576518387",
  },
  {
    text: "500+ Healthy Recipes and diet plan",
    icon: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Component%20149_RYCJi4nkR.png?updatedAt=1691576542323",
  },
  {
    text: "Free Health Consultation call",
    icon: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Component%20148%20(2)_mAC088ISF.png?updatedAt=1691576477712",
  },
];
