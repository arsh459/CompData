import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import { settingIconWhite } from "@constants/imageKitURL";
import { useWorkoutStartOfBadge } from "@hooks/task/useWorkoutStartOfBadge";
import { getUserNotificationTime, getUserWorkoutDays } from "@hooks/task/utils";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { useUserStore } from "@providers/user/store/useUserStore";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { shallow } from "zustand/shallow";

const WorkoutSetting = () => {
  const navigation = useNavigation();
  const { badge } = useSignleBadgeContext();
  const { workoutDays, workoutNotificationTimeStr } = useUserStore((state) => {
    return {
      workoutDays: state.user?.recommendationConfig?.workoutDays,
      workoutNotificationTimeStr:
        state.user?.recommendationConfig?.workoutNotificationTime,
    };
  }, shallow);

  const { workoutStartOfBadge } = useWorkoutStartOfBadge(badge?.id);

  const shortWorkoutDays = getUserWorkoutDays(workoutDays);

  const workoutNotificationTime = getUserNotificationTime(
    workoutNotificationTimeStr
  );

  const gotoWorkoutStartScreen = () => {
    badge &&
      navigation.navigate("WorkoutStartScreen", {
        badgeId: badge.id,
        goBack: true,
        noModal: false,
      });
  };

  const gotoWorkoutOnboardingScreen = () => {
    badge &&
      navigation.navigate("WorkoutOnboardingScreen", {
        badgeId: badge.id,
        goBack: true,
      });
  };

  const gotoNotificationTimeScreen = () => {
    badge &&
      navigation.navigate("NotificationTimeScreen", {
        badgeId: badge.id,
        goBack: true,
      });
  };

  return (
    <View className="flex-1 bg-[#232136]">
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        className="flex-1 px-4"
      >
        <View className="flex flex-row items-center">
          <Image
            source={{ uri: settingIconWhite }}
            className="w-7 aspect-square mr-2.5"
          />
          <Text className="text-3xl text-white">Settings</Text>
        </View>
        <View className="w-8 aspect-square" />
        <Text className="text-white/80 text-base mx-2">My Workout days</Text>
        <TouchableOpacity
          onPress={gotoWorkoutOnboardingScreen}
          className="flex flex-row items-center bg-[#343150] px-4 py-2.5 rounded-xl my-1.5"
        >
          <Text numberOfLines={1} className="flex-1 text-white text-base">
            {shortWorkoutDays.join(", ")}
          </Text>
          <View className="w-3 aspect-square ml-3">
            <ArrowIcon direction="right" color="#FFFFFF" />
          </View>
        </TouchableOpacity>
        <View className="w-8 aspect-square" />
        <Text numberOfLines={1} className="text-white/80 text-base mx-2">
          My Workout Notification Time
        </Text>
        <TouchableOpacity
          onPress={gotoNotificationTimeScreen}
          className="flex flex-row items-center bg-[#343150] px-4 py-2.5 rounded-xl my-1.5"
        >
          <Text className="flex-1 text-white text-base">
            {workoutNotificationTime
              ? format(workoutNotificationTime, "h:mm a")
              : "Set a time"}
          </Text>
          <View className="w-3 aspect-square ml-3">
            <ArrowIcon direction="right" color="#FFFFFF" />
          </View>
        </TouchableOpacity>
        <View className="w-8 aspect-square" />
        <Text className="text-white/80 text-base mx-2">Program Started On</Text>
        <TouchableOpacity
          onPress={gotoWorkoutStartScreen}
          className="flex flex-row items-center bg-[#343150] px-4 py-2.5 rounded-xl my-1.5"
        >
          <Text numberOfLines={1} className="flex-1 text-[#51FF8C] text-base">
            {format(workoutStartOfBadge, "do LLL yyyy")}
          </Text>
          <View className="w-3 aspect-square ml-3">
            <ArrowIcon direction="right" color="#FFFFFF" />
          </View>
        </TouchableOpacity>
        <View className="w-8 aspect-square" />
      </ScrollView>
    </View>
  );
};

export default WorkoutSetting;
