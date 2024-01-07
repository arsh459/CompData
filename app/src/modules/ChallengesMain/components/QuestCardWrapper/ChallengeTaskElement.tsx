import MediaTile from "@components/MediaCard/MediaTile";
import SvgIcons from "@components/SvgIcons";
import ArrowIconPointed from "@components/SvgIcons/ArrowIconPointed";
import { Task } from "@models/Tasks/Task";
import { useState } from "react";

import { useAuthContext } from "@providers/auth/AuthProvider";
import { useNavStore } from "@providers/nav/navStore";
import { dayMS } from "@providers/period/periodStore";
import { useActivityForTaskInRange } from "@providers/task/hooks/useActivityForTaskInRange";

import { useNavigation } from "@react-navigation/native";
import clsx from "clsx";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import { shallow } from "zustand/shallow";

import useQuestCalendar from "@hooks/quest/useQuestCalendar";
import QuestLockedIcon from "@modules/ChallengesMain/QuestLockedIcon";
import CirclePercent from "@components/CirclePercent";

interface Props {
  task: Task;
}

const ChallengeTaskElement: React.FC<Props> = ({ task }) => {
  const { todayUnix, today } = useAuthContext();
  const { selectedFP } = useActivityForTaskInRange(
    todayUnix,
    todayUnix + dayMS,
    task.id,
    task.fitPoints ? task.fitPoints : 1
  );
  const [error, setError] = useState<boolean>(false);
  const { isInPast, isInFuture } = useQuestCalendar(
    (state) => ({
      isInPast:
        state.active && state.today
          ? state.active?.unix < state.today?.unix
          : false,
      isInFuture:
        state.active && state.today
          ? state.active?.unix > state.today?.unix
          : false,
    }),
    shallow
  );

  const navigation = useNavigation();

  const setWorkoutFinish = useNavStore(
    (state) => state.setWorkoutFinishNav,
    shallow
  );

  const onTaskClick = () => {
    // setError(false);
    if (isInPast) {
      setError((prev) => !prev);
    } else if (isInFuture) {
    } else {
      if (task.taskType === "nutrition") {
        navigation.navigate("MealScreen", {
          taskId: task.id,
          selectedUnix: todayUnix,
          navBackScreen: "ChallengeScreen",

          // badgeId:
        });
      } else if (selectedFP && selectedFP === task.fitPoints) {
        navigation.navigate("CourseTaskPreviewScreen", {
          taskId: task.id,
          attemptedDate: today,
        });
        setWorkoutFinish("ChallengeScreen");
      } else {
        navigation.navigate("CourseTaskPreviewScreen", {
          taskId: task.id,
          attemptedDate: today,
        });
        setWorkoutFinish("ChallengeScreen");
      }
    }
  };

  const taskType = task.taskType;
  // const isCompleted = selectedFP === task.fitPoints;
  const progressPercentage = Math.ceil(
    (selectedFP * 100) / (task?.fitPoints ? task.fitPoints : 1)
  );

  return (
    <TouchableOpacity
      className={clsx("", taskType === "workout" ? "" : "")}
      onPress={onTaskClick}
    >
      <View className="flex flex-row items-center justify-between">
        <View className="w-[89px] h-[61px] rounded-lg overflow-hidden flex items-center justify-center ">
          <MediaTile
            fluid={true}
            fluidResizeMode="cover"
            media={task.thumbnails ? task.thumbnails : task.reelThumbnail}
          />
        </View>
        <View
          className={clsx(
            "flex-1 flex-row items-center justify-between ",
            selectedFP === 0 ? "px-2" : "pl-2"
          )}
        >
          <View className="flex-1 ml-2">
            <Text
              className="text-white/80 text-sm leading-none"
              numberOfLines={2}
              style={{ fontFamily: "Nunito-Medium" }}
            >
              {task.name}
            </Text>
          </View>
          <View className="w-10 flex items-end">
            {isInFuture ? (
              <View className="w-5 aspect-square bg-white rounded-full flex items-center justify-center">
                <View className="w-2">
                  <QuestLockedIcon colorIcon="#000" colorbg="#fff" />
                </View>
              </View>
            ) : progressPercentage >= 100 ? (
              <View className="w-4 aspect-square">
                <SvgIcons iconType="questCompleted" />
              </View>
            ) : progressPercentage <= 0 && !isInPast ? (
              <View className="w-4 aspect-square">
                <ArrowIconPointed
                  direction="right"
                  color={taskType === "workout" ? "#38DDFF" : "#FFC738"}
                />
              </View>
            ) : (
              <>
                <CirclePercent
                  circleSize={38}
                  percent={progressPercentage ? progressPercentage / 100 : 0.01}
                  inActiveColor={
                    taskType === "workout" ? "#22bdff40" : "#fff62240"
                  }
                  strokeWidth={5}
                  activeColor={taskType === "workout" ? "#58F5FF" : "#FFE458"}
                  showInactive={true}
                  showActive={true}
                >
                  <View className="w-full h-full flex justify-center items-center">
                    <Text
                      className={clsx(" text-[9px]", "text-[#ffffffcc]")}
                      style={{ fontFamily: "Nunito-Light" }}
                    >
                      {progressPercentage}%
                    </Text>
                  </View>
                </CirclePercent>
              </>
            )}
          </View>
        </View>
      </View>
      {isInPast && error ? (
        <>
          <View className="mt-3">
            <Text
              className="text-[#FF5970] text-xs"
              style={{ fontFamily: "Nunito-Light" }}
            >
              * Time to do this has ended. Please go to Today's tasks
            </Text>
          </View>
        </>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};

export default ChallengeTaskElement;
