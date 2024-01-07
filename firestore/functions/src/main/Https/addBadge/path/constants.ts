import {
  AchievementPathDataItem,
  AchievementPathDataItemTypes,
  // pcosSymptoms,
} from "../../../../models/User/User";

export const energyLevelIcon =
  "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Frame_1353_5QT9Erfbs.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675754015436";
export const pcosPcodIcon =
  "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Frame_1343_ezpbF5_aE.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675674729089";

export const icons: { [key: string]: string } = {
  conboardingCall:
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
};

export const lowerNormalCycleLength = 21;
export const upperNormalCycleLength = 35;
export const lowerNormalPeriodLength = 2;
export const upperNormalPeriodLength = 7;
export const lowerNormalSleepTime = 6;
export const upperNormalSleepTime = 8;
export const normalWeightDelta = 3;
export const normalCycleDaysDeltaForMonth = 7;
export const normalPeriodDaysDeltaForMonth = 3;

export const acneIcon =
  "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Frame_1347_yNQhxxh48.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675688616517";

export const darkeningSkinIcon =
  "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Frame_1348__CYtwcNPz.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675689650218";

export const fatigueIcon =
  "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Vector_DaDJqo3SA.png?updatedAt=1685716434663";

export const facialAndExcessHairIcon =
  "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Frame_1349_j-TF5J9L7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675689650186";

export const badMoodIcon =
  "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Frame_1350_wAIirbPor.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675689781964";

export const customisedPlanObj: AchievementPathDataItem = {
  icon: icons.customisation,
  text: "Customised plan",
  type: "customised_plan",
};

export const awardMap: Partial<Record<AchievementPathDataItemTypes, string>> = {
  weight: "1c1259d7-957f-4f92-8007-769aa0be6c1a",
  bad_mood: "a0e311ce-5c6d-4a6b-91ff-0edb67e27e7a",
  mood: "a0e311ce-5c6d-4a6b-91ff-0edb67e27e7a",
  fatigue: "5c073574-1be0-4597-a04d-afe1fd16a4ff",
  energy: "5c073574-1be0-4597-a04d-afe1fd16a4ff",
  // sleep: "f6d6c5c7-729f-4208-9cba-a7332d5feb32",
  cycleLength: "ba877f5f-daf1-4aec-ae2f-6e1ece1a964a",
  periodLength: "ba877f5f-daf1-4aec-ae2f-6e1ece1a964a",
};

export const iconMap: Record<AchievementPathDataItemTypes, string> = {
  mood: badMoodIcon,

  fatigue: fatigueIcon,
  customised_plan: icons.customisation,
  acne: acneIcon,
  sleep: icons.sleepImprovement,
  weight: icons.weightChange,
  cycleLength: icons.cycleRegulation,
  periodLength: pcosPcodIcon,
  energy: energyLevelIcon,
  bad_mood: badMoodIcon,
  darkening_skin: darkeningSkinIcon,
  facial_and_excess_hair: facialAndExcessHairIcon,
  hairfall: facialAndExcessHairIcon,
  workoutStreak: "",
  nutritionStreak: "",
  // sl
  // : facialAndExcessHairIcon,
};
