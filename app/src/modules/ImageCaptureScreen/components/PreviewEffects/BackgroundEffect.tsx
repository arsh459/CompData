import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";
import clsx from "clsx";
import { View } from "react-native";
import { shallow } from "zustand/shallow";
const BackgroundEffect = () => {
  const { stage } = useCameraImage(
    (state) => ({
      stage: state.stage,
    }),
    shallow
  );
  return (
    <View
      className={clsx(
        "absolute top-0 right-0 left-0 bottom-0",
        stage === "scanned" && "bg-[#638c584d]",
        (stage === "scanningError" || stage === "uploadingError") &&
          "bg-[#ba2d2d8c]"
      )}
    ></View>
  );
};

export default BackgroundEffect;
