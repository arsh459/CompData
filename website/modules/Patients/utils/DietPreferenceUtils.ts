import {
  AllergiesEnum,
  CuisinePreferenceEnum,
  DietPreferenceEnum,
  FoodEnum,
  UserInterface,
} from "@models/User/User";
import {
  EditObject,
  FieldObject,
} from "@templates/PatientProfileTemplate/ProfileEdit/interface";
import { getSelectedArr, onSaveDietFormOptions } from "./MedicalHistoryUtils";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "@config/firebase";
import {
  getLocalUnixForUnix,
  unixToDestinationTimezone,
} from "@modules/Appointments/utils";
import { getTimezone } from "@templates/Recommendations/utils";

export const getDietPreferenceEditObject = (
  user?: UserInterface
): EditObject => {
  const foodTimings: FieldObject[] = Object.keys(FoodEnum).map((each) => {
    if (user?.dietForm?.foodTimings) {
      const unixValueInTZ = user.dietForm.foodTimings[each as FoodEnum];
      if (unixValueInTZ) {
        const newUnix = getLocalUnixForUnix(unixValueInTZ, getTimezone(user));

        return {
          id: `${each}-timing`,
          name: `${each[0].toUpperCase() + each.slice(1)} timing`,
          type: "date",
          value: newUnix,
          onSave: async (val?: number) =>
            await onSaveFoodTimings(
              each as FoodEnum,
              user?.uid,
              val,
              getTimezone(user)
            ),
          time: true,
        };
      }
    }

    return {
      id: `${each}-timing`,
      name: `${each[0].toUpperCase() + each.slice(1)} timing`,
      type: "date",
      value: user?.dietForm?.foodTimings
        ? user.dietForm.foodTimings[each as FoodEnum]
        : undefined,
      onSave: async (val?: number) =>
        await onSaveFoodTimings(
          each as FoodEnum,
          user?.uid,
          val,
          getTimezone(user)
        ),
      time: true,
    };
  });

  return {
    heading: "Diet Preference",
    fieldsArr: [
      {
        id: "preferred-cuisines",
        name: "Any Preferred cuisines",
        type: "options",
        value: getSelectedArr(user?.dietForm?.cuisinePreference),
        onSave: async (val?: string[], other?: string) =>
          await onSaveDietFormOptions(
            "cuisinePreference",
            user?.uid,
            val,
            other
          ),
        options: Object.keys(CuisinePreferenceEnum).map((each) => each),
        showOther: false,
      },
      {
        id: "preferred-meals",
        name: "Preferred Meals",
        type: "options",
        value: getSelectedArr(user?.dietForm?.dietPreference),
        onSave: async (val?: string[], other?: string) =>
          await onSaveDietFormOptions("dietPreference", user?.uid, val, other),
        options: Object.keys(DietPreferenceEnum).map((each) => each),
        other: user?.dietForm?.dietPreferenceText,
        showOther: true,
      },
      {
        id: "allergies",
        name: "Any Allergies?",
        type: "options",
        value: getSelectedArr(user?.dietForm?.allergies),
        onSave: async (val?: string[], other?: string) =>
          await onSaveDietFormOptions("allergies", user?.uid, val, other),
        options: Object.keys(AllergiesEnum).map((each) => each),
        other: user?.dietForm?.allergiesText,
        showOther: true,
      },
      ...foodTimings,
    ],
  };
};

const onSaveFoodTimings = async (
  target: FoodEnum,
  id?: string,
  val?: number,
  timezone?: string
) => {
  if (id && val) {
    const finalValue = unixToDestinationTimezone(val, timezone);

    await updateDoc(doc(db, "users", id), {
      [`dietForm.foodTimings.${target}`]: finalValue || deleteField(),
    });
  } else if (id) {
    await updateDoc(doc(db, "users", id), {
      [`dietForm.foodTimings.${target}`]: deleteField(),
    });
  }
};
