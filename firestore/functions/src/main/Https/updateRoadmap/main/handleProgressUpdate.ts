import { format } from "date-fns";
import {
  AchievementPathData,
  AchievementPathDataItem,
  AchievementPathDataItemStatusType,
  UserInterface,
} from "../../../../models/User/User";
import { getCurrValueUser, getProgressSubtext } from "./getCurrValueForUser";
import {
  Achiever,
  achieverProgress,
} from "../../../../models/awards/interface";
import { getRelevantAchiever } from "./achieverUpdate";
import { handleAchieverAward } from "./wonUpdates";

export const handleProgressUpdate = async (
  user: UserInterface,
  monthItems: AchievementPathData[],
) => {
  const achieversToUpdate: Achiever[] = [];
  const nowWon: Achiever[] = [];
  const nowLost: Achiever[] = [];
  // let totalTargets: number = 0;
  let completedTargets: number = 0;
  for (const month of monthItems) {
    console.log("");
    console.log("");
    console.log("");
    console.log(
      "monthStart",
      month.startTime ? format(new Date(month.startTime), "dd-MM-yyyy") : "",
    );
    if (month.items) {
      for (const monthItem of month.items) {
        const st = await getProgressValueForTargetStatus(
          user,
          monthItem,
          month.startTime,
          month.endTime,
        );

        if (st) {
          monthItem.status = st.status;
        }

        if (st?.status === "DONE") {
          completedTargets++;
        }

        // console.log("st", st);

        console.log(
          `type:${monthItem.type} | target:${monthItem.target} | targetCount:${monthItem.countNeeded} | comp:${monthItem.comparisonType} | status:${st?.status} | progress:${st?.progressText} | completed:${completedTargets}`,
        );
        console.log("");

        const achiever = await getRelevantAchiever(user.uid, monthItem, month);

        if (achiever?.length && st?.status) {
          // achiever[0].subtitle = st?.progressText;
          // achiever[0].awardStatus = st.status === "DONE" ? "WON" : "TARGET";
          const { updatedAchiever, type } = handleAchieverAward(
            achiever[0],
            st.status,
            st.progressText,
            st.progress,
            monthItem.countNeeded,
            month?.startTime ? format(new Date(month.startTime), "MMM") : "",
            st.unlockedOn,
          );

          if (type === "none") {
            console.log("regular badge");
            achieversToUpdate.push(updatedAchiever);
          } else if (type === "justWon") {
            console.log("WON badge");
            nowWon.push(updatedAchiever);
          } else {
            console.log("LOST badge");
            nowLost.push(updatedAchiever);
          }
        } else {
          console.log("No Badge");
        }
      }
    }
  }

  return {
    monthItemsUp: monthItems,
    achieversToUpdate,
    nowWon,
    nowLost,
    completedTargets: completedTargets,
  };
};

export const getProgressValueForTargetStatus = async (
  user: UserInterface,
  monthItem: AchievementPathDataItem,
  monthStart?: number,
  monthEnd?: number,
): Promise<
  | {
      status: AchievementPathDataItemStatusType;
      progressText: string;
      progress?: achieverProgress;
      steps?: number;
      stepSize?: number;
      unlockedOn?: number;
    }
  | undefined
> => {
  switch (monthItem.type) {
    case "customised_plan":
      return isPlanGiven(user);

    default:
      return await compareKPI(user, monthItem, monthStart, monthEnd);
  }
};

const isPlanGiven = (
  user: UserInterface,
): { status: AchievementPathDataItemStatusType; progressText: string } => {
  if (user.nutritionBadgeId) {
    return { status: "DONE", progressText: "" };
  }

  return { status: "PENDING", progressText: "" };
};

export const compareKPI = async (
  user: UserInterface,
  monthItem: AchievementPathDataItem,
  monthStart?: number,
  monthEnd?: number,
): Promise<
  | {
      status: AchievementPathDataItemStatusType;
      unlockedOn?: number;
      progressText: string;
      progress?: achieverProgress;
      steps?: number;
      stepSize?: number;
    }
  | undefined
> => {
  const target = monthItem.target;
  const countNeeded = monthItem.countNeeded ? monthItem.countNeeded : 1;
  const comparison = monthItem.comparisonType;
  const currValue = await getCurrValueUser(
    user,
    monthItem.type,
    monthItem.countNeeded,
    monthItem.target,
    monthStart,
    monthEnd,
  );

  console.log(
    "achiever state calculation",
    " target:",
    target,
    " countNeeded:",
    countNeeded,
    " comparison:",
    comparison,
    " currValue:",
    currValue?.value,
    " steps:",
    currValue?.steps,
    " stepSize:",
    currValue?.stepSize,
    " last logged:",
    currValue?.latestLoggedUnix
      ? format(new Date(currValue.latestLoggedUnix), "hh:mma dd-MM-yyyy")
      : "NA",
  );

  // console.log("month Target", target);
  // console.log("comparison", comparison);
  // console.log("currValue", currValue?.map);

  if (
    monthItem.type &&
    typeof target === "number" &&
    comparison &&
    typeof currValue?.value === "number"
  ) {
    const diff = Math.abs(currValue.value - target);

    const subText = getProgressSubtext(
      diff,
      target,
      countNeeded,
      monthItem.type,
      comparison,
    );

    if (comparison === "maintain" && currValue.value >= countNeeded) {
      return {
        status: "DONE",
        progressText: subText ? subText : "",
        progress: currValue.map ? currValue.map : {},
        steps: currValue.steps ? currValue.steps : -1,
        stepSize: currValue.stepSize ? currValue.stepSize : -1,
        unlockedOn: currValue.latestLoggedUnix,
      };
    } else if (comparison === "equate" && currValue.value === target) {
      return {
        status: "DONE",
        progressText: subText ? subText : "",
        unlockedOn: currValue.latestLoggedUnix,
      };
    } else if (comparison === "increase" && currValue.value >= target) {
      return {
        status: "DONE",
        progressText: subText ? subText : "",
        unlockedOn: currValue.latestLoggedUnix,
      };
    } else if (comparison === "reduce" && currValue.value <= target) {
      return {
        status: "DONE",
        progressText: subText ? subText : "",
        unlockedOn: currValue.latestLoggedUnix,
      };
    } else {
      // target: 82 kgs
      // currValue: 80 kgs
      // delta:

      return {
        status: "PENDING",
        progressText: subText ? subText : "",
        progress: currValue.map ? currValue.map : {},
        steps: currValue.steps ? currValue.steps : -1,
        stepSize: currValue.stepSize ? currValue.stepSize : -1,
      };
    }
  }

  return {
    status: "PENDING",
    progressText: "",
    progress: {},
    steps: -1,
    stepSize: -1,
  };

  // return undefined;
};
