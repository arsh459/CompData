import { Activity } from "@models/Activity/Activity";

export const getTaskProgressV2 = (
  userActivities: Activity[],
  maxPoints: number,
  sprintStart?: number
) => {
  const sprintActs = sprintStart
    ? getSprintActivities(userActivities, sprintStart)
    : [];

  const allProg = getTaskProgressOfList(userActivities, maxPoints);
  const allSprintProg = getTaskProgressOfList(sprintActs, maxPoints);

  return {
    genProg: allProg,
    sprintProg: allSprintProg,
  };
};

export const getTaskProgressOfList = (
  userActivities: Activity[],
  maxPoints: number
  // uid: string
) => {
  const selectedAct = getSelectedActivityV2(userActivities);
  const actPts = selectedAct?.calories
    ? Math.round(selectedAct?.calories / 300)
    : 0;

  if (maxPoints === actPts && maxPoints !== 0) {
    return {
      currentPts: actPts,
      progress: 100,
      canPost: false,
      selectedAct,
      secProgress: selectedAct?.progress ? selectedAct.progress : 0,
      numActs: userActivities.length,
    };
  } else if (actPts && maxPoints > actPts) {
    return {
      currentPts: actPts,
      progress: Math.round((actPts / maxPoints) * 100),
      canPost: true,
      selectedAct,
      secProgress: selectedAct?.progress ? selectedAct.progress : 0,
      numActs: userActivities.length,
    };
  } else if (selectedAct?.progress) {
    return {
      currentPts: actPts,
      progress: Math.round((actPts / maxPoints) * 100),
      canPost: true,
      selectedAct,
      secProgress: selectedAct?.progress ? selectedAct.progress : 0,
      numActs: userActivities.length,
    };
  } else {
    return {
      currentPts: 0,
      progress: 0,
      canPost: true,
      selectedAct,
      secProgress: selectedAct?.progress ? selectedAct.progress : 0,
      numActs: userActivities.length,
    };
  }
};

export const getTaskProgress = (
  userActivities: Activity[],
  maxPoints: number
  // uid: string
) => {
  const selectedAct = getSelectedActivity(userActivities);
  const actPts = selectedAct?.calories
    ? Math.round(selectedAct?.calories / 300)
    : 0;

  if (maxPoints === actPts && maxPoints !== 0) {
    return {
      currentPts: actPts,
      progress: 100,
      canPost: false,
      selectedAct,
      numActs: userActivities.length,
    };
  } else if (actPts && maxPoints > actPts) {
    return {
      currentPts: actPts,
      progress: Math.round((actPts / maxPoints) * 100),
      canPost: true,
      selectedAct,
      numActs: userActivities.length,
    };
  } else {
    return {
      currentPts: 0,
      progress: 0,
      canPost: true,
      selectedAct,
      numActs: userActivities.length,
    };
  }
};

const getSprintActivities = (
  userActivities: Activity[],
  sprintStart: number
) => {
  return userActivities.filter(
    (item) => item.createdOn && item.createdOn > sprintStart
  );
};

export const getSelectedActivityV2 = (userActivities: Activity[]) => {
  let maxCalories: number = 0;
  let selectedAct: Activity | undefined = undefined;

  // let userActMaxCalories: number = 0;
  // let userSelectedAct: Activity | undefined = undefined;
  for (const act of userActivities) {
    // if activities done

    if (act.progress) {
      selectedAct = act;
      maxCalories = act.calories ? act.calories : 0;
    }

    if (
      typeof act.calories === "number" &&
      act.calories &&
      act.calories >= maxCalories
    ) {
      selectedAct = act;
      maxCalories = act.calories;
    }

    if (!selectedAct) {
      selectedAct = act;
    }

    // if (
    //   act.reviewStatus === "PENDING" &&
    //   typeof act.calories === "number" &&
    //   act.calories >= maxCalories
    // ) {
    //   selectedAct = act;
    //   maxCalories = act.calories;
    // }
  }

  return selectedAct;
};

const getSelectedActivity = (userActivities: Activity[]) => {
  let maxCalories: number = 0;
  let selectedAct: Activity | undefined = undefined;

  let userActMaxCalories: number = 0;
  let userSelectedAct: Activity | undefined = undefined;
  for (const act of userActivities) {
    if (act.calories && act.calories > maxCalories) {
      selectedAct = act;
      maxCalories = act.calories;
    }

    if (act.calories && act.calories > userActMaxCalories) {
      userSelectedAct = act;
      userActMaxCalories = act.calories;
    }

    if (
      act.reviewStatus === "PENDING" &&
      typeof act.calories === "number" &&
      act.calories >= maxCalories
    ) {
      selectedAct = act;
      maxCalories = act.calories;
    }

    if (
      act.reviewStatus === "PENDING" &&
      typeof act.calories === "number" &&
      act.calories >= userActMaxCalories
    ) {
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
