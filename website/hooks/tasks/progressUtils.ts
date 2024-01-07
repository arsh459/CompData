import { Activity } from "@models/Activities/Activity";

const getSelectedActivityV2 = (userActivities: Activity[]) => {
  let maxCalories: number = 0;
  let selectedAct: Activity | undefined = undefined;

  // let userActMaxCalories: number = 0;
  // let userSelectedAct: Activity | undefined = undefined;
  // console.log("user", userActivities);
  for (const act of userActivities) {
    if (act.progress) {
      selectedAct = act;
      maxCalories = act.calories ? act.calories : 0;
    }

    if (
      typeof act.calories === "number" &&
      act.calories &&
      act.calories >= maxCalories
    ) {
      // console.log("act here", act.calories);
      selectedAct = act;
      maxCalories = act.calories;
    }

    if (!selectedAct) {
      selectedAct = act;
    }
  }

  // console.log("max", maxCalories, selectedAct);

  return selectedAct;
};

export const getTaskProgressOfList = (
  userActivities: Activity[],
  maxPoints: number
  // uid: string
) => {
  const selectedAct = getSelectedActivityV2(userActivities);
  // console.log("selectedAct", selectedAct?.activityName);
  const actPts = selectedAct?.calories
    ? Math.round(selectedAct?.calories / 300)
    : 0;

  // console.log("actPts", selectedAct?.id, selectedAct?.progress);

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
    // console.log("hi");
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
