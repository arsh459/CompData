import { useTasksByBadgeDate } from "@hooks/dayRecs/useTasksByBadgeDate";
import { View } from "react-native";
import ChallengeTaskElement from "./ChallengeTaskElement";
import clsx from "clsx";
import SvgIcons, { iconTypes } from "@components/SvgIcons";
import { Text } from "react-native";
import { TaskTypes } from "@models/Tasks/Task";
import { useEffect, useState } from "react";

interface Props {
  badgeId: string;
}

const BadgeProgressQuest: React.FC<Props> = ({ badgeId }) => {
  // const { today } = useAuthContext();

  const { tasks } = useTasksByBadgeDate(badgeId);

  const [taskType, setTaskType] = useState<TaskTypes | undefined>("workout");

  // useDayRec(
  //   today,
  //   taskType === "nutrition" ? "nutrition" : taskType ? "workout" : undefined,
  //   badgeId
  // );

  useEffect(() => {
    if (tasks.length > 0) setTaskType(tasks[0].taskType);
  }, [tasks]);

  const iconType: iconTypes = (taskType + "Quest") as iconTypes;

  if (!tasks.length) {
    return <View />;
  }

  return (
    <View className="pt-4">
      <View
        className={clsx(
          "mx-4 rounded-3xl border",
          "border-[#656472] overflow-hidden"
        )}
      >
        <View
          className={clsx(
            "p-5 border-b border-[#656472]",
            taskType === "nutrition" ? "bg-[#8e5c124d]" : "bg-[#123c8e4d]"
          )}
        >
          <View className="flex flex-row items-center justify-center">
            <View className="w-4 h-4">
              <SvgIcons iconType={iconType} />
            </View>
            <View className="flex items-center">
              <Text
                className={clsx(
                  taskType === "workout" ? "text-[#38DDFF]" : "text-[#FFC738]",
                  "text-sm tracking-wide pl-3"
                )}
                style={{
                  fontFamily: "Nunito-Bold",
                }}
              >
                Today’s {taskType} challenge
              </Text>
            </View>
          </View>
        </View>
        <View className={clsx("px-5 mb-5")}>
          {tasks.map((item) => {
            return (
              <View key={item.id} className="mt-5">
                <ChallengeTaskElement task={item} />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default BadgeProgressQuest;
