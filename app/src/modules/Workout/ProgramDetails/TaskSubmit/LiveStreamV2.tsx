import Loading from "@components/loading/Loading";
// import { useCameraDevices_sb } from "@hooks/permissions/useCameraDevices";
// import { useIsForeground } from "@hooks/utils/useIsForeground";
// import { useIsFocused, useNavigation } from "@react-navigation/native";
import { RefObject, useState } from "react";
import { View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import clsx from "clsx";

interface Props {
  //   showWarning: boolean;
  cameraRef: RefObject<Camera>;
  unmountCamera: boolean;
  onInitialized: () => void;
  orientation?: "landscape" | "portrait";
  //   pauseRecording: () => void;
  //   stopRecording: () => void;
}

const LiveStreamV2: React.FC<Props> = ({
  //   cameraActive,
  cameraRef,
  onInitialized,
  unmountCamera,
  orientation,
  //   postInteraction,
  //   pauseRecording,
  //   stopRecording,
}) => {
  const [cameraReady, setCameraReady] = useState<boolean>(false);
  const onInit = () => {
    setCameraReady(true);
    onInitialized();
  };

  const isFocused = useIsFocused();

  return (
    <>
      <View
        className={clsx(
          orientation === "landscape"
            ? "w-24 iphoneX:w-28 h-36"
            : "w-24 iphoneX:w-28 h-40 iphoneX:h-48",
          " relative  bg-black rounded-2xl overflow-hidden border border-[#909090]"
        )}
      >
        {isFocused ? (
          <Camera
            ref={cameraRef}
            onMountError={(e) => console.log("error in mount", e)}
            onCameraReady={onInit}
            style={{ flex: 1 }}
            type={CameraType.front}
          />
        ) : null}
        {!cameraReady ? (
          <View className="flex-1 z-50 absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center">
            <Loading width="w-8" height="h-8" />
          </View>
        ) : null}
      </View>
    </>
  );
};

export default LiveStreamV2;
