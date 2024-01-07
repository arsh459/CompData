import Header from "@modules/Header";
import { useWorkoutVideoStore } from "./utils/useWorkoutVideoStore";
import { useCallback } from "react";
import { BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { shallow } from "zustand/shallow";
import VideoQualityBanner from "./VideoQualityBanner";

const HeaderWrapper = ({}) => {
  const { finalOrientation, onBackRequest, contentModalState } =
    useWorkoutVideoStore((state) => {
      return {
        finalOrientation: state.finalOrientation,
        onBackRequest: state.onBackRequest,
        contentModalState: state.contentModalState,
      };
    }, shallow);

  const onNativeBack = useCallback(() => {
    const onBackPress = () => {
      onBackRequest();

      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, []);

  useFocusEffect(onNativeBack);
  // console.log("header wrapper");
  return (
    <Header
      back={contentModalState !== "warning"}
      orientation={finalOrientation}
      headerType="transparent"
      onBack={onBackRequest}
      headerColor="#100F1A"
      tone="dark"
      centerTitle={true}
      titleNode={<VideoQualityBanner />}
    />
  );
};

export default HeaderWrapper;
