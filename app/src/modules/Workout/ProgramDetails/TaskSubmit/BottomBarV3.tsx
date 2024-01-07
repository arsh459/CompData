import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BasicCTA from "@components/Buttons/BasicCTA";
// import LiveStream from "./LiveStream";
// import { RefObject } from "react";
// import { Camera } from "react-native-vision-camera";
// import { Camera } from "expo-camera";
import clsx from "clsx";
// import LiveStreamV2 from "./LiveStreamV2";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LiveStreamV3 from "./LiveStreamV3";
import { aiToggleStatus } from "../TaskSubmitV3";

interface Props {
  // cameraRef: RefObject<LiveStreamMethods>;
  // unmountCamera: boolean;
  isEnded: boolean;
  orientation?: "landscape" | "portrait";
  onFinish: () => void;
  // onInitialized: () => void;
  isFullScreen?: boolean;
  onPress: () => void;
  localMedia?: string;
  aiToggle?: aiToggleStatus;
  //   pauseRecording: () => void;
  //   stopRecording: () => void;
}

const BottomBarV3: React.FC<Props> = ({
  // cameraRef,
  // unmountCamera,
  isEnded,
  onFinish,
  // onInitialized,
  orientation,
  isFullScreen,
  onPress,
  localMedia,
  aiToggle,
  //   pauseRecording,
  //   stopRecording,
}) => {
  const { right } = useSafeAreaInsets();

  return (
    <View
      className={clsx(isFullScreen ? "pt-20" : "absolute right-0 bottom-0")}
    >
      {isEnded ? (
        <LinearGradient colors={["transparent", "black"]} className="p-4">
          <BasicCTA
            onPress={onFinish}
            text="Finish Workout"
            paddingStr="p-3.5"
          />
        </LinearGradient>
      ) : null}
      {aiToggle === "disabled" ? null : localMedia ? (
        <View
          style={{
            marginRight: orientation === "landscape" ? right : 0,
          }}
          className={clsx(
            isFullScreen ? "" : "self-end",
            orientation === "landscape" ? "py-4 pb-16" : "p-4 pb-20",
            isEnded ? "hidden" : ""
          )}
        >
          <LiveStreamV3
            // cameraRef={cameraRef}
            isFullScreen={isFullScreen}
            localMedia={localMedia}
            // unmountCamera={unmountCamera}
            orientation={orientation}
            onPress={onPress}
            // //   cameraActive={cameraActive}
            // onInitialized={onInitialized}

            //   pauseRecording={pauseRecording}
            //   stopRecording={stopRecording}
          />
        </View>
      ) : null}
    </View>
  );
};

export default BottomBarV3;
