import CameraAIScan from "@modules/CameraAIScan";
import {
  CameraPermissionData,
  workoutCameraPermissionData,
} from "@modules/CameraAIScan/utils";
import { View } from "react-native";
import PermissionButton from "@modules/CameraAIScan/PermissionButton";

interface Props {
  ctaPress1: () => void;
  ctaPress2: () => void;
  ctaText1: string;
  ctaText2: string;
  data?: CameraPermissionData;
}

const PermissionWrapper: React.FC<Props> = ({
  ctaPress1,
  ctaPress2,
  ctaText1,
  ctaText2,
  data,
}) => {
  return (
    <CameraAIScan contentData={data ? data : workoutCameraPermissionData}>
      <View className="px-8">
        <PermissionButton
          ctaPress1={ctaPress1}
          ctaPress2={ctaPress2}
          ctaText2={ctaText2}
          ctaText1={ctaText1}
        />
      </View>
    </CameraAIScan>
  );
};

export default PermissionWrapper;
