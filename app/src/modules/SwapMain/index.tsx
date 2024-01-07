import { KeyboardAvoidingView, Platform, View } from "react-native";
import { MealTypes } from "@models/Tasks/Task";
import SearchBarSwap from "./SearchBarSwap";
import SwapItemList from "./SwapItemList";
import NewItemFooter from "./NewItemFooter";
import Header from "@modules/Header";
import SwapHeading from "./SwapHeader/SwapHeading";

import AiScanOptionNode from "@modules/MealMain/components/headerComp/AiScanOptionNode";
import { useNavigation } from "@react-navigation/native";
import { useUserStore } from "@providers/user/store/useUserStore";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import TabSelection from "./TabSelection";
import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";
import { shallow } from "zustand/shallow";

interface Props {
  mealType?: MealTypes;
  taskId?: string;
  dayRecommendationId: string;
}

const SwapMain: React.FC<Props> = ({
  mealType,
  taskId,
  dayRecommendationId,
}) => {
  const navigation = useNavigation();
  const { mealTrackOnboarding } = useUserStore((state) => ({
    mealTrackOnboarding: state.user?.flags?.mealTrackOnboarding,
  }));
  const { _retakePicture } = useCameraImage(
    (state) => ({
      _retakePicture: state._retakePicture,
    }),
    shallow
  );

  const navigationOnSwapFlow = () => {
    // console.log("navigationOnSwapFlow", mealType);
    navigation.navigate("ImageCaptureScreen", {
      mealType: mealType,
      taskId: taskId,
      dayRecommendationId,
    });
    weEventTrack("SwapScreen_ImageCaptureScreen", {
      dayRecommendationId,
      taskId: taskId ? taskId : "",
    });
  };

  const navigationOnAddFlow = () => {
    navigation.navigate("AiScanMealTypeScreen", {
      mealType: mealType,
      taskId: taskId,
      dayRecommendationId,
    });
    weEventTrack("SwapScreen_AiScanMealTypeScreen", {
      dayRecommendationId,
      taskId: taskId ? taskId : "",
    });
  };

  const navigationOnAiOnboardingFlow = () => {
    navigation.navigate("AiScanOnboardingScreen", {
      index: 0,
      mealType: mealType,
      taskId: taskId,
      dayRecommendationId,
    });
    weEventTrack("SwapScreen_AiScanOnboarding", {
      dayRecommendationId,
      taskId: taskId ? taskId : "",
    });
  };

  const onAiScan = () => {
    _retakePicture();
    if (dayRecommendationId) {
      if (mealTrackOnboarding) {
        if (taskId) {
          navigationOnSwapFlow();
        } else {
          navigationOnAddFlow();
        }
      } else {
        navigationOnAiOnboardingFlow();
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#232136] "
      contentContainerStyle={{ flex: 1 }}
    >
      <Header
        back={true}
        headerColor="#232136"
        tone="dark"
        optionNode={<AiScanOptionNode onAiScan={onAiScan} />}
      />
      <SwapHeading
        title={
          !taskId
            ? "What would you like to add?"
            : "What would you like to Swap with?"
        }
      />

      <View className="flex-1 bg-[#232136] relative z-0">
        <View className="pb-4 px-4">
          <SearchBarSwap meal={mealType} />
        </View>
        <TabSelection />
        <View className="flex-1">
          <SwapItemList
            toSwapMealType={mealType}
            taskId={taskId}
            dayRecommendationId={dayRecommendationId}
          />
        </View>
        <NewItemFooter
          taskId={taskId}
          mealType={mealType}
          dayRecommendationId={dayRecommendationId}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SwapMain;
