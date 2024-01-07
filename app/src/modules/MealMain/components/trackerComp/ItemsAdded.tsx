import { View, Text, useWindowDimensions } from "react-native";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { useMealStore } from "../../store/useMealStore";
import { shallow } from "zustand/shallow";
import SvgIcons from "@components/SvgIcons";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useUserStore } from "@providers/user/store/useUserStore";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { SwapItemParams } from "@screens/AddNewItemLoadingScreen/utils";
import { onSwapNutritionTask } from "@modules/SwapMain/utils";
import { usePostNavigationProvider } from "@modules/CircularProgressMain/providers/postNavigationProvider";
// import { createTrackNavigationUtils, getNavAction } from "./utils/navUtils";
import { getTodayFp } from "@providers/streakV2/utils/getTodayFp";
import { useStreakStore } from "@providers/streakV2/store/useStreakStoreV2";
import { streakUpdate } from "@providers/streakV2/utils/streakUpdate";
import { isToday } from "date-fns";
import { RootStackParamList } from "@routes/MainStack";
// import useTaskRecLocation from "./useTaskRecLocation";
import {
  createTrackNavigationUtils,
  getNavAction,
} from "@modules/MealMain/utils/navUtils";
import useDietCalendar from "@hooks/dietPlan/useDietCalendar";
import { useState } from "react";
import LoadingModal from "@components/loading/LoadingModal";

interface Props {
  toBeSwaped?: SwapItemParams;
  navBackScreen?: keyof RootStackParamList;
}
const ItemsAdded: React.FC<Props> = ({ toBeSwaped, navBackScreen }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const { state, todayUnix, today } = useAuthContext();
  // const { selectedUnix } = useDayContext();
  const { activeUnix } = useDietCalendar((state) => ({
    activeUnix: state.active?.unix,
  }));
  const { uid, participatingInGameWithTeam } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
      participatingInGameWithTeam: user?.participatingInGameWithTeam,
    };
  }, shallow);

  const setContinueCallback = usePostNavigationProvider(
    (state) => state.setContinueCallback,
    shallow
  );
  const { userStreak, todayStreakStatus, dailyFPTarget } = useStreakStore(
    (state) => ({
      userStreak: state.streak,
      dailyFPTarget: state.streak?.targetFp ? state.streak?.targetFp : 0,
      todayStreakStatus:
        state.streak && state.streak.streakMap[today]
          ? state.streak.streakMap[today]
          : undefined,
    }),
    shallow
  );

  const {
    itemsAddedLength,
    modificationLength,
    isLocked,
    fpStr,
    fpProg,
    taskName,
    onTrackMeal,
    taskId,
  } = useMealStore((state) => {
    return {
      itemsAddedLength: Object.values(state.subTaskState).length,
      modificationLength: Object.values(state.modification).length,
      isLocked: state.isLocked,
      fpStr: `${state.localFP}/${state.totalFP}`,
      fpProg: state.localFP / state.totalFP || 0,
      taskName: state.task?.name,
      onTrackMeal: state.onTrackMeal,
      taskId: state.task?.id,
      // selectedUnix: state.dayStartUnix,
    };
  }, shallow);

  const handleTrackMeal = async () => {
    setLoading(true);

    weEventTrack("meal_trackMeal", {
      taskName: taskName || "Diet Task",
    });

    const shouldBack = await onTrackMeal(
      uid,
      state.gameId,
      participatingInGameWithTeam
    );
    if (shouldBack === "BACK") {
      if (toBeSwaped && uid && taskId) {
        await onSwapNutritionTask(
          uid,
          toBeSwaped.dayRecommendationId,
          taskId,
          toBeSwaped.taskId
          // positioningIndex,
          // indicesArray
        );
        console.log("task saved");
      }
      setLoading(false);
      navigation.dispatch((state) => {
        let routes = state.routes;
        routes = routes.filter(
          (r) =>
            r.name !== "AddNewItemLoadingScreen" &&
            r.name !== "AddNewItemScreen" &&
            r.name !== "AddNewItemSearchScreen" &&
            r.name !== "SwapScreen" &&
            r.name != "AddNewItemMealTypeScreen" &&
            r.name != "AiScanItemAddScreen" &&
            r.name != "MealScreen"
        );

        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      });
    } else if (shouldBack === "Progress") {
      // to be swapped util
      if (toBeSwaped && uid && taskId) {
        await onSwapNutritionTask(
          uid,
          toBeSwaped.dayRecommendationId,
          taskId,
          toBeSwaped.taskId
          // positioningIndex,
          // indicesArray
        );
      }
      if (activeUnix && isToday(activeUnix)) {
        if (uid) {
          const todayFp = await getTodayFp(uid, todayUnix);
          // console.log(todayFp, "todayFp");
          if (todayFp !== undefined && dailyFPTarget !== undefined) {
            const action = getNavAction(
              todayFp,
              dailyFPTarget,
              todayStreakStatus,
              userStreak
            );
            // console.log(action, "from the item added");

            userStreak && (await streakUpdate(action, uid, today, userStreak));

            const callback = createTrackNavigationUtils(navigation, 1, action);
            callback && setContinueCallback(callback);
          }
        }
        // need to get the current select day unix -> provider of the context where it is stored in not provide the component looking into the DietPlan component
      } else {
        setContinueCallback(() => navigation.goBack());
      }

      setLoading(false);

      // check if today, then do any of this. OLD DATES cannot count to streak update

      // fetch the activites to get the fp
      // determine todays streak status
      // on the basis of streak status set callback
      // set callback function @Krishanu
      // const streakStatus = getStreakStatus() we need to pass this in the below function casue not able to use hooks in the below function

      setTimeout(() => {
        navigation.dispatch((state) => {
          let routes = state.routes;

          if (routes.length > 1) {
            routes.pop();
          }

          if (toBeSwaped) {
            routes = routes.filter(
              (r) =>
                r.name !== "AddNewItemScreen" &&
                r.name !== "AddNewItemSearchScreen" &&
                r.name !== "SwapScreen" &&
                r.name !== "AddNewItemMealTypeScreen"
            );
          }

          routes.push({
            key: `CircularProgressScreen-${Math.round(Math.random() * 1000)}`,
            name: "CircularProgressScreen",
            params: { type: "fitpoint" },
          });

          return CommonActions.reset({
            ...state,
            routes,
            index: routes.length - 1,
          });
        });
      }, 200);
    }

    weEventTrack("mealScreen_trackItem", {});
  };

  return itemsAddedLength || modificationLength ? (
    <View className="bg-[#343150] rounded-t-2xl border border-white/10 p-4">
      {loading ? <LoadingModal /> : null}
      <View className="flex flex-row justify-between">
        <Text
          className="text-xs text-[#FFFFFFE5]"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          {`${itemsAddedLength} Items added for tracking`}
        </Text>
        <View className="flex flex-row items-center">
          <View className="w-2.5 aspect-square mr-1">
            <SvgIcons iconType="fitpoint" color="#8568FF" />
          </View>
          <Text
            className="text-xs text-[#8568FF]"
            style={{ fontFamily: "Nunito-SemiBold" }}
          >
            {`${fpStr} FP`}
          </Text>
        </View>
      </View>

      <View className="h-1.5 bg-[#8467FF4D] rounded-full my-4">
        <View
          style={{ width: (width - 32) * fpProg }}
          className="h-full bg-[#8568FF] rounded-full"
        />
      </View>

      {modificationLength && !isLocked ? (
        <StartButton
          title="Track My Meal"
          bgColor="bg-[#6D55D1]"
          textColor="text-white"
          fontFamily="Nunito-Bold"
          textStyle="py-3 text-center text-base"
          onPress={handleTrackMeal}
        />
      ) : null}
    </View>
  ) : null;
};

export default ItemsAdded;
