import { Camera, FlashMode } from "expo-camera";
import { useCameraPermissionV3 } from "@hooks/permissions/useCameraPermissionsV3";
import { View } from "react-native";
import { shallow } from "zustand/shallow";
import { MealTypes } from "@models/Tasks/Task";
import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";
import CameraPreviewAi from "./CameraPreviewAi";
import Loading from "@components/loading/Loading";

interface Props {
  camera: Camera | null;
  setCamera: (newVal: Camera | null) => void;
  mealType?: MealTypes;
}

const CameraView: React.FC<Props> = ({ mealType, camera, setCamera }) => {
  const { cameraType, stage } = useCameraImage(
    (state) => ({
      cameraType: state.cameraType,

      stage: state.stage,
    }),
    shallow
  );
  const { permissionStatus } = useCameraPermissionV3();
  return (
    <View className="w-full flex-1 relative">
      {permissionStatus === "granted" ? (
        <>
          {stage !== "capturing" && stage !== "loadingImage" && (
            <CameraPreviewAi />
          )}
          {(stage === "capturing" || stage === "loadingImage") && (
            <>
              <Camera
                type={cameraType}
                flashMode={FlashMode.auto}
                style={{ flex: 1 }}
                ref={(r) => {
                  setCamera(r);
                }}
                ratio={"1:1"}
                onMountError={() => {
                  console.log("mount error");
                }}
              ></Camera>
              {stage === "loadingImage" && (
                <View className="absolute top-0 bottom-0 right-0 left-0 z-20 flex-1 items-center justify-center bg-black/40">
                  <Loading />
                </View>
              )}
            </>
          )}
        </>
      ) : (
        <View className="w-full h-full border border-black rounded-lg"></View>
      )}
    </View>
  );
};
export default CameraView;
