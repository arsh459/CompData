import ImageWithURL from "@components/ImageWithURL";
import { streakFire } from "@constants/imageKitURL";
import Header from "@modules/Header";
import ClickButton from "@modules/JoinBoatMainV3/components/ClickButton";
import { Text, View } from "react-native";
import StreakGoalList from "./components/StreakGoalList";
import { useStreakStore } from "@providers/streakV2/store/useStreakStoreV2";
import { streakLevels } from "@providers/streakV2/utils/streakUpdate";
import {
  createNewStreak,
  updateStreakDays,
} from "@providers/streakV2/hooks/useUserStreakV2";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { shallow } from "zustand/shallow";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { getStreakGoal } from "./utils/getStreakGoal";
import { useUserStore } from "@providers/user/store/useUserStore";

const StreakGoalMain = () => {
  // const route = useRoute();
  // const backScreenSkip = route.params as StreakGoalParams;
  const { uid, dailyFPTarget, userTZ } = useUserStore(
    (state) => ({
      uid: state.user?.uid,
      dailyFPTarget: state.user?.dailyFPTarget,
      userTZ: state.user?.recommendationConfig?.timezone?.tzString,
    }),
    shallow
  );

  const { targetDays, streakDays, id, streakStatus } = useStreakStore(
    (state) => ({
      targetDays: state.streak?.targetDays,
      streakDays: state.streak?.days,
      streakStatus: state.streak?.streakStatus,
      id: state.streak?.id,
      // targerDays: state.streak?.targetDays && state.streak?.days && streakLevelsObj[state.streak?.days] ? state.streak?.targetDays + 7 : state.streak?.targetDays
    }),
    shallow
  );

  const { bottom } = useSafeAreaInsets();

  const navigation = useNavigation();

  /*** KRISHANU - THIS IS UNREADABLE */
  // const nextTargetDay =
  //   (streakStaus &&
  //     streakStaus === "active" &&
  //     streakDays &&
  //     targerDays &&
  //     streakDays === targerDays &&
  //     getNextTargetDay(targerDays)) ||
  //   7;

  const nextTargetDays = getStreakGoal(targetDays, streakDays, streakStatus);

  const onNext = async () => {
    weEventTrack("streakGoal_startNew", {});

    /*** KRISHANU - if nextTargetDays is not there we will not create streak? */
    // nextTargetDay && (await createNewStreak(nextTargetDay));

    if (uid) {
      if (id && streakStatus === "active") {
        await updateStreakDays(uid, id, nextTargetDays);
      } else {
        createNewStreak(
          uid,
          7,
          dailyFPTarget || 10,
          userTZ ? userTZ : "Asia/Kolkata"
        );
      }

      // so in back we don't dup create
      navigation.dispatch((state) => {
        const routes = state.routes;

        // console.log("routes", routes);

        const filteredRoutes = routes.filter(
          (item) =>
            item.name !== "StreakGoalScreen" &&
            item.name !== "StartStreakScreen"
        );
        filteredRoutes.push({
          key: `${"StreakV2Screen"}-${Math.round(Math.random() * 1000)}`,
          name: "StreakV2Screen",
        });
        // navigation.goBack();

        return CommonActions.reset({
          ...state,
          routes: filteredRoutes,
          index: filteredRoutes.length - 1,
        });
      });
    }
  };

  return (
    <>
      <Header back={true} tone="dark" headerColor="#232136" />
      <View className="bg-[#232136] flex-1">
        <View className=" flex-1 flex items-center justify-center">
          <View className=" relative w-40 h-40">
            <ImageWithURL resizeMode="contain" source={{ uri: streakFire }} />
            <Text
              style={{ fontFamily: "Nunito-Bold" }}
              className=" absolute left-12  top-20 font-extrabold text-6xl"
            >
              {nextTargetDays < 10 ? `0${nextTargetDays}` : nextTargetDays}
            </Text>
          </View>
          <Text className=" text-white text-xl my-6 font-extrabold">
            Set Streak Goal
          </Text>
          <View className=" flex-1 flex items-center w-full px-6">
            <StreakGoalList
              levelList={streakLevels}
              targerDays={nextTargetDays || 7}
            />
            <Text className=" my-4 text-[#FFFFFFB2] font-bold text-lg">
              Complete your streak{" "}
              <Text className=" text-[#F4B73F]">
                {nextTargetDays || 7} days in a row
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ paddingBottom: bottom || 20 }} className=" px-4">
          <ClickButton nextBtnText="Commit to my goal" onNext={onNext} />
        </View>
      </View>
    </>
  );
};

export default StreakGoalMain;
