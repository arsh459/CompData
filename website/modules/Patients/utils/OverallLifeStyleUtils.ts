import { db } from "@config/firebase";
import {
  AddictionEnum,
  MedicationEnum,
  UserInterface,
  fitnessGoalTypes,
  workoutStyleTypes,
} from "@models/User/User";
import { EditObject } from "@templates/PatientProfileTemplate/ProfileEdit/interface";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import {
  getSelectedArr,
  onSaveDietFormOptions,
  onSaveDoctorFormBoolean,
  onSaveUserNumber,
} from "./MedicalHistoryUtils";

export const getOverallLifeStyleEditObject = (
  user?: UserInterface
): EditObject => {
  return {
    heading: "Overall LifeStyle",
    fieldsArr: [
      {
        id: "fitness-goal",
        name: "What is your fitness goal",
        type: "dropdown",
        value: user?.fitnessGoal?.length ? user.fitnessGoal[0] : undefined,
        onSave: async (val?: string) => await onSaveFitnessGoal(user?.uid, val),
        options: ["pcos_pcod", "regularise_cycle", "lose_weight", "keep_fit"],
      },
      {
        id: "workout-frequency",
        name: "How often do you works out?",
        type: "quntity",
        value: user?.dietForm?.exerciseDayInWeek,
        onSave: async (val?: number) =>
          await onSaveDietFormNumber("exerciseDayInWeek", user?.uid, val),
        text: "times/week",
        minVal: 0,
        maxVal: 7,
        step: 1,
      },
      {
        id: "workout-preference",
        name: "What is your preferred workout style",
        type: "dropdown",
        value: user?.workoutStyle || undefined,
        onSave: async (val?: string) =>
          await onSaveWorkoutStyle(user?.uid, val),
        options: ["HIIT", "Yoga", "Running"],
      },
      {
        id: "water-consumption",
        name: "Daily water consumption",
        type: "quntity",
        value: user?.dietForm?.waterIntakeDaily,
        onSave: async (val?: number) =>
          await onSaveDietFormNumber("waterIntakeDaily", user?.uid, val),
        text: "glass a day",
        minVal: 3,
        maxVal: 18,
        step: 1,
      },
      {
        id: "working-hours",
        name: "Usual Working Hours",
        type: "quntity",
        value: user?.dietForm?.workingHour,
        onSave: async (val?: number) =>
          await onSaveDietFormNumber("workingHour", user?.uid, val),
        text: "hours a day",
        minVal: 0,
        maxVal: 16,
        step: 1,
      },
      {
        id: "sleep-quality",
        name: "Avg Sleep Quality",
        type: "quntity",
        value: user?.sleepQuality,
        onSave: async (val?: number) =>
          await onSaveUserNumber("sleepQuality", user?.uid, val),
        text: "hours a day",
        minVal: 2,
        maxVal: 16,
        step: 1,
      },
      {
        id: "medication",
        name: "Any supplements taken",
        type: "options",
        value: getSelectedArr(user?.dietForm?.medication),
        onSave: async (val?: string[], other?: string) =>
          await onSaveDietFormOptions("medication", user?.uid, val, other),
        options: Object.keys(MedicationEnum).map((each) => each),
        other: user?.dietForm?.medicationText,
        showOther: true,
      },
      {
        id: "eating-out-frequency",
        name: "Eating out frequency",
        type: "quntity",
        value: user?.dietForm?.outsideFoodInWeek,
        onSave: async (val?: number) =>
          await onSaveDietFormNumber("outsideFoodInWeek", user?.uid, val),
        text: "times a week",
        minVal: 0,
        maxVal: 7,
        step: 1,
      },
      {
        id: "addiction",
        name: "Any addictions",
        type: "options",
        value: getSelectedArr(user?.dietForm?.addiction),
        onSave: async (val?: string[], other?: string) =>
          await onSaveDietFormOptions("addiction", user?.uid, val, other),
        options: Object.keys(AddictionEnum).map((each) => each),
        other: user?.dietForm?.addictionText,
        showOther: true,
      },
      {
        id: "sexual-active",
        name: "Sexual Active",
        type: "dropdown",
        value: user?.doctorForm?.sexuallyActive ? "Yes" : undefined,
        onSave: async (val?: string) =>
          await onSaveDoctorFormBoolean("sexuallyActive", user?.uid, val),
        options: ["Yes", "No"],
      },
    ],
  };
};

export const onSaveDietFormNumber = async (
  target:
    | "exerciseDayInWeek"
    | "waterIntakeDaily"
    | "workingHour"
    | "outsideFoodInWeek",
  id?: string,
  val?: number
) => {
  if (id && val) {
    await updateDoc(doc(db, "users", id), {
      [`dietForm.${target}`]: val,
    });
  }
};

export const onSaveWorkoutStyle = async (id?: string, val?: string) => {
  if (id) {
    await updateDoc(doc(db, "users", id), {
      workoutStyle:
        val && val !== "NO VALUE" ? (val as workoutStyleTypes) : deleteField(),
    });
  }
};

export const onSaveFitnessGoal = async (id?: string, val?: string) => {
  if (id) {
    await updateDoc(doc(db, "users", id), {
      fitnessGoal:
        val && val !== "NO VALUE" ? [val as fitnessGoalTypes] : deleteField(),
    });
  }
};
