// import Header from "@modules/Header";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { View, BackHandler } from "react-native";
import ContentModal from "./ContentModal";
// import { useContentContext } from "./utils/ContentProvider";
import { Cast } from "@models/Cast/Cast";
import TaskStreamV5 from "./TaskStreamV5";
import BottomBarV4 from "./BottomBarV4";
import { aiToggleStatus } from ".";

interface Props {
  aiToggle?: aiToggleStatus;
  castId?: string;
  cast?: Cast;
}

const CommonComp: React.FC<Props> = ({ aiToggle, castId, cast }) => {
  // const { contentModalState, onBackRequest, finalOrientation } =
  //   useContentContext();

  const onNativeBack = useCallback(() => {
    const onBackPress = () => {
      // onBackRequest();

      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, []);

  useFocusEffect(onNativeBack);

  return (
    <View className="flex-1 bg-[#100F1A]">
      {/* <Header
        back={contentModalState !== "warning"}
        orientation={finalOrientation}
        headerType="transparent"
        onBack={onBackRequest}
        headerColor="#100F1A"
        tone="dark"
      /> */}
      <View className="flex-1 rounded-2xl relative">
        {castId && cast?.webStatus !== "DISCONNECTED" ? null : <TaskStreamV5 />}
        {aiToggle === "disabled" ? null : (
          <BottomBarV4
            isFullScreen={
              castId && cast?.webStatus !== "DISCONNECTED" ? true : false
            }
          />
        )}
      </View>
      <ContentModal />
    </View>
  );
};

export default CommonComp;
