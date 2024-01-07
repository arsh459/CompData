import Header from "@modules/Header";
import { useUserV2 } from "@hooks/auth/useUserV2";
import CreatedByCoach from "@modules/CourseMain/Components/CreatedByCoach";
import Nutrifact from "@modules/Nutrition/Components/NutriFact";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import { useTaskContext } from "@providers/task/TaskProvider";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import TaskMediaV2 from "../CourseTaskPreview/TaskMediaV2";

const CourseNutritionPreview = () => {
  const { task, taskStatus } = useTaskContext();

  const navigation = useNavigation();
  const { state } = useAuthContext();
  const { res } = useSubscriptionContext();

  const { user: leader } = useUserV2(task?.userId);

  const onCtaPress = () => {
    if (task) {
      navigation.navigate("NutriCameraScreen", {
        taskId: task.id,
        // selectedDayNumber: selectedDayNumber,
        gameId: state.gameId,
        badgeId: task.badgeId,
      });
    }
    weEventTrack("workoutPreview_clickStartWorkout", {
      taskId: task ? task.id : "no_taskId",
      taskName: task?.name ? task.name : "no_taskName",
      fps: task?.fitPoints ? task.fitPoints : -1,
      duration: task?.durationMinutes ? task.durationMinutes : -1,
      isPro: !task?.freeTask && res.currentStatus !== "SUBSCRIBED" ? 1 : 0,
    });
  };

  const onBack = () => {
    navigation.goBack();
    weEventTrack("workoutPreview_goback", {});
  };

  return (
    <>
      <Header
        back={true}
        onBack={onBack}
        headerColor="#100F1A"
        tone="dark"
        headerType="overlay"
      />
      <View className="flex-1 bg-[#100F1A]">
        <ScrollView
          className="flex-1"
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <TaskMediaV2
            taskName={task?.name}
            media={task?.thumbnails ? task?.thumbnails : task?.videoThumbnail}
            uid={task?.userId}
            fitPoints={task?.fitPoints}
            level={task?.level}
            taskDuration={task?.durationMinutes ? task?.durationMinutes : 0}
            hideAuthor={true}
            hideKPIs={true}
          />

          <View className="p-4">
            <View className="flex flex-row">
              <Nutrifact
                value={task?.nutritionFacts?.protein || 0}
                text={"protein"}
                isWhite={true}
              />
              <View className="w-3 aspect-square" />
              <Nutrifact
                value={task?.nutritionFacts?.fibre || 0}
                text={"fibre"}
                isWhite={true}
              />
            </View>
            <View className="w-3 aspect-square" />
            <View className="flex flex-row">
              <Nutrifact
                value={task?.nutritionFacts?.fats || 0}
                text={"fats"}
                isWhite={true}
              />
              <View className="w-3 aspect-square" />
              <Nutrifact
                value={task?.nutritionFacts?.carbs || 0}
                text={"carbs"}
                isWhite={true}
              />
            </View>
          </View>

          <View className="py-4">
            <CreatedByCoach
              media={leader?.profileImage}
              primaryText={task?.description}
              createdByString={`Created by ${
                leader?.name ? leader.name : "Coach"
              }`}
            />
          </View>
        </ScrollView>

        {taskStatus !== "expired" ? (
          <TouchableOpacity
            onPress={onCtaPress}
            className="m-4 bg-white rounded-full"
          >
            <Text className="text-[#FF6C1A] text-base font-bold text-center py-3.5">
              Select Meal
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
};

export default CourseNutritionPreview;
