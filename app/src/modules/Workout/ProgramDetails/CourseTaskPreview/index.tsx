import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import Header from "@modules/Header";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import CreatedByCoach from "@modules/CourseMain/Components/CreatedByCoach";
import ButtonWithIcon from "@modules/TeamInvite/ButtonWithIcon";
import {
  levelBeginnerIconWhiteFrame16,
  playIconWhiteFrame14,
  springIconWhiteFrame16,
  timeIconWhiteFrame16,
} from "@constants/imageKitURL";
import { getEquipmentNames } from "./utils";
import { useUserV2 } from "@hooks/auth/useUserV2";
import Exercises from "./Exercises";
import { useWorkoutTask } from "@hooks/program/useWorkoutTask";
import MediaTile from "@components/MediaCard/MediaTile";
import TaskPoints from "@modules/Workout/ProgramHome/TaskCards/TaskPoints";
import SvgIcons from "@components/SvgIcons";
import { saveTaskActivity } from "../TaskSubmitV3/utils/saveUtils";

interface Props {
  taskId: string;
  attemptedDate: string;
  // activityId: string;
}

const CourseTaskPreview: React.FC<Props> = ({
  taskId,
  attemptedDate,
  // activityId,
}) => {
  // const { task } = useTaskContext();

  const { task } = useWorkoutTask(taskId);

  const navigation = useNavigation();
  const { state } = useAuthContext();
  // const { res } = useSubscriptionContext();

  const { user: leader } = useUserV2(task?.userId);

  const videoPresent = task?.avatar && task.avatar.resource_type === "video";

  const onCtaPress = async () => {
    if (videoPresent) {
      // navigation.dispatch(
      //   StackActions.replace("UploadTask", {
      //     gameId: state ? state.gameId : "",
      //     taskId: task ? task.id : "",
      //     attemptedDate,
      //   })
      // );

      navigation.navigate("UploadTask", {
        gameId: state ? state.gameId : "",
        taskId: task ? task.id : "",
        attemptedDate,
        // selectedDayNumber,
      });
    } else if (task && state.uid) {
      // log workout here
      await saveTaskActivity(task, state.uid, attemptedDate);
      navigation.goBack();
    }
    weEventTrack("workoutPreview_clickStartWorkout", {
      taskId: task ? task.id : "no_taskId",
      taskName: task?.name ? task.name : "no_taskName",
      fps: task?.fitPoints ? task.fitPoints : -1,
      duration: task?.durationMinutes ? task.durationMinutes : -1,
      // isPro: !task?.freeTask && res.currentStatus !== "SUBSCRIBED" ? 1 : 0,
    });
  };

  const onBack = () => {
    navigation.goBack();
    weEventTrack("workoutPreview_goback", {});
  };

  const onCast = () => {
    navigation.navigate("CastPreview");
    weEventTrack("workoutPreview_castClick", {});
  };

  return (
    <View className="w-full h-full bg-[#232136] flex-1">
      <Header
        back={true}
        onBack={onBack}
        headerColor="#232136"
        tone="dark"
        optionNode={
          task?.avatar?.resource_type === "video" ? (
            <TouchableOpacity
              onPress={onCast}
              className="w-10 aspect-square rounded-full bg-white p-2.5"
            >
              <SvgIcons iconType="cast" color="#363636" />
            </TouchableOpacity>
          ) : undefined
        }
      />
      <View style={{ flex: 1 }} className="bg-[#232136] overflow-hidden">
        <ScrollView
          className="flex-1 rounded-t-3xl"
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full aspect-[1.95]  pb-2 overflow-hidden">
            <MediaTile
              fluid={true}
              roundedStr=""
              placeholderWidth={400}
              placeholderHeight={300}
              media={task?.thumbnails ? task?.thumbnails : task?.videoThumbnail}
            />
          </View>

          <Text
            className="text-base iphoneX:text-lg  px-5 text-white"
            numberOfLines={2}
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {task?.name}
          </Text>
          <View className="flex flex-row justify-between px-5    py-0.5 rounded-lg">
            <TaskPoints
              text={`${task?.fitPoints ? task?.fitPoints : 0} FP`}
              imageUrl={springIconWhiteFrame16}
              textStyle="text-sm iphoneX:text-base font-medium"
              imgHWStr="w-4 h-4 aspect-squre"
              fullUrl={true}
            />

            <TaskPoints
              text={`Lvl ${task?.level ? task?.level : 0}`}
              imageUrl={levelBeginnerIconWhiteFrame16}
              textStyle="text-sm iphoneX:text-base font-medium"
              imgHWStr="w-4 h-4 aspect-squre"
              fullUrl={true}
            />

            <TaskPoints
              text={`${task?.durationMinutes ? task?.durationMinutes : 0} min`}
              imageUrl={timeIconWhiteFrame16}
              textStyle="text-sm iphoneX:text-base font-medium"
              imgHWStr="w-4 h-4 aspect-squre"
              fullUrl={true}
            />
          </View>
          {task?.description || task?.equipmentNeeded ? (
            <View className="py-4">
              <CreatedByCoach
                media={leader?.profileImage}
                primaryText={task?.description || ""}
                secondaryText={getEquipmentNames(task?.equipmentNeeded)}
                createdByString={`Created by ${
                  leader?.name ? leader.name : "Coach"
                }`}
                goalOrEquipment="Equipment needed : "
              />
            </View>
          ) : (
            <View className="h-40" />
          )}

          <Exercises task={task} />
          <View className="h-20 " />
        </ScrollView>

        <View className="py-4">
          <ButtonWithIcon
            iconUrl={`${playIconWhiteFrame14}`}
            title={
              videoPresent && task.id
                ? "Start Workout"
                : task?.id
                ? "Mark it completed"
                : ""
            }
            textColor="text-white"
            textStyle="pl-2 text-sm iphoneX:text-base text-white"
            roundedStr="rounded-xl py-3 mx-auto px-4 flex flex-row justify-center"
            iconStyle="w-5 aspect-square "
            fontFamily="Nunito-Bold"
            layoutStyle={{
              backgroundColor: "#6D55D1",
              alignItems: "center",
              width: "90%",
            }}
            onPress={onCtaPress}
          />
        </View>
      </View>
    </View>
  );
};

export default CourseTaskPreview;
