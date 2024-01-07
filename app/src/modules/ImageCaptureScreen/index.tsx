import {
  CommonActions,
  // useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { ImageCaptureScreenParams } from "@screens/ImageCaptureScreen";
import { useMealTiming } from "@screens/SwapScreen/useMealTimings";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ImageMain from "./components/cameraComps/ImageMain";
import OptionNode from "./components/headerComps/OptionNode";
import TitleComp from "./components/headerComps/TitleComp";
import PermissionNutritionWrapper from "./components/permissionComps/PermissionNutritionWrapper";
import Header from "@modules/Header";
import { View } from "react-native";
import useCameraImage from "./store/useCameraImage";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
// import { BackHandler } from "react-native";

const ImageCaptureScreenModule: React.FC<ImageCaptureScreenParams> = ({
  mealType,
  taskId,
  dayRecommendationId,
}) => {
  const { bottom } = useSafeAreaInsets();
  const MealTypeObj = useMealTiming();
  const navigation = useNavigation();
  const route = useRoute();

  const { _retakePicture } = useCameraImage(
    (state) => ({
      _retakePicture: state._retakePicture,
    }),
    shallow
  );

  const onInfoIconPress = () => {
    _retakePicture();
    navigation.dispatch((state) => {
      let routes = state.routes;
      routes = routes.filter((r) => r.name !== "ImageCaptureScreen");

      routes.push({
        key: `AiScanOnboardingScreen-${Math.random() * 1000}`,
        name: "AiScanOnboardingScreen",
        params: {
          index: 0,
          mealType: mealType,
          taskId: taskId,
          dayRecommendationId: dayRecommendationId,
        },
      });

      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
    weEventTrack("infoIcon_AiScanOnboarding", {
      dayRecommendationId: dayRecommendationId,
      taskId: taskId ? taskId : "",
    });
  };

  // const onBack = () => {
  //   _retakePicture();
  //   navigation.goBack();
  //   weEventTrack("goBack", { screenName: route.name });
  // };

  // const onNativeBack = useCallback(() => {
  //   const onBackPress = () => {
  //     onBack();
  //     return true;
  //   };
  //   BackHandler.addEventListener("hardwareBackPress", onBackPress);

  //   return () =>
  //     BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  // }, []);

  // useFocusEffect(onNativeBack);

  useEffect(() => {
    return () => {
      _retakePicture();
      weEventTrack("goBack", { screenName: route.name });
    };
  }, []);

  return (
    <>
      <Header
        centerTitle={true}
        back={true}
        headerColor="#232136"
        titleNode={<TitleComp title="Meal Scan" />}
        optionNode={<OptionNode onInfoIconPress={onInfoIconPress} />}
        tone="dark"
        title=""
        headerType="solid"
        // onBack={onBack}
      />
      <View
        className="w-full flex-1 bg-[#232136] "
        style={{ paddingBottom: bottom }}
      >
        <PermissionNutritionWrapper>
          <ImageMain
            mealType={
              mealType
                ? mealType
                : MealTypeObj.mealType
                ? MealTypeObj.mealType
                : "Breakfast"
            }
            taskId={taskId}
            dayRecommendationId={dayRecommendationId}
          />
        </PermissionNutritionWrapper>
      </View>
    </>
  );
};

export default ImageCaptureScreenModule;
