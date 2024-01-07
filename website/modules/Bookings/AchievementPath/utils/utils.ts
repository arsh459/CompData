import { UserInterface } from "@models/User/User";
import { icons } from "./constants";
import {
  AchievementPathData,
  AchievementPathDataItemStatusType,
} from "./interface";
import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@config/firebase";

export const fetchMonthsData = async (
  user?: UserInterface
): Promise<AchievementPathData[]> => {
  const data: AchievementPathData[] = [];

  if (user?.uid) {
    const docs = await getDocs(
      query(
        collection(doc(db, "users", user.uid), "goalAchievementPath"),
        orderBy("startTime", "asc")
      )
    );

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
    getOnboarding(!!nutritionBadgeId, !!badgeId),
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
      text: "Monthly checkup call",
      status,
      align,
    },
  };
};
