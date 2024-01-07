// import { UserProvider } from "@providers/user/UserProvider";
import Header from "@modules/Header";
import NutriCameraV2 from "@modules/Nutrition/NutriCamera/NutriCameraV2";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TaskProvider } from "@providers/task/TaskProvider";
import { GameProvider } from "@providers/game/GameProvider";
import { BadgeProgressProvider } from "@providers/BadgeProgressProvider/BadgeProgressProvider";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { View } from "react-native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
export interface NutritionCameraParams {
  taskId: string;
  // selectedDayNumber: number;
  gameId: string;
  badgeId?: string;
}
const NutriCameraScreen = () => {
  const route = useRoute();
  const params = route.params as NutritionCameraParams;
  const { state, todayUnix } = useAuthContext();

  useScreenTrack();

  const navigation = useNavigation();

  const onBack = () => {
    navigation.goBack();
    weEventTrack("nutrition_goBeforePermission", {});
  };

  return (
    <View className="bg-[#100F1A] flex flex-1">
      <GameProvider selectedGameId={state.gameId}>
        <Header
          back={true}
          tone="dark"
          onBack={onBack}
          headerColor="#100F1A"
          headerType="transparent"
        />
        <BadgeProgressProvider badgeId={params.badgeId}>
          <TaskProvider selectedUnix={todayUnix} selectedTaskId={params.taskId}>
            <NutriCameraV2 />
          </TaskProvider>
        </BadgeProgressProvider>
      </GameProvider>
    </View>
  );
};

export default NutriCameraScreen;
