import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import Header from "@modules/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import AddButton from "@modules/AddNewItem/components/searchScreen/AddButton";
import SearchBar from "@modules/AddNewItem/components/searchScreen/SearchBar";
import AiScanOptionNode from "@modules/MealMain/components/headerComp/AiScanOptionNode";
import { useUserStore } from "@providers/user/store/useUserStore";
import useAddNewItem from "@providers/AddNewItem/useAddNewItem";
import { shallow } from "zustand/shallow";
import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";

export interface AddNewItemScreenParams {
  taskId?: string;
  dayRecommendationId: string;
}

const AddNewItemSearchScreen = () => {
  const route = useRoute();

  useScreenTrack();
  const navigation = useNavigation();
  const { taskId, dayRecommendationId } =
    route.params as AddNewItemScreenParams;
  const { mealTrackOnboarding } = useUserStore((state) => ({
    mealTrackOnboarding: state.user?.flags?.mealTrackOnboarding,
  }));

  const { queryItem } = useAddNewItem(
    (state) => ({
      queryItem: state.queryItem,
    }),
    shallow
  );

  const { mealType } = useAddNewItem(
    (state) => ({
      mealType: state.mealType,
    }),
    shallow
  );

  const { _retakePicture } = useCameraImage(
    (state) => ({
      _retakePicture: state._retakePicture,
    }),
    shallow
  );
  function onPress() {
    if (queryItem) {
      if (!taskId) {
        navigation.navigate("AddNewItemMealTypeScreen", {
          taskId: taskId,
          dayRecommendationId: dayRecommendationId,
        });
        weEventTrack("AddNewItemSearchScreen_click", {
          AddNewMeal: "true",
        });
      } else {
        navigation.navigate("AddNewItemScreen", {
          taskId: taskId,
          dayRecommendationId: dayRecommendationId,
        });
        weEventTrack("AddNewItemSearchScreen_click", {
          swapMeal: "true",
        });
      }
    }
  }
  const onAiScan = () => {
    _retakePicture();
    if (dayRecommendationId && mealTrackOnboarding) {
      if (taskId) {
        navigation.navigate("ImageCaptureScreen", {
          taskId: taskId,
          dayRecommendationId,
          mealType: mealType,
        });
        weEventTrack("AddNewItemSearchScreen_AiScanMealTypeScreen", {
          dayRecommendationId,
          taskId: taskId ? taskId : "",
        });
      } else {
        navigation.navigate("AiScanMealTypeScreen", {
          taskId: taskId,
          dayRecommendationId,
          mealType: mealType,
        });
        weEventTrack("AddNewItemSearchScreen_AiScanMealTypeScreen", {
          dayRecommendationId,
          taskId: taskId ? taskId : "",
        });
      }
    } else {
      navigation.navigate("AiScanOnboardingScreen", {
        index: 0,
        taskId: taskId,
        dayRecommendationId,
        mealType: mealType,
      });
      weEventTrack("AddNewItemSearchScreen_AiScanOnboarding", {
        dayRecommendationId,
        taskId: taskId ? taskId : "",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#232136] "
      contentContainerStyle={{ flex: 1 }}
    >
      <View className="flex-1 bg-[#232136]">
        <Header
          back={true}
          headerColor="#232136"
          tone="dark"
          optionNode={<AiScanOptionNode onAiScan={onAiScan} />}
        />
        <SearchBar />
        <AddButton
          cta="Proceed"
          onPress={onPress}
          disable={queryItem ? false : true}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddNewItemSearchScreen;
