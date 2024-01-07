import {
  arrowRightWhite,
  playIconBlack,
  proIconBlack,
  proPlusIconBlack,
  springIconWhiteFrame16,
  timeIconWhiteFrame16,
} from "@constants/imageKitURL";
import { Task } from "@models/Tasks/Task";
import clsx from "clsx";
import { useTaskActivity } from "../hooks/useTaskActivity";
import { Text, TouchableOpacity, View } from "react-native";
import MediaTile from "@components/MediaCard/MediaTile";
import ImageWithURL from "@components/ImageWithURL";
import { getImgUrlByDifficulty } from "../hooks/utils";
import ProgressBarDynamic from "./ProgressBarDynamic";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useState } from "react";
import PendingModal from "@modules/Workout/ProgramHome/TaskCards/PendingModal";
import { format } from "date-fns";
import { useNavStore } from "@providers/nav/navStore";
import { shallow } from "zustand/shallow";

interface Props {
  item: Task;
  uid: string;
  isDayFree?: boolean;
}

const TaskCardElement: React.FC<Props> = ({ item, uid, isDayFree }) => {
  const { earnedFP, taskStatus, selectedActivity } = useTaskActivity(
    uid,
    item.id,
    item.fitPoints ? item.fitPoints : 0,
    isDayFree,
    item.taskType === "live"
  );

  const [modalText, setModalText] = useState<string>();

  const navigation = useNavigation();
  const { today, state } = useAuthContext();

  const setWorkoutFinish = useNavStore(
    (state) => state.setWorkoutFinishNav,
    shallow
  );

  const onFPPress = () => {
    navigation.navigate("WorkoutDoneScreen", {
      taskId: item.id,
      attemptedDate: today,
    });
  };

  const taskPressHandle = () => {
    if (taskStatus === "done" && selectedActivity) {
      onFPPress();
    } else if (taskStatus === "pro") {
      weEventTrack("click_pro", {});
      navigation.navigate("ProScreen", {});
    } else if (taskStatus === "proPlus") {
      weEventTrack("click_proPlus", {});
      navigation.navigate("ProScreen", { planType: "proPlus" });
    } else if (item.taskType === "live" && item.liveLink && item.liveOn) {
      if (item.liveOn - 15 * 60 * 1000 > Date.now()) {
        setModalText(
          `This session will begin at ${format(item.liveOn, "MMM dd, hh:mma")}`
        );
      } else if (item.avatar) {
        navigation.navigate("CourseTaskPreviewScreen", {
          taskId: item.id,
          attemptedDate: today,
        });
        setWorkoutFinish("WorkoutDoneScreen");
      } else {
        setModalText(`We will soon add the video for this session.`);
      }
    } else if (taskStatus === "play" || taskStatus === "pending") {
      if (item?.taskType === "steps" || item?.taskType === "path") {
        navigation.navigate("MapTaskDetailScreen", {
          gameId: state.gameId ? state.gameId : "",
          taskId: item.id,
          attemptedDate: today,
        });
      } else if (item?.id) {
        navigation.navigate("CourseTaskPreviewScreen", {
          taskId: item.id,
          attemptedDate: today,
        });
        setWorkoutFinish("WorkoutDoneScreen");
      }
    } else if (taskStatus === "expired") {
    }
  };

  return (
    <TouchableOpacity
      key={item.id}
      onPress={taskPressHandle}
      className={clsx(
        "flex flex-row w-full rounded-xl md:rounded-3xl",
        taskStatus === "done" ? "bg-[#1DAC4D]" : "bg-[#343150]"
      )}
    >
      <View className="p-3 md:p-4 cursor-pointer flex flex-row w-full rounded-lg justify-between items-center ">
        <View className="w-2/6 aspect-[80/44] rounded-lg overflow-hidden relative z-0">
          {item.thumbnails ? (
            <MediaTile
              media={item.thumbnails}
              fluid={true}
              fluidResizeMode="cover"
            />
          ) : null}
          {selectedActivity?.progress ? (
            <View className={clsx("absolute  bottom-0 left-0 right-0 p-2")}>
              <ProgressBarDynamic
                backGround="#6D55D1"
                width={selectedActivity?.progress * 100}
                bgEmptyColor="#FFFFFF"
                height="h-1.5"
                pill="true"
              />
            </View>
          ) : null}
        </View>

        <View className="flex-1 pl-4 md:pl-8">
          <Text className="text-white text-sm md:text-2xl pb-2 md:pb-6">
            {item.name}
          </Text>

          {earnedFP ? (
            <View className="rounded-full border border-white w-fit px-4 h-6 md:h-8">
              <View className="flex flex-row justify-between items-center h-full">
                <Text className="text-white truncate  text-[10px] md:text-sm pr-1.5 ">
                  You earned {earnedFP}/{item.fitPoints} FP
                </Text>
                <View className="h-full flex flex-row items-center">
                  <ImageWithURL
                    source={{ uri: arrowRightWhite }}
                    className="w-1 h-2 md:w-1.5 md:h-3"
                  />
                </View>
              </View>
            </View>
          ) : (
            <View className="flex flex-row items-end gap-3">
              <View className="flex flex-row items-center">
                <ImageWithURL
                  className="w-2 aspect-square"
                  source={{ uri: springIconWhiteFrame16 }}
                />
                <Text className="text-gray-200 text-[10px] pl-1">
                  {item.fitPoints} FPs
                </Text>
              </View>
              <View className="flex flex-row items-center">
                <ImageWithURL
                  className="w-2 aspect-square"
                  source={{ uri: timeIconWhiteFrame16 }}
                />

                <Text className="text-gray-200 text-[10px] pl-1">
                  {item.durationMinutes} mins
                </Text>
              </View>
              <View className="flex flex-row items-center">
                <ImageWithURL
                  className="w-2 aspect-square"
                  source={{
                    uri: item.difficultyLevels
                      ? getImgUrlByDifficulty(item?.difficultyLevels)
                      : "",
                  }}
                />
                <Text className="text-gray-200 capitalize text-[10px] pl-1">
                  {item.difficultyLevels}
                </Text>
              </View>
            </View>
          )}
        </View>

        <ImageWithURL
          source={{
            uri:
              taskStatus === "pro"
                ? proIconBlack
                : taskStatus === "proPlus"
                ? proPlusIconBlack
                : playIconBlack,
          }}
          className="w-6 aspect-square"
        />
      </View>
      {modalText ? (
        <PendingModal
          isOpen={modalText ? true : false}
          onCloseModal={() => setModalText(undefined)}
          text={modalText}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default TaskCardElement;
