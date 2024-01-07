import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import clsx from "clsx";
import { Task } from "@models/Tasks/Task";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import MealCardV3 from "./MealCardV3";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { useDietTaskStatus } from "@providers/task/hooks/useDietTaskStatus";
import useDietCalendar from "@hooks/dietPlan/useDietCalendar";
import { getDisplayMealTime } from "@modules/Nutrition/V2/PlanList/scrollTime";
import { useConfigContext } from "@providers/Config/ConfigProvider";
import { useAlgoliaStore } from "@hooks/algolia/useAlgoliaStore";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
interface Props {
  dayRecommendationId: string;
  showWave?: boolean;
  task: Task;
}

const NutriCardWithSwapV2: React.FC<Props> = ({
  dayRecommendationId,
  showWave,
  task,
}) => {
  const navigation = useNavigation();

  const { activeUnix, isFuture } = useDietCalendar((state) => {
    const activeUnix = state.active?.unix;
    const todayUnix = state.today?.unix;

    // let isTodayFuture: boolean = false;
    let isFuture: boolean = false;
    // if (activeUnix && todayUnix && activeUnix >= todayUnix) {
    //   isTodayFuture = true;
    // }

    if (activeUnix && todayUnix && activeUnix > todayUnix) {
      isFuture = true;
    }

    return {
      activeUnix: state.active?.unix,
      // isTodayFuture,
      isFuture,
    };
  });

  const { taskStatus, doneTasks } = useDietTaskStatus(activeUnix, task);

  const totalSubtasks = task.subTasks?.length ? task.subTasks?.length : 1;
  const percent = Math.floor((doneTasks / totalSubtasks) * 100);
  const diff = totalSubtasks - doneTasks;
  const isSwapDisabled =
    taskStatus === "done" || percent || isFuture ? true : false;

  // const { nutritionBadgeId } = useUserStore((state) => {
  //   return {
  //     nutritionBadgeId: state.user?.nutritionBadgeId,
  //   };
  // }, shallow);
  const { badgeId } = useSignleBadgeContext();
  const { onQueryChange, changeIndex } = useAlgoliaStore(
    (state) => ({
      onQueryChange: state.onQueryChange,
      changeIndex: state.changeIndex,
    }),
    shallow
  );

  const { timings } = useUserStore((state) => {
    return {
      timings: state.user?.dietForm?.foodTimings,
    };
  }, shallow);

  const onSwapPress = async () => {
    // getMealTypes
    // console.log("chainging to", task.mealTypes);
    await changeIndex("dietsearch", task.mealTypes, badgeId);
    onQueryChange("", "dietsearch", task.mealTypes);
    navigation.navigate("SwapScreen", {
      mealType: task?.mealTypes, // for search
      taskId: task.id, // to swap
      dayRecommendationId, // to swap
    });

    weEventTrack("nutrition_clickSwap", {});
  };

  const { config } = useConfigContext();

  const displayString = getDisplayMealTime(
    task.mealTypes,
    config?.mealTimings,
    timings,
    config?.mealTypeOrder
  );

  const onMealPress = () => {
    navigation.navigate("MealScreen", {
      taskId: task ? task.id : "",
      selectedUnix: activeUnix,
      dayRecommendationId: dayRecommendationId,
      mealType: task.mealTypes,
    });

    weEventTrack("nutrition_clickTask", {});
  };

  // console.log("taskStatus", taskStatus, task.name);

  return (
    <View className="flex-1">
      <View className="px-3 pb-2">
        <Text
          className="text-white/40 text-sm tracking-wider"
          style={{ fontFamily: "Poppins-Light" }}
        >
          {displayString}
        </Text>
      </View>

      <View
        className={clsx(
          "rounded-2xl  flex-1 ",
          taskStatus === "done"
            ? "bg-[#188B3F] rounded-b-2xl"
            : doneTasks > 0
            ? "bg-[#654DC8] rounded-b-none"
            : "bg-[#654DC8] rounded-b-2xl"
        )}
      >
        <View className="relative z-0 ">
          <MealCardV3
            onMealPress={onMealPress}
            onSwapPress={onSwapPress}
            task={task}
            status={taskStatus}
            isSwapDisabled={isSwapDisabled}
            isFuture={isFuture}
          />
        </View>
      </View>
      <View
        className={clsx(
          "flex flex-row items-center rounded-b-2xl justify-between px-4",
          taskStatus === "done" ? "py-0.5" : doneTasks > 0 ? "bg-[#1CAE4D]" : ""
        )}
      >
        <View>
          <Text
            className={clsx("text-white/80 py-2.5 text-[10px]")}
            style={{ fontFamily: "Poppins-Medium" }}
          >
            {taskStatus === "done"
              ? ""
              : doneTasks > 0
              ? `${diff} Item left to track`
              : ""}
          </Text>
        </View>
        <View>
          <Text
            className="text-white/80 py-2.5  text-[10px]"
            style={{ fontFamily: "Poppins-Medium" }}
          >
            {taskStatus === "done"
              ? ""
              : doneTasks > 0
              ? `${percent}% Done`
              : ""}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NutriCardWithSwapV2;
