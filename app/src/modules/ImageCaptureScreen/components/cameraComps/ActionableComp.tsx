import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";
import { View } from "react-native";
import { Camera } from "expo-camera";
import { useConfigContext } from "@providers/Config/ConfigProvider";
import { MealTypes } from "@models/Tasks/Task";
import { shallow } from "zustand/shallow";
import ScanningComp from "../ActionableComp/ScanningComp";
import RetryComp from "../ActionableComp/RetryComp";
import CapturedComp from "../ActionableComp/CapturedComp";
import CapturingComp from "../ActionableComp/CapturingComp";
import { useGPTPrompt } from "@hooks/gptPrompts/useGptPrompt";
import DoneComp from "../ActionableComp/DoneComp";

interface Props {
  camera: Camera | null;
  mealType: MealTypes;
  navigateOnDone: () => void;
}

const ActionableComp: React.FC<Props> = ({
  camera,
  mealType,
  navigateOnDone,
}) => {
  const { _takePicture, stage, _savePhoto, galleryImage, _saveGalleryPhoto } =
    useCameraImage(
      (state) => ({
        _savePhoto: state._savePhoto,
        _saveGalleryPhoto: state._saveGalleryPhoto,
        _takePicture: state._takePicture,
        stage: state.stage,
        galleryImage: state.galleryImage,
      }),
      shallow
    );

  const { gptPrompt } = useGPTPrompt("imageTaskGeneration");

  const { config } = useConfigContext();
  const onSave = () => {
    if (config?.apiKey) {
      if (galleryImage) {
        _saveGalleryPhoto(config.apiKey, mealType, gptPrompt);
      } else {
        _savePhoto(config.apiKey, mealType, gptPrompt);
      }
    }
  };
  const takePicture = () => {
    _takePicture(camera);
  };

  return (
    <View className="absolute w-full bottom-16 flex items-center justify-center px-7">
      <View className=" w-full flex items-center justify-center ">
        {stage === "capturing" && <CapturingComp takePicture={takePicture} />}
        {stage === "loadingImage" && (
          <CapturingComp takePicture={takePicture} />
        )}
        {stage === "captured" && <CapturedComp onSave={onSave} />}
        {stage === "uploading" && <ScanningComp title={"Uploading..."} />}
        {stage === "scanning" && <ScanningComp title={"Scanning..."} />}
        {(stage === "scanned" || stage === "itemSelection") && (
          <DoneComp onSave={navigateOnDone} />
        )}
        {(stage === "scanningError" || stage === "uploadingError") && (
          <RetryComp title="Retry" />
        )}
      </View>
    </View>
  );
};

export default ActionableComp;
