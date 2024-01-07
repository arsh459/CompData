import {
  conceiveIconFrame32,
  orackleIconFrame32,
  planPeriodIconFrame32,
  regularCycleIconFrame32,
} from "@constants/imageKitURL";
import {
  periodTrackerGoal,
  periodTrackerObjectInterface,
} from "@models/User/User";
import firestore from "@react-native-firebase/firestore";
import crashlytics from "@react-native-firebase/crashlytics";

export const savePeriodTrackerObj = async (
  periodTrackerObj: periodTrackerObjectInterface,
  uid?: string
) => {
  if (periodTrackerObj && uid) {
    const userDocRef = firestore().collection("users").doc(uid);

    try {
      await userDocRef.update({ periodTrackerObj });
    } catch (error: any) {
      console.error("Error saving PeriodGoal:", error);
      crashlytics().recordError(error);
      throw new Error("Error saving PeriodGoal");
    }
  }
};

export const PeriodGoalList: {
  icon: string;
  text: string;
  type: periodTrackerGoal;
}[] = [
  {
    icon: orackleIconFrame32,
    text: "Predict your next period",
    type: "PERIOD_PREDUCTION",
  },
  {
    icon: conceiveIconFrame32,
    text: "Planning to conceive",
    type: "PREGNANCY",
  },
  {
    icon: planPeriodIconFrame32,
    text: "Birth control planning",
    type: "PREGNANCY_PREVENTION",
  },
  {
    icon: regularCycleIconFrame32,
    text: "Regularise your cycle",
    type: "PCOS_MANAGEMENT",
  },
];
export const PeriodGoalTextIcon = {
  PERIOD_PREDUCTION: {
    icon: orackleIconFrame32,
    text: "Predict your next period",
    type: "PERIOD_PREDUCTION",
  },
  PREGNANCY: {
    icon: conceiveIconFrame32,
    text: "Planning to conceive",
    type: "PREGNANCY",
  },
  PREGNANCY_PREVENTION: {
    icon: planPeriodIconFrame32,
    text: "Birth control planning",
    type: "PREGNANCY_PREVENTION",
  },
  PCOS_MANAGEMENT: {
    icon: regularCycleIconFrame32,
    text: "Regularise your cycle",
    type: "PCOS_MANAGEMENT",
  },
};
