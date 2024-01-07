import Loading from "@components/loading/Loading";
import { DAYS, useWorkoutPreference } from "@hooks/task/useWorkoutPreference";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView } from "react-native";
import Checkbox from "./OnboardingCheckbox";

interface Props {
  goBack?: boolean;
}

// const daysChanged = (workoutDays: string[], previousDays?: string[]) => {
//   if (!previousDays) {
//     return true;
//   }

//   if (previousDays.length !== workoutDays.length) {
//     return true;
//   }

//   for (const day of workoutDays) {
//     if (!previousDays.includes(day)) {
//       return true;
//     }
//   }

//   return false;
// };

const WorkoutOnboardingMain: React.FC<Props> = ({ goBack }) => {
  const navigation = useNavigation();
  const { badge } = useSignleBadgeContext();

  const { workoutDays, workoutDaysUpdate, loading, onSaveWorkoutDays } =
    useWorkoutPreference();

  const onSubmit = async () => {
    await onSaveWorkoutDays();

    if (goBack) {
      navigation.goBack();
    } else {
      badge &&
        navigation.navigate("NotificationTimeScreen", { badgeId: badge.id });
    }
  };

  return (
    <View className="flex-1 bg-[#232136] px-4">
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <Text
          className="text-lg iphoneX:text-xl text-white"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          Choose your preferred workout days
        </Text>
        {loading ? (
          <View className="flex items-center justify-center p-4 m-4">
            <Loading width="w-12" height="h-12" />
          </View>
        ) : (
          <View className="bg-[#343150] p-4 my-4 rounded-2xl">
            {DAYS.map((day, index) => {
              return (
                <View key={day} className="">
                  <Checkbox
                    label={day}
                    checked={workoutDays.includes(day)}
                    onPress={() => workoutDaysUpdate(day)}
                  />
                  {index !== DAYS.length - 1 && (
                    <View className="h-px w-full bg-[#ffffff1a] my-4" />
                  )}
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      {loading ? null : (
        <View className="py-4">
          <StartButton
            title={goBack ? "Save and Next" : "Next"}
            bgColor="bg-[#fff]"
            textColor="text-[#5D588C] "
            roundedStr="rounded-full"
            textStyle="py-4 text-center text-base rounded-full"
            fontFamily="Nunito-Bold"
            onPress={onSubmit}
          />
        </View>
      )}
    </View>
  );
};
export default WorkoutOnboardingMain;
