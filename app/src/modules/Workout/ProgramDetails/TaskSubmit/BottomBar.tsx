import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BasicCTA from "@components/Buttons/BasicCTA";
// import LiveStream from "./LiveStream";
// import { RefObject } from "react";
// import { Camera } from "react-native-vision-camera";

import clsx from "clsx";

interface Props {
  // cameraRef: RefObject<Camera>;
  showWarning: boolean;
  isEnded: boolean;
  onFinish: () => void;
  postInteraction: boolean;
  pauseRecording: () => void;
  stopRecording: () => void;
}

const BottomBar: React.FC<Props> = ({
  // cameraRef,
  showWarning,
  isEnded,
  onFinish,
  postInteraction,
  pauseRecording,
  stopRecording,
}) => {
  return (
    <View className="absolute left-0 right-0 bottom-0">
      {isEnded ? (
        <LinearGradient colors={["transparent", "black"]} className="p-4">
          <BasicCTA
            onPress={onFinish}
            text="Finish Workout"
            paddingStr="p-3.5"
          />
        </LinearGradient>
      ) : null}
      <View className={clsx("self-end p-4", isEnded ? "hidden" : "")}>
        {/* <LiveStream
          cameraRef={cameraRef}
          showWarning={showWarning}
          postInteraction={postInteraction}
          pauseRecording={pauseRecording}
          stopRecording={stopRecording}
        /> */}
      </View>
    </View>
  );
};

export default BottomBar;
