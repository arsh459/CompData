import { db } from "@config/firebase";
import { UserInterface } from "@models/User/User";
import { EditObject } from "@templates/PatientProfileTemplate/ProfileEdit/interface";
import { doc, updateDoc } from "firebase/firestore";

export const getMenstrualDetailsEditObject = (
  user?: UserInterface
): EditObject => {
  return {
    heading: "Menstrual Details",
    fieldsArr: [
      {
        id: "period-length",
        name: "Period Length",
        type: "quntity",
        value: user?.periodTrackerObj?.inputPeriodLength,
        onSave: async (val?: number) =>
          await onSavePeriodTrackerInput("inputPeriodLength", user?.uid, val),
        text: "day",
        minVal: 1,
        maxVal: 16,
        step: 1,
      },
      {
        id: "cycle-length",
        name: "Cycle Length",
        type: "quntity",
        value: user?.periodTrackerObj?.inputCycleLength,
        onSave: async (val?: number) =>
          await onSavePeriodTrackerInput("inputCycleLength", user?.uid, val),
        text: "day",
        minVal: 1,
        maxVal: 70,
        step: 1,
      },
    ],
  };
};

const onSavePeriodTrackerInput = async (
  target: "inputPeriodLength" | "inputCycleLength",
  id?: string,
  val?: number
) => {
  if (id && val) {
    await updateDoc(doc(db, "users", id), {
      [`periodTrackerObj.${target}`]: val,
    });
  }
};
