import {
  View,
  ScrollView,
  Text,
  useWindowDimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Header from "@modules/Header";
import { useNavigation } from "@react-navigation/native";
import {
  levelBeginnerIconWhiteFrame16,
  springIconWhiteFrame16,
  timeIconWhiteFrame16,
} from "@constants/imageKitURL";
import TaskPoints from "@modules/Workout/ProgramHome/TaskCards/TaskPoints";
import MediaTile from "@components/MediaCard/MediaTile";
import MembersImage from "@components/MembersImage";
import { usePlainTaskContext } from "@providers/task/PlainTaskProvider";
import { useTaskActivityWithUser } from "@hooks/activity/useTaskActivityWithUser";
import { useState } from "react";
import TaskDoneUsersModal from "./TaskDoneUsersModal";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { useUserRelevantActs } from "@hooks/activity/useUserRelevantActs";
import Attempts from "../Comps/Attempts";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useNavStore } from "@providers/nav/navStore";
import { shallow } from "zustand/shallow";

interface Props {
  taskId: string;
  attemptedDate: string;
}

const WorkoutDoneMain: React.FC<Props> = ({ taskId, attemptedDate }) => {
  const navigation = useNavigation();
  const { user } = useUserContext();
  const { state } = useAuthContext();
  const { task } = usePlainTaskContext();
  const { taskDoneLists, onNext } = useTaskActivityWithUser(taskId);
  const { width, height } = useWindowDimensions();
  const [showAll, setShowAll] = useState<boolean>(false);
  const { userRelevantActs } = useUserRelevantActs(task?.id);

  const setWorkoutFinish = useNavStore(
    (state) => state.setWorkoutFinishNav,
    shallow
  );

  const onRetry = async () => {
    if (task?.taskType === "path") {
      navigation.navigate("MapTaskDetailScreen", {
        gameId: state.gameId,
        taskId: task ? task.id : "",
        attemptedDate,
      });
    } else {
      navigation.navigate("CourseTaskPreviewScreen", {
        taskId: task ? task.id : "",
        attemptedDate,
      });

      setWorkoutFinish("WorkoutDoneScreen");
    }

    weEventTrack("workoutDone_repeat", {});
  };

  const onDone = () => {
    navigation.navigate("Workout", {
      badgeId: user?.badgeId || "",
    });

    weEventTrack("workoutDone_done", {});
  };

  const media = task?.thumbnails ? task?.thumbnails : task?.videoThumbnail;

  return (
    <>
      <Header
        back={true}
        headerColor="#100F1A"
        tone="dark"
        title="Your stats"
      />
      <View style={{ flex: 1 }} className="bg-[#232136] overflow-hidden">
        <ScrollView
          className="flex-1"
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <MediaTile
            media={media}
            mediaWidth={width}
            maxHeight={height / 2}
            mediaFit="contain"
          />

          <Text
            className="text-lg iphoneX:text-xl px-4 py-3 text-white"
            numberOfLines={2}
            style={{ fontFamily: "Nunito-SemiBold" }}
          >
            {task?.name}
          </Text>

          <View className="flex flex-row justify-between px-4">
            <TaskPoints
              text={`${task?.fitPoints ? task?.fitPoints : 0} FP`}
              imageUrl={springIconWhiteFrame16}
              textStyle="text-xs iphoneX:text-sm font-medium"
              imgHWStr="w-4 aspect-square"
              fullUrl={true}
            />

            <TaskPoints
              text={`Lvl ${task?.level ? task?.level : 0}`}
              imageUrl={levelBeginnerIconWhiteFrame16}
              textStyle="text-xs iphoneX:text-sm font-medium"
              imgHWStr="w-4 aspect-square"
              fullUrl={true}
            />

            <TaskPoints
              text={`${task?.durationMinutes ? task?.durationMinutes : 0} min`}
              imageUrl={timeIconWhiteFrame16}
              textStyle="text-xs iphoneX:text-sm font-medium"
              imgHWStr="w-4 aspect-square"
              fullUrl={true}
            />
          </View>

          {userRelevantActs.length ? (
            <View className="bg-[#343150] rounded-2xl mx-4 mt-4">
              <Text className="text-white text-base px-4 py-2">
                Fitpoints Earned
              </Text>
              <View className="h-px bg-white/25" />
              <View className="p-4">
                {userRelevantActs
                  .sort((a, b) => b.updatedOn - a.updatedOn)
                  .map((each, index) => (
                    <Attempts
                      key={each.id}
                      activity={each}
                      taskFP={task?.fitPoints || 0}
                      index={index}
                      total={userRelevantActs.length}
                    />
                  ))}
              </View>
            </View>
          ) : null}

          {taskDoneLists.length ? (
            <Pressable
              onPress={() => setShowAll(true)}
              className="bg-[#343150] p-4 justify-center rounded-2xl items-center mx-4 mt-4 relative z-0"
            >
              <View className="pb-4">
                <Text
                  className="text-sm text-white "
                  style={{ fontFamily: "Nunito-Semibold" }}
                >
                  People who also completed this practice
                </Text>
                <View className="w-4 aspect-square" />
                <MembersImage
                  members={taskDoneLists.slice(0, 6).map((each) => each.user)}
                  size="large"
                  hidePlusOthers={true}
                  ring={true}
                  ringColor="#FFFFFF"
                />
              </View>

              <Text className="underline absolute bottom-3 right-3 text-xs text-white/80">
                See All
              </Text>
            </Pressable>
          ) : null}
        </ScrollView>

        <View className="p-4 flex flex-row">
          <TouchableOpacity
            onPress={onRetry}
            className="bg-[#5D588C] flex-1 rounded-xl flex justify-center items-center py-3"
          >
            <Text
              className="text-xs iphoneX:text-sm text-center text-white"
              style={{ fontFamily: "Nunito-Semibold" }}
            >
              Repeat
            </Text>
          </TouchableOpacity>
          <View className="w-4 aspect-square" />
          <TouchableOpacity
            onPress={onDone}
            className="bg-[#6D55D1] flex-1 rounded-xl flex justify-center items-center py-3"
          >
            <Text
              className="text-xs iphoneX:text-sm text-center text-white"
              style={{ fontFamily: "Nunito-Semibold" }}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TaskDoneUsersModal
        isOpen={showAll}
        onCloseModal={() => setShowAll(false)}
        taskDoneLists={taskDoneLists}
        onNext={onNext}
        taskFP={task?.fitPoints || 0}
      />
    </>
  );
};

export default WorkoutDoneMain;
