import {
  fitnessGoalObj,
  MealTypesDietForm,
  UserInterface,
} from "../../../models/User/User";

type familyHistoryKeys = "Diabetes" | "Cholesterol" | "BloodPressure";
type foodItemsPreferenceKeys = "lunch" | "breakfast" | "dinner";
type medicationKeys = "Vitamins" | "Minerals" | "Protein" | "Nutritional";
type addictionKeys = "Smoking" | "Alcohol";
type dailyIssuesKeys =
  | "Anxiety"
  | "Stress"
  | "Depression"
  | "Insomnia"
  | "Gastric";

type dietPreferenceKeys =
  | "Vegan"
  | "Vegetarian"
  | "NonVegetarian"
  | "Eggetarian";

type cuisinePreferenceKeys =
  | "NorthIndian"
  | "SouthIndian"
  | "Rajasthani"
  | "Gujarati"
  | "Maharashtrian"
  | "Bengali"
  | "Mughlai"
  | "Continental";

type allergiesKeys = "Lactose" | "Gluten" | "Nuts";

interface GptDietForm {
  medication: string;
  familyHistory: string;
  dailyIssues: string;
  dietPreference: string;
  cuisinePreference: string;
  foodItemsPreference: {};
  allergies: string;
  addiction: string;
}

export interface GptUserData {
  dailyCarbTarget: string;
  dailyFatsTarget: string;
  dailyFiberTarget: string;
  dailyProteinTarget: string;
  dailyKCalTarget: string;
  cycleLength?: string;
  fitnessConcerns: string;
  fitnessGoal: string;
  doctorForm: {
    surgicalHistorySummary: string;
  };
  dietForm: GptDietForm;
}

export interface doctorForm {
  pregnantHistory?: boolean;
  pregnancyDate?: string;
  surgicalHistory?: boolean;
  sexuallyActive?: boolean;
  surgeryBrief?: string;
  chiefComplain?: string;
}

export interface DietForm {
  familyHistory?: {
    Diabetes?: boolean;
    Cholesterol?: boolean;
    BloodPressure?: boolean;
  };
  workingHour?: number;
  medication?: {
    Vitamins?: boolean;
    Minerals?: boolean;
    Protein?: boolean;
    Nutritional?: boolean;
  };
  waterIntakeDaily?: number;
  outsideFoodInWeek?: number;
  exerciseDayInWeek?: number;
  addiction?: {
    Smoking?: boolean;
    Alcohol?: boolean;
  };
  dailyIssues?: {
    Anxiety?: boolean;
    Stress?: boolean;
    Depression?: boolean;
    Insomnia?: boolean;
    Gastric?: boolean;
  };
  dietPreference?: {
    Vegan?: boolean;
    Vegetarian?: boolean;
    NonVegetarian?: boolean;
    Eggetarian?: boolean;
  };
  cuisinePreference?: {
    NorthIndian?: boolean;
    SouthIndian?: boolean;
    Rajasthani?: boolean;
    Gujarati?: boolean;
    Maharashtrian?: boolean;
    Bengali?: boolean;
    Mughlai?: boolean;
    Continental?: boolean;
  };
  allergies?: {
    Lactose?: boolean;
    Gluten?: boolean;
    Nuts?: boolean;
  };
  foodItems?: Partial<Record<MealTypesDietForm, Record<string, boolean>>>;
  userLikesToSee?: string;
  familyHistoryText?: string;
  medicationText?: string;
  addictionText?: string;
  dailyIssuesText?: string;
  dietPreferenceText?: string;
  allergiesText?: string;
}

export const getRequiredData = (user: UserInterface) => {
  let formattedUser: GptUserData = {
    dailyCarbTarget: "",
    dailyFatsTarget: "",
    dailyFiberTarget: "",
    dailyProteinTarget: "",
    dailyKCalTarget: "",
    cycleLength: "",
    fitnessConcerns: "",
    fitnessGoal: "",
    doctorForm: {
      surgicalHistorySummary: "",
    },
    dietForm: {
      medication: "",
      familyHistory: "",
      dailyIssues: "",
      dietPreference: "",
      cuisinePreference: "",
      foodItemsPreference: {},
      allergies: "",
      addiction: "",
    },
  };

  if (!user.dietForm) {
    return undefined;
  }

  let dietForm = user.dietForm;
  let doctorForm = user.doctorForm;
  if (doctorForm) {
    formattedUser.doctorForm.surgicalHistorySummary =
      formattedUser.doctorForm.surgicalHistorySummary +
      " " +
      (doctorForm.surgeryBrief ? doctorForm.surgeryBrief : " ");
  }

  if (dietForm.familyHistory) {
    let familyHistory = dietForm.familyHistory;
    formattedUser.dietForm.familyHistory = Object.keys(familyHistory)
      .filter((item, index) => {
        return familyHistory[item as familyHistoryKeys];
      })
      .join(",");
  }

  if (dietForm.familyHistoryText) {
    formattedUser.dietForm.familyHistory += "," + dietForm.familyHistoryText;
  }

  if (dietForm.medication || dietForm.medicationText) {
    if (dietForm.medication) {
      let medication = dietForm.medication;
      formattedUser.dietForm.medication =
        formattedUser.dietForm.medication +
        Object.keys(medication)
          .filter((item, index) => {
            return medication[item as medicationKeys];
          })
          .join(",");
    }

    formattedUser.dietForm.medication =
      formattedUser.dietForm.medication +
      "," +
      (dietForm.medicationText ? dietForm.medicationText : "");
  }

  if (dietForm.addiction || dietForm.addictionText) {
    if (dietForm.addiction) {
      let addiction = dietForm.addiction;
      formattedUser.dietForm.addiction =
        formattedUser.dietForm.medication +
        Object.keys(addiction)
          .filter((item, index) => {
            return addiction[item as addictionKeys];
          })
          .join(",");
    }

    formattedUser.dietForm.addiction =
      formattedUser.dietForm.addiction +
      "," +
      (dietForm.addictionText ? dietForm.addictionText : "");
  }

  if (dietForm.dietPreference || dietForm.dietPreferenceText) {
    if (dietForm.dietPreference) {
      let dietPreference = dietForm.dietPreference;
      formattedUser.dietForm.dietPreference =
        formattedUser.dietForm.dietPreference +
        Object.keys(dietPreference)
          .filter((item, index) => {
            return dietPreference[item as dietPreferenceKeys];
          })
          .join(",");
    }

    formattedUser.dietForm.addiction =
      formattedUser.dietForm.addiction +
      "," +
      (dietForm.dietPreferenceText ? dietForm.dietPreferenceText : "");
  }

  if (dietForm.dailyIssues || user.pcosSymptoms || dietForm.dailyIssuesText) {
    if (dietForm.dailyIssues) {
      let dailyIssues = dietForm.dailyIssues;
      formattedUser.dietForm.dailyIssues =
        formattedUser.dietForm.dailyIssues +
        Object.keys(dailyIssues)
          .filter((item, index) => {
            return dailyIssues[item as dailyIssuesKeys];
          })
          .join(",");
    }

    formattedUser.dietForm.dailyIssues =
      formattedUser.dietForm.dailyIssues +
      " " +
      (dietForm.dailyIssuesText ? dietForm.dailyIssuesText : "");

    if (user.pcosSymptoms) {
      let pcosSymptoms = user.pcosSymptoms.join(",");
      formattedUser.dietForm.dailyIssues =
        formattedUser.dietForm.dailyIssues + " " + pcosSymptoms;
    }
  }

  if (dietForm.cuisinePreference) {
    let cuisinePreference = dietForm.cuisinePreference;
    formattedUser.dietForm.cuisinePreference =
      formattedUser.dietForm.cuisinePreference +
      Object.keys(cuisinePreference)
        .filter((item, index) => {
          return cuisinePreference[item as cuisinePreferenceKeys];
        })
        .join(",");
  }

  if (dietForm.allergies || dietForm.allergiesText) {
    if (dietForm.allergies) {
      let allergies = dietForm.allergies;
      formattedUser.dietForm.allergies =
        formattedUser.dietForm.allergies +
        Object.keys(allergies)
          .filter((item, index) => {
            return allergies[item as allergiesKeys];
          })
          .join(",");
    }

    formattedUser.dietForm.addiction =
      formattedUser.dietForm.addiction +
      "," +
      (dietForm.allergiesText ? dietForm.allergiesText : "");
  }

  if (user.fitnessConcerns) {
    let fitnessConcerns = user.fitnessConcerns;
    formattedUser.fitnessConcerns =
      formattedUser.fitnessConcerns + fitnessConcerns.join(",");
  }

  if (user.fitnessGoals || user.fitnessGoalText || user.fitnessGoal) {
    if (user.fitnessGoals) {
      let fitnessGoals = user.fitnessGoals;
      formattedUser.fitnessGoal =
        formattedUser.fitnessGoal +
        Object.keys(fitnessGoals)
          .filter((item, index) => {
            return fitnessGoals[item as keyof fitnessGoalObj];
          })
          .join(",");
    }

    formattedUser.fitnessGoal =
      formattedUser.fitnessGoal +
      "," +
      (user.fitnessGoalText ? user.fitnessGoalText : "");

    if (user.fitnessGoal) {
      formattedUser.fitnessGoal =
        formattedUser.fitnessGoal + "," + user.fitnessGoal.join(",");
    }
  }

  // foodItems:{
  //    "lunch":{
  //        "puran_poli":"hello"
  //     },
  //    "breakfast":{},
  //    "dinner":{}
  // }

  if (dietForm.foodItems) {
    let foodItems = dietForm.foodItems;
    Object.keys(foodItems).map((item) => {
      let eachItem = foodItems[item as MealTypesDietForm];
      if (eachItem) {
        Object.keys(eachItem).map(() => {
          return eachItem;
        });
      }
    });
  }

  return formattedUser;
};
