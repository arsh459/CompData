import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";
import clsx from "clsx";
import { View, ImageBackground } from "react-native";
import { shallow } from "zustand/shallow";
import BackgroundEffect from "../PreviewEffects/BackgroundEffect";
export const CameraPreviewAi = () => {
  const { capturedImage } = useCameraImage(
    (state) => ({
      capturedImage: state.capturedImage,
    }),
    shallow
  );
  return (
    <View
      className={clsx("rounded-xs")}
      style={{
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <BackgroundEffect />
      <ImageBackground
        source={{ uri: capturedImage ? capturedImage.uri : "" }}
        style={{
          flex: 1,
        }}
        className="-z-10"
      ></ImageBackground>
    </View>
  );
};

export default CameraPreviewAi;
