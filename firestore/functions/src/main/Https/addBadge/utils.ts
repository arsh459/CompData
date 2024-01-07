import { UserInterface } from "../../../models/User/User";
import {
  ARJA_BEGINEER,
  GREESHA_PCOS,
  KOHLI,
  PV_SINDHU,
  SOCIALBOAT_BEGINNER,
} from "../taskGenerator/constants";
import { calculateKCalTarget } from "./calculateKCalTarget";

export const getKCalTarget = (userObj: UserInterface) => {
  return calculateKCalTarget(userObj);
};

export const getBadgeFPAndStepTargets = (userObj: UserInterface) => {
  let badgeId: string = "b36f6018-73d0-46b2-b230-29020060ea70";
  let dailyFPTarget: number = 10;
  let dailyStepTarget: number = 3000;

  let weightDel = 0;
  if (userObj.desiredWeight && userObj.weight) {
    weightDel = Math.abs(userObj.weight - userObj.desiredWeight);
  }

  if (userObj.fitnessGoal?.includes("pcos_pcod")) {
    badgeId = GREESHA_PCOS;
    dailyFPTarget = 10;
    dailyStepTarget = 3000;
  } else if (weightDel > 8 && userObj.workoutFrequency === "none") {
    badgeId = SOCIALBOAT_BEGINNER;
    dailyFPTarget = 10;
    dailyStepTarget = 3000;
  } else if (userObj.workoutFrequency === "none") {
    badgeId = ARJA_BEGINEER;
    dailyFPTarget = 10;
    dailyStepTarget = 3000;
  } else if (userObj.workoutFrequency === "1_3") {
    badgeId = ARJA_BEGINEER;
    dailyFPTarget = 20;
    dailyStepTarget = 5000;
  } else if (userObj.workoutFrequency === "2_5") {
    badgeId = PV_SINDHU;
    dailyFPTarget = 20;
    dailyStepTarget = 6000;
  } else if (userObj.workoutFrequency === "everyday") {
    badgeId = KOHLI;
    dailyFPTarget = 30;
    dailyStepTarget = 7500;
  } else {
    badgeId = ARJA_BEGINEER;
    dailyFPTarget = 10;
    dailyStepTarget = 3000;
  }

  return {
    badgeId,
    dailyFPTarget,
    dailyStepTarget,
  };
};
