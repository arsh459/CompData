import { Text, TouchableOpacity, View } from "react-native";
import { getCurrentWeeksDates, getNumSuffix } from "./utils";
import ImageWithURL from "@components/ImageWithURL";
import {
  streakCompleteTick,
  streakFire,
  streakFreezeTick,
  streakMissCross,
} from "@constants/imageKitURL";
import { shallow } from "zustand/shallow";
import { useNavigation } from "@react-navigation/native";
import { useViewerStreakStore } from "@providers/streakV2/store/useViewerStreak";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useProfileContext } from "@providers/profile/ProfileProvider";

const StreakCard = () => {
  const navigation = useNavigation();
  const { today, state } = useAuthContext();
  const { profile } = useProfileContext();

  const isMe = profile?.uid === state.uid;

  //

  const { streakDays, streakMap, todayHit, streakStartedOn } =
    useViewerStreakStore(
      (state) => ({
        streakDays: state.streak?.days,
        streakMap: state.streak?.streakMap,
        streakStartedOn: state.streak?.startedOn,
        todayHit: state.streak?.streakMap[today] === "activeHit",
      }),
      shallow
    );

  // get the current weeks date's and map with streakMap

  const currentWeekDates = getCurrentWeeksDates();
  const onStreakCardPress = () => navigation.navigate("StreakV2Screen");

  return (
    <View className="flex flex-1 justify-between w-full items-center bg-[#343150] p-4 rounded-2xl">
      <TouchableOpacity
        disabled={!isMe}
        className=" w-full"
        onPress={onStreakCardPress}
      >
        <View className=" flex flex-row justify-between items-center p-4 w-full bg-[#F4B73F26] border border-[#FFA51633] rounded-xl">
          <View>
            <Text className=" text-[#F4B73F] font-bold text-xl">
              Day {`${streakDays ? getNumSuffix(streakDays) : "0"}`}
            </Text>
            <Text className=" text-[#FFD37CB2] font-medium">
              You are on fire Keep it Going{" "}
            </Text>
          </View>
          <ImageWithURL
            source={{ uri: streakFire }}
            resizeMode="contain"
            className="w-12 h-12"
          />
        </View>
      </TouchableOpacity>

      <View className=" flex w-full flex-row justify-around mt-4">
        {currentWeekDates.map((item) => {
          const isDateToday = item.dateStr === today;

          return (
            <View
              key={`${item.dateStr}_streak`}
              className=" flex items-center justify-center"
            >
              <Text
                className={`${
                  todayHit && isDateToday
                    ? " text-[#F4B73F]"
                    : streakStartedOn && item.dateUnix < streakStartedOn
                    ? "text-white/10"
                    : "text-white/40 "
                } font-medium mb-2`}
              >
                {item.day}
              </Text>

              {streakMap && streakMap[item.dateStr] ? (
                streakMap[item.dateStr] === "hit" ||
                streakMap[item.dateStr] === "activeHit" ? (
                  <ImageWithURL
                    source={{ uri: streakCompleteTick }}
                    resizeMode="contain"
                    className="w-6 aspect-square"
                  />
                ) : streakMap[item.dateStr] === "freeze" ? (
                  <ImageWithURL
                    source={{ uri: streakFreezeTick }}
                    resizeMode="contain"
                    className="w-6 aspect-square"
                  />
                ) : streakMap[item.dateStr] === "miss" ? (
                  <ImageWithURL
                    source={{ uri: streakMissCross }}
                    resizeMode="contain"
                    className="w-6 aspect-square"
                  />
                ) : (
                  <View
                    className={`${
                      streakStartedOn && item.dateUnix < streakStartedOn
                        ? "bg-[#3E3A62]"
                        : "bg-[#524D7F]"
                    } w-6 h-6 rounded-full`}
                  />
                )
              ) : (
                <View
                  className={`${
                    streakStartedOn && item.dateUnix < streakStartedOn
                      ? "bg-[#3E3A62]"
                      : "bg-[#524D7F]"
                  } w-6 h-6 rounded-full`}
                />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default StreakCard;
