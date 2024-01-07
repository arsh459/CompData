import { TouchableOpacity, View } from "react-native";
import { useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { useStreakStore } from "@providers/streakV2/store/useStreakStoreV2";
import { shallow } from "zustand/shallow";
import { Text } from "react-native";
import ImageWithURL from "@components/ImageWithURL";
import { blueWorkout, bowl } from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";
import {
  handleNutritionClick,
  handleWorkoutClick,
} from "@modules/HomeScreen/MyPlanV2/utils";
import { useUserStore } from "@providers/user/store/useUserStore";
import { getStartTime } from "@modules/Nutrition/V2/DaySelector/provider/utils";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export const TaskModal = () => {
  const ref = useRef<BottomSheet>(null);
  const navigation = useNavigation();
  const { showTaskModal, toggleTaskModal } = useStreakStore(
    (state) => ({
      showTaskModal: state.showTaskModal,
      toggleTaskModal: state.toggleTaskModal,
    }),
    shallow
  );
  // console.log(showTaskModal);
  const {
    nutritionBadgeIdEnrolled,
    workoutBadgeIdEnrolled,
    workoutBadgeId,
    nutritionBadgeId,
    nutritionStartTime,
    workoutStartTime,
  } = useUserStore((state) => ({
    nutritionBadgeIdEnrolled: state.user?.nutritionBadgeIdEnrolled,
    nutritionBadgeId: state.user?.nutritionBadgeId,
    workoutBadgeIdEnrolled: state.user?.badgeIdEnrolled,
    workoutBadgeId: state.user?.badgeId,
    nutritionStartTime: getStartTime(
      state.user?.recommendationConfig?.badgeConfig,
      state.user?.nutritionBadgeId,
      "nutrition",
      undefined,
      state.user?.recommendationConfig?.nutritionStart
    ),
    workoutStartTime: getStartTime(
      state.user?.recommendationConfig?.badgeConfig,
      state.user?.badgeId,
      "workout",
      state.user?.recommendationConfig?.start,
      undefined
    ),
  }));
  const onNutritionPlanClick = () => {
    toggleTaskModal();
    handleNutritionClick(
      navigation,
      nutritionBadgeIdEnrolled,
      nutritionBadgeId,
      nutritionStartTime
    );
  };
  const onWorkoutPlanClick = () => {
    toggleTaskModal();
    handleWorkoutClick(
      navigation,
      workoutBadgeIdEnrolled,
      workoutBadgeId,
      workoutStartTime
    );
  };

  const { bottom } = useSafeAreaInsets();

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={showTaskModal}
      avoidKeyboard={true}
      supportedOrientations={["portrait"]}
      onBackButtonPress={toggleTaskModal}
      onBackdropPress={toggleTaskModal}
      statusBarTranslucent={true}
      hideModalContentWhileAnimating={true}
      style={{ margin: 0, padding: 0 }}
      backdropColor="#232136E5"
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      animationInTiming={100}
    >
      <BottomSheet
        ref={ref}
        snapPoints={["30%"]}
        backgroundStyle={{ backgroundColor: "white" }}
        handleIndicatorStyle={{ display: "none" }}
        enablePanDownToClose
        onClose={toggleTaskModal}
      >
        <View className=" bg-white w-full h-full px-4 pb-12">
          <Text className=" text-lg text-[#6D55D1] text-left font-extrabold mb-0">
            Choose your Category:
          </Text>
          <View
            style={{ paddingBottom: bottom || 20 }}
            className=" w-full h-full flex flex-row "
          >
            <TouchableOpacity
              onPress={onWorkoutPlanClick}
              className=" pt-4 flex-1 mr-4"
            >
              <View className=" flex-1 flex items-center justify-center bg-[#BEECFF] rounded-2xl">
                <ImageWithURL
                  source={{ uri: blueWorkout }}
                  resizeMode="contain"
                  className=" w-10 h-10"
                />
                <Text className="text-[#008DDD] mt-4 text-base font-bold">
                  Workout Plan
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onNutritionPlanClick}
              className="pt-4 flex-1"
            >
              <View className=" flex-1 bg-[#FFE5BE] flex items-center justify-center rounded-2xl">
                <ImageWithURL
                  source={{ uri: bowl }}
                  resizeMode="contain"
                  className=" w-10 h-10"
                />
                <Text className="text-[#DD8500] mt-4 text-base font-bold">
                  Nutition Plan
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </Modal>
  );
};
