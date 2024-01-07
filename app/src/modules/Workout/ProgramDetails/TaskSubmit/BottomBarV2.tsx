import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BasicCTA from "@components/Buttons/BasicCTA";
// import LiveStream from "./LiveStream";
import { RefObject } from "react";
// import { Camera } from "react-native-vision-camera";
// import { Camera } from "expo-camera";
import clsx from "clsx";
// import LiveStreamV2 from "./LiveStreamV2";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import LiveStreamV3 from "./LiveStreamV3";

import LiveStreamV2 from "./LiveStreamV2";
import { Camera } from "expo-camera";

interface Props {
  cameraRef: RefObject<Camera>;
  unmountCamera: boolean;
  isEnded: boolean;
  orientation?: "landscape" | "portrait";
  onFinish: () => void;
  onInitialized: () => void;
  //   pauseRecording: () => void;
  //   stopRecording: () => void;
}

const BottomBarV2: React.FC<Props> = ({
  cameraRef,
  unmountCamera,
  isEnded,
  onFinish,
  onInitialized,
  orientation,
  //   pauseRecording,
  //   stopRecording,
}) => {
  const { right } = useSafeAreaInsets();

  return (
    <View className={clsx("absolute left-0 right-0 bottom-0")}>
      {isEnded ? (
        <LinearGradient colors={["transparent", "black"]} className="p-4">
          <BasicCTA
            onPress={onFinish}
            text="Finish Workout"
            paddingStr="p-3.5"
          />
        </LinearGradient>
      ) : null}
      <View
        style={{
          marginRight: orientation === "landscape" ? right : 0,
        }}
        className={clsx(
          "self-end",
          orientation === "landscape" ? "py-4" : "p-4",
          isEnded ? "hidden" : ""
        )}
      >
        <LiveStreamV2
          cameraRef={cameraRef}
          unmountCamera={unmountCamera}
          orientation={orientation}
          // cameraActive={cameraActive}
          onInitialized={onInitialized}
          // pauseRecording={pauseRecording}
          // stopRecording={stopRecording}
        />
      </View>
    </View>
  );
};

export default BottomBarV2;
