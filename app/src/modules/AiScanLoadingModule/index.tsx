import ErrorComp from "@modules/AddNewItem/components/loadingScreen/ErrorComp";
import LoadingProgressBar from "@modules/AddNewItem/components/loadingScreen/LoadingProgressBar";
import { useLoadingAnimation } from "@modules/AddNewItemLoading/hooks/useLoadingAnimation";
import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";
import { View } from "react-native";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";
import {
  CommonActions,
  // useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import useDietCalendar from "@hooks/dietPlan/useDietCalendar";
import { AiScanItemSelectionScreenParams } from "@screens/AiScanItemsSelectionScreen";
// import { useCallback } from "react";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
const AiScanLoadingModule: React.FC<AiScanItemSelectionScreenParams> = ({
  toBeSwaped,
}) => {
  const navigation = useNavigation();
  const { stage, genTaskId, _retakePicture, renewGenerationId } =
    useCameraImage(
      (state) => ({
        stage: state.stage,
        genTaskId: state.genTaskId,
        _retakePicture: state._retakePicture,
        renewGenerationId: state.renewGenerationId,
      }),
      shallow
    );
  const { value, valueCircle, LOADING_TIME } = useLoadingAnimation();
  const { activeUnix } = useDietCalendar(
    (state) => ({
      activeUnix: state.active?.unix,
    }),
    shallow
  );

  const route = useRoute();
  useEffect(() => {
    if (stage === "generated" && genTaskId) {
      _retakePicture();
      navigation.dispatch((state) => {
        let routes = state.routes;
        routes = routes.filter(
          (r) =>
            r.name !== "AiScanItemAddScreen" &&
            r.name !== "AiScanItemSelectionScreen" &&
            r.name !== "AiScanLoadingScreen" &&
            r.name !== "ImageCaptureScreen" &&
            r.name !== "AiScanMealTypeScreen" &&
            r.name !== "AiScanOnboardingScreen" &&
            r.name != "SwapScreen"
        );
        routes.push({
          key: `MealScreen-${Math.round(Math.random() * 1000)}`,
          name: "MealScreen",
          params: {
            taskId: genTaskId,
            selectedUnix: activeUnix,
            toBeSwaped: toBeSwaped,
          },
        });
        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      });
    }
  }, [genTaskId, stage]);

  useEffect(() => {
    return () => {
      renewGenerationId();
      weEventTrack("goBack", { screenName: route.name });
    };
  }, []);

  const onPressRetry = () => {
    _retakePicture();
    navigation.dispatch((state) => {
      let routes = state.routes;
      routes = routes.filter(
        (r) =>
          r.name !== "AiScanItemAddScreen" &&
          r.name !== "AiScanItemSelectionScreen" &&
          r.name !== "AiScanLoadingScreen" &&
          r.name !== "ImageCaptureScreen" &&
          r.name != "AiScanMealTypeScreen"
      );

      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  };

  // const onBack = () => {
  //   renewGenerationId();
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

  return (
    <View className="flex-1 bg-[#232136]">
      {stage === "generating" || stage === "generated" ? (
        <LoadingProgressBar
          valueCircleAnimation={valueCircle}
          valuePercent={value}
          animationDuration={LOADING_TIME}
        />
      ) : stage === "generatingError" ? (
        <ErrorComp onPressButton={onPressRetry} />
      ) : (
        <></>
      )}
    </View>
  );
};

export default AiScanLoadingModule;
