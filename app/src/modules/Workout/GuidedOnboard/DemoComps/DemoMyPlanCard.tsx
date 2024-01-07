import { View } from "react-native";
import { taskCardProps } from "../OnboardProvider/interface";
import TaskCardV3 from "@modules/Workout/ProgramHome/TaskCards/TaskCardV3";
import {
  DayProvider,
  useDayContext,
} from "@modules/Nutrition/V2/DaySelector/provider/DayProvider";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { getStartTime } from "@modules/Nutrition/V2/DaySelector/provider/utils";
import { useIsTaskAllowedV4 } from "@providers/task/hooks/useIsTaskAllowedV4";
import { Task } from "@models/Tasks/Task";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const DemoMyPlanCard: React.FC<taskCardProps> = ({
  task,
  imgHeight,
  width,
  height,
  state,
}) => {
  const { badge } = useSignleBadgeContext();
  const { start, nutritionStart, badgeConfig } = useUserStore((state) => {
    return {
      start: state.user?.recommendationConfig?.start,
      nutritionStart: state.user?.recommendationConfig?.nutritionStart,
      badgeConfig: state.user?.recommendationConfig?.badgeConfig,
    };
  }, shallow);

  const st = getStartTime(
    badgeConfig,
    badge?.id,
    "nutrition",
    start,
    nutritionStart
  );

  return (
    <View style={{ width, height }} className="mx-auto relative z-0">
      <DayProvider startUnix={st}>
        <TaskCardV3
          task={task}
          width={width}
          accessDueToBootcamp={false}
          height={height}
          imgHeight={imgHeight}
        />
        <View
          className="absolute left-0 right-0 top-0 bottom-0 bg-[#232136E5] rounded-3xl"
          style={{ opacity: state ? 1 : 0 }}
        />
        <View
          className="w-full h-1 bg-white"
          style={{
            position: "absolute",
            top: imgHeight - 10,
            left: 0,
            opacity: state === "progress" ? 1 : 0,
          }}
        >
          <ProgressOverLay task={task} />
        </View>
      </DayProvider>
    </View>
  );
};

export default DemoMyPlanCard;

const ProgressOverLay: React.FC<{ task: Task }> = ({ task }) => {
  const { selectedUnix } = useDayContext();

  const { selectedActivity } = useIsTaskAllowedV4(
    selectedUnix,
    task.taskType === "nutrition" ? 0.1 : 0.95,
    task
  );

  return (
    <View
      className="h-full bg-[#1A83FF]"
      style={{ width: `${100 * (selectedActivity?.progress || 0)}%` }}
    />
  );
};
