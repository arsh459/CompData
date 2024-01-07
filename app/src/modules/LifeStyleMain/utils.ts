import {
  insomniaEmoji,
  smokingCigratteIcon,
  alchohalGlassIcon,
  anxietyIcon,
  stressIcon,
  depressionIcon,
  gastricIssueIcon,
  vegDietIcon,
  veganDietIcon,
  nonVegDietIcon,
  eggDietIcon,
  northIndianCuisine,
  southIndianCuisine,
  rajasthaniCuisine,
  gujratiCuisine,
  mhCuisine,
  bengalCuisine,
  mughlaiCuisine,
  continentalCuisine,
  lactoseIcon,
  glutenIcon,
  nutsIcon,
  lunchIconWhiteFrame20,
  afternoonSnackIconWhiteFrame20,
  breakFastIconWhiteFrame20,
  dinnerIconWhiteFrame20,
} from "@constants/imageKitURL";
import { MealTypesDietForm } from "@models/User/User";
import firestore from "@react-native-firebase/firestore";
import { CommonActions, NavigationProp } from "@react-navigation/native";

export type SelectedType = {
  [key: string]: boolean | undefined;
};

export type DailyAddictionType = "Smoking" | "Alcohol";

export type DailyIssuesType =
  | "Anxiety"
  | "Stress"
  | "Depression"
  | "Insomnia"
  | "Gastric";

export type DietPrefrenceType =
  | "Vegan"
  | "Vegetarian"
  | "NonVegetarian"
  | "Eggetarian";

export const DailyAddictionList: {
  icon: string;
  text: string;
  type: DailyAddictionType;
}[] = [
  {
    icon: smokingCigratteIcon,
    text: "Smoking",
    type: "Smoking",
  },
  {
    icon: alchohalGlassIcon,
    text: "Alcohol",
    type: "Alcohol",
  },
];

export type FamilyHistoryIssuesType =
  | "Diabetes"
  | "Cholesterol"
  | "BloodPressure";

export const FamilyHistoryIssuesList: {
  text: string;
  type: FamilyHistoryIssuesType;
}[] = [
  {
    text: "Diabetes",
    type: "Diabetes",
  },
  {
    text: "Cholesterol",
    type: "Cholesterol",
  },
  {
    text: "Blood Pressure",
    type: "BloodPressure",
  },
];

export type SupplementsType =
  | "Vitamins"
  | "Minerals"
  | "Protein"
  | "Nutritional";

export const SupplementsList: {
  text: string;
  type: SupplementsType;
}[] = [
  {
    text: "Vitamins",
    type: "Vitamins",
  },
  {
    text: "Minerals",
    type: "Minerals",
  },
  {
    text: "Protein Supplements",
    type: "Protein",
  },
  {
    text: "Nutritional Supplements",
    type: "Nutritional",
  },
];

export const FoodTimeList: {
  text: string;
  type: MealTypesDietForm;
  icon: string;
  color: string;
  timeColor: string;
}[] = [
  {
    text: "Breakfast",
    type: "breakfast",
    icon: breakFastIconWhiteFrame20,
    color: "#FFA53A",
    timeColor: "#FFD7A7",
  },
  {
    text: "Lunch",
    type: "lunch",
    icon: lunchIconWhiteFrame20,
    color: "#F6527A",
    timeColor: "#FFB2C5",
  },
  {
    text: "Dinner",
    type: "dinner",
    icon: dinnerIconWhiteFrame20,
    color: "#3AC4FF",
    timeColor: "#A8E5FF",
  },
];

export type AllergyType = "Lactose" | "Gluten" | "Nuts";

export const AllergyList: {
  text: string;
  type: AllergyType;
  icon: string;
}[] = [
  {
    text: "Lactose intolerant",
    type: "Lactose",
    icon: lactoseIcon,
  },
  {
    text: "Gluten intolerant",
    type: "Gluten",
    icon: glutenIcon,
  },
  {
    text: "Nuts Allergy",
    type: "Nuts",
    icon: nutsIcon,
  },
];

export const DietPrefrenceList: {
  icon: string;
  text: string;
  type: DietPrefrenceType;
}[] = [
  {
    icon: veganDietIcon,
    text: "Vegan",
    type: "Vegan",
  },
  {
    icon: vegDietIcon,
    text: "Vegetarian",
    type: "Vegetarian",
  },
  {
    icon: nonVegDietIcon,
    text: "Non Vegetarian",
    type: "NonVegetarian",
  },

  {
    icon: eggDietIcon,
    text: "Eggetarian",
    type: "Eggetarian",
  },
];

export const DailyIssuesList: {
  icon: string;
  text: string;
  type: DailyIssuesType;
}[] = [
  {
    icon: anxietyIcon,
    text: "Anxiety",
    type: "Anxiety",
  },
  {
    icon: stressIcon,
    text: "Stress",
    type: "Stress",
  },
  {
    icon: depressionIcon,
    text: "Depression",
    type: "Depression",
  },
  {
    icon: insomniaEmoji,
    text: "Insomnia",
    type: "Insomnia",
  },
  {
    icon: gastricIssueIcon,
    text: "Gastric issues",
    type: "Gastric",
  },
];

export type CuisinePrefrenceType =
  | "NorthIndian"
  | "SouthIndian"
  | "Rajasthani"
  | "Gujarati"
  | "Maharashtrian"
  | "Bengali"
  | "Mughlai"
  | "Continental";

export interface CuisineCardInterface {
  icon: string;
  text: string;
  type: CuisinePrefrenceType;
}

export const CuisinePrefrenceList: CuisineCardInterface[] = [
  {
    icon: northIndianCuisine,
    text: "North Indian",
    type: "NorthIndian",
  },
  {
    icon: southIndianCuisine,
    text: "South Indian",
    type: "SouthIndian",
  },
  {
    icon: rajasthaniCuisine,
    text: "Rajasthani",
    type: "Rajasthani",
  },
  {
    icon: gujratiCuisine,
    text: "Gujarati",
    type: "Gujarati",
  },
  {
    icon: mhCuisine,
    text: "Maharashtrian",
    type: "Maharashtrian",
  },
  {
    icon: bengalCuisine,
    text: "Bengali",
    type: "Bengali",
  },
  {
    icon: mughlaiCuisine,
    text: "Mughlai",
    type: "Mughlai",
  },
  {
    icon: continentalCuisine,
    text: "Continental",
    type: "Continental",
  },
];

export const updateUserField = async (
  uid?: string,
  val?: { [key: string]: any }
) => {
  if (val && uid) {
    const remoteVal: { [key: string]: any } = {};

    Object.keys(val).forEach((each) => {
      if (typeof val[each] === "undefined") {
        remoteVal[each] = firestore.FieldValue.delete();
      } else {
        remoteVal[each] = val[each];
      }
    });

    await firestore().collection("users").doc(uid).update(remoteVal);
  }
};

export const backTwoTimes = (
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  navigation.dispatch((state) => {
    const routes = state.routes;

    if (routes.length > 2) {
      routes.pop();
      routes.pop();
    }

    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1,
    });
  });
};

export const getSelectFoodItemsHeaderIcon = (mealType?: MealTypesDietForm) => {
  switch (mealType) {
    case "lunch":
      return { icon: lunchIconWhiteFrame20, text: "Lunch" };
    case "breakfast":
      return { icon: breakFastIconWhiteFrame20, text: "Breakfast" };
    case "dinner":
      return { icon: dinnerIconWhiteFrame20, text: "Dinner" };

    default:
      return { icon: afternoonSnackIconWhiteFrame20, text: "" };
  }
};

enum BreckfastOptionTypes {
  "rotiSabji" = "roti_sabji",
  "parantha" = "parantha",
  "omletteBread" = "omlette_bread",
  "sandwich" = "sandwich",
  "idliSambhar" = "idli_sambhar",
  "dosa" = "dosa",
  "oatmeal" = "oatmeal",
  "pancakes" = "pancakes",
}

enum LunchOptionTypes {
  "rajma_chawal" = "rajma_chawal",
  "sambar_rice" = "sambar_rice",
  "dal_rice" = "dal_rice",
  "rotiSabji" = "roti_sabji",
  "vegetable_pulao" = "vegetable_pulao",
  "roti_chicken" = "roti_chicken",
  "rice_egg" = "rice_egg",
  "aloo_paratha" = "aloo_paratha",
}

enum DinnerOptionTypes {
  "chicken_biryani" = "chicken_biryani",
  "palak_paneer" = "palak_paneer",
  "rotiSabji" = "roti_sabji",
  "masala_dosa" = "masala_dosa",
  "roti_aloo_gobi" = "roti_aloo_gobi",
  "vegetable_uttapam" = "vegetable_uttapam",
  "vegetable_khichdi" = "vegetable_khichdi",
  "vegetable_daliya" = "vegetable_daliya",
}

export const foodChoices = {
  breakfast: Object.keys(BreckfastOptionTypes).map((each) => each),
  lunch: Object.keys(LunchOptionTypes).map((each) => each),
  dinner: Object.keys(DinnerOptionTypes).map((each) => each),
};

export const formatFileSize = (bytes: number): string => {
  const kilobyte = 1024;
  const megabyte = kilobyte * 1024;
  const gigabyte = megabyte * 1024;

  if (bytes >= gigabyte) {
    return `${(bytes / gigabyte).toFixed(2)} GB`;
  } else if (bytes >= megabyte) {
    return `${(bytes / megabyte).toFixed(2)} MB`;
  } else if (bytes >= kilobyte) {
    return `${(bytes / kilobyte).toFixed(2)} KB`;
  } else {
    return `${bytes} bytes`;
  }
};
