import { CommonActions, NavigationProp, Route } from "@react-navigation/native";
import { RootStackParamList } from "@routes/MainStack";
import { streakLabel } from "@providers/streakV2/interface";
import { streakData } from "@providers/streakV2/store/useStreakStoreV2";
import { streakLevelsObj } from "@providers/streakV2/utils/streakUpdate";
import { StackActions } from "@react-navigation/native";

export type streakNavActionType =
  | "startStreak" // start streak
  | "noAction" // no action
  | "streakMaintained" // 7 day streak hai, active-> activeHit
  | "streakRemoved" // todays streak moved to active. activeHit->active
  | "streakCompleted"; // achieved streak target. streakComplete, start new streak

export const getNavAction = (
  todayFp: number,
  dailyFPTarget: number,
  todayStreakStatus?: streakLabel,
  userStreak?: streakData
): streakNavActionType => {
  // console.log(todayFp , dailyFPTarget, todayStreakStatus);
  if (!userStreak) {
    return "startStreak";
  } else if (
    (todayStreakStatus === "active" || userStreak.pendingActiveHitView) &&
    todayFp >= dailyFPTarget
  ) {
    if (streakLevelsObj[userStreak.days]) {
      return "streakCompleted";
    } else {
      return "streakMaintained";
    }
    // if user streak exists, but not hit till now
  } else if (todayStreakStatus === "active" && todayFp < dailyFPTarget) {
    return "noAction";
  } else if (todayStreakStatus === "activeHit" && todayFp < dailyFPTarget) {
    return "streakRemoved";
  } else {
    return "noAction";
  }
};

export const createTrackNavigationUtils = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  back?: number,
  action?: streakNavActionType,
  nutritionBadgeId?: string,
  navBackScreen?: keyof RootStackParamList
) => {
  if (action === "startStreak") {
    // return () => navigation.navigate("StartStreakScreen");
    return () => {
      navigation.dispatch(StackActions.replace("StartStreakScreen"));
    };
  } else if (action === "streakMaintained") {
    // return () => navigation.navigate("StreakTodayCompleteScreen");
    return () => {
      navigation.dispatch(StackActions.replace("StreakTodayCompleteScreen"));
    };
  }

  if (back) {
    return () => {
      const popAction = StackActions.pop(back);
      navigation.dispatch(popAction);
    };
  }

  // if (action === "noAction") {
  //   return () => navigation.goBack();
  // }

  // if (action === "streakCompleted") {
  //   return () => navigation.goBack();
  // }
  // if (action === "streakRemoved") {
  //   return () => navigation.goBack();
  // }

  if (navBackScreen) {
    return () =>
      navigation.dispatch((state) => {
        const routes = state.routes;

        const updatedRoutes: Array<Route<string, object | undefined>> = [];
        for (const route of routes) {
          if (route.name === navBackScreen) {
            updatedRoutes.push(route);
            break;
          } else {
            updatedRoutes.push(route);
          }
        }

        return CommonActions.reset({
          ...state,
          routes: updatedRoutes,
          index: updatedRoutes.length - 1,
        });
      });
  }

  if (nutritionBadgeId) {
    return () =>
      navigation.navigate("NutritionScreen", { badgeId: nutritionBadgeId });
  } else {
    return () => navigation.goBack();
  }
};
