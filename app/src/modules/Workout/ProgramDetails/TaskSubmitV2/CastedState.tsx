import { RefObject, useState } from "react";
import { Text, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import Loading from "@components/loading/Loading";
import BasicCTA from "@components/Buttons/BasicCTA";
import { deviceStatus } from "@models/Cast/Cast";

interface Props {
  cameraRef: RefObject<Camera>;
  onInitialized: () => void;
  onFinish: () => void;
  isEnded: boolean;
  onStart: () => void;
  onEnd: () => void;
  webStatus?: deviceStatus;
}

const CastedState: React.FC<Props> = ({
  cameraRef,
  onInitialized,
  onFinish,
  isEnded,
  onStart,
  onEnd,
}) => {
  const [cameraReady, setCameraReady] = useState<boolean>(false);
  const onInit = () => {
    setCameraReady(true);
    onInitialized();
  };

  const isFocused = useIsFocused();

  return (
    <View className="flex-1 bg-[#100F1A] overflow-hidden relative">
      {isFocused ? (
        <>
          <Camera
            ref={cameraRef}
            onMountError={(e) => console.log("error in mount", e)}
            onCameraReady={onInit}
            style={{ flex: 1 }}
            type={CameraType.front}
          />
          <View className="mt-2">
            <Text className="text-white text-base text-center">
              Ensure that you're in the frame to get points
            </Text>
          </View>
          <BasicCTA
            onPress={isEnded ? onStart : onEnd}
            text={isEnded ? "Start Workout" : "Pause Workout"}
            paddingStr="m-4 mt-2 p-3.5"
          />
          {/* <BasicCTA
            onPress={onFinish}
            text="Finish Workout"
            paddingStr="m-4 p-3.5"
          /> */}
        </>
      ) : null}
      {!cameraReady ? (
        <View className="absolute left-0 right-0 top-0 bottom-0 bg-[#100F1A] flex justify-center items-center">
          <Loading width="w-8" height="h-8" />
        </View>
      ) : null}
    </View>
  );
};

export default CastedState;
