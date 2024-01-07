import { Activity } from "@models/Activities/Activity";

export const getTaskProgress = (
  userActivities: Activity[],
  maxPoints: number,
  uid: string
) => {
  const selectedAct = getSelectedActivity(userActivities);
  // console.log("se", selectedAct?.activityName);
  const actPts = selectedAct?.calories
    ? Math.round(selectedAct?.calories / 300)
    : 0;

  // console.log("actPts", actPts, maxPoints);

  if (maxPoints === actPts && maxPoints !== 0) {
    return {
      currentPts: actPts,
      progress: 100,
      canPost: false,
      selectedAct,
    };
  } else if (actPts && maxPoints > actPts) {
    return {
      currentPts: actPts,
      progress: Math.round((actPts / maxPoints) * 100),
      canPost: true,
      selectedAct,
    };
  } else {
    return {
      currentPts: 0,
      progress: 0,
      canPost: true,
      selectedAct,
    };
  }
};

const getSelectedActivity = (userActivities: Activity[]) => {
  let maxCalories: number = 0;
  let selectedAct: Activity | undefined = undefined;

  let userActMaxCalories: number = 0;
  let userSelectedAct: Activity | undefined = undefined;
  // console.log("user", userActivities);
  for (const act of userActivities) {
    // console.log("act", act.activityName, act.calories);
    if (act.calories && act.calories > maxCalories) {
      // console.log("non zero act");
      selectedAct = act;
      maxCalories = act.calories;
    }

    if (act.calories && act.calories > userActMaxCalories) {
      // console.log("non zero my act");
      userSelectedAct = act;
      userActMaxCalories = act.calories;
    }

    if (
      act.reviewStatus === "PENDING" &&
      typeof act.calories === "number" &&
      act.calories >= maxCalories
    ) {
      // console.log("pending act");
      selectedAct = act;
      maxCalories = act.calories;
    }

    if (
      act.reviewStatus === "PENDING" &&
      typeof act.calories === "number" &&
      act.calories >= userActMaxCalories
    ) {
      // console.log("pending my act");
      userSelectedAct = act;
      userActMaxCalories = act.calories;
    }
  }

  return userSelectedAct ? userSelectedAct : selectedAct;
};

export const canUserCheckin = (
  userActivities: Activity[],
  canCheckIn?: boolean
) => {
  if (canCheckIn) {
    for (const act of userActivities) {
      if (act.source === "checkin") {
        return {
          canCheckIn: false,
          alreadyCheckedIn: true,
        };
      }
    }

    return {
      canCheckIn: true,
      alreadyCheckedIn: false,
    };
  }

  return {
    canCheckIn: false,
    alreadyCheckedIn: false,
  };
};
