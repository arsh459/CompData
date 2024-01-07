import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";
import clsx from "clsx";
import { View, Text } from "react-native";
import { shallow } from "zustand/shallow";

const DescriptionText = () => {
  const { stage } = useCameraImage(
    (state) => ({
      stage: state.stage,
    }),
    shallow
  );
  return (
    <View className="px-12">
      <View className="">
        <Text
          className={clsx(
            "text-center text-white/70 text-base font-normal leading-[1rem]",
            stage === "scanningError" || stage === "uploadingError"
              ? "text-[#FF5970]"
              : ""
          )}
          style={{ fontFamily: "Poppins-Regular" }}
        >
          {stage === "capturing" &&
            "Tap on the button to take a picture of the item"}
          {stage === "loadingImage" &&
            "Tap on the button to take a picture of the item"}
          {stage === "captured" && "Now Upload the image to scan the item"}
          {stage === "uploading" && "Uploading the image to Please wait..."}
          {stage === "scanning" && "Scanning in progress, please wait..."}
          {(stage === "scanned" || stage === "itemSelection") &&
            "Item scanned proceed for tracking"}
          {(stage === "scanningError" || stage === "uploadingError") &&
            "Error : Unable to find the item in the picture"}
        </Text>
      </View>
    </View>
  );
};

export default DescriptionText;
