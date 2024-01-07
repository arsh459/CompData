import { db } from "@config/firebase";
import {
  AppointmentInterface,
  dietTypes,
  doctorFitnessGoal,
} from "@models/Appintment";
import { EditObject } from "@templates/PatientProfileTemplate/ProfileEdit/interface";
import { deleteField, doc, updateDoc } from "firebase/firestore";

export const getDoctorRecommendationEditObject = (
  appointment?: AppointmentInterface
): EditObject => {
  return {
    heading: "Doctor Recommendation",
    fieldsArr: [
      {
        id: "current-goal",
        name: "Current Goal",
        type: "dropdown",
        value: appointment?.prescriptionData?.lifestyle?.goal,
        onSave: async (val?: string) =>
          await onSavePrescriptionDataString(
            "lifestyle.goal",
            appointment?.id,
            val
          ),
        options: Object.keys(doctorFitnessGoal).map((each) => each),
      },
      {
        id: "weekly-exercise-goal",
        name: "Weekly Exercise goal",
        type: "text",
        value: appointment?.prescriptionData?.diagnosis,
        onSave: async (val?: string) =>
          await onSavePrescriptionDataString(
            "lifestyle.weeklyExerciseGoal",
            appointment?.id,
            val
          ),
      },
      {
        id: "weight-to-lose",
        name: "How much to lose?",
        type: "quntity",
        value: appointment?.prescriptionData?.lifestyle?.weightDelta,
        onSave: async (val?: number) =>
          await onSaveWeightDelta(appointment?.id, val),
        text: "kg",
        minVal: 0,
        maxVal: 50,
        step: 1,
      },
      {
        id: "diet-to-follow",
        name: "Diet to follow",
        type: "options",
        value: appointment?.prescriptionData?.diet?.particularDietToFollow,
        onSave: async (val?: string[], other?: string) =>
          await onSaveDietToFollow(appointment?.id, val),
        options: Object.keys(dietTypes).map((each) => each),
        showOther: false,
      },
      {
        id: "food-to-include",
        name: "Any Particular food items",
        type: "text",
        value: appointment?.prescriptionData?.diet?.particularFoodToInclude,
        onSave: async (val?: string) =>
          await onSavePrescriptionDataString(
            "diet.particularFoodToInclude",
            appointment?.id,
            val
          ),
      },
      {
        id: "nutrients-to-include",
        name: "Nutrients to include",
        type: "text",
        value: appointment?.prescriptionData?.diet?.nutrientsToInclude,
        onSave: async (val?: string) =>
          await onSavePrescriptionDataString(
            "diet.nutrientsToInclude",
            appointment?.id,
            val
          ),
      },
      {
        id: "note-to-dietician",
        name: "Note to dietician",
        type: "text",
        value: appointment?.prescriptionData?.diet?.noteForDietician,
        onSave: async (val?: string) =>
          await onSavePrescriptionDataString(
            "diet.noteForDietician",
            appointment?.id,
            val
          ),
      },
    ],
  };
};

export const onSavePrescriptionDataString = async (
  target:
    | "lifestyle.goal"
    | "lifestyle.weeklyExerciseGoal"
    | "diet.nutrientsToInclude"
    | "diet.particularFoodToInclude"
    | "diet.noteForDietician",
  id?: string,
  val?: string
) => {
  if (id) {
    await updateDoc(doc(db, "appointments", id), {
      [`prescriptionData.${target}`]: val || deleteField(),
    });
  }
};

const onSaveDietToFollow = async (id?: string, val?: string[]) => {
  if (id && val) {
    await updateDoc(doc(db, "appointments", id), {
      [`prescriptionData.diet.particularDietToFollow`]: val as dietTypes[],
    });
  }
};

const onSaveWeightDelta = async (id?: string, val?: number) => {
  if (id && val) {
    await updateDoc(doc(db, "appointments", id), {
      [`prescriptionData.lifestyle.weightDelta`]: val,
    });
  }
};
