import ImageWithURL from "@components/ImageWithURL";
import { streakFire } from "@constants/imageKitURL";
import Header from "@modules/Header";
import ClickButton from "@modules/JoinBoatMainV3/components/ClickButton";
import { useStreakStore } from "@providers/streakV2/store/useStreakStoreV2";
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { shallow } from "zustand/shallow";
import StreakFlashListHr from "./components/StreakFlashListHr";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const StreakTodayCompleteMain = () => {
  const { days } = useStreakStore(
    (state) => ({
      days: state.streak?.days,
    }),
    shallow
  );
  const navigation = useNavigation();
  //opacity fade in
  const { bottom } = useSafeAreaInsets();
  //@TODO
  return (
    <>
      <Header tone="dark" headerColor="#232136" />
      <View className=" flex-1 bg-[#232136]">
        <View className=" flex-1 flex justify-center items-center">
          <View className=" relative  w-44 h-44">
            <ImageWithURL resizeMode="contain" source={{ uri: streakFire }} />
            <Text
              style={{
                fontFamily: "Nunito-Bold",
              }}
              className=" absolute left-14 top-24  font-extrabold text-6xl"
            >
              {days && days < 10 ? `0${days}` : days || "07"}
            </Text>
          </View>
          <Text className=" text-[#F4B73F] font-extrabold text-2xl mt-2">
            Day Streak!
          </Text>
          <StreakFlashListHr />
        </View>
        <View style={{ bottom: bottom || 20 }} className=" px-4">
          <ClickButton
            nextBtnText="Continue"
            onNext={() => {
              weEventTrack("SeeStreakProgress", {});
              // const popAction = StackActions.pop(2);
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </>
  );
};

export default StreakTodayCompleteMain;

/**
 * Workout -> CoursePageScreen -> UploadTaskV2 -> Progress
 * -> Streak -> StreakStart
 * -> StreakList
 * -> Workout
 *
 * DietPlan -> MealScreen -> Progress
 * -> Streak -> StreakStart
 * -> StreakList
 * -> DietPlan
 *
 * ChallengeScreen -> MealScreen -> Progress
 * -> Streak -> StreakStart
 * -> StreakList
 * -> ChallengeScreen
 *
 *
 *
 */
