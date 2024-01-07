import firestore from "@react-native-firebase/firestore";
import {
  AchievementPathData,
  AchievementPathDataItemStatusType,
} from "./interface";
import { icons } from "./constants";

export const fetchMonthsData = async (
  // user?: UserInterface
  uid: string
): Promise<AchievementPathData[]> => {
  const data: AchievementPathData[] = [];

  if (uid) {
    const docs = await firestore()
      .collection("users")
      .doc(uid)
      .collection("goalAchievementPath")
      .orderBy("startTime", "asc")
      .get();

    for (const doc of docs.docs) {
      if (doc.data()) {
        data.push(doc.data() as AchievementPathData);
      }
    }
  }

  return data;
};

export const refactorData = (
  data: AchievementPathData[],
  // user?: UserInterface
  nutritionBadgeId?: string,
  badgeId?: string,
  roadmapProgress?: number
): AchievementPathData[] => {
  const refactoredData: AchievementPathData[] = [
    getOnboarding(!!badgeId, !!nutritionBadgeId),
  ];

  const now = Date.now();

  data.forEach((each, index) => {
    refactoredData.push(each);

    const isTimeLinePass = each.endTime
      ? each.endTime < now
        ? "DONE"
        : "PENDING"
      : undefined;

    refactoredData.push(
      checkup(index % 2 === 0 ? "end" : "start", isTimeLinePass)
    );
  });

  const isProgressAbovePoint = roadmapProgress ? roadmapProgress > 95 : false;
  const isLastCallDone =
    refactoredData[refactoredData.length - 1].timeline?.status === "DONE";
  refactoredData.push(getAchieved(isProgressAbovePoint && isLastCallDone));

  return refactoredData;
};

export const getOnboarding = (
  hasBadgeId: boolean,
  hasNutritionId: boolean
): AchievementPathData => {
  console.log("hasBadgeId", hasBadgeId);
  console.log("hasNutritionId", hasNutritionId);
  return {
    items: [
      {
        icon: icons.dietConsultation,
        text: "Diet Consultation",
        status: hasNutritionId ? "DONE" : "PENDING",
      },
      {
        icon: icons.coachConsultation,
        text: "Workout Plan",
        status: hasBadgeId ? "DONE" : "PENDING",
      },
    ],
    title: {
      icon: icons.conboardingCall,
      text: "Onboarding",
      status: hasBadgeId && hasNutritionId ? "DONE" : "PENDING",
    },
  };
};

export const getAchieved = (isCompleted: boolean): AchievementPathData => {
  return {
    title: {
      icon: icons.goalAchieved,
      text: "100% Goal Acheived",
      status: isCompleted ? "DONE" : "PENDING",
    },
  };
};

export const checkup = (
  align: "start" | "end",
  status?: AchievementPathDataItemStatusType
): AchievementPathData => {
  return {
    timeline: {
      icon: icons.checkupDone,
      text: "4 Weekly Checkins",
      status,
      align,
    },
  };
};
