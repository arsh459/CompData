import { NavigationProp } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

export const handleWorkoutClick = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  badgeIdEnrolled?: string,
  badgeId?: string,
  startTime?: number
) => {
  if (badgeId) {
    if (badgeId === badgeIdEnrolled && badgeId && startTime) {
      navigation.navigate("Workout", {
        badgeId: badgeId,
      });
    } else {
      navigation.navigate("CoursePageScreen", {
        badgeId: badgeId,
        type: "workout",
      });
    }
  }

  weEventTrack("home_clickMyWorkoutPlan", {});
};

export const handleNutritionClick = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  nutritionBadgeIdEnrolled?: string,
  nutritionBadgeId?: string,
  startTime?: number
) => {
  if (nutritionBadgeId) {
    if (
      nutritionBadgeId === nutritionBadgeIdEnrolled &&
      nutritionBadgeId &&
      startTime
    ) {
      navigation.navigate("NutritionScreen", {
        badgeId: nutritionBadgeId,
      });
    } else {
      navigation.navigate("CoursePageScreen", {
        badgeId: nutritionBadgeId,
        type: "nutrition",
      });
    }
  } else {
    navigation.navigate("NutritionScreen", {
      badgeId: "",
    });
  }

  weEventTrack("home_clickMyWorkoutPlan", {});
};
