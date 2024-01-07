import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import clsx from "clsx";
import SectionComp from "./SectionComp";
import SwapCta from "./SwapCta";
import { useDayContext } from "@modules/Nutrition/V2/DaySelector/provider/DayProvider";
import { Task } from "@models/Tasks/Task";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import MealCardV2 from "./MealCardV2";
// import { useUserStore } from "@providers/user/store/useUserStore";
// import { shallow } from "zustand/shallow";
import { useDietTaskStatus } from "@providers/task/hooks/useDietTaskStatus";

interface Props {
  dayRecommendationId: string;
  showWave?: boolean;
  task: Task;
}

const NutriCardWithSwap: React.FC<Props> = ({
  dayRecommendationId,
  showWave,
  task,
}) => {
  const navigation = useNavigation();

  const { selectedUnix } = useDayContext();

  const { taskStatus, doneTasks } = useDietTaskStatus(selectedUnix, task);
  // const { taskStatus } = useIsTaskAllowedV4(selectedUnix, 0.1, task);
  // const { nutritionBadgeId } = useUserStore((state) => {
  //   return {
  //     uid: state.user?.uid,
  //     nutritionBadgeId: state.user?.nutritionBadgeId,
  //   };
  // }, shallow);

  const onSwapPress = () => {
    navigation.navigate("SwapScreen", {
      mealType: task?.mealTypes,
      taskId: task?.id,
      dayRecommendationId,
    });

    weEventTrack("nutrition_clickSwap", {});
  };

  const onMealPress = () => {
    navigation.navigate("MealScreen", {
      taskId: task ? task.id : "",
      // badgeId: task?.badgeId ? task.badgeId : "",
      selectedUnix: selectedUnix,
    });

    weEventTrack("nutrition_clickTask", {});
  };

  return (
    <View
      className={clsx(
        "flex-1 p-3 rounded-2xl",
        taskStatus === "done" ? "bg-[#188B3F]" : "bg-[#343150]"
      )}
    >
      {task?.mealTypes || taskStatus !== "done" ? (
        <View className="flex flex-row justify-between items-center pb-3">
          {task?.mealTypes ? (
            <SectionComp mealType={task?.mealTypes} />
          ) : (
            <View />
          )}
          {taskStatus === "done" ? null : doneTasks > 0 ? (
            <View>
              <Text className="text-[#51FF8C] text-xs">{`${doneTasks}/${
                task.subTasks?.length ? task.subTasks.length : 1
              } done`}</Text>
            </View>
          ) : (
            <SwapCta onSwapPress={onSwapPress} />
          )}
        </View>
      ) : null}
      <View className="relative z-0">
        {showWave ? (
          <>
            <View
              className={clsx(
                "absolute -left-1 -right-1 -top-1 -bottom-1 border-2 rounded-2xl",
                taskStatus === "done"
                  ? " border-[#FFFFFF40]"
                  : "border-[#5D588C]"
              )}
            />
            <View
              className={clsx(
                "absolute -left-2 -right-2 -top-2 -bottom-2 border rounded-[20px]",
                taskStatus === "done"
                  ? " border-[#FFFFFF40]"
                  : "border-[#5D588C]"
              )}
            />
          </>
        ) : null}
        <MealCardV2 onMealPress={onMealPress} task={task} status={taskStatus} />
      </View>
    </View>
  );
};

export default NutriCardWithSwap;
