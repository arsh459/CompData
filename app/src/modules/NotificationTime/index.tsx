import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import TimePicker from "@modules/WorkoutOnboardingMain/OnboardingTimePicker";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { useNavigation } from "@react-navigation/native";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { useWorkoutPreference } from "@hooks/task/useWorkoutPreference";
import { useNotificationPermissionContext } from "@providers/notificationPermissions/NotificationPermissionProvider";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

interface Props {
  goBack?: boolean;
}

const NotificationTime: React.FC<Props> = ({ goBack }) => {
  const navigation = useNavigation();
  const { permissionStatus, requestPermission } =
    useNotificationPermissionContext();
  const { badge } = useSignleBadgeContext();

  const uid = useUserStore(({ user }) => user?.uid, shallow);

  const {
    workoutNotificationTime,
    setWorkoutNotificationTime,
    onSaveWorkoutNotificationTime,
  } = useWorkoutPreference();

  const navigateToWorkout = () => {
    if (goBack) {
      navigation.goBack();
    } else {
      badge && navigation.navigate("Workout", { badgeId: badge.id });
    }
  };

  const onSubmit = async (date: Date) => {
    if (permissionStatus === "granted") {
      setWorkoutNotificationTime(date);
      await onSaveWorkoutNotificationTime(uid, date);
      navigateToWorkout();
    } else {
      await requestPermission();
    }
  };

  return (
    <View className="flex-1 bg-[#232136]">
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        className="flex-1 px-4"
      >
        <Text
          className="text-2xl iphoneX:text-3xl text-white "
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          Set your workout {"\n"}Reminder notifications
        </Text>
        <Text
          className="text-xs text-white py-4"
          style={{ fontFamily: "Nunito-Light" }}
        >
          Get daily motivational notifications from your coach {"\n"}before your
          workout time, so you never miss a workout!
        </Text>
        <Text
          className="text-xs iphoneX:text-sm text-white/80 "
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          Note: We do not spam with promotions or ads
        </Text>
        <View className="h-16 aspect-square" />
        <TimePicker value={workoutNotificationTime} onChange={onSubmit} />
      </ScrollView>

      {permissionStatus === "granted" ? null : (
        <TouchableOpacity onPress={navigateToWorkout}>
          <Text
            className="text-sm iphoneX:text-base text-center text-[#6C66A1] "
            style={{ fontFamily: "Nunito-SemiBold" }}
          >
            I don't want notifications
          </Text>
        </TouchableOpacity>
      )}

      <View className="p-4">
        <StartButton
          title={
            permissionStatus === "blocked"
              ? "Go To Settings"
              : permissionStatus === "granted"
              ? "Save"
              : "Give Permission"
          }
          bgColor="bg-[#fff]"
          textColor="text-[#5D588C] "
          roundedStr="rounded-full"
          textStyle="py-4 text-center text-base rounded-full"
          fontFamily="Nunito-Bold"
          onPress={() => onSubmit(workoutNotificationTime)}
        />
      </View>
    </View>
  );
};

export default NotificationTime;
