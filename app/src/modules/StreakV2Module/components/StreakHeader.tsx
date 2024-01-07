import Confetti from "@components/Confetti";
import ImageWithURL from "@components/ImageWithURL";
import SvgIcons from "@components/SvgIcons";
import StreakBrokenVector from "@components/SvgIcons/StreakBrokenVector";
import StreakFireVector from "@components/SvgIcons/StreakFireVector";
import { redStopWatch, streakFire } from "@constants/imageKitURL";
import { useStreakStore } from "@providers/streakV2/store/useStreakStoreV2";
import { isAfterNoon } from "@providers/streakV2/utils/isAfternoon";
import { streakLevelsObj } from "@providers/streakV2/utils/streakUpdate";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { shallow } from "zustand/shallow";

const StreakHeader = () => {
  const {
    streakDays,
    todayStreakStatus,
    toggleShowTaskModal,
    streakStatus,
    streakProgress,
    streakTarget,
    targetDays,
  } = useStreakStore(
    (state) => ({
      streakDays: state.streak?.days,
      todayStreakStatus: state.getTodayStreakStatus(),
      toggleShowTaskModal: state.toggleTaskModal,
      streakStatus: state.streak?.streakStatus,
      targetDays: state.streak?.targetDays,
      // streakStatus: "active",
      streakTarget: state.streak?.targetFp,
      streakProgress:
        state.streak?.days &&
        state.streak?.targetDays &&
        Math.round((state.streak?.days / state.streak?.targetDays) * 100),
    }),
    shallow
  );
  const navigation = useNavigation();
  const isAfterNoonFlag = isAfterNoon();
  const isFocus = useIsFocused();
  return (
    <View
      className={`${
        streakStatus === "inactive" ? "bg-[#7973B4] " : "bg-[#FFBC00]"
      } w-full h-2/6 px-6 pb-6`}
    >
      <View className=" bg-[#ffffff4d] w-full h-full rounded-3xl">
        <View className=" w-full flex-1  rounded-t-lg flex flex-row justify-between items-center py-4 px-6">
          <View className="flex justify-center items-start">
            <Text className=" text-[#4B3100] font-bold text-6xl">
              {streakDays}
            </Text>
            <Text className=" text-[#4B3100] font-extrabold text-2xl">
              {streakStatus === "inactive"
                ? "Day Streak Broken!"
                : "Day Streak!"}
            </Text>
          </View>
          <View className=" w-1/3 h-2/3">
            {streakStatus === "inactive" ? (
              <StreakBrokenVector />
            ) : (
              <StreakFireVector percentage={streakProgress} />
            )}
          </View>
        </View>
        <View className=" w-full h-24">
          {streakStatus === "inactive" ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("StreakGoalScreen")}
            >
              <View className=" w-full h-full p-4">
                <View className=" w-full h-full flex flex-row justify-center items-center p-2 bg-[#FFFFFF66] rounded-xl">
                  <Text className=" text-[#21004B] text-base font-bold">
                    Restart My Streak
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ) : streakDays &&
            streakLevelsObj[streakDays] &&
            targetDays === streakDays ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("StreakGoalScreen")}
            >
              <View className=" w-full h-full p-4">
                <View className=" w-full h-full flex flex-row justify-center items-center p-2 bg-[#FFFFFF66] rounded-xl">
                  <Text className=" text-[#21004B] text-base font-bold">
                    Update Goal
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ) : todayStreakStatus === "active" ? (
            <View className=" w-full h-full flex flex-row justify-center items-center p-2 bg-[#312E50] rounded-b-3xl">
              <View className=" w-1/4 flex items-center">
                {isAfterNoonFlag ? (
                  <ImageWithURL
                    className=" w-10"
                    resizeMode="contain"
                    source={{ uri: redStopWatch }}
                  />
                ) : (
                  <ImageWithURL
                    className=" w-10"
                    resizeMode="contain"
                    source={{ uri: streakFire }}
                  />
                )}
              </View>
              <View className=" flex justify-start pl-4 flex-1">
                <Text className=" text-white font-bold mb-1">
                  {isAfterNoonFlag
                    ? `Hurry Up! Complete your ${streakTarget}FP target to continue your streak`
                    : `Complete today's streak by finishing your ${streakTarget}FP target`}
                </Text>
                <TouchableOpacity onPress={toggleShowTaskModal}>
                  <View className=" flex flex-row items-center gap-2">
                    <Text
                      className={`${
                        isAfterNoonFlag ? "text-[#FF6069]" : "text-[#9880FF]"
                      } font-bold`}
                    >
                      Let's do it
                    </Text>
                    <View className=" w-4 h-4">
                      <SvgIcons
                        iconType="rightArrow"
                        color={isAfterNoonFlag ? "#FF6069" : "#9880FF"}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : todayStreakStatus === "activeHit" ? (
            <View className=" w-full h-full px-6 flex">
              <Text className=" text-[#4B3100] text-lg font-bold">
                Congratulations! You completed today’s streak. Continue from
                tomorrow onwards
              </Text>
            </View>
          ) : null}
        </View>
        {todayStreakStatus === "activeHit" && isFocus && false && <Confetti />}
      </View>
    </View>
  );
};

export default StreakHeader;
